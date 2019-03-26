var velesSinglePageApp = {
    'explorerUrl': 'http://35.240.96.108:88',
    'currentPage': null,
    'pageSuffix': '.html',
    'pageHooks': {},

    'go': function(page = 'index') {
        this.currentPage = page;
        this.setActive(page);

        // change browser's url filed
        if (history.pushState) {
            window.history.pushState({'currentPage': page}, this.getTitle(), "./" + page + this.pageSuffix);
        } else {
            document.location.href = "./" + page + this.pageSuffix;
        }

        // load the content, init the page scripts and hide the progress bar
        $('#content-wrapper').load('./' + page + '.html #content', null, function() {
            Pace.stop();
            velesSinglePageApp.runPageHook('init');
        });
    },

    'addPageHook': function(pageName, hookName, callback) {
        if (!this.pageHooks.hasOwnProperty(pageName))
            this.pageHooks[pageName] = {}

        this.pageHooks[pageName][hookName] = callback;
    },

    'runPageHook': function(hookName, pageName = null) {
        if (!pageName)
            pageName = this.currentPage;

        if (this.pageHooks.hasOwnProperty(pageName) && this.pageHooks[pageName].hasOwnProperty(hookName))
            this.pageHooks[pageName][hookName]();
    },

    'setActive': function(page = null) {
        if (!page)
            page = this.getCurrentPage();

        $('.nav-active').removeClass('nav-active'); // deactivate previously active tabs

        if (page == 'index')    // main index link is a special one
            $('a.navbar-brand').addClass('nav-active');
        
        else
            $('a[href$="' + page + this.pageSuffix + '"].nav-link').parent('li').addClass('nav-active');
    },

    'getCurrentPage': function() {
        if (this.currentPage)
            return this.currentPage;

        else {
            var filename = $(window.location.pathname.split('/')).get(-1);

            return (filename) ? filename.replace('.html', '') : 'index';
        }
    },

    'getTitle': function(page = null) {
        // todo: load titles from JSON or parse from loaded content
        return $('title').text();
    },

    'bindEvents': function() {
        var app = velesSinglePageApp;
        // History changed event
        $(window).bind('popstate', function(e) {
            if (e.originalEvent.state && e.originalEvent.state.hasOwnProperty('currentPage'))
                app.go(e.originalEvent.state.currentPage);
            else
                app.go();
        });

        // Click events on navigation links
        $('.nav-link').not('.dropdown-toggle').add('.navbar-brand').add('.dropdown-item').not('.nav-external-app').click(function(e) {
           e.preventDefault();
           app.go($(this).attr('href').replace(app.pageSuffix, ''));
        });
    },

    'start': function() {
        this.currentPage = this.getCurrentPage();
        this.setActive();
        this.bindEvents();
        this.runPageHook('init');
    }
}

/* Mark current page's tab as active (if found in main nav) */
$(document).ready(function() {
    velesSinglePageApp.start();

    /*
    var navCurrentPage = $(window.location.pathname.split('/')).get(-1);
    $('a[href$="' + navCurrentPage + '"].nav-link').parent('li').addClass('active');

    // little hack for main page when called as / and not on explorer
    if ((navCurrentPage.indexOf('.html') == -1 && window.location.pathname.indexOf(velesSinglePageApp.explorerUrl) == -1)
        || navCurrentPage == 'index.html')
        $('a.navbar-brand').addClass('active');
    */
});


