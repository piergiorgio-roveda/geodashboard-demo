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
class App_Action_GetData extends Data_Access {

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
  public function main_get_data($o){

    $ds=$o['_hide']['ds'];

    $name='A';
    if(!empty($ds['qy_name'])){
      $name=$ds['qy_name'];
    }
		
    $cApp_fn = new App_API_Geodata_fn;
    //$cApp_custom = new App_API_Geodata_custom_fn;
    //$cApp_tb = new App_API_Geodata_define_tbs;
    //$cApp_cols = new App_API_Geodata_define_cols;
		//
    //$check_license=0;
    //$qy_name=$ds['qy_name'];

		if(!isset($ds['lyr']) 
			|| empty($ds['lyr'])){
			$res['response']='000';
			$cApp_fn->fail_and_exit(
				$o,
				'e030'
			);
		}

		if(!isset($ds['collection']) 
			|| empty($ds['collection'])){
			$res['response']='000';
			$cApp_fn->fail_and_exit(
				$o,
				'e033'
			);
		}

    if($ds['collection']=='xy_iso'){

      /*$query = "
        SELECT 
          my_name
        FROM
          planet_210614_historic_castle foo
        LIMIT 10
      ";*/

      //$check_license=1;

      //$mode='short';// 'fast' $_POST['mode'];
      $apikey=HERE_APIKEY;
      //$destination=$_POST['destination'];
      //$rangetype=$_POST['rangetype'];
      //$range=$_POST['range'];

      $transportMode=$ds['mode'];
      $origin=''.$ds['lat'].','.$ds['lng'].'';
      $range_type=$ds['range_type'];
      //$range_values1=$ds['iso_value1'];
      //$range_values2=$ds['iso_value2'];
      $routingMode=$ds['routing_mode'];

      $data=array();

      foreach ($ds['iso_values'] as $key => $isoID) {
        $url='https://isoline.router.hereapi.com/v8/isolines?apiKey='.$apikey
          .'&transportMode='.$transportMode
          .'&origin='.$origin
          .'&range[type]='.$range_type
          .'&range[values]='.$isoID
          .'&routingMode='.$routingMode;
        $json = file_get_contents($url);
        $obj = json_decode($json);
        //$o['isolines']['raw']=$obj->isolines[0]->polygons[0]->outer;
        //$data = $data = FlexiblePolyline::decode($o['isolines']['polygons']['outer']);
        $FlexiblePolyline = $cApp_fn->php_heremaps_flexible_polyline_start();
        $raw=$FlexiblePolyline::decode($obj->isolines[0]->polygons[0]->outer);
        //exit;

        //ST_MakePolygon( ST_GeomFromText('LINESTRING(75 29,77 29,77 29, 75 29)'))
        $i=0;
        $linestring='';

        foreach ($raw['polyline'] as $key => $value) {
          # code...
          if($i==0){

          }
          else{
            $linestring.=',';
          }
          $linestring.=$value[1].' '.$value[0];
          $i++;
        }

        $query = "
          SELECT 
            1 AS pid,
            'm".$isoID."' AS myrange,
            ST_ASGEOJSON(geom) AS geojson
          FROM
            (
            SELECT 
              ST_SETSRID(
                ST_MakePolygon( ST_GeomFromText('LINESTRING(".$linestring.")'))
              ,4326) as geom
            ) foo
        ";

        $tmpres = $this->getResultSetArray($query);
        $data[]=$tmpres['dataArray'][0];
      }

      //--

      
      $json_obj=$cApp_fn->list_to_geojson($data,false);

      $o['type']=$json_obj['type'];
      $o['features']=$json_obj['features'];

    }
    else if($ds['collection']=='twitter_test_profile'){
      
      //echo 'Twitter API';

      $tw_conn = $cApp_fn->php_TwitterOAuth();

      $tw_res = $tw_conn->get("account/verify_credentials");
      header('Content-type: application/json');
      echo (json_encode($tw_res, JSON_PRETTY_PRINT));
      exit;

      //--

      
      $json_obj=$cApp_fn->list_to_geojson($data,false);

      $o['type']=$json_obj['type'];
      $o['features']=$json_obj['features'];

    }
    else if($ds['collection']=='twitter_test_create_post'){
      
      //echo 'Twitter API';

      $tw_conn = $cApp_fn->php_TwitterOAuth();

      //$media1 = $tw_conn->upload('media/upload', ['media' => $_SERVER['DOCUMENT_ROOT'] . '/media/210429_leafletjs_rpg.png']);
      //$media2 = $tw_conn->upload('media/upload', ['media' => $_SERVER['DOCUMENT_ROOT'] . '/media/C140606-maxresdefault.jpg']);
      $msg = ":: TEST ++++";

      //_rint_r($media2);
      //exit;

      $parameters = [
        'status' => $msg,
        //'media_ids' => implode(',', [$media1->media_id_string, $media2->media_id_string])
        'media_ids' => implode(',', ['1584506490949439491', '1584506718754578435'])

      ];
      $tw_res = $tw_conn->post('statuses/update', $parameters);
      //--

      
      //$json_obj=$cApp_fn->list_to_geojson($data,false);

      //$o['type']=$json_obj['type'];
      header('Content-type: application/json');
      echo (json_encode($tw_res, JSON_PRETTY_PRINT));
      exit;
      //$o['features']=$response;

    }
    else if($ds['collection']=='twitter_add_image_to_list'){
      
      //echo 'Twitter API';

      $tw_conn = $cApp_fn->php_TwitterOAuth();

      $tw_res = $tw_conn->upload(
        'media/upload',
        ['media' => $_SERVER['DOCUMENT_ROOT'] . '/_tmp_media/'.$ds['my_filename']]
      );

      //_print_r($tw_res);

      $c=[
        'media_id',
        'size',
        'image_type',
        'image_w',
        'image_h',
        'album',
        'my_filename',
        'my_type'
      ];

      $query = "
        INSERT INTO tw_tb_image_list(".implode( ",", $c ).")
        VALUES (
          '".$tw_res->media_id."',
          ".$tw_res->size.",
          '".$tw_res->image->image_type."',
          ".$tw_res->image->w.",
          ".$tw_res->image->h.",
          '".$ds['album']."',
          '".$ds['my_filename']."',
          '".$ds['my_type']."'
        )
        RETURNING pid;
      ";

      $tmpres = $this->getResultSetArray($query);

      $o['type']='FeatureCollection';
      $o['features']=array();//$json_obj['features'];

      //$json_obj=$cApp_fn->list_to_geojson($data,false);

      //$o['type']=$json_obj['type'];
      //header('Content-type: application/json');
      //echo (json_encode($tw_res, JSON_PRETTY_PRINT));
      //exit;
      //$o['features']=$response;

    }
    else if($ds['collection']=='twitter_auto_post'){

      $query = "
        SELECT 
          *
        FROM
          tw_tb_post_list foo
        WHERE post_status='publish'
        LIMIT 1
      ";
      //--
      $tmpres = $this->getResultSetArray($query);
      

			if ($tmpres['response'] !== '200') {
        $query = "
          UPDATE tw_tb_post_list
          SET 
            post_status='publish'
          RETURNING pid;
        ";

        $tmpres = $this->getResultSetArray($query);
        echo "Reset done";
        exit;
			}
      $data = $tmpres['dataArray'][0];

      $album=$data['album'];
      //$my_text=preg_replace("/\r\n|\r|\n/", ' "\n" ', $data['my_text']);

      $my_text_arr = preg_split("/\r\n|\r|\n/", $data['my_text']);

      $my_text='';
      foreach ($my_text_arr as $key => $value) {
        $my_text.= $value. chr(13) . chr(10) ."";
      }

      $attachment=$data['attachment'];

      $query = "
        UPDATE tw_tb_post_list
        SET 
          post_status='pending'
        WHERE item_token='".$data['item_token']."'
        RETURNING pid;
      ";

      $tmpres = $this->getResultSetArray($query);

      if($attachment=='generic'
        ||$attachment=='main'){
        $query = "
          SELECT 
            *
          FROM
            tw_tb_image_list foo
          WHERE post_status='publish'
            AND album='".$album."'
        ";
        //--
        $tmpres = $this->getResultSetArray($query);
        //$data = $tmpres['dataArray'][0];
        $collect=array();
        foreach ($tmpres['dataArray'] as $key => $value) {
          # code...
          $collect[]=$value['pid'];
        }
        $k = array_rand($collect);
        //$v = $array[$k];
        $data=$tmpres['dataArray'][$k];
        $media_id=$data['media_id'];
      }
      else{

        $media_id=$attachment;

      }

      //echo 'Twitter API';

      $tw_conn = $cApp_fn->php_TwitterOAuth();

      //$media1 = $tw_conn->upload('media/upload', ['media' => $_SERVER['DOCUMENT_ROOT'] . '/media/210429_leafletjs_rpg.png']);
      //$media2 = $tw_conn->upload('media/upload', ['media' => $_SERVER['DOCUMENT_ROOT'] . '/media/C140606-maxresdefault.jpg']);
      $msg = $my_text;

      //_rint_r($media2);
      //exit;

      $parameters = [
        'status' => $msg,
        //'media_ids' => implode(',', [$media1->media_id_string, $media2->media_id_string])
        'media_ids' => implode(',', [$media_id])
      ];

      $tw_res = $tw_conn->post('statuses/update', $parameters);
      //--

      
      //$json_obj=$cApp_fn->list_to_geojson($data,false);

      //$o['type']=$json_obj['type'];
      header('Content-type: application/json');
      echo (json_encode($tw_res, JSON_PRETTY_PRINT));
      //exit;
      //$o['features']=$response;

    }
    else if($ds['collection']=='twitter_retweet'){

      $tw_conn = $cApp_fn->php_TwitterOAuth();
      $tw_res = $tw_conn->post('statuses/retweet/'.$ds['id'].'');
      $tw_res = $tw_conn->post("favorites/create", ["id" => $ds['id']]);

      $tw_info_res = $tw_conn->get('statuses/show/'.$ds['id'].'');

      $query = "
        SELECT 
          *
        FROM
          tw_tb_image_list foo
        WHERE post_status='publish'
          AND album='".$ds['album']."'
      ";
      //_rint_r($query);
      //--
      $tmpres = $this->getResultSetArray($query);
      //$data = $tmpres['dataArray'][0];
      $collect=array();
      foreach ($tmpres['dataArray'] as $key => $value) {
        # code...
        $collect[]=$value['pid'];
      }
      $k = array_rand($collect);
      //$v = $array[$k];
      $data=$tmpres['dataArray'][$k];
      $media_id=$data['media_id'];

      $query = "
        SELECT 
          *
        FROM
          tw_tb_post_list foo
        WHERE attachment='main'
          AND album='".$ds['album']."'
        LIMIT 1
      ";

      //--
      $tmpres = $this->getResultSetArray($query);

			if ($tmpres['response'] !== '200') {
        echo 'No album defined';
        exit;
			}
      $data = $tmpres['dataArray'][0];
      //$my_text_arr = preg_split("/\r\n|\r|\n/", $data['my_text']);

      //$my_text='';
      //foreach ($my_text_arr as $key => $value) {
      //  $my_text.= $value. chr(13) . chr(10) ."";
      //}

      $parameters = [
        'status' => '@'.$tw_info_res->user->screen_name.' '.$data['my_text'],
        //'media_ids' => implode(',', [$media1->media_id_string, $media2->media_id_string]),
        'in_reply_to_status_id' => strval($ds['id']),
        'media_ids' => implode(',', [$media_id])
      ];
      var_dump($parameters);
      //exit;

      $tw_res = $tw_conn->post('statuses/update', $parameters);
      //--

      
      //$json_obj=$cApp_fn->list_to_geojson($data,false);

      //$o['type']=$json_obj['type'];
      header('Content-type: application/json');
      echo (json_encode($tw_res, JSON_PRETTY_PRINT));
      //exit;
      //$o['features']=$response;

    }
    else if($ds['collection']=='crypto_nft_sol'){

      //$url='https://api.coralcube.io/v1/getItems?symbol=underworld_sacrificies_degens';
      //$json = file_get_contents($url);
      //$json = curl_get_contents($url);
      //$obj = json_decode($json,true);
      //_rint_r($obj);

      if($ds['lyr']=='lyr047'){

        $total=array();

        $path1=ABSPATH.'tmp/crypto_nft_solana/coralcube/';
        $dir = opendir($path1);
        $files=array();
        while ($file = readdir($dir)) {
            if ($file == '.' || $file == '..') {
              continue;
            }

            $files[]=$file;
        }
        closedir($dir);
        //_rint_r($files);
        
        foreach ($files as $key => $file) {
          
          $json = file_get_contents($path1.$file);
          $obj = json_decode($json,true);
          //_rint_r($obj['collection']['name']);
          $total[$file]['coralcube']=$obj;
          //_rint_r($obj['collection']);
        }
        //--
        $path2=ABSPATH.'tmp/crypto_nft_solana/me-stat/';
        $dir = opendir($path2);
        $files=array();
        while ($file = readdir($dir)) {
            if ($file == '.' || $file == '..') {
              continue;
            }

            $files[]=$file;
        }
        closedir($dir);
        //_rint_r($files);
        
        foreach ($files as $key => $file) {
          if(!empty($total[$file])){
            $json = file_get_contents($path2.$file);
            $obj = json_decode($json,true);
            //_rint_r($obj['collection']['name']);
            $total[$file]['me-stat']=$obj;
            //_rint_r($obj['collection']);
          }
        }
        //--
        $path3=ABSPATH.'tmp/crypto_nft_solana/me-twitter/';
        $dir = opendir($path3);
        $files=array();
        while ($file = readdir($dir)) {
            if ($file == '.' || $file == '..') {
              continue;
            }

            $files[]=$file;
        }
        closedir($dir);
        //_rint_r($files);
        
        foreach ($files as $key => $file) {
          if(!empty($total[$file])){
            $json = file_get_contents($path3.$file);
            $obj = json_decode($json,true);
            //_rint_r($obj['collection']['name']);
            $total[$file]['me-twitter']=$obj;
            //_rint_r($obj['collection']);
          }
        }

        $string='';
        $string.='Name|';//
        $string.='symbol|';//
        $string.='FLOOR|';//
        $string.='VOL. 7DAY|';//
        $string.='VOL. 24H|';//
        $string.='LISTED|';//
        $string.='SUPPLY|';//
        $string.='OWNERS|';//
        $string.='TOTAL VOL|';//
        $string.='|';
        $string.='ME-floorPrice|';//
        $string.='ME-listedCount|';//
        $string.='ME-listedTotalValue|';//
        $string.='ME-avgPrice24hr|';//
        $string.='ME-volume24hr|';//
        $string.='ME-volumeAll|';//
        $string.='|';
        $string.='TWITTER count|';
        $string.='Date file Twitter|';
        $string.='MIN FP 7d|';
        $string.='MAX FP 7d';

        echo $string.PHP_EOL;

        foreach ($total as $key => $obj) {

          $string='';

          $cols=array();

          $tmp_arr=array();

          $tmp_cols=array(
            'cc_name',          //0
            'cc_symbol',        //1
            'cc_floor_price',   //2
            'cc_7d_volume',     //3
            'cc_1d_volume',     //4
            'cc_listed_count',  //5
            'cc_supply',        //6
            'cc_unique_owners', //7
            'cc_total_volume',  //8
            'cc_file_update'    //9
          );

          $i=0;
          if(!empty($obj['coralcube']['collection'])){
            $c=$obj['coralcube']['collection'];

            $tmp_arr[$tmp_cols[$i]]=$c['name'];//Name
            $cols[]=array('data_type'=>'character varying','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;

            $symbol=$c['symbol'];
            $tmp_arr[$tmp_cols[$i]]=$symbol;//symbol
            $cols[]=array('data_type'=>'character varying','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;

            $tmp_arr[$tmp_cols[$i]]=floatval(intval($c['stats']['floor_price'])/1000000000);//FLOOR
            $cols[]=array('data_type'=>'double precision','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
            $tmp_arr[$tmp_cols[$i]]=floatval(intval($c['volume'])/1000000000);//VOL. 7DAY
            $cols[]=array('data_type'=>'double precision','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
            $tmp_arr[$tmp_cols[$i]]=floatval(intval($c['stats']['sales']['1d']['volume'])/1000000000);//VOL. 24H
            $cols[]=array('data_type'=>'double precision','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
            $tmp_arr[$tmp_cols[$i]]=$c['listed_count'];//LISTED
            $cols[]=array('data_type'=>'integer','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
            $tmp_arr[$tmp_cols[$i]]=$c['stats']['count'];//SUPPLY
            $cols[]=array('data_type'=>'integer','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
            $tmp_arr[$tmp_cols[$i]]=$c['unique_owners'];//OWNERS
            $cols[]=array('data_type'=>'integer','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
            $tmp_arr[$tmp_cols[$i]]=floatval(intval($c['stats']['sales']['total']['volume'])/1000000000);//TOTAL VOL
            $cols[]=array('data_type'=>'double precision','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
            $tmp_arr[$tmp_cols[$i]]=date ("y/m/d", filemtime($path1.$c['symbol'].'.json'));
            $cols[]=array('data_type'=>'character varying','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);

            $string.=implode("|", $tmp_arr).'|';

          }
          else{
            foreach ($tmp_cols as $key => $col) {
              $string.='|';
            }
          }

          $tmp_arr=array();

          $tmp_cols=array(
            'me_floorPrice',        //0
            'me_listedCount',       //1
            'me_listedTotalValue',  //2
            'me_avgPrice24hr',      //3
            'me_volume24hr',        //4
            'me_volumeAll',         //5
            'me_file_update'        //6
          );

          $i=0;
          if(!empty($obj['me-stat']['results'])){
            $c=$obj['me-stat']['results'];

            //$string.=$c['symbol'];//symbol
            $tmp_arr[$tmp_cols[$i]]=floatval(intval($c['floorPrice'])/1000000000);//ME-floorPrice
            $cols[]=array('data_type'=>'double precision','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
            $tmp_arr[$tmp_cols[$i]]=$c['listedCount'];//ME-listedCount
            $cols[]=array('data_type'=>'integer','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
            $tmp_arr[$tmp_cols[$i]]=floatval(intval($c['listedTotalValue'])/1000000000);//ME-listedTotalValue
            $cols[]=array('data_type'=>'integer','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
            if(!empty($c['avgPrice24hr'])){
              $tmp_arr[$tmp_cols[$i]]=floatval(intval($c['avgPrice24hr'])/1000000000);//ME-avgPrice24hr
            }
            else{
              $tmp_arr[$tmp_cols[$i]]='0';
            }
            $cols[]=array('data_type'=>'double precision','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
            if(!empty($c['volume24hr'])){
              $tmp_arr[$tmp_cols[$i]]=floatval(intval($c['volume24hr'])/1000000000);//ME-volume24hr
            }
            else{
              $tmp_arr[$tmp_cols[$i]]='0';
            }
            $cols[]=array('data_type'=>'double precision','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
            $tmp_arr[$tmp_cols[$i]]=floatval(intval($c['volumeAll'])/1000000000);//ME-volumeAll
            $cols[]=array('data_type'=>'double precision','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
            $tmp_arr[$tmp_cols[$i]]=date ("y/m/d", filemtime($path2.$c['symbol'].'.json'));//ME-file timestamp
            $cols[]=array('data_type'=>'character varying','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);

            $string.=implode("|", $tmp_arr).'|';

          }
          else{
            foreach ($tmp_cols as $key => $col) {
              $string.='|';
            }
          }

          $tmp_arr=array();

          $tmp_cols=array(
            'metw_twitterFollowerCount',//0
            'metw_file_update'          //1
          );

          $i=0;
          if(!empty($obj['me-twitter'])){
            $c=$obj['me-twitter'];

            $tmp_arr[$tmp_cols[$i]]=$c['twitterFollowerCount'];//ME-twitterFollowerCount
            $cols[]=array('data_type'=>'integer','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
            $tmp_arr[$tmp_cols[$i]]=date ("y/m/d", filemtime($path3.$c['symbol'].'.json'));//ME-file timestamp
            $cols[]=array('data_type'=>'character varying','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);

            $string.=implode("|", $tmp_arr).'|';

          }
          else{
            foreach ($tmp_cols as $key => $col) {
              $string.='|';
            }
          }

          $query = "
            SELECT min(cc_floor_price::double precision) AS min_fp, max(cc_floor_price) as max_fp
            FROM tb_crypto_nft_solana
            WHERE 
            post_date > current_date - interval '7 days' AND cc_symbol='".$symbol."';
          ";
          $tmpres = $this->getResultSetArray($query);

          $string.=$tmpres['dataArray'][0]['min_fp'].'|';
          $string.=$tmpres['dataArray'][0]['max_fp'];

          echo $string.PHP_EOL;

          $b=array();
          $c=array();
          foreach ($cols as $key => $col) {
            
            //_rint_r($col);
            //exit;

            if($col['data_type']=='character varying' 
              || $col['data_type']=='timestamp without time zone' 
              || $col['data_type']=='text'){
              $b[]="'".$cApp_fn->string_clean_pgsql($col['g_value'])."'";
            }
            else{
              $b[]=$col['g_value'];
            }

            $c[]=$col['g_slug'];

          }

          $query = "
            INSERT INTO tb_crypto_nft_solana(".implode( ",", $c ).")
            VALUES (".implode( ",", $b ).")
            RETURNING pid;
          ";
          $tmpres = $this->getResultSetArray($query);

        }

      }
      elseif($ds['lyr']=='lyr048'){

        $file1=ABSPATH.'tmp/crypto_nft_solana/solanafloor-com/collections.json';
        $file2=ABSPATH.'tmp/crypto_nft_solana/solanafloor-com/current.json';

        $json = file_get_contents($file1);
        $obj1 = json_decode($json,true);

        $json = file_get_contents($file2);
        $obj2 = json_decode($json,true);

        $tmp_arr2=array();

        foreach ($obj2 as $key => $v) {
          $a=array(
            'code'=>$v['code'],//DGOD',
            'listedCount'=>$v['listedCount'],//233,
            'ownerCount'=>$v['ownerCount'],//4296,
            'tokenFloor'=>$v['tokenFloor'],//260
          );
          $tmp_arr2[]=$a;
        }

        //--
          $query = "
            SELECT cc_symbol, solanafloor_slug
            FROM tb_crypto_nft_solana_decode
          ;
          ";
          $tmpres = $this->getResultSetArray($query);
          /*
          if ($tmpres['response'] !== '200') {
            $tmp_arr[$tmp_cols[$i]]='';
          }
          else{
            $tmp_arr[$tmp_cols[$i]]=$tmpres['dataArray'][0]['cc_symbol'];
          }
          */
          $solanafloor=array();
          foreach ($tmpres['dataArray'] as $key => $value) {
            # code...
            $solanafloor[]=array(
              'cc_symbol'=>$value['cc_symbol'],
              'solanafloor_slug'=>$value['solanafloor_slug']
            );
          }
        //--

        $total=array();

        $tmp_cols=array(
          'code',
          'myname',
          'slug',
          'solventSlug',
          'tx_h24_tx',
          'tx_h24_vol',
          'tx_h24_sale',
          'tx_d7_tx',
          'tx_d7_vol',
          'tx_d7_sale',
          'change_h24_fp',
          'change_h24_sale',
          'change_d7_fp',
          'change_d7_sale',
          'd7FloorPrices',
          'listedCount',
          'ownerCount',
          'tokenFloor',
          'cc_symbol'
        );

        $iO=0;

        foreach ($obj1 as $key => $v) {
          $cols=array();

          $iO++;
          foreach ($tmp_arr2 as $kA => $vA) {
            if($vA['code']==$v['code']){
              $listedCount=$vA['listedCount'];
              $ownerCount=$vA['ownerCount'];
              $tokenFloor=$vA['tokenFloor'];
            }
          }
          $tmp_arr=array();

          $i=0;

          $tmp_arr[$tmp_cols[$i]]=$v['code'];//'DGOD',
            $cols[]=array('data_type'=>'character varying','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
          $tmp_arr[$tmp_cols[$i]]=$v['name'];//'DeGods',
            $cols[]=array('data_type'=>'character varying','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
          $tmp_arr[$tmp_cols[$i]]=$v['slug'];//'degods',
            $cols[]=array('data_type'=>'character varying','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
          if(!empty($v['solventSlug'])){
            $tmp_arr[$tmp_cols[$i]]=$v['solventSlug'];//'degods',
          }
          else{
            $tmp_arr[$tmp_cols[$i]]='';
          }
            $cols[]=array('data_type'=>'character varying','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
          $tmp_arr[$tmp_cols[$i]]=$v['transactions']['h24']['transactions'];//'transactions': 8,
            $cols[]=array('data_type'=>'integer','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
          $tmp_arr[$tmp_cols[$i]]=$v['transactions']['h24']['volume'];//'volume': 2293.57,
            $cols[]=array('data_type'=>'double precision','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
          $tmp_arr[$tmp_cols[$i]]=$v['transactions']['h24']['averageSalePrice'];//'averageSalePrice': 286.69625
            $cols[]=array('data_type'=>'double precision','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
          $tmp_arr[$tmp_cols[$i]]=$v['transactions']['d7']['transactions'];//'transactions': 90,
            $cols[]=array('data_type'=>'integer','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
          $tmp_arr[$tmp_cols[$i]]=$v['transactions']['d7']['volume'];//'volume': 24532.477,
            $cols[]=array('data_type'=>'double precision','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
          $tmp_arr[$tmp_cols[$i]]=$v['transactions']['d7']['averageSalePrice'];//'averageSalePrice': 272.58307777777776
            $cols[]=array('data_type'=>'double precision','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
          $tmp_arr[$tmp_cols[$i]]=$v['h24']['tokenFloorChange'];//'tokenFloorChange': -3.3457249070631967,
            $cols[]=array('data_type'=>'double precision','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
          $tmp_arr[$tmp_cols[$i]]=$v['h24']['averageSalePriceChange'];//'averageSalePriceChange': 7.601454516918195
            $cols[]=array('data_type'=>'double precision','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
          if(!empty($v['d7'])){
            $tmp_arr[$tmp_cols[$i]]=$v['d7']['tokenFloorChange'];//'tokenFloorChange': -5.109489051094891,
          }
          else{
            $tmp_arr[$tmp_cols[$i]]=0;
          }
            $cols[]=array('data_type'=>'double precision','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
          if(!empty($v['d7'])){
            $tmp_arr[$tmp_cols[$i]]=$v['d7']['averageSalePriceChange'];//'averageSalePriceChange': -8.007411739230895
          }
          else{
            $tmp_arr[$tmp_cols[$i]]=0;
          }
            $cols[]=array('data_type'=>'double precision','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
          $tmp_arr[$tmp_cols[$i]]=implode(";", $v['d7FloorPrices']);//'d7FloorPrices': [255,256.5,256.5,264,279,265,260],
            $cols[]=array('data_type'=>'character varying','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
          $tmp_arr[$tmp_cols[$i]]=$listedCount;
            $cols[]=array('data_type'=>'integer','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
          $tmp_arr[$tmp_cols[$i]]=$ownerCount;
            $cols[]=array('data_type'=>'integer','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;
          $tmp_arr[$tmp_cols[$i]]=$tokenFloor;
            $cols[]=array('data_type'=>'double precision','g_slug'=>$tmp_cols[$i],'g_value'=>$tmp_arr[$tmp_cols[$i]]);
            $i++;


          $tmp_arr[$tmp_cols[$i]]='';
          foreach ($solanafloor as $k2 => $v2) {
            # code...
            if($v2['solanafloor_slug']==$v['slug']){
              $tmp_arr[$tmp_cols[$i]]=$v2['cc_symbol'];
            }
          }

          $total[]=$tmp_arr;

          //--

          $b=array();
          $c=array();
          foreach ($cols as $key => $col) {
            
            //_rint_r($col);
            //exit;

            if($col['data_type']=='character varying' 
              || $col['data_type']=='timestamp without time zone' 
              || $col['data_type']=='text'){
              $b[]="'".pg_escape_string($col['g_value'])."'";
            }
            else{
              if(!empty($col['g_value'])){
                $b[]=$col['g_value'];
              }
              else{
                $b[]=0;
              }
              
            }

            $c[]=$col['g_slug'];

          }

          $query = "
            INSERT INTO tb_crypto_nft_solana_all(".implode( ",", $c ).")
            VALUES (".implode( ",", $b ).")
            RETURNING pid;
          ";
          $tmpres = $this->getResultSetArray($query);

          if ($tmpres['response'] !== '200') {
            print_r($query);
            exit;
          }

        }

        $string=implode("|", $tmp_cols).PHP_EOL;
        foreach ($total as $key => $value) {
          $string.=implode("|", $value).PHP_EOL;
        }
        echo $string;
        //
        //header('Content-type: application/json');
        //error_reporting(E_ALL);
        //ini_set('display_errors', 'on');
        //ini_set('memory_limit', '200M');
        //echo (json_encode($total, JSON_PRETTY_PRINT));
        exit;

      }
      elseif($ds['lyr']=='lyr049'){

        $file1=ABSPATH.'tmp/crypto_nft_solana/hellomoon-io/listNfts.json';

        $json = file_get_contents($file1);
        $obj1 = json_decode($json,true);

        //--
        $query = "
          SELECT cc_symbol, hellomoon_slug
          FROM tb_crypto_nft_solana_decode_hellomoon
        ;
        ";
        $tmpres = $this->getResultSetArray($query);
        /*
        if ($tmpres['response'] !== '200') {
          $tmp_arr[$tmp_cols[$i]]='';
        }
        else{
          $tmp_arr[$tmp_cols[$i]]=$tmpres['dataArray'][0]['cc_symbol'];
        }
        */
        $hellomoon=array();
        if ($tmpres['response'] == '200') {
          foreach ($tmpres['dataArray'] as $key => $value) {
            # code...
            $hellomoon[]=array(
              'cc_symbol'=>$value['cc_symbol'],
              'hellomoon_slug'=>$value['hellomoon_slug']
            );
          }
        }
        //--

        $total=array();

        /*
        $tmp_cols=array(
          'id_hellomoon',
          'myname',
          'slug',
          'floorPrice',
          'floorPriceDelta',
          'floorPriceChange',
          'countBuyers1Week',
          'countSellers1Week'
        );
        */
        //$cols=array();

        $cols=array(
          array('data_type'=>'character varying','g_slug'=>'id_hellomoon'),
          array('data_type'=>'character varying','g_slug'=>'myname'),
          array('data_type'=>'character varying','g_slug'=>'slug'),
          array('data_type'=>'double precision','g_slug'=>'floorPrice'),
          array('data_type'=>'double precision','g_slug'=>'floorPriceDelta'),
          array('data_type'=>'double precision','g_slug'=>'floorPriceChange'),
          array('data_type'=>'integer','g_slug'=>'countBuyers1Week'),
          array('data_type'=>'integer','g_slug'=>'countSellers1Week'),
          array('data_type'=>'character varying','g_slug'=>'sampleImageUrl'),
          array('data_type'=>'integer','g_slug'=>'supply'),
          array('data_type'=>'integer','g_slug'=>'currentOwnerCount'),
          array('data_type'=>'double precision','g_slug'=>'avgPriceSol'),
          array('data_type'=>'integer','g_slug'=>'magicEdenHolding'),
          array('data_type'=>'double precision','g_slug'=>'magicEdenHoldingProportion'),
          array('data_type'=>'double precision','g_slug'=>'marketCapSol'),
          array('data_type'=>'double precision','g_slug'=>'marketCapUsd'),
          array('data_type'=>'integer','g_slug'=>'mintPriceMode'),
          array('data_type'=>'double precision','g_slug'=>'listingCount'),
          array('data_type'=>'double precision','g_slug'=>'averageWashScore'),
          array('data_type'=>'double precision','g_slug'=>'minWashScore'),
          array('data_type'=>'double precision','g_slug'=>'maxWashScore'),
          array('data_type'=>'double precision','g_slug'=>'smartNetflowScore'),
          array('data_type'=>'double precision','g_slug'=>'avgPriceNow1Week'),
          array('data_type'=>'double precision','g_slug'=>'volume'),
          array('data_type'=>'double precision','g_slug'=>'volumeChange'),
          array('data_type'=>'double precision','g_slug'=>'volumeDelta'),
          array('data_type'=>'character varying','g_slug'=>'cc_symbol')
        );

        $iO=0;

        foreach ($obj1['nfts'] as $key => $v) {

          $iO++;

          $tmp_arr=array();

          $i=0;

          //'id_hellomoon',
          $tmp_arr[$cols[$i]['g_slug']]=$v['id'];//'abb24c82b2580e16568bc87736a9763e',
            $i++;

          //'myname',
          $tmp_arr[$cols[$i]['g_slug']]=str_replace("|", "$", $v['name']);//'abb24c82b2580e16568bc87736a9763e',
            $i++;

          //'slug',
          $tmp_arr[$cols[$i]['g_slug']]=str_replace("|", "$", $v['slug']);//'abb24c82b2580e16568bc87736a9763e',
            $i++;

          //'floorPrice',
          $tmp_arr[$cols[$i]['g_slug']]=$v['floorPrice'];//'abb24c82b2580e16568bc87736a9763e',
            $i++;

          //'floorPriceDelta',
          $tmp_arr[$cols[$i]['g_slug']]=$v['floorPriceDelta'];//'abb24c82b2580e16568bc87736a9763e',
            $i++;

          //'floorPriceChange',
          $tmp_arr[$cols[$i]['g_slug']]=$v['floorPriceChange'];//'abb24c82b2580e16568bc87736a9763e',
            $i++;

          //'countBuyers1Week',
          $tmp_arr[$cols[$i]['g_slug']]=$v['countBuyers1Week'];//'abb24c82b2580e16568bc87736a9763e',
            $i++;

          //'countSellers1Week'
          $tmp_arr[$cols[$i]['g_slug']]=$v['countSellers1Week'];//'abb24c82b2580e16568bc87736a9763e',
            $i++;

          $tmp_arr[$cols[$i]['g_slug']]=str_replace("|", "$", $v['sampleImageUrl']);
            $i++;

          $tmp_arr[$cols[$i]['g_slug']]=$v['supply'];
            $i++;

          $tmp_arr[$cols[$i]['g_slug']]=$v['currentOwnerCount'];
            $i++;

          $tmp_arr[$cols[$i]['g_slug']]=$v['avgPriceSol'];
            $i++;

          $tmp_arr[$cols[$i]['g_slug']]=$v['magicEdenHolding'];
            $i++;

          $tmp_arr[$cols[$i]['g_slug']]=$v['magicEdenHoldingProportion'];
            $i++;

          $tmp_arr[$cols[$i]['g_slug']]=$v['marketCapSol'];
            $i++;

          $tmp_arr[$cols[$i]['g_slug']]=$v['marketCapUsd'];
            $i++;

          $tmp_arr[$cols[$i]['g_slug']]=$v['mintPriceMode'];
            $i++;

          $tmp_arr[$cols[$i]['g_slug']]=$v['listingCount'];
            $i++;

          $tmp_arr[$cols[$i]['g_slug']]=$v['averageWashScore'];
            $i++;

          $tmp_arr[$cols[$i]['g_slug']]=$v['minWashScore'];
            $i++;

          $tmp_arr[$cols[$i]['g_slug']]=$v['maxWashScore'];
            $i++;

          $tmp_arr[$cols[$i]['g_slug']]=$v['smartNetflowScore'];
            $i++;

          $tmp_arr[$cols[$i]['g_slug']]=$v['avgPriceNow1Week'];
            $i++;

          $tmp_arr[$cols[$i]['g_slug']]=$v['volume'];
            $i++;

          $tmp_arr[$cols[$i]['g_slug']]=$v['volumeChange'];
            $i++;

          $tmp_arr[$cols[$i]['g_slug']]=$v['volumeDelta'];
            $i++;

          //$tmp_arr[$cols[$i]['g_slug']]='';

          foreach ($hellomoon as $k2 => $v2) {
            # code...
            if($v2['hellomoon_slug']==$v['slug']){
              $tmp_arr[$cols[$i]['g_slug']]=$v2['cc_symbol'];
            }
          }
          if(empty($tmp_arr[$cols[$i]['g_slug']])){
            $tmp_arr[$cols[$i]['g_slug']]='x';
          }

          $total[]=$tmp_arr;

        }

        
        $c=array();
        foreach ($cols as $key => $col) {
          if($col['g_slug']!='cc_symbol'){
            $c[]=$col['g_slug'];
          }
        }

        $query = "
          INSERT INTO tb_crypto_nft_solana_hellomoon(".implode( ",", $c ).")
          VALUES
        ";

        $value_list=array();

        foreach ($total as $key => $value) {
          //$string.=implode("|", $value).PHP_EOL;
          $b=array();
          foreach ($cols as $key => $col) {
            
            if($col['g_slug']!='cc_symbol'){
              if($col['data_type']=='character varying' 
                || $col['data_type']=='timestamp without time zone' 
                || $col['data_type']=='text'){
                //$b[]="'".pg_escape_string($value[$col['g_slug']])."'";
                $b[]="'".str_replace("'", "''", $value[$col['g_slug']])."'";
              }
              else{

                if(!empty($value[$col['g_slug']])){
                  $b[]=$value[$col['g_slug']];
                }
                else{
                  $b[]=0;
                }
                
              }
            }

          }

          $value_list[]="(".implode( ",", $b ).")";

        }
        /*
            (value_list_1),
            (value_list_2),
            ...
            (value_list_n);
        */
        $query .= implode( ",", $value_list );
        $query .= "
            RETURNING pid;";

        $tmpres = $this->getResultSetArray($query);

        if ($tmpres['response'] !== '200') {
          print_r($query);
          exit;
        }

        $query = "
          SELECT slug, min(floorprice::double precision) AS min_fp, max(floorprice::double precision) as max_fp
          FROM tb_crypto_nft_solana_hellomoon
          GROUP BY slug
          ORDER BY slug;
        ";

        $tmpres = $this->getResultSetArray($query);

        $fp_slug=array();
        foreach ($tmpres['dataArray'] as $key => $pgobj) {
          $fp_slug[$pgobj['slug'].'_min']=$pgobj['min_fp'];
          $fp_slug[$pgobj['slug'].'_max']=$pgobj['max_fp'];
        }

        //_rint_r($fp_slug);
        //exit;

        $string='';
        $tmp=array();
        foreach ($cols as $key => $col) {
          $tmp[]=$col['g_slug'];
        }
        $tmp[]='min_fp';
        $tmp[]='max_fp';
        $string.=implode("|", $tmp).PHP_EOL;
        $s=0;
        foreach ($total as $key => $value) {
          //echo implode("|", $value);
          //_rint_r($value);
          foreach ($value as $k => $v) {
            
            if($k=='slug'){
              $value['min_fp'] = $fp_slug[$v.'_min'];
              $value['max_fp'] = $fp_slug[$v.'_max'];
            }
          }

          $string.=implode("|", $value).PHP_EOL;
          
        }
        echo $string;
        //
        //header('Content-type: application/json');
        //error_reporting(E_ALL);
        //ini_set('display_errors', 'on');
        //ini_set('memory_limit', '200M');
        //echo (json_encode($total, JSON_PRETTY_PRINT));
        exit;

      }
      else{
        $cApp_fn->fail_and_exit(
          $o,
          'e033'
        );
      }

      $o['type']='FeatureCollection';
      $o['features']=array();//$json_obj['features'];

      exit;

    }
    else{
      $cApp_fn->fail_and_exit(
        $o,
        'e033'
      );
    }

    //$o['message'] ='main_get_data';
    //$o['response'] ='200';
    //$o['type'] ='FeatureCollection';

    return $o;

  }

  //----------------------------------------------------------------------------------------------------	
 
} // end class
/*
//TEST
function curl_get_contents($url)
{
  // $ch = curl_init($url);
  // curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  // curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
  // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
  // curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);


  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL,$url);
  //curl_setopt($ch, CURLOPT_POST, 1);
  //curl_setopt($ch, CURLOPT_POSTFIELDS,$vars);  //Post Fields
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

  $headers = [
    'X-Apple-Tz: 0',
    'X-Apple-Store-Front: 143444,12',
    'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,* / *;q=0.8',
    'Accept-Encoding: gzip, deflate, br',
    'Accept-Language: en-US,en;q=0.5',
    'Cache-Control: no-cache',
    'Content-Type: application/x-www-form-urlencoded; charset=utf-8',
    'Host: www.example.com',
    'Referer: http://www.example.com/index.php', //Your referrer address
    'User-Agent: PostmanRuntime/7.29.2',
    'X-MicrosoftAjax: Delta=true',
    'Accept: * / *',
    'Connection: keep-alive'
  ];

  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

  //$server_output = curl_exec ($ch);
  $data = curl_exec($ch);
  curl_close($ch);
  echo "Test";
  print_r($data);
  return $data;
}
*/