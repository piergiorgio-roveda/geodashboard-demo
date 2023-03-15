var  mlyrsit051a_mapReady = 0;
// const lyrsit051a_iso_values = [250,500,1000];
const lyrsit051a_colors = new Array();
// const lyrsit051a_params = new Array();

dyn_functions['map_lyrsit051a'+'_ready'] = function(){
  //lyrsit051_ready();

  mlyrsit051a_mapReady = 1;

  lyrsit051_ready2();

}

function lyrsit051_ready2(){

  if (f_wait.geovar_lyr==0) {

    setTimeout(function(){lyrsit051_ready2()},100);
    return;
  }

  let lyr='lyrsit051';
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  if (obj_lyr.load!==true) {
    // _onsole.log('wait')
    setTimeout(function(){lyrsit051_ready2()},100);
    return;
  } else {
    dyn_functions['lyrsit051_lyr_extend_after']();
  };

}

dyn_functions['lyrsit051_lyr_extend']=function(){

  //_onsole.log('lyrsit051_lyr_extend')

  let lyr='lyrsit051';

  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  sessionStorage['start_lyr_visible_'+lyr]='1';
  obj_lyr.visible=true;

  lyrsit051a_colors.default={'slug':'default','color':'#999999'};

  geo_lyr_style[lyr] = function(feature, layer){

    // let p = feature.properties;

    let p = lyrsit051a_colors.default;
    let mycolor = p.color;//geovar.lyr.lyrsit051.iso2_color;
    let fillOpacity=0;
    let opacity=1;

    layer.setStyle({
      fillColor:mycolor,
      color:mycolor,
      weight:2,
      opacity:opacity,
      fillOpacity:fillOpacity,
      //clickable:false
    });//.on('click', geo_lyrsit051_onClick);

  };

}

dyn_functions['lyrsit051_lyr_extend_after']=function(){

  let lyr='lyrsit051';
  //_onsole.log('fitBounds',lyr);
  mymap.fitBounds(geo_lyr[lyr].getBounds());

}
