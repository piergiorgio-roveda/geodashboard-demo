const lyrsit116a_colors = new Array();

dyn_functions['map_lyrsit116a'+'_ready'] = function (){

  let lyr='lyrsit116';
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  if (obj_lyr.load!==true) {
    // _onsole.log('wait')
    setTimeout(function(){
      dyn_functions['map_lyrsit116a'+'_ready']()
    },100);
    return;
  } else {
    dyn_functions['lyrsit116_lyr_extend_after']();
  };

}

dyn_functions['lyrsit116_lyr_extend']=function(){

  //_onsole.log('lyrsit116_lyr_extend')

  let lyr='lyrsit116';

  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  sessionStorage['start_lyr_visible_'+lyr]='1';
  obj_lyr.visible=true;

  lyrsit116a_colors.default={'slug':'default','color':'#999999'};

  geo_lyr_style[lyr] = function(feature, layer){

    // let p = feature.properties;

    let p = lyrsit116a_colors.default;
    let mycolor = p.color;//geovar.lyr.lyrsit116.iso2_color;
    let fillOpacity=0;
    let opacity=0;

    layer.setStyle({
      fillColor:mycolor,
      color:mycolor,
      weight:2,
      opacity:opacity,
      fillOpacity:fillOpacity,
      //clickable:false
    });//.on('click', geo_lyrsit116_onClick);

  };

}

dyn_functions['lyrsit116_lyr_extend_after']=function(){

  let lyr='lyrsit116';
  //_onsole.log('fitBounds',lyr);
  //mymap.fitBounds(geo_lyr[lyr].getBounds());

  let item_btn = 'btn_infolus';

  $('.box-usrprofile').prepend('<div '
    +'class="box-'+item_btn+' box-info-2-btn d-grid gap-2" '
    +'style="margin-top:5px;"></div>');

  var meta = {
    'properties':{
      "g_slug": "label_"+item_btn,
      "g_label": "<i class=\"fa fa-refresh\" aria-hidden=\"true\"></i>"
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

f_btn['btn_infolus']=function(slug){

  let lyr='lyrsit116';
  //_onsole.log('fitBounds',lyr);
  mymap.fitBounds(geo_lyr[lyr].getBounds());

}
