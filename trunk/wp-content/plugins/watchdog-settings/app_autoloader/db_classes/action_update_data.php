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


//----------------------------------------------------------------------------------------------------------------------
class App_Action_UpdateData extends Data_Access {

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
  public function run_test_x($o = array()){

    $res = "MyTest";

    return $res;

  }

  //----------------------------------------------------------------------------------------------------	
  public function main_update_data($o){

    $ds=$o['_hide']['ds'];
		//$name=$ds['qy_name'];

    $cApp_fn = new App_API_Geodata_fn;
		//
    //$check_license=0;
    //$qy_name=$ds['qy_name'];


    $listCollections=array('collection'=>[
      'update_geovar_json',
      'update_geovar_json_eachmap'
    ]);


		if(!isset($ds['collection']) 
			|| empty($ds['collection'])){
			$res['response']='000';
			$cApp_fn->fail_and_exit(
				$o,
				'e033'
			);
		}

    if($ds['collection']=='update_geovar_json'){

      $query = "
        SELECT 
          *
        FROM
          ".GEOVAR_MASTER." foo
        WHERE
          post_status='publish'
          AND master_type='geovar_auto'
        ORDER BY pid
        --LIMIT 10
      ";

      //--

      $tmpres = $this->getResultSetArray($query);

      

      foreach ($tmpres['dataArray'] as $key => $value) {
        # code...
        $meta=$cApp_fn->get_table_meta_from_db($value['g_slug']);
        $cols=array();
        foreach ($meta as $k2 => $p) {
          if($p['g_meta']==true){
            $cols[]=$p['g_slug'];
          }
        }

        $query = "
          SELECT 
            ".implode( ",", $cols )."
          FROM
            ".$value['g_label']." foo
          WHERE
            post_status='publish'
          ORDER BY pid
        ";
        //--
        
        $tmpres = $this->getResultSetArray($query);

        if(!empty($tmpres['dataArray'][0]['g_master'])){
          $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],true);
        }
        else{
          $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray']);
        }
        
        $name=strtolower($value['g_slug']);

        $path=ABSPATH.'meta/';
        $filename=$name.'.json';
        //_rint_r($path.'||'.$filename);
        //exit;
        $o=$cApp_fn->write_json($o,$name,$json_obj,$filename,$path);

      }

    }
    elseif($ds['collection']=='update_geovar_json_eachmap'){

      //-- --- --- ---

      $query = "
        SELECT 
          *
        FROM
          tb_map foo
        WHERE
          post_status='publish'
          AND g_slug IN (
            'mapsit001',
            'mapsit002',
            'mapsit003',
            'mapsit004',
            'mapsit005',
            'mapsit006',
            'mapsit007'
          )
        ORDER BY pid
        --LIMIT 10
      ";

      //--

      $res = $this->getResultSetArray($query);

      //--

      foreach ($res['dataArray'] as $key => $map_obj) {

        $dataArray=array();
        $dataArray[]=$map_obj;
        $json_obj=$cApp_fn->list_to_geojson($dataArray);
        //$name=strtolower($value['g_slug']);
        //$path=ABSPATH.'webgis/'.$map_obj['g_slug'].'/';
        //$path=substr(ABSPATH, 0, -1).str_replace(get_site_url(), "", get_stylesheet_directory_uri()).'/dist/map/'.$map_obj['g_slug'].'/';
        $name='geovar_map';
        $path=ABSPATH.'meta/';
        $filename=$map_obj['g_slug'].'_'.$name.'.json';

        $o=$cApp_fn->write_json($o,'A',$json_obj,$filename,$path);

      }

      //--

      $meta=$cApp_fn->get_table_meta_from_db('TB_LYR');
      $cols_lyr=array();
      foreach ($meta as $k2 => $p) {
        if($p['g_meta']==true){
          $cols_lyr[]=$p['g_slug'];
        }
      }

      $meta=$cApp_fn->get_table_meta_from_db('GEOVAR_TB');
      $cols_tb=array();
      foreach ($meta as $k2 => $p) {
        if($p['g_meta']==true){
          $cols_tb[]=$p['g_slug'];
        }
      }

      foreach ($res['dataArray'] as $key => $map) {
        # code...
        if(!empty($map['g_lyr'])){
          $arr_lyr=[];
          foreach (json_decode($map['g_lyr'],true) as $key => $lyr){

            $arr_lyr[]="'".$lyr."'";

          }

          $query = "
            SELECT 
              ".implode( ",", $cols_lyr )."
            FROM
              tb_lyr foo
            WHERE
              post_status='publish'
              AND g_slug IN (" . implode(',', $arr_lyr) . ")
            ORDER BY pid
            --LIMIT 10
          ";

          $res2 = $this->getResultSetArray($query);
          $json_obj=$cApp_fn->list_to_geojson($res2['dataArray']);
          //$name=strtolower($value['g_slug']);
          //$path=ABSPATH.'webgis/'.$map['g_slug'].'/';
          //$filename='geovar_lyr.json';

          $name='geovar_lyr';
          $path=ABSPATH.'meta/';
          $filename=$map['g_slug'].'_'.$name.'.json';

          $o=$cApp_fn->write_json($o,'B',$json_obj,$filename,$path);
        }

        if(!empty($map['g_table'])){
          $arr_tb=[];
          foreach (json_decode($map['g_table'],true) as $key => $tb){

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

          $res2 = $this->getResultSetArray($query);

          if ($res2['response'] != '200') {
            $json_obj=array();
          }
          else{
            $json_obj=$cApp_fn->list_to_geojson($res2['dataArray'],true);
          }

          //$name=strtolower($value['g_slug']);
          //$path=ABSPATH.'webgis/'.$map['g_slug'].'/';
          //$filename='geovar_map_tb.json';

          $name='geovar_map_tb';
          $path=ABSPATH.'meta/';
          $filename=$map['g_slug'].'_'.$name.'.json';

          $o=$cApp_fn->write_json($o,'C',$json_obj,$filename,$path);

        }


      }

    }
    else{
      $cApp_fn->fail_and_exit(
        $o,
        'e033'
      );
    }

    return $o;

  }

  //----------------------------------------------------------------------------------------------------	
 
} // end class