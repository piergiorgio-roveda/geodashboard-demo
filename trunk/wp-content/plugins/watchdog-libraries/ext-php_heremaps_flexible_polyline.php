<?php
function php_heremaps_flexible_polyline_requirements(){

  $return=array();
  $error=0;

  if($error==0){
    $return['status']='ok';
  }
  else{
    $return['status']='ko';
  }
  $return['error']=$error;
  return $return;
}


require_once (plugin_dir_path( __FILE__ ) . 'heremaps-flexible-polyline/vendor/autoload.php');
use Heremaps\FlexiblePolyline\FlexiblePolyline;

function php_heremaps_flexible_polyline_start(){
  $FlexiblePolyline = new FlexiblePolyline();
  return $FlexiblePolyline;
}

