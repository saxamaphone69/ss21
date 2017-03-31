// ==UserScript==
// @name         sidedish
// @version      0.6
// @author       saxamaphone69
// @match        *://boards.4chan.org/*
// @grant        GM_xmlhttpRequest
// @require      https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    console.time('Initialising ss16');
    var d, view, init;
    d = document;
    d.documentElement.classList.add('site-loading');
    view = (function () {
        switch (location.pathname.split('/')[2]) {
            case 'thread':
                return 'thread';
            default:
                return 'index';
        }
    })();
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
    //d.addEventListener('DOMContentLoaded', function() {
    //console.log('domcontentloaded');
    //d.head.querySelector('#fourchanx-css').remove();
    //});
    d.addEventListener('4chanXInitFinished', function() {
        //console.log('4chan x init fired');
        d.documentElement.classList.remove('site-loading');
        init();
        setTimeout(function() {
            if (document.documentElement.classList.contains('oneechan')) {
                document.dispatchEvent(new CustomEvent('CreateNotification', {
                    detail: {
                        type: 'warning', // info, warning, error
                        content: 'Please disable OneeChan in order to use ss16.',
                        lifetime: 0
                    }
                }));
                d.head.querySelector('#fourchanx-bgcolor-css').remove();
                d.head.querySelector('#ch4SS').remove();
            }
        }, 500);
    });

    init = function () {
        // remove the css added by 4chan x
        d.head.querySelector('style[type]').remove();
        d.head.querySelector('#fourchanx-css').remove();
        d.head.querySelector('link[title="switch"]').remove();
        //d.head.querySelector('#ch4SS').remove();

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
            //console.log(headerBar, 'inside');
        })();
        //console.log(headerBar, 'outside');

        // create a fancy menu to hide shortcuts on small res

        var newMenu = d.createElement('span');
        newMenu.classList.add('shortcut', 'ss16-shortcut');
        newMenu.innerHTML = '<i class="material-icons">menu</i>';
        //parent.insertBefore(el, parent.firstChild);
        //headerBar.querySelector('#shortcuts').appendChild(newMenu);
        headerBar.querySelector('#shortcuts').insertBefore(newMenu, headerBar.querySelector('#shortcuts').firstChild);
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
        var letsgomason = function() {
            var boardForMason = d.querySelector('.board');

            var msnry = new Masonry( boardForMason, {
                // options
                itemSelector: '.catalog-thread',
                columnWidth: '.catalog-thread',
                animate: true
                //gutter: 16,
                //percentPosition: true
            });
        };

        var masonButton;
        masonButton = d.createElement('span');
        masonButton.classList.add('mason-button--container');
        masonButton.innerHTML = '<i class="material-icons mason-button">dashboard</i>';
        if (view === 'index') {
            d.querySelector('.navLinks').appendChild(masonButton);
        }
        masonButton.addEventListener('click', function(e) {
            letsgomason();
        }, false);


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

        if (view === 'index') {
            var selectSwitch;

            selectSwitch = function() {

                /*
                 * if i knew what i was doing, i'm sure this function could actually be really useful and probably usable across the web...
                 * pity i'm not that intelligent
                 * http://mnmly.github.io/select-switch/
                 * https://github.com/mikemaccana/styleselect/blob/master/js/styleselect.js (http://mikemaccana.github.io/styleselect/)
                 */

                var insertAfter;
                function insertAfter(newEl, oldEl) {
                    oldEl.parentNode.insertBefore(newEl, oldEl.nextSibling);
                }

                var insertBefore;
                function insertBefore(newEl, oldEl) {
                    // Get a reference to the element in which we want to insert a new node
                    //var parentElement = document.getElementById('parentElement');
                    // Get a reference to the first child
                    //var theFirstChild = parentElement.firstChild;

                    // Create a new element
                    //var newElement = document.createElement("div");

                    // Insert the new element before the first child
                    //parentElement.insertBefore(newElement, theFirstChild);
                    oldEl.insertBefore(newEl, oldEl.firstChild);
                }

                var createCloneSelect;
                createCloneSelect = function(oldSelect, oldID) {
                    var newSelect = document.createElement('ul');
                    newSelect.classList.add('ss16-new-select');
                    newSelect.setAttribute('data-id', oldID);
                    insertAfter(newSelect, oldSelect);
                };

                var oldSelects;
                oldSelects = document.querySelectorAll('select');

                for (var oldSelect of oldSelects) {
                    var reSelf = oldSelect;
                    var oldSelectValue;
                    oldSelectValue = oldSelect.value;
                    //console.log(oldSelect, oldSelectValue);
                    oldSelect.classList.add('ss16-hide-select');
                    createCloneSelect(oldSelect, oldSelect.id);
                    var newSelect;
                    newSelect = oldSelect.nextSibling;
                    var optionsList;
                    optionsList = oldSelect.querySelectorAll('option:not([disabled])');
                    for (var option of optionsList) {
                        var listItem;
                        listItem = document.createElement('li');
                        listItem.classList.add('ss16-new-select--option');
                        if (option.hasAttribute('value')) {
                            listItem.setAttribute('data-value', option.value);
                        }
                        listItem.textContent = option.textContent;
                        newSelect.appendChild(listItem);
                        if (option.getAttribute('value') === oldSelectValue) {
                            newSelect.insertBefore(listItem, newSelect.firstChild);
                        }
                    }
                    newSelect.onclick = function() {
                        var self = this;
                        var listItems = self.querySelectorAll('li');
                        var newValue = listItems[1].getAttribute('data-value');
                        var originalSelect;
                        originalSelect = this.previousElementSibling;
                        originalSelect.value = newValue;
                        originalSelect.dispatchEvent(new CustomEvent('change'));
                        this.appendChild(listItems[0]);
                    };
                }

            };

            selectSwitch();
            /*

            var selectSwitch;
            selectSwitch = function() {
                var oldSelect, oldSelectValue, newSelect, newSelectValue, sortOrder;
                oldSelect = document.getElementById('index-sort');
                oldSelectValue = oldSelect.value;

                newSelect = d.createElement('ul');
                newSelect.className = 'ss16-select-dropdown';
                newSelect.innerHTML = '<li class="ss16-select-dropdown--item" data-value="bump">Bump Order</li>\
<li class="ss16-select-dropdown--item" data-value="replycount">Reply Count</li>\
<li class="ss16-select-dropdown--item" data-value="filecount">File Count</li>';

                //newSelect.querySelector('[data-value="' + oldSelectValue + '"]').classList.add('active');
                newSelect.querySelector('[data-value="' + oldSelectValue + '"]').classList.add('active');


                newSelect.addEventListener('click', function() {
*/
            /*
                    sortOrder = newSelect.querySelectorAll('.ss16-select-dropdown--item');
                    console.log(sortOrder);
                    var newSortOrder;
                    //
                    //sortOrder.push.apply(sortOrder, sortOrder.splice(0,1));
                    sortOrder = sortOrder.concat(sortOrder.splice(0,2));
                    console.log(sortOrder);
                    oldSelect.value = newSelect.children[1].getAttribute('data-value');
                    oldSelect.dispatchEvent(new CustomEvent('change'));
                    */
            //});
            /*
wrapper.onclick = function() {
				var newItem = newSelect.firstChild.cloneNode(true);
				newSelect.appendChild(newItem);
				oldSelect.value = newSelect.children[1].getAttribute('data-value');
    		oldSelect.dispatchEvent(new CustomEvent('change'));
    		//console.log(oldSelect.value);
				newSelect.removeChild(newSelect.firstChild);
			};
			wrapper.appendChild(newSelect);

                var sortOrder = newSelect.querySelectorAll('.ss16-sort-group--item');
                for (var i = 0; i < sortOrder.length; ++i) {
                    sortOrder[i].addEventListener('click', function() {
                        newSelectValue = this.getAttribute('data-value');
                        oldSelect.value = newSelectValue;
                        oldSelect.dispatchEvent(new CustomEvent('change'));
                        newSelect.querySelector('.active').classList.remove('active');
                        newSelect.querySelector('[data-value="' + newSelectValue + '"]').classList.add('active');
                    });
                };
                */
            //d.querySelector('.navLinks').appendChild(newSelect);
            //};
            //selectSwitch();
        };

        /*
        var selectSwitch;
        // turn the index sorter into something a bit more fun
        selectSwitch = (function () {
            var oldSelect, oldSelectValue, newSelect, newSelectValue;
            // grab which sort mode is selected
            oldSelect = document.getElementById('index-sort');
            oldSelectValue = oldSelect.value;

            // create the new html that will replace it
            newSelect = document.createElement('div');
            newSelect.className = 'ss16-sort-group';
            newSelect.innerHTML = '<button class="ss16-sort-group--item" data-value="bump">bump order</button><button class="ss16-sort-group--item" data-value="replycount">reply count</button><button class="ss16-sort-group--item" data-value="filecount">file count</button>';

            newSelect.querySelector('[data-value="' + oldSelectValue + '"]').classList.add('active');

            var sortButtons = newSelect.querySelectorAll('.ss16-sort-group--item');
            for (var i = 0; i < sortButtons.length; ++i) {
                sortButtons[i].addEventListener('click', function() {
                    newSelectValue = this.getAttribute('data-value');
                    oldSelect.value = newSelectValue;
                    oldSelect.dispatchEvent(new CustomEvent('change'));
                    newSelect.querySelector('.active').classList.remove('active');
                    newSelect.querySelector('[data-value="' + newSelectValue + '"]').classList.add('active');
                });
            };

            document.querySelector('.navLinks').appendChild(newSelect);


        })();*/

        // taken from: https://github.com/google/material-design-lite/blob/mdl-1.x/src/layout/layout.js
        var screenSizeHandler, screenSizeMediaQuery;
        screenSizeHandler = function() {
            if (screenSizeMediaQuery.matches) {
                d.documentElement.classList.add('is-small-screen');
            } else {
                d.documentElement.classList.remove('is-small-screen');
            }
        };

        screenSizeMediaQuery = window.matchMedia('(max-width: 75rem)');
        screenSizeMediaQuery.addListener(screenSizeHandler.bind(this));
        screenSizeHandler();

        var scrollNav = (function() {
            var boardList;
            boardList = d.querySelector('#header-bar');
            var leftButton = d.createElement('i');
            leftButton.classList.add('material-icons', 'scroll-indicator', 'scroll-indicator--left');
            leftButton.textContent = 'chevron_left';
            var rightButton = d.createElement('i');
            rightButton.classList.add('material-icons', 'scroll-indicator', 'scroll-indicator--right');
            rightButton.textContent = 'chevron_right';
            boardList.appendChild(leftButton);
            boardList.appendChild(rightButton);
            (function() {
                var n, c, l, i, e, t;
                n = d.querySelector('.scroll-indicator--right');
                c = d.querySelector('.scroll-indicator--left');
                l = d.querySelector('#board-list > span:not([hidden])'); //#custom-board-list
                i = 40;
                e = function() {
                    c.classList.remove('disabled');
                    n.classList.remove('disabled');
                    if (l.scrollLeft <=0) {
                        c.classList.add('disabled');
                    }
                    if (l.scrollLeft + l.clientWidth + 5 >= l.scrollWidth) {
                        n.classList.add('disabled');
                    }
                };
                e();
                t = function() {
                    e();
                    l.scrollLeft += i;
                };
                l.addEventListener('scroll', function() {
                    e();
                });
                n.addEventListener('click', function() {
                    l.scrollLeft += i;
                });
                c.addEventListener('click', function() {
                    l.scrollLeft += -i;
                });
            })();
            /*
            (function() {
                function e() {
                    c.classList.remove("disabled"),
                        n.classList.remove("disabled"),
                        l.scrollLeft <= 0 && c.classList.add("disabled"),
                        l.scrollLeft + l.clientWidth + 5 >= l.scrollWidth && n.classList.add("disabled");
                }
                function t(e) {
                    l.scrollLeft += e;
                }
                var n = document.querySelector(".scroll-indicator--right"),
                    c = document.querySelector(".scroll-indicator--left"),
                    l = document.querySelector("#custom-board-list"),
                    i = 40;
                l.addEventListener("scroll", e),
                    e(),
                    n.addEventListener("click", t.bind(null, i)),
                    c.addEventListener("click", t.bind(null, -i));
            })();
            */
        })();

        /*
        if (window.matchMedia('(max-width: 75rem)').matches) {
            d.documentElement.classList.add('is-small-screen');
        } else {
            d.documentElement.classList.remove('is-small-screen');
        }
*/
        /*
        var scrollNav;
        scrollNav = function() {
            var customBoardList, fullBoardList, windowWidth;
            customBoardList = d.querySelector('#custom-board-list').offsetWidth;
            fullBoardList = d.querySelector('#full-board-list').offsetWidth;
            windowWidth = d.body.clientWidth;
            window.addEventListener('resize', function(e){
                customBoardList = d.querySelector('#custom-board-list').offsetWidth;
                fullBoardList = d.querySelector('#full-board-list').offsetWidth;
                windowWidth = d.body.clientWidth;
                console.log(customBoardList, fullBoardList, windowWidth);
            });
        };
        scrollNav();
        */


    };
    console.timeEnd('Initialising ss16');
})();

/*

what getmdl.io uses when window too small

!function() {
    "use strict";
    function e() {
        c.classList.remove("disabled"),
        n.classList.remove("disabled"),
        l.scrollLeft <= 0 && c.classList.add("disabled"),
        l.scrollLeft + l.clientWidth + 5 >= l.scrollWidth && n.classList.add("disabled")
    }
    function t(e) {
        l.scrollLeft += e
    }
    var n = document.querySelector(".scrollindicator.scrollindicator--right")
      , c = document.querySelector(".scrollindicator.scrollindicator--left")
      , l = document.querySelector(".docs-navigation")
      , i = 40;
    l.addEventListener("scroll", e),
    e(),
    n.addEventListener("click", t.bind(null, i)),
    n.addEventListener("tap", t.bind(null, i)),
    c.addEventListener("click", t.bind(null, -i)),
    c.addEventListener("tap", t.bind(null, -i))
}(),
*/
