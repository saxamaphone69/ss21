// ==UserScript==
// @name        ss16 sidedish
// @version     0.5.1
// @description A companion userscript for the ss16 userstyle.
// @author      saxamaphone69
// @namespace   https://saxamaphone69.github.io/ss16/
// @match       *://boards.4chan.org/*
// @match       *://boards.4channel.org/*
// @connect     4chan.org
// @connect     4channel.org
// @connect     4cdn.org
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @run-at      document-start
// ==/UserScript==

// http://ryanmorr.com/using-mutation-observers-to-watch-for-element-availability/
// https://stackoverflow.com/questions/37355888/capturing-class-changes-using-a-mutationobserver
// https://stackoverflow.com/questions/35097520/mutationobserver-for-class-not-for-id

(() => {
    'use strict';

    console.time('Initialising ss16 sidedish...');

    /*! ready v1.2.0 | https://github.com/ryanmorr/ready */
    !function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;n="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,n.ready=e()}}(function(){return function e(n,r,t){function o(i,u){if(!r[i]){if(!n[i]){var d="function"==typeof require&&require;if(!u&&d)return d(i,!0);if(f)return f(i,!0);var l=new Error("Cannot find module '"+i+"'");throw l.code="MODULE_NOT_FOUND",l}var c=r[i]={exports:{}};n[i][0].call(c.exports,function(e){var r=n[i][1][e];return o(r||e)},c,c.exports,e,n,r,t)}return r[i].exports}for(var f="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}({1:[function(e,n,r){"use strict";function t(e,n){for(var r=l.querySelectorAll(e),t=0,o=r.length;t<o;t++){var f=r[t];f.ready||(f.ready=!0,n.call(f,f))}}function o(){d.forEach(function(e){return t(e.selector,e.fn)})}function f(e,n){for(var r=d.length;r--;){var t=d[r];t.selector===e&&t.fn===n&&(d.splice(r,1),!d.length&&u&&(u.disconnect(),u=null))}}function i(e,n){return u||(u=new c(o),u.observe(l.documentElement,{childList:!0,subtree:!0})),d.push({selector:e,fn:n}),t(e,n),function(){return f(e,n)}}Object.defineProperty(r,"__esModule",{value:!0}),r.default=i;var u=void 0,d=[],l=window.document,c=window.MutationObserver||window.WebKitMutationObserver;n.exports=r.default},{}]},{},[1])(1)});

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

    //let options = {'Dark Mode': [false, 'Inverts the colours of ss16 so you don\'t burn your eyes while in your parents\' basement.']};

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
                sel.addEventListener(ev, cb, {passive: true});
            });
        });
    }

    function make(obj) {
        let key,
            el = document.createElement(obj.el);
        if (obj.cl4ss) { el.className = obj.cl4ss; }
        if (obj.html) { el.innerHTML = obj.html; }
        if (obj.attr) {
            for (key in obj.attr) {
                if (obj.attr.hasOwnProperty(key)) {
                    el.setAttribute(key, obj.attr[key]);
                }
            }
        }
        if (obj.appendTo) {
            let parent = obj.appendTo;
            //console.log(parent);
            if (typeof parent === 'string') {
                $(parent).appendChild(el);
            } else {
                parent.appendChild(el);
            }
            //parent.appendChild(el);
        }
        return el;
    }
    /*
    function extend(object, properties) {
        for (let key in properties) {
            const val = properties[key];
            object[key] = val;
        }
    }

    function el(tag, properties, properties2) {
        const el = d.createElement(tag);
        if (properties) { extend(el, properties); }
        if (properties2) { extend(el, properties2); }
        return el;
    }
    appendTo(Target){
    if(Target.Element) Target = Target.Element
    if(typeof Target === 'string'){
      Target = document.body.querySelector(Target)
    }
    if(Target){
      Target.appendChild(this.Element)
    }
    return this
  }

  function make(obj) {
    let key,
      el = document.createElement(obj.el);
    if (obj.cl4ss) { el.className = obj.cl4ss; }
    if (obj.html) { el.innerHTML = obj.html; }
    if (obj.attr) {
      for (key in obj.attr) {
        if (obj.attr.hasOwnProperty(key)) {
          el.setAttribute(key, obj.attr[key]);
        }
      }
    }
    if (obj.appendTo) {
      $(obj.appendTo).appendChild(el);
    }
    return el;
  }
  */
    /*
    function ready(fn) {
        if (d.readyState !== 'loading') {
            fn();
        } else {
            on(d, 'DOMContentLoaded', fn);
        }
    }*/
    /*
    function gmGet(name) {
    var theValue = GM_getValue(name);
    return theValue;
}

function gmSet(name, valuee) {
    GM_setValue(name, valuee);
}

$("a#linkid").click(function(){
    //setValue
    gmSet("foo", 123);

   //getValue
   gmGet("foo");
});

      $.GM_getValue = function(key) {
    var err;
    try {
      return $.currentValue[key] = GM_getValue(key);
    } catch (_error) {
      err = _error;
      return $.currentValue[key];
    }
  };

  $.GM_setValue = function(key, val) {
    $.currentValue[key] = val;
    return GM_setValue(key, val);
  };

    function getStoredValues(init) {
    data = GM_getValue("data", defaults);
    try {
      data = JSON.parse(data);
      if (!Object.keys(data).length || ({}).toString.call(data) !== "[object Object]") {
        throw new Error();
      }
    } catch(err) { // compat
      data = GM_getValue("data", defaults);
    }
  }

  function setStoredValues(reset) {
    data.processedCss = $style.textContent;
    GM_setValue("data", JSON.stringify(reset ? defaults : data));
    updatePanel();
  }
  */
    function getValue(key) {
        let val = GM_getValue(key);
        return val;
    }

    function setValue(key, val) {
        GM_setValue(key, val);
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
    /*
        var target, observer, config;
        target = d.querySelector('.board');
        observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                summaryConvert();
            });
        });
        config = { childList: true };
        observer.observe(target, config);
        */
    /*
    function onExists(sel, fn) {
        let observer;
        observer = new MutationObserver(function(mutations) {
            console.log(mutations);
        });
        observer.observe($('.board'), {
            childList: true
        });
    }
*/
    /*
    let onExists = function(root, selector, cb) {
  let el;
  if (el = $(selector, root)) {
    return cb(el);
  }
  var observer = new MutationObserver(function() {
    if (el = $(selector, root)) {
      observer.disconnect();
      return cb(el);
    }
  });
  return observer.observe(root, {childList: true, subtree: true});
};
*/

    function onExists(root, sel, cb) {
        let el, observer;
        if (el = $$(sel, root)) {
            return cb(el);
        }
        observer = new MutationObserver(function() {
            if (el = $$(sel, root)) {
                observer.disconnect();
                return cb(el);
            }
        });
        return observer.observe(root, {childList:true});
    }

    function setupSettings() {
        $('.settings-link').addEventListener('click', function(event) {
            let settingsDialog, settingsTab, settingsSection, settingsSectionOld;
            settingsDialog = $('#fourchanx-settings');
            settingsTab = make({
                el: 'span',
                html: ` | <a class="tab-ss16" href="javascript:;">ss16</a>`
            });
            settingsSection = make({
                el: 'section',
                cl4ss: 'section-ss16',
                html: `<fieldset>
<legend>ss16</legend>
<div class="warning">Some changes will take affect upon the next page refresh.</div>
<div data-name="darkMode" data-checked="${getValue('darkMode')}">
<label><input type="checkbox" name="darkMode" ${(getValue('darkMode') === true ? 'checked' : '')}>Dark Mode</label>
<span class="description">Inverts the colours of ss16 so you don't burn your eyes while in your parents' basement.</span>
</div>
<div data-name="judgementMode" data-checked="${getValue('judgementMode')}">
<label><input type="checkbox" name="judgementMode" ${(getValue('judgementMode') === true ? 'checked' : '')}>Judgement Mode</label>
<span class="description">Leaves a snark comment about your 4chan X Settings.</span>
</div>
<div data-name="fileHoverMode" data-checked="${getValue('fileHoverMode')}">
<label><input type="checkbox" name="fileHoverMode" ${(getValue('fileHoverMode') === true ? 'checked' : '')}>Always Display File Information</label>
<span class="description">When enabled, instead of hovering over a file to see it's information, it will always be displayed.</span>
</div>
<div data-name="yotsubaMode" data-checked="${getValue('yotsubaMode')}">
<label><input type="checkbox" name="yotsubaMode" ${(getValue('yotsubaMode') === true ? 'checked' : '')}>Yotsuba Theme</label>
<span class="description">Some people prefer the traditional Yotsuba theme, so re-enable it.</span>
</div>
</fieldset>`
            });
            on($$('input', settingsSection), 'click', function(e) {
                let currentVal = (() => {
                    if (this.checked) {
                        return true;
                    } else {
                        return false;
                    }
                })();
                let currentKey = this.getAttribute('name');
                setValue(currentKey, currentVal);
                if (this.getAttribute('name') === 'darkMode') {
                    doc.classList.toggle('ss16--invert');
                }
                if (this.getAttribute('name') === 'judgementMode') {
                    doc.classList.toggle('ss16--judgement');
                }
                if (this.getAttribute('name') === 'fileHoverMode') {
                    doc.classList.toggle('ss16--fileInfoAlwaysDisplayed');
                }
                if (this.getAttribute('name') === 'yotsubaMode') {
                    doc.classList.toggle('ss16--yotsuba');
                }
            });
            settingsSectionOld = $('.section-container');
            $('.sections-list', settingsDialog).appendChild(settingsTab);
            on($('.tab-ss16'), 'click', function() {
                $('.sections-list > .tab-selected').classList.remove('tab-selected');
                this.classList.add('tab-selected');
                settingsSectionOld.lastChild.style.display = 'block';
                settingsSectionOld.firstChild.style.display = 'none';
                settingsSectionOld.appendChild(settingsSection);
                on($$('.sections-list > a'), 'click', function() {
                    $('.tab-ss16').classList.remove('tab-selected');
                    settingsSectionOld.lastChild.style.display = 'none';
                    settingsSectionOld.firstChild.style.display = 'block';
                });
            });
            //}, {once: true});
        });
    }

    function init() {
        //ready(function() { doc.classList.remove('site-loading'); });

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

        if (getValue('darkMode') === true) {
            doc.classList.add('ss16--invert');
        }

        if (getValue('judgementMode') === true) {
            doc.classList.add('ss16--judgement');
        }

        if (getValue('fileHoverMode') === true) {
            doc.classList.add('ss16--fileInfoAlwaysDisplayed');
        }

        if (getValue('yotsubaMode') === true) {
            doc.classList.add('ss16--yotsuba');
        }

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

        setupSettings();

        // this should return the `#header-bar` element
        const headerBar = $('#header-bar');

        const scrollProgress = make({
            el: 'progress',
            attr: {
                id: 'scroll-progress',
                value: 0,
                max: 100
            }
        });

        headerBar.appendChild(scrollProgress);

        const hero = $('.boardBanner'),
              heroHeight = 480,
              boardTitle = $('.boardTitle'),
              //primaryColour = getComputedStyle(doc).getPropertyValue('--base-primary'),
              //primaryColour = window.getComputedStyle(doc).getPropertyValue('--base-primary'),
              mVal = 300;

        /*
        function fitText(el) {
            el.style.fontSize = Math.max(Math.min(el.clientWidth / 11)) + 'px';
        }

        fitText(boardTitle);
*/
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

        function fancyShadow(el) {
            let oVal = window.scrollY,
                nVal = (oVal / 2.5) * 0.1;
            if (oVal >= heroHeight) {
                headerBar.classList.add('scrolled');
                el.style.textShadow = '0 0 var(--primary-500)';
                //el.style.textShadow = '0 0 ' + primaryColour;
            } else {
                headerBar.classList.remove('scrolled');
                el.style.textShadow = (16 + -nVal) + 'px ' + (16 + -nVal) + 'px var(--primary-500)';
                //el.style.textShadow = (16 + -nVal) + 'px ' + (16 + -nVal) + 'px ' + primaryColour;
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
            //console.log(el, scrollPercent);
            el.value = scrollPercent.toFixed(2);
            //progressScroll = function() {
            //var dHeight = d.body.clientHeight, wHeight = window.innerHeight, scrollPercent;
            //scrollPercent = (lastScrollY / (dHeight - wHeight)) * 100;
            //pos = scrollPercent;
            //scrollage.value = scrollPercent.toFixed(2);
            //};
        }

        on(window, 'scroll', function(e) {
            rAF(parallaxHero(hero));
            rAF(fancyShadow(boardTitle));
            rAF(progressScroll(scrollProgress));
        });

        function countBacks() {
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
            let summaries = $$('.summary');
            for (let summary of summaries) {
                let oldText, newText;
                oldText = summary.innerHTML;
                newText = oldText.replace(/(\d+(?=\ ))/g, '<b>$1</b>');
                summary.innerHTML = newText;
            }
        }

        function swapInfo() {
            let ops = $$('.op');
            for (let op of ops) {
                let opPostInfo = $('.postInfo', op);
                op.prepend(opPostInfo);
            }
        }

        /*

*/

        if (config === 'index') {
                    const target = $('.board');
const config = {
    childList: true
};
function subscriber(mutations) {
    //console.log('hey i mutated');
    convertSummaries();
    swapInfo();
}
const observer = new MutationObserver(subscriber);
observer.observe(target, config);
        }

        if (config === 'index') {
            on(d, 'IndexRefresh', convertSummaries);
            on(d, 'IndexRefresh', swapInfo);
        }

        if (config === 'thread') {
            countBacks();
            swapInfo();
        }

        function boardDrawer() {
            //let boardNav = $('#header-bar > span');
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
                    appendTo: _this,
                    html: `menu`
                });

            });
            let boardNavToggle = $('.ss16--board-drawer-toggle');
            //on(boardNavToggle, 'click', );
            //let url = '../../../../../boards.json';
            let url = 'https://a.4cdn.org/boards.json';
            // ???

            function createNode(element) {
                return d.createElement(element);
            }

            function append(parent, el) {
                return parent.appendChild(el);
            }
            /*
            boardMenuIcon.addEventListener('click', function() {
                boardDrawer.classList.add('drawer-open');
            });
*/
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
        /*
        ready('#qr', (element) => {
            let _this = element;
            let fuckme = d.querySelectorAll('.persona input');
            let qrInputs = $$('.persona input', _this);
            let textArea = $$('textarea', _this);
            qrInputs.push(textArea[0]);
            for (let i = 0, j = qrInputs.length; i < j; i++) {
                console.log(qrInputs[i].nodeType);
            }
            //console.log('list of floating label inputs we want', qrInputs);
            function wrap(el, wrapper) {
                el.parentNode.insertBefore(wrapper, el);
                wrapper.appendChild(el);
            }
            fuckme.forEach(fuck => {
                //console.log(fuck);
            });
            for (let qrInput of qrInputs) {
                let currentLabel = qrInput.getAttribute('placeholder');
                let newWrapper = document.createElement('div');
                let newLabel = document.createElement('label');
                newWrapper.classList.add('floating-label--wrapper');
                newLabel.classList.add('floating-label--text');
                newLabel.setAttribute('for', currentLabel.toLowerCase());
                newLabel.textContent = currentLabel;
                wrap(qrInput, newWrapper);
                newWrapper.appendChild(newLabel);
                //console.log(newWrapper.firstChild);
                //console.log(qrInput[0]);

                if (qrInput.value) {
                    qrInput.parentNode.classList.add('floating-label--filled');
                }

                            qrInput.addEventListener('focus', function() {
                qrInput.parentNode.classList.add('floating-label--active');
            });
            qrInput.addEventListener('blur', function() {
            qrInput.parentNode.classList.remove('floating-label--active');
                if (qrInput.value !== 0) {
                    qrInput.parentNode.classList.add('floating-label--filled');
                }
            });

                //onblur = function(){ console.log('Blurred textarea'); };
                //qrInput.onfocus = function(){ qrInput.parentNode.classList.add('floating-label--active'); };
                //qrInput.onblur = function(){ qrInput.parentNode.classList.remove('floating-label--active'); };
                //console.log(qrInput);
                //qrInput.onblur = function(){ this.parentNode.classList.toggle('floating-label--active'); };
                //wrap(qrInput, d.createElement('



                // example: wrapping an anchor with class "wrap_me" into a new div element
                //wrap(document.querySelector('a.wrap_me'), document.createElement('div'));

            //}
            //on(qrInputs, 'focus', this.parentNode.classList.toggle('floating-label--active'));
        });*/
        /*
        function floatingLabels() {
            //read
            let qrInputs = $$('.pesona input', qr);
            for (let qrInput of qrInputs) {
                //org_html = document.getElementById("slidesContainer").innerHTML;
                //new_html = "<div id='slidesInner'>" + org_html + "</div>";
                //document.getElementById("slidesContainer").innerHTML = new_html;
                qrInput.getAttribute('placeholder');
                console.log(qrInput);
            }
        }*/
        /*
        new MutationObserver( mutation => {
    if (!mutation.addedNodes) return;
    mutation.addedNodes.forEach( node => {
        // do stuff with node
    });
});
*/

        //convertSummaries();

        //onExists($$('.summary'), convertSummaries());

        //onExists(doc, '.summary', console.log('hi?'));

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
<li><a href="//boards.4channel.org/vp/" class="boardlink">Pokémon</a></li>
<li><a href="//boards.4channel.org/vr/" class="boardlink">Retro Games</a></li>
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
        }

        fetch4chanBoardList();
        /*
        function warn(string) {
            const toast = make({
                el: 'div',
                cl4ss: 'ss16--toast',
                html: `<span class="ss16--toast-text">${string}</span>`,
                appendTo: 'body'
            });
        }
*/
        /*
        if (doc.classList.contains('oneechan')) {
            make({
                el: 'aside',
                cl4ss: 'ss16--dialog',
                appendTo: 'body',
                html: `<div class="ss16--dialog-window"><header class="ss16--dialog-header">Slight Problem...</header><section class="ss16--dialog-description">It would seem that OneeChan is running. You don't actually need that for ss18, so turn it off baka~</section></div>`
            });
            doc.classList.add('unscroll');
        }
        */
        /*
        var anotherAttempt, searchBar;
        if (view === 'index') {
            anotherAttempt = (function() {
                if (!d.getElementById('index-search')) {
                    window.requestAnimationFrame(anotherAttempt);
                    return false;
                }
                searchBar = d.getElementById('index-search');
            })();

            searchBar.addEventListener('focus', function() {
                d.documentElement.classList.add('is-searching');
            });
            searchBar.addEventListener('blur', function() {
                if (searchBar.dataset.searching != 1) {
                    d.documentElement.classList.remove('is-searching');
                }
            });
        };
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

*/
        /*function toggle(e) {
            var t = document.getElementById(e);
            t.style.display = "block" != t.style.display ? "block" : "none";
        }*/

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

        if (config === 'thread') {
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
var playPromise = OpVideo.play();

  if (playPromise !== undefined) {
    playPromise.then(_ => {
      // Automatic playback started!
      // Show playing UI.
    })
    .catch(error => {
      // Auto-play was prevented
      // Show paused UI.
    });
  }
                    //OpVideo.setAttribute('autoplay', 'autoplay');
                    //OpVideo.autoplay = true;
                    //OpVideo.load();
                    //OpVideo.load();
                    //OpVideo.playsinline;
                    //OpVideo.controls = false;
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
            OPAsBanner();
        }

        //sendNotification('info', 'Thanks for using ss16!');
    }

    on(d, '4chanXInitFinished', init);

    
    function backup() {
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

        if (!doc.classList.contains('fourchan-x')) {
            doc.classList.remove('site-loading');
            doc.classList.add('no-fourchan-x');
            /*make({
                el: 'aside',
                cl4ss: 'ss16--dialog',
                appendTo: 'body',
                html: `<div class="ss16--dialog-window"><header class="ss16--dialog-header">Slight Problem...</header><section class="ss16--dialog-description">It doesn't seem like you've got 4chan X running. Double check your userscripts/extensions and try again.</section></div>`
            });
            doc.classList.add('unscroll');*/
        }
    }

    on(d, 'DOMContentLoaded', backup);

    console.timeEnd('Initialising ss16 sidedish...');
})();
