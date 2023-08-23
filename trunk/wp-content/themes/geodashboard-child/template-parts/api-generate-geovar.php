<?php

  header('Content-type: application/json');

  $o = json_apiInfo();



  $globalid=$o['apiInfo']['globalid'];//get_the_ID();

  $erp_page_status=$o['apiInfo']['erp_page_status'];
  if( $erp_page_status=='public' || $erp_page_status=='enable' ){

  }
  else{
    output_json_pretty($globalid,$o);
  }

  // ACTION
  if(isset($_POST['action'])){
    $o['datastring']['action'] = $_POST['action'];
  }
  else{
    $o['datastring']['action'] = 'API senza post action';
  }

  $string = "var geovar = new Array();\r\n";


  $string .= "geovar.home_url = '".$o['geoInfo']['home_url']."';\r\n";
  $string .= "geovar.environment = '".WP_ENVIRONMENT."';\r\n";
  $string .= "geovar.home_project = '".$o['geoInfo']['home_project']."';\r\n";

  $i = 0;
  
  $pgrows = watchdog_language_webapp();

  //$i=0;

  $string .= "// -- language_webapp group array;\r\n";
  //$group=array();

  foreach ( $pgrows as $pgobj ) :
    if($pgobj['mygroup']){
      $group[]=$pgobj['mygroup'];
    }
  endforeach;
  //print_r($group);
  $group_unique = array_unique($group);
  
  foreach ( $group_unique as $v ) :
    $string .= "geovar." .$v."=new Array();\r\n";
    //$string .= "geovar." .$v.".items=new Array();\r\n";
    $string .= "geovar." .$v.".slug=new Array();\r\n";
  endforeach;

  $string .= "// -- language_webapp;\r\n";
  $slugs=array();
  foreach ( $pgrows as $pgobj ) :

    $etichetta = $pgobj['etichetta'];
    $i++;
    //if($i<5){
    //$value = $pgobj[$array_val[3]];
    if($pgobj['mygroup']){

      $group=$pgobj['mygroup'];
      $slug=$pgobj['slug'];
      $codice=$pgobj['codice'];

      if (!in_array($slug, $slugs)) {
        array_push($slugs, $slug);
        $string .= "geovar." .$group.".".$slug." =new Array();\r\n";
        $string .= "geovar." .$group.".slug.push('".$slug."');\r\n";
      }
      if(is_array($etichetta)){
        $string .= "geovar." .$group.".".$slug.".".$codice." =new Array();\r\n";
        $string .= "geovar." .$group.".".$slug.".".$codice.".group =new Array();\r\n";
        foreach ($etichetta as $key => $value) {
          $string .= "geovar." .$group.".".$slug.".".$codice.".".$key." =new Array();\r\n";
          $string .= "geovar." .$group.".".$slug.".".$codice.".group.push('".$key."')".";\r\n";
          foreach ($value as $k => $v) {
            # code...
            $string .= "geovar." .$group.".".$slug.".".$codice.".".$key.".".$k." = '".$v."';\r\n";
          }
        }
      }
      else{
        $etichetta = str_replace("'","\'",$etichetta);
        $string .= "geovar." .$group.".".$slug.".".$codice." = '".$etichetta."';\r\n";
      }      
      //$string .= "geovar." .$pgobj['mygroup'].".items.push('".$pgobj['codice']."');\r\n";
      //if($pgobj['mytype']=='label'){
        //$string .= "geovar." .$pgobj['mygroup'].".slug.push('".$pgobj['codice']."');\r\n";
        //$string .= "geovar." .$pgobj['mygroup'].".slug = '".$pgobj['codice']."';\r\n";
      //}
    }    
    elseif($pgobj['mytype']=='array'){
      $etichetta = str_replace("'","\'",$etichetta);
      $string .= "var " . $pgobj['codice'] . " = " . $etichetta .";\r\n";
    }
    elseif($pgobj['mytype']=='tb'){
      $string .= "geovar.".$pgobj['codice']."=new Array();\r\n";
      $string .= "geovar.".$pgobj['codice'].".cols_show=new Array();\r\n";
      //$string .= "var " . $pgobj['codice'] . " = '" . $etichetta ."';\r\n";
      //$string .= "geovar.".$pgobj['codice']."=new Array();\r\n";
    }
    else{
      $etichetta = str_replace("'","\'",$etichetta);
      $string .= "var " . $pgobj['codice'] . " = '" . $etichetta ."';\r\n";
    }


    //}
  endforeach;

  $string .= "// -- language_webapp - END
  ";

  $i = 0;
  $string .= "// -- colonne_webapp;\r\n";
  $pgrows = watchdog_colonne_webapp();

  foreach ( $pgrows as $pgobj ) :

    $i++;
    //$value = $pgobj[$array_vsal[3]];
    //$string .= "var eti_" . $pgobj['id'] . " = '" . $pgobj['etichetta_applicazione'] ."';\r\n";
    //$string .= "var uni_" . $pgobj['id'] . " = '" . $pgobj['unita_misura'] ."';\r\n";
    //$string .= "var formato_" . $pgobj['id'] . " = '" . $pgobj['formato'] ."';\r\n";
    //$string .= "var input_typ_" . $pgobj['id'] . " = '" . $pgobj['input_typ'] ."';\r\n";
    $string .= "geovar." .$pgobj['mylayer'].".".$pgobj['id']."=new Array();\r\n";
    $string .= "geovar." .$pgobj['mylayer'].".".$pgobj['id'].".eti = '".$pgobj['etichetta_applicazione']."';\r\n";
    $string .= "geovar." .$pgobj['mylayer'].".".$pgobj['id'].".uni = '".$pgobj['unita_misura']."';\r\n";
    $string .= "geovar." .$pgobj['mylayer'].".".$pgobj['id'].".req = '".$pgobj['required']."';\r\n";
    $string .= "geovar." .$pgobj['mylayer'].".".$pgobj['id'].".cat = '".$pgobj['cat']."';\r\n";
    $string .= "geovar." .$pgobj['mylayer'].".".$pgobj['id'].".formato = '".$pgobj['formato']."';\r\n";
    $string .= "geovar." .$pgobj['mylayer'].".".$pgobj['id'].".input_typ = '".$pgobj['input_typ']."';\r\n";
    $string .= "geovar." .$pgobj['mylayer'].".".$pgobj['id'].".decode = '".$pgobj['decode']."';\r\n";

    if($pgobj['hidden']==0){ // for form
      $string .= "geovar." .$pgobj['mylayer'].".cols_show.push('".$pgobj['id']."');\r\n";
    }
  endforeach;
  $string .= "// -- colonne_webapp - END
  ";

  //$string .= "//An extract of address points from the LINZ bulk extract: http://www.linz.govt.nz/survey-titles/landonline-data/landonline-bde\r\n";
  //$string .= "//Should be this data set: http://data.linz.govt.nz/#/layer/779-nz-street-address-electoral/\r\n";
  //$string .= "var addressPoints = [\r\n";
  //$o['datastring']['collection']='all';
  //$o['dbInfo']=get_list_pg_tables();
  //$o['datastring']['qy_name']='A';
  //$o['datastring']['collection']='all-heat';
  //if (in_array('advanced', $o['apiInfo']['user_license'])) {
  //  $o['user_license']='advanced';
  //}
  //elseif(in_array('premium', $o['apiInfo']['user_license'])) {
    //$o['user_license']='premium';
  //}
  //else{
  //  output_json_pretty($globalid,$o);
  //}   
  //$o=view_lyr1($o);

  //foreach ( $o['features'] as $val ) :
  //  $string .= "[".$val['properties']['pinlat'].",".$val['properties']['pinlng'].",'1'],";
  //endforeach;
  //unset($o['features']);  
  //$string .= "[0, 0, '0']\r\n";
  //$string .= "];\r\n";




  $file = $o['geoInfo']['DOCUMENT_ROOT'].$o['geoInfo']['WP_ROOT'].'/tmp/geovar.js';

  $open = fopen( $file, "w" );
  $write = fputs( $open, $string );
  fclose( $open );

  output_json_pretty($globalid,$o);

?>
