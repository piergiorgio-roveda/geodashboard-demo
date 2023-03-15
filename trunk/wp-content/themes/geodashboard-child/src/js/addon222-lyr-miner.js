$(document).ready(function() {

  $('.box-usrprofile').css('display','block');

  $('.box-usrprofile').append('<div '
    +'class="box-btn_miner box-info-2-btn d-grid gap-2" '
    +'style="margin-top:5px;"></div>');

  

  addon222_ready();

}); //$(document).ready

function addon222_ready(){
  if (f_wait.geovar_button==0) {
    // _onsole.log('wait')
    setTimeout(function(){addon222_ready()},1000);
    return;
  } else {
    prepare_addon222();
  };
}

//--
const addon222_slug='miner_test';
//--

function prepare_addon222(){

  let item_btn = 'btn_miner';
  let obj_btn=g_meta.geovar_button.features.filter(({properties}) => properties.g_slug === item_btn);
  //let g_group = '';
  if(obj_btn.length>0){
    //g_group = obj_btn[0].properties.g_group[0];
    obj_btn[0].status = 'disabled';
  }
  else{
    console.log('BTN without properties!');
    return;
  }

  create_button(item_btn);

  //define in list
  
  list_mapclick.push(addon222_slug);

}

f_btn['btn_miner']=function(slug){

  let item_btn = 'btn_miner';
  let obj_btn=g_meta.geovar_button.features.filter(({properties}) => properties.g_slug === item_btn)[0];
  // _onsole.log('btn_miner');
  if(obj_btn.status == 'disabled'){
    obj_btn.status = 'enabled';
    $('#btn_miner').css('background-color','yellow');

    let lyr='vlyrsit002';

    let b = mymap.getBounds();
    //let sw = b.getSouthWest();
    //let ne = b.getNorthEast();
    //let bbox = [sw.lng,sw.lat,ne.lng,ne.lat];

    let sw = [b.getSouthWest().lng,b.getSouthWest().lat];
    let se = [b.getSouthEast().lng,b.getSouthEast().lat];
    let ne = [b.getNorthEast().lng,b.getNorthEast().lat];
    let nw = [b.getNorthWest().lng,b.getNorthWest().lat];

    let mycoords = [sw,se,ne,nw,sw];

    let r = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},
      "geometry":{"coordinates":[mycoords],"type":"Polygon"}}]};
    //_onsole.log(r);
    let geojson = L.geoJson(r,{
      onEachFeature: geo_lyr_style[lyr],
      pane:lyr+'_pane'
    });

    geo_lyr[lyr].addLayer(geojson);

    // FINAL ADD!
    geo_lyr[lyr].addTo(mymap);

  }
  else{
    obj_btn.status = 'disabled';
    $('#btn_miner').css('background-color','white');
  }
  //sessionStorage.this_dialog_slug='menu_sidebar_single';
  //create_dialog2('menu_sidebar_single');

}

dyn_mapclick[addon222_slug] = function(e){

  let item_btn = 'btn_miner';
  let obj_btn=g_meta.geovar_button.features.filter(({properties}) => properties.g_slug === item_btn)[0];
  // _onsole.log('btn_miner');
  if(obj_btn.status == 'disabled'){
    //_onsole.log('addon222_slug disabled');
    return;
  }
  else{
    //_onsole.log('addon222_slug enabled');
  } 
  let lyr='vlyrsit002';
  /* sessionStorage.this_dialog_lyr=addon222_slug;
  sessionStorage.this_dialog_slug=addon222_slug+'_single';//'lyr035_single'
  //*/
  sessionStorage.mapclick_lat=e.latlng.lat;
  sessionStorage.mapclick_lng=e.latlng.lng;
  /*
  return; */

  //create_dialog2(sessionStorage.this_dialog_slug);

  dataString={
    fn_group:'geodata',
    action:'view_data',
    collection:'lyr_single_one_table_xy',
    qy_name:'A',
    lyr:lyr,//'lyr035',
    geom:true,
    lat:sessionStorage.mapclick_lat,
    lng:sessionStorage.mapclick_lng
  }
  // dataString.mode=vlyr012a_params.mode;
  // dataString.range_type=vlyr012a_params.range_type;
  // dataString.mode=vlyr012a_params.mode;
  // dataString.routing_mode=vlyr012a_params.routing_mode;
  //dataString.iso_number=3;
  //dataString.iso_value1=250;
  //dataString.iso_value2=500;
  //dataString.iso_value3=1000;
  // dataString.iso_values=vlyr012a_iso_values;

  generic_api(dataString,'vlyrsit002_info');
  return;

}

dyn_functions['succ_vlyrsit002_info'] = function(r){

  console.log(r);
  
  /* var lyr=r.ds.lyr;
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

  vlyr012a_fill_box_info(); */

}