<?php
function geoinfo_requirements(){

  $return=array();
  $error=0;

  $return['add_action'][]='wp_loaded';

  //
  $functions=array(
    'get_valore_application',
    'get_pages_roles',
  );
  $applications=array(
  );
  $constants=array(
    'WP_ENVIRONMENT',
    'LABEL_MAIN_LOGO',
    'LOGO_OWNER',
    'LOGO_LOGIN',
    'FAVICON',
    'LOG_IN_WEB_CONSOLE',
    'POSTGRES_DBNAME',
    'HOME_PROJECT',
  );
  $hidden_constants=array(
    'GEOAUTH',
    'GEOAUTH2',
  );
  $user_acfs=array(
    'black_list_attiva',
    'black_user_disable',
    'user_roles',
  );
  // ---

  foreach ($functions as $key => $function) {
    if (function_exists($function)) {
      //echo $my_function." functions are available.<br />\n";
      //$tmp=call_user_func($function);
      $return['my_function'][$function]['exist']=true;
    }
    else {
      //echo $my_function." functions are not available.<br />\n";
      $return['my_function'][$function]['exist']=false;
      $error++;
      //importante per proseguire, quindi se errore > exit
      $return['error']=$error;
      return $return;
    }
  }

  foreach ($applications as $key => $application) {
    $array=geoinfo_v2_requirements_check_application($return,$error,$application);
    $return=$array[0];
    $error=$array[1];
  }

  foreach ($constants as $key => $constant) {
    if ( ! defined( $constant ) ) {
      $error++;
      $return['my_costant'][$constant]['value']='error';
    }
    else{
      $return['my_costant'][$constant]['value']=constant($constant);
    }
  }

  foreach ($hidden_constants as $key => $constant) {
    if ( ! defined( $constant ) ) {
      $error++;
      $return['my_hidden_costant'][$constant]['value']='error';
    }
    else{
      //How do you replace all characters except last 4 with asterisks in php
        //https://stackoverflow.com/questions/24278605/how-do-you-replace-all-characters-except-last-4-with-asterisks-in-php/24278672
      $hidden_constat = str_repeat('*', strlen(constant($constant)) - 4) . substr(constant($constant), -4);
      $return['my_hidden_costant'][$constant]['value']=$hidden_constat;
    }
  }

  foreach ($user_acfs as $key => $user_acf) {
    $return['my_user_acf'][]=$user_acf;
  }
  $return['my_user_acf']['note']='La verifica deve essere fatta manualmente';

  // ---

  if($error==0){
    $return['status']='ok';
  }
  else{
    $return['status']='ko';
  }
  $return['error']=$error;
  return $return;
}

function geoinfo_v2_requirements_check_application($array,$error,$my_application){

  //$my_application='geoinfo-azienda';
  if ( get_valore_application($my_application) ) {
    $array['my_application'][$my_application]['value']=get_valore_application($my_application);
  }
  else{
    $error++;
    $array['my_application'][$my_application]['value']='error';
  }
  $return=array(
    $array,
    $error
  );
  return $return;
}

// 3 wp_loaded >> After WordPress is fully loaded
add_action('wp_loaded', 'crea_global_output');
function crea_global_output(){

  global $output;
  $output = array();
  $output = json_geoInfo($output);

}

function json_geoInfo($output){

  $output['geoInfo']['wp_environment'] = WP_ENVIRONMENT;
  $output['geoInfo']['azienda'] = ERP_CLIENT;
  $output['geoInfo']['email_supporto'] = WEBMASTER;
  $output['geoInfo']['cms_name'] = CMS_NAME;

  $usr_set=get_usr_set();

  if($usr_set['typ']=='default'){
    define('FAVICON', DFL_FAVICON );
    define('LABEL_MAIN_LOGO', DFL_LABEL_MAIN_LOGO);
    define('LOGO_OWNER', DFL_LOGO_OWNER );
    define('LOGO_LOGIN', DFL_LOGO_LOGIN );
    define('USR_SET', 'default');
  }
  else{
    define('FAVICON',$usr_set['favicon']);
    define('LABEL_MAIN_LOGO',$usr_set['label_main_logo']);
    define('LOGO_OWNER',$usr_set['logo_owner']);
    define('LOGO_LOGIN',$usr_set['logo_login']);
    define('USR_SET', 'custom');
  }

  $output['geoInfo']['label_main_logo'] = LABEL_MAIN_LOGO;
  $output['geoInfo']['logo_owner'] = LOGO_OWNER;
  $output['geoInfo']['logo_login'] = LOGO_LOGIN;
  $output['geoInfo']['favicon'] = FAVICON;
  $output['geoInfo']['log_in_web_console'] = LOG_IN_WEB_CONSOLE;
  $output['geoInfo']['database'] = POSTGRES_DBNAME;//get_valore_application('postgres-dbname');
  $output['geoInfo']['http_host'] ='';
  //$output['geoInfo']['url'] = 'deprecated; you can use home_url instead of url';//get_option('siteurl');
  $output['geoInfo']['home_url']=site_url();
  //$output['geoInfo']['siteurl'] = 'obsolete - try with $output.geoInfo.url';//get_option( 'siteurl' ); //
  $output['geoInfo']['DOCUMENT_ROOT'] = $_SERVER['DOCUMENT_ROOT']; ///var/www/html
  $output['geoInfo']['home_project'] = HOME_PROJECT; //https://dev.watchdog.cloud
  $home_project_array = explode(":",$output['geoInfo']['home_project']);
  $output['geoInfo']['http'] = $home_project_array[0]; // https
  $output['geoInfo']['http_host'] = str_replace("//","",$home_project_array[1]); // dev.watchdog.cloud $_SERVER['HTTP_HOST']
  //$output['geoInfo']['HTTP_HOST'] = $_SERVER['HTTP_HOST']; //dev.watchdog.cloud
  //$output['geoInfo']['site_slug']='obsolete';//str_replace($output['geoInfo']['home_project']."/","",$output['geoInfo']['siteurl']); // wd03
  //$output['apiInfo']['theme_root']='obsolete - try with get_theme_root()';//get_theme_root();
  //$output['apiInfo']['wp_root_complete']='obsolete';//str_replace('/wp-content/themes', '', $output['apiInfo']['theme_root']);
  	$output['geoInfo']['WP_ROOT'] = str_replace('/wp-content/themes', '', get_theme_root()); // /wd03
  $output['geoInfo']['WP_ROOT'] = str_replace($output['geoInfo']['DOCUMENT_ROOT'], '', $output['geoInfo']['WP_ROOT']);
  //$output['global']['post'] = $post;
  //$output=json_apiInfo($output);
  return $output;

}

function json_apiInfo(){

  if(empty($output['geoInfo']['wp_environment'])){
    crea_global_output();
  }
  // https://codex.wordpress.org/Global_Variables
  global $post;
  global $output;
  //$output['apiInfo']['complete_url'] = 'obsolete';
  $output['apiInfo']['DOCUMENT_ROOT'] = $_SERVER['DOCUMENT_ROOT'];
  $output['apiInfo']['REQUEST_URI'] = $_SERVER['REQUEST_URI'];// \/wd03\/special\/map01\/
  $output['apiInfo']['current_url'] = substr($output['geoInfo']['home_project'], 0, -1) . $output['apiInfo']['REQUEST_URI']; // dev.watchdog.cloud/wd03/api/testforfunction/
  $output['apiInfo']['current_url_without_var_lang'] = str_replace('?language=it','',$output['apiInfo']['current_url'] );
  $output['apiInfo']['current_url_without_var_lang'] = str_replace('?language=en','',$output['apiInfo']['current_url_without_var_lang']); // dev.watchdog.cloud/wd03/api/testforfunction/

  $output['apiInfo']['allowed_roles'] = array('administrator','editor','author','subscriber');
  $output['apiInfo']['user_role']=array();//'';

  //only for cityplanner.biz
  $output['apiInfo']['page_license']=array('public');
  $output['apiInfo']['user'] = 'anonymous';
  //$output['apiInfo']['erp_page_status']='enable';
  $output['apiInfo']['erp_page_status']='public';  
  $output['apiInfo']['globalid']=0;
  $output['apiInfo']['globaltype']='nd';
  $output['apiInfo']['user_id'] = 0;
  $output['apiInfo']['user'] = 'anonymous';
  $output['apiInfo']['user_login'] = 'no-user';
  $output['apiInfo']['email'] = 'no-user';
  $output['apiInfo']['status']=$post->post_status; //publish, private
  $output['geoInfo']['structure']='type:'.$post->post_type.'|slug:'.$post->post_name; //publish, private

  return $output;

}


function get_usr_set(){
  
  $usr_set=array();
  
  $curr_user = wp_get_current_user();
  
  if(!empty($curr_user->ID)){

    $usr_set_json= get_url_usr_set();


    if (file_exists($usr_set_json)) {
      //"file_exists > read content";
      $obj = file_get_contents($usr_set_json);
      $json = json_decode($obj, true);

      if($json['typ']=='default'){
        $usr_set['typ']='default';
      }
      else{
        define('FAVICON',$json['favicon']);
        define('LABEL_MAIN_LOGO',$json['label_main_logo']);
        define('LOGO_OWNER',$json['logo_owner']);
        define('LOGO_LOGIN',$json['logo_login']); 
      }

    }
    else {

      //"file_no_exists > create deafult";
      write_usr_set(prepare_deafult_string_url_set());
      $usr_set['typ']='default';
  
    }

  }
  else{
    //no usr
    $usr_set['typ']='default';
  }

  return $usr_set;

}

function get_url_usr_set(){
  $curr_user = wp_get_current_user();
  
  $user = get_userdata($curr_user->ID);

    $WP_ROOT = str_replace('/wp-content/themes', '', get_theme_root()); // /wd03
  $WP_ROOT = str_replace($_SERVER['DOCUMENT_ROOT'], '', $WP_ROOT);

  $usr_set_json= $_SERVER['DOCUMENT_ROOT'].$WP_ROOT.'/tmp/settings_'.$user->user_login.'.json';

  return $usr_set_json;

}

function prepare_deafult_string_url_set(){
  $arr = array(
    'typ' => 'default', 
  );
  return $arr;
}

function write_usr_set($arr){

  $usr_set_json= get_url_usr_set();

  $string = json_encode($arr);

  $open = fopen( $usr_set_json, "w" );
  $write = fputs( $open, $string );
  fclose( $open );

}
