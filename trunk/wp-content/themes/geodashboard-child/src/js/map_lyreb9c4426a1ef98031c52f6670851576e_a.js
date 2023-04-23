dyn_functions['lyreb9c4426a1ef98031c52f6670851576e_lyr_extend']=function(){

  //_onsole.log('vlyr012_lyr_extend')

  let lyr='lyreb9c4426a1ef98031c52f6670851576e';

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
