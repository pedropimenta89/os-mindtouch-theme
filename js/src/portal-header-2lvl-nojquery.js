"use strict";

var mobileView = window.matchMedia('(max-width: 992px)');

function getSiblings(el, filter) {
    var siblings = [];
    el = el.parentNode.firstChild;
    do { if (!filter || filter(el)) siblings.push(el); } while (el = el.nextSibling);
    return siblings;
}

// SEARCH
setTimeout(function(){
    document.querySelector('.main-menu__container__search_open').addEventListener('click', function() {
      var window_size = window.matchMedia('(min-width: 992px)');
      if(window_size.matches == true){
        clearOpenSubmenu('main-menu__overlay');
        openSearch();
      } else {
        mobileSearch();
      }
    }, false);
}, 1001);

setTimeout(function(){
    document.querySelector('.main-menu__container__search_cancel').addEventListener('click', function() {
      closeSearch();
    }, false);
}, 1001);

function closeSearch() {
  var window_size = window.matchMedia('(min-width: 992px)');

  if (window_size.matches == true) {
    document.querySelector('.main-menu__container__search_open').setAttribute("aria-expanded", "false");
    var SearchOpen = document.querySelector('.main-menu__container__search_open').parentNode.querySelector('.main-menu__container__search_input_container');
    SearchOpen.style.width = 0;
  } 
  document.querySelector('.main-menu__container__search_input_container input').value = '';
}

function openSearch() {
  var mainMenuSearchArea = document.querySelector('.main-menu__container__search');
  var mainMenuLogoArea = document.querySelector('.main-menu__container__logo');
  var mobileBreak = window.matchMedia('(max-width: 991.98px)');
  var mainMenuSearchWidth;
  var SearchOpen = document.querySelector('.main-menu__container__search_open').parentNode.querySelector('.main-menu__container__search_input_container');
  
  SearchOpen.style.width = '0px';

  if (mobileBreak.matches) {
    mainMenuSearchWidth = mainMenuSearchArea.offsetLeft + mainMenuSearchArea.offsetWidth;
  } else {
    mainMenuSearchWidth = mainMenuSearchArea.offsetLeft - mainMenuLogoArea.offsetLeft - mainMenuLogoArea.offsetWidth + mainMenuSearchArea.clientWidth - 16; /*16 is the padding in the containe os (parent of the logo area */ 
  } // GET WIDTH FROM LOGO AREA TO SEARCH AREA
  
  document.querySelector('.main-menu__container__search_open').setAttribute("aria-expanded", "true");
  SearchOpen.style.width = mainMenuSearchWidth+'px';
  document.querySelector('.main-menu__container__search__input').focus();

}

setTimeout(function(){
// ////////////////////////////////////
// OVERLAY
document.querySelector('.main-menu__overlay').addEventListener('click', function() {
  clearOpenSubmenu('main-menu__overlay');
}); // ////////////////////////////////////

// MENU BURGUER
document.querySelector('.main-menu__container .menu-burger').addEventListener('click', function() {
      // TO CLOSE
      var mainMenuContainer = this;
      if (mainMenuContainer.closest('.main-menu__container').classList.contains('open__main-menu')) {
        closeSearch();
        mainMenuContainer.setAttribute("aria-expanded", "false");
        
        var elem = document.querySelector('.main-menu__container__nav-content');
        elem.style.overflow = 'hidden';
        elem.style.height = '0px';
        
        setTimeout(function(){
            mainMenuContainer.closest('.main-menu__container').classList.remove('open__main-menu')
        }, 300);
        
        var MenuContainer = mainMenuContainer.closest('.main-menu__container');

        var MobMenu = MenuContainer.querySelectorAll('.mobile__content__card');        
        for( var i = 0; i < MobMenu.length; i++ ){
            if(MobMenu[i].classList.contains('show')) {
                MobMenu[i].querySelector(".mobile__content__card__header__go-back" ).click();
            }
        }
     
        if (document.querySelector('html').classList.contains('open__main-menu__overflow-hidden')) {
          document.querySelector('html').classList.remove("open__main-menu__overflow-hidden");
        }
      } else {
        // TO OPEN                  
        closeSearch();
        const allMenuContainers = document.querySelector('.main-menu__container');

        mainMenuContainer.closest('.main-menu__container').classList.add('open__main-menu');

        var _elem = document.querySelector('.main-menu__container__nav-content');

        mainMenuContainer.setAttribute("aria-expanded", "true"); // GET THE FULL HEIGHT
        if(!mainMenuContainer.closest('.main-menu__container').classList.contains('main-footer') ) {
          _elem.style.height = 'calc(100% - 62px)';
        }

        var mobileView = window.matchMedia('(max-width: 991.98px)');

        if (mobileView.matches) {
          document.querySelector('html').classList.remove("open__main-menu__overflow-hidden");
        }
      }
});

// OPEN SUBMENUS
var menuClickItem = document.querySelectorAll('.main-menu__container .main-menu__item[aria-haspopup="true"]');

for (let i = 0; i < menuClickItem.length; i++) {
menuClickItem[i].addEventListener('click', function() {
    var elem = menuClickItem[i]; // SAVE THE VALUES BEFORE THE CLEAN OPEN SUBMENU FUNCTION{
  var elemExpand = elem.getAttribute('aria-expanded'); // CLEAN ALL OPEN SUBMENUS AND THE NEW ONE AND THEN TO THE REST OF THE NECESSARY STEPS
    Promise.resolve(clearOpenSubmenu(elem, elemExpand)).then(function(result) {
      // THE ELEMENT CLICKED

      var elem = result[0]; // IT'S THE STATE PREVIOUS TO FUNCTION TO CLEAR 
      var elemExpand = result[1];
      
      var attrStatus = elemExpand == 'true' ? 'false' : 'true';
      elem.setAttribute('aria-expanded', attrStatus);

      if (attrStatus == "false" && !document.querySelectorAll('.main-menu__item[aria-expanded="true"]').length > 0) { 
        clearOpenSubmenu('main-menu__overlay');
      } // TAB NAVIGATION

      if (attrStatus == true) {
        elem.parentNode.querySelector('.main-menu__submenu-content a').setAttribute('tabindex', '-1');
      } else {
        var SubMeCon = elem.parentNode.querySelector('.main-menu__submenu-content a');
        SubMeCon.setAttribute('tabindex', '0');
      }
    }).then(function changeMainMenuState() {
      mainMenuState();
    });
});
}

document.querySelector('.main-menu__item[aria-haspopup="true"]').addEventListener('click', function(event) {
  event.preventDefault();
});
}, 1001);

function mainMenuState() {
  // IF A SUBMENU IS OPENED PLACE A OPEN CLASS IN THE MAIN MENU CONTAINER 
  var expanded = document.querySelectorAll('.main-menu__item[aria-expanded="true"]');
  if (!expanded) {
    expanded = 0;
  }
  if (expanded.length > 0 && !document.querySelector('.main-menu__container').classList.contains('open__main-menu')) {
    document.querySelector('.main-menu__container').classList.add("open__main-menu");
  } else if (expanded.length < 1) {
    document.querySelector('.main-menu__container').classList.remove("open__main-menu");
  }
} //  THIS FUNCTION RUNS EVERYTIME THE OVERLAY IS CLICKED AND A SUBMENU IS OPENED
// IN CASE THE OVERLAY IS CLICKED IT WILL CLOSE THE MENU
// THE RETURN IS TO PASS THE PREVIOUS VALUES TO THE THEN FUNCTION (BEFORE THE CLEANING)

function clearOpenSubmenu(elem, elemExpand) {
  var mobileView = window.matchMedia('(max-width: 991.98px)');

  if (elem == 'main-menu__overlay') {
    document.querySelector('.main-menu__container').classList.remove("open__main-menu");
    document.querySelector('html').classList.remove("open__main-menu__overflow-hidden");

    if (mobileView.matches) {
      document.querySelector('.main-menu__container .menu-burger').setAttribute("aria-expanded", "false");

      var _elem2 = document.querySelector('.main-menu__container__nav-content');
      _elem2.style.overflow = 'hidden';
      _elem2.style.height = '0px';
    }
  }

  if (document.querySelectorAll('.main-menu__submenu-content').length > 0) {
      var SubMenCont = document.querySelectorAll(".main-menu__submenu-content[style]");
      for( var i = 0; i < SubMenCont.length; i++ ){
          SubMenCont[0].removeAttribute('style');
      }

    var AllMenuItems = document.querySelectorAll('.main-menu__item');
    for(var i = 0; i < AllMenuItems.length; i++) {
        AllMenuItems[i].setAttribute("aria-expanded", "false");
    }
  }

  closeSearch();
  return [elem, elemExpand];
} // CLEAR ANY INLINE STYLING WHEN PASSING FROM DESKTOP TO MOBILE

var resetMenuOnMobile = false;
function cleanInlineMainMenu() {
  var mobileView = window.matchMedia('(max-width: 991.98px)');
  var width993 = window.matchMedia('(min-width: 993px)');
  var NavCont = document.querySelector('.main-menu__container__nav-content');
  
  if (width993.matches && NavCont.length > 0 && NavCont[0].hasAttribute('style')) {
    
    NavCont[0].removeAttribute('style');
    document.querySelector('.menu-burger').classList.remove("open__main-menu");
    document.querySelector('.main-menu__container').classList.remove("open__main-menu");
    resetMenuOnMobile = true;
  } else if(mobileView.matches && resetMenuOnMobile == true) {
    resetMenuOnMobile = false;

    document.querySelector('.main-menu__container').classList.remove("open__main-menu");
    document.querySelector('.menu-burger').setAttribute('aria-expanded', 'false'); //???
    var elem = document.querySelector('.main-menu__container__nav-content');
    
    elem.style.overflow = 'hidden';
    elem.style.height = '0px';
      
    if(document.querySelector('.mobile__content__card').classList.contains('show')) {
      document.querySelector( ".mobile__content__card__header__go-back" ).click();
    }

    if (document.querySelector('html').classList.contains('open__main-menu__overflow-hidden')) {
      document.querySelector('html').classList.remove('open__main-menu__overflow-hidden');
    }
  } else if(document.querySelectorAll('.main-menu__container__search_input_container').length > 0) {
      var SearchInp = document.querySelectorAll('.main-menu__container__search_input_container');
      if(SearchInp[0].hasAttribute('style')){
        document.querySelector('.main-menu__container__search_input_container').removeAttribute('style');
    }
  }
}

window.addEventListener('resize', cleanInlineMainMenu); // /////////////////////////
// MAIN NAV - DESKTOP KEYBOARD NAVIGATION 
// /////////////////////////

var keys = {
  enter: 13,
  down: 40,
  esc: 27
};
var appsMenuItems = document.querySelectorAll(".main_menu__list > li > a");
Array.prototype.forEach.call(appsMenuItems, function (el, i) {
  el.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
      case keys.enter:
      case keys.down:
        el.click();
        event.preventDefault();
        break;

      case keys.esc:
        if (el.getAttribute('aria-expanded') == 'true') {
          el.click();
        }

        document.querySelector('.main-menu__container__search_open').focus();
        break;
    }
  });
});

setTimeout(function(){
if (typeof document.querySelectorAll("header.main-header .main-menu__container.main-menu__container__only-logo")[0] != "undefined") {
    document.querySelector("header.main-header").style.position = 'absolute';
}
}, 1001);

setTimeout(function(){
    var mobileMenuItem = document.querySelectorAll('.mobile__menu__item');

    //FOR MOBILE TO MAKE SUBMENU APPEAR WHEN THE LINK IS CLICKED
    if(mobileMenuItem.length > 0){
      for(var i = 0; i < mobileMenuItem.length; i++){
        mobileMenuItem[i].addEventListener('click', function () {
          if(mobileView.matches == true){
            this.nextElementSibling.classList.add('show');
          }
        });
      }
    }

    var backButtonSubmenu = document.querySelectorAll('.mobile__content__card__header__go-back');
    //FOR MOBILE WHEN THE USER IS IN THE SUBMENUS HE CAN GO BACK TO THE MENUS
    if(backButtonSubmenu.length > 0){
      for(var i = 0; i < backButtonSubmenu.length; i++){
        backButtonSubmenu[i].addEventListener('click', function () {
            this.closest('.mobile__content__card').classList.remove('show');
            for( var i2 = 0; i2 < mobileMenuItem.length; i2++ ){
                mobileMenuItem[i2].setAttribute('aria-expanded', 'false');
            }
        });
      }
    }
}, 1001);

// SCROLL EFFECT 

if (document.querySelectorAll('[class*="main-menu__container__transparent-"]').length == 0 && document.querySelectorAll('.main-menu__container').length > 0) {
  var previousScroll = window.pageYOffset;
  function fadeMenu() {

    var mainMenuContainer;
    const allMenuContainers = document.querySelectorAll('.main-menu__container');
    for(var i = 0; i < allMenuContainers.length; i++) {
      if(!allMenuContainers[i].classList.contains('main-footer')){
        mainMenuContainer = allMenuContainers[i];
      }
    }

    if(mainMenuContainer != null) {
    const mainMenuBurger = document.querySelectorAll('.main-menu__container .menu-burger');
    const mainMenuAnimationClass = 'main-menu__fade';
    const mainMenuHeight = mainMenuContainer.height();
    const mobileView = window.matchMedia("(max-width: 991.98px)");
    const html = document.querySelector('html');

    if (mobileView.matches) {
        var currentScroll = window.pageYOffset;
        //THE DIFFERENCE BETWEEN THE PREVIOUS AND CURRENT SCROLL BEING MORE THAN THE MENU HEIGHT PREVENTS A JUMP EFFECT IN MOBILE WHEN HITTING THE BOTTOM OF THE SCREEN. 
        if (Math.abs(previousScroll - currentScroll) >= mainMenuHeight && mainMenuBurger.attr('aria-expanded') == 'false') {
          if (previousScroll < currentScroll && document.body.scrollTop() > 0) {
            mainMenuContainer.classList.add(mainMenuAnimationClass);
            html.classList.add('main-menu__hidden');
          } else {
            if(!document.querySelector('.main-footer').classList.contains('open__main-menu')){
              setTimeout(function(){
                mainMenuContainer.classList.remove(mainMenuAnimationClass);
                html.classList.remove('main-menu__hidden');
              }, 50); 
            } else if (document.querySelector('.main-footer').classList.contains('open__main-menu')) {
              mainMenuContainer.classList.add(mainMenuAnimationClass);
              html.classList.add('main-menu__hidden');
            }
          }
          previousScroll = currentScroll;
        }
    } else {
      if( mainMenuContainer.classList.contains(mainMenuAnimationClass) ){
        mainMenuContainer.classList.remove(mainMenuAnimationClass);
        html.classList.remove('main-menu__hidden');
      }
    } 
  }
  }
  window.addEventListener('scroll', fadeMenu);
}

//detect swipe right

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) { /*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */ 
        } else {
            /* right swipe */
            if(document.querySelector('.mobile__content__card').classList.contains('show')) {
              document.querySelector( ".mobile__content__card__header__go-back" ).click();
            }
        }                       
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

function get_cookie(name){
    return document.cookie.split(';').some(c => {
        return c.trim().startsWith(name + '=');
    });
}
function delete_cookie( name, path, domain ) {
  if( get_cookie( name ) ) {
    document.cookie = name + '=' +
      ((path) ? ';path='+path:'')+
      ((domain)?';domain='+domain:'') +
      ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
  }
}
