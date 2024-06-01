import { mymap__isReady,mymap__get } from './mapState.js';
import { generic_api_v2 } from '../../_default/js/d101__generic_api.js';

let _layer__name = 'historic_castle';

export async function mapbox__historic_castle__refresh(){

  let _collection = 'historic_castle__geojson';
  let datastring = {
    fn_group:'geodata',
    action:'view_data',
    collection:_collection
  };

  let r = await generic_api_v2(datastring,_collection);

  let _mymap = mymap__get();

  _mymap.getSource(_layer__name).setData(r);

}

export async function mapbox__historic_castle__init(){

  if(mymap__isReady() == false){
    await timeout(500);
    return await mapbox__historic_castle__init();
    // return false;
  }

  let _collection = 'historic_castle__geojson';
  let datastring = {
    fn_group:'geodata',
    action:'view_data',
    collection:_collection
  };

  let r = await generic_api_v2(datastring,_collection);

  let _mymap = mymap__get();

  _mymap.addSource(_layer__name, {
    'type': 'geojson',
    'data': r,
    'cluster': true,
    'clusterMaxZoom': 14, // Max zoom to cluster points on
    'clusterRadius': 50 // Radius of each cluster when clustering points (defaults to 50)
  });

  let _img = `${FLAT_DOMAIN}source/icon/mapbox-maki-7e87952/icons/castle.png`;

  let _images = [_img]

  Promise.all(
    _images.map(_url => new Promise((resolve, reject) => {
      _mymap.loadImage(_url, function (error, image) {
        if (error) throw error;
        let _opt = {}
        // if(img.sdf != undefined){
        //   _opt.sdf = img.sdf;
        // }
        _mymap.addImage("id-castle-icon", image,_opt)
        resolve();
      })
    }))
  )
  .then( x => {
    _mymap.addLayer({
      "id": `id-${_layer__name}`,
      "source": _layer__name,
      "type": "symbol",
      "layout": {
        "icon-image": "id-castle-icon",
        "icon-size": 0.8,
        "icon-allow-overlap": true,
        "icon-ignore-placement": true
      },
      "paint": {
        "icon-color": "#000"
      }
    });
  });


  mapbox__historic_castle__toc();

}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function mapbox__historic_castle__toc(){

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
        Historic Castles
      </div>
      <div class="tocbox__expand"  \
        lyr_token="${_lyr_token}" >
        <i class="bi bi-chevron-expand"></i>
      </div>
    </div>
  `);

  _container.append(`
    <div class="tocbox__sub" \
      lyr_token="${_lyr_token}" >
      Tag:historic=castle<br>
      <a href="https://wiki.openstreetmap.org/wiki/Tag:historic%3Dcastle" \
        target="_blank">Download from OpenStreetMap</a>
    </div>
  `);

  $(`.tocbox__check__input[lyr_token="${_lyr_token}"]`).on('click', function() {

    let _checked = $(this).is(':checked');
    let _lyr_token = $(this).attr('lyr_token');

    _visibility({_checked,_lyr_token});

    return;

  });

  $(`.tocbox__expand[lyr_token="${_lyr_token}"]`).on('click', function() {

    $(`.tocbox__sub[lyr_token="${_lyr_token}"]`).toggle();

  });

}

function _visibility(optIn){
  let {
    _checked,
    _lyr_token
  } = optIn;

  let _mymap = mymap__get();

  if(_checked == true){
    _mymap.setLayoutProperty(`id-${_lyr_token}`, 'visibility', 'visible');
  }
  else{
    _mymap.setLayoutProperty(`id-${_lyr_token}`, 'visibility', 'none');
  }

}