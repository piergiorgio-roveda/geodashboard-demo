
list_f_mapbox.push('prepare_mvt_capzone_custom');

dyn_functions['addon267-mvt-custom'+'_ready'] = function(){

}


dyn_functions['prepare_mvt_capzone_custom'] = function(){

  // onsole.log('mapbox_municipality');
  let item_lyr = 'capzone_custom';

  mymap.addSource(item_lyr, {
    'type': 'vector',
    'tiles': [
      HOME_PROJECT+'/mvt/{z}/{x}/{y}/?collection=mvt_custom&slug=dbadmin_it_pg_capzone&custom=a267'
    ],
    'minzoom': 9,
    'maxzoom': 14
  });
  mymap.addLayer(
    {
      'id': 'id-'+item_lyr, // Layer ID
      'type': 'fill',
      'source': item_lyr, // ID of the tile source created above
      // Source has several layers. We visualize the one with name 'sequence'.
      'source-layer': 'default',
      'paint': {
        'fill-color': [
          "match",
          ["get","step_status"],
          "step0",'#0080ff',
          "step8",'#fd0dff',
          '#0080ff' //default'#0080ff', // blue color fill
        ],
        'fill-opacity': 0.2
      }
    }
  );
  mymap.on('click', (e) => {
    let features = mymap.queryRenderedFeatures(e.point, {
      layers: ['id-'+'capzone_custom']
    });
    // onsole.log(features[0]);

    if(features[0] != undefined){
      console.log(features);
      a256_capzoneList2 = [features[0].properties.zona_token];
    }
    
  });   

}