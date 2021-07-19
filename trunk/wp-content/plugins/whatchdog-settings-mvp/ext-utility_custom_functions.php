<?php

function utility_custom_functions_v1_requirements(){

  $return=array();
  $error=0;

  // ---
  /*
  foreach ($applications as $key => $application) {
    $array=geoinfo_check_application($return,$error,$application);
    $return=$array[0];
    $error=$array[1];
  }
  */
  user_token($o['apiInfo']['user_login']);
  
  $tmp_return=check_important_files_are_safe();
  $return['important_files']=$tmp_return;
  $error=$error+$tmp_return['error'];
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

function clear_folder_files($folder,$ext,$prefix='none'){
  $output = json_apiInfo();

  //important for saving important files
  $tmp_return=check_important_files_are_safe();
  if($tmp_return['error']>0){
    print_r($tmp_return);
    exit;
  }
  else{
    //remove pdf files in folder
    $server_path=$output['geoInfo']['DOCUMENT_ROOT'] . $output['geoInfo']['WP_ROOT'];
    $dir = $server_path.'/'.$folder;
    //https://electrictoolbox.com/php-glob-find-files/
    $files_in_tmp = glob($dir."/*.".$ext);
    foreach ($files_in_tmp as $key => $file) {
      if($prefix=='none'){
        echo "filename match without prefix: ".basename($file)."<br>\n\r";
        unlink($file);
      }
      elseif(strpos(basename($file),$prefix) === 0) {
        // It starts with 'match'
        echo "filename match: ".basename($file)."<br>\n\r";
        //https://www.php.net/manual/en/function.unlink.php
        //Then unlink :)
        unlink($file);      
      }
      else{
        echo "filename dont\'t match: ".basename($file)."<br>\n\r";
      }
    }
  }
}

function check_important_files_are_safe(){
  $error=0;
  
  //check file 1
  $file1=get_valore_application('client_pdf');
  $file2=get_valore_application('output_prefix');
  if(strpos($file1,$file2) === 0) {
    $error++;
    $return[$file1]['msg']='Important file have same prefix of output that will be unlink!';
    $return[$file1]['error']=1;
  }
  else{
    //echo "filename dont\'t match: ".basename($file)."<br>\n\r";
    $return[$file1]['error']=0;
  }

  //if there is another file for check
  $return['error']=/*$return[$file1]['error']+*/$error;

  return $return;
}

function clean_text_for_csv($csv_row){

  $csv_row=str_replace('€','Euro',$csv_row);
  $csv_row=str_replace('à','a\'',$csv_row);
  $csv_row=str_replace('è','e\'',$csv_row);
  $csv_row=str_replace('é','e\'',$csv_row);
  $csv_row=str_replace('ì','i\'',$csv_row);
  $csv_row=str_replace('ò','o\'',$csv_row);
  $csv_row=str_replace('ù','u\'',$csv_row);

  return $csv_row;

}

function reset_user_position($o){
  $string = $o['apiInfo']['user_login'];
  $string .= "|".$o['datastring']['lat'];
  $string .= "|".$o['datastring']['lng'];
  $string .= "|".$o['datastring']['current_zoom'];

  $o['last_position_'.$o['apiInfo']['user_login']]=$string;

  $file = $o['geoInfo']['DOCUMENT_ROOT'].$o['geoInfo']['WP_ROOT'].'/tmp/last_position_'.$o['apiInfo']['user_login'].'.csv';
  $open = fopen( $file, "w" );
  $write = fputs( $open, $string );
  fclose( $open );
  
  return $o;
}

function is_wplogin(){
  $ABSPATH_MY = str_replace(array('\\','/'), DIRECTORY_SEPARATOR, ABSPATH);
  return ((in_array($ABSPATH_MY.'wp-login.php', get_included_files()) || in_array($ABSPATH_MY.'wp-register.php', get_included_files()) ) || (isset($_GLOBALS['pagenow']) && $GLOBALS['pagenow'] === 'wp-login.php') || $_SERVER['PHP_SELF']== '/wp-login.php');
}


add_action( 'init', 'isw_add_rules' );
function isw_add_rules(){


  add_rewrite_rule(
    '^webgis/([^/]*)/?',
    'index.php?page_id=9774&mypage=$matches[1]',
    'top'
  );


  add_rewrite_rule(
    '^maplibrary/([^/]*)/?',
    'index.php?page_id=9634&mypage=$matches[1]',
    'top'
  );
   

  add_rewrite_tag('%mypage%','([^&]+)');

  flush_rewrite_rules();

}

function create_youtube_frame($id){
  $html='<iframe width="100%" height="455" 
  src="https://www.youtube.com/embed/'.$id.'" 
  title="YouTube video player" 
  frameborder="0" allow="accelerometer; 
  autoplay; clipboard-write; encrypted-media; 
  gyroscope; picture-in-picture" allowfullscreen></iframe>';
  return $html;
}

function dfl_custom_head($m){

  $m['custom_head'][]='bootstrap-5.0.1';
  $m['custom_head'][]='alertifyjs_1.13.1';
  $m['custom_head'][]='font-awesome4.7.0';
  $m['custom_head'][]='wd_template_style';
  $m['custom_head'][]='ARIELOZAM-CyberWeb-UI-FromFuture';

  return $m;
}

function dfl_custom_script($m){

  $m['custom_script'][]='jquery-3.5.1';
  $m['custom_script'][]='bootstrap-5.0.1';
  $m['custom_script'][]='alertifyjs_1.13.1';
  $m['custom_script'][]='autonumeric-1.9.46';
  $m['custom_script'][]='wd_geovar';
  $m['custom_script'][]='wd_general_script';
  $m['custom_script'][]='login-try-for-free';
  $m['custom_script'][]='ajs_create_dialog';
  $m['custom_script'][]='wd_generic_api';
  $m['custom_script'][]='message-from-the-deep';

  return $m;
}