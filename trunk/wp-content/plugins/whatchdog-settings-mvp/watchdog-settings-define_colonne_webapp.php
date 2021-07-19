<?php
function watchdog_colonne_webapp_default($tb,$t){

  $t['mylayer']=$tb;

  if(!array_key_exists('unita_misura',$t))
    $t['unita_misura']='';

  if(!array_key_exists('formato',$t))
    $t['formato']='text';
  
  if(!array_key_exists('variable',$t))
    $t['variable']=$t['id'];
  
  if(!array_key_exists('etichetta_applicazione',$t))
    $t['etichetta_applicazione']=ucfirst(str_replace("_", " ", $t['id']));

  if(!array_key_exists('descrizione',$t))
    $t['descrizione']='';

  if(!array_key_exists('cat',$t))
    $t['cat']='';
  
  if(!array_key_exists('report',$t))
    $t['report']='';
  
  if(!array_key_exists('eliminato',$t))
    $t['eliminato']=0;

  if(!array_key_exists('hidden',$t))
    $t['hidden']=0;

  if(!array_key_exists('required',$t))
    $t['required']=0;
  
  if(!array_key_exists('input_typ',$t))
    $t['input_typ']='text';

  return $t;

}

function watchdog_colonne_webapp($returnTb='none'){
  
  /*
  REQUIRED
  'id' => 'nome', --required
  'mylayer' => 'pg_cittametropolitane', --required
  
  DEFAULT
  //'variable' => 'nome', 
  //'etichetta_applicazione' => 'nome',
  //'descrizione' => 'Nome Città',
  //'cat' => 'z',
  //'myorder' => 0,
  //'report' => '',
  //'eliminato' => '0',
  //'hidden' => 0,
  //'input_typ' => 'auto',
  //'required' => 0,
  
  TRASH
  //'idn' => '1', --trash
  */

  $arr=array();
  
  //$tb='pg_cittametropolitane';
  //$arr[]=watchdog_colonne_webapp_default($tb,array(
  //  'mylayer' => 'pg_cittametropolitane',//*
  //  'id' => 'nome',
  //  'etichetta_applicazione' => 'Nome Città',
  //));

  //---
  $tb='pg_cittametropolitane';
  $arr[]=watchdog_colonne_webapp_default($tb,array(
    'id' => 'objectid',
    'hidden'=>1,
  ));


  if($returnTb=='none'){
    return $arr;
  }
  else{
    $arrTb=array();
    foreach ( $arr as $obj ) :
      if($obj['mylayer']==$returnTb){
        $arrTb[]=$obj;
      }
    endforeach;
    return $arrTb;
  }
  
}