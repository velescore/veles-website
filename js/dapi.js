/*
 * Class and functions to provide communication with the Veles dAPI
 * proxy over websocket.
 * 
 * Copyright (C) 2019 The Veles Core developers
 * Author: Altcoin Baggins
 *
 * This program is free software: you can redistribute it and/or 
 * modify it under the terms of the GNU General Public License 
 * as published by the Free Software Foundation, either version 3 
 * of the License, or (at your option) any later version.
 */
var velesdAPIClient = {
    proxyUrl: 'http://explorer.veles.network/dapi',
    
    getMasterndeList: function(callback, serviceNodes=false) {
        if (serviceNodes)
            $.getJSON(this.proxyUrl + '/mn/list/dapp_support', callback);
        else
            $.getJSON(this.proxyUrl + '/mn/list', callback);
    }
};

var velesdAPIClientUI = {
    velesdAPIClientUI: function() {
        this.client = velesdAPIClient();
    },

    drawServicenodeTable: function(id="servicenode-table", true) {
        this.client.getMasterndeList(function(data){
            list = data.result
            $('#'+id).appendChild('<tr>''</tr>');
        });
    },

    drawMasternodeTable: function(id="masternode-table", false) {
        console.log(this.client.getMasterndeList());
    }
};

