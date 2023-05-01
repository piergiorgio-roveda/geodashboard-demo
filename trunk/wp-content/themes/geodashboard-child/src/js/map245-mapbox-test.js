dyn_functions['map245-mapbox-test'+'_ready'] = function(){

  // console.log('map245-mapbox-test'+'_ready');

  // mymap.setCenter([9.155, 45.461]); // Milan
  // mymap.setCenter([-67.13734, 45.13745]); // Geojson polygon
  mymap.setCenter([-73.98954565866116,40.725814040925734]); // New York

  // add_sample_geojson_polygon();
  // add_3d_buildings();
  tmp_load_outer();

}

function add_3d_buildings(){

  mymap.on('style.load', () => {
    // Insert the layer beneath any symbol layer.
    const layers = mymap.getStyle().layers;
    const labelLayerId = layers.find(
    (layer) => layer.type === 'symbol' && layer.layout['text-field']
    ).id;
     
    // The 'building' layer in the Mapbox Streets
    // vector tileset contains building height data
    // from OpenStreetMap.
    mymap.addLayer(
    {
    'id': 'add-3d-buildings',
    'source': 'composite',
    'source-layer': 'building',
    'filter': ['==', 'extrude', 'true'],
    'type': 'fill-extrusion',
    'minzoom': 15,
    'paint': {
    'fill-extrusion-color': '#aaa',
     
    // Use an 'interpolate' expression to
    // add a smooth transition effect to
    // the buildings as the user zooms in.
    'fill-extrusion-height': [
    'interpolate',
    ['linear'],
    ['zoom'],
    15,
    0,
    15.05,
    ['get', 'height']
    ],
    'fill-extrusion-base': [
    'interpolate',
    ['linear'],
    ['zoom'],
    15,
    0,
    15.05,
    ['get', 'min_height']
    ],
    'fill-extrusion-opacity': 0.6
    }
    },
    labelLayerId
    );
    });
}

function add_sample_geojson_polygon(){

  mymap.on('load', () => {

    mymap.addSource('earthquakes', {
      type: 'geojson',
      // Use a URL for the value for the `data` property.
      data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
      });
       
    mymap.addLayer({
      'id': 'earthquakes-layer',
      'type': 'circle',
      'source': 'earthquakes',
      'paint': {
      'circle-radius': 4,
      'circle-stroke-width': 2,
      'circle-color': 'red',
      'circle-stroke-color': 'white'
      }
    });

    // // Add a data source containing GeoJSON data.
    // mymap.addSource('maine', {
    // 'type': 'geojson',
    // 'data': {
    // 'type': 'Feature',
    // 'geometry': {
    // 'type': 'Polygon',
    // // These coordinates outline Maine.
    // 'coordinates': [
    // [
    // [-67.13734, 45.13745],
    // [-66.96466, 44.8097],
    // [-68.03252, 44.3252],
    // [-69.06, 43.98],
    // [-70.11617, 43.68405],
    // [-70.64573, 43.09008],
    // [-70.75102, 43.08003],
    // [-70.79761, 43.21973],
    // [-70.98176, 43.36789],
    // [-70.94416, 43.46633],
    // [-71.08482, 45.30524],
    // [-70.66002, 45.46022],
    // [-70.30495, 45.91479],
    // [-70.00014, 46.69317],
    // [-69.23708, 47.44777],
    // [-68.90478, 47.18479],
    // [-68.2343, 47.35462],
    // [-67.79035, 47.06624],
    // [-67.79141, 45.70258],
    // [-67.13734, 45.13745]
    // ]
    // ]
    // }
    // }
    // });
     
    // // Add a new layer to visualize the polygon.
    // mymap.addLayer({
    // 'id': 'maine',
    // 'type': 'fill',
    // 'source': 'maine', // reference the data source
    // 'layout': {},
    // 'paint': {
    // 'fill-color': '#0080ff', // blue color fill
    // 'fill-opacity': 0.5
    // }
    // });
    // // Add a black outline around the polygon.
    // mymap.addLayer({
    // 'id': 'outline',
    // 'type': 'line',
    // 'source': 'maine',
    // 'layout': {},
    // 'paint': {
    // 'line-color': '#000',
    // 'line-width': 3
    // }
    // });

  });

}

async function tmp_load_outer(){

  let b = mymap.getBounds();

  let datastring = {
    fn_group:'geodata',
    action:'view_data',
    collection:'lyr_all_outer',
    qy_name:'A',
    lyr:'lyr046',
    geom:1,
    current_zoom:mymap.getZoom(),
  };

  datastring.mye=b.getEast();
  datastring.myw=b.getWest();
  datastring.myn=b.getNorth();
  datastring.mys=b.getSouth();
  datastring.data_e=b.getEast();
  datastring.data_w=b.getWest();
  datastring.data_n=b.getNorth();
  datastring.data_s=b.getSouth();  

  let r = await generic_api_v2(datastring,'tmp_load_outer');

  let type = r.type;
  let features = r.features;

  let data = {
    "type": type, // "FeatureCollection",
    "features": features
  }
  // onsole.log(r);

  // Add a data source containing GeoJSON data.
  mymap.addSource('maine', {
    'type': 'geojson',
    'data': data
  });

  // Add a new layer to visualize the polygon.
  // mymap.addLayer({
  //   'id': 'maine',
  //   'type': 'fill',
  //   'source': 'maine', // reference the data source
  //   'layout': {},
  //   'paint': {
  //     'fill-color': '#0080ff', // blue color fill
  //     'fill-opacity': 0.5
  //   }
  // });
  // Add a black outline around the polygon.
  mymap.addLayer({
    'id': '3d-buildings',
    'source': 'maine',
    // 'filter': [
    // 'all',
    // ['==', 'extrude', 'true'],
    // ['>', 'height', i * binWidth],
    // ['<=', 'height', (i + 1) * binWidth]
    // ],
    'type': 'fill-extrusion',
    'minzoom': 15,
    'paint': {
      'fill-extrusion-color': '#aaa',
      // 'fill-extrusion-height-transition': {
      // duration: 0,
      // delay: 0
      // },
      'fill-extrusion-opacity': 0.6
    }
  });  

}

// map.on('load', () => {
//   map.addLayer({
//       id: 'terrain-data',
//       type: 'line',
//       source: {
//           type: 'vector',
//           url: 'mapbox://styles/adminstudiosit/cl8k94jw500e114pq9so7li07'
//       }//,
//       // 'source-layer': 'contour'
//   });
// });

// mymap.on('load', () => {
//   // Start the animation.
//   // rotateCamera(0);
   
// });
// mymap.on('load', () => {

//   // mymap.addSource('wms-test-source', {
//   //   'type': 'raster',
//   //   // use the tiles option to specify a WMS tile source URL
//   //   // https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/
//   //   'tiles': [
//   //     'https://img.nj.gov/imagerywms/Natural2015?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=Natural2015'
//   //   ],
//   //   'tileSize': 256
//   // });

//   // mymap.addLayer(
//   //   {
//   //     'id': 'wms-test-layer',
//   //     'type': 'raster',
//   //     'source': 'wms-test-source',
//   //     'paint': {}
//   //   },
//   //   // 'building' // Place layer under labels, roads and buildings.
//   // );
//   mymap.addLayer({
//     'id': 'wms-test-layer',
//     'type': 'raster',
//     'source': {
//         // SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true
//         // &STYLES&LAYERS=studiosit%3Adbroute_pl_assago3_edges'
//         'type': 'raster',
//         'tiles': [
//             'https://geoserver.studiositsa.ch:8443/geoserver/studiosit/wms?'+
//             'bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&'+
//             'request=GetMap&srs=EPSG:900913&width=256&height=256&'+
//             'layers=studiosit:dbroute_pl_assago3_edges&TRANSPARENT=true'
//         ],
//         'tileSize': 256
//     },
//     'paint': {}
//   });
//   // var wmsLayer = L.tileLayer.wms('https://geoserver.studiositsa.ch:8443/geoserver/studiosit/wms', {
//   //     layers: 'studiosit:dbroute_pl_assago3_edges'
//   // }).addTo(mymap);    

// }); 