$(document).ready(function() {

  vlyr010_ready();

}); //$(document).ready

function vlyr010_ready(){
  if (f_wait.geovar_lyr==0) {
    // _onsole.log('wait')
    setTimeout(function(){vlyr010_ready()},100);
    return;
  } else {
    prepare_vlyr010();
  };
}

var geo_vlyr010 = new Array();

function prepare_vlyr010(){

  let lyr='vlyr010';
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  dMap.analisi01.grLyr.push(lyr);

  geo_vlyr010 = new L.featureGroup();
  //var geo_vlyr007b = new L.featureGroup().addTo(mymap);


  if(obj_lyr.intoc!=undefined 
    && obj_lyr.intoc===1){

    dMap.analisi01.grLyrToc.push(lyr);

  }

  load_watchlist_vlyr010();

}

//--

function load_watchlist_vlyr010(){

  if (f_wait.watchlist==0 || f_wait.watchlist_ok==0) {
    // _onsole.log('wait')
    setTimeout(function(){load_watchlist_vlyr010()},100);
    return;
  } else {
    dyn_functions['load_watchlist_vlyr010']();
  };

}

dyn_functions['load_watchlist_vlyr010'] = function(){
  

  let obj_lyr=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === 'lyr045');
  let g_tables = obj_lyr[0].properties.g_tables[0];
  var watchlist_table = g_tables;
  this_watchlist[g_tables].forEach(element => {
    // _onsole.log(element)
  });

  var dataString = {}
  dataString['qy_name']='A';
  dataString['fn_group']='geodata';
  dataString['action']='view_data';
  dataString['collection']='lyr_all_watchlist';
  dataString['lyr']='vlyr010';
  //dataString['user_token']=g_meta.geovar_user.features[0].properties.user_token;
  dataString['watchlist_table']=watchlist_table;
  dataString['watchlist']=this_watchlist[watchlist_table];
  dataString['call_type']='silent';
  //_onsole.log(dataString);
  generic_api(dataString,'lyr_all_watchlist');

}

dyn_functions['succ_lyr_all_watchlist'] = function(r){
  // _onsole.log(r);
  var lyr='vlyr010';
  var geo_lyr=eval('geo_'+lyr);
  var geojson = L.geoJson(r,{
    pointToLayer: eval('geo_'+lyr+'_style')//, //function_iconLabel
    //pane:lyr+'_pane' defined in icon
  });
  geo_lyr.addLayer(geojson);
  geo_lyr.addTo(mymap);

}

//--

function geo_vlyr010_style(feature,latlng) {

  var lyr='vlyr010';

  //var p = feature.properties;
  var icon = new Array();

  // _onsole.log(icon);
  return L.marker(latlng).addTo(mymap);//to calibrate
  //return L.marker(latlng,{
  //  icon: icon
  //}).on('click', geo_vlyr010_onClick); // funzione 3 onClick sul punto

}

function geo_vlyr010_onClick(e) {

  console.log(e);

}