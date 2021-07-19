<?php
header('Content-type: application/json');
$o=array();

//collect $_POST
foreach ($_POST as $key => $value) {
  $o['datastring'][$key]=$_POST[$key];
}

if(isset($o['datastring']['action'])){
  
}
else{
  $o['datastring']['action'] = 'api-senza-action';
  echo json_encode( $o , JSON_PRETTY_PRINT );
  exit;
}

if($o['datastring']['action']=='send_msg_home2020'){
  $o['config']['user_email_default'] = 'lima.cityplanner@gmail.com';
  $o['variables']['subject']='Messagge from Home 2020';
  $msg = $o['datastring']['msg'];
  $o['variables']['message'] = $msg . ' - from ' . $o['datastring']['email'];
  $o=invia_email_gruppo('gruppoTmp',$o);
}
elseif($o['datastring']['action']=='send_msg_map2020'){
  $o['config']['user_email_default'] = 'lima.cityplanner@gmail.com';
  $o['variables']['subject']='Messagge from Map 2020';
  $msg = $o['datastring']['msg'];
  $o['variables']['message'] = $msg . ' - from ' . $o['datastring']['email'];
  $o=invia_email_gruppo('gruppoTmp',$o);
}

echo json_encode( $o , JSON_PRETTY_PRINT );
exit;

function invia_email_gruppo($gruppo,$o){

  $o=prepara_mail_01_headers($o);
  $utenti_per_email=array();
  $utenti_per_email[]='lima.cityplanner@gmail.com';
  $o['result']['send']['utenti_per_email']=$utenti_per_email;

  foreach ($utenti_per_email as $key => $value) {
    // Piergiorgio Roveda
    $o['email_send'] = wp_mail( $value, $o['variables']['subject'], $o['variables']['message'], $o['Content']['headers']);
    $o['result']['send'][$value][]=$o['result'];
  }

  return $o;
}

function prepara_mail_01_headers($o){

  // HEADERS
  $headers = "From: ".get_bloginfo( 'name' , 'display' )." <".$o['config']['user_email_default'].">" . PHP_EOL;
  $headers .= "Reply-To: ".$o['config']['user_email_default']."" . PHP_EOL;
  //$headers .= "CC: lima.cityplanner@gmail.com\r\n";
  $headers .= "MIME-Version: 1.0" . PHP_EOL;
  $headers .= 'Content-type: text/html; charset=utf-8' . PHP_EOL;
  $o['Content']['headers'] = $headers;

  return $o;

}