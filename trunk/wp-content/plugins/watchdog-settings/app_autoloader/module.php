<?php

/*if ((!defined('CONST_INCLUDE_KEY')) || (CONST_INCLUDE_KEY !== 'd4e2ad09-b1c3-4d70-9a9a-0e6149302486')) {
  // If someone tries to browse directly to this PHP file, send 404 and exit. It can only included
  // as part of our API.
  header("Location: /404.html", TRUE, 404);
  echo file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/404.html');
  die;
}*/
//date_default_timezone_set(PHP_TIMEZONE);
//----------------------------------------------------------------------------------------------------------------------
// Build the class mapping array
$mapping = [

  // app classes
  'API_Handler' => WD_DIR_PATH .'app_autoloader/api_handler.php',
  'App_Response' => WD_DIR_PATH .'app_autoloader/app_response.php',
  'JWT' => WD_DIR_PATH .'app_autoloader/app_jwt.php',

  // database classes
  'Data_Access' => WD_DIR_PATH .'app_autoloader/db_classes/data_access.php',
  'App_API_Key' => WD_DIR_PATH .'app_autoloader/db_classes/app_api_key.php',
  'TCPDF' => $_SERVER['DOCUMENT_ROOT'] . '/source/php-tcpdf-main-220812/examples/tcpdf_include.php',
  // //'FlexiblePolyline' => $_SERVER['DOCUMENT_ROOT'] . '/heremaps-flexible-polyline/vendor/autoload.php',
  //'FlexiblePolyline' => $_SERVER['DOCUMENT_ROOT'] . '/source/php-heremaps-flexible-polyline-v8/vendor/FlexiblePolyline_mod_webgis5.php',

  'App_API_Geodata_fn' => WD_DIR_PATH .'app_autoloader/db_classes/app_api_geodata_fn.php',
  'App_Action_UpdateData' => WD_DIR_PATH .'app_autoloader/db_classes/action_update_data.php',
  'App_Action_GetData' => WD_DIR_PATH .'app_autoloader/db_classes/action_get_data.php',
  'App_Action_ViewData' => WD_DIR_PATH .'app_autoloader/db_classes/action_view_data.php',
  'App_Action_ModifyData' => WD_DIR_PATH .'app_autoloader/db_classes/action_modify_data.php',
  'App_Action_CreateData' => WD_DIR_PATH .'app_autoloader/db_classes/action_create_data.php',
  'App_ElementsRoles' => WD_DIR_PATH .'app_autoloader/db_classes/app_elements_roles.php'

];

foreach (WATCHDOG_MODULES as $key => $module) {

  if($module!='app_autoloader'){
    if(file_exists(WD_DIR_PATH .$module.'/api_handler_'.$module.'.php')) {
      $mapping['API_Handler_'.$module]=WD_DIR_PATH .$module.'/api_handler_'.$module.'.php';
    }

    if(file_exists(WD_DIR_PATH .$module.'/db_classes/app_'.$module.'.php')) {
      $mapping['App_'.$module]=WD_DIR_PATH .$module.'/db_classes/app_'.$module.'.php';
    }
  }

}


//----------------------------------------------------------------------------------------------------------------------
spl_autoload_register(function ($class) use ($mapping) {
  if (isset($mapping[$class])) {
    require_once $mapping[$class];
  }
}, true);
