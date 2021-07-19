<?php
function watchdog_pages_webapp($page='nd'){
  
  $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);

  $arr=array();

  $slug='home';
  $arr[]=array(
    $slug=>watchdog_pages_webapp_default(array(
      'title' => 'Imagining that the territory is easily searchable',//'City Planner e Geospatial Revolution',
      'canonical' => site_url( '/', 'https' ),
      'published' => '2021-03-31T08:00:00+00:00',
      'modified' => '2021-04-19T08:00:00+00:00',
      'image' => 'https://www.cityplanner.biz/wp-content/uploads/2015/10/cityplanner_header.jpg',
    )),
  );

  $slug='webgis';
  $arr[]=array(
    $slug=>watchdog_pages_webapp_default(array(
      'title' => 'WebGIS',
      'canonical' => site_url( '/', 'https' ),
      'published' => '2021-07-07T08:00:00+00:00',
      'modified' => '2021-07-16T08:00:00+00:00',
      'image' => 'https://www.cityplanner.biz/wp-content/uploads/2021/07/webgis-cover-2021.jpg',
    )),
  );
  $parent=$slug;

  //---

  //remember to add_rewrite_rule
  $slug='blog-cityplanner';
  $arr[]=array(
    $slug=>watchdog_pages_webapp_default(array(
      'title' => 'Blog',//ucwords(str_replace("-", " ", $slug)),
      'canonical' => site_url( '/'.$slug.'/', 'https' ),
      'published' => '2021-04-08T08:00:00+00:00',
      'modified' => '2021-04-08T08:00:00+00:00',
    )),
  );
  $parent=$slug;

  
  $slug='come-si-fa-un-webgis';
  $arr[]=array(
    $slug=>watchdog_pages_webapp_default(array(
      'parent'=>$parent,
      'title' => 'Come si fa un WebGIS?',//ucwords(str_replace("-", " ", $slug)),
      'canonical' => site_url( '/'.$parent.'/'.$slug.'/', 'https' ),
      'published' => '2021-03-31T08:00:00+00:00',
      'modified' => '2021-03-31T08:00:00+00:00',
      'tags'=>array('video'),
    )),
  ); 

  $slug='geo-spatial-data-catalog-update-210619';
  if($lang=='it'){
    $title= 'Quartieri di Google, Metropolitana Milano, Geohash Italia';//ucwords(str_replace("-", " ", $slug)),
  }
  else{
    $title= 'Google sub-urbs, Milan metro train station, Italy Geohash';
  }   
  $arr[]=array(
    $slug=>watchdog_pages_webapp_default(array(
      'parent'=>$parent,
      'title' => $title,
      'canonical' => site_url( '/'.$parent.'/'.$slug.'/', 'https' ),
      'published' => '2021-06-19T08:00:00+00:00',
      'modified' => '2021-06-29T08:00:00+00:00',
      'image' => 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Miami_neighborhoods_map.png/1152px-Miami_neighborhoods_map.png',
      'tags'=>array('catalog'),
    )),
  );    

  if($page=='nd'){

    return $arr;
  }
  else{
    foreach ($arr as $key => $value){
      foreach ($value as $k => $v){
        if($k==$page){

          return $v;
        }          
      }
    }
  }

}

function watchdog_pages_webapp_default($t){

  if(!array_key_exists('status',$t))
    $t['status']='publish';

  if(!array_key_exists('image',$t))
    $t['image']='https://www.cityplanner.biz/wp-content/uploads/2020/10/GISTIPSTER-2-3_2.png';
  /*if(!array_key_exists('mytype',$t))
    $t['mytype']='';

  if(!array_key_exists('lang',$t))
    $t['lang']='ALL';
  
  if(!array_key_exists('descrizione',$t))
    $t['descrizione']='';
  
  if(!array_key_exists('eliminato',$t))
    $t['eliminato']=0;
  
  if(!array_key_exists('mylocation',$t))
    $t['mylocation']='';
  
  if(!array_key_exists('my_system',$t))
    $t['my_system']=0;
  
  if(!array_key_exists('myorder',$t))
    $t['myorder']=0;
  
  if(!array_key_exists('mygroup',$t))
    $t['mygroup']='';
  */
  return $t;

}
