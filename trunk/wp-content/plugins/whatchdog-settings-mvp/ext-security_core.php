<?php
function security_core_requirements(){

  $return=array();
  $error=0;

  $return['add_filter'][]='rest_authentication_errors';
  $return['add_action'][]='rest_api_init';
  $return['add_action'][]='plugin_loaded';

  $my_costant='WP_HOME';
  if ( ! defined( $my_costant ) ) {
    $error++;
    $return['my_costant'][$my_costant]['value']='error';
  }
  else{
    $return['my_costant'][$my_costant]['value']=WP_HOME;
    $return['test_protection'][]=WP_HOME."/wp-json/";
    $return['test_protection'][]=WP_HOME."/?rest_route=/wp/v2/users/1";
    $return['test_protection'][]=WP_HOME."/wp-json/wp/v2/posts";
  }

  $pizza  = $_SERVER['REQUEST_URI'];
  $pieces = explode('/',$pizza);
  if($pieces[1]=='beta'){
    $WP_ROOT = "/".$pieces[1]."/".$pieces[2]."";
  }
  else{
    $WP_ROOT = "/".$pieces[1]."";
  }

  if($error==0){
    $return['status']='ok';
  }
  else{
    $return['status']='ko';
  }
  $return['error']=$error;
  return $return;
}

function human_filesize($bytes, $decimals = 2) {
  $sz = 'BKMGTP';
  $factor = floor((strlen($bytes) - 1) / 3);
  return sprintf("%.{$decimals}f", $bytes / pow(1024, $factor)) . @$sz[$factor];
}

/*
add_action( 'plugins_loaded', function () {
  //echo "ciao";
  //exit;
  remove_filter( 'init', '_add_extra_api_post_type_arguments' );
});

add_action( 'plugins_loaded', function () {
  //echo "ciao";
  //exit;
  remove_filter( 'rest_api_init', 'create_initial_rest_routes' );
});
*/
add_filter( 'rest_authentication_errors', function( $result ) {
    if ( ! empty( $result ) ) {
        return 'tmp';//$result;
    }
    if ( ! is_user_logged_in() ) {
        return new WP_Error( 'rest_not_logged_in', 'You are not currently logged in.', array( 'status' => 401 ) );
    }
    return 'tmp';//$result;
});

add_action( 'rest_api_init', function () {
  /*
  register_rest_route( 'myplugin/v1', '/author/(?P<id>\d+)', array(
    'methods' => 'GET',
    'callback' => 'my_awesome_func',
  ) );
  */
  //echo "
  //Block1 >>
  //";
  //exit;
});
//https://nacin.com/2010/04/23/5-ways-to-debug-wordpress/
/*
add_action( 'all', function(){
	echo"<code>";
	print_r(current_filter());
	echo"</code>";
	echo"<br>";
	exit;
});
*/
// ACTION REFERENCE
// https://codex.wordpress.org/Plugin_API/Action_Reference

//https://nacin.com/2010/04/23/5-ways-to-debug-wordpress/
//add_action( 'all', create_function( '', 'var_dump( current_filter());' ) );
add_action( 'plugin_loaded', function(){
  /*echo "log: First
  ";
  exit;
  */
  //print_r($_SERVER);

  if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
      $ip = $_SERVER['HTTP_CLIENT_IP'];
  } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
      $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
  } else {
      $ip = $_SERVER['REMOTE_ADDR'];
  }

  if(!empty($_SERVER['HTTP_REFERER'])){
  	$referer = $_SERVER['HTTP_REFERER'];
  }
  else{
  	$referer = 'no-referer';
  }
  $current_url ='//' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

  $string="\r\n";
  $string.="filter(plugin_loaded)|".$ip."|".$referer."|".$current_url;

  //echo $string."
  //";

  $pizza  = $_SERVER['REQUEST_URI'];
  $pieces = explode('/',$pizza);
  if($pieces[1]=='beta'){
    $WP_ROOT = "/".$pieces[1]."/".$pieces[2]."";
  }
  else{
    $WP_ROOT = "/".$pieces[1]."";
  }
  //$file = $_SERVER['DOCUMENT_ROOT'] . $WP_ROOT . '/log/plugin_loaded.log';
  //echo $file."
  //";

  //$open = fopen( $file, "a" );
  //$write = fputs( $open, $string );
  //fclose( $open );
  //exit;
});

/*
add_action( 'shutdown', function(){
  print_r($GLOBALS['wp_actions']);
  exit;
});
*/
