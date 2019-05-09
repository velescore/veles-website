/*
 * Integrates Veles Websocket client with website's UI (and jQuery).
 * 
 * Copyright (C) 2019 The Veles Core developers
 * Author: Altcoin Baggins
 *
 * This program is free software: you can redistribute it and/or 
 * modify it under the terms of the GNU General Public License 
 * as published by the Free Software Foundation, either version 3 
 * of the License, or (at your option) any later version.
 */

// Global variable grouping information and methods related to
// Veles blockchain.
var velesChain = {
    // Holds the current state, updated from events
    state: {},
    // Holds raw persistent events
    stateEvents: {},
    // Holds hook to chain-related events
    hooks: {},

    // Utility functions related to chain data
    'algoNameFromVersionHex': function(hash, length = 10) {
        while(hash.charAt(2) === '0')
            hash = hash.substr(2);   
        
        return hash.substr(0, length);
    },

    'algoNameFromVersionHex': function(versionHex) {
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
    },

    'formatNumber': function(number, to_fixed = false, html_format = true, thousand_delimiter = ' ') {
        if (number == 0 || number == null)
            return '0';

        if (to_fixed)
            number = Number(number).toFixed(to_fixed);
        else
            number = String(number);

        if (thousand_delimiter) {
            x = number.split('.');
            x1 = x[0];
            x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + thousand_delimiter + '$2');
            }
            number = x1 + x2;
        }

        if (html_format) {
            if (String(number).indexOf('.')) {
                return '<b>' + number.replace('.', '</b>.');
            } else {
                return '<b>' + number + '</b>';
            }
        }
    },

    'formatHashrate': function(value, inputUnits = 1) {
        if (inputUnits != 1)
            value *= inputUnits;

        if (value == null || value == 0)
            return 0;

        if (value >= 1000000000000000)
            return this.formatNumber(value / 1000000000000000, 2) + ' <b>P</b>H/s';

        if (value >= 1000000000000)
            return this.formatNumber(value / 1000000000000, 2) + ' <b>T</b>H/s';

        if (value >= 1000000000)
            return this.formatNumber(value / 1000000000, 2) + ' <b>G</b>H/s';

        if (value >= 1000000)
            return this.formatNumber(value / 1000000, 2) + ' <b>M</b>H/s';

        if (value >= 1000)
            return this.formatNumber(value / 1000, 2) + ' <b>k</b>H/s';

        return this.formatNumber(value, 2) + ' H/s';
    },
    
    'shortenBlockHash': function(hash, length = 10) {
        while(hash.charAt(2) === '0')
            hash = hash.substr(2);   
        
        return hash.substr(0, length);
    },

    'replayEvents': function() {
        var eventKeys = Object.keys(velesChain.stateEvents);

        for (var i = eventKeys.length - 1; i >= 0; i--) {
            var event = velesChain.stateEvents[eventKeys[i]];
            velesSocketClient.handle(event.name, event);
        }   
    },

    handle: function(hook_name, data = null) {
        if (velesChain.hooks.hasOwnProperty(hook_name)) {
            for (var i = velesChain.hooks[hook_name].length - 1; i >= 0; i--) {
                if (data)
                    velesChain.hooks[hook_name][i](data);
                else
                    velesChain.hooks[hook_name][i]();
            }
        }
    },

    on: function(hook_name, callback) {
        if (!velesChain.hooks.hasOwnProperty(hook_name))
            velesChain.hooks[hook_name] = [];

        velesChain.hooks[hook_name].push(callback);
    }
}

velesChain.on('chain.tip:state_changed', function(e) {
    // If we're on block explorer page, trigger it's status update
    // function ASAP when new block is found
    try {
        update_stats();
    } catch {
        // noop
    }
});

/* Register UI-specific event handlers with the WS client */
velesSocketClient.on('connect', function() {
    $('.websocket-offline').hide();
    $('.websocket-online').show();
    $('.websocket-offline-animate').hide("fast");
    $('.websocket-online-animate').show("fast");

    /* example of direct query, not needed, all gets handled by events 
    velesSocketClient.get_cmd_result('node', 'masternodelist', {}, function(d) { 
        $('.masternode-list-enabled-length').text(d); 
    }, 'value=ENABLED|count'); */

    if (typeof velesSinglePageApp !== 'undefined')    // skip this on explorer
        velesSinglePageApp.runPageHook('connect');
});
velesSocketClient.on('disconnect', function() {
    $('.websocket-online').hide();
    $('.websocket-offline').show();  
    $('.websocket-online-animate').hide("fast");
    $('.websocket-offline-animate').show("fast");  
    $('.footer-tooltip').hide();
});
velesSocketClient.on('state_changed', function(e) {
    // Automagically update all fields named as entity property, 
    // Edit: Now using data-id, deprecating magical classnames
    // for example <span class="chain-tip-height"></span>
    // todo: recursive objects / arrays crawl
    velesChain.stateEvents[e['entity-id']] = e;  // persist the last event of kind

    // look for elements by deta-entity-id
    $('[data-entity-id="' + e['entity-id'] + '"]').each(function(){
        var attributes = $(this).attr('data-attribute').split('.');
        var value = e['new-state'];

        for (var i = 0; i < attributes.length; i++) {
            if (!value.hasOwnProperty(attributes[i])) {
                console.log('Invalid data-attribute: "' + e['entity-id'] + '"" has no attribute "' + $(this).attr('data-attribute') + '"');
                return;
            }
            value = value[attributes[i]]
        }

        // Format the value
        if ($(this).attr('data-multiplier'))
            value *= $(this).attr('data-multiplier');

        if ($(this).attr('data-format') == 'coin_amount') {
            $(this).html(velesChain.formatNumber(value, 8));

        } else if ($(this).attr('data-format') == 'hashrate') {
             $(this).html(velesChain.formatHashrate(value));

        } else if ($(this).attr('data-format') == 'number') {
             $(this).html(velesChain.formatNumber(
                value, 
                $(this).attr('data-fixed-decimals') ? $(this).attr('data-fixed-decimals') : false
                ));

        } else {
            $(this).text(value);
        }

        // Add units if required
        if ($(this).attr('data-unit'))
            $(this).html($(this).html() + ' ' + $(this).attr('data-unit'));

        if ($(this).attr('data-unit-before'))
            $(this).html($(this).attr('data-unit-before') + ' ' + $(this).html());

        // Set title if required
        var title, match_var = null;

        if (title = $(this).attr('data-title'))
            if (match_var = title.match(/{(.*?)}/))
                $(this).attr('title', title.replace(match_var[0], e['new-state'][match_var[1]]));
    })

    // Call other hooks
    velesChain.handle(e['entity-id'] + ':state_changed', e);

    // Save the last state
    velesChain.state[e['entity-id']] = e['new-state'];
    // Update tooltips if open
    velesFooterPanel.updateTooltip(e['entity-id'].replace('.', '-'));
});