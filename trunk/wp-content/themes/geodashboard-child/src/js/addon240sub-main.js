dyn_functions['a240_DlgExt_Main'] =  function(){

  //$('.row-'+slug).remove();

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
    "label":"Choose an option",
    "slug": ct_slug,//optIn.ct_slug,
    //"label": "Map filter",//ONLY NOT DEFINED IN objCol
    //"pCol": pCol,
  }
  $('.box-'+ct_slug).append(
    append_field_label_2(opt)
  );

  let fieldOpt = [
    {"val":"main-add-map","text":"Add new map"},
    {"val":"main-register-lyr","text":"Register new Layer"},
    {"val":"main-update-lyr","text":"Modify Layer"},
    {"val":"main-update-addons","text":"Select Addons"},
    {"val":"main-advanced","text":"Advanced"},
  ];

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

    //_onsole.log($(this).val());
    a240_DlgExt_Main_ui($(this).val())
    //Get center of Rome in json format
    
  });

}

function a240_DlgExt_Main_ui(slug){

  if(slug=='main-add-map'){

    console.log('main-add-map')
  }
  else if(slug=='main-register-lyr'){

    dyn_functions['a240_RegisterLyr']();

  }
  else if(slug=='main-update-lyr'){
    
    sessionStorage.a240_UpdateLyr='empty';
    dyn_functions['a240_UpdateLyr']();

  }
  else if(slug=='main-advanced'){
  
    dyn_functions['a240_MainAdvanced']();

  }
  else if(slug=='main-update-addons'){
  
    dyn_functions['a240_UpdateAddons']();

  }

}