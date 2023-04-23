dyn_functions['lyr032f14b12f8790a2b4345ce4ea5a0130_lyr_extend']=function(){

  //_onsole.log('vlyr012_lyr_extend')

  let lyr='lyr032f14b12f8790a2b4345ce4ea5a0130';

  g_ds = {
    geovar:"geovar_lyr",//obj_maps
    slug:lyr,//filter
    type:'single_object'//,//'item' or 'single_object' or 'full_object'
  }
  let obj_lyr = get_geovar_obj(g_ds);

  let icon = L.icon({
    "iconUrl": "/source/icon/g19_lyr3_cl_00.png",
    "iconSize": [
      5,
      5
    ],
    "iconAnchor": [
      2,
      2
    ]
  });

  geo_lyr_style[lyr] = function (feature,latlng) {
    
    //var lyr='lyr045';
    //_onsole.log(feature);
    return L.marker(
      latlng,
      {
        icon: icon,
        pane: lyr+'_pane'
      }
    ).on('click', geo_lyr_onClick[lyr]); // funzione 3 onClick sul punto

  }

  geo_lyr_onClick[lyr] = function(e) {
    console.log('geo_lyr_onClick new');
    //_onsole.log(e);
  }

}
