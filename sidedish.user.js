// ==UserScript==
// @name        ss21 sidedish
// @version     2.4.3
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
// @grant       GM.setValue
// @grant       GM.getValue
// @run-at      document-start
// @icon        data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 96 960 960'%3E%3Cpath d='M70 622q0-15 11-29.5t29-23.5q22-9 44-22.5t54-13.5q48 0 72.5 28.5T343 590q37 0 64-28.5t74-28.5q47 0 72.5 28.5T618 590q36 0 62-28.5t73-28.5q33 0 54.5 14t43.5 23q18 9 29 23t11 29q0 13-9 21.5t-21 6.5q-36-8-56.5-26T753 606q-37 0-63.5 28.5T617 663q-48 0-74-28.5T481 606q-36 0-63.5 28.5T342 663q-47 0-72-28.5T208 606q-31 0-51.5 18T101 650q-13 2-22-6.5T70 622Zm0 185q0-14 10.5-28.5T110 756q22-9 44-23t54-14q47 0 72 28.5t63 28.5q37 0 64-28.5t74-28.5q47 0 72.5 28.5T617 776q36 0 62.5-28.5T753 719q32 0 54 14t45 23q18 8 28.5 22t10.5 29q0 14-9 22t-21 6q-36-8-56.5-25.5T753 792q-37 0-63.5 28.5T617 849q-48 0-74-28.5T481 792q-36 0-63.5 28.5T343 849q-47 0-73-28.5T208 792q-31 0-51.5 17.5T100 835q-12 2-21-6t-9-22Zm0-371q0-15 11-29.5t29-23.5q22-9 44-22.5t54-13.5q48 0 72.5 28.5T343 404q37 0 64-28.5t74-28.5q47 0 72.5 28.5T618 404q36 0 62-28.5t73-28.5q33 0 54.5 14t43.5 23q18 9 29 23t11 29q0 13-9 21.5t-21 6.5q-36-8-56.5-26T753 420q-37 0-63.5 28.5T617 477q-48 0-74-28.5T481 420q-36 0-64 28.5T342 477q-47 0-72-28.5T208 420q-31 0-51.5 18T101 464q-13 2-22-6.5T70 436Z'/%3E%3C/svg%3E
// @noframes
// ==/UserScript==
// @updateURL   https://github.com/saxamaphone69/ss21/raw/main/sidedish.user.js
// @downloadURL https://github.com/saxamaphone69/ss21/raw/main/sidedish.user.js
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

	// add `.site-loading` to `html` so css can hide the page loading
	doc.classList.add("site-loading");

	if (window.location.host.split('.')[0] === 'find') {
		doc.classList.remove("site-loading");
		doc.classList.add("is-search");
	}

	const ss21Settings = {
		scrollProgress: {
			value: true,
			name: 'Scrolling Progress Bar',
			desc: 'Adds a fixed scrolling progress bar to the Header to indicate how much of the page has been scrolled.'
		},
		resizeQuotePreviews:  {
			value: false,
			name: 'Resize Quote Previews',
			desc: 'When hovering over a quote, if the post is larger than the viewport height, resizes it all to fit.'
		},
		removeStyles:  {
			value: false,
			name: 'Remove 4chan X CSS',
			desc: 'Remove the default 4chan X CSS inserted into the page for styling.'
		},
		reorganiseElements:  {
			value: false,
			name: 'Reorganise Elements',
			desc: 'Change the original location of HTML elements on the page to suit a Material layout.'
		},
	};

	async function get(option) {
		return await GM.getValue(option);
	}

	async function set(option, value) {
		// val = items[key];
		// results.push(GM.setValue(g.NAMESPACE + key, JSON.stringify(val)));
		//
		//if (typeof GM.setValue !== "undefined") {
		//
		// await GM.setValue("data", JSON.stringify(reset ? defaults : data));
		GM.setValue(option, JSON.stringify(value));
		//}
	}
	/*
	async function showOff() {
		for (let setting in ss21Settings) {
			await set('ss21' + setting, ss21Settings[setting]);
		}
	}

	showOff();

	async function grabEm() {
		let values = await GM.listValues();
		for (let item in values) {
			let setting = values[item];
			let details = await get(setting);
			//console.log(setting, JSON.parse(details).value);
			//console.log(values[item], await JSON.parse(get(values[item])));
			//console.log(await get(values[item]));
		}
	}

	grabEm();
*/
	//console.log(await get('ss21resizeQuotePreviews'));
	//console.log(get('ss21resizeQuotePreviews'));
	/*
	  async function getStoredValues(init) {
    data = await GM.getValue("data", defaults);
    try {
      data = JSON.parse(data);
      if (!Object.keys(data).length || ({}).toString.call(data) !== "[object Object]") {
        throw new Error();
      }
    } catch (err) { // compat
      data = await GM.getValue("data", defaults);
    }
  }

  async function setStoredValues(reset) {
    data.processedCss = $style.textContent;
    await GM.setValue("data", JSON.stringify(reset ? defaults : data));
  }
	for(let key in settings){
      GM_setValue(key, settings[key]);
    }
	*/

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
		removeStyle($("style[type]", d.head)); // this removes the inline mobile css
		removeStyle($("#fourchanx-css", d.head)); // this removes the css required by 4chan x
		removeStyle($("#custom-css", d.head)); // this removes extra, custom css by 4chan x
		//removeStyle($("#sound-player-css", d.head)); // sounds player
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
		const headerBar = $("#header-bar") || $('#boardNavDesktop');

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
			let summaries = $$(".summary:not(.summary-bottom)");
			for (let summary of summaries) {
				summary.classList.add('summary--converted');
				let oldText, newText;
				oldText = summary.innerHTML;
				newText = oldText.replace(/(\d+(?=\ ))/g, "<b>$1</b>");
				summary.innerHTML = newText;
				//summary.innerHTML = `<a class="material-symbols-outlined" target="blank" href="` + summary.getAttribute('href') + `">open_in_new</a>` + newText + `<span hidden>` + oldText + `</span>`;
			}
		}

		async function checkSetting(setting) {
			let val = await GM.getValue(setting);
			return JSON.parse(val).value;
		}

		async function progressScrollOrNot() {
			if (await checkSetting("ss21scrollProgress")) {
				doc.classList.add('ss21-scrollprogress--on');
			} else {
				doc.classList.add('ss21-scrollprogress--off');
			}
		}

		progressScrollOrNot();

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
			let pagenums = $$(".page-num");
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
		}

		if (config === "thread") {
			countBacks();
			swapInfo();
		}

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

		downloadMedia();
		/*
		function addTransition() {
			ready('#fourchanx-settings', (element) => {
				//console.log('hey im here');
				let _this = element;
				//function $(sel, root) {
				//function on(sel, events, cb) {

				//el.classList.add("lol");
        //el.addEventListener("transitionend", function () {
        //return el.remove();
        //},true)

				let close = $('.close', _this);
				console.log(close);
				close.addEventListener('click', function(e) {
					console.log('closing it');
					e.preventDefault();
					//d.addEventListener("animationend", function () {
					//	_this.classList.add('active');
					//	_this.parentNode.remove();
					//}, true);
				}, { passive: false });
				on(close, 'click', (e) => {
					e.preventDefault();
					_this.addEventListener("transitionend", function () {
						_this.parentNode.remove();
					}, true);
				});
			//});
		}
		on(d, "OpenSettings", function () {
			addTransition();
		});
			*/
		function addTransition() {
			ready('#fourchanx-settings', (element) => {
				let _this = element;
				_this.style.viewTransitionName = 'settings';
				function handleClick(event) {
					console.log('Button clicked!');
				}
				_this.querySelector('.close').removeEventListener('click', handleClick);
			});
		}
		on(d, "OpenSettings", function () {
			document.startViewTransition(() => addTransition());
		});


		function addSettings() {
			ready('#fourchanx-settings', (element) => {
				let _this = element;
				let tabs = $('.sections-list');
				let sections = $('.section-container section');
				let ss21Tab = make({
					el: 'a',
					cl4ss: 'tab-ss21',
					attr: {
						href: 'javascript:;'
					},
					appendTo: tabs
				});
				ss21Tab.textContent = 'ss21';
				let ss21Section = `<fieldset><legend>ss21</legend>`;
				for (let setting in ss21Settings) {
					/*
					let getVal = async () => {
						let val = await get(`ss21${setting}`);
						return val;
					};
					console.log(getVal);
					get(`ss21${setting}`)
						.then((response) => response);
					ss21Section += `<div class="ss21-option">` +
					get(`ss21${setting}`)
						.then((response) => response) +
					`</div>`;
					*/
					/*
					const printAddress = async () => {
  const a = await address;
  console.log(a);
};

printAddress();
*//*
					let getVal = async () => {
						let val = await get(`ss21${setting}`);
					};
					console.log(getVal());
					console.log(`ss21${setting} is ${getVal()}`);

					Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});

					// below is original
					*/

					//let valy = true;
					/*
					let val2 = (async () => {
						console.log(await GM.listValues());
						console.log(ss21Settings[setting]);
						console.log('inside poo', await get(ss21Settings[setting]));
						await get(ss21Settings[setting]).then((value) => {
							console.log('then: ', value);
						});
					})();
					//valy = poo();
					console.log('val2: ', val2);
					get(ss21Settings[setting]).then((loo) => {
						console.log('loo: ', loo);
					});
					*/
					//(async => valy = get(ss21Settings[setting]))();
					//console.log(valy);
					(async () => {
						let valy = await GM.getValue('ss21' + setting);
						valy = JSON.parse(valy).value;
						//console.log(setting, JSON.parse(valy).value);
						ss21Section += `<div class="ss21-option">
					<input type="checkbox" id="ss21-option--${setting}" ${valy ? "checked" : ""} data-settingname="ss21${setting}" data-val="${valy}">
					<label class="ss21-label" for="ss21-option--${setting}">${ss21Settings[setting].name}</label>
					<span class="ss21-description">${ss21Settings[setting].desc}</span>
					</div>`;
					})();
					/*
					ss21Section += `<div class="ss21-option">
					<input type="checkbox" id="ss21-option--${setting}" ${valy ? "checked" : ""} data-settingname="ss21${setting}" data-val="${valy}">
					<label class="ss21-label" for="ss21-option--${setting}">${ss21Settings[setting].name}</label>
					<span class="ss21-description">${ss21Settings[setting].desc}</span>
					</div>`;
					*/
				}
				ss21Section += `</fieldset>`;
				on(ss21Tab, 'click', function() {
					let tabLinks = $$('.sections-list a');
					for (let tab of tabLinks) {
						tab.classList.remove('tab-selected');
					}
					ss21Tab.classList.add('tab-selected');
					sections.className = '';
					sections.classList.add('section-ss21');
					sections.innerHTML = ss21Section;
				});
				ready('.section-ss21', (element) => {
					let _this = element;
					let checkboxes = $$('.ss21-option input');
					for (let checkbox of checkboxes) {
						checkbox.addEventListener('click', async function(e) {
							//console.log(checkbox.checked);//, JSON.parse(checkbox.getAttribute('data-val').toLowerCase()), !checkbox.getAttribute('data-val'));
							let setting = checkbox.getAttribute('data-settingname');
							let checkSetting = checkbox.checked;
							let key = await GM.getValue(setting);
							//console.log(key);
							let keyParse = JSON.parse(key);
							//console.log('parse: ', keyParse);
							keyParse.value = checkSetting;
							keyParse = JSON.stringify(keyParse);


							checkbox.toggleAttribute('checked');
							checkbox.setAttribute('data-val', checkSetting);
							//console.log(`setting ${setting} to ${checkSetting}`);
							await GM.setValue(setting, keyParse);
						}, false);
					}
				});

			});
		}
		//on(d, "OpenSettings", addSettings);

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

		boardDrawer();

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

		function changeFileName() {
			$('#qr-file-button').value = 'upload';
			$('#file-n-submit input[type="submit"]').value = 'send';
		}

		on(d, 'QRDialogCreation', function() {
			changeFileName();
			const observer = new MutationObserver((mutationsList, observer) => {
				for (const mutation of mutationsList) {
					if (mutation.type === 'attributes' && mutation.attributeName === 'hidden') {
						changeFileName();
					}
				}
			});
			const config = {
				attributes: true, // Watch for attribute changes
				attributeFilter: ['hidden'] // Watch only the 'hidden' attribute
			}
			observer.observe($('#qr'), config);
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

		function fetch4chanBoardList() {
			// Okay, so this used to work fine. Then Cloudflare has added some CDN protection thingy to 4chan.org, which makes any attempts to read the HTML not work.
			// I had this as a request so that if any boards were added, it would auto update. I'll stick to hard coding it instead.
			let footer = $("#boardNavDesktopFoot");
			//let currentBoard = location.pathname.split("/")[1];
			let boardList = `<div class="column">
<h3 style="text-decoration: underline; display: inline;">Japanese Culture</h3>
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
<h3 style="text-decoration: underline; display: inline;">Video Games</h3>
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
<h3 style="text-decoration: underline; display: inline;">Interests</h3>
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
<h3 style="text-decoration: underline; display: inline;">Creative</h3>
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
<h3 style="text-decoration: underline; display: inline;">Other</h3>
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
			footer.innerHTML = `<div class="boardList">${boardList}</div>`;
			if ($(`#boardNavDesktopFoot a[href$="/${currentBoard}/`)) {
				$(`#boardNavDesktopFoot a[href$="/${currentBoard}/`).classList.add("current");
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

				addEventListener('load', e => {
					layout(); // initial load
					addEventListener('resize', layout, false); // on resize
				}, false);
			}
		}

		masonry();
*/
		function masonry() {
			if(!getComputedStyle(document.documentElement).getPropertyValue("--primary")) {
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
		/*
// When we were blocking `core.js`, we needed to add this functionality back. Not anymore!
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
*/
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
			function rready(selector, callback) {
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

			rready('#bannerCnt > img', (element) => {
				function checkImage() {
					if (element.complete && element.naturalWidth === 0) {
						rready('img[alt="4chan"]', (element) => {
							if (element.attributes.length === 3) {
								document.documentElement.classList.add("ss21--banner-blocked");
								element.parentNode.removeAttribute('title');
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
			ready(".op .fileThumb", (element) => {
				let _this = element,
						banner = $(".boardBanner");
				let OpFullFile = _this.href;
				if (OpFullFile.endsWith("m")) {
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

		/*
// simple version of psa hiding: https://github.com/ccd0/4chan-x/blob/f0150afd69268f173cb618b5af70e0bdf0b37273/src/Miscellaneous/AnnouncementHiding.coffee
		function blotterHiding() {
			const blotter = $('#blotter');
			const blotterMsgs = $('#blotter-msgs');
			const blotterToggle = $('#toggleBlotter');
			console.log(blotter, blotterMsgs, blotterToggle);
			let UTC = blotterToggle.dataset.utc;
			blotter.dataset.hidden =
		}

		blotterHiding();
*/
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

		doc.classList.add("sidedish-enabled");

		// Adds a discernable class to `html` when 4chan sounds player is enabled
		ready("#sound-player-css", (element) => {
			doc.classList.add('fcsp-enabled');
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
		function fetch4chanBoardList() {
			let footer = $("#boardNavDesktopFoot");
			let boardList = `<div class="column">
<h3 style="text-decoration: underline; display: inline;">Japanese Culture</h3>
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
<h3 style="text-decoration: underline; display: inline;">Video Games</h3>
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
<h3 style="text-decoration: underline; display: inline;">Interests</h3>
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
<h3 style="text-decoration: underline; display: inline;">Creative</h3>
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
<h3 style="text-decoration: underline; display: inline;">Other</h3>
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
			footer.innerHTML = `<div class="boardList">` + boardList + `</div>`;
			if ($(`#boardNavDesktopFoot a[href$="/${currentBoard}/`)) {
				$(`#boardNavDesktopFoot a[href$="/${currentBoard}/`).classList.add("current");
			}
		}
		on(d, 'DOMContentLoaded', fetch4chanBoardList);
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
})();
