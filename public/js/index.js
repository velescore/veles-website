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

var indexTypeWriter = {
    'titles': [
        'free dVPN testing stage is still active',
        'new mobile wallet public release coming soon',
        'Check out our new Wiki and News sections',
    ],
    'class': 'index-typewrite',
    'pos': 0, 
    'char': 0,
    'runLoop': false,

    'init': function() {
        this.runLoop = true;
        this.typeNextChar();
    },
    'stop': function() {
        this.runLoop = false;
    },
    'typeNextChar': function() {
        if (!this.runLoop)
            return;

        if (this.char >= this.titles[this.pos].length) {
            this.char = 0;
            
            $('.' + this.class).text("");
            this.pos++;
        }

        if (this.pos >= this.titles.length) {
            this.pos = 0;
            this.char = 0;
        } else {
            $('.' + this.class).text($('.' + this.class).text() + this.titles[this.pos][this.char]);
            this.char++;
        }

        if (this.char == this.titles[this.pos].length)
            setTimeout(function(){ indexTypeWriter.typeNextChar(); }, 1000);
        else
            setTimeout(function(){ indexTypeWriter.typeNextChar(); }, 100);
    }
}

velesSinglePageApp.addPageHook('index', 'init', function() {
    indexHeaderWidget.init();
    indexTypeWriter.init();

    // Sidebar animations to react with map background
    // and to work with search icon
    if (!velesSinglePageApp.eventsBound.hasOwnProperty('index-sidebar-hook') 
            || !velesSinglePageApp.eventsBound['index-sidebar-hook']) {
        $('.sidebar').add('.nav-search-icon').on('mouseover', function () {
            if (!$('#under-canvas').hasClass('parallax-zoom'))
                $('#under-canvas').addClass('parallax-zoom');
        });

        $('.sidebar').on('mouseout', function () {
            if ($('#under-canvas').hasClass('parallax-zoom'))
                $('#under-canvas').removeClass('parallax-zoom');
        });

        velesSinglePageApp.eventsBound['index-sidebar-hook'] = true;
    }
});

velesSinglePageApp.addPageHook('index', 'exit', function() {
    indexTypeWriter.stop();
});

// Show news
velesSinglePageApp.addPageHook('index', 'jsonPreload', function() {
    if ($('.news-list').length && velesSinglePageApp.language == 'en') {// only English news are production ready at the moment
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
            $row.find('.news-icon').attr('src', (item['image']) ? item['image'] : 'images/news/veles-square.png');
            $row.click(function(e) {
                velesSinglePageApp.go($(this).attr('data-news-id') + '.news.' + velesSinglePageApp.language);
            });

            // fade in news section when filled with data
            $('.news-load-recent').addClass('news-loaded'); 
        });

        // mark rows that we have just linked to the single page app
        $('.news-link').not('.spa').addClass('spa');
    }
});


// Effect for dVPN subpage, will be removed when dVPN page fully moved to index / wiki
//velesSinglePageApp.addPageHook('dvpn', 'init', function() {
//     indexHeaderWidget.init();
//});
