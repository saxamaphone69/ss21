(() => {
  'use strict';
  const d = document;
  function $(sel, root) {
    return (root || d).querySelector(sel);
  }

  function $$(sel, root) {
    return [...(root || d).querySelectorAll(sel)];
  }

  function on(sel, events, callback) {
    sel = Array.isArray(sel) ? sel : [sel];
    let event = events.split(/\s+/);
    sel.forEach(sel => {
      event.forEach(ev => {
        sel.addEventListener(ev, callback);
      });
    });
  }
  function ready(fn) {
    if (d.readyState !== 'loading') {
      fn();
    } else {
      on(d, 'DOMContentLoaded', fn);
    }
  }
  function init() {
    const nav = $('.navigation');
    const hero = $('.hero');
    const mVal = 300;
    let heroHeight = hero.offsetHeight;
    let ticking = false;
    function rAF(cb, args) {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          ticking = false;
        });
      }
      ticking = true;
    }
    function navBackground(el) {
      let oVal = window.scrollY;
      if (oVal >= heroHeight) {
        el.classList.add('navigation--scrolled');
      } else {
        el.classList.remove('navigation--scrolled');
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
    on(window, 'scroll', function(e) {
      rAF(navBackground(nav));
      rAF(parallaxHero(hero));
    });
  }
  ready(init());
})();
