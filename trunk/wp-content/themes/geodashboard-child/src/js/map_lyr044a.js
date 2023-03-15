$(document).ready(function() {


}); //$(document).ready

let lyr='lyr044';

dMap.analisi01.grLyr.push(lyr);

var geo_lyr044 = new L.featureGroup();

let obj_lyr=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === lyr)[0].properties;


obj_lyr.toc_filter_field='my_categories';

if(obj_lyr.intoc!=undefined 
  && obj_lyr.intoc===1){

  dMap.analisi01.grLyrToc.push(lyr);

}

var geo_lyr044_style_icon = L.icon(obj_lyr.g_style.style1);

function geo_lyr044_style(feature,latlng) {

  var lyr='lyr044';

  var zoom = mymap.getZoom();
  var p = feature.properties;
  var icon = new Array();

  var style='commercial';

  obj_lyr.g_style.forEach(element => {
    if(element.g_slug==style){
      icon = L.icon({
        iconUrl: SOURCE_PATH+'icon/'+element.iconUrl,
        iconSize: element.iconSize,
        iconAnchor: element.iconAnchor
      });
    }
  });

  return L.marker(
    latlng,
    {
      icon: icon,
      pane: 'lyr044_pane'
    }
  ).on('click', geo_lyr044_onClick); // funzione 3 onClick sul punto

}



function geo_lyr044_onClick(e) {


}




