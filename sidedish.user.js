// ==UserScript==
// @name        ss21 sidedish
// @version     2.1.0
// @description A companion userscript for the ss21 userstyle.
// @author      saxamaphone69
// @namespace   https://github.com/saxamaphone69/ss21
// @match       *://boards.4chan.org/*
// @match       *://boards.4channel.org/*
// @connect     4chan.org
// @connect     4channel.org
// @connect     4cdn.org
// @grant       GM_xmlhttpRequest
// @run-at      document-start
// @inject-into content
// ==/UserScript==

(async () => {
  'use strict';
  console.time('Initialising ss16 sidedish...');

  /*! @ryanmorr/ready v1.3.1 | https://github.com/ryanmorr/ready */
  !function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).ready=e()}}(function(){return function l(i,u,f){function a(t,e){if(!u[t]){if(!i[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(c)return c(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var o=u[t]={exports:{}};i[t][0].call(o.exports,function(e){return a(i[t][1][e]||e)},o,o.exports,l,i,u,f)}return u[t].exports}for(var c="function"==typeof require&&require,e=0;e<f.length;e++)a(f[e]);return a}({1:[function(e,t,r){"use strict";var n;Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(e,t){n||(n=new MutationObserver(u)).observe(o.documentElement,{childList:!0,subtree:!0});if(e===o&&i)return t.call(o,o),function(){};var r={selector:e,callback:t};v.push(r),"string"==typeof e&&Array.from(o.querySelectorAll(e)).forEach(function(e){return t.call(e,e)});return function(){return function(e){var t=v.length;for(;t--;)e===v[t]&&v.splice(t,1);!v.length&&n&&(n.disconnect(),n=null)}(r)}};var v=[],o=window.document,l=o.documentElement,i=/complete|loaded|interactive/.test(o.readyState);i||o.addEventListener("DOMContentLoaded",function(){i=!0;for(var e=v.length;e--;){var t=v[e];t.selector===o&&(t.callback.call(o,o),v.splice(e,1))}});var y=["matches","webkitMatchesSelector","msMatchesSelector"].reduce(function(e,t){return e||(t in l?t:e)},null);function u(e){var t=!0,r=!1,n=void 0;try{for(var o,l=e[Symbol.iterator]();!(t=(o=l.next()).done);t=!0){var i=o.value,u=!0,f=!1,a=void 0;try{for(var c,d=function(){var n=c.value;v.forEach(function(e){var t,r;1===n.nodeType&&(t=n,r=e.selector,t[y](r))&&e.callback.call(n,n)})},s=i.addedNodes[Symbol.iterator]();!(u=(c=s.next()).done);u=!0)d()}catch(e){f=!0,a=e}finally{try{u||null==s.return||s.return()}finally{if(f)throw a}}}}catch(e){r=!0,n=e}finally{try{t||null==l.return||l.return()}finally{if(r)throw n}}}t.exports=r.default},{}]},{},[1])(1)});

  const d = document,
    doc = d.documentElement,
    config = (() => {
      switch (location.pathname.split('/')[2]) {
        case 'thread':
          return 'thread';
        case 'catalog':
          return 'catalog';
        case 'archive':
          return 'archive';
        default:
          return 'index';
      }
    })();

  doc.classList.add('site-loading');

  function $(sel, root) {
    return (root || d).querySelector(sel);
  }

  function $$(sel, root) {
    return [...(root || d).querySelectorAll(sel)];
  }

  function on(sel, events, cb) {
    sel = Array.isArray(sel) ? sel : [sel];
    let event = events.split(/\s+/);
    sel.forEach(sel => {
      event.forEach(ev => {
        sel.addEventListener(ev, cb, {
          passive: true
        });
      });
    });
  }

  function make(obj) {
    let key,
      el = document.createElement(obj.el);
    if (obj.cl4ss) {
      el.className = obj.cl4ss;
    }
    if (obj.html) {
      el.innerHTML = obj.html;
    }
    if (obj.attr) {
      for (key in obj.attr) {
        if (obj.attr.hasOwnProperty(key)) {
          el.setAttribute(key, obj.attr[key]);
        }
      }
    }
    if (obj.appendTo) {
      let parent = obj.appendTo;
      if (typeof parent === 'string') {
        $(parent).appendChild(el);
      } else {
        parent.appendChild(el);
      }
    }
    if (obj.prepend) {
      let parent = obj.prepend;
      if (typeof parent === 'string') {
        $(parent).prepend(el);
      } else {
        parent.prepend(el);
      }
    }
    return el;
  }

  function removeStyle(sel) {
    if (sel) {
      console.log('%c ss16 sidedish is removing this stylesheet: ', 'color:green;', sel);
      sel.remove();
    } else {
      console.log('%c ss16 sidedish was unable to find: ', 'color:red;', sel);
    }
  }

  function removeStyles() {
    removeStyle($('style[type]', d.head)); // this removes the inline mobile css
    removeStyle($('#fourchanx-css', d.head)); // this removes the css required by 4chan x
  }

  function sendNotification(type, content) {
    d.dispatchEvent(new CustomEvent('CreateNotification', {
      detail: {
        type: type, // success, info, warning, error
        content: content,
        lifetime: 0
      }
    }));
  }

  function init() {
    on(d, 'IndexBuild', doc.classList.remove('site-loading'));

    on(d, 'OpenSettings', function() {
      let settingDescriptions = $$('.description');
      for (let settingDescription of settingDescriptions) {
        let content = settingDescription.textContent;
        content = content.slice(2);
        settingDescription.textContent = content;
      }
    });

    removeStyles();

    function getBoardType() {
      let type = style_group;
      type = type.slice(0, -6);
      doc.classList.add(type);
    }

    getBoardType();

    function toggleFooter() {
      const navBot = $('#boardNavDesktopFoot');
      on(navBot, 'click', function(e) {
        if (e.target === this) {
          this.classList.toggle('is-active');
        }
      });
    }

    toggleFooter();

    // this should return the `#header-bar` element
    const headerBar = $('#header-bar');

    const scrollProgress = make({
      el: 'progress',
      attr: {
        id: 'scroll-progress',
        value: 0,
        max: 100
      },
      appendTo: headerBar
    });

    const hero = $('.boardBanner'),
      heroHeight = 480,
      boardTitle = $('.boardTitle'),
      mVal = 300;

   boardTitle.style.setProperty("--length", boardTitle.innerText.length);

    let ticking = false;

    function rAF(cb, args) {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          cb(args);
          ticking = false;
        });
      }
      ticking = true;
    }
    /*
    //https://github.com/adactio/FitText.js/blob/master/fittext.js
    //https://github.com/rikschennink/fitty/blob/gh-pages/src/fitty.js
      function fitText(el) {
       el.style.fontSize = Math.max(Math.min(el.clientWidth / 10, parseFloat(1/0)), parseFloat(-1/0)) + 'px';
      }

      fitText(hero);
    */
    function fancyShadow(el) {
      let oVal = window.scrollY,
        nVal = (oVal / 2.5) * 0.1;
      if (oVal >= heroHeight) {
        headerBar.classList.add('scrolled');
        el.style.textShadow = '0 0 var(--primary-500)';
      } else {
        headerBar.classList.remove('scrolled');
        el.style.textShadow = (16 + -nVal) + 'px ' + (16 + -nVal) + 'px var(--primary-500)';
      }
    }

    function parallaxHero(el) {
      let oVal, cVal;
      oVal = Math.round(window.scrollY / 3);
      if (oVal < mVal) {
        cVal = oVal;
      } else {
        cVal = mVal;
      }
      el.style.transform = 'translate3d(0, ' + cVal + 'px, 0)';
    }

    function progressScroll(el) {
      let dHeight = d.body.clientHeight,
        wHeight = window.innerHeight,
        scrollPercent = (window.scrollY / (dHeight - wHeight)) * 100;
      el.value = scrollPercent.toFixed(2);
    }

    on(window, 'scroll', function(e) {
      rAF(parallaxHero(hero));
      rAF(fancyShadow(boardTitle));
      rAF(progressScroll(scrollProgress));
    });

    function countBacks() {
      console.log('Counting backlinks');
      let posts = $$('.post');
      for (let post of posts) {
        let backlinks = $$('.backlink', post);
        post.setAttribute('data-backlinks-length', backlinks.length);
        if (backlinks.length > 8) {
          post.parentNode.classList.add('post--hot');
        }
      }
    }

    function convertSummaries() {
      console.log('Converting summaries');
      let summaries = $$('.summary');
      for (let summary of summaries) {
        let oldText, newText;
        oldText = summary.innerHTML;
        newText = oldText.replace(/(\d+(?=\ ))/g, '<b>$1</b>');
        summary.innerHTML = newText;
      }
    }

    function swapInfo() {
      console.log('Switching OP\'s post info');
      let ops = $$('.op');
      for (let op of ops) {
        let opPostInfo = $('.postInfo', op);
        op.prepend(opPostInfo);
        op.classList.add('post--file-swapped');
      }
    }

    // if a thumbnail has a tall aspect ratio, allow for greater styling control
    function checkHeights() {
      let thumbs = $$('.fileThumb');
      for (let thumb of thumbs) {
        let thumbSize = $('img', thumb);
        let thumbHeight = thumbSize.style.height;
        let thumbWidth = thumbSize.style.width;
        if (thumbHeight.slice(0, -2) > thumbWidth.slice(0, -2)) {
          // adds it to the `.thread` container
          thumb.parentNode.parentNode.parentNode.parentNode.classList.add('file--tall');
        }
      }
    }

    if (config === 'index') {
      const target = $('.board');
      const config = {
        childList: true
      };

      function subscriber(mutations) {
        convertSummaries();
        swapInfo();
      }
      const observer = new MutationObserver(subscriber);
      observer.observe(target, config);
    }

    if (config === 'index') {
      on(d, 'IndexRefresh', convertSummaries);
      on(d, 'IndexRefresh', swapInfo);
      on(d, 'IndexRefresh', checkHeights);
    }

    if (config === 'thread') {
      countBacks();
      swapInfo();
    }
/*
    function imgOpacity() {
      ready('#shortcuts', (element) => {
        let _this = element;
        make({
          el: 'a',
          cl4ss: 'material-icons shortcut ss16--img-toggle',
          attr: {
            title: 'Toggle thumbnail opacity'
          },
          prepend: _this,
          html: `visibility_off`
        });
      });
      let imgToggle = $('.ss16--img-toggle');
      imgToggle.addEventListener('click', function(e) {
        doc.classList.toggle('ss16--img-opacity');
      });
    }

    imgOpacity();
*/
    function boardDrawer() {
      let boardDrawer = make({
        el: 'aside',
        cl4ss: 'ss16--board-drawer-background',
        appendTo: 'body',
        html: `<nav class="ss16--board-drawer"></nav>`
      });
      ready('#board-list', (element) => {
        let _this = element;
        make({
          el: 'a',
          cl4ss: 'material-icons ss16--board-drawer-toggle',
          prepend: headerBar,
          attr: {
            title: 'Open board list drawer'
          },
          html: `menu`
        });
      });
      let boardNavToggle = $('.ss16--board-drawer-toggle');
      let url = 'https://a.4cdn.org/boards.json';

      function createNode(element) {
        return d.createElement(element);
      }

      function append(parent, el) {
        return parent.appendChild(el);
      }

      boardDrawer.addEventListener('click', function(e) {
        if (e.target === boardDrawer) {
          boardDrawer.classList.remove('drawer-open');
        }
      });

      on(boardNavToggle, 'click', function() {
        boardDrawer.classList.add('drawer-open');
        fetch(url)
          .then(resp => resp.json())
          .then(function(data) {
            let boards = data.boards;
            return boards.map(function(board) {
              let anchor = createNode('a');
              anchor.classList.add('board-list-entry');
              anchor.textContent = `/${board.board}/ - ${board.title}`;
              if (board.ws_board === 0) {
                anchor.classList.add('board--nws');
                anchor.href = `https://boards.4chan.org/${board.board}/`;
              } else {
                anchor.classList.add('board--ws');
                anchor.href = `https://boards.4channel.org/${board.board}/`;
              }
              append($('.ss16--board-drawer'), anchor);
            });
          });
      });
    }

    boardDrawer();

    function resizeQuotePreviews() {
      ready('#qp', (element) => {
        let _this = element;
        let winHeight = window.innerHeight;
        let qpHeight = _this.offsetHeight + 32;
        if (qpHeight > winHeight) {
          let scaledHeight = (winHeight / qpHeight);
          _this.style.transformOrigin = 'top left';
          _this.style.transform = 'scale(' + scaledHeight + ')';
        }
      });
    }

    resizeQuotePreviews();

    function fetch4chanBoardList() {
      $('#boardNavDesktopFoot').innerHTML = `<div class="boardList">
<div class="column">
<h3>Japanese Culture</h3>
<ul>
<li><a href="//boards.4channel.org/a/" class="boardlink">Anime &amp; Manga</a></li>
<li><a href="//boards.4channel.org/c/" class="boardlink">Anime/Cute</a></li>
<li><a href="//boards.4channel.org/w/" class="boardlink">Anime/Wallpapers</a></li>
<li><a href="//boards.4channel.org/m/" class="boardlink">Mecha</a></li>
<li><a href="//boards.4channel.org/cgl/" class="boardlink">Cosplay &amp; EGL</a></li>
<li><a href="//boards.4channel.org/cm/" class="boardlink">Cute/Male</a></li>
<li><a href="//boards.4chan.org/f/" class="boardlink">Flash</a></li>
<li><a href="//boards.4channel.org/n/" class="boardlink">Transportation</a></li>
<li><a href="//boards.4channel.org/jp/" class="boardlink">Otaku Culture</a></li>
</ul>
<h3>Video Games</h3>
<ul>
<li><a href="//boards.4channel.org/v/" class="boardlink">Video Games</a></li>
<li><a href="//boards.4channel.org/vg/" class="boardlink">Video Game Generals</a></li>
<li><a href="//boards.4channel.org/vm/" class="boardlink">Video Games/Multiplayer</a></li>
<li><a href="//boards.4channel.org/vmg/" class="boardlink">Video Games/Mobile</a></li>
<li><a href="//boards.4channel.org/vp/" class="boardlink">Pokémon</a></li>
<li><a href="//boards.4channel.org/vr/" class="boardlink">Retro Games</a></li>
<li><a href="//boards.4channel.org/vrpg/" class="boardlink">Video Games/RPG</a></li>
<li><a href="//boards.4channel.org/vst/" class="boardlink">Video Games/Strategy</a></li>
</ul>
</div>
<div class="column">
<h3>Interests</h3>
<ul>
<li><a href="//boards.4channel.org/co/" class="boardlink">Comics &amp; Cartoons</a></li>
<li><a href="//boards.4channel.org/g/" class="boardlink">Technology</a></li>
<li><a href="//boards.4channel.org/tv/" class="boardlink">Television &amp; Film</a></li>
<li><a href="//boards.4channel.org/k/" class="boardlink">Weapons</a></li>
<li><a href="//boards.4channel.org/o/" class="boardlink">Auto</a></li>
<li><a href="//boards.4channel.org/an/" class="boardlink">Animals &amp; Nature</a></li>
<li><a href="//boards.4channel.org/tg/" class="boardlink">Traditional Games</a></li>
<li><a href="//boards.4channel.org/sp/" class="boardlink">Sports</a></li>
<li><a href="//boards.4channel.org/asp/" class="boardlink">Alternative Sports</a></li>
<li><a href="//boards.4channel.org/sci/" class="boardlink">Science &amp; Math</a></li>
<li><a href="//boards.4channel.org/his/" class="boardlink">History &amp; Humanities</a></li>
<li><a href="//boards.4channel.org/int/" class="boardlink">International</a></li>
<li><a href="//boards.4channel.org/out/" class="boardlink">Outdoors</a></li>
<li><a href="//boards.4channel.org/toy/" class="boardlink">Toys</a></li>
</ul>
</div>
<div class="column">
<h3>Creative</h3>
<ul>
<li><a href="//boards.4chan.org/i/" class="boardlink">Oekaki</a></li>
<li><a href="//boards.4channel.org/po/" class="boardlink">Papercraft &amp; Origami</a></li>
<li><a href="//boards.4channel.org/p/" class="boardlink">Photography</a></li>
<li><a href="//boards.4channel.org/ck/" class="boardlink">Food &amp; Cooking</a></li>
<li><a href="//boards.4chan.org/ic/" class="boardlink">Artwork/Critique</a></li>
<li><a href="//boards.4chan.org/wg/" class="boardlink">Wallpapers/General</a></li>
<li><a href="//boards.4channel.org/lit/" class="boardlink">Literature</a></li>
<li><a href="//boards.4channel.org/mu/" class="boardlink">Music</a></li>
<li><a href="//boards.4channel.org/fa/" class="boardlink">Fashion</a></li>
<li><a href="//boards.4channel.org/3/" class="boardlink">3DCG</a></li>
<li><a href="//boards.4channel.org/gd/" class="boardlink">Graphic Design</a></li>
<li><a href="//boards.4channel.org/diy/" class="boardlink">Do-It-Yourself</a></li>
<li><a href="//boards.4channel.org/wsg/" class="boardlink">Worksafe GIF</a></li>
<li><a href="//boards.4channel.org/qst/" class="boardlink">Quests</a></li>
</ul>
</div>
<div class="column">
<h3>Other</h3>
<ul>
<li><a href="//boards.4channel.org/biz/" class="boardlink">Business &amp; Finance</a></li>
<li><a href="//boards.4channel.org/trv/" class="boardlink">Travel</a></li>
<li><a href="//boards.4channel.org/fit/" class="boardlink">Fitness</a></li>
<li><a href="//boards.4channel.org/x/" class="boardlink">Paranormal</a></li>
<li><a href="//boards.4channel.org/adv/" class="boardlink">Advice</a></li>
<li><a href="//boards.4channel.org/lgbt/" class="boardlink">LGBT</a></li>
<li><a href="//boards.4channel.org/mlp/" class="boardlink">Pony</a></li>
<li><a href="//boards.4channel.org/news/" class="boardlink">Current News</a></li>
<li><a href="//boards.4channel.org/wsr/" class="boardlink">Worksafe Requests</a></li>
<li><a href="//boards.4channel.org/vip/" class="boardlink">Very Important Posts</a></li>
</ul>
<h3>Misc.<sup title="Not Safe For Work">(NSFW)</sup></h3>
<ul>
<li><a href="//boards.4chan.org/b/" class="boardlink">Random</a></li>
<li><a href="//boards.4chan.org/r9k/" class="boardlink">ROBOT9001</a></li>
<li><a href="//boards.4chan.org/pol/" class="boardlink">Politically Incorrect</a></li>
<li><a href="//boards.4chan.org/bant/" class="boardlink">International/Random</a></li>
<li><a href="//boards.4chan.org/soc/" class="boardlink">Cams &amp; Meetups</a></li>
<li><a href="//boards.4chan.org/s4s/" class="boardlink">Shit 4chan Says</a></li>
</ul>
</div>
<div class="column">
<h3>Adult<sup title="Not Safe For Work">(NSFW)</sup></h3>
<ul>
<li><a href="//boards.4chan.org/s/" class="boardlink">Sexy Beautiful Women</a></li>
<li><a href="//boards.4chan.org/hc/" class="boardlink">Hardcore</a></li>
<li><a href="//boards.4chan.org/hm/" class="boardlink">Handsome Men</a></li>
<li><a href="//boards.4chan.org/h/" class="boardlink">Hentai</a></li>
<li><a href="//boards.4chan.org/e/" class="boardlink">Ecchi</a></li>
<li><a href="//boards.4chan.org/u/" class="boardlink">Yuri</a></li>
<li><a href="//boards.4chan.org/d/" class="boardlink">Hentai/Alternative</a></li>
<li><a href="//boards.4chan.org/y/" class="boardlink">Yaoi</a></li>
<li><a href="//boards.4chan.org/t/" class="boardlink">Torrents</a></li>
<li><a href="//boards.4chan.org/hr/" class="boardlink">High Resolution</a></li>
<li><a href="//boards.4chan.org/gif/" class="boardlink">Adult GIF</a></li>
<li><a href="//boards.4chan.org/aco/" class="boardlink">Adult Cartoons</a></li>
<li><a href="//boards.4chan.org/r/" class="boardlink">Adult Requests</a></li>
</ul>
</div>
</div>`;
      let currentBoard = location.pathname.split('/')[1];
      if ($(`#boardNavDesktopFoot a[href$="/${currentBoard}/`)) {
        $(`#boardNavDesktopFoot a[href$="/${currentBoard}/`).classList.add('current');
      }
    }

    fetch4chanBoardList();

    function passLinker() {
      let passLink, bottomLinks;
      passLink = $('.pass-link-container');
      bottomLinks = $('#footer-links');
      if (passLink) {
        bottomLinks.appendChild(passLink);
      } else {
        return false;
      }
    };

    passLinker();

    if (location.pathname.split('/')[1] === 'fit') {
      function weightConverter() {
        let weightElement = make({
          el: 'aside',
          cl4ss: 'ss16--fit ss16--fit-weight',
          appendTo: 'body',
          html: `<form oninput="let mW = aW.value / 2.2046; resultW.value = mW.toFixed(2);">
<input class="ss16--fit-input" type="number" id="aW" name="aW" min="0" step="10" /><span class="ss16--fit-unit">lbs</span><br>
<output class="ss16--fit-output" name="resultW" for="aW">0</output><span class="ss16--fit-unit">kg</span>
</form>`
        });
      }

      weightConverter();

      function heightConverter() {
        let heightElement = make({
          el: 'aside',
          cl4ss: 'ss16--fit ss16--fit-height',
          appendTo: 'body',
          html: `<form oninput="let pH = aH.value * 30.48; let qH = bH.value * 2.54; let rH = pH + qH; resultH.value = rH.toFixed(1);">
<input class="ss16--fit-input" type="number" id="aH" name="aH" min="0" /><span class="ss16--fit-unit">&prime;</span>
<input class="ss16--fit-input" type="number" id="bH" name="bH" min="0" max="12" /><span class="ss16--fit-unit">&Prime;</span><br>
<output class="ss16--fit-output" name="resultH" for="aH bH">0</output><span class="ss16--fit-unit">cm</span>
</form>`
        });
      }

      heightConverter();
    }

    function exifToggle() {
      let exifs = $$('.abbr a');
      for (let exif of exifs) {
        let toggleExif = exif.getAttribute('onclick');
        exif.removeAttribute('onclick');
        on(exif, 'click', function() {
          let newtoggleExif = toggleExif.match(/'(.*)(.*)'/g);
          newtoggleExif = String(newtoggleExif);
          newtoggleExif = newtoggleExif.slice(1, -1);
          let el = $('#' + newtoggleExif);
          el.style.display = "block" != el.style.display ? "block" : "none";
        });
      }
    }

    exifToggle();

    // this only works when the global message is already there. ideally, we'd have to observe the element for children changes and wrap the new children
    // it also means the toggle doesn't hide the element because it is looking for the parent
    /*
      function wrapGlobalMessage() {
       ready('.globalMessage', (element) => {
    	let _this = element;
    	let newHTML = d.createElement('div');
    	newHTML.classList.add('globalMessage--outer-wrapper');
    	var el = document.querySelector('div');
    	// append p as a new child to el
    	//let originalMessage = _this.innerHTML;
    	let original = $('.globalMessage');
    	//let newHTML = `<div class="globalMessage--inner-wrapper">${originalMessage}</div>`;
    	let appender = $('#globalToggle');
    	//_this.innerHTML = newHTML;
    	appender.parentNode.insertBefore(newHTML, appender.nextSibling);
    	appender.appendChild(original);
    	//let button = $('.hide-announcement-button', _this);
    	//on(button, 'click', function() {
    	// this.parentNode.parentNode.setAttribute('hidden', 'hidden');
    	//});
       });
      }

      wrapGlobalMessage();
    */
    function searchCurtain() {
      ready('#index-search', (element) => {
        let _this = element;
        on(_this, 'focus', function() {
          doc.classList.add('ss16--index-searching');
          make({
            el: 'aside',
            cl4ss: 'ss16--index-searching-curtain',
            appendTo: 'body'
          });
        });
        on(_this, 'blur', function() {
          $('.ss16--index-searching-curtain').remove();
          if (_this.dataset.searching != 1) {
            doc.classList.remove('ss16--index-searching');
            $('.ss16--index-searching-curtain').remove();
          }
        });
      });
    }

    if (config === 'index') {
      searchCurtain();
    }

    function OPAsBanner() {
      ready('.op .fileThumb', (element) => {
        let _this = element,
          banner = $('.boardBanner');
        let OpFullFile = _this.href;
        if (OpFullFile.endsWith('m')) {
          let OpVideo = document.createElement('video');
          OpVideo.classList.add('ss16--op-banner');
          OpVideo.loop = true;
          OpVideo.src = OpFullFile;
          let playPromise = OpVideo.play();
          if (playPromise !== undefined) {
            playPromise.then(_ => {})
              .catch(error => {});
          }
          OpVideo.muted = true;
          banner.appendChild(OpVideo);
        } else {
          let OpImage = new Image();
          OpImage.classList.add('ss16--op-banner');
          OpImage.src = OpFullFile;
          banner.appendChild(OpImage);
        }
      });
    }

    if (config === 'thread') {
      OPAsBanner();
    }

  }

  on(d, '4chanXInitFinished', init);

  /*
   function backup() {
    doc.classList.remove('site-loading');
    function removeStyleBackup(sels) {

     //let sels;
     //console.log('%c ss16 sidedish found this stylesheet and will remove it: ', 'color:orange;', sels);
     //for (let sel in sels) {
     //    sel.remove();
     //}
    }

    function removeStylesBackup(sell) {
     for (let sel of sell) {
  	console.log('%c ss16 sidedish found this stylesheet and will remove it: ', 'color:orange;', sel);
  	sel.remove();
     }
     //removeStyleBackup(); // this removes inline stylesheets
    }

    on(d, '4chanMainInit', function() {
     d.classList.add('fourchan-extension');
    });

    removeStylesBackup($$('style', d.head));
    //removeStylesBackup($$('link', d.head));

    if (!doc.classList.contains('fourchan-x')) {
     doc.classList.remove('site-loading');
     doc.classList.add('no-fourchan-x');
     if (getValue('noFourchanX') === true) {
  	make({
  	 el: 'aside',
  	 cl4ss: 'ss16--dialog',
  	 appendTo: 'body',
  	 html: `<div class="ss16--dialog-window">
  <header class="ss16--dialog-header">Slight Problem...</header>
  <section class="ss16--dialog-description">It doesn't seem like you've got 4chan X running. Double check your userscripts/extensions and try again.</section>
  <footer class="ss16--dialog-footer">
  <button class="ss16--dialog-button">Continue anyway</button>
  </div>`
  	});
  	on($('.ss16--dialog-button'), 'click', function() {
  	 setValue('noFourchanX', false);
  	 $('.ss16--dialog').remove();
  	});
     }
    }
   }

   on(d, 'DOMContentLoaded', backup);
  */
  console.timeEnd('Initialising ss16 sidedish...');
})();
