<?php  

//----------------------------------------------------------------------------------------------------------------------
abstract class Data_Access {
    
  //--------------------------------------------------------------------------------------------------------------------
  protected function dbConnect() {

    // we'll move the DB credentials into an INI file in the next lesson and create an app setup class that 
    // defines all constants from an app_config database table.

    // establish a database connection
    if (!isset($GLOBALS['dbConnection'])) {
      //$GLOBALS['dbConnection'] = new mysqli(CONST_DB_HOST, CONST_DB_USERNAME, CONST_DB_PASSWORD, CONST_DB_SCHEMA);
      $GLOBALS['dbConnection'] = new PDO("pgsql:host=".POSTGRES_HOST.";dbname=".POSTGRES_DBNAME."", POSTGRES_USER, POSTGRES_PASSWORD);
    }

    // if an error occurred, record it
    //if ($GLOBALS['dbConnection']->connect_errno) {
      // if an error occurred, raise it.
      //$responseArray = App_Response::getResponse('e011');
      //$responseArray['message'] = 'MySQL error: ' . $GLOBALS['dbConnection']->connect_errno . ' ' . $GLOBALS['dbConnection']->connect_error;

    //} else {
      // success
      $responseArray = App_Response::getResponse('e002');
      $responseArray['message'] = 'Database connection successful.';
    //}

    return $responseArray;

  }

	//--------------------------------------------------------------------------------------------------------------------
	protected function getResultSetArray($varQuery,$values=array()) {

		// attempt the query
    //$rsData = $GLOBALS['dbConnection']->query($varQuery);

    $dbh = $GLOBALS['dbConnection'];//connessione_pdo_postgres();
    $sth = $dbh->prepare($varQuery);
    //if(empty($values)){
      //echo "no values";
      $sth->execute();
    //}
    /*else{

      print_r($values);
      //$ISp_Res = $pdo->prepare(...);
      $i=0;
      foreach ($values as $key => $value) {
        $i++;
        # code...
        $sth->bindParam($i, $value, PDO::PARAM_STR);
      }

      var_dump($sth);

      $sth->execute($values);

    }*/

		//if (isset($GLOBALS['dbConnection']->errno) && ($GLOBALS['dbConnection']->errno != 0)) {
			// if an error occurred, raise it.
			//$responseArray = App_Response::getResponse('e011');
			//$responseArray['message'] = 'Internal server error. MySQL error: ' . $GLOBALS['dbConnection']->errno . ' ' . $GLOBALS['dbConnection']->error;
		//} else {       
            // success
			$rowCount = $sth->rowCount();

			if ($rowCount != 0) {
				// move result set to an associative array
        //$rsArray = $rsData->fetch_all(MYSQLI_ASSOC);
        $rsArray = $sth->fetchAll();
			
				// add array to return
				$responseArray = App_Response::getResponse('e002');
				$responseArray['dataArray'] = $rsArray;
        //--
        $responseArray['rowCount']=$rowCount;

        $total_column = $sth->columnCount();
        //var_dump($total_column);

        for ($counter = 0; $counter < $total_column; $counter ++) {
          $columns[] = $sth->getColumnMeta($counter);
        }
        $responseArray['columns'] = $columns;

			} else {
				// no data returned
				$responseArray = App_Response::getResponse('204');
        $responseArray['message'] = 'Query did not return any results.';
			}
			
		//}

		return $responseArray;
		
	}

	//--------------------------------------------------------------------------------------------------------------------
	protected function simpleQuery($varQuery,$values=array()) {

		// attempt the query
    //$rsData = $GLOBALS['dbConnection']->query($varQuery);

    $dbh = $GLOBALS['dbConnection'];//connessione_pdo_postgres();
    $sth = $dbh->prepare($varQuery);

    $sth->execute();

    $responseArray = App_Response::getResponse('e002');

		return $responseArray;
		
	}

  //----------------------------------------------------------------------------------------------------	

}