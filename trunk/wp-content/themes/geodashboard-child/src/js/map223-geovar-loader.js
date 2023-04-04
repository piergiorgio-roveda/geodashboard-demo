let g_meta_list=[
  // 'geovar_action',
  // 'geovar_button',
  // 'geovar_collection',
  // 'geovar_dialog',
  // 'geovar_label',
  // 'geovar_tb',
  //'geovar_lyr_style',
  // 'geovar_master'
];
let g_meta_project_list=[
  //'geovar_lyr',
  //'geovar_map',
  //'geovar_map_tb'
];

g_meta_list.forEach(element => {
  f_wait[element]=0;
});
g_meta_project_list.forEach(element => {
  f_wait[element]=0;
});

function m223_ready(){
  load_geovar(g_meta_list);
  load_geovar_project(g_meta_project_list);
}

function load_geovar(g_meta_list){

  console.log('load_geovar',g_meta_list);

  g_meta_list.forEach(element => {
    var dataString = {}
    dataString.slug=element;
    dataString.settings_url='/script/'+element+'/?g_map_slug='+MAPSLUG+'&json='+element+'&ver='+VER+'';
    dataString.settings_json=true;

    generic_api(dataString,'load_geovar');
  });

}

dyn_functions['succ_load_geovar'] = function(r){

  var slug=r.ds.slug;
  // _onsole.log('Load '+slug+': success');
  var f = r;
  
  if(slug=='geovar_label'){

    //var bar_geovar_label = new Promise((resolve, reject) => {
      f.forEach(element => {
        if(element.name=='en_GB'){
          //gLang=element.features;
          element.features.forEach(e => {
            gLang[e.properties.g_slug]=e.properties.g_label;
          });
        }
      });
    //});

    //bar_geovar_label.then(() => {
      //console.log('All done!');
      //f_wait['geovar_label']=1;
    //});
    g_meta[slug+'_full']=f;
    //f_wait[slug+'_full']=1;
  }
  else{
    g_meta[slug]=f;
    f_wait[slug]=1;
  }

  f_wait[slug]=1;

  // _onsole.log(g_meta);

}

function load_geovar_project(g_meta_project_list){
  console.log('load_geovar_project',g_meta_project_list);
  g_meta_project_list.forEach(element => {
    var dataString = {}
    dataString.slug=element;
    //dataString.settings_url='/meta/'+MAPSLUG+'_'+element+'.json?ver='+VER;
    dataString.settings_url='/script/'+element+'/?g_map_slug='+MAPSLUG+'&json='+element+'&ver='+VER+'';
    dataString.settings_json=true;

    generic_api(dataString,'load_geovar_project');
  });

}

dyn_functions['succ_load_geovar_project'] = function(r){

  var slug=r.ds.slug;
  // _onsole.log('Load '+slug+': success');
  var f = r;
  
  g_meta[slug]=f;

  if(dyn_functions[slug+'_extend']!=undefined){
    dyn_functions[slug+'_extend']();
  }

  f_wait[slug]=1;

  // _onsole.log(g_meta);

}
