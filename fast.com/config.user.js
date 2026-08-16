// ==UserScript==
// @name        Fast.com config
// @namespace   https://longhill.io/
// @version     1.0.0
// @description This script injects customized configurations
// @icon        https://www.google.com/s2/favicons?sz=64&domain=fast.com
// @grant       none
// @run-at      document-start
// @include     /^https://fast.com(/.*)?$/
// @updateURL   https://raw.githubusercontent.com/silver886/userscripts/master/fast.com/config.meta.js
// @downloadURL https://raw.githubusercontent.com/silver886/userscripts/master/fast.com/config.user.js
// ==/UserScript==

Object.entries({
  showAdvanced: true,
  measureUploadLatency: true,
  minConnections: 8,
  maxConnections: 16,
  minDuration: 15,
  maxDuration: 60,
  shouldPersist: true,
}).filter(([_, value]) => (value !== null && value !== undefined)).forEach(([key, value]) => {
  try {
    localStorage.setItem(key, String(value));
  } catch (e) {
    /* storage unavailable — fast.com falls back to its defaults */
  }
});
