
dyn_functions['manmaps-add-map-prepare'] = function(){

  let ct_slug = 'a240_1_part1';

  //--DISPLAY BOX FORM
  $('.row-'+ct_slug).css('display','');

  //-- CREATE FORM GROUP AND LABEL
  let opt = {
    "label":"Attributes for new map",
    "slug": ct_slug,//optIn.ct_slug,
    //"label": "Map filter",//ONLY NOT DEFINED IN objCol
    //"pCol": pCol,
  }
  $('.box-'+ct_slug).append(
    append_field_label_2(opt)
  );

  //-- CREATE BUTTON ADD NEW MAP
  $('.ajs-footer-btn2').append(''
    +'<span class="box-btn_a240_add_new_map"></span>'
  +'');
  opt = {
    itemSlug:'btn_a240_add_new_map',//'btn_closedlg3',
    itemLabel: {
      "default":"ADD",
      "it":"AGGIUNGI",
      "en":"ADD"
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

  //---

  dyn_functions['manmaps-add-map-form']();

}

f_btn['btn_a240_add_new_map']=function(optIn){

  //_onsole.log('btn_a240_add_new_map','DEV');

  var dataString={
    fn_group:'geodata',
    qy_name:'A'
  }

  dataString.field_and_value=[];

  const params = document.querySelectorAll('.params-control');
  Array.from(params).forEach((element, index) => {
    if('a240_1_part2'==element.getAttribute('group')){
      //dataString[element.getAttribute('field_slug')]=element.value;
      dataString.field_and_value.push(
        {
          "field": element.getAttribute('field_slug'),
          "value": element.value
        }
      );
      if(element.getAttribute('field_slug')=='g_label'){
        sessionStorage.setItem('a240_new_map_label', element.value);
      }
    }

  });


  let now = new Date();
  let atomDate = now.toISOString();
  let myInput = 'map_'+atomDate+'';
  let myHash = adler32(myInput);
  //_onsole.log(myHash); // Outputs: 276939473

  dataString.field_and_value.push(
    {
      "field": "g_slug",
      "value": "map"+myHash
    }
  );

  sessionStorage.setItem('a240_new_map_slug', "map"+myHash);

  dataString.action="modify_data";
  dataString.collection='insertNewItemByTable';
  dataString.table_slug='TB_MAP';
  dataString.field_and_value.push(
    {
      "field": "g_attributes",
      "value": {
        "label_main_logo": DFL_LABEL_MAIN_LOGO_BASE,
        "language": "en",
        "map_title": sessionStorage.a240_new_map_label,
        "geoserver_workspace": WORKSPACE,
        "geoserver_url": GEOSERVER_URL,
        "df_logo_owner": DFL_LOGO_OWNER_BASE,
        "df_logo_login": DFL_LOGO_LOGIN_BASE,
        "erp_owner_geoinfo_azienda": ERP_OWNER_GEOINFO_AZIENDA,
        "client_doc_credit": "CLIENT_DOC_CREDIT",
        "apple_touch_icon": FAVICON_APPLE_BASE,
        "favicon": FAVICON_BASE,
        "favicon32": FAVICON32_BASE,
        "favicon16": FAVICON16_BASE
      }
    }
  );  
  generic_api(dataString,'btn_a240_add_new_map');

}

dyn_functions['succ_btn_a240_add_new_map'] = function(r){

  $('#btn_a240_add_new_map').remove();

  $('.ajs-footer-btn2').append(''
    +'<span class="box-btn_a240_open_new_map"></span>'
  +'');

  opt = {
    itemSlug:'btn_a240_open_new_map',//'btn_closedlg3',
    itemLabel: {
      "default":"OPEN",
      "it":"APRI",
      "en":"OPEN"
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

}

f_btn['btn_a240_open_new_map']=function(optIn){

  let newMap = sessionStorage.a240_new_map_slug;

  window.open(window.location.href+newMap+'/',"_self");

}

dyn_functions['manmaps-add-map-form'] = function(){

  let ct_slug = 'a240_1_part2';

  $('.ct-'+ct_slug).css('overflow-x','');
  $('.ct-'+ct_slug).css('overflow-y','');

  $('.box-'+ct_slug).css('margin-right','0px');

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
      }/* ,
      {
        "type": "Feature",
        "properties": {
          "g_slug": "list_basemap",
          "g_label": "Base maps",
          "g_description": "...",
          "g_placeholder": "[]"
        }
      } */
    ]
  }

  objCols.features.forEach(objCol => {
  
    let optIn = {
      "ct_slug":ct_slug
    }

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
      "objItem": [],
    }
    objField_omnivore(opt);

    $('.control-'+pCol.g_slug).attr('group',ct_slug);

  });

}