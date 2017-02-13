// ==UserScript==
// @name         ss16
// @version      0.4
// @author       saxamaphone69
// @match        *://boards.4chan.org/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    console.time('Initialising ss16');
    var d, init;
    d = document;
    d.documentElement.classList.add('site-loading');
    d.onreadystatechange = function () {
        if (d.readyState == "complete") {
            //d.head.querySelector('#fourchanx-css').remove();
            //console.log('readystate fired');
            //d.documentElement.classList.remove('site-loading');
            // make the navbottom togglable, so it can look cooler
            var navBot;
            navBot = d.querySelector('#boardNavDesktopFoot');
            navBot.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.toggle('is-active');
                }
            }, false);
        }
    };
    d.addEventListener('DOMContentLoaded', function() {
        //console.log('domcontentloaded');
        //d.head.querySelector('#fourchanx-css').remove();
    });
    d.addEventListener('4chanXInitFinished', function() {
        //console.log('4chan x init fired');
        d.documentElement.classList.remove('site-loading');
        init();
    });
    init = function () {
        // remove the css added by 4chan x
        d.head.querySelector('style[type]').remove();
        d.head.querySelector('#fourchanx-css').remove();
        d.head.querySelector('link[title="switch"]').remove();
        
/*
        document.dispatchEvent(new CustomEvent("AddSettingsSection", {
            detail: {
                title: "MAXIMUM SCRIPT",
                open: function(section, g) {
                    section.textContent = "MY SCRIPT IS SO COOL! Thank you 4chan X v" + g.VERSION;
                }
            }
        }));
*/
        // attempt to assign headerBar to the actual element
        var attempt, headerBar;
        attempt = (function() {
            if (!d.getElementById('header-bar')) {
                // this.draw.bind(this)
                // var requestId = requestAnimFrame(this.animate.bind(this));
                window.requestAnimationFrame(attempt);
            }
            headerBar = d.getElementById('header-bar');
            console.log(headerBar, 'inside');
        })();
        console.log(headerBar, 'outside');

        // create a fancy menu to hide shortcuts on small res
        var newMenu = d.createElement('span');
        newMenu.classList.add('shortcut', 'ss16-shortcut');
        newMenu.innerHTML = '<i class="material-icons">menu</i>';
        headerBar.querySelector('#shortcuts').appendChild(newMenu);
        newMenu.addEventListener('click', function(e) {
            this.parentNode.classList.toggle('ss16-menu-active');
        }, false);

        // wrap numbers in thread summaries in `<span>`'s
        var summaryConvert;
        summaryConvert = function() {
            var summaries, i, j;
            summaries = d.querySelectorAll('.summary');
            i = 0;
            j = summaries.length;

            for (i; i < j; i++) {
                var oldText, newText;
                oldText = summaries[i].innerHTML;
                newText = oldText.replace(/(\d+)/g, '<span>$1</span>');
                summaries[i].innerHTML = newText;
            }

        };

        summaryConvert();

        var target, observer, config;
        target = d.querySelector('.board');
        observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                summaryConvert();
            });
        });
        config = { childList: true };
        observer.observe(target, config);

        /*
        $.onExists = function(root, selector, cb) {
            var el, observer;
            if (el = $(selector, root)) {
                return cb(el);
            }
            observer = new MutationObserver(function() {
                if (el = $(selector, root)) {
                    observer.disconnect();
                    return cb(el);
                }
            });
            return observer.observe(root, {
                childList: true,
                subtree: true
            });
        };

        var i =1;
function waitForElClass(data, cb){
  var element = data.selected;
  var index = data.index;

  var findEl = document.getElementsByClassName(element)[index];
  console.log(i);
  i++;
  var to = window.setInterval(function(){
    if($(findEl).length){
      console.log(findEl);
      cb(findEl);
      window.clearInterval(to);
    }
  },500)
}
*/
        /*
        var checkElementExists;
        checkElementExists = function(el, cb) {
            console.log('hey');
            var element, to;
            element = el;
            console.log(element, el);
            to = window.setInterval(function() {
                console.log(element, el);
                if (element.length) {
                    console.log(element, el);
                    cb(element);
                    window.clearInterval(to);
                }
            }, 1000);
        };

        checkElementExists(d.getElementById('header-bar'), function() {
            console.log('hello');
        });
*/
        // create the scroll progress element
        var scrollage;
        scrollage = d.createElement('progress');
        scrollage.id = 'scroll-progress';
        scrollage.value = 0;
        scrollage.max = 100;
        headerBar.appendChild(scrollage);

        var boardBannerHeight = 480,
            //scrolled = window.pageYOffset,
            lastScrollY = 0,
            ticking = false;

        var boardBanner, boardTitle, docStyles, primary;

        boardBanner = d.querySelector('.boardBanner');
        boardTitle = d.querySelector('.boardTitle');
        docStyles = window.getComputedStyle(d.documentElement);
        primary = docStyles.getPropertyValue('--base-primary');
        //https://codepen.io/wesbos/pen/adQjoY/
        //https://www.broken-links.com/2014/08/28/css-variables-updating-custom-properties-javascript/
        //https://eager.io/blog/communicating-between-javascript-and-css-with-css-variables/
        function doSomething(scroll_pos) {
            var newScrolled;
            newScrolled = (lastScrollY / 2.5) * 0.1;
            if (lastScrollY >= boardBannerHeight) {
                //d.documentElement.classList.add('scrolled');
                headerBar.classList.add('scrolled');
                boardTitle.style.textShadow = '0 0 ' + primary;
            } else {
                //d.documentElement.classList.remove('scrolled');
                headerBar.classList.remove('scrolled');
                boardTitle.style.textShadow = (16 + -newScrolled) + 'px ' + (16 + -newScrolled) + 'px ' + primary;
            }
            var progressScroll;
            progressScroll = function() {
                var dHeight = d.body.clientHeight, wHeight = window.innerHeight, scrollPercent;
                scrollPercent = (lastScrollY / (dHeight - wHeight)) * 100;
                //pos = scrollPercent;
                scrollage.value = scrollPercent.toFixed(2);
            };
            progressScroll();

            var parBG;
            parBG = (function() {
                var oVal, maxVal, currentVal;
                oVal = lastScrollY / 3;
                maxVal = 300;
                if (oVal < maxVal) {
                    currentVal = oVal;
                } else {
                    currentVal = maxVal;
                };
                boardBanner.style.transform = 'translate3d(0,' + currentVal + 'px, 0)';
            })();
        }



        window.addEventListener('scroll', function(e) {
            lastScrollY = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    doSomething(lastScrollY);
                    ticking = false;
                });
            }
            ticking = true;
        });

        // add searching class to html when search bar has focus
        var anotherAttempt, searchBar;
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
    console.timeEnd('Initialising ss16');
})();
