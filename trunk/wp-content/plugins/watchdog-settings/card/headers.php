<?php
if(!empty($my_query_vars['mypage'])){
  //echo "Card have sub";

  $subpage=$my_query_vars['mypage'];

  // if($subpage=='skills'){
  //   include(plugin_dir_path( __FILE__ ).'cityplanner/template05-body-html-skills.php');
  // }
  // elseif($subpage=='qgis'){
  //   include(plugin_dir_path( __FILE__ ).'cityplanner/template05-body-html-qgis.php');
  // }
  // else{
  //   echo "404 Page not found.";
  // }

  
  
}
else{
  //echo "Card have no sub";
  $subpage='qgis';
}

$meta_headers = card_get_meta($subpage,$g_DFL_IMAGE_MAIN,$g_ERP_CORP_FOUNDER_SLUG);

function card_get_meta($subpage,$g_DFL_IMAGE_MAIN,$g_ERP_CORP_FOUNDER_SLUG){

  $array=array(
    'qgis'=>array(
      'title'=>'QGIS Title',
      'canonical'=>get_permalink().$subpage.'/',
      'description'=>'QGIS',
      'keywords'=>'QGIS',
      'publisher'=>$g_ERP_CORP_FOUNDER_SLUG,//'Cityplanner.biz',
      'published_time'=>'2021-04-19T08:00:00+00:00',
      'modified_time'=>'2021-04-19T08:00:00+00:00',
      'image_main'=>$g_DFL_IMAGE_MAIN
    ),
    'skills'=>array(
      'title'=>'Skills Title',
      'canonical'=>get_permalink().$subpage.'/',
      'description'=>'Skills',
      'keywords'=>'Skills',
      'publisher'=>$g_ERP_CORP_FOUNDER_SLUG,//'Cityplanner.biz',
      'published_time'=>'2021-04-19T08:00:00+00:00',
      'modified_time'=>'2021-04-19T08:00:00+00:00',
      'image_main'=>$g_DFL_IMAGE_MAIN
    ),
    'experience'=>array(
      'title'=>'Experience',
      'canonical'=>get_permalink().$subpage.'/',
      'description'=>'Experience',
      'keywords'=>'gis',
      'publisher'=>$g_ERP_CORP_FOUNDER_SLUG,//'Cityplanner.biz',
      'published_time'=>'2023-03-02T08:00:00+00:00',
      'modified_time'=>'2023-03-02T08:00:00+00:00',
      'image_main'=>$g_DFL_IMAGE_MAIN
    ),
  );

  return $array[$subpage];

}

?>