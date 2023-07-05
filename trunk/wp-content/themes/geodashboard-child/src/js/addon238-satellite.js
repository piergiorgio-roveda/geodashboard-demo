dyn_functions['addon238-satellite'+'_ready'] = function(){

  // _onsole.log('Ready-1-satellite!')
  sessionStorage.basemap='default';

  $('.box-usrprofile').css('display','block');

  $('.box-usrprofile').append('<div '
    +'class="box-btn_satellite box-info-2-btn d-grid gap-2" '
    +'style="margin-top:5px;"></div>');

  prepare_a238();

}

function prepare_a238(){

  let item_btn = 'btn_satellite';

  var meta = {
    'properties':{
      "g_slug": "label_"+item_btn,
      "g_label": "<i class=\"bi bi-back\"></i>"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": item_btn,
      "g_label": "label_"+item_btn,
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  let obj_btn=g_meta.geovar_button.features.filter(({properties}) => properties.g_slug === item_btn);
  //let g_group = '';
  /* if(obj_btn.length>0){
    //g_group = obj_btn[0].properties.g_group[0];
    obj_btn[0].status = 'disabled';
  }
  else{
    console.log('BTN without properties!');
    return;
  } */

  create_button(item_btn);

}

f_btn['btn_satellite']=function(slug){

  //sessionStorage.this_dialog_slug='a238_single';
  //create_dialog2('a238_single');

  if(sessionStorage.basemap=='default') {

    sessionStorage.basemap='satellite';

    list_basemap.forEach(lyr => {
      mymap.removeLayer(geo_lyr[lyr]);
      //geo_lyr[lyr].clearLayers();
    });
    mymap.addLayer(geo_lyr['satellite']);

  } else {

    sessionStorage.basemap='default';

    mymap.removeLayer(geo_lyr['satellite']);
    list_basemap.forEach(lyr => {
      mymap.addLayer(geo_lyr[lyr]);
      //geo_lyr[lyr].clearLayers();
    });
  }

}
