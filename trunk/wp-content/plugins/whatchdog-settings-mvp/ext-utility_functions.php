<?php

function utility_functions_null_value_txt() {
  if ( get_valore_application('null_value_txt') ) {
    $val=get_valore_application('null_value_txt');
  }
  else{
    $val='Value n.d.';
  }
  global $null_value_txt;
  $null_value_txt = $val;
}
add_action( 'init', 'utility_functions_null_value_txt' );

function utility_functions_requirements(){

  $return=array();
  $error=0;

  // ---
  $applications=array(
    'null_value_txt',
  );
  // ---
  foreach ($applications as $key => $application) {
    $array=geoinfo_v2_requirements_check_application($return,$error,$application);
    $return=$array[0];
    $error=$array[1];
  }
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

function utility_functions_formatfieldval($val,$typ=null){

  $output['raw']=$val;

  if(is_null($val)){
    global $null_value_txt;
    $val=$null_value_txt;

    if($typ=='varchar'){
      $output['low']=strtolower($val);
      $output['upp']=strtoupper($val);
    }
    elseif($typ=='float8'){
      $output['m']=$val;
      $output['m1']=$val;
      $output['m2']=$val;
      $output['m3']=$val;
      $output['m4']=$val;
      $output['it_m']=$val;
      $output['it_m1']=$val;
      $output['it_m2']=$val;
      $output['it_m3']=$val;
      $output['it_m4']=$val;
    }
    elseif($typ=='int4'){
      $output['m']=$val;
      $output['it_m']=$val;
    }
  }
  else{
    if($typ=='varchar'){
      $output['low']=strtolower($val);
      $output['upp']=strtoupper($val);
    }
    elseif($typ=='float8'){
      $output['m']=round($val);
      $output['m1']=round($val,1);
      $output['m2']=round($val,2);
      $output['m3']=round($val,3);
      $output['m4']=round($val,4);
      $output['it_m']=number_format($output['m1'],0,",",".");
      $output['it_m1']=number_format($output['m1'],1,",",".");
      $output['it_m2']=number_format($output['m2'],2,",",".");
      $output['it_m3']=number_format($output['m3'],3,",",".");
      $output['it_m4']=number_format($output['m4'],4,",",".");
    }
    elseif($typ=='int4'){
      $output['m']=round($val);
      $output['it_m']=number_format($output['m'],0,",",".");
    }
  }
  return $output;
}

//Check variable is like a value from another variable in PHP
//https://stackoverflow.com/questions/4081203/check-variable-is-like-a-value-from-another-variable-in-php
function isLike($haystack, $needle) {
  $regex = '#^'.preg_quote($needle, '#').'$#i';
  //add support for wildcards
  $regex = str_replace(array('%', '_'), array('.*?', '.?'), $regex);
  return 0 != preg_match($regex, $haystack);
}


function DateIntervalToSec($start,$end){ // as datetime object returns difference in seconds

	// SOURCE know-how
  // AUTHOR PROVEDA
  // CREATE 180629
  // UPDATE 180629
  //++my_console_log('DateIntervalToSec($start='.$start.',$end='.$end.'',2);
	//$_SESSION['addon-geo'][] = 'f: DateIntervalToSec';

	$diff = $end->diff($start);
  $diff_sec = /*$diff->format('%R').*/( // prepend the sign - if negative, change it to R if you want the +, too
              ($diff->s)+ // seconds (no errors)
              (60*($diff->i))+ // minutes (no errors)
              (60*60*($diff->h))+ // hours (no errors)
              (24*60*60*($diff->d))+ // days (no errors)
              (30*24*60*60*($diff->m))+ // months (???)
              (365*24*60*60*($diff->y)) // years (???)
              );
  return $diff_sec;
}

function DateIntervalToDay($start,$end){ // as datetime object returns difference in seconds

  //++my_console_log('DateIntervalToSec($start='.$start.',$end='.$end.'',2);
	//$_SESSION['addon-geo'][] = 'f: DateIntervalToSec';

	$diff = $end->diff($start);
  $diff_day = $diff->format('%R').(
    // prepend the sign - if negative, change it to R if you want the +, too
    (($diff->d))+ // days (no errors)
    (30*($diff->m))+ // months (???)
    (365*($diff->y)) // years (???)
  );
  return $diff_day;
}

function array_to_string($arr){
	$return = var_export($arr, true);
	$return = trim(preg_replace('~[\r\n]+~', '', $return));
	return $return;
}

function compareOrderNo($elem1, $elem2) {


  return strcmp($elem1['order_no'], $elem2['order_no']);
}


function update_table_col_by_pid($o){
  
  $table=$o['update_table_col_by_pid']['table'];
  $pid=$o['update_table_col_by_pid']['pid'];
  $col=$o['update_table_col_by_pid']['col'];
  $val=$o['update_table_col_by_pid']['val'];
  $type=$o['update_table_col_by_pid']['type'];

  $o['dbInfo']=get_list_pg_tables();
  
  
  if($type=='text'){
    //$type="text";
    $val='\''.$val.'\'';
  }
  elseif($type==='radio'){
    //$type="text";
    $val='\''.$val.'\'';
  }
  elseif($type==='textarea'){
    //$type="text";
    $val='\''.$val.'\'';
  }
  elseif($type==='true_false'){
    //$type="text";
    $val='\''.$val.'\'';
  }				
  elseif($type==='date_picker'){
    //$type="text";
    $val='\''.$val.'\'';
  }
  elseif($type==='number'){
    //$type="numeric";
    $val=$val;
  }
  elseif($type==='null'){
    //$type="numeric";
    $val='null';
  }	  
  else{
    $type="%none%";
  }
  
  $pgsql = "
    UPDATE
      ".$o['dbInfo'][$table]."
    SET
      ".$col."=".$val."
    WHERE
      pid=".$pid."
  ";

  $dbh = connessione_pdo_postgres();
  
  $sth = $dbh->prepare($pgsql);
  $sth->execute();
  $dbh = null; // CLOSE CONNECTION  
  
  $o['geoQuery'][$o['datastring']['qy_name'].'2']['sql'][] = mypg_query_map01_a_clean_pgsql($pgsql);

  return $o;
}

function isMobile() {
  return preg_match("/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i", $_SERVER["HTTP_USER_AGENT"]);
}


function watchdog_Usr_InsertNew($o){

  $p['user_login'] = strtolower(sanitize_text_field($o['args']['d']));
  $p['user_email'] = strtolower(sanitize_text_field($o['args']['e']));
  $p['role'] = $o['args']['b'];

  if(!empty(username_exists($p['user_login']))){
    $p['status'] = 'user exist '.$p['user_login'];
    $o['response']='skip';  
  }
  else{
    global $wpdb;

    //insert user Wordpress
    if($o['args']['f'] == 'nd'){
      $o['args']['f'] = wp_generate_password( 12, true );
    }
    $userdata = array(
      'user_login'  =>  $p['user_login'],
      //'user_email'  =>  $email,
      'user_email'  =>  $p['user_email'],
      'user_pass'   =>  $o['args']['f'],  // When creating an user, `user_pass` is expected.
      'first_name'  =>  $o['args']['d'],
      'role' => $o['args']['b']
    );

    $p['user_id'] = wp_insert_user( $userdata ) ;

    if ( ! is_wp_error( $p['user_id'] ) ) {
      $p['status'] = 'ok';
      $o['response']='ok';
      $p['user-default-password'] = update_field(
        'user-default-password',
        $o['args']['f'],
        'user_'.$p['user_id']
      );
      $p['user_roles'] = update_field(
        'user_roles',
        array($o['args']['a']),
        'user_'.$p['user_id']
      );
      $p['scadenza_licenza'] = update_field(
        'scadenza_licenza',
        $o['args']['c'],
        'user_'.$p['user_id']
      );
    }
    else{
      $p['status'] = 'fail_insert_user';
      $o['response']='fail';
    }
  }

  $marker = array(
    'type' => 'Feature',
    'properties' => $p
  );

  $o['features'][] = $marker;
  unset($marker);

  return $o;

}

/**
 * Generate a random string, using a cryptographically secure 
 * pseudorandom number generator (random_int)
 * 
 * For PHP 7, random_int is a PHP core function
 * For PHP 5.x, depends on https://github.com/paragonie/random_compat
 * 
 * @param int $length      How many characters do we want?
 * @param string $keyspace A string of all possible characters
 *                         to select from
 * @return string
 */
function random_str(
  $length,
  $keyspace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
) {
  $str = '';
  $max = mb_strlen($keyspace, '8bit') - 1;
  if ($max < 1) {
      throw new Exception('$keyspace must be at least two characters long');
  }
  for ($i = 0; $i < $length; ++$i) {
      $str .= $keyspace[random_int(0, $max)];
  }
  return $str;
}

function isValidJSON($str) {
  json_decode($str);
  return json_last_error() == JSON_ERROR_NONE;
}

function clean($string) {
  $string = strtolower($string);
  $string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.

  return preg_replace('/[^A-Za-z0-9\-]/', '', $string); // Removes special chars.
}  