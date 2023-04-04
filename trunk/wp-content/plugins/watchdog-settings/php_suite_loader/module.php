<?php

/*if ((!defined('CONST_INCLUDE_KEY')) || (CONST_INCLUDE_KEY !== 'd4e2ad09-b1c3-4d70-9a9a-0e6149302486')) {
  // If someone tries to browse directly to this PHP file, send 404 and exit. It can only included
  // as part of our API.
  header("Location: /404.html", TRUE, 404);
  echo file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/404.html');
  die;
}*/

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);
//echo "here suite";
if( file_exists($_SERVER['DOCUMENT_ROOT'] . '/php-suite/twitter/vendor/autoload.php') ) {

  //https://github.com/abraham/twitteroauth
  //https://twitteroauth.com/
  require $_SERVER['DOCUMENT_ROOT'] . '/php-suite/twitter/vendor/autoload.php';
  //use Abraham\TwitterOAuth\TwitterOAuth;

}
else{
  echo "Missing: php-suite/twitter";
  exit;
}





