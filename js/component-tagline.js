/**
 * component-tagline — shared evan-tang.com footer tagline.
 * Include on any page (after component-footer.js):
 *   <link rel="stylesheet" href="css/component-tagline.css">
 *   <script src="js/component-footer.js"></script>
 *   <script src="js/component-tagline.js"></script>
 */
(function () {
  if (document.getElementById('site-tagline')) return;

  var TAGLINE_HTML =
    '<section class="site-tagline component-tagline" id="site-tagline">' +
      '<p class="site-tagline-text" aria-label="evan-tang.com">evan-tang.com</p>' +
    '</section>';

  function mountTagline() {
    var footer = document.getElementById('site-footer');
    var pages = document.getElementById('pages');

    if (footer) {
      footer.insertAdjacentHTML('afterend', TAGLINE_HTML);
      return;
    }
    if (pages) {
      pages.insertAdjacentHTML('afterend', TAGLINE_HTML);
      return;
    }
    document.body.insertAdjacentHTML('beforeend', TAGLINE_HTML);
  }

  function initLetterReveal(tagline) {
    var textEl = tagline.querySelector('.site-tagline-text');
    if (!textEl) return;

    var text = textEl.textContent.trim();
    textEl.textContent = '';

    [...text].forEach(function (char, i) {
      var wrap = document.createElement('span');
      wrap.className = 'site-tagline-char-wrap';

      var span = document.createElement('span');
      span.className = 'site-tagline-char';
      span.textContent = char;
      span.style.setProperty('--i', i);
      span.setAttribute('aria-hidden', 'true');

      wrap.appendChild(span);
      textEl.appendChild(wrap);
    });

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      tagline.classList.add('is-visible');
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            tagline.classList.add('is-visible');
            observer.unobserve(tagline);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(tagline);
  }

  mountTagline();

  var tagline = document.getElementById('site-tagline');
  if (tagline) initLetterReveal(tagline);
})();
