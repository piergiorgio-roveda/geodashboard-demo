<?php
function applications_requirements(){

  $return=array();
  $error=0;

  // ---
  $functions=array(
    'connessione_pdo_postgres',
  );
  $pg_tables=array(
    //'language_webapp',
  );
  $post_acfs=array(
    'javascript_start',
    'page_roles',
    'application_value',
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
      $return['status']='ko';
      $return['error']=$error;
      return $return;
    }
  }

  global $table_prefix;
  global $wpdb;

  foreach ($pg_tables as $key => $pg_table) {

    $dbh = connessione_pdo_postgres();
    $pgsql = "
    SELECT
      *
    FROM
      ".$pg_table."
    ";
    $sth = $dbh->prepare($pgsql);
    $sth->execute();

    if($sth->rowCount()>0){
      $return['my_pg_table'][$pg_table]['exist']=true;
    }
    else{
      $error++;
      $return['my_pg_table'][$pg_table]['exist']=false;
    }
    $dbh = null; // CLOSE CONNECTION

  }

  foreach ($post_acfs as $key => $post_acf) {
    $return['my_post_acf'][]=$post_acf;
  }
  $return['my_post_acf']['note']='La verifica deve essere fatta manualmente';

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


function get_valore_application($pagename,$field = null ){

    $arr=watchdog_language_webapp();

    $i=0;
    foreach ( $arr as $obj ) :
      if($obj['codice']==$pagename){
        $i++;
        $value = $obj['etichetta'];
      }
    endforeach;

    if($i>1){
      //my_console_log('get_valore_application >> Settaggio applicazione errato! - $pagename:'.$pagename.' - $field:'.$field,2);
      echo "Settaggio applicazione errato! (doppio valore per ".$pagename.")";
      exit;
    }
    elseif($i==1){
      //$pgrows = $sth->fetchAll();
      //foreach ( $pgrows as $pgobj ) :
      //  $value = $obj['etichetta'];
      //endforeach;
    }
    else{
      echo "Settaggio applicazione errato!";
      exit;    
    }

  return $value;

}
