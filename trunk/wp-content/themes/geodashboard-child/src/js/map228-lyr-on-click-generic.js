// !dev change `slug` to `optIn`
f_btn[ 'get_lyr_single_for_dlg']=function(slug){
  
  // _onsole.log('get_lyr_single_for_dlg');
  // _onsole.log('f_btn:btn_explorer');
  //create_dialog2(slug);
  dataString={
    fn_group:'geodata',
    action:'view_data',
    collection:'lyr_single_one_table',
    qy_name:'A',
    lyr:slug,//'lyr035',
    geom:false,
    item_token:localStorage[slug+'_token'] //lyr035_token
  }
  generic_api(dataString,'get_lyr_single_for_dlg');
  return;
}

dyn_functions['succ_get_lyr_single_for_dlg'] = function(r){
  // _onsole.log(r);
  let lyr=r.ds.lyr;
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;
  obj_lyr.last_r=r;
  sessionStorage.this_dialog_lyr=r.ds.lyr;
  sessionStorage.this_dialog_slug=r.ds.lyr+'_single';//'lyr035_single'

  create_dialog2(sessionStorage.this_dialog_slug);
}

// !dev change `slug` to `optIn`
f_btn[ 'modify_lyr_single_for_dlg']=function(slug,slug2){

  //_onsole.log('modify_lyr_single_for_dlg',slug);
  //_onsole.log('modify_lyr_single_for_dlg',slug2);
  let lyr=slug;
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  let lyr2=slug;
  let o2 = g_meta.geovar_lyr.features
  let this_obj2=o2.filter(({properties}) => properties.g_slug === lyr2);
  let obj_lyr2=this_obj2[0].properties;

  var table_slug=obj_lyr.g_tables[0];
  // _onsole.log('table_slug:'+table_slug);
  g_meta.geovar_map_tb.forEach(obj => {
    // _onsole.log(obj.name)
    if(obj.name==table_slug){
      this_tb[table_slug]=obj.features;
    }
  });
  // _onsole.log(this_tb[table_slug]);

  //table_schema
  obj_lyr2.last_r=new Array();
  obj_lyr2.last_r.features=[];
  obj_lyr2.last_r.features.push(this_tb[table_slug]);

  sessionStorage.this_dialog_lyr=slug2;
  sessionStorage.this_dialog_slug=slug2+'_single';//'lyr035_single'
  //_onsole.log('modify_lyr_single_for_dlg',sessionStorage.this_dialog_slug);
  create_dialog2(sessionStorage.this_dialog_slug);

}

// !dev change `slug` to `optIn`
f_btn[ 'modify_lyr_single_for_dlg_2']=function(slug,type){
  
  // >> view map238-geovar_lyr_table_schema
  //_onsole.log('modify_lyr_single_for_dlg_2',slug)
  sessionStorage.this_dialog_lyr=slug;
  sessionStorage.this_dialog_slug=slug+'_'+type;//'lyr035_single'

  create_dialog2(sessionStorage.this_dialog_slug);

}