$(document).ready(function() {

  // _onsole.log('Ready-8!');
  //update_drag_coords();
  //--NEW
  //$('.box-add-point').html('<button id="btn-add-point">+</button>');
  //var dataString = get_var;

  //$('#btn-add-point').on('click',function(){
  //  add_point();
  //});
  prepare_a236();
  //generic_api(dataString,'show_table');
}); //$(document).ready

var dyn_add_poi = [];
var list_add_poi=[];

var a236_lyrs=[];

const a236_slug='addPoi3';//'infoplus';
//list_mapclick.push(a236_slug);

function prepare_a236(){

  g_meta.geovar_addon.features.push({
    "properties": {
      "g_slug" : a236_slug,
      "addon_status" : "enabled",
      "mapclick_status" : "disabled",
      "point_miner" : "disabled",
      "polyline_miner" : "disabled",
      "polygon_miner" : "disabled",
    }
  });

  let item_btn = 'btn_addpoint';//'btn_infolus';
  let obj_btn=g_meta.geovar_button.features.filter(({properties}) => properties.g_slug === item_btn);

  $('.box-addpoint').html('<div '
    +'class="box-btn_addpoint box-info-2-btn d-grid gap-2" '
    +'style="margin-top:5px;"></div>');
  create_button('btn_addpoint');

}

f_btn['btn_addpoint']=function(){ //f_btn['btn_infolus']

  let item_addon = a236_slug;//'infoplus';
  let obj_fileterd=g_meta.geovar_addon.features.filter(({properties}) => properties.g_slug === item_addon);
  let obj_addon = obj_fileterd[0];

  if(obj_addon.properties.mapclick_status=='disabled'){

    list_mapclick=[];
    list_mapclick.push(a236_slug);

    enable_a236();

  }
  else{

    // list_mapclick=[];

    // if(list_mapclick_default.length>0){
    //   list_mapclick.push(list_mapclick_default[0]);
    // }
    
    disable_a236();

  }
  //_onsole.log(obj_addon.properties);
  return;

}

function save_point_lyr(optIn){

  let myminer = optIn.myminer;

  //var destination_layer='lyr035';
  var tool_layer='vlyr007';

  sessionStorage.current_tool='add_point';
  sessionStorage.f_tool_callback='exe_insert_point_vlyr007_1';
  //sessionStorage.destination_layer=destination_layer;
  sessionStorage.tool_layer=tool_layer;

  //f_btn['modify_lyr_single_for_dlg'](sessionStorage.destination_layer,tool_layer);
  /* 
  let slug = sessionStorage.destination_layer;

  //_onsole.log('modify_lyr_single_for_dlg',slug);
  //_onsole.log('modify_lyr_single_for_dlg',tool_layer);
  let destLyr=slug; //LYR2
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === destLyr);
  let obj_destLyr=this_obj[0].properties;

  //_onsole.log('save_point_destLyr ' + destLyr,obj_destLyr)

  let o2 = g_meta.geovar_lyr.features
  let this_obj2=o2.filter(({properties}) => properties.g_slug === tool_layer);
  let obj_tool_layer=this_obj2[0].properties;

  //_onsole.log('save_point_destLyr ' + tool_layer,obj_tool_layer)

  var table_slug=obj_destLyr.g_tables[0];
  // _onsole.log('table_slug:'+table_slug);
  // g_meta.geovar_map_tb.forEach(obj => {
  //   // _onsole.log(obj.name)
  //   if(obj.name==table_slug){
  //     this_tb[table_slug]=obj.features;
  //   }
  // });
  // _onsole.log(this_tb[table_slug]);

  g_ds = {
    geovar:"geovar_master",//obj_maps
    slug:table_slug,//filter
    type:'single_object'//'item' or 'single_object' or 'full_object'
  }
  let objItem = get_geovar_obj(g_ds);

  //table_schema
  obj_tool_layer.last_r=new Array();
  obj_tool_layer.last_r.features=[];
  obj_tool_layer.last_r.features.push(objItem);

  sessionStorage.this_dialog_lyr=tool_layer;
  sessionStorage.this_dialog_slug=tool_layer+'_2_single';//'lyr035_single'
  //_onsole.log('modify_lyr_single_for_dlg',sessionStorage.this_dialog_slug);
 */
  let opt = {
    "slug": tool_layer,//'vlyr007' optIn.ct_slug,
    "dlgSlug": tool_layer+"_2_single",//'vlyr007' optIn.ct_slug,
    //"g_description": null,
    "dlgTitle": "Insert ...",
    //"g_template": "template_by_slug"
    "callback":"dlg_vlyr007_2_single",
    myminer:myminer,
    item_lyr:optIn.item_lyr,
    last_r:optIn.last_r
  }

  create_dialog3(opt);

}

dyn_functions['exe_insert_point_vlyr007_1'] = function(dataString){

  // _onsole.log('sessionStorage.f_tool_callback');
  dataString['lat']=sessionStorage.place_lat;
  dataString['lng']=sessionStorage.place_lng;
  dataString['fn_group']='geodata';
  dataString['action']='modify_data';
  dataString['collection']='insert_point';
  dataString['lyr']=sessionStorage.destination_layer;
  dataString['GEOM']=1;
  generic_api(dataString,'insert_point_vlyr007');

}

dyn_functions['succ_insert_point_vlyr007'] = function(r){

  // _onsole.log(r);
  switch_on_lyr_b(sessionStorage.destination_layer);
  //remove_lyr('vlyr007');
  reset_addpoint_1();

}

f_btn['btn_cancelpoint']=function(){

  reset_addpoint_1();

}

function reset_addpoint_1(){
  remove_lyr('vlyr007');
  //prepare_a236();
  $('.box-editing2').css('display','none');
  $('.box-editing2').html('');
}

dlg_close_functions['vlyr007_2_single'] = function(){
  return;
}

dyn_functions['dlg_vlyr007_2_single'] = function(optIn){

  //_onsole.log('dlg_vlyr007_2_single',optIn);

  //_onsole.log('dlg_vlyr007_2_single')

  let a236_slug='vlyr007_2';

  var c = '<div '
    +'class="mainboxItem" '
    +'style="margin-top:5px;"></div>';
  $('.dlg_'+a236_slug+'_single'+'_body').append(c);

  //box button tab
  var c = ''
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  $('.dlg_'+a236_slug+'_single'+'_body').append(c);

  var c = '<div>'
    +'<div class="col-btn-attrs" '
      +'style="text-align:left;"></div>'
  +'</div>';
  $('.dlg_'+a236_slug+'_single'+'_body').append(c);

  //box tab1
  c += '<div '
    +'class="dlg_panel panel-tab1" '
    +'style="display:block;font-family:var(--wd-fonts-secondary);">';
  //c += '<p>TAB1</p>';
  //c+='View event in Google Analytics as "mapclick": ' + sessionStorage.mapclick_lat+'|'+sessionStorage.mapclick_lng
  c += '</div><!--tab1-->';
  
  $('.dlg_'+a236_slug+'_single'+'_body').append(c);

  //_onsole.log('template_by_slug_vlyr007_single2 2',sessionStorage.destination_layer)
  let o = g_meta.geovar_map.features;
  let this_obj=o.filter(({properties}) => properties.g_slug === MAPSLUG);
  let obj_map=this_obj[0].properties;
  let obj_addon=obj_map.g_addon.filter((x) => x.addon === 'addon236')[0];

  //-- CREATE NEW ROW MAP FIELDS WITH BOX
  opt = {
    "slug": a236_slug,//optIn.ct_slug,
    "grid": "col-12",
  }
  $('.panel-tab1').append(part_ct_params(opt));

  //-- CREATE FORM GROUP AND LABEL
  opt = {
    "label":"Scegliere tipo di inserimento",
    "slug": a236_slug,//optIn.ct_slug,
    //"label": "Map filter",//ONLY NOT DEFINED IN objCol
    //"pCol": pCol,
  }
  $('.box-'+a236_slug).append(
    append_field_label_2(opt)
  );

  let masterCategory ='';

  if(optIn.myminer=='point_miner'){
    masterCategory  = obj_addon.masterCategory["point"];
  }
  else if(optIn.myminer=='polyline_miner'){
    masterCategory  = obj_addon.masterCategory["polyline"];
  }
  else if(optIn.myminer=='polygon_miner'){
    masterCategory  = obj_addon.masterCategory["polygon"];
  }

  masterCategory.forEach(itemLyrCat => {

    g_ds = {
      geovar:"geovar_lyr",//obj_maps
      slug:itemLyrCat,//filter
      type:'single_object'//,//'item' or 'single_object' or 'full_object'
    }
    let objItem = get_geovar_obj(g_ds);

    //_onsole.log(objItem.g_label)

    $('.box-'+a236_slug).append(''
      +'<div class="box-btn_'+objItem.g_slug+' d-grid gap-2"></div>'
      +''
    );

    let opt = {
      itemSlug:'btn_'+objItem.g_slug+'',
      itemLabel: {
        "default":objItem.g_label,//"it":"CHIUDI","en":"CLOSE"
      },//gLang.label_close,
      itemDescription: {"default":"..."},
      //itemLabel:'<i class="fa fa-ellipsis-h" aria-hidden="true"></i>',
      itemClass:'btn-sm btn-outline-dark', // btn-main-sidebar',
      //btnOnClick:'close',
      itemType:'button', //form-switch
      itemDisabled:false,
      itemStyle:'margin-top: 5px;border: 0px;', //backgrund-color:red;
      g_group: ["public"],
      g_responsive: "both", //both, mobile, desktop
      g_callback: 'dlg_vlyr007_2_selected_lyr', // same as btnSlug
      itemLyr:objItem.g_slug,
      last_r:optIn.last_r
    };
    create_button_2(opt);

  });

}

f_btn['restore_vlyr007_2']=function(optIn){

  $('#row-vlyr007_2_collapse').remove();
  $('#row-'+optIn.itemLyr).remove();
  $('#row-vlyr007_2').css('display','');

}

f_btn['dlg_vlyr007_2_selected_lyr']=function(optIn){

  let opt = new Array();

  $('#row-vlyr007_2').css('display','none');

  //-- CREATE NEW ROW MAP FIELDS WITH BOX
  $('#row-vlyr007_2_collapse').remove();

  opt = {
    "slug": 'vlyr007_2_collapse',//optIn.ct_slug,
    "grid": "col-2-10",
  }

  $('.panel-tab1').append(part_ct_params(opt));

  $('#row-vlyr007_2_collapse > .col-10').css('display','table');
  $('#row-vlyr007_2_collapse > .col-10').css('height','41px');

  $('.box-vlyr007_2_collapse-A').append(''
    +'<div class="box-btn_'+'vlyr007_2_collapse'+' d-grid gap-2"></div>'
    +''
  );

  opt = {
    itemSlug:'btn_'+'vlyr007_2_collapse',
    itemLabel: {
      "default":'<i class="fa fa-bars" aria-hidden="true"></i>',//"it":"CHIUDI","en":"CLOSE"
    },//gLang.label_close,
    itemDescription: {"default":"..."},
    //itemLabel:'<i class="fa fa-ellipsis-h" aria-hidden="true"></i>',
    itemClass:'btn-sm btn-dark', // btn-main-sidebar',
    //btnOnClick:'close',
    itemType:'button', //form-switch
    itemDisabled:false,
    itemStyle:'', //backgrund-color:red;
    g_group: ["public"],
    g_responsive: "both", //both, mobile, desktop
    g_callback: 'restore_vlyr007_2', // same as btnSlug
    itemLyr:optIn.itemLyr
  };
  create_button_2(opt);

  //--

  g_ds = {
    geovar:"geovar_lyr",//obj_maps
    slug:optIn.itemLyr,//filter
    type:'single_object'//,//'item' or 'single_object' or 'full_object'
  }
  let objLyr = get_geovar_obj(g_ds);

  ds = {
    geovar:'geovar_tb',
    schema:objLyr.g_tables[0],//filter
    type:'table_schema'//,//'item' or 'single_object' or 'full_object'
  }
  let objCols = get_geovar_obj(ds);

  optIn.ct_slug=optIn.itemLyr;

  $('#row-'+optIn.ct_slug).remove();

  //-- CREATE NEW ROW FOR LIST WITH BOX
  opt = {
    "slug": optIn.ct_slug,
    "grid": "col-12",
  }
  $('.panel-tab1').append(part_ct_params(opt));

  //--

  $('.box-vlyr007_2_collapse-B').append(''
    +'<div class="box-btn_'+'vlyr007_2_lyr_title'+'" '
      +'style="'
        +'text-align: center;'
        +'font-size: 18px;'
        +'font-weight: 900;'
      +'">'
      +objLyr.g_label
    +'</div>'
    +''
  );

  $('.box-vlyr007_2_collapse-B').css('display','table-cell');
  $('.box-vlyr007_2_collapse-B').css('vertical-align','middle');
  $('.box-vlyr007_2_collapse-B').css('border-bottom','2px solid');

  //--

  objCols.features.forEach(objCol => {

    let pCol = objCol.properties;

    //-- CHOOSE VISIBLE COLUMNS
    if(pCol.g_meta===1){

      //_onsole.log(pCol);
      //let valItem = objLyr[pCol.g_slug];

      //-- CREATE FORM GROUP AND LABEL
      opt = {
        "slug": pCol.g_slug,
        //"label": "Map filter",//ONLY NOT DEFINED IN objCol
        "pCol": pCol,
      }
      $('.box-'+optIn.ct_slug).append(
        append_field_label_2(opt)
      );

      //-- MODULE
      if(pCol.g_module){
        pCol.g_module.forEach(el3 => {
          $('#group-'+pCol.g_slug).append(''
            +'<span module="'+el3+'" '
              +'class="field-module module-'+pCol.g_slug+'-'+el3+'">'
              +'<i class="fa fa-cubes" aria-hidden="true"></i>'
            +'</span>'
          +'');
        });
      }

      //-- INPUT FIELD
      opt = {
        "slug": pCol.g_slug,
        "pCol": pCol,
        "objItem": [],
      }
      objField_omnivore(opt);

      //-- DESCRIPTION
      if( pCol.g_description && pCol.g_description!='none') {
        $('#group-'+pCol.g_slug).append('<small id="emailHelp" class="form-text text-muted">'+pCol.g_description+'</small>');
      }
      //--

      if(pCol.g_callback=='none'){

      }//callback none
      else{
        //-- CREATE FORM GROUP AND LABEL
        opt = {
          "ct_slug": optIn.ct_slug,
          "pCol": pCol,
          "objItem": [],
        }
        dlg_field_template[pCol.g_callback](opt);
      }
    }//no g_meta

  });//objCols.features.forEach(objCol => {

  //-- ADD API PARAMS

  let apiParams = [
    {"slug":"fn_group","params_control": true,"objItem":{"fn_group":"geodata"},"pCol":{"form_type":"unique"}},
    {"slug":"action","params_control": true,"objItem":{"action":"modify_data"},"pCol":{"form_type":"unique"}},
    {
      "slug":"collection",
      "params_control": true,
      "objItem":{"collection":"insert_item_lyr_table"},
      "pCol":{"form_type":"unique"}
    },
    {
      "slug":"table",
      "params_control": true,
      "objItem":{
        "table":objLyr.g_tables[0]
      },
      "pCol":{"form_type":"unique"}
    }
  ]

  apiParams.forEach(opt => {

    opt.label=opt.slug;

    $('.box-'+optIn.ct_slug).append(
      append_field_label_2(opt)
    );

    $('#group-'+opt.slug).append(
      append_simple_field_2(opt)
    );

    $('#group-'+opt.slug).css('display','none');

  });

  let geojsonParams = [
    {"slug":"last_r","params_control": true,"objItem":{
        "last_r":optIn.last_r
      },
      "pCol":{
        "form_type":"unique",
        "data_type":"json"
      }
    }
  ]

  geojsonParams.forEach(opt => {

    opt.label=opt.slug;

    $('.box-'+optIn.ct_slug).append(
      append_field_label_2(opt)
    );

    $('#group-'+opt.slug).append(
      append_textarea_field(opt)
    );

    $('#group-'+opt.slug).css('display','none');

  });

  $('.ajs-footer-btn2').append(''
    +'<span class="box-btn_a236_save_dlg"></span>'
  +'');

  opt = {
    itemSlug:'btn_a236_save_dlg',
    itemLabel: {
      "default":"SAVE",
      "it":"SALVA",
      "en":"SAVE"
    },//gLang.label_close,
    itemDescription: {"default":"..."},
    //itemLabel:'<i class="fa fa-ellipsis-h" aria-hidden="true"></i>',
    itemClass:'btn-sm btn-dark', // btn-main-sidebar',
    //btnOnClick:'close',
    itemType:'button', //form-switch
    itemDisabled:false,
    itemStyle:'', //backgrund-color:red;
    g_group: ["public"],
    g_responsive: "both", //both, mobile, desktop
    //"g_callback": 'btn_save_point', // same as btnSlug
    itemLyr:optIn.itemLyr
  };
  create_button_2(opt);

}

//--

function enable_a236(){

  let opt = new Array();

  //btn_infolus
  $('#btn_addpoint').css('background-color','yellow');

  $('.box-editing2').css('display','block');
  $('.box-editing2').css('justify-content','center');
  $('.box-editing2').html(''
    +'<div class="col-auto ct-editing2" style="padding: 5px 0px;">'
      +'<span '
        +'class="box-btn_a236_by_point" '
        +'></span>'
      +'<span '
        +'class="box-btn_a236_by_polyline" '
        +'style="margin-left:5px;"></span>'
      +'<span '
        +'class="box-btn_a236_by_polygon" '
        +'style="margin-left:5px;"></span>'
      +'<span '
        +'class="box-btn_a236_by_close" '
        +'style="margin-left:5px;"></span>'
    +'</div>'
  +'');

  //create_button('btn_a236_by_point');
  //create_button('btn_a236_by_polyline');
  //create_button('btn_a236_by_polygon');
  //create_button('btn_a236_by_close');

  let optGroup = [
    {
      itemSlug:'btn_a236_by_point',
      itemLabel:'<i class=\"fa fa-map-pin\" aria-hidden=\"true\"></i>'
    },
    {
      itemSlug:'btn_a236_by_polyline',
      itemLabel:'<i class=\"fa fa-sliders\" aria-hidden=\"true\"></i>'
    },
    {
      itemSlug:'btn_a236_by_polygon',
      itemLabel:'<i class=\"fa fa-object-ungroup\" aria-hidden=\"true\"></i>'
    },
    {
      itemSlug:'btn_a236_by_close',
      itemLabel:'<i class=\"fa fa-times\" aria-hidden=\"true\"></i>'
    }
  ];

  optGroup.forEach(optIn => {
    opt = {
      itemSlug:optIn.itemSlug+'',
      itemLabel: {
        "default":optIn.itemLabel,//"it":"CHIUDI","en":"CLOSE"
      },//gLang.label_close,
      itemDescription: {"default":"..."},
      //itemLabel:'<i class="fa fa-ellipsis-h" aria-hidden="true"></i>',
      itemClass:'btn-sm btn-outline-dark btn-main-sidebar', // btn-main-sidebar',
      //btnOnClick:'close',
      itemType:'button', //form-switch
      itemDisabled:false,
      itemStyle:'width:40px;', //backgrund-color:red;
      g_group: ["public"],
      g_responsive: "both", //both, mobile, desktop
      //g_callback: 'dlg_vlyr007_2_selected_lyr', // same as btnSlug
      //itemLyr:objItem.g_slug
    };
    create_button_2(opt);
  });

  //--

  //on start
  let item_addon = a236_slug;//'infoplus';

  list_mapclick=[];
  list_mapclick.push(a236_slug);

  let obj_fileterd=g_meta.geovar_addon.features.filter(({properties}) => properties.g_slug === item_addon);
  let obj_addon = obj_fileterd[0];

  obj_addon.properties.mapclick_status='enabled';

  obj_addon.properties.point_miner='enabled';
  $('#btn_a236_by_point').css('background-color','yellow');

}

function disable_a236(){

  //btn_infolus
  $('#btn_addpoint').css('background-color','white');

  $('.box-editing2').css('display','none');
  $('.box-editing2').html('');

  let item_addon = a236_slug;//'infoplus';
  let obj_fileterd=g_meta.geovar_addon.features.filter(({properties}) => properties.g_slug === item_addon);
  let obj_addon = obj_fileterd[0];

  obj_addon.properties.mapclick_status='disabled';

  obj_addon.properties.point_miner='disabled';
  obj_addon.properties.polyline_miner='disabled';
  obj_addon.properties.polygon_miner='disabled';

  mymap.removeLayer(geo_lyr['vlyrsit003']);
  geo_lyr['vlyrsit003'].clearLayers();
  mymap.removeLayer(geo_lyr['vlyrsit004']);
  geo_lyr['vlyrsit004'].clearLayers();
  mymap.removeLayer(geo_lyr['vlyrsit005']);
  geo_lyr['vlyrsit005'].clearLayers();
  mymap.removeLayer(geo_lyr['vlyrsit006']);
  geo_lyr['vlyrsit006'].clearLayers();

  //_onsole.log('succ_show_response_a236',list_mapclick);
  list_mapclick=[];

  if(list_mapclick_default.length>0){
    list_mapclick.push(list_mapclick_default[0]);
  }
  //_onsole.log('succ_show_response_a236',list_mapclick);

}

f_btn['btn_a236_by_point']=function(slug){

  $('.box-btn_a236_block_inspect').remove();

  $('#btn_a236_by_point').css('background-color','yellow');
  $('#btn_a236_by_polyline').css('background-color','white');
  $('#btn_a236_by_polygon').css('background-color','white');

  let item_addon = a236_slug;//'infoplus';
  let obj_fileterd=g_meta.geovar_addon.features.filter(({properties}) => properties.g_slug === item_addon);
  let obj_addon = obj_fileterd[0];

  obj_addon.properties.point_miner='enabled';
  obj_addon.properties.polyline_miner='disabled';
  obj_addon.properties.polygon_miner='disabled';

  mymap.removeLayer(geo_lyr['vlyrsit005']);
  geo_lyr['vlyrsit005'].clearLayers();
  mymap.removeLayer(geo_lyr['vlyrsit006']);
  geo_lyr['vlyrsit006'].clearLayers();

  a236_coords=[];
  a236_coords_p=[];
  a236_coords_p2=[];
  a236_coords_last=[];
  a236_coords_tmp=[];
  a236_coords_start=[];

}

f_btn['btn_a236_by_polyline']=function(slug){

  $('.box-btn_a236_block_inspect').remove();

  $('#btn_a236_by_point').css('background-color','white');
  $('#btn_a236_by_polyline').css('background-color','yellow');
  $('#btn_a236_by_polygon').css('background-color','white');

  let item_addon = a236_slug;//'infoplus';
  let obj_fileterd=g_meta.geovar_addon.features.filter(({properties}) => properties.g_slug === item_addon);
  let obj_addon = obj_fileterd[0];

  obj_addon.properties.point_miner='disabled';
  obj_addon.properties.polyline_miner='enabled';
  obj_addon.properties.polygon_miner='disabled';

  mymap.removeLayer(geo_lyr['vlyrsit003']);
  geo_lyr['vlyrsit003'].clearLayers();
  mymap.removeLayer(geo_lyr['vlyrsit004']);
  geo_lyr['vlyrsit004'].clearLayers();
  mymap.removeLayer(geo_lyr['vlyrsit006']);
  geo_lyr['vlyrsit006'].clearLayers();

  a236_coords=[];
  a236_coords_p=[];
  a236_coords_p2=[];
  a236_coords_last=[];
  a236_coords_tmp=[];
  a236_coords_start=[];

}

f_btn['btn_a236_by_polygon']=function(slug){

  $('.box-btn_a236_block_inspect').remove();

  $('#btn_a236_by_point').css('background-color','white');
  $('#btn_a236_by_polyline').css('background-color','white');
  $('#btn_a236_by_polygon').css('background-color','yellow');

  let item_addon = a236_slug;//'infoplus';
  let obj_fileterd=g_meta.geovar_addon.features.filter(({properties}) => properties.g_slug === item_addon);
  let obj_addon = obj_fileterd[0];

  obj_addon.properties.point_miner='disabled';
  obj_addon.properties.polyline_miner='disabled';
  obj_addon.properties.polygon_miner='enabled';

  mymap.removeLayer(geo_lyr['vlyrsit003']);
  geo_lyr['vlyrsit003'].clearLayers();
  mymap.removeLayer(geo_lyr['vlyrsit004']);
  geo_lyr['vlyrsit004'].clearLayers();
  mymap.removeLayer(geo_lyr['vlyrsit006']);
  geo_lyr['vlyrsit006'].clearLayers();

  a236_coords=[];
  a236_coords_p=[];
  a236_coords_p2=[];
  a236_coords_last=[];
  a236_coords_tmp=[];
  a236_coords_start=[];

}

f_btn['btn_a236_by_close']=function(slug){
  disable_a236();
}

//--

var a236_coords=[];
var a236_coords_p=[];
var a236_coords_p2=[];
var a236_coords_last=[];
var a236_coords_tmp=[];
var a236_coords_start=[];

//--

function a236_update_coords(latlng){

  sessionStorage.mapclick_lat=latlng[1];
  sessionStorage.mapclick_lng=latlng[0];

  //let latlng = [latlng[1],latlng[0]];

  // var latlngs2 = [
  //     [45.51, -122.68],
  //     [37.77, -122.43],
  //     [34.04, -118.2]
  // ];

  //_onsole.log(a236_coords)
  //_onsole.log(latlngs2)
  // var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);

  a236_coords.push(latlng);

  a236_coords_p.push(latlng);

  a236_coords_last = latlng;

  if(a236_coords.length==1){

    a236_coords_start = latlng;

  }

}

function a236_update_last_r(item_lyr){

  let latlng = [
    sessionStorage.mapclick_lng,
    sessionStorage.mapclick_lat
  ];

  let r = {};
  r.type = "FeatureCollection";
  r.features = [];
  r.features.push({
      "type": "Feature",
      "properties": {"type":"single_point"},
      "geometry":{
      "type": "Point",
      "coordinates": latlng
  }});

  let o = g_meta.geovar_lyr.features;
  let this_obj=o.filter(({properties}) => properties.g_slug === item_lyr);
  let obj_lyr=this_obj[0].properties;

  obj_lyr.last_r=r;

  return r;

}

dyn_mapclick[a236_slug] = function(e){

  let item_addon = a236_slug;//'infoplus';
  let obj_fileterd=g_meta.geovar_addon.features.filter(({properties}) => properties.g_slug === item_addon);
  let obj_addon = obj_fileterd[0];

  if(obj_addon.properties.point_miner=='enabled'){
    //_onsole.log('a236: point_miner');
  }
  else if(obj_addon.properties.polyline_miner=='enabled'){
    //_onsole.log('a236: polygon_miner');
  }
  else if(obj_addon.properties.polygon_miner=='enabled'){
    //_onsole.log('a236: polygon_miner');
  }
  else{ 
    //_onsole.log('a236: no miner');
    return;
  }

  a236_update_coords([e.latlng.lng,e.latlng.lat]);

  //_onsole.log('mapclick_lat: '+sessionStorage.mapclick_lat);

  //mymap.removeLayer(lyr_polygon);
  //geo_lyr['lyr_polygon'].clearLayers();
  //mymap.removeLayer(geo_lyr['lyr_polyline']);
  //geo_lyr['lyr_polyline'].clearLayers();

  if(obj_addon.properties.point_miner=='enabled'){

    let item_lyr = 'vlyrsit003';

    geo_lyr[item_lyr].clearLayers();

    $('.box-btn_a236_block_inspect').remove();

    let r = a236_update_last_r(item_lyr);

    //_onsole.log(r);
    let geojson = L.geoJSON(r,{
      onEachFeature:function(feature, layer){
        layer.on('dragend', function(e){
          $('.box-btn_a236_block_inspect').remove();
          //document.getElementById("lat1").value = layer.getLatLng().lat;
          //document.getElementById("lng1").value = layer.getLatLng().lng;
          sessionStorage.mapclick_lng = layer.getLatLng().lng;
          sessionStorage.mapclick_lat = layer.getLatLng().lat;
          let r = a236_update_last_r(item_lyr);
          let opt = {
            "myminer":"point_miner",
            "item_lyr":item_lyr,
            "last_r":r,
          };

          add_btn_a236_block_inspect(opt);
        })
      },
      pointToLayer: geo_lyr_style[item_lyr],
      pane:item_lyr+'_pane'
    });

    geo_lyr[item_lyr].addLayer(geojson);
    geo_lyr[item_lyr].addTo(mymap);

    let opt = {
      "myminer":"point_miner",
      "item_lyr":item_lyr,
      "last_r":r,
    };

    add_btn_a236_block_inspect(opt);

  }
  else if(obj_addon.properties.polyline_miner=='enabled'){

    //_onsole.log('polyline_miner');

    let r = {};
    r.type = "FeatureCollection";
    r.features = [];

    //_onsole.log(a236_coords);
    if(a236_coords.length==1){

      r.features.push({
          "type": "Feature",
          "properties": {"type":"start_point"},
          "geometry":{
          "type": "Point",
          "coordinates": [
            sessionStorage.mapclick_lng,
            sessionStorage.mapclick_lat
          ]
      }});
      //_onsole.log(r);
      let geojson = L.geoJSON(r,{
        pointToLayer: geo_lyr_style['vlyrsit003'],
        pane:'vlyrsit003_pane'
      });

      geo_lyr['vlyrsit003'].addLayer(geojson);
      geo_lyr['vlyrsit003'].addTo(mymap);

    }
    else if(a236_coords.length>1){

      r.features.push({
          "type": "Feature",
          "properties": {"type":"middle_point_polyline"},
          "geometry":{
          "type": "Point",
          "coordinates": [
            sessionStorage.mapclick_lng,
            sessionStorage.mapclick_lat
          ]
      }});

      let geojson = L.geoJSON(r,{
        pointToLayer: geo_lyr_style['vlyrsit003'],
        pane:'vlyrsit003_pane'
      });

      geo_lyr['vlyrsit003'].addLayer(geojson);

      //--

      if(a236_coords.length==2){

        mymap.on('mousemove', function(e){

          //a236_coords_tmp=[];
          //a236_coords_tmp.push(a236_coords_last);
          a236_coords_p2=[];

          //_onsole.log(a236_coords_p);
          a236_coords_p.forEach(element => {
            a236_coords_p2.push(element);
          });
          
          a236_coords_p2.push([e.latlng.lng,e.latlng.lat]);
          //_onsole.log(a236_coords_p2);
          //a236_coords_p2.push(a236_coords_start);
          //mymap.removeLayer(geo_lyr['lyr_polygon_tmp']);
          geo_lyr['vlyrsit006'].clearLayers();
          //a236_coords_p2.push(a236_coords_p)

          r = {};
          r.type = "FeatureCollection";
          r.features = [];
          r.features.push({
            "type": "Feature",
            "properties": {"type":"tmp_polyline"},
            "geometry":{
            "type": "LineString",
            "coordinates": a236_coords_p2
          }});
          //_onsole.log(r);

          let geojson = L.geoJSON(r,{
            onEachFeature: geo_lyr_style['vlyrsit006'],
            pane:'vlyrsit006_pane'
          });
          geo_lyr['vlyrsit006'].addLayer(geojson);
          
          //_onsole.log(a236_coords_p)

        });

        geo_lyr['vlyrsit006'].addTo(mymap);

      }

    }

  }//polyline_miner=='enabled'
  else if(obj_addon.properties.polygon_miner=='enabled'){

    let r = {};
    r.type = "FeatureCollection";
    r.features = [];

    //_onsole.log(a236_coords);
    if(a236_coords.length==1){

      r.features.push({
          "type": "Feature",
          "properties": {"type":"start_point"},
          "geometry":{
          "type": "Point",
          "coordinates": [
            sessionStorage.mapclick_lng,
            sessionStorage.mapclick_lat
          ]
      }});
      //_onsole.log(r);
      let geojson = L.geoJSON(r,{
        pointToLayer: geo_lyr_style['vlyrsit003'],
        pane:'vlyrsit003_pane'
      });

      geo_lyr['vlyrsit003'].addLayer(geojson);
      geo_lyr['vlyrsit003'].addTo(mymap);

    }
    else if(a236_coords.length>1){

      r.features.push({
          "type": "Feature",
          "properties": {"type":"middle_point"},
          "geometry":{
          "type": "Point",
          "coordinates": [
            sessionStorage.mapclick_lng,
            sessionStorage.mapclick_lat
          ]
      }});

      let geojson = L.geoJSON(r,{
        pointToLayer: geo_lyr_style['vlyrsit003'],
        pane:'vlyrsit003_pane'
      });

      geo_lyr['vlyrsit003'].addLayer(geojson);

      //--

      if(a236_coords.length==2){

        mymap.on('mousemove', function(e){

          //a236_coords_tmp=[];
          //a236_coords_tmp.push(a236_coords_last);
          a236_coords_p2=[];
          //_onsole.log(a236_coords_p);
          a236_coords_p.forEach(element => {
            a236_coords_p2.push(element);
          });
          
          a236_coords_p2.push([e.latlng.lng,e.latlng.lat]);
          a236_coords_p2.push(a236_coords_start);
          //mymap.removeLayer(geo_lyr['lyr_polygon_tmp']);
          geo_lyr['vlyrsit006'].clearLayers();
          //a236_coords_p2.push(a236_coords_p)

          r = {};
          r.type = "FeatureCollection";
          r.features = [];
          r.features.push({
            "type": "Feature",
            "properties": {"type":"tmp_polygon"},
            "geometry":{
            "type": "Polygon",
            "coordinates": [a236_coords_p2]
          }});
          //_onsole.log(myGeoJSON);
          let geojson = L.geoJSON(r,{
            onEachFeature: geo_lyr_style['vlyrsit006'],
            pane:'vlyrsit006_pane'
          });
          geo_lyr['vlyrsit006'].addLayer(geojson);
          
          //_onsole.log(a236_coords_p)

        });

        geo_lyr['vlyrsit006'].addTo(mymap);

      }

    }

  }//polygon_miner=='enabled'

  /* let tmp = L.polyline(a236_coords,{
    pane:'lyr_polyline_pane'
  });
  geo_lyr['lyr_polyline'].addLayer(tmp);
  geo_lyr['lyr_polyline'].addTo(mymap); */

  

  /* if(a236_coords.length==2){
    mymap.on('mousemove', function(e){

      a236_coords_tmp=[];
      a236_coords_tmp.push(a236_coords_last);
      a236_coords_tmp.push([e.latlng.lat,e.latlng.lng]);

      geo_lyr['lyr_polyline_tmp'].clearLayers();

      let tmp2 = L.polyline(a236_coords_tmp,{
        pane:'lyr_polyline_pane'
      }).addTo(mymap);
      geo_lyr['lyr_polyline_tmp'].addLayer(tmp2);
      geo_lyr['lyr_polyline_tmp'].addTo(mymap);

      //_onsole.log(e)
    });
  } */

}

function close_polygon(e){

  //_onsole.log('check_marker');
  mymap.off('mousemove');

  //_onsole.log(a236_coords_p);

  let a236_coords_final = a236_coords_p2.splice(0,(a236_coords_p2.length-2));
  a236_coords_final.push(a236_coords_start);

  //_onsole.log(a236_coords_final);

  mymap.removeLayer(geo_lyr['vlyrsit003']);
  geo_lyr['vlyrsit003'].clearLayers();

  let item_lyr = 'vlyrsit006';

  //reset button
  let item_addon = a236_slug;//'infoplus';
  let obj_fileterd=g_meta.geovar_addon.features.filter(({properties}) => properties.g_slug === item_addon);
  let obj_addon = obj_fileterd[0];

  obj_addon.properties.mapclick_status='disabled';

  obj_addon.properties.point_miner='disabled';
  obj_addon.properties.polyline_miner='disabled';
  obj_addon.properties.polygon_miner='disabled';

  $('#btn_a236_by_point').css('background-color','white');
  $('#btn_a236_by_polyline').css('background-color','white');
  $('#btn_a236_by_polygon').css('background-color','white');

  //--

  mymap.removeLayer(geo_lyr[item_lyr]);
  geo_lyr[item_lyr].clearLayers();

  let r = {};
  r.type = "FeatureCollection";
  r.features = [];
  r.features.push({
      "type": "Feature",
      "properties": {"type":"final_polygon"},
      "geometry":{
      "type": "Polygon",
      "coordinates": [a236_coords_final]
  }});
  //_onsole.log(myGeoJSON);
  let geojson = L.geoJSON(r,{
    onEachFeature: geo_lyr_style[item_lyr],
    pane:item_lyr+'_pane'
  });

  geo_lyr[item_lyr].addLayer(geojson);
  geo_lyr[item_lyr].addTo(mymap);

  let o = g_meta.geovar_lyr.features;
  let this_obj=o.filter(({properties}) => properties.g_slug === item_lyr);
  let obj_lyr=this_obj[0].properties;

  obj_lyr.last_r=r;

  let opt = {
    "myminer":"polygon_miner",
    "item_lyr":item_lyr,
    "last_r":obj_lyr.last_r,
  };

  add_btn_a236_block_inspect(opt);

}

function close_polyline(e){

  //_onsole.log('check_marker');
  mymap.off('mousemove');

  //_onsole.log(a236_coords_p);

  //let a236_coords_final = a236_coords_p2.splice(0,(a236_coords_p2.length-2));
  //a236_coords_final.push(a236_coords_start);
  let a236_coords_final = a236_coords_p2;

  //_onsole.log(a236_coords_final);

  mymap.removeLayer(geo_lyr['vlyrsit003']);
  geo_lyr['vlyrsit003'].clearLayers();

  let item_lyr = 'vlyrsit006';

  //reset button
  let item_addon = a236_slug;//'infoplus';
  let obj_fileterd=g_meta.geovar_addon.features.filter(({properties}) => properties.g_slug === item_addon);
  let obj_addon = obj_fileterd[0];

  obj_addon.properties.mapclick_status='disabled';

  obj_addon.properties.point_miner='disabled';
  obj_addon.properties.polyline_miner='disabled';
  obj_addon.properties.polygon_miner='disabled';

  $('#btn_a236_by_point').css('background-color','white');
  $('#btn_a236_by_polyline').css('background-color','white');
  $('#btn_a236_by_polygon').css('background-color','white');

  //--

  mymap.removeLayer(geo_lyr[item_lyr]);
  geo_lyr[item_lyr].clearLayers();

  let r = {};
  r.type = "FeatureCollection";
  r.features = [];
  r.features.push({
      "type": "Feature",
      "properties": {"type":"final_polyline"},
      "geometry":{
      "type": "LineString",
      "coordinates": a236_coords_final
  }});
  //_onsole.log(myGeoJSON);
  let geojson = L.geoJSON(r,{
    onEachFeature: geo_lyr_style[item_lyr],
    pane:item_lyr+'_pane'
  });

  geo_lyr[item_lyr].addLayer(geojson);
  geo_lyr[item_lyr].addTo(mymap);

  let o = g_meta.geovar_lyr.features;
  let this_obj=o.filter(({properties}) => properties.g_slug === item_lyr);
  let obj_lyr=this_obj[0].properties;

  obj_lyr.last_r=r;

  let opt = {
    "myminer":"polyline_miner",
    "item_lyr":item_lyr,
    "last_r":obj_lyr.last_r,
  };

  add_btn_a236_block_inspect(opt);

}

function add_btn_a236_block_inspect(optIn){

  let item_addon = a236_slug;//'infoplus';
  let obj_fileterd=g_meta.geovar_addon.features.filter(({properties}) => properties.g_slug === item_addon);
  let obj_addon = obj_fileterd[0];
  obj_addon.properties.block_inspect=optIn.myminer;

  $('.ct-editing2').append(''
    +'<span '
      +'class="box-btn_a236_block_inspect" '
      +'style="margin-left:5px;margin-right:5px;"></span>'
  +'');

  //create_button('btn_a236_block_inspect');
  let opt = {
    itemSlug:'btn_a236_block_inspect',
    itemLabel: {
      "default":'AGGIUNGI',//"it":"CHIUDI","en":"CLOSE"
    },//gLang.label_close,
    itemDescription: {"default":"..."},
    //itemLabel:'<i class="fa fa-ellipsis-h" aria-hidden="true"></i>',
    itemClass:'btn-sm btn-outline-dark', // btn-main-sidebar',
    //btnOnClick:'close',
    itemType:'button', //form-switch
    itemDisabled:false,
    itemStyle:'', //backgrund-color:red;
    g_group: ["public"],
    g_responsive: "both", //both, mobile, desktop
    //g_callback: 'dlg_vlyr007_2_selected_lyr', // same as btnSlug
    //itemLyr:objItem.g_slug
    myminer:optIn.myminer,
    item_lyr:optIn.item_lyr,
    last_r:optIn.last_r
  };
  create_button_2(opt);

}


f_btn['btn_a236_block_inspect']=function(optIn){
  //_onsole.log('btn_a236_block_inspect',optIn)
  let opt = optIn;
  save_point_lyr(opt);
  //_onsole.log('btn_a236_block_inspect',optIn);
  return

  sessionStorage.this_dialog_slug='a236_inspect_single';
  create_dialog2('a236_inspect_single');

}

f_btn['btn_a236_save_dlg']=function(optIn){

/*   dataString={
    fn_group:'geodata',
    action:'view_data',
    collection:'lyr_intersect_particelle',
    qy_name:'A',
    lyr:'lyr999',//'lyr035',
    world:true, // for all records
    geom:false,
    query:true,
    filter_field:'feat_id_ok',
    filter_value:a223_block,
    lyrs:a223_lyrs,
    fn_extend:'a223_compose_extend',
    g_master:G_MASTER
  }
  //generic_api(dataString,'addon223_view');
  //alertify.infoDialog().destroy();
  switch_on_lyr_custom(dataString); */

  var dataString = {}

  const params = document.querySelectorAll('.params-control');
  Array.from(params).forEach((element, index) => {
    // _onsole.log(element.getAttribute('slug'));
    // _onsole.log(element.value);
    if(element.hasAttribute('callback')){
      let df_name='callback_paramsControl_'+element.getAttribute('callback');
      //_onsole.log(df_name);
      dataString[element.getAttribute('field_slug')]=dyn_functions[df_name]();
    }
    else{
      dataString[element.getAttribute('field_slug')]=element.value;
    }
    //_onsole.log('field_slug',element.getAttribute('field_slug'));
    //_onsole.log('value',dataString[element.getAttribute('field_slug')]);
    
    if(element.getAttribute('field_slug')=='process_name'){
      sessionStorage.process_name=element.value;
    }
  });

  dataString['lyr']=optIn.itemLyr;

  //_onsole.log(dataString);
  //dataString['collection_sub']=sessionStorage.collection_sub;

  generic_api(dataString,'show_response_a236');

}

dyn_functions['succ_show_response_a236'] = function(r){
  //alertify.infoDialog().close();
  alertify.infoDialog3().destroy();
  disable_a236();
  //_onsole.log(r);
  switch_on_wms_b(r.ds.lyr);

}