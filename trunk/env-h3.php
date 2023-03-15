<?php
$env=array(
  'G_MASTER'=>'db000000',
  'MAPSLUG'=>'map002',
  'DB_NAME'=>'wp_aaaa',
  'DB_USER'=>'aaaa',
  'DB_PASSWORD'=>'aaaa',
  'DB_HOST'=>'localhost',
  'DB_CHARSET'=>'utf8mb4',
  'DB_COLLATE'=>'',
  'AUTH_KEY'=>'123456789',
  'SECURE_AUTH_KEY'=>'123456789',
  'LOGGED_IN_KEY'=>'123456789',
  'NONCE_KEY'=>'123456789',
  'AUTH_SALT'=>'123456789',
  'SECURE_AUTH_SALT'=>'123456789',
  'LOGGED_IN_SALT'=>'123456789',
  'NONCE_SALT'=>'123456789',
  'SECRET_KEY'=>'123456789',
  'table_prefix'=>'wpaaaa_',
  'POSTGRES_HOST'=>'127.0.0.1',
  'POSTGRES_DBNAME'=>'gis_aaaa',
  'POSTGRES_USER'=>'gis_aaaa',
  'POSTGRES_PASSWORD'=>'aaaa',
  'POSTGRES_PORT'=>'5432',
  'HERE_APIKEY'=>'XXX',
  'TWITTER_OAUTH_ACCESS_TOKEN'=>'XXX',
  'TWITTER_OAUTH_ACCESS_TOKEN_SECRET'=>'XXX',
  'TWITTER_CONSUMER_KEY'=>'XXX',
  'TWITTER_CONSUMER_SECRET'=>'XXX',
  'GA_TRACKING_ID'=>'XXX',

);

define('WATCHDOG_MODULES_WITH_PAGE', array(
  'map',
  'script',
  'geodata'
));

$array_modules=WATCHDOG_MODULES_WITH_PAGE;
$array_modules[]='app_autoloader';
$array_modules[]='ext_before_render_general';
$array_modules[]='ext_pages_template';

define('WATCHDOG_MODULES', $array_modules);
