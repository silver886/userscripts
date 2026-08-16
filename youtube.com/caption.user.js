// ==UserScript==
// @name        YouTube caption settings
// @namespace   https://longhill.io/
// @version     1.0.0
// @description This script injects customized default caption configurations
// @icon        https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant       none
// @include     /^https://(www|m)\.youtube\.com/.*$/
// @updateURL   https://raw.githubusercontent.com/silver886/userscripts/master/youtube.com/caption.meta.js
// @downloadURL https://raw.githubusercontent.com/silver886/userscripts/master/youtube.com/caption.user.js
// ==/UserScript==

(() => {
  'use strict';

  const PREFERRED_LANGS = ['zh-Hant', 'en'];

  const CAPTION_STYLE = {
    fontSizeIncrement: -2,
    backgroundOpacity: 0.25,
  };

  const isFresh = (rawValue) => {
    try {
      const parsed = JSON.parse(rawValue);
      if (!parsed || typeof parsed !== 'object') return false;
      if (parsed.data === undefined || parsed.data === null) return false;
      if (parsed.expiration && parsed.expiration < Date.now()) return false;
      if (parsed.creation && parsed.creation > Date.now()) return false;
      return true;
    } catch (e) {
      return false;
    }
  };

  Object.entries({
    'yt-player-sticky-caption': true,
    'yt-player-caption-persistence': true,
    'yt-player-caption-language-preferences': PREFERRED_LANGS,
    ...(PREFERRED_LANGS.length ? {
      'yt-player-caption-sticky-language': PREFERRED_LANGS[0],
    } : {}),
    ...(Object.keys(CAPTION_STYLE).length ? {
      'yt-player-caption-display-settings': JSON.stringify(CAPTION_STYLE),
    } : {}),
  }).forEach(([key, value]) => {
    const now = Date.now();
    const ttl = now + 30 * 24 * 60 * 60 * 1000;
    try {
      const existing = localStorage.getItem(key);
      if (existing === null || !isFresh(existing)) {
        localStorage.setItem(key, JSON.stringify({
          data: value,
          creation: now,
          expiration: ttl,
        }));
      }
    } catch (e) { }
  });
})();
