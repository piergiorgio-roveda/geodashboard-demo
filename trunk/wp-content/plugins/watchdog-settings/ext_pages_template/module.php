<?php

function pages_template_requirements_get_pages_list(){
  $array = array(
    'page:dashboard'=>['api-template-part'=>'dashboard'],
    'page:geodata'=>['api-template-part'=>'api-geodata'],
    'page:map'=>['api-template-part'=>'map'],
    'page:explorer'=>['api-template-part'=>'explorer'],
    'page:script'=>['api-template-part'=>'script']
  );
  return $array;
}

function get_pages_template($postid){
  $page_obj = get_post($postid);
  $page_slug = $page_obj->post_type.":" . $page_obj->post_name;
  $pages_template = pages_template_requirements_get_pages_list();
  $page_template=$pages_template[$page_slug];
  return $page_template;
}
