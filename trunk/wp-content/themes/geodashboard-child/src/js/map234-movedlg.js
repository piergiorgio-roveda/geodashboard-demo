mymap.createPane('move_circle_pane');
mymap.getPane('move_circle_pane').style.zIndex = '550';

//mymap.createPane('move_pin_calibration_pane');
//mymap.getPane('move_pin_calibration_pane').style.zIndex = '590';

// !dev change `slug` to `optIn`
f_btn[ 'btn_movedlg']=function(slug){

  // _onsole.log('f_btn '+slug)
  alertify.infoDialog().close();
  alertify.infoDialog().destroy();

  let lyr=sessionStorage.destination_layer;
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  var r = obj_lyr.last_r;
  var f = r.features[0];
  var p = f.properties;

  remove_lyr('vlyr007');

  sessionStorage.place_lat = p.lat;
  sessionStorage.place_lng = p.lng;

  var poiNew = L.marker(
    [sessionStorage.place_lat,sessionStorage.place_lng], 
    {
      icon: geo_vlyr007_style_icon_move,
      pane: 'vlyr007_pane',
      draggable:'true'
    }
  );

  //var move_pin_calibration = L.marker(
  //  [sessionStorage.place_lat,sessionStorage.place_lng], 
  //  {
  //    pane: 'move_pin_calibration_pane'
  //  }
  //);

  var move_circle = L.circle(
    [sessionStorage.place_lat,sessionStorage.place_lng], 
    {
      pane: 'move_circle_pane',
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0,
      weight: 1,
      radius: 10
    }
  );

  geo_vlyr007.addLayer(poiNew);
  //geo_vlyr007.addLayer(move_pin_calibration);
  geo_vlyr007.addLayer(move_circle);

  geo_vlyr007.addTo(mymap);

  poiNew.on('drag', function(e){
    var marker = e.target;
    var marker_position = marker.getLatLng();

    sessionStorage.place_lat = marker_position.lat;
    sessionStorage.place_lng = marker_position.lng;

  });

  $('.box-editing2').css('display','block');
  $('.box-editing2').css('justify-content','center');

  $('.box-editing2').html(''
    +'<div class="col-auto ct-editing2" style="padding: 5px 0px;">'
      +'<span '
        +'class="box-btn_clear_move"></span>'
      +'<span style="margin-left:5px;" '
        +'class="box-btn_save_move"></span>'
    +'</div>'
  +'');

  create_button('btn_clear_move');
  create_button('btn_save_move');

}

// !dev change `slug` to `optIn`
f_btn[ 'btn_clear_move']=function(){

  var lyr = sessionStorage.destination_layer;

  remove_lyr('vlyr007');

  $('.box-editing2').css('display','none');
  $('.box-editing2').html('');
  //reset_addpoint_1();
  // !dev change `slug` to `optIn`
  f_btn[ 'get_lyr_single_for_dlg'](lyr);

}

// !dev change `slug` to `optIn`
f_btn[ 'btn_save_move']=function(){

  var lyr = sessionStorage.destination_layer;

  // _onsole.log(sessionStorage.place_lat+'|'+sessionStorage.place_lng);

  var dataString = {}

  // _onsole.log('sessionStorage.f_tool_callback');
  dataString['lat']=sessionStorage.place_lat;
  dataString['lng']=sessionStorage.place_lng;
  dataString['fn_group']='geodata';
  dataString['action']='modify_data';
  dataString['collection']='update_point_xy';
  dataString['lyr']=lyr;
  //dataString['GEOM']=false;
  dataString['item_token']=localStorage[lyr+'_token'];
  generic_api(dataString,'update_point_xy');

}

dyn_functions['succ_update_point_xy'] = function(r){

  var lyr = sessionStorage.destination_layer;

  // _onsole.log(r);
  switch_on_lyr_b(lyr);

  remove_lyr('vlyr007');
  $('.box-editing2').css('display','none');
  $('.box-editing2').html('');
  //reset_addpoint_1();
  // !dev change `slug` to `optIn`
  f_btn[ 'get_lyr_single_for_dlg'](lyr);

}