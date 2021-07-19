<?php
/*
Plugin Name: watchdog-settings-mvp
Plugin URI: https://www.cityplanner.biz/
Description: Watchdog plugin (MVP)
Version: 0.1
Author: PRoveda
Author URI: https://www.cityplanner.biz/
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

watchdog_settings_load_plugins(watchdog_settings_Constants::getPluginsList());

// --- ---

add_action('admin_menu', 'watchdog_settings_setup_menu');

// --- ---

class watchdog_settings_Constants {
  private static $array = array(
    //'app_autoloader',
    'watchdog-settings-define',
    'ext-wpconfig_setting',//with define inside
    'ext-install_watchdog',
    'ext-security_core',
    //'ext-postgres',
    'ext-applications',
    'ext-geoinfo',
    //'ext-admin_bar',
    'ext-geo_log_plus',
    //'ext-init_check_user',
    //'ext-admin_dashboard',
    //'ext-before_render_general',
    'ext-utility_functions',
    //'ext-geo_transaction',
    //'ext-pages_roles',
    'ext-acf_local_field_group',
    //'ext-list_tables_for_meta',
    //'ext-mypg_query',
    'ext-utility_custom_functions',
    //'ext-pages_template',   
  );
  public static function getPluginsList() {
    return self::$array;
  }
}

function watchdog_settings_load_plugins($list){
  foreach ($list as $key => $filename) {
    if( file_exists(plugin_dir_path( __FILE__ ) . $filename.'.php') ) {
      if($filename=='app_autoloader'){
        // run the class autoloader
        require_once (plugin_dir_path( __FILE__ ) . $filename.'.php');
      }
      else{
        include( plugin_dir_path( __FILE__ ) . $filename.'.php');
      }
    }
    else{
    }
  }
}

function output_json_pretty($globalid,$output,$exit='exit'){

  // SOURCE know-how
  // AUTHOR PROVEDA

  if(!empty($output['datastring'])){
    // utile solo a geo_log_plus
    $datastring = str_replace(
      array("\r\n", "\n", "\r"),
      '',
      json_encode( $output['datastring'] , JSON_PRETTY_PRINT )
  	);
  }
  else{
    if(!empty($output['ds'])){
      $datastring = str_replace(
  	    array("\r\n", "\n", "\r"),
  	    '',
  	    json_encode( $output['datastring'] , JSON_PRETTY_PRINT )
  	  );      
    }
    else{
      $datastring = 'no-datastring';
      $output['datastring']['action'] = 'no-action';
    }
  }

  //$output['log'][] = geo_log_plus($globalid,$output['datastring']['action'],'',$datastring , JSON_PRETTY_PRINT );

  echo json_encode( $output , JSON_PRETTY_PRINT );
	if($exit=='exit'){
		exit;
	}
	else{

	}

}

// --- ---

function watchdog_settings_setup_menu(){

}

// --- ---

function watchdog_settings_requirements($filename){

}

function p_watchdog_settings_init(){

}

function watchdog_settings_get_plugins_attrs($list){

}