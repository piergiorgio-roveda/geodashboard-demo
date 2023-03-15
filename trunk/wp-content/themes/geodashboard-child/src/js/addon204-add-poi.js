$(document).ready(function() {

  // _onsole.log('Ready-8!');
  //update_drag_coords();
  //--NEW
  //$('.box-add-point').html('<button id="btn-add-point">+</button>');
  //var dataString = get_var;

  //$('#btn-add-point').on('click',function(){
  //  add_point();
  //});
  fill_box_addpoint();
  //generic_api(dataString,'show_table');
}); //$(document).ready

function fill_box_addpoint(){

  $('.box-addpoint').html('<div '
    +'class="box-btn_addpoint box-info-2-btn d-grid gap-2" '
    +'style="margin-top:5px;"></div>');
  create_button('btn_addpoint');

}

f_btn['btn_addpoint']=function(){

  remove_lyr('vlyr007');
  const c = mymap.getCenter();
  sessionStorage.place_lat = c.lat;
  sessionStorage.place_lng = c.lng;
  var poiNew = L.marker(
    [
      c.lat,
      c.lng
    ], {
    draggable:'true',
    icon: geo_vlyr007_style_icon
  });
  geo_vlyr007.addLayer(poiNew);
  geo_vlyr007.addTo(mymap);
  poiNew.on('drag', function(e){
    var marker = e.target;
    var marker_position = marker.getLatLng();

    sessionStorage.place_lat = marker_position.lat;
    sessionStorage.place_lng = marker_position.lng;

    //log(dMap.place.lat+','+dMap.place.lng);
  });
  //$('.box-addpoint').html('<button id="btn-save-point">x</button>');

  //$('#btn-save-point').on('click',function(){
  //  insert_point_vlyr007();
  //});

  $('.box-addpoint').html(''
    +'<div>'
      +'<div '
        +'class="box-btn_savepoint box-info-2-btn d-grid gap-2" '
        +'style="margin-top:5px;"></div>'
      +'<div '
        +'class="box-btn_cancelpoint box-info-2-btn d-grid gap-2" '
        +'style="margin-top:5px;"></div>'
    +'<div>');
  create_button('btn_savepoint');
  create_button('btn_cancelpoint');

}

f_btn['btn_cancelpoint']=function(){

  reset_addpoint();

}

function reset_addpoint(){
  remove_lyr('vlyr007');
  fill_box_addpoint();
}

f_btn['btn_savepoint']=function(){

  var destination_layer='lyr035';
  var tool_layer='vlyr007';

  sessionStorage.current_tool='add_point';
  sessionStorage.f_tool_callback='exe_insert_point_vlyr007';
  sessionStorage.destination_layer=destination_layer;
  sessionStorage.tool_layer=tool_layer;

  f_btn['modify_lyr_single_for_dlg'](destination_layer,tool_layer);

}

dyn_functions['exe_insert_point_vlyr007'] = function(dataString){

  // _onsole.log('sessionStorage.f_tool_callback');
  dataString['lat']=sessionStorage.place_lat;
  dataString['lng']=sessionStorage.place_lng;
  dataString['fn_group']='geodata';
  dataString['action']='modify_data';
  dataString['collection']='insert_point';
  dataString['lyr']=sessionStorage.destination_layer;
  dataString['GEOM']=1;
  generic_api(dataString,'insert_point_vlyr007');

}

dyn_functions['succ_insert_point_vlyr007'] = function(r){

  // _onsole.log(r);

  remove_lyr('vlyr007');
  reset_addpoint();

}