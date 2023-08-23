//--
var a295_mapReady = 0;
var crops = [
  'apple',
  'orange',
  'blueberry',
  'kale',
  'wheat',
  'radish',
  'eggplant',
  'parsnip',
  'cauliflower',
  'beetroot',
  'cabbage',
  'carrot',
  'pumpkin',
  'potato',
  'sunflower',
];
var show_legend = 0;

if(window.location.href.includes('?item=')){

  sessionStorage.a295_show_item = 1;

}
else{
  sessionStorage.a295_show_item = 0;
}

list_dlg_logo=['logo_onclick_nullisland'];

dyn_functions['dlg_'+'logo_onclick_nullisland'+'_body'] = function(){ 
  // _onsole.log('dlg_logo_onclick_nullisland_body');
  $('.ajs-header').remove();
  let base_url = SOURCE_PATH+'icon/sunflower/';
  let img  = 'https://www.hempuli.com/blogblog/wp-content/uploads/2010/08/better.png';
  $('.ajs_body_head').html('<img src="'+img+'" style="width:100%" />');
  $('.ajs_body_content').html(''+
    '<div style="text-align:center;">'+
      '<h1>Null Island</h1>'+
      '<p>'+
        'Null Island is a fictional island located at 0°N 0°E, where the Prime Meridian and the Equator cross, in the Gulf of Guinea. '+
        'It is featured in many works of fiction as a lost island, such as those of Max Brooks, '+
        'and has become an Internet meme. '+
      '</p>'+
      '<p style="font-size: 120%;">'+
        '<img src="'+
        base_url+'bottle'+'.png'+
        '" />&nbsp;'+
        'Ready to leave your message?'+
      '</p>'+
    '</div>'+
  '');
}

dyn_functions['addon295-null_island-items'+'_ready'] = async function(){ 

  // _onsole.log(localStorage)
  // mymap.setZoom(12);
  a295_inizialize();
  if(sessionStorage.a295_show_item == 0){
    mymap.setCenter([
      parseFloat(localStorage.map_lng),
      parseFloat(localStorage.map_lat)
    ]);
    mymap.setZoom(localStorage.map_zoom);
  }
  else{
    let datastring = {
      call_type:'silent',
      fn_group:'geodata',
      action:'view_data',
      collection:'getUserActivities',
      mode:'last',
      amount:99999,
      qy_name:'A',
      lyr:'lyr999',
      geom:0,
      project_token:g_meta.geovar_map.features[0].properties.item_token,
    };
    //let r = await a295_seqAllNodes(myUrl);
    let r = await generic_api_v2(datastring,'postItemNullIsland');

    let item = window.location.href.split('?item=')[1];
    let obj_collection=r.features.filter(
      ({properties}) => properties.item_token === item
    );
    console.log(obj_collection[0]);
    mymap.setCenter([
      parseFloat(obj_collection[0].properties.g_attributes.lng),
      parseFloat(obj_collection[0].properties.g_attributes.lat)
    ]);
    mymap.setZoom(15);
  }

  

}

async function a295_inizialize() {

  // _onsole.log('a295_inizialize','Ready!');
  // mymap.setCenter([
  //   parseFloat(localStorage.map_lng),
  //   parseFloat(localStorage.map_lat)
  // ]);
  // mymap.setZoom(localStorage.map_zoom);
  list_menu.push('menu_a295');
  if(main_menu_ready == true){
    // proxy_list_menu.push('menu_a292');
    if($(window).width() >= 768) {
      opt = {'part':'left1','menu':'-1'}
      dyn_functions['menu_a295'](opt);
      opt = {'part':'left2','menu':'-2'}
      dyn_functions['menu_a295'](opt);
    }
  }  
  prepare_a295();

  await Promise.all([
    // default_search_map_by_token(),
  ]);

  await new Promise(resolve => setTimeout(resolve, 1));

  null_island_items_start();

}

function prepare_a295(){

  return;

}

var a295_intervalId1;

a295_intervalId1 = setInterval(
  f_a295_intervalId1,
  parseInt(1000)
);

function null_island_items_start(){

  a295_getItems();

}

async function a295_getItems() {

  let p = new Array();
  p.g_slug = 'null_island_items';

  list_f_mapbox.push('prepare_'+p.g_slug);
  // _onsole.log('load_source_',p.g_slug);
  // add_loading2_plus('load_source_'+p.g_slug);

  dyn_functions['prepare_'+p.g_slug] = function(){
    let url2 = HOME_PROJECT+'/api/mvt.php?z={z}&x={x}&y={y}&';

    crops.forEach(element => {
      mymap.loadImage(
        SOURCE_PATH+'icon/sunflower/'+element+'.png', 
        (error, image) => {
          if (error) throw error;
          // add image to the active style and make it SDF-enabled
          mymap.addImage(
            'id-'+element, 
            image, 
            // { sdf: true }
          );
        }
      );
    });

    mymap.addSource(p.g_slug, {
      'type': 'vector',
      'tiles': [
        url2+
        'collection=mvt_custom'+
        '&custom=getAllNullIslandItems'+
        '&slug=tb_user_activities'+
        '&project_token='+
          g_meta.geovar_map.features[0].properties.item_token+
        // '&main_field=osm_id'+
        // '&geom=geom_3857'+
        // '&geohash=h1'+
        // '&join=false'+
        // '&join=true'+
        // '&slug_bar=dbstat_tb_kontur_population'+
        // '&join_on=item_token'+
        // '&bar_cols=population'+
        ''],
    });

    mymap.addLayer(
      {
        'id': 'id-'+p.g_slug, // Layer ID
        // 'type': 'fill',
        // 'type': 'line',
        'type': 'circle',
        'source': p.g_slug, // ID of the tile source created above
        // Source has several layers. We visualize the one with name 'sequence'.
        'source-layer': 'default',
        // 'paint': {
        //   // 'fill-color': '#0080ff', //default'#0080ff', // blue color fill
        //   // 'fill-opacity': 0.2
        //   'circle-radius': 8,
        //   'circle-color': 'rgba(55,148,179,1)'
        // }, 
        'type': 'symbol',
        'layout': {
        'icon-image': [
          'match',
          ['get', 'crop'],
          'apple',
          'id-apple',
          'orange',
          'id-orange',
          'blueberry',
          'id-blueberry',
          'kale',
          'id-kale',
          'wheat',
          'id-wheat',
          'radish',
          'id-radish',
          'eggplant',
          'id-eggplant',
          'parsnip',
          'id-parsnip',
          'cauliflower',
          'id-cauliflower',
          'beetroot',
          'id-beetroot',
          'cabbage',
          'id-cabbage',
          'carrot',
          'id-carrot',
          'pumpkin',
          'id-pumpkin',
          'potato',
          'id-potato',
          'sunflower',
          'id-sunflower',
          /* other */ 'id-sunflower'
          ],
        'icon-size': 1,
        // 'icon-anchor': 'top',
        // 'icon-offset': [0, 10],
        },
        // 'paint': {}        
      },
      'id-TopLayer'
    );

    // popolate_crops_count();

    // mvt_visibility(p.g_slug);
    // mymap.on('zoomend', () => {
    //   mvt_visibility(p.g_slug);
    // });
    // Create a popup, but don't add it to the map yet.
    let popupOffsets = {
      'bottom': [0, -15],
    };

    const popup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: popupOffsets, 
      className: 'popup-cyberpunk'
    });

    mymap.on('mouseenter', 'id-'+p.g_slug, (e) => {
      // Change the cursor style as a UI indicator.
      mymap.getCanvas().style.cursor = 'pointer';

      // Copy coordinates array.
      let p = e.features[0].properties;
      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = p.msg+
      '<hr>'+
      '<span style="font-size: 80%;">'+
        moment(e.features[0].properties.post_date).format('llll')+
      '</span>';
      console.log('permalink',''+HOME_PROJECT+'/project/null_island/?item='+p.item_token+'')

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Populate the popup and set its coordinates
      // based on the feature found.
      popup.setLngLat(coordinates).setHTML(description).addTo(mymap);
    });

    mymap.on('mouseleave', 'id-'+p.g_slug, () => {
      mymap.getCanvas().style.cursor = '';
      popup.remove();
    });    
    
  }

  if(mapbox_load == true){
    dyn_functions['prepare_'+p.g_slug]();
  }

  mymap.on('click', (e) => {

    // Set `bbox` as 5px reactangle area around clicked point.
    const bbox = [
      [e.point.x - 5, e.point.y - 5],
      [e.point.x + 5, e.point.y + 5]
    ];
    // _onsole.log(e)
    // _onsole.log(e.lngLat.lat)
    // _onsole.log(e.lngLat.lng)
    localStorage.item_lat = e.lngLat.lat
    localStorage.item_lng = e.lngLat.lng

    let features = mymap.queryRenderedFeatures(bbox, {
      layers: ['id-null_island_items']
    });
    
    if(features.length > 0){

    }
    else{
      a295_addNew();
      prepare_InsertItem();
    }

    
  }); 

  // mymap.on('sourcedata', ({isSourceLoaded, sourceId}) => {
  mymap.on('sourcedata', (e) => {
    // onsole.log('a286_activeGeohash',a286_activeGeohash);

    let lyr = 'null_island_items';

    if(e.isSourceLoaded == true){
 
    // //   // onsole.log(sourceId)
      if(e.sourceId == lyr){
    //     console.log('sourcedata e',e); 
    // //     //   // let thisFeature = mymap.querySourceFeatures('lyr_geohash5_mvt', {
    // //     //   //   sourceLayer: 'default'
    // //     //   // });
    // //     //   // console.log('sourcedata',thisFeature);
    // //     //   dyn_functions['geohash_style'](lyr);
        popolate_crops_count();

      }

    }

  });  

}

function a295_addNew(slug){

  a295_gps_user_first = 0;

  // $('#btn_a295_addNew').css('display','none');
  // $('#btn_a295_fakeControlFile').css('display','');
  // $('#btn_a295_resetAddNew').css('display','');

  // $('.user_1_marker').remove();

  tmpLyr = 'a295_SelectPosition_1';

  a295_SelectPosition_1_status = 1;

  // mymap.setZoom(18);

  let el = document.createElement('div');
  el.className = 'SelectPosition_1_marker';

  // make a marker for each feature and add to the map
  // new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
  geo_lyr[tmpLyr] = new maplibregl.Marker(el);

  geo_lyr[tmpLyr].setLngLat([
    localStorage.item_lng,
    localStorage.item_lat
  ]);
  geo_lyr[tmpLyr].addTo(mymap);

  $('.SelectPosition_1_marker').css({
    'background-image': 'url('+SOURCE_PATH+'icon/down_arrow_red.png)'
    // 'background-image': 'url('+SOURCE_PATH+'icon/131352236-rotation-of-the-suv.png)'
  });
  $('.SelectPosition_1_marker').css('z-index','300');


  return;

}

async function postItem() {

  let datastring = {
    fn_group:'geodata',
    action:'view_data',
    collection:'postItemNullIsland',
    qy_name:'A',
    lyr:'slug',//'lyr035',
    geom:false,
    lng:localStorage.item_lng,
    lat:localStorage.item_lat,
    user_token:localStorage.user_token,
    session_token:'0x0', 
    project_token:g_meta.geovar_map.features[0].properties.item_token,
    msg:$('#exampleFormControlTextarea1').val(),
    crop:$('.box-selected-crop').find('.icon-crop').attr('slug'),
  } 
  //let r = await a295_seqAllNodes(myUrl);
  let r = await generic_api_v2(datastring,'postItemNullIsland');
  // onsole.log(r);

  // _onsole.log(r);

  alertify.success('Thank You!');
  $('.SelectPosition_1_marker').remove();
  // mymap.setZoom(12);
  mymap.getSource('null_island_items').load();

}

function prepare_InsertItem(){

  let item_addon = 'a295_InsertItem';
  let item_dlg = 'dlg_'+item_addon;

  var meta = {
    'properties':{
      'g_slug': item_dlg+'_single',
      'g_label': 'New message',
      'g_template': 'template_by_slug',
      'g_description': null
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  sessionStorage.this_dialog_lyr=item_dlg;
  sessionStorage.this_dialog_slug=item_dlg+'_single';

  $('.SelectPosition_1_marker').remove();

  create_dialog2(sessionStorage.this_dialog_slug);

}

dyn_functions['template_by_slug_'+'dlg_'+'a295_InsertItem'+'_single'] = function(){

  let dlg_slug = 'dlg_'+'a295_InsertItem'+'_single';

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

      +'<div class="dlg_panel_body_x" '
        +'style="display:block;"></div>'
  //c += '<p>TAB1</p>';
  c += '</div><!--tab1-->';
  
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  $('.dlg_panel_body_x').append(''+
    '<div class="display-table" style="width:100%;">'+
      '<div>'+
        '<div style="text-align:center;">'+
          // 'Treasure found at '+moment(p.post_date).format('llll')+''+
          '<div class="form-group" style="text-align: left;">'+
            '<label for="exampleFormControlTextarea1">Leave your message</label>'+
            '<textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>'+
          '</div>'+
        '</div>'+
      '</div>'+ // row
    '</div>'+ // table
    '<div class="display-table" style="width:100%;">'+
      '<div class="box-selected-crop" style="text-align:center;">'+ 
        'Select one crop below!'+           
      '</div>'+
    '</div>'+
    '<div class="display-table" style="width:100%;">'+
      '<div class="box-crops" style="text-align:center;">'+                        
      '</div>'+
    '</div>'+
  '');

  crops.forEach(element => {

    let base_url = SOURCE_PATH+'icon/sunflower/';
    $('.box-crops').append(''+
      '<div class="icon-crop" slug="'+element+'" '+
        '>'+
        '<img src="'+
          base_url+element+'.png'+
        '" />'+
      '</div>'+
    '');

  });

  $('.icon-crop').on('click',function(){
    let base_url = SOURCE_PATH+'icon/sunflower/';
    let element = $(this).attr('slug');
    $('.box-selected-crop').html(''+
      '<div class="icon-crop" slug="'+element+'" '+
        'style="text-align: center;" '+
        '>'+
        '<div '+
          'style="background-color:yellow;padding:5px;width:50px;margin: auto;" '+
          '>'+
          '<img src="'+
            base_url+element+'.png'+
            '" />'+
        '</div>'+
      '</div>'+
    '');

  });

  $('.ajs-footer-btn2').append(''
    +'<button '
      +'type="button" '
      +'class="btn btn-sm btn-dark" id="btn_InsertItem">ADD</button>'
  +'');
  $('.ajs-footer-btn2').css('text-align','center');
  //--
  $('#btn_InsertItem').on('click',function(){

    //---
    
    alertify.infoDialog().destroy();
    postItem();

  });

}

var messages_view = new Array();

function popolate_crops_count(){

  let filtered = mymap.queryRenderedFeatures(
    { 
      layers: ['id-null_island_items'] 
    }
  );
  // onsole.log('filteredcount',filteredcount);
  $('#crop-count').html(filtered.length);
  messages_view = filtered;
}

dyn_functions['menu_a295'] = function(optIn){
  
  switch(optIn.menu){
    case '-1':
      
      $('.cyberpunk_footer-cell.'+optIn.part).append(''+
        '<div id="container-crop-count" style="cursor:pointer;">'+
          '<span id="crop-count">-</span>'+
          ' messages &nbsp;'+
          '<span class="icon-message">'+
            '<i class="bi bi-chat-square-text-fill"></i></span>'+
        '</div>'+
      '');
      $('#container-crop-count').on('click',prepare_open_messages);


      break;
    case '-2':
  
      itemBtn2 = 'btn_show_legend';

      c = ''+
        '<span class="box-'+itemBtn2+'"></span>&nbsp;'+
      '';
      $('.cyberpunk_footer-cell.'+optIn.part).append(c);

      opt = btnOptDefault();
      opt.itemSlug = itemBtn2;
      opt.itemLabel = {
        "default":"<i class=\"bi bi-card-list\"></i"
      }//gLang.label_close,   
      create_button_2(opt); 
  
        
      break;
    default:
      // onsole.log('show_menu: '+optIn.menu);
  }
  
}

var messages = new Array();
var new_messages = new Array();

async function f_a295_intervalId1(){

  let datastring = {
    call_type:'silent',
    fn_group:'geodata',
    action:'view_data',
    collection:'getUserActivities',
    mode:'last',
    amount:10,
    qy_name:'A',
    lyr:'lyr999',
    geom:0,
    project_token:g_meta.geovar_map.features[0].properties.item_token,
  };

  new_messages = await generic_api_v2_direct(datastring,'getUserActivities');
  // console.log('f_a295_intervalId1',r);
  if(messages.length != new_messages.length){
    messages = new_messages;
  }

  let a = messages.features.map(feature => feature.properties.item_token);
  let b = new_messages.features.map(feature => feature.properties.item_token);
  let result = js_intersect(a, b);
  if(result.length < 10){
    messages = new_messages;
    alertify.success('New message inbox');
    $('.icon-message > i').css('color','red');
  }

}

function prepare_open_messages(){

  // onsole.log('btn_routing_made_project')
  let item_addon = 'open_messages';
  let item_dlg = 'dlg_'+item_addon;

  let meta = {
    'properties':{
      'g_slug': item_dlg+'_single',
      'g_label': 'Last messages',
      'g_template': 'template_by_slug',
      'g_description': null
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  sessionStorage.this_dialog_lyr=item_dlg;
  sessionStorage.this_dialog_slug=item_dlg+'_single';

  create_dialog2(sessionStorage.this_dialog_slug);

  return;

}

dyn_functions['template_by_slug_'+'dlg_'+'open_messages'+'_single'] = function(){

  let dlg_slug = 'dlg_'+'open_messages'+'_single';

  $('.dlg_'+dlg_slug+'_body').html('');

  let c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //box button tab
  c = ''+
    '<div class="ajs_body_head" pid="999" ></div>'+
    '<div class="clearfix"></div>'+
    '';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //--

  c =  ''
    +'<div>'
      +'<div class="col-btn-attrs" style="text-align:center;">'
      +'</div>'
    +'</div>';
  $('.dlg_'+dlg_slug+'_body').append(c);
  
  fill_messages();

}

function fill_messages(){

  let dlg_slug = 'dlg_'+'open_messages'+'_single';

  if($(window).width() >= 768) {
    $('.ajs-dialog').css('max-height','800px');
    $('.ajs-body').css('overflow','auto');
  }

  let tabs = [
    {'g_slug':'tab1','g_label':'Messages','btnItem':'-'}
  ];

  $('.col-btn-attrs').html('');
  
  let iTab = 0;
  tabs.forEach(e => {
    iTab++;
    let tab=e.g_slug;
    let label=e.g_label;
    // _onsole.log('dlg_template:explorer_simple > '+g_slug);
    let c = ''
      +'<span class="box-'+e.btnItem+'" '+
      'style="margin-left:2.5px;margin-right:2.5px;"></span>'
    $('.col-btn-attrs').append(c);

    let display = '';
    if(iTab==1){
      $('#'+e.btnItem).addClass('active');
      display ='display:block;';
    }
    else{
      display ='display:none;';
    }
    $('.box_'+tab+'').remove();
    c =  ''
      +'<div class="clearfix"></div>'
        +'<div class="box-tab box_'+tab+'" style="'+display+'">'
          +'<div class="boxItem">'
            +'<div ' 
              +'style="padding:3px;">'
              +'<div class="content_'+tab+'">'
              +'</div>'
            +'</div>'
          +'</div>'
        +'</div>'
      +'';
    $('.dlg_'+dlg_slug+'_body').append(c);

    c = ''+
      '<div class="accordion" id="box_a295main-'+tab+'">'+
      '</div>'+
      '';
    $('.content_'+tab+'').append(c);
    let pS = {
      'g_slug':'list-of-messages',
      'g_label':'Messages',
    };
    $('#box_a295main-'+tab+'').append(''+
      '<div class="accordion-item box-tab box_a295main_'+pS.g_slug+'" '+
        '>'+
        '<h2 class="accordion-header">'+
          '<button '+
            'class="accordion-button collapsed title_a295main_'+pS.g_slug+'" '+
            'type="button" '+
            'data-bs-toggle="collapse" data-bs-target="#flush-'+pS.g_slug+'" '+
            'aria-expanded="false" aria-controls="flush-'+pS.g_slug+'" '+
            '>'+
            '<b>'+pS.g_label+'</b>'+ // Accordion Item #1
          '</button>'+
        '</h2>'+
        '<div id="flush-'+pS.g_slug+'" '+
          'class="accordion-collapse collapse show" '+
          'data-bs-parent="#accordionFlushExample">'+
          '<div '+
            'class="accordion-body content_a295main_'+pS.g_slug+'" '+
            '><!--Placeholder ...--></div>'+
        '</div>'+
      '</div>'+
      '');

    pS = {
      'g_slug':'list-of-messages-geo',
      'g_label':'Messages in View',
    };
    $('#box_a295main-'+tab+'').append(''+
      '<div class="accordion-item box-tab box_a295main_'+pS.g_slug+'" '+
        '>'+
        '<h2 class="accordion-header">'+
          '<button '+
            'class="accordion-button collapsed title_a295main_'+pS.g_slug+'" '+
            'type="button" '+
            'data-bs-toggle="collapse" data-bs-target="#flush-'+pS.g_slug+'" '+
            'aria-expanded="false" aria-controls="flush-'+pS.g_slug+'" '+
            '>'+
            '<b>'+pS.g_label+'</b>'+ // Accordion Item #1
          '</button>'+
        '</h2>'+
        '<div id="flush-'+pS.g_slug+'" '+
          'class="accordion-collapse collapse show" '+
          'data-bs-parent="#accordionFlushExample">'+
          '<div '+
            'class="accordion-body content_a295main_'+pS.g_slug+'" '+
            '><!--Placeholder ...--></div>'+
        '</div>'+
      '</div>'+
      '');
    let f = []
    // let lyrs = g_meta.geovar_map.features[0].properties.g_lyr;
    messages.features.forEach(item => {
        // onsole.log('prepare ...',obj_lyr);
      let p = item.properties;
  
      let tmp = {
        'g_slug':p.item_token,
        'g_label':p.msg,
        'item_token':p.item_token,
        'crop':p.crop,
        'post_date':p.post_date,
        'container':'list-of-messages',
        'g_attributes':p.g_attributes
      }
      f.push(tmp);
      
    });

    messages_view.forEach(item => {
      // onsole.log('prepare ...',obj_lyr);
      let p = item.properties;

      let tmp = {
        'g_slug':p.item_token,
        'g_label':p.msg,
        'item_token':'item_token',
        'crop':p.crop,
        'post_date':p.post_date,
        'container':'list-of-messages-geo',
        'g_attributes':p.g_attributes
      }
      f.push(tmp);
      
    });

    let icon = ''+
    '<span style="'+
      'font-size: 150%;'+
      '">'+
      '<i class="bi bi-box-arrow-right"></i></span>'+
    '';
    f.forEach(element => {
      
      let p = element;
      let bgcolor = '#fff';
      if(p.g_slug == localStorage.getItem('a295_lyr')){
        bgcolor = '#ffdc00';
      }    

      $('.content_a295main_'+p.container).append(''+
        '<div class="display-table" style="'+
          'border-bottom: 1px solid grey;'+
          'min-height: 40px;'+
          'width: 100%;'+
          '">'+
          '<div style="'+
            'width: 100%;'+
            '" '+
            '>'+ //tr
            //cell
            '<div style="background-color:'+bgcolor+';width: 100%;">'+
              '<span><img src="'+
                SOURCE_PATH+'icon/sunflower/'+p.crop+'.png'+
                '" /></span>&nbsp;'+
              p.g_label+
            '</div>'+
            //cell
            '<div style="background-color:'+bgcolor+';min-width: 100px;">'+
              '<a href="'+HOME_PROJECT+'/project/null_island/?item='+p.item_token+''+
                '">'+
                moment(p.post_date).fromNow() +
              '</a>'+
            '</div>'+
            //cell
            '<div class="btn_a295main_layer" '+
              'style="'+
                'cursor: pointer;'+
                'width: 40px;'+
                'text-align: right;'+
              '" '+
              'g_slug="'+p.g_slug+'" '+ //tr
              'lat="'+p.g_attributes.lat+'"'+
              'lng="'+p.g_attributes.lng+'"'+
              '">'+
              icon+
            '</div>'+ 
          '</div>'+
        '</div>'+
        '');

    });

    $('.btn_a295main_layer').on('click',function(){

      mymap.setCenter([
        parseFloat($(this).attr('lng')),
        parseFloat($(this).attr('lat'))
      ]);
      alertify.infoDialog().destroy();
      mymap.setZoom(17);

    });

  });

}

var crops_filtered = crops;

// !dev change `slug` to `optIn`
f_btn[ 'btn_show_legend']=function(slug){

  if(show_legend==0){
    $('body').append(''+
      '<div id="dlg_show_legend" '+
        'class="display-table card" '+ // class
        'style="' +
          'bottom: 50px;'+
          'width: 225px;'+
          'position: fixed;'+
          'left: 50%;'+
          'transform: translate(-50%, 0);'+
        '" '+ // style
        '>'+
        '<div>'+
          '<div class="box-legend" style="width: 100%;">'+
            '<h5 class="card-title">'+
              'Legend'+
            '</h5>'+
            '<ul class="list-group list-group-flush">'+
            '</ul>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '');
    show_legend = 1;

    crops.forEach(element => {

      let base_url = SOURCE_PATH+'icon/sunflower/';

      let class_prop ='legend-hide';
      let color_prop ='gray';
      if(crops_filtered.includes(element)){
        class_prop = 'legend-show';
        color_prop ='white';
      }
      $('.box-legend > .list-group').append(''+
        '<li class="legend-item '+class_prop+' item-'+element+'" '+
          'slug="'+element+'" '+
          'style="'+
            'display: inline;'+
            'border-radius: 3px;'+
            'margin-bottom: 2px;'+
            'cursor: pointer;'+
            'background-color: '+color_prop+';'+
          '"><span style="'+
          'width: 20px;'+
          'display: inline-table;'+
          'text-align: center;'+
          '"><img src="'+
          base_url+element+'.png'+
        '" /></span>&nbsp;'+  
        ''+element.charAt(0).toUpperCase() + element.slice(1) + '</li>'+
      '');

    });

    $('.legend-item').on('click',function(){

      if($(this).hasClass('legend-show')){
        if(crops_filtered.length == 1){
          alertify.success('Show at least one crop');
          return;
        }        
        $(this).removeClass('legend-show');
        $(this).addClass('legend-hide');
        $(this).css('background-color','gray');
      }
      else{
        $(this).removeClass('legend-hide');
        $(this).addClass('legend-show');
        $(this).css('background-color','white');
      }

      crops_filtered = [];
      crops.forEach(element => {
        if($('.item-'+element).hasClass('legend-show')){
          crops_filtered.push(element);
        }
      });

      let tmp = ['any'];

      crops_filtered.forEach(element => {
        tmp.push(['==', 'crop', element]);
      });

      mymap.setFilter(
        'id-null_island_items', 
        tmp
      );

      popolate_crops_count();

    });

  }
  else{
    $('#dlg_show_legend').remove();
    show_legend = 0;
  }
}