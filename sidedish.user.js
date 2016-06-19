// ==UserScript==
// @name         style removal
// @run-at       document-end
// @author       saxamaphone69
// @match        *://boards.4chan.org/*
// @grant        none
// ==/UserScript==

//https://developer.mozilla.org/en-US/docs/Web/API/console#Timers
document.addEventListener('4chanXInitFinished', function() {
    console.log('4chan x init finished');
});
//document.addEventListener('DOMContentLoaded', function() {
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        var styles;
        console.time('Removing style elements...');
        styles = document.head.querySelectorAll('style');
        for (var i = 0, j = styles.length; i < j; i++) {
            styles[i].remove(0);
        }
        console.timeEnd('Removing style elements...');
        
        var divs = document.querySelectorAll('.op');

[].forEach.call(divs, function(div) {
  // do whatever
    console.log(div.querySelector('.stickyIcon'));
  if (div.querySelector('.stickyIcon') !== null) {
      div.querySelector('.stickyIcon').insertAdjacentHTML('afterend', '<i class="material-icons">place</i>');
  };
   if (div.querySelector('.closedIcon') !== null) {
      div.querySelector('.closedIcon').insertAdjacentHTML('afterend', '<i class="material-icons">lock</i>');
  };
});
        
        

        
        
var insertListener = function(event){
	if (event.animationName == "nodeInserted") {
		// This is the debug for knowing our listener worked!
		// event.target is the new node!
		console.warn("Another node has been inserted! ", event, event.target);
	}
};
        
        document.addEventListener('animationstart', insertListener, false);
        /*
        var overlay;
        
            function mutationObjectCallback(mutationRecordsList) {
  mutationRecordsList.forEach(function(mutationRecord) {
      if (mutationRecord.addedNodes[0].id === "overlay") {
          //mutationRecord.addedNodes[0].classList.add('BYE');
          overlay = mutationRecord.addedNodes[0];
          
          console.log('we overlay');

var newDiv = document.createElement('div');
          newDiv.id = 'pointless-div';
          
          overlay.parentNode.insertBefore(newDiv, overlay);

// move el into wrapper
newDiv.appendChild(overlay);
          
          //overlay.insertAdjacentHTML('beforebegin', newDiv);
          //overlay.parentNode.insertBefore(newDiv, overlay);
          
          //overlay.addEventListener('click', function(e) { e.preventDefault(); }, false);
          newDiv.addEventListener('click', function(e) {
              console.log('we clicked');
              e.stopPropagation();
  // do your slide out animation here
  setTimeout(function() {
    newDiv.parentNode.click();
  }, 10000 //or whatever timing you wish);
}, false);
      }
      
    //console.log("Type of mutation: " + mutationRecord.type);
     // console.log(mutationRecord.removedNodes);
    //  console.log(mutationRecord.removedNodes[0].id);
  });
}
    new MutationObserver(mutationObjectCallback).observe(document.body, {
        childList: true
    });*/
    
        
        var header, boardBanner, boardBannerHeight, boardTitle, expandTextShadow;
        header = document.getElementById('header-bar');
        boardBanner = document.querySelector('.boardBanner');
        boardBannerHeight = boardBanner.offsetHeight;
        boardTitle = document.querySelector('.boardTitle');
        var bodyStyles = window.getComputedStyle(document.body);
        var primary = bodyStyles.getPropertyValue('--base-primary');
        boardTitle.style.textShadow = '16px 16px 0 ' + primary;
        expandTextShadow = function() {
            var scrolled, newScrolled;
            scrolled = window.pageYOffset;
            newScrolled = (scrolled / 2.5) * 0.1;
            if (scrolled >= boardBannerHeight) {
                document.documentElement.classList.add('scrolled');
                boardTitle.style.textShadow = '16px 16px 0 ' + primary;
            } else {
                document.documentElement.classList.remove('scrolled');
                boardTitle.style.textShadow = (16 + -newScrolled) + 'px ' + (16 + -newScrolled) + 'px 0 ' + primary;
            }



            //console.log(newScrolled);

            //boardTitle.style.textShadow = (16 + -newScrolled) + 'px ' + (16 + -newScrolled) + 'px 0 blue';

        };
                window.addEventListener('scroll', expandTextShadow, false);

        var navBottom;
        navBottom = document.getElementById('boardNavDesktopFoot');

        navBottom.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.toggle('is-active');
            }
        }, false);
        var scrollage;
        var INEEDHEAD;
        var attempt = (function() {
    if (!document.getElementById('header-bar')) {
      window.requestAnimationFrame(attempt);
    }
        scrollage = document.createElement('progress');
        scrollage.id = 'scroll-progress';
        scrollage.value = 0;
        scrollage.max = 100;
            INEEDHEAD = document.getElementById('header-bar');
        document.getElementById('header-bar').appendChild(scrollage);
  })();
        
        var progressScroll;
        progressScroll = function() {
            var s = window.pageYOffset, dHeight = document.body.clientHeight, wHeight = window.innerHeight, scrollPercent, pos;
            scrollPercent = (s / (dHeight - wHeight)) * 100;
            pos = scrollPercent;
            scrollage.value = pos.toFixed(2);
        };
        window.addEventListener('scroll', progressScroll, false);
        
        var newMenu = document.createElement('span');
        newMenu.classList.add('shortcut', 'ss16-shortcut');
        newMenu.innerHTML = '<i class="material-icons">menu</i>';
        INEEDHEAD.querySelector('#shortcuts').appendChild(newMenu);
        newMenu.addEventListener('click', function(e) {
            this.parentNode.classList.toggle('ss16-menu-active');
        }, false);

        
        
        /*
    new MutationObserver(mutationObjectCallback).observe(document.body, {
        childList: true
    });

    var sexyHeader;

    function mutationObjectCallback(mutationRecordsList) {
        mutationRecordsList.forEach(function(mutationRecord) {
            if (mutationRecord.addedNodes[0].id === 'header-bar') {
                sexyHeader = mutationRecord.addedNodes[0];
            }
        });
    };

    console.log(sexyHeader);
    */
        
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
            
        })();
            /*
			var oldSelect = document.getElementById('index-sort');
			var selectValue = oldSelect.value;
			oldSelect.value = 'bump';
			oldSelect.style.display = 'none';
			var wrapper = document.createElement('div');
			wrapper.className = 'xl-select';
			var newSelect = document.createElement('ul');
			newSelect.className = 'xl-select--options';
			newSelect.innerHTML = '<li class="xl-select--item" data-value="bump">bump order</li><li class="xl-select--item" data-value="replycount">reply count</li><li class="xl-select--item" data-value="filecount">file count</li>';
			wrapper.onclick = function() {
				var newItem = newSelect.firstChild.cloneNode(true);
				newSelect.appendChild(newItem);
				oldSelect.value = newSelect.children[1].getAttribute('data-value');
    		oldSelect.dispatchEvent(new CustomEvent('change'));
    		//console.log(oldSelect.value);
				newSelect.removeChild(newSelect.firstChild);
			};
			wrapper.appendChild(newSelect);
			document.querySelector('.navLinks').appendChild(wrapper);
		})();*/
        



/*
        var qpParent;
        qpParent = document.getElementById('hoverUI');
        new MutationObserver(mutationObjectCallback).observe(qpParent, {
            childList: true
        });
        function mutationObjectCallback(mutationRecordsList) {
            mutationRecordsList.forEach(function(mutationRecord) {
                if (mutationRecord.addedNodes[0].id === "qp") {
                    var winHeight = window.innerHeight;
                    var qpHeight = mutationRecord.addedNodes[0].offsetHeight;
                    var scale;
                    if (qpHeight > winHeight) {
                        scale = winHeight / qpHeight;
                        mutationRecord.addedNodes[0].style.transform = 'scale(' + scale + ')';
                        mutationRecord.addedNodes[0].style.top = '36px';
                    }
                }
            });
        }
*/
        /*
    var observer = new MutationObserver(function(mutations) {
	// For the sake of...observation...let's output the mutation to console to see how this all works
	mutations.forEach(function(mutation) {
		console.log(mutation.type, mutation.attributeName);

	});    
});

// Notify me of everything!
var observerConfig = {
	attributes: true,
	childList: true,
	characterData: true,
};

// Node, config
// In this case we'll listen to all changes to body and child nodes
var targetNode = document.documentElement;
observer.observe(targetNode, observerConfig);*/
        //}, false);
    }
};


/*
(function(){
  'use strict';
  console.time('Removing style elements...');
  document.addEventListener('DOMContentLoaded', function() {
    var styles;
    styles = document.head.querySelectorAll('style');
    for (let style of styles) {
      style.remove();
    }
    var d = document;
var id = function (id) {
    return d.getElementById(id);
  };
selectSwitch = (function () {
			var oldSelect = id('index-sort');
			var selectValue = oldSelect.value;
			oldSelect.value = 'bump';
			oldSelect.style.display = 'none';
			var wrapper = d.createElement('div');
			wrapper.className = 'xl-select';
			var newSelect = d.createElement('ul');
			newSelect.className = 'xl-select--options';
			newSelect.innerHTML = '<li class="xl-select--item" data-value="bump">bump order</li><li class="xl-select--item" data-value="replycount">reply count</li><li class="xl-select--item" data-value="filecount">file count</li>';
			wrapper.onclick = function() {
				var newItem = newSelect.firstChild.cloneNode(true);
				newSelect.appendChild(newItem);
				oldSelect.value = newSelect.children[1].getAttribute('data-value');
    		oldSelect.dispatchEvent(new CustomEvent('change'));
    		//console.log(oldSelect.value);
				newSelect.removeChild(newSelect.firstChild);
			};
			wrapper.appendChild(newSelect);
			d.querySelector('.navLinks').appendChild(wrapper);
		}) ();
  }, false);
  console.timeEnd('Removing style elements...');

     TODO:
      - determine if in a thread, or on the index
      - scroll progress bar in header
      - fancy labels for qr
      - determine when no longer at the top of the page
      - determine when the banner has passed view
      - create custom sorting select menu

})();
*/
/*
document.addEventListener('IndexBuild', function () {
        var opies = document.querySelectorAll('.op');
        console.log(opies);
        for (var k = 0, l = opies.length; k < l; k++) {
            console.log(opies[k]);
        }
});*/
(function(){
	var d = document;
	d.addEventListener('4chanXInitFinished', console.log('x is finished'), false);
	d.addEventListener('4chanMainInit', console.log('main init'), false);
	d.addEventListener('4chanParsingDone', console.log('parsing done'), false);
	d.addEventListener('IndexBuild', console.log('index built'), false);
	d.addEventListener('IndexRefresh', console.log('index refreshed'), false);
})();
/*
        document.addEventListener('DOMContentLoaded', function() {
        var opies = document.querySelectorAll('.op');
        console.log(opies);
        for (var k = 0, l = opies.length; k < l; k++) {
            console.log(opies[k]);
            if (opies[k].contains(querySelector('.stickyIcon'))) {
                opies[k].querySelector('.stickyIcon').insertAdjacentHTML('afterend', '<i class="material icons">place</i>');
            };
            if (opies[k].querySelector('.closedIcon') === 1) {
                opies[k].querySelector('.closedIcon').insertAdjacentHTML('afterend', '<i class="material icons">lock</i>');
            };
        }
        });
        */
