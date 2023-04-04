<?php

if ((!defined('CONST_INCLUDE_KEY')) || (CONST_INCLUDE_KEY !== 'd4e2ad09-b1c3-4d70-9a9a-0e6149302486')) {
  // If someone tries to browse directly to this PHP file, send 404 and exit. It can only included
  // as part of our API.
  header("Location: /404.html", TRUE, 404);
  echo file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/404.html');
  die;
}

class API_Handler {

	private $function_map;

	//--------------------------------------------------------------------------------------------------------------------
	public function __construct() {
		$this->loadFunctionMap();
  }

  private function loadFunctionMap() {

    $this->function_map = [
			'getToken' => [
				'class' => 'API_Handler',
				'function_name' => 'getToken'
			],
			'watchdog_webapp' => [
        'class' => 'API_Handler',
        'function_name' => 'watchdog_webapp'
      ]
    ];

  }

	//----------------------------------------------------------------------------------------------------------------------
	public function execCommand($varFunctionName, $o = array()) {
		// get the actual function name (if necessary) and the class it belongs to.
		$returnArray = $this->getCommand($varFunctionName);


    if($varFunctionName!='getToken'){
      $available_functions=array();

      foreach ($this->function_map as $key => $value) {
        # code...
        if($key!='getToken'){
          $returnArray['available_functions'][]=$key;
        }
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

		if($varFunctionName!='getToken'){
			$m='Welcome! You request a available function.';
			$varFunctionParams['_hide']['message'][]=$m;
		}

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
	private function getToken($varParams) {

		// api key is required
		if (!isset($varParams['api_key']) || empty($varParams['api_key'])) {
			$returnArray = App_Response::getResponse('e001');
			return $returnArray;
		}

		$apiKey = $varParams['api_key'];

		// get the api key object
		$cApp_API_Key = new App_API_Key;
		$res = $cApp_API_Key->getRecordByAPIKey($apiKey);

		// if anything looks sketchy, bail.
		if ($res['response'] !== '200') {
			return $res;
		}

		$apiSecretKey = $res['dataArray'][0]['api_secret_key'];

		$payloadArray = array();
		$payloadArray['apiKey'] = $apiKey;
		$token = JWT::encode($payloadArray, $apiSecretKey);

		$returnArray = App_Response::getResponse('e002');
		$returnArray['dataArray'] = array("token" => $token);

		return $returnArray;
	}

	//--------------------------------------------------------------------------------------------------------------------
	public function validateRequest($varAPIKey = NULL, $varToken = NULL) {

		// this function requires and API key and token parameters
		if (!$varAPIKey || !$varToken) {
			$returnArray = App_Response::getResponse('e008');
			$returnArray['responseDescription'] .= " Missing API key or token.";
			return $returnArray;
		}

		// get the api key object
		$cApp_API_Key = new App_API_Key;
		$res = $cApp_API_Key->getRecordByAPIKey($varAPIKey);
		unset($cApp_API_Key);
 
		// if anything looks sketchy, bail.
		if ($res['response'] !== '200') {
			return $res;
		}

		// get the client API secret key.
		$apiSecretKey = $res['dataArray'][0]['api_secret_key'];

		//if is simple method
		if($apiSecretKey==$varToken){
		
		}
		else{
			// decode the token
			try {
				$payload = JWT::decode($varToken, $apiSecretKey, array('HS256'));
			}
			catch(Exception $e) {
				$returnArray = App_Response::getResponse('e008');
				$returnArray['responseDescription'] .= " ".$e->getMessage();
				return $returnArray;
			}
			// get items out of the payload
			$apiKey = $payload->apiKey;
			if (isset($payload->exp)) {$expire = $payload->exp;} else {$expire = 0;}

			// if api keys don't match, kick'em out
			if ($apiKey !== $varAPIKey) {
				$returnArray = App_Response::getResponse('e008');
				$returnArray['responseDescription'] .= " Invalid API Key.";
				return $returnArray;
			}

			// if token is expired, kick'em out
			$currentTime = time();
			if (($expire !== 0) && ($expire < $currentTime)) {
				$returnArray = App_Response::getResponse('e008');
				$returnArray['responseDescription'] .= " Token has expired.";
				return $returnArray;
			}			
		}

		$returnArray = App_Response::getResponse('e002');
		return $returnArray;

	}

	//----------------------------------------------------------------------------------------------------
	private function watchdog_webapp($o) {

		$cApp_fn = new App_API_Geodata_fn;

		$ds=$o['_hide']['ds'];

		//---
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

		//--

		if($ds['fn_group']=='geodata'){//GET_DATA

			if($ds['action']=='get_data'){
				$cApp_Action_GetData = new App_Action_GetData;
				$o=$cApp_Action_GetData->main_get_data($o);
			}
			elseif($ds['action']=='view_data'){
				$cApp_Action_ViewData = new App_Action_ViewData;
				$o=$cApp_Action_ViewData->main_view_data($o);
			}
			elseif($ds['action']=='update_data'){
				$cApp_Action_UpdateData = new App_Action_UpdateData;
				$o=$cApp_Action_UpdateData->main_update_data($o);
			}
			elseif($ds['action']=='modify_data'){
				$cApp_Action_ModifyData = new App_Action_ModifyData;
				$o=$cApp_Action_ModifyData->main_modify_data($o);
			}
			elseif($ds['action']=='create_data'){
				$cApp_Action_CreateData = new App_Action_CreateData;
				$o=$cApp_Action_CreateData->main_create_data($o);
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
			if(!isset($o["response_type"]) 
				|| empty($o["response_type"]) 
				|| $o["response_type"]=='json'){
				$cApp_fn->output_json_pretty3($o);
			}
			else{
				return $o;
			}
			

		}
		else{
			$res['response']='000';
			//$message='Something went wrong. fn_group not exist.';
			$cApp_fn->fail_and_exit(
				$o,
				'e026'
			);
		}

		exit;

	}

	//----------------------------------------------------------------------------------------------------

} // end of class
