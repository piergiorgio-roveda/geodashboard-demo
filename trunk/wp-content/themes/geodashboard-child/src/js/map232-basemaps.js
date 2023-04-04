function map232_ready(){

  exe_map232();

}

function exe_map232(){

  list_basemap.forEach(lyr => {
    //_onsole.log('exe_map232',g_meta.geovar_lyr);

    sessionStorage['alternative_base_map_'+lyr]=0;

    let o = g_meta.geovar_lyr.features
    let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
    let obj_lyr=this_obj[0].properties;

    mymap.createPane(lyr+'_pane');
    mymap.getPane(lyr+'_pane').style.zIndex = obj_lyr.zindex;
    // _onsole.log(lyr)
    // _onsole.log(lyr.indexOf("pointerEvents"))

    if(obj_lyr.pointerEvents!=undefined 
      && obj_lyr.pointerEvents===false){
      // Layers in this pane are non-interactive and 
      //do not obscure mouse/touch events
      mymap.getPane(lyr+'_pane').style.pointerEvents = 'none';
    }

    geo_lyr[lyr] = L.tileLayer(
      obj_lyr.tile_url,
      {
        attribution: obj_lyr.attribution,
        pane: obj_lyr.g_slug+'_pane',
        maxZoom: obj_lyr.tile_url.maxzoom
      }
    ).addTo(mymap);

  });

  geo_lyr['satellite'] = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {pane: 'lyr040_pane'}
  );

}


/*
mymap.on("zoomstart", function (e) { 
  // _onsole.log("ZOOMSTART", e); 
  // _onsole.log(mymap.getZoom());
  g_meta.geovar_lyr.features.forEach(feature => {
    var p=feature.properties
    // _onsole.log(p.g_slug);
    // _onsole.log(p.maxzoom);
    if(p.lyr_type=='tile'){
      if(mymap.getZoom()>p.maxzoom && sessionStorage['alternative_base_map_'+p.g_slug]==0){
        // _onsole.log('remove default tile')

        mymap.removeLayer(geo_lyr[p.g_slug]);

        geo_lyr[p.g_slug] = L.tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png',
          {
            pane: p.g_slug+'_pane',
            maxZoom: 20
          }
        ).addTo(mymap);
        sessionStorage['alternative_base_map_'+p.g_slug]=1;

      }
      else if(mymap.getZoom()<=(p.maxzoom+1) && sessionStorage['alternative_base_map_'+p.g_slug]==1){
        // _onsole.log('add default tile')

        mymap.removeLayer(geo_lyr[p.g_slug]);

        geo_lyr[p.g_slug] = L.tileLayer(
          p.tile_url,
          {
            pane: p.g_slug+'_pane'
          }
        ).addTo(mymap);
        sessionStorage['alternative_base_map_'+p.g_slug]=0;

      }
    }


  });

});
*/
