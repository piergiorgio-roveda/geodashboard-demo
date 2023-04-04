<?php
// the following constant will help ensure all other PHP files will only work as part of this API.
if (!defined('CONST_INCLUDE_KEY')){
  define('CONST_INCLUDE_KEY', 'd4e2ad09-b1c3-4d70-9a9a-0e6149302486');
  // define('GEOVAR_MASTER','geovar_master');
  // define('GEOVAR_COLLECTION_PARAMS','geovar_collection_params');
  // define('GEOVAR_COLLECTION','geovar_collection');
  // define('GEOVAR_TB','geovar_tb');
  // define('TB_TRANSACTIONS','tb_transactions');
}

module_install_geodashboard();

function module_install_geodashboard(){

  $cApp_fn = new App_API_Geodata_fn;

  $tables=array(
    "geovar_action",
    "geovar_button",
    "geovar_collection",
    //"geovar_collection_params",
    "geovar_dialog",
    "geovar_label",
    "geovar_lyr_map",
    "geovar_master",
    "geovar_tb",
    "geovar_user",
    "tb_lyr",
    "tb_lyr_style",
    "tb_map",
    "tb_transactions"
  );

  foreach ($tables as $key => $value) {

    $f = $cApp_fn->table_exist($value);


    if($f[0]["properties"]["exists"]==0){
      $cApp_fn->create_table($value);
    }
    // else{
    //   echo "Table $value already exists.";
    // }

  }

  $f_master = $cApp_fn->getGeovarMASTER();

  foreach ($tables as $key => $tableName){

    $filterBy = strtoupper($tableName); // or Finance etc.
    //echo "Filtering by: " . $filterBy;
    $new = array_filter($f_master, function ($var) use ($filterBy) {
      return ($var['g_slug'] == $filterBy);
    });

    $new0=reset($new);

      if(empty($new)){
        echo "<br>".strtoupper($tableName)." >> not exist.";
        $r = $cApp_fn->addTableToGeovarMASTER_geovar_auto(strtoupper($tableName));
      }

  }

  foreach ($tables as $key => $tableName) {

    $f = $cApp_fn->getTableCols($tableName);

    $cols=getTableProp($tableName);

    //_rint_r($f);
    

    foreach ($cols as $key => $objCol) {
      $filterBy = $objCol["g_slug"]; // or Finance etc.
      //echo "Filtering by: " . $filterBy;
      $new = array_filter($f, function ($var) use ($filterBy) {
        return ($var['properties']['column_name'] == $filterBy);
      });

      $new0=reset($new);
      if(!empty($new)){
        if($new0['properties']['data_type']==$objCol["data_type"]){
          //echo "<br>"."Column ". $objCol["g_slug"] . " exists and correct type ".$objCol["data_type"].".";
        }
        else{
          echo "Column ". $objCol["g_slug"] . " exists but not correct type ".$objCol["data_type"].".";
          exit;
        }
      }
      else{
        echo "<br>".$tableName." >> Column ". $objCol["g_slug"] . " does not exist.";
        $r = $cApp_fn->addColumn($tableName,$objCol);
        print_r($r);
      }

    }

  }



  foreach ($tables as $key => $tableName) {

    //$f = $cApp_fn->getTableCols($tableName);

    $f = $cApp_fn->get_table_meta_from_db(strtoupper($tableName));

    $cols=getTableProp($tableName);

    foreach ($cols as $key => $objCol) {
      $filterBy = $objCol["g_slug"]; // or Finance etc.
      if($filterBy!="item_token"){

        //echo "Filtering by: " . $filterBy;
        $new = array_filter($f, function ($var) use ($filterBy) {
          return ($var['g_slug'] == $filterBy);
        });

        $new0=reset($new);
        if(empty($new)){
          echo "<br>".strtoupper($tableName)." >> Column ". $objCol["g_slug"] . " does not exist in GEOVAR_TB.";
          $r = $cApp_fn->addColumnToGeovarTB(strtoupper($tableName),$objCol);
          //_rint_r($r);
        }

      }

    }

  }

}

function getTableProp($tableName){

  $tableProp=array();

  $tableProp["geovar_action"]=array(
    array("g_slug"=>"g_description","data_type"=>"character varying"),
    array("g_slug"=>"g_label","data_type"=>"character varying"),
    array("g_slug"=>"g_slug","data_type"=>"character varying"),
    array("g_slug"=>"item_token","data_type"=>"character varying"),
    array("g_slug"=>"post_date","data_type"=>"timestamp without time zone","g_default"=>"now()"),
    array("g_slug"=>"post_modified","data_type"=>"timestamp without time zone","g_default"=>"now()"),
    array("g_slug"=>"post_status","data_type"=>"character varying","g_default"=>"publish")
  );
  $tableProp["geovar_button"]=array(
    array("g_slug"=>"g_callback","data_type"=>"character varying"),
    array("g_slug"=>"g_description","data_type"=>"character varying"),
    array("g_slug"=>"g_faw","data_type"=>"character varying"),
    array("g_slug"=>"g_group","data_type"=>"json","g_default"=>"[\"private\"]"),
    array("g_slug"=>"g_label","data_type"=>"character varying"),
    array("g_slug"=>"g_responsive","data_type"=>"character varying","g_default"=>"both"),
    array("g_slug"=>"g_slug","data_type"=>"character varying"),
    array("g_slug"=>"g_style","data_type"=>"character varying"),
    array("g_slug"=>"g_template","data_type"=>"character varying"),
    array("g_slug"=>"item_token","data_type"=>"character varying"),
    array("g_slug"=>"post_date","data_type"=>"timestamp without time zone","g_default"=>"now()"),
    array("g_slug"=>"post_modified","data_type"=>"timestamp without time zone","g_default"=>"now()"),
    array("g_slug"=>"post_status","data_type"=>"character varying","g_default"=>"publish")
  );
  $tableProp["geovar_collection"]=array(
    array("g_slug"=>"g_block_params","data_type"=>"boolean","g_default"=>"true"),
    array("g_slug"=>"g_label","data_type"=>"character varying"),
    array("g_slug"=>"g_response_map","data_type"=>"boolean","g_default"=>"false"),
    array("g_slug"=>"g_response_table","data_type"=>"boolean","g_default"=>"false"),
    array("g_slug"=>"g_slug","data_type"=>"character varying"),
    array("g_slug"=>"g_sub","data_type"=>"json"),
    array("g_slug"=>"g_action","data_type"=>"character varying"),
    array("g_slug"=>"item_token","data_type"=>"character varying"),
    array("g_slug"=>"post_date","data_type"=>"timestamp without time zone","g_default"=>"now()"),
    array("g_slug"=>"post_modified","data_type"=>"timestamp without time zone","g_default"=>"now()"),
    array("g_slug"=>"post_status","data_type"=>"character varying","g_default"=>"publish")
  );
  // $tableProp["geovar_collection_params"]=array(
  //   array("g_slug"=>"g_description","data_type"=>"character varying"),
  //   array("g_slug"=>"data_type","data_type"=>"character varying"),
  //   array("g_slug"=>"g_label","data_type"=>"character varying"),
  //   array("g_slug"=>"g_master","data_type"=>"character varying"),
  //   array("g_slug"=>"g_module","data_type"=>"json"),
  //   array("g_slug"=>"g_options","data_type"=>"json"),
  //   array("g_slug"=>"g_required","data_type"=>"integer","g_default"=>"0"),
  //   array("g_slug"=>"g_slug","data_type"=>"character varying"),
  //   array("g_slug"=>"g_sub","data_type"=>"json"),
  //   array("g_slug"=>"form_type","data_type"=>"character varying"),
  //   array("g_slug"=>"g_placeholder","data_type"=>"character varying"),
  //   array("g_slug"=>"item_token","data_type"=>"character varying"),
  //   array("g_slug"=>"post_date","data_type"=>"timestamp without time zone","g_default"=>"now()"),
  //   array("g_slug"=>"post_modified","data_type"=>"timestamp without time zone","g_default"=>"now()"),
  //   array("g_slug"=>"post_status","data_type"=>"character varying","g_default"=>"publish")
  // );
  $tableProp["geovar_dialog"]=array(
    array("g_slug"=>"g_description","data_type"=>"character varying"),
    array("g_slug"=>"g_label","data_type"=>"character varying"),
    array("g_slug"=>"g_slug","data_type"=>"character varying"),
    array("g_slug"=>"g_template","data_type"=>"character varying"),
    array("g_slug"=>"item_token","data_type"=>"character varying"),
    array("g_slug"=>"post_date","data_type"=>"timestamp without time zone","g_default"=>"now()"),
    array("g_slug"=>"post_modified","data_type"=>"timestamp without time zone","g_default"=>"now()"),
    array("g_slug"=>"post_status","data_type"=>"character varying","g_default"=>"publish")
  );
  $tableProp["geovar_label"]=array(
    array("g_slug"=>"g_description","data_type"=>"character varying"),
    array("g_slug"=>"g_label","data_type"=>"character varying"),
    array("g_slug"=>"g_master","data_type"=>"character varying","g_default"=>"en_GB"),
    array("g_slug"=>"g_slug","data_type"=>"character varying"),
    array("g_slug"=>"label_type","data_type"=>"character varying"),
    array("g_slug"=>"item_token","data_type"=>"character varying"),
    array("g_slug"=>"post_date","data_type"=>"timestamp without time zone","g_default"=>"now()"),
    array("g_slug"=>"post_modified","data_type"=>"timestamp without time zone","g_default"=>"now()"),
    array("g_slug"=>"post_status","data_type"=>"character varying","g_default"=>"publish")
  );
  $tableProp["geovar_lyr_map"]=array(
    array("g_slug"=>"g_slug","data_type"=>"character varying"),
    array("g_slug"=>"g_label","data_type"=>"character varying"),
    array("g_slug"=>"item_token","data_type"=>"character varying"),
    array("g_slug"=>"post_date","data_type"=>"timestamp without time zone","g_default"=>"now()"),
    array("g_slug"=>"post_modified","data_type"=>"timestamp without time zone","g_default"=>"now()"),
    array("g_slug"=>"post_status","data_type"=>"character varying","g_default"=>"publish")
  );
  $tableProp["geovar_master"]=array(
    array("g_slug"=>"g_description","data_type"=>"character varying"),
    array("g_slug"=>"g_group","data_type"=>"json","g_default"=>"[\"private\"]"),
    array("g_slug"=>"g_label","data_type"=>"character varying"),
    array("g_slug"=>"g_slug","data_type"=>"character varying"),
    array("g_slug"=>"master_type","data_type"=>"character varying"),
    array("g_slug"=>"item_token","data_type"=>"character varying"),
    array("g_slug"=>"post_date","data_type"=>"timestamp without time zone","g_default"=>"now()"),
    array("g_slug"=>"post_modified","data_type"=>"timestamp without time zone","g_default"=>"now()"),
    array("g_slug"=>"post_status","data_type"=>"character varying","g_default"=>"publish")
  );
  $tableProp["geovar_tb"]=array(
    array("g_slug"=>"g_callback","data_type"=>"character varying","g_default"=>"none"),
    array("g_slug"=>"g_decode","data_type"=>"json","g_default"=>"[]"),
    array("g_slug"=>"g_description","data_type"=>"character varying"),
    array("g_slug"=>"g_dlg_style","data_type"=>"character varying","g_default"=>"default"),
    array("g_slug"=>"g_group","data_type"=>"json","g_default"=>"[\"private\"]"),
    array("g_slug"=>"g_label","data_type"=>"character varying","g_default"=>"none"),
    array("g_slug"=>"g_master","data_type"=>"character varying"),
    array("g_slug"=>"g_meta","data_type"=>"boolean","g_default"=>"true"),
    array("g_slug"=>"g_options","data_type"=>"json"),
    array("g_slug"=>"g_order","data_type"=>"integer","g_default"=>"0"),
    array("g_slug"=>"g_placeholder","data_type"=>"character varying"),
    array("g_slug"=>"g_preview","data_type"=>"boolean","g_default"=>"true"),
    array("g_slug"=>"g_required","data_type"=>"smallint","g_default"=>"0"),
    array("g_slug"=>"g_serie","data_type"=>"character varying","g_default"=>"default"),
    array("g_slug"=>"g_serie_m","data_type"=>"json","g_default"=>"[\"default\"]"),
    array("g_slug"=>"g_slug","data_type"=>"character varying"),
    array("g_slug"=>"data_type","data_type"=>"character varying"),
    array("g_slug"=>"item_token","data_type"=>"character varying"),
    array("g_slug"=>"post_date","data_type"=>"timestamp without time zone","g_default"=>"now()"),
    array("g_slug"=>"post_modified","data_type"=>"timestamp without time zone","g_default"=>"now()"),
    array("g_slug"=>"post_status","data_type"=>"character varying","g_default"=>"publish"),
    array("g_slug"=>"form_type","data_type"=>"character varying"),
    array("g_slug"=>"g_sub","data_type"=>"json"),
    array("g_slug"=>"g_module","data_type"=>"json")
  );
  $tableProp["geovar_user"]=array(
    array("g_slug"=>"item_token","data_type"=>"character varying"),
    array("g_slug"=>"post_date","data_type"=>"timestamp without time zone","g_default"=>"now()"),
    array("g_slug"=>"post_modified","data_type"=>"timestamp without time zone","g_default"=>"now()"),
    array("g_slug"=>"post_status","data_type"=>"character varying","g_default"=>"publish"),
    array("g_slug"=>"user_role","data_type"=>"json","g_default"=>"[\"public\"]"),
    array("g_slug"=>"watchlist","data_type"=>"json"),
    array("g_slug"=>"g_label","data_type"=>"character varying"),
    array("g_slug"=>"wp_user_id","data_type"=>"integer")
  );
  $tableProp["tb_lyr"]=array(
    array("g_slug"=>"author","data_type"=>"character varying"),
    array("g_slug"=>"base_color","data_type"=>"character varying"),
    array("g_slug"=>"bordercolor","data_type"=>"character varying"),
    array("g_slug"=>"cluster_style","data_type"=>"character varying"),
    array("g_slug"=>"cluster_type","data_type"=>"character varying","g_default"=>"none"),
    array("g_slug"=>"disable_mapclick","data_type"=>"smallint","g_default"=>"0"),
    array("g_slug"=>"feat_type","data_type"=>"character varying"),
    array("g_slug"=>"feature_zoom","data_type"=>"integer","g_default"=>"12"),
    array("g_slug"=>"feature_zoom_max","data_type"=>"integer","g_default"=>"1"),
    array("g_slug"=>"fillopacity","data_type"=>"character varying"),
    array("g_slug"=>"g_cols_group","data_type"=>"json"),
    array("g_slug"=>"g_cols_minimal","data_type"=>"json"),
    array("g_slug"=>"g_group","data_type"=>"json","g_default"=>"[\"private\"]"),
    array("g_slug"=>"g_label","data_type"=>"character varying"),
    array("g_slug"=>"g_options","data_type"=>"json"),
    array("g_slug"=>"g_slug","data_type"=>"character varying"),
    array("g_slug"=>"g_style","data_type"=>"json"),
    array("g_slug"=>"g_tables","data_type"=>"json"),
    array("g_slug"=>"geojson_url","data_type"=>"character varying"),
    array("g_slug"=>"geoserver_name","data_type"=>"character varying"),
    array("g_slug"=>"geoserver_style","data_type"=>"character varying"),
    array("g_slug"=>"geoserver_style_name","data_type"=>"character varying"),
    array("g_slug"=>"icon","data_type"=>"character varying","g_default"=>"emoji_circle_carto-1f1ef-1f1f5_mod-blue.png"),
    array("g_slug"=>"icon_dim","data_type"=>"character varying"),
    array("g_slug"=>"icon_dimanchor1","data_type"=>"character varying"),
    array("g_slug"=>"icon_dimanchor2","data_type"=>"character varying"),
    array("g_slug"=>"icon_sliced","data_type"=>"character varying"),
    array("g_slug"=>"icon_type","data_type"=>"character varying"),
    array("g_slug"=>"icon_xpos","data_type"=>"character varying"),
    array("g_slug"=>"icon_ypos","data_type"=>"character varying"),
    array("g_slug"=>"icon2","data_type"=>"character varying"),
    array("g_slug"=>"icon3","data_type"=>"character varying"),
    array("g_slug"=>"intoc","data_type"=>"smallint","g_default"=>"1"),
    array("g_slug"=>"item_token","data_type"=>"character varying"),
    array("g_slug"=>"label_single","data_type"=>"character varying"),
    array("g_slug"=>"label_zoom","data_type"=>"integer","g_default"=>"15"),
    array("g_slug"=>"labels","data_type"=>"json"),
    array("g_slug"=>"legendicon","data_type"=>"character varying"),
    array("g_slug"=>"lyr_legend","data_type"=>"character varying","g_default"=>"none"),
    array("g_slug"=>"lyr_slug","data_type"=>"character varying"),
    array("g_slug"=>"lyr_type","data_type"=>"character varying"),
    array("g_slug"=>"lyr_update","data_type"=>"character varying"),
    array("g_slug"=>"maincolor","data_type"=>"character varying","g_default"=>"#00AAFF"),
    array("g_slug"=>"maincolor_hide","data_type"=>"character varying","g_default"=>"#a3becc"),
    array("g_slug"=>"maxzoom","data_type"=>"integer","g_default"=>"22"),
    array("g_slug"=>"note","data_type"=>"character varying"),
    array("g_slug"=>"pointerevents","data_type"=>"smallint","g_default"=>"0"),
    array("g_slug"=>"post_date","data_type"=>"timestamp without time zone","g_default"=>"now()"),
    array("g_slug"=>"post_modified","data_type"=>"timestamp without time zone","g_default"=>"now()"),
    array("g_slug"=>"post_status","data_type"=>"character varying","g_default"=>"publish"),
    array("g_slug"=>"queryable","data_type"=>"smallint","g_default"=>"1"),
    array("g_slug"=>"sld_url","data_type"=>"character varying"),
    array("g_slug"=>"slug","data_type"=>"character varying"),
    array("g_slug"=>"style_group","data_type"=>"json"),
    array("g_slug"=>"tile_layers","data_type"=>"character varying"),
    array("g_slug"=>"tile_url","data_type"=>"character varying"),
    array("g_slug"=>"title","data_type"=>"character varying"),
    array("g_slug"=>"title_dlg","data_type"=>"character varying"),
    array("g_slug"=>"tms","data_type"=>"smallint","g_default"=>"0"),
    array("g_slug"=>"zindex","data_type"=>"integer","g_default"=>"500")
  );

  $tableProp["tb_lyr_style"]=array(
    array("g_slug"=>"g_label","data_type"=>"character varying"),
    array("g_slug"=>"attr_filter","data_type"=>"character varying"),
    array("g_slug"=>"attr_filter_function","data_type"=>"character varying"),
    array("g_slug"=>"attr_filter_literal","data_type"=>"character varying"),
    array("g_slug"=>"attr_filter_propertyname","data_type"=>"character varying"),
    array("g_slug"=>"attr_graphicfill","data_type"=>"boolean","g_default"=>"true"),
    array("g_slug"=>"attr_styleparameter","data_type"=>"character varying","g_default"=>"svg"),
    array("g_slug"=>"attr_symbolizer","data_type"=>"character varying"),
    array("g_slug"=>"fill","data_type"=>"character varying"),
    array("g_slug"=>"filldash","data_type"=>"boolean"),
    array("g_slug"=>"filldasharray","data_type"=>"character varying"),
    array("g_slug"=>"filldasharray_","data_type"=>"double precision"),
    array("g_slug"=>"fillsize","data_type"=>"character varying"),
    array("g_slug"=>"fillstroke","data_type"=>"character varying"),
    array("g_slug"=>"fillsvg","data_type"=>"character varying"),
    array("g_slug"=>"g_master","data_type"=>"character varying"),
    array("g_slug"=>"myorder","data_type"=>"double precision"),
    array("g_slug"=>"post_status","data_type"=>"character varying","g_default"=>"publish"),
    array("g_slug"=>"stroke","data_type"=>"character varying"),
    array("g_slug"=>"strokedash","data_type"=>"boolean"),
    array("g_slug"=>"strokedasharray","data_type"=>"character varying"),
    array("g_slug"=>"strokedasharray_","data_type"=>"double precision"),
    array("g_slug"=>"strokelinejoin","data_type"=>"character varying","g_default"=>"bevel"),
    array("g_slug"=>"strokewidth","data_type"=>"character varying"),
    array("g_slug"=>"svg","data_type"=>"boolean"),
    array("g_slug"=>"textfill","data_type"=>"character varying"),
    array("g_slug"=>"textproperty","data_type"=>"character varying"),
    array("g_slug"=>"textsymbolizer","data_type"=>"boolean"),
    array("g_slug"=>"title","data_type"=>"character varying"),
    array("g_slug"=>"view_scale","data_type"=>"character varying","g_default"=>"large"),
    array("g_slug"=>"wellknownname","data_type"=>"character varying")
  );

  $tableProp["tb_map"]=array(
    array("g_slug"=>"g_addon","data_type"=>"json","g_default"=>"[]"),
    array("g_slug"=>"g_attachment","data_type"=>"json","g_default"=>"[]"),
    array("g_slug"=>"g_editable","data_type"=>"json"),
    array("g_slug"=>"g_group","data_type"=>"json","g_default"=>"[\"private\"]"),
    array("g_slug"=>"g_lyr","data_type"=>"json","g_default"=>"[\"lyr038\",\"lyr040\"]"),
    array("g_slug"=>"g_slug","data_type"=>"character varying"),
    array("g_slug"=>"g_label","data_type"=>"character varying"),
    array("g_slug"=>"g_table","data_type"=>"json","g_default"=>"[{\"slug\":\"NOTABLE\",\"name\":\"notable\"}]"),
    array("g_slug"=>"item_token","data_type"=>"character varying"),
    array("g_slug"=>"my_notes","data_type"=>"text"),
    array("g_slug"=>"post_date","data_type"=>"timestamp without time zone","g_default"=>"now()"),
    array("g_slug"=>"post_modified","data_type"=>"timestamp without time zone","g_default"=>"now()"),
    array("g_slug"=>"post_status","data_type"=>"character varying","g_default"=>"publish"),
    array("g_slug"=>"g_attributes","data_type"=>"json","g_default"=>"[]")
  );

  $tableProp["tb_transactions"]=array(
    array("g_slug"=>"api_token","data_type"=>"character varying"),
    array("g_slug"=>"api_url","data_type"=>"character varying"),
    array("g_slug"=>"input_params","data_type"=>"json"),
    array("g_slug"=>"item_token","data_type"=>"character varying"),
    array("g_slug"=>"output_response","data_type"=>"json"),
    array("g_slug"=>"post_date","data_type"=>"timestamp without time zone","g_default"=>"now()"),
    array("g_slug"=>"post_modified","data_type"=>"timestamp without time zone","g_default"=>"now()"),
    array("g_slug"=>"post_status","data_type"=>"character varying"),
    array("g_slug"=>"t_type","data_type"=>"character varying"),
    array("g_slug"=>"user_token","data_type"=>"character varying")
  );

  return $tableProp[$tableName];

}


