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
$(document).ready(function(){
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
