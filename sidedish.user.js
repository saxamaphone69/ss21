// ==UserScript==
// @name        ss21 sidedish
// @version     2.5.3
// @description A companion userscript for the ss21 userstyle.
// @author      saxamaphone69
// @namespace   https://github.com/saxamaphone69/ss21
// @match       *://boards.4chan.org/*
// @match       *://find.4chan.org/*
// @match       *://www.4chan.org/*
// @connect     4chan.org
// @connect     a.4cdn.org
// @connect     4cdn.org
// @grant       GM.xmlHttpRequest
// @run-at      document-start
// @icon        data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 96 960 960'%3E%3Cpath d='M70 622q0-15 11-29.5t29-23.5q22-9 44-22.5t54-13.5q48 0 72.5 28.5T343 590q37 0 64-28.5t74-28.5q47 0 72.5 28.5T618 590q36 0 62-28.5t73-28.5q33 0 54.5 14t43.5 23q18 9 29 23t11 29q0 13-9 21.5t-21 6.5q-36-8-56.5-26T753 606q-37 0-63.5 28.5T617 663q-48 0-74-28.5T481 606q-36 0-63.5 28.5T342 663q-47 0-72-28.5T208 606q-31 0-51.5 18T101 650q-13 2-22-6.5T70 622Zm0 185q0-14 10.5-28.5T110 756q22-9 44-23t54-14q47 0 72 28.5t63 28.5q37 0 64-28.5t74-28.5q47 0 72.5 28.5T617 776q36 0 62.5-28.5T753 719q32 0 54 14t45 23q18 8 28.5 22t10.5 29q0 14-9 22t-21 6q-36-8-56.5-25.5T753 792q-37 0-63.5 28.5T617 849q-48 0-74-28.5T481 792q-36 0-63.5 28.5T343 849q-47 0-73-28.5T208 792q-31 0-51.5 17.5T100 835q-12 2-21-6t-9-22Zm0-371q0-15 11-29.5t29-23.5q22-9 44-22.5t54-13.5q48 0 72.5 28.5T343 404q37 0 64-28.5t74-28.5q47 0 72.5 28.5T618 404q36 0 62-28.5t73-28.5q33 0 54.5 14t43.5 23q18 9 29 23t11 29q0 13-9 21.5t-21 6.5q-36-8-56.5-26T753 420q-37 0-63.5 28.5T617 477q-48 0-74-28.5T481 420q-36 0-64 28.5T342 477q-47 0-72-28.5T208 420q-31 0-51.5 18T101 464q-13 2-22-6.5T70 436Z'/%3E%3C/svg%3E
// @noframes
// @updateURL   https://github.com/saxamaphone69/ss21/raw/main/sidedish.user.js
// @downloadURL https://github.com/saxamaphone69/ss21/raw/main/sidedish.user.js
// ==/UserScript==
(async () => {
	"use strict";
	//console.group("Initialising ss21 sidedish...");
	/*! @ryanmorr/ready v1.4.0 | https://github.com/ryanmorr/ready */
	function _typeof(a){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}(function(a,b){"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):(a=a||self,a.ready=b())})(this,function(){'use strict';function a(a){for(var b,c=a.selector,d=a.callback,e=g.querySelectorAll(c),f=0,j=e.length;f<j;f++)b=e[f],b[h]||(b[h]=!0,d.call(b,b))}function b(){f.forEach(a)}function c(a){var b=f.indexOf(a);-1!==b&&f.splice(b,1),0===f.length&&null!=e&&(e.disconnect(),e=null)}function d(d,h){if("function"==typeof d&&(h=d,d=g,j))return h.call(g,g),function(){return null};e||(e=new MutationObserver(b),e.observe(g.documentElement,{childList:!0,subtree:!0}));var i={selector:d,callback:h};return f.push(i),a(i),function(){return c(i)}}var e=null,f=[],g=window.document,h=Symbol("ready"),j=/complete|loaded|interactive/.test(g.readyState);return j||g.addEventListener("DOMContentLoaded",function(){j=!0;for(var a,b=0,c=f.length;b<c;b++)a=f[b],a.selector===g&&(a.callback.call(g,g),f.splice(b--,1))}),d});

	const d = document,
				doc = d.documentElement,
				currentBoard = location.pathname.split("/")[1],
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

	function $(sel, root) {
		return (root || d).querySelector(sel);
	}

	function $$(sel, root) {
		return [...(root || d).querySelectorAll(sel)];
	}

	// add `.site-loading` to `html` so css can hide the page loading
	doc.classList.add("site-loading");

	if (location.pathname.split("/")[1] === 'search') {
		doc.classList.remove("site-loading");
		doc.classList.add("is-search");
		$('link[title]', d.head).disabled = true;
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
				el = d.createElement(obj.el);
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
			console.log("%css21 sidedish was unable to find: ", "color:red;", sel);
			return false;
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
		removeStyle($("link[rel='stylesheet']", d.head));
		removeStyle($("style[type]", d.head)); // this removes the inline mobile css
		removeStyle($("#fourchanx-css", d.head)); // this removes the css required by 4chan x
		removeStyle($("#custom-css", d.head)); // this removes extra, custom css by 4chan x
		//removeStyle($("#sound-player-css", d.head)); // sounds player
	}

			function replace4chanFooterList() {
			// Okay, so this used to work fine. Then Cloudflare has added some CDN protection thingy to 4chan.org, which makes any attempts to read the HTML not work.
			// I had this as a request so that if any boards were added, it would auto update. I'll stick to hard coding it instead.
			let footer = $("#boardNavDesktopFoot");
			let boardList = `<div class="column">
<h3>Japanese Culture</h3>
<ul>
<li><a href="//boards.4chan.org/a/" class="boardlink">Anime &amp; Manga</a></li>
<li><a href="//boards.4chan.org/c/" class="boardlink">Anime/Cute</a></li>
<li><a href="//boards.4chan.org/w/" class="boardlink">Anime/Wallpapers</a></li>
<li><a href="//boards.4chan.org/m/" class="boardlink">Mecha</a></li>
<li><a href="//boards.4chan.org/cgl/" class="boardlink">Cosplay &amp; EGL</a></li>
<li><a href="//boards.4chan.org/cm/" class="boardlink">Cute/Male</a></li>
<li><a href="//boards.4chan.org/f/" class="boardlink">Flash</a></li>
<li><a href="//boards.4chan.org/n/" class="boardlink">Transportation</a></li>
<li><a href="//boards.4chan.org/jp/" class="boardlink">Otaku Culture</a></li>
<li><a href="//boards.4chan.org/vt/" class="boardlink">Virtual YouTubers</a></li>
</ul>
<h3>Video Games</h3>
<ul>
<li><a href="//boards.4chan.org/v/" class="boardlink">Video Games</a></li>
<li><a href="//boards.4chan.org/vg/" class="boardlink">Video Game Generals</a></li>
<li><a href="//boards.4chan.org/vm/" class="boardlink">Video Games/Multiplayer</a></li>
<li><a href="//boards.4chan.org/vmg/" class="boardlink">Video Games/Mobile</a></li>
<li><a href="//boards.4chan.org/vp/" class="boardlink">Pokémon</a></li>
<li><a href="//boards.4chan.org/vr/" class="boardlink">Retro Games</a></li>
<li><a href="//boards.4chan.org/vrpg/" class="boardlink">Video Games/RPG</a></li>
<li><a href="//boards.4chan.org/vst/" class="boardlink">Video Games/Strategy</a></li>
</ul>
</div>
<div class="column">
<h3>Interests</h3>
<ul>
<li><a href="//boards.4chan.org/co/" class="boardlink">Comics &amp; Cartoons</a></li>
<li><a href="//boards.4chan.org/g/" class="boardlink">Technology</a></li>
<li><a href="//boards.4chan.org/tv/" class="boardlink">Television &amp; Film</a></li>
<li><a href="//boards.4chan.org/k/" class="boardlink">Weapons</a></li>
<li><a href="//boards.4chan.org/o/" class="boardlink">Auto</a></li>
<li><a href="//boards.4chan.org/an/" class="boardlink">Animals &amp; Nature</a></li>
<li><a href="//boards.4chan.org/tg/" class="boardlink">Traditional Games</a></li>
<li><a href="//boards.4chan.org/sp/" class="boardlink">Sports</a></li>
<li><a href="//boards.4chan.org/xs/" class="boardlink">Extreme Sports</a></li>
<li><a href="//boards.4chan.org/pw/" class="boardlink">Professional Wrestling</a></li>
<li><a href="//boards.4chan.org/sci/" class="boardlink">Science &amp; Math</a></li>
<li><a href="//boards.4chan.org/his/" class="boardlink">History &amp; Humanities</a></li>
<li><a href="//boards.4chan.org/int/" class="boardlink">International</a></li>
<li><a href="//boards.4chan.org/out/" class="boardlink">Outdoors</a></li>
<li><a href="//boards.4chan.org/toy/" class="boardlink">Toys</a></li>
</ul>
</div>
<div class="column">
<h3>Creative</h3>
<ul>
<li><a href="//boards.4chan.org/i/" class="boardlink">Oekaki</a></li>
<li><a href="//boards.4chan.org/po/" class="boardlink">Papercraft &amp; Origami</a></li>
<li><a href="//boards.4chan.org/p/" class="boardlink">Photography</a></li>
<li><a href="//boards.4chan.org/ck/" class="boardlink">Food &amp; Cooking</a></li>
<li><a href="//boards.4chan.org/ic/" class="boardlink">Artwork/Critique</a></li>
<li><a href="//boards.4chan.org/wg/" class="boardlink">Wallpapers/General</a></li>
<li><a href="//boards.4chan.org/lit/" class="boardlink">Literature</a></li>
<li><a href="//boards.4chan.org/mu/" class="boardlink">Music</a></li>
<li><a href="//boards.4chan.org/fa/" class="boardlink">Fashion</a></li>
<li><a href="//boards.4chan.org/3/" class="boardlink">3DCG</a></li>
<li><a href="//boards.4chan.org/gd/" class="boardlink">Graphic Design</a></li>
<li><a href="//boards.4chan.org/diy/" class="boardlink">Do-It-Yourself</a></li>
<li><a href="//boards.4chan.org/wsg/" class="boardlink">Worksafe GIF</a></li>
<li><a href="//boards.4chan.org/qst/" class="boardlink">Quests</a></li>
</ul>
</div>
<div class="column">
<h3>Other</h3>
<ul>
<li><a href="//boards.4chan.org/biz/" class="boardlink">Business &amp; Finance</a></li>
<li><a href="//boards.4chan.org/trv/" class="boardlink">Travel</a></li>
<li><a href="//boards.4chan.org/fit/" class="boardlink">Fitness</a></li>
<li><a href="//boards.4chan.org/x/" class="boardlink">Paranormal</a></li>
<li><a href="//boards.4chan.org/adv/" class="boardlink">Advice</a></li>
<li><a href="//boards.4chan.org/lgbt/" class="boardlink">LGBT</a></li>
<li><a href="//boards.4chan.org/mlp/" class="boardlink">Pony</a></li>
<li><a href="//boards.4chan.org/news/" class="boardlink">Current News</a></li>
<li><a href="//boards.4chan.org/wsr/" class="boardlink">Worksafe Requests</a></li>
<li><a href="//boards.4chan.org/vip/" class="boardlink">Very Important Posts</a></li>
</ul>
<h3>Misc.<span class="warning" title="Not Safe For Work"><sup>(NSFW)</sup></span></h3>
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
<h3>Adult<span class="warning" title="Not Safe For Work"><sup>(NSFW)</sup></span></h3>
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
			if (footer) {
				footer.innerHTML = `<div class="boardList">${boardList}</div>`;
				footer.classList.add('ss21--footer-enhanced');
				if ($(`#boardNavDesktopFoot a[href$="/${currentBoard}/`)) {
					$(`#boardNavDesktopFoot a[href$="/${currentBoard}/`).classList.add('current');
				}
			}
		}

	function init() {
		on(d, "IndexBuild", doc.classList.remove("site-loading"));

		const isChanX = doc && doc.classList.contains('fourchan-x');

		if (!isChanX) {
			doc.classList.remove("site-loading");
			doc.classList.add("is-ext");
		}

		on(d, "OpenSettings", function () {
			const settingDescriptions = $$(".description");
			for (let settingDescription of settingDescriptions) {
				const content = settingDescription.textContent.slice(2);
				settingDescription.textContent = content;
			}
		});

		removeStyles();

		// this should return the `#header-bar` element
		const headerBar = $("#header-bar") || $('#boardNavDesktop');
		// set the header height as its own variable for reference in css
		const updateHeight = () =>
		doc.style.setProperty('--headerBar-height', `${headerBar.offsetHeight}px`);
		new ResizeObserver(updateHeight).observe(headerBar);
		updateHeight();

		const scrollProgress = make({
			//el: "progress",
			el: "div",
			attr: {
				id: "scroll-progress"//,
				//value: 0,
				//max: 100,
			},
			appendTo: headerBar,
		});
		/*
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
		}*/
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
		/*
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
*/
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
			let summaries = $$(".summary:not(.summary-bottom, .preview-summary)");
			for (let summary of summaries) {
				summary.classList.add('summary--converted');
				let oldText, newText;
				oldText = summary.innerHTML;
				newText = oldText.replace(/(\d+(?=\ ))/g, "<b>$1</b>");
				summary.innerHTML = newText;
				//summary.innerHTML = `<a class="material-symbols-outlined" target="blank" href="` + summary.getAttribute('href') + `">open_in_new</a>` + newText + `<span hidden>` + oldText + `</span>`;
			}
		}

		function markExternalLinks() {
		document.querySelectorAll('.postMessage .linkify').forEach(link => {
			// If a string is passed, convert it into an anchor element
			if (typeof link === 'string') {
				const temp = document.createElement('a');
				temp.href = link;
				link = temp;
			}

			let url;
			try {
				url = new URL(link.href);
			} catch (err) {
				// Skip this link if it's not a valid URL
				return link;
			}

			// Skip internal links
			if (url.origin === window.location.origin) return link;

			// Clear content and mark the link as parsed
			link.textContent = '';
			link.classList.add('link-parsed');

			// Define parts to wrap
			const parts = [
				{ name: 'schema', value: url.protocol + '//' },
				{ name: 'host', value: url.hostname },
				{ name: 'path', value: url.pathname },
				{ name: 'query', value: url.search },
				{ name: 'hash', value: url.hash }
			];

			// Create and append spans
			for (const { name, value } of parts) {
				if (value) {
					const span = document.createElement('span');
					span.classList.add(`link-parsed--${name}`);
					span.textContent = value;
					link.appendChild(span);
				}
			}

			return link;
		});
	}

		function checkers() {
			let obs = $$('.thread');
			[...obs].forEach((ob) => {
				const observer = new MutationObserver(function(mutations) {
					mutations.forEach(function(mutation) {
						if (mutation.type == 'childList') {
							convertSummaries()
						}
					});
				});
				observer.observe(ob, {childList: true});
			})/*
				const observer = new MutationObserver(function(mutations) {
					mutations.forEach(function(mutation) {
						console.log(mutation.removedNodes);
					});
				});
				observer.observe(ob, {childList: true});
			}*/
		}
		if (config === "index") {
			on(d, "IndexRefresh", checkers);
		}
		/*
		function watchElForDeletion(elToWatch, callback, parent = document.querySelector('body')){
			const observer = new MutationObserver(function (mutations) {

				// loop through all mutations
				mutations.forEach(function (mutation) {

						// check for changes to the child list
						if (mutation.type === 'childList') {

								// check if anything was removed and if the specific element we were looking for was removed
								if (mutation.removedNodes.length > 0 && mutation.removedNodes[0] === elToWatch) {
										callback();
								}
						}
				});
			});

			// start observing the parent - defaults to document body
			observer.observe(parent, { childList: true });
		};

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
		*/
		/*
		function watchThreadForSummary() {
			let threads = $$('.thread');
			for (let thread of threads) {
				const observer = new MutationObserver(function(mutations) {
					mutations.forEach(function(mutation) {
						if (mutation.type === 'childList') {
							console.log(mutation.target);
							if (mutation.target.classList.contains('summary')) {
								let summary = mutation.target;
								console.log(summary);
								//let oldText, newText;
								//oldText = summary.innerHTML;
								//newText = oldText.replace(/(\d+(?=\ ))/g, "<b>$1</b>");
								//summary.innerHTML = `<a class="material-symbols-outlined" target="blank" href="` + summary.getAttribute('href') + `">open_in_new</a>` + newText + `<span hidden>` + oldText + `</span>`;
								//summary.innerHTML = `<a class="material-symbols-outlined" target="blank" href="">open_in_new</a>` + newText + `<span hidden>` + oldText + `</span>`;
							}
						}
					});
				});
				observer.observe(thread, {childList:true});
			}
		}
		*/
		/*
		function getSumms() {
			console.log('RUNNING GETSUMMS');
		ready('.summary:not(.summary-bottom)', (element) => {
      let summary = element;
			let oldText, newText;

								oldText = summary.innerHTML;
								newText = oldText.replace(/(\d+(?=\ ))/g, "<b>$1</b>");
			console.log('old: ' + oldText + ', new: ' + newText);
								summary.innerHTML = `<a class="material-symbols-outlined" target="blank" href="` + summary.getAttribute('href') + `">open_in_new</a>` + newText + `<span hidden>` + oldText + `</span>`;
		});
			convertSummaries();
		}
*/
		//getSumms();

		function swapInfo() {
			//console.log("Switching OP's post info");
			let ops = $$(".op");
			for (let op of ops) {
				let opPostInfo = $(".postInfo", op);
				op.prepend(opPostInfo);
				op.classList.add("post--file-swapped");
			}
		}

		function stripPageBrackets() {
			//console.log("Switching OP's post info");
			let pagenums = $$(".page-num:not(.page-num--converted)");
			for (let pagenum of pagenums) {
				let oldText, newText;
				oldText = pagenum.innerText;
				newText = oldText.match(/\d+/)[0];
				pagenum.innerHTML = `<span class="page-num--icon"><span class="page-num--number">${newText}</span></span>`;
				pagenum.classList.add('page-num--converted');
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
					thumb.parentNode.parentNode.parentNode.parentNode.classList.add("file--tall");
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
		function countThreads() {
			let delform = $('.board');
			let threads = $$('.thread');
			delform.setAttribute('data-thread-count', threads.length);
		}
		/*
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
*/
		if (config === "index") {
			const target = $(".board");
			const config = {
				childList: true,
			};

			function subscriber(mutations) {
				convertSummaries();
				swapInfo();
				//disabledPrevAndNext();
				countThreads();
				stripPageBrackets();
				//newTabber();
			}
			const observer = new MutationObserver(subscriber);
			observer.observe(target, config);
		}

		if (config === "index") {
			on(d, "IndexRefresh", convertSummaries);
			on(d, "IndexRefresh", swapInfo);
			on(d, "IndexRefresh", checkHeights);
			on(d, "IndexRefresh", checkAspect);
			on(d, "IndexRefresh", countThreads);
			on(d, "IndexRefresh", stripPageBrackets);
			//on(d, "IndexRefresh", newTabber);
			on(d, "IndexRefresh", markExternalLinks);
		}

		if (config === "thread") {
			countBacks();
			swapInfo();
		}
/*
		function moveSelectBoards() {
			let select = $('#boardSelectMobile');
			let boardlist = $('#board-list');
			if (!select) return;
			if (!boardlist) return;
			boardlist.appendChild(select);
			$('#boardSelectMobile', boardlist).classList.add('ss21--moved-select');
		}

		moveSelectBoards();

		function moveShortcuts() {
			const shortcuts = document.getElementById('shortcuts');
			const shortcutMenu = document.getElementById('shortcut-menu');

			const itemsToMove = ['shortcut-gallery', 'shortcut-expand-all']; // IDs of items to move below 600px
			const originalPositions = new Map();
			//const eventListeners = new Map(); // Map to store event listeners for each shortcut

			// Create #shortcut-placeholder
			let shortcutPlaceholder = document.createElement('div');
			shortcutPlaceholder.id = 'shortcut-placeholder';
			shortcutPlaceholder.hidden = true;
			shortcutMenu.appendChild(shortcutPlaceholder);

  // Record the original position and clone elements
  itemsToMove.forEach(id => {
    const item = document.getElementById(id);
    if (item) {
      // Save original position
      originalPositions.set(id, { parent: item.parentElement, nextSibling: item.nextElementSibling });

      // Clone and append to placeholder
      const clone = item.cloneNode(true);
      clone.id = `${id}-clone`; // Ensure unique ID for the clone
      shortcutPlaceholder.appendChild(clone);

      // Initially hide the clone
      clone.hidden = true;
    }
  });

  const moveItemsToMenu = () => {
    const menu = document.querySelector('#shortcut-menu #menu');
    if (menu) {
      itemsToMove.forEach(id => {
        const clone = document.getElementById(`${id}-clone`);
        if (clone && clone.parentElement !== menu) {
          menu.appendChild(clone);
          clone.hidden = false; // Show the clone when added to the menu
        }
      });
    }
  };

  const handleResize = (width) => {
    if (width < 600) {
      const menu = document.querySelector('#shortcut-menu #menu');
      if (!menu) {
        // Hide originals and show clones in the placeholder
        itemsToMove.forEach(id => {
          const original = document.getElementById(id);
          const clone = document.getElementById(`${id}-clone`);
          if (original) original.hidden = true;
          if (clone) clone.hidden = false;
        });
      }

      // Observe for menu creation and move clones to it
      const menuObserver = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
          if (mutation.type === 'childList') {
            const menu = document.querySelector('#shortcut-menu #menu');
            if (menu) {
              moveItemsToMenu();
              menuObserver.disconnect(); // Stop observing once #menu is created
            }
          }
        });
      });

      menuObserver.observe(shortcutMenu, { childList: true, subtree: true });
    } else {
      // Restore originals and hide clones when width >= 600px
      itemsToMove.forEach(id => {
        const original = document.getElementById(id);
        const clone = document.getElementById(`${id}-clone`);
        if (original) original.hidden = false;
        if (clone) clone.hidden = true;

        // Restore original position if it's not already in place
        const originalPosition = originalPositions.get(id);
        if (originalPosition && original.parentElement !== originalPosition.parent) {
          const { parent, nextSibling } = originalPosition;
          parent.insertBefore(original, nextSibling || null);
        }
      });
    }
  };

  const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      if (entry.target === document.body) {
        const width = entry.contentRect.width;
        handleResize(width);
      }
    }
  });

			resizeObserver.observe(document.body);
		}

		moveShortcuts();
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
				let allMedia = [].slice.call($$('.download-button'));
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
		if (config === "thread") {
			downloadMedia();
		}

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
							anchor.href = `https://boards.4chan.org/${board.board}/`;
						}
						append($(".ss21--board-drawer"), anchor);
					});
				});
			});
		}

		//boardDrawer();
		/*
		function getBoardInfo() {
			let cbBoard, cbTitle, cbMetad;
			fetch("https://a.4cdn.org/boards.json")
				.then(resp => resp.json())
				.then(data => {
				let foundBoard = data.boards.find(board => board.board === currentBoard);
				cbBoard = foundBoard.board;
				cbTitle = foundBoard.title;
				cbMetad = foundBoard.meta_description.replace(/&quot;/g, '"').replace(/&amp;/g, '&');
			});
		}

		getBoardInfo();
*/
		function changeFileName(observer) {
			// Temporarily disconnect the observer to avoid a loop
			if (observer) observer.disconnect();

			$('#qr-file-button').value = 'upload';
			$('#file-n-submit input[type="submit"]').value = 'send';

			// Reconnect the observer after the change with inline config
			if (observer) {
				observer.observe($('#qr'), {
					attributes: true,// Watch for attribute changes
					attributeFilter: ['value'], // Only watch the 'value' attribute
					subtree: true,// Monitor changes within child elements of #qr
				});
			}
		}
/*
		on(d, 'QRDialogCreation', function() {
			const captchaContainer = document.querySelector(".captcha-root");

			let tBgObserver = null;

			const observeTBgStyle = (tBg) => {
				// Disconnect any existing observer to avoid duplicate listeners
				if (tBgObserver) {
					tBgObserver.disconnect();
					tBgObserver = null;
				}

				// If tBg exists, observe its style attribute
				if (tBg) {
					tBgObserver = new MutationObserver(() => {
						const bgImage = window.getComputedStyle(tBg).backgroundImage;

						if (bgImage && bgImage !== "none") {
							captchaContainer.classList.add("captcha-loaded");
						} else {
							captchaContainer.classList.remove("captcha-loaded");
						}
					});

					tBgObserver.observe(tBg, {
						attributes: true,
						attributeFilter: ["style"], // Only watch the style attribute
					});

					// Run the check immediately to handle cases where the background-image is already set
					const bgImage = window.getComputedStyle(tBg).backgroundImage;
					if (bgImage && bgImage !== "none") {
						captchaContainer.classList.add("captcha-loaded");
					} else {
						captchaContainer.classList.remove("captcha-loaded");
					}
				} else {
					// If tBg is not present, ensure the class is removed
					captchaContainer.classList.remove("captcha-loaded");
				}
			};

			const observer = new MutationObserver(() => {
				const tBg = captchaContainer.querySelector("#t-bg");
				observeTBgStyle(tBg); // Attach a new observer to the re-added #t-bg element
			});

			observer.observe(captchaContainer, {
				childList: true, // Monitor direct child changes
				subtree: true, // Monitor all descendant changes
			});

		});
*/
		on(d, 'QRDialogCreation', function() {
			const observer = new MutationObserver((mutationsList) => {
				for (const mutation of mutationsList) {
					if (mutation.target.matches('#file-n-submit input[type="submit"]') && mutation.attributeName === 'value') {
						changeFileName(observer);
					}
				}
			});

			// Initial call to set the values
			changeFileName(observer);
			observer.observe($('#qr'), {
				attributes: true,// Watch for attribute changes
				attributeFilter: ['value'], // Only watch the 'value' attribute
				subtree: true,// Monitor changes within child elements of #qr
			});
		});

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

		replace4chanFooterList();

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
				bottomLinks.appendChild(passLink);
			} else {
				return false;
			}
		}

		passLinker();

		function masonry() {
			if(!getComputedStyle(document.documentElement).getPropertyValue("--masonry")) {
				return false;
			}
			let grids = [...document.querySelectorAll(':root.catalog-mode .board')];

			if (grids.length && getComputedStyle(grids[0]).gridTemplateRows !== 'masonry' && getComputedStyle(grids[0]).gridAutoRows !== '240px') {
				//console.log('got a grid, going to masonry it', grids);
				grids = grids.map(grid => ({
					_el: grid,
					gap: parseFloat(getComputedStyle(grid).gridRowGap),
					items: [...grid.childNodes].filter(c => c.nodeType === 1 && +getComputedStyle(c).gridColumnEnd !== -1),
					ncol: 0,
					mod: 0 }));

				function layout() {
					//console.log('running layout');
					grids.forEach(grid => {
						/* get the post relayout number of columns */
						let ncol = getComputedStyle(grid._el).gridTemplateColumns.split(' ').length;

						grid.items.forEach(c => {
							let new_h = c.getBoundingClientRect().height;

							if (new_h !== +c.dataset.h) {
								c.dataset.h = new_h;
								grid.mod++;
							}
						});

						/* if the number of columns has changed */
						if (grid.ncol !== ncol || grid.mod) {
							/* update number of columns */
							grid.ncol = ncol;

							/* revert to initial positioning, no margin */
							grid.items.forEach(c => c.style.removeProperty('margin-top'));

							/* if we have more than one column */
							if (grid.ncol > 1) {
								grid.items.slice(ncol).forEach((c, i) => {
									let prev_fin = grid.items[i].getBoundingClientRect().bottom /* bottom edge of item above */,
											curr_ini = c.getBoundingClientRect().top /* top edge of current item */;
									c.style.marginTop = `${prev_fin + grid.gap - curr_ini}px`;
								});
							}

							grid.mod = 0;
						}
					});
				}
				layout();
				//addEventListener('load', e => {
				//  layout(); /* initial load */
				addEventListener('resize', layout, false); /* on resize */
				//}, false);
			}
		}
		if (config === "index") {
			const target = $(".board");
			const config = {
				childList: true,
			};

			function subscriber(mutations) {
				masonry();
				//if(!getComputedStyle(document.documentElement).getPropertyValue("--masonry")) {
				//	masonry();
				//}
			}
			const observer = new MutationObserver(subscriber);
			observer.observe(target, config);
		}
		//on(d, "IndexBuild", masonry);
		//const isInViewport = (e, {top:t, height:h} = e.getBoundingClientRect()) => t <= innerHeight && t + h >= 0;
		/*
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
					catLink.remove();
					// let playPromise = OpVideo.play();
          // if (playPromise !== undefined) {
          //   playPromise.then((_) => {
					// 		// all good, video started
					// 	}).catch((error) => {
					//	// hey the video didn't play
					//		//if (isInViewport(OpVideo) === true) {
					//		OpVideo.play();
					//		//}
					//	});
          // }
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
*/


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
				html: `<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><defs><path d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250" id="textcircle"></path></defs><text><textPath xlink:href="#textcircle">4chan4chan4chan4chan</textPath></text></svg></div>`,
				appendTo: footer
			});
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

		function searchCurtain() {
			ready("#index-search", (element) => {
				let _this = element;
				make({
					el: "aside",
					cl4ss: "ss21--index-searching-curtain",
					appendTo: "body",
				});
				on(_this, "focus", function () {
					doc.classList.add("ss21--index-searching");
				});
				on(_this, "blur", function () {
					if (_this.dataset.searching != 1) {
						doc.classList.remove("ss21--index-searching");
					}
				});
			});
		}

		if (config === "index") {
			searchCurtain();
		}
		/*
		function checkBlockedBanner() {
			ready('#bannerCnt > img', (element) => {
				let _this = element;
				setTimeout(function () {
        if (_this.attributes.length === 3) {
					doc.classList.add("ss21--banner-blocked");
					//_this.parentNode.removeAttribute('title');
					$('#bannerCnt').removeAttribute('title');
				}
    }, 1000);
			});
		}

		on(d, "IndexRefresh", checkBlockedBanner);
*/
		function checkBlockedBanner() {
			function rrready(selector, callback) {
				const observer = new MutationObserver((mutations, observer) => {
					const element = document.querySelector(selector);
					if (element) {
						observer.disconnect();
						callback(element);
					}
				});

				observer.observe(document.body, {
					childList: true,
					subtree: true
				});

				// Check if the element is already present
				const element = document.querySelector(selector);
				if (element) {
					observer.disconnect();
					callback(element);
				}
			}

			rrready('#bannerCnt > img', (element) => {
				function checkImage() {
					if (element.complete && element.naturalWidth === 0) {
						rrready('img[alt="4chan"]', (element) => {
							if (element.attributes.length === 3) {
								document.documentElement.classList.add("ss21--banner-blocked");
								element.parentNode.removeAttribute('title');
							} else {
								setTimeout(checkImage, 1000);
							}
						});
					} else if (element.complete) {
						document.documentElement.classList.add("ss21--banner-unblocked");
					} else {
						setTimeout(checkImage, 1000); // Retry after 1 second if not complete
					}
				}

				checkImage();
			});
		}

		// Usage
		checkBlockedBanner();

		function relocateElementBySelector(elementSelector, destSelector, location) {
			// Find the element to relocate
			let element = document.querySelector(elementSelector);

			if (!element) {
				console.error('Element not found');
				return;
			}

			// Find the destination element where the element will be moved
			let destElement = document.querySelector(destSelector);

			if (!destElement) {
				console.error('Destination element not found');
				return;
			}

			// Remove the element from its current parent
			let elementParent = element.parentElement;
			if (elementParent) {
				elementParent.removeChild(element);
			}

			// Append the element to the destination element
			if (location === 'append') {
				destElement.appendChild(element);
			} else if (location === 'prepend') {
				destElement.prepend(element);
			}
		}

		// 2025GRID
		//relocateElementBySelector('.pagelist', '#delform', 'append');
		//relocateElementBySelector('.navLinks.json-index', '#delform', 'prepend');
		/**
 * Clone a node, remove the original, and prepend the clone to a target element.
 * @param {string} nodeSelector - The CSS selector of the node to clone and remove.
 * @param {string} targetSelector - The CSS selector of the target element to prepend the clone.
 */
		function cloneAndPrepend(nodeSelector, targetSelector) {
			// Step 1: Select the node you want to clone and remove
			const originalNode = document.querySelector(nodeSelector);

			if (!originalNode) {
				console.error('Original node not found');
				return;
			}

			// Step 2: Clone the node
			const clonedNode = originalNode.cloneNode(true); // true means a deep clone

			// Step 3: Remove the original node
			originalNode.remove();

			// Step 4: Select the target element where you want to prepend the cloned node
			const targetElement = document.querySelector(targetSelector);

			if (!targetElement) {
				console.error('Target element not found');
				return;
			}

			// Step 5: Prepend the cloned node to the target element
			targetElement.prepend(clonedNode);
		}

		// 2025GRID
		//cloneAndPrepend('.boardBanner', '#delform');

		function OPAsBanner() {
			ready(".thread > .opContainer > .op > .file .fileThumb", (element) => {
				let _this = element,
						banner = $(".boardBanner");
				let OpFullFile = _this.href;
				if (OpFullFile.endsWith("m") || OpFullFile.endsWith("4")) {
					//comment start
					/*
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
					//comment end
					*/
					const OpVideo = document.createElement("video");
					OpVideo.classList.add("ss21--op-banner");
					OpVideo.loop = true;
					OpVideo.src = OpFullFile;
					OpVideo.muted = true;
					banner.appendChild(OpVideo);

					const playPromise = OpVideo.play();
					if (playPromise !== undefined) {
						playPromise.then(() => {
							console.log("Video is playing");
						}).catch((error) => {
							console.error("Error playing video:", error);
						});
					}
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
		async function OPAsBanner() {
  // Wait for the ".op .fileThumb" element to be ready
  ready(".op .fileThumb", async (element) => {
    const banner = document.querySelector(".boardBanner");
    const OpFullFile = element.href;

    // If the file is a video
    if (OpFullFile.endsWith("m")) {
      const OpVideo = document.createElement("video");
      OpVideo.classList.add("ss21--op-banner");
      OpVideo.loop = true;
      OpVideo.src = OpFullFile;
      OpVideo.muted = true;
      banner.appendChild(OpVideo);

      try {
        await OpVideo.play(); // Wait for the video to start playing
        console.log("Video is playing");
      } catch (error) {
        console.error("Error playing video:", error);
      }

    } else { // If the file is an image
      const OpImage = new Image();
      OpImage.classList.add("ss21--op-banner");
      OpImage.src = OpFullFile;

      // Create a promise that resolves when the image has loaded
      await new Promise((resolve, reject) => {
        OpImage.onload = resolve;
        OpImage.onerror = reject;
      });

      banner.appendChild(OpImage);
      console.log("Image loaded and appended to banner");
    }
  });
}

if (config === "thread") {
  OPAsBanner();
}
		*/
		/**
 * Wrap the contents of the specified node inside a new div.
 * @param {string} selector - The CSS selector of the node to wrap.
 */
		function wrapNodeContents(selector) {
			const node = document.querySelector(selector);

			if (!node) {
				console.error('Node not found');
				return;
			}

			// Step 2: Create a new wrapper div with a dynamically generated class name
			const wrapper = document.createElement('div');

			// Remove leading dot or hash if it's a class or id selector
			let baseClass = selector.replace(/^[.#]/, '');
			wrapper.classList.add(`${baseClass}_inner`);

			// Step 3: Move the children of the original node into the new wrapper
			while (node.firstChild) {
				wrapper.appendChild(node.firstChild);
			}

			// Step 4: Append the new wrapper to the original node
			node.appendChild(wrapper);
		}
		// 2025GRID
		//wrapNodeContents('.navLinks');
		//wrapNodeContents('#header-bar');
		//wrapNodeContents('#thread-watcher');

		// Function to extract the initial number and update the data attribute
		if (config === "index") {
			function updateHiddenCount(element) {
				if (!element) {
					return false;
				}
				const text = element.textContent;
				const match = text.match(/(\d+)/);
				if (match) {
					const count = parseInt(match[1], 10);
					document.querySelector('#hidden-toggle > a').dataset.hiddenCount = count;
				} else {
					document.querySelector('#hidden-toggle > a').dataset.hiddenCount = 0; // Default to 0 if no match
				}
			}

			// Initial setup
			const hiddenCountElement = document.getElementById('hidden-count');
			updateHiddenCount(hiddenCountElement);

			// Create a MutationObserver to watch for changes to the element's text content
			const observer = new MutationObserver((mutationsList) => {
				for (const mutation of mutationsList) {
					if (mutation.type === 'childList' || mutation.type === 'characterData') {
						updateHiddenCount(hiddenCountElement);
					}
				}
			});

			document.querySelector('#hidden-toggle > a').onclick = function(e) {
				e.target.classList.toggle('hidden-view-toggle');
			};
			document.querySelector('#hidden-toggle > a').title = "Toggle hidden threads";

			// Observe changes to the element's text content
			observer.observe(hiddenCountElement, { childList: true, characterData: true, subtree: true });
		}

		doc.classList.add("sidedish-enabled");

		// Adds a discernable class to `html` when 4chan sounds player is enabled
		ready("#sound-player-css", (element) => {
			doc.classList.add('fcsp-enabled');
		});

		ready("#StyleChanLink", (element) => {
			doc.classList.add('stylechan-enabled');
			$("#ch4SS", document.head).remove();
			$("#fourchanx-bgcolor-css", document.head).remove();
		});

		ready("#mascot", (element) => {
			// in theory, this means the user has oneechan enabled
			console.log("%cSilly goose, you left OneeChan on.", "color:red;");
			function backupStyleRemoval(sel) {
				if (sel) {
					console.log("%css21 sidedish is removing this stylesheet: ","color:green;",sel);
					sel.remove();
					return true;
				} else {
					console.log("%css21 sidedish was unable to find: ","color:red;",sel);
					return false;
				}
			}
			backupStyleRemoval($("#ch4SS"));
			backupStyleRemoval($("#fourchanx-bgcolor-css"));
			if (element) {
				make({
					el: "aside",
					cl4ss: "fcx-announcement warning",
					html: `ss21 is <b>not</b> compatible with OneeChan; please disable it to continue using ss21 as intended.`,
					appendTo: "body",
				});
			}
			console.timeLog("Running init() from sidedish");
		});
	}

	on(d, "4chanXInitFinished", init);

	if (window.location.host.split('.')[0] === 'find') {
		doc.classList.remove("site-loading");
		doc.classList.add("sidedish-enabled");
		doc.classList.add("is-search");
		let currentSearch = window.location.href;//window.location.search;
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
				// el.style.fontSize = Math.max(Math.min(el.clientWidth / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)) + 'px';
				el.style.fontSize = Math.max(Math.min(el.clientWidth / 10, parseFloat(1/0)), parseFloat(-1/0)) + 'px';
				el.style.setProperty("--length", el.innerText.length);
			}

			fitText($('.boardTitle'));
			make({
				el: "aside",
				cl4ss: "fcx-announcement warning",
				html: `4chan X doesn't work on the <code>find</code> subdomain, though ss21 tries to style it.`,
				appendTo: "body",
			});
			function pageCurrent() {
				let pagelists = $$('.pagelist.desktop .pages a');
				let firstPageStrong = null;
				let matched = false;
				pagelists.forEach((pagelist, index) => {
					let parentStrong = pagelist.parentNode;
					parentStrong.classList.remove('current-page');
					pagelist.textContent = pagelist.textContent.trim();
					if (index === 0) {
						firstPageStrong = parentStrong;
					}
					if (pagelist.href === currentSearch) {
						parentStrong.classList.add('current-page');
						matched = true;
					}
				});
				if (!matched && firstPageStrong) {
					firstPageStrong.classList.add('current-page');
				}
			}
			pageCurrent();
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
	ready(".custom-menu-ctrl", (element) => {
		//doc.classList.remove('site-loading');
		//doc.classList.add('fourchan-ext');
		init();
	});

	on(d, '4chanMainInit', function() {
		//doc.classList.remove('site-loading');
		// doc.classList.add('fourchan-ext');
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
				console.log("%css21 sidedish was unable to find: ", "color:red;", sel);
				return false;
			}
		}
		removeStyle($("style[type]", d.head)); // this removes the inline mobile css
		on(d, 'DOMContentLoaded', replace4chanFooterList);
		function swapInfo() {
			let ops = $$(".op");
			for (let op of ops) {
				let opPostInfo = $(".postInfo", op);
				op.prepend(opPostInfo);
				op.classList.add("post--file-swapped");
			}
		}
		on(d, 'DOMContentLoaded', swapInfo);
	});
})();
