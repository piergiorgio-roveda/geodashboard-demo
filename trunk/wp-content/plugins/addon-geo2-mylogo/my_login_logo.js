// A $( document ).ready() block.
jQuery( document ).ready(function() {
    //log( "ready!" );
    //var language = 'en';
    document.getElementById("login-css").disabled = true;
    document.getElementById("forms-css").disabled = true;
    if(language=='en'){
      jQuery(this).attr("title", "Membership Area/Login");
    }
    else{
      jQuery(this).attr("title", "Area Riservata");
    }

    jQuery('#backtoblog').css('display','none');
    jQuery('#loginform').css('border-radius','15px');
    //var wp_originale_form = $('#loginform').html();
    jQuery('body').removeClass();
    jQuery('body').addClass("login-page sidebar-collapse");

    if(language=='en'){
      jQuery('body').prepend('<div id="login-body" language="'+language+'">');
    }
    else{
    }

    if(language=='en'){
      jQuery('#login-body').append('\
        <nav class="navbar navbar-transparent navbar-color-on-scroll fixed-top navbar-expand-lg" color-on-scroll="100" id="sectionsNav">\
          <div class="container">\
            <div class="navbar-translate">\
              <a class="navbar-brand" href="'+HOME_PROJECT+'">\
                '+CMS_NAME+'\
              </a>\
            </div>\
            <div class="collapse navbar-collapse">\
            </div>\
          </div>\
        </nav>\
      ');
    }
    else{ // IT
    }

    if(language=='en'){
      jQuery('#login-body').append('<div class="page-header header-filter">'
        +'<div class="container ct1"></div>'
        +'<footer class="footer"></footer>');
      jQuery('.page-header').css('background-image','url(\''+DFL_COVER+'\')');
      jQuery('.page-header').css('background-size','cover');
      jQuery('.page-header').css('background-position','top center');

      var html_ct1 ='<div class="row">'
+'        <div class="col-lg-4 col-md-6 ml-auto mr-auto ct-login">'
+'        </div>'
+'      </div>';
      jQuery('.ct1').html(html_ct1);
      jQuery( jQuery( "#login") ).appendTo( jQuery( ".ct-login" ) );

      jQuery('#login > h1').remove();
      jQuery('#login').addClass('card card-login');
      jQuery('#login').css('background','#ffffffc2');
      jQuery('#login > form').prepend(''
+'      <div class="card-header card-header-primary text-center" style="background:linear-gradient(60deg, #fff, #fff);box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.2), 0 13px 24px -11px rgba(185, 185, 185, 0.6);">'
+'        <h4 class="card-title"><img src="'+DFL_LABEL_MAIN_LOGO+'" style="width:200px;"></h4>'
+'      </div>'
+'      <div class="card-body">'
+'        <span class="bmd-form-group">'
+'          <div class="input-group input-log">'
+'            <div class="input-group-prepend">'
+'              <span class="input-group-text">'
+'                <i class="fa fa-user" aria-hidden="true"></i>'
+'              </span>'
+'            </div>'
+'          </div>'
+'        </span>'
+'        <span class="bmd-form-group">'
+'          <div class="input-group input-pwd">'
+'            <div class="input-group-prepend">'
+'              <span class="input-group-text">'
+'                <i class="fa fa-lock" aria-hidden="true"></i>'
+'              </span>'
+'            </div>'
+'          </div>'
+'        </span>'
+'      </div>'
+'      <div class="footer text-center footer-login">'
+'      </div>');

      jQuery( jQuery( "input[name*=\'log\']") ).appendTo( jQuery( ".input-log" ) );
      jQuery( jQuery( "input[name*=\'pwd\']") ).appendTo( jQuery( ".input-pwd" ) );
      jQuery('input[name*=\'log\']').addClass('form-control');
      jQuery('input[name*=\'pwd\']').addClass('form-control');
      jQuery('.form-control').removeClass('input');

      jQuery('input[name*=\'log\']').attr('placeholder','username');
      jQuery('input[name*=\'pwd\']').attr('placeholder','password');

      jQuery('label[for*=\'user_login\']').remove();
      jQuery('label[for*=\'user_pass\']').remove();
      jQuery('.forgetmenot').remove();
      jQuery('#nav').remove();
      jQuery( jQuery( "input[name*=\'wp-submit\']") ).appendTo( jQuery( ".card-body" ) );
      jQuery( "input[name*=\'wp-submit\']").removeClass();
      jQuery('input[name*=\'wp-submit\']').addClass('btn btn-primary btn-link btn-wd btn-lg');
      jQuery('.wp-hide-pw').remove();
      jQuery('.privacy-policy-page-link').remove();
    }
    else{ // IT
    }

    jQuery('#login > h1').html('Area reserved');

    jQuery('#login > h1').addClass('catItemTitle');


}); //document ready
