var list_basemap=[
  'lyr036',
  'lyr038',
];

list_basemap.forEach(lyr => {

  let lyr='lyr035';
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  sessionStorage['alternative_base_map_'+element]=0;

  mymap.createPane(element+'_pane');
  mymap.getPane(element+'_pane').style.zIndex = lyr.zIndex;
  // _onsole.log(lyr)
  // _onsole.log(lyr.indexOf("pointerEvents"))

  if(obj_lyr.pointerEvents!=undefined 
    && obj_lyr.pointerEvents===false){
    // Layers in this pane are non-interactive and 
    //do not obscure mouse/touch events
    mymap.getPane(element+'_pane').style.pointerEvents = 'none';
  }

  geo_lyr[element] = L.tileLayer(
    obj_lyr.tile_url,
    {
      attribution: obj_lyr.attribution,
      pane: element+'_pane'
    }
  ).addTo(mymap);

});

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

$(document).ready(function() {



}); //$(document).ready

