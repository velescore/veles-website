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

function shortenBlockHash(hash, length = 10) {
    while(hash.charAt(2) === '0')
        hash = hash.substr(2);   
    
    return hash.substr(0, length);
}

function algoNameFromVersionHex(versionHex) {
    if (versionHex.substr(4,2) == '01')
        return "scrypt";

    if (versionHex.substr(4,2) == '02')
        return "nist5";

    if (versionHex.substr(4,2) == '03')
        return "lyra2z";

    if (versionHex.substr(4,2) == '04')
        return "x11";

    if (versionHex.substr(4,2) == '05')
        return "x16r";

    return "sha256d";
};

format_number = function(number, to_fixed = false) {
  if (number == 0 || number == null)
    return '0';
    
  if (to_fixed)
    number = Number(number).toFixed(to_fixed);
  else
    number = String(number);
    
  if (String(number).indexOf('.')) {
    return '<b>' + number.replace('.', '</b>.');
  } else {
    return '<b>' + number + '</b>';
  }
};

formatHashrate = function(value, inputUnits = 1) {
  if (inputUnits != 1)
    value *= inputUnits;

  if (value == null || value == 0)
    return 0;
    
  if (value >= 1000000000000000)
    return format_number(value / 1000000000000000, 2) + ' <b>P</b>H/s';
    
  if (value >= 1000000000000)
    return format_number(value / 1000000000000, 2) + ' <b>T</b>H/s';
    
  if (value >= 1000000000)
    return format_number(value / 1000000000, 2) + ' <b>G</b>H/s';

  if (value >= 1000000)
    return format_number(value / 1000000, 2) + ' <b>M</b>H/s';

  if (value >= 1000)
    return format_number(value / 1000, 2) + ' <b>k</b>H/s';
    
  return format_number(value, 2) + ' H/s';
};

// Global variables
var velesNodeState = {}

velesPanelTooltips = {
    update: function(name) {
        if (name == 'chain-tip') {
            // fetch new data
            velesSocketClient.get_cmd_result('node', 'getblock ' + velesNodeState['chain.tip']['hash'], {}, function(d) { 
                $('.chain-tip-hash-short').text(shortenBlockHash(d.hash));
                $('.chain-tip-hash-short').attr('href', 'http://explorer.veles.network/block/' + d.hash);
                $('.chain-tip-hash-short').attr('title', d.hash);
                $('.chain-tip-previous-hash-short').text(shortenBlockHash(d.previousblockhash)); 
                $('.chain-tip-previous-hash-short').attr('href', 'http://explorer.veles.network/block/' + d.previousblockhash);
                $('.chain-tip-previous-hash-short').attr('title', d.previousblockhash);
                $('.chain-tip-time').text(new Date(d.time * 1000).toLocaleString());
                $('.chain-tip-size-kb').text(d.size / 1000);
                $('.chain-tip-ntx').text(d.nTx);
                $('.chain-tip-algo').text(algoNameFromVersionHex(d.versionHex));
                /*
                velesSocketClient.get_cmd_result('node', 'getblock ' + d.previousblockhash, {}, function(d) { 
                    $('.chain-tip-previous-time').text(new Date(d.time * 1000).toLocaleString());
                    $('.chain-tip-previous-size-kb').text(d.size / 1000);
                    $('.chain-tip-previous-ntx').text(d.nTx);
                    //$('.chain-tip-previous-algo').text(algoNameFromVersionHex(d.versionHex));
                });
                */
            });

        } else if (name == 'masternodes') {
            // Hide unneeded rows
            if (velesNodeState['masternodes']['pre-enabled-count'])
                $('.masternodes-pre-enabled-count').parent('li').show();
            else
                $('.masternodes-pre-enabled-count').parent('li').hide();

            if (velesNodeState['masternodes']['expired-count'])
                $('.masternodes-expired-count').parent('li').show();
            else
                $('.masternodes-expired-count').parent('li').hide();

            if (velesNodeState['masternodes']['new-start-required-count'])
                $('.masternodes-new-start-required-count').parent('li').show();
            else
                $('.masternodes-new-start-required-count').parent('li').hide();

            velesSocketClient.get_cmd_result('node', 'masternode collateral', {}, function(d) { 
                $('.masternodes-collateral-amount').text(d); 
            }); 
            $('.masternodes-reward-percent').text(Math.round(
                (0.05 + (0.6 - 0.05) / ((1051200) / (velesNodeState['chain.tip']['height'] - 50000))) * 10000
            ) / 100);

        } else if (name == 'connection') {
            velesSocketClient.get_cmd_result('webapi', 'listClients', {}, function(d) { 
                $('.website-connection-count').text(d); 
            }, 'count');
            velesSocketClient.get_cmd_result('node', 'getconnectioncount', {}, function(d) { 
                $('.node-connection-count').text(d); 
            });

        } else if (name == 'chain-pow') {
            $('.chain-pow-sha256d-hashrate').html(formatHashrate(velesNodeState['chain.pow'].hashrates.sha256d));
            $('.chain-pow-scrypt-hashrate').html(formatHashrate(velesNodeState['chain.pow'].hashrates.scrypt));
            $('.chain-pow-lyra2z-hashrate').html(formatHashrate(velesNodeState['chain.pow'].hashrates.lyra2z));
            $('.chain-pow-x11-hashrate').html(formatHashrate(velesNodeState['chain.pow'].hashrates.x11));
            $('.chain-pow-x16r-hashrate').html(formatHashrate(velesNodeState['chain.pow'].hashrates.x16r));
            $('.chain-pow-nist5-hashrate').html(formatHashrate(velesNodeState['chain.pow'].hashrates.nist5));
            velesSocketClient.get_cmd_result('node', 'gethalvingstatus', {}, function(data) {
                $('.chain-pow-supply-target-reached').text(data); 
            }, 'key=epoch_supply_target_reached');
            velesSocketClient.get_cmd_result('node', 'gethalvingstatus', {}, function(data) {
                $('.chain-pow-blocks-to-next-epoch').text(data); 
            }, 'key=blocks_to_next_epoch');

        } else
            console.log('Warning: Unknown tooltip: ' + name);
    }
}


$(document).ready(function(){
    /* Event handlers */
    velesSocketClient.handleEvent = function(e) {
        // Automagically update all fields named as entity property, 
        // for example <span class="chain-tip-height"></span>
        // todo: recursive objects / arrays crawl
        if (e.name == 'state_changed') {
            for (var key in e['new-state']) {
                $('.' + e['entity-id'].replace('.', '-') + '-' + key).text(e['new-state'][key]);

                // Format hashrate though
                if (key.indexOf('hashrate') != -1)
                    $('.' + e['entity-id'].replace('.', '-') + '-' + key + '-human').html(formatHashrate(e['new-state'][key]));
            }

            // If we're on block explorer page, trigger it's status update
            // function ASAP when new block is found
            try {
                update_stats();
            } catch {
                // noop
            }
            // Save the last state
            velesNodeState[e['entity-id']] = e['new-state'];
            // Update tooltips if open
            velesPanelTooltips.update(e['entity-id'].replace('.', '-'));
        }
    };
    velesSocketClient.handleConnect = function() {
        $('.websocket-offline').hide();
        $('.websocket-online').show();
        $('.websocket-offline-animate').hide("fast");
        $('.websocket-online-animate').show("fast");

        /* example of direct query, not needed, all gets handled by events 
        velesSocketClient.get_cmd_result('node', 'masternodelist', {}, function(d) { 
            $('.masternode-list-enabled-length').text(d); 
        }, 'value=ENABLED|count'); */
    };
    velesSocketClient.handleDisconnect = function() {
        $('.websocket-online').hide();
        $('.websocket-offline').show();  
        $('.websocket-online-animate').hide("fast");
        $('.websocket-offline-animate').show("fast");  
        $('.footer-tooltip').hide();
    };

    velesSocketClient.connect();

    /* Interactive statusbar buttons and their helper functions */
    $('#connection-status').click(function(){
        velesPanelTooltips.update('connection');

        if ($('#connection-tooltip').is(":visible")) {
            $('#connection-status').removeClass('active');
            $('#connection-tooltip').hide('fast');
        } else {
            $('.status-area').removeClass('active');
            $('.footer-tooltip').hide();
            $('#connection-status').addClass('active');
            $('#connection-tooltip').show('fast');
        }
    });
    $('#chain-tip-status').click(function(){
        velesPanelTooltips.update('chain-tip');

        if ($('#chain-tip-tooltip').is(":visible")) {
            $('#chain-tip-status').removeClass('active');
            $('#chain-tip-tooltip').hide('fast');
        } else {
            $('.status-area').removeClass('active');
            $('.footer-tooltip').hide();
            $('#chain-tip-status').addClass('active');
            $('#chain-tip-tooltip').show('fast');
        }
    });
    $('#masternodes-status').click(function(){
        velesPanelTooltips.update('masternodes');

        if ($('#masternodes-tooltip').is(":visible")) {
            $('#masternodes-status').removeClass('active');
            $('#masternodes-tooltip').hide('fast');
        } else {
            $('.status-area').removeClass('active');
            $('.footer-tooltip').hide();
            $('#masternodes-status').addClass('active');
            $('#masternodes-tooltip').show('fast');
        }
    });
    $('#chain-pow-status').click(function(){
        velesPanelTooltips.update('chain-pow');

        if ($('#chain-pow-tooltip').is(":visible")) {
            $('#chain-pow-status').removeClass('active');
            $('#chain-pow-tooltip').hide('fast');
        } else {
            $('.status-area').removeClass('active');
            $('.footer-tooltip').hide();
            $('#chain-pow-status').addClass('active');
            $('#chain-pow-tooltip').show('fast');
        }
    });

});
