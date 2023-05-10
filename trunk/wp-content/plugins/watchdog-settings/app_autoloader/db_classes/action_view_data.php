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
class App_Action_ViewData extends Data_Access {

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
  public function main_view_data($o){

    $ds=$o['_hide']['ds'];
		$name=$ds['qy_name'];

    $cApp_fn = new App_API_Geodata_fn;
    $cApp_ER = new App_ElementsRoles;

    $listCollections=array('collection'=>[
      'test',
      'user_meta',
      'logout_x',
      'lyr_all',
      'lyr_all_bbox',
      'lyr_all_dbgeoa',//only for geoaesthetic map
      'lyr_single',
      'lyr_single_one_table',
      'lyr_single_one_table_xy',
      'lyr_group_by_one_table',
      'show_table_data',
      'show_table_data2',
      'invio_immagine',
      'crea_pdf_con_immagine',
      'crea_json_from_ds',
      'view_user_maps',
      'lyr_all_watchlist',
      'lyr_all_fix',
      'check_outer',
      'lyr_all_virtual',
      'lyr_all_outer',
      'user_access',
      'lyr_all_table',
      'lyr_selected_rows',
      'lyr_selected_sum',
      'lyr_intersect_particelle',
      'lyr_intersect_polygon',
      'lyr_intersect_point',
      'lyr_intersect_cdu',
      'search_housenumber',
      'viewTableIntoCatalog',
      'viewTablesAndMaster',
      'viewLyrsByMaster',
      'viewGeoserverFLyrs',
      'getGeomType',
      'viewBuildings3d',
      'get_SunTree',
      'a251_AllActiveLyrByXY',
      'a252_seqAllNodes',
      'a254_seqAllNodes',
      'a252_all_route_lines',
      'a252_seqDirectionPath','a254_seqDirectionPath',
      'a254_userGetDirectionToSeq',
      'a254_userLocationRegister',
      'a254_getCatTail',
      'a254_sessionGraph',
      'a254_missingGraph',
      'a254_GoogleDirections',
      'a254_GoogleDirectionsWithRandomPoints',
      'getProjectToken',
      'a254_loadFakeGPS',
      'a255_search_token_by_email',
      'a255_search_map_by_token',
      'a255_search_session_by_project',
      'mvt_test',
      'mvt_dbbldg_eu_pg_buildings',
      'mvt_baseGraph'
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
    elseif($ds['collection']=='user_meta'){


      $dataArray=$cApp_fn->get_mapuser_meta();

      $json_obj=$cApp_fn->list_to_geojson($dataArray);

      $o['type']=$json_obj['type'];
      $o['features']=$json_obj['features'];

    }
    elseif($ds['collection']=='logout_x'){

      $token = wp_get_session_token();
      if ( $token ) {
        $manager = WP_Session_Tokens::get_instance( get_current_user_id() );
        $manager->destroy( $token );
      }

      $o['type']='x';
      $o['features']=array();

    }
    elseif($ds['collection']=='lyr_all'){

      if($ds['lyr']=='lyr030'){
        $query = "
          SELECT 
            my_name,ST_ASGEOJSON(geom) AS geojson
          FROM
            planet_210614_historic_castle foo
          WHERE
            foo.geom && ST_MakeEnvelope(
              ".$ds['mye'].",
              ".$ds['mys'].",
              ".$ds['myw'].",
              ".$ds['myn'].",
              4326
            )
        ";
        //--

        $tmpres = $this->getResultSetArray($query);
        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

        $o['type']=$json_obj['type'];
        $o['features']=$json_obj['features'];
      }
      else{

        // $lyr_meta=$cApp_fn->get_lyr_meta($ds['lyr'],$ds['MAPSLUG']);
        // $table_slug=$lyr_meta['properties']['g_tables'][0];
        $lyr_meta=$cApp_fn->get_lyr_meta($ds['lyr'],$ds['MAPSLUG']);
        $table_slug_json=json_decode($lyr_meta['properties']['g_tables'], true);
        $table_slug=$table_slug_json[0];

        // foreach ($lyr_meta['properties']['g_cols_minimal'] as $key => $value) {
        //   if($value['table']==$table_slug){
        //     $cols=$value['cols'];
        //   }
        $g_cols_minimal=json_decode($lyr_meta['properties']['g_cols_minimal'], true);
        foreach ($g_cols_minimal as $key => $value) {
          if($value['table']==$table_slug){
            $cols=$value['cols'];
          }
        }

        

        if($ds['lyr']=='lyr035'){

        }
        elseif($lyr_meta['properties']['cluster_type']=='geohash'){

        }
        else{
          if(!empty($ds['geom'])){
            $cols[]='ST_ASGEOJSON(geom) AS geojson';
          }
        }

        /*$meta=$cApp_fn->get_table_meta($table_slug,$ds['MAPSLUG']);
        
        $cols=array();
        foreach ($meta as $k2 => $f) {
          $p=$f['properties'];
          if($p['g_preview']==true){
            $cols[]=$p['g_slug'];
          }
        }*/

        // $map_meta=$cApp_fn->get_map_meta($ds['MAPSLUG']);
        // foreach ($map_meta['properties']['g_table'] as $key => $value) {
        //   if($value['slug']==$table_slug){
        //     $table_name=$value['name'];
        //   }
        // }

        $table_name=$cApp_fn->get_real_table_prop($table_slug);

        $query = "";

        /* if($ds['current_zoom']<=2){
          $geohash_zoom=1;
        }
        elseif($ds['current_zoom']<=5){
          $geohash_zoom=2;
        }
        elseif($ds['current_zoom']<=7){
          $geohash_zoom=3;
        }
        elseif($ds['current_zoom']<=9){
          $geohash_zoom=4;
        }
        elseif($ds['current_zoom']<=12){
          $geohash_zoom=5;
        }
        elseif($ds['current_zoom']<=13){
          $geohash_zoom=6;
        }
        elseif($ds['current_zoom']<=16){
          $geohash_zoom=7;
        }
        elseif($ds['current_zoom']<=18){
          $geohash_zoom=8;
        }
        else{
          $geohash_zoom=9;
        } */

        if($ds['lyr']=='lyr035'){

          $query .= "
            SELECT 
          ";
          foreach ($cols as $key => $value) {

            $query .= "
              CASE
                  WHEN count=1 THEN ".$value."
                  ELSE 'generic'
              END ".$value.",
            ";
          }

          $query .= "
              count,
              geojson 
            FROM
            (
              SELECT 
                SUBSTRING (geohash ,1 , ".$geohash_zoom." ) AS geohash,
                count(*) AS count,
          ";

          foreach ($cols as $key => $value) {
            $query .= "
              min(".$value.") AS ".$value.", 
            ";
          }

          $query .= "
              ST_ASGEOJSON(ST_CENTROID(ST_GEOMFROMGEOHASH(SUBSTRING (geohash ,1 , ".$geohash_zoom." ),".$geohash_zoom."))) AS geojson 
            FROM 
              ".$table_name." foo
            WHERE 
              1 = 1 
          ";
          if(empty($ds['world'])){
            $query .= " 
              AND
              foo.geom && ST_MakeEnvelope(
                ".$ds['mye'].",
                ".$ds['mys'].",
                ".$ds['myw'].",
                ".$ds['myn'].",
                4326
              )
              AND post_status='publish' 
            ";
          }
          if($ds['query']=='true'){
            $query .= " 
              AND ".$ds['filter_field']."='".$ds['filter_value']."'
            ";
          }
          $query .= "
            GROUP BY SUBSTRING (geohash ,1 , ".$geohash_zoom." )
          ) bar
          ";
        }
        elseif($lyr_meta['properties']['cluster_type']=='geohash'){

          $query .= "
            SELECT 
          ";
          foreach ($cols as $key => $value) {

            $query .= "
              CASE
                  WHEN count=1 THEN ".$value."
                  ELSE 'generic'
              END ".$value.",
            ";
          }

          $query .= "
              count,
              CASE WHEN count = 1
                THEN ST_ASGEOJSON(ST_CENTROID(ST_GEOMFROMGEOHASH(geohash_alone)))
                ELSE geojson END geojson
            FROM
            (
              SELECT 
                SUBSTRING (geohash ,1 , ".$geohash_zoom." ) AS geohash,
                count(*) AS count,
          ";

          $map_tb_meta=$cApp_fn->get_map_tb_meta($ds['MAPSLUG'],$table_slug);

          foreach ($cols as $key => $value) {

            foreach($map_tb_meta as $k => $v){
              if($v['properties']['g_slug']==$value){
                if($v['properties']['data_type']=='json'){
                  $query .= "
                    min(".$value."::text) AS ".$value.", 
                  ";
                }
                else{
                  $query .= "
                    min(".$value.") AS ".$value.", 
                  ";
                }
              }
            }

          }

          $query .= "
              ST_ASGEOJSON(ST_CENTROID(ST_GEOMFROMGEOHASH(SUBSTRING (geohash ,1 , ".$geohash_zoom." ),".$geohash_zoom."))) AS geojson, 
              min(geohash) AS geohash_alone  
            FROM 
              ".$table_name." foo
            WHERE 
              1 = 1 
          ";
          if(empty($ds['world'])){
            $query .= " 
              AND
              foo.geom && ST_MakeEnvelope(
                ".$ds['mye'].",
                ".$ds['mys'].",
                ".$ds['myw'].",
                ".$ds['myn'].",
                4326
              )
              AND post_status='publish' 
            ";
          }
          if($ds['query']=='true'){
            $query .= " 
              AND ".$ds['filter_field']."='".$ds['filter_value']."'
            ";
          }
          if($ds['query_toc']=='true'){
            $query .= " 
	            AND ".$ds['toc_filter_field']."::text ~* '".implode("|", $ds['toc_filter_value'])."'
            ";
          }
          $query .= "
            GROUP BY SUBSTRING (geohash ,1 , ".$geohash_zoom." )
          ) bar
          ";

        }
        else{

          $query .= "
            SELECT 
              ".implode( ",", $cols )."
            FROM
              ".$table_name." foo
            WHERE
              1=1
          ";
          if(empty($ds['world'])){
            $query .= " 
              AND
              foo.geom && ST_MakeEnvelope(
                ".$ds['mye'].",
                ".$ds['mys'].",
                ".$ds['myw'].",
                ".$ds['myn'].",
                4326
              )
              AND post_status='publish' 
            ";
          }
          if($ds['query']=='true'){
            $query .= " 
              AND ".$ds['filter_field']."='".$ds['filter_value']."'
            ";
          }

          if((!empty($g_cols_minimal['order_by']))){
            $query .= " 
              ORDER BY ".implode( ",", $g_cols_minimal['order_by'])."
            ";
          }

        }

        //--
        $this_name=$name;
        $this_features='features';
        $tmpres = $this->getResultSetArray($query);
        if ($tmpres['response'] != '200') {
          $o['type']='FeatureCollection';
          $o[$this_features]=array();
          $o['geoQuery'][$this_name]['iTotalRecords'] = 1;
        }
        else{
          $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

          $o['type']=$json_obj['type'];
          $o[$this_features]=$json_obj['features'];
          $o['geoQuery'][$this_name]['iTotalRecords'] = $json_obj['iTotalRecords'];

        }

        if(!empty($ds['query']) && $ds['query']=='true'){

          $query = "
            SELECT 
              ST_ASGEOJSON(ST_Envelope(ST_UNION(geom))) AS geojson
            FROM
              ".$table_name." foo
            WHERE
              ".$ds['filter_field']."='".$ds['filter_value']."'
              AND post_status='publish' 
          ";
          $this_name=$name.'_envelope';
          $this_features='features_envelope';
          $tmpres = $this->getResultSetArray($query);
          $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);
          $o[$this_features]=$json_obj['features'];

        }

      }

    }
    elseif($ds['collection']=='lyr_all_dbgeoa'){

      if($ds['layer']=='aree'){
        $query = "
          SELECT 
            pid,  
            zona,
            nomecomune,
            areeverdi,
            stab_indus,
            ST_ASGEOJSON(geom) AS geojson
          FROM
            dbgeoa_pg_aree7comuni_elisa foo
          WHERE
            foo.geom && ST_MakeEnvelope(
              ".$ds['mye'].",
              ".$ds['mys'].",
              ".$ds['myw'].",
              ".$ds['myn'].",
              4326
            )
        ";
        $tmpres = $this->getResultSetArray($query);
      }
      elseif($ds['layer']=='caselli'){
        $query = "
          SELECT 
            pid,  
            casello,
            ST_ASGEOJSON(geom) AS geojson
          FROM
            dbgeoa_pt_caselli_elisa foo
          WHERE
            foo.geom && ST_MakeEnvelope(
              ".$ds['mye'].",
              ".$ds['mys'].",
              ".$ds['myw'].",
              ".$ds['myn'].",
              4326
            )
        ";
        $tmpres = $this->getResultSetArray($query);
      }
      elseif($ds['layer']=='civici'){
        $query = "
          SELECT 
            pid,  
            nomecomune, 
            tipo,  
            toponimo, 
            civico,  
            abitanti,  
            ST_ASGEOJSON(geom) AS geojson
          FROM
            dbgeoa_pt_civici6comuni_noomi foo
          WHERE
            foo.geom && ST_MakeEnvelope(
              ".$ds['mye'].",
              ".$ds['mys'].",
              ".$ds['myw'].",
              ".$ds['myn'].",
              4326
            )
        ";
        $tmpres = $this->getResultSetArray($query);
      }
      elseif($ds['layer']=='edificiaree'){
        $query = "
          SELECT 
            pid,
            objectid,
            h,
            id,
            piede,
            gronda,
            shape_leng,
            shape_area,
            zona,
            nomecomune,
            stab_indus,
            ST_ASGEOJSON(geom) AS geojson
          FROM
            dbgeoa_pg_edifici3d6comuni_area foo
          WHERE
            foo.geom && ST_MakeEnvelope(
              ".$ds['mye'].",
              ".$ds['mys'].",
              ".$ds['myw'].",
              ".$ds['myn'].",
              4326
            )
        ";
        $tmpres = $this->getResultSetArray($query);
      }
      elseif($ds['layer']=='edificiomi'){
        $query = "
          SELECT 
            pid,  
            fascia,
            laboratori,
            magazzini,
            negozi,
            abitazioni,
            abiteconom,
            box,
            codistat,
            nomecomune,
            tipo,
            toponimo,
            civico,
            cap,
            civicicoor,
            civicico_1,
            civicico_2,
            h,
            ST_AREA(ST_TRANSFORM(geom,32632)) AS superficie,
            CAST (ST_AREA(ST_TRANSFORM(geom,32632))*h AS INTEGER) AS volume,
            ST_ASGEOJSON(ST_Simplify(geom,0.00001),6) AS geojson 
          FROM
            dbgeoa_pg_edifici6comuni_omi foo
          WHERE
            foo.geom && ST_MakeEnvelope(
              ".$ds['min_e'].",
              ".$ds['min_s'].",
              ".$ds['min_w'].",
              ".$ds['min_n'].",
              4326
            )
            AND   ST_AREA(
              ST_TRANSFORM(geom, 32632)
            ) > 100            
        ";

        $tmpres = $this->getResultSetArray($query);
      }
      elseif($ds['layer']=='istat'){
        $query = "
          SELECT 
            pid,  
            comune,
            sezistat,
            popolazion,
            ST_ASGEOJSON(geom) AS geojson
          FROM
            dbgeoa_pg_istat7comuni_elisa foo
          WHERE
            foo.geom && ST_MakeEnvelope(
              ".$ds['mye'].",
              ".$ds['mys'].",
              ".$ds['myw'].",
              ".$ds['myn'].",
              4326
            )
        ";
        $tmpres = $this->getResultSetArray($query);
      }
      elseif($ds['layer']=='milanocivici'){
        $query = "
          SELECT 
            pid,  
            codistat,
            nomecomune, 
            tipo,  
            toponimo, 
            civico, 
            cap,  
            abitanti,  
            name,  
            codcom,  
            codzona,  
            fascia,  
            laboratori,  
            magazzini,  
            negozi,  
            abitazioni, 
            abiteconom,  
            box,  
            nuovoedif_,  
            unito, 
            civicicoordgiuste_ufftot,  
            civicicoordgiuste_captot,  
            civicicoordgiuste_villetot, 
            ST_ASGEOJSON(geom) AS geojson
          FROM
            dbgeoa_pt_civici_omi_mi foo
          WHERE
            foo.geom && ST_MakeEnvelope(
              ".$ds['mye'].",
              ".$ds['mys'].",
              ".$ds['myw'].",
              ".$ds['myn'].",
              4326
            )
        ";
        $tmpres = $this->getResultSetArray($query);
      }
      elseif($ds['layer']=='parcheggi'){
        $query = "
          SELECT 
            pid,  
            nomecomune, 
            nomepark,  
            gestore, 
            tel, 
            email,  
            postiauto,  
            coperti,  
            disabili,
            ascensore,  
            scale,  
            telepass,  
            postimoto,  
            note,
            ST_ASGEOJSON(geom) AS geojson
          FROM
            dbgeoa_pt_parcheggi_elisa foo
          WHERE
            foo.geom && ST_MakeEnvelope(
              ".$ds['mye'].",
              ".$ds['mys'].",
              ".$ds['myw'].",
              ".$ds['myn'].",
              4326
            )
        ";
        $tmpres = $this->getResultSetArray($query);
      }
      elseif($ds['layer']=='ristori'){
        $query = "
          SELECT 
            pid,  
            area, 
            benzina,  
            diesel, 
            gpl, 
            metano,  
            elettrico,  
            bar,  
            ristorante,
            gestore,
            ST_ASGEOJSON(geom) AS geojson
          FROM
            dbgeoa_pt_ristoro_elisa foo
          WHERE
            foo.geom && ST_MakeEnvelope(
              ".$ds['mye'].",
              ".$ds['mys'].",
              ".$ds['myw'].",
              ".$ds['myn'].",
              4326
            )
        ";
        $tmpres = $this->getResultSetArray($query);
      }
      else{

        $tmpres = array(  
          'response' => '404', 
          'dataArray' => array()
        ); 

      }

      $this_name='A';
      $this_features='features';
      if ($tmpres['response'] != '200') {
        $o['type']='FeatureCollection';
        $o[$this_features]=array();
        $o['geoQuery'][$this_name]['iTotalRecords'] = 1;
      }
      else{
        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

        $o['type']=$json_obj['type'];
        $o[$this_features]=$json_obj['features'];
        $o['geoQuery'][$this_name]['iTotalRecords'] = $json_obj['iTotalRecords'];

      }

    }    
    elseif($ds['collection']=='lyr_all_bbox'){
      $table_name=$cApp_fn->get_real_table_prop($ds['table_slug']);

      $query = "
        SELECT 
          ST_GEOMETRYTYPE(ST_Envelope(ST_UNION(ST_MAKEVALID(geom)))) AS geometrytype,
          ST_ASGEOJSON(ST_Envelope(ST_UNION(ST_MAKEVALID(geom)))) AS geojson
        FROM
          ".$table_name." foo
      ";
      //_print_r($query);
      //--

      $tmpres = $this->getResultSetArray($query);
      $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

      $o['type']=$json_obj['type'];
      $o['features']=$json_obj['features'];      

    }      
    elseif($ds['collection']=='lyr_single'){

      if(isset($ds['lyr']) && $ds['lyr']=='lyr035'){

        $meta=$cApp_fn->get_table_meta('PT_ARTWORK_TYPE','map015');

        //_rint_r($meta);
        //exit;

        $cols=array();
        foreach ($meta as $k2 => $f) {
          $p=$f['properties'];
          if($p['g_preview']==true){
            $cols[]=$p['g_slug'];
          }
        }

        $query = "
          SELECT 
            ".implode( ",", $cols )."
          FROM
            pt_artwork_type foo
          WHERE
            item_token='".$ds['item_token']."'
        ";

        //--

        $tmpres = $this->getResultSetArray($query);
        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

        $o['type']=$json_obj['type'];
        $o['features']=$json_obj['features'];
      }
      else{

        $table_name=$cApp_fn->get_real_table_prop($ds['table_slug']);

        $query = "
          SELECT 
            *
          FROM
            ".$table_name." foo
          WHERE
            ".$ds['by_field_name']."='".$ds['by_field_value']."'
        ";

        //--

        $tmpres = $this->getResultSetArray($query);
        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

        $o['type']=$json_obj['type'];
        $o['features']=$json_obj['features'];        

      }

    }
    elseif($ds['collection']=='lyr_single_one_table'){

      //--

      $lyr_meta=$cApp_fn->get_lyr_meta($ds['lyr'],$ds['MAPSLUG']);
      $table_slug_json=json_decode($lyr_meta['properties']['g_tables'], true);
      $table_slug=$table_slug_json[0];

      //--

      $meta=$cApp_fn->get_table_meta($table_slug,$ds['MAPSLUG']);

      $cols=array();
      foreach ($meta as $k2 => $f) {
        $p=$f['properties'];
        if($p['g_preview']==true){
          $cols[]=$p['g_slug'];
        }
      }

      if($lyr_meta['properties']['feat_type']=='point'){
        $cols[]='ST_X(geom) AS lng';
        $cols[]='ST_Y(geom) AS lat';
      }

      $table_name=$cApp_fn->get_real_table_prop($table_slug);

      if(empty($ds['one2nnn'])){
        $query = "
          SELECT 
            ".implode( ",", $cols )."
          FROM
            ".$table_name." foo
          WHERE
            item_token='".$ds['item_token']."'
        ";
      }
      else{
        $query = "
          SELECT 
            ".implode( ",", $cols )."
          FROM
            ".$table_name." foo
          WHERE
            ".$ds['join_field']."='".$ds['join_value']."'
        ";

      }



      //--

      $tmpres = $this->getResultSetArray($query);
      $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

      $o['type']=$json_obj['type'];
      $o['features']=$json_obj['features'];

    }
    elseif($ds['collection']=='lyr_single_one_table_xy'){

      //--

      $lyr_meta=$cApp_fn->get_lyr_meta($ds['lyr'],$ds['MAPSLUG']);
      $table_slug_json=json_decode($lyr_meta['properties']['g_tables'], true);
      $table_slug=$table_slug_json[0];

      //--

      $meta=$cApp_fn->get_table_meta($table_slug,$ds['MAPSLUG']);
      
      $cols=array();
      foreach ($meta as $k2 => $f) {
        $p=$f['properties'];
        if($p['g_meta']==true || $p['g_meta']==1){
          $cols[]=$p['g_slug'];
        }
      }
      if(!empty($ds['geom'] && $ds['geom']=='true')){
        $cols[]='ST_ASGEOJSON(geom) AS geojson';
      }
      $cols[]='pid';
      $table_name=$cApp_fn->get_real_table_prop($table_slug);

      $distance=0;

      if(!empty($ds['feat_type'])){
        if($ds['feat_type']=='point'){
          $distance=0.0001;
        }
        elseif($ds['feat_type']=='polyline'){
          $distance=0.0001;
        }
      }

      $query = "
        SELECT 
          ".implode( ",", $cols )."
        FROM
          ".$table_name." foo
        WHERE
          ST_DWITHIN(
            st_setsrid(geom,4326),
            st_setsrid(ST_MakePoint(
              ".$ds['lng'].",
              ".$ds['lat']."
            ),4326),
            ".$distance."
          )
      ";
      if(!empty($ds['mye'])){
        $query .= "
          AND foo.geom && ST_MakeEnvelope(
            ".$ds['mye'].",
            ".$ds['mys'].",
            ".$ds['myw'].",
            ".$ds['myn'].",
            4326
          )
        ";
      }
      $query.="
        ORDER BY ST_DISTANCE(
		  	  st_setsrid(geom,4326),
          st_setsrid(ST_MakePoint(".$ds['lng'].",".$ds['lat']."),4326)
		    ) ASC ;";

      // print_r($query);
      // exit;
      //--

      $this_name='A';
      $this_features='features';
      $tmpres = $this->getResultSetArray($query);

      if ($tmpres['response'] != '200') {
        $o['type']='FeatureCollection';
        $o[$this_features]=array();
        $o['geoQuery'][$this_name]['iTotalRecords'] = 1;
      }
      else{
        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

        $o['type']=$json_obj['type'];
        $o[$this_features]=$json_obj['features'];
        $o['geoQuery'][$this_name]['iTotalRecords'] = $json_obj['iTotalRecords'];

      }

    }
    elseif($ds['collection']=='lyr_group_by_one_table'){

      //--

      $lyr_meta=$cApp_fn->get_lyr_meta($ds['lyr'],$ds['MAPSLUG']);
      $table_slug_json=json_decode($lyr_meta['properties']['g_tables'], true);
      $table_slug=$table_slug_json[0];

      //--

      //$meta=$cApp_fn->get_table_meta($table_slug,$ds['MAPSLUG']);
      
      /*$cols=array();
      foreach ($meta as $k2 => $f) {
        $p=$f['properties'];
        if($p['g_preview']==true){
          $cols[]=$p['g_slug'];
        }
      }*/

      $table_name=$cApp_fn->get_real_table_prop($table_slug);

      $query = "
        SELECT * FROM (
          SELECT 
            ".$ds['col'].", count(*) AS count
          FROM
            ".$table_name." foo
          WHERE
            NOT(".$ds['col']." IS null)
          GROUP BY ".$ds['col']."
          ORDER BY ".$ds['col']."
        ) bar
        WHERE count>1
      ";

      //--

      $tmpres = $this->getResultSetArray($query);
      $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

      $o['type']=$json_obj['type'];
      $o['features']=$json_obj['features'];

    }
    elseif($ds['collection']=='show_table_data'){

      $o['msg'][] ='show_table_data';

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

      }
      else{

        $o['msg'][] ='To show "item_token" data, use: "item_token:true"';

        $meta=$cApp_fn->get_table_meta($ds['table_slug']);
        $table_name=$cApp_fn->get_real_table_prop($ds['table_slug']);

        if(isset($ds['cols'])){   
          $cols=$ds['cols'];
        }
        else{
          $cols=array();
          if(isset($ds['item_token']) 
            && $ds['item_token']=='true'){
            $cols[]='item_token';
          }
  
          foreach ($meta as $key => $obj) {
            $p=$obj['properties'];
            if($p['g_preview']==true
              || $p['g_preview']==1){
              if($p['g_slug']=='geom'){
                $cols[]='ST_ASGEOJSON(geom) AS geojson';
              }
              else{
                $cols[]=$p['g_slug'];
              }
            }
          }
        }


        $query = "
          SELECT 
            ".implode( ",", $cols )."
          FROM
            ".$table_name." foo
          WHERE
            post_status='publish'
        ";

        if(!empty($ds['filter_field'])){
          $query .= " 
            AND ".$ds['filter_field']."='".$ds['filter_value']."'
          ";
        }
        
        if(isset($ds['filters_type'])){

          foreach ($ds['filters_string'] as $key => $string) {
            $string_value=str_replace("\'", "'", $string['value']);
            $query .= " 
              ".$ds['filters_type']." ".$string_value."
            ";
          }

        }

        if(isset($ds['order_by'])){
          $orderby=array();
          foreach ($ds['order_by'] as $key => $string) {
            $string_value=str_replace("\'", "'", $string['field']);
            $orderby[]= $string_value;
          }
          $query .= " 
            ORDER BY ".implode( ",", $orderby )."
          ";

        }

        //--

        $tmpres = $this->getResultSetArray($query,$o);

        if ($tmpres['response'] != '200') {
          $cApp_fn->fail_and_exit(
            $o,
            'e037',
            'Record con [post_status]=publish > 0.'
          );
        }

        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray']);
        //---
        $o['type']=$json_obj['type'];
        $o['features']=$json_obj['features'];

        $o['response'] ='200';
        $o['type'] ='FeatureCollection';

        unset($o['geoInfo']);
        unset($o['apiInfo']);
        unset($o['dbInfo']);
        $o['response'] ='200';
        $o['type'] ='FeatureCollection';

      }//table not empty

    }
    elseif($ds['collection']=='show_table_data2'){

      $meta=$cApp_fn->get_table_meta($ds['table_slug'],$ds['MAPSLUG']);
      
      /* $cols=array();
      foreach ($meta as $k2 => $f) {
        $p=$f['properties'];
        if($p['g_preview']==true){
          $cols[]=$p['g_slug'];
        }
      } */

      $table_name=$cApp_fn->get_real_table_prop($table_slug);

      $cols=array();
      foreach ($meta as $key => $obj) {
        $p=$obj['properties'];
        if($p['g_preview']==true
          || $p['g_preview']==1){
          if($p['g_slug']=='geom'){
            $cols[]='ST_ASGEOJSON(geom) AS geojson';
          }
          else{
            $cols[]=$p['g_slug'];
          }
        }
      }

      $query = "
        SELECT 
          ".implode( ",", $cols )."
        FROM
          ".$table_name." foo
        WHERE
          post_status='publish'
      ";

      if(!empty($ds['query'])){
        $query .= " 
          AND ".$ds['filter_field']."='".$ds['filter_value']."'
        ";
      }

      //--

      $tmpres = $this->getResultSetArray($query,$o);

      if ($tmpres['response'] != '200') {
        $cApp_fn->fail_and_exit(
          $o,
          'e037',
          'Record con [post_status]=publish > 0.'
        );
      }

      $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray']);
      //---
      $o['type']=$json_obj['type'];
      $o['features']=$json_obj['features'];

      $o['response'] ='200';
      $o['type'] ='FeatureCollection';

      unset($o['geoInfo']);
      unset($o['apiInfo']);
      unset($o['dbInfo']);
      $o['response'] ='200';
      $o['type'] ='FeatureCollection';

      $cApp_fn->output_json_pretty3($o);

    }
    elseif($ds['collection']=='invio_immagine'){

      $o['file']=$cApp_fn->invio_immagine($ds);

      $o['response'] ='200';
      $o['type'] ='FeatureCollection';
      $o['features']=array();

      unset($o['geoInfo']);
      unset($o['apiInfo']);
      unset($o['dbInfo']);
      $o['response'] ='200';
      $o['type'] ='FeatureCollection';

      $cApp_fn->output_json_pretty3($o);

    }
    elseif($ds['collection']=='crea_pdf_con_immagine'){

      $o['file']=$cApp_fn->crea_pdf_con_immagine($ds);

      $o['response'] ='200';
      $o['type'] ='FeatureCollection';
      $o['features']=array();

      unset($o['geoInfo']);
      unset($o['apiInfo']);
      unset($o['dbInfo']);
      $o['response'] ='200';
      $o['type'] ='FeatureCollection';

      $cApp_fn->output_json_pretty3($o);

    }
    elseif($ds['collection']=='crea_json_from_ds'){

      //$o['file']=$cApp_fn->crea_pdf_con_immagine($ds);
      //$res2 = $this->getResultSetArray($query);
      //$json_obj=$cApp_fn->list_to_geojson($res2['dataArray'],true);

      //$name=strtolower($value['g_slug']);
      $path=ABSPATH.'tmp/';
      $filename='map.geojson';
      $o=$cApp_fn->write_json($o,'A',$ds['r'],$filename,$path);

      $o['response'] ='200';
      $o['type'] ='FeatureCollection';

      $p['properties']=array(
        'path'=>$o['geoFiles']['A'][0],
        'filename'=>$o['geoFiles']['A'][1],
        'fileurl'=>$o['geoFiles']['A'][2]
      );

      $o['features'][]=$p;


      unset($o['geoInfo']);
      unset($o['apiInfo']);
      unset($o['dbInfo']);
      $o['response'] ='200';
      $o['type'] ='FeatureCollection';

      $cApp_fn->output_json_pretty3($o);

    }
    elseif($ds['collection']=='view_user_maps'){

      $group_from_user=$ds['g_group'];

      //$group_from_user=array("0xall","0xBBB");

      $query = "
        SELECT 
          g_slug, g_group
        FROM public.tb_map 
      ";

      //--

      $tmpres = $this->getResultSetArray($query);

      foreach ($tmpres['dataArray'] as $key => $value) {
        $group_from_map=json_decode($value['g_group'],true);
        $result = array_intersect($group_from_user,$group_from_map);
        if(!empty(count($result))){
          $p['g_slug'] = $value['g_slug'];
          $marker = array(
            'type' => 'Feature',
            'properties' => $p
          );
          $json_obj['features'][] = $marker;
          unset($marker);
        }
      }

      //$json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

      $o['response'] ='200';
      $o['type'] ='FeatureCollection';
      $o['features']=$json_obj['features'];

    }
    elseif($ds['collection']=='lyr_all_watchlist'){

      $query = "
        SELECT 
          1 AS count,
          item_token,
          my_categories,
          my_name,
          ST_ASGEOJSON(geom) AS geojson
        FROM
         pt_building foo
        WHERE
          1=1
      ";

      $query .= " 
        AND item_token IN ('".implode("','",$ds['watchlist'])."')
      ";
      //--
      $this_name=$name;
      $this_features='features';
      $tmpres = $this->getResultSetArray($query);
      if ($tmpres['response'] != '200') {
        $o['type']='FeatureCollection';
        $o[$this_features]=array();
        $o['geoQuery'][$this_name]['iTotalRecords'] = 1;
      }
      else{
        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

        $o['type']=$json_obj['type'];
        $o[$this_features]=$json_obj['features'];
        $o['geoQuery'][$this_name]['iTotalRecords'] = $json_obj['iTotalRecords'];

      }
      

    }
    elseif($ds['collection']=='lyr_all_fix'){

      $lyr_meta=$cApp_fn->get_lyr_meta($ds['lyr'],$ds['MAPSLUG']);
      $table_slug=json_decode($lyr_meta['properties']['g_tables'],true)[0];

      if(!empty($lyr_meta['properties']['g_cols_minimal'])){

        foreach (json_decode($lyr_meta['properties']['g_cols_minimal'],true) as $key => $value) {
          if($value['table']==$table_slug){
            $cols=$value['cols'];
          }
        }

      }
      else{

        $cols[]='pid';

      }

      //$map_tb_meta=$cApp_fn->get_map_tb_meta($ds['MAPSLUG'],$table_slug);

      if(!empty($ds['geom'])){
        $cols[]='ST_ASGEOJSON(geom) AS geojson';
      }

      $map_meta=$cApp_fn->get_map_meta($ds['MAPSLUG']);

      // foreach (json_decode($map_meta['properties']['g_table'],true) as $key => $value) {
      //   if($value['slug']==$table_slug){
      //     $table_name=$value['name'];
      //   }
      // }

      $table_name=$cApp_fn->get_real_table_prop($table_slug);

      $query = "
        SELECT 
          ".implode( ",", $cols )."
        FROM
          ".$table_name." foo
        WHERE
          1=1
      ";

      //--
      $this_name=$name;
      $this_features='features';
      $tmpres = $this->getResultSetArray($query);

      if ($tmpres['response'] != '200') {
        $o['type']='FeatureCollection';
        $o[$this_features]=array();
        $o['geoQuery'][$this_name]['iTotalRecords'] = 1;
      }
      else{
        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

        $o['type']=$json_obj['type'];
        $o[$this_features]=$json_obj['features'];
        $o['geoQuery'][$this_name]['iTotalRecords'] = $json_obj['iTotalRecords'];

      }

    }
    elseif($ds['collection']=='check_outer'){

      if($ds['lyr']=='vlyr011'){

        $cols[]='col1';

        $query = "
          SELECT 
            ST_CONTAINS(geom_outer,geom_inner) AS contains
          FROM (
            SELECT 
              ST_MakeEnvelope(
                ".$ds['mye'].",".$ds['mys'].",".$ds['myw'].",".$ds['myn']."
              ,4326) AS geom_inner,
              ST_MakeEnvelope(
                ".$ds['data_e'].",".$ds['data_s'].",".$ds['data_w'].",".$ds['data_n']."
              ,4326) AS geom_outer
          ) foo

        ";
        //--

        $tmpres = $this->getResultSetArray($query);
        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

        $o['type']=$json_obj['type'];
        $o['features']=$json_obj['features'];

      }
      else{
        $cApp_fn->fail_and_exit(
          $o,
          'e031'
        );
      }
    }
    elseif($ds['collection']=='lyr_all_virtual'){

      if($ds['lyr']=='vlyr011'){

        $cols[]='col1';

        $query = "
          SELECT 
            col1,
            ST_XMAX(geom) AS data_e,
            ST_XMIN(geom) AS data_w,
            ST_YMAX(geom) AS data_n,
            ST_YMIN(geom) AS data_s,
            ST_ASGEOJSON(geom) AS geojson
          FROM (
            SELECT 
              'inner' as col1,
              ST_MakeEnvelope(".$ds['mye'].",".$ds['mys'].",".$ds['myw'].",".$ds['myn'].",4326) AS geom
            UNION
            SELECT 
              'outer' as col1,
              ST_BUFFER(
                ST_MakeEnvelope(".$ds['mye'].",".$ds['mys'].",".$ds['myw'].",".$ds['myn'].",4326),
                ABS((".$ds['mye']."-".$ds['myw']."))*0.25, 'endcap=square join=mitre'
              ) AS geom
          ) foo

        ";
        //--

        $tmpres = $this->getResultSetArray($query);
        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

        $o['type']=$json_obj['type'];
        $o['features']=$json_obj['features'];

      }
      else{
        $cApp_fn->fail_and_exit(
          $o,
          'e031'
        );
      }
    }
    elseif($ds['collection']=='lyr_all_outer'){

      //--

      $lyr_meta=$cApp_fn->get_lyr_meta($ds['lyr'],$ds['MAPSLUG']);
      $table_slug_json=json_decode($lyr_meta['properties']['g_tables'], true);
      $table_slug=$table_slug_json[0];

      $g_cols_minimal=json_decode($lyr_meta['properties']['g_cols_minimal'], true);

      foreach ($g_cols_minimal as $key => $value) {
        if($value['table']==$table_slug){
          $cols=$value['cols'];
        }
      }

      //--

      if(!empty($ds['geom'])){
        $cols[]='ST_ASGEOJSON(geom) AS geojson';
        $cols[]='ST_X(ST_CENTROID(geom)) AS lng';
        $cols[]='ST_Y(ST_CENTROID(geom)) AS lat';
      }

      $table_name=$cApp_fn->get_real_table_prop($table_slug);

      $query = "
        SELECT 
          ".implode( ",", $cols )."
        FROM ".$table_name." foo
        WHERE
          foo.geom && ST_MakeEnvelope(
            ".$ds['data_e'].",
            ".$ds['data_s'].",
            ".$ds['data_w'].",
            ".$ds['data_n'].",
            4326
          )
      ";

      //--

      $this_name=$name;
      $this_features='features';
      $tmpres = $this->getResultSetArray($query);
      if ($tmpres['response'] != '200') {
        $o['type']='FeatureCollection';
        $o[$this_features]=array();
        $o['geoQuery'][$this_name]['iTotalRecords'] = 1;
      }
      else{
        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

        $o['type']=$json_obj['type'];
        $o[$this_features]=$json_obj['features'];
        $o['geoQuery'][$this_name]['iTotalRecords'] = $json_obj['iTotalRecords'];

      }

    }
    elseif($ds['collection']=='user_access'){

      $p=array();
      $p['status'] = $cApp_ER->get_elements_roles($ds['element'],$ds['user_role']);
      $marker = array(
        'type' => 'Feature',
        'properties' => $p
      );

      $json_obj['features'][] = $marker;

      unset($marker);

      $json_obj['type']='FeatureCollection';
      $json_obj['iTotalRecords']=1;

      $o['type']=$json_obj['type'];
      $o['features']=$json_obj['features'];

    }
    elseif($ds['collection']=='lyr_all_table'){

      //--

      $lyr_meta=$cApp_fn->get_lyr_meta($ds['lyr'],$ds['MAPSLUG']);
      $table_slug_json=json_decode($lyr_meta['properties']['g_tables'], true);
      $table_slug=$table_slug_json[0];

      $g_cols_minimal=json_decode($lyr_meta['properties']['g_cols_minimal'], true);
      foreach ($g_cols_minimal as $key => $value) {
        if($value['table']==$table_slug){
          $cols=$value['cols'];
        }
      }

      //--

      if($ds['lyr']=='lyr035'){

      }
      elseif($lyr_meta['properties']['cluster_type']=='geohash'){

      }
      else{
        if(!empty($ds['geom'])){
          $cols[]='ST_ASGEOJSON(geom) AS geojson';
        }
      }

      /*$meta=$cApp_fn->get_table_meta($table_slug,$ds['MAPSLUG']);
      
      $cols=array();
      foreach ($meta as $k2 => $f) {
        $p=$f['properties'];
        if($p['g_preview']==true){
          $cols[]=$p['g_slug'];
        }
      }*/

      $table_name=$cApp_fn->get_real_table_prop($table_slug);

      $query = "";

      $query .= "
        SELECT 
          ".implode( ",", $cols )."
        FROM
          ".$table_name." foo
        WHERE
          1=1
      ";
      if(!empty($ds['query']) && $ds['query']=='true'){
        $query .= " 
          AND ".$ds['filter_field']."='".$ds['filter_value']."'
          
        ";
      }
      if(!empty($ds['check_null'])){
        $query .= " 
          AND NOT(".$ds['check_null']." IS null)
        ";
      }
      if(!empty($ds['g_master'])){
        $query .= " 
          AND g_master='".$ds['g_master']."'
        ";
      }

      if(!empty($g_cols_minimal[0]['order_by'])){
        $query .= " 
          ORDER BY ".implode( ",", $g_cols_minimal[0]['order_by'])."
        ";
      }

      //--
      $this_name=$name;
      $this_features='features';
      $tmpres = $this->getResultSetArray($query);
      if ($tmpres['response'] != '200') {
        $o['type']='FeatureCollection';
        $o[$this_features]=array();
        $o['geoQuery'][$this_name]['iTotalRecords'] = 1;
      }
      else{
        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

        $o['type']=$json_obj['type'];
        $o[$this_features]=$json_obj['features'];
        $o['geoQuery'][$this_name]['iTotalRecords'] = $json_obj['iTotalRecords'];

      }

    }
    elseif($ds['collection']=='lyr_selected_rows'){

      //--

      $lyr_meta=$cApp_fn->get_lyr_meta($ds['lyr'],$ds['MAPSLUG']);
      $table_slug_json=json_decode($lyr_meta['properties']['g_tables'], true);
      $table_slug=$table_slug_json[0];

      $g_cols_minimal=json_decode($lyr_meta['properties']['g_cols_minimal'], true);
      foreach ($g_cols_minimal as $key => $value) {
        if($value['table']==$table_slug){
          $cols=$value['cols'];
        }
      }

      //--

      if(!empty($ds['geom'])){
        $cols[]='ST_ASGEOJSON(geom) AS geojson';
      }


      /*$meta=$cApp_fn->get_table_meta($table_slug,$ds['MAPSLUG']);
      
      $cols=array();
      foreach ($meta as $k2 => $f) {
        $p=$f['properties'];
        if($p['g_preview']==true){
          $cols[]=$p['g_slug'];
        }
      }*/

      $table_name=$cApp_fn->get_real_table_prop($table_slug);

      // if($ds['lyr']=='lyrsit004'){
      //   $filter_value=array();
      //   foreach ($ds['filter_value'] as $value) {
      //     $filter_value[] = str_replace('_', '@', $value);
      //   }
      // } else {
        $filter_value=$ds['filter_value'];
      // }

      $query = "";

      $query .= "
        SELECT 
          ".implode( ",", $cols )."
        FROM
          ".$table_name." foo
        WHERE
          1=1
          AND ".$ds['filter_field']." IN ('".implode( "','", $filter_value )."')
      ";
      if(!empty($ds['g_master'])){
        $query .= " 
          AND g_master='".$ds['g_master']."'
        ";
      }
      $query .= "
        ;
      ";


      //--
      $this_name=$name;
      $this_features='features';
      $tmpres = $this->getResultSetArray($query);
      if ($tmpres['response'] != '200') {
        $o['type']='FeatureCollection';
        $o[$this_features]=array();
        $o['geoQuery'][$this_name]['iTotalRecords'] = 1;
      }
      else{
        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

        $o['type']=$json_obj['type'];
        $o[$this_features]=$json_obj['features'];
        $o['geoQuery'][$this_name]['iTotalRecords'] = $json_obj['iTotalRecords'];

      }

    }
    elseif($ds['collection']=='lyr_selected_sum'){

      //--

      $lyr_meta=$cApp_fn->get_lyr_meta($ds['lyr'],$ds['MAPSLUG']);
      $table_slug_json=json_decode($lyr_meta['properties']['g_tables'], true);
      $table_slug=$table_slug_json[0];

      $g_cols_minimal=json_decode($lyr_meta['properties']['g_cols_minimal'], true);
      foreach ($g_cols_minimal as $key => $value) {
        if($value['table']==$table_slug){
          $cols=$value['cols'];
        }
      }

      //--

      if(!empty($ds['geom'])){
        $cols[]='ST_ASGEOJSON(geom) AS geojson';
      }

      $table_name=$cApp_fn->get_real_table_prop($table_slug);

      // if($ds['lyr']=='lyrsit004'){
      //   $filter_value=array();
      //   foreach ($ds['filter_value'] as $value) {
      //     $filter_value[] = str_replace('_', '@', $value);
      //   }
      // } else {
        $filter_value=$ds['filter_value'];
      // }

      //--
      $this_name='sup_totale_particelle';
      $query = "
        SELECT
          sum(ST_AREA(geom_particella)) AS area_tot
        FROM(
          SELECT
            fo1.feat_id_ok AS id_particelle,
            ST_TRANSFORM(ST_MAKEVALID(fo1.geom),32632) AS geom_particella
          FROM
            ".$table_name." fo1
          WHERE 
            fo1.".$ds['filter_field']." IN ('".implode( "','", $filter_value )."')
        ) foo;
      ";

      //--

      $this_features='features';
      $tmpres = $this->getResultSetArray($query);
      if ($tmpres['response'] != '200') {
        $o['type']='FeatureCollection';
        $o[$this_features]=array();
        $o['geoQuery'][$this_name]['iTotalRecords'] = 1;
      }
      else{
        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);
        $o['type']=$json_obj['type'];
        $o[$this_features]=$json_obj['features'];
        $o['geoQuery'][$this_name]['iTotalRecords'] = $json_obj['iTotalRecords'];
      }

    }
    elseif($ds['collection']=='lyr_intersect_particelle'){

      $lyr_meta=$cApp_fn->get_lyr_meta($ds['input_lyr'],$ds['MAPSLUG']);
      $table_slug_json=json_decode($lyr_meta['properties']['g_tables'], true);
      $table_slug=$table_slug_json[0];
      $input_table_name=$cApp_fn->get_real_table_prop($table_slug);

      $tables_loop=array();
      foreach ($ds['lyrs'] as $key => $lyr) {
        //--

        $lyr_meta=$cApp_fn->get_lyr_meta($lyr,$ds['MAPSLUG']);
        $table_slug_json=json_decode($lyr_meta['properties']['g_tables'], true);
        $table_slug=$table_slug_json[0];

        //--
        //$meta_sub=$cApp_fn->get_table_meta($table_slug_sub,$ds['MAPSLUG']);
        // foreach ($map_meta['properties']['g_table'] as $key => $value) {
        //   if($value['slug']==$table_slug_sub){
        //     $tables_loop[]=array('table'=>$value['name'],'lyr'=>$lyr) ;
        //   }
        // }
        $tables_loop[]=array(
          'table'=>$cApp_fn->get_real_table_prop($table_slug),
          'lyr'=>$lyr
        );
      }


      // if($ds['lyr']=='lyrsit004'){
      //   $filter_value=array();
      //   foreach ($ds['filter_value'] as $value) {
      //     $filter_value[] = str_replace('_', '@', $value);
      //   }
      // } else {
        $filter_value=$ds['filter_value'];
      // }

      // if(!empty($ds['g_master'])){
      //   $query .= " 
      //     AND g_master='".$ds['g_master']."'
      //   ";
      // }
      //--

      foreach ($tables_loop as $key => $value) {
        $this_name=$value['lyr'].'_sup_intersection_z_zone';
        $query = "
          SELECT
            id_z_zone,
            sum(ST_AREA(geom_intersection)) sup_intersection
          FROM(
            SELECT
              fo1.feat_id AS id_particelle,
              ba1.feat_id AS id_z_zone,
              ST_INTERSECTION(
                ST_TRANSFORM(ST_MakeValid(fo1.geom),32632), 
                ST_TRANSFORM(ST_MakeValid(ba1.geom),32632)
              ) AS geom_intersection
            FROM
              ".$input_table_name." fo1,
              ".$value['table']." ba1
            WHERE st_intersects(ST_MakeValid(fo1.geom), ST_MakeValid(ba1.geom))
              AND fo1.".$ds['filter_field']." IN ('".implode( "','", $filter_value )."')
              AND fo1.g_master='".$ds['g_master']."'
              AND fo1.g_slug='particelle'
          ) foo
          GROUP BY
            id_z_zone;
        ";

        $this_features='features_'.$value['lyr'];
        $tmpres = $this->getResultSetArray($query);
        if ($tmpres['response'] != '200') {
          $o['type']='FeatureCollection';
          $o[$this_features]=array();
          $o['geoQuery'][$this_name]['iTotalRecords'] = 1;
        }
        else{
          $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

          $o['type']=$json_obj['type'];
          $o[$this_features]=$json_obj['features'];
          $o['geoQuery'][$this_name]['iTotalRecords'] = $json_obj['iTotalRecords'];

        }
      }



    }
    elseif($ds['collection']=='lyr_intersect_polygon'){

      foreach ($ds['lyrs'] as $key => $lyr) {
        //--

        $lyr_meta=$cApp_fn->get_lyr_meta($lyr,$ds['MAPSLUG']);
        $table_slug_json=json_decode($lyr_meta['properties']['g_tables'], true);
        $table_slug=$table_slug_json[0];

        /* $g_cols_minimal=json_decode($lyr_meta['properties']['g_cols_minimal'], true);
        foreach ($g_cols_minimal as $key => $value) {
          if($value['table']==$table_slug){
            $cols=$value['cols'];
          }
        } */

        $cols= $cApp_fn->get_tb_cols_preview($table_slug,'short');
        $cols_group = $cols;
        if(empty($cols)){
          $cols=array("'".$table_slug."' AS table_slug");
          $cols_group=array("pid");
        }

        //--
        $table_name=$cApp_fn->get_real_table_prop($table_slug);



        $polygon=$ds['input_geom']['features'][0]['geometry'];

        $this_name=$table_slug;
        $query = "
          SELECT
            ".implode( ",", $cols )."
          FROM
            ".$table_name." foo
          WHERE ST_DWithin(
            foo.geom,
            ST_GeomFromGeoJSON('".json_encode($polygon)."'),
            0
          ) AND Not(g_slug='strade')
          GROUP BY ".implode( ",", $cols_group ).";
        ";



        /* $query = "
          SELECT
            ba1.feat_id AS id_z_zone,
            ST_AREA(ST_TRANSFORM(ST_MakeValid(ba1.geom),32632)) AS sup_zone
          FROM
            db009003_07_pg_z_zone ba1
          LIMIT 10;
        "; */

        $this_features='features_'.$this_name;
        $tmpres = $this->getResultSetArray($query);
        if ($tmpres['response'] != '200') {
          $o['type']='FeatureCollection';
          $o[$this_features]=array();
          $o['geoQuery'][$this_name]['iTotalRecords'] = 1;
        }
        else{
          $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

          $o['type']=$json_obj['type'];
          $o[$this_features]=$json_obj['features'];
          $o['geoQuery'][$this_name]['iTotalRecords'] = $json_obj['iTotalRecords'];

        }

      }

    }
    elseif($ds['collection']=='lyr_intersect_point'){

      foreach ($ds['lyrs'] as $key => $lyr) {
        //--

        $lyr_meta=$cApp_fn->get_lyr_meta($lyr,$ds['MAPSLUG']);
        $table_slug_json=json_decode($lyr_meta['properties']['g_tables'], true);
        $table_slug=$table_slug_json[0];

        /* $g_cols_minimal=json_decode($lyr_meta['properties']['g_cols_minimal'], true);
        foreach ($g_cols_minimal as $key => $value) {
          if($value['table']==$table_slug){
            $cols=$value['cols'];
          }
        } */

        $cols= $cApp_fn->get_tb_cols_preview($table_slug,'short');

        //--
        $table_name=$cApp_fn->get_real_table_prop($table_slug);

        $coordinates=$ds['input_geom']['features'][0]['geometry']['coordinates'];

        $this_name=$table_slug;
        $query = "
          SELECT
            ".implode( ",", $cols )."
          FROM
            ".$table_name." foo
          WHERE ST_DWithin(
            --ST_MakeValid(foo.geom),
            foo.geom,
            ST_GeomFromText('POINT(".$coordinates[0]." ".$coordinates[1].")',4326),
            0
          ) AND Not(g_slug='strade')
          GROUP BY ".implode( ",", $cols ).";
        ";

        $this_features='features_'.$this_name;
        $tmpres = $this->getResultSetArray($query);
        if ($tmpres['response'] != '200') {
          $o['type']='FeatureCollection';
          $o[$this_features]=array();
          $o['geoQuery'][$this_name]['iTotalRecords'] = 1;
        }
        else{
          $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

          $o['type']=$json_obj['type'];
          $o[$this_features]=$json_obj['features'];
          $o['geoQuery'][$this_name]['iTotalRecords'] = $json_obj['iTotalRecords'];

        }

      }

    }
    elseif($ds['collection']=='lyr_intersect_cdu'){

      //to tb_map
      if($ds['MAPSLUG']=='mapsit001'){
        $addons_settings_json = '
          [
            {
              "addon": "a223",
              "g_master": "db009003",
              "MAPSLUG": "mapsit001",
              "municipality":"albissolamarina",
              "intersect_lyrs": [
                {
                  "table_slug": "DB009003_07_PG_ZONE_EXPORT",
                  "cols": [
                    "cdu_vincoli",
                    "cdu_art_norm"
                  ]
                },
                {
                  "table_slug": "DB009003_06_PG",
                  "cols": [
                    "cdu_vincoli",
                    "cdu_art_norm"
                  ]
                }
              ],
              "structure_RISULTATI_ANALISI": [
                "foglio",
                "particella",
                "sezione",
                "vincoli",
                "art_norm",
                "sup_perc"
              ],
              "structure_RISULTATI_NORMATIVA": [
                "???"
              ]
            }
          ]
        ';
      }
      elseif($ds['MAPSLUG']=='mapsit002'){
        $addons_settings_json = '
          [
            {
              "addon": "a223",
              "g_master": "db008017",
              "municipality":"cervo",
              "MAPSLUG": "mapsit002",
              "intersect_lyrs": [
                {
                  "table_slug": "db008017_07_pg",
                  "cols": [
                    "cdu_vincoli",
                    "cdu_art_norm"
                  ]
                },
                {
                  "table_slug": "db008017_90_pg",
                  "cols": [
                    "cdu_vincoli",
                    "cdu_art_norm"
                  ]
                }
              ],
              "structure_RISULTATI_ANALISI": [
                "foglio",
                "particella",
                "sezione",
                "vincoli",
                "art_norm",
                "sup_perc"
              ],
              "structure_RISULTATI_NORMATIVA": [
                "???"
              ]
            }
          ]
        ';
      }
      elseif($ds['MAPSLUG']=='mapsit003'){
        $addons_settings_json = '
          [
            {
              "addon": "a223",
              "g_master": "db007028",
              "municipality":"fontainemore",
              "MAPSLUG": "mapsit003",
              "intersect_lyrs": [
                {
                  "table_slug": "db007028_07_pg",
                  "cols": [
                    "cdu_vincoli",
                    "cdu_art_norm"
                  ]
                },
                {
                  "table_slug": "db007028_99_pg",
                  "cols": [
                    "cdu_vincoli",
                    "cdu_art_norm"
                  ]
                },
                {
                  "table_slug": "db007028_06_pg",
                  "cols": [
                    "cdu_vincoli",
                    "cdu_art_norm"
                  ]
                }
              ],
              "structure_RISULTATI_ANALISI": [
                "foglio",
                "particella",
                "sezione",
                "vincoli",
                "art_norm",
                "sup_perc"
              ],
              "structure_RISULTATI_NORMATIVA": [
                "???"
              ]
            }
          ]
        ';
      }
      elseif($ds['MAPSLUG']=='mapsit004'){
        $addons_settings_json = '
          [
            {
              "addon": "a223",
              "g_master": "db009030",
              "municipality":"garlenda",
              "MAPSLUG": "mapsit004",
              "intersect_lyrs": [
                {
                  "table_slug": "db009030_07_pg",
                  "cols": [
                    "cdu_vincoli",
                    "cdu_art_norm"
                  ]
                },
                {
                  "table_slug": "db009030_08_pg_asservimenti",
                  "cols": [
                    "cdu_vincoli",
                    "cdu_art_norm"
                  ]
                },
                {
                  "table_slug": "db009030_06_pg",
                  "cols": [
                    "cdu_vincoli",
                    "cdu_art_norm"
                  ]
                },
                {
                  "table_slug": "db009030_09_pg_incendi",
                  "cols": [
                    "cdu_vincoli",
                    "cdu_art_norm"
                  ]
                },
                {
                  "table_slug": "db009030_90_pg",
                  "cols": [
                    "cdu_vincoli",
                    "cdu_art_norm"
                  ]
                }
              ],
              "structure_RISULTATI_ANALISI": [
                "foglio",
                "particella",
                "sezione",
                "vincoli",
                "art_norm",
                "sup_perc"
              ],
              "structure_RISULTATI_NORMATIVA": [
                "???"
              ]
            }
          ]
        ';
      }
      elseif($ds['MAPSLUG']=='mapsit005'){
        $addons_settings_json = '
          [
            {
              "addon": "a223",
              "g_master": "db011020",
              "municipality":"luni",
              "MAPSLUG": "mapsit005",
              "intersect_lyrs": [
                {
                  "table_slug": "db011020_07_pg",
                  "cols": [
                    "cdu_vincoli",
                    "cdu_art_norm"
                  ]
                },
                {
                  "table_slug": "db011020_06_pg",
                  "cols": [
                    "cdu_vincoli",
                    "cdu_art_norm"
                  ]
                }
              ],
              "structure_RISULTATI_ANALISI": [
                "foglio",
                "particella",
                "sezione",
                "vincoli",
                "art_norm",
                "sup_perc"
              ],
              "structure_RISULTATI_NORMATIVA": [
                "???"
              ]
            }
          ]
        ';
      }
      elseif($ds['MAPSLUG']=='mapsit006'){
        $addons_settings_json = '
          [
            {
              "addon": "a223",
              "g_master": "db010048",
              "municipality":"rezzoaglio",
              "MAPSLUG": "mapsit006",
              "intersect_lyrs": [
                {
                  "table_slug": "db010048_07_pg",
                  "cols": [
                    "cdu_vincoli",
                    "cdu_art_norm"
                  ]
                },
                {
                  "table_slug": "db010048_90_pg",
                  "cols": [
                    "cdu_vincoli",
                    "cdu_art_norm"
                  ]
                },
                {
                  "table_slug": "db010048_09_pg_incendi_poli",
                  "cols": [
                    "cdu_vincoli",
                    "cdu_art_norm"
                  ]
                }
              ],
              "structure_RISULTATI_ANALISI": [
                "foglio",
                "particella",
                "sezione",
                "vincoli",
                "art_norm",
                "sup_perc"
              ],
              "structure_RISULTATI_NORMATIVA": [
                "???"
              ]
            }
          ]
        ';
      }
      elseif($ds['MAPSLUG']=='mapsit007'){
        $addons_settings_json = '
          [
            {
              "addon": "a223",
              "g_master": "db009067",
              "municipality":"vezziportio",
              "MAPSLUG": "mapsit007",
              "intersect_lyrs": [
                {
                  "table_slug": "db009067_07_pg",
                  "cols": [
                    "cdu_vincoli",
                    "cdu_art_norm"
                  ]
                },
                {
                  "table_slug": "db009067_06_pg",
                  "cols": [
                    "cdu_vincoli",
                    "cdu_art_norm"
                  ]
                },
                {
                  "table_slug": "db009067_09_pg_aree_percorse_fuoco",
                  "cols": [
                    "cdu_vincoli",
                    "cdu_art_norm"
                  ]
                }
              ],
              "structure_RISULTATI_ANALISI": [
                "foglio",
                "particella",
                "sezione",
                "vincoli",
                "art_norm",
                "sup_perc"
              ],
              "structure_RISULTATI_NORMATIVA": [
                "???"
              ]
            }
          ]
        ';
      }
      else{
        echo "Dev other maps";
        exit;
      }

      $lyr_meta=$cApp_fn->get_lyr_meta($ds['input_lyr'],$ds['MAPSLUG']);
      $table_slug_json=json_decode($lyr_meta['properties']['g_tables'], true);
      $table_slug=$table_slug_json[0];
      $input_table_name=$cApp_fn->get_real_table_prop($table_slug);

      // get sup tot for each feat_id_ok
      $query = "
        SELECT
          feat_id_ok,
          sum(ST_AREA(ST_TRANSFORM(ST_MakeValid(fo1.geom),32632))) AS sup_tot
        FROM
          ".$input_table_name." fo1
        WHERE fo1.feat_id_ok IN ('".implode( "','", $ds['filter_value'] )."')
          AND fo1.g_master='".$ds['g_master']."'
          AND fo1.g_slug='particelle'
        GROUP BY feat_id_ok
        ;
      ";

      $tmpres = $this->getResultSetArray($query);

      $block_properties=array();

      $dataArray2=array();
      $feat_id_ok_Array=array();

      foreach ($tmpres['dataArray'] as $key => $value) {

        $feat_id_ok=$value["feat_id_ok"];

        $block_properties[]=array(
          "g_slug"=>$value["feat_id_ok"],
          "g_value"=>$value["sup_tot"]
        );

        $dataArray2[$feat_id_ok]["feat_id_ok"]=$value["feat_id_ok"];
        $dataArray2[$feat_id_ok]["sup_tot"]=$value["sup_tot"];
        $dataArray2[$feat_id_ok]["data"]=array();

        $feat_id_ok_Array[]=$feat_id_ok;

      }

      $sup_tot=$tmpres['dataArray'][0]['sup_tot'];

      //--

      $addons_settings=json_decode($addons_settings_json,true);
      foreach ($addons_settings as $key => $value) {
        if($value["addon"]=='a223'){
          $this_settings=$value;
        }
      }
      $intersect_lyrs=$this_settings["intersect_lyrs"];

      foreach ($intersect_lyrs as $key => $obj_lyr) {

        $table_name=$cApp_fn->get_real_table_prop(strtoupper($obj_lyr["table_slug"]));

        $cols_noempty=array_diff( $obj_lyr["cols"], ["empty"] );

        $this_name=$obj_lyr["table_slug"].'_intersection';
        $query = "
          SELECT
            block_id,
            ".implode( ",", $cols_noempty ).",
            sum(ST_AREA(geom_intersection)) sup_intersection
          FROM(
            SELECT
              fo1.".$ds['filter_field']." AS block_id,
              ba1.".implode( ",ba1.", $cols_noempty ).",
              ST_INTERSECTION(
                ST_TRANSFORM(ST_MakeValid(fo1.geom),32632), 
                ST_TRANSFORM(ST_MakeValid(ba1.geom),32632)
              ) AS geom_intersection
            FROM
              ".$input_table_name." fo1,
              ".$table_name." ba1
            WHERE st_intersects(ST_MakeValid(fo1.geom), ST_MakeValid(ba1.geom))
              AND fo1.".$ds['filter_field']." IN ('".implode( "','", $ds['filter_value'] )."')
              AND fo1.g_master='".$ds['g_master']."'
              AND fo1.g_slug='particelle'
          ) foo
          GROUP BY
            block_id,".implode( ",", $cols_noempty ).";
        ";

        $this_features='features_'.$obj_lyr["table_slug"];
        $tmpres = $this->getResultSetArray($query);
        
        $newdataArray=array();

        if ($tmpres['response'] != '200') {
          $o['type']='FeatureCollection';
          $o[$this_features]=array();
          $o['geoQuery'][$this_name]['iTotalRecords'] = 1;
        }
        else{

          foreach ($tmpres['dataArray'] as $key => $value) {

            $myoutput=array();
            $block_array=explode('_',$value['block_id']);
            $myoutput["foglio"]=$block_array[1];
            $myoutput["particella"]=$block_array[0];
            $myoutput["sezione"]='';

            //--
            
            $i=2;
            foreach ($obj_lyr["cols"] as $k2 => $v2) {
              $i++;
              if($v2=='empty'){
                $myoutput[$this_settings["structure_RISULTATI_ANALISI"][$i]]='';
              }
              else{

                $myvalue=$value[$v2];

                if(!empty($obj_lyr["decode"])){
                  foreach ($obj_lyr["decode"] as $k3 => $v3) {
                    if($v3["col"]==$v2){
                      foreach ($v3["value"] as $k4 => $v4) {
                        if($v4["g_slug"]==$value[$v2]){
                          $myvalue=$v4["g_label"];
                        }
                      }
                    }
                  }
                }

                $myoutput[$this_settings["structure_RISULTATI_ANALISI"][$i]]=$myvalue;
              }
              
            }

            foreach ($block_properties as $k5 => $block) {
              if($block["g_slug"]==$value['block_id']){
                $sup_tot_block=floatval($block["g_value"]);
              }
            }

            if($value['sup_intersection']/$sup_tot_block*100 >= 1){
              $myoutput["sup_perc"]=round($value['sup_intersection']/$sup_tot_block*100,1);
              $newdataArray[]=$myoutput;
              //--
              $myoutput["table_slug"]=$obj_lyr["table_slug"];
              //--
              $feat_id_ok2=$value['block_id'];
              $dataArray2[$feat_id_ok2]["data"][]=$myoutput;
            }

          }

        }

        $o["this_settings"]=$this_settings;

      }//end $intersect_lyrs


      //--merge all
      $newdataArray2=array();

      foreach ($feat_id_ok_Array as $key => $feat_id_ok3) {

        foreach ($dataArray2[$feat_id_ok3]["data"] as $key => $data) {
          $newdataArray2[]=$data;
        }
        
      }

      $json_obj=$cApp_fn->list_to_geojson($newdataArray2,false);

      $o['type']=$json_obj['type'];
      $o['features']=$json_obj['features'];

    }
    elseif($ds['collection']=='search_housenumber'){


      $lyr_meta=$cApp_fn->get_lyr_meta($ds['search_lyr'],$ds['MAPSLUG']);
      $table_slug_json=json_decode($lyr_meta['properties']['g_tables'], true);
      $table_slug=$table_slug_json[0];

      $table_name=$cApp_fn->get_real_table_prop($table_slug);

      /* SELECT to_tsvector(toponimo)  
        --@@ to_tsquery('fox')
      FROM dbeco_01_pt_civici_omi_milano
      WHERE to_tsvector(toponimo) @@ to_tsquery('verdi')  LIMIT 100; */
      /*
      SELECT nomecomune, tipo, toponimo , to_tsvector(street), to_tsquery('ved:*')
      FROM dbeco_01_pt_civici_omi_milano fo1 
      WHERE to_tsvector(street) @@ to_tsquery('vial:* & ver:*') 
      GROUP BY nomecomune, tipo, toponimo, street 
      LIMIT 50;
      */
      $t1 = explode(' ',rtrim($ds['search_text']));
      $query = "
        SELECT
          nomecomune, tipo, toponimo, ST_X(ST_CENTROID(ST_UNION(geom))) as lng, ST_Y(ST_CENTROID(ST_UNION(geom))) as lat
        FROM 
          ".$table_name." fo1
          WHERE 
            to_tsvector(nomecomune || ' ' || street) @@ to_tsquery('".implode(':* & ',$t1).":*') 
            AND g_master='".$ds['g_master']."'
        GROUP BY nomecomune, tipo, toponimo
        LIMIT 50;
      ";

      $this_name='A';
      $this_features='feature';
      $tmpres = $this->getResultSetArray($query);
      if ($tmpres['response'] != '200') {
        $o['type']='FeatureCollection';
        $o[$this_features]=array();
        $o['geoQuery'][$this_name]['iTotalRecords'] = 1;

        $query = "
          SELECT
            nomecomune, tipo, toponimo, civico, ST_X(ST_CENTROID(geom)) as lng, ST_Y(ST_CENTROID(geom)) as lat
          FROM 
            ".$table_name." fo1
            WHERE 
              to_tsvector(nomecomune || ' ' || street || ' ' || civico) @@ to_tsquery('".implode(':* & ',$t1).":*')
              AND g_master='".$ds['g_master']."'
          GROUP BY nomecomune, tipo, toponimo, civico, geom
          ;
        ";
        $tmpres = $this->getResultSetArray($query);
        if ($tmpres['response'] != '200') {
          $o['type']='FeatureCollection';
          $o[$this_features]=array();
          $o['geoQuery'][$this_name]['iTotalRecords'] = 1;

        }
        else{
          $o['_hide']['ds']['result_type']='civico';

          $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

          $o['type']=$json_obj['type'];
          $o[$this_features]=$json_obj['features'];
          $o['geoQuery'][$this_name]['iTotalRecords'] = $json_obj['iTotalRecords'];
        }


      }
      else{

        if($tmpres['rowCount']<10){
          $query = "
            SELECT
              nomecomune, tipo, toponimo, civico, ST_X(ST_CENTROID(geom)) as lng, ST_Y(ST_CENTROID(geom)) as lat
            FROM 
              ".$table_name." fo1
              WHERE 
                to_tsvector(nomecomune || ' ' || street || ' ' || civico) @@ to_tsquery('".implode(':* & ',$t1).":*') 
            GROUP BY nomecomune, tipo, toponimo, civico, geom
            ;
          ";
          $tmpres = $this->getResultSetArray($query);
          if ($tmpres['response'] != '200') {
            $o['type']='FeatureCollection';
            $o[$this_features]=array();
            $o['geoQuery'][$this_name]['iTotalRecords'] = 1;

          }
          else{
            $o['_hide']['ds']['result_type']='civico';
            

            $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

            $o['type']=$json_obj['type'];
            $o[$this_features]=$json_obj['features'];
            $o['geoQuery'][$this_name]['iTotalRecords'] = $json_obj['iTotalRecords'];
          }


        }
        else{
          $o['_hide']['ds']['result_type']='nocivico';
          $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

          $o['type']=$json_obj['type'];
          $o[$this_features]=$json_obj['features'];
          $o['geoQuery'][$this_name]['iTotalRecords'] = $json_obj['iTotalRecords'];

        }

      }



    }
    elseif($ds['collection']=='viewTableIntoCatalog'){
      $o['msg'][] ='viewTableIntoCatalog';
      if(empty($ds['table_slug'])){

        //list all tables
        $query = "
          SELECT
            g_slug, g_label
          FROM geovar_master
          WHERE 
          post_status = 'publish'
          ;
        ";
        $tmpres = $this->getResultSetArray($query);
        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

        $o['type']=$json_obj['type'];
        $o['features']=$json_obj['features'];

        $o['msg'][] = array('Params'=>[
          'table_slug'=>'table slug (usually UPPER CASE)',
        ]);

      }
      else{
        $query = "
          SELECT
            pid, item_token,
            g_slug, g_label, g_description, master_type, g_group
          FROM geovar_master
          WHERE 
            g_slug = '".$ds['table_slug']."'
          ;
        ";
        $tmpres = $this->getResultSetArray($query);
        if ($tmpres['response'] != '200') {
          $o['msg'][] = 'Table does not exist in geovar_master (catalog)';
          $cApp_fn->fail_and_exit(
            $o,
            'e039'
          );
        }
        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);
        $o['feat_geovar_master']=$json_obj['features'];

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
    }
    elseif($ds['collection']=='viewTablesAndMaster'){
      $o['msg'][] ='viewTablesAndMaster';

      //list all tables
      $query = "
        SELECT tablename FROM pg_catalog.pg_tables
        WHERE schemaname='public'
        AND NOT(tablename='spatial_ref_sys')
        AND NOT(tablename LIKE 'trash_%')
        ORDER BY tablename
        ;
      ";
      $tmpres = $this->getResultSetArray($query);
      // $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);
      $pg_tables =array();
      foreach ($tmpres['dataArray'] as $key => $value) {
        $pg_tables[]=$value['tablename'];
      }
      // $o['type']=$json_obj['type'];
      // $o['features']=$json_obj['features'];

      //list all tables g_master
      $query = "
        SELECT
          g_slug, g_label
        FROM geovar_master
        WHERE 
        post_status = 'publish'
        ;
      ";
      $tmpres = $this->getResultSetArray($query);

      $tables =array();
      foreach ($pg_tables as $key => $pg_table) {

        $a["g_label"]=$pg_table;
        $a["g_slug"]="empty";

        foreach ($tmpres['dataArray'] as $key => $value) {
          if($value['g_label']==$pg_table){
            $a["g_slug"]=$value['g_slug'];
          }
        }
        $tables[]=$a;
      }
      // print_r($tables);
      $tmpres['dataArray']=$tables;
      $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);
      $o['type']=$json_obj['type'];
      $o['features']=$json_obj['features'];

    }
    elseif($ds['collection']=='viewLyrsByMaster'){
      $o['msg'][] ='viewTablesAndMaster';

      //list all tables
      $query = "
        SELECT 
          item_token,
          g_slug,
          g_label,
          g_tables
        FROM tb_lyr
        WHERE (g_tables)::text = '[\"".$ds['table_slug']."\"]'
        ;
      ";
      $tmpres = $this->getResultSetArray($query);
      if ($tmpres['response'] != '200') {
        $o['msg'][] = 'No layers found for this table ('.$ds['table_slug'].')';
        $cApp_fn->fail_and_exit(
          $o,
          'e039'
        );
      }
      else{
        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);
        $o['type']=$json_obj['type'];
        $o['features']=$json_obj['features'];
      }

    }
    elseif($ds['collection']=='viewGeoserverFLyrs'){

      $url = 'https://geoserver.studiositsa.ch:8443/geoserver/rest/workspaces/studiosit/featuretypes.json';

      $my_curl = curl_init(); 

      curl_setopt($my_curl, CURLOPT_URL, $url); 
      curl_setopt($my_curl, CURLOPT_RETURNTRANSFER, 1); 
      curl_setopt($my_curl, CURLOPT_USERPWD, GEOSERVER_USERNAME.":".GEOSERVER_PSWD);
      $return_str = curl_exec($my_curl); 
      curl_close($my_curl);
      // echo $return_str;
      print_r($return_str);
      exit;

    }
    elseif($ds['collection']=='getGeomType'){

      $table_name=$cApp_fn->get_real_table_prop($ds['table_slug']);

      //list all tables
      $tmpres =$cApp_fn->qyr_select_by_a_return_cols(
        array(),
        $table_name,
        $ds['field_name'],
        $ds['field_value'],
        array('pid','g_tables'),
        false
      );

      //--get table to search geom
      $table_slug=json_decode($tmpres['dataArray'][0]['g_tables'], true);
      $table_name2=$cApp_fn->get_real_table_prop(
        $table_slug[0]
      );

      $tmpres =$cApp_fn->GeomType_from_tablename($table_name2);

      $o['type']=$json_obj['type'];
      $o['features']=$json_obj['features'];   


    }
    elseif($ds['collection']=='viewBuildings3d'){

      $query = "
        SELECT 
          h,
          mycategory,
          ST_AREA(ST_TRANSFORM(geom,32632)) as valuePerSqm,
          0.5 AS growth,
          ST_ASGEOJSON(geom) as geojson
        FROM pg_building_osm
        WHERE ST_DWITHIN(
          geom,
          ST_SETSRID(ST_Point(".$ds['lng'].", ".$ds['lat']."),4326),
          0.01
        )
        ;
      ";
      $tmpres = $this->getResultSetArray($query);
      if ($tmpres['response'] != '200') {
        $o['msg'][] = 'No layers found for this table (PG_BUILDINGS_OSM)';
        $cApp_fn->fail_and_exit(
          $o,
          'e039'
        );
      }
      else{
        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);
        $o['type']=$json_obj['type'];
        $o['features']=$json_obj['features'];

        $baseurl = $_SERVER['DOCUMENT_ROOT'];
        $fname = $baseurl.'tmp/building.geojson';
        
        $fhandle = fopen($fname,"w");
        fwrite($fhandle,json_encode($json_obj,  JSON_NUMERIC_CHECK));
        fclose($fhandle);        

      } 

    }
    elseif($ds['collection']=='viewBuildings3d-2'){

      $query = "
        SELECT 
          h,
          main_category AS mycategory,
          ST_AREA(ST_TRANSFORM(geom,32632)) as valuePerSqm,
          0.5 AS growth,
          ST_ASGEOJSON(geom) as geojson
        FROM dbbldg_ww_pg_buildings
        WHERE ST_DWITHIN(
          geom,
          ST_SETSRID(ST_Point(".$ds['lng'].", ".$ds['lat']."),4326),
          0.01
        )
        ;
      ";
      $tmpres = $this->getResultSetArray($query);
      if ($tmpres['response'] != '200') {
        $o['msg'][] = 'No layers found for this table (PG_BUILDINGS_OSM)';
        $cApp_fn->fail_and_exit(
          $o,
          'e039'
        );
      }
      else{
        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);
        $o['type']=$json_obj['type'];
        $o['features']=$json_obj['features'];

        $baseurl = $_SERVER['DOCUMENT_ROOT'];
        $fname = $baseurl.'tmp/building.geojson';
        
        $fhandle = fopen($fname,"w");
        fwrite($fhandle,json_encode($json_obj,  JSON_NUMERIC_CHECK));
        fclose($fhandle);        

      } 

    }
    elseif($ds['collection']=='get_SunTree'){

      $distance=0.0001;

      $query = "
        SELECT 
          *
        FROM dbeco_03_pt_natural_tree
        WHERE
          ST_DWITHIN(
            st_setsrid(geom,4326),
            st_setsrid(ST_MakePoint(
              ".$ds['lng'].",
              ".$ds['lat']."
            ),4326),
            ".$distance."
          )
        ORDER BY ST_DISTANCE(
          st_setsrid(geom,4326),
          st_setsrid(ST_MakePoint(".$ds['lng'].",".$ds['lat']."),4326)
        ) ASC LIMIT 1;";
      $tmpres = $this->getResultSetArray($query);
      if ($tmpres['response'] != '200') {
        $o['msg'][] = 'No layers found for this table (natural_tree)';
        $cApp_fn->fail_and_exit(
          $o,
          'e039'
        );
      }
      else{

        if($tmpres['dataArray'][0]['suntrees']=="empty"){

          //update suntrees
          $query = "
            UPDATE dbeco_03_pt_natural_tree
            SET 
              suntrees='filled'
            WHERE
              pid='".$tmpres['dataArray'][0]['pid']."'
            RETURNING *;
          ";

          $tmpres = $this->getResultSetArray($query); 

          $o['_hide']['ds']['result_type']='updated';

        }
        else{

          $o['_hide']['ds']['result_type']='just_filled';

        }

        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);
        $o['type']=$json_obj['type'];
        $o['features']=$json_obj['features'];     
      } 

    }
    elseif($ds['collection']=='a251_AllActiveLyrByXY'){

      // print_r($ds);
      // Array
      // (
      //     [lat] => 45.598938497455
      //     [lng] => 8.9230528887054
      //     [fn_group] => geodata
      //     [qy_name] => A
      //     [action] => view_data
      //     [collection] => a251_AllActiveLyrByXY
      //     [lyr] => lyr999
      //     [a251_lyrs] => Array
      //         (
      //             [0] => lyrc55feedfbb4fa92adc6f8cc93a7a2545
      //         )

      //     [call_silent] => 
      //     [USER_LICENSE] => none
      //     [MAPSLUG] => map709206be
      // )
      foreach ($ds['a251_lyrs'] as $key => $lyr) {

        $lyr_meta=$cApp_fn->get_lyr_meta($lyr/*,MAPSLUG*/);
        $p=$lyr_meta['properties'];
        $table_slug_json=json_decode($p['g_tables'], true);
        $table_slug=$table_slug_json[0];
        $table_prop=$cApp_fn->get_real_table_prop($table_slug,'all');

        $feat_type=$p['feat_type'];

        $join_with_geom = 0;

        if(!empty($table_prop["geom_source"])){

          $geom_table_slug=$table_prop["geom_source"];

          $geom_table_prop=$cApp_fn->get_real_table_prop($geom_table_slug,'all');

          $feat_type=$geom_table_prop['feat_type'];

          $join_with_geom = 1;

        }

        if($feat_type=='polygon'){
          $distance=0;
        }
        else{
          $distance=0.0001;
        }

        $cols= $cApp_fn->get_tb_cols_preview($table_slug,'short');
        $cols_group = $cols;
        if(empty($cols)){
          // $cols=array("'".$table_slug."' AS table_slug");
          // $cols_group=array("pid");
        }
        else{
          if($join_with_geom==0){

            $query = "
              SELECT 
                ".implode( ",", $cols )."
              FROM ".$table_prop["g_label"]."
              WHERE
                ST_DWITHIN(
                  st_setsrid(geom,4326),
                  st_setsrid(ST_MakePoint(
                    ".$ds['lng'].",
                    ".$ds['lat']."
                  ),4326),
                  ".$distance."
                )
              ORDER BY ST_DISTANCE(
                st_setsrid(geom,4326),
                st_setsrid(ST_MakePoint(".$ds['lng'].",".$ds['lat']."),4326)
              ) ASC LIMIT 1;
            ";
  
  
          }
          else{
  
            $query = "
              SELECT 
                *
              FROM 
                ".$table_prop["g_label"]." foo,
                ".$geom_table_prop["g_label"]." bar
              WHERE
                foo.item_token=bar.item_token
                AND ST_DWITHIN(
                  st_setsrid(ST_MakePoint(
                    ".$ds['lng'].",
                    ".$ds['lat']."
                  ),4326),
                  geom,
                  ".$distance."
                )
              ORDER BY ST_DISTANCE(
                st_setsrid(geom,4326),
                st_setsrid(ST_MakePoint(".$ds['lng'].",".$ds['lat']."),4326)
              ) ASC 
              LIMIT 1;
            ";    
  
          }
  
          $tmpres = $this->getResultSetArray($query);
          if ($tmpres['response'] != '200') {
  
          }
          else{
            $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);
            $o['type']=$json_obj['type'];
            $o['cols'][$lyr]=$cols;
            $o['f_'.$lyr]=$json_obj['features'];    
          }          
          //print_r($query);
        }


      }//--end foreach

    }
    elseif($ds['collection']=='a252_seqAllNodes'){

      $lyr_meta=$cApp_fn->get_lyr_meta($ds['lyr'],$ds['MAPSLUG']);
      $table_slug=json_decode($lyr_meta['properties']['g_tables'],true)[0];

      if(!empty($lyr_meta['properties']['g_cols_minimal'])){

        foreach (json_decode($lyr_meta['properties']['g_cols_minimal'],true) as $key => $value) {
          if($value['table']==$table_slug){
            $cols=$value['cols'];
          }
        }

      }
      else{

        $cols[]='pid';

      }

      //$map_tb_meta=$cApp_fn->get_map_tb_meta($ds['MAPSLUG'],$table_slug);

      if(!empty($ds['geom'])){
        $cols[]='ST_ASGEOJSON(geom) AS geojson';
      }

      $map_meta=$cApp_fn->get_map_meta($ds['MAPSLUG']);

      // foreach (json_decode($map_meta['properties']['g_table'],true) as $key => $value) {
      //   if($value['slug']==$table_slug){
      //     $table_name=$value['name'];
      //   }
      // }

      $table_name=$cApp_fn->get_real_table_prop($table_slug);

      //$cols[]='in_edges';
      //$cols[]='out_edges';

      $query = "
        SELECT 
          ".implode( ",", $cols )."
        FROM
          ".$table_name." foo
        --WHERE
          --NOT(in_edges IS null OR out_edges IS null)
        ORDER BY seq ASC
      ";

      //--
      $this_name=$name;
      $this_features='features';
      $tmpres = $this->getResultSetArray($query);

      if ($tmpres['response'] != '200') {
        $o['type']='FeatureCollection';
        $o[$this_features]=array();
        $o['geoQuery'][$this_name]['iTotalRecords'] = 1;
      }
      else{
        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

        $o['type']=$json_obj['type'];
        $o[$this_features]=$json_obj['features'];
        $o['geoQuery'][$this_name]['iTotalRecords'] = $json_obj['iTotalRecords'];

      }

    }
    elseif($ds['collection']=='a254_seqAllNodes'
      || $ds['collection']=='a257_seqAllNodes'){


      if($ds['lyr']=='free'){
        $this_name='A';
        $this_features='features';
        $o['type']='FeatureCollection';
        $o[$this_features]=array();
        $o['geoQuery'][$this_name]['iTotalRecords'] = 1;
      }
      else{
        $lyr_meta=$cApp_fn->get_lyr_meta($ds['lyr'],$ds['MAPSLUG']);
        $table_slug=json_decode($lyr_meta['properties']['g_tables'],true)[0];
  
        if(!empty($lyr_meta['properties']['g_cols_minimal'])){
  
          foreach (json_decode($lyr_meta['properties']['g_cols_minimal'],true) as $key => $value) {
            if($value['table']==$table_slug){
              $cols=$value['cols'];
            }
          }
  
        }
        else{
  
          $cols[]='pid';
  
        }
  
        //$map_tb_meta=$cApp_fn->get_map_tb_meta($ds['MAPSLUG'],$table_slug);
  
        if(!empty($ds['geom'])){
          $cols[]='ST_X(geom) AS lng';
          $cols[]='ST_Y(geom) AS lat';
          $cols[]='ST_ASGEOJSON(geom) AS geojson';
        }
  
        $map_meta=$cApp_fn->get_map_meta($ds['MAPSLUG']);
  
        // foreach (json_decode($map_meta['properties']['g_table'],true) as $key => $value) {
        //   if($value['slug']==$table_slug){
        //     $table_name=$value['name'];
        //   }
        // }
  
        $table_name=$cApp_fn->get_real_table_prop($table_slug);
  
        //$cols[]='in_edges';
        //$cols[]='out_edges';
  
        $query = "
          SELECT 
            ".implode( ",", $cols )."
          FROM
            ".$table_name." foo
          --WHERE
            --NOT(in_edges IS null OR out_edges IS null)
          ORDER BY seq ASC
        ";
  
        //--
        $this_name=$name;
        $this_features='features';
        $tmpres = $this->getResultSetArray($query);
  
        if ($tmpres['response'] != '200') {
          $o['type']='FeatureCollection';
          $o[$this_features]=array();
          $o['geoQuery'][$this_name]['iTotalRecords'] = 1;
        }
        else{
          $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);
  
          $o['type']=$json_obj['type'];
          $o[$this_features]=$json_obj['features'];
          $o['geoQuery'][$this_name]['iTotalRecords'] = $json_obj['iTotalRecords'];
  
        }
      }

    }
    elseif($ds['collection']=='a252_all_route_lines'){

      $lyr_meta=$cApp_fn->get_lyr_meta($ds['lyr'],$ds['MAPSLUG']);
      $table_slug=json_decode($lyr_meta['properties']['g_tables'],true)[0];

      if(!empty($lyr_meta['properties']['g_cols_minimal'])){

        foreach (json_decode($lyr_meta['properties']['g_cols_minimal'],true) as $key => $value) {
          if($value['table']==$table_slug){
            $cols=$value['cols'];
          }
        }

      }
      else{

        $cols[]='pid';

      }

      //$map_tb_meta=$cApp_fn->get_map_tb_meta($ds['MAPSLUG'],$table_slug);

      if(!empty($ds['geom'])){
        $cols[]='ST_ASGEOJSON(geom) AS geojson';
      }

      $map_meta=$cApp_fn->get_map_meta($ds['MAPSLUG']);

      // foreach (json_decode($map_meta['properties']['g_table'],true) as $key => $value) {
      //   if($value['slug']==$table_slug){
      //     $table_name=$value['name'];
      //   }
      // }

      $table_name=$cApp_fn->get_real_table_prop($table_slug);

      $cols[]='id';
      $cols[]='f_jnctid';
      $cols[]='t_jnctid';

      $query = "
        SELECT 
          ".implode( ",", $cols )."
        FROM
          ".$table_name." foo
      ";

      //--
      $this_name=$name;
      $this_features='features';
      $tmpres = $this->getResultSetArray($query);

      if ($tmpres['response'] != '200') {
        $o['type']='FeatureCollection';
        $o[$this_features]=array();
        $o['geoQuery'][$this_name]['iTotalRecords'] = 1;
      }
      else{
        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

        $o['type']=$json_obj['type'];
        $o[$this_features]=$json_obj['features'];
        $o['geoQuery'][$this_name]['iTotalRecords'] = $json_obj['iTotalRecords'];

      }

    } 
    elseif($ds['collection']=='a252_seqDirectionPath'
      || $ds['collection']=='a254_seqDirectionPath'){

      $lyr_meta=$cApp_fn->get_lyr_meta($ds['lyr'],$ds['MAPSLUG']);
      $table_slug=json_decode($lyr_meta['properties']['g_tables'],true)[0];
      $edgesTable_name=$cApp_fn->get_real_table_prop($table_slug);

      $lyr_meta=$cApp_fn->get_lyr_meta($ds['lyrSeqNodes'],$ds['MAPSLUG']);
      $table_slug=json_decode($lyr_meta['properties']['g_tables'],true)[0];
      $seqTable_name=$cApp_fn->get_real_table_prop($table_slug);

      $cols[]='node';//start node

      // START NODE
      $query = "
        SELECT 
          ".implode( ",", $cols )."
        FROM
          ".$seqTable_name." foo
        WHERE seq=".$ds['seq']."
      ";
      //--
      $tmpres = $this->getResultSetArray($query);

      if ($tmpres['response'] != '200') {
        // never happens!
      }
      else{
        $startNode = $tmpres['dataArray'][0]['node'];
      }

      // END NODE
      $seqNext = $ds['seq']+1;
      $query = "
        SELECT 
          ".implode( ",", $cols )."
        FROM
          ".$seqTable_name." foo
        WHERE seq=".$seqNext."
      ";
      //--
      
      $tmpres = $this->getResultSetArray($query);

      if ($tmpres['response'] != '200') {
        $res['response']='000';
        $o['msg'][]='No more nodes.';
        $cApp_fn->fail_and_exit(
          $o,
          'e033'
        );
      }
      else{
        $endNode = $tmpres['dataArray'][0]['node'];
      }    
      
      // PATH
      $query = "
        SELECT foo.*,ST_ASGEOJSON(bar.geom) AS geojson FROM pgr_Dijkstra(
          'SELECT id, f_jnctid AS source, t_jnctid AS target, cost, reverse_cost FROM ".$edgesTable_name."',
          ".$startNode.", ".$endNode.", true) foo,
          (SELECT id,geom FROM ".$edgesTable_name.") bar
        WHERE foo.edge=bar.id;
      ";
      //--

      $tmpres = $this->getResultSetArray($query);

      //--

      $this_name=$name;
      $this_features='features';
      $tmpres = $this->getResultSetArray($query);

      if ($tmpres['response'] != '200') {
        $o['type']='FeatureCollection';
        $o[$this_features]=array();
        $o['geoQuery'][$this_name]['iTotalRecords'] = 1;
      }
      else{

        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

        $o['type']=$json_obj['type'];
        $o[$this_features]=$json_obj['features'];
        $o['geoQuery'][$this_name]['iTotalRecords'] = $json_obj['iTotalRecords'];

      }
    } 
    elseif($ds['collection']=='a254_userGetDirectionToSeq'
      ||$ds['collection']=='a257_userGetDirectionToSeq'){
      
      if(isset($ds['typeNavigation'])
        && $ds['typeNavigation']=='free'){

        // liveNavigation:'google'
        $fromNodeLat=$ds['lat'];
        $fromNodeLng=$ds['lng'];
        
        $i=0;
        foreach ($ds['seqNodes']['features'] as $key => $value) {
          if($value['properties']['seq']==$ds['seq']){

            $toNodeLat = $value['geometry']['coordinates'][1];
            $toNodeLng = $value['geometry']['coordinates'][0];

            $vNext=$ds['seqNodes']['features'][$i+1];
            $bNodeLat = $vNext['geometry']['coordinates'][1];
            $bNodeLng = $vNext['geometry']['coordinates'][0];

          }
          $i++;
        }

        $string_output = array();
        $googleUrl ='https://maps.googleapis.com/maps/api/directions/json?';
  
        $origin = 'origin='.$fromNodeLat.','.$fromNodeLng;
        $destination = '&destination='.$bNodeLat.','.$bNodeLng;
        $waypoints = '&waypoints='.$toNodeLat.','.$toNodeLng;
        // $waypoints .= '|45.523850782750316,9.120727361456261';
  
        $url_here = $googleUrl.$origin.$destination.$waypoints.'&key='.GMAP_IP_KEY.'&callback=?';
        if(isset($ds['drivingMode'])){
          $url_here.='&mode='.$ds['drivingMode'];
        }

        $o['_hide']['ds']['google']=$url_here;
        $json = file_get_contents($url_here);

        $obj = json_decode($json);
  
        // $properties = $obj->routes[0]->legs[0];

        // $encodedline = $obj->routes[0]->overview_polyline->points;

        // $string_output[] = decodeGooglePolyline($encodedline);
  
        // $completeRoute = $cApp_fn->decodeGooglePolyline($encodedline);

        $tmpresOutput = array();

        // A - Route
        if(count($obj->routes) == 0){
          print_r($obj);
          exit;
        }
        $aLeg = $obj->routes[0]->legs[0];

        $aRoute = array();

        if(count($aLeg->steps)>1){

          foreach ($aLeg->steps as $key => $step) {
            # code...
            $encodedline = $step->polyline->points;
            $aRoute[] = $cApp_fn->decodeGooglePolyline($encodedline);
          }
          $iA=0;
          foreach ($aRoute as $key => $points) {
            # code...'LINESTRING(0 0, 1 1,2 2)'
          
            $string = str_replace("],[", "|", $points);
            $string = str_replace(",", " ", $string);
            $string = str_replace("|", ",", $string);
            $string = str_replace("[", "", $string);
            $string = str_replace("]", "", $string);
            $query = "
            SELECT 
              'A' AS serie,
              'a".$iA."' AS leg,
              ST_ASGEOJSON(ST_LineFromText('LINESTRING(".$string.")')) AS geojson
            ";
            $tmpres2a = $this->getResultSetArray($query);

            foreach ($tmpres2a['dataArray'] as $k2a => $v2a) {
              $tmpresOutput['dataArray'][]=$v2a;
            }
            $iA++;
          }
        }

        // B - Route
        $bLeg = $obj->routes[0]->legs[1];

        $bRoute = array();

        foreach ($bLeg->steps as $key => $step) {
          # code...
          $encodedline = $step->polyline->points;
          $bRoute[] = $cApp_fn->decodeGooglePolyline($encodedline);
        }
        
        $iB=0;
        foreach ($bRoute as $key => $points) {
          # code...'LINESTRING(0 0, 1 1,2 2)'
        
          $string = str_replace("],[", "|", $points);
          $string = str_replace(",", " ", $string);
          $string = str_replace("|", ",", $string);
          $string = str_replace("[", "", $string);
          $string = str_replace("]", "", $string);
          $query = "
          SELECT 
            'B' AS serie,
            'b".$iB."' AS leg,
            ST_ASGEOJSON(ST_LineFromText('LINESTRING(".$string.")')) AS geojson
          ";
          $tmpres2a = $this->getResultSetArray($query);

          foreach ($tmpres2a['dataArray'] as $k2a => $v2a) {
            $tmpresOutput['dataArray'][]=$v2a;
          }
          $iB++;

        }

        $json_obj=$cApp_fn->list_to_geojson($tmpresOutput['dataArray'],false);

        $this_name='A';
        $this_features='features';
        $o['type']=$json_obj['type'];
        $o[$this_features]=$json_obj['features'];
        $o['geoQuery'][$this_name]['iTotalRecords'] = 1;  

      } // end if typeNavigation == free
      else{
        $lyr_meta=$cApp_fn->get_lyr_meta($ds['lyrSeqNodes'],$ds['MAPSLUG']);
        $table_slug=json_decode($lyr_meta['properties']['g_tables'],true)[0];
        $seqTable_name=$cApp_fn->get_real_table_prop($table_slug);
  
        $lyr_meta=$cApp_fn->get_lyr_meta($ds['lyrGraph'],$ds['MAPSLUG']);
        $table_slug=json_decode($lyr_meta['properties']['g_tables'],true)[0];
        $edgesTable_name=$cApp_fn->get_real_table_prop($table_slug);
  
        $cols[]='node';//node id
        $cols[]='ST_X(geom) AS node_lng';
        $cols[]='ST_Y(geom) AS node_lat';
  
        if($ds['liveNavigation']=='google'){
          $ds['edge']=-1;
        }

        // FROM NODE
        if($ds['edge']==-1){
          $query = "
            SELECT 
              ".implode( ",", $cols )."
            FROM ".$seqTable_name." foo
            WHERE 
              ST_DWITHIN(
                foo.geom,
                ST_SETSRID(
                  ST_MAKEPOINT(
                    ".(float)$ds['lng'].",
                    ".(float)$ds['lat']."
                  ),
                  4326
                ),
                1
              )
            ORDER BY 
              ST_DISTANCE(
                foo.geom,
                ST_SETSRID(
                  ST_MAKEPOINT(
                    ".(float)$ds['lng'].",
                    ".(float)$ds['lat']."
                  ),
                  4326
                )
              )
            LIMIT 1          
          ";
        }
        else{
          $query = "
            SELECT 
              ".implode( ",", $cols )." 
              FROM (
                SELECT id,f_jnctid AS node,
                ST_STARTPOINT(geom) AS geom
                FROM ".$edgesTable_name." 
                WHERE id=".$ds['edge']."
                UNION
                SELECT id,t_jnctid AS node,
                ST_ENDPOINT(geom) AS geom 
                FROM ".$edgesTable_name." 
                WHERE id=".$ds['edge']."
              ) foo       
            WHERE 
              ST_DWITHIN(
                foo.geom,
                ST_SETSRID(
                  ST_MAKEPOINT(
                    ".(float)$ds['lng'].",
                    ".(float)$ds['lat']."
                  ),
                  4326
                ),
                1
              )
            ORDER BY 
              ST_DISTANCE(
                foo.geom,
                ST_SETSRID(
                  ST_MAKEPOINT(
                    ".(float)$ds['lng'].",
                    ".(float)$ds['lat']."
                  ),
                  4326
                )
              )
            LIMIT 1          
          ";

        }

        //--
        $this_name=$name;
        $this_features='features';
        $tmpres = $this->getResultSetArray($query);

        if ($tmpres['response'] != '200') {
          $o['type']='FeatureCollection';
          $o[$this_features]=array();
          $o['geoQuery'][$this_name]['iTotalRecords'] = 1;
        }
        else{

          $fromNode = $tmpres['dataArray'][0]['node'];
          $fromNodeLat = $tmpres['dataArray'][0]['node_lat'];
          $fromNodeLng = $tmpres['dataArray'][0]['node_lng'];
          $o['_hide']['ds']['fromNodeLat']=$fromNodeLat;
          $o['_hide']['ds']['fromNodeLng']=$fromNodeLng;

          $cols=array('seq');
          $cols[]='node';//node id
          $cols[]='ST_X(geom) AS node_lng';
          $cols[]='ST_Y(geom) AS node_lat';

          $nextSeq = $ds['seq']+1;
          // TO NODE
          if(isset($ds['seqCheckedList']) && !empty($ds['seqCheckedList'])){
            $seqCheckedList=$ds['seqCheckedList'];
          }
          else{
            $seqCheckedList=array(0);
          }
          $query = "
            SELECT 
              ".implode( ",", $cols )."
            FROM
              ".$seqTable_name." foo
            WHERE 
              --seq=".$ds['seq']."
              --OR seq=".$nextSeq."
              NOT(seq IN(".implode( ",", $seqCheckedList )."))
            ORDER BY seq
            LIMIT 2
          ";

          //--
          $tmpres = $this->getResultSetArray($query);

          if ($tmpres['response'] != '200') {
            // never happens!
          }
          else{
            $toNode = $tmpres['dataArray'][0]['node'];
            $toNodeLat = $tmpres['dataArray'][0]['node_lat'];
            $toNodeLng = $tmpres['dataArray'][0]['node_lng'];
            if(!empty($tmpres['dataArray'][1])){
              $bNode = $tmpres['dataArray'][1]['node'];
              $bNodeLat = $tmpres['dataArray'][1]['node_lat'];
              $bNodeLng = $tmpres['dataArray'][1]['node_lng'];
            }
            else{
              $bNode = 0;
              $bNodeLat = 0;
              $bNodeLng = 0;
            }
          }

          if($ds['liveNavigation']=='google'){

            $string_output = array();
            $googleUrl ='https://maps.googleapis.com/maps/api/directions/json?';
      
            $origin = 'origin='.$fromNodeLat.','.$fromNodeLng;
            $destination = '&destination='.$bNodeLat.','.$bNodeLng;
            $waypoints = '&waypoints='.$toNodeLat.','.$toNodeLng;
            // $waypoints .= '|45.523850782750316,9.120727361456261';
      
            $url_here = $googleUrl.$origin.$destination.$waypoints.'&key='.GMAP_IP_KEY.'&callback=?';
            $o['_hide']['ds']['google']=$url_here;
            $json = file_get_contents($url_here);

            $obj = json_decode($json);
      
            // $properties = $obj->routes[0]->legs[0];

            $encodedline = $obj->routes[0]->overview_polyline->points;

            //$string_output[] = decodeGooglePolyline($encodedline);
      
            $completeRoute = $cApp_fn->decodeGooglePolyline($encodedline);

            $tmpresOutput = array();

            // A - Route
            $aLeg = $obj->routes[0]->legs[0];

            $aRoute = array();

            foreach ($aLeg->steps as $key => $step) {
              # code...
              $encodedline = $step->polyline->points;
              $aRoute[] = $cApp_fn->decodeGooglePolyline($encodedline);
            }
            $iA=0;
            foreach ($aRoute as $key => $points) {
              # code...'LINESTRING(0 0, 1 1,2 2)'
            
              $string = str_replace("],[", "|", $points);
              $string = str_replace(",", " ", $string);
              $string = str_replace("|", ",", $string);
              $string = str_replace("[", "", $string);
              $string = str_replace("]", "", $string);
              $query = "
              SELECT 
                'A' AS serie,
                'a".$iA."' AS leg,
                ST_ASGEOJSON(ST_LineFromText('LINESTRING(".$string.")')) AS geojson
              ";
              $tmpres2a = $this->getResultSetArray($query);

              foreach ($tmpres2a['dataArray'] as $k2a => $v2a) {
                $tmpresOutput['dataArray'][]=$v2a;
              }
              $iA++;
            }
            
            // B - Route
            $bLeg = $obj->routes[0]->legs[1];

            $bRoute = array();

            foreach ($bLeg->steps as $key => $step) {
              # code...
              $encodedline = $step->polyline->points;
              $bRoute[] = $cApp_fn->decodeGooglePolyline($encodedline);
            }
            
            $iB=0;
            foreach ($bRoute as $key => $points) {
              # code...'LINESTRING(0 0, 1 1,2 2)'
            
              $string = str_replace("],[", "|", $points);
              $string = str_replace(",", " ", $string);
              $string = str_replace("|", ",", $string);
              $string = str_replace("[", "", $string);
              $string = str_replace("]", "", $string);
              $query = "
              SELECT 
                'B' AS serie,
                'b".$iB."' AS leg,
                ST_ASGEOJSON(ST_LineFromText('LINESTRING(".$string.")')) AS geojson
              ";
              $tmpres2a = $this->getResultSetArray($query);

              foreach ($tmpres2a['dataArray'] as $k2a => $v2a) {
                $tmpresOutput['dataArray'][]=$v2a;
              }
              $iB++;

            }

            $json_obj=$cApp_fn->list_to_geojson($tmpresOutput['dataArray'],false);

            $this_name='A';
            $this_features='features';
            $o['type']=$json_obj['type'];
            $o[$this_features]=$json_obj['features'];
            $o['geoQuery'][$this_name]['iTotalRecords'] = 1;   

          }
          else{
            // pgr_Dijkstra version
            // $query = "
            //   SELECT 
            //     foo.*,
            //     'A' AS serie, 
            //     CASE
            //     WHEN f_jnctid =  foo.node THEN
            //         ST_ASGEOJSON(bar.geom) 
            //     WHEN t_jnctid = foo.node THEN
            //         ST_ASGEOJSON(ST_Reverse(bar.geom)) 
            //     END AS geojson            
            //   FROM pgr_Dijkstra(
            //     'SELECT id, f_jnctid AS source, t_jnctid AS target, cost, reverse_cost FROM ".$edgesTable_name."',
            //     ".$fromNode.", ".$toNode.", true) foo,
            //     (
            //       SELECT 
            //         id, 
            //         f_jnctid,
            //         t_jnctid,
            //         geom 
            //       FROM ".$edgesTable_name."
            //     ) bar
            //   WHERE foo.edge=bar.id;
            // ";
            // if($ds['edge']!=-1){
            //   $query = "
            //       SELECT 
            //       foo.*,
            //       'A' AS serie, 
            //       CASE
            //       WHEN f_jnctid = ".$fromNode." THEN
            //           ST_ASGEOJSON(bar.geom) 
            //       WHEN t_jnctid = ".$fromNode." THEN
            //           ST_ASGEOJSON(ST_Reverse(bar.geom)) 
            //       ELSE 
            //         ST_ASGEOJSON(bar.geom) 
            //       END AS geojson      
            //     FROM 
            //     pgr_withPoints(
            //       '
            //         SELECT id, f_jnctid AS source, t_jnctid AS target, cost, reverse_cost 
            //         FROM ".$edgesTable_name."
            //       ',
            //       '
            //         SELECT 
            //           1 AS pid, 
            //           ".$ds['edge']." AS edge_id, 
            //           ST_LineLocatePoint(
            //             (SELECT geom FROM ".$edgesTable_name." WHERE id=".$ds['edge']."), 
            //             (SELECT 
            //               ST_SETSRID(ST_MAKEPOINT(
            //                 ".$ds['lng'].",
            //                 ".$ds['lat']."
            //               ),4326) AS geom)
            //           ) AS fraction
            //       ',
            //       -1, 
            //       ".$toNode.",
            //       details => true
            //       ) foo,
            //       (
            //         SELECT 
            //           id, 
            //           f_jnctid,
            //           t_jnctid,
            //           geom 
            //         FROM ".$edgesTable_name."
            //       ) bar
            //       WHERE foo.edge=bar.id;  
            //   ";

            //   $this_name=$name;
            //   $this_features='features';
            //   $tmpresOutput = $this->getResultSetArray($query);

            // }
            // else{
              // pgr_trspVia version
              $o['_hide']['ds']['fromNode']=$fromNode;
              $o['_hide']['ds']['toNode']=$toNode;
              $o['_hide']['ds']['bNode']=$bNode;
              if($fromNode==$toNode){
                $sqlPart=array($fromNode,$bNode);
              }
              else{
                $sqlPart=array($fromNode,$toNode,$bNode);
              }
              $query = "
                SELECT 
                  foo.*,
                  CASE 
                    WHEN path_id=1 THEN 'A'
                    WHEN path_id=2 THEN 'B'
                  END AS serie, 
                  CASE
                  WHEN f_jnctid =  foo.node THEN
                      ST_ASGEOJSON(bar.geom) 
                  WHEN t_jnctid = foo.node THEN
                      ST_ASGEOJSON(ST_Reverse(bar.geom)) 
                  END AS geojson      
                FROM 
                pgr_trspVia(
                    'SELECT id, f_jnctid AS source, t_jnctid AS target, cost, reverse_cost FROM ".$edgesTable_name."',
                    'SELECT ARRAY[".$fromNode.", ".$toNode."] AS path, 0 AS cost',
                    ARRAY[".implode( ",", $sqlPart )."], 
                    directed => false,
                    strict => false,
                    U_turn_on_edge => false
                  ) foo,
                  (
                    SELECT 
                      id, 
                      f_jnctid,
                      t_jnctid,
                      geom 
                    FROM ".$edgesTable_name."
                  ) bar
                WHERE foo.edge=bar.id;
              "; 

              $this_name=$name;
              $this_features='features';
              $tmpresOutput = $this->getResultSetArray($query);

            // }


            // //$serie = ['B','C','D','E','F'];
            // $serie = ['B'];
            // $nextSeq = $ds['seq']+1;
            // $fromNode = $toNode;
            // foreach ($serie as $keyS => $s) {
            //   $cols=array('node');//node id
              
            //   $query = "
            //     SELECT 
            //       ".implode( ",", $cols )."
            //     FROM
            //       ".$seqTable_name." foo
            //     WHERE seq=".$nextSeq."
            //   ";
            //   //--
            //   $tmpres2a = $this->getResultSetArray($query);

            //   // if ($tmpres['response'] != '200') {
            //   //   // never happens!
            //   // }
            //   // else{

            //     $toNode = $tmpres2a['dataArray'][0]['node'];

            //     $query = "
            //       SELECT foo.*,'".$s."' AS serie, ST_ASGEOJSON(bar.geom) AS geojson FROM pgr_Dijkstra(
            //         'SELECT id, f_jnctid AS source, t_jnctid AS target, cost, reverse_cost FROM ".$edgesTable_name."',
            //         ".$fromNode.", ".$toNode.", true) foo,
            //         (SELECT id,geom FROM ".$edgesTable_name.") bar
            //       WHERE foo.edge=bar.id;
            //     ";
            //     //--

            //     $tmpres2b = $this->getResultSetArray($query);

            //     foreach ($tmpres2b['dataArray'] as $k3 => $d2Array) {
            //       $tmpresOutput['dataArray'][]=$d2Array;
            //     }
            //     $fromNode=$toNode;
            //     $nextSeq++;

            //   // }

            // }

            if (empty($tmpresOutput['dataArray'])) {
              $o['type']='FeatureCollection';
              $o[$this_features]=array();
              $o['geoQuery'][$this_name]['iTotalRecords'] = 1;
            }
            else{

              $json_obj=$cApp_fn->list_to_geojson($tmpresOutput['dataArray'],false);

              $o['type']=$json_obj['type'];
              $o[$this_features]=$json_obj['features'];
              $o['geoQuery'][$this_name]['iTotalRecords'] = $json_obj['iTotalRecords'];

            }

          }          


        } // if ($tmpres['response'] != '200') {

      } // end else typeNavigation == free




    }
    elseif($ds['collection']=='a254_userLocationRegister'
      ||$ds['collection']=='a257_userLocationRegister'){

      if($ds['lyrGraph']=='free'){
        foreach ($ds['gps_collection'] as $kC => $coords) {
          $query = "
            INSERT INTO tb_user_location(
              session_token,
              project_token,
              user_token,
              lat,
              lng
            )
            VALUES (
              '".$ds['session_token']."',
              '".$ds['project_token']."',
              '".$ds['user_token']."',
              '".$coords[0]."',
              '".$coords[1]."'
            )
            RETURNING pid;
          ";
          $tmpres = $this->getResultSetArray($query);
        }
        $o['_hide']['ds']['seqArray']=array();
      }
      else{
        $lyr_meta=$cApp_fn->get_lyr_meta($ds['lyrSeqNodes'],$ds['MAPSLUG']);
        $table_slug=json_decode($lyr_meta['properties']['g_tables'],true)[0];
        $seqTable_name=$cApp_fn->get_real_table_prop($table_slug);

        $lyr_meta=$cApp_fn->get_lyr_meta($ds['lyrGraph'],$ds['MAPSLUG']);
        $table_slug=json_decode($lyr_meta['properties']['g_tables'],true)[0];
        $edgesTable_name=$cApp_fn->get_real_table_prop($table_slug);

        $note='';
        if(isset($ds['note']) &&  !empty($ds['note']) ){
          $note=$ds['note'];
        }
        $seqArray=[];
        $seqReturnArray=[];
        if(isset($ds['seq']) &&  !empty($ds['seq']) ){
          $seqArray[]=array(
            "seq" => $ds['seq'],
            "lat" => $ds['lat'],
            "lng" => $ds['lng']
          );
          $seqReturnArray[]=$ds['seq'];
        }
        else{
          $cols[]='seq';//node id
          $line =[];
          foreach ($ds['gps_collection'] as $kC => $coords) {
            # code...
            // ST_MakeLine(ST_MakePoint(1,2,3), ST_MakePoint(3,4,5)
            $line[]= "ST_Point(".$coords[1].",".$coords[0].")";
            // 

            //          
            $query = "
              INSERT INTO tb_user_location(
                session_token,
                project_token,
                user_token,
                lat,
                lng
              )
              VALUES (
                '".$ds['session_token']."',
                '".$ds['project_token']."',
                '".$ds['user_token']."',
                '".$coords[0]."',
                '".$coords[1]."'
              )
              RETURNING pid;
            ";
            $tmpres = $this->getResultSetArray($query);

            $query = "
              INSERT INTO tb_user_location_edge(
                session_token,
                project_token, 
                user_token,    
                lat,
                lng,        
                edge_id,
                geom_intersection
              )
              SELECT
                '".$ds['session_token']."' AS session_token,
                '".$ds['project_token']."' AS project_token, 
                '".$ds['user_token']."' AS user_token,     
                ".$coords[0]." AS lat,
                ".$coords[1]." AS lng,
                bar.id AS edge_id,
                ST_INTERSECTION(
                  ST_TRANSFORM(
                    ST_BUFFER(
                      ST_TRANSFORM(ST_SETSRID(ST_Point(".$coords[1].",".$coords[0]."),4326),32632), 
                      20
                    ),
                    4326
                  ),                 
                  bar.geom
                ) AS geom_intersection
              FROM 
                ".$edgesTable_name." bar
              WHERE 
                ST_INTERSECTS(
                  ST_TRANSFORM(
                    ST_BUFFER(
                      ST_TRANSFORM(ST_SETSRID(ST_Point(".$coords[1].",".$coords[0]."),4326),32632), 
                      20
                    ),
                    4326
                  ), 
                  bar.geom
                )            
              RETURNING pid;
            ";

            $tmpres = $this->getResultSetArray($query);          

            $query = "
              UPDATE tb_user_session_edge foo
              SET edge_progress=bar.edge_progress
              FROM (
                SELECT 
                  bar.edge_id,
                  ST_LENGTH(ST_UNION(bar.geom_intersection)) AS edge_progress
                FROM 
                  tb_user_location_edge bar
                WHERE 
                  bar.session_token='".$ds['session_token']."'
                  AND bar.project_token='".$ds['project_token']."'
                  AND bar.user_token='".$ds['user_token']."'
                GROUP BY bar.edge_id
              ) bar
              WHERE
                foo.edge_id=bar.edge_id
                AND foo.session_token='".$ds['session_token']."'
                AND foo.project_token='".$ds['project_token']."'
                AND foo.user_token='".$ds['user_token']."'
              RETURNING pid;
            ";
            $tmpres = $this->getResultSetArray($query); 

          }

          $query = "
            SELECT 
              ".implode( ",", $cols ).",
              ST_Y(geom) AS lat,
              ST_X(geom) AS lng
            FROM ".$seqTable_name." foo
            WHERE  
              ST_WITHIN(
                foo.geom, 
                ST_TRANSFORM(ST_Buffer(
                  ST_TRANSFORM(ST_SETSRID(ST_MakeLine(
                    ARRAY[".implode( ",", $line )."]
                  ),4326),32632)
                  , 
                  10,
                  'endcap=round join=round'
                ),4326)
              )
          ";

          //--
          $tmpres = $this->getResultSetArray($query);  
          if(!empty($tmpres['dataArray'])){
            // $seq=$tmpres['dataArray'][0]['seq'];
            foreach ($tmpres['dataArray'] as $kS => $data) {
              $seqArray[]=array(
                "seq" => $data['seq'],
                "lat" => $data['lat'],
                "lng" => $data['lng']
              );
            }
          }
          else{
            $seqArray[]=array(
              "seq" => -1,
              "lat" => $ds['lat'],
              "lng" => $ds['lng']
            );
          }
        }
        // FROM NODE
        foreach ($seqArray as $kSeq => $tSeq) {
          
          $seqReturnArray[]=$tSeq['seq'];

          $query = "
            INSERT INTO dbroute_tb_user_seq(
              session_token,
              project_token,
              user_token,
              lat,
              lng,
              seq,
              note
            )
            VALUES (
              '".$ds['session_token']."',
              '".$ds['project_token']."',
              '".$ds['user_token']."',
              '".$tSeq['lat']."',
              '".$tSeq['lng']."',
              '".$tSeq['seq']."',
              '".$note."'
            )
            RETURNING pid;
          ";
          $tmpres = $this->getResultSetArray($query);
        }
        $o['_hide']['ds']['seqArray']=$seqReturnArray;
        $o['type']='FeatureCollection';
        $o['features']=array();//$json_obj['features'];
      }


      //--

    }
    elseif($ds['collection']=='a254_getCatTail'
      || $ds['collection']=='a257_getCatTail'){
      $cols[]='lat';
      $cols[]='lng';
      //$cols[]='seq';
      $query = "
        SELECT 
          ".implode( ",", $cols )."
        FROM tb_user_location foo
        WHERE  
          session_token='".$ds['session_token']."'
          AND project_token='".$ds['project_token']."'
          AND user_token='".$ds['user_token']."'
        ORDER BY post_date   
      ";  

      $this_name=$name;
      $this_features='features';
      $tmpres = $this->getResultSetArray($query);

      if ($tmpres['response'] != '200') {
        $o['type']='FeatureCollection';
        $o[$this_features]=array();
        $o['geoQuery'][$this_name]['iTotalRecords'] = 1;
      }
      else{
        
        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

        $o['type']=$json_obj['type'];
        $o[$this_features]=$json_obj['features'];
        $o['geoQuery'][$this_name]['iTotalRecords'] = $json_obj['iTotalRecords'];


        // $cols[]='lat';
        // $cols[]='lng';
        $cols[]='seq';
        $query = "
          SELECT * FROM (
            SELECT 
              ".implode( ",", $cols )."
            FROM dbroute_tb_user_seq foo
            WHERE  
              session_token='".$ds['session_token']."'
              AND project_token='".$ds['project_token']."'
              AND user_token='".$ds['user_token']."'
            ORDER BY post_date
          ) foo
          GROUP BY ".implode( ",", $cols )."     
        ";  

        $this_name=$name.'_seq';
        $this_features='features'.'_seq';
        $tmpres = $this->getResultSetArray($query);

        if ($tmpres['response'] != '200') {}
        else{
          $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);
          $o['type']=$json_obj['type'];
          $o[$this_features]=$json_obj['features'];
          $o['geoQuery'][$this_name]['iTotalRecords'] = $json_obj['iTotalRecords'];
        }

      }

      //--

    }
    elseif($ds['collection']=='a254_sessionGraph'
      || $ds['collection']=='a257_sessionGraph'){
      $query = "
        SELECT 
          pid
        FROM tb_user_session_edge foo
        WHERE  
          session_token='".$ds['session_token']."'
          AND project_token='".$ds['project_token']."'
          AND user_token='".$ds['user_token']."'
        LIMIT 1
      ";
      //--
      $tmpres = $this->getResultSetArray($query); 
      if ($tmpres['response'] != '200') {

        $lyr_meta=$cApp_fn->get_lyr_meta($ds['lyrGraph'],$ds['MAPSLUG']);
        $table_slug=json_decode($lyr_meta['properties']['g_tables'],true)[0];
        $edgesTable_name=$cApp_fn->get_real_table_prop($table_slug);        

        $query = "
          INSERT INTO tb_user_session_edge(
            session_token,
            project_token,
            user_token,
            edge_id,
            edge_length
          )
          SELECT
            '".$ds['session_token']."' AS session_token,
            '".$ds['project_token']."' AS project_token, 
            '".$ds['user_token']."' AS user_token,    
            bar.id AS edge_id,
            ST_LENGTH(bar.geom) AS edge_length
          FROM 
            ".$edgesTable_name." bar  
          WHERE
            NOT(
              (cost=-1 AND reverse_cost = -1)
              --Motorway,Roundabout,Sliproad
              OR fow IN (1,4,10,20)
              --MultiCarriageway (Not Motorway)
              OR (fow=2 AND oneway='TF')
            )
            AND project='yes'       
          RETURNING pid;
        ";

        $tmpres = $this->getResultSetArray($query); 
      }
      else{
        $o['type']='FeatureCollection';
        $o['features']=array();
        $o['geoQuery']['A']['iTotalRecords'] = 1;
      }      
    }
    elseif($ds['collection']=='getProjectToken'){

      $query = "
        SELECT 
          item_token
        FROM tb_map foo
        WHERE  
          item_token='".$ds['map_token']."'
        LIMIT 1
      ";
      //--
      $tmpres = $this->getResultSetArray($query); 

      $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

      $o['type']=$json_obj['type'];
      $o['features']=$json_obj['features'];
      $o['geoQuery']['A']['iTotalRecords'] = $json_obj['iTotalRecords'];
   
    }
    elseif($ds['collection']=='a254_loadFakeGPS'
      ||$ds['collection']=='a257_loadFakeGPS'){

      if(isset($ds['inputLine'])){
        $sql = array();
        foreach($ds['inputLine']['features']  as $k=>$v){
          $sql[]= "SELECT ST_GeomFromGeoJSON(
            '".JSON_encode($v['geometry'])."'
            ) as geom";
        }

        $query = "
          SELECT
          (ST_Dump(foo.mpoint)).path[1],
          ST_Y((ST_Dump(foo.mpoint)).geom) as lat,
          ST_X((ST_Dump(foo.mpoint)).geom) as lng,
          ST_ASGEOJSON((ST_Dump(foo.mpoint)).geom) as geojson
          FROM(
            SELECT 
            ST_LineInterpolatePoints(
            ST_LineMerge(ST_UNION(
            geom
            ))
            , 0.02
            ) as mpoint
            FROM(        
              ".implode( " UNION ALL ", $sql )."
            ) bar
          ) foo
          ;
        ";

      }
      else{

        $query = "
          SELECT 
            ST_Y(geom) as lat,
            ST_X(geom) as lng
          FROM(
            SELECT master_seq,
              (master_seq*20)+(ST_Dump(foo.mpoint)).path[1] as myorder, 
              (ST_Dump(foo.mpoint)).geom AS geom 
            FROM
            (
              SELECT  
                master_seq,
                ST_LineInterpolatePoints(
                  --ST_LineMerge(ST_UNION(
                    geom
                  --))
                  , 0.05
                ) as mpoint
              FROM dbroute_pl_".$ds['dbroute_name']."_output_route 
              WHERE master_seq<10
              --GROUP BY master_seq
            ) foo
          ) bar ORDER BY myorder;
        ";

      }


      //--
      $tmpres = $this->getResultSetArray($query); 

      $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

      $o['type']=$json_obj['type'];
      $o['features']=$json_obj['features'];
      $o['geoQuery']['A']['iTotalRecords'] = $json_obj['iTotalRecords'];
   
    }
    elseif($ds['collection']=='a254_missingGraph'){
      $lyr_meta=$cApp_fn->get_lyr_meta($ds['lyrVGraph'],$ds['MAPSLUG']);
      $table_slug=json_decode($lyr_meta['properties']['g_tables'],true)[0];
      $edgesTable_name=$cApp_fn->get_real_table_prop($table_slug); 

      $query = "
        SELECT
          edge_id,
          edge_length,     
          edge_progress,
          ST_ASGEOJSON(bar.geom) AS geojson
        FROM 
          tb_user_session_edge foo,
          ".$edgesTable_name." bar
        WHERE 
          foo.session_token='".$ds['session_token']."'
          AND foo.project_token='".$ds['project_token']."'
          AND foo.user_token='".$ds['user_token']."'
          AND foo.edge_id=bar.id 
          AND edge_progress/edge_length < 0.90 
          AND project='yes'   
        ;
      ";
      $tmpres = $this->getResultSetArray($query); 
      if ($tmpres['response'] != '200') {  

        $o['type']='FeatureCollection';
        $o['features']=array();
        $o['geoQuery']['A']['iTotalRecords'] = 1;

      }    
      else{

        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

        $o['type']=$json_obj['type'];
        $o['features']=$json_obj['features'];
        $o['geoQuery']['A']['iTotalRecords'] = $json_obj['iTotalRecords'];

        $query1 = "
          SELECT 
            sum(edge_progress)/sum(edge_length) AS progress
          FROM (
            SELECT
              edge_progress,
              edge_length
            FROM 
              tb_user_session_edge foo,
              ".$edgesTable_name." bar
            WHERE 
              foo.session_token='".$ds['session_token']."'
              AND foo.project_token='".$ds['project_token']."'
              AND foo.user_token='".$ds['user_token']."'
              AND foo.edge_id=bar.id 
              AND edge_progress/edge_length < 0.90    
          ) foo1
          ;
        ";
        $tmpres = $this->getResultSetArray($query1); 
        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);
        $o['features_sum']=$json_obj['features'];       

      } 
    }
    elseif($ds['collection']=='a254_GoogleDirections'
      || $ds['collection']=='a257_GoogleDirections'){

      $lyr_meta=$cApp_fn->get_lyr_meta($ds['lyrSeqNodes'],$ds['MAPSLUG']);
      $table_slug=json_decode($lyr_meta['properties']['g_tables'],true)[0];
      $seqTable_name=$cApp_fn->get_real_table_prop($table_slug);

      $cols[]='node';//node id
      $cols[]='ST_X(geom) AS node_lng';
      $cols[]='ST_Y(geom) AS node_lat';
      
      $query = "
        SELECT 
          ".implode( ",", $cols )."
        FROM ".$seqTable_name." foo
        WHERE 
          ST_DWITHIN(
            foo.geom,
            ST_SETSRID(
              ST_MAKEPOINT(
                ".(float)$ds['lng'].",
                ".(float)$ds['lat']."
              ),
              4326
            ),
            1
          )
        ORDER BY 
          ST_DISTANCE(
            foo.geom,
            ST_SETSRID(
              ST_MAKEPOINT(
                ".(float)$ds['lng'].",
                ".(float)$ds['lat']."
              ),
              4326
            )
          )
        LIMIT 1          
      ";      

      //--
      $this_name=$name;
      $this_features='features';
      $tmpres = $this->getResultSetArray($query);   

      if ($tmpres['response'] != '200') {
        $o['type']='FeatureCollection';
        $o[$this_features]=array();
        $o['geoQuery'][$this_name]['iTotalRecords'] = 1;
      }
      else{  
        $fromNode = $tmpres['dataArray'][0]['node'];
        $fromNodeLat = $tmpres['dataArray'][0]['node_lat'];
        $fromNodeLng = $tmpres['dataArray'][0]['node_lng'];
        $o['_hide']['ds']['fromNodeLat']=$fromNodeLat;
        $o['_hide']['ds']['fromNodeLng']=$fromNodeLng;

        $cols[]='node';//node id
        $cols[]='ST_X(geom) AS node_lng';
        $cols[]='ST_Y(geom) AS node_lat';

        $nextSeq = $ds['seq']+1;
        // TO NODE
        $query = "
          SELECT 
            ".implode( ",", $cols )."
          FROM
            ".$seqTable_name." foo
          WHERE seq=".$ds['seq']."
            OR seq=".$nextSeq."
          ORDER BY seq
        ";

        //--
        $tmpres = $this->getResultSetArray($query);

        if ($tmpres['response'] != '200') {
          // never happens!
        }
        else{
          $toNode = $tmpres['dataArray'][0]['node'];
          $toNodeLat = $tmpres['dataArray'][0]['node_lat'];
          $toNodeLng = $tmpres['dataArray'][0]['node_lng'];
          if(!empty($tmpres['dataArray'][1])){
            $bNode = $tmpres['dataArray'][1]['node'];
            $bNodeLat = $tmpres['dataArray'][1]['node_lat'];
            $bNodeLng = $tmpres['dataArray'][1]['node_lng'];
          }
          else{
            $bNode = 0;
            $bNodeLat = 0;
            $bNodeLng = 0;
          }

        }

      }

      // $source = array(45.5230836,9.1189199);
      // $target = array();
      // $target[] = array(45.5230836,9.1189199);
      // $target[] = array(45.523093,9.1199016);
      // $target[] = array(45.5231439,9.1206262);


      $string_output = array();
      $googleUrl ='https://maps.googleapis.com/maps/api/directions/json?';

      $origin = 'origin='.$fromNodeLat.','.$fromNodeLng;
      $destination = '&destination='.$bNodeLat.','.$bNodeLng;
      $waypoints = '&waypoints='.$toNodeLat.','.$toNodeLng;

      $url_here = $googleUrl.$origin.$destination.$waypoints.'&key='.GMAP_IP_KEY.'&callback=?';
      $o['_hide']['ds']['google']=$url_here;
      $json = file_get_contents($url_here);
      echo $json;
      exit;
      $obj = json_decode($json);

      $encodedline =$obj->routes[0]->overview_polyline->points;

      // "google": "origin=45.5229649,9.1211799&destination=45.5230836,9.1189199&waypoints=45.523093,9.1199016&key=AIzaSyD7j9vTmoMrOW5RmH8425aDeY2VQPvJrLk&callback=?"


      // print_r($obj);
      $string = $encodedline;
  
      $properties = $obj->routes[0]->legs[0];
  
      //http://stackoverflow.com/questions/15380712/how-to-decode-polylines-from-google-maps-direction-api-in-php
      # Step 11) unpack the string as unsigned char 'C'
      $byte_array = array_merge(unpack('C*', $string));
      $results = array();
  
      $index = 0; # tracks which char in $byte_array
      do {
        $shift = 0;
        $result = 0;
        do {
          $char = $byte_array[$index] - 63; # Step 10
          # Steps 9-5
          # get the least significat 5 bits from the byte
          # and bitwise-or it into the result
          $result |= ($char & 0x1F) << (5 * $shift);
          $shift++; $index++;
        } while ($char >= 0x20); # Step 8 most significant bit in each six bit chunk
          # is set to 1 if there is a chunk after it and zero if it's the last one
          # so if char is less than 0x20 (0b100000), then it is the last chunk in that num
  
        # Step 3-5) sign will be stored in least significant bit, if it's one, then
        # the original value was negated per step 5, so negate again
        if ($result & 1)
          $result = ~$result;
        # Step 4-1) shift off the sign bit by right-shifting and multiply by 1E-5
        $result = ($result >> 1) * 0.00001;
        $results[] = $result;
      } while ($index < count($byte_array));
  
      # to save space, lat/lons are deltas from the one that preceded them, so we need to
      # adjust all the lat/lon pairs after the first pair
      for ($i = 2; $i < count($results); $i++) {
        $results[$i] += $results[$i - 2];
      }
  
      $a=array_chunk($results, 2);
      $geometry_string='';
      $point=0;
      foreach ($a as $v1) {

        $point++;
        if($point==1){}
        else{
          //fwrite($fh, ',');
          $geometry_string.=',';
        }
        //fwrite($fh, '['.$v1[1].','.$v1[0].']'); // array coordinates
        $geometry_string.='['.$v1[1].','.$v1[0].']';

      } // for each points

      $string_output[] = $geometry_string;

      print_r($string_output);

    }
    elseif($ds['collection']=='a254_GoogleDirectionsWithRandomPoints'
      || $ds['collection']=='a257_GoogleDirectionsWithRandomPoints'){

      $string_output = array();
      $googleUrl ='https://maps.googleapis.com/maps/api/directions/json?';

      $origin = 'origin='.$ds['lat'].','.$ds['lng'];
      $destination = '&destination='.$ds['lat'].','.$ds['lng'];

      $destinationsArray = array();
      foreach ($ds['destinations']['features'] as $key => $value) {
        # code...
        $destinationsArray[] = $value['geometry']['coordinates'][1].','.$value['geometry']['coordinates'][0];
      }

      $waypoints = '&waypoints=optimize:true|'.implode('|', $destinationsArray);

      $url_here = $googleUrl.$origin.$destination.$waypoints.'&key='.GMAP_IP_KEY.'';

      if(isset($ds['drivingMode'])){
        $url_here.='&mode='.$ds['drivingMode'];
      }

      $o['_hide']['ds']['google']=$url_here;
      $json = file_get_contents($url_here);

      $obj = json_decode($json);


      // $encodedline =$obj->routes[0]->overview_polyline->points;

      // $completeRoute = $cApp_fn->decodeGooglePolyline($encodedline);
      
      // print_r($completeRoute);
      // exit;
      if(count($obj->routes) == 0){
        print_r($obj);
        exit;
      }
      $legs = $obj->routes[0]->legs;
      $tmpres['dataArray'] = array();
      foreach ($legs as $seq => $leg) {

        $geojson = array(
          "type" => "Point",
          "coordinates" => array(
            $leg->start_location->lng,
            $leg->start_location->lat
          )  
        );
        $geojson_json = json_encode($geojson, JSON_PRETTY_PRINT);        

        $tmpres['dataArray'][] = array(
          'seq'=>$seq,
          'lat'=>$leg->start_location->lat,
          'lng'=>$leg->start_location->lng,
          'geojson'=>$geojson_json,
        );
      }
      $json_obj=$cApp_fn->list_to_geojson(
        $tmpres['dataArray'],
        false
      );

      $this_name='A';
      $this_features='features';
      $o['type']=$json_obj['type'];
      $o[$this_features]=$json_obj['features'];
      $o['geoQuery'][$this_name]['iTotalRecords'] = 1;      

    }
    elseif($ds['collection']=='a255_search_token_by_email'){

      $query = "
        SELECT 
          item_token
        FROM
          geovar_user foo
        WHERE
          user_email='".$ds['email']."'
          AND post_status='publish' 
      ";

      $tmpres = $this->getResultSetArray($query); 

      if ($tmpres['response'] != '200') {  

        $user_role = array("user-testing");
        $user_role_json = json_encode($user_role, JSON_PRETTY_PRINT);
      
        $query = "
          INSERT INTO geovar_user(user_email,user_role)
          VALUES ('".$ds['email']."','".$user_role_json."')
          RETURNING pid;
        ";
        $tmpres = $this->getResultSetArray($query);

        $query = "
          SELECT 
            item_token
          FROM
            geovar_user foo
          WHERE
            pid=".$tmpres['dataArray'][0]['pid']."
        ";

        $tmpres = $this->getResultSetArray($query); 

      }

      $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);
      
      $o['type']=$json_obj['type'];
      $o['features']=$json_obj['features'];
      $o['geoQuery']['A']['iTotalRecords'] = $json_obj['iTotalRecords'];

    }    
    elseif($ds['collection']=='a255_search_map_by_token'){

      $query = "      
        SELECT 
          foo.item_token, foo.g_slug, foo.g_label, 
          foo.item_token AS map_token, 
          foo.g_sessions, foo.g_group::text AS g_group
        FROM 
          (
            SELECT 
              json_array_elements_text(g_group) AS single_group, 
              * 
              FROM tb_map
          ) foo,
          (
            SELECT 
              json_array_elements_text(user_role) AS single_user_role, 
              * 
            FROM geovar_user
          ) bar
        WHERE 
          bar.item_token='".$ds['user_token']."'
          AND (
            bar.item_token = foo.single_group
            OR bar.single_user_role = foo.single_group
            --OR foo.single_group = 'public'
          )
        GROUP BY 
          foo.item_token, foo.g_slug, foo.g_label, foo.item_token, 
          foo.g_sessions, foo.g_group::text
        ORDER BY g_label
      ";

      $tmpres = $this->getResultSetArray($query);

      if ($tmpres['response'] != '200') {
        $o['type']='FeatureCollection';
        $o['features']=array();
        $o['geoQuery']['A']['iTotalRecords'] = 1;
      }
      else{     
        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);
        
        $o['type']=$json_obj['type'];
        $o['features']=$json_obj['features'];
        $o['geoQuery']['A']['iTotalRecords'] = $json_obj['iTotalRecords'];
      }

    }    
    elseif($ds['collection']=='a255_search_session_by_project'){

      $query = "      
        SELECT 
          session_token, 
          count(pid) AS mycount,
          max(post_date) AS last_date
        FROM tb_user_activities --dbroute_tb_user_seq
        WHERE
          user_token='".$ds['user_token']."'
          AND project_token='".$ds['project_token']."'
        GROUP BY session_token
        ;
      ";

      $tmpres = $this->getResultSetArray($query);
      if ($tmpres['response'] != '200') {
        $o['type']='FeatureCollection';
        $o['features']=array();
        $o['geoQuery']['A']['iTotalRecords'] = 1;
      }
      else{     
        $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);
      
        $o['type']=$json_obj['type'];
        $o['features']=$json_obj['features'];
        $o['geoQuery']['A']['iTotalRecords'] = $json_obj['iTotalRecords'];
      }

      // --

      $query = "      
        SELECT 
          *
        FROM tb_map
        WHERE
          item_token='".$ds['map_token']."'
        ;
      ";

      $tmpres = $this->getResultSetArray($query);

      $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);
      
      $o['type']=$json_obj['type'];
      $o['features2']=$json_obj['features'];

    }
    elseif($ds['collection']=='mvt_test'){

      // Build the SQL query to retrieve the MVT tile
      // $query = "
      //   SELECT ST_AsMVT(tile, 'mapillary') AS mvt 
      //   FROM (
      //     SELECT * FROM pg_housing_census_mix01
      //     WHERE ST_Intersects(ST_TRANSFORM(geom,3857), ST_TileEnvelope(
      //       ".$ds['z'].", 
      //       ".$ds['x'].", 
      //       ".$ds['y']."
      //     ))
      //   ) AS tile
      // ";
      $query = "      
      SELECT ST_AsMVT(mvtgeom.*) AS mvt  FROM  (   
        SELECT 
        ST_AsMVTGeom(ST_TRANSFORM(t.geom,3857), ST_TileEnvelope( 
          ".$ds['z'].", 
          ".$ds['x'].", 
          ".$ds['y']."
        )) AS geom,
        cenblock10,job_rank,job_n * 10 AS job_n
        FROM pg_housing_census_mix01 t
        WHERE ST_Intersects(ST_TRANSFORM(t.geom,3857), ST_TileEnvelope( 
          ".$ds['z'].", 
          ".$ds['x'].", 
          ".$ds['y']."
        )) 
      ) mvtgeom
      ";

      $tmpres = $this->rawQueryResult($query);

      //echo $tmpres;
      // var_dump($tmpres);
      // exit;
      $data = $tmpres['mvt'];
      // header('Content-Length: ' . filesize($data));
      // Read the contents of the stream and output them to the browser
      while (!feof($data)) {
        echo fread($data, 8192);
      }
      
      // Close the stream
      fclose($data);  
      exit;    
      // SELECT ST_AsMVT(tile, \'layer\', 4096, \'geom\') AS mvt 
      // FROM (SELECT id, geom FROM my_table WHERE ST_Intersects(geom, ST_TileEnvelope(:z, :x, :y))) AS tile');
        
    }
    elseif($ds['collection']=='mvt_dbbldg_eu_pg_buildings'){

      // Build the SQL query to retrieve the MVT tile
      $query = "      
      SELECT ST_AsMVT(mvtgeom.*) AS mvt  FROM  (   
        SELECT 
          ST_AsMVTGeom(
            foo.geom_3857, 
            ST_TileEnvelope( 
              ".$ds['z'].", 
              ".$ds['x'].", 
              ".$ds['y']."
            )
          ) AS geom,
          foo.height, 'A' AS type2, foo.type AS mytype, id
        FROM 
          dbbldg_eu_pg_buildings foo
        WHERE 
          ST_Intersects(
            foo.geom_3857, 
            ST_TileEnvelope( 
              ".$ds['z'].", 
              ".$ds['x'].", 
              ".$ds['y']."
            )
          ) 
      ) mvtgeom
      ";

      $tmpres = $this->rawQueryResult($query);

      //echo $tmpres;
      // var_dump($tmpres);
      // exit;
      $data = $tmpres['mvt'];
      // header('Content-Length: ' . filesize($data));
      // Read the contents of the stream and output them to the browser
      while (!feof($data)) {
        echo fread($data, 8192);
      }
      
      // Close the stream
      fclose($data);  
      exit;    
      // SELECT ST_AsMVT(tile, \'layer\', 4096, \'geom\') AS mvt 
      // FROM (SELECT id, geom FROM my_table WHERE ST_Intersects(geom, ST_TileEnvelope(:z, :x, :y))) AS tile');
        
    }
    elseif($ds['collection']=='mvt_baseGraph'){

      if(!isset($ds['slug'])){
        echo 'slug not set';
        exit;
      }
      // Build the SQL query to retrieve the MVT tile
      $query = "      
      SELECT ST_AsMVT(mvtgeom.*) AS mvt  FROM  (   
        SELECT 
          ST_AsMVTGeom(
            ST_TRANSFORM(foo.geom,3857), 
            ST_TileEnvelope( 
              ".$ds['z'].", 
              ".$ds['x'].", 
              ".$ds['y']."
            )
          ) AS geom,
          foo.motor_vehicle, id
        FROM 
          dbroute_pl_".$ds['slug']."_edges foo
        WHERE 
          ST_Intersects(
            ST_TRANSFORM(foo.geom,3857), 
            ST_TileEnvelope( 
              ".$ds['z'].", 
              ".$ds['x'].", 
              ".$ds['y']."
            )
          ) 
      ) mvtgeom
      ";

      $tmpres = $this->rawQueryResult($query);

      //echo $tmpres;
      // var_dump($tmpres);
      // exit;
      $data = $tmpres['mvt'];
      // header('Content-Length: ' . filesize($data));
      // Read the contents of the stream and output them to the browser
      while (!feof($data)) {
        echo fread($data, 8192);
      }
      
      // Close the stream
      fclose($data);  
      exit;    
      // SELECT ST_AsMVT(tile, \'layer\', 4096, \'geom\') AS mvt 
      // FROM (SELECT id, geom FROM my_table WHERE ST_Intersects(geom, ST_TileEnvelope(:z, :x, :y))) AS tile');
        
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
