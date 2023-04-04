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
class App_Action_CreateData extends Data_Access {

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
  public function main_create_data($o){

    $ds=$o['_hide']['ds'];
		//$name=$ds['qy_name'];

    $cApp_fn = new App_API_Geodata_fn;
		//
    //$check_license=0;
    //$qy_name=$ds['qy_name'];


		if(!isset($ds['collection']) 
			|| empty($ds['collection'])){
			$res['response']='000';
			$cApp_fn->fail_and_exit(
				$o,
				'e033'
			);
		}

    //test roles
    $curr_user = wp_get_current_user();
    if(!empty($curr_user->ID)){
      if($curr_user->roles[0]=='administrator'){
      }
      else{
        $res['response']='000';
        $cApp_fn->fail_and_exit(
          $o,
          'e038'
        );
      }
    }
    elseif(!empty($ds['secretKey'])){
      if($ds['secretKey']==SECRET_KEY){
      }
      else{
        $res['response']='000';
        $cApp_fn->fail_and_exit(
          $o,
          'e038'
        );
      }
    }
    else{
      $res['response']='000';
      $cApp_fn->fail_and_exit(
        $o,
        'e038'
      );
    }

    if($ds['collection']=='test_create'){

      $dataArray[]=array(
        'test_create'=>'OK'
      );

      $json_obj=$cApp_fn->list_to_geojson($dataArray);

      $o['type']=$json_obj['type'];
      $o['features']=$json_obj['features'];

      //--

    }
    elseif($ds['collection']=='create_map'){

      if(!isset($ds['g_slug']) 
        || empty($ds['g_slug'])){
        $res['response']='000';
        $cApp_fn->fail_and_exit(
          $o,
          'e039',
          '>> g_slug'
        );
      }

      //$json_obj=$cApp_fn->list_to_geojson($dataArray);

      //$o['type']=$json_obj['type'];
      //$o['features']=$json_obj['features'];

      //$name=strtolower($value['g_slug']);
      //$path=ABSPATH.'meta/';
      //$filename=$name.'.json';
      //$o=$cApp_fn->write_json($o,$name,$json_obj,$filename,$path);
      $path=ABSPATH.'webgis/'.$ds['g_slug'];
      if (!file_exists($path)) {
        mkdir($path, 0777, true);
        // Will copy foo/test.php to bar/test.php
        // overwritting it if necessary
        copy(ABSPATH.'webgis/default/default_image.jpg', $path.'/default_image.jpg');
        //--
        $query = "
          INSERT INTO tb_map(g_slug, g_lyr, g_table, my_notes, g_group)
          VALUES ('".$ds['g_slug']."', '".json_encode($ds['g_lyr'])."', 
            '".json_encode($ds['g_table'])."', '".pg_escape_string($ds['my_notes'])."', '".json_encode($ds['g_group'])."')
          RETURNING pid;
        ";

        $tmpres = $this->getResultSetArray($query);

        $o['type']='FeatureCollection';
        $o['features']=array();//$json_obj['features'];

      }
      else{
        $res['response']='000';
        $cApp_fn->fail_and_exit(
          $o,
          'e040',
          ''
        );
      }

      //--

    }
    elseif($ds['collection']=='createExplorerDefault'){

      foreach ($ds['params'] as $key => $param) {
        
        if(isset($param['table'])){

          $table_name=$cApp_fn->get_real_table_prop($param['table']);

          //echo $table_name;
          //exit;

          foreach ($param['data'] as $key => $row) {

            //check by unique value $row0
            $tmpres=$cApp_fn->qyr_feature_exist(
              array(),//$o
              $table_name,
              $row[0]["col"],
              $row[0]["val"],
              'string'//always string? I suppose so for now
            );

            //print_r($tmpres);
            //exit;

            if ($tmpres['response'] != '200') {
              $myCol=array();
              $myVal=array();
              foreach ($row as $key => $objCol) {
                $myCol[]=$objCol["col"];
                $myVal[]=$objCol["val"];
              }
              $query = "
                INSERT INTO ".$table_name."(".implode( ",", $myCol ).")
                VALUES ('".implode( "','", $myVal )."')
                RETURNING pid;
              ";
              // print_r($query);
              // exit;
              $tmpres = $this->simpleQuery($query);

            }
            else{
              //check if value is thesame
              // $myCol=array();
              // $myVal=array();
              foreach ($row as $key => $objCol) {
                // $myCol[]=$objCol["col"];
                // $myVal[]=$objCol["val"];

                if($objCol["col"]!=$row[0]["col"]){
                  $tmpres = $cApp_fn->qyr_select_by_a_return_b(
                    array(),//$o
                    $table_name,
                    $row[0]["col"], //$a -- filter by this column
                    $row[0]["val"],
                    $objCol["col"], //$b -- return this column
                    false //$publish
                  );

                  //if value is not the same, update
                  if($tmpres["dataArray"][0][$objCol["col"]]!=$objCol["val"]){
                    $query = "
                      UPDATE ".$table_name."
                      SET ".$objCol["col"]."='".$objCol["val"]."'
                      WHERE ".$row[0]["col"]."='".$row[0]["val"]."'
                    ";
                    //$tmpres = 
                    $this->simpleQuery($query);
                    $o['changes'][] = array(
                      "table"=>$table_name,
                      "col"=>$objCol["col"],
                      "new_val"=>$objCol["val"],
                      "old_val"=>$tmpres["dataArray"][0][$objCol["col"]]
                    );
                  }
                }

              }

            }

          }

        }
        else{
          $res['response']='000';
          $cApp_fn->fail_and_exit(
            $o,
            'e041',
            '>> params table doesn\'t exist'
          );
        }

      }//end foreach  params

      $o['features']=array();
      $o['response'] ='200';
      $o['type'] ='FeatureCollection';

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