<?php
define('APP_VERSION', '6.3.2');
define('APP_NAME', '[GEO]DASHBOARD');
define('APP_NICKNAME', 'WatchDog');
//
define('POSTGRES_HOST', $env['POSTGRES_HOST']);
define('POSTGRES_PORT', $env['POSTGRES_PORT']);
define('POSTGRES_DBNAME', $env['POSTGRES_DBNAME']);
define('POSTGRES_USER', $env['POSTGRES_USER']);
define('POSTGRES_PASSWORD', $env['POSTGRES_PASSWORD']);
define('SECRET_KEY', $env['SECRET_KEY']);
define('HERE_APIKEY', $env['HERE_APIKEY']);
define('TWITTER_OAUTH_ACCESS_TOKEN', $env['TWITTER_OAUTH_ACCESS_TOKEN']);
define('TWITTER_OAUTH_ACCESS_TOKEN_SECRET', $env['TWITTER_OAUTH_ACCESS_TOKEN_SECRET']);
define('TWITTER_CONSUMER_KEY', $env['TWITTER_CONSUMER_KEY']);
define('TWITTER_CONSUMER_SECRET', $env['TWITTER_CONSUMER_SECRET']);
define('GA_TRACKING_ID', $env['GA_TRACKING_ID']);
define('GMAP_KEY', $env['GMAP_KEY']);
//
define('G_MASTER', $env['G_MASTER']);
define('MAPSLUG', $env['MAPSLUG']);
//
define('GEOVAR_MASTER','geovar_master');
//define('GEOVAR_COLLECTION_PARAMS','geovar_collection_params');
define('GEOVAR_COLLECTION','geovar_collection');
define('GEOVAR_TB','geovar_tb');
define('TB_TRANSACTIONS','tb_transactions');

/*
  IF NOT DEFINED in env-client-???.php
  WILL BE DEFINE HERE
*/

//ERP
  if(!empty('ERP_CLIENT_SLUG'))           define('ERP_CLIENT_SLUG', 'geodashboard');
  if(!empty('ERP_CLIENT'))                define('ERP_CLIENT','Piergiorgio');//WP_MYCLIENT
  if(!empty('ERP_CORP_NAME'))             define('ERP_CORP_NAME','Cityplanner.biz');
  if(!empty('ERP_CORP_ESTABLISHED'))      define('ERP_CORP_ESTABLISHED','2012');
  if(!empty('ERP_CORP_STATUS'))           define('ERP_CORP_STATUS','active');
  if(!empty('ERP_CORP_HQ'))               define('ERP_CORP_HQ','Milano, Italy');
  if(!empty('ERP_CORP_FOUNDER'))          define('ERP_CORP_FOUNDER','Piergiorgio');
  if(!empty('ERP_CORP_FOUNDER_SLUG'))     define('ERP_CORP_FOUNDER_SLUG','pjhooker');
  if(!empty('ERP_CORP_LEADER'))           define('ERP_CORP_LEADER',ERP_CORP_FOUNDER_SLUG);
  if(!empty('ERP_OWNER_GEOINFO_AZIENDA')) define('ERP_OWNER_GEOINFO_AZIENDA','cityplanner.biz');
  if(!empty('ERP_OWNER'))                 define('ERP_OWNER','Piergiorgio');  
  if(!empty('CLIENT_DOC_CREDIT'))         define('CLIENT_DOC_CREDIT','CLIENT_DOC_CREDIT.pdf');
//--

//MAP
  if(!empty('MAP_TITLE'))               define('MAP_TITLE', '[GEO]DASHBOARD');
  if(!empty('GEOSERVER_USERNAME'))      define('GEOSERVER_USERNAME', $env['GEOSERVER_USERNAME']);
  if(!empty('GEOSERVER_PSWD'))          define('GEOSERVER_PSWD', $env['GEOSERVER_PSWD']);
  if(!empty('GEOSERVER_WORKSPACE'))     define('GEOSERVER_WORKSPACE', $env['GEOSERVER_WORKSPACE']);
  if(!empty('GEOSERVER_URL'))           define('GEOSERVER_URL', $env['GEOSERVER_URL']);

  $var='DFL_LOGO_OWNER_BASE';
  if(!empty($var))  define($var, ERP_CLIENT_SLUG."-logo.png");

  $var='DFL_TAGLINE_OWNER';
  if(!empty($var))  define($var, "...");

  $var='DFL_LOGO_LOGIN_BASE';
  if(!empty($var))  define($var, ERP_CLIENT_SLUG."-300x57.png");

  $var='DFL_LABEL_MAIN_LOGO_BASE';
  if(!empty($var))  define($var, ERP_CLIENT_SLUG."-300x57.png");

  $var='FAVICON_APPLE_BASE';
  if(!empty($var))  define($var, ERP_CLIENT_SLUG."-apple_touch_icon.png");

  $var='FAVICON_BASE';
  if(!empty($var))  define($var, ERP_CLIENT_SLUG."-favicon.ico");
  
  $var='FAVICON32_BASE';
  if(!empty($var))  define($var, ERP_CLIENT_SLUG."-favicon-32x32.png");
  
  $var='FAVICON16_BASE';
  if(!empty($var))  define($var, ERP_CLIENT_SLUG."-favicon-16x16.png");
    
  $var='DFL_MAP_ICON';
  if(!empty($var))  define($var, ERP_CLIENT_SLUG."-default-map-icon.svg");

  $var='LANGUAGE';
  if(!empty($var))  define($var, "en");

  $var='DFL_IMAGE_MAIN';
  $url='https://lh3.googleusercontent.com/pw/AMWts8C6uAwlhYi9xYAKy-obchzdA5ES7uSOiPeOMNO3QRempdHjQ5dYykcduy9WsTdgpV6qKl8zIf-xyvN0EnD2LmVCqul-kjKHimiYrpwqBQGMeS5NLg8Ua7XuS4ckW9PGUQdKRKQ-R2RnPb-PFeUinNlVNw=w1182-h822-no';
  if(!empty($var))  define($var, $url);

  $var='DFL_IMAGE_THUMB';
  $url='https://lh3.googleusercontent.com/pw/AMWts8C6uAwlhYi9xYAKy-obchzdA5ES7uSOiPeOMNO3QRempdHjQ5dYykcduy9WsTdgpV6qKl8zIf-xyvN0EnD2LmVCqul-kjKHimiYrpwqBQGMeS5NLg8Ua7XuS4ckW9PGUQdKRKQ-R2RnPb-PFeUinNlVNw=w1182-h822-no';
  if(!empty($var))  define($var, $url);

  $var='DFL_IMAGE_BANNER';
  $url='https://lh3.googleusercontent.com/pw/AMWts8C6uAwlhYi9xYAKy-obchzdA5ES7uSOiPeOMNO3QRempdHjQ5dYykcduy9WsTdgpV6qKl8zIf-xyvN0EnD2LmVCqul-kjKHimiYrpwqBQGMeS5NLg8Ua7XuS4ckW9PGUQdKRKQ-R2RnPb-PFeUinNlVNw=w1182-h822-no';
  if(!empty($var))  define($var, $url);

  $var='PUBLISHER';
  if(!empty($var))  define($var, ERP_CLIENT);

  $var='TWITTER_SITE';
  if(!empty($var))  define($var, "@Twitter");
  
  $var='TWITTER_CREATOR';
  if(!empty($var))  define($var, "@Twitter");

//--