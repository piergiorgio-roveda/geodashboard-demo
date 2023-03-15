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
  styleSheet.setAttribute('tag', 'style MarkerCluster lyr035');
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

  lyr035_ready();

}); //$(document).ready

function lyr035_ready(){
  if (f_wait.geovar_lyr==0) {
    // _onsole.log('wait')
    setTimeout(function(){lyr035_ready()},100);
    return;
  } else {
    prepare_lyr035();
  };
}

//--
var geo_lyr035 = new Array();
//--

function prepare_lyr035(){

  dMap.analisi01.grLyr.push('lyr035');

  //var geo_lyr035 = new L.featureGroup();
  //var geo_lyr035 = new L.MarkerClusterGroup(geo_lyr022_options);
  geo_lyr035 = new L.MarkerClusterGroup(marker_cluster_custom('lyr035'));

  dMap.analisi01.grLyrToc.push('lyr035');

}



function geo_lyr035_style(feature,latlng) {

  var lyr='lyr035';

  var zoom = mymap.getZoom();
  var p = feature.properties;
  var icon = new Array();

  if(p.osm_value=='mural'){
    var style='style1';
  }
  else if(p.osm_value=='graffiti'){
    var style='style2';
  }
  else if(p.osm_value=='generic'){
    var style='style3';
  }
  else{
    var style='style99';
  }

  if(style=='style3'){
    myclass = 'cluster_type1 cluster_type1_a';
    if(p.count>999){
      n = '<i class="fa fa-plus" aria-hidden="true"></i>1k';
    }
    else{
      n = p.count;
    }
    icon = L.divIcon({
      className: myclass,
      html: '<span>'+n+'</span>' ,
      iconSize: null,
      iconAnchor:null
    });
    //L.marker(latlng).addTo(mymap);//to calibrate
    // _onsole.log(icon);
    return L.marker(latlng,{
      icon: icon
    }).on('click', geo_lyr035_onClick); // funzione 3 onClick sul punto
    
  }
  else{
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
    }).on('click', geo_lyr035_onClick); // funzione 3 onClick sul punto
  }



}
let lyr='lyr035';
let obj_lyr=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === lyr)[0].properties;
var geo_lyr035_style_icon = L.icon(obj_lyr.g_style.style1);

function geo_lyr035_onClick(e) {

  // _onsole.log(e);
  localStorage.lyr035_token=e.target.feature.properties.item_token;//e.target.feature.properties.item_token;
  //get_lyr031_single_for_dlg();
  f_btn['get_lyr_single_for_dlg']('lyr035');

}

dyn_functions['lyr035_toc_extend']=function(){

  let lyr='lyr035';
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  // _onsole.log('lyr035_toc_extend');
  obj_lyr.g_style.forEach(element => {
    // _onsole.log(element)
    $('.'+lyr+'-toc-extend').append(''
      +'<div>'
        +'<div style="float: left;margin-right: 5px;">'
          +'<img src="'+SOURCE_PATH+'icon/'+element.iconUrl+'" '
            +'style="width:20px;" />'
        +'</div>'
        +'<div>'
          +element.g_label
        +'</div>'
      +'</div>'
      +'<div class="clearfix" style="margin-bottom:3px;"></div>'
    +'');
  });

}

