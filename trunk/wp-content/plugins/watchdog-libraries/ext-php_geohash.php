<?php
function php_geohash_requirements(){

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

require_once (plugin_dir_path( __FILE__ ) . 'geohash/vendor/autoload.php');
use Sk\Geohash\Geohash;


function php_geohash_start(){
  $geohash = new Geohash();
  return $geohash;
}

