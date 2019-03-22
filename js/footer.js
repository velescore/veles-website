document.write('\
<div class="container">\
<hr id="hr-footer">\
  <div class="tomottoWrap text-center" id="tomotto">\
    “In such seconds of decision entire futures are made.”\
― Dan Simmons, Hyperion\
  </div>\
</div>\
<br>\
<div class="container">\
<div class="lookWrap">\
 <div class="row">\
      <div id="look">\
        <div class="section col-md-3">\
          <h5>Website</h5>\
          <a href="/about.html">About</a>\
          <a href="/download.html">Download</a>\
          <a href="/faq.html">FAQ</a>\
          <a href="/wiki.html">WIKI</a>\
          <a href="/coin-specs.html">Coins-specs</a>\
          <a href="/services.html">External-services</a>\
        </div>\
        <div class="section col-md-3">\
          <h5>Explorer</h5>\
          <a href="http://35.240.96.108:88/">Search</a>\
          <a href="http://35.240.96.108:88/richlist">Richlist</a>\
          <a href="http://35.240.96.108:88/masternodes">Masternodes</a>\
          <a href="http://35.240.96.108:88/coininfo">Coin-info</a>\
          <a href="http://35.240.96.108:88/miningstats">Mining-stats</a>\
          <a href="http://35.240.96.108:88/info">Api</a>\
        </div>\
        <div class="section col-md-3">\
          <h5>Community</h5>\
          <a href="https://twitter.com/velescore">Twitter</a>\
          <a href="https://discord.gg/P528fGg">Discord</a>\
          <a href="https://steemit.com/@velescore/">Steemit</a>\
          <a href="https://bitcointalk.org/index.php?topic=5064523">Bitcointalk</a>\
          <a href="https://www.coingecko.com/en/coins/veles">Coingecko</a>\
          <a href="https://coinpaprika.com/coin/vls-veles/">Coinpaprika</a>\
          <a href="https://masternodecap.com/coins/VLS">Masternodecap</a>\
        </div>\
        <div class="section col-md-3">\
          <h5>About Us</h5>\
          <a href="/about.html">About</a>\
          <a href="/roadmad.html">Roadmap</a>\
          <a href="/contact.html">Contact Us</a>\
          <a href="https://github.com/Velescore">Github</a>\
        </div>\
    </div>\
  </div>\
  <div class="footer-copyright text-center py-3">\© Copyright 2018-'
    + Math.min(2019, (new Date()).getFullYear()) + ' The Veles Core developers\
  </div>\
  </div>\
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
  </footer>\
  <div class="footer-tooltip" id="connection-tooltip">\
    <ul>\
      <li>\
        <i class="fa fa-signal"></i> Websocket Status:\
        <b class="label-success websocket-online">online</b>\
        <b class="label-error websocket-offline">offline</b>\
      </li>\
      <li>Peer Connections: <b>8</b></li>\
      <li>Websocket Connections: <b>25</b></li>\
    </ul>\
  </div>\
  <div class="footer-tooltip" id="chain-tip-tooltip">\
    <ul>\
      <li><i class="fa fa-cube"></i> Current Block Height: <b class="chain-tip-height">0</b></li>\
      <li>Best block hash: <b><a class="chain-tip-hash-short"></a></b></li>\
      <li>Found at: <b class="chain-tip-time"></b></li>\
      <li class="first-row">Size: <b class="chain-tip-size-kb"></b> kB</li><li class="second-row">Algo: <b class="chain-tip-algo"></b></li>\
      <li>Transactions: <b class="chain-tip-ntx"></b></li>\
      '/*<li class="list-separator">Previous block hash: <b><a class="chain-tip-previous-hash-short"></a></b></li>\
      <li>Found at: <b class="chain-tip-previous-time"></b></li>\
      <li class="first-row">Size: <b class="chain-tip-previous-size-kb"></b> kB</li><li class="second-row">Transactions: <b class="chain-tip-previous-ntx"></b></li> */+'\
    </ul>\
  </div>\
  <div class="footer-tooltip" id="masternodes-tooltip">\
    <ul>\
      <li><i class="fa fa-server"></i> Masternodes Total: <b class="masternodes-count">0</b></li>\
      <li>Enabled: <b class="masternodes-enabled-count label-success">0</b></span></li>\
      <li>Pre-Enabled: <b class="masternodes-pre-enabled-count label-warning">0</b></span></li>\
      <li>New Start Required: <b class="masternodes-new-start-required-count label-warning">0</b></span></li>\
      <li>Expired: <b class="masternodes-expired-count label-error">0</b></span></li>\
      <li class="list-separator">Masternode collateral: <b class="masternodes-collateral-amount">2000</b> VLS</li>\
      <li>MN block reward part: <b class="masternodes-reward-percent">0</b> %</span></li>\
      <li class="list-separator tooltip-icons"><i class="fab fa-wikipedia-w"></i></li>\
    </ul>\
  </div>\
  <div class="footer-tooltip" id="chain-pow-tooltip">\
    <ul>\
      <li><i class="fa fa-chart-bar"></i> Hashrate Total: <b class="chain-pow-totalhashrate-human">0</b></li>\
      <li class="first-row">sha256d: <b class="chain-pow-sha256d-hashrate">0</b></span></li>\
      <li class="second-row">scrypt: <b class="chain-pow-scrypt-hashrate">0</b></span></li>\
      <li class="first-row">lyra2z: <b class="chain-pow-lyra2z-hashrate">0</b></span></li>\
      <li class="second-row">x11: <b class="chain-pow-x11-hashrate">0</b></span></li>\
      <li class="first-row">x16r: <b class="chain-pow-x16r-hashrate">0</b></span></li>\
      <li class="second-row">nist5: <b class="chain-pow-nist5-hashrate">0</b></span></li>\
      <li class="list-separator">Blocks to next halving check: <b class="chain-pow-blocks-to-next-epoch">0</b></li>\
      <li>Epoch supply reached: <b class="chain-pow-supply-target-reached">0</b> of min 80%</span></li>\
    </ul>\
  </div>\
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
      <div class="col-md-6 text-right">\
        <div id="connection-status" class="status-area">\
          <span class="fa fa-spinner fa-spin websocket-offline" title="Websocket Status: OFFLINE" style="color: #eee;"></span>\
          <span class="websocket-online" title="Websocket Status: ONLINE" style="color: #bfa; font-size: 20px; display: none;">✔</span>️\
        </div>\
        <div id="chain-tip-status" class="status-area websocket-online-animate" style="display: none;">\
          Blocks: \
          <b><span class="chain-tip-height">0</span></b>\
        </div>\
        <div id="masternodes-status" class="status-area websocket-online-animate" style="display: none;">\
          Masternodes: \
          <b><span class="masternodes-count"></span></b>\
        </div>\
        <div id="chain-pow-status" class="status-area websocket-online-animate" style="display: none;">\
          Hashrate: \
          <b><span class="chain-pow-totalhashrate-human">0</span></b>\
        </div>\
      </div>\
  </div><!-- end footer -->\
');
