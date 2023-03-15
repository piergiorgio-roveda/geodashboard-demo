$(document).ready(function() {

  addon215_ready();

}); //$(document).ready

function addon215_ready(){
  if (f_wait.geovar_dialog==0) {
    // _onsole.log('wait')
    setTimeout(function(){addon215_ready()},100);
    return;
  } else {
    prepare_addon215();
  };
}

//--
var addon215_slug='isochrone_test';
//-

function prepare_addon215(){

  //define in list
  
  list_mapclick.push(addon215_slug);

}

dyn_mapclick[addon215_slug] = function(e){

  sessionStorage.this_dialog_lyr=addon215_slug;
  sessionStorage.this_dialog_slug=addon215_slug+'_single';//'lyr035_single'
  //
  sessionStorage.mapclick_lat=e.latlng.lat;
  sessionStorage.mapclick_lng=e.latlng.lng;

  log_tag_manager(
    'isochrone',
    //GA - log_tag_manager - action // _onsole.log_ready_map
    sessionStorage.mapclick_lat+'|'+sessionStorage.mapclick_lng,//GA - log_tag_manager - label
    '0' //GA - log_tag_manager - value (optional)
  );

  //create_dialog2(sessionStorage.this_dialog_slug);

  dataString={
    fn_group:'geodata',
    action:'get_data',
    collection:'xy_iso',
    qy_name:'A',
    lyr:'vlyr012',//'lyr035',
    geom:true,
    lat:sessionStorage.mapclick_lat,
    lng:sessionStorage.mapclick_lng
  }
  dataString.mode=vlyr012a_params.mode;
  dataString.range_type=vlyr012a_params.range_type;
  dataString.mode=vlyr012a_params.mode;
  dataString.routing_mode=vlyr012a_params.routing_mode;
  //dataString.iso_number=3;
  //dataString.iso_value1=250;
  //dataString.iso_value2=500;
  //dataString.iso_value3=1000;
  dataString.iso_values=vlyr012a_iso_values;

  generic_api(dataString,'makeIso');
  return;

}


/*
dyn_functions['template_by_slug_'+addon215_slug+'_single'] = function(){

  var c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $('.dlg_'+addon215_slug+'_single'+'_body').append(c);

  //box button tab
  var c = ''
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  $('.dlg_'+addon215_slug+'_single'+'_body').append(c);

  var c = '<div>'
    +'<div class="col-btn-attrs" style="text-align:left;"></div>'
  +'</div>';
  $('.dlg_'+addon215_slug+'_single'+'_body').append(c);

  //box tab1
  c += '<div '
    +'class="dlg_panel panel-tab1" '
    +'style="display:block;font-family:var(--wd-fonts-secondary);">';
  //c += '<p>TAB1</p>';
  c+='View event in Google Analytics as "isochrone": ' + sessionStorage.mapclick_lat+'|'+sessionStorage.mapclick_lng
  c += '</div><!--tab1-->';
  
  $('.dlg_'+addon215_slug+'_single'+'_body').append(c);

}
*/

dyn_functions['succ_makeIso'] = function(r){

  //onsole.log(r);
  
  var lyr=r.ds.lyr;
  var geo_lyr=eval('geo_'+lyr);

  remove_lyr(lyr);

  var geojson = L.geoJson(r,{
    onEachFeature: eval('geo_'+lyr+'_style'),
    lyr:lyr,
    pane:lyr+'_pane'
  });

  geo_lyr.addLayer(geojson);    

  // FINAL ADD!
  geo_lyr.addTo(mymap);

  mymap.fitBounds(geo_lyr.getBounds());

  vlyr012a_fill_box_info();

}


