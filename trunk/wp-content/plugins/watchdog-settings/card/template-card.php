<!doctype html>
<?php
// the following constant will help ensure all other PHP files will only work as part of this API.
if (!defined('CONST_INCLUDE_KEY')){
  define('CONST_INCLUDE_KEY', 'd4e2ad09-b1c3-4d70-9a9a-0e6149302486');
}

define('THEME_PATH', str_replace(get_site_url(), "", get_stylesheet_directory_uri()));
//$g_PLUGIN_PROJECT = plugin_dir_path( __FILE__ );

//--
$cApp_fn = new App_API_Geodata_fn;
$cApp_ER = new App_ElementsRoles;
$elements_roles=$cApp_ER->get_user_access_db('page_dashboard_0x1');
if($elements_roles[0]=='lock'){
   echo "User without permission.";
   exit;
}

//-- SUB

global $wp_query;
$my_query_vars = $wp_query->query_vars;

//-- MAPSLUG

$item_token='edeb7786ecb94fc30620defcb2ac2054';
$gMapSlug='mapslug-'.$item_token;//'cityplanner';//MAPSLUG;

$CANONICAL = get_permalink();

if(!empty($my_query_vars['mypage'])){

  $item_token=$my_query_vars['mypage'];
  $gMapSlug='mapslug-'.$item_token;//'cityplanner';//MAPSLUG;

  $CANONICAL = get_site_url()."/".$item_token;

}

$geovar_wiki = $cApp_fn->geovar_to_json_wiki('geovar_wiki',$item_token);

//-- ATTRIBUTES

// $obj_maps=$cApp_fn->get_maps_meta();
// $obj_maps=$cApp_fn->get_maps_meta2();
$obj_maps=$geovar_wiki;

// foreach ($obj_maps['features'] as $key => $objMap) {
//   if($gMapSlug==$objMap['properties']['g_slug']){
//      $itemMap = $objMap['properties'];
//   }
// }
$itemMap = $obj_maps['features'][0]['properties'];

if(empty($itemMap['g_attributes'])){
  echo 'MAP g_attributes not defined';
  exit;
}

//--

include(ABSPATH.THEME_PATH.'/template-part/template-g_variables.php');

//--

?>
<html lang="<?php echo $g_LANGUAGE;?>" class="h-100">
  <?php
  include(ABSPATH.THEME_PATH.'/template-part/template05-head.php');
  ?>
  <body class="d-flex h-100 text-center text-bg-white">
    <!-- Google Tag Manager (noscript) -->
    <noscript>
      <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NFQVJCD" height="0" width="0" style="display:none;visibility:hidden"></iframe>
    </noscript>

    <?php

    if(!empty($my_query_vars['mypage'])){
      //echo "Card have sub";
      include(plugin_dir_path( __FILE__ ).'cityplanner/template05-body-html-card.php');
    }
    else{
      //echo "Card have no sub";
      include(ABSPATH.THEME_PATH.'/template-part/cityplanner/template05-body-html-home.php');
    }
    include(ABSPATH.THEME_PATH.'/template-part/template02-body-js-libraries.php');
    ?>
    <?php
    include(ABSPATH.THEME_PATH.'/template-part/template-g_variables-js.php');
    ?>      
    <?php
    //include(ABSPATH.THEME_PATH.'/template-part/template02-body-js-variables.php');
    ?>

    <script>

      $('body').css('box-shadow', 'none');

      <?php
      if(!empty($my_query_vars['mypage'])){
      //echo "Card have sub";

        if($my_query_vars['mypage']=='f2dca93f9ae0cab145aa628fd6ba6e10'){
          ?>
          $('.home-nav').removeClass('active');
          $('#home-nav-skill').addClass('active');
          <?php
        }
        else{
          ?>
          $('.home-nav').removeClass('active');
          <?php
        }

      }
      ?>
    </script>

    <script>

      const g_meta = [];

      // g_meta.obj_maps = <?php //echo json_encode($obj_maps, JSON_PRETTY_PRINT);?>

      const f_wait = new Array();

      // //user_meta
      f_wait.watchlist=0;
      f_wait.geovar_user=0;

      // const mapuser_meta = <?php echo json_encode($mapuser_meta, JSON_PRETTY_PRINT);?>

      g_meta.geovar_user = new Array();
      g_meta.geovar_user.features = [];
      // g_meta.geovar_user.features.push({'properties':mapuser_meta[0]});
      // // _onsole.log(mapuser_meta);

      // if(g_meta.geovar_user.features[0].properties.user_id==0){
        sessionStorage.access_status=0;
      // }
      // else{
      //    sessionStorage.access_status=1;
      // }

      // f_wait.geovar_user=1;

      // //--

      f_wait['geovar_access']=0;
      g_meta.geovar_access={'features':[]};

      // //--

      g_meta.geovar_addon = new Array();
      g_meta.geovar_addon.features = [];

      var gLang = [];//geovar.language_webapp.en_GB;

      //var list_basemap = <?php //echo json_encode($itemMap['list_basemap'], JSON_PRETTY_PRINT);?>;

   </script>

   <!--<script src='<?php //echo get_site_url().'/script/geovar_access/?g_map_slug='.$gMapSlug;?>'></script>-->

   <script>

async function start_geovar_action() {
        let slug='geovar_action';
        g_meta[slug] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/')).json();
        // _onsole.log('start '  + slug);
        await new Promise(resolve => setTimeout(resolve, 2000));
        // _onsole.log('end '  + slug);
      }

      async function start_geovar_button() {
        let slug='geovar_button';
        g_meta[slug] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/')).json();
        // _onsole.log('start '  + slug);
        await new Promise(resolve => setTimeout(resolve, 2000));
        // _onsole.log('end '  + slug);
      }

      async function start_geovar_collection() {
        let slug='geovar_collection';
        g_meta[slug] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/')).json();
        // _onsole.log('start '  + slug);
        await new Promise(resolve => setTimeout(resolve, 2000));
        // _onsole.log('end '  + slug);
      }

      async function start_geovar_dialog() {
        let slug='geovar_dialog';
        g_meta[slug] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/')).json();
        // _onsole.log('start '  + slug);
        await new Promise(resolve => setTimeout(resolve, 2000));
        // _onsole.log('end '  + slug);
      }

      async function start_geovar_tb() {
        let slug='geovar_tb';
        g_meta[slug] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/')).json();
        // _onsole.log('start '  + slug);
        await new Promise(resolve => setTimeout(resolve, 2000));
        // _onsole.log('end '  + slug);
      }

      async function start_geovar_master() {
        let slug='geovar_master';
        g_meta[slug] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/')).json();
        // _onsole.log('start '  + slug);
        await new Promise(resolve => setTimeout(resolve, 2000));
        // _onsole.log('end '  + slug);
      }

      async function start_geovar_label_full() {
        let slug='geovar_label';
        g_meta[slug+'_full'] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/')).json();
        // _onsole.log('start '  + slug);
        await new Promise(resolve => setTimeout(resolve, 2000));
        // _onsole.log('end '  + slug);
      }

      async function start_geovar_1() {

        await Promise.all([
          start_geovar_action(), 
          start_geovar_button(), 
          start_geovar_collection(), 
          start_geovar_dialog(),
          start_geovar_tb(), 
          start_geovar_master(),
          //-- 
          start_geovar_label_full()
        ]);

        // _onsole.log('start_geovar_1');
        show_loading2('.mapid-loading');
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        // _onsole.log('end geovar_1');        
      }

      async function start_gLang() {
        // _onsole.log('gLang start');

        await Promise.all([
          start_geovar_1()
        ]);

        // _onsole.log('gLang end');

        g_meta.geovar_label_full.forEach(element => {
          if(element.name=='en_GB'){
            //gLang=element.features;
            element.features.forEach(e => {
              gLang[e.properties.g_slug]=e.properties.g_label;
            });
          }
        });
        // _onsole.log('start_gLang');
        await new Promise(resolve => setTimeout(resolve, 2000));
        // _onsole.log('end gLang');          
      }

      async function start_loadingIcon() {
        // _onsole.log('gLang start');

        await Promise.all([
          start_geovar_1()
        ]);

        // _onsole.log('gLang end');

        g_meta.geovar_label_full.forEach(element => {
          if(element.name=='en_GB'){
            //gLang=element.features;
            element.features.forEach(e => {
              gLang[e.properties.g_slug]=e.properties.g_label;
            });
          }
        });
        // _onsole.log('start_gLang');
        await new Promise(resolve => setTimeout(resolve, 2000));
        // _onsole.log('end gLang');          
      }

      async function start_geovar_lyr_style() {

        let slug='geovar_lyr_style';

        let params = new URLSearchParams();
        params.append('g_map_slug', MAPSLUG);

        g_meta[slug] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/?' + params.toString())).json();
        // _onsole.log('start '  + slug);

        await new Promise(resolve => setTimeout(resolve, 2000));
        // _onsole.log('end '  + slug);
      }

      async function start_geovar_lyr() {
        let slug='geovar_lyr';

        let params = new URLSearchParams();
        params.append('g_map_slug', MAPSLUG);

        g_meta[slug] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/?' + params.toString())).json();
        // _onsole.log('start '  + slug);

        await new Promise(resolve => setTimeout(resolve, 2000));
        // _onsole.log('end '  + slug);
      }

      async function start_geovar_map() {
        let slug='geovar_map';

        let params = new URLSearchParams();
        params.append('g_map_slug', MAPSLUG);

        g_meta[slug] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/?' + params.toString())).json();
        // _onsole.log('start '  + slug);
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        // _onsole.log('end '  + slug);
      }

      async function start_geovar_map_tb() {
        let slug='geovar_map_tb';

        let params = new URLSearchParams();
        params.append('g_map_slug', MAPSLUG);

        g_meta[slug] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/?' + params.toString())).json();
        // _onsole.log('start '  + slug);

        await new Promise(resolve => setTimeout(resolve, 2000));
        // _onsole.log('end '  + slug);
      }

      async function start_geovar_2(){

        // _onsole.log('start_');

        await Promise.all([
          start_geovar_lyr_style(), 
          start_geovar_lyr(), 
          start_geovar_map(), 
          start_geovar_map_tb()
        ]);

        // _onsole.log('end_');
        // _onsole.log(g_meta);

        // _onsole.log('start_geovar_2');
        await new Promise(resolve => setTimeout(resolve, 2000));
        // _onsole.log('end geovar_2'); 

        // _onsole.log(g_meta);

      }

      async function page_inizialize() {

        await Promise.all([
          start_loadingIcon(),
          start_gLang(),
          start_geovar_2()
        ]);

        // _onsole.log(g_meta);

        // _onsole.log('foo end');
        // _onsole.log(g_meta);
        // _onsole.log('start page_inizialize');
  
        await new Promise(resolve => setTimeout(resolve, 2000));
        // _onsole.log('end page_inizialize'); 

        hide_loading2('.mapid-loading');

        //then load scripts functions        

        //require
          //map203-google-initialize
          //map204-search-cointaner
        //aggiungi_box_ricerca();

        //require
          //map223-geovar-loader   
        m223_ready();

        //require
          //map207-template-b    
        m207_ready();

        //require
          //map211-add-map 
        //m211_ready();

        //require
          //map225-user-meta
        //m225_ready();

        //require
          //map239-fill_labels
        m239_ready();

        tmp_meta_ready();
        tmp_access_ready();

        //require
          //map232-basemaps
        if (typeof mymap !== 'undefined') {
          map232_ready();
        }

        //require
          //map214-sidebar-footer-b
        //map214_ready();

        //require
          //map231-js-loader.js
        // m231_ready();

        //require
          //map230-map-click.js
        //m230_ready();

        let js_loader_list_map_lyr = <?php echo json_encode($itemMap['js_loader_list_map_lyr'], JSON_PRETTY_PRINT);?>;
        let js_loader_list_map_config = <?php echo json_encode($itemMap['js_loader_list_map_config'], JSON_PRETTY_PRINT);?>;

        js_loader_list_map_lyr.forEach(element => {
          if(dyn_functions[element+'_ready']!=null){
            dyn_functions[element+'_ready']();
          }
        });

        js_loader_list_map_config.forEach(element => {
          if(dyn_functions[element+'_ready']!=null){
            dyn_functions[element+'_ready']();
          }
        });

      }

      page_inizialize();//page_inizialize...

  </script>

  <?php
  include(ABSPATH.THEME_PATH.'/template-part/template05-body-js-project.php');
  ?>

  </body>
</html>
