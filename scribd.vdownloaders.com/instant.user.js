// ==UserScript==
// @name        PDF free instant download
// @namespace   https://longhill.io/
// @version     1.0.0
// @description This script reveals download links immediately
// @icon        https://www.google.com/s2/favicons?sz=64&domain=scribd.vdownloaders.com
// @grant       none
// @include     https://scribd.vdownloaders.com/vdoc/
// @updateURL   https://raw.githubusercontent.com/silver886/userscripts/master/scribd.vdownloaders.com/instant.meta.js
// @downloadURL https://raw.githubusercontent.com/silver886/userscripts/master/scribd.vdownloaders.com/instant.user.js
// ==/UserScript==

Array.from(document.querySelectorAll('.d-none')).forEach((v) => { v.classList.remove('d-none') })
