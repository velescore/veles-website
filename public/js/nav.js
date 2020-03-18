var velesSinglePageApp = {
	'frontendVersion': '1.10.0',
	'walletVersion': '0.18.1.2',	// default to be overriden by value from WS
	'currentPage': null,
	'language': 'en',
	'defaultLanguage': 'en',
	'pageSuffix': '.html',
	'pageHooks': {},
	'cachedPages': {'en': {}, 'zh': {}, 'es':{}, 'tc':{}},
	'eventsBound': {},
	'menuTreeIndex': {},
	'menuTreePages': [],
	'menuTemplates': {},
	'sidebarPadContent': 0,
	'$window': null,
	'$animationElements': null,
	'inViewThresholdPx': 75,
	'scrollMinStep': 50,
	'scrollLastPos': 0,
	'parallaxBottom': null,
	'jsonPreloadConfig': [
		{'id': 'wiki/pages.json', 'url': 'wiki/pages/{language}/pages.json'},
		{'id': 'news/pages.json', 'url': 'news/pages/{language}/pages.json'},
		{'id': 'news/recentArticles.json', 'url': 'news/pages/{language}/recentArticles.json'}
	],
	'jsonPreload': {},
	'debugMode': false, 

	'go': function(page) {
		if (!page)	// prevent error if wrong link/element's event gets bound with this method 
			return;

		this.debug('app.go(' + page + ')', 'nav');

		var pageHash = null;
		var pageLanguage = self.language;
		var pageType = null;
		var pageNameParts = page.split('.');

		// parse "extensions" separated by dots in page's name
		if (pageNameParts.length > 1)
			pageLanguage = pageNameParts.pop();	// pop language part

		if (pageNameParts.length > 1)
			pageType = pageNameParts[pageNameParts.length - 1];	// don't pop, keep in page's name

		page = pageNameParts.join('.');

		// check for supported languages
		if (!this.cachedPages.hasOwnProperty(pageLanguage)) {
			pageLanguage = this.defaultLanguage;
		}

		// pages with hash just to scroll to target anrchor
		if (page.indexOf('#') != -1) {
			pageHash = '#' + page.split('#')[1];
			page = page.split('#')[0];
		}

		//} else if (window.location.hash)
		//    pageHash = window.location.hash;

		if (page == '')
			page = (this.currentPage) ? this.currentPage : 'index';

		// just scroll to top if its the same page in the same language
		if ((this.currentPage == page && this.language == pageLanguage) || page == '') {
			if (pageHash && $(pageHash).length) {
				$('html, body').animate({ scrollTop: ($(pageHash).offset().top - 60) }, 50);
			} else {
				window.scrollTo(0,0);
			}
			return;
		}

		// cache the previous HTML, remove classname that marks the events has been bound,
		// as we'll need to restore them again after loading from cache.
		$('#content-wrapper').find('.spa').removeClass('spa');
		this.cachedPages[this.language][this.currentPage] = $('#content-wrapper').html();

		// run hook to signal that we're leaving current page, to stop scripts etc.
		velesSinglePageApp.runPageHook('exit', this.currentPage); // do the same if pageType changes once needed

		// change the current page pointers and links
		this.currentPage = page;
		this.setActive(page);

		// change the current language according to the page address
		this.language = pageLanguage;

		// change browser's url filed
		if (history.pushState) {
			window.history.pushState(
				{'currentPage': page},
				this.getTitle(),
				"./" + page + '.' + this.language + this.pageSuffix
				);
		} else {
			document.location.href = "./" + page + '.' + this.language + this.pageSuffix;
		}

		// close the menu if open, same for sidebar
		$('div.navbar-collapse').removeClass('show');
		$('div.navbar-collapse').addClass('hide');
		velesSinglePageApp.sidebarCollapse(true);
		
		// clear recent errors if any
		velesSinglePageApp.clearError();

		// load the content if not cached, init the page scripts
		if (this.cachedPages[this.language].hasOwnProperty(page)) {
			$('#content-wrapper').html(this.cachedPages[this.language][page]);
			if (velesSinglePageApp.isJsonPreloaded())
				velesSinglePageApp.runPageHook('jsonPreload');

			velesSinglePageApp.hideOverlay();
			velesSinglePageApp.hideMobileMenu();
			velesSinglePageApp.runPageHook('init', page, pageType);
			velesSinglePageApp.rebuildPageMenu(page, true);
			velesSinglePageApp.updateTemplate();
			velesSinglePageApp.initPageAnimations();
			velesSinglePageApp.bindEvents();
			velesChain.replayEvents();
		} else {
			var pageSource = './pages/';

			if (pageType == 'wiki')
				pageSource = './wiki/pages/';

			if (pageType == 'news')
				pageSource = './news/pages/';

			$('#content-wrapper').load(pageSource + this.language + '/' + pageNameParts[0] + '.html' + ' #content', null, function(response, status, xhr) {
				if (velesSinglePageApp.isJsonPreloaded())
					velesSinglePageApp.runPageHook('jsonPreload');

				velesSinglePageApp.runPageHook('load', page, pageType);
				velesSinglePageApp.hideOverlay();
				velesSinglePageApp.hideMobileMenu();
				velesSinglePageApp.runPageHook('init', page, pageType);
				velesSinglePageApp.rebuildPageMenu(page, false);
				velesSinglePageApp.updateTemplate();
				velesSinglePageApp.autoAddIds();
				velesSinglePageApp.initPageAnimations();
				velesSinglePageApp.bindEvents();
				velesChain.replayEvents();

				if (status == 'error') {
					velesSinglePageApp.sidebarCollapse();
					velesSinglePageApp.hideOverlay();
					velesSinglePageApp.hideMobileMenu();
					velesSinglePageApp.hideMobileSlider();
					velesSinglePageApp.showError(xhr.status, xhr.statusText);
				}
			});
		}

		// just start scrolling to the top
		if (pageHash && $(pageHash).length)
			$('html, body').animate({ scrollTop: ($(pageHash).offset().top - 60) }, 50);
		else
			window.scrollTo(0,0);
	},

	'showError': function(code, title) {
		$('#error-wrapper .error-code').text(code);
		$('#error-wrapper .error-title').text(title);
		$('#error-wrapper .error-page').text(this.currentPage);
		$('#error-wrapper .error-message').hide();	// first hide all the messages
		$('[data-error-id="' + code + '"]').show();	// show appropriate description if available
		$('#content').hide();						// hide the page content and show the error
		$('#error-wrapper').show();
		// show sidebar too
		velesSinglePageApp.sidebarExpand();
	},

	'clearError': function() {
		$('#content').show();
		$('#error-wrapper').hide();
	},

	'autoAddIds': function() {
		$('h2').add('h3').each(function(i){
			if (!$(this).parents('.row').length)
				return;

			if (!$(this).parents('.row').eq(0).attr('id')) {
				$(this).parents('.row').eq(0).attr('id', $(this).text()
					.toLowerCase().replace(': ', '').replace(' ', '-')
					.trim());
			}
		});
		$('h4').each(function(i){
			if (!$(this).parents('div.card').length)
				return;

			if (!$(this).parents('div.card').eq(0).attr('id')) {
				$(this).parents('div.card').eq(0).attr('id', $(this).text()
					.toLowerCase().replace(': ', '').replace(' ', '-')
					.trim());
			}
		});
	},

	'updateTemplate': function() {
		if (this.menuTemplates.hasOwnProperty(velesSinglePageApp.currentPage)) {
			$('[data-id="page.title"]').text(velesSinglePageApp.menuTreeIndex[velesSinglePageApp.currentPage].title);
			$('[data-id="page.url"]').text(velesSinglePageApp.menuTreeIndex[velesSinglePageApp.currentPage].title);
		}
	},

	'addPageHook': function(pageName, hookName, callback) {
		if (!pageName)
			pageName = '*';

		if (!this.pageHooks.hasOwnProperty(pageName))
			this.pageHooks[pageName] = {}

		if (!this.pageHooks[pageName].hasOwnProperty(hookName))
			this.pageHooks[pageName][hookName] = []

		this.pageHooks[pageName][hookName].push(callback);
	},

	'addCategoryHook': function(hookName, catName, callback) {
		this.addPageHook('.' + catName, hookName, callback);
	},

	'addHook': function(hookName, callback) {
		this.addPageHook(null, hookName, callback);
	},

	'runPageHook': function(hookName, pageName = null, pageType = null) {
		// if no specific page given, use the current one
		if (pageName == null)
			pageName = this.currentPage;

		// run hooks for a specific page, eg. index
		if (this.pageHooks.hasOwnProperty(pageName) && this.pageHooks[pageName].hasOwnProperty(hookName))
			for (var i = 0; i < this.pageHooks[pageName][hookName].length; i++) {
				this.pageHooks[pageName][hookName][i]();
			}

		// run hooks for certain page types, defined in the index by dot 
		if (pageType && (this.pageHooks.hasOwnProperty('.' + pageType) && this.pageHooks['.' + pageType].hasOwnProperty(hookName)))
			for (var i = 0; i < this.pageHooks['.' + pageType][hookName].length; i++) {
				this.pageHooks['.' + pageType][hookName][i]();
			}

		// and call listeners applicable for all pages
		if (this.pageHooks.hasOwnProperty('*') && this.pageHooks['*'].hasOwnProperty(hookName))
			for (var i = 0; i < this.pageHooks['*'][hookName].length; i++) {
				this.pageHooks['*'][hookName][i]();
			}
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

	'detectCurrentPageAddr': function() {
		var filename = $(window.location.pathname.split('/')).get(-1);
		var page = (filename) ? filename.replace('.html', '') : 'index.en';

		return page;
	},

	'getAddrPageName': function(page) {
		return (page.indexOf('.') != -1) ? page.split('.')[0] : page;
	},

	'getAddrPageLanguage': function(page) {
		return (page.indexOf('.') != -1) ? $(page.split('.')).get(-1) : this.defaultLanguage;
	},

	'getTitle': function(page = null) {
		// todo: load titles from JSON or parse from loaded content
		return $('title').text();
	},

	'isTouchDevice': function() {
		var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
		
		var mq = function (query) {
			return window.matchMedia(query).matches;
		}

		if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
			return true;
		}

		// include the 'heartz' as a way to have a non matching MQ to help terminate the join
		// https://git.io/vznFH
		var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
		return mq(query);
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

		if (!this.eventsBound.hasOwnProperty('scroll') || !this.eventsBound['scroll']) {
			$(window).bind('scroll resize', velesSinglePageApp.trackInView);
			this.eventsBound['scroll'] = true;
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

			$('.overlay-shadow').add('.navbar-brand').click(function(){
				velesSinglePageApp.hideMobileMenu();
			});
/*
			$('body').resize(function(){
				if ($('.sidebar').hasClass('sidebar-expand'))
					velesSinglePageApp.sidebarResizePage();
			});
*/

			this.eventsBound['navbar-toggler'] = true;
		}

		// Click events on navigation links
		$('.nav-link').not('.dropdown-toggle')
			.add('.navbar-brand')
			.add('.dropdown-item')
			.add('.nav-vertical a')
			.add('.breadcrumb-item a')
			.add('.sidebar a')
			.add('a.nav-page')
			.add('a.wikilink')
			.add('a.applink')
			.not('.bootstrap-autocomplete a')	// just in case
			.not('.nav-external-app')
			.not('.spa').click(function(e) {
		   e.preventDefault();
		   velesSinglePageApp.go($(this).attr('href').replace(velesSinglePageApp.pageSuffix, ''));
		}).addClass('spa');

		if (!velesSinglePageApp.eventsBound.hasOwnProperty('search-sidebar-hook') 
			|| !velesSinglePageApp.eventsBound['search-sidebar-hook']) {

			// seach icon and sidebar behaviour, it depents whether we have a mouse with
			// hover capabilities, or just a touch device
			if (velesSinglePageApp.isTouchDevice() || $('body').width() < 768) {
				$('.nav-search-icon').on('click', function () {	        	
					if ($('.sidebar').hasClass('expand-temporary'))
						velesSinglePageApp.sidebarCollapse(true);
					else
						velesSinglePageApp.sidebarExpand(true);
				});
			} else {
				$('.sidebar').add('.nav-search-icon').on('mouseover', function () {
					velesSinglePageApp.sidebarExpand(true);
				});
				$('.sidebar').on('mouseout', function () {
					velesSinglePageApp.sidebarCollapse(true);
				});
			}


			// fix if we want to avoid the menu with the mouse
			$('.navbar-brand').on('mouseout', function() {
				$('.sidebar').mouseout();
			});

			velesSinglePageApp.eventsBound['search-sidebar-hook'] = true;
		}
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
		$('#navbarResponsive').removeClass('show');	// needed when manually closing by clicking elsewhere
		$('#content').removeClass('mobile-menu-overlay');
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

	'buildMenus': function() {
		this.menuTreeIndex = {};
		this.menuTemplates = {
			'navbar': this.extractTemplates(),
			'sidebar': this.extractTemplates('.sidebar')
		};

		this.buildMenuLevel(menuTree, $('#navbarResponsive ul.nav-menu'), this.menuTemplates['navbar']);
		//this.buildMenuLevel(menuTree, $('.sidebar ul'), this.menuTemplates['sidebar']);

		$('.navbar .template').removeClass('template');
	},

	'rebuildPageMenu': function(page, cachedPage = false) {
		// make sure page is in manutree index
		if (!this.menuTreeIndex.hasOwnProperty(page)){
			// auto-"index" pages with known parend according to their type
			if (page.indexOf('.') && this.menuTreeIndex.hasOwnProperty(page.split('.')[1])) {
				this.menuTreeIndex[page] = {
					'parent': page.split('.')[1]
				}
			} else {
				console.log('[Sidebar] Page tree not indexed: ' + page);
				return;
			}
		}

		// if it's not cached page, and has special items,  we need to wait till jsonPreload is done
		if ((this.menuTreeIndex[page].hasOwnProperty('itemsFromJsonID') 
				|| this.menuTreeIndex[page].parent && this.menuTreeIndex[this.menuTreeIndex[page].parent].hasOwnProperty('itemsFromJsonID')
				) && !cachedPage && !this.isJsonPreloaded()) {
			velesSinglePageApp.addHook('jsonPreload', function() {
				velesSinglePageApp.rebuildPageMenu(page, false);
				velesSinglePageApp.bindEvents(); 	// we need to bind menu items again
			});
			return;
		}

		// update language-selector menu to point to other language mutations
		// of the current page
		$('#languageSelectorBar').find('a').each(function(){
			// extract the previous lang
			var parts = $(this).attr('href').split('.'); 
			$(this).attr('href', page + '.' + $(parts).get(-2) + '.' + $(parts).get(-1)); 
		});

		// Rebuild sidebar
		$('.sidebar ul').html('');
		$('#sidebar-caption').text($('#sidebar-caption').attr('data-default'));	// set default caption

		// we need to check if us or our parent has special items from JSON data
		/*
		if (this.menuTreeIndex[page].hasOwnProperty('itemsFromJsonID') && !this.menuTreeIndex[page].hasOwnProperty('items')) {
			var subItems = this.jsonPreload[this.menuTreeIndex[page].itemsFromJsonID];

			for (var i = subItems.length - 1; i >= 0; i--) {
				subItems[i].parent = '1' + page;
			}

			this.menuTreeIndex[page].items = subItems;
		}
		*/
		if (this.menuTreeIndex[page].parent && this.menuTreeIndex[this.menuTreeIndex[page].parent].hasOwnProperty('itemsFromJsonID') && !this.menuTreeIndex[this.menuTreeIndex[page].parent].hasOwnProperty('items')) {
			var subItems = this.jsonPreload[this.menuTreeIndex[this.menuTreeIndex[page].parent].itemsFromJsonID];

			for (var i = subItems.length - 1; i >= 0; i--) {
				subItems[i].parent = this.menuTreeIndex[page].parent;
			}

			this.menuTreeIndex[this.menuTreeIndex[page].parent].items = subItems;
		}

		if (this.menuTreeIndex[page].hasOwnProperty('sections')) {
			this.buildMenuLevel(
				this.menuTreeIndex[page].sections,
				$('.sidebar ul'),
				this.menuTemplates['sidebar'],
				page,
				isSectionLinks = true
			);
			if (this.menuTreeIndex[page].hasOwnProperty('sidebarCaption'))
				$('#sidebar-caption').text(this.menuTreeIndex[page].sidebarCaption);

			this.sidebarCollapse();

		} else if (this.menuTreeIndex[page].hasOwnProperty('items')) {
			this.buildMenuLevel(
				this.menuTreeIndex[page].items,
				$('.sidebar ul'),
				this.menuTemplates['sidebar'],
				page
			);
			if (this.menuTreeIndex[page].hasOwnProperty('sidebarCaption'))
				$('#sidebar-caption').text(this.menuTreeIndex[page].sidebarCaption);
			else
				$('#sidebar-caption').text(this.menuTreeIndex[page].title);	// page's name as sidebar title
			this.sidebarCollapse();

		} else if (this.menuTreeIndex[page].parent && this.menuTreeIndex[this.menuTreeIndex[page].parent].hasOwnProperty('items')) {
			this.buildMenuLevel(
				this.menuTreeIndex[this.menuTreeIndex[page].parent].items,
				$('.sidebar ul'),
				this.menuTemplates['sidebar'],
				this.menuTreeIndex[page].parent
			);
			if (this.menuTreeIndex[this.menuTreeIndex[page].parent].hasOwnProperty('sidebarCaption'))
				$('#sidebar-caption').text(this.menuTreeIndex[this.menuTreeIndex[page].parent].sidebarCaption);
			else
				$('#sidebar-caption').text(this.menuTreeIndex[this.menuTreeIndex[page].parent].title);

			// expand sidebar when parent is menu, on larger screens
			this.sidebarExpand();

		} else {
			this.sidebarCollapse();
		}

		//if (!cachedPage)
		//this.sidebarResizePage();
	},

	'extractTemplates': function(context = null) {
		var menuTemplates = {};

		if (!context) {
			menuTemplates['subMenuItem'] = $('.dropdown-item.template')[0].outerHTML;
			$('.dropdown-item.template').remove();

			menuTemplates['menuDropdown'] = $('.nav-item.dropdown.template')[0].outerHTML;
			$('.nav-item.dropdown.template').remove();

			menuTemplates['menuItem'] = $('.nav-item.template')[0].outerHTML;
			$('.nav-item.template').remove();

		} else {
			menuTemplates['subMenuItem'] = $(context).find('.submenu-item.template')[0].outerHTML;
			$('.submenu-item.template').remove();

			menuTemplates['menuDropdown'] = $(context).find('.menu-item.submenu.template')[0].outerHTML;
			$('.menu-item.submenu.template').remove();

			menuTemplates['menuItem'] = $(context).find('.menu-item.template')[0].outerHTML;
			$('.menu-item.template').remove();
		}

		return menuTemplates;
	},

	'sidebarExpand': function(temporary = false) {
		if (temporary || ($('body').width() > 990 && !this.isTouchDevice())) {	// dont expand pernamently if on mobile
			if (!$('.sidebar').hasClass('sidebar-expand')) {
				$('.sidebar').addClass('sidebar-expand');
				// always hide search icon when sidebar is expanded on non-touch devices
				if (!velesSinglePageApp.isTouchDevice() && $('body').width() >= 768)
					$('.nav-search-icon').addClass('hide-search-icon');

				// flag that it only needs to be expanded temporarily
				if (temporary) {
					$('.sidebar').addClass('expand-temporary');

				// when expanded pernamently
				} else {
					$('.sidebar').removeClass('expand-temporary');
					// mark the parts affected by the sidebar position if expanded pernamently 
					$('.sidebar-aligned').addClass('sidebar-expand');
				}
			}
		}
	},

	'sidebarCollapse': function(temporary = false) {
		if (!temporary || $('.sidebar').hasClass('expand-temporary')) {
			$('.sidebar').removeClass('sidebar-expand');
			$('.nav-search-icon').removeClass('hide-search-icon');

			if (!temporary)
				$('.sidebar-aligned').removeClass('sidebar-expand');
		}
		$('.sidebar').removeClass('expand-temporary');
	},

/*
	// to be removed after tests
	'sidebarResizePage': function() {
		if ($('.sidebar').hasClass('sidebar-expand')) {
			if ($('body').width() > 990) {
				$('#content').css('padding-left', 0);
				$('#error-wrapper').css('padding-left', 0);

				this.sidebarPadContent = (($('body').width() * 0.2) + 50 - (($('body').width()-$('#content').width()) / 2));

				if ((($('body').width()-$('#content').width()) / 2) < ($('body').width() * 0.2)) {
					$('#content').css('padding-left', this.sidebarPadContent+'px');
					$('#error-wrapper').css('padding-left', this.sidebarPadContent+'px');
				} else {
					$('#content-wrapper').css('padding-left', 'unset');
				}
			}
		} else {
			$('#content').css('padding-left', 'unset');
		}
	},
*/
	'buildMenuLevel': function(tree, $parent, templates, parentPage = null, isSectionLinks = false) {
		var prevPage = null;
		var url = null;

		for (var i = 0; i < tree.length; i++) {
			if (!tree[i].hasOwnProperty('hideFromNav') && !tree[i].hideFromNav) {
				if (!tree[i].hasOwnProperty('page'))
					tree[i].page = tree[i].title.toLowerCase().replace(' ', '-');

				url = (isSectionLinks)
					? '#' +  tree[i].page
					: tree[i].page + '.' + this.language + this.pageSuffix;

				var hackH = false;

				if(typeof tree[i].url !== "undefined") {
					url = tree[i].url;
					hackH = true;
				}
				if (tree[i].hasOwnProperty('items')) {
					var $item = $(templates['menuDropdown']
						.replace('{{item.title}}', tree[i].title)
						.replace('{{item.url}}', url)
						.replace('{{item.page}}', tree[i].page).replace('{{item.page}}', tree[i].page)
						.replace('class="', (hackH ? 'class="nav-external-app ' : 'class="'))
						);

					$subMenu = $lastItem = $item.appendTo($parent).find('div');
					this.buildMenuLevel(tree[i].items, $subMenu, templates, tree[i].page);

				} else {
					var item = ((parentPage) ? templates['subMenuItem'] : templates['menuItem'])
						.replace('{{item.title}}', tree[i].title)
						.replace('{{item.url}}', url)
						.replace('class="', (hackH ? 'class="nav-external-app ' : 'class="'));

					$lastItem = $parent.append(item);
				}
				if(typeof tree[i].url !== "undefined")
					$lastItem.addClass('external-rul');
			}

			// Index into the smarter structures
			if (!this.menuTreeIndex.hasOwnProperty(tree[i].page)) {
				this.menuTreeIndex[tree[i].page] = tree[i];
				this.menuTreeIndex[tree[i].page].next = null;
				this.menuTreeIndex[tree[i].page].prev = null;
				this.menuTreeIndex[tree[i].page].parent = parentPage;

				if (prevPage) {
					this.menuTreeIndex[prevPage].next = tree[i].page;
					this.menuTreeIndex[tree[i].page].prev = prevPage;
				}
				prevPage = tree[i].page;

				// Same for the page index used by autocomplete,
				// skip pages that belong to category as those are indexed
				// separetely (pages with category have dots in the name).
				// Also skip categories themselves, without page.
				if (tree[i].page.indexOf('.') == -1 && !tree[i].hasOwnProperty('items'))
					this.menuTreePages.push({'page': tree[i].page, 'title': tree[i].title});
			}
		}
	},

	'initPageAnimations': function() {
		this.$animationElements = $('.track-in-view');
		this.$animationElements.removeClass('in-view');
		this.$animationElements.removeClass('was-in-view');

		if (!this.$window)
			this.$window = $(window)

		this.trackInView(false); /* do the first run before rist scroll */
	},

	'trackInView': function(throttle = true) {

		if (velesSinglePageApp.$window.outerWidth() < 800) {
			velesSinglePageApp.$animationElements.addClass('was-in-view');
			return;
		}

		var window_top_position = velesSinglePageApp.$window.scrollTop();

		// index parallax
		if (velesSinglePageApp.currentPage == 'index') {
			if (velesSinglePageApp.parallaxBottom == null) {
				var $parallax = $('.parallax-content');
				velesSinglePageApp.parallaxBottom = $parallax.offset().top + $parallax.outerHeight();
			}
			var parallax_scroll = window_top_position - velesSinglePageApp.parallaxBottom;

			if (parallax_scroll < 0) {
				var margin_top = $('.parallax-content').css('margin-top').replace('px', '');
				var parallax_offset = parallax_scroll / (velesSinglePageApp.parallaxBottom / 300);
				$('.parallax-content').css('margin-top', parallax_offset + 'px');
				$('.parallax-content2').css('margin-top', (parallax_offset / 2) + 'px');
			}
		}

		// throttle by steps in px
		if (velesSinglePageApp.scrollLastPos - window_top_position > velesSinglePageApp.scrollMinStep
				|| window_top_position - velesSinglePageApp.scrollLastPos > velesSinglePageApp.scrollMinStep
				|| !throttle) {
			velesSinglePageApp.scrollLastPos = window_top_position;

			var window_height = velesSinglePageApp.$window.height();
			var window_bottom_position = (window_top_position + window_height);

			$.each(velesSinglePageApp.$animationElements, function() {
				var $element = $(this);
				var element_height = $element.outerHeight();
				var element_top_padding = parseInt($element.css('padding-top'));
				var element_bottom_padding = parseInt($element.css('padding-bottom'));
				var element_top_position = $element.offset().top + element_top_padding;
				var element_bottom_position = $element.offset().top + element_height - element_bottom_padding;

				//check to see if this current container is within viewport
				//if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)
				if ((element_bottom_position >= window_top_position)
				  && (element_top_position <= window_bottom_position - velesSinglePageApp.inViewThresholdPx)) {
					if (!$element.hasClass('in-view')) {
						$element.addClass('in-view');
						$element.addClass('was-in-view');;
						velesSinglePageApp.debug('Went in view: ' + $element.attr('id') + ' - eh: ' + element_height
							+ ' etp: ' + element_top_position + ' ebp: ' + element_bottom_position
							+ ' wh: ' + window_height + ' wtp: ' + window_top_position + ' wbp: ' + window_bottom_position, 'animation');
					}
				} else {
					$element.removeClass('in-view');
				}
			});
		}
	},

	'isJsonPreloaded': function() {
		return (Object.keys(this.jsonPreload).length > 0);
	},

	'preloadJsonFiles': function() {
		if (this.isJsonPreloaded()) {
			console.log('JSON already preloaded');
			return;	// already called
		}

		var sharedResults = {}
		
		for (var i = this.jsonPreloadConfig.length - 1; i >= 0; i--) {
			item = this.jsonPreloadConfig[i];
		
			$.ajax({
				url: item.url.replace('{language}', this.language),
				context: {'id': item.id, 'index': i, 'results': sharedResults},	// ensure passing by reference
				success: function (data) {
					this.results[this.id] = data;

					if (this.index === 0) {	// save when fully loaded
						velesSinglePageApp.jsonPreload = this.results;;
						velesSinglePageApp.runPageHook('jsonPreload');
					}
				},
			});
		}
	},

	'initSearchAutocomplete': function() {
		// Set-up autocomplete
		var doSetup = function() {
			$('.searchAutoComplete').autoComplete({
				'minLength': 1,
				'autoSelect': true,
				'resolver': 'custom',
				'events': {
					'search': function(qry, callback, origJQElement) {
						var queryResult = [];
						var lastAdded = -1;
						var searchable = [
							{'category': 'wiki', 'items': velesSinglePageApp.jsonPreload['wiki/pages.json']},
							{'category': 'news', 'items': velesSinglePageApp.jsonPreload['news/pages.json']},
							{'category': 'web', 'items': velesSinglePageApp.menuTreePages},
							];

						for (var h = 0; h < searchable.length; h++) {	
							for (var i = searchable[h].items.length - 1; i >= 0; i--) {
								var item = searchable[h].items[i];
								var words = item['title'].toLowerCase().split(' ');

								// search every word of the item
								for (var j = words.length - 1; j >= 0; j--) {
									if (words[j].substring(0, qry.length) == qry.toLowerCase()) {
										queryResult.push({
											'value': item['page'], 
											'text': item['title'],
											'category': searchable[h].category
										});
									}
								}
							}
						}
						callback(queryResult);
					}
				},
				/* // will be used for badges, currenty bootstrap autocomplete has a sort of issue with highlighting 
				formatResult: function (item) {
					return {
						value: item.id,
						text: "[" + item.id + "] " + item.text,
						html: [
								item.text,
								$('<span>').addClass('categoryLabel').addClass(item.category).text(item.category)
							] 
					};
				},
				*/
			});
			velesSinglePageApp.bindSearchEvents();
		};

		if (this.isJsonPreloaded())
			doSetup();
		else 
			this.addHook('jsonPreload', doSetup);
	},

	'bindSearchEvents': function() {
		// Bind events
		if (!this.eventsBound.hasOwnProperty('search-autocomplete') || !this.eventsBound['search-autocomplete']) {
			$('.searchAutoComplete').focusin(function(){
				$('.sidebar').addClass('menu-disabled');
			});
			$('.searchAutoComplete').focusout(function(){
				$('.sidebar').removeClass('menu-disabled');
			});
			$('.searchAutoComplete').on('autocomplete.select', function(el,item) {
				// Got to the selected wiki page
				if (item.value != velesSinglePageApp.currentPage) {
					$('.searchAutoComplete').val('loading ...');
					velesSinglePageApp.addHook('init', function() { $('.searchAutoComplete').val(''); });
					window.setTimeout(function() { $('.searchAutoComplete').val('') }, 5000);	// just in case something goes very wrong ... 
					velesSinglePageApp.go(item.value + '.' + velesSinglePageApp.language);
				} else {
					$('.searchAutoComplete').val('[ The page is already open ]');
					window.setTimeout(function() { $('.searchAutoComplete').val('') }, 1000);
					window.scrollTo(0,0);
				}
			});
			this.eventsBound['search-autocomplete'] = true;
		}
	},

	'start': function() {
		var pageAddr = this.detectCurrentPageAddr();
		this.language = this.getAddrPageLanguage(pageAddr);
		this.currentPage = 'index';

		this.printVersionInfo();

/*
		// Maintenance mode
		if (window.location.host == 'veles.network' || window.location.host == 'www.veles.network') {
			$('.stage').addClass('stage-enlarge');
			$('.face2').add('.face5').text('Website under maintenance');
			$('.face3').add('.face6').text('New content coming soon');
			$('.face4').add('.face1').text('Stay tuned');
			return;
		}
*/
		this.buildMenus();

		// only the index is pre-loaded
		if (this.getAddrPageName(pageAddr) == 'index') {
			this.setActive();
			this.rebuildPageMenu('index', false);
			this.updateTemplate();
			this.autoAddIds();
			this.runPageHook('init', 'index');
			this.hideOverlay();
			this.initPageAnimations();
			this.bindEvents();

			if (window.location.hash)
				$('html, body').animate({ scrollTop: ($(window.location.hash).offset().top - 60) },50);
		} else {
			this.go(pageAddr + window.location.hash);
		}

		// needs to be done only once
		this.preloadJsonFiles();
		this.initSearchAutocomplete();
	},

	/**
	 * Logs a debug message, eg. outputs to console if debug mode enabled
	 * @param  msg Debug log message
	 * @param  category Debug message category
	 */
	'debug': function(msg, category = 'nav') {
		if (this.debugMode == category)
			console.log('[' + category + ']' + msg);
	},

	'printVersionInfo': function() {
		console.log(
			"%cVeles Core Web %c " + this.frontendVersion + " %c " + this.walletVersion, 
			"background: #57BA35; color: white; padding: 3px 0px 3px 7px; border-radius:5px 0 0 5px; border-right: none;",
			"background: #fd7e14; color: white; padding: 3px 0; border-right: none;",
			"background: #6c757d; color: white; padding: 3px 7px 3px 0px; border-radius:0 5px 5px 0; border-right: none;"
			);
	}
}

/* Mark current page's tab as active (if found in main nav) */
$(document).ready(function() {
	velesSinglePageApp.start();
});
