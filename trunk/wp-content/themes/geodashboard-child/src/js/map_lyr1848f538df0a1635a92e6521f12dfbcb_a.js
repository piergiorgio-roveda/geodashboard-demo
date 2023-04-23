dyn_functions['lyr1848f538df0a1635a92e6521f12dfbcb_lyr_extend']=function(){

  //_onsole.log('vlyr012_lyr_extend')

  let lyr='lyr1848f538df0a1635a92e6521f12dfbcb';

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
