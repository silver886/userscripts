// ==UserScript==
// @name        Lumo Auto Ghost Mode
// @namespace   https://longhill.io/
// @version     1.0.0
// @description This script makes Lumo uses ghost mode by default
// @icon        https://www.google.com/s2/favicons?sz=64&domain=lumo.proton.me
// @grant       none
// @include     /^https://lumo\.proton\.me/.*$/
// @updateURL   https://raw.githubusercontent.com/silver886/userscripts/master/lumo.proton.me/auto-ghost.meta.js
// @downloadURL https://raw.githubusercontent.com/silver886/userscripts/master/lumo.proton.me/auto-ghost.user.js
// ==/UserScript==

((selector, options = {}) => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector);
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });

    if (options.timeout) {
      setTimeout(() => {
        observer.disconnect();
        reject("Timeout");
      }, options.timeout);
    }
  });
})('button.sidebar-item[aria-label="New ghost chat"]', { timeout: 5 * 60 * 1000 })
  .then((button) => { button.click(); });
