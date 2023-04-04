<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//php load external xml and parse

// the following constant will help ensure all other PHP files will only work as part of this API.
if (!defined('CONST_INCLUDE_KEY')){
  define('CONST_INCLUDE_KEY', 'd4e2ad09-b1c3-4d70-9a9a-0e6149302486');
}

//--
$cApp_fn = new App_API_Geodata_fn;
$cApp_ER = new App_ElementsRoles;

$o=array();

if(isset($_GET['sub']) && $_GET['sub']=='get_token'){
  //check default lyr for lyrs
  //echo adler32('default_lyr');
  // $time = new DateTime;
  //echo $time->format(DateTime::ATOM);
  $token = $cApp_fn->new_token_md5('lyr');
  $json_obj = array("new token"=>$token);
  echo json_encode($json_obj, JSON_PRETTY_PRINT);
  exit;
}

if(isset($_GET['g_map_slug'])){
  $gMapSlug=$_GET['g_map_slug'];
}

global $wp_query;
$my_query_vars = $wp_query->query_vars;
if(empty($my_query_vars['mypage'])){
  $g_script_slug='geovar_access';//'all';
}
else{
  $g_script_slug=$my_query_vars['mypage'];
}

if($g_script_slug=='geovar_access'){
  $elements_roles=$cApp_ER->get_user_access_db('page_script_0x1');
  if($elements_roles[0]=='lock'){
    echo "User without permission.";
    exit;
  }
  //--

  $list_elements_roles=$cApp_ER->list_elements_roles();
  $dataArray=array();
  foreach ($list_elements_roles as $key => $value) {
    # code...
    $dataArray[]=array(
      'g_slug'=>$key,
      'g_roles'=>json_encode($value)
    );
  }
  $json_obj=$cApp_fn->list_to_geojson($dataArray);
  $o['type']=$json_obj['type'];
  $o['features']=$json_obj['features'];


  ?>

  g_meta.geovar_access=<?php echo json_encode($o, JSON_PRETTY_PRINT);?>

  f_wait['geovar_access']=1;

  //_onsole.log(g_meta.geovar_access);

  <?php
}
elseif($g_script_slug=='geovar_action'
  || $g_script_slug=='geovar_button'
  || $g_script_slug=='geovar_collection'
  || $g_script_slug=='geovar_dialog'
  || $g_script_slug=='geovar_label'
  || $g_script_slug=='geovar_tb'
  || $g_script_slug=='geovar_master'){

  $name=$g_script_slug;

  $json_obj = $cApp_fn->geovar_to_json(strtoupper($name));
  // $o['type']=$json_obj['type'];
  // $o['features']=$json_obj['features'];

  // $meta=$json;

  echo json_encode($json_obj, JSON_PRETTY_PRINT);

}
elseif($g_script_slug=='geovar_lyr'
  || $g_script_slug=='geovar_map'
  || $g_script_slug=='geovar_map_tb'
  || $g_script_slug=='geovar_lyr_style'){

  $name=$g_script_slug;

  $json_obj = $cApp_fn->geovar_to_json_mapslug($name,$gMapSlug);

  // $o['type']=$json_obj['type'];
  // $o['features']=$json_obj['features'];

  // $meta=$json;

  echo json_encode($json_obj, JSON_PRETTY_PRINT);

}
elseif($g_script_slug=='sld'){

  if(isset($_GET['lyr'])){
    $lyr=$_GET['lyr'];
  }
  else{
    echo "Error: lyr not defined.";
  }

  if(isset($_GET['g_map_slug'])){
    $gMapSlug=$_GET['g_map_slug'];
  }
  else{
    echo "Error: g_map_slug not defined.";
  }

  $obj_maps=$cApp_fn->get_maps_meta2();
  foreach ($obj_maps['features'] as $key => $objMap) {
    if($gMapSlug==$objMap['properties']['g_slug']){
        $itemMap = $objMap['properties'];
    }
  }

  if(empty($itemMap['g_attributes'])){
    echo 'MAP g_attributes not defined';
    exit;
  }

  $g_WORKSPACE = $itemMap['g_attributes']->geoserver_workspace;

  // Load and parse the JSON file
  //$array  = json_decode(file_get_contents('//'.$_SERVER["DOCUMENT_ROOT"].'/style/'.$filename.'.json'), true);
  //_rint_r('//'.$_SERVER['SERVER_NAME'].'/style/'.$filename.'.json');
  //_rint_r($array);
  //exit;

  $obj_lyr = $cApp_fn->get_lyr_meta($lyr);
  //$array = $obj['features'][0]['properties'];
  $geoserver_name = $obj_lyr['properties']['geoserver_name'];
  $geoserver_style_name = $obj_lyr['properties']['geoserver_style_name'];
  $main_Name="<Name>".$g_WORKSPACE.":".$geoserver_name."</Name>";

  $obj = $cApp_fn->get_style_by_g_master($geoserver_style_name);
  //$array = $obj['features'][0]['properties'];

  $main_Name="<Name>".$g_WORKSPACE.":".$geoserver_name."</Name>";

  //$arrRules=$array["NamedLayer"]["UserStyle"]["FeatureTypeStyle"]["Rule"];

  $Rules="";
  foreach ($obj['features'] as $key => $feature) {

    $value=$feature['properties'];

    //put popular colors in array
    $FillColorArr=array(
      "red" => "#FF0000",
      "green" => "#00FF00",
      "lightgreen" => "#90EE90",
      "darkgreen" => "#006400",
      "blue" => "#0000FF",
      "blu" => "#0000FF",
      "lightblue" => "#ADD8E6",
      "darkblue" => "#00008B", 
      "yellow" => "#FFFF00",
      "lightyellow"=>"#fcfc83",
      "cyan" => "#00FFFF",
      "magenta" => "#FF00FF",
      "lightmagenta" => "#FF69B4",
      "black" => "#000000",
      "white" => "#FFFFFF", 
      "gray" => "#808080",
      "grey" => "#808080",
      "darkgray" => "#A9A9A9",
      "darkgrey" => "#A9A9A9",
      "brown" => "#A52A2A",
      "violett" => "#EE82EE",
      "violet" => "#EE82EE",
      "orange" => "#FFA500"
    );

    if(!empty($value["fill"])){
      if (array_key_exists($value["fill"], $FillColorArr)) {
        $FillColor= $FillColorArr[$value["fill"]];
      }
      else{
        $FillColor= $value["fill"];
      }
    }

    if(!empty($value["stroke"])){
      if (array_key_exists($value["stroke"], $FillColorArr)) {
        $StrokeColor= $FillColorArr[$value["stroke"]];
      }
      else{
        $StrokeColor= $value["stroke"];
      }
    }

    //----------------------------------------------

    if(!empty($value["fillstroke"])){

      //case value
      switch ($value["fillstroke"]) {
        case 'bold':
          $FillStroke='4';
          break;
        case 'normal':
          $FillStroke='0.8';
          break;
        case 'light':
          $FillStroke='0.1';
          break;
        default:
          $FillStroke=$value["fillstroke"];
          break;
      }

    }

    //----------------------------------------------

    if(!empty($value["strokewidth"])){

      //case value
      switch ($value["strokewidth"]) {
        case 'bold':
          $strokewidth='3';
          break;
        case 'normal':
          $strokewidth='1';
          break;
        case 'light':
          $strokewidth='0.1';
          break;
        default:
          $strokewidth=$value["strokewidth"];
          break;
      }

    }

    //----------------------------------------------

    if(!empty($value["fillsize"])){

      $pieces = explode(":", $value["fillsize"]);
      if(count($pieces)>1){
        if($pieces[0]=="byfield"){
          $fillsize = "<ogc:PropertyName>".$pieces[1]."</ogc:PropertyName>";
        }
      }
      else{
        //case value
        switch ($value["fillsize"]) {
          case 'x-large':
            $fillsize='45';
            break;
          case 'large':
            $fillsize='20';
            break;
          case 'medium':
            $fillsize='9';
            break;
          case 'fit':
            $fillsize='3';
            break;
          default:
            $fillsize=$value["fillsize"];
            break;
        }
      }

    }

    //----------------------------------------------

    if($value["attr_symbolizer"]=="polygon"){
      $symbolizer="PolygonSymbolizer";
    }
    elseif($value["attr_symbolizer"]=="text"){
      $symbolizer="TextSymbolizer";
    }
    elseif($value["attr_symbolizer"]=="point"){
      $symbolizer="PointSymbolizer";
    }
    else{
      $symbolizer="???";
    }
    //if($value["attr_styleparameter"]=="css"){
      $styleparameter="CssParameter";
    //}
    //elseif($value["attr_styleparameter"]=="svg"){
    //  $styleparameter="SvgParameter";
    //}
    //else{
    //  $styleparameter="???";
    //}

    if($value["attr_graphicfill"]==true){

      $Fill='';
      if($value["wellknownname"]=='empty'){

      }
      elseif($value["wellknownname"]=='full'){
        $Fill.='
                <Fill>
                  <'.$styleparameter.' name="fill">'.$FillColor.'</'.$styleparameter.'>
                </Fill>
        ';
      }
      else{

        if(!empty($value["fillsize"])){
          $fillsizeXml='<Size>'.$fillsize.'</Size>';
        }
        else{
          $fillsizeXml='';
        }

        if($value["attr_symbolizer"]=="point"){

          if(!empty($value["svg"])){

            //$imgFormat = get_image_mime_type($value["fillsvg"]);

            $extensions= array("png","svg");
            $fruits=explode('.',$value["fillsvg"]);

            $file_ext = strtolower(end($fruits));
            if(in_array($file_ext,$extensions)=== true){
                if($file_ext=="png"){
                  $imgFormat="image/png";
                }
                elseif($file_ext=="svg"){
                  $imgFormat="image/svg+xml";
                }
                else{
                  echo "no image format found";
                  exit;
                }
            }

            $Graphic='
                        <ExternalGraphic>
                          <OnlineResource
                          xlink:type="simple"
                          xlink:href="'.$value["fillsvg"].'" />
                          <Format>'.$imgFormat.'</Format>
                        </ExternalGraphic>
                        '.$fillsizeXml.'
            ';
          }
          else{
            $Graphic='
                        <Mark>
                          <WellKnownName>'.$value["wellknownname"].'</WellKnownName>
                          <Fill>
                            <CssParameter name="fill">'.$FillColor.'</CssParameter>
                          </Fill>
                        </Mark>
                        '.$fillsizeXml.'
            ';
          }

          $Fill.='
                  <Graphic>
                    '.$Graphic.'
                  </Graphic>
          ';
        }
        else{

          if(!empty($value["filldash"])){
            $Stroke='
                          <Stroke>
                            <'.$styleparameter.' name="stroke">'.$FillColor.'</'.$styleparameter.'>
                            <'.$styleparameter.' name="stroke-width">'.$FillStroke.'</'.$styleparameter.'>
                            <'.$styleparameter.' name="stroke-dasharray">'.$value["filldasharray"].'</'.$styleparameter.'>
                          </Stroke>
            ';
          }
          else{
            $Stroke='
                          <Stroke>
                            <'.$styleparameter.' name="stroke">'.$FillColor.'</'.$styleparameter.'>
                            <'.$styleparameter.' name="stroke-width">'.$FillStroke.'</'.$styleparameter.'>
                          </Stroke>
            ';
          }

          if(!empty($value["svg"])){

            //$imgFormat = get_image_mime_type($value["fillsvg"]);

            $extensions= array("png","svg");
            $fruits=explode('.',$value["fillsvg"]);

            $file_ext = strtolower(end($fruits));
            if(in_array($file_ext,$extensions)=== true){
                if($file_ext=="png"){
                  $imgFormat="image/png";
                }
                elseif($file_ext=="svg"){
                  $imgFormat="image/svg+xml";
                }
                else{
                  echo "no image format found";
                  exit;
                }
            }

            $Graphic='
                        <ExternalGraphic>
                          <OnlineResource
                          xlink:type="simple"
                          xlink:href="'.$value["fillsvg"].'" />
                          <Format>'.$imgFormat.'</Format>
                        </ExternalGraphic>
                        '.$fillsizeXml.'
            ';
          }
          else{
            $Graphic='
                        <Mark>
                          <WellKnownName>'.$value["wellknownname"].'</WellKnownName>
                          '.$Stroke.'
                        </Mark>
                        '.$fillsizeXml.'
            ';
          }

          $Fill.='
                  <Fill>
                    <GraphicFill>
                      <Graphic>
                        '.$Graphic.'
                      </Graphic>
                    </GraphicFill>
                  </Fill>
          ';

        }//end else $value["attr_symbolizer"]=="point"



      }

      if($value["attr_symbolizer"]!="text"
        && $value["attr_symbolizer"]!="point"){

        if(!empty($value["strokedash"])){
          $Fill.='
                  <Stroke>
                    <'.$styleparameter.' name="stroke">'.$StrokeColor.'</'.$styleparameter.'>
                    <'.$styleparameter.' name="stroke-width">'.$strokewidth.'</'.$styleparameter.'>
                    <'.$styleparameter.' name="stroke-linejoin">bevel</'.$styleparameter.'>
                    <'.$styleparameter.' name="stroke-dasharray">'.$value["strokedasharray"].'</'.$styleparameter.'>
                  </Stroke>
          ';
        }
        else{
          $Fill.='
                  <Stroke>
                    <'.$styleparameter.' name="stroke">'.$StrokeColor.'</'.$styleparameter.'>
                    <'.$styleparameter.' name="stroke-width">'.$strokewidth.'</'.$styleparameter.'>
                    <'.$styleparameter.' name="stroke-linejoin">bevel</'.$styleparameter.'>
                  </Stroke>
          ';
        }

      }
    }
    else{

      $Fill='
              <Fill>
                <'.$styleparameter.' name="fill">'.$FillColor.'</'.$styleparameter.'>
              </Fill>
              <Stroke>
                <'.$styleparameter.' name="stroke">'.$StrokeColor.'</'.$styleparameter.'>
                <'.$styleparameter.' name="stroke-width">'.$strokewidth.'</'.$styleparameter.'>
              </Stroke>
      ';

    }

  /*   <ogc:PropertyIsEqualTo>
      <!--<ogc:PropertyName>feat_id</ogc:PropertyName>-->
      <!--<ogc:Literal>DT1</ogc:Literal>-->
      <ogc:Function name="in">
        <ogc:PropertyName>feat_id</ogc:PropertyName>
        <ogc:Literal>DT1</ogc:Literal>
        <ogc:Literal>DT2</ogc:Literal>
      </ogc:Function>
      <ogc:Literal>true</ogc:Literal>
    </ogc:PropertyIsEqualTo> */
    if($value["attr_filter"]=='none'){
    }
    else{
      if(!empty($value["attr_filter_function"])){
        if($value["attr_filter_function"]=='in'){

          $arrLit=explode(",",$value["attr_filter_literal"]);
          $stringLit='';
          foreach ($arrLit as $key => $Lit) {
            $stringLit.='<ogc:Literal>'.$Lit.'</ogc:Literal>';
          }
          $FilterFunction='
                    <ogc:Function name="in">
                      <ogc:PropertyName>'.$value["attr_filter_propertyname"].'</ogc:PropertyName>
                      '.$stringLit.'
                    </ogc:Function>
                    <ogc:Literal>true</ogc:Literal>
          ';
        }
        elseif($value["attr_filter_function"]=='like'){

          /*
              <ogc:PropertyIsLike wildCard="*" singleChar="%" escape="!">
                <ogc:PropertyName>g_slug</ogc:PropertyName>
                <ogc:Literal>br%</ogc:Literal>
              </ogc:PropertyIsLike>  
          */

          $FilterFunction='
                    <ogc:PropertyName>'.$value["attr_filter_propertyname"].'</ogc:PropertyName>
                    <ogc:Literal>'.$value["attr_filter_literal"].'</ogc:Literal>
          ';
        }
        else{
          echo "Error: Function not supported";
        }

      }
      else{
        $FilterFunction='
                  <ogc:PropertyName>'.$value["attr_filter_propertyname"].'</ogc:PropertyName>
                  <ogc:Literal>'.$value["attr_filter_literal"].'</ogc:Literal>
        ';
      }
    }

    if(!empty($value["textsymbolizer"])){

      $TextProperty_array=explode(",",$value["textproperty"]);
      $TextProperty='';
      foreach ($TextProperty_array as $key => $value2) {
        $TextProperty.='<ogc:PropertyName>'.$value2.'</ogc:PropertyName> ';
      }
      $TextSymbolizer='
            <TextSymbolizer>
              <Label>
                '.$TextProperty.'
              </Label>
              <Font>
                <CssParameter name="font-family">DejaVu Sans</CssParameter>
                <CssParameter name="font-size">12</CssParameter>
                <CssParameter name="font-style">normal</CssParameter>
                <CssParameter name="font-weight">bold</CssParameter>
              </Font>
              <LabelPlacement>
                <PointPlacement>
                  <AnchorPoint>
                    <AnchorPointX>0</AnchorPointX>
                    <AnchorPointY>0.5</AnchorPointY>
                  </AnchorPoint>
                </PointPlacement>
              </LabelPlacement>
              <Halo>
                <Radius>1</Radius>
              </Halo>
              <Fill>
                <CssParameter name="fill">'.$value["textfill"].'</CssParameter>
              </Fill>
              <VendorOption name="maxDisplacement">1</VendorOption>
            </TextSymbolizer>
      ';
    }
    else{
      $TextSymbolizer='';
    }

    

    if($value["view_scale"]=="large"){
      $view_scale='
              <MinScaleDenominator>1</MinScaleDenominator>
              <MaxScaleDenominator>250000</MaxScaleDenominator>
      ';
    }
    elseif($value["view_scale"]=="region"){
      $view_scale='
              <MinScaleDenominator>1</MinScaleDenominator>
              <MaxScaleDenominator>1000000</MaxScaleDenominator>
      ';
    }
    elseif($value["view_scale"]=="bigcity"){
      $view_scale='
              <MinScaleDenominator>1</MinScaleDenominator>
              <MaxScaleDenominator>30000</MaxScaleDenominator>
      ';
    }
    elseif($value["view_scale"]=="medium"){
      $view_scale='
              <MinScaleDenominator>1</MinScaleDenominator>
              <MaxScaleDenominator>10000</MaxScaleDenominator>
      ';
    }
    elseif($value["view_scale"]=="small"){
      $view_scale='
              <MinScaleDenominator>1</MinScaleDenominator>
              <MaxScaleDenominator>3000</MaxScaleDenominator>
      ';
    }

    if($value["attr_filter"]=='none'){
      $Filter='';
    }
    else{
      $start_attr_filter=explode(" ",$value["attr_filter"]);
      $Filter='
              <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                <ogc:'.$value["attr_filter"].'>
                  '.$FilterFunction.'
                </ogc:'.$start_attr_filter[0].'>
              </ogc:Filter>
      ';
    }

    
    if($value["attr_symbolizer"]=="text"){
      $Rules.='
            <Rule>
              <Name>'.$value["attr_filter_literal"].'</Name>
              '.$view_scale.'
              '.$Filter.'
              '.$TextSymbolizer.'
            </Rule>
      ';
    }
    else{

      $Rules.='
            <Rule>
              <Name>'.$value["attr_filter_literal"].'</Name>
              '.$view_scale.'
              '.$Filter.'
              <'.$symbolizer.'>
                '.$Fill.'
              </'.$symbolizer.'>
              '.$TextSymbolizer.'
            </Rule>
      ';
    }

  }

  $UserStyle="
      <UserStyle>
        <Name>".$geoserver_style_name."</Name>
        <FeatureTypeStyle>
          ".$Rules."
        </FeatureTypeStyle>
      </UserStyle>
  ";
  $data = '<?xml version="1.0" encoding="ISO-8859-1"?>
  <StyledLayerDescriptor version="1.0.0"
    xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
    xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
    xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <NamedLayer>
      '.$main_Name.'
      '.$UserStyle.'
    </NamedLayer>
  </StyledLayerDescriptor>
  ';

  // if($_POST['sld_body']=='true'){
  //   echo rawurlencode($data);
  // }
  // else{
    // echo $data;
  // }
    $baseurl = $_SERVER['DOCUMENT_ROOT'];
    $file = $baseurl.'tmp/'.$geoserver_style_name.'_'.$lyr.'.sld';
    $f = fopen($file, 'w');
    if (!$f) {
      //die('Error creating the file ' . $file);
      $cApp_fn->fail_and_exit(
        $o,
        'e000',
        'Error creating the file ' . $file.'.'
      );
    }

    $write = fputs( $f, $data );
    fclose($f);

  $json_obj=array(
    "status"=>"success",
    "sld_url"=>$file,
    "ds"=>$_POST
  );

  echo json_encode($json_obj, JSON_PRETTY_PRINT);

}
elseif($g_script_slug=='check_maps'){

  if(MAPSLUG=='all'){

    $g_attributes=array();

    $g_attributes['map_706b06bf']='
      {
        "label_main_logo": "logo-webapp-geodashboard.png",
        "language": "en",
        "map_title": "Green City",
        "geoserver_workspace": "cityplanner",
        "geoserver_url": "https://geoserver.cityplanner.ch:8443/geoserver/",
        "df_logo_owner": "logo21-cp.png",
        "df_logo_login": "logo-webapp-geodashboard.png",
        "erp_owner_geoinfo_azienda": "ctyplanner.biz",
        "client_doc_credit": "CLIENT_DOC_CREDIT",
        "apple_touch_icon": "apple_touch_icon.png",
        "favicon": "favicon.ico",
        "favicon32": "favicon-32x32.png",
        "favicon16": "favicon-16x16.png"
      }
    ';
    $list_basemap['map_706b06bf']='["lyr040","lyr038"]';
    $js_loader_list_map_lyr['map_706b06bf']='["map243-new-lyr_loader"]';
    $js_loader_list_map_config['map_706b06bf']='
      [
        "addon220-choose-map",
        "map241-menu-list-map",
        "addon233-btn_settings"
      ]
    ';

    $o=array(
      "_hide"=>array(
          "ds"=>array(
            "fn_group"=>"geodata",
            "action"=>"create_data",
            "collection"=>"createExplorerDefault",
            "params"=>array(
                // array(
                //   "table"=>"TB_MAP",
                //   "data"=>array(
                //       array( //ROW1
                //         // To generate new token, add ?sub=get_token.
                //         array("col"=>"g_slug","val"=>"map_706b06bf"),//.$token),//unique first
                //         array("col"=>"g_lyr","val"=>"[\"lyr038\",\"lyr040\"]"),
                //         array("col"=>"g_label","val"=>"Green City"),
                //         array("col"=>"g_attributes","val"=>$g_attributes['map_706b06bf']),
                //         array("col"=>"list_basemap","val"=>$list_basemap['map_706b06bf']),
                //         array("col"=>"js_loader_list_map_lyr","val"=>$js_loader_list_map_lyr['map_706b06bf']),
                //         array("col"=>"js_loader_list_map_config","val"=>$js_loader_list_map_config['map_706b06bf']),
                //       ) // ,
                //       // array( //ROW2
                //       // )
                //   )
                // )
            )
          )
      )
    );

  }
  else{

    $cApp_fn->fail_and_exit(
      $o,
      'e000',
      'No check maps for this map slug.'
    );

  }

  $className = 'API_Handler';
  $cApiHandler = new $className();
  $o["response_type"] = "array";
  $returnArray = $cApiHandler->execCommand('watchdog_webapp',$o);

  //$returnArray['message']="To generate new token, add ?sub=get_token.";

  echo json_encode($returnArray, JSON_PRETTY_PRINT);
  exit;

}
elseif($g_script_slug=='check_lyrs'){

  $o=array(
    "_hide"=>array(
        "ds"=>array(
          "fn_group"=>"geodata",
          "action"=>"create_data",
          "collection"=>"createExplorerDefault",
          "params"=>array(
              array(
                "table"=>"TB_LYR",
                "data"=>array(
                    array( //ROW1
                      // To generate new token, add ?sub=get_token.
                      array("col"=>"g_slug","val"=>"lyr_701b06b6"),//.$token),//unique first
                      array("col"=>"g_label","val"=>"Lyr for Lyrs"),
                      //polygon,table,raster,point,mix,polyline,group,
                      array("col"=>"feat_type","val"=>"table"),
                      array("col"=>"intoc","val"=>"0"),
                      //system,group,db_onetime,tile,wms,virtual,static,db_outer,db (derecated: polygon,point,polyline)
                      array("col"=>"lyr_type","val"=>"system"),
                      //on_move,fix,manual
                      array("col"=>"lyr_update","val"=>"manual"),
                      array("col"=>"g_tables","val"=>"[\"TB_LYR\"]"),
                      array("col"=>"g_cols_minimal","val"=>"[{\"table\":\"TB_LYR\",\"cols\":[\"pid\"],\"group_by\":[\"pid\"]}]"),
                      array("col"=>"queryable","val"=>"0"),
                    ),
                    array( //ROW2
                      // To generate new token, add ?sub=get_token.
                      array("col"=>"g_slug","val"=>"lyr_701a06b5"),//.$token),//unique first
                      array("col"=>"g_label","val"=>"Lyr for Maps"),
                      //polygon,table,raster,point,mix,polyline,group,
                      array("col"=>"feat_type","val"=>"table"),
                      array("col"=>"intoc","val"=>"0"),
                      //system,group,db_onetime,tile,wms,virtual,static,db_outer,db (derecated: polygon,point,polyline)
                      array("col"=>"lyr_type","val"=>"system"),
                      //on_move,fix,manual
                      array("col"=>"lyr_update","val"=>"manual"),
                      array("col"=>"g_tables","val"=>"[\"TB_MAP\"]"),
                      array("col"=>"g_cols_minimal","val"=>"[{\"table\":\"TB_MAP\",\"cols\":[\"pid\"],\"group_by\":[\"pid\"]}]"),
                      array("col"=>"queryable","val"=>"0"),
                    )
                )
              )
          )
        )
    )
  );

  $className = 'API_Handler';
  $cApiHandler = new $className();
  $o["response_type"] = "array";
  $returnArray = $cApiHandler->execCommand('watchdog_webapp',$o);

  $returnArray['message']="To generate new token, add ?sub=get_token.";

  echo json_encode($returnArray, JSON_PRETTY_PRINT);
  exit;

}
else{
  echo "Error script name";
}


//  * @param $image_path
//  * @return bool|mixed

function get_image_mime_type($image_path)
{
    $mimes  = array(
        IMAGETYPE_GIF => "image/gif",
        IMAGETYPE_JPEG => "image/jpg",
        IMAGETYPE_PNG => "image/png",
        IMAGETYPE_SWF => "image/swf",
        IMAGETYPE_PSD => "image/psd",
        IMAGETYPE_BMP => "image/bmp",
        IMAGETYPE_TIFF_II => "image/tiff",
        IMAGETYPE_TIFF_MM => "image/tiff",
        IMAGETYPE_JPC => "image/jpc",
        IMAGETYPE_JP2 => "image/jp2",
        IMAGETYPE_JPX => "image/jpx",
        IMAGETYPE_JB2 => "image/jb2",
        IMAGETYPE_SWC => "image/swc",
        IMAGETYPE_IFF => "image/iff",
        IMAGETYPE_WBMP => "image/wbmp",
        IMAGETYPE_XBM => "image/xbm",
        IMAGETYPE_ICO => "image/ico");

    if (($image_type = exif_imagetype($image_path))
        && (array_key_exists($image_type ,$mimes)))
    {
        return $mimes[$image_type];
    }
    else
    {
        return FALSE;
    }
}