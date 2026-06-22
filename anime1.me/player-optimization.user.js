// ==UserScript==
// @name        Anime1.me player optimization
// @namespace   https://longhill.io/
// @version     1.0.0
// @description This script add keyboard shortcuts and initiate player
// @icon        https://www.google.com/s2/favicons?sz=64&domain=anime1.me
// @grant       none
// @include     /^https://anime1\.me/[0-9]+$/
// @updateURL   https://raw.githubusercontent.com/silver886/userscripts/master/anime1.me/player-optimization.meta.js
// @downloadURL https://raw.githubusercontent.com/silver886/userscripts/master/anime1.me/player-optimization.user.js
// ==/UserScript==

document.addEventListener('keydown', (event) => {
  if (event.isComposing) return;

  const activeTag = document.activeElement.tagName;
  if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || document.activeElement.isContentEditable) {
    return;
  }

  if (event.shiftKey) {
    switch (event.code) {
      case 'KeyN':
        event.preventDefault();
        Array.from(document.querySelectorAll('a')).
          find((v) => (v.textContent.trim() === '下一集' && /\/\?p=[0-9]+/.test(v.getAttribute('href') || ''))).
          click();
        break;
      case 'KeyP':
        event.preventDefault();
        window.history.back();
        break;
    }
  }
});

document.querySelector('body>div#page>div#content>div#primary>main#main>article.post>div.entry-content>div.vjscontainer>div.video-js').click();
