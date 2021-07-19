<?php
/*
Plugin Name: addon-geo2-mylogo
Plugin URI: https://watchdog.cloud/
Description: watchdog WP Plugin for change Login page
Version: 1.0
Author: PRoveda
Author URI: https://watchdog.cloud/pjhooker
License: GPL
*/

include( plugin_dir_path( __FILE__ ) . 'my_login_logo.php');

function my_login_logo_url(){

	return get_bloginfo( 'url' );
}
add_filter('login_headerurl','my_login_logo_url');

?>
