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
class App_ElementsRoles extends Data_Access {

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
  public function get_elements_roles($element,$user_role){

    /* $wd_proles = array(
      'administrator',
      'advanced',
      'premium',
      'base',
      'gruppo_a'
    ); */

    $wd_elements_roles = $this->list_elements_roles();

    if(!empty($wd_elements_roles[$element])){

      if($wd_elements_roles[$element][0]=='public'){
        return array('unlock');
      }
      else{

        $a1=$wd_elements_roles[$element];
        $a2=$user_role;

        $result=$this->intersect_roles($a1,$a2);

        return $result;

      }
    }
    else{
      return array('lock');
    }

  }

  //----------------------------------------------------------------------------------------------------	
  public function intersect_roles($a1,$a2){


    if($a1[0]=='public'){
      return array('unlock');
    }
    else{

      $result=array_intersect($a1,$a2);

      if(!empty($result)){
        return array('unlock');
      }
      else{
        return array('lock');
      }
    }

  }

  //----------------------------------------------------------------------------------------------------	
  public function get_user_access_db($element){

    $cApp_fn = new App_API_Geodata_fn;

    $dataArray=$cApp_fn->get_mapuser_meta();

    $status = $this->get_elements_roles($element,$dataArray[0]['user_role']);

    return $status;

    exit;

  }

  //----------------------------------------------------------------------------------------------------	
  public function list_elements_roles($group_action='all'){

    /* $wd_proles = array(
      'administrator',
      'advanced',
      'premium',
      'base',
      'gruppo_a'
    ); */
    $o=array();
    $o['group_action_roles'] = array(
      'public'=>['public'],
      'private'=>['private'],
      'page_dashboard_0x1'=>['public'],
      'page_geodata_0x1'=>['public'],
      'page_map_0x1'=>['public'],
      'page_explorer_0x1'=>['administrator'],
      'page_monster_0x1'=>['hidden'],
      'page_script_0x1'=>['public'],
      'map_dev_0x1'=>['administrator','nerd'],
    );

    foreach (WATCHDOG_MODULES as $key => $module) {

      /* if($module!='app_autoloader'){
        if(file_exists(WD_DIR_PATH .$module.'/db_classes/api_handler_'.$module.'.php')) {
          $mapping['API_Handler_'.$module]=WD_DIR_PATH .$module.'/db_classes/api_handler_'.$module.'.php';
        }

        if(file_exists(WD_DIR_PATH .$module.'/db_classes/app_'.$module.'.php')) {
          $mapping['App_'.$module]=WD_DIR_PATH .$module.'/db_classes/app_'.$module.'.php';
        }
      } */
      /* $className = 'API_Handler_'.$module;
      $cApiHandler = new $className();
      $group_action_roles = $cApiHandler->get_group_action_roles($group_action_roles) */;
      //--

      if($module!='app_autoloader'){
        if(file_exists(WD_DIR_PATH .$module.'/api_handler_'.$module.'.php')) {
          //$mapping['API_Handler_'.$module]=WD_DIR_PATH .$module.'/api_handler_'.$module.'.php';
          $className = 'API_Handler_'.$module;
          $cApiHandler = new $className();
          //$group_action_roles = $cApiHandler->get_group_action_roles($group_action_roles);

          $o['_hide']['ds']['fn_group']=$module;
          $o['_hide']['ds']['action']='module_settings';
          $o['_hide']['ds']['collection']='get_group_action_roles';

          $o = $cApiHandler->execCommand('watchdog_'.$module,$o);
        }

      }

    }

    if($group_action=='all'){
      return $o['group_action_roles'];
    }
    else{
      if(!empty($o['group_action_roles'][$group_action])){
        return $o['group_action_roles'][$group_action];
      }
      else{
        echo "Error, missed group_action.";
        exit;
      }
    }


  }

  //----------------------------------------------------------------------------------------------------	
  public function query_check_user_permission($group_action){

    $cApp_fn = new App_API_Geodata_fn;
    $cApp_ER = new App_ElementsRoles;

    $elements_roles=$cApp_ER->get_user_access_db($group_action);
    if($elements_roles[0]!='unlock'){
      $cApp_fn->fail_and_exit(
        array(),
        'e038',
        'Error roles.'
      );
    }

  }

} // end class
