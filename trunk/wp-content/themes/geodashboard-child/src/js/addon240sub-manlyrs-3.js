
dyn_functions['manlyrs-link-geoserver-lyr-prepare'] = function(){

  a240_lyr_selected=[];
  a240_geoserver_selected=[];

  let ct_slug = 'a240_1_part2';

  //--DISPLAY BOX FORM
  $('.row-'+ct_slug).css('display','');

  //-- CREATE FORM GROUP AND LABEL
  let opt = {
    "label":"...",
    "slug": ct_slug,//optIn.ct_slug,
    //"label": "Map filter",//ONLY NOT DEFINED IN objCol
    //"pCol": pCol,
  }
  $('.box-'+ct_slug).append(
    append_field_label_2(opt)
  );

  //-- CREATE TABLE
  let c = ''
    +'<table class="table table-sm table-striped '
      //+'table-hover '
      //+'table-bordered '
      +'" style="margin:-5px;">'
      +'<thead></thead>'
      +'<tbody></tbody>'
    +'</table>'
  +'';
  $('#group-'+ct_slug).append(c);

  //-- CREATE BUTTON ADD NEW MAP
  //-- no buttons in this case

  //---

  dyn_functions['manLyrs-LinkGeoserverLyr-addList']();

}

dyn_functions['manLyrs-LinkGeoserverLyr-addList'] = function(){

  let ct_slug = 'a240_1_part2';

  $('.ct-'+ct_slug).css('overflow-x','scroll');
  $('.ct-'+ct_slug).css('overflow-y','scroll');

  $('.box-'+ct_slug).css('margin-right','-15px');

  //-- GET DATA
  let dataString={
    fn_group:'geodata',
    qy_name:'A'
  }
  dataString.action="view_data";
  dataString.collection='show_table_data';
  dataString.table_slug='TB_LYR';
  dataString.item_token='true';

  generic_api(dataString,'manLyrs-LinkGeoserverLyr-addList');

}

dyn_functions['succ_'+'manLyrs-LinkGeoserverLyr-addList'] = function(r){

  let ct_slug = 'a240_1_part2';

  let cols = [
    "button1",
    "g_slug",
    "g_label",
    "geoserver_name"
  ]

  //-- CREATE TABLE HEAD
  let html = '';
  cols.forEach(col => {
    if(col=='button1'){
      col = '';
    }
    html += '<th>'+col+'</th>';
  });
  let c = ''
    +'<tr>'
      +html
    +'</tr>'
  +'';
  $('#group-'+ct_slug +' table thead').append(c);

  //-- CREATE TABLE BODY
  r.features.forEach(feature => {
  
    let p = feature.properties;

    let html = '';
    cols.forEach(col => {
      if(col=='button1'){
        if(p.geoserver_name==''){
          html += '<td scope="row">'
            +'<button type="button" '
              +'onclick="a240_manLyrs_LinkGeoserverLyr_link(\''+p.item_token+'\')"'
              +'class="btn btn1-'+p.item_token+' btn-sm btn-outline-dark" '
              +'item="'+p.g_slug+'">'
              +'<i class="fa fa-link" aria-hidden="true"></i>'
            +'</button>'
          +'</td>';
        }
        else{
          html += '<td scope="row">'
          +'</td>';
        }

      }
      else{
        html += '<td scope="row" '
          +'class="td-'+col+'-'+p.item_token+'" '
          +'style="padding-right: 15px;">'+p[col]+'</td>';
      }
    });

    c = ''
      +'<tr>'
        +html
      +'</tr>'
    +'';
    $('#group-'+ct_slug +' table tbody').append(c);

    

  });

}

function a240_manLyrs_LinkGeoserverLyr_link(item){

  //-- postman:manlyrs-list-lyrs-master
  a240_lyr_selected.push(item);

  let dataString={
    fn_group:'geodata',
    //action:G_ACTION,
    qy_name:'A'
  }
  dataString.action='view_data';
  dataString.collection='viewGeoserverFLyrs';

  generic_api(dataString,'a240_manLyrs_LinkGeoserverLyr_link');

}

dyn_functions['succ_'+'a240_manLyrs_LinkGeoserverLyr_link'] = function(r){

  a240_geoserver_selected=[];

  let ct_slug = 'a240_1_part3';

  $('.box-'+ct_slug).html('');

  //-- CREATE FORM GROUP AND LABEL
  let opt = {
    "label":"List of available Geoserver",
    "slug": ct_slug,//optIn.ct_slug,
    //"label": "Map filter",//ONLY NOT DEFINED IN objCol
    //"pCol": pCol,
  }
  $('.box-'+ct_slug).append(
    append_field_label_2(opt)
  );

  //-- CREATE BUTTON LINK disabled
  $('.ajs-footer-btn2').append(''
    +'<span class="box-btn_a240_manLyrs_LinkGeoserverLyr_link"></span>'
  +'');
  opt = {
    itemSlug:'btn_a240_manLyrs_LinkGeoserverLyr_link',//'btn_closedlg3',
    itemLabel: {
      "default":"LINK",
      "it":"COLLEGA",
      "en":"LINK"
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

  $('#btn_a240_manLyrs_LinkGeoserverLyr_link').prop('disabled', true);

  //---  

  let c = ''
    +'<table class="table table-sm table-striped '
      //+'table-hover '
      //+'table-bordered '
      +'" style="margin:-5px;">'
      +'<thead>'
        +'<tr>'
          +'<th scope="col"><!-button--></th>'
          +'<th scope="col">Name</th>'
        +'</tr>'
      +'</thead>'
      +'<tbody>'
      +'</tbody>'
    +'</table>'
  +'';
  $('#group-'+ct_slug).append(c);
  $('.row-'+ct_slug).css('display','');

  r.featureTypes.featureType.forEach(element => {
    //_onsole.log(element)
    let p = element;

    c = ''
      +'<tr class="tr-'+'a240_1_part3-'+p.name+'">'
        +'<td scope="row" '
          +'style="vertical-align: middle;">'
          +'<button type="button" '
              +'onclick="a240_manLyrs_LinkGeoserverLyr_select(\''+p.name+'\')"'
              +'class="btn btn-radio-geoserver btn2-'+p.name+' btn-sm btn-outline-dark" '
              +'item="'+p.name+'">'
              +'<i class="fa fa-circle-thin" aria-hidden="true"></i>'
          +'</button>'
        +'</td>'
        +'<td scope="row" '
          +'style="vertical-align: middle;padding-right: 15px;">'
          +p.name+'</td>'
      +'</tr>'
    +'';
    $('.box-'+ct_slug+' table tbody').append(c);



  });

}

function a240_manLyrs_LinkGeoserverLyr_select(item){

  a240_geoserver_selected=[item];

  $('.btn-radio-geoserver').html('<i class="fa fa-circle-thin" aria-hidden="true"></i>');
  $('.btn2-'+item).html('<i class="fa fa-circle" aria-hidden="true"></i>');

  $('#btn_a240_manLyrs_LinkGeoserverLyr_link').prop('disabled', false);

}

f_btn['btn_a240_manLyrs_LinkGeoserverLyr_link']=function(optIn){

  dataString={
    fn_group:'geodata',
    qy_name:'A'
  }

  dataString.action='view_data';
  dataString.collection='getGeomType';
  dataString.table_slug='TB_LYR';
  dataString.field_name='item_token';
  dataString.field_value=a240_lyr_selected[0];

  generic_api(dataString,'a240_manLyrs_LinkGeoserverLyr_getGeomType');

}

dyn_functions['succ_'+'a240_manLyrs_LinkGeoserverLyr_getGeomType'] = function(r){

  let geomType = r.features[0].properties.geometrytype;

  let opt = {"geomType":geomType};

  a240_manLyrs_LinkGeoserverLyr_update(opt);

}

function a240_manLyrs_LinkGeoserverLyr_update(optIn){

  if(optIn.geomType=='TABLE'){
    alert('TABLE Not implemented yet');
    return;
  }

  let geomType='polygon';
  let styleName='generic_areas';

  if(optIn.geomType=='ST_Point'){
    geomType='point';
    styleName='generic_points';
  }

  dataString={
    fn_group:'geodata',
    qy_name:'A'
  }

  dataString.action='modify_data';
  dataString.collection='update_attributes_by_table';
  dataString.table_slug='TB_LYR';
  dataString.item_token=a240_lyr_selected[0];
  dataString.geomType=geomType;
  dataString.field_and_value=[
    {
      "field": "feat_type",
      "value": geomType // << MANAGE THIS
    },
    {
      "field": "lyr_type",
      "value": "wms"
    },
    {
      "field": "lyr_update",
      "value": "fix"
    },
    {
      "field": "geoserver_name",
      "value": a240_geoserver_selected[0]
    },
    {
      "field": "geoserver_style",
      "value": "tmp_sld"
    },
    {
      "field": "queryable",
      "value": "0"
    },
    {
      "field": "geoserver_style_name",
      "value": styleName
    }
  ];

  generic_api(dataString,'manLyrs_LinkGeoserverLyr_link');

}

dyn_functions['succ_'+'manLyrs_LinkGeoserverLyr_link'] = function(r){

  $('.td-geoserver_name-'+a240_lyr_selected[0]).html(a240_geoserver_selected[0]);
  $('.btn1-'+a240_lyr_selected[0]).css('display','none');

  a240_lyr_selected=[];
  a240_geoserver_selected=[];

  $('#btn_a240_manLyrs_LinkGeoserverLyr_link').prop('disabled', true);

  $('.box-'+'a240_1_part3').html('');

}