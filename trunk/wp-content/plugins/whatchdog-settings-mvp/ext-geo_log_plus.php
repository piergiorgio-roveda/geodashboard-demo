<?php
function geo_log_plus_requirements(){

  $return=array();
  $error=0;

  // ---
  $constants=array(
    'LOG_IN_WEB_CONSOLE',
  );
  $functions=array(
    'json_apiInfo',
    'pages_roles_v1_requirements',
  );  


  foreach ($constants as $key => $constant) {
    if ( ! defined( $constant ) ) {
      $error++;
      $return['my_costant'][$constant]['value']='error';
    }
    else{
      $return['my_costant'][$constant]['value']=constant($constant);
    }
  }  

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

  // ---
  $output = json_apiInfo();

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

function get_info_tracker(){

	if(!empty($_SERVER['HTTP_CLIENT_IP'])) {
		$ip = $_SERVER['HTTP_CLIENT_IP'];
	}
	elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
		$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
	}
	else {
		$ip = $_SERVER['REMOTE_ADDR'];
	}

  if(!empty($_SERVER['HTTP_REFERER'])){
  	$referer = $_SERVER['HTTP_REFERER'];
  }
  else{
  	$referer = '';
  }
	$now = DateTime::createFromFormat('U.u', microtime(true));
	$mydata_u = '#'.$now->format("Ymd-H:i:s.u");
  //echo "<br>>><br>SESSION<br>";
	//print_r(wp_get_session_token());
	$session_token = wp_get_session_token();
	//echo "<br>>><br>SESSION DESTORY<br>";
	//print_r(wp_destroy_current_session());

	$info_tracker = array(
		'ip' => $ip,
		'referer' => $referer,
		'now' => $now,
		'mydata_u' => $mydata_u,
		'session_token' => $session_token
  );
	return $info_tracker;

}


function my_console_log($text,$con_script=1){

	$status = LOG_IN_WEB_CONSOLE;
	if($status==1){

		// STEP 1
		if($con_script==1){
			?>
			  <script>//log('<?php echo $text;?>');</script>
			<?php
		}
		else if($con_script==0){
			?>
			  //log('<?php echo $text;?>');
			<?php
		}
		else if($con_script==2){

			// SOLO A STEP 2

		}
		else{

		}
		// STEP 2
		$geo_console = array(
			'text' => $text
	  );

	}

}

add_action( 'plugins_loaded', function () {

  $current_user = wp_get_current_user();
	$user = $current_user->user_login;  
  $info_tracker = get_info_tracker(); 

  $postdata_params='{
    "geouser":"'.$user.'",
    "ref":"",
    "current_url":"'.$_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'].'",
    "action":"plugins_loaded2",
    "note":"",
    "ip":"'.$info_tracker['ip'].'",
    "referer":"'.$info_tracker['referer'].'",
    "attachment":"",
    "session_token":"'.$info_tracker['session_token'].'"
  }';


  watchdog_geo_log_plus($postdata_params);

});

function watchdog_geo_log_plus($postdata_params){

  $postdata_array=    array(
    'apiFunctionName' => 'watchdog_geo_log_plus',
    'apiKey' => WD_KEY,
    'apiToken' => WD_TOKEN,
    'params' => $postdata_params
  );

  $postdata = http_build_query($postdata_array);

  $opts = array('http' =>
    array(
      'method'  => 'POST',
      'header'  => 'Content-type: application/x-www-form-urlencoded',
      'content' => $postdata
    )
  );
  
  $context = stream_context_create($opts);
  
  //$result = file_get_contents('http://example.com/submit.php', false, $context);
  
  $json = file_get_contents(WD_API, false, $context);
  //print_r($json);
  //$obj = json_decode($json,true);
  
  //exit;
  //$o['features']=$obj;
  //echo '<script apiKey="3fbytmc50s165hv" name="simple_log"></script>';

}