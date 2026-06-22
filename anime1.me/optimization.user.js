// ==UserScript==
// @name        Anime1.me optimization
// @namespace   https://longhill.io/
// @version     1.0.0
// @description This script add keyboard shortcuts
// @icon        https://www.google.com/s2/favicons?sz=64&domain=anime1.me
// @grant       none
// @include     /^https://anime1\.me/?$/
// @updateURL   https://raw.githubusercontent.com/silver886/userscripts/master/anime1.me/optimization.meta.js
// @downloadURL https://raw.githubusercontent.com/silver886/userscripts/master/anime1.me/optimization.user.js
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
                    find((v) => (v.textContent.trim() === '下一頁' && v.classList.contains('paginate_button') && v.classList.contains('next'))).
                    click();
                break;
            case 'KeyP':
                event.preventDefault();
                Array.from(document.querySelectorAll('a')).
                    find((v) => (v.textContent.trim() === '上一頁' && v.classList.contains('paginate_button') && v.classList.contains('previous'))).
                    click();
                break;
        }
    }
});
