<?php


//https://sourceforge.net/projects/simplehtmldom/
//https://www.codementor.io/wang90925/top-10-best-usage-examples-of-php-simple-html-dom-parser-i8ik76e16
include( plugin_dir_path( __FILE__ ) . 'simple_html_dom.php');

add_action( 'login_enqueue_scripts', 'my_login_logo' , 18);
function my_login_logo() {
	// OUTPUT
	$output = json_apiInfo();
  wp_deregister_style('wp-admin');
	wp_deregister_style('login-css');
	$home_project = $output['geoInfo']['home_project'];
	$logo_login = $output['geoInfo']['logo_login'];
	if(!empty($_GET['language'])){
		$language = $_GET['language'];
	}
	else{
		$language = 'en';
	}

	$url = get_option( 'siteurl' );
	$site_slug = str_replace($home_project."/","",$url);

	// se trova beta
	if(strpos($output['geoInfo']['WP_ROOT'], 'dev.') !== false){
		if(strpos($site_slug, 'beta') !== false){
			$login_var='';
		}
		else{
			$login_var='user=admin&';
		}
	}
	else{
		$login_var='';
	}

	?>

		<link rel="manifest" href="<?php echo $output['geoInfo']['home_url']; ?>/manifest.json?v=<?php echo GEOLIB_VER;?>">
		<meta name="google" content="notranslate">
		<link rel="shortcut icon" href="<?php echo $output['geoInfo']['favicon']; ?>">
		<link rel="icon" type="image/png" href="<?php echo $output['geoInfo']['favicon']; ?>" sizes="120x120">
		<link rel="apple-touch-icon" href="<?php echo $output['geoInfo']['favicon']; ?>" sizes="120x120">
		<link rel="shortcut icon" type="image/x-icon" href="<?php echo $output['geoInfo']['favicon']; ?>">
		<link rel="apple-touch-icon" href="<?php echo $output['geoInfo']['favicon']; ?>"/>

		<?php
		get_template_part('template-parts-default/header-base-style-creativetim-blog');
		?>

		<script>
			var language = '<?php echo $language;?>';
			var home_url = '<?php echo $output['geoInfo']['home_url'];?>';
			var creativetim_base_url = '<?php echo $home_project;?>source/creative-tim-material-kit-v2.0.5/';
			var logo_login = '<?php echo $output['geoInfo']['logo_login'];?>';
    </script>

		<?php wp_enqueue_script( 'login-script-01', $home_project.'source/creative-tim-material-kit-v2.0.5/assets/js/core/jquery.min.js' );?>
		<?php wp_enqueue_script( 'login-script-02', $home_project.'source/creative-tim-material-kit-v2.0.5/assets/js/core/popper.min.js' );?>
		<?php wp_enqueue_script( 'login-script-03', $home_project.'source/creative-tim-material-kit-v2.0.5/assets/js/core/bootstrap-material-design.min.js' );?>
		<?php wp_enqueue_script( 'login-script-04', $home_project.'source/creative-tim-material-kit-v2.0.5/assets/js/plugins/moment.min.js' );?>
		<!--	Plugin for the Datepicker, full documentation here: https://github.com/Eonasdan/bootstrap-datetimepicker -->
		<?php wp_enqueue_script( 'login-script-05', $home_project.'source/creative-tim-material-kit-v2.0.5/assets/js/plugins/bootstrap-datetimepicker.js' );?>
		<!--  Plugin for the Sliders, full documentation here: http://refreshless.com/nouislider/ -->
		<?php wp_enqueue_script( 'login-script-06', $home_project.'source/creative-tim-material-kit-v2.0.5/assets/js/plugins/nouislider.min.js' );?>
		<!-- Control Center for Material Kit: parallax effects, scripts for the example pages etc -->
		<?php wp_enqueue_script( 'login-script-07', $home_project.'source/creative-tim-material-kit-v2.0.5/assets/js/material-kit.js?v=2.0.' );?>
		<?php wp_enqueue_script( 'login-script-09', $output['geoInfo']['home_url'] . '/wp-content/plugins/addon-geo2-mylogo/my_login_logo.js'.'' );?>

<?php
}
?>
