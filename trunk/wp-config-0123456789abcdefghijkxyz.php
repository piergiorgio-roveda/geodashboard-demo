<?php
define('WP_CACHE', false);

//https://www.wpwhitesecurity.com/protect-wordpress-wp-config-php-security/

//WATCHDOG

  define('WATCHDOG_SLUG','W01');
  define('WATCHDOG_NAME','watchdog01');

  define('WP_ENVIRONMENT','development');

  define('ERP_OWNER','PJHOOKER');//WP_MYCLIENT
  define('ERP_CLIENT','PJHOOKER');//WP_MYCLIENT
  define('ERP_CLIENT_SLUG','pjhooker');//WP_MYCLIENT
  define('ERP_DEFAULT_PSW','*********');//WP_MYCLIENT

  define('ERP_NUMEROOFERTA','2021001');
  define('ERP_SCADENZA','20500101');
  $erp_codicelic_array=array(
    'LIC0000001',//0-DEV
    'LIC0000002',//1-BETA
    'LIC0000003',//2-PRO
  );
  define( 'ERP_CODICELIC_ARRAY', json_encode($erp_codicelic_array) );

  define('ERP_POSTGRES_HOST','127.0.0.1');

  define('CMS_NAME','WatchDog Web APP');
  define('WEBMASTER','lima.cityplanner@mail.com');

  $mysql_dbname_array=array(
    'Sql_0',//0-MYSQL-DEV
    'Sql_1',//1-MYSQL-BETA
    'Sql_2',//2-MYSQL-PRO
  );
  $mysql_dbuser_array=array(
    'wordpress',//0-WHATCHDOG
    'wordpress',//1-WHATCHDOG
  );
  $mysql_dbpassword_array=array(
    '*********',//0-WHATCHDOG
    '*********',//1-WHATCHDOG
  );

  $myhost_array=array(
    'watchdog',
    'watchdog',
  );
  define( 'MY_HOST_ARRAY', json_encode($myhost_array) );

  define('POSTGRES_PORT','5432');
  define('POSTGRES_USER','define_user');
  define('GEOAUTH',     '*********');
  define('GEOAUTH2',    '*********');

  $pg_dbpassword_array=array(
    'define_paswd',//0-WHATCHDOG
    'define_paswd',//1-WHATCHDOG
  );
  define( 'PG_DBPASSWORD_ARRAY', json_encode($pg_dbpassword_array) );

  $pg_dbhost_array=array(
    '127.0.0.1',//0-WHATCHDOG
    '127.0.0.1',//0-WHATCHDOG-PRO
    '127.0.0.1',//1-WHATCHDOG
  );
  define( 'PG_DBHOST_ARRAY', json_encode($pg_dbhost_array) );

  $google_api_search_and_map_array=array(
    '*********',//0-WATCHDOG by HTTP - ALL
    '*********',//1-WATCHDOG by HTTP - ALL
    '*********',//2-WATCHDOG by HTTP - ALL
  );
  define( 'GOOGLE_API_SEARCH_AND_MAP_ARRAY', json_encode($google_api_search_and_map_array) );

  
  $google_api_search_and_map_ip_array=array(
    '*********',//0-WATCHDOG by HTTP - ALL
    '*********',//1-WATCHDOG by HTTP - ALL
    '*********',//2-WATCHDOG by HTTP - ALL
  );
  define( 'GOOGLE_API_SEARCH_AND_MAP_ARRAY_IP', json_encode($google_api_search_and_map_ip_array) );
  

  $ga_tracking_id_array=array(
    'UA-***-1',//0-watchdog01
    'UA-***-1',//1-watchdog01
    'UA-***-3',//2-WATCHDOG
  );
  define( 'GA_TRACKING_ID_ARRAY', json_encode($ga_tracking_id_array) );

//WATCHDOG -END

//define for wp-config
$mysql_dbname=$mysql_dbname_array[0];  



$mysql_dbuser=$mysql_dbuser_array[0];
$mysql_dbpassword=$mysql_dbpassword_array[0];
