<?php

//unserialize define
//https://stackoverflow.com/questions/29012477/is-it-possible-to-define-an-array-in-wp-config-php
//$myhost_array = json_decode(MY_HOST_ARRAY);

$google_api_search_and_map_array = json_decode(GOOGLE_API_SEARCH_AND_MAP_ARRAY);


define('GEOLIB_VER','0.0.1');
define('DEFAULT_LANG','ITA');

define('WATCHDOG_VER',GEOLIB_VER);

define('WD_GROUPNAME','WatchDog');
define('WD_DISPLAYNAME','WatchDog settings');

define('WD_SLUG','watchdog_settings');

define('MY_HOST',$myhost_array[0]);
define('POSTGRES_PASSWORD',$pg_dbpassword_array[0]);
define('POSTGRES_HOST',$pg_dbhost_array[0]); 
define('GOOGLE_API_SEARCH_AND_MAP',$google_api_search_and_map_array[0]);//DEV by HTTP - ALL  
define('GOOGLE_API_SEARCH_AND_MAP_IP',$google_api_search_and_map_ip_array[0]);//DEV by IP - ALL   
define('GA_TRACKING_ID',$ga_tracking_id_array[0]);
define('WD_KEY','****');
define('WD_TOKEN','****.****.****');
define('WD_API','http://watchdogpgapi/');
define('GEO_API','https://api/geodata-city/');

define('ERP_CODICELIC',$erp_codicelic_array[0]);
$env_slug=WATCHDOG_NAME.'dev';
define('LOG_IN_WEB_CONSOLE', '1' ); //log-in-web-console 
define('G_SHORT',WATCHDOG_SLUG.'-D');

define('GEOSERVER_PREFIX','watchdog');
define('GEOSERVER_SUFFIX','_dev');


define('MAIN_FOLDER',$env_slug);
define('POSTGRES_DBNAME',$env_slug);




// https://wordpress.org/support/article/editing-wp-config-php/
define('WP_ENVIRONMENT_ALLOWED','production|staging|development');

// WATCHDOG - Configure Error Logging
@ini_set( 'display_errors', 'On' );
define('WP_DEBUG', true); //true );
define('WP_DEBUG_LOG', false); //true ); //default false
// Disable display of errors and warnings
define( 'WP_DEBUG_DISPLAY', true); //true );


define('WP_MEMORY_LIMIT', '96M' ); //default 40M
define('WP_MAX_MEMORY_LIMIT', '256M' ); //default 256M
//define('WP_CACHE', false ); //default false

// WATCHDOG - Save queries for analysis
define('SAVEQUERIES', true );
define('DISABLE_WP_CRON', false );
//define('WP_CRON_LOCK_TIMEOUT', 60 ); //default 60
define('DISALLOW_FILE_EDIT', true );
define( 'DISALLOW_FILE_MODS', false );//false per vedere i plugin da aggiornare

define('WP_HTTP_BLOCK_EXTERNAL', true );
define('WP_ACCESSIBLE_HOSTS', 'api.wordpress.org,*.github.com' );

define('AUTOMATIC_UPDATER_DISABLED', true );
// WATCHDOG - Disable all core updates:
define('WP_AUTO_UPDATE_CORE', false );


define('WP_SITEURL','https://'.$_SERVER['HTTP_HOST']); //.'/'.MAIN_FOLDER);
define('WP_HOME','https://'.$_SERVER['HTTP_HOST']); //.'/'.MAIN_FOLDER);

define('HOME_PROJECT', 'https://' . $_SERVER['HTTP_HOST'] . '/' ); //home-project

define('DFL_FAVICON', WP_SITEURL . '/source/img/business_2021/favicon.ico' );
define('DFL_LABEL_MAIN_LOGO', WP_SITEURL . '/source/img/business_2021/logo21-cp.png' ); //label-main-logo
define('DFL_LOGO_OWNER', WP_SITEURL . '/source/img/business_2021/client2_logo.png' ); //logo-owner
define('DFL_LOGO_LOGIN', WP_SITEURL . '/source/img/business_2021/client1_logo.png' ); //logo-login

define('REMOVE_ADMIN_BAR', '1' ); //remove-amdin-bar //1, visibile, sì|0, non visibile, no

define('GEO2_SHOW_MAP_SIDEBAR', '1' );

define('GDRIVESHAREFOLDER','https://drive.google.com/drive/folders/1jGALCt82r-Y-QkkBsoNkDTeBIWzrSstn?usp=sharing');
define('YOTUBE_LINK','https://www.youtube.com/channel/UCEkiQYFsotUmbPTufps3TdA');


// --- ---

function user_token($user_login){

  switch ($user_login) {
    case 'cliente1':
      $r='****';
      //define('USRAUTH', '****' );
      break;
  }
  //define('USRAUTH', $r );
  return $r;

}

function watchdog_settings_define_requirements(){

  $return=array();
  $error=0;

  // ---
  $constants=array(
    'WP_ENVIRONMENT',
    'GEOLIB_VER',
    'WD_GROUPNAME',
    'WD_DISPLAYNAME',
    'WD_SLUG',
    'ERP_CLIENT',
    'ERP_NUMEROOFERTA',
    'ERP_POSTGRES_HOST',
    'ERP_CODICELIC',
    'POSTGRES_HOST',
    'LOG_IN_WEB_CONSOLE',
    'G_SHORT',
    'MAIN_FOLDER',
    'POSTGRES_DBNAME',
  );
  $hidden_constants=array(
    'GOOGLE_API_SEARCH_AND_MAP',
    'GOOGLE_API_SEARCH_AND_MAP_IP',
    'GA_TRACKING_ID',
    'POSTGRES_PASSWORD',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'GEOAUTH',
    'GEOAUTH2',
  );
  // ---

  foreach ($constants as $key => $constant) {
    if ( ! defined( $constant ) ) {
      $error++;
      $return['my_costant'][$constant]['value']='error';
    }
    else{
      $return['my_costant'][$constant]['value']=constant($constant);
    }
  }

  foreach ($hidden_constants as $key => $constant) {
    if ( ! defined( $constant ) ) {
      $error++;
      $return['my_hidden_costant'][$constant]['value']='error';
    }
    else{
      //How do you replace all characters except last 4 with asterisks in php
        //https://stackoverflow.com/questions/24278605/how-do-you-replace-all-characters-except-last-4-with-asterisks-in-php/24278672
      $hidden_constat = str_repeat('*', strlen(constant($constant)) - 1) . substr(constant($constant), -1);
      $return['my_hidden_costant'][$constant]['value']=$hidden_constat;
    }
  }

  // ---
  if($error==0){
    $return['status']='ok';
  }
  else{
    $return['status']='ko';
  }
  $return['error']=$error;
  return $return;
}

include( plugin_dir_path( __FILE__ ) . 'watchdog-settings-define_pages_webapp.php');
include( plugin_dir_path( __FILE__ ) . 'watchdog-settings-define_language_webapp.php');
include( plugin_dir_path( __FILE__ ) . 'watchdog-settings-define_language_webapp_plus.php');
include( plugin_dir_path( __FILE__ ) . 'watchdog-settings-define_language_webapp_tb.php');
include( plugin_dir_path( __FILE__ ) . 'watchdog-settings-define_language_webapp_lyr.php');
include( plugin_dir_path( __FILE__ ) . 'watchdog-settings-define_colonne_webapp.php');

//custom
include( plugin_dir_path( __FILE__ ) . 'watchdog-settings-define_character_webapp.php');
include( plugin_dir_path( __FILE__ ) . 'watchdog-settings-define_character_webapp_plus.php');

include( plugin_dir_path( __FILE__ ) . 'watchdog-settings-define_default_contents.php');

include( plugin_dir_path( __FILE__ ) . 'watchdog-settings-define_statistic.php');