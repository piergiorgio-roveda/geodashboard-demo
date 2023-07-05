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

if($gMapSlug=='explorer'){
  $item_token='0x0'; // 'edeb7786ecb94fc30620defcb2ac2054';
}
else{
  $item_token='edeb7786ecb94fc30620defcb2ac2054';
}

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

// $g_template = $itemMap['g_template'];
$g_template = 'default';

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
            <h3 class="float-md-start mb-0"><?php echo $gVariables['map_title'];?></h3>
            <nav class="nav nav-masthead justify-content-center float-md-end">
              <a class="nav-link fw-bold py-1 px-0 active" aria-current="page" href="https://cityplanner.biz/">Home</a>
            </nav>
        </div>
      </header>

      <main class="px-3">
        <h1>Introducing [GEO]DASHBOARD</h1>
        <p class="p1 lead">
          Revolutionizing Your Geospatial Experience!
        </p>
        <p class="p2">
          Are you ready to take your geospatial journey to new heights? We're thrilled to 
          present [GEO]DASHBOARD, the cutting-edge application that brings the power of 
          geospatial intelligence right to your fingertips.<br>
          With [GEO]DASHBOARD, you'll unlock a world of possibilities. Seamlessly visualize, 
          analyze, and interact with geospatial data like never before. 
          Gain valuable insights, make informed decisions, and transform the way 
          you navigate the world.<br>
          Why wait? Be among the first to experience [GEO]DASHBOARD's groundbreaking features. 
          Sign up now to become an exclusive subscriber and gain early access to our 
          application before its official launch. Don't miss your chance to be part of 
          this geospatial revolution!<br>
          Join us today and be at the forefront of innovation in geospatial technology. 
          Let's shape the future together.
          <br>Sign up now and stay tuned for updates, and exciting news!
        </p>
        <div class="display-table box-input-email">
          <div>
            <div style="width:70%;">
              <input type="email" class="form-control form-control-lg" 
                placeholder="Enter your email..."></div>
            <div>
              <button type="button" class="btn btn-dark btn-sign-up">SIGN UP</button>
            </div>
          </div>
        </div>
        <p class="p2">
          <br>Together, let's redefine the way you experience geospatial information. 
          Welcome to [GEO]DASHBOARD, where innovation meets the world of maps!
        </p>        
        <p>
          <a href="https://github.com/piergiorgio-roveda/geodashboard-demo" target="_blank">White Paper</a>  
          <a href="https://cityplanner.biz/privacy-policy/" target="_blank">Privacy Policy</a>  
        </p>
      </main>

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
    <script>
      $('.btn-sign-up').on('click',function(){
        subscribe();
      })
      async function subscribe(){

        localStorage.user_email = "lima.cityplanner@gmail.com";

        let datastring = {
          call_type:'silent',
          fn_group:'geodata',
          action:'view_data',
          collection:'subscribe_by_email',
          qy_name:'A',
          lyr:'lyr999',
          geom:0,
          email:$('.form-control').val()
        };
        let r = await generic_api_v2(
          datastring,
          'subscribe'
        );

        if(r.status == 'REQUEST_DENIED'){
          $('.box-input-email').append('<div class="error"><div>'+r.msg[0]+'</div></div>');
          return;
        }
        else{

          localStorage.user_token = r.features[0].properties.item_token;

          $('.p1').remove();
          $('.p2').remove();
          $('.error').remove();

          $('.box-input-email').html(''+
            '<h3>Thank you for subscribing!</h3>'+
            '<p>We will keep you updated on the progress of the project.</p>'+
            '<p>Best regards, Pj.</p>'+
            '<a '
              +'href="<?php echo get_site_url()."/".PAGE_CLIENT_SLUG."/";?>profile/" '+
              'class="btn btn-lg btn-dark fw-bold" '+
              '>'+
              'GO TO PROFILE</a>'+
            // '<hr>'+
            // '<p>Your unique token is:</p>'+
            // '<span id="badge_user_token" '+
            //   'class="badge bg-light text-dark clickable" style="">'+
            //   ''+localStorage.user_token+'</span>'+
            '<div style="margin-bottom:15px;"><div>'+
            '');
        }



      }
    </script>
  </body>
</html>
