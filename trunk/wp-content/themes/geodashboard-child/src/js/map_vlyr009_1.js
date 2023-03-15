$(document).ready(function() {


}); //$(document).ready

dMap.analisi01.grLyr.push('vlyr009');

var geo_vlyr009 = new L.featureGroup();
//var geo_vlyr007b = new L.featureGroup().addTo(mymap);


function geo_vlyr009_style(feature,latlng) {

  let lyr='vlyr009';
  let obj_lyr=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === lyr)[0].properties;


  //var p = feature.properties;
  var icon = new Array();

  var style='style1';

  obj_lyr.g_style.forEach(element => {
    if(element.g_slug==style){
      icon = L.icon({
        iconUrl: SOURCE_PATH+'icon/'+element.iconUrl,
        iconSize: element.iconSize,
        iconAnchor: [20,40]
      });
    }
  });
  // _onsole.log(icon);
  //L.marker(latlng).addTo(mymap);//to calibrate
  return L.marker(latlng,{
    icon: icon
  }).on('click', geo_vlyr009_onClick); // funzione 3 onClick sul punto

}

function geo_vlyr009_onClick(e) {

  // _onsole.log(e);
  var response = {};
  response.type='FeatureCollection';
  response.features = new Array();
  response.ds = {};
  response.ds.lyr = 'vlyr009';
  response.features.push(e.target.feature);
  //localStorage.lyr035_token=e.target.feature.properties.item_token;//e.target.feature.properties.item_token;
  //get_lyr031_single_for_dlg();
  var r = new Array();

  sessionStorage.this_dialog_lyr=response.ds.lyr;
  sessionStorage.this_dialog_slug=response.ds.lyr+'_single';//'lyr035_single'

  dyn_functions['succ_get_lyr_single_for_dlg'](response);

}