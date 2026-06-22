// ==UserScript==
// @name        GT.RU Wishlist
// @namespace   https://longhill.io/
// @version     1.0.0
// @description This script highlight wishlist in search list
// @icon        https://www.google.com/s2/favicons?sz=64&domain=gaytor.rent
// @grant       none
// @include     /^https://www\.(gaytor\.rent|gaytorrent\.ru)/(search|browse)\.php.*$/
// @updateURL   https://raw.githubusercontent.com/silver886/userscripts/master/gt.ru/wishlist.meta.js
// @downloadURL https://raw.githubusercontent.com/silver886/userscripts/master/gt.ru/wishlist.user.js
// ==/UserScript==

document.querySelectorAll("div.setwish").forEach((v) => {
  (new MutationObserver((mutationList, observer) => {
    mutationList.forEach(({ type, addedNodes }) => {
      if (type === "childList") {
        addedNodes.forEach((w) => {
          if (w.nodeName === "FONT") {
            w.textContent += "ed"
          }
        });
      }
    });
  })).observe(v, {
    childList: true,
  });
});

document.querySelectorAll("div.setwish>font").forEach((v) => {
  v.textContent += "ed"
});
