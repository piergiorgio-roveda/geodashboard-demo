<?php

// WATCHDOG

function wpconfig_setting_requirements(){

  $return=array();
  $error=0;

  // ---
  $constants=array(
    'WP_DEBUG',
    'WP_DEBUG_LOG',
    'WP_DEBUG_DISPLAY',
    'ABSPATH',
    'WP_ENVIRONMENT',
    'WP_SITEURL',
    'WP_HOME',
    'WP_MEMORY_LIMIT',
    'WP_MAX_MEMORY_LIMIT',
    'WP_CACHE',
    'SAVEQUERIES',
    'DISABLE_WP_CRON',
    'WP_CRON_LOCK_TIMEOUT',
    'DISALLOW_FILE_EDIT',
    'DISALLOW_FILE_MODS',
    'WP_HTTP_BLOCK_EXTERNAL',
    'WP_ACCESSIBLE_HOSTS',
    'AUTOMATIC_UPDATER_DISABLED',
    'WP_AUTO_UPDATE_CORE',
    'HOME_PROJECT',
    'LOG_IN_WEB_CONSOLE',
    'REMOVE_ADMIN_BAR',
  );
  $hidden_constants=array(
    'GEOAUTH',
    'GEOAUTH2',
    'GOOGLE_API_SEARCH_AND_MAP',
  );
  $file_constants=array(
    'FAVICON',
    'LABEL_MAIN_LOGO',
    'LOGO_OWNER',
    'LOGO_LOGIN',
  );
  // ---

  //wpconfig_setting_define();

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
      $hidden_constat = str_repeat('*', strlen(constant($constant)) - 4) . substr(constant($constant), -4);
      $return['my_hidden_costant'][$constant]['value']=$hidden_constat;
    }
  }
  foreach ($file_constants as $key => $constant) {
    if ( ! defined( $constant ) ) {
      $error++;
      $return['my_file_costant'][$constant]['value']='error';
    }
    else{
      $return['my_file_costant'][$constant]['value']=constant($constant);
      $file=str_replace(HOME_PROJECT, '/var/www/html/', constant($constant));
      $return['my_file_costant'][$constant]['value_for_exist']=$file;
      if(file_exists($file)) {
        $return['my_file_costant'][$constant]['exist']=true;
      }
      else{
        $error++;
        $return['my_file_costant'][$constant]['exist']=false;
      }
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

