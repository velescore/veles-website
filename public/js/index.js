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

    // Sidebar animations to react with map background
    // and to work with search icon
    if (!velesSinglePageApp.eventsBound.hasOwnProperty('index-sidebar-hook') 
            || !velesSinglePageApp.eventsBound['index-sidebar-hook']) {
        $('.sidebar').add('.nav-search-icon').on('mouseover', function () {
            if (!$('#under-canvas').hasClass('parallax-zoom'))
                $('#under-canvas').addClass('parallax-zoom');

            if (!$('.sidebar').hasClass('sidebar-expand')) {
                $('.sidebar').addClass('expand-temporary');
                $('.sidebar').addClass('sidebar-expand');
            }
            $('.nav-search-icon').addClass('hide-search-icon'); 
        });

        $('.sidebar').on('mouseout', function () {
            if ($('#under-canvas').hasClass('parallax-zoom'))
                $('#under-canvas').removeClass('parallax-zoom');

            if ($('.sidebar').hasClass('expand-temporary')) {
                $('.sidebar').removeClass('sidebar-expand');
                $('.sidebar').removeClass('expand-temporary');
                $('.nav-search-icon').removeClass('hide-search-icon'); 
            }
            
        });
        // fix if we want to avoid the menu with the mouse
        $('.navbar-brand').on('mouseout', function() {
            $('.sidebar').mouseout();
        });


        velesSinglePageApp.eventsBound['index-sidebar-hook'] = true;
    }
});

// Show news
velesSinglePageApp.addPageHook('index', 'jsonPreload', function() {
    $('.news-list li').each(function (i, row) {
        // we just need to be sure that number of rows doesn't exceed
        // pre-set minimum number of recet articles, which is 10 by
        // default, we need about 4 to show on index.
        var $row = $(row),
            item = velesSinglePageApp.jsonPreload['news/recentArticles.json'][i];

        // populate existing empty row with json item's content
        $row.attr('data-news-id', item['alias']);
        $row.find('.news-title').text(item['title']);
        $row.find('.news-teaser').text(item['abstract']);
        $row.click(function(e) {
            velesSinglePageApp.go($(this).attr('data-news-id') + '.news.' + velesSinglePageApp.language);
        });

        // fade in news section when filled with data
        $('.news-load-recent').addClass('news-loaded'); 
    });

    // make rows clickable
    $('.news-link').not('.spa').addClass('spa');
});
    
// Effect for dVPN subpage, will be removed when dVPN page fully moved to index / wiki
//velesSinglePageApp.addPageHook('dvpn', 'init', function() {
//     indexHeaderWidget.init();
//});
