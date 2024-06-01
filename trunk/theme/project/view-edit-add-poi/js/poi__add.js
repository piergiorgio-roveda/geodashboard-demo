import { mymap__isReady,mymap__get } from './mapState.js';
import { default__class1 } from '../../_default/js/default__classes.js';
import { d004__check_element__exist } from '../../_default/js/d004__check_element__exist.js';
import { generic_api_v2 } from '../../_default/js/d101__generic_api.js';
import { mapbox__historic_castle__refresh } from './mapbox__historic_castle.js';

const _default__class1 = new default__class1();

let _dlg__slug = 'poi_add';
let poi_add__modal;

let poi__new;
let poi__new__lng = 0;
let poi__new__lat = 0;

$(`body`).append(`\
  <!-- Modal -->
  <div class="modal fade" id="${_dlg__slug}__modal" tabindex="-1" 
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen-md-down">
      <div class="modal-content">
        <div class="\
          modal-header \
          dlg_${_dlg__slug}_single_title \
          " \
          style="\
            padding:0.5rem 1rem;\
          ">
        </div>
        <div class="\
          modal-body \
          dlg_${_dlg__slug}_single_body \
          " \
          style="\
            padding:0.5rem 1rem;\
          ">
        </div>
        <div class="\
          modal-footer \
          dlg_${_dlg__slug}_single_footer \
          " \
          style="\
            display: flex;\
            padding: 0.5rem 1rem;\
            flex-direction: row;\
            flex-wrap: nowrap;\
          ">
          <div class="modal-footer-left"></div>
          <div class="modal-footer-center" style="width:100%;"></div>
          <div class="modal-footer-right">
            <button type="button" \
              id="btn_${_dlg__slug}__close" \
              class="\
                btn btn-outline-dark btn-sm\
              ">CLOSE</button>
          </div>
        </div>
      </div>
    </div>
  </div>
`);

export async function poi__add__init(){

  _default__class1.console_dev_mode({"msg":"poi__add__init"});

  let _ready = await d004__check_element__exist($('.wrapper__topright_space'));

  if(_ready == true){
    _prepare();
  }

}

// function timeout(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

function _prepare(){

  let _container = $('.wrapper__topright_space');
  _container.append(`
    <button \
      class="\
        btn btn-primary \
        poi_add__btn \
      "><i class="bi bi-bookmark-plus"></i></button>
  `);

  poi_add__modal = new bootstrap.Modal(`#${_dlg__slug}__modal`);

  $(`.poi_add__btn`).on('click', function(){

    $(`.poi_add__details`).remove();
    $(`.atm006_node`).remove();

    poi_add__marker();
    poi_add__details();

  });

}

function poi_add__marker(){

  let _mymap = mymap__get();

  // let p = element.properties;
  // let geom = element.geometry.coordinates;
  let icon = document.createElement('i');


  icon.classList.add('atm006_node','bi', 'bi-circle-fill');
  icon.style.cssText = 'color:blue;font-size:15px;';

  icon.setAttribute('id','poi__new');

  let _lnglat = _mymap.getCenter();

  poi__new__lng = _lnglat.lng;
  poi__new__lat = _lnglat.lat;

  poi__new = new mapboxgl.Marker({
    draggable: true,
    element: icon
  })
    .setLngLat([_lnglat.lng, _lnglat.lat])
    .addTo(_mymap);

  poi__new.on(
    'dragend', 
    poi__new__dragend
  );

}

function poi__new__dragend(e){
  console.log(e);
  console.log(e.target._lngLat.lng);
  console.log(e.target._lngLat.lat);
  poi__new__lng = e.target._lngLat.lng;
  poi__new__lat = e.target._lngLat.lat;
}

function poi_add__details(){

  let _container = $('.mainmap');

  _container.append(`
    <div class="poi_add__details">
      <div>
        <label for="castle_name" class="form-label">Castle Name</label>
        <input type="text" class="form-control" \
          id="castle_name" placeholder="Howl's Moving Castle">
      </div>
      <div style="
        padding-top: 1rem;
        display: flex;
        justify-content: space-between;
        gap: 0.5rem;
        ">
        <button type="button" class="btn btn-primary poi_add__save" style="width:100%;" disabled>SAVE</button>
        <button type="button" class="btn btn-danger poi_add__cancel"><i class="bi bi-x-octagon"></i></button>
      </div>
    </div>
  `);

  let _control = $(`#castle_name`);
  let _search__string;

  _control.on('input', async function() {
    _search__string = $(this).val();
    if (_search__string.length > 0) {
      $(`.poi_add__save`).prop('disabled', false);
    }
    else{
      $(`.poi_add__save`).prop('disabled', true);
    }
  });

  let _save = $(`.poi_add__save`);
  _save.on('click', async function(){

    $(`.poi_add__details`).remove();
    $(`.atm006_node`).remove();

    let _features = [];

    let _feat = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [poi__new__lng, poi__new__lat]
      },
      properties: {
        name: _search__string
      }
    };

    _features.push(_feat);

    let _collection = 'historic_castle__insert';
    // Your search logic here
    let datastring = {
      fn_group:'geodata',
      action:'view_data',
      collection:_collection,
      geojson:_features
    } 
    let r = await generic_api_v2(datastring,_collection);

    mapbox__historic_castle__refresh();

  });

}
