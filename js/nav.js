var velesSinglePageApp = {
    'explorerUrl': 'http://35.240.96.108:88',
    'currentPage': null,
    'pageSuffix': '.html',
    'pageHooks': {},
    'cachedPages': {},
    'eventsBound': {},

    'go': function(page = 'index') {
        // cache the previous HTML, index is always cached
        this.cachedPages[this.currentPage] = $('#content-wrapper').html();

        // change the current page pointers and links
        this.currentPage = page;
        this.setActive(page);

        // change browser's url filed
        if (history.pushState) {
            window.history.pushState({'currentPage': page}, this.getTitle(), "./" + page + this.pageSuffix);
        } else {
            document.location.href = "./" + page + this.pageSuffix;
        }

        // close the menu if open
        $('div.navbar-collapse').removeClass('show');
        $('div.navbar-collapse').addClass('hide');

        // load the content if not cached, init the page scripts
        if (this.cachedPages.hasOwnProperty(page)) {
            $('#content-wrapper').html(this.cachedPages[page]);
            velesSinglePageApp.hideOverlay();
            velesSinglePageApp.runPageHook('init');
            velesSinglePageApp.bindEvents();
        } else {
            $('#content-wrapper').load('./templates/' + page + '.html #content', null, function() {
                velesSinglePageApp.hideOverlay();
                velesSinglePageApp.runPageHook('init');
                velesSinglePageApp.bindEvents();
            }); 
        }

        // just start scrolling to the top
        window.scrollTo(0,0);
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
            page = this.currentPage;

        $('.nav-active').removeClass('nav-active'); // deactivate previously active tabs

        if (page == 'index')    // main index link is a special one
            $('a.navbar-brand').addClass('nav-active');
        
        else
            $('a[href$="' + page + this.pageSuffix + '"].nav-link').parent('li').addClass('nav-active');
    },

    'detectCurrentPage': function() {
        var filename = $(window.location.pathname.split('/')).get(-1);

        return (filename) ? filename.replace('.html', '') : 'index';
    },

    'getTitle': function(page = null) {
        // todo: load titles from JSON or parse from loaded content
        return $('title').text();
    },

    'bindEvents': function() {
        // History changed event
        if (!this.eventsBound.hasOwnProperty('popstate') || !this.eventsBound['popstate']) {
            $(window).bind('popstate', function(e) {
                if (e.originalEvent.state && e.originalEvent.state.hasOwnProperty('currentPage'))
                    velesSinglePageApp.go(e.originalEvent.state.currentPage);
                else
                    velesSinglePageApp.go();
            });
            this.eventsBound['popstate'] = true;
        }

        // Click events on navigation links
        $('.nav-link').not('.dropdown-toggle').add('.navbar-brand').add('.dropdown-item')
            .add('.nav-vertical a').add('.breadcrumb-item a')
            .not('.nav-external-app').not('.spa').click(function(e) {
           e.preventDefault();
           velesSinglePageApp.go($(this).attr('href').replace(velesSinglePageApp.pageSuffix, ''));
        }).addClass('spa');
    },

    'hideOverlay': function() {
        $('#content-overlay').fadeOut(3000);
        $('body').removeClass('with-overlay');
    },

    'start': function() {
        this.bindEvents();
        this.currentPage = 'index';

        // only the index is pre-loaded
        if (this.detectCurrentPage() == 'index') {
            this.setActive();
            this.runPageHook('init');
            this.hideOverlay();
        } else {
            this.go(this.detectCurrentPage());
        }
    }
}

/* Mark current page's tab as active (if found in main nav) */
$(document).ready(function() {
    window.scrollTo(0,0);
    velesSinglePageApp.start();
});


