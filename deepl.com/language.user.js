// ==UserScript==
// @name        DeepL default target language
// @namespace   https://longhill.io/
// @version     1.0.0
// @description This script injects target language
// @icon        https://www.google.com/s2/favicons?sz=64&domain=deepl.com
// @grant       none
// @run-at      document-start
// @include     /^https://(www\.)?deepl\.com\/.*$/
// @updateURL   https://raw.githubusercontent.com/silver886/userscripts/master/deepl.com/language.meta.js
// @downloadURL https://raw.githubusercontent.com/silver886/userscripts/master/deepl.com/language.user.js
// ==/UserScript==

(() => {
  const TARGET_LANG = 'zh-Hant';

  const KEY = 'lmt_text_translator';

  const state = (() => {
    try {
      const parsed = JSON.parse(localStorage.getItem(KEY) || '{}');
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (e) {
      return {};
    }
  })();

  if (Array.isArray(state.lastUsedTargetLanguages) && state.lastUsedTargetLanguages.length) return;

  state.lastUsedTargetLanguages = [TARGET_LANG];
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    /* storage unavailable — DeepL falls back to its own default */
  }
})();
