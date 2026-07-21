/**
 * component-photo-gallery — hero camera trigger + full-viewport photo gallery
 */
(function () {
  var trigger = document.getElementById('hero-camera-trigger');
  var modal = document.getElementById('photo-gallery-modal');
  if (!trigger || !modal) return;

  var BASE = 'images/home/minigame-photo-gallery/';

  var photos = [
    // Curacao 2025
    {
      id: 'cw-3373',
      src: BASE + 'Curacao-2025/IMG_3373.jpg',
      title: 'Sunset Dinner in Willemstad',
      date: 'June 4, 2025',
      category: 'Travel',
      camera: 'iPhone 13',
      location: 'Willemstad, Curaçao',
      albumId: 'curacao-2025'
    },
    {
      id: 'cw-3867',
      src: BASE + 'Curacao-2025/IMG_3867.jpg',
      title: 'Curacao alley architecture',
      date: 'June 7, 2025',
      category: 'Travel',
      camera: 'iPhone 13',
      location: 'Curaçao',
      albumId: 'curacao-2025'
    },
    {
      id: 'cw-5323',
      src: BASE + 'Curacao-2025/IMG_5323.jpg',
      title: 'Ocean views',
      date: 'June 5, 2025',
      category: 'Travel',
      camera: 'iPhone 13',
      location: 'Curaçao',
      albumId: 'curacao-2025'
    },
    {
      id: 'cw-5371',
      src: BASE + 'Curacao-2025/IMG_5371.jpg',
      title: 'Cat spotting in alley',
      date: 'June 7, 2025',
      category: 'Travel',
      camera: 'iPhone 13',
      location: 'Curaçao',
      albumId: 'curacao-2025'
    },
    {
      id: 'cw-6692',
      src: BASE + 'Curacao-2025/IMG_6692.jpg',
      title: 'Willemstad',
      date: 'June 5, 2025',
      category: 'Travel',
      camera: 'iPhone 13',
      location: 'Willemstad, Curaçao',
      albumId: 'curacao-2025'
    },

    // Fun
    {
      id: 'fun-4681',
      src: BASE + 'Fun/IMG_4681.jpg',
      title: 'Golden Gate Bridge',
      date: 'Feb 18, 2024',
      category: 'Architecture',
      camera: 'iPhone 13',
      location: 'Marin Headlands, Marin County, California',
      albumId: 'fun'
    },
    {
      id: 'fun-4701',
      src: BASE + 'Fun/IMG_4701.jpg',
      title: 'Off the trail in Point Reyes',
      date: 'Feb 24, 2024',
      category: 'Nature',
      camera: 'iPhone 13',
      location: 'Point Reyes, Marin County, California',
      albumId: 'fun'
    },
    {
      id: 'fun-5965',
      src: BASE + 'Fun/IMG_5965.jpg',
      title: 'Australia vs Paraguay',
      date: 'June 25, 2026',
      category: 'Sports',
      camera: 'iPhone 13',
      location: "Levi's Stadium, Santa Clara, California",
      albumId: 'fun'
    },
    {
      id: 'fun-5973',
      src: BASE + 'Fun/IMG_5973.jpg',
      title: 'Australia vs Paraguay',
      date: 'June 25, 2026',
      category: 'Sports',
      camera: 'iPhone 13',
      location: "Levi's Stadium, Santa Clara, California",
      albumId: 'fun'
    },
    {
      id: 'fun-5976',
      src: BASE + 'Fun/IMG_5976.jpg',
      title: 'Australia vs Paraguay',
      date: 'June 25, 2026',
      category: 'Sports',
      camera: 'iPhone 13',
      location: "Levi's Stadium, Santa Clara, California",
      albumId: 'fun'
    },

    // Greece 2023
    {
      id: 'gr-2537',
      src: BASE + 'Greece-2023/IMG_2537.jpg',
      title: 'Athens Acropolis',
      date: 'July 7, 2023',
      category: 'Travel',
      camera: 'iPhone 13',
      location: 'Athens, Greece',
      albumId: 'greece-2023'
    },
    {
      id: 'gr-2555',
      src: BASE + 'Greece-2023/IMG_2555.jpg',
      title: 'Cat at the top of the Acropolis',
      date: 'July 7, 2023',
      category: 'Travel',
      camera: 'iPhone 13',
      location: 'Athens, Greece',
      albumId: 'greece-2023'
    },
    {
      id: 'gr-2614',
      src: BASE + 'Greece-2023/IMG_2614.jpg',
      title: 'Tsouhti Pasta',
      date: 'July 7, 2023',
      category: 'Food',
      camera: 'iPhone 13',
      location: 'Mani Mani, Athens, Greece',
      albumId: 'greece-2023'
    },
    {
      id: 'gr-2633',
      src: BASE + 'Greece-2023/IMG_2633.jpg',
      title: 'Cat spotting at donut shop',
      date: 'July 8, 2023',
      category: 'Travel',
      camera: 'iPhone 13',
      location: 'Athens, Greece',
      albumId: 'greece-2023'
    },
    {
      id: 'gr-2680',
      src: BASE + 'Greece-2023/IMG_2680.jpg',
      title: 'Fun, unique design branding',
      date: 'July 9, 2023',
      category: 'Travel',
      camera: 'iPhone 13',
      location: 'Thessaloniki, Greece',
      albumId: 'greece-2023'
    },
    {
      id: 'gr-2742',
      src: BASE + 'Greece-2023/IMG_2742.jpg',
      title: 'Mykonos architecture',
      date: 'July 10, 2023',
      category: 'Travel',
      camera: 'iPhone 13',
      location: 'Mykonos, Greece',
      albumId: 'greece-2023'
    },
    {
      id: 'gr-2944',
      src: BASE + 'Greece-2023/IMG_2944.jpg',
      title: 'The Colossus',
      date: 'July 12, 2023',
      category: 'Travel',
      camera: 'iPhone 13',
      location: 'Rhodes, Greece',
      albumId: 'greece-2023'
    },
    {
      id: 'gr-2945',
      src: BASE + 'Greece-2023/IMG_2945.jpg',
      title: 'The Colossus',
      date: 'July 12, 2023',
      category: 'Travel',
      camera: 'iPhone 13',
      location: 'Rhodes, Greece',
      albumId: 'greece-2023'
    },
    {
      id: 'gr-3025',
      src: BASE + 'Greece-2023/IMG_3025.jpg',
      title: 'Santorini view',
      date: 'July 13, 2023',
      category: 'Travel',
      camera: 'iPhone 13',
      location: 'Santorini, Greece',
      albumId: 'greece-2023'
    },

    // Italy Summer 2022
    {
      id: 'it-1144',
      src: BASE + 'Italy-Summer-2022/IMG_1144.jpg',
      title: 'Pantheon',
      date: 'August 16, 2022',
      category: 'Travel',
      camera: 'iPhone 13',
      location: 'Piazza della Rotonda, Rome, Italy',
      albumId: 'italy-summer-2022'
    },
    {
      id: 'it-1208',
      src: BASE + 'Italy-Summer-2022/IMG_1208.jpg',
      title: 'Sistine Chapel',
      date: 'August 17, 2022',
      category: 'Travel',
      camera: 'iPhone 13',
      location: 'Vatican City, Italy',
      albumId: 'italy-summer-2022'
    },
    {
      id: 'it-1269',
      src: BASE + 'Italy-Summer-2022/IMG_1269.jpg',
      title: 'David',
      date: 'August 19, 2022',
      category: 'Travel',
      camera: 'iPhone 13',
      location: 'Florence, Italy',
      albumId: 'italy-summer-2022'
    },
    {
      id: 'it-1392',
      src: BASE + 'Italy-Summer-2022/IMG_1392.jpg',
      title: 'Cinque Terre',
      date: 'August 21, 2022',
      category: 'Travel',
      camera: 'iPhone 13',
      location: 'Cinque Terre, Italy',
      albumId: 'italy-summer-2022'
    },
    {
      id: 'it-1431',
      src: BASE + 'Italy-Summer-2022/IMG_1431.jpg',
      title: 'A Night in Venice',
      date: 'August 23, 2022',
      category: 'Travel',
      camera: 'iPhone 13',
      location: 'Venice, Italy',
      albumId: 'italy-summer-2022'
    },

    // Japan 2023
    {
      id: 'jp-3940',
      src: BASE + 'Japan-2023/IMG_3940.jpg',
      title: 'Shibuya Sky at Night',
      date: 'December 8, 2023',
      category: 'Travel',
      camera: 'iPhone 13',
      location: 'Shibuya, Tokyo, Japan',
      albumId: 'japan-2023'
    },
    {
      id: 'jp-4023',
      src: BASE + 'Japan-2023/IMG_4023.jpg',
      title: 'Kiyomizu-dera Temple',
      date: 'December 11, 2023',
      category: 'Travel',
      camera: 'iPhone 13',
      location: 'Gion, Kyoto, Japan',
      albumId: 'japan-2023'
    },
    {
      id: 'jp-4112',
      src: BASE + 'Japan-2023/IMG_4112.jpg',
      title: 'Ginkaku-ji',
      date: 'December 11, 2023',
      category: 'Travel',
      camera: 'iPhone 13',
      location: 'Gion, Kyoto, Japan',
      albumId: 'japan-2023'
    },
    {
      id: 'jp-4129',
      src: BASE + 'Japan-2023/IMG_4129.jpg',
      title: 'Bamboo Forest',
      date: 'December 12, 2023',
      category: 'Travel',
      camera: 'iPhone 13',
      location: 'Arashiyama, Kyoto, Japan',
      albumId: 'japan-2023'
    },
    {
      id: 'jp-4211',
      src: BASE + 'Japan-2023/IMG_4211.jpg',
      title: 'Monkey Forest',
      date: 'December 12, 2023',
      category: 'Travel',
      camera: 'iPhone 13',
      location: 'Arashiyama, Kyoto, Japan',
      albumId: 'japan-2023'
    },
    {
      id: 'jp-4222',
      src: BASE + 'Japan-2023/IMG_4222.jpg',
      title: 'Katsu Dinner',
      date: 'December 12, 2023',
      category: 'Travel',
      camera: 'iPhone 13',
      location: 'Nishiki Market, Kyoto, Japan',
      albumId: 'japan-2023'
    },
    {
      id: 'jp-4309',
      src: BASE + 'Japan-2023/IMG_4309.jpg',
      title: 'Kinkaku-ji',
      date: 'December 14, 2023',
      category: 'Travel',
      camera: 'iPhone 13',
      location: 'Kyoto, Japan',
      albumId: 'japan-2023'
    },
    {
      id: 'jp-4319',
      src: BASE + 'Japan-2023/IMG_4319.jpg',
      title: 'Kinkaku-ji',
      date: 'December 14, 2023',
      category: 'Travel',
      camera: 'iPhone 13',
      location: 'Kyoto, Japan',
      albumId: 'japan-2023'
    },
    {
      id: 'jp-4345',
      src: BASE + 'Japan-2023/IMG_4345.jpg',
      title: 'A Night in Dōtonbori',
      date: 'December 14, 2023',
      category: 'Travel',
      camera: 'iPhone 13',
      location: 'Osaka, Japan',
      albumId: 'japan-2023'
    },
    {
      id: 'jp-4384',
      src: BASE + 'Japan-2023/IMG_4384.jpg',
      title: 'Osaka Castle',
      date: 'December 15, 2023',
      category: 'Travel',
      camera: 'iPhone 13',
      location: 'Osaka, Japan',
      albumId: 'japan-2023'
    },
    {
      id: 'jp-4444',
      src: BASE + 'Japan-2023/IMG_4444.jpg',
      title: 'Deer',
      date: 'December 16, 2023',
      category: 'Travel',
      camera: 'iPhone 13',
      location: 'Nara, Japan',
      albumId: 'japan-2023'
    }
  ];

  var albums = [
    { id: 'all', label: 'All photos' },
    { id: 'fun', label: 'Fun', color: '#F97316' },
    { id: 'curacao-2025', label: 'Curacao 2025', color: '#2DD4BF' },
    { id: 'japan-2023', label: 'Japan 2023', color: '#FB7185' },
    { id: 'greece-2023', label: 'Greece 2023', color: '#38BDF8' },
    { id: 'italy-summer-2022', label: 'Italy 2022', color: '#4ADE80' }
  ];

  var closeBtn = document.getElementById('photo-gallery-close');
  var overlay = document.getElementById('photo-gallery-overlay');
  var titleEl = document.getElementById('photo-gallery-title');
  var albumsEl = document.getElementById('photo-gallery-albums');
  var mainImg = document.getElementById('photo-gallery-main');
  var filmstripEl = document.getElementById('photo-gallery-filmstrip');
  var gridEl = document.getElementById('photo-gallery-grid');
  var panelEl = modal.querySelector('.photo-gallery-panel');
  var viewGridBtn = document.getElementById('photo-gallery-view-grid');
  var viewDetailBtn = document.getElementById('photo-gallery-view-detail');
  var totalCountEl = document.getElementById('photo-gallery-total-count');
  var metaTitle = document.getElementById('photo-gallery-meta-title');
  var metaDate = document.getElementById('photo-gallery-meta-date');
  var metaCategory = document.getElementById('photo-gallery-meta-category');
  var metaCamera = document.getElementById('photo-gallery-meta-camera');
  var metaLocation = document.getElementById('photo-gallery-meta-location');

  var activeAlbumId = 'all';
  var activePhotoId = photos[0] ? photos[0].id : null;
  var viewMode = 'detail';

  function getPhotosForAlbum(albumId) {
    if (albumId === 'all') return photos.slice();
    return photos.filter(function (p) {
      return p.albumId === albumId;
    });
  }

  function getPhotoById(id) {
    for (var i = 0; i < photos.length; i++) {
      if (photos[i].id === id) return photos[i];
    }
    return null;
  }

  function getAlbumLabel(albumId) {
    for (var i = 0; i < albums.length; i++) {
      if (albums[i].id === albumId) return albums[i].label;
    }
    return albumId;
  }

  function getAlbumColor(albumId) {
    for (var i = 0; i < albums.length; i++) {
      if (albums[i].id === albumId) return albums[i].color || null;
    }
    return null;
  }

  function musicModalOpen() {
    var music = document.getElementById('now-playing-modal');
    return !!(music && music.classList.contains('is-open'));
  }

  function setBodyScrollLock(locked) {
    if (locked) {
      document.body.style.overflow = 'hidden';
      return;
    }
    if (!musicModalOpen()) {
      document.body.style.overflow = '';
    }
  }

  function updateTotalCount() {
    if (totalCountEl) totalCountEl.textContent = photos.length + ' total';
  }

  function setViewMode(mode) {
    viewMode = mode === 'grid' ? 'grid' : 'detail';
    if (panelEl) panelEl.classList.toggle('is-grid-view', viewMode === 'grid');
    if (gridEl) gridEl.hidden = viewMode !== 'grid';

    if (viewGridBtn) {
      viewGridBtn.classList.toggle('is-active', viewMode === 'grid');
      viewGridBtn.setAttribute('aria-pressed', viewMode === 'grid' ? 'true' : 'false');
    }
    if (viewDetailBtn) {
      viewDetailBtn.classList.toggle('is-active', viewMode === 'detail');
      viewDetailBtn.setAttribute('aria-pressed', viewMode === 'detail' ? 'true' : 'false');
    }

    if (viewMode === 'grid') {
      renderGrid(getPhotosForAlbum(activeAlbumId));
      if (titleEl) {
        var albumLabel = 'Photos';
        for (var i = 0; i < albums.length; i++) {
          if (albums[i].id === activeAlbumId) {
            albumLabel = albums[i].label;
            break;
          }
        }
        titleEl.textContent = albumLabel;
      }
    } else {
      selectPhoto(activePhotoId);
    }
  }

  function renderAlbums() {
    if (!albumsEl) return;
    albumsEl.innerHTML = '';
    albums.forEach(function (album) {
      var count = getPhotosForAlbum(album.id).length;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'photo-gallery-album-btn' + (album.id === activeAlbumId ? ' is-active' : '');
      btn.setAttribute('role', 'listitem');
      btn.setAttribute('data-album-id', album.id);

      var main = document.createElement('span');
      main.className = 'photo-gallery-album-btn-main';

      if (album.color) {
        var dot = document.createElement('span');
        dot.className = 'photo-gallery-album-dot';
        dot.style.backgroundColor = album.color;
        dot.setAttribute('aria-hidden', 'true');
        main.appendChild(dot);
      }

      var label = document.createElement('span');
      label.className = 'photo-gallery-album-btn-label';
      label.textContent = album.label;
      main.appendChild(label);

      var countEl = document.createElement('span');
      countEl.className = 'photo-gallery-album-btn-count';
      countEl.textContent = String(count);

      btn.appendChild(main);
      btn.appendChild(countEl);
      btn.addEventListener('click', function () {
        selectAlbum(album.id);
      });
      albumsEl.appendChild(btn);
    });
  }

  function renderFilmstrip(albumPhotos) {
    if (!filmstripEl) return;
    filmstripEl.innerHTML = '';
    albumPhotos.forEach(function (photo) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'photo-gallery-thumb' + (photo.id === activePhotoId ? ' is-active' : '');
      btn.setAttribute('role', 'option');
      btn.setAttribute('aria-selected', photo.id === activePhotoId ? 'true' : 'false');
      btn.setAttribute('data-photo-id', photo.id);
      btn.setAttribute('aria-label', photo.title);

      var img = document.createElement('img');
      img.src = photo.src;
      img.alt = '';
      img.loading = 'lazy';
      img.draggable = false;
      btn.appendChild(img);

      btn.addEventListener('click', function () {
        selectPhoto(photo.id);
      });
      filmstripEl.appendChild(btn);
    });

    var activeThumb = filmstripEl.querySelector('.photo-gallery-thumb.is-active');
    if (activeThumb && typeof activeThumb.scrollIntoView === 'function') {
      activeThumb.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
    }
  }

  function renderGrid(albumPhotos) {
    if (!gridEl) return;
    gridEl.innerHTML = '';
    albumPhotos.forEach(function (photo) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'photo-gallery-grid-item';
      btn.setAttribute('data-photo-id', photo.id);
      btn.setAttribute('aria-label', photo.title);

      var thumb = document.createElement('span');
      thumb.className = 'photo-gallery-grid-thumb';
      var img = document.createElement('img');
      img.src = photo.src;
      img.alt = '';
      img.loading = 'lazy';
      img.draggable = false;
      thumb.appendChild(img);

      var title = document.createElement('p');
      title.className = 'photo-gallery-grid-title';
      title.textContent = photo.title;

      var albumRow = document.createElement('p');
      albumRow.className = 'photo-gallery-grid-album';

      var color = getAlbumColor(photo.albumId);
      if (color) {
        var dot = document.createElement('span');
        dot.className = 'photo-gallery-album-dot';
        dot.style.backgroundColor = color;
        dot.setAttribute('aria-hidden', 'true');
        albumRow.appendChild(dot);
      }

      var albumName = document.createElement('span');
      albumName.textContent = getAlbumLabel(photo.albumId);
      albumRow.appendChild(albumName);

      btn.appendChild(thumb);
      btn.appendChild(title);
      btn.appendChild(albumRow);

      btn.addEventListener('click', function () {
        activePhotoId = photo.id;
        setViewMode('detail');
        selectPhoto(photo.id);
      });

      gridEl.appendChild(btn);
    });
  }

  function updateMainView(photo) {
    if (!photo) return;
    if (mainImg) {
      mainImg.src = photo.src;
      mainImg.alt = photo.title;
    }
    if (titleEl) titleEl.textContent = photo.title;
    if (metaTitle) metaTitle.textContent = photo.title;
    if (metaDate) metaDate.textContent = photo.date || '—';
    if (metaCategory) metaCategory.textContent = photo.category;
    if (metaCamera) metaCamera.textContent = photo.camera;
    if (metaLocation) metaLocation.textContent = photo.location;
  }

  function selectPhoto(photoId) {
    var photo = getPhotoById(photoId);
    if (!photo) return;
    activePhotoId = photo.id;
    updateMainView(photo);

    if (filmstripEl) {
      Array.prototype.forEach.call(filmstripEl.querySelectorAll('.photo-gallery-thumb'), function (thumb) {
        var isActive = thumb.getAttribute('data-photo-id') === activePhotoId;
        thumb.classList.toggle('is-active', isActive);
        thumb.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
      var activeThumb = filmstripEl.querySelector('.photo-gallery-thumb.is-active');
      if (activeThumb && typeof activeThumb.scrollIntoView === 'function') {
        activeThumb.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
      }
    }
  }

  function selectAlbum(albumId) {
    activeAlbumId = albumId;
    var albumPhotos = getPhotosForAlbum(albumId);
    activePhotoId = albumPhotos[0] ? albumPhotos[0].id : null;
    renderAlbums();
    renderFilmstrip(albumPhotos);
    if (viewMode === 'grid') {
      renderGrid(albumPhotos);
      if (titleEl) {
        var album = null;
        for (var i = 0; i < albums.length; i++) {
          if (albums[i].id === activeAlbumId) {
            album = albums[i];
            break;
          }
        }
        titleEl.textContent = album ? album.label : 'Photos';
      }
    } else {
      selectPhoto(activePhotoId);
    }
  }

  function stepPhoto(delta) {
    if (viewMode !== 'detail') return;
    var albumPhotos = getPhotosForAlbum(activeAlbumId);
    if (!albumPhotos.length) return;
    var index = 0;
    for (var i = 0; i < albumPhotos.length; i++) {
      if (albumPhotos[i].id === activePhotoId) {
        index = i;
        break;
      }
    }
    var next = (index + delta + albumPhotos.length) % albumPhotos.length;
    selectPhoto(albumPhotos[next].id);
  }

  function open() {
    modal.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    setBodyScrollLock(true);
    updateTotalCount();
    selectAlbum(activeAlbumId || 'all');
    requestAnimationFrame(function () {
      modal.classList.add('is-open');
    });
    if (closeBtn) closeBtn.focus();
  }

  function close() {
    modal.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    setBodyScrollLock(false);
    setTimeout(function () {
      if (!modal.classList.contains('is-open')) modal.hidden = true;
    }, 250);
    trigger.focus();
  }

  function isOpen() {
    return modal.classList.contains('is-open');
  }

  trigger.addEventListener('click', function () {
    if (isOpen()) close();
    else open();
  });

  if (closeBtn) closeBtn.addEventListener('click', close);
  if (overlay) overlay.addEventListener('click', close);

  if (viewGridBtn) {
    viewGridBtn.addEventListener('click', function () {
      setViewMode('grid');
    });
  }
  if (viewDetailBtn) {
    viewDetailBtn.addEventListener('click', function () {
      setViewMode('detail');
    });
  }

  document.addEventListener('keydown', function (e) {
    if (!isOpen()) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      stepPhoto(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      stepPhoto(1);
    }
  });

  updateTotalCount();
  renderAlbums();
})();
