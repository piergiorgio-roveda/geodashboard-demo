$(document).ready(function() {

  vlyr007_ready();

}); //$(document).ready

function vlyr007_ready(){
  if (f_wait.geovar_lyr==0) {
    // _onsole.log('wait')
    setTimeout(function(){vlyr007_ready()},100);
    return;
  } else {
    prepare_vlyr007();
  };
}

var geo_vlyr007_style_icon = new Array();
var geo_vlyr007_style_icon_move = new Array();
var geo_vlyr007 = new Array();

function prepare_vlyr007(){

  dMap.analisi01.grLyr.push('vlyr007');

  //dMap.analisi01.grLyrToc.push('vlyr003');

  //let currGeohash ='';

  geo_vlyr007 = new L.featureGroup();
  //var geo_vlyr007b = new L.featureGroup().addTo(mymap);

  let obj_lyr=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === 'vlyr007');
  let style = obj_lyr[0].properties.g_style.style2;
  let style_move = obj_lyr[0].properties.g_style.style_move;

  geo_vlyr007_style_icon = L.icon(style);

  geo_vlyr007_style_icon_move = L.icon(style_move);

}
