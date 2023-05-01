$(document).ready(function() {

  // a234_ready();

}); //$(document).ready


listCollectionExtend.push('a234_1');

dyn_functions['a234_1_CollectionExtend'] =  function(){

  let opt = new Array();

  //_onsole.log('sessionStorage.collection',sessionStorage.collection)

  if(sessionStorage.collection==='tb_map_edit'){

    opt = {
      collection:'tb_map_edit',
      geovar:"obj_maps",//obj_maps
      geovar_schema:"TB_MAP",//obj_maps
      geovar_slug:MAPSLUG,//filter
      ct_slug:'mapsList'//,//'item' or 'single_object' or 'full_object'
    }
    a234_create_main_list(opt);
    //dyn_functions['prepare_collection_'+sessionStorage.collection](MAPSLUG);

  }
  else if(sessionStorage.collection==='tb_lyr_edit'){

    opt = {
      collection:'tb_lyr_edit',
      geovar:"geovar_lyr",//obj_maps
      geovar_schema:"TB_LYR",//obj_maps
      geovar_slug:'lyr040',//filter
      ct_slug:'lyrsList'//,//'item' or 'single_object' or 'full_object'
    }
    a234_create_main_list(opt);
    //dyn_functions['prepare_collection_'+sessionStorage.collection]('lyr040');

  }
  else if(sessionStorage.collection==='tb_lyr_map_edit'){

    opt = {
      collection:sessionStorage.collection,
      geovar:"obj_maps",//obj_maps
      geovar_schema:"TB_MAP",//obj_maps
      geovar_slug:MAPSLUG,//filter
      ct_slug:'tb_lyr_map_edit',//,//'item' or 'single_object' or 'full_object'
    }
    a234_create_main_list(opt);
    //dyn_functions['prepare_collection_'+sessionStorage.collection](MAPSLUG);

  }
  else if(sessionStorage.collection==='tb_lyr_style_edit'){

    opt = {
      collection:sessionStorage.collection,
      geovar:"geovar_lyr_style",//obj_maps //has master
      geovar_schema:"TB_LYR_STYLE",//obj_maps
      geovar_slug:'255e2159ce61b20055f1214900380c72',//filter
      ct_slug:'lyrstylesList',//'item' or 'single_object' or 'full_object'
      geovar_filter_field:'item_token'//if it's not g_slug
    }
    a234_create_main_list(opt);
    //dyn_functions['prepare_collection_'+sessionStorage.collection](MAPSLUG);

  }
  else if(sessionStorage.collection==='geovar_master_edit'){

    opt = {
      collection:sessionStorage.collection,
      geovar:"geovar_master",//obj_maps
      geovar_schema:"GEOVAR_MASTER",//obj_maps
      geovar_slug:'PG_OMI_MILANO',//filter
      ct_slug:'mastertablesList'//,//'item' or 'single_object' or 'full_object'
    }
    a234_create_main_list(opt);
    //dyn_functions['prepare_collection_'+sessionStorage.collection](MAPSLUG);

  }
  else if(sessionStorage.collection==='geovar_tb_master_edit'){

    opt = {
      collection:sessionStorage.collection,
      geovar:"geovar_master",//obj_maps //has master
      geovar_schema:"GEOVAR_MASTER",//obj_maps
      geovar_slug:'DBECO_00_PG_INDCOMART_7COM',//filter
      ct_slug:'mastertablesList2'//,//'item' or 'single_object' or 'full_object'
    }
    a234_create_main_list(opt);
    //dyn_functions['prepare_collection_'+sessionStorage.collection](MAPSLUG);

  }
  else if(sessionStorage.collection==='geovar_action_edit'){

    opt = {
      collection:sessionStorage.collection,
      geovar:"geovar_action",//obj_maps
      geovar_schema:"GEOVAR_ACTION",//obj_maps
      geovar_slug:'get_data',//filter
      ct_slug:'actionsList'//,//'item' or 'single_object' or 'full_object'
    }
    a234_create_main_list(opt);
    //dyn_functions['prepare_collection_'+sessionStorage.collection](MAPSLUG);

  }
  else if(sessionStorage.collection==='geovar_collection_edit'){

    opt = {
      collection:sessionStorage.collection,
      geovar:"geovar_collection",//obj_maps
      geovar_schema:"GEOVAR_COLLECTION",//obj_maps
      geovar_slug:'update_geovar_json',//filter
      ct_slug:'collectionsList'//,//'item' or 'single_object' or 'full_object'
    }
    a234_create_main_list(opt);
    //dyn_functions['prepare_collection_'+sessionStorage.collection](MAPSLUG);

  }
  else if(sessionStorage.collection==='geovar_button_edit'){

    opt = {
      collection:sessionStorage.collection,
      geovar:"geovar_button",//obj_maps
      geovar_schema:"GEOVAR_BUTTON",//obj_maps
      geovar_slug:'btn_mapid',//filter
      ct_slug:'buttonsList'//,//'item' or 'single_object' or 'full_object'
    }
    a234_create_main_list(opt);
    //dyn_functions['prepare_collection_'+sessionStorage.collection](MAPSLUG);

  }
  else if(sessionStorage.collection==='geovar_dialog_edit'){

    opt = {
      collection:sessionStorage.collection,
      geovar:"geovar_dialog",//obj_maps
      geovar_schema:"GEOVAR_DIALOG",//obj_maps
      geovar_slug:'lyr031_single',//filter
      ct_slug:'dialogsList'//,//'item' or 'single_object' or 'full_object'
    }
    a234_create_main_list(opt);
    //dyn_functions['prepare_collection_'+sessionStorage.collection](MAPSLUG);

  }
  else if(sessionStorage.collection==='geovar_label_edit'){

    opt = {
      collection:sessionStorage.collection,
      geovar:"geovar_label_full",//obj_maps
      geovar_schema:"GEOVAR_LABEL",//obj_maps
      geovar_slug:'en_GB',//filter
      ct_slug:'labelMasterList'//,//'item' or 'single_object' or 'full_object'
    }
    a234_create_main_list(opt);
    //dyn_functions['prepare_collection_'+sessionStorage.collection](MAPSLUG);

  } 
  else{
    console.log('no parts');
    return;
  }

}

function a234_create_main_list(optIn){ //

  let opt = new Array();
  //_onsole.log(optIn)
  //-- REMOVE


  $('#row-'+optIn.ct_slug).remove();

  //-- CREATE NEW ROW FOR LIST WITH BOX
  opt = {
    "slug": optIn.ct_slug,
    "grid": "col-12",
  }
  $('.ct-params').append(part_ct_params(opt));

  //-- CREATE FROM GROUP AND LABEL
  opt = {
    "slug": optIn.ct_slug,
    "label": "Filter",//ONLY NOT DEFINED IN objCol
    //"objCol": {"test2":"tesatB"},
  }

  $('.box-'+optIn.ct_slug).append(
    append_field_label_2(opt)
  );

  //-- CREATE INPUT SELECT
  opt = {
    "slug": optIn.ct_slug,
    "params_control": false,
    //"objCol": {"test2":"tesatB"},
  }
  $('#group-'+optIn.ct_slug).append(''
    +append_options_field_2(opt)
  +'');
  //-- APPEND BLANK OPTION
  //append_leaveblank_option(optIn.ct_slug);

  //-- FILL LIST
  let full_obj = new Array();
  if(optIn.collection==='tb_lyr_map_edit_sub'){

    g_ds = {
      geovar:"obj_maps",//obj_maps
      slug:optIn.geovar_slug_master,//filter
      type:'single_object'//,//'item' or 'single_object' or 'full_object'
    }
    let objItem = get_geovar_obj(g_ds);
    
    objItem.g_lyr.forEach(itemLyr => {
      g_ds = {
        geovar:"geovar_lyr",//obj_maps
        slug:itemLyr,//filter
        type:'single_object'//,//'item' or 'single_object' or 'full_object'
      }
      let objItem2 = get_geovar_obj(g_ds);
      let f = {"properties":objItem2};
      //_onsole.log('objItem2',objItem2);
      full_obj.push(f);
      //_onsole.log('objItem2',objItem2);
    });

  }
  else if(optIn.collection==='geovar_tb_master_edit_sub'){

    g_ds = {
      geovar:"geovar_tb",//obj_maps
      slug:optIn.geovar_slug_master,//filter
      type:'single_object',//'item' or 'single_object' or 'full_object'
      filter_field:'name'
    }
    let objItem = get_geovar_obj(g_ds);

    objItem.features.forEach(objTable => {
      let f = objTable;
      //_onsole.log('objTable',objTable);
      full_obj.push(f);
      //_onsole.log('geovar_tb_master_edit_sub',f);
    });

    //_onsole.log(optIn);

  }
  else if(optIn.collection==='geovar_label_edit_sub'){

    //_onsole.log('optIn',optIn);
    g_ds = {
      geovar:"geovar_label_full",//obj_maps
      slug:optIn.geovar_slug_master,//filter
      type:'single_object',//'item' or 'single_object' or 'full_object'
      filter_field:'name'
    }
    let objItem = get_geovar_obj(g_ds);
    //_onsole.log('objItem',objItem);
    objItem.features.forEach(objTable => {
      let f = objTable;
      //_onsole.log('objTable',objTable);
      full_obj.push(f);
      //_onsole.log('geovar_tb_master_edit_sub',f);
    });

    //_onsole.log(optIn);

  }
  else{
    g_ds = {
      "geovar":optIn.geovar,//'item' or 'single_object' or 'full_object'
      "type":'full_object'//,//'item' or 'single_object' or 'full_object'
    }
    full_obj = get_geovar_obj(g_ds);
  }

  if(optIn.geovar_slug===undefined){
    //-- APPEND BLANK OPTION
    append_leaveblank_option(optIn.ct_slug);
  }

  //_onsole.log('collection',optIn.collection=='tb_lyr_style_edit')
  //_onsole.log('full_obj',full_obj)
  //_onsole.log(optIn)
  full_obj.forEach(el => {

    console.log(el)
    let p = new Array();
    if(optIn.collection=='geovar_label_edit'){
      p = el;
    }
    else{
      p = el.properties;
    }
    
    let selected = false;
    let option_label = '';
    let filter_field = 'g_slug';

    if(optIn.geovar_slug!=undefined){

      if(optIn.geovar_filter_field!=undefined){
        if(p[optIn.geovar_filter_field] == optIn.geovar_slug){
          selected = true;
        }
      }
      else{
        if(p.g_slug == optIn.geovar_slug){
          selected = true;
        }
      }

    }

    if(optIn.geovar_filter_field!=undefined){
      filter_field = optIn.geovar_filter_field;
    }

    if(optIn.collection=='tb_lyr_style_edit'){
      option_label = p.g_master+' - '+p.attr_filter_propertyname+' - '+p.attr_filter_literal;
    }
    else if(optIn.collection=='geovar_label_edit'){
      option_label = p.name;
    }
    else{
      option_label = p.g_label;
    }
    //_onsole.log('filter_field',p[filter_field])
    $('#input-'+optIn.ct_slug).append(
      new Option( option_label,p[filter_field], false, selected)
    );

    if(p.feat_type=='group'){

      g_ds1 = {
        "geovar":optIn.geovar,//'item' or 'single_object' or 'full_object'
        "objects":p.g_options,
        "type":'multiple_object'//,//'item' or 'single_object' or 'full_object'
      }
      objects = get_geovar_obj(g_ds1);
      //_onsole.log('objects',objects);
      // if(obj_lyr.properties.g_options!=undefined){
      objects.forEach(objLyr => {
        let p2 = objLyr.properties;
        $('#input-'+optIn.ct_slug).append(
          new Option( ' > ' + p2.g_label,p2.g_slug, false,false)
        );
      });
      // }
    }


  });

  opt = {
    "tb_map_edit": {
      collection:optIn.collection,
      geovar:optIn.geovar,//obj_maps
      geovar_schema:optIn.geovar_schema,//obj_maps
      geovar_slug:optIn.geovar_slug,//filter
      ct_slug:'mapFields'//,//'item' or 'single_object' or 'full_object'
    },
    "tb_lyr_edit": {
      collection:optIn.collection,
      geovar:optIn.geovar,//obj_maps
      geovar_schema:optIn.geovar_schema,//obj_maps
      geovar_slug:optIn.geovar_slug,//filter
      ct_slug:'lyrFields'//,//'item' or 'single_object' or 'full_object'
    },
    "tb_lyr_map_edit": {
      collection:optIn.collection+'_sub',
      geovar:"geovar_lyr",//obj_maps
      geovar_schema:"TB_LYR",//obj_maps
      geovar_slug_master:optIn.geovar_slug,//filter
      ct_slug:'tb_zzz'//,//'item' or 'single_object' or 'full_object'
    },
    "tb_lyr_map_edit_sub": {
      collection:optIn.collection,
      geovar:optIn.geovar,//obj_maps
      geovar_schema:optIn.geovar_schema,//obj_maps
      geovar_slug:optIn.geovar_slug_master,//filter
      ct_slug:'lyrFields2'//,//'item' or 'single_object' or 'full_object'
    },
    "tb_lyr_style_edit": {
      collection:optIn.collection,
      geovar:optIn.geovar,//obj_maps
      geovar_schema:optIn.geovar_schema,//obj_maps
      geovar_slug:optIn.geovar_slug,//filter
      ct_slug:'lyrstyleFields'//,//'item' or 'single_object' or 'full_object'
    },
    "geovar_master_edit": {
      collection:optIn.collection,
      geovar:optIn.geovar,//obj_maps
      geovar_schema:optIn.geovar_schema,//obj_maps
      geovar_slug:optIn.geovar_slug,//filter
      ct_slug:'mastertableFields'//,//'item' or 'single_object' or 'full_object'
    },
    "geovar_tb_master_edit": {
      collection:optIn.collection+'_sub',
      geovar:'geovar_tb',//obj_maps
      geovar_schema:"GEOVAR_TB",//obj_maps
      geovar_slug_master:optIn.geovar_slug,//filter
      //geovar_slug:optIn.geovar_slug,//filter
      ct_slug:'tablesMasterList',//'item' or 'single_object' or 'full_object'
      geovar_filter_field:'item_token'//if it's not g_slug
    },
    "geovar_tb_master_edit_sub": {
      collection:optIn.collection,
      geovar:optIn.geovar,//obj_maps
      geovar_schema:optIn.geovar_schema,//obj_maps
      geovar_slug:optIn.geovar_slug_master,//filter
      ct_slug:'tablecolFields'//,//'item' or 'single_object' or 'full_object'
    },
    "geovar_action_edit": {
      collection:optIn.collection,
      geovar:optIn.geovar,//obj_maps
      geovar_schema:optIn.geovar_schema,//obj_maps
      geovar_slug:optIn.geovar_slug,//filter
      ct_slug:'actionFields'//,//'item' or 'single_object' or 'full_object'
    },
    "geovar_collection_edit": {
      collection:optIn.collection,
      geovar:optIn.geovar,//obj_maps
      geovar_schema:optIn.geovar_schema,//obj_maps
      geovar_slug:optIn.geovar_slug,//filter
      ct_slug:'collectionFields'//,//'item' or 'single_object' or 'full_object'
    },
    "geovar_button_edit": {
      collection:optIn.collection,
      geovar:optIn.geovar,//obj_maps
      geovar_schema:optIn.geovar_schema,//obj_maps
      geovar_slug:optIn.geovar_slug,//filter
      ct_slug:'buttonFields'//,//'item' or 'single_object' or 'full_object'
    },
    "geovar_dialog_edit": {
      collection:optIn.collection,
      geovar:optIn.geovar,//obj_maps
      geovar_schema:optIn.geovar_schema,//obj_maps
      geovar_slug:optIn.geovar_slug,//filter
      ct_slug:'dialogFields'//,//'item' or 'single_object' or 'full_object'
    },
    "geovar_label_edit": {
      collection:optIn.collection+'_sub',
      geovar:'geovar_label_full',//obj_maps
      geovar_schema:"GEOVAR_LABEL",//obj_maps
      geovar_slug_master:optIn.geovar_slug,//filter
      //geovar_slug:optIn.geovar_slug,//filter
      ct_slug:'labelsList',//,//'item' or 'single_object' or 'full_object'
      //geovar_filter_field:'name'//if it's not g_slug
      geovar_filter_field:'item_token'//if it's not g_slug
    },
    "geovar_label_edit_sub": {
      collection:optIn.collection,
      geovar:optIn.geovar,//obj_maps
      geovar_schema:optIn.geovar_schema,//obj_maps
      geovar_slug:optIn.geovar_slug_master,//filter
      ct_slug:'labelFields'//,//'item' or 'single_object' or 'full_object'
    }
  }

  if(optIn.geovar_filter_field!=undefined){
    opt[optIn.collection].geovar_filter_field = optIn.geovar_filter_field;
  }

  $('#input-'+optIn.ct_slug).on('change', function() {

    if(optIn.collection==='tb_lyr_map_edit'){
      opt[optIn.collection].geovar_slug_master = $(this).find(":selected").val();
      a234_create_main_list(opt[optIn.collection]);
    }
    else if(optIn.collection==='geovar_tb_master_edit'){
      opt[optIn.collection].geovar_slug_master = $(this).find(":selected").val();
      a234_create_main_list(opt[optIn.collection]);
    }
    else if(optIn.collection==='geovar_label_edit'){
      opt[optIn.collection].geovar_slug_master = $(this).find(":selected").val();
      a234_create_main_list(opt[optIn.collection]);
    }
    else{
      opt[optIn.collection].geovar_slug = $(this).find(":selected").val();
      a234_edit_fields(opt[optIn.collection]);
    }
    
  });

  if(optIn.collection==='tb_lyr_map_edit'){

    a234_create_main_list(opt[optIn.collection]);

  }
  else if(optIn.collection==='geovar_tb_master_edit'){

    a234_create_main_list(opt[optIn.collection]);

  }
  else if(optIn.collection==='geovar_label_edit'){

    a234_create_main_list(opt[optIn.collection]);

  }
  else{

    a234_edit_fields(opt[optIn.collection]);

  }

  //--
}

function a234_edit_fields(optIn){


  let ds=new Array();
  let opt=new Array();

  //-- REMOVE ROW MAP FIELDS
  $('#row-'+optIn.ct_slug).remove();

  //-- CREATE NEW ROW MAP FIELDS WITH BOX
  opt = {
    "slug": optIn.ct_slug,
    "grid": "col-12",
  }
  $('.ct-params').append(part_ct_params(opt));

  //_onsole.log('optIn',optIn);

  ds = {
    geovar:optIn.geovar,//obj_maps
    slug:optIn.geovar_slug,//filter
    type:'single_object'//,//'item' or 'single_object' or 'full_object'
  }

  if(optIn.geovar_filter_field!=undefined){
    ds.filter_field = optIn.geovar_filter_field;
  }

  if(optIn.collection=='geovar_tb_master_edit_sub'){
    ds.custom = 'geovar_tb_master_edit_sub';
  }

  if(optIn.collection=='geovar_label_edit_sub'){
    ds.custom = 'geovar_label_edit_sub';
  }

  let objItem = get_geovar_obj(ds);
  //_onsole.log(objItem)
  if(objItem.length==0){

    return;
  }

  responseString=objItem;
  dataString=objItem;

  ds = {
    geovar:'geovar_tb',
    schema:optIn.geovar_schema,//filter
    type:'table_schema'//,//'item' or 'single_object' or 'full_object'
  }
  let objCols = get_geovar_obj(ds);
  //_onsole.log('objCols',objCols);

  objCols.features.forEach(objCol => {
    //_onsole.log(objCol)
    //_onsole.log(objItem)
    let pCol = objCol.properties;
    
    //-- CHOOSE VISIBLE COLUMNS
    if(pCol.g_meta===1){

      //_onsole.log(pCol);
      //let valItem = objItem[pCol.g_slug];

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

  //-- ADD API PARAMS

  let apiParams = [
    {"slug":"fn_group","params_control": true,"objItem":{"fn_group":"geodata"},"pCol":{"form_type":"unique"}},
    {"slug":"action","params_control": true,"objItem":{"action":"modify_data"},"pCol":{"form_type":"unique"}},
    {"slug":"collection","params_control": true,"objItem":{"collection":"update_addon_geovar"},"pCol":{"form_type":"unique"}},
    {"slug":"table","params_control": true,"objItem":{
        "table":optIn.geovar_schema
      },
      "pCol":{"form_type":"unique"}
    },
  ]

  apiParams.forEach(opt => {

    opt.label=opt.slug;

    $('.box-'+optIn.ct_slug).append(
      append_field_label_2(opt)
    );

    $('#group-'+opt.slug).append(
      append_simple_field_2(opt)
    );

  });

  //-- ADD SUBMIT BUTTON
  // $( ".params-control" ).keyup(function() {
  //   // _onsole.log($(this).val());
  //   const params = document.querySelectorAll('.params-control');

  //   var iSubmit=1;
  //   Array.from(params).forEach((element, index) => {

  //     //_onsole.log(element.getAttribute('field_slug'));
  //     //_onsole.log(element.value);
  //     dataString[element.getAttribute('field_slug')] = element.value;

  //     // _onsole.log(element.value);
  //     if(element.getAttribute('required')==1){
  //       if( element.value.length > 0 ) {
  //         element.classList.remove('is-invalid');
  //       }
  //       else{
  //         iSubmit=0;
  //         // _onsole.log('disabling');
  //         element.classList.add('is-invalid');
  //       }
  //     }
  //   });

  //   if(iSubmit==0){
  //     $('.submit-params').attr('disabled',true);
  //   }
  //   else{
  //     $('.submit-params').attr('disabled',false);
  //   }

  //   //_onsole.log(dataString);

  // });

}
