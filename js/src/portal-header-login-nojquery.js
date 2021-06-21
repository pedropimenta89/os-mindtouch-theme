setTimeout(function(){
    /* Login Phone */
    document.querySelector('header .header-login-dropdown').addEventListener('click', function() {
        if (this.classList.contains('DropdownActive')) {
            $('header .header-login-dropdown .header-login-dropdown-menu').fadeOut('fast');
            $('header .header-login-dropdown .header-login-dropdown-menu .Icon').fadeOut('fast');
            document.querySelector('header .header-login-dropdown').classList.remove('DropdownActive' );
        } else {
            $('header .header-login-dropdown .header-login-dropdown-menu').fadeIn('fast');
            this.classList.add('DropdownActive');
            $('header .header-login-dropdown .header-login-dropdown-menu .Icon').fadeIn('fast');
        }
    });
    
    /* Login Desktop / Tablet */
    document.querySelector('header .header-login-dropdown-desktop').addEventListener('click', function() {
        $('header .header-login-dropdown-desktop .header-login-dropdown-menu').fadeIn('fast');
        this.classList.add('DropdownActive');
        $('header .header-login-dropdown-desktop .header-login-dropdown-menu .Icon').fadeIn('fast');
    });
    
    $('header .header-login-dropdown-desktop').mouseleave(function() {
        timeoutHandle = setTimeout(function() { $('header .header-login-dropdown-desktop .header-login-dropdown-menu').fadeOut('fast');
                                                $('header .header-login-dropdown-desktop .header-login-dropdown-menu .Icon').fadeOut('fast'); 
                                                document.querySelector('header .header-login-dropdown-desktop').removeClass('DropdownActive' ); }, 500);
            
    });
    $('header .header-login-dropdown-desktop').mouseover(function() {
        clearTimeout(timeoutHandle);
    });

    $('header .header-login-dropdown-desktop').hover(function(){ 
        mouse_is_inside=true; 
    }, function(){ 
        mouse_is_inside=false; 
    });

    $('body').mouseup(function(){
        if(! mouse_is_inside) {
            $('header .header-login-dropdown-desktop .header-login-dropdown-menu').fadeOut('fast');
            $('header .header-login-dropdown-desktop .header-login-dropdown-menu .Icon').fadeOut('fast');
            document.querySelector('header .header-login-dropdown-desktop').classList.remove('DropdownActive');
        }
    });
    
    var timeoutHandle =  "";
    var mouse_is_inside = false;
}, 1001);
