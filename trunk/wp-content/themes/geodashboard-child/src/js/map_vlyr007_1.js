$(document).ready(function() {


}); //$(document).ready

let lyr='vlyr007';

dMap.analisi01.grLyr.push(lyr);

//dMap.analisi01.grLyrToc.push('vlyr003');

//let currGeohash ='';

var geo_vlyr007 = new L.featureGroup();
//var geo_vlyr007b = new L.featureGroup().addTo(mymap);
//mymap.createPane(lyr+'_pane');
//mymap.getPane(lyr+'_pane').style.zIndex = lyr.zIndex;

let obj_lyr=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === lyr)[0].properties;


var geo_vlyr007_style_icon = L.icon(obj_lyr.g_style.style1);
