var velesSocketClient = {
    host: 'explorer.veles.network',
    port: 8882,
    protocol: 'ws',     // protocol: wss of ws
    retries: 300,
    connected: false,
    handleEvent: null,
    handleConnect: null,
    handleDisconnect: null,
    onResultCallbacks: {},
    requestID: 1
    };

velesSocketClient.log = function(msg) {
    console.log(msg)
    if (document.getElementById('debug-area') != null) {
        li = document.createElement('li');
        li.innerHTML = msg;
        document.getElementById('debug-area').appendChild(li);
    }
}

velesSocketClient.insert_reconnect_link = function() {
    if (document.getElementById('debug-area') != null) {
        li = document.createElement('li');
        li.innerHTML = '... (not connected) ';
        a = document.createElement('a');
        a.setAttribute('href', 'javascript:velesSocketClient.connect()');
        a.innerHTML = 'reconnect';
        li.appendChild(a);
        document.getElementById('debug-area').appendChild(li);
    }
}

velesSocketClient.clear_console = function(msg) {
    if (document.getElementById('debug-area') != null) {
        document.getElementById('debug-area').innerHTML = '';
        
        if (!this.connected) {
            velesSocketClient.insert_reconnect_link();
        } else {
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

velesSocketClient.connect = function()  {
    velesSocketClient.log("Connecting to " + velesSocketClient.host + " ...")
    var ws = new WebSocket(velesSocketClient.protocol + "://" + velesSocketClient.host + ":" + velesSocketClient.port + "/ws/");
    ws.onopen = function() {
        velesSocketClient.log('WebSocket connected, waiting for events');
        velesSocketClient.ws = ws;
        velesSocketClient.connected = true;

        if (velesSocketClient.handleConnect != null)
            velesSocketClient.handleConnect();
    };
    ws.onerror = function() {
        velesSocketClient.log('WebSocket error');
    };
    ws.onclose = function() {
        velesSocketClient.log('WebSocket closed');
        velesSocketClient.connected = false;
        if (velesSocketClient.handleDisconnect != null)
            velesSocketClient.handleDisconnect();

        if (velesSocketClient.retries) {
            velesSocketClient.retries--;
            velesSocketClient.connect();
        } else {
            velesSocketClient.insert_reconnect_link();
            velesSocketClient.retries++
        }
    };
    ws.onmessage = function(msgevent) {
        var payload = msgevent.data;    //JSON.parse(msgevent.data);
        velesSocketClient.log('<< ' + payload);
        var msg = JSON.parse(payload);

        if (msg['message-type'] == 'event' && velesSocketClient.handleEvent != null) {
            velesSocketClient.handleEvent(msg);

        } else if (msg['message-type'] == 'response') {
            if (velesSocketClient.onResultCallbacks.hasOwnProperty(msg['request-id'])) {
                velesSocketClient.onResultCallbacks[msg['request-id']](msg['data']);
                delete velesSocketClient.onResultCallbacks[msg['request-id']];
            }
        }
    };
};


$(document).ready(function(){
    velesSocketClient.handleEvent = function(e) {
        // cool hack to update all fields named as entity property, like chain-tip-height
        if (e.name == 'state_changed') {
            for (var key in e['new-state']) {
                $('.' + e['entity-id'].replace('.', '-') + '-' + key).text(e['new-state'][key]);
            }
        }
    };
    velesSocketClient.handleConnect = function() {
        $('.websocket-offline').hide();
        $('.websocket-online').show();
        $('.websocket-offline-animate').hide("slow");
        $('.websocket-online-animate').show("slow");

        /* example of direct query, not needed, all gets handled by events 
        velesSocketClient.get_cmd_result('node', 'masternodelist', {}, function(d) { 
            $('.masternode-list-enabled-length').text(d); 
        }, 'value=ENABLED|count'); */
    };
    velesSocketClient.handleDisconnect = function() {
        $('.websocket-online').hide();
        $('.websocket-offline').show();  
        $('.websocket-online-animate').hide("slow");
        $('.websocket-offline-animate').show("slow");  
    };

    velesSocketClient.connect();

    // buttons
    $('.websocket-status').click(function(){
        velesSocketClient.get_cmd_result('webapi', 'listClients', {}, function(d) { 
            $('.website-connections-count').text(d); 
        }, 'count');
        velesSocketClient.get_cmd_result('node', 'getconnectioncount', {}, function(d) { 
            $('.node-connections-count').text(d); 
        });

        $('.connection-status-area').toggle("fast");

        setTimeout(function(){ $('.connection-status-area').hide("fast"); }, 5000);
    });
    // todo: shit to move elsewhere
    $('#twitter-widget-0').contents().find('.timeline-Tweet-text').css('font-size', '20px');
});
