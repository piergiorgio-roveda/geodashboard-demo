var a240_UpdateLyr_selected = new Array();

dyn_functions['a240_UpdateLyr'] =  function(){

  a240_lyrs = [];

  //$('.row-'+slug).remove();

  $('.panel-'+'tab1').html('');

  let ct_slug = 'a240_1_part1';

  let  c = ''
    +'<div class="row row-'+'obj_part.g_slug'+'">'
      +'<div class="col-12">'
        +'<div class="box-'+ct_slug+'">'
        +'</div>'
      +'</div>'
    +'</div>'
    +'';
  $('.panel-'+'tab1').append(c);

  //-- CREATE FORM GROUP AND LABEL
  opt = {
    "label":"Choose layer",
    "slug": ct_slug,//optIn.ct_slug,
    //"label": "Map filter",//ONLY NOT DEFINED IN objCol
    //"pCol": pCol,
  }
  $('.box-'+ct_slug).append(
    append_field_label_2(opt)
  );

  //-- GET DATA TABLE
  let dataString={
    fn_group:'geodata',
    qy_name:'A'
  }
  dataString.action="view_data";
  dataString.collection='show_table_data';
  dataString.table_slug='TB_LYR';
  dataString.item_token='true';

  /*
  SELECT g_slug, g_label, 
  --title, title_dlg, 
  feat_type, 
  --intoc, lyr_type, lyr_update, 
  --feature_zoom, feature_zoom_max, maxzoom, label_zoom, zindex, 
  --icon, 
  --g_style, ??
  --g_tables, geoserver_name, geoserver_style, 
  --g_options, 
  geoserver_style_name
  , pid
  FROM public.tb_lyr 
  WHERE lyr_type='wms'
  AND NOT(g_tables IS NULL)
  AND NOT(g_tables::text ='[]')
  AND geoserver_style='tmp_sld'
  ORDER BY g_label;
  */
  dataString.filters_type='AND';
  dataString.filters_string=[
    {
      "value": "lyr_type='wms'"
    },
    {
      "value": "NOT(g_tables IS NULL)"
    },
    {
      "value": "NOT(g_tables::text ='[]')"
    },
    {
      "value": "geoserver_style='tmp_sld'"
    }
  ]; 
  dataString.order_by=[
    {
      "field": "g_label"
    }
  ]; 

  generic_api(dataString,'a240_UpdateLyr_Layer_list');

}

dyn_functions['succ_'+'a240_UpdateLyr_Layer_list'] = function(r){

  let ct_slug = 'a240_1_part1';

  let fieldOpt = [];

  r.features.forEach(feature => {
    let p = feature.properties;
    fieldOpt.push(
      {"val":p.g_slug,"text":p.g_label+' ['+p.feat_type+']'}
    );
  });

  //-- INPUT FIELD
  opt = {
    "slug": ct_slug,
    "pCol": {
      g_slug: ct_slug,
      data_type:'text',
      //g_placeholder:"Start typing test ...",
      g_options: fieldOpt
    },
    "objItem": {},
  }
  objField_omnivore(opt);

  if(sessionStorage.a240_UpdateLyr!='empty'){
    $('#input-a240_1_part1').val(sessionStorage.a240_UpdateLyr);
    a240_UpdateLyr_LyrForm(sessionStorage.a240_UpdateLyr);
  }

  $( "#input-a240_1_part1" ).on('change', function() {

    //_onsole.log($(this).val());
    a240_UpdateLyr_LyrForm($(this).val());

  });

}

function a240_UpdateLyr_LyrForm(slug){

  sessionStorage.a240_UpdateLyr = slug;

  //-- GET DATA TABLE
  let dataString={
    fn_group:'geodata',
    qy_name:'A'
  }
  dataString.action="view_data";
  dataString.collection='lyr_single';
  dataString.table_slug='TB_LYR';
  dataString.by_field_name='g_slug';
  dataString.by_field_value=slug;

  generic_api(dataString,'a240_UpdateLyr_LyrForm');

}

dyn_functions['succ_'+'a240_UpdateLyr_LyrForm'] = function(r){

  sessionStorage.a240_Lyr_item_token = r.features[0].properties.item_token;
  sessionStorage.a240_Lyr_feat_type = r.features[0].properties.feat_type;

  $('.ajs-footer-btn2').html('');

  let ct_slug = 'a240_1_part2';
  $('.row-'+ct_slug).remove();

  c = ''
    +'<div class="row row-'+ct_slug+'">'
      +'<div class="col-12">'
        +'<div class="box-'+ct_slug+'">'
        +'</div>'
      +'</div>'
    +'</div>'
    +'';
  $('.panel-'+'tab1').append(c);  


  ct_slug = 'a240_1_part3';
  $('.row-'+ct_slug).remove();
  c = ''
    +'<div class="row row-'+ct_slug+'">'
      +'<div class="col-6">'
        +'<div class="box-'+ct_slug+'_a">'
        +'</div>'
      +'</div>'
      +'<div class="col-6">'
        +'<div class="box-'+ct_slug+'_b">'
        +'</div>'
      +'</div>'      
    +'</div>'
    +'';
  $('.panel-'+'tab1').append(c); 

  a240_UpdateLyr_LyrForm_g_label(r);
  //a240_UpdateLyr_LyrForm_map(r);

  //-- CREATE BUTTON LINK disabled
  $('.ajs-footer-btn2').append(''
    +'<span class="box-btn_a240_UpdateLyr_Add2Map"></span>'
  +'');
  opt = {
    itemSlug:'btn_a240_UpdateLyr_Add2Map',//'btn_closedlg3',
    itemLabel: {
      "default":"ADD TO MAP",
      "it":"AGGIUNGI ALLA MAPPA",
      "en":"ADD TO MAP"
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
    //"g_callback": 'btn_save_point', // same as btnSlug
  };
  create_button_2(opt);

  let map_lyrs = g_meta.geovar_map.features[0].properties.g_lyr
  //_onsole.log(map_lyrs);
  //_onsole.log(r.ds.by_field_value);
  if(map_lyrs.indexOf(r.ds.by_field_value) >= 0){
    $('#btn_a240_UpdateLyr_Add2Map').prop('disabled', true);
  }


}

f_btn['btn_a240_UpdateLyr_Add2Map']=function(optIn){

  a240_lyrs = g_meta.geovar_map.features[0].properties.g_lyr;
  a240_lyrs.push(sessionStorage.a240_UpdateLyr);

  let opt = {
    "g_callback": 'a240_UpdateLyr_Add2Map',
  }
  a240Generic_updateDbLyr(opt);
}
dyn_functions['succ_a240_UpdateLyr_Add2Map'] = function(r){
  $('#btn_a240_UpdateLyr_Add2Map').prop('disabled', true);
  a240Generic_AddBtnRefresh();
}

function a240_UpdateLyr_LyrForm_g_label(r){

  let ct_slug = 'a240_1_part2';

  //-- CREATE FORM GROUP AND LABEL
  let objCols = {
    features:[
      {
        "type": "Feature",
        "properties": {
          "g_slug": "g_label",
          "g_label": "Label",
          "g_description": "...",
          "g_placeholder": "Select name for new map o leave blank ..."
        }
      }
    ]
  }

  objCols.features.forEach(objCol => {

    let optIn = {
      "ct_slug":ct_slug
    }
    let objItem = r.features[0].properties;

    let pCol = objCol.properties;

    //-- CREATE FORM GROUP AND LABEL
    opt = {
      "slug": pCol.g_slug,
      "label": true,//ONLY NOT DEFINED IN objCol
      "pCol": pCol,
    }
    $('.box-'+optIn.ct_slug).append(
      append_field_label_2(opt)
    );

    //-- INPUT FIELD
    opt = {
      "slug": pCol.g_slug,
      "pCol": pCol,
      "objItem": objItem,
    }
    objField_omnivore(opt);

    $('.control-'+pCol.g_slug).attr('group',ct_slug); 
    $('.control-'+pCol.g_slug).attr('item_token',objItem.item_token); 
    $('.control-'+pCol.g_slug).attr('lyr',objItem.g_slug);

    $("#input-g_label").on("keyup change", function(e) {
      // do stuff!
      let opt = {
        "table_slug": "TB_LYR",
        "item_token": $(this).attr("item_token"),
        "col_slug": "g_label",
        "col_value": $(this).val(),
        "lyr": $(this).attr("lyr")
      }
      a240_update_field(opt);
    });

  });
  
  a240_UpdateLyr_LyrForm_MapPreview(r);
  a240_UpdateLyr_Style(r);
}

function a240_UpdateLyr_LyrForm_MapPreview(r){

  let ct_slug = 'a240_1_part3_a';

  //-- CREATE FORM GROUP AND LABEL
  let objCols = {
    features:[
      {
        "type": "Feature",
        "properties": {
          "g_slug": "a240_map",
          "g_label": "Map preview",
          "g_description": "",
          "g_placeholder": ""
        }
      }
    ]
  }

  objCols.features.forEach(objCol => {

    let optIn = {
      "ct_slug":ct_slug
    }
    let objItem = r.features[0].properties;

    let pCol = objCol.properties;

    //-- CREATE FORM GROUP AND LABEL
    opt = {
      "slug": pCol.g_slug,
      "label": true,//ONLY NOT DEFINED IN objCol
      "pCol": pCol,
    }
    $('.box-'+optIn.ct_slug).append(
      append_field_label_2(opt)
    );

    //-- INPUT FIELD
    opt = {
      "slug": pCol.g_slug,
      //"params_control": true,
      "pCol": pCol,
      "objItem": objItem,
    }
    //objField_omnivore(opt);    
    a240_map_init(opt);

  });

}

function a240_map_init(optIn){
  //_onsole.log('a240_map_init',optIn);
  let pCol = optIn.pCol;
  c = ''
    +'<div '
      +'id="a240_map" style="width:100%;height:300px;" '
      +'></div>';
  $('#group-'+pCol.g_slug).append(c);

  maps.a240_map = L.map('a240_map',{
    minZoom: 1,
    maxZoom: 20,
    zoomControl: false,
    zoomSnap: 0.5,
    zoomDelta: 0.5,
    wheelPxPerZoomLevel: 100
  })

  maps.a240_map.setView([
    0,
    0
  ],
    4
  );

  let lyr='lyr059';
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  maps.a240_map.createPane(lyr+'_pane');
  maps.a240_map.getPane(lyr+'_pane').style.zIndex = lyr.zIndex;
  // _onsole.log(lyr)
  // _onsole.log(lyr.indexOf("pointerEvents"))

  if(obj_lyr.pointerEvents!=undefined 
    && obj_lyr.pointerEvents===false){
    // Layers in this pane are non-interactive and 
    //do not obscure mouse/touch events
    maps.a240_map.getPane(lyr+'_pane').style.pointerEvents = 'none';
  }

  opt = optIn;
  setTimeout(a240_sayHi(opt), 1000);

}

function a240_sayHi(optIn) {

  //_onsole.log('a240_sayHi',optIn);
  maps.a240_map.invalidateSize();
  opt = optIn;
  setTimeout(a240_sayHi2(opt), 1000);

}

function a240_sayHi2(optIn) {

  //_onsole.log('a240_sayHi2',optIn);

  let lyr='lyr059';
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  geo_lyr[lyr] = L.tileLayer(
    obj_lyr.tile_url,
    {
      attribution: obj_lyr.attribution,
      pane: lyr+'_pane'
    }
  ).addTo(maps.a240_map);

  opt = optIn;
  a240_add_lyr(opt);
  
}

function a240_add_lyr(optIn){

  //_onsole.log('a240_add_lyr',optIn);
  let obj_lyr = optIn.objItem;
  let lyr = obj_lyr.g_slug;

  if(obj_lyr.lyr_type=='wms'){

    geo_lyr['a240_'+lyr] = new L.featureGroup();

    maps.a240_map.createPane('a240_'+lyr+'_pane');
    maps.a240_map.getPane('a240_'+lyr+'_pane').style.zIndex = '900';

    var opt_layer=WORKSPACE+':'+obj_lyr.geoserver_name+GEOSERVER_SUFFIX;
    var opt_pane='a240_'+lyr+'_pane';

    var opt={
      //layers:opt_layer,
      transparent:'true',
      format:'image/png',//PNG 24bit
      //format_options:'dpi:300',
      opacity:1,
      tiled: false,
      //info_format: 'text/html',
      pane:opt_pane,
      antialiasing:'on',
      maxZoom: 20,
      version: '1.3.0'
    };

    //_onsole.log('maps.a240_map',maps.a240_map);

    if(obj_lyr.geoserver_style=='tmp_sld'){

        dataString={
          lyr:lyr,
          geoserver_style_name:obj_lyr.geoserver_style_name,
          opt:opt
         }

        let baseUrl = HOME_PROJECT+'/script/sld/?g_map_slug='+MAPSLUG+'&lyr='+obj_lyr.g_slug;

        var toAjax={
          type: "POST",
          url: baseUrl,  
          data:dataString,
          dataType: 'json',
          async:    true,
          cache:    false
        }
    
        toAjax['error']=function(xhr, textStatus, errorThrown ) {
          if(this.call_silent===false){
            on_ajax_error(this);
            log_tag_manager('ajax error','');
            //reload window?
            hide_loading();
          }
          console.log('Error ');
        }
    
        toAjax['success']=function(r){

          let lyr = r.ds.lyr;
          let optInWms=r.ds.opt;
          
          let baseSld = 'https:'+DOMAIN_PROJECT+'/tmp/';
          let geoserver_style_name = r.ds.geoserver_style_name;
          optInWms['sld'] = baseSld+geoserver_style_name+'_'+lyr+'.sld';

          let opt={
            mymap:maps.a240_map,
            lyr:lyr,
            optWms:optInWms
          }
          a240_prepare_wmsAddLyrToMap(opt); 

        }//success
    
        $.ajax(toAjax); //ajax        

    }
    else if(obj_lyr.geoserver_style=='default'){
      opt['layers'] = opt_layer;

      let opt={
        mymap:maps.a240_map,
        lyr:lyr,
        optWms:opt
      }
      a240_prepare_wmsAddLyrToMap(optIn);

    }
    else{

      opt['styles'] = obj_lyr.geoserver_style;
      opt['layers'] = opt_layer;

      let opt={
        mymap:maps.a240_map,
        lyr:lyr,
        optWms:opt
      }
      a240_prepare_wmsAddLyrToMap(optIn);

    }

  }
  else{
    //_onsole.log('a240_add_lyr','DEV > not wms');
  }
}

var a240_wmsUrl ='';
var a240_optInWms = new Array();
var a240_lyr = '';

function a240_update_field(optIn){

  dataString={
    fn_group:'geodata',
    qy_name:'A'
  }

  dataString.action='modify_data';
  dataString.collection='update_attributes_by_table';
  dataString.table_slug=optIn.table_slug;
  dataString.item_token=optIn.item_token;
  dataString.field_and_value=[
    {
      "field": optIn.col_slug,
      "value": optIn.col_value
    }
  ];
  dataString.lyr=optIn.lyr;

  generic_api(dataString,'a240_update_field');

}

dyn_functions['succ_'+'a240_update_field'] = function(r){

  //_onsole.log('a240_update_field',r);
  let field = r.ds.field_and_value[0].field;
  let value = r.ds.field_and_value[0].value;
  let lyr = r.ds.lyr;
  if(field=='g_label'){
    $('#input-a240_1_part1 option[value="'+lyr+'"]').text(value);
  }
}

dyn_functions['succ_'+'a240_zoom_to'] = function(r){
  //_onsole.log('a240_zoom_to',r);
  //let lyr = r.ds.lyr;
  //let bbox = r.ds.bbox;
  //onsole.log(r);
  //maps.a240_map.fitBounds(bbox);
  let p = r.features[0].properties;
 
  //maps.a240_map.fitBounds(p.g_bbox);

  let geojson = L.geoJson(r);
  maps.a240_map.fitBounds(geojson.getBounds());

  if(p.geometrytype=='ST_Point'){
    let c = maps.a240_map.getCenter();
    maps.a240_map.setView([c.lat.toFixed(3), c.lng.toFixed(3)], 16);
  }
  else{


  }

}

function a240_prepare_wmsAddLyrToMap(optIn){

  let opt={
    myaddon:'a240',
    mymap:optIn.mymap,
    lyr:optIn.lyr,
    optWms:optIn.optWms,
    withRandint:'yes',
    tileType:'Tiled',
    g_callback:'get_lyr_bbox',
    g_callback_opt:{
      itemLyr:optIn.lyr,
      g_callback:'a240_zoom_to'
    }
  }
  wmsAddLyrToMap(opt);

}