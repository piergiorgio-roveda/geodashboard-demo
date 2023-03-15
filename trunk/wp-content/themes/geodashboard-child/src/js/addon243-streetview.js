var a243_mapReady = 0;

dyn_functions['addon243-streetview'+'_ready'] = function(){

  $('.box-usrprofile').css('display','block');

  $('.box-usrprofile').append('<div '
    +'class="box-btn_StreetViewOnClick box-info-2-btn d-grid gap-2" '
    +'style="margin-top:5px;"></div>');

  a243_mapReady = 1;
  
  a243_ready();

}

const a243_slug='StreetViewOnClick';
list_mapclick.push(a243_slug);

var a243_lyr = new L.featureGroup();

var a243_lyr_Icon = L.icon({
  iconUrl: DFL_MAP_ICON,
  iconSize: [25, 25], // size of the icon
  iconAnchor: [12.5,12.5] // point of the icon which will correspond to marker's location
});

function a243_ready(){
  if (f_wait.geovar_button==0) {
    // _onsole.log('wait')
    setTimeout(function(){a243_ready()},1000);
    return;
  } else {
    prepare_a243();
  };
}

function prepare_a243(){

  g_meta.geovar_addon.features.push({
    "properties": {
      "g_slug" : a243_slug,
      "addon_status" : "enabled",
      "mapclick_status" : "disabled"
    }
  });

  //--

  let item_btn = 'btn_StreetViewOnClick';

  var meta = {
    'properties':{
      "g_slug": "label_"+item_btn,
      "g_label": "<i class=\"fa fa-street-view\" aria-hidden=\"true\"></i>"
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

  //let obj_btn=g_meta.geovar_button.features.filter(({properties}) => properties.g_slug === item_btn);
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

f_btn['btn_StreetViewOnClick']=function(slug){

  let item_addon = 'StreetViewOnClick';
  let obj_fileterd=g_meta.geovar_addon.features.filter(({properties}) => properties.g_slug === item_addon);
  let obj_addon = obj_fileterd[0];

  if(obj_addon.properties.mapclick_status=='disabled'){
    enable_a243();
  }
  else{
    disable_a243();
  }
  //_onsole.log(obj_addon.properties);
  return;

}

//--

function enable_a243(){

  //on start
  let item_addon = 'StreetViewOnClick';
  let obj_fileterd=g_meta.geovar_addon.features.filter(({properties}) => properties.g_slug === item_addon);
  let obj_addon = obj_fileterd[0];
  obj_addon.properties.mapclick_status='enabled';

  //--
  
  $('#btn_StreetViewOnClick').css('background-color','yellow');
  $('#mapid').css('cursor','crosshair');

  //--

  $('.box-editing2').css('display','block');
  $('.box-editing2').css('justify-content','center');
  $('.box-editing2').html(''
    +'<div class="col-auto ct-editing2-info" style="text-align:center;">'
      +'<div class="box card" '
        +'style="width:200px;margin:auto;display:block;" '
      +'>'
      +'Click on map to get StreetView'
      +'</div>'
    +'</div>'
  +'');

  return

}

function disable_a243(){

  let item_addon = 'StreetViewOnClick';
  let obj_fileterd=g_meta.geovar_addon.features.filter(({properties}) => properties.g_slug === item_addon);
  let obj_addon = obj_fileterd[0];

  obj_addon.properties.mapclick_status='disabled';

  //--
  
  $('#btn_StreetViewOnClick').css('background-color','white');
  $('#mapid').css('cursor','default');

  //--

  mymap.removeLayer(a243_lyr);
  a243_lyr.clearLayers();

  //--
  
  $('.box-editing2').css('display','none');
  $('.box-editing2').html('');

  return

}

dyn_mapclick[a243_slug] = function(e){

  let item_addon = 'StreetViewOnClick';
  let g = g_meta.geovar_addon.features;
  let a = 'g_slug';
  let b = item_addon;
  let obj=g.filter(({properties}) => properties[a] === b);
  let objAddon = obj[0];
  //_onsole.log(objAddon)
  if(objAddon.properties.mapclick_status=='enabled'){

    sessionStorage.mapclick_lat=e.latlng.lat;
    sessionStorage.mapclick_lng=e.latlng.lng;

    //let latlng = [e.latlng.lng,e.latlng.lat];

    //--

    let item_dlg = 'dlg_a243_StreetViewOnClick';

    var meta = {
      'properties':{
        'g_slug': item_dlg+'_single',
        'g_label': 'StreetView',
        'g_template': 'template_by_slug',
        'g_description': null
      }
    }
    g_meta.geovar_dialog.features.push(meta);
  
    sessionStorage.this_dialog_lyr=item_dlg;
    sessionStorage.this_dialog_slug=item_dlg+'_single';//'lyr035_single'

    create_dialog2(sessionStorage.this_dialog_slug);

  }

  return

}

dyn_functions['template_by_slug_'+'dlg_a243_StreetViewOnClick'+'_single'] = function(){

  let dlg_slug = 'dlg_a243_StreetViewOnClick'+'_single';

  let c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //box button tab
  c = ''
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //box tab1
  c = '<div '
    +'class="dlg_panel dlg_panel_tab panel-tab1" '
    +'style="display:block;font-family:var(--wd-fonts-secondary);">'
    //+'<aside class="blog-sidebar">'
      +'<div id="street-view" style="height:400px;"></div>'
      +'<div class="street-view-status" '
        +'style="'
          +'display:none;'
          +'margin-top:15px;'
        +'"></div>'
    //+'</aside>';
  //c += '<p>TAB1</p>';
  c += '</div><!--tab1-->';
  
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //--

  let datastring = {}

  let lat = parseFloat(sessionStorage.mapclick_lat);
  let lng = parseFloat(sessionStorage.mapclick_lng);

  datastring.tag = 'street-view';
  datastring.lat = lat;
  datastring.lng = lng;
  datastring.pov_heading = 165;
  datastring.pov_pitch = 0;

  //--

  a243_lyr.clearLayers();

  var marker = L.marker([lat, lng], {
    icon: a243_lyr_Icon
  });

  a243_lyr.addLayer(marker);
  a243_lyr.addTo(mymap);

  //--

  //$('.click-pano').on('click',fill_streetview(datastring));

  fill_streetview(datastring);  

}
