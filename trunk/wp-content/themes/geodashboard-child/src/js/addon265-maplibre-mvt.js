
list_f_mapbox.push('prepare_mapbox_municipality');

dyn_functions['addon264-leafletjs-mvt'+'_ready'] = function(){

}


dyn_functions['prepare_mapbox_municipality'] = function(){

  // onsole.log('mapbox_municipality');
  let item_lyr = 'municipality';

  mymap.addSource(item_lyr, {
    'type': 'vector',
    'tiles': [
      HOME_PROJECT+'/mvt/{z}/{x}/{y}/?collection=mvt_layer&slug=dbadmin_municipality'
    ],
    'minzoom': 9,
    'maxzoom': 14
  });
  mymap.addLayer(
    {
      'id': 'id-'+item_lyr, // Layer ID
      'type': 'line',
      'source': item_lyr, // ID of the tile source created above
      // Source has several layers. We visualize the one with name 'sequence'.
      'source-layer': 'default',
      'layout': {
        'line-cap': 'round',
        'line-join': 'round'
      },
      'paint': {
        'line-color': "#000",
        'line-width': 0.5
      }
    }
  );

}