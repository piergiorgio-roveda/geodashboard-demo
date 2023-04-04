<!doctype html>
<?php

// the following constant will help ensure all other PHP files will only work as part of this API.
if (!defined('CONST_INCLUDE_KEY')){
  define('CONST_INCLUDE_KEY', 'd4e2ad09-b1c3-4d70-9a9a-0e6149302486');
}

//--
$cApp_fn = new App_API_Geodata_fn;
$cApp_ER = new App_ElementsRoles;
$elements_roles=$cApp_ER->get_user_access_db('page_explorer_0x1');
if($elements_roles[0]=='lock'){
   echo "User without permission.";
   exit;
}

global $wp_query;
$my_query_vars = $wp_query->query_vars;

$gAction='generic';
if(!empty($my_query_vars['myaction'])){
  $gAction=$my_query_vars['myaction'];
}

$gName='generic';
if(!empty($my_query_vars['myname'])){
  $gName=$my_query_vars['myname'];
}

//--

global $wp_query;
$my_query_vars = $wp_query->query_vars;

//$obj_maps=$cApp_fn->get_maps_meta();
$obj_maps=$cApp_fn->get_maps_meta2();

//--

$gMapSlug=MAPSLUG;

//if(!empty($my_query_vars['mypage'])){
//   $gMapSlug=$my_query_vars['mypage'];
//}

foreach ($obj_maps['features'] as $key => $objMap) {
   if($gMapSlug==$objMap['properties']['g_slug']){
      $itemMap = $objMap['properties'];
   }
}

if(empty($itemMap['g_attributes'])){
   echo 'MAP g_attributes not defined';
   exit;
}

//--

$g_map_title='Postman';//$itemMap['g_attributes']->map_title;

//--
$g_DOMAIN_PROJECT = '//'.$_SERVER['SERVER_NAME'];
$g_HOME_PROJECT = get_site_url();
$g_SOURCE_PATH = '//'.$_SERVER['SERVER_NAME'].'/source/';
$g_THEME_PROJECT = get_stylesheet_directory_uri();

$g_WORKSPACE = $itemMap['g_attributes']->geoserver_workspace;
$g_GEOSERVER_URL = $itemMap['g_attributes']->geoserver_url;
$g_DFL_LOGO_OWNER = get_stylesheet_directory_uri() ."/img/".$itemMap['g_attributes']->df_logo_owner."?ver=".APP_VERSION;
$g_DFL_LOGO_LOGIN = get_stylesheet_directory_uri() ."/img/".$itemMap['g_attributes']->df_logo_login."?ver=".APP_VERSION;
$g_DFL_LABEL_MAIN_LOGO = get_stylesheet_directory_uri() ."/img/".$itemMap['g_attributes']->label_main_logo."?ver=".APP_VERSION;
$g_ERP_OWNER_GEOINFO_AZIENDA = $itemMap['g_attributes']->erp_owner_geoinfo_azienda;
$g_CLIENT_DOC_CREDIT = $itemMap['g_attributes']->client_doc_credit;
$g_FAVICON_APPLE = get_stylesheet_directory_uri() ."/img/".$itemMap['g_attributes']->apple_touch_icon."?ver=".APP_VERSION;
$g_FAVICON = get_stylesheet_directory_uri() ."/img/".$itemMap['g_attributes']->favicon."?ver=".APP_VERSION;
$g_FAVICON32 = get_stylesheet_directory_uri() ."/img/".$itemMap['g_attributes']->favicon32."?ver=".APP_VERSION;
$g_FAVICON16 = get_stylesheet_directory_uri() ."/img/".$itemMap['g_attributes']->favicon16."?ver=".APP_VERSION;

$new_lyr_token = $cApp_fn->new_token_md5('lyr');

?>
<html lang="en">
  <?php
  include(ABSPATH.THEME_PATH.'/template-part/template02-head.php');
  ?>
  <body>
    <div id="mapid" style="background-color:#FFF;padding:25px;">
      <div class="row" style="height: 100%;overflow: auto;">
        <div class="col-6">
          <div class="ct-text" style="padding:5px;margin-bottom:5px;">
            <pre id="json-result" class="json-result"></pre>
          </div>
        </div>
        <div class="col-6">
          <div class="ct-text" style="padding:5px;margin-bottom:5px;">
            <pre id="json-result-plain" class="json-result-plain"></pre>
          </div>
        </div>
      </div>
    </div>
    <?php

    //include(ABSPATH.THEME_PATH.'/template-part/template02-body-html.php');
    include(ABSPATH.THEME_PATH.'/template-part/template02-body-js-libraries.php');

   ?>

   <script>
      var MAPSLUG = '<?php echo $gMapSlug;?>';

      var APIKEY='';
      var APITOKEN='';

      var G_MASTER = '<?php echo G_MASTER;?>';
      //var //_EOSERVER_PREFIX = '//_EOSERVER_PREFIX';
      var GEOSERVER_SUFFIX = '';
      var USR_SET ='USR_SET';
      var user_login='user_login';

      var G_CSS_THEME = 'elegant01';

      var ERP_OWNER_GEOINFO_AZIENDA = '<?php echo $g_ERP_OWNER_GEOINFO_AZIENDA;?>';
      var CLIENT_DOC_CREDIT = '<?php echo $g_CLIENT_DOC_CREDIT;?>';

      var DFL_LOGO_OWNER = '<?php echo $g_DFL_LOGO_OWNER;?>';
      var DFL_LOGO_LOGIN = '<?php echo $g_DFL_LOGO_LOGIN;?>';
      var DFL_LABEL_MAIN_LOGO = '<?php echo $g_DFL_LABEL_MAIN_LOGO;?>';

      var info_tracker_ip='ip';
      var info_tracker_referer='referer';
      var info_tracker_session_token='session_token';

      var USER_LICENSE='none';

      var VER = '<?php echo APP_VERSION;?>';
      var GEOLIB_VER = '<?php echo APP_VERSION;?>';
      var GA_TRACKING_ID='<?php echo GA_TRACKING_ID;?>';
      var DOMAIN_PROJECT = '<?php echo $g_DOMAIN_PROJECT;?>';
      var HOME_PROJECT = '<?php echo $g_HOME_PROJECT;?>';
      var SOURCE_PATH = '<?php echo $g_SOURCE_PATH;?>';
      var ENVIRONMENT = 'dev';//<?php //echo $g_ENVIRONMENT;?>';
      var THEME_PROJECT = '<?php echo $g_THEME_PROJECT;?>';
      var THEME_PATH = '<?php echo THEME_PATH;?>';
      var WORKSPACE = '<?php echo $g_WORKSPACE;?>';
      var GEOSERVER_URL = '<?php echo $g_GEOSERVER_URL;?>';

      var G_ACTION = '<?php echo $gAction;?>';
      var G_NAME = '<?php echo $gName;?>';

      //--

      var NEW_LYR_TOKEN = '<?php echo $new_lyr_token;?>';

   </script>
   <?php
      //geovar-loader
      $value='map202-base';
      $url=get_stylesheet_directory_uri().'/src/js/'.$value.'.js?ver='.APP_VERSION;
   ?>
   <script src='<?php echo $url;?>'></script>

   <?php
      //geovar-loader
      $value='map206-general';
      $url=get_stylesheet_directory_uri().'/src/js/'.$value.'.js?ver='.APP_VERSION;
   ?>
   <script src='<?php echo $url;?>'></script>

   <?php
      //geovar-loader
      $value='map218-api';
      $url=get_stylesheet_directory_uri().'/src/js/'.$value.'.js?ver='.APP_VERSION;
   ?>
   <script src='<?php echo $url;?>'></script>

    <script>

      var gAction_list = [
        "view_data",
      ];

      var gName_list = [
        'ssit-show-all-tbmap',
        'ssit-show-single-tbmap',
        'ssit-show-all-tblyr',
        'manlyrs-manage-layers'
      ];

      dyn_functions['succ_postman'] = function(r){

        r.myaction=G_ACTION;
        r.myname=G_NAME;

        $('#json-result-plain').html(JSON.stringify(r, undefined, 2));
        //new JsonViewer({container: document.body, data: r, theme: 'light', expand: true});
        // var json = {
        //     'User' : {
        //         'Personal Info': {
        //             'Name': 'Eddy',
        //             'Age': 3
        //         },
        //         'Active': true,
        //         'Messages': [
        //             'Message 1',
        //             'Message 2',
        //             'Message 3'
        //         ]
        //     },
        //     'Total': 1
        // }
        
        var el = document.querySelector('.json-result');
        el.innerHTML = jsonViewer(r, true);
      }
       
      //--
      let postman_done = true;

      if(G_ACTION=='generic'){
        var r = {
          "postman":[
            {"msg":"action generic"},
            {"list":gAction_list}
          ]
        }
        dyn_functions['succ_postman'](r);
        postman_done = false;
      }
      else{

        var dataString={
          fn_group:'geodata',
          action:G_ACTION,
          qy_name:'A'
        }

        if(G_NAME=='ssit-show-all-tbmap'){

          dataString.collection='show_table_data';
          dataString.table_slug='TB_MAP';
          dataString.item_token='true';

        }
        else if(G_NAME=='ssit-show-single-tbmap'){

          dataString.collection='show_table_data';
          dataString.table_slug='TB_MAP';
          dataString.filter_field='item_token';
          dataString.filter_value='ce67a93d477897748b4a79dd9dd4b99c';

        }
        else if(G_NAME=='ssit-show-all-tblyr'){
          dataString.collection='show_table_data';
          dataString.table_slug='TB_LYR';
          dataString.item_token='true';
        }
        else if(G_NAME=='manlyrs-manage-layers'){
          var r = {
            "postman":[
              {"msg":"manage-layers"},
              {"list":[
                {"manlyrs-tb-and-master":"List all tables with attribute g_master"},
                {
                  "action":"modify_data",
                  "manlyrs-add-master":"If g_master empty add it",
                  "note-1":"Verify colums in geovar_tb",
                  "route":"/modify_data/manlyrs-add-master/"
                },
                {"manlyrs-update-master":"If table update associate to exist g_master"},
                //{"manlyrs-verify-colums":"Verify colums in geovar_tb"},
                {
                  "action":"view_data",
                  "manlyrs-list-lyrs-master":"List all layers with g_master selected",
                  "route":"/view_data/manlyrs-list-lyrs-master/"
                },
                {
                  "action":"modify_data",
                  "manlyrs-add-lyr-master":"If no layers add new layer with g_master",
                  "route":"/modify_data/manlyrs-add-lyr-master/"
                },
                {
                  "action":"view_data",
                  "manlyrs-list-geoserver-flyrs":"List all geoserver layers",
                  "route":"/view_data/manlyrs-list-geoserver-flyrs/"
                },
                {
                  "action":"modify_data",
                  "manlyrs-link-geoserver-lyr":"Associate geoserver to layer",
                  "route":"/modify_data/manlyrs-link-geoserver-lyr/"
                },
                {
                  "action":"view_data",
                  "manlyrs-list-geoserver-styles":"List all geoserver styles",
                  "route":"/view_data/manlyrs-list-geoserver-styles/"
                },
                {
                  "action":"modify_data",
                  "manlyrs-add-geoserver-style":"If no geoserver style add new",
                  "route":"/modify_data/manlyrs-add-geoserver-style/"
                }
              ]}
            ]
          }
          dyn_functions['succ_postman'](r);
          postman_done = false;
        }
        else if(G_NAME=='manlyrs-tb-and-master'){
          dataString.collection='viewTablesAndMaster';
        }
        else if(G_NAME=='manlyrs-add-master'){
          dataString.collection='importTableIntoCatalog';
          dataString.table='pt_test1';
          dataString.table_slug='PT_TEST1';
          // dataString.table_description = 'Teste de importação de tabela';
          dataString.master_type = 'geodata';
        }
        else if(G_NAME=='manlyrs-list-lyrs-master'){
          dataString.collection='viewLyrsByMaster';
          dataString.table_slug='PT_TEST1';
        }
        else if(G_NAME=='manlyrs-add-lyr-master'){
          dataString.collection='insertNewItemByTable';
          dataString.table_slug='TB_LYR';
          dataString.field_and_value=[
            {
              "type": "insert_post",
              "field": "g_slug",
              "value": "lyr"+NEW_LYR_TOKEN
            },
            {
              "field": "g_tables",
              "value": ["PT_TEST1"]
            }
          ];
        }
        else if(G_NAME=='manlyrs-list-geoserver-flyrs'){
          dataString.collection='viewGeoserverFLyrs';
        }
        else if(G_NAME=='manlyrs-link-geoserver-lyr'){
          dataString.collection='update_attributes_by_table';
          dataString.table_slug='TB_LYR';
          dataString.item_token='e01ab322d86cd75170cc19f76afc8640';
          dataString.field_and_value=[
            {
              "type": "insert_post",
              "field": "g_label",
              "value": "Test1"
            },
            {
              "field": "feat_type",
              "value": "point"
            },
            {
              "field": "lyr_type",
              "value": "wms"
            },
            {
              "field": "lyr_update",
              "value": "fix"
            },
            {
              "field": "geoserver_name",
              "value": "pt_test1"
            },
            {
              "field": "geoserver_style",
              "value": "tmp_sld"
            },
            {
              "field": "queryable",
              "value": "0"
            },
            {
              "field": "geoserver_style_name",
              "value": "flyr708706c1" //after manlyrs-add-geoserver-style
            }
          ];
        }
        else if(G_NAME=='manlyrs-list-geoserver-styles'){

          dataString.collection='show_table_data';
          dataString.table_slug='TB_LYR_STYLE';
          dataString.item_token='true';

        }
        else if(G_NAME=='manlyrs-add-geoserver-style'){

          dataString.collection='insertNewItemByTable';
          dataString.table_slug='TB_LYR_STYLE';
          dataString.field_and_value=[
            {
              "type": "insert_post",
              "field": "g_master",
              "value": "flyr"+NEW_LYR_TOKEN
            },
            {
              "field": "g_label",
              "value": "PT_TEST1 Simple style"
            },
            {
              "field": "attr_graphicfill",
              "value": "true"
            },
            {
              "field": "fillsize",
              "value": "fit"
            },
            {
              "field": "attr_styleparameter",
              "value": "svg"
            },
            {
              "field": "attr_symbolizer",
              "value": "point"
            },
            {
              "field": "fill",
              "value": "red"
            },
            {
              "field": "view_scale",
              "value": "medium"
            },
            {
              "field": "wellknownname",
              "value": "square"
            }
          ];

        }
        else if(G_NAME=='manmaps-manage-maps'){
          var r = {
            "postman":[
              {"msg":"manmaps-manage-maps"},
              {"list":[
                {
                  "action":"view_data",
                  "manmaps-view-all":"View all maps",
                  "route":"/view_data/manmaps-view-all/"
                },
                {
                  "action":"view_data",
                  "manmaps-view-single":"View single map",
                  "route":"/view_data/manmaps-view-single/"
                },
                {
                  "action":"modify_data",
                  "manmaps-modify-map-lyrs":"Modify map layers",
                  "route":"/modify_data/manmaps-modify-map-lyrs/"
                },
                {
                  "action":"modify_data",
                  "manmaps-add-map":"Add new map",
                  "route":"/modify_data/manmaps-add-map/"
                }
              ]}
            ]
          }
          dyn_functions['succ_postman'](r);
          postman_done = false;
        }
        else if(G_NAME=='manmaps-view-all'){

          dataString.collection='show_table_data';
          dataString.table_slug='TB_MAP';
          dataString.item_token='true';

        }
        else if(G_NAME=='manmaps-view-single'){
          
          dataString.collection='show_table_data';
          dataString.table_slug='TB_MAP';
          dataString.filter_field='item_token';
          dataString.filter_value='bd6da6a6c4bda6e629d347f0eb135d0c';          

        }
        else if(G_NAME=='manmaps-modify-map-lyrs'){
          
          dataString.collection='update_attributes_by_table';
          dataString.table_slug='TB_MAP';
          dataString.item_token='b05790b3753b63d6fab751dc7c9de520';  
          dataString.field_and_value=[
            // {
            //   "field": "g_lyr",
            //   "value": []
            // },
            // {
            //   "field": "g_addon",
            //   "value": []
            // },
            {
              "field": "js_loader_list_map_lyr",
              "value": ["map243-new-lyr_loader"]
            },
            {
              "field": "js_loader_list_map_config",
              "value": ["addon240-btn_settings-3"]
            },
            {
              "field": "list_basemap",
              "value": ["lyr040","lyr038"]
            }
          ];        

        }
        else if(G_NAME=='manmaps-add-map'){
          
          dataString.collection='insertNewItemByTable';
          dataString.table_slug='TB_MAP';
          dataString.field_and_value=[
            {
              "type": "insert_post",//optional no for db
              "field": "g_slug",
              "value": "map"+NEW_LYR_TOKEN
            },
            {
              "field": "g_label",
              "value": "New Map Test Postman"
            },
            {
              "field": "g_attributes",
              "value": {
                "label_main_logo": "cityplanner-300x57.png",
                "language": "en",
                "map_title": "eCommerce",
                "geoserver_workspace": "cityplanner",
                "geoserver_url": "https://geoserver.cityplanner.ch:8443/geoserver/",
                "df_logo_owner": "cityplannerlogo.png",
                "df_logo_login": "cityplanner-300x57.png",
                "erp_owner_geoinfo_azienda": "cityplanner.ch",
                "client_doc_credit": "CLIENT_DOC_CREDIT",
                "apple_touch_icon": "sit-apple_touch_icon.png",
                "favicon": "sit-favicon.ico",
                "favicon32": "sit-favicon-32x32.png",
                "favicon16": "sit-favicon-16x16.png"
              }
            },
            {
              "field": "js_loader_list_map_lyr",
              "value": [
                "map243-new-lyr_loader"
              ]
            },
            {
              "field": "js_loader_list_map_config",
              "value": [
                "addon233-btn_settings"
              ]
            },
            {
              "field": "list_basemap",
              "value": [
                "lyr040",
                "lyr038"
              ]
            }
          ];    

        }
        else{
          var r = {
            "postman":[
              {"msg":"no NAME found"},
              {"list":gName_list}
            ]
          }
          dyn_functions['succ_postman'](r);
          postman_done = false;
        }

      }

      if(postman_done==true){
        generic_api(dataString,'postman');
      }

    </script>

  </body>

</html>
