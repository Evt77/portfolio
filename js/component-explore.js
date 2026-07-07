/**
 * component-explore — shared Explore button + modal.
 * Include on any page:
 *   <link rel="stylesheet" href="css/component-explore.css">
 *   <script src="js/component-explore.js"></script>
 */
(function () {
  if (document.getElementById('portfolio-builder-open')) return;

  var EXPLORE_HTML =
    '<button type="button" class="portfolio-builder-trigger p2" id="portfolio-builder-open" aria-expanded="false" aria-controls="portfolio-builder-modal">' +
      '<i class="bi bi-search" aria-hidden="true"></i>' +
      '<span>Explore</span>' +
    '</button>' +
    '<div class="portfolio-builder-modal component-explore" id="portfolio-builder-modal" role="dialog" aria-modal="true" aria-labelledby="explore-dialog-title" hidden>' +
      '<div class="portfolio-builder-backdrop" id="portfolio-builder-backdrop"></div>' +
      '<div class="portfolio-builder-panel">' +
        '<div class="explore-panel-header">' +
          '<div class="explore-header">' +
            '<div class="explore-search">' +
              '<i class="bi bi-search" aria-hidden="true"></i>' +
              '<label class="visually-hidden" for="explore-search-input">Search explore options</label>' +
              '<input type="search" id="explore-search-input" class="explore-search-input p2" placeholder="Search" autocomplete="off" spellcheck="false">' +
            '</div>' +
            '<kbd class="portfolio-builder-esc">esc</kbd>' +
          '</div>' +
          '<p class="visually-hidden">Press Escape to close this menu</p>' +
          '<h2 id="explore-dialog-title" class="visually-hidden">Explore</h2>' +
          '<hr class="explore-divider">' +
        '</div>' +
        '<div class="explore-panel-body" id="explore-panel-body">' +
          '<div class="explore-actions">' +
            '<div class="explore-section">' +
              '<p class="explore-section-label p2">PINNED</p>' +
              '<a href="passport.html" class="explore-action explore-action--passport">' +
                '<span class="explore-action-icon" aria-hidden="true"><i class="bi bi-passport"></i></span>' +
                '<span class="explore-action-text">' +
                  '<p class="explore-action-title p1-label">Create a passport</p>' +
                  '<p class="explore-action-desc p2">Design your own visitor passport for the site</p>' +
                '</span>' +
              '</a>' +
              '<button type="button" class="explore-action" data-tab="case-studies">' +
                '<span class="explore-action-icon" aria-hidden="true"><i class="bi bi-briefcase"></i></span>' +
                '<span class="explore-action-text">' +
                  '<p class="explore-action-title p1-label">Read my case studies</p>' +
                  '<p class="explore-action-desc p2">Browse in-depth and learn about my design process + thinking</p>' +
                '</span>' +
              '</button>' +
              '<button type="button" class="explore-action" data-tab="about">' +
                '<span class="explore-action-icon" aria-hidden="true"><i class="bi bi-person-raised-hand"></i></span>' +
                '<span class="explore-action-text">' +
                  '<p class="explore-action-title p1-label">Learn about me</p>' +
                  '<p class="explore-action-desc p2">Background, personal, hobbies, and more</p>' +
                '</span>' +
              '</button>' +
              '<a href="/visitor-gallery" class="explore-action" id="explore-gallery-link">' +
                '<span class="explore-action-icon" aria-hidden="true"><i class="bi bi-images"></i></span>' +
                '<span class="explore-action-text">' +
                  '<p class="explore-action-title p1-label">Visitor passport gallery</p>' +
                  '<p class="explore-action-desc p2">Browse passports created by other visitors</p>' +
                '</span>' +
              '</a>' +
            '</div>' +
            '<div class="explore-section">' +
              '<p class="explore-section-label p2">SOCIALS</p>' +
              '<a href="https://www.linkedin.com/in/evanmtang" target="_blank" rel="noopener noreferrer" class="explore-action">' +
                '<span class="explore-action-icon" aria-hidden="true"><i class="bi bi-linkedin"></i></span>' +
                '<span class="explore-action-text">' +
                  '<p class="explore-action-title p1-label">View Linkedin</p>' +
                  '<p class="explore-action-desc p2">Connect with me on LinkedIn</p>' +
                '</span>' +
              '</a>' +
              '<a href="https://x.com/EvanMTang" target="_blank" rel="noopener noreferrer" class="explore-action">' +
                '<span class="explore-action-icon" aria-hidden="true"><i class="bi bi-twitter-x"></i></span>' +
                '<span class="explore-action-text">' +
                  '<p class="explore-action-title p1-label">Follow on Twitter/X</p>' +
                  '<p class="explore-action-desc p2">Connect with me on Twitter/X</p>' +
                '</span>' +
              '</a>' +
              '<a href="https://github.com/Evt77" target="_blank" rel="noopener noreferrer" class="explore-action">' +
                '<span class="explore-action-icon" aria-hidden="true"><i class="bi bi-github"></i></span>' +
                '<span class="explore-action-text">' +
                  '<p class="explore-action-title p1-label">View Github</p>' +
                  '<p class="explore-action-desc p2">Browse my work</p>' +
                '</span>' +
              '</a>' +
            '</div>' +
            '<div class="explore-section">' +
              '<p class="explore-section-label p2">RESOURCES</p>' +
              '<a href="https://docs.google.com/document/d/10ZRJDIs50526a4oPNNFs8G1AKVXwuWZDboDrTNUvr7M/edit?usp=drive_link" target="_blank" rel="noopener noreferrer" class="explore-action">' +
                '<span class="explore-action-icon" aria-hidden="true"><i class="bi bi-file-earmark-arrow-down"></i></span>' +
                '<span class="explore-action-text">' +
                  '<p class="explore-action-title p1-label">View my resume</p>' +
                  '<p class="explore-action-desc p2">Open or download my latest resume</p>' +
                '</span>' +
              '</a>' +
              '<a href="mailto:evantang77@gmail.com" class="explore-action">' +
                '<span class="explore-action-icon" aria-hidden="true"><i class="bi bi-envelope"></i></span>' +
                '<span class="explore-action-text">' +
                  '<p class="explore-action-title p1-label">Email me</p>' +
                  '<p class="explore-action-desc p2">Reach out via email</p>' +
                '</span>' +
              '</a>' +
              '<a href="https://calendly.com/evantang77/30-minute-meeting" target="_blank" rel="noopener noreferrer" class="explore-action">' +
                '<span class="explore-action-icon" aria-hidden="true"><i class="bi bi-calendar-date"></i></span>' +
                '<span class="explore-action-text">' +
                  '<p class="explore-action-title p1-label">Book a call</p>' +
                  '<p class="explore-action-desc p2">Schedule a meeting with me</p>' +
                '</span>' +
              '</a>' +
            '</div>' +
            '<div class="explore-section">' +
              '<p class="explore-section-label p2">PAGES</p>' +
              '<a href="/rivian" class="explore-action" id="explore-rivian-link">' +
                '<span class="explore-action-icon" aria-hidden="true"><i class="bi bi-car-front-fill"></i></span>' +
                '<span class="explore-action-text">' +
                  '<p class="explore-action-title p1-label">Go to Rivian case study</p>' +
                  '<p class="explore-action-desc p2">Infotainment and navigation design</p>' +
                '</span>' +
              '</a>' +
              '<a href="/sleeper" class="explore-action" id="explore-sleeper-link">' +
                '<span class="explore-action-icon" aria-hidden="true"><i class="bi bi-trophy"></i></span>' +
                '<span class="explore-action-text">' +
                  '<p class="explore-action-title p1-label">Go to Sleeper case study</p>' +
                  '<p class="explore-action-desc p2">Fantasy sports iOS design</p>' +
                '</span>' +
              '</a>' +
              '<a href="/snowlabs" class="explore-action" id="explore-snowlabs-link">' +
                '<span class="explore-action-icon" aria-hidden="true"><i class="bi bi-snow"></i></span>' +
                '<span class="explore-action-text">' +
                  '<p class="explore-action-title p1-label">Go to SnowLabs case study</p>' +
                  '<p class="explore-action-desc p2">Trip planning and snowboarding</p>' +
                '</span>' +
              '</a>' +
            '</div>' +
            '<p class="explore-no-results p2" id="explore-no-results" aria-live="polite">No results found</p>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  document.body.insertAdjacentHTML('beforeend', EXPLORE_HTML);

  function isLocalPreview() {
    return location.protocol === 'file:' ||
      /\.html$/i.test(location.pathname) ||
      location.search.indexOf('tab=') !== -1;
  }

  function applyLocalLinks() {
    if (!isLocalPreview()) return;

    var galleryLink = document.getElementById('explore-gallery-link');
    if (galleryLink) galleryLink.href = 'visitor-gallery.html';

    var rivianLink = document.getElementById('explore-rivian-link');
    if (rivianLink) rivianLink.href = 'rivian.html';

    var sleeperLink = document.getElementById('explore-sleeper-link');
    if (sleeperLink) sleeperLink.href = 'sleeper.html';

    var snowlabsLink = document.getElementById('explore-snowlabs-link');
    if (snowlabsLink) snowlabsLink.href = 'snowlabs.html';
  }

  applyLocalLinks();

  var openBtn = document.getElementById('portfolio-builder-open');
  var modal = document.getElementById('portfolio-builder-modal');
  var backdrop = document.getElementById('portfolio-builder-backdrop');
  var exploreBody = document.getElementById('explore-panel-body');
  var searchInput = document.getElementById('explore-search-input');
  var noResults = document.getElementById('explore-no-results');

  if (!openBtn || !modal) return;

  function resetExploreScroll() {
    if (exploreBody) exploreBody.scrollTop = 0;
  }

  function filterExploreOptions(query) {
    var q = query.trim().toLowerCase();
    var actions = modal.querySelectorAll('.explore-action');
    var sections = modal.querySelectorAll('.explore-section');
    var visibleCount = 0;

    actions.forEach(function (action) {
      var titleEl = action.querySelector('.explore-action-title');
      var descEl = action.querySelector('.explore-action-desc');
      var title = titleEl ? titleEl.textContent.trim().toLowerCase() : '';
      var desc = descEl ? descEl.textContent.trim().toLowerCase() : '';
      var matches = !q || title.indexOf(q) !== -1 || desc.indexOf(q) !== -1;

      action.classList.toggle('is-filtered-out', !matches);
      if (matches) visibleCount += 1;
    });

    sections.forEach(function (section) {
      var hasVisible = section.querySelector('.explore-action:not(.is-filtered-out)');
      section.classList.toggle('is-empty', !hasVisible);
    });

    if (noResults) {
      noResults.classList.toggle('is-visible', q.length > 0 && visibleCount === 0);
    }
  }

  function resetExploreSearch() {
    if (searchInput) {
      searchInput.value = '';
      filterExploreOptions('');
    }
  }

  function openModal() {
    resetExploreScroll();
    resetExploreSearch();
    modal.hidden = false;
    requestAnimationFrame(function () {
      modal.classList.add('is-open');
      resetExploreScroll();
      if (searchInput) searchInput.focus();
    });
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    resetExploreScroll();
    resetExploreSearch();
    setTimeout(function () {
      if (!modal.classList.contains('is-open')) modal.hidden = true;
    }, 280);
  }

  function navigateToTab(tab) {
    var tabLink = document.querySelector('.nav-tab[data-tab="' + tab + '"]');
    closeModal();
    if (tabLink) {
      tabLink.click();
      return;
    }
    if (isLocalPreview()) {
      window.location.href = tab === 'home' ? 'index.html' : 'index.html?tab=' + tab;
      return;
    }
    window.location.href = tab === 'home' ? '/' : '/' + tab;
  }

  openBtn.addEventListener('click', openModal);
  backdrop.addEventListener('click', closeModal);

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      filterExploreOptions(searchInput.value);
      resetExploreScroll();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  modal.querySelectorAll('.explore-action[data-tab]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      navigateToTab(btn.dataset.tab);
    });
  });

  modal.querySelectorAll('a.explore-action').forEach(function (link) {
    link.addEventListener('click', closeModal);
  });
})();
