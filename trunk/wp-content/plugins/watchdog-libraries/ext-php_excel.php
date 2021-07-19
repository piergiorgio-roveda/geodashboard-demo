<?php
function php_excel_requirements(){

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

function php_excel_start(){

  define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');
  require_once plugin_dir_path( __FILE__ ) . 'PHPExcel-1.8/Classes/PHPExcel.php';
  
  // Create new PHPExcel object
  $objPHPExcel = new PHPExcel();
  return $objPHPExcel;

}

