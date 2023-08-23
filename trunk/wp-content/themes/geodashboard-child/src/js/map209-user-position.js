function register_user_position(){
  localStorage.map_lat=dMap.map.stop_lat;
  localStorage.map_lng=dMap.map.stop_lng;
  localStorage.map_zoom=dMap.map.stop_zoom;

  var g=dMap.analisi01.grLyrToc;
  $.each(g,function(i, lyr){
    let o = g_meta.geovar_lyr.features
    let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
    let obj_lyr=this_obj[0].properties;
    localStorage['start_lyr_visible_'+lyr]=obj_lyr.visible;
  });//each lyr

}

dyn_functions['succ_register_user_position'] = function(r){    
  // _onsole.log('user position update');
}
