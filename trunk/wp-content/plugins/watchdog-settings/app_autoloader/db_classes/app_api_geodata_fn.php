<?php 
/*
 * This file is part of the "Another" suite of products.
 *
 * 
 *
 */

if ((!defined('CONST_INCLUDE_KEY')) || (CONST_INCLUDE_KEY !== 'd4e2ad09-b1c3-4d70-9a9a-0e6149302486')) {
  // if accessing this class directly through URL, send 404 and exit
  // this section of code will only work if you have a 404.html file in your root document folder.
  header("Location: /404.html", TRUE, 404);
  echo file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/404.html');
  die;
}

class MYPDF extends TCPDF {

}

// //use FlexiblePolyline\FlexiblePolyline;
// class MyFlexiblePolyline extends FlexiblePolyline {

// }

// //use Abraham\TwitterOAuth\TwitterOAuth;
// class MyTwitterOAuth extends Abraham\TwitterOAuth\TwitterOAuth {

// }

//----------------------------------------------------------------------------------------------------------------------
class App_API_Geodata_fn extends Data_Access {

	//protected $object_name = 'pg_cittametropolitane';
	protected $object_view_name = 'example_tb';

	//----------------------------------------------------------------------------------------------------
	public function __construct() {
    // attempt database connection
    $res = $this->dbConnect();
    
    // if we get anything but a good response ...
    if ($res['response'] != '200') {
      echo "Houston? We have a problem.";
      die;
    }
	}

  //----------------------------------------------------------------------------------------------------	
  public function test($o=array()){

    $o['response']='200';
    $o['message']='test';
    return $o;

  }

  //----------------------------------------------------------------------------------------------------	
  public function output_json_pretty3($o,$output_type=0){

    if (array_key_exists('_hide', $o)) {
      $ds=$o['_hide']['ds'];

      if (isset($ds['apiFunctionName'])){
        if($ds['apiFunctionName'] != 'getToken'){
          unset($o['features']['token']);
        }
      }
      else{
        unset($o['features']['token']);
      }

      $o['ds']=$o['_hide']['ds'];

      if (isset($ds['secretKey'])){
        unset($o['_hide']['secretKey']);
        unset($o['ds']['secretKey']);
      }

      unset($o['method']);
      unset($o['dataArray']);
      unset($o['dataCols']);
      //unset($o['geoQuery']);
      unset($o['geoFiles']);
      if(isset($ds['env'])){
        if($ds['env']==1){
          unset($o['_hide']['_egon']);
        }
        elseif($ds['env']==2){
          //$resOk['_hide']['msg']=$o['_hide']['msg'];
        }  
        else{
          //$resOk['_hide']=$o['_hide'];
        }
      }
      else{
        unset($o['_hide']);
      }
      if ($o['response'] == '200') {
        $o['status']='OK';
      }
    }

    if($output_type==1){
      unset($o['geoInfo']);
      unset($o['apiInfo']);
      unset($o['dbInfo']);
      unset($o['ds']);
    }

    //
    header('Content-type: application/json');
    //error_reporting(E_ALL);
    //ini_set('display_errors', 'on');
    //ini_set('memory_limit', '200M');
    echo (json_encode($o, JSON_PRETTY_PRINT));
    exit;

  }

  //----------------------------------------------------------------------------------------------------	
  public function fail_and_exit($o,$code,$note=''){

    $responseArray=App_Response::getResponse($code);
    $o['response'] = $responseArray['response'];
    $o['error_message']=$responseArray['responseDescription'].' '.$note;
    $o['status']='REQUEST_DENIED';

		if(isset($o['msg']) 
			&& !empty($o['msg'])){
      $o['msg']=$o['msg'];
		}
    $this->output_json_pretty3($o,1);

  }

  //----------------------------------------------------------------------------------------------------	
  public function json_clean_pgsql($pgsql){

    $clean = str_replace(array("\n", "\r"), '', $pgsql);
    return $clean;
  }

  //----------------------------------------------------------------------------------------------------	
  public function list_to_geojson($dataArray,$master=false){

    $i=0;

    $json_obj=array();
    //$json_obj_tmp=[];

    //create cols from dataArray
    $cols=array();
    $keys = array_keys($dataArray[0]);
    foreach ($keys as $value) {
      if (!is_numeric($value)) {
        if($value!='geom'){
          array_push($cols,$value);
        }
      }
    }
    
    foreach ( $dataArray as $pgobj ) :

      $i++;  
      $p=array();
      
      foreach ($cols as $key => $value) {

        $result_only_for_error = json_decode((string)$pgobj[$value]);

        if($value=='geojson'){
          $g = json_decode($pgobj['geojson'], true);
        }
        elseif (json_last_error() === JSON_ERROR_NONE) {
          $p[$value] = json_decode((string)$pgobj[$value]);
        }
        else{
          $p[$value] = $pgobj[$value];
        }

        // OR this is equivalent

        //if (json_last_error() === 0) {
        //    // JSON is valid
        //}

      }

      $marker = array(
        'type' => 'Feature',
        'properties' => $p
      );
      if(!empty($g)){
        $marker['geometry']=$g;
      }

      if($master==false){
        $json_obj['features'][] = $marker;
      }
      else{
        $json_obj_tmp[$pgobj['g_master']][] = $marker;
      }
      unset($marker);

    endforeach;//$pgrows

    if($master==false){
      $json_obj['type']='FeatureCollection';
      $json_obj['iTotalRecords']=$i;
    }
    else{
      foreach ($json_obj_tmp as $key => $value) {
        $json_obj[]=array(
          'type'=>'FeatureCollection',
          'name'=>$key,
          'features'=>$value
        );
      }
    }
    
    return $json_obj;

  }

  //----------------------------------------------------------------------------------------------------	
  public function json_output($filename,$foldername){
    $baseurl=$file = $_SERVER['DOCUMENT_ROOT'];
    $path='/watchdogpgapi/static/'.$foldername.'/';
    $fileurl=$baseurl.$path.$filename;
    $string = file_get_contents($fileurl);
    $json_a = json_decode($string, true);
    //echo $json_a['John'][status];
    //echo $json_a['Jennifer'][status];
    return $json_a;
  }

  //----------------------------------------------------------------------------------------------------	
  public function check_ds_required($ds,$req){
    $o=array();
    foreach ($req as $value) {
      $search_array = $ds;
      if (!array_key_exists($value, $search_array)) {
        $this->fail_and_exit(
          $o,
          'e000',
          'Missed ds '.$value.'.'
        );
      }
    }

  }

  //----------------------------------------------------------------------------------------------------	
  public function write_json($o,$name,$json_obj,$filename,$path){
    $cApp_fn = new App_API_Geodata_fn;

    $ds=$o['_hide']['ds'];

    //$baseurl = $_SERVER['DOCUMENT_ROOT'];
    //$path='/watchdogpgapi/static/map003/';

    $fileurl=$path.$filename;

    $o['geoFiles'][$name]=array(
      $path,
      $filename,
      $fileurl
    );

    $string=json_encode($json_obj,  JSON_NUMERIC_CHECK);

    $f = fopen($fileurl, 'w');
    if (!$f) {
      //die('Error creating the file ' . $file);
      $cApp_fn->fail_and_exit(
        $o,
        'e000',
        'Error creating the file ' . $file.'.'
      );
    }

    $write = fputs( $f, $string );
    fclose($f);

    return $o;
  }

  //----------------------------------------------------------------------------------------------------	
  public function get_table_meta($table_slug,$mapslug='generic'){

    // echo "get_table_meta > path to dev " . $table;
    // exit;

    // $base_url=str_replace('api/geodata/','meta/',$_SERVER['REQUEST_URI']);
    // $path=ABSPATH;

    // if($mapslug=='generic'){
    //   $name='geovar_tb';
    //   $filename=$name.'.json';
    //   $json_url=$path.'meta/'.$filename;
    // }
    // else{
    //   // $name='geovar_map_tb';
    //   // $filename=$name.'.json';
    //   // $json_url=$path.'webgis/'.$mapslug.'/'.$filename;
    //   $name='geovar_map_tb';
    //   $path=ABSPATH.'meta/';
    //   $filename=$mapslug.'_'.$name.'.json';
    //   $json_url=$path.$filename;
    // }

    // $geovar_tb_json = file_get_contents($json_url);
    // $geovar_tb = json_decode($geovar_tb_json, true);
    // foreach ($geovar_tb as $key => $value) {
    //   if($table==$value['name']){
    //     $meta=$value['features'];
    //   }
    // }

    $query = "
      SELECT 
        *
      FROM
        ".GEOVAR_TB." foo
      WHERE
        post_status='publish'
        AND g_master = '".$table_slug."'

    ";

    $tmpres = $this->getResultSetArray($query);
    $f=array();
    foreach($tmpres['dataArray'] as $key => $value){
      $f[]=array('properties'=>$value);
    }
    //$f=array('properties'=>$tmpres['dataArray'][0]);

    $meta=$f;

    return $meta;
  }

  //----------------------------------------------------------------------------------------------------	
  public function get_lyr_meta($lyr,$mapslug='map999'){

    //echo "get_table_meta > path to dev";
    //exit;

    // $base_url=str_replace('api/geodata/','meta/',$_SERVER['REQUEST_URI']);
    // $path=ABSPATH;
    // $name='geovar_lyr';
    // $filename=$name.'.json';
    // $json_url=$path.'webgis/'.$mapslug.'/'.$filename;

    $name='tb_lyr';
    // $path=ABSPATH.'meta/';
    // $filename=$name.'.json';
    // $json_url=$path.$filename;

    // $json_obj = file_get_contents($json_url);

    //$json_obj = $cApp_fn->geovar_to_json(strtoupper($name));

    $meta=$this->get_table_meta_from_db(strtoupper($name));
    $cols=array();
    foreach ($meta as $k2 => $p) {
      if($p['g_meta']==true){
        $cols[]=$p['g_slug'];
      }
    }
    $table_name=$this->get_real_table_prop(strtoupper($name));

    $query = "
      SELECT 
        ".implode( ",", $cols )."
      FROM
        ".$table_name." foo
      WHERE
        post_status='publish'
        AND g_slug='".$lyr."'
      ORDER BY pid
    ";

    //--
    
    $tmpres = $this->getResultSetArray($query);
    $f=array('properties'=>$tmpres['dataArray'][0]);

    // $json = json_decode($json_obj, true);
    // foreach ($json['features'] as $key => $f) {
    //   $p=$f['properties'];
    //   if($lyr==$p['g_slug']){
    //     $meta=$f;
    //   }
    // }

    $meta=$f;

    return $meta;

  }

  //----------------------------------------------------------------------------------------------------	
  public function get_map_meta($mapslug){//DEV

    //echo "get_table_meta > path to dev";
    //exit;

    // $base_url=str_replace('api/geodata/','meta/',$_SERVER['REQUEST_URI']);
    // //$path=ABSPATH;
    // //$name='geovar_map';
    // //$filename=$name.'.json';
    // //$json_url=$path.'webgis/'.$mapslug.'/'.$filename;

    // $name=$mapslug.'_geovar_map';
    // $path=ABSPATH.'meta/';
    // $filename=$name.'.json';
    // $json_url=$path.$filename;

    // $json_obj = file_get_contents($json_url);
    // $json = json_decode($json_obj, true);
    // foreach ($json['features'] as $key => $f) {
    //   $p=$f['properties'];
    //   if($mapslug==$p['g_slug']){
    //     $meta=$f;
    //   }
    // }

    $query = "
      SELECT 
        *
      FROM
        tb_map foo
      WHERE
        post_status='publish'
        AND g_slug IN (
          '".$mapslug."'
        )
    ";

    $tmpres = $this->getResultSetArray($query);
    $f=array('properties'=>$tmpres['dataArray'][0]);

    $meta=$f;

    return $meta;

  }

  //----------------------------------------------------------------------------------------------------	
  public function get_map_tb_meta($mapslug,$table_slug){//DEV

    //echo "get_table_meta > path to dev";
    //exit;

    // $base_url=str_replace('api/geodata/','meta/',$_SERVER['REQUEST_URI']);
    // $path=ABSPATH;
    // $name='geovar_map_tb';
    // $filename=$name.'.json';
    // $json_url=$path.'webgis/'.$mapslug.'/'.$filename;

    $name='geovar_tb';
    $path=ABSPATH.'meta/';
    $filename=$name.'.json';
    $json_url=$path.$filename;

    $json_obj = file_get_contents($json_url);
    $json = json_decode($json_obj, true);

    foreach ($json as $key => $obj) {
      if($obj['name']==$table_slug){
        $meta=$obj['features'];
      }
    }
    
    return $meta;
  }

  //----------------------------------------------------------------------------------------------------	
  public function get_maps_meta(){//DEV

    $name='tb_map';
    $path=ABSPATH.'meta/';
    $filename=$name.'.json';
    $json_url=$path.$filename;

    $json_obj = file_get_contents($json_url);
    $json = json_decode($json_obj, true);

    $meta=$json;

    return $meta;
  }

  //----------------------------------------------------------------------------------------------------	
  public function get_real_table_prop($g_slug,$field='g_label'){//DEV


    $query = "
      SELECT 
        *
      FROM
        ".GEOVAR_MASTER." foo
      WHERE
        post_status='publish'
        AND g_slug='".$g_slug."'
      LIMIT 1
    ";


    $tmpres = $this->getResultSetArray($query);
    if($field=='g_label'){
      $res=$tmpres['dataArray'][0]['g_label'];
    }
    elseif($field=='all'){
      $res=$tmpres['dataArray'][0];
    }
    else{
      echo "param 'field' not valid, try 'all' or 'g_label'.";
      exit;
    }


    return $res;
  }

  //----------------------------------------------------------------------------------------------------	
  public function geovar_to_json($g_slug){//DEV

    $meta=$this->get_table_meta_from_db($g_slug);
    $cols=array();
    foreach ($meta as $k2 => $p) {
      if($p['g_meta']==true){
        $cols[]=$p['g_slug'];
      }
    }

    $table_name=$this->get_real_table_prop($g_slug);

    $query = "
      SELECT 
        ".implode( ",", $cols )."
      FROM
        ".$table_name." foo
      WHERE
        post_status='publish'
      ORDER BY pid
    ";
    //--
    
    $tmpres = $this->getResultSetArray($query);

    if(!empty($tmpres['dataArray'][0]['g_master'])){
      $json_obj=$this->list_to_geojson($tmpres['dataArray'],true);
    }
    else{
      $json_obj=$this->list_to_geojson($tmpres['dataArray']);
    }
    
    //$name=strtolower($value['g_slug']);

    return $json_obj;
  }

  //----------------------------------------------------------------------------------------------------	
  public function geovar_to_json_mapslug($g_label,$gMapSlug){//DEV

    $query = "
      SELECT 
        *
      FROM
        tb_map foo
      WHERE
        post_status='publish'
        AND g_slug IN (
          '".$gMapSlug."'
        )
    ";

    $tmpres = $this->getResultSetArray($query);

    if ($tmpres['response'] != '200') {

      //no MAPSLUG in db

      $this_name='A';
      $this_features='features';
      $o['type']='FeatureCollection';
      $o[$this_features]=array();
      $o['geoQuery'][$this_name]['iTotalRecords'] = 1;
      $json_obj=$o;

    }
    else{

      $map_obj=$tmpres['dataArray'][0];

      //--
      if($g_label=='geovar_map'){
        
        $dataArray=array();
        $dataArray[]=$map_obj;
        $json_obj=$this->list_to_geojson($dataArray);
        //$name=strtolower($value['g_slug']);
        //$path=ABSPATH.'webgis/'.$map_obj['g_slug'].'/';
        //$path=substr(ABSPATH, 0, -1).str_replace(get_site_url(), "", get_stylesheet_directory_uri()).'/dist/map/'.$map_obj['g_slug'].'/';
        // $name='geovar_map';
        // $path=ABSPATH.'meta/';
        // $filename=$map_obj['g_slug'].'_'.$name.'.json';

        // $o=$cApp_fn->write_json($o,'A',$json_obj,$filename,$path);
      }
      elseif($g_label=='geovar_lyr'){

        $meta=$this->get_table_meta_from_db('TB_LYR');
        $cols_lyr=array();
        foreach ($meta as $k2 => $p) {
          if($p['g_meta']==true){
            $cols_lyr[]=$p['g_slug'];
          }
        }

        // if(!empty($map_obj['g_lyr'])){
          // $arr_lyr=[];
          // foreach (json_decode($map_obj['g_lyr'],true) as $key => $lyr){

          //   $arr_lyr[]="'".$lyr."'";

          // }

          $query = "
            SELECT 
              ".implode( ",", $cols_lyr )."
            FROM
              tb_lyr foo
            WHERE
              post_status='publish'
            ORDER BY pid
            --LIMIT 10
          ";

          $tmpres2 = $this->getResultSetArray($query);
          
          if ($tmpres2['response'] != '200') {
            $json_obj=array();
          }
          else{
            $json_obj=$this->list_to_geojson($tmpres2['dataArray']);
          }

        // }
        // else{
        //   $json_obj=array();
        // }

      }
      elseif($g_label=='geovar_map_tb'){

        $meta=$this->get_table_meta_from_db('GEOVAR_TB');
        $cols_tb=array();
        foreach ($meta as $k2 => $p) {
          if($p['g_meta']==true){
            $cols_tb[]=$p['g_slug'];
          }
        }

        if(!empty($map_obj['g_table'])){
          $arr_tb=[];
          foreach (json_decode($map_obj['g_table'],true) as $key => $tb){

            $arr_tb[]="'".$tb['slug']."'";

          }
          //g_master, g_slug, data_type, pid, g_preview, g_meta
          $query = "
            SELECT 
              ".implode( ",", $cols_tb )."
            FROM
              geovar_tb foo
            WHERE
              post_status='publish'
              AND g_master IN (" . implode(',', $arr_tb) . ")
            ORDER BY g_order,pid
            --LIMIT 10
          ";

          $tmpres2 = $this->getResultSetArray($query);

          if ($tmpres2['response'] != '200') {
            $json_obj=array();
          }
          else{
            $json_obj=$this->list_to_geojson($tmpres2['dataArray'],true);
          }

        }
        else{
          $json_obj=array();
        }

      }
      elseif($g_label=='geovar_lyr_style'){

        /* $meta=$this->get_table_meta_from_db('TB_LYR');
        $cols_lyr=array();
        foreach ($meta as $k2 => $p) {
          if($p['g_meta']==true){
            $cols_lyr[]=$p['g_slug'];
          }
        } */

        // if(!empty($map_obj['g_lyr'])){
          // $arr_lyr=[];
          // foreach (json_decode($map_obj['g_lyr'],true) as $key => $lyr){

          //   $arr_lyr[]="'".$lyr."'";

          // }

          $query = "
            SELECT 
              *
            FROM
              tb_lyr_style foo
            WHERE
              post_status='publish'
            ORDER BY myorder
            --LIMIT 10
          ";

          $tmpres2 = $this->getResultSetArray($query);
          
          if ($tmpres2['response'] != '200') {
            $json_obj=array();
          }
          else{
            $json_obj=$this->list_to_geojson($tmpres2['dataArray']);
          }

        // }
        // else{
        //   $json_obj=array();
        // }

      }

    }


    return $json_obj;

  }

  //----------------------------------------------------------------------------------------------------	
  public function geovar_to_json_wiki($g_label,$item_token){//DEV

    $query = "
      SELECT 
        *
      FROM
        wiki_tb_posts foo
      WHERE
        post_status='publish'
        AND item_token IN (
          '".$item_token."'
        )
    ";

    $tmpres = $this->getResultSetArray($query);

    if ($tmpres['response'] != '200') {

      //no MAPSLUG in db

      $this_name='A';
      $this_features='features';
      $o['type']='FeatureCollection';
      $o[$this_features]=array();
      $o['geoQuery'][$this_name]['iTotalRecords'] = 1;
      $json_obj=$o;

    }
    else{

      $map_obj=$tmpres['dataArray'][0];

      //--
      if($g_label=='geovar_wiki'){
        
        $dataArray=array();
        $dataArray[]=$map_obj;
        $json_obj=$this->list_to_geojson($dataArray);

      }

    }

    return $json_obj;

  }

  //----------------------------------------------------------------------------------------------------	
  public function get_maps_meta2(){//DEV

    $name='tb_map';
    // $path=ABSPATH.'meta/';
    // $filename=$name.'.json';
    // $json_url=$path.$filename;

    // $json_obj = file_get_contents($json_url);
    // $json = json_decode($json_obj, true);
    $json = $this->geovar_to_json(strtoupper($name));
    $meta=$json;

    return $meta;
  }

  //----------------------------------------------------------------------------------------------------	
  public function get_tb_meta($table_slug){//DEV

    //echo "get_table_meta > path to dev";
    //exit;

    // $base_url=str_replace('api/geodata/','meta/',$_SERVER['REQUEST_URI']);
    // $path=ABSPATH;
    // $name='geovar_map_tb';
    // $filename=$name.'.json';
    // $json_url=$path.'webgis/'.$mapslug.'/'.$filename;

    $name='geovar_tb';
    // $path=ABSPATH.'meta/';
    // $filename=$name.'.json';
    // $json_url=$path.$filename;

    // $json_obj = file_get_contents($json_url);
    // $json = json_decode($json_obj, true);

    // foreach ($json as $key => $obj) {
    //   if($obj['name']==$table_slug){
    //     $meta=$obj['features'];
    //   }
    // }
    $meta=$this->get_table_meta_from_db(strtoupper($name));
    $cols=array();
    foreach ($meta as $k2 => $p) {
      if($p['g_meta']==true){
        $cols[]=$p['g_slug'];
      }
    }
    $table_name=$this->get_real_table_prop(strtoupper($name));

    $query = "
      SELECT 
        ".implode( ",", $cols )."
      FROM
        ".$table_name." foo
      WHERE
        post_status='publish'
        AND g_master='".$table_slug."'
      ORDER BY pid
    ";

    //--
    
    $tmpres = $this->getResultSetArray($query);
    $meta=$tmpres['dataArray'];

    return $meta;
  }

  //----------------------------------------------------------------------------------------------------	
  public function get_tb_cols_preview($table_slug,$serie='default'){//DEV

    $tb_meta = $this->get_tb_meta($table_slug);

    $cols=array();
    foreach ($tb_meta as $k2 => $p) {
      if($p['g_preview']==true || $p['g_preview']==1){
        
        $os = json_decode($p['g_serie_m'],true);
        if (in_array($serie, $os)) {
          $cols[]=$p['g_slug'];
        }
        
      }
    }

    return $cols;
    exit;

  }

  //----------------------------------------------------------------------------------------------------	
  public function get_mapuser_meta(){

    /*$user_id=2;

    $userobj = get_userdata( $user_id );

    $str = 'wd_user-'.date('Y-m-d H:i:s');

    update_user_meta( $user_id, 'wd_token', md5($str) );

    print_r(get_user_meta(2));
    exit;*/

    $curr_user = wp_get_current_user();
    
    if(!empty($curr_user->ID)){

      $query = "
        SELECT 
          item_token, watchlist,user_role
        FROM
          geovar_user foo
        WHERE
          wp_user_id=".$curr_user->ID."
          AND post_status='publish' 
      ";

      $tmpres = $this->getResultSetArray($query);
      if ($tmpres['response'] != '200') {

        $query = "
          INSERT INTO geovar_user(wp_user_id)
          VALUES (".$curr_user->ID.")
          RETURNING pid;
        ";
        $tmpres = $this->getResultSetArray($query);

      }

      // USER
      //$curr_user = wp_get_current_user();
      //$output['apiInfo']['user_id'] = $curr_user->ID;
      //$output['apiInfo']['user_role'][] = $curr_user->roles[0];

      $dataArray[]=array(
        'user_id'=>$curr_user->ID,
        'user_role'=>json_decode($tmpres['dataArray'][0]['user_role'],true),//$curr_user->roles[0],
        'user_token'=>$tmpres['dataArray'][0]['item_token'],
        'watchlist'=>json_decode($tmpres['dataArray'][0]['watchlist'],true)
      );

    }
    else{
      $dataArray[]=array(
        'user_id'=>0,
        'user_role'=>array('guest'),
        'user_token'=>'0x0',
        'watchlist'=>''
      );
    }
    
    return $dataArray;
  }

  //----------------------------------------------------------------------------------------------------	
  public function get_table_meta_from_db($table){

    $query = "
      SELECT 
        *
      FROM
        ".GEOVAR_TB." foo
      WHERE
        post_status='publish'
        AND g_master='".$table."'
      ORDER BY g_order,pid
    ";

    //--

    $tmpres = $this->getResultSetArray($query);

    if ($tmpres['response'] != '200') {
      $tmpres['dataArray'][]=array();
    }

    $meta=$tmpres['dataArray'];
    
    return $meta;

  }

  //----------------------------------------------------------------------------------------------------	

  public function invio_immagine($ds){

    //questa variabile è enorme e quindi non viene salvata in output


    $p=array();
    $p['mydata_u'] = '0000';//$ds['mydata_u'];

    $upload_dir = 'tmp/';  //implement this function yourself
    
    $img = $ds['photo'];
    unset($ds['photo']);

    $img = str_replace('data:image/png;base64,', '', $img);
    $img = str_replace(' ', '+', $img);
    $data = base64_decode($img);

    $token_img = wp_generate_password( 6, false );

    $p['token_img'] = $token_img;

    $file = $upload_dir . $token_img .'-'. $p['mydata_u'] . '.png';

    $success = file_put_contents($file, $data);

    return $file;

  }

  //----------------------------------------------------------------------------------------------------	

  public function crea_pdf_con_immagine($ds){
    //echo wp_generate_password( 6, false );
    //exit;
    //$pdf=$this->php_tcpdf_start();
    
    // create new PDF document
    $pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

    // remove default header/footer
    $pdf->setPrintHeader(false);
    $pdf->setPrintFooter(false);

    // set default header data
    //$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE.' 001', PDF_HEADER_STRING, array(0,64,255), array(0,64,128));
    //$pdf->setFooterData(array(0,64,0), array(0,64,128));

    // set header and footer fonts
    //$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
    //$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

    // set default monospaced font
    $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

    // set margins
    $pdf->SetMargins(0,0,0,0);
    //$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
    //$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

    // set auto page breaks
    $pdf->SetAutoPageBreak(FALSE, 0);

    // set image scale factor
    //$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
    $pdf->setImageScale(1);

    // set some language-dependent strings (optional)
    if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
      require_once(dirname(__FILE__).'/lang/eng.php');
      $pdf->setLanguageArray($l);
    }

    // ---------------------------------------------------------

    // set default font subsetting mode
    $pdf->setFontSubsetting(true);

    $pdf->SetFont('helvetica','',10);

    // ---------------------------------------------------------

    if($ds['model']=='A001'){

      //_rint_r($ds['properties']);
      //exit;

      //PAGE 0
      $pdf->AddPage('L');

      //72 pixels = 72 points = 1 inch = 2.54 cm = 25.4 mm
      //72 pixel : 25.4 mm = x : 297 mm
      //287*72/25.4
      //$pixel1=287*72/25.4;
      $box_jpg_width_mm = 287;
      $pixel1=$box_jpg_width_mm*72/25.4;
      $html='<img src="'.ABSPATH . ''.$ds['img'].'" style="width:'.$pixel1.'px;"/>';

      //#writeHTMLCell
        // w, h, x, y, 
        // html = '', 
        // border = 0, ln = 0, 
        // optional
        // fill = 0, 
        // reseth = true, 
        // align = '',
        // autopadding = true

      $W=297-10;
      $H=210-10;
      $X=5;
      $Y=5;
      $B=0;
      $LN=0;
      //$pdf->writeHTMLCell($W,$H,$X,$Y,$html,$B,$LN);

      // -- set new background ---
      // set bacground image
      $img_file =ABSPATH . $ds['img'];
      // get the current page break margin
      $bMargin = $pdf->getBreakMargin();
      // get current auto-page-break mode
      $auto_page_break = $pdf->getAutoPageBreak();
      // disable auto-page-break
      $pdf->SetAutoPageBreak(false, 0);
      // set bacground image
      //$img_file = K_PATH_IMAGES.'image_demo.jpg';
      $pdf->Image($img_file, 0, 0, 297, 210, '', '', '', false, 300, '', false, false, 0);
      // restore auto-page-break status
      $pdf->SetAutoPageBreak($auto_page_break, $bMargin);
      // set the starting point for the page content
      $pdf->setPageMark();

      //$html='<div style="background-color:#FFFC00;width:500px;" padding="30px" ><span style="margin:100px;">'.$ds['properties']['comm_name'].'</span></div>';
      $html='
        <table border="0" style="padding-left: 10px; padding-top: 5px; padding-bottom: 5px; background-color:#FFFC00;">
        <tr>
        <td>'.$ds['properties']['comm_name'].'</td>
        </tr>
        </table>
      ';
      $W=80;
      $H=10;
      $X=5;
      $Y=200;
      $B=0;
      $LN=0;
      $pdf->writeHTMLCell($W,$H,$X,$Y,$html,$B,$LN);

    }
    else if($ds['model']=='A002'){

      //_rint_r($ds['properties']);
      //exit;

      //PAGE 0
      $pdf->AddPage('L');

      //72 pixels = 72 points = 1 inch = 2.54 cm = 25.4 mm
      //72 pixel : 25.4 mm = x : 297 mm
      //287*72/25.4
      //$pixel1=287*72/25.4;
      $box_jpg_width_mm = 287;
      $pixel1=$box_jpg_width_mm*72/25.4;
      $html='<img src="'.ABSPATH . ''.$ds['img'].'" style="width:'.$pixel1.'px;"/>';

      //#writeHTMLCell
        // w, h, x, y, 
        // html = '', 
        // border = 0, ln = 0, 
        // optional
        // fill = 0, 
        // reseth = true, 
        // align = '',
        // autopadding = true

      $W=297-10;
      $H=210-10;
      $X=5;
      $Y=5;
      $B=0;
      $LN=0;
      //$pdf->writeHTMLCell($W,$H,$X,$Y,$html,$B,$LN);

      // -- set new background ---
      // set bacground image
      $img_file =ABSPATH . $ds['img'];
      // get the current page break margin
      $bMargin = $pdf->getBreakMargin();
      // get current auto-page-break mode
      $auto_page_break = $pdf->getAutoPageBreak();
      // disable auto-page-break
      $pdf->SetAutoPageBreak(false, 0);
      // set bacground image
      //$img_file = K_PATH_IMAGES.'image_demo.jpg';
      $pdf->Image($img_file, 0, 0, 297, 210, '', '', '', false, 300, '', false, false, 0);
      // restore auto-page-break status
      $pdf->SetAutoPageBreak($auto_page_break, $bMargin);
      // set the starting point for the page content
      $pdf->setPageMark();

      //$html='<div style="background-color:#FFFC00;width:500px;" padding="30px" ><span style="margin:100px;">'.$ds['properties']['comm_name'].'</span></div>';
      // $html='
      //   <table border="0" style="padding-left: 10px; padding-top: 5px; padding-bottom: 5px; background-color:#FFFC00;">
      //   <tr>
      //   <td>'.$ds['properties']['comm_name'].'</td>
      //   </tr>
      //   </table>
      // ';
      $W=80;
      $H=10;
      $X=5;
      $Y=200;
      $B=0;
      $LN=0;
      $pdf->writeHTMLCell($W,$H,$X,$Y,$html,$B,$LN);

    }
    else{
      echo "No model.";
      exit;
    }
    

    // END END

    $pdf_prefix='report';
    $filelocation = ABSPATH . '';
    $now = date_create('now')->format('His');
    $p['file'] = ''
      .$pdf_prefix.'-'
      .'agency'.'-'
      .str_replace(":", "", '0000').'-'
      .$now
      .'.pdf';

    // set document information
    $pdf->SetCreator('PDF_CREATOR');
    $pdf->SetAuthor('ERP_CLIENT');
    $pdf->SetTitle('REPORT');
    $pdf->SetSubject('agency');
    $pdf->SetKeywords('PDF, report');

    $pdf->Output($filelocation.'tmp/'.$p['file'], 'F');

    //---
    $marker = array(
      'type' => 'Feature',
      'properties' => $p
    );
    //$o['pdf_url']=$o['geoInfo']['home_url'].'/'.$p['file'];
    //$o['pdf_filename']=$p['file'];
    //$o['features'][] = $marker;
    //unset($marker); 

    //$qy_name=$o['datastring']['qy_name'];
    //$o['geoQuery'][$qy_name]['iTotalRecords'] = 1;
    //$o['geoQuery'][$qy_name]['sql'][] = 'SELECT';

    return $p['file'];

  }

  //----------------------------------------------------------------------------------------------------	

  public function pdf0_header($o,$pdf){

    $html='';
    $pdf->writeHTMLCell(
      $o['header']['w'], $o['header']['h'],
      $o['header']['l'],$o['header']['t'],
      $html,$o['temp']['borderweight'],
      $o['temp']['ln'],$o['temp']['fill'],$o['temp']['reseth'],
      $o['temp']['align'],$o['temp']['autopadding']
    );

    $c='h01A';
    $o[$c]['w']=$o['header']['w'];
    $o[$c]['h']=$o['header']['h'];
    $o[$c]['l']=$o['header']['l'];
    $o[$c]['t']=$o['header']['t'];
    $o[$c]['align']='C';
    $html='
    <img src="" style="height:35px"/>
    ';
    $pdf->writeHTMLCell(
    $o[$c]['w'],$o[$c]['h'],
    $o[$c]['l'],$o[$c]['t'],
    $html,$o['temp']['borderweight'],
    $o['temp']['ln'],$o['temp']['fill'],$o['temp']['reseth'],
    $o['temp']['align'],$o['temp']['autopadding']
    );

    $style = array('width' => 5, 'cap' => 'butt', 'join' => 'miter', 'dash' => 0, 'color' => array(255,255,255));

    $pdf->Line(
      0,$o['h01A']['t']+$o['h01A']['h']-9,
      $o['page']['w'],$o['h01A']['t']+$o['h01A']['h']-9,
      $style
    );

    return $o;
  }

  //----------------------------------------------------------------------------------------------------	

  public function pdf0_footer($o,$pdf){

    $html='';
    $pdf->writeHTMLCell(
      $o['footer']['w'],$o['footer']['h'],
      $o['footer']['l'],$o['footer']['t'],
      $html,$o['temp']['borderweight'],
      $o['temp']['ln'],$o['temp']['fill'],$o['temp']['reseth'],
      $o['temp']['align'],$o['temp']['autopadding']
    );

    $c='f01A';
    $o[$c]['w']=40;
    $o[$c]['h']=$o['footer']['h'];
    $o[$c]['l']=$o['footer']['l'];
    $o[$c]['t']=$o['footer']['t']+3;
    $o[$c]['align']='C';
    $html='
    <span style="text-align:center;font-size:8px;color:#005095;">
      Area mandato aggiornata al '.date("d.m.Y").'
    </span>
    ';
    $pdf->writeHTMLCell(
      $o[$c]['w'],$o[$c]['h'],
      $o[$c]['l'],$o[$c]['t'],
      $html,$o['temp']['borderweight'],
      $o['temp']['ln'],$o['temp']['fill'],$o['temp']['reseth'],
      $o['temp']['align'],$o['temp']['autopadding']
    );

    $c='f01D';
    $o[$c]['w']=40;
    $o[$c]['h']=$o['footer']['h'];
    $o[$c]['l']=$o['page']['w']-$o['page']['margin']-$o[$c]['w'];
    $o[$c]['t']=$o['footer']['t']+4;
    $o[$c]['align']='C';
    $html='ERP_CLIENT';
    $pdf->writeHTMLCell(
      $o[$c]['w'],$o[$c]['h'],
      $o[$c]['l'],$o[$c]['t'],
      $html,$o['temp']['borderweight'],
      $o['temp']['ln'],$o['temp']['fill'],$o['temp']['reseth'],
      $o['temp']['align'],$o['temp']['autopadding']
    );

    $c='f01C';
    $o[$c]['w']=40;
    $o[$c]['h']=$o['footer']['h'];
    $o[$c]['l']=$o['f01D']['l']-$o[$c]['w'];
    $o[$c]['t']=$o['footer']['t']+4;
    $o[$c]['align']='C';
    $html='';
    $pdf->writeHTMLCell(
      $o[$c]['w'],$o[$c]['h'],
      $o[$c]['l'],$o[$c]['t'],
      $html,$o['temp']['borderweight'],
      $o['temp']['ln'],$o['temp']['fill'],$o['temp']['reseth'],
      $o['temp']['align'],$o['temp']['autopadding']
    );

    $c='f01B';
    $o[$c]['w']=$o['footer']['w']-$o['f01A']['w']-$o['f01D']['w']-$o['f01C']['w'];
    $o[$c]['h']=$o['footer']['h'];
    //$o[$c]['l']=$o['f01A']['l']+$o['f01A']['w'];
    $o[$c]['l']=($o['page']['w']/2)-($o[$c]['w']/2);
    $o[$c]['t']=$o['footer']['t']+2;
    $o[$c]['align']='C';
    //$pdf->setCellPaddings(0, 10, 0, 0); //$left,$top,$right,$bottom
    $html='

    ';
    $pdf->writeHTMLCell(
      $o[$c]['w'],$o[$c]['h'],
      $o[$c]['l'],$o[$c]['t'],
      $html,$o['temp']['borderweight'],
      $o['temp']['ln'],$o['temp']['fill'],$o['temp']['reseth'],
      $o['temp']['align'],$o['temp']['autopadding']
    );

    $style = array('width' => 0.2, 'cap' => 'butt', 'join' => 'miter', 'dash' => 0, 'color' => array(194,194,194));

    $pdf->Line(
      0,$o['footer']['t'],
      $o['page']['w'],$o['footer']['t'],
      $style
    );

    return $o;
  }

  //----------------------------------------------------------------------------------------------------	

  public function pdfw($o,$pdf,$c,$style=null){

    if(!empty($o[$c]['borderweight'])){
      $borderweight=$o[$c]['borderweight'];
    }
    else{
      $borderweight=$o['temp']['borderweight'];
    }

    if(!empty($o[$c]['align'])){
      $align=$o[$c]['align'];
    }
    else{
      $align='C';
    }

    //#writeHTMLCell(w, h, x, y, html = '', 
    //border = 0, ln = 0, fill = 0, reseth = true, align = '', autopadding = true) ⇒ Object
    $pdf->writeHTMLCell(
      $o[$c]['w'],$o[$c]['h'],
      $o[$c]['l'],$o[$c]['t'],
      $o[$c]['html'],
      $borderweight,
      $o['temp']['ln'],
      $o['temp']['fill'],
      $o['temp']['reseth'],
      $align,
      $o['temp']['autopadding']
    );

    $pdf->SetLineStyle(array('width' => 0.2, 'cap' => 'butt', 'join' => 'miter', 'dash' => 0, 'color' => array(91, 91, 91)));
    if($o['temp']['borderweight']>0){
      $pdf->SetXY($o[$c]['l'],$o[$c]['t']);
      // text on top
      $pdf->Cell(30, 0, $c, 0, $ln=0, 'L', 0, '', 0, false, 'T', 'T');
    }
    return $o;
  }

  //----------------------------------------------------------------------------------------------------	
  public function php_heremaps_flexible_polyline_start(){

    $FlexiblePolyline = new MyFlexiblePolyline();
    return $FlexiblePolyline;

  }

  //----------------------------------------------------------------------------------------------------	
  public function php_TwitterOAuth(){

    $twitterConsumerKey=TWITTER_CONSUMER_KEY;
    $twitterConsumerSecret=TWITTER_CONSUMER_SECRET;
    $twitterOauthAccessToken=TWITTER_OAUTH_ACCESS_TOKEN;
    $twitterOauthAccessTokenSecret=TWITTER_OAUTH_ACCESS_TOKEN_SECRET;

    // Connect
    $connection = new MyTwitterOAuth(
      $twitterConsumerKey,             // Your API key
      $twitterConsumerSecret,          // Your API secret key
      $twitterOauthAccessToken,        // From your app created at https://developer.twitter.com/
      $twitterOauthAccessTokenSecret
    ); // From your app created at https://developer.twitter.com/

    //$TwitterOAuth = new MyTwitterOAuth();
    return $connection;

  }

  //----------------------------------------------------------------------------------------------------	
  public function string_clean_pgsql($string){

    $clean = str_replace("'", "''", $string);
    //pg_escape_string($col['g_value'])
    return $clean;
  }

  //----------------------------------------------------------------------------------------------------	
  public function qyr_select_by_a_return_b($o,$tb,$a,$value,$b,$publish=true){

    $cApp_fn = new App_API_Geodata_fn;

    $publish="";
    if($publish==true){
      $publish="post_status='publish' AND";
    }

    $query="
      SELECT ".$b."
      FROM ".$tb."
      WHERE ".$publish." 
      ".$a."='".$value."';
    ";
    //print_r($query);
    $tmpres = $this->getResultSetArray($query,$o);
    $tmpres['geoQuery'][]=$cApp_fn->json_clean_pgsql($query);

    return $tmpres;

  }

  //----------------------------------------------------------------------------------------------------	
  public function get_g_options($optIn){

    $query="
      SELECT g_options
      FROM geovar_tb
      WHERE post_status='publish' 
        AND g_master='".$optIn[0]."'
        AND g_slug='".$optIn[1]."'
      LIMIT 1;
    ";
    //print_r($query);
    $o=array();
    $tmpres = $this->getResultSetArray($query,$o);

    if($tmpres['response']==200){
      foreach ($tmpres['dataArray'] as $key_A => $val_A) {

        if(!empty($val_A['g_options'])){
          $obj_options = json_decode($val_A['g_options'],true);
        }
        else{
          $obj_options=array();
        }
        //print_r($obj_option); 
      }
    }
    else{
      $obj_options=array();
    }

    return $obj_options;

  }
  //----------------------------------------------------------------------------------------------------	
  public function qyr_select_by_a_return_cols($o,$tb,$a,$value,$cols,$publish=true){

    $cApp_fn = new App_API_Geodata_fn;

    $publish="";
    if($publish==true){
      $publish="post_status='publish' AND";
    }

    $query="
      SELECT ".implode(', ', $cols)."
      FROM ".$tb."
      WHERE ".$publish." 
      ".$a."='".$value."'
      ORDER BY ".$cols[0].";
    ";

    $tmpres = $this->getResultSetArray($query,$o);
    $tmpres['geoQuery'][]=$cApp_fn->json_clean_pgsql($query);

    return $tmpres;

  }

  //----------------------------------------------------------------------------------------------------	
  public function qyr_feature_update($o,$tb,$arr,$a,$aVal){

    $cApp_fn = new App_API_Geodata_fn;

    //$cols=array();
    $vals=array();
    //$types=array();

    foreach ($arr as $key => $value) {
      //array_push($cols,$value['col']);
      if($value['type']=='string'
        ||$value['type']=='text'
        ||$value['type']=='json'){
        array_push($vals,$value['col']."='".pg_escape_string($value['val'])."'");
      }
      else{
        array_push($vals,$value['col']."=".$value['val']);
      }
    }
    //$mycols = implode(",", $cols);
    $myvals = implode(",", $vals);

    $query="
      UPDATE ".$tb."
      SET 
        ".$myvals."
      WHERE ".$a."='".$aVal."'
      RETURNING pid
      ;
    ";

    $tmpres = $this->getResultSetArray($query,$o);
    $tmpres['geoQuery'][]=$cApp_fn->json_clean_pgsql($query);

    return $tmpres;

  }

  //----------------------------------------------------------------------------------------------------	
  public function get_style_by_g_master($g_master){//DEV

    $query = "
      SELECT 
        *
      FROM
        tb_lyr_style foo
      WHERE
        post_status='publish'
        AND g_master='".$g_master."'
      ORDER BY myorder
      --LIMIT 10
    ";

    $res = $this->getResultSetArray($query);
    
    if ($res['response'] != '200') {
      $json_obj=array();
    }
    else{
      $json_obj=$this->list_to_geojson($res['dataArray']);
    }

    return $json_obj;
  }

  //----------------------------------------------------------------------------------------------------	
  public function table_exist($table_name){

    $query = "
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE  table_schema = 'public'
        AND    table_name   = '".$table_name."'
      );
    ";

    $tmpres = $this->getResultSetArray($query);
    $f=array();
    foreach($tmpres['dataArray'] as $key => $value){
      $f[]=array('properties'=>$value);
    }
    //$f=array('properties'=>$tmpres['dataArray'][0]);

    $f;

    return $f;
  }

  //----------------------------------------------------------------------------------------------------	
  public function create_table($table_name){

    $query = "
      CREATE TABLE IF NOT EXISTS public.".$table_name."()
    ";
    $tmpres = $this->simpleQuery($query);

    $query = "
      ALTER TABLE IF EXISTS public.".$table_name." ADD COLUMN pid serial NOT NULL;
    ";
    $tmpres = $this->simpleQuery($query);

    $query = "
      ALTER TABLE IF EXISTS public.".$table_name." ADD PRIMARY KEY (pid);
    ";
    $tmpres = $this->simpleQuery($query);

    return $tmpres;

  }

  //----------------------------------------------------------------------------------------------------	
  public function getTableCols($table_name){

    $query = "
      SELECT table_name,column_name,data_type
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name   = '".$table_name."'
      ;
    ";

    $tmpres = $this->getResultSetArray($query);
    $f=array();
    foreach($tmpres['dataArray'] as $key => $value){
      $f[]=array('properties'=>$value);
    }
    //$f=array('properties'=>$tmpres['dataArray'][0]);

    return $f;
  }

  //----------------------------------------------------------------------------------------------------	
  public function getGeovarMASTER(){

    $query = "
      SELECT 
        *
      FROM
        ".GEOVAR_MASTER." foo
      WHERE
        post_status='publish'
    ";

    $tmpres = $this->getResultSetArray($query);

    return $tmpres['dataArray'];

  }

  //----------------------------------------------------------------------------------------------------	
  public function addColumn($tableName,$objCol){

    $query = "
      ALTER TABLE IF EXISTS 
        public.".$tableName." 
        ADD COLUMN ".$objCol["g_slug"]." ".$objCol["data_type"]." 
    ";
    if(!empty($objCol["g_default"])){
      $query .= "
         DEFAULT '".$objCol["g_default"]."'::".$objCol["data_type"]."
      ";
    }
    $query .= ";";

    $tmpres = $this->simpleQuery($query);

    return $tmpres;
  }

  //----------------------------------------------------------------------------------------------------	
  public function addColumnToGeovarTB($tableSlug,$objCol){

    $query = "
      INSERT INTO ".GEOVAR_TB."(
        g_master, g_slug, data_type
      )
      VALUES (
        '".$tableSlug."', 
        '".$objCol["g_slug"]."',
        '".$objCol["data_type"]."'
      );
    ";
    $query .= ";";

    $tmpres = $this->simpleQuery($query);

    return $tmpres;
  }

  //----------------------------------------------------------------------------------------------------	
  public function addTableToGeovarMASTER_geovar_auto($tableName){

    $query = "
      INSERT INTO ".GEOVAR_MASTER."(
        g_slug, master_type, g_label
      )
      VALUES (
        '".strtoupper($tableName)."', 
        'geovar_auto',
        '".$tableName."'
      );
    ";
    $query .= ";";

    $tmpres = $this->simpleQuery($query);

    return $tmpres;
  }

  //----------------------------------------------------------------------------------------------------	
  public function qyr_feature_exist($o,$tb,$col,$val,$type){

    $cApp_fn = new App_API_Geodata_fn;

    $query="
      SELECT 
        ".$col."
      FROM 
        ".$tb."
      WHERE 
    ";
    if($type=='string'){
      $query.="
        ".$col."='".$val."'
      ";
    }
    else{
      $query.="
        ".$col."=".$val."
      ";
    }
    $query.="
      LIMIT 1
    ";

    $tmpres = $this->getResultSetArray($query,$o);
    $tmpres['geoQuery'][]=$cApp_fn->json_clean_pgsql($query);

    return $tmpres;

  }

  //----------------------------------------------------------------------------------------------------	
  public function qyr_feature_insert($o,$tb,$arr){

    $cApp_fn = new App_API_Geodata_fn;

    $cols=array();
    $vals=array();
    //$types=array();

    foreach ($arr as $key => $value) {
      array_push($cols,$value['col']);
      if($value['type']=='string'
        ||$value['type']=='text'
        ||$value['type']=='json'){
        array_push($vals,"'".pg_escape_string($value['val'])."'");
      }
      else{
        array_push($vals,$value['val']);
      }
    }
    $mycols = implode(",", $cols);
    $myvals = implode(",", $vals);

    $query="
      INSERT INTO ".$tb."(
        ".$mycols."
      )
      VALUES (
        ".$myvals."
      ) RETURNING pid;
    ";
    $tmpres = $this->getResultSetArray($query,$o);
    $tmpres['geoQuery'][]=$cApp_fn->json_clean_pgsql($query);

    return $tmpres;

  }

  //----------------------------------------------------------------------------------------------------	
  public function qyr_select_all_publish($o,$tb,$arr){

    $cApp_fn = new App_API_Geodata_fn;

    $cols=array();

    foreach ($arr as $key => $value) {
      array_push($cols,$value['col']);
    }
    $mycols = implode(",", $cols);

    $query="
      SELECT ".$mycols."
      FROM ".$tb."
      WHERE post_status='publish';
    ";

    $tmpres = $this->getResultSetArray($query,$o);
    $tmpres['geoQuery'][]=$cApp_fn->json_clean_pgsql($query);

    return $tmpres;

  }

  //----------------------------------------------------------------------------------------------------	
  public function new_token_adler32($slug){

    $time = new DateTime;
    //echo $time->format(DateTime::ATOM);
    $token = hash('adler32', $slug.'_'.$time->format(DateTime::ATOM));

    return $token;

  }

  //----------------------------------------------------------------------------------------------------	
  public function new_token_md5($slug){

    $time = new DateTime;
    //echo $time->format(DateTime::ATOM);
    $token = hash('md5', $slug.'_'.$time->format(DateTime::ATOM));

    return $token;

  }
  
  //----------------------------------------------------------------------------------------------------	
  public function GeomType_from_tablename($table_name){

    $cApp_fn = new App_API_Geodata_fn;
    $o=array();
    $query="
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name='".$table_name."'
        AND column_name='geom';
    ";
    $tmpres = $this->getResultSetArray($query,$o);

    if ($tmpres['response'] != '200') {

      $tmpres=array(
        'dataArray'=>array(
          array(
            'geometrytype'=>'TABLE'
          )
        )
      );
  
    }
    else{
      $query="
        SELECT ST_GeometryType(geom) as geometrytype
        FROM ".$table_name."
        LIMIT 1;
      ";
      $tmpres = $this->getResultSetArray($query,$o);
      
    }

    return $tmpres;

  }



} // end class