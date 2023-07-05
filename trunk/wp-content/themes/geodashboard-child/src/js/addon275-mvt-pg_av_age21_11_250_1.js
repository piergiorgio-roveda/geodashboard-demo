
list_f_mapbox.push('prepare_mvt_av_age21_11_250_1');

dyn_functions['addon275-mvt-pg_av_age21_11_250_1'+'_ready'] = function(){
  mymap.setCenter([9.142338526991352,45.4502164051606]);
}

dyn_functions['prepare_mvt_av_age21_11_250_1'] = function(){

  // onsole.log('mapbox_municipality');
  let item_lyr = 'pg_av_age21_11_250_1';

  mymap.addSource('raster-tiles-lyr040', {
    'type': 'raster',
    'tiles': [
      'https://a.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}@2x.png'
    ],
    'tileSize': 256,
    'attribution':'',
    'minzoom': 0,
    'maxzoom': 22
  }); 
  mymap.addLayer(
    {
      'id': 'id-tiles-lyr040',
      'type': 'raster',
      'source': 'raster-tiles-lyr040',
    },
    'id-tiles-lyr038'
  );  

  mymap.addSource(item_lyr, {
    'type': 'vector',
    'tiles': [
      HOME_PROJECT+'/mvt/{z}/{x}/{y}/?collection=mvt_custom&slug=pg_av_age21_11_250_1&custom=a275'
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
      // 'paint': {
      //   'fill-color': [
      //     "match",
      //     ["get","avage11"],
      //     "step0",'#0080ff',
      //     "step8",'#fd0dff',
      //     '#0080ff' //default'#0080ff', // blue color fill
      //   ],
      //   'fill-opacity': 0.2
      // },
      'paint': {
        'fill-color': [
          'interpolate',
          ['linear'],
          ['get', 'avage11'],
          0,'#fff5f0',
          40,'#fdd6c4',        
          42,'#fca486',        
          44, '#fb7050',        
          46,'#ea372a',        
          48,'#ba1419',        
          50, '#67000d',        
          60.630000,'#000' // no value ??
        ],
        'fill-opacity': 0.75
      }      
    },
    'id-tiles-lyr038'
  );

}

function a275_change_style(){

  let item_lyr = 'pg_av_age21_11_250_1';
  let objcolor = a274_colors[localStorage.a274_lyr];

  let color = [];

  color.push('interpolate');
  color.push(['linear']);
  color.push(['get', localStorage.a274_lyr]);

  objcolor.forEach(element => {
    color.push(element.base);
    color.push(element.hex);
  });

  // if(style=='avage11'){
  //   color = [
  //     'interpolate',
  //     ['linear'],
  //     ['get', localStorage.a274_lyr],
  //     0,'#fff5f0',
  //     40,'#fdd6c4',        
  //     42,'#fca486',        
  //     44, '#fb7050',        
  //     46,'#ea372a',        
  //     48,'#ba1419',        
  //     50, '#67000d',        
  //     60.630000,'#000' // no value ??
  //   ];
  // }
  // else if(style=='avage21'){
  //   color = [
  //     'interpolate',
  //     ['linear'],
  //     ['get', style],
  //     0,'#fff5f0',
  //     40,'#fdd6c4',        
  //     42,'#fca486',        
  //     44, '#fb7050',        
  //     46,'#ea372a',        
  //     48,'#ba1419',        
  //     50, '#67000d',        
  //     90,'#000' // no value ??
  //   ];
  // }
  // else if(style=='avage21_11'){
  //   color = [
  //     'interpolate',
  //     ['linear'],
  //     ['get', style],
  //     -25,'#00bebe',
  //     -5,'#6ccfcf',        
  //     -2.5,'#75e0e0',        
  //     -0.5, '#ced2f4',        
  //     0.5,'#e692cb',        
  //     2.5,'#db50ad',        
  //     5, '#d0008b',        
  //     25,'#000' // no value ??
  //   ];
  // }

  mymap.setPaintProperty('id-'+item_lyr, 'fill-color', color);
}
