
list_f_mapbox.push('prepare_mvt_capzone');

dyn_functions['addon266-maplibre-mvt-source'+'_ready'] = function(){

}


dyn_functions['prepare_mvt_capzone'] = function(){

  // onsole.log('mapbox_municipality');
  let item_lyr = 'capzone';

  mymap.addSource(item_lyr, {
    'type': 'vector',
    'tiles': [
      HOME_PROJECT+'/mvt/{z}/{x}/{y}/?collection=mvt_layer&slug=dbadmin_it_pg_capzone'
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
        'fill-outline-color': "#000",
        // 'line-width': 0.5,
        'fill-color': "#000",
        'fill-opacity': 0
      }
    }
  );
  // Add a black outline around the polygon.
  mymap.addLayer({
    'id': 'id-'+item_lyr+'outline',
    'type': 'line',
    'source': item_lyr,
    'source-layer': 'default',
    'layout': {},
    'paint': {
      'line-color': '#000',
      'line-width': 1
    }
  });

  // Add filled county polygons
  // for highlighted display.
  mymap.addLayer(
    {
    'id': 'counties-highlighted',
    'type': 'fill',
    'source': item_lyr,
    'source-layer': 'default',
    'paint': {
      'fill-outline-color': '#484896',
      'fill-color': '#8cff37',
      'fill-opacity': 0.6
    },
    // Display none by adding a
    // filter with an empty string.
    'filter': ['in', 'pid', 0]
    },
    // Place polygons under labels, roads and buildings.
    'id-'+item_lyr+'outline'
  );

  // Add filled county polygons
  // for highlighted display.
  mymap.addLayer(
    {
    'id': 'counties-highlighted-bike',
    'type': 'fill',
    'source': item_lyr,
    'source-layer': 'default',
    'paint': {
      'fill-outline-color': '#484896',
      'fill-color': '#0a3d0b',
      'fill-opacity': 0.6
    },
    // Display none by adding a
    // filter with an empty string.
    'filter': ['in', 'pid', 0]
    },
    // Place polygons under labels, roads and buildings.
    'id-'+item_lyr+'outline'
  );

  // mymap.on('click', (e) => {
  //   // let features = mymap.queryRenderedFeatures(e.point, {
  //   //   layers: ['id-'+'capzone']
  //   // });
  //   // console.log(features[0]);

  //   // if(features[0] != undefined){
  //   //   console.log(features);
  //   //   a256_capzoneList2 = [features[0].properties.zona_token];
  //   // }
  //   let features = mymap.querySourceFeatures('capzone', {
  //     sourceLayer: 'default'
  //   });
  //   console.log(features);

  // });  

}