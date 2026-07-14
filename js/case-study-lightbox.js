/**
 * case-study-lightbox — image lightbox for case study pages.
 *
 * Usage:
 *   <link rel="stylesheet" href="css/case-study-lightbox.css">
 *   <script src="js/case-study-lightbox.js"></script>
 *   <img class="cs-lightbox-trigger" src="..." alt="...">
 *   <img class="cs-lightbox-trigger" data-cs-lightbox-group="journey-maps" src="..." alt="...">
 */
(function () {
  if (document.getElementById('cs-lightbox')) return;

  var LIGHTBOX_HTML =
    '<div class="cs-lightbox" id="cs-lightbox" role="dialog" aria-modal="true" aria-label="Image preview" hidden>' +
      '<div class="cs-lightbox-overlay" id="cs-lightbox-overlay"></div>' +
      '<button type="button" class="cs-lightbox-prev" id="cs-lightbox-prev" aria-label="Previous image"><i class="bi bi-chevron-left" aria-hidden="true"></i></button>' +
      '<img class="cs-lightbox-img" id="cs-lightbox-img" src="" alt="">' +
      '<button type="button" class="cs-lightbox-next" id="cs-lightbox-next" aria-label="Next image"><i class="bi bi-chevron-right" aria-hidden="true"></i></button>' +
      '<button type="button" class="cs-lightbox-close" id="cs-lightbox-close" aria-label="Close"><i class="bi bi-x-lg" aria-hidden="true"></i></button>' +
    '</div>';

  document.body.insertAdjacentHTML('beforeend', LIGHTBOX_HTML);

  var lightbox = document.getElementById('cs-lightbox');
  var lightboxImg = document.getElementById('cs-lightbox-img');
  var overlay = document.getElementById('cs-lightbox-overlay');
  var closeBtn = document.getElementById('cs-lightbox-close');
  var prevBtn = document.getElementById('cs-lightbox-prev');
  var nextBtn = document.getElementById('cs-lightbox-next');

  var triggers = Array.from(document.querySelectorAll('img.cs-lightbox-trigger'));
  if (!triggers.length || !lightbox) return;

  var groups = {};

  triggers.forEach(function (img) {
    var groupName = img.getAttribute('data-cs-lightbox-group');
    if (!groupName) return;
    if (!groups[groupName]) groups[groupName] = [];
    groups[groupName].push(img);
  });

  var items = [];
  var index = 0;
  var hasNav = false;

  function itemFromImg(img) {
    return { src: img.currentSrc || img.src, alt: img.alt || '' };
  }

  function buildItems(clickedImg) {
    var groupName = clickedImg.getAttribute('data-cs-lightbox-group');
    if (!groupName || !groups[groupName] || groups[groupName].length < 2) {
      return {
        items: [itemFromImg(clickedImg)],
        index: 0,
        hasNav: false,
      };
    }

    var groupItems = groups[groupName].map(itemFromImg);
    var groupIndex = groups[groupName].indexOf(clickedImg);

    return {
      items: groupItems,
      index: groupIndex === -1 ? 0 : groupIndex,
      hasNav: true,
    };
  }

  function updateNav() {
    prevBtn.classList.toggle('is-hidden', !hasNav);
    nextBtn.classList.toggle('is-hidden', !hasNav);
  }

  function show(i) {
    index = i;
    lightboxImg.src = items[index].src;
    lightboxImg.alt = items[index].alt;
  }

  function open(clickedImg) {
    var gallery = buildItems(clickedImg);
    items = gallery.items;
    index = gallery.index;
    hasNav = gallery.hasNav;
    show(index);
    updateNav();
    lightbox.hidden = false;
    requestAnimationFrame(function () {
      lightbox.classList.add('is-open');
    });
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
    lightboxImg.alt = '';
    setTimeout(function () {
      if (!lightbox.classList.contains('is-open')) lightbox.hidden = true;
    }, 250);
  }

  function showPrev() {
    if (!hasNav) return;
    show((index - 1 + items.length) % items.length);
  }

  function showNext() {
    if (!hasNav) return;
    show((index + 1) % items.length);
  }

  triggers.forEach(function (img) {
    img.addEventListener('click', function () {
      open(img);
    });
  });

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
})();
