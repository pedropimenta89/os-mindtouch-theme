"use strict";

// SEARCH
document.querySelector('.main-menu__container__search_open').addEventListener('click', function() {
  var window_size = window.matchMedia('(min-width: 992px)');
  if(window_size.matches == true){
    clearOpenSubmenu('main-menu__overlay');
    openSearch();
  } else {
    mobileSearch();
  }
}, false);

document.querySelector('.main-menu__container__search_cancel').addEventListener('click', function() {
  closeSearch();
}, false);

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

// ////////////////////////////////////
// OVERLAY
document.querySelector('.main-menu__overlay').addEventListener('click', function() {
  clearOpenSubmenu('main-menu__overlay');
}); // ////////////////////////////////////

// MENU BURGUER
document.querySelector('.main-menu__container .menu-burger').addEventListener('click', function() {
      // TO CLOSE
      var mainMenuContainer = document.querySelector('.main-menu__container .menu-burger');
      if (mainMenuContainer.closest('.main-menu__container').classList.contains('open__main-menu')) {
        closeSearch();
        mainMenuContainer.closest('.main-menu__container').classList.remove('open__main-menu')
      //  burguerButton.html("MENU");
        mainMenuContainer.setAttribute("aria-expanded", "false");
        var elem = document.querySelector('.main-menu__container__nav-content');
        elem.css('overflow', 'hidden').animate({
          height: '0px'
        }, 200);

        if($(this).closest('.main-menu__container').find('.mobile__content__card').hasClass('show')) {
          $(this).closest('.main-menu__container').find(".mobile__content__card__header__go-back" ).trigger( "click" );
        }
     
        if ($('html').hasClass('open__main-menu__overflow-hidden')) {
          document.querySelector('html').classList.remove("open__main-menu__overflow-hidden");
        }
      } else {
        // TO OPEN                  
        closeSearch();
        const allMenuContainers = $('.main-menu__container');
        var mainMenuContainer;
        if( $(this).closest('.main-menu__container').hasClass('main-footer') ) { 
          for(var i = 0; i < allMenuContainers.length; i++) {
            if(!allMenuContainers[i].classList.contains('main-footer')){
              mainMenuContainer = $(allMenuContainers[i]);
              mainMenuContainer.addClass('main-menu__fade');
            }
          }
        }

        $(this).closest('.main-menu__container').addClass('open__main-menu');

        // burguerButton.html("CLOSE");
        
        var _elem = document.querySelector('.main-menu__container__nav-content');

        $(this).attr('aria-expanded', 'true'); // GET THE FULL HEIGHT      
        if(!$(this).closest('.main-menu__container').hasClass('main-footer') ) {
        //var elemHeight = _elem.css('height', 'calc(100% - 62px)').height();
        var elemHeight = _elem.style.height = 'calc(100% - 62px)';
        elemHeight = elemHeight.offsetHeight;

        _elem.style.height = 0;

        _elem.animate({
          height: elemHeight
        }, 250, function animateHeightAuto() {
          // AFTER THE FUNCTION CHANGE HEIGHT SO IT DOESN'T FORCE THE HEIGHT
           _elem.style.height = 'calc(100% - 62px)';
        });
        }
        

        var mobileView = window.matchMedia('(max-width: 991.98px)');

        if (mobileView.matches) {
          document.querySelector('html').classList.remove("open__main-menu__overflow-hidden");
        }
      }
}); // OPEN SUBMENUS

$(document).on('click', '.main-menu__container .main-menu__item[aria-haspopup="true"], .main-menu__container__dropdown button[aria-expanded]', function clickShowSubmenus() {
  var elem = $(this); // SAVE THE VALUES BEFORE THE CLEAN OPEN SUBMENU FUNCTION{
  var elemExpand = $(elem).attr('aria-expanded'); // CLEAN ALL OPEN SUBMENUS AND THE NEW ONE AND THEN TO THE REST OF THE NECESSARY STEPS
 
    
    $.when(clearOpenSubmenu(elem, elemExpand)).then(function expandMenu(result) {
      // THE ELEMENT CLICKED
      var elem = result[0]; // IT'S THE STATE PREVIOUS TO FUNCTION TO CLEAR 

      var elemExpand = result[1];
      var mobileView = window.matchMedia('(max-width: 992px)');

      if (mobileView.matches) {
        submenuMobileAnimation(elem, elemExpand);
      } // CHANGE ARIA EXPANDED VALUE
      
      var attrStatus = elemExpand == 'true' ? 'false' : 'true';
      $(elem).attr('aria-expanded', attrStatus);

      if (attrStatus == "false" && !$('.main-menu__item[aria-expanded="true"]').length > 0) { 
        clearOpenSubmenu('main-menu__overlay');
      } // TAB NAVIGATION


      if (!$(elem).parent().hasClass('main-menu__container__dropdown')) {
        if (attrStatus == true) {
          $(elem).parent().find('.main-menu__submenu-content a').attr('tabindex', '-1');
        } else {
          $(elem).parent().find('.main-menu__submenu-content a').attr('tabindex', '0').triggerHandler('focus');
        }
      } else {
        if (attrStatus == true) {
          $(elem).siblings('.main-menu__submenu-content').find('a').attr('tabindex', '-1');
        } else {
          $(elem).siblings('.main-menu__submenu-content').find('a').attr('tabindex', '0').triggerHandler('focus');
        }
      }
    }).then(function changeMainMenuState() {
     
      mainMenuState();
    });
});

document.querySelector('.main-menu__item[aria-haspopup="true"]').addEventListener('click', function(event) {
  event.preventDefault();
});

function submenuMobileAnimation(elem, elemExpand) {
  var elemSub; // IF UNDER 992PX DO A SLIDE DOWN ANIMATION
  elemSub = $(elem).siblings('.main-menu__submenu-content');
}

function mainMenuState() {
  // IF A SUBMENU IS OPENED PLACE A OPEN CLASS IN THE MAIN MENU CONTAINER 
  var expanded = $('.main-menu__item[aria-expanded="true"]');
  if (expanded.length > 0 && !$('.main-menu__container').hasClass('open__main-menu')) {
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

      _elem2.css('overflow', 'hidden').animate({
        height: '0px'
      }, 200);
    }
  }

  if ($('.main-menu__submenu-content').length > 0) {
    $(".main-menu__submenu-content[style]").each(function (index) {
      //$(this).stop().animate({ 'height': '0px'}, 200).delay(200).get(0).removeAttribute('style');
      $(this)[0].removeAttribute('style');
    });

    if ($('.main-menu__container__dropdown button[aria-expanded]').length > 0) {
      $('.main-menu__container__dropdown button[aria-expanded]').attr('aria-expanded', 'false').siblings('.main-menu__submenu-content')[0].removeAttribute('style');
    }

    $('.main-menu__item').attr('aria-expanded', 'false');
  }

  closeSearch();
  return [elem, elemExpand];
} // CLEAR ANY INLINE STYLING WHEN PASSING FROM DESKTOP TO MOBILE

var resetMenuOnMobile = false;
function cleanInlineMainMenu() {
  var width993 = window.matchMedia('(min-width: 993px)');
  

  if (width993.matches && $('.main-menu__container__nav-content').length > 0 && $('.main-menu__container__nav-content')[0].hasAttribute('style')) {
    $('.main-menu__container__nav-content')[0].removeAttribute('style');
    document.querySelector('.menu-burger').classList.remove("open__main-menu");
    document.querySelector('.main-menu__container').classList.remove("open__main-menu");
    resetMenuOnMobile = true;
  } else if(mobileView.matches && resetMenuOnMobile == true) {
    resetMenuOnMobile = false;
    //closeSearch();
    document.querySelector('.main-menu__container').classList.remove("open__main-menu");
   //  burguerButton.html("MENU");
    $(this).attr('aria-expanded', 'false');
    var elem = document.querySelector('.main-menu__container__nav-content');
    elem.css('overflow', 'hidden').animate({
      height: '0px'
    }, 200);
    if($('.mobile__content__card').hasClass('show')) {
      $( ".mobile__content__card__header__go-back" ).trigger( "click" );
    }

    if ($('html').hasClass('open__main-menu__overflow-hidden')) {
      $('html').removeClass('open__main-menu__overflow-hidden');
    }
  } else if($('.main-menu__container__search_input_container').length > 0) {
      if($('.main-menu__container__search_input_container')[0].hasAttribute('style')){
        $('.main-menu__container__search_input_container').removeAttr('style');
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
        $(this).click();
        event.preventDefault();
        break;

      case keys.esc:
        if ($(this).attr('aria-expanded') == 'true') {
          $(this).click();
        }

        document.querySelector('.main-menu__container__search_open').focus();
        break;
    }
  });
});
var languagesMenu = document.querySelector('.main-menu__container__dropdown button');

if (languagesMenu) {
  languagesMenu.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
      case keys.enter:
      case keys.down:
        $(this).click();
        event.preventDefault();
        break;
    }
  });
} // IF THE FOCUS IS ON THE ELEMENTS NEXT AND PREVIOUS TO THE LANGUAGES AND THE MENU LANGUAGES IS OPENED CLOSE IT.
// DIDN'T USE THE TAB BECAUSE IT WILL CLOSE WHEN NAVIGATING IN LANGUAGES SUBMENU


$('.main-menu__container__search_open, .main-menu__container__external-link').focus(function () {
  if ($('.main-menu__container__dropdown button').attr('aria-expanded') == 'true') {
    $('.main-menu__container__dropdown button').click();
  }
}); // SCROLL EFFECT 

if (typeof $("header.main-header .main-menu__container.main-menu__container__only-logo")[0] != "undefined") {
  $("header.main-header").css({
    'position': 'absolute'
  });
}

var mobileView = window.matchMedia('(max-width: 992px)');

$(function(){
    var mobileMenuItem = document.querySelectorAll('.mobile__menu__item');

    //FOR MOBILE TO MAKE SUBMENU APPEAR WHEN THE LINK IS CLICKED
    if( $('.mobile__menu__item').length > 0){
      for( var i = 0; i < mobileMenuItem.length; i++ ){
        mobileMenuItem[i].addEventListener('click', function () {
          if(mobileView.matches == true){
            this.nextElementSibling.classList.add('show');
          }
        });
      }
    }

    var backButtonSubmenu = document.querySelectorAll('.mobile__content__card__header__go-back');
    //FOR MOBILE WHEN THE USER IS IN THE SUBMENUS HE CAN GO BACK TO THE MENUS
    if( $('.mobile__content__card__header__go-back').length > 0){
      for( var i = 0; i < backButtonSubmenu.length; i++ ){
        backButtonSubmenu[i].addEventListener('click', function () {
          $(this).closest(".mobile__content__card").removeClass("show");
            $('.mobile__menu__item').each( function(){
              $(this).attr('aria-expanded', 'false');
            });
        });
      }
    }
});

// SCROLL EFFECT 

if ($('[class*="main-menu__container__transparent-"]').length == 0 && $('.main-menu__container').length > 0) {
  var previousScroll = window.pageYOffset;
  function fadeMenu() {

    var mainMenuContainer;
    const allMenuContainers = $('.main-menu__container');
    for(var i = 0; i < allMenuContainers.length; i++) {
      if(!allMenuContainers[i].classList.contains('main-footer')){
        mainMenuContainer = $(allMenuContainers[i]);
      }
    }

    if(mainMenuContainer != null) {
    const mainMenuBurger = $('.main-menu__container .menu-burger');
    const mainMenuAnimationClass = 'main-menu__fade';
    const mainMenuHeight = mainMenuContainer.height();
    const mobileView = window.matchMedia("(max-width: 991.98px)");
    const html = $('html');

    if (mobileView.matches) {
        var currentScroll = window.pageYOffset;
        //THE DIFFERENCE BETWEEN THE PREVIOUS AND CURRENT SCROLL BEING MORE THAN THE MENU HEIGHT PREVENTS A JUMP EFFECT IN MOBILE WHEN HITTING THE BOTTOM OF THE SCREEN. 
        if (Math.abs(previousScroll - currentScroll) >= mainMenuHeight && mainMenuBurger.attr('aria-expanded') == 'false') {
          if (previousScroll < currentScroll && $(document).scrollTop() > 0) {
            mainMenuContainer.addClass(mainMenuAnimationClass);
            html.addClass('main-menu__hidden');
          } else {
            if(!$('.main-footer').hasClass('open__main-menu')){
              setTimeout(function(){
                mainMenuContainer.removeClass(mainMenuAnimationClass);
                html.removeClass('main-menu__hidden');
              }, 50); 
            } else if ($('.main-footer').hasClass('open__main-menu')) {
              mainMenuContainer.addClass(mainMenuAnimationClass);
              html.addClass('main-menu__hidden');
            }
          }
          previousScroll = currentScroll;
        }
    } else {
      if( mainMenuContainer.hasClass(mainMenuAnimationClass) ){
        mainMenuContainer.removeClass(mainMenuAnimationClass);
        html.removeClass('main-menu__hidden');
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
            if($('.mobile__content__card').hasClass('show')) {
              $( ".mobile__content__card__header__go-back" ).trigger( "click" );
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
