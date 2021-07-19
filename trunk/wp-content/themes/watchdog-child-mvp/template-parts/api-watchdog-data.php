<?php
header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
$o=array();

//collect $_POST
foreach ($_POST as $key => $value) {
  $o['ds'][$key]=$_POST[$key];
}

if(isset($o['ds']['action'])){
  
}
else{
  $o['ds']['action'] = 'api-senza-action';
  echo json_encode( $o , JSON_PRETTY_PRINT );
  exit;
}

if($o['ds']['action'] == 'view-random-message'){
  $o['ds']['qy_name']='A';  
  $o=view_random_message($o);
}
elseif($o['ds']['action'] == 'test-watchdogpgapi'){

  $postdata = http_build_query(
    array(
      'apiKey' => WD_KEY,
      'apiToken' => WD_TOKEN,
      'params' => '{"servizio":1,"comune":"PERUGIA"}'
    )
  );

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
  $obj = json_decode($json,true);
  $o['features']=$obj;
  //print_r($obj);
  //exit;
}
elseif($o['ds']['action'] == 'test-grid-hex'){

  $postdata = http_build_query(
    array(
      'apiKey' => WD_KEY,
      'apiToken' => WD_TOKEN,
      'params' => '{"servizio":2}'
    )
  );

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
  $obj = json_decode($json,true);
  $o['features']=$obj;
  //print_r($obj);
  //exit;
}
elseif($o['ds']['action'] == 'watchdog-tagmanager'){

  $current_user = wp_get_current_user();
	$user = $current_user->user_login;  
  $info_tracker = get_info_tracker(); 

  $postdata_params='{
    "geouser":"'.$user.'",
    "ref":"'.$o['ds']['myFunction'].'",
    "current_url":"'.$_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'].'",
    "action":"watchdog-tagmanager",
    "note":"",
    "ip":"'.$info_tracker['ip'].'",
    "referer":"'.$info_tracker['referer'].'",
    "attachment":"",
    "session_token":"'.$info_tracker['session_token'].'"
  }';


  watchdog_geo_log_plus($postdata_params);

}
elseif($o['ds']['action'] == 'view-geodata-city-new'){


  $postdata = http_build_query(
    array(
      //'apiFunctionName' => 'view_geodata_city',
      'apiFunctionName' => 'dev_cityplanner_postgis',
      'apiKey' => WD_KEY,
      'apiToken' => WD_TOKEN,
      'params' => '{
        "geouser":"test",
        "api_lyr":"view_geodata_city",
        "mydb":"geosystem14dev",
        "t":"w"
      }'
    )
  );

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
  $obj = json_decode($json,true);

  //for testing raw response
  //print_r($json);
  //for testing json response
  //print_r($json);
  //exit;
  $i=0;
  foreach ( $obj['dataArray'] as $pgobj ) :
    $i++;  
    $p=array();
    
    $p['myname'] = $pgobj['myname'];
    $p['short_descr'] = $pgobj['short_descr'];
    $p['pid'] = $pgobj['pid'];
    $g = json_decode($pgobj['geojson'], true); 

    $marker = array(
      'type' => 'Feature',
      'properties' => $p,
      'geometry' => $g
    ); 

    $o['features'][] = $marker;
    unset($marker);      
  endforeach;//$pgrows
  //print_r($obj);
  //exit;
  $qy=$o['ds']['qy_name'];
  $o['geoQuery'][$qy]['iTotalRecords'] = $i;
}
elseif($o['ds']['action'] == 'view-geodata-city-hash'){

  if($o['ds']['current_zoom']<=12){
    $hash_lv=5;
  }
  elseif($o['ds']['current_zoom']<=14){
    $hash_lv=6;
  }
  elseif($o['ds']['current_zoom']<=16){
    $hash_lv=7;
  }
  elseif($o['ds']['current_zoom']<=18){
    $hash_lv=8;
  }
  else{
    $hash_lv=9;
  }
  $postdata = http_build_query(
    array(
      //'apiFunctionName' => 'view_geodata_city',
      'apiFunctionName' => 'dev_cityplanner_postgis',
      'apiKey' => WD_KEY,
      'apiToken' => WD_TOKEN,
      'params' => '{
        "geouser":"test",
        "api_lyr":"view_geodata_city_hash",
        "mydb":"geosystem14dev",
        "hash_lv":"'.$hash_lv.'"
      }'
    )
  );

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
  $obj = json_decode($json,true);

  //for testing raw response
  //print_r($json);
  //for testing json response
  //print_r($json);
  //exit;
  $i=0;
  foreach ( $obj['dataArray'] as $pgobj ) :
    $i++;  
    $p=array();
    
    $p['count'] = $pgobj['count'];
    $p['geohash'] = $pgobj['geohash'];
    $g = json_decode($pgobj['geojson'], true); 

    $marker = array(
      'type' => 'Feature',
      'properties' => $p,
      'geometry' => $g
    ); 

    $o['features'][] = $marker;
    unset($marker);      
  endforeach;//$pgrows
  //print_r($obj);
  //exit;
  $qy=$o['ds']['qy_name'];
  $o['geoQuery'][$qy]['iTotalRecords'] = $i;
}
elseif($o['ds']['action'] == 'view-geodata-city-new-bound'){

  $postdata = http_build_query(
    array(
      'apiFunctionName' => 'view_geodata_city_bound',
      'apiKey' => WD_KEY,
      'apiToken' => WD_TOKEN,
      'params' => '{"geouser":"test",
        "mye":"'.$o['ds']['mye'].'",
        "myw":"'.$o['ds']['myw'].'",
        "myn":"'.$o['ds']['myn'].'",
        "mys":"'.$o['ds']['mys'].'",
        "limit":"'.$o['ds']['limit'].'"}'
    )
  );

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
  $obj = json_decode($json,true);

  foreach ( $obj['dataArray'] as $pgobj ) :
    
    $p=array();
    
    $p['myname'] = $pgobj['myname'];
    $p['short_descr'] = $pgobj['short_descr'];
    $p['pid'] = $pgobj['pid'];
    $g = json_decode($pgobj['geojson'], true); 

    $marker = array(
      'type' => 'Feature',
      'properties' => $p,
      'geometry' => $g
    ); 

    $o['features'][] = $marker;
    unset($marker);      
  endforeach;//$pgrows    
  //print_r($obj);
  //exit;
}
elseif($o['ds']['action'] == 'view_lyr2_all'){ //view-geodata-city-hexes


  $postdata = http_build_query(
    array(
      //'apiFunctionName' => 'view_geodata_city',
      'apiFunctionName' => 'dev_cityplanner_postgis',
      'apiKey' => WD_KEY,
      'apiToken' => WD_TOKEN,
      'params' => '{
        "geouser":"test",
        "api_lyr":"view_geodata_hexes",
        "mydb":"watchdog",
        "t":"w"
      }'
    )
  );

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
  $obj = json_decode($json,true);

  //for testing raw response
  //print_r($json);
  //for testing json response
  //print_r($json);
  //exit;
  $i=0;
  foreach ( $obj['dataArray'] as $pgobj ) :
    $i++;  
    $p=array();
    
    //$p['myname'] = $pgobj['myname'];
    $p['lat'] = $pgobj['lat'];
    $p['lng'] = $pgobj['lng'];
    $g = json_decode($pgobj['geojson'], true); 

    $marker = array(
      'type' => 'Feature',
      'properties' => $p,
      'geometry' => $g
    ); 

    $o['features'][] = $marker;
    unset($marker);      
  endforeach;//$pgrows
  //print_r($obj);
  //exit;
  $qy=$o['ds']['qy_name'];
  $o['geoQuery'][$qy]['iTotalRecords'] = $i;
}
elseif($o['ds']['action'] == 'home-insert-try-for-free'){

  $body = 'email > '.$o['ds']['form_email'];
  $body .= 'nickname > '.$o['ds']['form_mickname'];
  $body .= 'password > '.$o['ds']['form_password'];
  $headers = array('Content-Type: text/html; charset=UTF-8');
  wp_mail(
    'lima.cityplanner@gmail.com',
    'cityplanner.biz - new user registration',
    $body,
    $headers
  );

  $postdata = http_build_query(
    array(
      //'apiFunctionName' => 'view_geodata_city',
      'apiFunctionName' => 'dev_cityplanner_postgis',
      'apiKey' => WD_KEY,
      'apiToken' => WD_TOKEN,
      'params' => '{
        "geouser":"test",
        "api_lyr":"home-insert-try-for-free",
        "mydb":"watchdog",
        "form_email":"'.$o['ds']['form_email'].'",
        "form_nickname":"'.$o['ds']['form_mickname'].'",
        "form_password":"'.$o['ds']['form_password'].'"
      }'
    )
  );  
  //print_r($postdata);
  //exit;
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
  //exit;  
  $obj = json_decode($json,true);

  $i=0;
  foreach ( $obj['dataArray'] as $pgobj ) :
    $i++;
    $p=array();
    
    $p['pid'] = $pgobj['pid'];

    $marker = array(
      'type' => 'Feature',
      'properties' => $p
    ); 

    $o['features'][] = $marker;
    unset($marker);      
  endforeach;//$pgrows    
  //print_r($obj);
  //exit;
}
elseif($o['ds']['action'] == 'view_lyr4_all'){ //view-geodata-city-hexes


  $postdata = http_build_query(
    array(
      //'apiFunctionName' => 'view_geodata_city',
      'apiFunctionName' => 'dev_cityplanner_postgis',
      'apiKey' => WD_KEY,
      'apiToken' => WD_TOKEN,
      'params' => '{
        "geouser":"test",
        "api_lyr":"view_lyr4_all",
        "mydb":"watchdog",
        "current_zoom":"'.$o['ds']['current_zoom'].'",
        "min_e":"'.$o['ds']['min_e'].'",
        "min_w":"'.$o['ds']['min_w'].'",
        "min_n":"'.$o['ds']['min_n'].'",
        "min_s":"'.$o['ds']['min_s'].'"
      }'
    )
  );

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
  $obj = json_decode($json,true);

  //for testing raw response
  //$obj['success']=0;
  //for testing json response
  if($obj['success']==1){

  }
  else{
    print_r($json);
    exit;
  }
  

  $i=0;
  foreach ( $obj['dataArray'] as $pgobj ) :
    $i++;  
    $p=array();
    
    //$p['myname'] = $pgobj['myname'];
    $p['hash'] = $pgobj['hash'];
    $p['count'] = $pgobj['count'];
    $g = json_decode($pgobj['geojson'], true); 

    $marker = array(
      'type' => 'Feature',
      'properties' => $p,
      'geometry' => $g
    ); 

    $o['features'][] = $marker;
    unset($marker);      
  endforeach;//$pgrows
  //print_r($obj);
  //exit;
  $qy=$o['ds']['qy_name'];
  $o['geoQuery'][$qy]['iTotalRecords'] = $i;
}
//tmp
$o['type']='FeatureCollection';
$o['status']='ok';
$qy=$o['ds']['qy_name'];
$o['geoQuery'][$qy]['iTotalRecords'] = 1;
$o['geoQuery']['iTotalRecords'] = $o['geoQuery'][$qy]['iTotalRecords'];

echo json_encode( $o , JSON_PRETTY_PRINT );
exit;


function view_random_message($o){

  $qy=$o['ds']['qy_name'];
  $o['geoQuery'][$qy]['iTotalRecords'] = 1;
  $o['geoQuery']['iTotalRecords'] = $o['geoQuery'][$qy]['iTotalRecords'];

  //$json = file_get_contents('https://donjon.bin.sh/scifi/random/rpc.cgi?type=Corporate+World+Problem&n=10');
  //$obj = json_decode($json,true);
  //$msg=$obj[0];

  $input = watchdog_character_webapp();
  $people=$input['people'];
  //$rand_keys = array_rand($input, 2);
  $rand_keys = array_rand($people, 1);

  $chr = $people[$rand_keys];

  $CorporateWorldProblem=$input['CorporateWorldProblem'];

  $rand_keys = array_rand($CorporateWorldProblem, 1);

  $msg = $CorporateWorldProblem[$rand_keys];

  $p=array();
  
  $p['name'] = $chr['name'];
  $p['msg']=$msg;
  $p['bandColor']=$chr['bandColor'];
  //$g = json_decode($pgobj['geojson'], true); 
  $g=json_decode('{
    "type": "Point",
    "coordinates": [
      '.$chr['coords'][1].',
      '.$chr['coords'][0].'
    ]
  }', true);

  $marker = array(
    'type' => 'Feature',
    'properties' => $p,
    'geometry' => $g
  );

  $o['features'][] = $marker;
  unset($marker);      


  return $o;
}