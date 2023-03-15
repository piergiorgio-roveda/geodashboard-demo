var mlyrsit048a_mapReady = 0;
// const lyrsit048a_iso_values = [250,500,1000];
const lyrsit048a_colors = new Array();
// const lyrsit048a_params = new Array();

dyn_functions['map_lyrsit048a'+'_ready'] = function(){

  mlyrsit048a_mapReady = 1;

  lyrsit048_ready2();

}

function lyrsit048_ready2(){

  if (f_wait.geovar_lyr==0) {

    setTimeout(function(){lyrsit048_ready2()},100);
    return;
  }

  let lyr='lyrsit048';
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  if (obj_lyr.load!==true) {
    // _onsole.log('wait')
    setTimeout(function(){lyrsit048_ready2()},100);
    return;
  } else {
    dyn_functions['lyrsit048_lyr_extend_after']();
  };

}

dyn_functions['lyrsit048_lyr_extend']=function(){

  //_onsole.log('lyrsit048_lyr_extend')

  let lyr='lyrsit048';

  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  sessionStorage['start_lyr_visible_'+lyr]='1';
  obj_lyr.visible=true;

  lyrsit048a_colors.default={'slug':'default','color':'#999999'};

  geo_lyr_style[lyr] = function(feature, layer){

    // let p = feature.properties;

    let p = lyrsit048a_colors.default;
    let mycolor = p.color;//geovar.lyr.lyrsit048.iso2_color;
    let fillOpacity=0;
    let opacity=1;

    layer.setStyle({
      fillColor:mycolor,
      color:mycolor,
      weight:2,
      opacity:opacity,
      fillOpacity:fillOpacity,
      //clickable:false
    });//.on('click', geo_lyrsit048_onClick);

  };

}

dyn_functions['lyrsit048_lyr_extend_after']=function(){

  let lyr='lyrsit048';
  //_onsole.log('fitBounds',lyr);
  mymap.fitBounds(geo_lyr[lyr].getBounds());

}
