/**
 * component-footer — shared site footer.
 * Include on any page:
 *   <link rel="stylesheet" href="css/component-footer.css">
 *   <script src="js/component-footer.js"></script>
 */
(function () {
  if (document.getElementById('site-footer')) return;

  var FOOTER_HTML =
    '<footer class="site-footer component-footer" id="site-footer">' +
      '<div class="site-footer-inner">' +
        '<div class="site-footer-brand">' +
          '<p class="site-footer-name p1-label">Evan Tang</p>' +
          '<p class="site-footer-role p2">Product Designer</p>' +
        '</div>' +
        '<div class="site-footer-columns">' +
          '<div class="site-footer-col">' +
            '<p class="site-footer-col-title p2">PAGES</p>' +
            '<a href="/" class="site-footer-link p2" data-tab="home" data-local-href="index.html">Home</a>' +
            '<a href="/case-studies" class="site-footer-link p2" data-tab="case-studies" data-local-href="index.html?tab=case-studies">Case Studies</a>' +
            '<a href="/about" class="site-footer-link p2" data-tab="about" data-local-href="index.html?tab=about">About</a>' +
          '</div>' +
          '<div class="site-footer-col">' +
            '<p class="site-footer-col-title p2">SOCIALS</p>' +
            '<a href="https://www.linkedin.com/in/evanmtang" target="_blank" rel="noopener noreferrer" class="site-footer-link p2">LinkedIn <i class="bi bi-arrow-right-short"></i></a>' +
            '<a href="https://x.com/EvanMTang" target="_blank" rel="noopener noreferrer" class="site-footer-link p2">Twitter / X <i class="bi bi-arrow-right-short"></i></a>' +
            '<a href="https://github.com/Evt77" target="_blank" rel="noopener noreferrer" class="site-footer-link p2">GitHub <i class="bi bi-arrow-right-short"></i></a>' +
          '</div>' +
          '<div class="site-footer-col">' +
            '<p class="site-footer-col-title p2">RESOURCES</p>' +
            '<a href="https://docs.google.com/document/d/10ZRJDIs50526a4oPNNFs8G1AKVXwuWZDboDrTNUvr7M/edit?usp=drive_link" target="_blank" rel="noopener noreferrer" class="site-footer-link p2">Resume <i class="bi bi-arrow-right-short"></i></a>' +
            '<a href="mailto:evantang77@gmail.com" class="site-footer-link p2">Email me <i class="bi bi-arrow-right-short"></i></a>' +
            '<a href="https://calendly.com/evantang77/30-minute-meeting" target="_blank" rel="noopener noreferrer" class="site-footer-link p2">Book a call <i class="bi bi-arrow-right-short"></i></a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</footer>';

  function isLocalPreview() {
    return location.protocol === 'file:' ||
      /\.html$/i.test(location.pathname) ||
      location.search.indexOf('tab=') !== -1;
  }

  function mountFooter() {
    var pages = document.getElementById('pages');

    if (pages) {
      pages.insertAdjacentHTML('afterend', FOOTER_HTML);
      return;
    }
    document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);
  }

  mountFooter();

  var footer = document.getElementById('site-footer');
  if (!footer) return;

  var hasNavTabs = !!document.querySelector('.nav-tab');

  footer.querySelectorAll('[data-tab]').forEach(function (link) {
    if (hasNavTabs) {
      link.href = '#';
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var tabLink = document.querySelector('.nav-tab[data-tab="' + link.dataset.tab + '"]');
        if (tabLink) tabLink.click();
      });
      return;
    }

    if (isLocalPreview()) {
      var localHref = link.getAttribute('data-local-href');
      if (localHref) link.href = localHref;
    }
  });
})();
