import { mymap__isReady,mymap__get } from './mapState.js';

let _layer__name = 'buildings_telaviv';
let _layer__label = 'Buildings 3D';
let _mymap;
export async function mapbox__buildings__init(){

  if(mymap__isReady() == false){
    await timeout(500);
    return await mapbox__buildings__init();
    // return false;
  }

  _mymap = mymap__get();
  console.log(_mymap.getStyle());
  let url2 = FLAT_DOMAIN+'api/mvt.php?z={z}&x={x}&y={y}&';

  _mymap.addSource(_layer__name, {
    'type': 'vector',
    'tiles': [
      url2+
      'collection=buildings_telaviv__mvt'+
    ''],
  });

  _mymap.addLayer(
    {
      'id': `id-${_layer__name}`, // Layer ID
      'type': 'fill-extrusion',
      'source': _layer__name, // ID of the tile source created above
      'source-layer': 'default',
      'paint': {
        // Get the `fill-extrusion-color` from the source `color` property.
        'fill-extrusion-color': [
          "match",
          ["get","item_class"],
          "apartments","#fff",
          "bunker","#fff",
          "carport","#fff",
          "chapel","#fff",
          "church","#fff",
          "civic","#fff",
          "college","#fff",
          "commercial","#fff",
          "detached","#fff",
          "dormitory","#fff",
          "fire_station","#fff",
          "garage","#fff",
          "garages","#fff",
          "government","#fff",
          "grandstand","#fff",
          "greenhouse","#fff",
          "guardhouse","#fff",
          "hangar","#fff",
          "hospital","#fff",
          "hotel","#fff",
          "house","#fff",
          "hut","#fff",
          "industrial","#fff",
          "kindergarten","#fff",
          "kiosk","#fff",
          "manufacture","#fff",
          "mosque","#fff",
          "office","#fff",
          "parking","#fff",
          "public","#fff",
          "residential","#dbd5ce",
          "retail","#fff",
          "school","#fff",
          "semidetached_house","#fff",
          "service","#fff",
          "shed","#fff",
          "silo","#fff",
          "sports_centre","#fff",
          "stadium","#fff",
          "supermarket","#fff",
          "synagogue","#fff",
          "terrace","#fff",
          "toilets","#fff",
          "train_station","#fff",
          "transportation","#fff",
          "university","#fff",
          "warehouse","#fff",
          "#dbd5ce" //default
        ],
        // Get `fill-extrusion-height` from the source `height` property.
        'fill-extrusion-height': ['get', 'height'],
        
        // Get `fill-extrusion-base` from the source `base_height` property.
        'fill-extrusion-base': 0, // ['get', 'job_n'],
        
        // Make extrusions slightly opaque to see through indoor walls.
        'fill-extrusion-opacity': 1
      },
      "minzoom": 15,
      "maxzoom": 22
    },'poi-label'
  );


  // _mymap.on('click', `id-air_pollution`, (e) => {

  //   const features = _mymap.queryRenderedFeatures(e.point, {
  //     layers: [`id-air_pollution`]
  //   });

  // });

  _toc();

}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function _toc(){

  let _lyr_token = _layer__name;

  let _container = $('.sidebar__extra');
  _container.append(`
    <div class="tocbox" \
      lyr_token="${_lyr_token}" >\
      <div class="tocbox__check" >
        <input type="checkbox" \
          class="form-check-input tocbox__check__input" 
          value="" \
          lyr_token="${_lyr_token}" checked >
      </div>\
      <div class="tocbox__label" >
        ${_layer__label}
      </div>
      <div class="tocbox__expand"  \
        lyr_token="${_lyr_token}" >
        <i style="display:none;" class="bi bi-chevron-expand"></i>
      </div>
    </div>
  `);

  $(`.tocbox__check__input[lyr_token="${_lyr_token}"]`).on('click', function() {

    let _checked = $(this).is(':checked');
    let _lyr_token = $(this).attr('lyr_token');

    _visibility({_checked,_lyr_token});

    return;

  });

}

function _visibility(optIn){
  let {
    _checked,
    _lyr_token
  } = optIn;

  if(_checked == true){
    _mymap.setLayoutProperty(`id-${_lyr_token}`, 'visibility', 'visible');
  }
  else{
    _mymap.setLayoutProperty(`id-${_lyr_token}`, 'visibility', 'none');
  }

}