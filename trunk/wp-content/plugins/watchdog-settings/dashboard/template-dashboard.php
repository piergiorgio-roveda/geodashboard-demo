<!doctype html>
<?php
// the following constant will help ensure all other PHP files will only work as part of this API.
if (!defined('CONST_INCLUDE_KEY')){
  define('CONST_INCLUDE_KEY', 'd4e2ad09-b1c3-4d70-9a9a-0e6149302486');
}

define('THEME_PATH', str_replace(get_site_url(), "", get_stylesheet_directory_uri()));

//--
$cApp_ER = new App_ElementsRoles;
$elements_roles=$cApp_ER->get_user_access_db('page_dashboard_0x1');
if($elements_roles[0]=='lock'){
   echo "User without permission.";
   exit;
}
//--
$g_map_title='[GEO]DASHBOARD';
$g_HOME_PROJECT = '//'.$_SERVER['SERVER_NAME'];//'https://cityplanner.biz/';
$g_SOURCE_PATH = '//'.$_SERVER['SERVER_NAME'].'/source/';

$mystring = $g_HOME_PROJECT;
$findme   = 'geoweb.cityplanner.ch';
$pos = strpos($mystring, $findme);

// Note our use of ===.  Simply == would not work as expected
// because the position of 'a' was the 0th (first) character.
if ($pos === false) {
   
} else {
   wp_redirect( $g_HOME_PROJECT.'/map/' ); exit;
}

?>
<html lang="en" class="h-100">
   <?php
   include(ABSPATH.THEME_PATH.'/template-part/template03-head.php');
   ?>
   <body class="d-flex h-100 text-center text-bg-yellow">
      <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
         <header class="mb-auto">
            <div>
               <h3 class="float-md-start mb-0"><?php echo $g_map_title;?></h3>
               <nav class="nav nav-masthead justify-content-center float-md-end">
                  <a class="nav-link fw-bold py-1 px-0 active" aria-current="page" href="https://cityplanner.biz/">Home</a>
               </nav>
            </div>
         </header>

         <main class="px-3">
            <h1><?php echo $g_map_title;?></h1>
            <p class="lead">
               Cloud-based GeoSpatial Platform to store, enrich, analyze & visualize GEO DATA.
            </p>
            </p>
               We believe that for a WebGIS to be truly revolutionary, it should be possible to 
               generate individual platforms as needed and in a short time. We are committed to 
               helping data owners derive value and deliver easily to their users. 
               Open the opportunities that still keep you tied to the GIS Companies, 
               with strengths and weaknesses.
            </p>
            <p class="lead">
               <a href="<?php echo get_site_url()."/map/";?>" 
                  class="btn btn-lg btn-dark fw-bold">Launch App</a>
            </p>
         </main>

         <footer class="mt-auto">
            <p><?php echo $g_map_title;?>, by Piergiorgio Roveda @cityplanner.biz</p>
         </footer>
      </div>
   </body>
</html>
