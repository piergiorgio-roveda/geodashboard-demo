dMap.analisi01.grLyr.push('lyr030');

//var geo_lyr030 = new L.featureGroup();
//var geo_lyr030 = new L.MarkerClusterGroup(geo_lyr022_options);
var geo_lyr030 = new L.MarkerClusterGroup();

dMap.analisi01.grLyrToc.push('lyr030');

var geo_lyr030_style = function (feature,latlng) {
  return L.marker(latlng,{
    icon: geo_lyr030_style_icon
  }).on('click', geo_lyr030_onClick); // funzione 3 onClick sul punto
}
let lyr='lyr030';
let obj_lyr=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === lyr)[0].properties;
var geo_lyr030_style_icon = L.icon(obj_lyr.g_style.style2);

function geo_lyr030_onClick(e) {

}
