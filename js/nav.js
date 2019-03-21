var navExplorerUrl = 'http://35.240.96.108:88';

document.write('<nav class="navbar fixed-top navbar-expand-lg navbar-darker bg-darker fixed-top">\
                    <div class="container">\
            <a class="navbar-brand" href="index.html">\
            <img id="icon" src="images/veles.ico">\
            Veles</a>\
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">\
                <span class="navbar-toggler-icon">\
                <i class="fas fa-bars"></i>\
                </span>\
            </button>\
            <div class="collapse navbar-collapse" id="navbarResponsive">\
                <ul class="navbar-nav ml-auto">\
                    <li class="nav-item">\
                        <a class="nav-link"  href="about.html">About</a>\
                    </li>\
                    <li class="nav-item">\
                        <a class="nav-link"  href="download.html">Download</a>\
                    </li>\
                    <li class="nav-item">\
                        <a class="nav-link"  href="roadmap.html">Roadmap</a>\
                    </li>\
                    <li class="nav-item dropdown">\
                        <a class="nav-link dropdown-toggle" href="resources.html" id="navbarDropdownBlog" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                     Resources\
                     </a>\
                         <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">\
                             <a class="dropdown-item" href="faq.html">FAQ</a>\
                             <a class="dropdown-item" href="wiki.html">Wiki</a>\
                             <a class="dropdown-item" href="coin-specs.html">Coin-specs</a>\
                             <a class="dropdown-item" href="mining-pools.html">Mining-pools</a>\
                             <a class="dropdown-item" href="services.html">External-services</a>\
                             <a class="dropdown-item" href="community.html">Community-milestones</a>\
                         </div>\
                    </li>\
                    <li class="nav-item dropdown">\
                        <a class="nav-link dropdown-toggle" href="resources.html" id="navbarDropdownBlog" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                     Explorer\
                     </a>\
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">\
                            <a class="dropdown-item" href="' + navExplorerUrl + '/">Search</a>\
                            <a class="dropdown-item" href="' + navExplorerUrl + '/movement">Movements</a>\
                            <a class="dropdown-item" href="' + navExplorerUrl + '/network">Network</a>\
                            <a class="dropdown-item" href="' + navExplorerUrl + '/richlist">Richlist</a>\
                            <a class="dropdown-item" href="' + navExplorerUrl + '/masternodes">Masternodes</a>\
                            <a class="dropdown-item" href="' + navExplorerUrl + '/coininfo">Coin-info</a>\
                            <a class="dropdown-item" href="' + navExplorerUrl + '/mining-stats">Mining-stats</a>\
                            <a class="dropdown-item" href="' + navExplorerUrl + '/api">Api</a>\
                        </div>\
                    </li>\
                    <li class="nav-item">\
                        <a class="nav-link" href="contact.html">Contact</a>\
                    </li>\
            </div>\
            </ul>\
        </div>\
        </div>\
    </nav>\
    ');

/* Mark current page's tab as active (if found in main nav) */
$(document).ready(function() {
    var navCurrentPage = $(window.location.pathname.split('/')).get(-1);
    $('a[href$="' + navCurrentPage + '"]').parent('li').addClass('active');

    // little hack for main page when called as / and not on explorer
    if ((navCurrentPage.indexOf('.html') == -1 && window.location.pathname.indexOf(navExplorerUrl) == -1)
        || navCurrentPage == 'index.html')
        $('a.navbar-brand').addClass('active');
});


/* nightmode toogle
        <li>\
            <div id="menu-primary"></div>\
        </li>\
*/
/* explorer
<li class="nav-item dropdown">\
    <a class="nav-link dropdown-toggle" href="resources.html" id="navbarDropdownBlog" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
 Explorer\
 </a>\
    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">\
        <a class="dropdown-item" href="http://explorer.network">Search</a>\
        <a class="dropdown-item" href="http://explorer.network/movement">Movements</a>\
        <a class="dropdown-item" href="http://explorer.network/network">Network</a>\
        <a class="dropdown-item" href="http://explorer.network/richlist">Richlist</a>\
        <a class="dropdown-item" href="http://explorer.network/masternodes">Masternodes</a>\
        <a class="dropdown-item" href="http://explorer.network/coininfo">Coin-info</a>\
        <a class="dropdown-item" href="http://explorer.network/mining-stats">Mining-stats</a>\
        <a class="dropdown-item" href="http://explorer.network/api">Api</a>\
    </div>\
</li>\
*/
