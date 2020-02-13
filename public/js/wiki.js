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

// Uncomment to add some JS specific for every Wiki page
//velesSinglePageApp.addCategoryHook('init', 'wiki', function() {
//});

//
// Scripts triggered for specific Wiki pages
//
velesSinglePageApp.addPageHook('All-Pages.wiki', 'init', function() {
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
