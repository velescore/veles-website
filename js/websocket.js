/*
 * Class and functions to provide communication with the Veles Web API
 * server over websocket.
 * 
 * Copyright (C) 2019 The Veles Core developers
 * Author: Altcoin Baggins
 *
 * This program is free software: you can redistribute it and/or 
 * modify it under the terms of the GNU General Public License 
 * as published by the Free Software Foundation, either version 3 
 * of the License, or (at your option) any later version.
 */
var velesSocketClient = {
    host: (window.location.pathname.indexOf('/veles/') != -1)   // dev machines
        ? 'localhost'
        : 'explorer.veles.network',
    port: (window.location.pathname.indexOf('/veles/') != -1)
        ? 8882
        : 443,
    protocol: (window.location.pathname.indexOf('/veles/') != -1)   // dev machines
        ? 'ws'
        : 'wss',     // protocol: wss of ws
    retries: 3000,
    silentRetries: 12,
    currentSilentRetries: 0,
    retryTimeout: 250,
    connected: false,
    hooks: {},
    onResultCallbacks: {},
    requestID: 1
    };

velesSocketClient.log = function(msg) {
    if (typeof console !== 'undefined')
        console.log(msg)

    if (document.getElementById('debug-area') != null) {
        li = document.createElement('li');
        li.innerHTML = msg;
        document.getElementById('debug-area').prepend(li);
    }
}

velesSocketClient.clear_console = function(msg) {
    if (document.getElementById('debug-area') != null) {
        document.getElementById('debug-area').innerHTML = '';
        
        if (this.connected) {
            li = document.createElement('li');
            li.innerHTML = '... (connected)';
            document.getElementById('debug-area').appendChild(li);
        }
    }
}

velesSocketClient.send_cmd = function(service, name, requestID, data = {}, filter = null) {
    msg = window.JSON.stringify({ 
        'message-type': 'command', 
        'name': name, 
        'service': service, 
        'data': {}, 
        'filter': filter,
        'request-id': requestID 
    })
    if (!this.ws || !this.connected) {
        velesSocketClient.log('No WebSocket connection');
        velesSocketClient.connect()
    }

    if (this.connected) {
        velesSocketClient.log('>> ' + msg);
        this.ws.send(msg);
    }
};

velesSocketClient.get_cmd_result = function(service, name, data, callback, filter = null) {
    if (!this.ws || !this.connected) {
        velesSocketClient.log('No WebSocket connection');
        velesSocketClient.connect();
    }
    if (this.connected) {
        velesSocketClient.requestID++;
        velesSocketClient.onResultCallbacks[velesSocketClient.requestID] = callback;
        velesSocketClient.send_cmd(service, name, velesSocketClient.requestID, data, filter);
    }
};

velesSocketClient.handle = function(hook_name, data = null) {
     if (!velesSocketClient.hooks.hasOwnProperty(hook_name)) {
        velesSocketClient.log('No handlers found for ' + hook_name)
        return;
     }
    if (velesSocketClient.hooks.hasOwnProperty(hook_name)) {
        for (var i = velesSocketClient.hooks[hook_name].length - 1; i >= 0; i--) {
            if (data)
                velesSocketClient.hooks[hook_name][i](data);
            else
                velesSocketClient.hooks[hook_name][i]();
        }
    }
};

velesSocketClient.on = function(hook_name, callback) {
    if (!velesSocketClient.hooks.hasOwnProperty(hook_name))
        velesSocketClient.hooks[hook_name] = [];

    velesSocketClient.hooks[hook_name].push(callback);
};

velesSocketClient.connect = function()  {
    velesSocketClient.log("Connecting to " + velesSocketClient.host + " ...")
    var ws = new WebSocket(velesSocketClient.protocol + "://" + velesSocketClient.host + ":" + velesSocketClient.port + "/ws/");
    ws.onopen = function() {
        velesSocketClient.log('WebSocket connected, waiting for events');
        velesSocketClient.ws = ws;
        velesSocketClient.connected = true;
        velesSocketClient.currentSilentRetries = velesSocketClient.silentRetries;
        velesSocketClient.handle('connect');
    };
    ws.onerror = function() {
        velesSocketClient.log('WebSocket error');
    };
    ws.onclose = function() {
        velesSocketClient.log('WebSocket closed');
        velesSocketClient.connected = false;
        velesSocketClient.handle('reconnect');
        
        if (!velesSocketClient.currentSilentRetries) {
            velesSocketClient.handle('disconnect'); // we can silently try to reconnect few times

        }

        if (velesSocketClient.retries) {
            window.setTimeout(function() {
                velesSocketClient.retries--;
                velesSocketClient.currentSilentRetries--;
                velesSocketClient.connect();
            }, velesSocketClient.retryTimeout);
        }

    };
    ws.onmessage = function(msgevent) {
        var payload = msgevent.data;    //JSON.parse(msgevent.data);
        velesSocketClient.log('<< ' + payload);
        var msg = JSON.parse(payload);

        if (msg.hasOwnProperty('message-type') && msg['message-type'] == 'event' && msg.hasOwnProperty('name')) {
            velesSocketClient.handle(msg.name, msg);

        } else if (msg['message-type'] == 'response') {
            if (velesSocketClient.onResultCallbacks.hasOwnProperty(msg['request-id'])) {
                velesSocketClient.onResultCallbacks[msg['request-id']](msg['data']);
                delete velesSocketClient.onResultCallbacks[msg['request-id']];
            }

        } else if (msg['message-type'] == 'error' && msg.hasOwnProperty('request-id')) {
            if (velesSocketClient.onResultCallbacks.hasOwnProperty(msg['request-id'])) {
                velesSocketClient.onResultCallbacks[msg['request-id']](msg);
                delete velesSocketClient.onResultCallbacks[msg['request-id']];
            }
        }
    };
};
