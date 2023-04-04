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
class App_wiki extends Data_Access {

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
  public function test_app_wiki(){

    return 'Success Wiki';

  }

  //----------------------------------------------------------------------------------------------------	
  public function main_view_data($o){

    $ds=$o['_hide']['ds'];
		//$name=$ds['qy_name'];

    $cApp_fn = new App_API_Geodata_fn;
    $cApp_ER = new App_ElementsRoles;

		if(!isset($ds['collection']) 
			|| empty($ds['collection'])){
			$res['response']='000';
			$cApp_fn->fail_and_exit(
				$o,
				'e029'
			);
		}

    if($ds['collection']=='view_post_single'){

      $query = "
        SELECT 
          item_token, post_date, post_modified, 
          post_status, post_content, pid, g_group,
          g_config,post_child
        FROM
          wiki_tb_posts foo
        WHERE
          item_token='".$ds['item_token']."'
      ";

      //--

      $tmpres = $this->getResultSetArray($query);
      $json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

      $o['type']=$json_obj['type'];
      $o['features']=$json_obj['features'];

    }
    elseif($ds['collection']=='wiki_sub'){

      $dataArray=$cApp_fn->get_mapuser_meta();
      $user_role_array = $dataArray[0]['user_role'];
      $user_role_array[]='public';

      $query = "
        SELECT 
          item_token, post_date, post_modified, 
          post_status, post_content, pid, g_group,
          g_config
        FROM
          wiki_tb_posts foo
        WHERE
          post_child='".$ds['item_token']."'
        ORDER BY post_date
      ";
      //AND g_group::jsonb ?| array['".implode('\',\'',$user_role_array)."']
      //--

      $tmpres = $this->getResultSetArray($query);
      //--
      $this_name='A';
      $this_features='features';
      $tmpres = $this->getResultSetArray($query);
      if ($tmpres['response'] != '200') {
        $cApp_fn->fail_and_exit(
          $o,
          'e037',
          'Record con [post_status]=publish > 0.'
        );
      }
      $tmpres_filter=array();
      foreach ($tmpres['dataArray'] as $pgobj) {
        # code...
        if($cApp_ER->intersect_roles(json_decode($pgobj['g_group'],true),$user_role_array)[0]=='unlock'){
          $tmpres_filter[]=$pgobj;
        }
      }

      $json_obj=$cApp_fn->list_to_geojson($tmpres_filter,false);

      $o['type']=$json_obj['type'];
      $o['features']=$json_obj['features'];

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
  public function main_modify_data($o){

    $ds=$o['_hide']['ds'];
		//$name=$ds['qy_name'];

    $cApp_fn = new App_API_Geodata_fn;
    $cApp_ER = new App_ElementsRoles;

		if(!isset($ds['collection']) 
			|| empty($ds['collection'])){
			$res['response']='000';
			$cApp_fn->fail_and_exit(
				$o,
				'e029'
			);
		}

    if($ds['collection']=='save_wiki'){

      //_rint_r($ds['mycontent']);
      //exit;

      /* $marker = array(
        'g_slug' => $ds['title'],
        'content' => $ds['mycontent']
      ); */
      $content_clean=array();
      foreach ($ds['mycontent'] as $key => $value) {
        $content_clean[$key]=str_replace("'", "''", $value);
      } 
      $json_obj=[$content_clean];

      $content=json_encode($json_obj);

      //$json_obj=[$ds['g_group']];
      if(empty($ds['g_group'])){
        $ds['g_group']=array('wikidude');
      }
      $g_group=json_encode($ds['g_group']);

      $query = "
        INSERT INTO public.wiki_tb_posts(
          post_content, post_child,g_group
        )
        VALUES ('".$content."', '".$ds['post_child']."', '".$g_group."')
        RETURNING pid;
      ";
      //_rint_r($query);
      //exit;

      //--
      $cApp_ER->query_check_user_permission('page_wiki_0x3');//hard stop points
      $tmpres = $this->getResultSetArray($query);
      //--

      $tmpres=$cApp_fn->qyr_select_by_a_return_b($o,'wiki_tb_posts','pid',$tmpres['dataArray'][0]['pid'],'item_token');
      $item_token=$tmpres['dataArray'][0]['item_token'];

      //$o['_hide']['ds']['fn_group']='wiki';
      //$o['_hide']['ds']['action']='view_data';
      $o['_hide']['ds']['collection']='view_post_single';
      $o['_hide']['ds']['item_token']=$item_token;
      //$o['_hide']['ds']['output']='OBJECT';

      $json_obj = $this->main_view_data($o);
      //_rint_r($obj);
      //exit;
      //$json_obj=$cApp_fn->list_to_geojson($tmpres['dataArray'],false);

      $o['type']=$json_obj['type'];
      $o['features']=$json_obj['features'];

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
