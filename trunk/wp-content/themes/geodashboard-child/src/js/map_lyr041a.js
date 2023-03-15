$(document).ready(function() {

  var styles = ''
    +'.cluster_type1{'  
      +'width: 50px;'
      +'height: 50px;'
      //+'background: url(https://cityplanner.biz/source/icon/px20_noun-spray-1518874-Spray-CreaticcaCreative%20Agency-NounProject-mod.png) 0 0;'
      +'background-color:black;'
      +'border:2px solid white;'
    +'}'
  +'';
  var styleSheet = document.createElement("style");
  styleSheet.setAttribute('tag', 'style MarkerCluster lyr041');
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

}); //$(document).ready

dMap.analisi01.grLyr.push('lyr041');

//var geo_lyr041 = new L.featureGroup();
//var geo_lyr041 = new L.MarkerClusterGroup(geo_lyr022_options);
var geo_lyr041 = new L.MarkerClusterGroup(marker_cluster_custom('lyr041'));


let lyr='lyr041';
let obj_lyr=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === lyr)[0].properties;
if(obj_lyr.intoc!=undefined 
  && obj_lyr.intoc===1){

  dMap.analisi01.grLyrToc.push('lyr041');

}

var geo_lyr041_style_icon = L.icon(obj_lyr.g_style.style1);

function geo_lyr041_style(feature,latlng) {

  var lyr='lyr041';

  var zoom = mymap.getZoom();
  var p = feature.properties;
  var icon = new Array();

  var style='style99';

  let obj_lyr=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === lyr)[0].properties;

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
  }).on('click', geo_lyr041_onClick); // funzione 3 onClick sul punto

}




function geo_lyr041_onClick(e) {

  // _onsole.log(e);
  localStorage.lyr041_token=e.target.feature.properties.item_token;//e.target.feature.properties.item_token;
  //get_lyr031_single_for_dlg();
  f_btn['get_lyr_single_for_dlg']('lyr041');

}


