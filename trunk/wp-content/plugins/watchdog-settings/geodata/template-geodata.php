<?php

// the following constant will help ensure all other PHP files will only work as part of this API.
if (!defined('CONST_INCLUDE_KEY')){
  define('CONST_INCLUDE_KEY', 'd4e2ad09-b1c3-4d70-9a9a-0e6149302486');
  define('GEOVAR_MASTER','geovar_master');
  //define('GEOVAR_COLLECTION_PARAMS','geovar_collection_params');
  define('GEOVAR_COLLECTION','geovar_collection');
  define('GEOVAR_TB','geovar_tb');
  define('TB_TRANSACTIONS','tb_transactions');
}

//--

//header('Content-type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 'on');
//ini_set('memory_limit', '200M');

//--



$cApp_ER = new App_ElementsRoles;
$elements_roles=$cApp_ER->get_user_access_db('page_geodata_0x1');
if($elements_roles[0]=='lock'){
  echo "User without permission.";
  exit;
}

$o=array();

//collect $_POST
foreach ($_POST as $key => $value) {
  $o['_hide']['ds'][$key]=$_POST[$key];


  if(is_array($_POST[$key])){
    $o['_hide']['ds'][$key]=$_POST[$key];
  }
  else{
    $result = json_decode(stripslashes($_POST[$key]));

    if (json_last_error() === JSON_ERROR_NONE) {
      $o['_hide']['ds'][$key]=$result;
    }
    else{
      $o['_hide']['ds'][$key]=$_POST[$key];
    }
  }

}

if (!empty($_POST["fn_group"])) {
  if($_POST["fn_group"]=='geodata'){
    $className = 'API_Handler';
    $cApiHandler = new $className();
    $returnArray = $cApiHandler->execCommand(
      'watchdog_webapp',
      $o
    );
  }
  else{
    $className = 'API_Handler_'.$_POST["fn_group"];
    $cApiHandler = new $className();
    $returnArray = $cApiHandler->execCommand(
      'watchdog_'.$_POST["fn_group"],
      $o
    );
  }
}
else {
  echo "fn_group missing.";
  exit;
}

exit;
