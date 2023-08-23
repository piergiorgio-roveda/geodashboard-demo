// --
page_inizialize();//page_inizialize...

async function page_inizialize() {

  // _onsole.log('page_inizialize','start');

  // _onsole.log('page_inizialize','show_loading2'); 
  // show_loading2('.mapid-loading');

  await Promise.all([
    // start_loadingIcon(),
    start_gLang(),
    start_geovar_2()
  ]);
  // _onsole.log('page_inizialize','01 promise ok');
  // _onsole.log(g_meta);   

  // _onsole.log('foo end');
  // _onsole.log(g_meta);
  // _onsole.log('start page_inizialize');

  await new Promise(resolve => setTimeout(resolve, 1));
  // _onsole.log('end page_inizialize'); 
  // _onsole.log('page_inizialize','02 promise ok');
  //search Map Properties
  g_ds = {
    geovar:"obj_maps",//obj_maps
    slug:MAPSLUG,//filter
    type:'single_object'//,//'item' or 'single_object' or 'full_object'
  }
  let mapItem = get_geovar_obj(g_ds);

  //--

  //then load scripts functions        


  // _onsole.log('end geovar_2'); 

  await Promise.all([
    geovar_user_local()
  ]);

  await new Promise(resolve => setTimeout(resolve, 1));

  // geovar_user_local();       

  //require
    //map203-google-initialize
    //map204-search-cointaner
  if (typeof google === 'object' && typeof google.maps === 'object') {
    aggiungi_box_ricerca();
  }

  //require
    //map223-geovar-loader   
  m223_ready();

  //require
    //map207-template-b    
  m207_ready();

  g_ds = {
    geovar:mapItem.g_addon,//obj_maps
    filter_field:'addon',
    slug:'m211',//filter
    type:'single_object',//'item' or 'single_object' or 'full_object'
    noproperties:true
  }
  let m211_Addon = get_geovar_obj(g_ds);

  if(m211_Addon.map == 'disabled'){
    hide_loading2('.mapid-loading');
  }
  else{
    // m211_mapRotation = 'disabled'; default in default.js
    if(m211_Addon.rotation != undefined){
      m211_mapRotation = m211_Addon.rotation;
    }

    // m211_mapLibrary = 'leafletjs'; default in default.js
    if(m211_Addon.map_library != undefined){
      m211_mapLibrary = m211_Addon.map_library;
    }

    // m211_mapPitch = '2D'; default in default.js
    if(m211_Addon.pitch != undefined){
      m211_mapPitch = m211_Addon.pitch;
    }

    if(document.getElementById("mapid") !== null){
      //require
        //map211-add-map 

      let opt = {
        mapLibrary:m211_mapLibrary,
        mapRotation:m211_mapRotation
      }
      // Add Map!
      // inside `m211_ready_2` >> hide_loading2('.mapid-loading');
      m211_ready_2(opt);

    }
  }

  //require
    //map225-user-meta
  m225_ready();

  //require
    //map239-fill_labels
  m239_ready();

  tmp_meta_ready();
  tmp_access_ready();

  //require
    //map232-basemaps
  if(m211_Addon.map == 'disabled'){

  }
  else{
    if (typeof mymap !== 'undefined') {

      let opt = {
        mapLibrary:m211_mapLibrary,
        mapRotation:m211_mapRotation
      }
      map232_ready_2(opt);
      
    }
  }
  
  //--uncomment all
  //require
    //map214-sidebar-footer-b
  map214_ready();

  //require
    //map231-js-loader.js
  // m231_ready();

  //require
    //map230-map-click.js
  m230_ready();

  //require
    //map236-template-mobile.js
  m236_ready();

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

  if(typeof dyn_external !== 'undefined' && dyn_external.length>0){
    dyn_external.forEach(element => {
      // _onsole.log('dynFuncExt',element)
      dyn_functions[element]();
    });
  }


}

async function start_gLang() {
  // _onsole.log('gLang start');
  // _onsole.log('page_inizialize','start_gLang','start');

  // _onsole.log('page_inizialize','start_geovar_1','wait');
  await Promise.all([
    start_geovar_1()
  ]);

  // _onsole.log('page_inizialize','start_geovar_1','? ready');
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
  await new Promise(resolve => setTimeout(resolve, 1));
  // _onsole.log('end gLang');
  // _onsole.log('page_inizialize','start_gLang','stop');       
}

async function start_geovar_1() {

  // _onsole.log('page_inizialize','start_geovar_1','start');

  // _onsole.log('page_inizialize','some others','wait');
  await Promise.all([
    start_geovar_action(), 
    start_geovar_button(), 
    start_geovar_collection(), 
    start_geovar_dialog(),
    start_geovar_tb(), 
    start_geovar_master(),
    //-- 
    start_geovar_label_full(), 
    start_geovar_user()
  ]);

  // _onsole.log('page_inizialize','show_loading2'); 
  // show_loading2('.mapid-loading');
  
  await new Promise(resolve => setTimeout(resolve, 1));
  // _onsole.log('end geovar_1');   
  // _onsole.log('page_inizialize','start_geovar_1','stop');     
}

async function start_geovar_action() {
  let slug='geovar_action';
  g_meta[slug] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/')).json();
  // _onsole.log('start '  + slug);
  await new Promise(resolve => setTimeout(resolve, 1));
  // _onsole.log('end '  + slug);
}

async function start_geovar_button() {
  let slug='geovar_button';
  g_meta[slug] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/')).json();
  // _onsole.log('start '  + slug);
  await new Promise(resolve => setTimeout(resolve, 1));
  // _onsole.log('end '  + slug);
}

async function start_geovar_collection() {
  let slug='geovar_collection';
  g_meta[slug] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/')).json();
  // _onsole.log('start '  + slug);
  await new Promise(resolve => setTimeout(resolve, 1));
  // _onsole.log('end '  + slug);
}

async function start_geovar_dialog() {
  let slug='geovar_dialog';
  g_meta[slug] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/')).json();
  // _onsole.log('start '  + slug);
  await new Promise(resolve => setTimeout(resolve, 1));
  // _onsole.log('end '  + slug);
}

async function start_geovar_tb() {
  let slug='geovar_tb';
  g_meta[slug] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/')).json();
  // _onsole.log('start '  + slug);
  await new Promise(resolve => setTimeout(resolve, 1));
  // _onsole.log('end '  + slug);
}

async function start_geovar_master() {
  let slug='geovar_master';
  g_meta[slug] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/')).json();
  // _onsole.log('start '  + slug);
  await new Promise(resolve => setTimeout(resolve, 1));
  // _onsole.log('end '  + slug);
}

async function start_geovar_label_full() {

  // stop using `getAllUsersData()`!
  let slug='geovar_label';
  // geovar_label_full
  g_meta[slug+'_full'] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/')).json();
  // _onsole.log('start '  + slug);
  await new Promise(resolve => setTimeout(resolve, 1));
  // _onsole.log('end '  + slug);
}

async function start_geovar_user() {
  // onsole.log(localStorage.getItem('user_token'));
  let slug='geovar_user';
  // geovar_user_full
  g_meta[slug+'_full'] = await (
    await fetch(
      HOME_PROJECT+'/script/'+slug+'/?user_token='+localStorage.getItem('user_token')
    )
  ).json();
  // _onsole.log('start '  + slug);
  await new Promise(resolve => setTimeout(resolve, 1));
  // _onsole.log('end '  + slug);
}

async function geovar_user_local() {

  g_meta.geovar_user_local = {
    features : [
      {
        properties : {
          user_id:0,
          user_token:'0x0'
        }
      }
    ]
  }

  if(localStorage.getItem('user_token')===null){
    // await new Promise(resolve => setTimeout(resolve, 1));
    prepare_start_geovar_2_case();
  }
  // else if(localStorage.getItem('user_token')==='0x0'){
  //   // await new Promise(resolve => setTimeout(resolve, 1));
  // //   prepare_start_geovar_2_case();
  // }
  else{
    let datastring = {
      call_type:'silent',
      fn_group:'geodata',
      action:'view_data',
      collection:'geovar_user_local',
      qy_name:'A',
      lyr:'lyr999',
      geom:0,
      user_token:localStorage.user_token
    };
    let r = await generic_api_v2(
      datastring,
      'geovar_user_local'
    )
    g_meta.geovar_user_local = r;
    prepare_start_geovar_2_case();
  }
}

function prepare_start_geovar_2_case(){

  if(g_meta.geovar_map.features[0].properties.g_group.includes('public')==true){
    start_geovar_2_case('nothing');
  }
  else if (window.location.href.includes('/'+PAGE_CLIENT_SLUG+'/profile/')){
    start_geovar_2_case('check_user_token');
  }
  else if (g_meta.geovar_map.features[0].properties.g_group.includes('private')==true){
    start_geovar_2_case('private');
  }
  else{
    start_geovar_2_case('check_user_token');
  } 
}

async function start_loadingIcon() {

  // _onsole.log('start_loadingIcon','deprecated');

  // // _onsole.log('gLang start');

  // await Promise.all([
  //   start_geovar_1()
  // ]);

  // // _onsole.log('gLang end');

  // g_meta.geovar_label_full.forEach(element => {
  //   if(element.name=='en_GB'){
  //     //gLang=element.features;
  //     element.features.forEach(e => {
  //       gLang[e.properties.g_slug]=e.properties.g_label;
  //     });
  //   }
  // });
  // // _onsole.log('start_gLang');
  // await new Promise(resolve => setTimeout(resolve, 1));
  // // _onsole.log('end gLang');          
}

async function start_geovar_lyr_style() {

  let slug='geovar_lyr_style';

  let params = new URLSearchParams();
  params.append('g_map_slug', MAPSLUG);

  g_meta[slug] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/?' + params.toString())).json();
  // _onsole.log('start '  + slug);

  await new Promise(resolve => setTimeout(resolve, 1));
  // _onsole.log('end '  + slug);
}

async function start_geovar_lyr() {
  let slug='geovar_lyr';

  let params = new URLSearchParams();
  params.append('g_map_slug', MAPSLUG);

  g_meta[slug] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/?' + params.toString())).json();
  // _onsole.log('start '  + slug);

  await new Promise(resolve => setTimeout(resolve, 1));
  // _onsole.log('end '  + slug);
}

async function start_geovar_map() {
  let slug='geovar_map';

  let params = new URLSearchParams();
  params.append('g_map_slug', MAPSLUG);

  g_meta[slug] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/?' + params.toString())).json();
  // _onsole.log('start '  + slug);
  
  await new Promise(resolve => setTimeout(resolve, 1));
  // _onsole.log('end '  + slug);
}

async function start_geovar_map_tb() {
  let slug='geovar_map_tb';

  let params = new URLSearchParams();
  params.append('g_map_slug', MAPSLUG);

  g_meta[slug] = await (await fetch(HOME_PROJECT+'/script/'+slug+'/?' + params.toString())).json();
  // _onsole.log('start '  + slug);

  await new Promise(resolve => setTimeout(resolve, 1));
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
  await new Promise(resolve => setTimeout(resolve, 1));
  // _onsole.log('end geovar_2'); 

  // if(g_meta.geovar_map.features[0].properties.g_group.includes('public')==true){
  //   start_geovar_2_case('nothing');
  // }
  // else if (window.location.href.includes('/'+PAGE_CLIENT_SLUG+'/profile/')){
  //   start_geovar_2_case('check_user_token');
  // }
  // else if (g_meta.geovar_map.features[0].properties.g_group.includes('private')==true){
  //   start_geovar_2_case('private');
  // }
  // else{
  //   start_geovar_2_case('check_user_token');
  // }  

}

function start_geovar_2_case(myCase){

  switch (myCase) {
    case 'nothing':

    break;

    case 'private':

      // onsole.log(`Manage start_geovar_2_case options for ${myCase}.`);
      // localStorage.user_token need valid token
      if(localStorage.getItem('user_token')===null){               
        if(mapuser_meta[0]['user_token']=='0x0'){
          open_page_profile();
        }
        else{
          set_user_token_from_meta();
        }
      }
      else if(localStorage.getItem('user_token')==='0x0'){ 
        if(mapuser_meta[0]['user_token']=='0x0'){
          open_page_profile();
        }
        else{
          set_user_token_from_meta();
        }
      }
      else{
        let user_token = localStorage.getItem('user_token');
        if(g_meta.geovar_map.features[0].properties.g_group.includes(user_token)==true){
          // nothing
        }
        else{
          let i = 0;
          g_meta.geovar_user_local.features[0].properties.user_role.forEach(element => {
            // onsole.log('user_role',element);
            if(g_meta.geovar_map.features[0].properties.g_group.includes(element)==true){
              i++;
            }                  
          });
          if(i==0){
            open_page_profile();
          }
          else{
            // nothing
            // _onsole.log('user_role: all done!');
          }
        }
      }

    break;

    case 'check_user_token':

      if(window.location.href.includes('?user_token=')){

        // Set new user_token and reload page
        let user_token_from_url = window.location.href.split('?user_token=')[1];
        localStorage.setItem('user_token', user_token_from_url);
        let url = window.location.href.split('?')[0];
        window.open(url,"_self");

      }
      else{

        if(localStorage.getItem('user_token') === null){
          if(mapuser_meta[0]['user_token']=='0x0'){
            open_page_profile();
          }
          else{
            set_user_token_from_meta();
          }
        }
        else{

          if(mapuser_meta[0]['user_token']!='0x0'){
            // nothing
            // set_user_token_from_meta();
            alert('Admin: `user_token` override by client');
          }
          else if(localStorage.getItem('user_token')=='0x0'){
            open_page_profile();
          }
          else{
            // nothing
          }
          
        }

      }            
    break;

    default:

      console.log(`No start_geovar_2_case options for ${myCase}.`);

  } // switch
}

function open_page_profile(){
  let url = HOME_PROJECT+'/'+PAGE_CLIENT_SLUG+'/profile/';
  if(window.location.href!=url){
    window.open(url,"_self");
  }
}

function set_user_token_from_meta(){
  localStorage.setItem('user_token', mapuser_meta[0]['user_token']);
}