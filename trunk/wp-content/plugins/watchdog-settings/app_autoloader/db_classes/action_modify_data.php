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
class App_Action_ModifyData extends Data_Access {

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
  public function main_modify_data($o){

    $ds=$o['_hide']['ds'];
		//$name=$ds['qy_name'];

    $cApp_fn = new App_API_Geodata_fn;

    $listCollections=array('collection'=>[
      'test',
      'insert_point',
      'update_point_xy',
      'update_attributes',
      'update_attributes_by_table',
      'wp_upload',
      'delete_feature',
      'delete_feature_bypid',
      'update_watchlist',
      'update_addon_geovar',
      'insert_item_lyr_table',
      'importTableIntoCatalog',
      'insertNewItemByTable'
    ]);

		if(!isset($ds['collection']) 
			|| empty($ds['collection'])){
			$res['response']='000';
      $o['msg'][]=$listCollections;
			$cApp_fn->fail_and_exit(
				$o,
				'e033'
			);
		}

    if($ds['collection']=='test'){

      $query = "
        SELECT 
          my_name
        FROM
          planet_210614_historic_castle foo
        LIMIT 10
      ";

      //--

      $tmpres = $this->getResultSetArray($query);
      $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

      $o['type']=$json_obj['type'];
      $o['features']=$json_obj['features'];

    }
    elseif($ds['collection']=='insert_point'){

      $lyr_meta=$cApp_fn->get_lyr_meta($ds['lyr'],$ds['MAPSLUG']);
      $table_slug=$lyr_meta['properties']['g_tables'][0];
      $meta=$cApp_fn->get_table_meta($table_slug,$ds['MAPSLUG']);
      $cols=array();

      foreach ($meta as $k2 => $f) {
        $p=$f['properties'];
        //if($p['g_slug']=='lat'||$p['g_slug']=='lng'||$p['g_slug']=='geom'){
        //  echo "Not use this attribute!";
        //  exit;
        //}
        if($p['g_preview']==true){
          $cols[]=array(
            'g_slug'=>$p['g_slug'],
            'data_type'=>$p['data_type']
          );
        }
      }

      if(!empty($ds['GEOM'])){
        $cols[]=array(
          'g_slug'=>'lat',
          'data_type'=>'double precision'
        );
        $cols[]=array(
          'g_slug'=>'lng',
          'data_type'=>'double precision'
        );
        $cols[]=array(
          'g_slug'=>'geom',
          'data_type'=>'geometry'
        );
      }


      $map_meta=$cApp_fn->get_map_meta($ds['MAPSLUG']);
      foreach ($map_meta['properties']['g_table'] as $key => $value) {
        if($value['slug']==$table_slug){
          $table_name=$value['name'];
        }
      }

      $b=array();
      foreach ($cols as $key => $col) {
        
        //_rint_r($col);
        //exit;
        if($col['g_slug']=='lng'){
        }
        elseif($col['g_slug']=='lat'){
          $b[]='ST_MakePoint('.$ds['lng'].','.$ds['lat'].')';
        }
        elseif($col['g_slug']=='geom'){
          $c[]=$col['g_slug'];
        }
        else{

          if($col['data_type']=='character varying' 
            || $col['data_type']=='timestamp without time zone' 
            || $col['data_type']=='text'){
            $b[]="'".pg_escape_string($ds[$col['g_slug']])."'";
          }
          elseif($col['data_type']=='json'){
            $arr[]=pg_escape_string($ds[$col['g_slug']]);
            $b[]="'".json_encode($arr)."'";
          }
          else{
            $b[]=$ds[$col['g_slug']];
          }

          $c[]=$col['g_slug'];

        }

      }

      $query = "
        INSERT INTO ".$table_name."(".implode( ",", $c ).")
        VALUES (".implode( ",", $b ).")
        RETURNING pid;
      ";

      $tmpres = $this->getResultSetArray($query);

      $o['type']='FeatureCollection';
      $o['features']=array();//$json_obj['features'];

    }
    elseif($ds['collection']=='update_point_xy'){

      $lyr_meta=$cApp_fn->get_lyr_meta($ds['lyr'],$ds['MAPSLUG']);
      $table_slug=$lyr_meta['properties']['g_tables'][0];
      $meta=$cApp_fn->get_table_meta($table_slug,$ds['MAPSLUG']);

      $cols=array();

      $cols[]=array(
        'g_slug'=>'lat',
        'data_type'=>'double precision'
      );
      $cols[]=array(
        'g_slug'=>'lng',
        'data_type'=>'double precision'
      );
      $cols[]=array(
        'g_slug'=>'geom',
        'data_type'=>'geometry'
      );

      $map_meta=$cApp_fn->get_map_meta($ds['MAPSLUG']);
      foreach ($map_meta['properties']['g_table'] as $key => $value) {
        if($value['slug']==$table_slug){
          $table_name=$value['name'];
        }
      }

      $query = "
        UPDATE ".$table_name."
        SET 
          geom=ST_MakePoint(".$ds['lng'].",".$ds['lat']."),
          geohash=ST_GeoHash(ST_SetSRID(ST_MakePoint(".$ds['lng'].",".$ds['lat']."),4326),9)
        WHERE item_token='".$ds['item_token']."'
        RETURNING pid;
      ";

      $tmpres = $this->getResultSetArray($query);

      $o['type']='FeatureCollection';
      $o['features']=array();//$json_obj['features'];

    }
    elseif($ds['collection']=='update_attributes'){

      $lyr_meta=$cApp_fn->get_lyr_meta($ds['lyr'],$ds['MAPSLUG']);
      $table_slug=$lyr_meta['properties']['g_tables'][0];
      $meta=$cApp_fn->get_table_meta($table_slug,$ds['MAPSLUG']);

      $cols=array();

      foreach ($meta as $k2 => $f) {
        $p=$f['properties'];
        //if($p['g_slug']=='lat'||$p['g_slug']=='lng'||$p['g_slug']=='geom'){
        //  echo "Not use this attribute!";
        //  exit;
        //}
        if($p['g_preview']==true){
          $cols[]=array(
            'g_slug'=>$p['g_slug'],
            'data_type'=>$p['data_type']
          );
        }
      }

      $map_meta=$cApp_fn->get_map_meta($ds['MAPSLUG']);
      foreach ($map_meta['properties']['g_table'] as $key => $value) {
        if($value['slug']==$table_slug){
          $table_name=$value['name'];
        }
      }

      $b=array();
      foreach ($cols as $key => $col) {
        
        if($col['data_type']=='character varying' 
          || $col['data_type']=='timestamp without time zone' 
          || $col['data_type']=='text'){
          $b[]=$col['g_slug']."="."'".pg_escape_string($ds[$col['g_slug']])."'";
        }
        elseif($col['data_type']=='json'){
          $arr=array(pg_escape_string($ds[$col['g_slug']]));
          $b[]=$col['g_slug']."="."'".json_encode($arr)."'";
        }
        else{
          $b[]=$col['g_slug']."=".$ds[$col['g_slug']];
        }

      }

      $query = "
        UPDATE ".$table_name."
        SET 
          ".implode( ",", $b )."
        WHERE item_token='".$ds['item_token']."'
        RETURNING pid;
      ";

      $tmpres = $this->getResultSetArray($query);

      $o['type']='FeatureCollection';
      $o['features']=array();//$json_obj['features'];

    }
    elseif($ds['collection']=='update_attributes_by_table'){
      if(empty($ds['table_slug'])){

        $o['msg'][] ='Missing: table_slug';

        //list all tables
        $tmpres =$cApp_fn->qyr_select_by_a_return_cols(
          array(),
          'geovar_master',
          '1',
          '1',//all
          array('g_slug','g_description'),
          false
        );

        $o['msg'][] = array('Params'=>[
          'table_slug'=>'table slug (usually UPPER CASE)',
        ]);

        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);
        $o['features']=$json_obj['features'];

        $o['type']=$json_obj['type'];

        $o['msg'][] = 'Add only "table_slug" to view available fields.';

        $o['msg'][] = array('Params'=>[
          'table_slug'=>'table slug (usually UPPER CASE)',
          'item_token'=>'item_token (required)',
          'field_and_value'=>'field and value Array(required)',
        ]);

      }
      else{

        if(!isset($ds['item_token'])
          || empty($ds['item_token'])){

          $o['msg'][] ='Missing: item_token';

        }
        else{

          if(!isset($ds['field_and_value'])
            || empty($ds['field_and_value'])){
            $o['msg'][] ='Missing: field_and_value';
            //then list all columns
            $query = "
              SELECT 
                pid, item_token, 
                g_slug, g_label, data_type, 
                g_preview, g_meta,
                g_callback, g_description,
                g_options,
                g_placeholder, g_required, g_order, g_dlg_style, g_serie,
                g_group, g_decode, g_serie_m, form_type, g_sub, g_module
              FROM geovar_tb
              WHERE g_master='".$ds['table_slug']."'
                AND post_status = 'publish'
              ORDER BY g_slug;
              ;
            ";
            $tmpres = $this->getResultSetArray($query);
            $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);
            $o['feat_geovar_tb']=$json_obj['features'];

            $o['type']=$json_obj['type'];
          }
          else{

            $table_name=$cApp_fn->get_real_table_prop($ds['table_slug']);

            $b=array();

            foreach ($ds['field_and_value'] as $key => $value) {
              # code...
              //print_r($value);
              //check if field exist
              $query = "
                SELECT 
                  item_token,data_type
                FROM geovar_tb
                WHERE g_master='".$ds['table_slug']."'
                  AND g_slug = '".$value["field"]."'
                ;
              ";
              $tmpres = $this->getResultSetArray($query);
              if ($tmpres['response'] != '200') {
                $o['msg'][] = 'Field '.$value["field"].' does not exist in '.$ds['table_slug'].'';
                $cApp_fn->fail_and_exit(
                  $o,
                  'e039'
                );
              }

              $data_type=$tmpres['dataArray'][0]['data_type'];

              if($data_type=='character varying' 
                || $data_type=='timestamp without time zone' 
                || $data_type=='text'){
                $b[]=$value["field"]."="."'".str_replace("'", "''", $value["value"])."'";
              }
              elseif($data_type=='json'){
                //$arr[]=pg_escape_string($value->value);
                $b[]=$value["field"]."="."'".str_replace("'", "''", json_encode($value["value"]))."'";
              }
              else{
                $b[]=$value["field"]."=".$value["value"];
              }

            }

            $query = "
              UPDATE ".$table_name."
              SET 
                ".implode( ",", $b )."
              WHERE
                item_token='".$ds['item_token']."'
              RETURNING *;
            ";

            $tmpres = $this->getResultSetArray($query);

            $o['type']='FeatureCollection';
            $o['features']=array();//$json_obj['features'];

          } //end if field_and_value

        }//end if item_token


      } //end if table_slug
    }
    elseif($ds['collection']=='wp_upload'){

      $o_dir = "uploads/";

      if(isset($_FILES["rawFile"])){
        //Filter the file types , if you want.
        if ($_FILES["rawFile"]["error"] > 0){
          //echo "Error: " . $_FILES["file"]["error"] . "<br>";
          echo "Fail-1";
          exit;
        }
        else{
          $today = date("Ymd-His");
          $newfile = $today .$_FILES["rawFile"]["name"];
          //move the uploaded file to uploads folder;
          //move_uploaded_file($_FILES["rawFile"]["tmp_name"],$o_dir. $newfile);
          // --- UPLOAD START
          // https://cube3x.com/upload-files-to-wordpress-media-library-using-php/
          if ( ! function_exists( 'wp_handle_upload' ) ) require_once( ABSPATH . 'wp-admin/includes/file.php' );
          //$uploadedfile = $_FILES['file'];
          $uploadedfile = $_FILES["rawFile"];
          $upload_overrides = array( 'test_form' => false );
          $movefile = wp_handle_upload( $uploadedfile, $upload_overrides );
          if ( $movefile ) {
            $wp_filetype = $movefile['type'];
            $filename = $movefile['file'];
            $wp_upload_dir = wp_upload_dir();
            $attachment = array(
              'guid' => $wp_upload_dir['url'] . '/' . basename( $filename ),
              'post_mime_type' => $wp_filetype,
              'post_title' => preg_replace('/\.[^.]+$/', '', basename($filename)),
              'post_content' => '',
              'post_status' => 'inherit'
            );

            $attach_id = wp_insert_attachment( $attachment, $filename);

            // Run the wp_insert_attachment function. This adds the file to the media library and generates the thumbnails. If you wanted to attch this image to a post, you could pass the post id as a third param and it'd magically happen.
            require_once(ABSPATH . "wp-admin" . '/includes/image.php');
            $attach_data = wp_generate_attachment_metadata( $attach_id, $filename );
            wp_update_attachment_metadata($attach_id,  $attach_data);

            $attach_url= wp_get_attachment_url($attach_id);
          }
          
          $photo_meta=wp_get_attachment_metadata($attach_id);

          // --- UPLOAD STOP
          $dataArray[]=array(
            'photo'=>$attach_id,
            'photo_filename'=>basename($filename),
            'photo_url'=>$attach_url,
            'photo_thumbnail'=>wp_get_attachment_image($attach_id,'thumbnail'),
            'photo_width'=>$photo_meta['width'],
            'photo_height'=>$photo_meta['height'],
            'photo_folder_file'=>$photo_meta['file'],
            'photo_filesize'=>$photo_meta['filesize']
          );
          $json_obj=$cApp_fn->list_to_geojson($dataArray);

          $o['type']=$json_obj['type'];
          $o['features']=$json_obj['features'];

        }

      }
      else{
        echo "Fail-2";
        exit;
      }

    }
    elseif($ds['collection']=='delete_feature'){

      $lyr_meta=$cApp_fn->get_lyr_meta($ds['lyr'],$ds['MAPSLUG']);
      $table_slug=$lyr_meta['properties']['g_tables'][0];
      $meta=$cApp_fn->get_table_meta($table_slug,$ds['MAPSLUG']);

      $map_meta=$cApp_fn->get_map_meta($ds['MAPSLUG']);
      foreach ($map_meta['properties']['g_table'] as $key => $value) {
        if($value['slug']==$table_slug){
          $table_name=$value['name'];
        }
      }

      $query = "
        UPDATE ".$table_name."
        SET 
          post_status='trash'
        WHERE item_token='".$ds['item_token']."'
        RETURNING pid;
      ";

      $tmpres = $this->getResultSetArray($query);

      $o['type']='FeatureCollection';
      $o['features']=array();//$json_obj['features'];

    }
    elseif($ds['collection']=='delete_feature_bypid'){

      $lyr_meta=$cApp_fn->get_lyr_meta($ds['lyr'],$ds['MAPSLUG']);
      $table_slug_json=json_decode($lyr_meta['properties']['g_tables'], true);
      $table_slug=$table_slug_json[0];
      $table_name=$cApp_fn->get_real_table_prop($table_slug);

      $query = "
        UPDATE ".$table_name."
        SET 
          post_status='trash'
        WHERE pid=".$ds['pid']."
        RETURNING pid;
      ";

      $tmpres = $this->getResultSetArray($query);

      $o['type']='FeatureCollection';
      $o['features']=array();//$json_obj['features'];

    }
    elseif($ds['collection']=='update_watchlist'){

      /*$lyr_meta=$cApp_fn->get_lyr_meta($ds['lyr'],$ds['MAPSLUG']);
      $table_slug=$lyr_meta['properties']['g_tables'][0];
      $meta=$cApp_fn->get_table_meta($table_slug,$ds['MAPSLUG']);

      $map_meta=$cApp_fn->get_map_meta($ds['MAPSLUG']);
      foreach ($map_meta['properties']['g_table'] as $key => $value) {
        if($value['slug']==$table_slug){
          $table_name=$value['name'];
        }
      }*/

      $query = "
        SELECT 
          watchlist
        FROM
          geovar_user foo
        WHERE
          item_token='".$ds['user_token']."'
          AND post_status='publish' 
      ";

      $tmpres = $this->getResultSetArray($query);

      $curr_watchlist=json_decode($tmpres['dataArray'][0]['watchlist'],true);

      $new_watchlist=array();

      foreach ($curr_watchlist as $key => $value) {
        # code...

        if($value['slug']==$ds['watchlist_table']){
          $new_watchlist[]=array(
            'slug'=>$ds['watchlist_table'],
            'items'=>$ds['watchlist'],
          );
        }
        else{
          $new_watchlist[]=$value;
        }

      }

      $query = "
        UPDATE public.geovar_user
          SET watchlist='".json_encode($new_watchlist)."'
        WHERE item_token='".$ds['user_token']."'
        RETURNING pid;
      ";

      $o['type']='FeatureCollection';
      $o['features']=array();//$json_obj['features'];

    }
    elseif($ds['collection']=='update_addon_geovar'){

      //-- --- --- ---

      $meta=$cApp_fn->get_table_meta($ds['table'],$ds['MAPSLUG']);

      $cols=array();
      foreach ($meta as $k2 => $f) {
        $p=$f['properties'];
        if($p['g_preview']==true){
          $cols[]=$p;
        }
      }

      $table_name=$cApp_fn->get_real_table_prop($ds['table']);

      $sqlParts=array();

      foreach ($cols as $key => $objCol) {
        if($objCol['data_type']=='json'){
          $sqlParts[]=" ".$objCol['g_slug']."='".json_encode($ds[$objCol['g_slug']])."' ";
        }
        else{
          $sqlParts[]=" ".$objCol['g_slug']."='".$ds[$objCol['g_slug']]."' ";
        }
      }

      $query = "
        UPDATE ".$table_name."
        SET 
          ".implode(',', $sqlParts)."
        WHERE g_slug='".$ds['g_slug']."'
        RETURNING pid;
      ";

      print_r($query);
      exit;

      $tmpres = $this->getResultSetArray($query);
      $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

      $o['type']=$json_obj['type'];
      $o['features']=$json_obj['features'];

    }
    elseif($ds['collection']=='insert_item_lyr_table'){

      //-- --- --- ---

      $meta=$cApp_fn->get_table_meta($ds['table'],$ds['MAPSLUG']);

      $cols=array();
      foreach ($meta as $k2 => $f) {
        $p=$f['properties'];
        if($p['g_meta']==true){
          $cols[]=$p;
        }
      }

      $table_name=$cApp_fn->get_real_table_prop($ds['table']);

      // $sqlParts=array();

      // foreach ($cols as $key => $objCol) {
      //   if($objCol['data_type']=='json'){
      //     $sqlParts[]=" ".$objCol['g_slug']."='".json_encode($ds[$objCol['g_slug']])."' ";
      //   }
      //   else{
      //     $sqlParts[]=" ".$objCol['g_slug']."='".$ds[$objCol['g_slug']]."' ";
      //   }
      // }

      $b=array();
      foreach ($cols as $key => $col) {
        
        //_rint_r($col);
        //exit;
        if($col['g_slug']=='lng'
          || $col['g_slug']=='lat'
          || $col['g_slug']=='geom'){
        }
        else{

          if($col['data_type']=='character varying' 
            || $col['data_type']=='timestamp without time zone' 
            || $col['data_type']=='text'){
            $b[]="'".$ds[$col['g_slug']]."'";
          }
          elseif($col['data_type']=='json'){
            //echo "json not supported";
            //$arr[]=pg_escape_string($ds[$col['g_slug']]);
            $b[]="'".json_encode($ds[$col['g_slug']])."'";
          }
          else{
            $b[]=$ds[$col['g_slug']];
          }

          $c[]=$col['g_slug'];

        }

      }

      $c[]='geom';
      $geojson = json_encode($ds['last_r']->features[0]->geometry, JSON_PRETTY_PRINT);
      $b[]="ST_Force3D(ST_GeomFromGeoJSON('".$geojson."'))";


      /* $query = "
        UPDATE ".$table_name."
        SET 
          ".implode(',', $sqlParts)."
        WHERE g_slug='".$ds['g_slug']."'
        RETURNING pid;
      "; */
      $query = "
        INSERT INTO ".$table_name."(".implode( ",", $c ).")
        VALUES (".implode( ",", $b ).")
        RETURNING pid;
      ";


      $tmpres = $this->getResultSetArray($query);
      $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

      $o['type']=$json_obj['type'];
      $o['features']=$json_obj['features'];

    }
    elseif($ds['collection']=='importTableIntoCatalog'){
      $o['msg'][] ='importTableIntoCatalog';
      if(empty($ds['table'])){

        //list all tables
        $query = "
          SELECT foo.table_name, bar.g_slug
          FROM information_schema.tables foo
          LEFT JOIN public.geovar_master bar ON foo.table_name=bar.g_label
          WHERE 
          foo.table_schema = 'public'
          AND foo.table_type='BASE TABLE'
          AND NOT(foo.table_name='spatial_ref_sys')
          ORDER BY foo.table_name;
        ";
        $tmpres = $this->getResultSetArray($query);
        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

        $o['type']=$json_obj['type'];
        $o['features']=$json_obj['features'];

        $o['msg'][] = array('Params'=>[
          'table'=>'table name',
          'table_slug'=>'table slug (usually UPPER CASE)',
          'table_description'=>'description (optional)',
          'master_type'=>array(
            'msg'=>'optional default is "geodata"',
            'options'=>array(
              'master_type',
              'collection',
              'geodata',
              'geovar',
              'geovar_auto'
            )
          ),
          'g_group'=>'optional default is ["private"]',
        ]);

      }
      else{
        if(empty($ds['table_slug'])){
          $res['response']='000';
          $o['msg'][]='Define table_slug';
          $o['msg'][]=array('table_slug'=>'table slug (usually UPPER CASE)');
          $cApp_fn->fail_and_exit(
            $o,
            'e039'
          );
        }
        else{

          //check by unique value $row0
          $tmpres=$cApp_fn->qyr_feature_exist(
            array(),//$o
            'geovar_master',
            'g_label',
            $ds['table'],
            'string'//always string? I suppose so for now
          );
          if ($tmpres['response'] != '200') {

            $query = "
              SELECT foo.table_name, bar.g_slug
              FROM information_schema.tables foo
              LEFT JOIN public.geovar_master bar ON foo.table_name=bar.g_label
              WHERE 
              foo.table_schema = 'public'
              AND foo.table_type='BASE TABLE'
              AND foo.table_name='".$ds['table']."';
            ";
            $tmpres = $this->getResultSetArray($query);
            if ($tmpres['response'] != '200') {
              $o['msg'][] = 'Table does not exist in schema';
              $cApp_fn->fail_and_exit(
                $o,
                'e039'
              );
            }

            $cols=array('g_label','g_slug');
            $vals=array($ds['table'],$ds['table_slug']);

            if(isset($ds['table_description']) 
              || !empty($ds['table_description'])){
              $cols[]='g_description';
              $vals[]=$ds['table_description'];
            }
            if(isset($ds['master_type']) 
              || !empty($ds['master_type'])){
              $cols[]='master_type';
              $vals[]=$ds['master_type'];
            }
            if(isset($ds['g_group']) 
              || !empty($ds['g_group'])){
              $cols[]='g_group';
              $vals[]=$ds['g_group'];
            }

            $query = "
              INSERT INTO geovar_master(
                ".implode( ",", $cols )."
              )
              VALUES ('".implode( "','", $vals )."')
              RETURNING *;
            ";
            $tmpres = $this->getResultSetArray($query);
            $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);
            $o['feat_geovar_master']=$json_obj['features'];

            $query = "
              INSERT INTO geovar_tb(
                g_master, g_slug, data_type,g_label
              )
              SELECT 
                '".$ds['table_slug']."',column_name,
                data_type,column_name
              FROM information_schema.columns
              WHERE table_schema = 'public'
              AND table_name = '".$ds['table']."'
              AND NOT(column_name IN (
                'item_token','post_date','post_modified',
                'post_status','pid'
              ))
              RETURNING *;
            ";
            $tmpres = $this->getResultSetArray($query);
            $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);
            $o['feat_geovar_tb']=$json_obj['features'];

            $o['type']=$json_obj['type'];
            

          }
          else{
            $res['response']='000';
            $o['msg'][]='Table already exists in catalog (geovar_master)';
            $cApp_fn->fail_and_exit(
              $o,
              'e039'
            );
          }
        }
      }
    }
    elseif($ds['collection']=='insertNewItemByTable'){

      if(empty($ds['table_slug'])){

        $o['msg'][] ='Missing: table_slug';

        //list all tables
        $tmpres =$cApp_fn->qyr_select_by_a_return_cols(
          array(),
          'geovar_master',
          '1',
          '1',//all
          array('g_slug','g_description'),
          false
        );

        $o['msg'][] = array('Params'=>[
          'table_slug'=>'table slug (usually UPPER CASE)',
        ]);

        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);
        $o['features']=$json_obj['features'];

        $o['type']=$json_obj['type'];

        $o['msg'][] = 'Add only "table_slug" to view available fields.';

        $o['msg'][] = array('Params'=>[
          'table_slug'=>'table slug (usually UPPER CASE)',
          'field_and_value'=>'field and value Array(required)',
        ]);

      }
      else{
        if(!isset($ds['field_and_value'])
          || empty($ds['field_and_value'])){
          $o['msg'][] ='Missing: field_and_value';
          //then list all columns
          $query = "
            SELECT 
              pid, item_token, 
              g_slug, g_label, data_type, 
              g_preview, g_meta,
              g_callback, g_description,
              g_options,
              g_placeholder, g_required, g_order, g_dlg_style, g_serie,
              g_group, g_decode, g_serie_m, form_type, g_sub, g_module
            FROM geovar_tb
            WHERE g_master='".$ds['table_slug']."'
              AND post_status = 'publish'
            ORDER BY g_slug;
            ;
          ";
          $tmpres = $this->getResultSetArray($query);
          $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);
          $o['feat_geovar_tb']=$json_obj['features'];

          $o['type']=$json_obj['type'];
        }
        else{

          $table_name=$cApp_fn->get_real_table_prop($ds['table_slug']);

          $b=array();
          $c=array();
          foreach ($ds['field_and_value'] as $key => $value) {
            # code...
            //check if field exist
            $query = "
              SELECT 
                item_token,data_type
              FROM geovar_tb
              WHERE g_master='".$ds['table_slug']."'
                AND g_slug = '".$value["field"]."'
              ;
            ";
            $tmpres = $this->getResultSetArray($query);
            if ($tmpres['response'] != '200') {
              $o['msg'][] = 'Field '.$value['field'].' does not exist in '.$ds['table_slug'].'';
              $cApp_fn->fail_and_exit(
                $o,
                'e039'
              );
            }

            $data_type=$tmpres['dataArray'][0]['data_type'];

            if($data_type=='character varying' 
              || $data_type=='timestamp without time zone' 
              || $data_type=='text'){
              $b[]="'".str_replace("'", "''", $value["value"])."'";
            }
            elseif($data_type=='json'){
              //$arr[]=pg_escape_string($value->value);
              $string=str_replace("'", "''", json_encode($value["value"]));
              $b[]="'".trim(preg_replace('/\s\s+/', '', $string))."'";
            }
            else{
              $b[]=$value["value"];
            }

            $c[]=$value["field"];

          }

          $query = "
            INSERT INTO ".$table_name."(".implode( ",", $c ).")
            VALUES (".implode( ",", $b ).")
            RETURNING *;
          ";
          // print_r($query );
          // exit;
          $tmpres = $this->getResultSetArray($query);

          $o['type']='FeatureCollection';
          $o['features']=array();//$json_obj['features'];

        } //end if field_and_value

      } //end if empty table_slug
    }
    elseif($ds['collection']=='RegisterLyr'){
      /*
      print_r($ds);
      Array
      (
          [fn_group] => geodata
          [qy_name] => A
          [action] => modify_data
          [collection] => RegisterLyr
          [table] => pl_itai_nw_mi
          [wms] => pl_itai_nw_mi
          [call_silent] => 
          [USER_LICENSE] => none
          [MAPSLUG] => map70b306c3
      )      
      - insert table alias
      - with geovar_tb
      - create hash name for layer

      - prepare input for layer:
        - table alias
        - wms name
        - style name
      
      - insert layer ...
      */
      // - insert table alias
      //check by unique value $row0
      $table_name=$ds['table'];
      $table_slug=strtoupper($table_name);
     
      $tmpres=$cApp_fn->qyr_feature_exist(
        array(),//$o
        'geovar_master',
        'g_label',
        $table_slug,
        'string'//always string? I suppose so for now
      );
      if ($tmpres['response'] != '200') {

        $cols=array('g_label','g_slug');
        $vals=array($ds['table'],$table_slug);  

        $query = "
          INSERT INTO geovar_master(
            ".implode( ",", $cols )."
          )
          VALUES ('".implode( "','", $vals )."')
          RETURNING *;
        ";
        $tmpres = $this->getResultSetArray($query);
        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);
        $o['feat_geovar_master']=$json_obj['features'];

        // - with geovar_tb
        $query = "
          INSERT INTO geovar_tb(
            g_master, g_slug, data_type,g_label
          )
          SELECT 
            '".$table_slug."',column_name,
            data_type,column_name
          FROM information_schema.columns
          WHERE table_schema = 'public'
          AND table_name = '".$table_name."'
          AND NOT(column_name IN (
            'item_token','post_date','post_modified',
            'post_status','pid'
          ))
          RETURNING *;
        ";
        $tmpres = $this->getResultSetArray($query);
        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);
        $o['feat_geovar_tb']=$json_obj['features'];

        $o['type']=$json_obj['type'];

      }
      else{
        $res['response']='000';
        $o['msg'][]='Table already exists in catalog (geovar_master)';
        $cApp_fn->fail_and_exit(
          $o,
          'e039'
        );
      }    

      // - prepare input for layer:
      //  - table alias
      //  - wms name
      //  - style name
      //  - create hash name for layer
      //  - geom_type 
      $tmpres = $cApp_fn->GeomType_from_tablename($table_name);   
      $geometrytype = $tmpres["dataArray"][0]["geometrytype"];

      $new_lyr_token = 'lyr'.$cApp_fn->new_token_md5('lyr');
      //$new_sld_token = 'sld'.$cApp_fn->new_token_adler32('sld');
      //$table_slug = $table_slug;
      $wms_name = $ds['wms'];

      $geomType='polygon';
      $styleName='generic_areas';
    
      if($geometrytype=='ST_Point'){
        $geomType='point';
        $styleName='generic_points';
      }
      
      // - insert layer ... 

      $b=array();
      $c=array();
      $field_and_value=array(
        array(
          "field"=>"g_slug",
          "value"=>$new_lyr_token
        ),
        array(
          "field"=>"feat_type",
          "value"=>$geomType
        ),
        array(
          "field"=>"lyr_type",
          "value"=>"wms"
        ),
        array(
          "field"=>"lyr_update",
          "value"=>"fix"
        ),
        array(
          "field"=>"geoserver_name",
          "value"=>$wms_name
        ),
        array(
          "field"=>"geoserver_style",
          "value"=>"tmp_sld"
        ),
        array(
          "field"=>"queryable",
          "value"=>"0"
        ),
        array(
          "field"=>"geoserver_style_name",
          "value"=>$styleName
        ),
        array(
          "field"=>"g_label",
          "value"=>$table_slug
        ),
        array(
          "field"=>"g_tables",
          "value"=>array($table_slug)
        ),
      );
      foreach ($field_and_value as $key => $value) {
        # code...
        //check if field exist
        $query = "
          SELECT 
            item_token,data_type
          FROM geovar_tb
          WHERE g_master='TB_LYR'
            AND g_slug = '".$value["field"]."'
          ;
        ";
        
        $tmpres = $this->getResultSetArray($query);
        if ($tmpres['response'] != '200') {
          $o['msg'][] = 'Field '.$value['field'].' does not exist in '.$table_slug.'';
          $cApp_fn->fail_and_exit(
            $o,
            'e039'
          );
        }

        $data_type=$tmpres['dataArray'][0]['data_type'];

        if($data_type=='character varying' 
          || $data_type=='timestamp without time zone' 
          || $data_type=='text'){
          $b[]="'".str_replace("'", "''", $value["value"])."'";
        }
        elseif($data_type=='json'){
          //$arr[]=pg_escape_string($value->value);
          $string=str_replace("'", "''", json_encode($value["value"]));
          $b[]="'".trim(preg_replace('/\s\s+/', '', $string))."'";
        }
        else{
          $b[]=$value["value"];
        }

        $c[]=$value["field"];

      }      

      $query = "
      INSERT INTO tb_lyr(".implode( ",", $c ).")
        VALUES (".implode( ",", $b ).")
        RETURNING *;
      ";
      $tmpres = $this->getResultSetArray($query);
      $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);
      $o['feat_tb_lyr']=$json_obj['features'];

      $o['type']=$json_obj['type'];     

    }
    else{
			$res['response']='000';
      $o['msg'][]=$listCollections;
			$cApp_fn->fail_and_exit(
				$o,
				'e033'
			);
    }

    //$o['message'] ='main_view_data';


    return $o;

  }

  //----------------------------------------------------------------------------------------------------	
 
} // end class