var ds_RegisterLyr = new Array();

dyn_functions['a240_RegisterLyr'] =  function(){

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
    "label":"Choose database table",
    "slug": ct_slug,//optIn.ct_slug,
    //"label": "Map filter",//ONLY NOT DEFINED IN objCol
    //"pCol": pCol,
  }
  $('.box-'+ct_slug).append(
    append_field_label_2(opt)
  );

  ct_slug = 'a240_1_part2';

  c = ''
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
    "label":"Choose WMS",
    "slug": ct_slug,//optIn.ct_slug,
    //"label": "Map filter",//ONLY NOT DEFINED IN objCol
    //"pCol": pCol,
  }
  $('.box-'+ct_slug).append(
    append_field_label_2(opt)
  );

  //-- CREATE BUTTON REGISTER NEW LAYER
  $('.ajs-footer-btn2').append(''
    +'<span class="box-btn_a240_RegisterLyr_run"></span>'
  +'');
  opt = {
    itemSlug:'btn_a240_RegisterLyr_run',//'btn_closedlg3',
    itemLabel: {
      "default":"REGISTER",
      "it":"REGISTRA",
      "en":"REGISTER"
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
  $('#btn_a240_RegisterLyr_run').prop('disabled', true);

  //-- GET DATA TABLE
  let dataString={
    fn_group:'geodata',
    qy_name:'A'
  }
  dataString.action="view_data";
  dataString.collection='viewTablesAndMaster';

  generic_api(dataString,'a240_RegisterLyr_DbTables_list');

  //-- GET DATA WMS
  dataString={
    fn_group:'geodata',
    qy_name:'A'
  }

  dataString.action='view_data';
  dataString.collection='viewGeoserverFLyrs';

  generic_api(dataString,'a240_RegisterLyr_Wms_list');

}

dyn_functions['succ_'+'a240_RegisterLyr_DbTables_list'] = function(r){

  let ct_slug = 'a240_1_part1';

  let fieldOpt = [];

  r.features.forEach(feature => {
    let p = feature.properties;
    fieldOpt.push(
      {"val":p.g_label,"text":p.g_label}
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

  $( "#input-a240_1_part1" ).on('change', function() {

    $('#btn_a240_RegisterLyr_run').prop('disabled', true);

    //_onsole.log($(this).val());
    ds_RegisterLyr.table=$(this).val();
    //_onsole.log(r.features);
    let o = r.features;
    this_obj=o.filter(({properties}) => properties.g_label === $(this).val());
    obj=this_obj[0].properties;
    if(obj.g_slug=='empty'){
      //_onsole.log(obj);
    }
    else{
      console.log('DEV > geomaster "table alias" found');
      return
    }
    //a240_postman_ui($(this).val())
    //Get center of Rome in json format
    
    //a240_InsertLyrFromTable();
    let options = $('#input-a240_1_part2 option');

    let values = $.map(options ,function(option) {
      return option.value;
    });

    $('#input-a240_1_part2').val('null');
    values.forEach(wms_name => {
      if(wms_name==$(this).val()){
        $('#input-a240_1_part2').val(wms_name);
        ds_RegisterLyr.wms=wms_name;//geoserver_name
        $('#btn_a240_RegisterLyr_run').prop('disabled', false);
      }
    });

  });

}

dyn_functions['succ_'+'a240_RegisterLyr_Wms_list'] = function(r){

  let ct_slug = 'a240_1_part2';

  let fieldOpt = [];

  r.featureTypes.featureType.forEach(p => {
    fieldOpt.push(
      {"val":p.name,"text":p.name}
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

  $( "#input-a240_1_part2" ).on('change', function() {

    console.log($(this).val());
    ds_RegisterLyr.wms=$(this).val();//geoserver_name
    $('#btn_a240_RegisterLyr_run').prop('disabled', false);

  });

}

f_btn['btn_a240_RegisterLyr_run']=function(optIn){

  $('#btn_a240_RegisterLyr_run').prop('disabled', true);

  dataString={
    fn_group:'geodata',
    qy_name:'A'
  }

  dataString.action='modify_data';
  dataString.collection='RegisterLyr';
  dataString.table=ds_RegisterLyr.table;
  dataString.wms=ds_RegisterLyr.wms;

  //_onsole.log(dataString)

  generic_api(dataString,'a240_RegisterLyr_run');

}

dyn_functions['succ_'+'a240_RegisterLyr_run'] = function(r){

  a240_1_clean();
  //_onsole.log(r);
  sessionStorage.a240_UpdateLyr=r.feat_tb_lyr[0].properties.g_slug;
  //_onsole.log('DEV > add layer to map');
  dyn_functions['a240_UpdateLyr']();
}