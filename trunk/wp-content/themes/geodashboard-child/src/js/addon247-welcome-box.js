var a247_mapReady = 0;

dyn_functions['addon247-welcome-box'+'_ready'] = function(){

  if(sessionStorage.a247_status=='hide'){

  }
  else{
    $('.box-map-welcome').css('display','');
    $('.box-map-welcome-action').append('<div '
    +'class="box-btn_a247_ready box-info-2-btn gap-2" '
    +'style="margin-top:5px;"></div>');    
  }

  //_onsole.log('addon244-fixed-btn')
  a247_ready();

}


function a247_ready(){

  prepare_a247();

}


function prepare_a247(){


  let item_btn = 'btn_a247_ready';

  var meta = {
    'properties':{
      "g_slug": "label_"+item_btn,
      "g_label": "Explore the map!"
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

  create_button(item_btn);

}

f_btn['btn_a247_ready']=function(slug){

  sessionStorage.a247_status='hide';

  $('.box-map-welcome').css('display','none');

  let opt={
    "itemLyr":sessionStorage.a246_lyr,
    "g_callback":'a246_zoom_to'
  }

  dyn_functions['get_lyr_bbox'](opt);
  
}
