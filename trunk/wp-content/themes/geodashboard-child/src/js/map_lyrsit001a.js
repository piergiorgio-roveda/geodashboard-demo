var mlyrsit001a_mapReady = 0;
// const lyrsit001a_iso_values = [250,500,1000];
const lyrsit001a_colors = new Array();
// const lyrsit001a_params = new Array();

dyn_functions['map_lyrsit001a'+'_ready'] = function(){
  //lyrsit001_ready();

  mlyrsit001a_mapReady = 1;

  lyrsit001_ready2();

}

function lyrsit001_ready2(){

  let lyr='lyrsit001';
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  if (obj_lyr.load!==true) {
    // _onsole.log('wait')
    setTimeout(function(){lyrsit001_ready2()},100);
    return;
  } else {
    dyn_functions['lyrsit001_lyr_extend_after']();
  };

}



dyn_functions['lyrsit001_lyr_extend']=function(){

  //_onsole.log('lyrsit001_lyr_extend')

  let lyr='lyrsit001';

  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  sessionStorage['start_lyr_visible_'+lyr]='1';
  obj_lyr.visible=true;

  lyrsit001a_colors.default={'slug':'default','color':'#999999'};

  geo_lyr_style[lyr] = function(feature, layer){

    // let p = feature.properties;

    let p = lyrsit001a_colors.default;
    let mycolor = p.color;//geovar.lyr.lyrsit001.iso2_color;
    let fillOpacity=0;
    let opacity=1;

    layer.setStyle({
      fillColor:mycolor,
      color:mycolor,
      weight:2,
      opacity:opacity,
      fillOpacity:fillOpacity,
      //clickable:false
    });//.on('click', geo_lyrsit001_onClick);

  };

}

dyn_functions['lyrsit001_lyr_extend_after']=function(){

  let lyr='lyrsit001';
  //_onsole.log('fitBounds',lyr);
  mymap.fitBounds(geo_lyr[lyr].getBounds());

}
