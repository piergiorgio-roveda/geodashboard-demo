var a246_mapReady = 0;

dyn_functions['addon246-reset-bbox'+'_ready'] = function(){

  $('.box-usrprofile').css('display','block');

  $('.box-usrprofile').append('<div '
    +'class="box-btn_a246_ready box-info-2-btn d-grid gap-2" '
    +'style="margin-top:5px;"></div>');

  //_onsole.log('addon244-fixed-btn')
  a246_ready();

}


function a246_ready(){

  prepare_a246();

}


function prepare_a246(){

  let o = g_meta.geovar_map.features;
  let this_obj=o.filter(({properties}) => properties.g_slug === MAPSLUG);
  let obj_map=this_obj[0].properties;
  let obj_addon=obj_map.g_addon.filter((x) => x.addon === 'a246');

  if (obj_addon.length>0) {
    // _onsole.log(this_obj2[0].lyr,'defined');
    // _onsole.log('Lyr defined for', 'a246');
    sessionStorage.a246_lyr=obj_addon[0].lyr;
  }
  else{
    console.log('No lyr defined for', 'a246');
    return; //exit
  }

  let item_btn = 'btn_a246_ready';

  var meta = {
    'properties':{
      "g_slug": "label_"+item_btn,
      "g_label": "<i class=\"fa fa-map-o\" aria-hidden=\"true\"></i>"
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

f_btn['btn_a246_ready']=function(slug){

  let opt={
    "itemLyr":sessionStorage.a246_lyr,
    "g_callback":'a246_zoom_to'
  }

  dyn_functions['get_lyr_bbox'](opt);

}

dyn_functions['succ_'+'a246_zoom_to'] = function(r){
  //_onsole.log('a240_zoom_to',r);
  //let lyr = r.ds.lyr;
  //let bbox = r.ds.bbox;
  //onsole.log(r);
  //maps.a240_map.fitBounds(bbox);
  //let p = r.features[0].properties;
 
  //maps.a240_map.fitBounds(p.g_bbox);

  let geojson = L.geoJson(r);
  mymap.fitBounds(geojson.getBounds());


}