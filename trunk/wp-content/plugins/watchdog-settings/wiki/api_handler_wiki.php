<?php 

if ((!defined('CONST_INCLUDE_KEY')) || (CONST_INCLUDE_KEY !== 'd4e2ad09-b1c3-4d70-9a9a-0e6149302486')) {
  // if accessing this class directly through URL, send 404 and exit
  // this section of code will only work if you have a 404.html file in your root document folder.
  header("Location: /404.html", TRUE, 404);
  echo file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/404.html');
  die;
}


class API_Handler_wiki {

	private $function_map;

	//--------------------------------------------------------------------------------------------------------------------
	public function __construct() {
		$this->loadFunctionMap();
  }

  private function loadFunctionMap() {

    $this->function_map = [
			'watchdog_wiki' => [
        'class' => 'API_Handler_wiki',
        'function_name' => 'watchdog_wiki'
      ]
    ];

  }

	//----------------------------------------------------------------------------------------------------------------------
	public function execCommand($varFunctionName, $o = array()) {
		// get the actual function name (if necessary) and the class it belongs to.
		$returnArray = $this->getCommand($varFunctionName);

    $available_functions=array();

    foreach ($this->function_map as $key => $value) {
      # code...
      if($key!='getToken'){
        $returnArray['available_functions'][]=$key;
      }
    }

		// if we don't get a function back, then raise the error
		if ($returnArray['success'] == FALSE) {
			return $returnArray;
		}

		$class = $returnArray['dataArray']['class'];
		$functionName = $returnArray['dataArray']['function_name'];
		// Execute User Profile Commands
		$cObjectClass = new $class();

		$m='Welcome! You request a available function.';
		$varFunctionParams['_hide']['message'][]=$m;

    $returnArray = $cObjectClass->$functionName($o);

    return $returnArray;

	}

	//----------------------------------------------------------------------------------------------------------------------
	private function getCommand($varFunctionName) {

		// get the actual function name and the class it belongs to.
		if (isset($this->function_map[$varFunctionName])) {

			$dataArray['class'] = $this->function_map[$varFunctionName]['class'];
			$dataArray['function_name'] = $this->function_map[$varFunctionName]['function_name'];
			
			$returnArray = App_Response::getResponse('e002');
			$returnArray['dataArray'] = $dataArray;

		}
		else {
			$returnArray = App_Response::getResponse('e025');
		}


		return $returnArray;

	}

	//----------------------------------------------------------------------------------------------------
	private function watchdog_wiki($o) {

		$cApp_fn = new App_API_Geodata_fn;

		$ds=$o['_hide']['ds'];

		//---

		//never here without fn_group ...
		if(!isset($ds['fn_group']) 
			|| empty($ds['fn_group'])){
			$res['response']='000';
			$cApp_fn->fail_and_exit(
				$o,
				'e027'//,
				//$message='Something went wrong. fn_group is missing.';
			);
		}

		if(!isset($ds['action']) 
			|| empty($ds['action'])){
			$res['response']='000';
			$cApp_fn->fail_and_exit(
				$o,
				'e028'
			);
		}

		//--

		//if ( defined( 'GEOAUTH' ) && $_POST['geoauth']==GEOAUTH){
		//
		//}
		//else{
		//	$cApp_utility_ext->check_js_license($o);
		//}
		$cApp_wiki = new App_wiki;
		//--

		if($ds['action']=='module_settings'){
			$slug='wiki';
			if($ds['collection']=='get_group_action_roles'){
				$o['group_action_roles']['page_'.$slug.'_0x1'] = array('public');
				$o['group_action_roles']['page_'.$slug.'_0x3'] = array('wikidude');//insert+modify
				return $o;
			}

			echo 'Hello watchdog_wiki';
			exit;
		}
		elseif($ds['action']=='view_data'){
			//$cApp_Action_ViewData = new App_Action_ViewData;
			$o=$cApp_wiki->main_view_data($o);
		}
		elseif($ds['action']=='modify_data'){
			//$cApp_Action_ViewData = new App_Action_ViewData;
			$o=$cApp_wiki->main_modify_data($o);
		}
		else{
			$res['response']='000';
			$message='Something went wrong. Action not found.';
			$cApp_fn->fail_and_exit(
				$o,
				'e032'
			);
		} 

		//---
		//unset($o['geoInfo']);
		//unset($o['apiInfo']);
		//unset($o['dbInfo']);
		//unset($o['user_token']);
		//unset($ds);
		//unset($o['geoQuery']);
		$o['response'] ='200';
		$o['type'] ='FeatureCollection';

		if(!empty($ds['output']) && $ds['output']=='OBJECT'){
			return $o;
		}
		else{
			$cApp_fn->output_json_pretty3($o);
		}
		

		exit;

	}

	//----------------------------------------------------------------------------------------------------

} // end of class
