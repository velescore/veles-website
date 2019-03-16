document.write('\
    <!-- Bottom-most footer -->\
<footer class="page-footer font-small blue pt-4">\
    ' + /*<!-- Footer Links -->\
    <div class="container-fluid text-center text-md-left">\
      <div class="row">\
        <div class="col-md-6 mt-md-0 mt-3">\
          <!-- Content -->\
          <h5 class="text-uppercase">Veles Core</h5>\
          <p>\Here you can use rows and columns here to organize your footer content.</p>\
        </div>\
        <hr class="clearfix w-100 d-md-none pb-3">\
        <div class="col-md-3 mb-md-0 mb-3">\
            <!-- Links -->\
            <h5 class="text-uppercase">\Links</h5>\
            <ul class="list-unstyled">\
              <li>\
                <a href="#!">\Link 1</a>\
              </li>\
              <li>\
                <a href="#!">\Link 2</a>\
              </li>\
              <li>\
                <a href="#!">\Link 3</a>\
              </li>\
              <li>\
                <a href="#!">\Link 4</a>\
              </li>\
            </ul>\
          </div>\
          <!-- Grid column -->\
          <!-- Grid column -->\
          <div class="col-md-3 mb-md-0 mb-3">\
            <!-- Links -->\
            <h5 class="text-uppercase">\Links</h5>\
            <ul class="list-unstyled">\
              <li>\
                <a href="#!">\Link 1</a>\
              </li>\
              <li>\
                <a href="#!">\Link 2</a>\
              </li>\
              <li>\
                <a href="#!">\Link 3</a>\
              </li>\
              <li>\
                <a href="#!">\Link 4</a>\
              </li>\
            </ul>\
          </div>\
          <!-- Grid column -->\
      </div>\
    </div>\
    <!-- Footer Links -->\
    */'\
    <!-- Copyright -->\
    <div class="footer-copyright text-center py-3">\© Copyright 2018-'
        + Math.min(2019, (new Date()).getFullYear()) + ' The Veles Core developers\
    </div>\
    <!-- Copyright -->\
    <br /><br />\
  </footer>\
    <!-- Overlay footer -->\
    <div class="footer-overlay">\
        <div class="row">\
            <div class="col-md-3 text-left">\
                <ul class="footer-follow">\
                    <a target="_blank" rel="noopener noreferrer" href="https://bitcointalk.org/index.php?topic=5064523">\
                        <p class="fab fa-bitcoin"></p>\
                    </a>\
                    <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/velescore"><i class="fab fa-twitter"></i></a>\
                    <a target="_blank" rel="noopener noreferrer" href="https://github/velescore/veles"><i class="fab fa-github"></i></a>\
                    <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/P528fGg"><i class="fab fa-discord"></i></a>\
                </ul>\
            </div>\
            <div class="col-md-3 text-left">\
                \
            </div>\
            <div class="col-md-6 text-right footer-labels">\
                <div class="websocket-online-animate" style="display: none;">\
                    Masternodes: \
                    <b><span class="masternodes-enabled-count"></span></b> / <span class="masternodes-count"></span>\
                    <span class="footer-separator" style="margin: 0 10px 0 10px">|</span>\
                    Blocks: \
                    <b><span class="chain-tip-height">...</span></b>\
                    <span class="connection-status-area" style="display: none;">\
                        <span class="footer-separator" style="margin: 0 10px 0 10px">|</span>\
                        Peers: \
                        <b><span class="node-connections-count">...</span></b>\
                        <span class="footer-separator" style="margin: 0 10px 0 10px">|</span>\
                        Visitors: \
                        <b><span class="website-connections-count">...</span></b>\
                    </span>\
                    <span class="websocket-status" title="Websocket connected" style="color: #bfa; font-size: 20px; cursor: pointer;">✔</span>️\
                </div>\
                <div class="websocket-offline-animate">\
                    <span class="fa fa-spinner fa-spin websocket-offline websocket-status" title="Websocket disconnected" style="color: #eee;"></span>\
                </div>\
            </div>\
    </div><!-- end footer -->\
');
