//Join darkside we have cookies.... DARKMODE!

 $(document).ready(function(){
     $('.toggle').click(function(){
     $('.toggle').toggleClass('active')
     $('body').toggleClass('night-mode')
 })
})

;(function (window, document, undefined) {
'use strict';
if (!('localStorage' in window)) return;
var nightMode = localStorage.getItem('gmtNightMode');
if (nightMode) {
    document.documentElement.className += ' night-mode';
}
})(window, document);


;(function (window, document, undefined) {

'use strict';

// Feature test
if (!('localStorage' in window)) return;

// Get the navigation menu
var nav = document.querySelector('#menu-primary');
if (!nav) return;

// Insert the night mode toggle
nav.innerHTML += '<div id="night-mode" class="toggle"></div>';

// Get our newly insert toggle
var nightMode = document.querySelector('#night-mode');
if (!nightMode) return;

// When clicked, toggle night mode on or off
nightMode.addEventListener('click', function (event) {
    document.documentElement.classList.toggle('night-mode');
    if ( document.documentElement.classList.contains('night-mode') ) {
        localStorage.setItem('gmtNightMode', true);
        return;
    }
    localStorage.removeItem('gmtNightMode');
}, false);

})(window, document);
