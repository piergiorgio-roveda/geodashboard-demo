<?php

add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
function theme_enqueue_styles() {
  wp_enqueue_style( 'child-style', get_stylesheet_uri(), array( 'parent-style' ) );
}

add_filter('the_generator', 'wpbeginner_remove_version');
function wpbeginner_remove_version() {
  return '';
}

remove_action( 'wp_head', '_wp_render_title_tag', 1 );
add_action( 'wp_head', 'wpse_render_title_tag_with_itemprop', 1 );
function wpse_render_title_tag_with_itemprop() {

  if ( did_action( 'wp_head' ) || doing_action( 'wp_head' ) ){
    printf(
        '<title itemprop="name">%s</title>' . PHP_EOL,
         wp_title( '|', false, 'right' )
    );
  }
}

function glue_login_redirect($redirect_to,$request='',$user=null){

  //using $_REQUEST because when the login form is submitted the value is in the POST
  if(isset($_REQUEST['redirect_to'])){
      $redirect_to = $_REQUEST['redirect_to'];
  }
  return $redirect_to;
}
add_filter('login_redirect','glue_login_redirect',999);