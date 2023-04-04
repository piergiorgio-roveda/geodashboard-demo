<!doctype html>
<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// the following constant will help ensure all other PHP files will only work as part of this API.
if (!defined('CONST_INCLUDE_KEY')){
  define('CONST_INCLUDE_KEY', 'd4e2ad09-b1c3-4d70-9a9a-0e6149302486');
}

//--

$module=$post->post_name;//

//--


$cApp_fn = new App_API_Geodata_fn;
$cApp_ER = new App_ElementsRoles;

$elements_roles=$cApp_ER->get_user_access_db('page_map_0x1');
$elements_roles=$cApp_ER->get_user_access_db('page_'.$post_name.'_0x1');

if($elements_roles[0]=='lock'){
   echo "User without permission.";
   exit;
}

$mapuser_meta=$cApp_fn->get_mapuser_meta();
//_rint_r($mapuser_meta);
/* 
Array(
   [0] => Array(
      [user_id] => 1
      [user_role] => administrator
      [user_token] => 835793ede8ce0f3db290e63acbb2da09
      [watchlist] => [{"slug":"PT_BUILDING","items":["AAA",...
   )
) */
//--

global $wp_query;
$my_query_vars = $wp_query->query_vars;

//$obj_maps=$cApp_fn->get_maps_meta();
$obj_maps=$cApp_fn->get_maps_meta2();

//--

$gMapSlug=MAPSLUG;

//--


$p_item_token='e87d8bdc4237bb59d244eee83831fa99';

if(!empty($my_query_vars['mypage'])){
   $p_item_token=$my_query_vars['mypage'];
   //$g_map_slug=$my_query_vars['mypage'];
}

foreach ($obj_maps['features'] as $key => $objMap) {
   if($gMapSlug==$objMap['properties']['g_slug']){
      $itemMap = $objMap['properties'];
   }
}

if(empty($itemMap['g_attributes'])){
   echo 'MAP g_attributes not defined';
   exit;
}

//--  get map attributes

$o['_hide']['ds']['fn_group']=$module;
$o['_hide']['ds']['action']='view_data';
$o['_hide']['ds']['collection']='view_post_single';
$o['_hide']['ds']['item_token']=$p_item_token;
$o['_hide']['ds']['output']='OBJECT';

$className = 'API_Handler_'.$module;
$cApiHandler = new $className();

$o = $cApiHandler->execCommand('watchdog_'.$module,$o);
$p = $o['features'][0]['properties'];

//-- content permission
$mapuser_meta=$cApp_fn->get_mapuser_meta();
$g_group = $p['g_group'];
//_rint_r($mapuser_meta[0]['user_role']);
//_rint_r($g_group);
$result=$cApp_ER->intersect_roles($g_group,$mapuser_meta[0]['user_role']);

//_rint_r($result);
if($result[0]=='lock'){
   $p = array();
   $content = array();
   $g_map_title='No content avaible';
}
else{
   $content = $p['post_content'][0];
   $g_map_title=$content->title;
}

//_rint_r($mapuser_meta);
/* 
Array(
   [0] => Array(
      [user_id] => 1
      [user_role] => administrator
      [user_token] => 835793ede8ce0f3db290e63acbb2da09
      [watchlist] => [{"slug":"PT_BUILDING","items":["AAA",...
   )
) */
//--

//e87d8bdc4237bb59d244eee83831fa99

$geovar_action = $cApp_fn->geovar_to_json(strtoupper('geovar_action'));
$geovar_button = $cApp_fn->geovar_to_json(strtoupper('geovar_button'));
$geovar_collection = $cApp_fn->geovar_to_json(strtoupper('geovar_collection'));
$geovar_dialog = $cApp_fn->geovar_to_json(strtoupper('geovar_dialog'));
$geovar_label = $cApp_fn->geovar_to_json(strtoupper('geovar_label'));
$geovar_tb = $cApp_fn->geovar_to_json(strtoupper('geovar_tb'));
$geovar_master = $cApp_fn->geovar_to_json(strtoupper('geovar_master'));

$geovar_lyr_style = $cApp_fn->geovar_to_json_mapslug('geovar_lyr_style',$gMapSlug);
$geovar_lyr = $cApp_fn->geovar_to_json_mapslug('geovar_lyr',$gMapSlug);
$geovar_map = $cApp_fn->geovar_to_json_mapslug('geovar_map',$gMapSlug);
$geovar_map_tb = $cApp_fn->geovar_to_json_mapslug('geovar_map_tb',$gMapSlug);

//-- 

$g_map_title=$itemMap['g_attributes']->map_title;
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
?>
<html lang="en">
  <?php
  include(ABSPATH.THEME_PATH.'/template-part/template04-head.php');
  ?>
  <body>

   <?php
   include(ABSPATH.THEME_PATH.'/template-part/template02-body-html.php');
   include(ABSPATH.THEME_PATH.'/template-part/template02-body-js-libraries.php');
   ?>

   <script>
      var MAPSLUG = '<?php echo $gMapSlug;?>';

      var APIKEY='';
      var APITOKEN='';

      var G_MASTER = '<?php echo G_MASTER;?>';
      //_var //_EOSERVER_PREFIX = '//_EOSERVER_PREFIX';
      var GEOSERVER_SUFFIX = '';
      var USR_SET ='USR_SET';
      var user_login='user_login';

      var G_CSS_THEME = 'elegant01'

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

   </script>
   <?php
   //include(ABSPATH.THEME_PATH.'/template-part/template02-body-js-variables.php');

   include(ABSPATH.THEME_PATH.'/template-part/template02-body-js-extra.php');
   ?>

   <script>

      //const obj_maps = <?php //echo json_encode($obj_maps, JSON_PRETTY_PRINT);?>

   </script>

   <script>
      var p_main = <?php echo json_encode($p, JSON_PRETTY_PRINT);?>
   </script>

   <script>

      const g_meta = [];
      const f_wait = new Array();

      //user_meta
      f_wait.watchlist=0;
      f_wait.geovar_user=0;

      const mapuser_meta = <?php echo json_encode($mapuser_meta, JSON_PRETTY_PRINT);?>

      g_meta.geovar_user = new Array();
      g_meta.geovar_user.features = [];
      g_meta.geovar_user.features.push({'properties':mapuser_meta[0]});
      // _onsole.log(mapuser_meta);

      if(g_meta.geovar_user.features[0].properties.user_id==0){
         sessionStorage.access_status=0;
      }
      else{
         sessionStorage.access_status=1;
      }

      f_wait.geovar_user=1;

      //--

      f_wait['geovar_access']=0;
      g_meta.geovar_access={'features':[]};

      //--

      g_meta.geovar_addon = new Array();
      g_meta.geovar_addon.features = [];

   </script>

   <script src='<?php echo get_site_url().'/script/?g_map_slug='.MAPSLUG;?>'></script>


   <script>

      // let g_meta_list=[
      //    'geovar_action',
      //    'geovar_button',
      //    'geovar_collection',
      //    'geovar_dialog',
      //    //'geovar_label',
      //    'geovar_tb',
      //    'geovar_lyr_style',
      //    'geovar_master'
      // ];
      // g_meta_list.forEach(element => {
      //    f_wait[element]=0;
      // });
      // g_meta_list.forEach(element => {
      //    let dataString = {}
      //    dataString.slug=element;
      //    dataString.settings_url='/script/'+element+'/?g_map_slug='+MAPSLUG+'&json='+element+'&ver='+VER+'';
      //    dataString.settings_json=true;
      //    let baseUrl=HOME_PROJECT+dataString['settings_url'];
      //    let toAjax={
      //       type: "GET",
      //       url: baseUrl,  
      //       dataType: 'json',
      //       async:    true,
      //       cache:    false,
      //       g_meta:element
      //    }

      //    toAjax['success']=function(r){
      //       g_meta[this.g_meta]=r;
      //       f_wait[this.g_meta]=1;
      //       return;
      //       //return response;
      //    }//success

      //    $.ajax(toAjax); //ajax

      // });

      g_meta.geovar_action = <?php echo json_encode($obj_maps, JSON_PRETTY_PRINT);?>;
      g_meta.geovar_action = <?php echo json_encode($geovar_action, JSON_PRETTY_PRINT);?>;
      g_meta.geovar_button = <?php echo json_encode($geovar_button, JSON_PRETTY_PRINT);?>;
      g_meta.geovar_collection = <?php echo json_encode($geovar_collection, JSON_PRETTY_PRINT);?>;
      g_meta.geovar_dialog = <?php echo json_encode($geovar_dialog, JSON_PRETTY_PRINT);?>;
      g_meta.geovar_label_full = <?php echo json_encode($geovar_label, JSON_PRETTY_PRINT);?>;
      g_meta.geovar_tb = <?php echo json_encode($geovar_tb, JSON_PRETTY_PRINT);?>;
      g_meta.geovar_master = <?php echo json_encode($geovar_master, JSON_PRETTY_PRINT);?>;

      var gLang = [];//geovar.language_webapp.en_GB;

      g_meta.geovar_label_full.forEach(element => {
      if(element.name=='en_GB'){
         //gLang=element.features;
         element.features.forEach(e => {
            gLang[e.properties.g_slug]=e.properties.g_label;
         });
      }
      });

      g_meta.geovar_lyr_style = <?php echo json_encode($geovar_lyr_style, JSON_PRETTY_PRINT);?>;
      g_meta.geovar_lyr = <?php echo json_encode($geovar_lyr, JSON_PRETTY_PRINT);?>;
      g_meta.geovar_map = <?php echo json_encode($geovar_map, JSON_PRETTY_PRINT);?>;
      g_meta.geovar_map_tb = <?php echo json_encode($geovar_map_tb, JSON_PRETTY_PRINT);?>;

      let g_meta_list_x=[
         'geovar_action',
         'geovar_button',
         'geovar_collection',
         'geovar_dialog',
         'geovar_label',
         'geovar_tb',
         'geovar_lyr_style',
         'geovar_master'
      ];
      let g_meta_project_list_x=[
         'geovar_lyr',
         'geovar_map',
         'geovar_map_tb'
      ];

      g_meta_list_x.forEach(element => {
         f_wait[element]=1;
      });
      g_meta_project_list_x.forEach(element => {
         f_wait[element]=1;
      });

   </script>

   <!--CONFIG MAP / NOMAP -->
   <?php
   $url=get_site_url().'/config/map_nomap_config.js?ver='.APP_VERSION;
   ?>
   <script src='<?php echo $url;?>'></script>

   <!--CONFIG MASTER-->
   <?php
   $url=get_site_url().'/config/map_wiki_config.js?ver='.APP_VERSION;
   ?>
   <script src='<?php echo $url;?>'></script>

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

   <?php
      //geovar-loader
      $value='map223-geovar-loader';
      $url=get_stylesheet_directory_uri().'/src/js/'.$value.'.js?ver='.APP_VERSION;
   ?>
   <script src='<?php echo $url;?>'></script>

   <script>
   <?php
      if(!empty($p['g_config'])){
         foreach ($p['g_config'] as $key => $value) {
            ?>
            js_loader_list_map_config.push('<?php echo $value;?>');
            <?php
         }
      }

      if(!empty($content->g_type)){
         if($content->g_type=='type-custom'){
            foreach ($content->custom_js as $value) {
               ?>
               js_loader_list_map_config.push('<?php echo $value;?>');
               <?php
            }
         }
      }
   ?>
   </script>

   <script>

      if(js_loader_list_map_lyr){
         js_loader_list_map_lyr.forEach(element => {
            js_loader_list.push(element);
         });
      }

      js_loader_list_after.forEach(element => {
         js_loader_list.push(element);
      });

      js_loader_list_map_config.forEach(element => {
         js_loader_list.push(element);
      });

   </script>

   <?php
   include(ABSPATH.THEME_PATH.'/template-part/template03-body-js-project.php');
   ?>

  </body>
</html>
