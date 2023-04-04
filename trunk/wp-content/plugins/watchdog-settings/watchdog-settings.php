<?php
/*
Plugin Name: watchdog-settings
Plugin URI: localhost/geodashboard/
Description: Custom plugin
Version: 0.1
Author: PRoveda
Author URI: localhost/geodashboard/
License: GPL
*/

/*
Useful link
 * Advanced WordPress wp-config.php Tweaks
    https://www.askapache.com/wordpress/advanced-wp-config-php-tweaks/
 * WordPress constants overview
    https://wpengineer.com/2382/wordpress-constants-overview/
*/

define('WD_DIR_PATH',plugin_dir_path( __FILE__ ));

// --- ---

create_default_posts();

function create_default_posts(){

  foreach (WATCHDOG_MODULES_WITH_PAGE as $key => $slug) {
    $post_object = get_page_by_path( $slug, OBJECT, 'page' );
    if ( !$post_object ){
      create_deafult_page($slug);
    }
  }
  //--
  $args = array(
    'post_type' => 'page',
    'post_status' => 'publish'
  ); 
  $posts = get_pages($args); // get all pages based on supplied args
  foreach ($posts as $key => $post_obj) {
    # code...post_name
    $post_name = $post_obj->post_name;
    if(array_intersect(WATCHDOG_MODULES_WITH_PAGE,array($post_name))){

    }
    else{
      wp_delete_post( $post_obj->ID, true);
    }
  }
  //--
  /* foreach (WATCHDOG_MODULES_WITH_PAGE as $key => $slug) {
    $post_object = get_page_by_path( $slug, OBJECT, 'page' );
    if ( !$post_object ){

    }
    else{
      echo $slug . ' is a page module.';
    }
  } */
  //--
}

function create_deafult_page($slug){

  $new_post = array(
    'post_title' => $slug,
    'post_content' => '',
    'post_status' => 'publish',
    'post_date' => date('Y-m-d H:i:s'),
    'post_author' => 1,
    'post_type' => 'page'
  );

  $post_id = wp_insert_post($new_post, true );

  return $post_id;

}

watchdog_settings_load_plugins(watchdog_settings_Constants::getPluginsList());

// --- ---

//add_action('admin_menu', 'watchdog_settings_setup_menu');

// --- ---

class watchdog_settings_Constants {
  private static $array = WATCHDOG_MODULES;
  public static function getPluginsList() {
    return self::$array;
  }
}


function watchdog_settings_load_plugins($list){
  foreach ($list as $key => $path) {
    if( file_exists(plugin_dir_path( __FILE__ ) . $path.'/module.php') ) {
      if($path=='app_autoloader'||$path=='php_suite_loader'){
        // run the class autoloader
        require_once(plugin_dir_path( __FILE__ ) . $path.'/module.php');
      }
      else{
        include( plugin_dir_path( __FILE__ ) . $path.'/module.php');
      }
    }
    else{
    }
  }
}


