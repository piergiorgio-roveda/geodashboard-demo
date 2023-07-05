<!doctype html>
<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
// the following constant will help ensure all other PHP files will only work as part of this API.
if (!defined('CONST_INCLUDE_KEY')){
  define('CONST_INCLUDE_KEY', 'd4e2ad09-b1c3-4d70-9a9a-0e6149302486');
}

// define('THEME_PATH', str_replace(get_site_url(), "", get_stylesheet_directory_uri()));
$g_PLUGIN_PROJECT = plugin_dir_path( __FILE__ );

//--
$cApp_fn = new App_API_Geodata_fn;
$cApp_ER = new App_ElementsRoles;

$mapuser_meta=$cApp_fn->get_mapuser_meta();

/* 
Array(
   [0] => Array(
      [user_id] => 1
      [user_role] => administrator
      [user_token] => 835793ede8ce0f3db290e63acbb2da09
      [watchlist] => [{"slug":"PT_BUILDING","items":["AAA",...
   )
) */

//--

if (in_array("administrator", $mapuser_meta[0]['user_role'])) {
  $cApp_fn->register_addons();
  $cApp_fn->check_manifest();
}

//-- SUB

global $wp_query;
$my_query_vars = $wp_query->query_vars;

//-- MAPSLUG / CANONICAL

if($gMapSlug=='explorer'){
  $item_token='0x0'; // 'edeb7786ecb94fc30620defcb2ac2054';
}
else{
  $item_token='edeb7786ecb94fc30620defcb2ac2054';
}

$CANONICAL = get_permalink();

if(!empty($my_query_vars['mypage'])){

  // $item_token=$my_query_vars['mypage'];
  $gMapSlug=$my_query_vars['mypage'];

  $CANONICAL = get_permalink()."".$gMapSlug."/";

}

if($gMapSlug=='TreasureHunt'
  || $gMapSlug=='Municipality'){
  if(isset($_GET['item'])){

    $CANONICAL .= '?item='.$_GET['item'];

  }
}

// $geovar_wiki = $cApp_fn->geovar_to_json_wiki('geovar_wiki',$item_token);

//-- ATTRIBUTES

$obj_maps=$cApp_fn->get_maps_meta2();
//$obj_maps=$geovar_wiki;

foreach ($obj_maps['features'] as $key => $objMap) {
  if($gMapSlug==$objMap['properties']['g_slug']){
    $itemMap = $objMap['properties'];
  }
}

if(empty($itemMap)){
  echo 'This Page doesn\'t exist';
  exit;
}
$map_roles = $itemMap['g_group'];

$i=0;
foreach ($map_roles as $key => $value) {
  if($value=='public' || $value=='private'){
    // echo "User without permission.";
    $i++;
  }
  elseif (in_array($value, $mapuser_meta[0]['user_role'])) {
    // echo "User with permission. Role: ".$value."";
    $i++;
  }
}
if($i==0){
  echo "User without permission (for ".$gMapSlug.").";
  exit;
}

// $elements_roles=$cApp_ER->get_user_access_db('page_map_0x1');
// if($elements_roles[0]=='lock'){
//   echo "User without permission.";
//   exit;
// }

if($gMapSlug=='explorer'){
  explorer_default();
}

if(empty($itemMap['g_attributes'])){
  echo 'MAP g_attributes not defined';
  exit;
}

//--

// include(ABSPATH.THEME_PATH.'/template-part/template-g_variables.php');

//--

$g_template = $itemMap['g_template'];
$gVariables=$cApp_fn->get_g_variables($gMapSlug);

?>
<html lang="<?php echo $gVariables['LANGUAGE'];?>">
  <head>

    <?php
    
    $filename = ABSPATH.THEME_PATH.'/template-part/'.$g_template.'-head.php';
    if (file_exists($filename)) {
      include(ABSPATH.THEME_PATH.'/template-part/'.$g_template.'-head.php');
    }
    else{
      include(ABSPATH.THEME_PATH.'/template-part/default-head.php');
    }

    $filename = ABSPATH.THEME_PATH.'/template-part/'.$g_template.'-head-css.php';
    if (file_exists($filename)) {
      include(ABSPATH.THEME_PATH.'/template-part/'.$g_template.'-head-css.php');
    }
    else{
      include(ABSPATH.THEME_PATH.'/template-part/default-head-css.php');
    }
    ?>

    <link rel="canonical" href="<?php echo $CANONICAL;?>">

    <?php

    if(empty($itemMap['g_seo'])){
      echo "<title>".$gVariables['map_title']."</title>";
    }
    else{
      $filename = ABSPATH.THEME_PATH.'/template-part/'.$g_template.'-head-plus.php';
      if (file_exists($filename)) {
        include(ABSPATH.THEME_PATH.'/template-part/'.$g_template.'-head-plus.php');
      }
      else{
        include(ABSPATH.THEME_PATH.'/template-part/default-head-plus.php');
      }
      if($CANONICAL==$gVariables['HOME_PROJECT']){
        include(ABSPATH.THEME_PATH.'/template-part/headers/rich_snippets_BreadcrumbList_home.php');
      }
      else{
        include(ABSPATH.THEME_PATH.'/template-part/headers/rich_snippets_BreadcrumbList.php');
      }
      include(ABSPATH.THEME_PATH.'/template-part/headers/rich_snippets_Article.php');
      include(ABSPATH.THEME_PATH.'/template-part/headers/rich_snippets_yoast-schema-graph.php');      
    }

    $filename = ABSPATH.THEME_PATH.'/src/css/style_'.$g_template.'.css';
    if (file_exists($filename)) {
      $url=get_site_url().THEME_PATH.'/src/css/style_'.$g_template.'.css?ver='.APP_VERSION;
      ?>
      <link rel="stylesheet" href="<?php echo $url;?>">
      <?php
    }

    ?>

  </head>  
  <body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=<?php echo GA4_TAGMANAGER;?>"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    
    <?php
    // include(ABSPATH.THEME_PATH.'/template-part/'.$g_template.'-body-html.php');

    $filename = ABSPATH.THEME_PATH.'/template-part/'.$g_template.'-body-html.php';
    if (file_exists($filename)) {
      include(ABSPATH.THEME_PATH.'/template-part/'.$g_template.'-body-html.php');
    }
    else{
      include(ABSPATH.THEME_PATH.'/template-part/default-body-html.php');
    }    

    $filename = ABSPATH.THEME_PATH.'/template-part/'.$g_template.'-body-js-libraries.php';
    if (file_exists($filename)) {
      include(ABSPATH.THEME_PATH.'/template-part/'.$g_template.'-body-js-libraries.php');
    }
    else{
      include(ABSPATH.THEME_PATH.'/template-part/default-body-js-libraries.php');
    }
    
    ?>
    <?php
    //include(ABSPATH.THEME_PATH.'/template-part/template-g_variables-js.php');
    ?>      
    <?php
    //include(ABSPATH.THEME_PATH.'/template-part/template02-body-js-variables.php');
    ?>
    <!--BODY-JS-SCRIPT-LOAD-->
    <?php
    $filename = ABSPATH.THEME_PATH.'/template-part/'.$g_template.'-body-js-script.php';
    if (file_exists($filename)) {
      include(ABSPATH.THEME_PATH.'/template-part/'.$g_template.'-body-js-script.php');
    }
    else{
      include(ABSPATH.THEME_PATH.'/template-part/default-body-js-script.php');
    }      
    ?>

    <?php
    $filename = ABSPATH.THEME_PATH.'/template-part/'.$g_template.'-body-js-project.php';
    if (file_exists($filename)) {
      include(ABSPATH.THEME_PATH.'/template-part/'.$g_template.'-body-js-project.php');
    }
    else{
      include(ABSPATH.THEME_PATH.'/template-part/default-body-js-project.php');
    }      
    ?>

    <?php
    if(!empty($itemMap['g_attributes']->post_content)){
      ?>
      <script>
        var welcome_post_content = <?php echo json_encode($itemMap['g_attributes']->post_content, JSON_PRETTY_PRINT);?>;
      </script>
      <?php
    }
    ?>

  </body>
</html>
