// ==UserScript==
// @name        ss21 sidedish
// @version     2.2.4
// @description A companion userscript for the ss21 userstyle.
// @author      saxamaphone69
// @namespace   https://github.com/saxamaphone69/ss21
// @match       *://boards.4chan.org/*
// @match       *://boards.4channel.org/*
// @match       *://find.4chan.org/*
// @match       *://find.4channel.org/*
// @match       *://www.4chan.org/*
// @connect     4chan.org
// @connect     4channel.org
// @connect     a.4cdn.org
// @connect     4cdn.org
// @grant       GM.xmlHttpRequest
// @run-at      document-start
// @updateURL   https://github.com/saxamaphone69/ss21/raw/master/sidedish.user.js
// @downloadURL https://github.com/saxamaphone69/ss21/raw/master/sidedish.user.js
// ==/UserScript==

(async () => {
  "use strict";
  console.time("Initialising ss21 sidedish...");

  /*! @ryanmorr/ready v1.3.1 | https://github.com/ryanmorr/ready */
  !function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).ready=e()}}(function(){return function l(i,u,f){function a(t,e){if(!u[t]){if(!i[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(c)return c(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var o=u[t]={exports:{}};i[t][0].call(o.exports,function(e){return a(i[t][1][e]||e)},o,o.exports,l,i,u,f)}return u[t].exports}for(var c="function"==typeof require&&require,e=0;e<f.length;e++)a(f[e]);return a}({1:[function(e,t,r){"use strict";var n;Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(e,t){n||(n=new MutationObserver(u)).observe(o.documentElement,{childList:!0,subtree:!0});if(e===o&&i)return t.call(o,o),function(){};var r={selector:e,callback:t};v.push(r),"string"==typeof e&&Array.from(o.querySelectorAll(e)).forEach(function(e){return t.call(e,e)});return function(){return function(e){var t=v.length;for(;t--;)e===v[t]&&v.splice(t,1);!v.length&&n&&(n.disconnect(),n=null)}(r)}};var v=[],o=window.document,l=o.documentElement,i=/complete|loaded|interactive/.test(o.readyState);i||o.addEventListener("DOMContentLoaded",function(){i=!0;for(var e=v.length;e--;){var t=v[e];t.selector===o&&(t.callback.call(o,o),v.splice(e,1))}});var y=["matches","webkitMatchesSelector","msMatchesSelector"].reduce(function(e,t){return e||(t in l?t:e)},null);function u(e){var t=!0,r=!1,n=void 0;try{for(var o,l=e[Symbol.iterator]();!(t=(o=l.next()).done);t=!0){var i=o.value,u=!0,f=!1,a=void 0;try{for(var c,d=function(){var n=c.value;v.forEach(function(e){var t,r;1===n.nodeType&&(t=n,r=e.selector,t[y](r))&&e.callback.call(n,n)})},s=i.addedNodes[Symbol.iterator]();!(u=(c=s.next()).done);u=!0)d()}catch(e){f=!0,a=e}finally{try{u||null==s.return||s.return()}finally{if(f)throw a}}}}catch(e){r=!0,n=e}finally{try{t||null==l.return||l.return()}finally{if(r)throw n}}}t.exports=r.default},{}]},{},[1])(1)});

  const d = document,
    doc = d.documentElement,
    config = (() => {
      switch (location.pathname.split("/")[2]) {
        case "thread":
          return "thread";
        case "catalog":
          return "catalog";
        case "archive":
          return "archive";
        default:
          return "index";
      }
    })();

  doc.classList.add("site-loading");

	if (window.location.host.split('.')[0] === 'find') {
		doc.classList.remove("site-loading");
		doc.classList.add("is-search");
	}

  function $(sel, root) {
    return (root || d).querySelector(sel);
  }

  function $$(sel, root) {
    return [...(root || d).querySelectorAll(sel)];
  }

  function on(sel, events, cb) {
    sel = Array.isArray(sel) ? sel : [sel];
    let event = events.split(/\s+/);
    sel.forEach((sel) => {
      event.forEach((ev) => {
        sel.addEventListener(ev, cb, {
          passive: true,
        });
      });
    });
		return this;
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
      if (typeof parent === "string") {
        $(parent).appendChild(el);
      } else {
        parent.appendChild(el);
      }
    }
    if (obj.prepend) {
      let parent = obj.prepend;
      if (typeof parent === "string") {
        $(parent).prepend(el);
      } else {
        parent.prepend(el);
      }
    }
    return el;
  }

  function removeStyle(sel) {
    if (sel) {
      console.log(
        "%css21 sidedish is removing this stylesheet: ",
        "color:green;",
        sel
      );
      sel.remove();
			return true;
    } else {
			return false;
      console.log("%css21 sidedish was unable to find: ", "color:red;", sel);
    }
  }

  function sendNotification(type, content) {
    d.dispatchEvent(
      new CustomEvent("CreateNotification", {
        detail: {
          type: type, // success, info, warning, error
          content: content,
          lifetime: 0,
        },
      })
    );
  }

	function removeStyles() {
    removeStyle($("style[type]", d.head)); // this removes the inline mobile css
    removeStyle($("#fourchanx-css", d.head)); // this removes the css required by 4chan x
		removeStyle($("#custom-css", d.head)); // this removes the css required by 4chan x
		//removeStyle($("#sound-player-css", d.head)); // sounds player
  }

  function init() {
    on(d, "IndexBuild", doc.classList.remove("site-loading"));

    on(d, "OpenSettings", function () {
      let settingDescriptions = $$(".description");
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
      const navBot = $("#boardNavDesktopFoot");
      on(navBot, "click", function (e) {
        if (e.target === this) {
          this.classList.toggle("is-active");
        }
      });
    }

    toggleFooter();

    // this should return the `#header-bar` element
    const headerBar = $("#header-bar");

    const scrollProgress = make({
      el: "progress",
      attr: {
        id: "scroll-progress",
        value: 0,
        max: 100,
      },
      appendTo: headerBar,
    });

    const hero = $(".boardBanner"),
      heroHeight = 480,
      boardTitle = $(".boardTitle"),
      mVal = 300;

    //boardTitle.style.setProperty("--length", boardTitle.innerText.length);

    let ticking = false;

    function rAF(args) {
      if (!ticking) {
        window.requestAnimationFrame(function () {
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
		// https://codepen.io/shshaw/pen/LYVBVve
		/*
		[...document.querySelectorAll("[data-fit-text]")].forEach(el => {
  // We just need the length of the string as a CSS variable...
  el.style.setProperty("--length", el.innerText.length);
});
*/
		/*
		[data-fit-text] {
  // Sized via the viewport, but the --width variable could be set by JS based on the element or parent's width.
  --width: 100vw;

  // Adjust scale depending on your exact font.
  --scale: 0.9;

  font-size: calc(var(--width) / (var(--length, 1) * 0.5) * var(--scale, 1));

  font-family: "Poppins", sans-serif;
  font-weight: 600;
  line-height: 1;
  margin: 1rem 0;
}
	*/
    function fancyShadow(el) {
      let oVal = window.scrollY,
        nVal = (oVal / 2.5) * 0.1;
      if (oVal >= heroHeight) {
        headerBar.classList.add("scrolled");
        el.style.textShadow = "0 0 var(--primary-500)";
      } else {
        headerBar.classList.remove("scrolled");
        el.style.textShadow =
          16 + -nVal + "px " + (16 + -nVal) + "px var(--primary-500)";
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
      el.style.transform = "translate3d(0, " + cVal + "px, 0)";
    }

    function progressScroll(el) {
      let dHeight = d.body.clientHeight,
        wHeight = window.innerHeight,
        scrollPercent = (window.scrollY / (dHeight - wHeight)) * 100;
      el.value = scrollPercent.toFixed(2);
    }

    on(window, "scroll", function (e) {
      rAF(parallaxHero(hero));
      rAF(fancyShadow(boardTitle));
      rAF(progressScroll(scrollProgress));
    });

    function countBacks() {
      //console.log("Counting backlinks");
      let posts = $$(".post");
      for (let post of posts) {
        let backlinks = $$(".backlink", post);
        post.setAttribute("data-backlinks-length", backlinks.length);
        if (backlinks.length > 8) {
          post.parentNode.classList.add("post--hot");
        }
      }
    }

    function convertSummaries() {
      //console.log("Converting summaries");
      let summaries = $$(".summary");
      for (let summary of summaries) {
        let oldText, newText;
        oldText = summary.innerHTML;
        newText = oldText.replace(/(\d+(?=\ ))/g, "<b>$1</b>");
        summary.innerHTML = newText;
      }
    }

    function swapInfo() {
      //console.log("Switching OP's post info");
      let ops = $$(".op");
      for (let op of ops) {
        let opPostInfo = $(".postInfo", op);
        op.prepend(opPostInfo);
        op.classList.add("post--file-swapped");
      }
    }

    // if a thumbnail has a tall aspect ratio, allow for greater styling control
    function checkHeights() {
      let thumbs = $$(".fileThumb");
      for (let thumb of thumbs) {
        let thumbSize = $("img", thumb);
        let thumbHeight = thumbSize.style.height;
        let thumbWidth = thumbSize.style.width;
        if (thumbHeight.slice(0, -2) > thumbWidth.slice(0, -2)) {
          // adds it to the `.thread` container
          thumb.parentNode.parentNode.parentNode.parentNode.classList.add(
            "file--tall"
          );
        }
      }
    }

		function checkAspect() {
			// https://stackoverflow.com/a/61544600
			let ERROR_ALLOWED = 0.05
			let STANDARD_ASPECT_RATIOS = [
				[1, '1'],
				[4/3, '43'],
				[5/4, '54'],
				[3/2, '32'],
				[16/10, '1610'],
				[16/9, '169'],
				[21/9, '219'],
				[32/9, '329'],
			]
			let RATIOS = STANDARD_ASPECT_RATIOS.map(function(tpl){return tpl[0]}).sort()
			let LOOKUP = Object()
			for (let i=0; i < STANDARD_ASPECT_RATIOS.length; i++){
				LOOKUP[STANDARD_ASPECT_RATIOS[i][0]] = STANDARD_ASPECT_RATIOS[i][1]
			}

			/*
			Find the closest value in a sorted array
			*/
			function findClosest(arrSorted, value){
				var closest = arrSorted[0]
				var closestDiff = Math.abs(arrSorted[0] - value)
				for (let i=1; i<arrSorted.length; i++){
					let diff = Math.abs(arrSorted[i] - value)
					if (diff < closestDiff){
						closestDiff = diff
						closest = arrSorted[i]
					} else {
						return closest
					}
				}
				return arrSorted[arrSorted.length-1]
			}

			/*
			Estimate the aspect ratio based on width x height (order doesn't matter)
			*/
			function estimateAspectRatio(dim1, dim2){
				let ratio = Math.max(dim1, dim2) / Math.min(dim1, dim2)
				if (ratio in LOOKUP){
					return LOOKUP[ratio]
				}

				// Look by approximation
				var closest = findClosest(RATIOS, ratio)
				if (Math.abs(closest - ratio) <= ERROR_ALLOWED){
					// was: return '~' + LOOKUP[closest]
					return LOOKUP[closest]
				}

				return 'non-standard-ratio' + Math.round(ratio * 100) / 100 + '1'
			}
			let thumbs = $$(".fileThumb");
      for (let thumb of thumbs) {
        let thumbSize = $("img", thumb);
        let thumbHeight = thumbSize.style.height;
        let thumbWidth = thumbSize.style.width;
				let NthumbHeight = thumbHeight.slice(0, -2);
				let NthumbWidth = thumbWidth.slice(0, -2);
        thumb.parentNode.parentNode.parentNode.parentNode.setAttribute("data-aspect-ratio", estimateAspectRatio(NthumbWidth, NthumbHeight));
      }
		}

		function disabledPrevAndNext() {
			let prevBut = document.querySelector('.pagelist .prev button');
			if (prevBut.disabled) {
				document.querySelector('.pagelist .prev').dataset.clickable = 'false';
			} else {
				document.querySelector('.pagelist .prev').dataset.clickable = 'true';
		  }
			let nextBut = document.querySelector('.pagelist .next button');
			if (nextBut.disabled) {
				document.querySelector('.pagelist .next').dataset.clickable = 'false';
			} else {
				document.querySelector('.pagelist .next').dataset.clickable = 'true';
		  }
		}

    if (config === "index") {
      const target = $(".board");
      const config = {
        childList: true,
      };

      function subscriber(mutations) {
        convertSummaries();
        swapInfo();
				disabledPrevAndNext();
      }
      const observer = new MutationObserver(subscriber);
      observer.observe(target, config);
    }

    if (config === "index") {
      on(d, "IndexRefresh", convertSummaries);
      on(d, "IndexRefresh", swapInfo);
      on(d, "IndexRefresh", checkHeights);
			on(d, "IndexRefresh", checkAspect);
    }

    if (config === "thread") {
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

		// two from https://github.com/duanemoody
		// javascript:let p=$$("a.download-button"), i=0, v=setInterval(() => {p[i++].click(); (i>p.length) && clearInterval(v);}, 1000);
		// javascript:var pics=document.querySelectorAll("a.download-button"), counter=0, interval=setInterval(function() {pics[counter].click(); counter++; if (counter > pics.length) {clearInterval(interval);}}, 1000);
		// https://stackoverflow.com/questions/30088897/trying-to-download-all-of-the-images-on-the-website-using-javascript
		// https://gist.github.com/sfrdmn/8834747
		// https://gist.github.com/lucidBrot/432d2c6184a188a060e58dbb36bd2084
		function downloadMedia() {
      ready('#shortcuts', (element) => {
        let _this = element;
        make({
          el: 'a',
          cl4ss: 'material-icons shortcut ss21--download-all',
          attr: {
            title: 'Download all media in thread'
          },
          prepend: _this,
          html: `download_for_offline`
        });
      });
      let imgToggle = $('.ss21--download-all');
      imgToggle.addEventListener('click', function() {
        let allMedia = [].slice.call(document.querySelectorAll('.download-button'));
				let i = 0;
				try {
					allMedia.forEach(function(media) {
						downloadThem(media, i++);
					})
				} catch(e) {
					console.log('Something went wrong...', e);
				}
				function downloadThem(media) {
					setTimeout(() => {
						media.click();
					}, i * 500)
				}
      });
    }

    downloadMedia();

		function addTransition() {
			ready('#fourchanx-settings', (element) => {
				console.log('hey im here');
				let _this = element;
				//function $(sel, root) {
				//function on(sel, events, cb) {
				/*
				el.classList.add("lol");
        el.addEventListener("transitionend", function () {
        return el.remove();
        },true)
				*/
				let close = $('.close', _this);
				close.addEventListener('click', function(e) {
					console.log('closing it');
					e.preventDefault();
					d.addEventListener("animationend", function () {
						_this.classList.add('active');
						_this.parentNode.remove();
					}, true);
				}, { passive: false });
				/*on(close, 'click', (e) => {
					e.preventDefault();
					_this.addEventListener("transitionend", function () {
						_this.parentNode.remove();
					}, true);*/
				});
			//});
		}
		on(d, "OpenSettings", function () {
			addTransition();
		});

    function boardDrawer() {
      let boardDrawer = make({
        el: "aside",
        cl4ss: "ss21--board-drawer-background",
        appendTo: "body",
        html: `<nav class="ss21--board-drawer"></nav>`,
      });
      ready("#board-list", (element) => {
        let _this = element;
        make({
          el: "a",
          cl4ss: "material-icons ss21--board-drawer-toggle",
          prepend: headerBar,
          attr: {
            title: "Open board list drawer",
          },
          html: `menu`,
        });
      });
      let boardNavToggle = $(".ss21--board-drawer-toggle");
      let url = "https://a.4cdn.org/boards.json";

      function createNode(element) {
        return d.createElement(element);
      }

      function append(parent, el) {
        return parent.appendChild(el);
      }

      boardDrawer.addEventListener("click", function (e) {
        if (e.target === boardDrawer) {
          boardDrawer.classList.remove("drawer-open");
        }
      });

      on(boardNavToggle, "click", function () {
        boardDrawer.classList.add("drawer-open");
        fetch(url)
          .then((resp) => resp.json())
          .then(function (data) {
            let boards = data.boards;
            return boards.map(function (board) {
              let anchor = createNode("a");
              anchor.classList.add("board-list-entry");
              anchor.textContent = `/${board.board}/ - ${board.title}`;
              if (board.ws_board === 0) {
                anchor.classList.add("board--nws");
                anchor.href = `https://boards.4chan.org/${board.board}/`;
              } else {
                anchor.classList.add("board--ws");
                anchor.href = `https://boards.4channel.org/${board.board}/`;
              }
              append($(".ss21--board-drawer"), anchor);
            });
          });
      });
    }

    boardDrawer();

    function resizeQuotePreviews() {
      ready("#qp", (element) => {
        let _this = element;
        let winHeight = window.innerHeight;
        let qpHeight = _this.offsetHeight + 32;
        if (qpHeight > winHeight) {
          let scaledHeight = winHeight / qpHeight;
          _this.style.transformOrigin = "top left";
          _this.style.transform = "scale(" + scaledHeight + ")";
        }
      });
    }

    resizeQuotePreviews();

		function fetch4chanBoardList() {
			// Okay, so this used to work fine. Then Cloudflare has added some CDN protection thingy to 4chan.org, which makes any attempts to read the HTML not work.
			// I had this as a request so that if any boards were added, it would auto update. I'll stick to hard coding it instead.
			let footer = $("#boardNavDesktopFoot");
			let currentBoard = location.pathname.split("/")[1];
			let boardList = `<div class="column">
<h3 style="text-decoration: underline; display: inline;">Japanese Culture</h3>
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
<li><a href="//boards.4channel.org/vt/" class="boardlink">Virtual YouTubers</a></li>
</ul>
<h3 style="text-decoration: underline; display: inline;">Video Games</h3>
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
<h3 style="text-decoration: underline; display: inline;">Interests</h3>
<ul>
<li><a href="//boards.4channel.org/co/" class="boardlink">Comics &amp; Cartoons</a></li>
<li><a href="//boards.4channel.org/g/" class="boardlink">Technology</a></li>
<li><a href="//boards.4channel.org/tv/" class="boardlink">Television &amp; Film</a></li>
<li><a href="//boards.4channel.org/k/" class="boardlink">Weapons</a></li>
<li><a href="//boards.4channel.org/o/" class="boardlink">Auto</a></li>
<li><a href="//boards.4channel.org/an/" class="boardlink">Animals &amp; Nature</a></li>
<li><a href="//boards.4channel.org/tg/" class="boardlink">Traditional Games</a></li>
<li><a href="//boards.4channel.org/sp/" class="boardlink">Sports</a></li>
<li><a href="//boards.4channel.org/xs/" class="boardlink">Extreme Sports</a></li>
<li><a href="//boards.4channel.org/pw/" class="boardlink">Professional Wrestling</a></li>
<li><a href="//boards.4channel.org/sci/" class="boardlink">Science &amp; Math</a></li>
<li><a href="//boards.4channel.org/his/" class="boardlink">History &amp; Humanities</a></li>
<li><a href="//boards.4channel.org/int/" class="boardlink">International</a></li>
<li><a href="//boards.4channel.org/out/" class="boardlink">Outdoors</a></li>
<li><a href="//boards.4channel.org/toy/" class="boardlink">Toys</a></li>
</ul>
</div>
<div class="column">
<h3 style="text-decoration: underline; display: inline;">Creative</h3>
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
<h3 style="text-decoration: underline; display: inline;">Other</h3>
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
<h3 style="text-decoration: underline; display: inline;">Misc.</h3> <h3 style="display: inline;"><span class="warning" title="Not Safe For Work"><sup style="vertical-align: text-bottom;">(NSFW)</sup></span></h3>
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
<h3 style="text-decoration: underline; display: inline;">Adult</h3> <h3 style="display: inline;"><span class="warning" title="Not Safe For Work"><sup style="vertical-align: text-bottom;">(NSFW)</sup></span></h3>
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
</div>`;
			console.log('%cSwitching board list to the one from 4chan.org', 'color:black;background-color:cornflowerBlue');
			footer.innerHTML = `<div class="boardList">` + boardList + `</div>`;
			if ($(`#boardNavDesktopFoot a[href$="/${currentBoard}/`)) {
				$(`#boardNavDesktopFoot a[href$="/${currentBoard}/`).classList.add(
					"current"
				);
			}
			/*
			console.log('%cGrabbing current 4chan board list from 4chan.org', 'color:black;background-color:cornflowerBlue');
			GM.xmlHttpRequest({
				method: "GET",
				url: "https://4chan.org",
				responseType: 'text',
				onload: response => {
					let parser = new DOMParser();
					let doc = parser.parseFromString(response.responseText, 'text/html');
					console.log(doc);
					let img = doc.querySelector('#boards .boxcontent');
					footer.innerHTML = `<div class="boardList">` + img.innerHTML + `</div>`;
					if ($(`#boardNavDesktopFoot a[href$="/${currentBoard}/`)) {
						$(`#boardNavDesktopFoot a[href$="/${currentBoard}/`).classList.add(
							"current"
						);
					}
				},
				onerror: response => console.warn('Failed grabbing 4chan board list:', response)
			});
			*/
			/*
			fetch('/about').then(function (response) {
	// The API call was successful!
	return response.text();
}).then(function (html) {

	// Convert the HTML string into a document object
	var parser = new DOMParser();
	var doc = parser.parseFromString(html, 'text/html');

	// Get the image file
	var img = doc.querySelector('img');
	console.log(img);

}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});
//, { mode: 'no-cors'}
*/
			/*
			const url = 'https://4chan.org';
			fetch(url, {mode: 'no-cors'}).then(function(response) {
				console.log('hey', response.ok);
			}).catch(function(error) {
				console.warn('Something went wrong.', error);
			});
			*/
		}

		fetch4chanBoardList();
/*
		function checkBanner() {
			ready("#bannerCnt > img", (element) => {
        let _this = element;
        console.log(_this);
      });
			let bannerContainer, bannerImg;
			bannerContainer = $('#bannerCnt');
			bannerImg = $('#bannerCnt > img');
			//console.log(bannerImg);
			if (bannerImg === null) {
				bannerContainer.classList.add('blocked');
				bannerContainer.removeAttribute('title');
			} else {
				bannerContainer.classList.add('unblocked');
			}
		}

		checkBanner();
*/
		function getSortMode() {
			//console.log('sorting mode');
			let sorter, boardCon, oldVal;
			sorter = $("#index-sort");
			boardCon = $(".board");
			oldVal = sorter.value;
			boardCon.classList.add(oldVal);
			on(sorter, "change", () => {
				boardCon.classList.remove(oldVal);
				boardCon.classList.add(sorter.value);
			});
		}

		if (config === "index") {
			on(d, "IndexRefresh", getSortMode);
		}

    function passLinker() {
      let passLink, bottomLinks;
      passLink = $(".pass-link-container");
      bottomLinks = $("#footer-links");
      if (passLink) {
				console.log('%cPutting the 4chan Pass link in ss21\'s footer', 'color:black;background-color:cornflowerBlue');
        bottomLinks.appendChild(passLink);
      } else {
        return false;
      }
    }

    passLinker();
/*
		function masonry() {
			let grids = [...document.querySelectorAll('.board')];
			if (grids.length && getComputedStyle(grids[0]).gridTemplateRows !== 'masonry') {
				console.log('masonry not supported, running masonry function');
				grids = grids.map(grid => ({
					_el: grid,
					gap: parseFloat(getComputedStyle(grid).rowGap),
					items: [...grid.childNodes].filter(c => c.nodeType === 1),
					ncol: 0 })); // was 0
console.log(grids);
				function layout() {
					console.log('running layout');
					grids.forEach(grid => {
						// get the post relayout number of columns
						let ncol = getComputedStyle(grid._el).gridTemplateColumns.split(' ').length;
						console.log(getComputedStyle(grid._el).gridTemplateColumns.split(' ').length);

						// if the number of columns has changed
						if (grid.ncol !== ncol) {
							// update number of columns
							grid.ncol = ncol;
							console.log('rearrange grid items');

							// revert to initial positioning, no margin
							grid.items.forEach(c => c.style.removeProperty('margin-top'));

							// if we have more than one column
							if (grid.ncol > 1) {
								grid.items.slice(ncol).forEach((c, i) => {
									let prev_fin = grid.items[i].getBoundingClientRect().bottom, // bottom edge of item above
											curr_ini = c.getBoundingClientRect().top; // top edge of current item
									c.style.marginTop = `${prev_fin + grid.gap - curr_ini}px`;
								});
							}
						}
					});
				}

				//addEventListener('load', e => {
				//	layout(); // initial load
				//	addEventListener('resize', layout, false); // on resize
				//}, false);
			}
		}
*/
		//const isInViewport = (e, {top:t, height:h} = e.getBoundingClientRect()) => t <= innerHeight && t + h >= 0;
		function switchOPimg() {
			let files = $$('.catalog-post');
			for (let file of files) {
				let fullLink = $("a.fileThumb", file);
				let thumbLink = $("a.fileThumb img", file);
				let catLink = $(".catalog-thumb", file);
				if (!fullLink) {
					console.log('no file');
				} else if (fullLink.href.endsWith("m")) {
					let OpVideo = d.createElement("video");
          OpVideo.classList.add("catalog-thumb-video");
					OpVideo.poster = thumbLink.src;
          OpVideo.loop = true;
					OpVideo.playsinline = true;
					OpVideo.autoplay = true;
          OpVideo.src = fullLink;
					//OpVideo.play();
          OpVideo.muted = true;
          catLink.before(OpVideo);
					catLink.remove();/*
					let playPromise = OpVideo.play();
          if (playPromise !== undefined) {
            playPromise.then((_) => {
							// all good, video started
						}).catch((error) => {
						// hey the video didn't play
							//if (isInViewport(OpVideo) === true) {
							OpVideo.play();
							//}
						});
          }*/
				} else {
					catLink.src = fullLink.href;
				}
			}
		}
		function playVids() {
			const OPvids = [...document.querySelectorAll('.file--video')];
			OPvids.forEach(el => {
				el.addEventListener("mouseover", (e) => {
					$('.catalog-thumb-video', el).play();
				}, false);
				el.addEventListener('mouseleave', (e) => {
					$('.catalog-thumb-video', el).pause();
				}, false);
			})
		}
if (doc.classList.contains('catalog-mode')) {
	on(d, "IndexRefresh", switchOPimg);
	on(d, "IndexRefresh", playVids);
	//on(d, "IndexBuild", switchOPimg);
		//on(d, "IndexRefresh", masonry);
               // window.addEventListener('resize', masonry);
               // masonry();
}



		// https://www.smashingmagazine.com/2021/07/dynamic-header-intersection-observer/
		// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
		/*
		function intObs() {
const boxes = [...document.querySelectorAll('.catalog-thumb-video')]

const getOptions = () => {
	return {
		root: null,
		rootMargin: '0px',
		threshold: 1
	}
}

const setInViewStyles = (target) => {
	target.classList.add('is-inview')
	target.play()
	//$('.catalog-thumb-video', target).play();
	//dElementToInfoBox(target)
	// console.log('in view')
}

const setOutOfViewStyles = (target) => {
	target.classList.remove('is-inview')
	target.pause()
	//$('.catalog-thumb-video', target).pause();
	//moveElementFromInfoBox(target)
	// console.log('out of view')
}

const onIntersect = (entries) => {
	entries.forEach(entry => {
		const { target, isIntersecting, intersectionRatio } = entry
		//console.log(entry)

		if (intersectionRatio >= 1 && isIntersecting) {
			return setInViewStyles(target)
		}

		return setOutOfViewStyles(target)
	})
}

const reinitObserver = (options) => {
	if (observer) {
		observer.disconnect()
	}

	setTimeout(() => {
		observer = new IntersectionObserver(onIntersect, options)

		boxes.forEach(el => {
			observer.observe(el)
		})
	}, 100)
}

let observer = new IntersectionObserver(onIntersect, getOptions())

boxes.forEach(el => {
	observer.observe(el)
})
		}

		on(d, "IndexRefresh", intObs);
*/
		function spinnerText() {
			let footer = $("#absbot");
			let svgSpin = make({
          el: "div",
          cl4ss: "ss21--spinner-text",
          html: `<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><defs><path d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250" id="textcircle"></path></defs><text><textPath xlink:href="#textcircle">4chan4chan4chan4chan</textPath></text></svg></div>`
        });
			function append(parent, el) {
        return parent.appendChild(el);
      }
      append(footer, svgSpin);
		}

		spinnerText();

    if (location.pathname.split("/")[1] === "fit") {
      function weightConverter() {
        let weightElement = make({
          el: "aside",
          cl4ss: "ss21--fit ss21--fit-weight",
          appendTo: "body",
          html: `<form oninput="let mW = aW.value / 2.2046; resultW.value = mW.toFixed(2);">
<input class="ss21--fit-input" type="number" id="aW" name="aW" min="0" step="10" /><span class="ss21--fit-unit">lbs</span><br>
<output class="ss21--fit-output" name="resultW" for="aW">0</output><span class="ss21--fit-unit">kg</span>
</form>`,
        });
      }

      weightConverter();

      function heightConverter() {
        let heightElement = make({
          el: "aside",
          cl4ss: "ss21--fit ss21--fit-height",
          appendTo: "body",
          html: `<form oninput="let pH = aH.value * 30.48; let qH = bH.value * 2.54; let rH = pH + qH; resultH.value = rH.toFixed(1);">
<input class="ss21--fit-input" type="number" id="aH" name="aH" min="0" /><span class="ss21--fit-unit">&prime;</span>
<input class="ss21--fit-input" type="number" id="bH" name="bH" min="0" max="12" /><span class="ss21--fit-unit">&Prime;</span><br>
<output class="ss21--fit-output" name="resultH" for="aH bH">0</output><span class="ss21--fit-unit">cm</span>
</form>`,
        });
      }

      heightConverter();
    }

    function exifToggle() {
      let exifs = $$(".abbr a");
      for (let exif of exifs) {
        let toggleExif = exif.getAttribute("onclick");
        exif.removeAttribute("onclick");
        on(exif, "click", function () {
          let newtoggleExif = toggleExif.match(/'(.*)(.*)'/g);
          newtoggleExif = String(newtoggleExif);
          newtoggleExif = newtoggleExif.slice(1, -1);
          let el = $("#" + newtoggleExif);
          el.style.display = "table" != el.style.display ? "table" : "none";
        });
      }
    }

    exifToggle();
    on(d, "IndexRefresh", exifToggle);

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
      ready("#index-search", (element) => {
        let _this = element;
        on(_this, "focus", function () {
          doc.classList.add("ss21--index-searching");
          make({
            el: "aside",
            cl4ss: "ss21--index-searching-curtain",
            appendTo: "body",
          });
        });
        on(_this, "blur", function () {
          $(".ss21--index-searching-curtain").remove();
          if (_this.dataset.searching != 1) {
            doc.classList.remove("ss21--index-searching");
            $(".ss21--index-searching-curtain").remove();
          }
        });
      });
    }

    if (config === "index") {
      searchCurtain();
    }

		function checkBlockedBanner() {
			ready('#bannerCnt > img', (element) => {
				let _this = element;
				if (_this.attributes.length === 3) {
					doc.classList.add("ss21--banner-blocked");
					$('#bannerCnt').removeAttribute('title');
				}
			});
		}

		on(d, "IndexRefresh", checkBlockedBanner);

    function OPAsBanner() {
      ready(".op .fileThumb", (element) => {
        let _this = element,
          banner = $(".boardBanner");
        let OpFullFile = _this.href;
        if (OpFullFile.endsWith("m")) {
          let OpVideo = document.createElement("video");
          OpVideo.classList.add("ss21--op-banner");
          OpVideo.loop = true;
          OpVideo.src = OpFullFile;
          let playPromise = OpVideo.play();
          if (playPromise !== undefined) {
            playPromise.then((_) => {}).catch((error) => {});
          }
          OpVideo.muted = true;
          banner.appendChild(OpVideo);
        } else {
          let OpImage = new Image();
          OpImage.classList.add("ss21--op-banner");
          OpImage.src = OpFullFile;
          banner.appendChild(OpImage);
        }
      });
    }

    if (config === "thread") {
      OPAsBanner();
    }
/*
// https://css-tricks.com/userainbow/
function useEffect() {
  const cb = () => {
    const viewportHeight = window.innerHeight
    const contentHeight = document.body.getBoundingClientRect().height
    const viewportsPerRotation = Math.min(
      3,
      contentHeight / viewportHeight
    )
    const from = 51
    const progress =
      window.scrollY / (viewportHeight * viewportsPerRotation)
    const h = (from + 360 * progress) % 360

    document.body.style.backgroundColor = `hsl(${h}deg, 100%, 50%)`
  }
  window.addEventListener('scroll', cb, { passive: true })
  return () => window.removeEventListener('scroll', cb)
}

		useEffect();
		*/

		ready("#sound-player-css", (element) => {
        doc.classList.add('fcsp-enabled');
      }
    );

      ready("#mascot", (element) => {
				// in theory, this means the user has oneechan enabled
				removeStyle($("#ch4SS", d.head));
        let _this = element;
        if (_this) {
          make({
            el: "aside",
            cl4ss: "fcx-announcement warning",
            html: `ss21 is <b>not</b> compatible with OneeChan; please disable it to continue using ss21 as intended.`,
            appendTo: "body",
          });
      }
      });
  }

  on(d, "4chanXInitFinished", init);

	if (window.location.host.split('.')[0] === 'find') {
		document.addEventListener('DOMContentLoaded', (event) => {
			function swapInfo() {
      let ops = $$(".op");
      for (let op of ops) {
        let opPostInfo = $(".postInfo", op);
        op.prepend(opPostInfo);
        op.classList.add("post--file-swapped");
      }
    }
			swapInfo();
			function fitText(el) {
       el.style.fontSize = Math.max(Math.min(el.clientWidth / 10, parseFloat(1/0)), parseFloat(-1/0)) + 'px';
      }

      fitText($('.boardBanner'));
		})
	}
	//on(d, "PlayerEvent", removeStyle($("#sound-player-css", d.head)));
/*
	function backup() {
		doc.classList.remove('site-loading');
		doc.classList.add('no-fourchan-x');
		on(d, "4chanXInitFinished", doc.classList.remove('no-fourchan-x'));
	}

	on(d, 'DOMContentLoaded', backup);
*/
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
  console.timeEnd("Initialising ss21 sidedish...");
})();
