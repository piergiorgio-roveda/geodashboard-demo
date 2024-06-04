import { mymap__isReady,mymap__get } from './mapState.js';

let _layer__name = 'poi-label';
let _layer__label = 'Point of Interest (Label)';
let _mymap;
export async function mapbox__poi_label__control__init(){

  if(mymap__isReady() == false){
    await timeout(500);
    return await mapbox__poi_label__control__init();
    // return false;
  }
  _mymap = mymap__get();
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
          lyr_token="${_lyr_token}" checked>
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
    _mymap.setLayoutProperty(`${_lyr_token}`, 'visibility', 'visible');
  }
  else{
    _mymap.setLayoutProperty(`${_lyr_token}`, 'visibility', 'none');
  }

}