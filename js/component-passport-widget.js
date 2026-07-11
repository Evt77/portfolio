/**
 * component-passport-widget — session passport peek tab on the right edge.
 *
 * Include on pages with Explore (not passport.html):
 *   <link rel="stylesheet" href="css/component-passport-widget.css">
 *   <script src="js/passport-session.js"></script>
 *   <script src="js/component-passport-widget.js"></script>
 */
(function () {
  if (document.getElementById('passport-widget')) return;
  if (document.getElementById('passport-3d')) return;

  if (!window.PassportSession || !PassportSession.hasPassport()) return;

  var data = PassportSession.getPassport();
  if (!data || !data.coverDataUrl) return;

  var widget = document.createElement('aside');
  widget.className = 'passport-widget';
  widget.id = 'passport-widget';

  widget.innerHTML =
    '<button type="button" class="passport-widget-toggle" aria-expanded="false" aria-label="Show your visitor passport">' +
      '<img class="passport-widget-peek" src="' + data.coverDataUrl + '" alt="Your visitor passport cover" loading="lazy">' +
    '</button>';

  document.body.appendChild(widget);

  var toggle = widget.querySelector('.passport-widget-toggle');
  var isOpen = false;

  function setOpen(open) {
    isOpen = open;
    widget.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Hide your visitor passport' : 'Show your visitor passport');
  }

  toggle.addEventListener('click', function () {
    setOpen(!isOpen);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) setOpen(false);
  });
})();
