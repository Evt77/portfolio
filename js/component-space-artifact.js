/**
 * component-space-artifact — hero vinyl trigger + now playing modal + drag vinyl
 *
 * Vinyl lives inside .now-playing-panel (has CSS transform). That makes
 * position:fixed resolve against the panel, not the viewport — so during drag
 * we reparent the vinyl to document.body. On a successful drop, the same vinyl
 * element is mounted onto the turntable and audio plays when data-audio is set.
 */
(function () {
  var trigger = document.getElementById('hero-vinyl-trigger');
  var modal = document.getElementById('now-playing-modal');
  if (!trigger || !modal) return;

  var DEFAULT_VOLUME = 0.15;
  var SNAP_MS = 420;

  var overlay = document.getElementById('now-playing-overlay');
  var closeBtn = document.getElementById('now-playing-close');
  var turntable = document.getElementById('now-playing-turntable');
  var stylus = document.getElementById('now-playing-stylus');
  var playPauseBtn = document.getElementById('now-playing-playpause');
  var volumeSlider = document.getElementById('now-playing-volume');
  var progressTrack = document.getElementById('now-playing-progress-track');
  var progressFill = document.getElementById('now-playing-progress-fill');
  var timeCurrentEl = document.getElementById('now-playing-time-current');
  var timeTotalEl = document.getElementById('now-playing-time-total');
  var playbackEl = document.getElementById('now-playing-playback');
  var trackEl = document.getElementById('now-playing-track');
  var artistEl = document.getElementById('now-playing-artist');
  var albums = Array.from(document.querySelectorAll('.now-playing-album'));

  var drag = null;
  var placedAlbum = null;
  var isPlaying = false;
  var isScrubbing = false;
  var audioToken = 0;
  var audio = new Audio();
  audio.preload = 'metadata';
  audio.volume = DEFAULT_VOLUME;

  function formatTime(seconds) {
    if (!isFinite(seconds) || seconds < 0) return '0:00';
    var total = Math.floor(seconds);
    var m = Math.floor(total / 60);
    var s = total % 60;
    return m + ':' + String(s).padStart(2, '0');
  }

  function setProgress(percent) {
    var value = Math.max(0, Math.min(100, percent));
    if (progressFill) progressFill.style.width = value + '%';
    if (progressTrack) progressTrack.setAttribute('aria-valuenow', String(Math.round(value)));
  }

  function setTimes(current, total) {
    if (timeCurrentEl) timeCurrentEl.textContent = formatTime(current);
    if (timeTotalEl) timeTotalEl.textContent = formatTime(total);
  }

  function syncProgressFromAudio() {
    if (isScrubbing) return;
    var duration = audio.duration;
    var current = audio.currentTime || 0;
    if (!isFinite(duration) || duration <= 0) {
      setProgress(0);
      setTimes(current, 0);
      return;
    }
    setProgress((current / duration) * 100);
    setTimes(current, duration);
  }

  function canScrub() {
    return !!(
      placedAlbum &&
      audio.src &&
      isFinite(audio.duration) &&
      audio.duration > 0
    );
  }

  function seekFromClientX(clientX) {
    if (!progressTrack || !canScrub()) return;
    var rect = progressTrack.getBoundingClientRect();
    if (rect.width <= 0) return;
    var pct = (clientX - rect.left) / rect.width;
    pct = Math.max(0, Math.min(1, pct));
    var time = pct * audio.duration;
    audio.currentTime = time;
    setProgress(pct * 100);
    setTimes(time, audio.duration);
  }

  function onScrubMove(e) {
    if (!isScrubbing) return;
    seekFromClientX(e.clientX);
  }

  function onScrubEnd(e) {
    if (!isScrubbing) return;
    seekFromClientX(e.clientX);
    isScrubbing = false;
    if (progressTrack) progressTrack.classList.remove('is-scrubbing');
    document.removeEventListener('pointermove', onScrubMove);
    document.removeEventListener('pointerup', onScrubEnd);
    document.removeEventListener('pointercancel', onScrubEnd);
  }

  function onScrubStart(e) {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    if (!canScrub()) return;
    e.preventDefault();
    isScrubbing = true;
    if (progressTrack) progressTrack.classList.add('is-scrubbing');
    seekFromClientX(e.clientX);
    document.addEventListener('pointermove', onScrubMove);
    document.addEventListener('pointerup', onScrubEnd);
    document.addEventListener('pointercancel', onScrubEnd);
  }

  function setStylusEngaged(engaged) {
    if (!stylus) return;
    stylus.classList.toggle('is-engaged', !!engaged);
  }

  function setVinylSpinning(spinning) {
    var vinyl = turntable.querySelector('.now-playing-vinyl.is-on-platter');
    if (!vinyl) return;
    vinyl.classList.toggle('is-spinning', !!spinning);
  }

  function setControlsEnabled(enabled) {
    if (playPauseBtn) playPauseBtn.disabled = !enabled;
    if (volumeSlider) volumeSlider.disabled = !enabled;
  }

  function setPlaying(playing) {
    isPlaying = !!playing;
    setVinylSpinning(isPlaying);

    if (!playPauseBtn) return;
    var icon = playPauseBtn.querySelector('i');
    if (isPlaying) {
      playPauseBtn.setAttribute('aria-label', 'Pause');
      playPauseBtn.setAttribute('aria-pressed', 'false');
      if (icon) icon.className = 'bi bi-pause-fill';
    } else {
      playPauseBtn.setAttribute('aria-label', 'Play');
      playPauseBtn.setAttribute('aria-pressed', 'true');
      if (icon) icon.className = 'bi bi-play-fill';
    }
  }

  function stopAudio() {
    audioToken += 1;
    isScrubbing = false;
    if (progressTrack) progressTrack.classList.remove('is-scrubbing');
    document.removeEventListener('pointermove', onScrubMove);
    document.removeEventListener('pointerup', onScrubEnd);
    document.removeEventListener('pointercancel', onScrubEnd);
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
    setProgress(0);
    setTimes(0, 0);
    setPlaying(false);
  }

  function playAlbumAudio(album) {
    var src = album.getAttribute('data-audio');
    if (!src) {
      stopAudio();
      return;
    }

    audioToken += 1;
    var token = audioToken;

    var volumePct = volumeSlider ? Number(volumeSlider.value) : DEFAULT_VOLUME * 100;
    audio.volume = Math.max(0, Math.min(1, volumePct / 100));
    audio.src = src;
    audio.currentTime = 0;
    setProgress(0);
    setTimes(0, 0);

    var playPromise = audio.play();
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise
        .then(function () {
          if (token !== audioToken) return;
          setPlaying(true);
        })
        .catch(function () {
          if (token !== audioToken) return;
          setPlaying(false);
        });
    } else {
      setPlaying(true);
    }
  }

  function open() {
    modal.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () {
      modal.classList.add('is-open');
    });
    closeBtn.focus();
  }

  function close() {
    modal.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    resetPlayer();
    setTimeout(function () {
      if (!modal.classList.contains('is-open')) modal.hidden = true;
    }, 250);
    trigger.focus();
  }

  function clearVinylDragStyles(vinyl) {
    vinyl.classList.remove('is-dragging', 'is-snapping', 'is-spinning');
    vinyl.style.cssText = '';
  }

  function placeVinylOnBody(vinyl, left, top, width, height) {
    if (vinyl.parentElement !== document.body) {
      document.body.appendChild(vinyl);
    }
    vinyl.style.position = 'fixed';
    vinyl.style.inset = 'auto';
    vinyl.style.left = left + 'px';
    vinyl.style.top = top + 'px';
    vinyl.style.right = 'auto';
    vinyl.style.bottom = 'auto';
    vinyl.style.width = width + 'px';
    vinyl.style.height = height + 'px';
    vinyl.style.margin = '0';
    vinyl.style.transform = 'none';
    vinyl.style.opacity = '1';
    vinyl.style.zIndex = '1000';
    vinyl.style.pointerEvents = 'auto';
  }

  function ensureVinylInSlot(vinyl, slot) {
    if (!slot || !vinyl) return;
    vinyl.classList.remove('is-on-platter', 'is-spinning');
    if (vinyl.parentElement !== slot) {
      slot.insertBefore(vinyl, slot.firstChild);
    }
  }

  function getAlbumVinyl(album) {
    var id = album.getAttribute('data-album-id');
    return (
      album.querySelector('.now-playing-vinyl') ||
      turntable.querySelector('.now-playing-vinyl[data-album-id="' + id + '"]') ||
      document.body.querySelector('.now-playing-vinyl[data-album-id="' + id + '"]')
    );
  }

  function returnPlacedVinylToSleeve() {
    if (!placedAlbum) return;
    var album = placedAlbum;
    var slot = album.querySelector('.now-playing-album-slot');
    var vinyl = getAlbumVinyl(album);
    album.classList.remove('is-on-turntable');
    if (vinyl && slot) {
      ensureVinylInSlot(vinyl, slot);
      clearVinylDragStyles(vinyl);
    }
    placedAlbum = null;
    setStylusEngaged(false);
    setControlsEnabled(false);
    stopAudio();
  }

  function resetPlayer() {
    teardownDragListeners();
    drag = null;
    turntable.classList.remove('is-drop-target');
    returnPlacedVinylToSleeve();
    setStylusEngaged(false);
    stopAudio();

    albums.forEach(function (album) {
      album.classList.remove('is-on-turntable', 'is-peek');
      var slot = album.querySelector('.now-playing-album-slot');
      var vinyl = getAlbumVinyl(album);
      if (vinyl && slot) {
        ensureVinylInSlot(vinyl, slot);
        clearVinylDragStyles(vinyl);
      }
    });

    if (trackEl) trackEl.textContent = '';
    if (artistEl) artistEl.textContent = '';
    if (playbackEl) playbackEl.classList.remove('has-track');
    setControlsEnabled(false);
  }

  function getVinylHomeRect(slot) {
    var rect = slot.getBoundingClientRect();
    return {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    };
  }

  function pointInTurntable(x, y) {
    var rect = turntable.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;
    var radius = rect.width * 0.42;
    return Math.hypot(x - cx, y - cy) <= radius;
  }

  function mountOnTurntable(vinyl, album) {
    if (placedAlbum && placedAlbum !== album) {
      returnPlacedVinylToSleeve();
    }

    clearVinylDragStyles(vinyl);
    vinyl.classList.remove('is-dragging', 'is-snapping');
    vinyl.classList.add('is-on-platter');
    turntable.appendChild(vinyl);

    placedAlbum = album;
    album.classList.add('is-on-turntable');
    album.classList.remove('is-peek');

    if (trackEl) trackEl.textContent = album.getAttribute('data-track') || '';
    if (artistEl) artistEl.textContent = album.getAttribute('data-artist') || '';
    if (playbackEl) playbackEl.classList.add('has-track');

    setStylusEngaged(true);
    setControlsEnabled(true);
    playAlbumAudio(album);
  }

  function returnVinylHome(vinyl, slot) {
    turntable.classList.remove('is-drop-target');

    var home = getVinylHomeRect(slot);
    vinyl.classList.remove('is-on-platter', 'is-spinning');
    vinyl.classList.add('is-snapping');
    vinyl.classList.remove('is-dragging');
    placeVinylOnBody(vinyl, home.left, home.top, home.width, home.height);
    vinyl.style.transition =
      'left 0.42s cubic-bezier(0.34, 1.2, 0.64, 1), ' +
      'top 0.42s cubic-bezier(0.34, 1.2, 0.64, 1), ' +
      'opacity 0.42s ease';
    vinyl.style.opacity = '0';

    var finished = false;
    function done() {
      if (finished) return;
      finished = true;
      ensureVinylInSlot(vinyl, slot);
      clearVinylDragStyles(vinyl);
    }

    vinyl.addEventListener('transitionend', function onEnd(e) {
      if (e.target !== vinyl) return;
      vinyl.removeEventListener('transitionend', onEnd);
      done();
    });

    setTimeout(done, SNAP_MS + 80);
  }

  function teardownDragListeners() {
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', onPointerUp);
    document.removeEventListener('pointercancel', onPointerUp);
  }

  function onPointerMove(e) {
    if (!drag) return;
    drag.vinyl.style.left = e.clientX - drag.offsetX + 'px';
    drag.vinyl.style.top = e.clientY - drag.offsetY + 'px';
    turntable.classList.toggle('is-drop-target', pointInTurntable(e.clientX, e.clientY));
  }

  function onPointerUp(e) {
    if (!drag) return;

    var vinyl = drag.vinyl;
    var album = drag.album;
    var slot = drag.slot;
    var dropped = pointInTurntable(e.clientX, e.clientY);

    try {
      if (vinyl.hasPointerCapture(e.pointerId)) {
        vinyl.releasePointerCapture(e.pointerId);
      }
    } catch (err) { /* ignore */ }

    teardownDragListeners();
    drag = null;
    turntable.classList.remove('is-drop-target');

    if (dropped) {
      mountOnTurntable(vinyl, album);
    } else {
      returnVinylHome(vinyl, slot);
    }
  }

  function onVinylPointerDown(e) {
    if (drag) return;
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    var vinyl = e.currentTarget;
    if (vinyl.classList.contains('is-on-platter')) return;

    var album = vinyl.closest('.now-playing-album');
    var slot = vinyl.closest('.now-playing-album-slot');
    if (!album || !slot || album.classList.contains('is-on-turntable')) return;

    e.preventDefault();
    e.stopPropagation();

    var rect = vinyl.getBoundingClientRect();
    var offsetX = e.clientX - rect.left;
    var offsetY = e.clientY - rect.top;

    vinyl.classList.add('is-dragging');
    vinyl.style.transition = 'none';

    placeVinylOnBody(vinyl, rect.left, rect.top, rect.width, rect.height);

    drag = {
      vinyl: vinyl,
      album: album,
      slot: slot,
      offsetX: offsetX,
      offsetY: offsetY,
    };

    vinyl.setPointerCapture(e.pointerId);
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
    document.addEventListener('pointercancel', onPointerUp);
  }

  albums.forEach(function (album, i) {
    album.setAttribute('data-album-id', String(i));
    var vinyl = album.querySelector('.now-playing-vinyl');
    var cover = album.querySelector('.now-playing-cover');
    if (vinyl) {
      vinyl.setAttribute('data-album-id', String(i));
      vinyl.addEventListener('pointerdown', onVinylPointerDown);
    }

    if (cover) {
      cover.addEventListener('dragstart', function (e) {
        e.preventDefault();
      });
      cover.addEventListener('click', function () {
        if (drag) return;
        if (window.matchMedia('(hover: none)').matches) {
          var isPeek = album.classList.contains('is-peek');
          albums.forEach(function (a) { a.classList.remove('is-peek'); });
          if (!isPeek && !album.classList.contains('is-on-turntable')) {
            album.classList.add('is-peek');
          }
        }
      });
    }
  });

  modal.addEventListener('dragstart', function (e) {
    if (e.target && e.target.tagName === 'IMG') e.preventDefault();
  });

  audio.addEventListener('loadedmetadata', syncProgressFromAudio);
  audio.addEventListener('timeupdate', syncProgressFromAudio);
  audio.addEventListener('ended', function () {
    setPlaying(false);
    syncProgressFromAudio();
  });

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', function () {
      if (!placedAlbum || !audio.src) return;
      if (audio.paused) {
        audio.play().then(function () {
          setPlaying(true);
        }).catch(function () {
          setPlaying(false);
        });
      } else {
        audio.pause();
        setPlaying(false);
      }
    });
  }

  if (volumeSlider) {
    volumeSlider.value = String(Math.round(DEFAULT_VOLUME * 100));
    volumeSlider.setAttribute('aria-valuenow', volumeSlider.value);
    audio.volume = DEFAULT_VOLUME;

    volumeSlider.addEventListener('input', function () {
      var pct = Number(volumeSlider.value);
      audio.volume = Math.max(0, Math.min(1, pct / 100));
      volumeSlider.setAttribute('aria-valuenow', volumeSlider.value);
    });
  }

  if (progressTrack) {
    progressTrack.addEventListener('pointerdown', onScrubStart);
    progressTrack.addEventListener('keydown', function (e) {
      if (!canScrub()) return;
      var step = audio.duration * 0.05;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        audio.currentTime = Math.min(audio.duration, audio.currentTime + step);
        syncProgressFromAudio();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        audio.currentTime = Math.max(0, audio.currentTime - step);
        syncProgressFromAudio();
      } else if (e.key === 'Home') {
        e.preventDefault();
        audio.currentTime = 0;
        syncProgressFromAudio();
      } else if (e.key === 'End') {
        e.preventDefault();
        audio.currentTime = audio.duration;
        syncProgressFromAudio();
      }
    });
  }

  setPlaying(false);
  setControlsEnabled(false);
  setProgress(0);
  setTimes(0, 0);
  setStylusEngaged(false);

  trigger.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);

  document.addEventListener('keydown', function (e) {
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') {
      if (drag) {
        var active = drag;
        try {
          if (e.pointerId != null) active.vinyl.releasePointerCapture(e.pointerId);
        } catch (err) { /* ignore */ }
        teardownDragListeners();
        drag = null;
        returnVinylHome(active.vinyl, active.slot);
      } else {
        close();
      }
    }
  });
})();
