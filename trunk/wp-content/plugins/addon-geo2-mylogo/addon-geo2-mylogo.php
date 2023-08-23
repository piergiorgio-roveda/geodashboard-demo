<?php
/*
Plugin Name: addon-geo2-mylogo
Plugin URI: //localhost/geodashboard/
Description: Custom plugin
Version: 0.1
Author: PRoveda
Author URI: //localhost/geodashboard/
License: GPL
*/

include( plugin_dir_path( __FILE__ ) . 'my_login_logo.php');

function my_login_logo_url(){
  //echo "my_login_logo_url";
  //exit;     
  //++my_console_log('my_login_logo_url()',2);
  // SOURCE know-how
  // AUTHOR PROVEDA
  // CREATE 180401
  // UPDATE 180421

	//$_SESSION['addon-geo'][] = 'f: my_login_logo_url';

	return get_bloginfo( 'url' );
}
add_filter('login_headerurl','my_login_logo_url');

?>
