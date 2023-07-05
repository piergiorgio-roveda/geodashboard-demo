
list_f_mapbox.push('prepare_mvt_user_location_log');

dyn_functions['addon272-mvt-user_location_log'+'_ready'] = function(){

}


dyn_functions['prepare_mvt_user_location_log'] = function(){

  // onsole.log('mapbox_municipality');
  let item_lyr = 'user_location_log';

  mymap.addSource(item_lyr, {
    'type': 'vector',
    'tiles': [
      HOME_PROJECT+'/mvt/{z}/{x}/{y}/'
        +'?collection=mvt_custom'
        +'&slug=tb_user_location'
        +'&custom=a272'
    ],
    'minzoom': 2,
    'maxzoom': 22
  });
  mymap.addLayer(
    {
      'id': 'id-'+item_lyr, // Layer ID
      'type': 'circle',
      'source': item_lyr, // ID of the tile source created above
      // Source has several layers. We visualize the one with name 'sequence'.
      'source-layer': 'default',
      'paint': {
        // Make circles larger as the user zooms from z12 to z22.
        'circle-radius': {
          'base': 0.5,
          'stops': [
            [2, 0.5],
            [22, 5]
          ]
        },
        // 'circle-stroke-color': 'black',
        // 'circle-stroke-width': 0.5,
        // Color circles by ethnicity, using a `match` expression.
        'circle-color': '#000',
        'circle-opacity': 0.8
      }
    }
  );

}