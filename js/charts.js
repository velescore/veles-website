/*
 * Class to handle charting on Veles website 
 *
 * Copyright (C) 2019 The Veles Core developers
 * Author: Altcoin Baggins
 *
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation, either version 3
 * of the License, or (at your option) any later version.
 */
var velesWebCharts = {
    'charts': {},

    'drawPriceTooltipChart': function(dataset, element_id = 'price-tooltip-chart') {
        ymax = 0;
        ymin = 0;

        for (var i = 0; i < dataset.length; i++) {
            if (ymax < dataset[i][2])
                ymax = dataset[i][2];
            if (ymin > dataset[i][3])
                ymin = dataset[i][3];
        }

        if (!this.charts.hasOwnProperty('tooltip-chart'))
            this.charts['tooltip-chart'] = $.jqplot(element_id,[dataset],{
                  title: 'Daily VLS/BTC',
                  axesDefaults:{},
                  axesStyles: { borderWidth: 0 },
                  axes: {
                      xaxis: {
                          autoscale: true,
                          renderer:$.jqplot.DateAxisRenderer,
                          tickOptions:{ showLabel: false },
                          pad: 1,
                          borderWidth: 0,
                          howTicks: false,
                          showTickMarks: false,
                      },
                      yaxis: {
                          tickOptions:{ showLabel: false },
                          max: ymax,
                          min: ymin,
                            borderWidth: 0,
                            showTicks: false,
                            showTickMarks: false,
                      }
                  },
                  grid: { backgroundColor: 'transparent', drawBorder: false, shadow: false, drawGridLines: false,
                  gridLineColor: 'transparent', borderWidth: 0},
                  seriesDefaults: { color: '#F19B7E' },
                  series: [{renderer:$.jqplot.OHLCRenderer, rendererOptions:{
                    candleStick: true, 
                    lineWidth: 1,
                    fillUpBody: false,
                    fillDownBody: false,
                    upBodyColor: '#8cff8c',
                    downBodyColor: '#F19B7E'
                    }}],
                  cursor:{
                      show: true,
                      zoom:false,
                      tooltipOffset: 5,
                      tooltipLocation: 'nw',
                      followMouse: true,
                      tooltipFormatString: '%.4P, %.8f'
                  },
                  highlighter: {
                      show: false   /*,
                      showMarker:true,
                      tooltipAxes: 'xy',
                      yvalues: 4,
                      formatString:'<table class="jqplot-highlighter"> \
                      <tr><td>date:</td><td>%s</td></tr> \
                      <tr><td>open:</td><td>%s</td></tr> \
                      <tr><td>hi:</td><td>%s</td></tr> \
                      <tr><td>low:</td><td>%s</td></tr> \
                      <tr><td>close:</td><td>%s</td></tr></table>'*/
                  },
            });
    },

    'priceStatsToOclh': function(stats) {
        oclh = [];
        last_close = null;

        for (var i = 0; i < stats.length; i++) {
            oclh[i] = [
                stats[i]['date'],
                (last_close === null) ? stats[i]['close'] : last_close,
                 stats[i]['high'],
                stats[i]['low'],
                stats[i]['close']
                ];
            last_close = stats[i]['close'];
        }

        return oclh;
    }
}
