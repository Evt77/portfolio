/**
 * passport-session — session-scoped visitor passport storage.
 *
 * Usage:
 *   <script src="js/passport-session.js"></script>
 *   PassportSession.hasPassport()
 *   PassportSession.getPassport()
 *   PassportSession.savePassport(data)
 *   PassportSession.clearPassport()
 *
 * Data persists for the browser tab session only (sessionStorage).
 */
(function () {
  var STORAGE_KEY = 'visitorPassport';

  function hasPassport() {
    try {
      return sessionStorage.getItem(STORAGE_KEY) !== null;
    } catch (e) {
      return false;
    }
  }

  function getPassport() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function savePassport(data) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  }

  function clearPassport() {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      /* ignore */
    }
  }

  window.PassportSession = {
    hasPassport: hasPassport,
    getPassport: getPassport,
    savePassport: savePassport,
    clearPassport: clearPassport,
  };
})();
