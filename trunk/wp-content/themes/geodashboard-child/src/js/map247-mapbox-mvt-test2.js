dyn_functions['map247-mapbox-mvt-test2'+'_ready'] = function(){

  console.log('map247-mapbox-mvt-test2'+'_ready');

  mymap.setCenter([9.090928293656296,45.808537176274655]); // Lugano

  // add_sample_geojson_polygon();
  // add_3d_buildings();
  tmp_load_mvt();

}

function tmp_load_mvt(){

  // let b = mymap.getBounds();

  // let datastring = {
  //   fn_group:'geodata',
  //   action:'view_data',
  //   collection:'lyr_all_outer',
  //   qy_name:'A',
  //   lyr:'lyr046',
  //   geom:1,
  //   current_zoom:mymap.getZoom(),
  // };

  // datastring.mye=b.getEast();
  // datastring.myw=b.getWest();
  // datastring.myn=b.getNorth();
  // datastring.mys=b.getSouth();
  // datastring.data_e=b.getEast();
  // datastring.data_w=b.getWest();
  // datastring.data_n=b.getNorth();
  // datastring.data_s=b.getSouth();  

  // let r = await generic_api_v2(datastring,'tmp_load_outer');

  // let type = r.type;
  // let features = r.features;

  // Insert the layer beneath any symbol layer.
  // let layers = mymap.getStyle().layers;
  // let labelLayerId = layers.find(
  //   (layer) => layer.type === 'symbol' && layer.layout['text-field']
  // ).id;
  // Add a new vector tile source with ID 'mapillary'.
  mymap.on('load', () => {
    mymap.addSource('dbbldg_eu_pg_buildings', {
      'type': 'vector',
      'tiles': [
        // 'https://tiles.mapillary.com/maps/vtp/mly1_public/2/{z}/{x}/{y}?access_token=MLY|4142433049200173|72206abe5035850d6743b23a49c41333'
        HOME_PROJECT+'/mvt/{z}/{x}/{y}/?collection=mvt_dbbldg_eu_pg_buildings'
      ],
      'minzoom': 6,
      'maxzoom': 14
    });
    mymap.addLayer(
      {
        'id': 'id-dbbldg_eu_pg_buildings', // Layer ID
        'type': 'fill-extrusion',
        'source': 'dbbldg_eu_pg_buildings', // ID of the tile source created above
        // Source has several layers. We visualize the one with name 'sequence'.
        'source-layer': 'default',
        'paint': {
          // Get the `fill-extrusion-color` from the source `color` property.
          'fill-extrusion-color': [
            "match",
            ["get","mytype"],
            "residential","#2967e9",
            "#fff" //default
          ],
          // Get `fill-extrusion-height` from the source `height` property.
          'fill-extrusion-height': ['get', 'height'],
          
          // Get `fill-extrusion-base` from the source `base_height` property.
          'fill-extrusion-base': 0, // ['get', 'job_n'],
          
          // Make extrusions slightly opaque to see through indoor walls.
          'fill-extrusion-opacity': 0.7
        }
      },
      'road-label'
    );

    // mymap.addLayer(
    //   {
    //     'id': 'id-dbbldg_eu_pg_buildings-roof', // Layer ID
    //     'type': 'fill-extrusion',
    //     'source': 'dbbldg_eu_pg_buildings', // ID of the tile source created above
    //     // Source has several layers. We visualize the one with name 'sequence'.
    //     'source-layer': 'default',
    //     'paint': {
    //       // Get the `fill-extrusion-color` from the source `color` property.
    //       'fill-extrusion-color': [
    //         "match",
    //         ["get","mytype"],
    //         "residential","#2967e9",
    //         "#fff" //default
    //       ],
          
    //       // Get `fill-extrusion-height` from the source `height` property.
    //       'fill-extrusion-height': ["+", ["get", "height"], 0.1],
          
    //       // Get `fill-extrusion-base` from the source `base_height` property.
    //       'fill-extrusion-base': ["get", "height"], // ['get', 'job_n'],
          
    //       // Make extrusions slightly opaque to see through indoor walls.
    //       'fill-extrusion-opacity': 1
    //     }
    //   } // ,
    //   // 'road-label'
    // );    
  });

  mymap.on('style.load', () => {
    mymap.addSource('mapbox-dem', {
    'type': 'raster-dem',
    'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
    'tileSize': 512,
    'maxzoom': 14
    });
    // add the DEM source as a terrain layer with exaggerated height
    mymap.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1 });

    // mymap.setPaintProperty('road-label', 'text-color', '#fff');
    mymap.setPaintProperty('poi-label', 'text-color', 'rgba(0,0,0,0)');
    mymap.setPaintProperty('poi-label', 'text-halo-color', 'rgba(0,0,0,0)');
    mymap.setPaintProperty('poi-label', 'icon-opacity', 0);

  });  

  mymap.on('click', function(e) {
    var features = mymap.queryRenderedFeatures(e.point, {
      layers: ['id-dbbldg_eu_pg_buildings']
    });
    console.log(features[0]);
  })

  // When the user moves their mouse over the state-fill layer, we'll update the
  // feature state for the feature under the mouse.
  mymap.on('mousemove', 'id-dbbldg_eu_pg_buildings', (e) => {
    return
    let features = mymap.queryRenderedFeatures(e.point, {
      layers: ['id-dbbldg_eu_pg_buildings']
    });
    // console.log(features[0]);

    if(features.length > 0){

      $('.box-editing2').css('display','block');
      $('.box-editing2').css('justify-content','center');
      $('.box-editing2').css('bottom','35px');
      // $('.box-editing2').css('left','5px');
      // $('.box-editing2').css('width','215px'); 
      $('.box-editing2').removeClass('d-none d-md-block');

      let title = 'NON RESIDENTIAL';
      if(features[0].properties.mytype == 'residential'){
        title = 'RESIDENTIAL BUILDING';
      }
      $('.box-editing2').html(''
        +'<div class="col-auto ct-editing2-alert card" '
          +'style="width: 200px;margin: auto;background: azure;">'
          +'<div class="card-header" style="color:black!important;">'
          +title
          +'</div>'
          +'<ul class="list-group list-group-flush">'
          +'<li class="list-group-item">'+features[0].properties.id+'</li>'
          +'<li class="list-group-item">A second item</li>'
          +'<li class="list-group-item">A third item</li>'
          +'</ul>'
        +'</div>'
      +'');
    }
    else{
      $('.box-editing2').css('display','none');
    }
    
  });

  // When the mouse leaves the state-fill layer, update the feature state of the
  // previously hovered feature.
  mymap.on('mouseleave','id-dbbldg_eu_pg_buildings', () => {
    // console.log('out')
    $('.box-editing2').css('display','none');
  });  


}
