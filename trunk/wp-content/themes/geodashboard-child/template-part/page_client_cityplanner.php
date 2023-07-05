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
//--
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

// if($gMapSlug=='explorer'){
//   $item_token='0x0'; // 'edeb7786ecb94fc30620defcb2ac2054';
// }
// else{
//   $item_token='edeb7786ecb94fc30620defcb2ac2054';
// }

$CANONICAL = get_permalink();

// if(!empty($my_query_vars['mypage'])){

//   // $item_token=$my_query_vars['mypage'];
//   $gMapSlug=$my_query_vars['mypage'];

//   $CANONICAL = get_permalink()."".$gMapSlug."/";

// }

// if($gMapSlug=='TreasureHunt'
//   || $gMapSlug=='Municipality'){
//   if(isset($_GET['item'])){

//     $CANONICAL .= '?item='.$_GET['item'];

//   }
// }

// $geovar_wiki = $cApp_fn->geovar_to_json_wiki('geovar_wiki',$item_token);

//-- ATTRIBUTES

$obj_maps = $cApp_fn->get_maps_meta2();

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

// if($gMapSlug=='explorer'){
//   explorer_default();
// }

if(empty($itemMap['g_attributes'])){
  echo 'MAP g_attributes not defined';
  exit;
}

//--

// include(ABSPATH.THEME_PATH.'/template-part/template-g_variables.php');

//--

$g_template = $itemMap['g_template'];
// $g_template = 'template05';

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

    // if(empty($itemMap['g_seo'])){
    //   echo "<title>".$gVariables['map_title']."</title>";
    // }
    // else{
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
    // }

    $filename = ABSPATH.THEME_PATH.'/src/css/style_'.$g_template.'.css';
    if (file_exists($filename)) {
      $url=get_site_url().THEME_PATH.'/src/css/style_'.$g_template.'.css?ver='.APP_VERSION;
      ?>
      <link rel="stylesheet" href="<?php echo $url;?>">
      <?php
    }

    ?>
    <link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri();?>/src/css/style_dashboard.css" />
    <!-- Custom styles for this template -->
    <link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri();?>/src/css/cover.css" rel="stylesheet">

  </head>  
  <body class="d-flex h-100 text-center text-bg-yellow">

    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=<?php echo GA4_TAGMANAGER;?>"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <header class="mb-auto">
        <div>
          <h3 class="float-md-start mb-0">
            <img alt="<?php echo $gVariables['map_title'];?>"
              src="https://www.cityplanner.biz/source/img/business_2021/logo21-cp.png?ver=0.1.5" style="width:60px;height:auto;" />
          </h3>
          <?php
          include(ABSPATH.THEME_PATH.'/template-part/cityplanner/template05-body-html-main-nav.php');
          ?>          
        </div>
      </header>
      <main class="px-3">
        <div class="s-cp1-main-msg"
          style="margin-left:0px;margin-right:0px;width:100%;">
          <p>Charting cities, populations, and throughfares in preparation for tomorrow’s solutions.</p>
        </div>   

        <!--<span>
          <img src="https://www.cityplanner.biz/source/img/
            background-home-220725.png" />
        </span>-->

        <h1><?php echo $gVariables['map_title'];?></h1>
        <p class="lead">
          Complex DATA: Easy GOALS
        </p>
        <div class="box-homeInfo1" style="display:none;">
        </div>
        <article>
          <section>
            <h2>[GEO]DASHBOARD</h2>
            <p style="text-align: left;">
              <span class="badge  bg-danger text-bg-danger">EARLY ACCESS</span> Are you ready to take your geospatial journey to new heights? We're thrilled to present [GEO]DASHBOARD, the cutting-edge application that brings the power of geospatial intelligence right to your fingertips. <a href="https://cityplanner.biz/geodashboard/subscribe/">[... continue]</a>
            </p>
            <h2>A City Planner Who Likes QGIS?</h2>
            <p style="text-align: left;">
              A GIS expert managing geospatial data to support a 
              variety of project and client needs. Performs programming, 
              data analysis, or software development for 
              GIS applications. an active contributor on 
              YouTube’s online QGIS tutorials channel and 
              Open Source community projects.
            </p>
            <p style="text-align: left;">
              Designed, promoted, or administered government 
              plans or policies affecting land use, zoning, 
              public utilities, community facilities, housing, 
              or transportation. During my GIS career, I have 
              sought opportunities to analyze situations accurately 
              so effective plans of action could be developed and 
              safely executed, establish good relationships with 
              local residents, maintain GIS applications and 
              procedures, as well as teach, train, and 
              communicate GIS concepts to non-GIS users.
            </p>
            <p style="text-align: left;">
              <u>A few of my recent successes include: </u>
              <ul style="text-align: left;">
                <li>Developed a simplified, yet logical 
                  structure to update a client’s maps 
                  regarding travel time between two 
                  points and could be updated by downloading 
                  the latest data.
                </li>
                <li>Offered a GIS application with zero 
                  licensing costs to clients as a viable 
                  alternative to applications requiring a 
                  substantial outlay for licensing, which 
                  saved customers, on average, from € 2.3K to € 3.3K.
                </li>
              </ul>
            </p>            
          </section>
        </article>
        <!--
          <div class="location-map-home image-in-section d-none d-md-block">
            <ul class="nav nav-tabs">
              <li class="nav-item">
                <span class="nav-link nav-link-map active" id="home_map1" aria-current="page">Urban Index</span>
              </li>
              <li class="nav-item">
                <span class="nav-link nav-link-map" id="home_map2">MARS</span>
              </li>
              <li class="nav-item">
                <span class="nav-link nav-link-map" id="home_map3">World Elevation</span>
              </li>
              <li class="nav-item">
                <span class="nav-link nav-link-map" id="home_map4">Stamen</span>
              </li>
            </ul>
          </div>          
          <div id="mapid" style="width: 100%; height: 400px; position: relative;">
          <div class="loading text-center" style="display:none;">
            <div class="d-flex justify-content-center">
              <div class="spinner-grow text-secondary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
          <div id="box-info1" class="div-on-map"></div>
        </div>
          mapid-->        
      </main>

      <div class="flex-center-footer">
        <!--<h3 class="s01-txt-on-primary d-none d-md-block">Follow me</h3>-->
        <a href="https://www.linkedin.com/in/piergiorgioroveda-gis/" rel="nofollow">
          <i class="fa fa-linkedin-square fa-4x icon-3d d-none d-md-block"
            style="color:black;"></i>
          <i class="fa fa-linkedin-square fa-2x icon-3d d-block d-md-none"
            style="color:black;"></i>
        </a>
        <a href="https://www.youtube.com/c/CityPlannerGISTIPSTER" rel="nofollow">
          <i class="fa fa-youtube-play fa-4x icon-3d icon-3d d-none d-md-block"
            style="color:black;"></i>
          <i class="fa fa-youtube-play fa-2x icon-3d icon-3d d-block d-md-none"
            style="color:black;"></i>
        </a>
        <a href="https://github.com/piergiorgio-roveda" rel="nofollow">
          <i class="fa fa-github-alt fa-4x icon-3d icon-3d d-none d-md-block"
            style="color:black;"></i>
          <i class="fa fa-github-alt fa-2x icon-3d icon-3d d-block d-md-none"
            style="color:black;"></i>
        </a>
      </div>
      <div class="">
        <!--<div class="s01-txt-on-primary">© 2021 Piergiorgio Roveda</div>-->
        <!--<div><a class="s01-txt-on-primary" href="https://www.cityplanner.biz/privacy-policy/">Privacy Policy</a></div>-->
        <!--<div class="copyright-element py-2 py-md-0 mr-3 mx-lg-0 mr-lg-6 mb-md-0"><a href="#" class="text-white">Imprint</a></div>-->
      </div>

      <footer class="mt-auto">
        <p><?php echo $gVariables['map_title'];?>, by Piergiorgio Roveda @cityplanner.biz</p>
      </footer>
    </div>
    <?php
    $filename = ABSPATH.THEME_PATH.'/template-part/'.$g_template.'-body-js-libraries.php';
    if (file_exists($filename)) {
      include(ABSPATH.THEME_PATH.'/template-part/'.$g_template.'-body-js-libraries.php');
    }
    else{
      include(ABSPATH.THEME_PATH.'/template-part/default-body-js-libraries.php');
    }
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
    <script>

      $('body').css('box-shadow', 'none');

    </script>
  </body>
</html>
