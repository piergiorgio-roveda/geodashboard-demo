<?php
function php_tcpdf_requirements(){

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

function php_tcpdf_start(){

  /**
   * Creates an example PDF TEST document using TCPDF
   * @package com.tecnick.tcpdf
   * @abstract TCPDF - Example: Default Header and Footer
   * @author Nicola Asuni
   * @since 2008-03-04
   */

  // Include the main TCPDF library (search for installation path).
  require_once(plugin_dir_path( __FILE__ ) . 'php-tcpdf/tcpdf_include.php');
  // Extend the TCPDF class to create custom Header and Footer
  class MYPDF extends TCPDF {
  
  }
  //exit;

  // create new PDF document
  $pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

  return $pdf;

}
