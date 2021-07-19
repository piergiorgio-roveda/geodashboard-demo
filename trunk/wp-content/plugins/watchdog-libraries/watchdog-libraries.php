<?php
/*
Plugin Name: watchdog-libraries
Plugin URI: https://watchdog.cloud/
Description: Libraries plugin for GEO-System
Version: 0.1
Author: PRoveda
Author URI: https://watchdog.cloud/proveda
License: GPL
*/

watchdog_libraries_load_plugins(watchdog_libraries_Constants::getPluginsList());

// --- ---

class watchdog_libraries_Constants {
  private static $array = array(
    'ext-php_excel',
    'ext-php_tcpdf',
    'ext-php_heremaps_flexible_polyline',
    'ext-php_geohash',
  );
  public static function getPluginsList() {
    return self::$array;
  }
}

function watchdog_libraries_load_plugins($list){
  foreach ($list as $key => $filename) {
    if( file_exists(plugin_dir_path( __FILE__ ) . $filename.'.php') ) {
      if($filename=='ext-php_heremaps_flexible_polyline'){
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
