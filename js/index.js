/*
 * Basic functionality used only on the index page, like twitter feed
 * widget modifications.
 *
 * Copyright (C) 2019 The Veles Core developers
 * Authors: Altcoin Baggins, mdfkbtc
 *
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation, either version 3
 * of the License, or (at your option) any later version.
 */
velesSinglePageApp.addPageHook('index', 'init', function() {
    indexHeaderWidget.init();
    /*
    // Used to set the bg for animation effect just after overlay gets faded,
    // otherwise it cause(d) bug with the fading effect.
    setTimeout(function(){
        $('.movething .header').addClass('with-bg');
        
    }, 3000);
    */
   
        if (!velesSinglePageApp.eventsBound.hasOwnProperty('index-sidebar-hook') 
                || !velesSinglePageApp.eventsBound['index-sidebar-hook']) {
            $('.sidebar').on('mouseover', function () {
                if (!$('#under-canvas').hasClass('parallax-zoom'))
                    $('#under-canvas').addClass('parallax-zoom');
            });
            $('.sidebar').on('mouseout', function () {
                if ($('#under-canvas').hasClass('parallax-zoom'))
                    $('#under-canvas').removeClass('parallax-zoom');
            });

            velesSinglePageApp.eventsBound['index-sidebar-hook'] = true;
        }

    // Update twitter feed style
    setTimeout(function(){
        $('#twitter-widget-0').contents().find('.timeline-Tweet-text').css('font-size', '20px');
        $('#twitter-widget-0').contents().find('.timeline-Tweet-text').css("font-family: 'Jura', sans-serif");
        $('#twitter-widget-0').contents().find('a.link.customisable').css('color', '#e4b99c');
        $('#twitter-widget-0').contents().find('a.customisable-highlight').css('color', '#e4b99c');
        $('#twitter-widget-0').contents().find('a.u-floatLeft').css('color', '#e4b99c');
        $('#twitter-widget-0').contents().find('a.u-floatRight').css('color', '#e4b99c');
        $('#twitter-widget-0').contents().find('a.PrettyLink.hashtag.customisable').css('color', '#e4b99c');
        $('#twitter-widget-0').contents().find('a.PrettyLink.profile.customisable.h-card').css('color', '#e4b99c');
    }, 4000);
});

 velesSinglePageApp.addPageHook('vpn', 'init', function() {
     
    setInterval(function(){
        var date = new Date(2019, 11, 1, 0, 0);
        var dateNow = new Date();
        var diff = date - dateNow;
        var msec = diff;
        var dd = Math.floor(msec / 1000 / 60 / 60 / 24);
        msec -= dd * 1000 * 60 * 60 * 24;
        var hh = Math.floor(msec / 1000 / 60 / 60);
        msec -= hh * 1000 * 60 * 60;
        var mm = Math.floor(msec / 1000 / 60);
        msec -= mm * 1000 * 60;
        var ss = Math.floor(msec / 1000);
        msec -= ss * 1000;

        $("#days").text(dd);
        $("#hours").text(hh);
        $("#minutes").text(mm);
        $("#seconds").text(ss);
    }, 1000); 
});
/*
velesSinglePageApp.addPageHook('index', 'connect', function() {
    velesSocketClient.get_cmd_result('location', 'gps', {}, function(data) {
        indexHeaderWidget.updateLocation(data);
    });
});
*/