// ==UserScript==
// @name         Auto Reloader
// @namespace    https://longhill.io/
// @version      1.0.0
// @description  Reloads the page at a fixed interval
// @grant        none
// @updateURL   https://raw.githubusercontent.com/silver886/userscripts/master/auto-reloader.meta.js
// @downloadURL https://raw.githubusercontent.com/silver886/userscripts/master/auto-reloader.user.js
// ==/UserScript==

setTimeout(() => {
    location.reload();
}, 5_000);
