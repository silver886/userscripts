// ==UserScript==
// @name        Google Drive to Docs Redirector
// @namespace   https://longhill.io/
// @version     1.1.0
// @description Redirect Office files from Drive viewer to Google Docs/Sheets/Slides editor
// @icon        https://ssl.gstatic.com/docs/doclist/images/drive_favicon_2026_32dp.png
// @grant       none
// @match       https://drive.google.com/file/d/*
// @run-at      document-start
// @updateURL   https://raw.githubusercontent.com/silver886/userscripts/master/drive.google.com/drive-to-docs-redirector.meta.js
// @downloadURL https://raw.githubusercontent.com/silver886/userscripts/master/drive.google.com/drive-to-docs-redirector.user.js
// ==/UserScript==

(function () {
  'use strict';

  const REDIRECT_MAP = {
    // Word
    'docx': 'document',
    'doc': 'document',
    'docm': 'document',
    'dot': 'document',
    'dotx': 'document',
    // Excel
    'xlsx': 'spreadsheets',
    'xls': 'spreadsheets',
    'xlsm': 'spreadsheets',
    'xlt': 'spreadsheets',
    'xltx': 'spreadsheets',
    'csv': 'spreadsheets',
    // PowerPoint
    'pptx': 'presentation',
    'ppt': 'presentation',
    'pptm': 'presentation',
    'pot': 'presentation',
    'potx': 'presentation'
  };

  const TITLE_SUFFIX = ' - Google Drive';

  function getFileId() {
    const match = window.location.pathname.match(/\/file\/d\/([^/]+)/);
    return match ? match[1] : null;
  }

  function getExtensionFromTitle(title) {
    if (!title || !title.endsWith(TITLE_SUFFIX)) return null;

    const filename = title.slice(0, -TITLE_SUFFIX.length).trim();
    if (!filename) return null;

    const lastDot = filename.lastIndexOf('.');
    if (lastDot === -1 || lastDot === filename.length - 1) return null;

    return filename.slice(lastDot + 1).toLowerCase();
  }

  function doRedirect() {
    const fileId = getFileId();
    if (!fileId) return false;

    const ext = getExtensionFromTitle(document.title);
    if (!ext) return false;

    const target = REDIRECT_MAP[ext];
    if (!target) return false;

    window.location.replace(`https://docs.google.com/${target}/d/${fileId}/edit`);
    return true;
  }

  function startObserver() {
    if (doRedirect()) return;

    let attempts = 0;
    const MAX_ATTEMPTS = 50;

    const observer = new MutationObserver(() => {
      if (doRedirect()) {
        observer.disconnect();
      }
    });

    const titleEl = document.querySelector('title');
    if (titleEl) {
      observer.observe(titleEl, { childList: true, characterData: true, subtree: true });
    }
    observer.observe(document.head || document.documentElement, { childList: true, subtree: true });

    const interval = setInterval(() => {
      attempts++;
      if (doRedirect() || attempts >= MAX_ATTEMPTS) {
        clearInterval(interval);
        observer.disconnect();
      }
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      observer.disconnect();
    }, 5000);
  }

  // Handle initial load
  startObserver();

  // Handle tab restore from discarded/frozen state
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      doRedirect();
    }
  });

  // Handle bfcache restoration (back/forward cache)
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      doRedirect();
    }
  });

  // Handle tab freeze/resume (Page Lifecycle API)
  document.addEventListener('resume', () => {
    doRedirect();
  });
})();
