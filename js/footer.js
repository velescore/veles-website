/* Utility functions */
var velesFooterPanel = {
    'bindEvents': function() {
        $('#connection-status').click(function(){
            if ($('#connection-tooltip').hasClass("tooltip-expand")) {
                $('#connection-status').removeClass('active');
                $('#connection-tooltip').removeClass("tooltip-expand");
            } else {
                velesFooterPanel.updateTooltip('connection');

                $('.status-area').removeClass('active');
                $('.footer-tooltip').removeClass('tooltip-expand');
                $('#connection-status').addClass('active');
                $('#connection-tooltip').addClass("tooltip-expand");
            }
        });
        $('#chain-tip-status').click(function(){
            if ($('#chain-tip-tooltip').hasClass("tooltip-expand")) {
                $('#chain-tip-status').removeClass('active');
                $('#chain-tip-tooltip').removeClass("tooltip-expand");
            } else {
                velesFooterPanel.updateTooltip('chain-tip');

                $('.status-area').removeClass('active');
                $('.footer-tooltip').removeClass('tooltip-expand');
                $('#chain-tip-status').addClass('active');
                $('#chain-tip-tooltip').addClass("tooltip-expand");
            }
        });
        $('#masternodes-status').click(function(){
            if ($('#masternodes-tooltip').hasClass("tooltip-expand")) {
                $('#masternodes-status').removeClass('active');
                $('#masternodes-tooltip').removeClass("tooltip-expand");
            } else {
                velesFooterPanel.updateTooltip('masternodes');

                $('.status-area').removeClass('active');
                $('.footer-tooltip').removeClass('tooltip-expand');
                $('#masternodes-status').addClass('active');
                $('#masternodes-tooltip').addClass("tooltip-expand");
            }
        });
        $('#chain-pow-status').click(function(){
            if ($('#chain-pow-tooltip').hasClass("tooltip-expand")) {
                $('#chain-pow-status').removeClass('active');
                $('#chain-pow-tooltip').removeClass("tooltip-expand");
            } else {
                velesFooterPanel.updateTooltip('chain-pow');

                $('.status-area').removeClass('active');
                $('.footer-tooltip').removeClass('tooltip-expand');
                $('#chain-pow-status').addClass('active');
                $('#chain-pow-tooltip').addClass("tooltip-expand");
            }
        });
        $('#price-status').click(function(){
            if ($('#price-status-tooltip').hasClass("tooltip-expand")) {
                $('#price-status-status').removeClass('active');
                $('#price-status-tooltip').removeClass("tooltip-expand");
            } else {
                velesFooterPanel.updateTooltip('price-status');

                $('.status-area').removeClass('active');
                $('.footer-tooltip').removeClass('tooltip-expand');
                $('#price-status-status').addClass('active');
                $('#price-status-tooltip').addClass("tooltip-expand");
            }
        });
    },

    'updateTooltip': function(name) {
        if (name == 'chain-tip') {
            // fetch new data
            velesSocketClient.get_cmd_result('node', 'getblock ' + velesChain.state['chain.tip']['hash'], {}, function(d) {
                $('.chain-tip-hash-short').text(velesChain.shortenBlockHash(d.hash));
                $('.chain-tip-hash-short').attr('href', 'http://explorer.veles.network/block/' + d.hash);
                $('.chain-tip-hash-short').attr('title', d.hash);
                $('.chain-tip-previous-hash-short').text(velesChain.shortenBlockHash(d.previousblockhash));
                $('.chain-tip-previous-hash-short').attr('href', 'http://explorer.veles.network/block/' + d.previousblockhash);
                $('.chain-tip-previous-hash-short').attr('title', d.previousblockhash);
                $('.chain-tip-time').text(new Date(d.time * 1000).toLocaleString());
                $('.chain-tip-size-kb').text(d.size / 1000);
                $('.chain-tip-ntx').text(d.nTx);
                $('.chain-tip-algo').text(velesChain.algoNameFromVersionHex(d.versionHex));
                /*
                velesSocketClient.get_cmd_result('node', 'getblock ' + d.previousblockhash, {}, function(d) {
                    $('.chain-tip-previous-time').text(new Date(d.time * 1000).toLocaleString());
                    $('.chain-tip-previous-size-kb').text(d.size / 1000);
                    $('.chain-tip-previous-ntx').text(d.nTx);
                    //$('.chain-tip-previous-algo').text(velesChain.algoNameFromVersionHex(d.versionHex));
                });
                */
            });

        } else if (name == 'masternodes') {
            // Hide unneeded rows
            if (velesChain.state['masternodes']['pre-enabled-count'])
                $('.masternodes-pre-enabled-count').parent('li').show();
            else
                $('.masternodes-pre-enabled-count').parent('li').hide();

            if (velesChain.state['masternodes']['expired-count'])
                $('.masternodes-expired-count').parent('li').show();
            else
                $('.masternodes-expired-count').parent('li').hide();

            if (velesChain.state['masternodes']['new-start-required-count'])
                $('.masternodes-new-start-required-count').parent('li').show();
            else
                $('.masternodes-new-start-required-count').parent('li').hide();

            velesSocketClient.get_cmd_result('node', 'masternode collateral', {}, function(d) {
                $('.masternodes-collateral-amount').text(d);
            });
            if (velesChain && velesChain.hasOwnProperty('state') && velesChain.state.hasOwnProperty('chain.tip')) {
                $('.masternodes-reward-percent').text(Math.round(
                    (0.05 + (0.6 - 0.05) / ((1051200) / (velesChain.state['chain.tip']['height'] - 50000))) * 10000
                ) / 100);
            }

        } else if (name == 'connection') {
            velesSocketClient.get_cmd_result('webapi', 'listClients', {}, function(d) {
                $('#connection-tooltip li').eq(2).find('b').text(d);    // todo: give the element proper ID
            }, 'count');
            velesSocketClient.get_cmd_result('node', 'getconnectioncount', {}, function(d) {
                $('#connection-tooltip li').eq(1).find('b').text(d);
            });

        } else if (name == 'chain-pow') {
            velesSocketClient.get_cmd_result('node', 'gethalvingstatus', {}, function(data) {
                $('.chain-pow-supply-target-reached').text(data);
            }, 'key=epoch_supply_target_reached');
            velesSocketClient.get_cmd_result('node', 'gethalvingstatus', {}, function(data) {
                $('.chain-pow-blocks-to-next-epoch').text(data);
            }, 'key=blocks_to_next_epoch');

        } else if (name == 'price-status') {
            velesSocketClient.get_cmd_result('stats', 'dailyprice 60', {}, function(d) { 
                velesWebCharts.drawPriceTooltipChart(
                    velesWebCharts.priceStatsToOclh(d)
                );
            });

        } else
            console.log('Warning: Unknown tooltip: ' + name);
    }
}


$(document).ready(function(){
    velesSocketClient.connect();
    velesFooterPanel.bindEvents();
});
