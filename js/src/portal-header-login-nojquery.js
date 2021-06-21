$(document).ready(function(){
    /* Login Phone */
    $('header .header-login-dropdown').on('click', function() {
        if ($(this).hasClass( 'DropdownActive' )) {
            $('header .header-login-dropdown .header-login-dropdown-menu').fadeOut('fast');
            $('header .header-login-dropdown .header-login-dropdown-menu .Icon').fadeOut('fast');
            $('header .header-login-dropdown').removeClass('DropdownActive' );
        } else {
            $('header .header-login-dropdown .header-login-dropdown-menu').fadeIn('fast');
            $(this).addClass( 'DropdownActive' );
            $('header .header-login-dropdown .header-login-dropdown-menu .Icon').fadeIn('fast');
        }
    });
    
    /* Login Desktop / Tablet */
    $('header .header-login-dropdown-desktop').on('click', function() {
        $('header .header-login-dropdown-desktop .header-login-dropdown-menu').fadeIn('fast');
        $(this).addClass( 'DropdownActive' );
        $('header .header-login-dropdown-desktop .header-login-dropdown-menu .Icon').fadeIn('fast');
    });
    
    $('header .header-login-dropdown-desktop').mouseleave(function() {
        timeoutHandle = setTimeout(function() { $('header .header-login-dropdown-desktop .header-login-dropdown-menu').fadeOut('fast');
                                                $('header .header-login-dropdown-desktop .header-login-dropdown-menu .Icon').fadeOut('fast'); 
                                               $('header .header-login-dropdown-desktop').removeClass('DropdownActive' ); }, 500);
            
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
            $('header .header-login-dropdown-desktop').removeClass('DropdownActive');
        }
    });
    
    var timeoutHandle =  "";
    var mouse_is_inside = false;
    
});
