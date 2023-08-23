// !dev change `slug` to `optIn`
f_btn[ 'btn_editdlg']=function(slug){

  var lyr = sessionStorage.destination_layer;

  // _onsole.log('f_btn '+slug)
  //alertify.infoDialog().close();
  //alertify.infoDialog().destroy();
  //sessionStorage.destination_layer='lyr045';
  //var destination_layer='lyr035';
  //var tool_layer='lyr045_edit';

  //sessionStorage.current_tool='edit_info';
  sessionStorage.f_tool_callback='exe_update_attributes';//'exe_edit_point_lyr045_1';
  //sessionStorage.destination_layer=destination_layer;
  //sessionStorage.tool_layer=tool_layer;

  f_btn['modify_lyr_single_for_dlg_2'](lyr,'edit');

  /*

  # PROCESS

  - f_btn['modify_lyr_single_for_dlg_2'](slug,type);
  - create_dialog2(slug+'_'+type); //dlg_type='b' //alertify.infoDialog
  - dyn_functions['succ_dlg_single']();
  - get info from g_meta.geovar_dialog this_dlg_p
    - this_dlg_p.g_slug is slug of all html elements
    - this_dlg_p.g_template used to generate template
  - dlg_template[this_dlg_p.g_template](this_dlg_p.g_slug); //no data only tabs ...
    - this_dlg_p.g_template=='template_by_slug' //option 1 only for degen
    - this_dlg_p.g_template=='other' lyr045_edit >> tab_x1_edit (as standard template)
  - here all edit fields are compiled then:
    - btn_savedlg
      - create datastring with oll field value
      - dyn_functions[sessionStorage.f_tool_callback](dataString);
    - btn_canceldlg_edit >> f_btn['get_lyr_single_for_dlg'](lyr);

  */

}

dyn_functions['exe_update_attributes'] = function(dataString){

  // _onsole.log('sessionStorage.f_tool_callback');
  var lyr = sessionStorage.destination_layer;
  //dataString['lat']=sessionStorage.place_lat;
  //dataString['lng']=sessionStorage.place_lng;
  dataString['fn_group']='geodata';
  dataString['action']='modify_data';
  dataString['collection']='update_attributes';
  dataString['lyr']=lyr;
  //dataString['GEOM']=1;
  dataString['item_token']=localStorage[lyr+'_token'];
  generic_api(dataString,'update_attributes');

}

dyn_functions['succ_update_attributes'] = function(r){

  var lyr = sessionStorage.destination_layer;
  // _onsole.log(r);
  //reload lyr in case of category change
  switch_on_lyr_b(lyr);

  //remove_lyr('vlyr007');
  //$('.box-editing2').css('display','none');
  //$('.box-editing2').html('');
  //reset_addpoint_1();

  //reopen dlg single view
  // !dev change `slug` to `optIn`
  f_btn[ 'get_lyr_single_for_dlg'](lyr);

}