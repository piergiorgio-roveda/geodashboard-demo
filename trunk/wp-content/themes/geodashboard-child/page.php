<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package geodashboard
 */

//$post_id=$post->ID;
$post_name=$post->post_name;
//$post_type=$post->post_type;
//_rint_r(WATCHDOG_MODULES_WITH_PAGE);
if(array_intersect(WATCHDOG_MODULES_WITH_PAGE,array($post_name))){

}
else{
  echo "Error: module ".$post_name;
  exit;
}

if( file_exists(WD_DIR_PATH.'/'.$post_name.'/template-'.$post_name.'.php') ) {

  require_once(WD_DIR_PATH.'/'.$post_name.'/template-'.$post_name.'.php');

}
else{
  echo "Error: directory module ".$post_name;
  exit;
}
