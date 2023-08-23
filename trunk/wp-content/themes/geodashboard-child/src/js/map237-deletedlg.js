// !dev change `slug` to `optIn`
f_btn[ 'btn_deletedlg']=function(slug){

  var lyr = sessionStorage.destination_layer;

  //sessionStorage.f_tool_callback='exe_delete';//'exe_edit_point_lyr045_1';

  //f/_btn['modify_lyr_single_for_dlg_2'](lyr,'edit');

  alertify.infoDialog().close();
  alertify.infoDialog().destroy();

  dyn_functions['exe_delete']();

}

dyn_functions['exe_delete'] = function(dataString){

  // _onsole.log('sessionStorage.f_tool_callback');
  var lyr = sessionStorage.destination_layer;

  var dataString={};

  //dataString['lat']=sessionStorage.place_lat;
  //dataString['lng']=sessionStorage.place_lng;
  dataString['fn_group']='geodata';
  dataString['action']='modify_data';
  dataString['collection']='delete_feature';
  dataString['lyr']=lyr;
  //dataString['GEOM']=1;
  dataString['item_token']=localStorage[lyr+'_token'];
  generic_api(dataString,'delete_feature');

}

dyn_functions['succ_delete_feature'] = function(r){

  var lyr = sessionStorage.destination_layer;

  switch_on_lyr_b(lyr);

}