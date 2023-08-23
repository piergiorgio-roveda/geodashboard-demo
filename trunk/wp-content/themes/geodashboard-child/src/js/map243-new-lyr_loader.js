dyn_functions['map243-new-lyr_loader'+'_ready'] = function (){

  if (typeof mymap !== 'undefined') {
    if(m211_mapLibrary=='leafletjs'){
      prepare_map243();
    }
    else{
      // onsole.log('prepare_map243()','Not DEV for Mapbox');
    }
  }

}

function prepare_map243(){
  //_onsole.log('map243-new-lyr_loader',g_meta.geovar_map.features[0].properties.g_lyr);
  //_onsole.log('g_meta.geovar_lyr',g_meta.geovar_lyr)

  g_meta.geovar_map.features[0].properties.g_lyr.forEach(item_lyr => {
    
    //let item_lyr = 'glyrsit008';
    let obj_fileterd=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === item_lyr);
    let obj_lyr = obj_fileterd[0];

    //add group
    generic_lyr(item_lyr);

    if(obj_lyr.properties.feat_type=='group'){
      if(obj_lyr.properties.g_options!=undefined){
        obj_lyr.properties.g_options.forEach(lyr => {
          generic_lyr(lyr);
        });
      }
    }


  });

}