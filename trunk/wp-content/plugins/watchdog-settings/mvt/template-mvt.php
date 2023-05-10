<?php

// Set the content type header to indicate that this is a binary MVT response
// header('Content-Type: application/vnd.mapbox-vector-tile');
header('Content-Type: application/x-protobuf');
header('Content-Disposition: inline; filename="data.mvt"');

// header("Access-Control-Allow-Origin: *");
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
//php load external xml and parse

// the following constant will help ensure all other PHP files will only work as part of this API.
if (!defined('CONST_INCLUDE_KEY')){
  define('CONST_INCLUDE_KEY', 'd4e2ad09-b1c3-4d70-9a9a-0e6149302486');
}
//--
$cApp_fn = new App_API_Geodata_fn;
$cApp_ViewData = new App_Action_ViewData;
//--
global $wp_query;
$my_query_vars = $wp_query->query_vars;
if(empty($my_query_vars['mvt_z'])){
  echo "No prams for MVT.";
  exit;
}
else{
  $mvt = array();
  
  $mvt['z'] = intval($my_query_vars['mvt_z']);
  $mvt['x'] = intval($my_query_vars['mvt_x']);
  $mvt['y'] = intval($my_query_vars['mvt_y']);

}

$o=array();

if(isset($_GET['collection'])){
  $o['_hide']['ds']['collection'] = $_GET['collection'];
  if(isset($_GET['slug'])){
    $o['_hide']['ds']['slug'] = $_GET['slug'];
  }
}
else{
  $o['_hide']['ds']['collection'] = 'mvt_test';
}

$o['_hide']['ds']['z']=$mvt['z'];
$o['_hide']['ds']['x']=$mvt['x'];
$o['_hide']['ds']['y']=$mvt['y'];

$cApp_ViewData->main_view_data($o);

