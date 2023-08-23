<?php

// the following constant will help ensure all other PHP files will only work as part of this API.
if (!defined('CONST_INCLUDE_KEY')){
  define('CONST_INCLUDE_KEY', 'd4e2ad09-b1c3-4d70-9a9a-0e6149302486');
}
if (!defined('GEOVAR_MASTER')){
  define('GEOVAR_MASTER','geovar_master');
  //define('GEOVAR_COLLECTION_PARAMS','geovar_collection_params');
  define('GEOVAR_COLLECTION','geovar_collection');
  define('GEOVAR_TB','geovar_tb');
  define('TB_TRANSACTIONS','tb_transactions');
}
if (!defined('THEME_PATH')){
  define('THEME_PATH', str_replace(get_site_url(), "", get_stylesheet_directory_uri()));
}
//https://sourceforge.net/projects/simplehtmldom/
//https://www.codementor.io/wang90925/top-10-best-usage-examples-of-php-simple-html-dom-parser-i8ik76e16
include( plugin_dir_path( __FILE__ ) . 'simple_html_dom.php');

add_action( 'login_enqueue_scripts', 'my_login_logo' , 18);
function my_login_logo() {

	$cApp_fn = new App_API_Geodata_fn;
  $gMapSlug = MAPSLUG;
	$obj_maps=$cApp_fn->get_maps_meta2();

	foreach ($obj_maps['features'] as $key => $objMap) {
		if(MAPSLUG==$objMap['properties']['g_slug']){
			$itemMap = $objMap['properties'];
		}
	}

	if(empty($itemMap['g_attributes'])){
		echo 'MAP g_attributes not defined';
		exit;
	}

  $g_template = $itemMap['g_template'];
  $gVariables=$cApp_fn->get_g_variables($gMapSlug);

	$g_map_title=$itemMap['g_attributes']->map_title;
	$g_SOURCE_PATH = '//'.$_SERVER['SERVER_NAME'].'/source/';
	$g_HOME_PROJECT = get_site_url();

	$g_THEME_PATH = str_replace(get_site_url(), "", get_stylesheet_directory_uri());

	$g_DFL_LABEL_MAIN_LOGO = $gVariables['DFL_LABEL_MAIN_LOGO'];
  $g_DFL_COVER = $gVariables['DFL_COVER'];

	//$output = json_geoInfo($output);
	// OUTPUT
	//$output = json_apiInfo();
  wp_deregister_style('wp-admin');
	wp_deregister_style('login-css');

	$favicon = $gVariables['FAVICON'];

	$language = $itemMap['g_attributes']->language;


	$url = get_option( 'siteurl' );
	$site_slug = str_replace($g_HOME_PROJECT."/","",$url);

	// se trova beta
	$login_var='';


	?>

		<link rel="manifest" href="<?php echo $g_HOME_PROJECT; ?>/manifest.json?v=1.0.0">
		<meta name="google" content="notranslate">
		<link rel="shortcut icon" href="<?php echo $favicon; ?>">
		<link rel="icon" type="image/png" href="<?php echo $favicon; ?>" sizes="120x120">
		<link rel="apple-touch-icon" href="<?php echo $favicon; ?>" sizes="120x120">
		<link rel="shortcut icon" type="image/x-icon" href="<?php echo $favicon; ?>">
		<link rel="apple-touch-icon" href="<?php echo $favicon; ?>"/>

		<link href="<?php echo $g_SOURCE_PATH; ?>creative-tim-material-kit-v2.0.5/assets/css/material-kit.css?v=2.0.5" rel="stylesheet" />

		<link rel="stylesheet" type="text/css" href="<?php echo get_stylesheet_directory_uri(); ?>/style.css">

    <script src="https://use.fontawesome.com/eaac8bb640.js"></script>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />


		<script>
			var language = '<?php echo $language;?>';
			var creativetim_base_url = '<?php echo $g_SOURCE_PATH;?>creative-tim-material-kit-v2.0.5/';
			var logo_login = '<?php echo $g_DFL_LABEL_MAIN_LOGO;?>';
      var CMS_NAME = '<?php echo $g_map_title;?>';

      var HOME_PROJECT = '<?php echo get_site_url();?>';
      var SOURCE_PATH = '<?php echo $g_SOURCE_PATH;?>';
      var ENVIRONMENT = 'dev';//<?php //echo $g_ENVIRONMENT;?>';
      var THEME_PROJECT = '<?php echo get_stylesheet_directory_uri();?>';
      var THEME_PATH = '<?php echo $g_THEME_PATH;?>';
			var DFL_LABEL_MAIN_LOGO = '<?php echo $g_DFL_LABEL_MAIN_LOGO;?>';
      var DFL_COVER = '<?php echo $g_DFL_COVER;?>';

    </script>

		<?php wp_enqueue_script( 'login-script-01', $g_SOURCE_PATH.'creative-tim-material-kit-v2.0.5/assets/js/core/jquery.min.js' );?>
		<?php wp_enqueue_script( 'login-script-02', $g_SOURCE_PATH.'creative-tim-material-kit-v2.0.5/assets/js/core/popper.min.js' );?>
		<?php wp_enqueue_script( 'login-script-03', $g_SOURCE_PATH.'creative-tim-material-kit-v2.0.5/assets/js/core/bootstrap-material-design.min.js' );?>
		<?php wp_enqueue_script( 'login-script-04', $g_SOURCE_PATH.'creative-tim-material-kit-v2.0.5/assets/js/plugins/moment.min.js' );?>
		<!--	Plugin for the Datepicker, full documentation here: https://github.com/Eonasdan/bootstrap-datetimepicker -->
		<?php wp_enqueue_script( 'login-script-05', $g_SOURCE_PATH.'creative-tim-material-kit-v2.0.5/assets/js/plugins/bootstrap-datetimepicker.js' );?>
		<!--  Plugin for the Sliders, full documentation here: http://refreshless.com/nouislider/ -->
		<?php wp_enqueue_script( 'login-script-06', $g_SOURCE_PATH.'creative-tim-material-kit-v2.0.5/assets/js/plugins/nouislider.min.js' );?>
		<!-- Control Center for Material Kit: parallax effects, scripts for the example pages etc -->
		<?php wp_enqueue_script( 'login-script-07', $g_SOURCE_PATH.'creative-tim-material-kit-v2.0.5/assets/js/material-kit.js?v=2.0.' );?>
		<?php wp_enqueue_script( 'login-script-09', $g_HOME_PROJECT. '/wp-content/plugins/addon-geo2-mylogo/my_login_logo.js'.'' );?>

<?php
}

?>
