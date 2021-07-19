<?php
//$page_meta1
//parent
//title
//canonical
//modified
//if($lang=='it'){
//  $description= "The world";
//}
//else{
  $description= "WebGIS platform that integrates online map, analytics and transactions";
//}    

if($lang=='it'){
  $locale1="it_IT";
  $locale2="en_GB";
}
else{
  $locale1="en_GB";
  $locale2="it_IT";
}     

//if($lang=='it'){
//  $contents=array(
//    '
//    AAA
//    ',
//  );
//}
//else{

  $contents=array(
    '
    BBB
    ',
  );
//}  

$m=array(
  'post_type'=>'map',
  'description'=>$description,
  'locale1'=>$locale1,
  'locale2'=>$locale2,
  'content_template'=>'page_webgis-v0.0.1',
  'contents'=>$contents,
  'template_style'=>array(
    'webgis-v0.0.1',
  ),
  //'sidebar_template'=>'smartcontact',
  'custom_head'=>array(
    'bootstrap-4.5.2-dashboard',
    'material-icons',
    'leafletjs-1.7.1',
    'markercluster-1.3.0',
    'style_webgis-v0.0.1',
    'alertifyjs_1.13.1',
    'font-awesome4.7.0',
    'style_map_base',
  ),
  'custom_script'=>array(
    'jquery-3.5.1',
    //'axios-0.21.1',
    'bootstrap-4.5.2-dashboard',
    'leafletjs-1.7.1',
    'footer-function-general-map1',
    'alertifyjs_1.13.1',
    'autonumeric-1.9.46',
    'chromajs-2.0.0',
    //'html2canvas.1.0.0-rc.5',
    //'momentjs-2.24',
    //'datatables-1.10.16', //momentjs inside
    'Leaflet.TileLayer.NoGap',
    'gistips_bassemaps-0.0.1',
    'maps.googleapis',
    //'leaflet.gridlayer.googlemutant-0.6.4',
    //'leaflet.heat-gh-pages-0.2.0',
    'latlon-geohash-1.1.0',
    'leafletjs_GeometryUtil_v0.10.0',
    'markercluster-1.3.0',
    //'wd_geovar',
    'wd_general_script',   
    'map_webgis_base_1',
    'map_webgis_base_1b',
    'map_webgis_base_1c',
    'google_search_autocomplete',
    'map_webgis_base_3',
    'ajs_create_dialog',
    'wd_generic_api',
    'map_webgis_base_6',
    'map_webgis_base_7',
    'map_webgis_base_8',
    'map_geodatacity02',
    'coachmark_demo'
  ),

);     
?>