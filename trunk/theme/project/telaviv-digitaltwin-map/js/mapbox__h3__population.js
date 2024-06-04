import { mymap__isReady,mymap__get } from './mapState.js';

let _layer__name = 'mapbox__h3__population';
let _layer__label = 'Population (400m)';
let _mymap;
export async function mapbox__h3__population__init(){

  if(mymap__isReady() == false){
    await timeout(500);
    return await mapbox__h3__population__init();
    // return false;
  }

  _mymap = mymap__get();
  let _tile__url = FLAT_DOMAIN+'api/mvt.php?z={z}&x={x}&y={y}'
                        +'&slug=0x0'
                        +'&action=view_data&'
                        +'collection=mvt_custom_v2__h3_test'
                        +'&custom=generic'
                        +'&table_slug=H3_POPULATION_TEST';
  _mymap.addSource(_layer__name, {
    'type': 'vector',
    'tiles': [_tile__url],
  });

  _mymap.addLayer(
    {
      'id': `id-${_layer__name}`, // Layer ID
      'type': 'fill',
      'source': _layer__name, // ID of the tile source created above
      'source-layer': 'default',
      'layout': {'visibility': 'none'},
      'paint': {
        "fill-color": [
            "interpolate",
            [
              "linear"
            ],
            [
              "get",
              "population"
            ],
            1,
            "#CACFFF",
            20000,
            "#0017FF"
        ],
        "fill-opacity": 0.7
      },
      "minzoom": 12,
      "maxzoom": 17
    },'settlement-subdivision-label'
  );

  _mymap.addLayer({
    id: `id-${_layer__name}-label`,
    'type': 'symbol',
    'source':  _layer__name,
    'source-layer': 'default',
    'layout': {
      'visibility': 'none',
      'text-field': ['get', 'population'],
      // 'text-variable-anchor': 'top',
      // 'text-radial-offset': 0.5,
      // 'text-justify': 'auto',
      'text-allow-overlap': true,
      'text-ignore-placement': true,
    },
    'paint': {
      'text-halo-color': '#ffffff',
      'text-halo-width': 1,
    },
    "minzoom": 12,
    "maxzoom": 17
  });

  // _mymap.on('click', `id-${_layer__name}`, (e) => {

  //   const features = _mymap.queryRenderedFeatures(e.point, {
  //     layers: [`id-${_layer__name}`]
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
          lyr_token="${_lyr_token}" >
      </div>\
      <div class="tocbox__label" >
        ${_layer__label}
      </div>
      <div class="tocbox__expand" \
        lyr_token="${_lyr_token}" >
        <i style="display:none;" class="bi bi-chevron-expand"></i>
      </div>
    </div>
    <div class="tocbox__extra" \
      lyr_token="${_lyr_token}" >
      <div id="h3__population--slider" class="slider-styled toc--slider"></div></div>
  `);
  
  $(`.tocbox__extra[lyr_token="${_lyr_token}"]`).hide();

  $(`.tocbox__check__input[lyr_token="${_lyr_token}"]`).on('click', function() {

    let _checked = $(this).is(':checked');
    let _lyr_token = $(this).attr('lyr_token');

    _visibility({_checked,_lyr_token});

    return;

  });

  _slider__init();


}

function _visibility(optIn){

  let {
    _checked,
    _lyr_token
  } = optIn;

  if(_checked == true){
    _mymap.setLayoutProperty(`id-${_lyr_token}`, 'visibility', 'visible');
    _mymap.setLayoutProperty(`id-${_layer__name}-label`, 'visibility', 'visible');
    $(`.tocbox__extra[lyr_token="${_lyr_token}"]`).show();
  }
  else{
    _mymap.setLayoutProperty(`id-${_lyr_token}`, 'visibility', 'none');
    _mymap.setLayoutProperty(`id-${_layer__name}-label`, 'visibility', 'none');
    $(`.tocbox__extra[lyr_token="${_lyr_token}"]`).hide();
  }

}

function _slider__init(){

  let slider = document.getElementById('h3__population--slider');

  noUiSlider.create(slider, {
      start: [0, 20000],
      connect: true,
      range: {
        'min': 0,
        'max': 20000
      },
      tooltips: [true, true],
  });

  let numbro_prop = {
    // thousandSeparated: true
    average: true,
    mantissa: 1
  };

  let _min__label = numbro(0).format({
    // thousandSeparated: true
    // average: true,
    mantissa: 0
  });
  let _max__label = numbro(20000).format({
    // thousandSeparated: true
    average: true,
    mantissa: 1
  });

  $('.noUi-handle-lower').find('.noUi-tooltip').html(_min__label);
  $('.noUi-handle-upper').find('.noUi-tooltip').html(_max__label);

  slider.noUiSlider.on('slide', function (values, handle) {
    // _onsole.log(values, handle);
    let _min = parseFloat(values[0]);
    let _max = parseFloat(values[1]);

    let _min__label = numbro(_min).format(numbro_prop);
    let _max__label = numbro(_max).format(numbro_prop);

    if(_min < 500){
      _min__label = numbro(_min).format({
        // thousandSeparated: true
        // average: true,
        mantissa: 0
      });
    }

    if(_max < 500){
      _max__label = numbro(_max).format({
        // thousandSeparated: true
        // average: true,
        mantissa: 0
      });
    }

    $('.noUi-handle-lower').find('.noUi-tooltip').html(_min__label);
    $('.noUi-handle-upper').find('.noUi-tooltip').html(_max__label);

  });


  slider.noUiSlider.on('end', function (values, handle) {

    // _onsole.log(values, handle);
    let _min = parseFloat(values[0]);
    let _max = parseFloat(values[1]);

    _mymap.setFilter(
      `id-${_layer__name}`,
      [
        'all',
        [">=", ["get", "population"], _min],
        ["<=", ["get", "population"], _max]
      ]
    );

    _mymap.setFilter(
      `id-${_layer__name}-label`,
      [
        'all',
        [">=", ["get", "population"], _min],
        ["<=", ["get", "population"], _max]
      ]
    );

  });

}