<?php
function watchdog_language_webapp_lyr_default($t){

  if(!array_key_exists('mytype',$t))
    $t['mytype']='lyr';

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

  if(!array_key_exists('etichetta',$t)){
    if($t['codice']=='base_color'){
      $t['etichetta']='#ccc';
    }
    elseif($t['codice']=='feature_zoom'){
      $t['etichetta']='6';
    }
    else{
      $t['etichetta']='';
    }
  }

  
  return $t;

}


function watchdog_language_webapp_lyr($arr){

  //---
  $mygroup='lyr';

  $slugs=array();

  /*
  $d=array(
    'base_color',
    'feature_zoom',
    'feature_zoom_max',
    'fillopacity',
    'labelsingle',
    'legendicon',
    'maincolor',
    'maincolor_hide',
  );
  foreach ($d as $key => $value) {
    $arr[]=watchdog_language_webapp_lyr_default(array(
      'codice' => $value,
      'mygroup' => $mygroup,
    ));
  }
  */
  //also this is slug!

  //deepmap
  $slug='deepmap';
  $lyr=$slug;

  $arr[]=watchdog_language_webapp_lyr_default(array(
    'codice' => 'label',
    'etichetta' => 'deepmap',
    'lyr' => $lyr,'mygroup' => $mygroup,'slug' => $slug,
    'lang' => DEFAULT_LANG,
  ));

  //lyr0
    $slug='lyr0';//$slugs[0];
    $slugs[]=$slug;//add to array
    $lyr=$slug;//can be different!

    $arr[]=watchdog_language_webapp_lyr_default(array(
      'codice' => 'label',
      'etichetta' => 'Example layer',
      'lyr' => $lyr,'mygroup' => $mygroup,'slug' => $slug,
      'lang' => DEFAULT_LANG,
    ));
    //
    $arr[]=watchdog_language_webapp_lyr_default(array(
      'codice' => 'icon',
      'etichetta' => 'noun_person_1994728_Blue.png',
      'lyr' => $lyr,'mygroup' => $mygroup,'slug' => $slug,
    ));  

    $arr=add_all_other_lyr_fields($arr,$slug);
  //---

  //lyr1
    $slug='lyr1';//$slugs[0];
    $slugs[]=$slug;//add to array
    $lyr=$slug;//can be different!

    $arr[]=watchdog_language_webapp_lyr_default(array(
      'codice' => 'label',
      'etichetta' => 'Voyager',
      'lyr' => $lyr,'mygroup' => $mygroup,'slug' => $slug,
      'lang' => DEFAULT_LANG,
    ));
    //
    $arr[]=watchdog_language_webapp_lyr_default(array(
      'codice' => 'tile_url',
      'etichetta' => 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png',
      'lyr' => $lyr,'mygroup' => $mygroup,'slug' => $slug,
    ));  
    $arr[]=watchdog_language_webapp_lyr_default(array(
      'codice' => 'lyr_update',
      'etichetta' => 'fix',
      'lyr' => $lyr,'mygroup' => $mygroup,'slug' => $slug,
    ));
    $arr[]=watchdog_language_webapp_lyr_default(array(
      'codice' => 'lyr_type',
      'etichetta' => 'tile',
      'lyr' => $lyr,'mygroup' => $mygroup,'slug' => $slug,
    ));

    $arr=add_all_other_lyr_fields($arr,$slug);
  //---

  //lyr2
    $slug='lyr2';//$slugs[0];
    $slugs[]=$slug;//add to array
    $lyr=$slug;//can be different!

    $arr[]=watchdog_language_webapp_lyr_default(array(
      'codice' => 'label',
      'etichetta' => 'Hexes',
      'lyr' => $lyr,'mygroup' => $mygroup,'slug' => $slug,
      'lang' => DEFAULT_LANG,
    ));
    $arr[]=watchdog_language_webapp_lyr_default(array(
      'codice' => 'title',
      'etichetta' => 'Hexes 100k',
      'lyr' => $lyr,'mygroup' => $mygroup,'slug' => $slug,
      'lang' => DEFAULT_LANG,
    ));
    // 
    $arr[]=watchdog_language_webapp_lyr_default(array(
      'codice' => 'lyr_update',
      'etichetta' => 'fix',
      'lyr' => $lyr,'mygroup' => $mygroup,'slug' => $slug,
    ));
    $arr[]=watchdog_language_webapp_lyr_default(array(
      'codice' => 'lyr_type',
      'etichetta' => 'polygon',
      'lyr' => $lyr,'mygroup' => $mygroup,'slug' => $slug,
    ));  

    $arr=add_all_other_lyr_fields($arr,$slug);
  //---

  //lyr3
  $slug='lyr3';//$slugs[0];
  $slugs[]=$slug;//add to array
  $lyr=$slug;//can be different!

  $arr[]=watchdog_language_webapp_lyr_default(array(
    'codice' => 'label',
    'etichetta' => 'Opentopomap',
    'lyr' => $lyr,'mygroup' => $mygroup,'slug' => $slug,
    'lang' => DEFAULT_LANG,
  ));
  //
  $arr[]=watchdog_language_webapp_lyr_default(array(
    'codice' => 'tile_url',
    'etichetta' => 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    'lyr' => $lyr,'mygroup' => $mygroup,'slug' => $slug,
  ));  
  $arr[]=watchdog_language_webapp_lyr_default(array(
    'codice' => 'lyr_update',
    'etichetta' => 'fix',
    'lyr' => $lyr,'mygroup' => $mygroup,'slug' => $slug,
  ));
  $arr[]=watchdog_language_webapp_lyr_default(array(
    'codice' => 'lyr_type',
    'etichetta' => 'tile',
    'lyr' => $lyr,'mygroup' => $mygroup,'slug' => $slug,
  ));

  $arr=add_all_other_lyr_fields($arr,$slug);
  //---

  //lyr4
  $slug='lyr4';
  $slugs[]=$slug;//add to array
  $lyr=$slug;//can be different!

  $arr[]=watchdog_language_webapp_lyr_default(array(
    'codice' => 'label',
    'etichetta' => 'Geohash world',
    'lyr' => $lyr,'mygroup' => $mygroup,'slug' => $slug,
    'lang' => DEFAULT_LANG,
  ));
  $arr[]=watchdog_language_webapp_lyr_default(array(
    'codice' => 'title',
    'etichetta' => 'Geohash world',
    'lyr' => $lyr,'mygroup' => $mygroup,'slug' => $slug,
    'lang' => DEFAULT_LANG,
  ));
  // 
  $arr[]=watchdog_language_webapp_lyr_default(array(
    'codice' => 'lyr_update',
    'etichetta' => 'on_move',
    'lyr' => $lyr,'mygroup' => $mygroup,'slug' => $slug,
  ));
  $arr[]=watchdog_language_webapp_lyr_default(array(
    'codice' => 'lyr_type',
    'etichetta' => 'polygon',
    'lyr' => $lyr,'mygroup' => $mygroup,'slug' => $slug,
  ));  

  $arr=add_all_other_lyr_fields($arr,$slug);
  //---

  //lyr5
  $slug='lyr5';//$slugs[0];
  $slugs[]=$slug;//add to array
  $lyr=$slug;//can be different!

  $arr[]=watchdog_language_webapp_lyr_default(array(
    'codice' => 'label',
    'etichetta' => 'OSM-France',
    'lyr' => $lyr,'mygroup' => $mygroup,'slug' => $slug,
    'lang' => DEFAULT_LANG,
  ));
  //
  $arr[]=watchdog_language_webapp_lyr_default(array(
    'codice' => 'tile_url',
    'etichetta' => 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
    'lyr' => $lyr,'mygroup' => $mygroup,'slug' => $slug,
  ));  
  $arr[]=watchdog_language_webapp_lyr_default(array(
    'codice' => 'lyr_update',
    'etichetta' => 'fix',
    'lyr' => $lyr,'mygroup' => $mygroup,'slug' => $slug,
  ));
  $arr[]=watchdog_language_webapp_lyr_default(array(
    'codice' => 'lyr_type',
    'etichetta' => 'tile',
    'lyr' => $lyr,'mygroup' => $mygroup,'slug' => $slug,
  ));

  $arr=add_all_other_lyr_fields($arr,$slug);
  //---
  
  return $arr;

}

function add_all_other_lyr_fields($arr,$slug){
  $arr2=array();
  foreach ($arr as $key => $value) {
    # code...
    
    if($value['lyr']==$slug){
      $arr2[]=$value['codice'];
    }
  }
  
  $lyr=$slug;//can be different!
  $mygroup='lyr';

  $other_fields=array(
    'title'=>'No title',
    'lyr_update'=>'on_move',
    'geoserver_name'=>strtolower(WATCHDOG_SLUG).'_'.$lyr,//without suffix
    'geoserver_style'=>strtolower(WATCHDOG_SLUG).'_'.$lyr.'_style',//without suffix
    'icon'=>'noun_person_1994728_Blue.png',
  );

  foreach ($other_fields as $key3 => $value3) {
    if(!in_array($key3,$arr2)){
      $arr[]=watchdog_language_webapp_lyr_default(array(
        'codice' => $key3,
        'etichetta' => $value3,
        'lyr' => $lyr,'mygroup' => $mygroup,'slug' => $slug,
      ));
    }
  }

  return $arr;

}