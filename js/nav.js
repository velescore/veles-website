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
        //

        // load the content if not cached, init the page scripts
        if (this.cachedPages.hasOwnProperty(page)) {
            $('#content-wrapper').html(this.cachedPages[page]);
            velesSinglePageApp.hideOverlay();
            velesSinglePageApp.hideMobileMenu();
            velesSinglePageApp.runPageHook('init');
            velesSinglePageApp.bindEvents();
        } else {
            $('#content-wrapper').load('./templates/' + page + '.html #content', null, function() {
                velesSinglePageApp.hideOverlay();
                velesSinglePageApp.hideMobileMenu();
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

        if (!this.eventsBound.hasOwnProperty('navbar-toggler') || !this.eventsBound['navbar-toggler']) {
            $('.navbar-collapse').on('show.bs.collapse', function () {
                velesSinglePageApp.showMobileMenu();
            });
            $('.navbar-collapse').on('hide.bs.collapse', function () {
                velesSinglePageApp.hideMobileMenu();
            });
            $('#mobile-follow-toggle').click(function(){
                if (velesSinglePageApp.isMobileSliderShown())
                    velesSinglePageApp.hideMobileSlider();
                else
                    velesSinglePageApp.showMobileSlider();
            })

            this.eventsBound['navbar-toggler'] = true;
        }

        // Click events on navigation links
        $('.nav-link').not('.dropdown-toggle').add('.navbar-brand').add('.dropdown-item')
            .add('.nav-vertical a').add('.breadcrumb-item a')
            .not('.nav-external-app').not('.spa').click(function(e) {
           e.preventDefault();
           velesSinglePageApp.go($(this).attr('href').replace(velesSinglePageApp.pageSuffix, ''));
        }).addClass('spa');
    },

    'hideOverlay': function(overlayName = null, fade = true, delay = 3000) {
        if (overlayName == null)
            overlayName = 'content-overlay';
        else
            overlayName += '-overlay';

        if (!this.isOverlayShown(overlayName))
            return;

        if (fade)
            $('#' + overlayName).fadeOut(delay);

        $('#content').addClass(overlayName + '-initial');
        $('#' + overlayName).addClass(overlayName + '-initial');
        
        window.setTimeout(function() {
            if (!fade)
                $('#' + overlayName).hide();

            $('#content').removeClass(overlayName + '-initial');
            $('#content').removeClass(overlayName);
            $('#' + overlayName).removeClass(overlayName + '-initial');
            $('body').removeClass('with-overlay');
        }, delay);
    },

    'showOverlay': function(overlayName = null, fade = true, delay = 3000) {
        if (overlayName == null)
            overlayName = 'content-overlay';
        else
            overlayName += '-overlay';

        if (this.isOverlayShown(overlayName))
            return;

        // some extra UI stuff
        this.hideMobileSlider();
        
        $('#' + overlayName).addClass(overlayName + '-initial');
        $('#content').addClass(overlayName + '-initial');
        $('#content').addClass(overlayName);

        if (fade)
            $('#' + overlayName).fadeIn(delay);
        else
            $('#' + overlayName).show();

        $('#' + overlayName).removeClass(overlayName + '-initial');
        $('#content').removeClass(overlayName + '-initial');
    },

    'isOverlayShown': function(overlayName) {
        return $('#' + overlayName).is(':visible');
    },

    'showMobileMenu': function() {
        this.showOverlay('mobile-menu', false, 2000);
        $('.navbar').addClass('mobile-menu');
    },

    'hideMobileMenu': function() {
        this.hideOverlay('mobile-menu', false, 100);
        $('.navbar').removeClass('mobile-menu');
    },

    'isMobileMenuShown': function() {
        return this.isOverlayShown('mobile-menu');
    },

    'showMobileSlider': function() {
        if (this.isMobileSliderShown())
            return;

        $('#mobile-follow-toggle').addClass('active');
        $('.footer-overlay').addClass('footer-panel-slide');
        $('#content').addClass('footer-panel-slide');
    },

    'hideMobileSlider': function() {
        if (!this.isMobileSliderShown())
            return;

        $('#mobile-follow-toggle').removeClass('active');
        $('.footer-overlay').removeClass('footer-panel-slide');
        $('#content').removeClass('footer-panel-slide');
    },

    'isMobileSliderShown': function() {
        return $('.footer-overlay').hasClass('footer-panel-slide');
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
    velesSinglePageApp.start();
});


