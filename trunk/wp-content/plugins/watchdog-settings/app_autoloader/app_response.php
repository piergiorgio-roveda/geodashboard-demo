<?php 

if ((!defined('CONST_INCLUDE_KEY')) || (CONST_INCLUDE_KEY !== 'd4e2ad09-b1c3-4d70-9a9a-0e6149302486')) {
	// If someone tries to browse directly to this PHP file, send 404 and exit. It can only included
	// as part of our API.
	header("Location: /404.html", TRUE, 404);
	echo file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/404.html');
	die;
}

//----------------------------------------------------------------------------------------------------------------------
class App_Response  {

  //--------------------------------------------------------------------------------------------------------------------
  public static function getResponse($varRespCode) {
			
		$msg = FALSE;
		switch ($varRespCode) {


			case 'e000': //'000':
				$success = TRUE;
				$response = '415';
				$responseDescription = 'Something went wrong.';
				break;

			case 'e001'://400
				$success = FALSE;
				$response = '400';
				$responseDescription = 'Errore. Uno o più parametri obbligatori sono assenti o non validi.';
				break;
			
			case 'e002': //200
				$success = TRUE;
				$response = '200';
				$responseDescription = 'Transazione avvenuta con successo.';
				break;
			
			case '200':
				$success = TRUE;
				$response = '200';
				$responseDescription = 'Transazione avvenuta con successo.';
				break;

			case 'e004': //'204':
				$success = TRUE;
				$response = '204';
				$responseDescription = 'Errore. Nessun record trovato.';
				break;

			case '204':
				$success = TRUE;
				$response = '204';
				$responseDescription = 'Errore. Nessun record trovato.';
				break;

			case 'e005': //'406':
				$success = TRUE;
				$response = '406';
				$responseDescription = 'Errore. Nessun record trovato.';
				break;
			
			case 'e008': //'403':
				$success = FALSE;
				$response = '401';
				$responseDescription = 'Errore. Credenziali di accesso al servizio non valide.';
				break;
			
			case 'e009': //'405':
				$success = FALSE;
				$response = '402';
				$responseDescription = 'Errore. Operazione non permessa, il metodo specificato non è consentito.';
				break;

			case 'e010': //'406x':
				$success = FALSE;
				$response = '403';
				$responseDescription = 'Errore. Uno o più parametri sono assenti o non validi.';
				break;

			case 'e011': //'500':
				$success = FALSE;
				$response = '411';
				$responseDescription = 'Errore. Il server ha riscontrato una condizione imprevista che gli ha impedito di soddisfare la richiesta.';
				break;

			case 'e012': //'G010':
				$success = FALSE;
				$response = '404';
				$responseDescription = 'Errore. ';
				break;

			case 'e013': //'G011':
				$success = FALSE;
				$response = '405';
				$responseDescription = 'Errore. ';
				break;

			case 'e014': //'G012':
				$success = FALSE;
				$response = '409';
				$responseDescription = 'Errore. Servizio non disponibile.';
				break;

			case 'e015': //'G020':
				$success = FALSE;
				$response = '407';
				$responseDescription = 'Errore. ';
				break;

			case 'e016': //'G025':
				$success = FALSE;
				$response = '408';
				$responseDescription = 'Errore. ';
				break;

			case 'e017': //'G027':
				$success = FALSE;
				$response = '410';
				$responseDescription = 'Errore. ';
				break;

			case 'e018': //'G030':
				$success = FALSE;
				$response = '412';
				$responseDescription = 'Errore. Il server ha riscontrato una condizione imprevista che gli ha impedito di soddisfare la richiesta.';
				break;

			case 'e019': //'G031':
				$success = FALSE;
				$response = '413';
				$responseDescription = 'Errore. Il server ha riscontrato una condizione imprevista che gli ha impedito di soddisfare la richiesta.';
				break;

			case 'e020': //'G032':
				$success = FALSE;
				$response = '414';
				$responseDescription = 'Errore. Il server ha riscontrato una condizione imprevista che gli ha impedito di soddisfare la richiesta.';
				break;

			case 'e021': //'G040':
				$success = FALSE;
				$response = '201';
				$responseDescription = 'Errore. ';
				break;

			case 'e022': //'G027':
				$success = FALSE;
				$response = '202';
				$responseDescription = 'Errore. ';
				break;

			case 'e023': //'G027':
				$success = FALSE;
				$response = '202';
				$responseDescription = 'The allowed method are GET or POST.';
				break;

			case 'e024': //'G027':
				$success = FALSE;
				$response = '202';
				$responseDescription = 'No params requested.';
				break;

			case 'e025': //'405':
				$success = FALSE;
				$response = 'e025';
				$responseDescription = 'You request a unavailable function. Alternatively follow one of the [available functions].';
				break;

			case 'e026':
				$success = FALSE;
				$response = $varRespCode;
				$responseDescription = 'The input value, exist.';
				break;

			case 'e027':
				$success = FALSE;
				$response = 'e027';
				$responseDescription = 'This should never happen.';
				break;

			case 'e028':
				$success = FALSE;
				$response = $varRespCode;
				$responseDescription = 'No api_lyr > collection found/available in params.';
				break;

			case 'e029':
				$success = FALSE;
				$response = $varRespCode;
				$responseDescription = 'The unique value already exists.';
				break;

			case 'e030': //'405':
				$success = FALSE;
				$response = $varRespCode;
				$responseDescription = 'Il parametro [lyr] non è impostato nella richiesta.';
				break;

			case 'e031': //'405':
				$success = FALSE;
				$response = $varRespCode;
				$responseDescription = 'Il parametro [lyr] non è corretto.';
				break;

			case 'e032': //'405':
				$success = FALSE;
				$response = $varRespCode;
				$responseDescription = 'Il parametro [action] non è corretto.';
				break;

			case 'e033': //'405':
				$success = FALSE;
				$response = $varRespCode;
				$responseDescription = 'Il parametro [collection] non è corretto.';
				break;

			case 'e034':
				$success = FALSE;
				$response = $varRespCode;
				$responseDescription = 'La tabella non esiste:';
				break;

			case 'e035':
				$success = FALSE;
				$response = $varRespCode;
				$responseDescription = 'Errore struttura tabella:';
				break;

			case 'e036':
				$success = FALSE;
				$response = $varRespCode;
				$responseDescription = 'Parametro inserito non corretto:';
				break;

			case 'e037': 
				$success = FALSE;
				$response = $varRespCode;
				$responseDescription = 'Query senza risultati.';
				break;

			case 'e038':
				$success = FALSE;
				$response = $varRespCode;
				$responseDescription = 'SECRET_KEY / User missing or not valid.';
				break;

			case 'e039':
				$success = FALSE;
				$response = $varRespCode;
				$responseDescription = 'Parameter missing or not valid';
				break;

			case 'e040':
				$success = FALSE;
				$response = $varRespCode;
				$responseDescription = 'Map already exist';
				break;

			default:
				$success = FALSE;
				$response = '415';
				$responseDescription = 'Something went wrong.';
			
		} // end switch
		
		// return array for when the API needs to return the passed params
		if($msg == TRUE){
			//$returnArray = array();
			$returnArray=array($response,$responseDescription);
		}
		else{
			$returnArray = array(
				'success' => $success,
				'response' => $response,
				'responseDescription' => $responseDescription
			);
		}
		
		return $returnArray;
		
	}
  
} // end class