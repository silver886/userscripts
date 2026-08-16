// ==UserScript==
// @name        Google Translate: default target language
// @namespace   https://longhill.io/
// @version     1.0.0
// @description This script injects target language
// @icon        https://www.google.com/s2/favicons?sz=64&domain=translate.google.com
// @grant       none
// @run-at      document-start
// @include     /^https://translate\.google\.com\/.*$/
// @updateURL   https://raw.githubusercontent.com/silver886/userscripts/master/translate.google.com/language.meta.js
// @downloadURL https://raw.githubusercontent.com/silver886/userscripts/master/translate.google.com/language.user.js
// ==/UserScript==

((url) => {
  if (url) location.replace(url);
})((() => {
  const TARGET_LANG = 'zh-TW';
  const SOURCE_LANG = 'auto';
  const OPERATION = 'translate';

  const params = new URLSearchParams(location.search);
  if (params.get('tl')) return null;

  params.set('tl', TARGET_LANG);
  if (!params.get('sl')) params.set('sl', SOURCE_LANG);
  if (!params.get('op')) params.set('op', OPERATION);
  return `${location.origin}${location.pathname}?${params.toString()}${location.hash}`;
})());
