<!doctype html>
<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
// the following constant will help ensure all other PHP files will only work as part of this API.
if (!defined('CONST_INCLUDE_KEY')){
  define('CONST_INCLUDE_KEY', 'd4e2ad09-b1c3-4d70-9a9a-0e6149302486');
}

//--

$cApp_fn = new App_API_Geodata_fn;
$cApp_ER = new App_ElementsRoles;

$g_PLUGIN_PROJECT = plugin_dir_path( __FILE__ );

$mapuser_meta=$cApp_fn->get_mapuser_meta();

// Variable if `query_vars`
// $gMapSlug
$CANONICAL = get_permalink();

global $wp_query;
$my_query_vars = $wp_query->query_vars;

if(!empty($my_query_vars['mypage'])){

  // $item_token=$my_query_vars['mypage'];
  $gMapSlug=$my_query_vars['mypage'];

  $CANONICAL = get_permalink()."".$gMapSlug."/";

}

$obj_maps=$cApp_fn->get_maps_meta2();

foreach ($obj_maps['features'] as $key => $objMap) {
  if($gMapSlug==$objMap['properties']['g_slug']){
    $itemMap = $objMap['properties'];
  }
}

if(empty($itemMap)){
  echo 'This Page doesn\'t exist';
  exit;
}

if(empty($itemMap['g_attributes'])){
  echo 'MAP g_attributes not defined';
  exit;
}

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
    echo "<title>".$gVariables['map_title']."</title>";
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

  </body>
</html>