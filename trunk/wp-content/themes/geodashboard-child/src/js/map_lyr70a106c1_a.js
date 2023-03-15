const alyr70a106c1_slug='SunTreeClick';
sessionStorage.wms_lyr70a106c1_rnd='no';
// dMap.analisi01.grLyr.push('lyr70a106c1');

// //var geo_lyr70a106c1 = new L.featureGroup();
// //var geo_lyr70a106c1 = new L.MarkerClusterGroup(geo_lyr022_options);
// var geo_lyr70a106c1 = new L.MarkerClusterGroup();

// dMap.analisi01.grLyrToc.push('lyr70a106c1');

// var geo_lyr70a106c1_style = function (feature,latlng) {
//   return L.marker(latlng,{
//     icon: geo_lyr70a106c1_style_icon
//   }).on('click', geo_lyr70a106c1_onClick); // funzione 3 onClick sul punto
// }
// let lyr='lyr70a106c1';
// let obj_lyr=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === lyr)[0].properties;
// var geo_lyr70a106c1_style_icon = L.icon(obj_lyr.g_style.style2);

// function geo_lyr70a106c1_onClick(e) {

// }

dyn_functions['map_lyr70a106c1_a'+'_ready'] = function(){

  list_mapclick.push(alyr70a106c1_slug);

  g_meta.geovar_addon.features.push({
    "properties": {
      "g_slug" : alyr70a106c1_slug,
      "addon_status" : "enabled",
      "mapclick_status" : "disabled"
    }
  });

  //prepare_lyr70a106c1();
  enable_alyr70a106c1();
}

function enable_alyr70a106c1(){

  //on start
  let item_addon = alyr70a106c1_slug;
  let obj_fileterd=g_meta.geovar_addon.features.filter(({properties}) => properties.g_slug === item_addon);
  let obj_addon = obj_fileterd[0];
  obj_addon.properties.mapclick_status='enabled';

  //--
  
  $('#mapid').css('cursor','crosshair');

  //--

  $('.box-editing2').css('display','block');
  $('.box-editing2').css('justify-content','center');
  $('.box-editing2').html(''
    +'<div class="col-auto ct-editing2-info" style="text-align:center;">'
      +'<div class="box card" '
        +'style="width:200px;margin:auto;display:block;" '
      +'>'
      +'Click on map to get Tree info'
      +'</div>'
    +'</div>'
  +'');

  return

}

dyn_mapclick[alyr70a106c1_slug] = function(e){

  let item_addon = alyr70a106c1_slug;
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

    // let item_dlg = 'dlg_alyr70a106c1_DeckGLOnClick';

    // var meta = {
    //   'properties':{
    //     'g_slug': item_dlg+'_single',
    //     'g_label': 'Buildings 3D view',
    //     'g_template': 'template_by_slug',
    //     'g_description': null
    //   }
    // }
    // g_meta.geovar_dialog.features.push(meta);
  
    // sessionStorage.this_dialog_lyr=item_dlg;
    // sessionStorage.this_dialog_slug=item_dlg+'_single';//'lyr035_single'

    // create_dialog2(sessionStorage.this_dialog_slug);

    let datastring = {}

    let lat = parseFloat(sessionStorage.mapclick_lat);
    let lng = parseFloat(sessionStorage.mapclick_lng);
  
    datastring.tag = 'street-view';
    datastring.lat = lat;
    datastring.lng = lng;

    get_SunTree(datastring); 

  }

  return

}

function get_SunTree(datastring){
  
  let dataString={
    fn_group:'geodata',
    qy_name:'A'
  }
  dataString.action="view_data";
  dataString.collection='get_SunTree';
  dataString.lat=datastring.lat;
  dataString.lng=datastring.lng;

  generic_api(dataString,'fill_SunTree');

}

dyn_functions['succ_fill_SunTree'] = function(r){
  if(r.ds.result_type=='updated'){

    let redrawint = Math.floor( Math.random() * 200000 ) + 1;
    geo_lyr[redrawint] = new L.featureGroup();
    mymap.removeLayer(geo_lyr['lyr70a106c1']);
    let opt=lastWmsOpt['lyr70a106c1'];
    opt['randint'] = redrawint;
    let tL = L.tileLayer.wms(
      lastWmsUrl['lyr70a106c1']+'{randint}',
      opt
    )
    geo_lyr[redrawint].addLayer(tL);
    // FINAL ADD!
    geo_lyr[redrawint].addTo(mymap);
    sessionStorage.wms_lyr70a106c1_rnd='yes';
  
  }
  else{
    alertify.warning('Tree info loaded');
  }
}