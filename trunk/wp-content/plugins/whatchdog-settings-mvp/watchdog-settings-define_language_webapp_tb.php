<?php
function watchdog_language_webapp_tb_default($t){

  if(!array_key_exists('mytype',$t))
    $t['mytype']='tb';

  if(!array_key_exists('lang',$t))
    $t['lang']='ALL';
  
  if(!array_key_exists('descrizione',$t))
    $t['descrizione']='';
  
  if(!array_key_exists('eliminato',$t))
    $t['eliminato']=0;
  
  if(!array_key_exists('mylocation',$t))
    $t['mylocation']='all';
  
  if(!array_key_exists('my_system',$t))
    $t['my_system']=0;
  
  if(!array_key_exists('myorder',$t))
    $t['myorder']=0;
  
  if(!array_key_exists('mygroup',$t))
    $t['mygroup']='';
  
  return $t;

}

function watchdog_language_webapp_tb($arr){

  if(WP_ENVIRONMENT=='production'){
    $suffix_forediting='';

  }
  else{
    $suffix_forediting='_forwork';
  }

  /**
   * EXAMPLE
   * 
   * tab101 table read-only
   * $arr[]=watchdog_language_webapp_tb_default(array(
   *  'codice' => 'table101',
   *  'etichetta' => 'table101_000000',
   * ));
   * 
   * //tab102 table read-and-edit
   * $arr[]=watchdog_language_webapp_tb_default(array(
   *  'codice' => 'table102',
   *  'etichetta' => 'table102_000000'.$suffix_forediting,
   * ));
   */
  //tab0
  $arr[]=watchdog_language_webapp_tb_default(array(
    'codice' => 'example_table',
    'etichetta' => 'example_table_000101',
  ));

  //tab99
  $arr[]=watchdog_language_webapp_tb_default(array(
    'codice' => 'pg_cittametropolitane',
    'etichetta' => 'pg_cittametropolitane_sample',
  ));


  return $arr;
}