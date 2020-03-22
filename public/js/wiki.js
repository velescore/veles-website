/*
 * Basic functionality used only on the index page, like twitter feed
 * widget modifications.
 *
 * Copyright (C) 2019-2020 The Veles Core developers
 *
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation, either version 3
 * of the License, or (at your option) any later version.
 */

// An object to encapsulate wiki-related functionality
velesSinglePageApp.wiki = {
    'replacements': [
        // add colors to special glyphs or their aliases
        [/✔/g, '<span class="green">✔</span>'],
        [/✖/g, '️<span class="red">✖</span>'],
        [/\[Y\]/g, '<span class="green">✔</span>'],
        [/\[N\]/g, '️<span class="red">✖</span>']
    ],

    'applyContentFilters': function() {
        var html = $('#content').html();

        for (var i = this.replacements.length - 1; i >= 0; i--) {
            html = html.replace(this.replacements[i][0], this.replacements[i][1])
        }

        $('#content').html(html);
    },

    'moveInfobox': function() {
        if ($('body').width() < 768 ) {
            $('table.infobox').detach().insertAfter('p:first');
        }
    }
}

// Simple object to encapsulate wiki-related functions
velesSinglePageApp.addCategoryHook('load', 'wiki', function() {
    // perform client-side replacements in wiki article content
    velesSinglePageApp.wiki.applyContentFilters();

    // move infobox on mobile, or when window is resized in emulator etc.
    velesSinglePageApp.wiki.moveInfobox();
    $('body').resize(function(){ velesSinglePageApp.wiki.moveInfobox(); });
});

//
// Scripts triggered for specific Wiki pages
//

// All Articles: Populate data-table with the article list
velesSinglePageApp.addPageHook('All-Articles.wiki', 'load', function() {
        $.getJSON("wiki/pages/" + velesSinglePageApp.language + "/articles.json", function (data) {
            for (var i = data.length - 1; i >= 0; i--) {
                data[i]['link'] = '<a href="' + data[i]['url'] + '" class="wikilink">' + data[i]['title'] + '</a>';
            }

            $('#wiki-page-list-table').DataTable({
                "data": data,
                "columns": [
                    { "data": "link" },
                    { "data": "abstract" }
                ],
                "searching": false,
                "paging": false,
                "order": [[ 0, 'asc' ]]
            });
            window.setTimeout(function(){
                velesSinglePageApp.bindEvents();
            }, 1000);   // todo: the datatable's event 'draw' really fails here 
        });
});

