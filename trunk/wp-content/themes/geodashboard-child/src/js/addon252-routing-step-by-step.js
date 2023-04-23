//--
var a252_mapReady = 0;
//--
const a252_slug='a252_RoutingStepByStep';
sessionStorage.a252_current_seq=0;
//--

var a252_sequence = [];
var a252_features = new Array();
var a252_lines_features = new Array();

var a252_route = {};
a252_route.type = "FeatureCollection";
a252_route.features = [];

dyn_functions['addon252-routing-step-by-step'+'_ready'] = function(){

  $('.box-usrprofile').css('display','block');

  $('.box-usrprofile').append('<div '
    +'class="box-btn_'+a252_slug+' box-info-2-btn d-grid gap-2" '
    +'style="margin-top:5px;"></div>');

  a252_mapReady = 1;

  prepare_a252();

}

function prepare_a252(){

  geo_lyr['a252_route_1'] = new L.featureGroup();

  mymap.createPane('a252_route_1'+'_pane');
  mymap.getPane('a252_route_1'+'_pane').style.zIndex = 500;
  
  geo_lyr_style['a252_route_1'] = function(feature, layer){
    layer.setStyle({
      fillColor:'#000',
      color:'#000',
      weight:2,
      opacity:1,
      fillOpacity:0.5,
      //clickable:false
    });//.on('click', geo_glyrsit001_onClick);
  };

  g_meta.geovar_addon.features.push({
    "properties": {
      "g_slug" : a252_slug,
      "addon_status" : "enabled",
      "show_status" : "disabled"
    }
  });

  //--

  let itemBtn = 'btn_'+a252_slug;

  //--
  
  let gLang_slug="label_"+itemBtn;
  let gLang_label="<i class=\"bi bi-dpad-fill\"></i>";

  gLang[gLang_slug]=gLang_label;

  //--

  let GroupStyleBtn = 'btn-main-sidebar btn-on-map btn-map-click';
  let btnMeta = {
    'properties':{
      "g_slug": itemBtn,
      "g_label": "label_"+itemBtn,
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark " + GroupStyleBtn
    }
  }
  g_meta.geovar_button.features.push(btnMeta);

  create_button(itemBtn);

}

f_btn['btn_'+a252_slug]=function(slug){

  let itemAddon = a252_slug; // element.id.replace('btn_', '');
  let o = g_meta.geovar_addon.features;
  let obj_fileterd=o.filter(
    ({properties}) => properties.g_slug === itemAddon
  );
  let objAddon = obj_fileterd[0];

  if(objAddon.properties.show_status=='enabled'){

    objAddon.properties.show_status='disabled';

    $('#'+'btn_'+a252_slug).css('background-color','white');

    if(dyn_functions['disable_'+itemAddon]!=null){
      dyn_functions['disable_'+itemAddon]();
    }

  }
  else{
    
    objAddon.properties.show_status='enabled';

    $('#'+'btn_'+a252_slug).css('background-color','yellow');

    if(dyn_functions['enable_'+itemAddon]!=null){
      dyn_functions['enable_'+itemAddon]();
    }

  }

  return;

}

dyn_functions['enable_'+a252_slug]=function(){

  let itemBtn = 'btn_a252_play';
  let itemBtn2 = 'btn_a252_next';

  $('.box-editing2').css('display','block');
  $('.box-editing2').css('justify-content','center');
  $('.box-editing2').html(''
    +'<div class="col-auto ct-editing2" style="padding: 5px 0px;">'
      +'<span '
        +'class="box-'+itemBtn+'"></span>'
      +'<span '
        +'class="box-'+itemBtn2+'"></span>'
    +'</div>'
  +'');

  //--
  
  let gLang_slug="label_"+itemBtn;
  let gLang_label="<i class=\"bi bi-play-fill\"></i>";

  gLang[gLang_slug]=gLang_label;

  gLang_slug="label_"+itemBtn2;
  gLang_label="<i class=\"bi bi-arrow-bar-right\"></i>";

  gLang[gLang_slug]=gLang_label;

  //--

  let GroupStyleBtn = 'btn-main-sidebar btn-on-map';
  let btnMeta = {
    'properties':{
      "g_slug": itemBtn,
      "g_label": "label_"+itemBtn,
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark " + GroupStyleBtn
    }
  }
  g_meta.geovar_button.features.push(btnMeta);  

  create_button(itemBtn);

  GroupStyleBtn = 'btn-main-sidebar btn-on-map';
  btnMeta = {
    'properties':{
      "g_slug": itemBtn2,
      "g_label": "label_"+itemBtn2,
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark " + GroupStyleBtn
    }
  }
  g_meta.geovar_button.features.push(btnMeta);  

  create_button(itemBtn2);

  return

}

dyn_functions['disable_'+a252_slug]=function(){

  $('.box-editing2').css('display','none');
  $('.box-editing2').html('');

  return

}

//--

f_btn['btn_a252_play']=function(slug){

  let dataString = {
    fn_group:'geodata',
    action:'view_data',
    collection:'a252_seqAllNodes',
    qy_name:'A',
    lyr:'lyrbc09a5a630e23283aa9bfa7cb2cd9065',
    geom:1,
  };

  generic_api(dataString,'a252_play');

}
//-- btn_a252_next

dyn_functions['succ_a252_play'] = function(r){

  let lyr = r.ds.lyr;

  a252_features=r.features;

  var geojson = L.geoJson(r,{
    pointToLayer: geo_lyr_style[lyr]//, //function_iconLabel
    //pane:lyr+'_pane' defined in icon
  });

  let map_lyr = lyr;
  if(r.ds.output_lyr!=undefined){
    map_lyr = r.ds.output_lyr;
  }
  //_onsole.log(map_lyr)
  geo_lyr[map_lyr].addLayer(geojson);

  // FINAL ADD!
  geo_lyr[map_lyr].addTo(mymap);  

  // let dataString = {
  //   fn_group:'geodata',
  //   action:'view_data',
  //   collection:'a252_all_route_lines',
  //   qy_name:'A',
  //   lyr:'lyr7f7f40ad3c802442c4968c41756bebdf',
  //   geom:1,
  // };

  // generic_api(dataString,'a252_route_lines');
  r = new Array();
  dyn_functions['succ_a252_route_lines'](r)
}

dyn_functions['succ_a252_route_lines'] = function(r){

  // a252_lines_features=r.features;

  a252_features.forEach(element => {
    let p = element.properties;
    a252_sequence.push( p.seq );
  });

  sessionStorage.a252_current_seq=a252_features[0].properties.seq;
  goTo_a252_next(sessionStorage.a252_current_seq);

  return

}

//--

var  a252_seq_prev_in = [];
var  a252_seq_prev_out = [];
var  a252_seq_curr_in = [];
var  a252_seq_curr_out = [];

f_btn['btn_a252_next']=function(slug){

  // _onsole.log('btn_a252_next')
  let current_seq = parseInt(sessionStorage.a252_current_seq);

  let o = a252_features;
  let this_obj=o.filter(({properties}) => properties.seq === parseInt(current_seq));
  obj_lyr=this_obj[0].properties;

  a252_seq_prev_in = [];
  a252_seq_prev_out = [];

  // let t = obj_lyr.in_edges.replace('{', '').replace('}', '').split(',');
  // t.forEach(element => {
  //   a252_seq_prev_in.push(parseInt(element));
  // });

  // t = obj_lyr.out_edges.replace('{', '').replace('}', '').split(',');
  // t.forEach(element => {
  //   a252_seq_prev_out.push(parseInt(element));
  // });

  let current_index = a252_sequence.indexOf(current_seq);
  sessionStorage.a252_current_seq=a252_sequence[current_index+1];
  let next_seq = sessionStorage.a252_current_seq;
  goTo_a252_next(next_seq);

}

function goTo_a252_next(seq){

  let o = a252_features;
  let this_obj=o.filter(({properties}) => properties.seq === parseInt(seq));
  obj_lyr=this_obj[0].properties;
  obj_lyr_geom=this_obj[0].geometry;

  console.log(obj_lyr);

  a252_seq_curr_in = [];
  a252_seq_curr_out = [];

  // let t = obj_lyr.in_edges.replace('{', '').replace('}', '').split(',');
  // t.forEach(element => {
  //   a252_seq_curr_in.push(parseInt(element));
  // });

  // t = obj_lyr.out_edges.replace('{', '').replace('}', '').split(',');
  // t.forEach(element => {
  //   a252_seq_curr_out.push(parseInt(element));
  // });

  // console.log('a252_seq_prev_in', a252_seq_prev_in);
  // console.log('a252_seq_prev_out', a252_seq_prev_out);
  // console.log('a252_seq_curr_in', a252_seq_curr_in);
  // console.log('a252_seq_curr_out', a252_seq_curr_out);

  // if(sessionStorage.a252_current_seq>1){
    
  //   let intersections = a252_seq_curr_in.filter(e => a252_seq_prev_out.indexOf(e) !== -1);
  //   if(intersections.length==0){
  //     intersections = a252_seq_curr_out.filter(e => a252_seq_prev_in.indexOf(e) !== -1);
  //   }

  //   if(intersections.length>0){
      
 
  //     // _onsole.log('intersections', intersections);
  //     o = a252_lines_features;
  //     this_obj=o.filter(({properties}) => 
  //       properties.id === intersections[0]);
  //     // obj_lyr2=this_obj[0].properties; 
  //     // _onsole.log(this_obj[0]);
    
  //     a252_route.features.push(this_obj[0]);
    
  //     let item_lyr = 'a252_route_1';
    
  //     geo_lyr[item_lyr].clearLayers();
    
  //     let geojson = L.geoJSON(a252_route,{
  //       onEachFeature: geo_lyr_style[item_lyr],
  //       pane:item_lyr+'_pane'
  //     });
  //     geo_lyr[item_lyr].addLayer(geojson);
  //     geo_lyr[item_lyr].addTo(mymap);

  //   }   
  // }

  dMap.place.zoom=gLang.zoom_result;
  mymap.setView(
    [
      obj_lyr_geom.coordinates[1],
      obj_lyr_geom.coordinates[0]
    ], 
    17
  );

  get_a252_seqDirectionPath(seq);

}

function get_a252_seqDirectionPath(seq){
  
    let dataString = {
      fn_group:'geodata',
      action:'view_data',
      collection:'a252_seqDirectionPath',
      qy_name:'A',
      lyr:'lyr7f7f40ad3c802442c4968c41756bebdf',
      lyrSeqNodes:'lyrbc09a5a630e23283aa9bfa7cb2cd9065',
      geom:1,
      seq:seq
    };
  
    generic_api(dataString,'a252_seqDirectionPath');
}

dyn_functions['succ_a252_seqDirectionPath'] = function(r){

  let item_lyr = 'a252_route_1';

  geo_lyr[item_lyr].clearLayers();

  let geojson = L.geoJSON(r,{
    onEachFeature: geo_lyr_style[item_lyr],
    pane:item_lyr+'_pane'
  });
  geo_lyr[item_lyr].addLayer(geojson);
  geo_lyr[item_lyr].addTo(mymap);

 
  return

}