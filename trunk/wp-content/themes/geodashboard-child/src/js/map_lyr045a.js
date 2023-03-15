$(document).ready(function() {
  lyr045_ready();
}); //$(document).ready

function lyr045_ready(){
  if (f_wait.geovar_lyr==0) {
    // _onsole.log('wait')
    setTimeout(function(){lyr045_ready()},100);
    return;
  } else {
    prepare_lyr045();
  };
}

// sessionStorage.outer_data_e=0;
// sessionStorage.outer_data_w=0;
// sessionStorage.outer_data_n=0;
// sessionStorage.outer_data_s=0;

// var geo_lyr045 = new Array();

function prepare_lyr045(){

  let lyr='lyr045';
  generic_lyr(lyr);
  // let obj_lyr=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === lyr)[0].properties;


  // dMap.analisi01.grLyr.push(lyr);

  // //var geo_lyr045 = new L.featureGroup();
  // var options ={
  //   chunkedLoading: true,
  //   //singleMarkerMode: true,
  //   spiderfyOnMaxZoom: false,
  //   zoomAnimation : false
  // }
  // geo_lyr045 = new L.MarkerClusterGroup(options);

  // if(obj_lyr.intoc!=undefined 
  //   && obj_lyr.intoc===1){

  //   dMap.analisi01.grLyrToc.push(lyr);

  // }

}

//--

// function geo_lyr045_style(feature,latlng) {

//   //var lyr='lyr045';

//   return L.marker(latlng);//to calibrate

// }

// function geo_lyr045_onClick(e) {

//   console.log(e);

// }

