$(document).ready(function() {

  a235_ready();

}); //$(document).ready

function a235_ready(){
  if (f_wait.btn_profile==0
    || f_wait.geovar_dialog==0) {
    // _onsole.log('wait')
    setTimeout(function(){a235_ready()},100);
    return;
  } else {
    prepare_a235();
  };
}

function prepare_a235(){

  //define in list
  var a235_slug='mapclick_test';
  list_mapclick.push(a235_slug);
  list_mapclick_default.push(a235_slug);

  //g_meta.geovar_dialog is update from DB
  //but to customize can push this array
  // var meta = {
  //   'properties':{
  //     'g_description': null,
  //     'g_label': 'Map click test',
  //     'g_slug': a235_slug+'_single',
  //     'g_template': 'template_by_slug',
  //   }
  // }
  // g_meta.geovar_dialog.features.push(meta);

}

dyn_mapclick['mapclick_test'] = function(e){

  let a235_slug='mapclick_test';

  sessionStorage.this_dialog_lyr=a235_slug;
  sessionStorage.this_dialog_slug=a235_slug+'_single';//'lyr035_single'
  //
  sessionStorage.mapclick_lat=e.latlng.lat;
  sessionStorage.mapclick_lng=e.latlng.lng;

  // log_tag_manager(
  //   'mapclick',
  //   //GA - log_tag_manager - action // _onsole.log_ready_map
  //   sessionStorage.mapclick_lat+'|'+sessionStorage.mapclick_lng,//GA - log_tag_manager - label
  //   '0' //GA - log_tag_manager - value (optional)
  // );

  //create_dialog2(sessionStorage.this_dialog_slug);

  let opt = {
    "slug": a235_slug,//'vlyr007' optIn.ct_slug,
    "dlgSlug": a235_slug+"_single",//'vlyr007' optIn.ct_slug,
    //"g_description": null,
    "dlgTitle": "Informazioni layer attivi",
    //"g_template": "template_by_slug"
    "callback":"dlg_"+a235_slug+"_single",
    mapclick_lat:e.latlng.lat,
    mapclick_lng:e.latlng.lng
  }

  create_dialog3(opt);

}

dyn_functions['dlg_mapclick_test_single'] = function(optIn){

  let a235_slug='mapclick_test';

  var c = '<div '
    +'class="mainboxItem" '
    +'style="margin-top:5px;"></div>';
  $('.dlg_'+a235_slug+'_single'+'_body').append(c);

  //box button tab
  var c = ''
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  $('.dlg_'+a235_slug+'_single'+'_body').append(c);

  var c = '<div>'
    +'<div class="col-btn-attrs" '
      +'style="text-align:left;"></div>'
  +'</div>';
  $('.dlg_'+a235_slug+'_single'+'_body').append(c);

  //box tab1
  c += '<div '
    +'class="dlg_panel panel-tab1" '
    +'style="display:block;font-family:var(--wd-fonts-secondary);">';
  //c += '<p>TAB1</p>';
  //c+='a235: View event in Google Analytics as "mapclick": ' + sessionStorage.mapclick_lat+'|'+sessionStorage.mapclick_lng
  c += '</div><!--tab1-->';
  
  $('.dlg_'+a235_slug+'_single'+'_body').append(c);

  //--

  let g=dMap.analisi01.grLyrToc;

  g.forEach(itemLyr => {

    // let o = g_meta.geovar_lyr.features
    // let this_obj=o.filter(({properties}) => properties.g_slug === itemLyr);
    // let obj_lyr=this_obj[0].properties;

    g_ds = {
      geovar:"geovar_lyr",//obj_maps
      slug:itemLyr,//filter
      type:'single_object'//,//'item' or 'single_object' or 'full_object'
    }
    let obj_lyr = get_geovar_obj(g_ds);

    if(obj_lyr.visible){

      if(obj_lyr.lyr_type=='group'){
        obj_lyr.g_options.forEach(child_lyr => {


          let child_this_obj=o.filter(({properties}) => properties.g_slug === child_lyr);
          let child_obj_lyr=child_this_obj[0].properties;

          if(child_obj_lyr.queryable==1){
            //_onsole.log(child_obj_lyr.g_slug);
            $('.panel-tab1').append(''
              +'<div class="info-dlg-lyr" '
              +'id="info-dlg-lyr-'+child_obj_lyr.g_slug+'"></div>'
            +'');
            a235_getInfo(child_obj_lyr.g_slug);
          }

        });
      }
      else{
        if(obj_lyr.queryable==1){

          $('.panel-tab1').append(''
            +'<div class="info-dlg-lyr" '
            +'id="info-dlg-lyr-'+obj_lyr.g_slug+'"></div>'
          +'');
          a235_getInfo(obj_lyr.g_slug);
        }
      }

    }

  });

  //--

}

function a235_getInfo(itemLyr,fn_extend='a235_addInfoBox'){

  g_ds = {
    geovar:"geovar_lyr",//obj_maps
    slug:itemLyr,//filter
    type:'single_object'//,//'item' or 'single_object' or 'full_object'
  }
  let obj_lyr = get_geovar_obj(g_ds);

  dataString={
    fn_group:'geodata',
    action:'view_data',
    collection:'lyr_single_one_table_xy',
    qy_name:'A',
    lyr:itemLyr,
    world:true, // for all records
    //item_token:localStorage[slug+'_token'] //lyr035_token,
    geom:false,
    feat_type:obj_lyr.feat_type,
    lat:sessionStorage.mapclick_lat,
    lng:sessionStorage.mapclick_lng,
    fn_extend:fn_extend,
    call_type:'silent'
  }
  let b = mymap.getBounds();
  dataString.mye=b.getEast();
  dataString.myw=b.getWest();
  dataString.myn=b.getNorth();
  dataString.mys=b.getSouth();
  //generic_api(dataString,'addon223_view');
  switch_on_lyr_custom(dataString);

}

dyn_functions['a235_addInfoBox']=function(r){

  if(r.features.length>0){
    
    let itemLyr=r.ds.lyr;

    g_ds = {
      geovar:"geovar_lyr",//obj_maps
      slug:itemLyr,//filter
      type:'single_object'//,//'item' or 'single_object' or 'full_object'
    }
    let obj_lyr = get_geovar_obj(g_ds);

    let t = g_meta.geovar_tb;
    let this_t_obj=t.filter((x) => x.name === obj_lyr.g_tables[0]);
    //_onsole.log(obj_lyr.g_tables[0]);
    //_onsole.log(this_t_obj);

    let f_tb=this_t_obj[0].features;

    let c = ''
      +'<div class="row">'
        +'<div id="row-'+r.ds.lyr+'-A" class="col-2" >'
          +'<div class="box-btn_'+r.ds.lyr+'_edit d-grid gap-2"></div>'
        +'</div>'
        +'<div id="row-'+r.ds.lyr+'-B" class="col-10" '
          +'style="'
            +'text-align: center;'
            +'font-size: 18px;'
            +'font-weight: 900;'
          +'">'
          +obj_lyr.g_label
        +'</div>'
      +'</div>'
      +'';
    $('#info-dlg-lyr-'+r.ds.lyr).html(c);

    $('#row-'+r.ds.lyr+'-B').css('display','table-cell');
    $('#row-'+r.ds.lyr+'-B').css('vertical-align','middle');
    $('#row-'+r.ds.lyr+'-B').css('border-bottom','2px solid');
    
    opt = {
      itemSlug:'btn_'+r.ds.lyr+'_edit',
      itemLabel: {
        "default":'<i class="fa fa-pencil" aria-hidden="true"></i>',//"it":"CHIUDI","en":"CLOSE"
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
      g_callback: 'a235_edit', // same as btnSlug
      lyrLabel:obj_lyr.g_label,
      itemLyr:r.ds.lyr,
      last_r:r
    };
    create_button_2(opt);

    c = ''
      +'<div class="row">'
        +'<div class="col-12 col-box-'+r.ds.lyr+'">'
        +'</div>'
      +'</div>'
      +'';
    $('#info-dlg-lyr-'+r.ds.lyr).append(c);

    f_tb.forEach(element => {

      let p_col = element.properties;

      $('.box-info-'+r.ds.lyr+'-'+p_col.g_slug).remove();

      if(p_col.g_preview===1){
        //_onsole.log(p_col.g_slug);

        //-- CREATE FORM GROUP AND LABEL
        opt = {
          "slug": p_col.g_slug,
          "label": p_col.g_label,//ONLY NOT DEFINED IN objCol
          "pCol": p_col,
        }
        $('.col-box-'+r.ds.lyr).append(
          append_field_label_2(opt)
        );
        objItem=r.features[0].properties;
        //-- INPUT FIELD
        opt = {
          "slug": 'col-box-'+r.ds.lyr,
          "pCol": p_col,
          "objItem": objItem,
        }
        objField_omnivore_viewOnly(opt);

        // let c = ''
        //   +'<div class="box-info box-info-'+r.ds.lyr+'-'+p_col.g_slug+'" style="background-color: #fff;">'
        //     +'<span style="padding-left:10px;padding-right:10px;">'
        //       +p_col.g_label+': '+r.features[0].properties[p_col.g_slug]
        //     +'</span>'
        //   +'</div>';
        // $('.col-box-'+r.ds.lyr).append(c);
      }
    });


  }

}

f_btn['a235_edit']=function(optIn){

  /* alertify.infoDialog3().destroy();

  let opt = {
    "slug": 'a235_edit',//'vlyr007' optIn.ct_slug,
    "dlgSlug": 'a235_edit'+"_single",//'vlyr007' optIn.ct_slug,
    //"g_description": null,
    "dlgTitle": "Modifica "+optIn.lyrLabel,
    //"g_template": "template_by_slug"
    "callback":"dlg_a235_edit_single",
    item_lyr:optIn.item_lyr,
    last_r:optIn.last_r
  }

  create_dialog3(opt); */

  $('.panel-tab1').html('');

  //--

  $('.panel-tab1').append(''
    +'<div class="'+optIn.ct_slug+'_title'+'" '
      +'style="'
        +'text-align: center;'
        +'font-size: 18px;'
        +'font-weight: 900;'
      +'">'
      +optIn.lyrLabel
    +'</div>'
    +''
  );
  //$('.box-'+optIn.ct_slug).css('display','table-cell');
  //$('.box-'+optIn.ct_slug).css('vertical-align','middle');
  $('.'+optIn.ct_slug+'_title').css('border-bottom','2px solid');

  optIn.ct_slug=optIn.itemLyr;

  //-- CREATE NEW ROW FOR LIST WITH BOX
  opt = {
    "slug": optIn.ct_slug,
    "grid": "col-12",
  }
  $('.panel-tab1').append(part_ct_params(opt));



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

  //--

  let objItem = optIn.last_r.features[0].properties;

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
        "objItem": objItem,
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
          "objItem": objItem,
        }
        dlg_field_template[pCol.g_callback](opt);
      }
    }//no g_meta

  });//objCols.features.forEach(objCol => {

  $('.ajs-footer-btn2').append(''
    +'<span class="box-btn_a235_save_dlg"></span>'
    +'&nbsp;<span class="box-btn_a235_delete_dlg"></span>'
  +'');

  opt = {
    itemSlug:'btn_a235_save_dlg',
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

  opt = {
    itemSlug:'btn_a235_delete_dlg',
    itemLabel: {
      "default":"DELETE",
      "it":"ELIMINA",
      "en":"DELETE"
    },//gLang.label_close,
    itemDescription: {"default":"..."},
    //itemLabel:'<i class="fa fa-ellipsis-h" aria-hidden="true"></i>',
    itemClass:'btn-sm btn-danger', // btn-main-sidebar',
    //btnOnClick:'close',
    itemType:'button', //form-switch
    itemDisabled:false,
    itemStyle:'', //backgrund-color:red;
    g_group: ["public"],
    g_responsive: "both", //both, mobile, desktop
    //"g_callback": 'btn_save_point', // same as btnSlug
    itemLyr:optIn.itemLyr,
    itemPid:objItem.pid,
  };
  create_button_2(opt);

}

f_btn['btn_a235_delete_dlg']=function(optIn){

  alertify.infoDialog3().destroy();

  let dataString={};

  dataString['fn_group']='geodata';
  dataString['action']='modify_data';
  dataString['collection']='delete_feature_bypid';
  dataString['lyr']=optIn.itemLyr;

  dataString['pid']=optIn.itemPid;

  generic_api(dataString,'a235_delete');

}

dyn_functions['succ_a235_delete'] = function(r){

  remove_lyr(r.ds.lyr);
  switch_on_wms_b(r.ds.lyr);

}

f_btn['btn_a235_save_dlg']=function(optIn){

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

  //_nsole.log(dataString);
  //dataString['collection_sub']=sessionStorage.collection_sub;

  //generic_api(dataString,'show_response_a235');

}

dyn_functions['succ_show_response_a235'] = function(r){
  //alertify.infoDialog().close();
  alertify.infoDialog3().destroy();
  //_onsole.log(r);
  switch_on_wms_b(r.ds.lyr);

}

