document.addEventListener('DOMContentLoaded', function(){
    /* Login Phone */
    if(document.querySelector('.header-login > div').classList.contains('header-login-dropdown')) {
        var logDropMenu = document.querySelector('header .header-login-dropdown .header-login-dropdown-menu');
        logDropMenu.style.transition = 'all 200ms ease';
        logDropMenu.style.pointerEvents = 'none';
        logDropMenu.style.opacity = '0';
        document.querySelector('header .header-login-dropdown').addEventListener('click', function() {
            if (this.classList.contains('DropdownActive')) {
                this.classList.remove('DropdownActive');
                logDropMenu.style.pointerEvents = 'none';
                logDropMenu.style.opacity = '0';
            } else {
                this.classList.add('DropdownActive');
            }
        });
    }
    
    /* Login Desktop / Tablet */
    if(document.querySelector('.header-login > div').classList.contains('header-login-dropdown-desktop')) {
        var logDropDeskMenu = document.querySelectorAll('header .header-login-dropdown-desktop .header-login-dropdown-menu');
        for(var i = 0; i < logDropDeskMenu.length; i++) {
            logDropDeskMenu[i].style.transition = 'all 200ms ease';
            logDropDeskMenu[i].style.pointerEvents = 'none';
            logDropDeskMenu[i].style.opacity = '0';
        }
        var logDropDeskMenuAll = document.querySelectorAll('header .header-login-dropdown-desktop');
        for(var i = 0; i < logDropDeskMenuAll.length; i++) {
            logDropDeskMenuAll[i].addEventListener('click', function() {
                this.classList.add('DropdownActive');
                this.querySelector('.header-login-dropdown-menu').style.pointerEvents = '';
                this.querySelector('.header-login-dropdown-menu').style.opacity = '1';
            });
        }
        
        var logDropDeskMenuAll = document.querySelectorAll('header .header-login-dropdown-desktop');
        for(var i = 0; i < logDropDeskMenuAll.length; i++) {
            logDropDeskMenuAll[i].addEventListener('mouseleave', function() {
                var MenuElem = this;
                timeoutHandle = setTimeout(function() {
                    MenuElem.classList.remove('DropdownActive');
                    MenuElem.querySelector('.header-login-dropdown-menu').style.pointerEvents = 'none';
                    MenuElem.querySelector('.header-login-dropdown-menu').style.opacity = '0';
                }, 500);
            });
        }
        var logDropDeskMenuAll = document.querySelectorAll('header .header-login-dropdown-desktop');
        for(var i = 0; i < logDropDeskMenuAll.length; i++) {
            logDropDeskMenuAll[i].addEventListener('mouseover', function() {
                clearTimeout(timeoutHandle);
            });
        }

        var logDropDeskMenuAll = document.querySelectorAll('header .header-login-dropdown-desktop');
        for(var i = 0; i < logDropDeskMenuAll.length; i++) {
            logDropDeskMenuAll[i].addEventListener('mouseover', function() {
                mouse_is_inside=true; 
            }, function(){ 
                mouse_is_inside=false; 
            });
        }
        document.querySelector('body').addEventListener('mouseup', function() {
            if(! mouse_is_inside) {
                var logDropDeskMenuAll = document.querySelectorAll('header .header-login-dropdown-desktop');
                for(var i = 0; i < logDropDeskMenuAll.length; i++) {
                    logDropDeskMenuAll[i].classList.remove('DropdownActive');
                }
            }
        });
    }
    var timeoutHandle =  "";
    var mouse_is_inside = false;
});
