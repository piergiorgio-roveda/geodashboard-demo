dyn_functions['a240_MainAdvanced'] =  function(){

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
  $('.panel-'+'tab1').html(c);

  //-- CREATE FORM GROUP AND LABEL
  opt = {
    "label":"List of available settings",
    "slug": ct_slug,//optIn.ct_slug,
    //"label": "Map filter",//ONLY NOT DEFINED IN objCol
    //"pCol": pCol,
  }
  $('.box-'+ct_slug).append(
    append_field_label_2(opt)
  );

  //-- INPUT FIELD
  opt = {
    "slug": ct_slug,
    "pCol": {
      g_slug: ct_slug,
      data_type:'text',
      //g_placeholder:"Start typing test ...",
      g_options: a240_1_options
    },
    "objItem": {},
  }
  objField_omnivore(opt);

  $( "#input-a240_1_part1" ).on('change', function() {

    //_onsole.log($(this).val());
    a240_postman_ui($(this).val())
    //Get center of Rome in json format
    
  });

  ct_slug = 'a240_1_part2';

  c = ''
    +'<div class="row row-'+'obj_part.g_slug'+'">'
      +'<div class="col-12">'
        +'<div class="ct-'+ct_slug+' card" '
          +'style="'
            +'margin-top: 5px;'
            +'max-height: 300px;'
            +'overflow-y: scroll;'
            +'overflow-x: clip;'
            +'" '
          +'>'
          +'<div class="box box-'+ct_slug+'" '
            +'style="padding:5px;margin-right: -15px;">'
            +'No definitions for this setting yet'
          +'</div>'
        +'</div>'
      +'</div>'
    +'</div>'
    +'';
  $('.panel-'+'tab1').append(c);

  ct_slug = 'a240_1_part3';

  c = ''
    +'<div class="row row-'+ct_slug+'" style="display:none;">'
      +'<div class="col-12">'
        +'<div class="ct-'+ct_slug+' card" '
          +'style="'
            +'margin-top: 5px;'
            +'max-height: 300px;'
            +'overflow-y: scroll;'
            +'overflow-x: clip;'
            +'" '
          +'>'
          +'<div class="box box-'+ct_slug+'" '
            +'style="padding:5px;margin-right: -15px;">'
          +'</div>'
        +'</div>'
      +'</div>'
    +'</div>'
    +'';
  $('.panel-'+'tab1').append(c);

}

function a240_1_clean(){

  $('.box-'+'a240_1_part2').html('');
  $('.box-'+'a240_1_part3').html('');
  $('.ajs-footer-btn2').html('');

}

function a240_postman_ui(slug){

  a240_1_clean();

  let dataString={
    fn_group:'geodata',
    //action:G_ACTION,
    qy_name:'A'
  }

  if(slug=='manmaps-view-all'
    ||slug=='manmaps-view-single'
    ||slug=='manmaps-modify-map-lyrs'){

    dataString.action='view_data';
    dataString.collection='show_table_data';
    dataString.table_slug='TB_MAP';
    dataString.item_token='true';

    generic_api(dataString,slug);

  }
  else if(slug=='manmaps-add-map'){

    dyn_functions['manmaps-add-map-prepare']();

  }
  else if (slug=='manlyrs-tb-and-master'
    ||slug=='manlyrs-add-master'
    ||slug=='manlyrs-update-master'
    //||slug=='manlyrs-verify-colums'
    ||slug=='manlyrs-list-lyrs-master'
    ||slug=='manlyrs-add-lyr-master'
    ||slug=='manlyrs-list-geoserver-flyrs'
    ||slug=='manlyrs-link-geoserver-lyr'
    ||slug=='manlyrs-list-geoserver-styles'
    ||slug=='manlyrs-add-geoserver-style'){

      dyn_functions[slug+'-prepare']();
  }
  else{

    $('.box-'+'a240_1_part2').html('No definitions for this setting yet');

  }

}

dyn_functions['succ_manmaps-view-all'] = function(r){

  let ct_slug = 'a240_1_part2';

  let c = ''
    +'<table class="table table-sm table-striped '
      //+'table-hover '
      //+'table-bordered '
      +'" style="margin:-5px;">'
      +'<thead>'
        +'<tr>'
          +'<th scope="col">#</th>'
        +'</tr>'
      +'</thead>'
      +'<tbody>'
      +'</tbody>'
    +'</table>'
  +'';
  $('.box-'+ct_slug).html(c);

  r.features.forEach(element => {
  
    let p = element.properties;
    let c = ''
      +'<tr>'
        +'<td scope="row" item_token="'+p.item_token+'">'+p.g_label+'</td>'
      +'</tr>'
    +'';
    $('.box-'+'a240_1_part2 table tbody').append(c);

  });

}

dyn_functions['succ_manmaps-view-single'] = function(r){

  let ct_slug = 'a240_1_part2';

  let c = ''
    +'<table class="table table-sm table-striped '
      //+'table-hover '
      //+'table-bordered '
      +'" style="margin:-5px;">'
      +'<thead>'
        +'<tr>'
          +'<th scope="col">#</th>'
          +'<th scope="col">Value</th>'
        +'</tr>'
      +'</thead>'
      +'<tbody>'
      +'</tbody>'
    +'</table>'
  +'';
  $('.box-'+ct_slug).html(c);

  //let myOptions = [];

  r.features.forEach(element => {
  
    let p = element.properties;
    //let opt = new Array();
    if(p.g_slug==MAPSLUG){

      let c = ''
        +'<tr>'
          +'<td scope="row">g_label</td>'
          +'<td scope="row">'+p.g_label+'</td>'
        +'</tr>'
      +'';
      $('.box-'+ct_slug+' table tbody').append(c);

      let g_attributes = Object.keys(p.g_attributes);

      g_attributes.forEach(element => {

        c = ''
          +'<tr>'
            +'<td scope="row">'+element+'</td>'
            +'<td scope="row">'+p.g_attributes[element]+'</td>'
          +'</tr>'
        +'';
        $('.box-'+ct_slug+' table tbody').append(c);

      });

    }

  });

}

dyn_functions['succ_manmaps-modify-map-lyrs'] = function(r){

  let ct_slug = 'a240_1_part2';

  //-- CREATE FORM GROUP AND LABEL
  let opt = {
    "label":"List of Map Layers",
    "slug": ct_slug,//optIn.ct_slug,
    //"label": "Map filter",//ONLY NOT DEFINED IN objCol
    //"pCol": pCol,
  }
  $('.box-'+ct_slug).append(
    append_field_label_2(opt)
  );

  let c = ''
    +'<table class="table table-sm table-striped '
      //+'table-hover '
      //+'table-bordered '
      +'" style="margin:-5px;">'
      +'<thead>'
        +'<tr>'
          +'<th scope="col" style="width: 25%">Slug</th>'
          +'<th scope="col">Layers</th>'
          +'<th scope="col" style="width: 5%"></th>'
        +'</tr>'
      +'</thead>'
      +'<tbody>'
        +'<tr class="tr-'+ct_slug+'-nolyrs">'
          +'<th scope="col" colspan="3">No layers found</th>'
        +'</tr>'
      +'</tbody>'
    +'</table>'
  +'';
  $('#group-'+ct_slug).append(c);

  //let myOptions = [];

  r.features.forEach(element => {
  
    let p = element.properties;
    //let opt = new Array();

    a240_lyrs=[];

    if(p.g_slug==MAPSLUG){

      if(p.g_lyr!=null && p.g_lyr.length>0){

        $('.box-'+ct_slug+' table tbody').html('');

        p.g_lyr.forEach(item_lyr => {

          let o = g_meta.geovar_lyr.features;
          let this_obj=o.filter(({properties}) => properties.g_slug === item_lyr);
          let obj_lyr=this_obj[0].properties;

          a240_lyrs.push(obj_lyr.g_slug);

          c = ''
            +'<tr class="tr-'+'a240_1_part2-'+obj_lyr.g_slug+'">'
              +'<td scope="row" '
                +'style="vertical-align: middle;">'
                +obj_lyr.g_slug+'</td>'
              +'<td scope="row" '
                +'style="vertical-align: middle;">'
                +obj_lyr.g_label+'</td>'
              +'<td scope="row" style="padding-right: 15px;">'
                +'<button type="button" '
                  +'onclick="a240_removeLyr(\''+obj_lyr.g_slug+'\')"'
                  +'class="btn a240-remove-lyr btn-sm btn-outline-dark" '
                  +'item_lyr="'+obj_lyr.g_slug+'">'
                  +'<i class="fa fa-minus" aria-hidden="true"></i>'
                +'</button>'
              +'</td>'            
            +'</tr>'
          +'';
          $('.box-'+ct_slug+' table tbody').append(c);

        });

      }

    }

  });

  // document.querySelector(".a240-remove-lyr").addEventListener('click',function(){

  //   console.log('remove lyr',$(this).attr('item_lyr'));
  
  // });

  let item_btn = 'btn_a240_add_map_lyrs';

  $('.ajs-footer-btn2').append(''
    +'<span class="box-'+item_btn+'"></span>'
  +'');

  let meta = {
    'properties':{
      "g_slug": "label_"+item_btn,
      "g_label": "Add"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  opt = {
    itemSlug:item_btn,//'btn_closedlg3',
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

}

f_btn['btn_a240_add_map_lyrs']=function(optIn){

  $('#btn_a240_add_map_lyrs').remove();

  a240Generic_AddBtnRefresh();

  //_onsole.log('btn',optIn);

  var dataString={
    fn_group:'geodata',
    //action:G_ACTION,
    qy_name:'A'
  }

  dataString.action='view_data';
  dataString.collection='show_table_data';
  dataString.table_slug='TB_LYR';
  dataString.item_token='true';

  generic_api(dataString,optIn.g_callback);

}

dyn_functions['succ_btn_a240_add_map_lyrs'] = function(r){

  let ct_slug = 'a240_1_part3';

  //-- CREATE FORM GROUP AND LABEL
  let opt = {
    "label":"List of available Layers",
    "slug": ct_slug,//optIn.ct_slug,
    //"label": "Map filter",//ONLY NOT DEFINED IN objCol
    //"pCol": pCol,
  }
  $('.box-'+ct_slug).append(
    append_field_label_2(opt)
  );
  
  let c = ''
    +'<table class="table table-sm table-striped '
      //+'table-hover '
      //+'table-bordered '
      +'" style="margin:-5px;">'
      +'<thead>'
        +'<tr>'
          +'<th scope="col" style="width: 25%">Slug</th>'
          +'<th scope="col">Layers</th>'
          +'<th scope="col" style="width: 5%"></th>'
        +'</tr>'
      +'</thead>'
      +'<tbody>'
      +'</tbody>'
    +'</table>'
  +'';
  $('#group-'+ct_slug).append(c);
  $('.row-'+ct_slug).css('display','');

  r.features.forEach(element => {
  
    let p = element.properties;

    let index = a240_lyrs.indexOf(p.g_slug);
    if (index > -1) {

    }
    else{

      if(p.intoc==1){

        c = ''
          +'<tr class="tr-'+'a240_1_part3-'+p.g_slug+'">'
            +'<td scope="row" '
              +'style="vertical-align: middle;">'
              +p.g_slug+'</td>'
            +'<td scope="row" '
              +'style="vertical-align: middle;">'
              +p.g_label+'</td>'
            +'<td scope="row" style="padding-right: 15px;">'
              +'<button type="button" '
                +'onclick="a240_addLyr(\''+p.g_slug+'\')"'
                +'class="btn a240-add-lyr btn-sm btn-outline-dark" '
                +'item_lyr="'+p.g_slug+'">'
                +'<i class="fa fa-plus" aria-hidden="true"></i>'
              +'</button>'
            +'</td>'
          +'</tr>'
        +'';
        $('.box-'+ct_slug+' table tbody').append(c);

      }


    }

  });

}

// document.querySelector(".a240-remove-lyr").addEventListener('click',function(){

//   console.log('remove lyr',$(this).attr('item_lyr'));

// });
function a240_addLyr(item_lyr){

  $('.tr-'+'a240_1_part2'+'-nolyrs').css('display','none');

  //let item_lyr = $(this).attr('item_lyr');

  a240_lyrs.push(item_lyr);

  $('.tr-'+'a240_1_part3'+'-'+item_lyr).css('display','none');

  let o = g_meta.geovar_lyr.features;
  let this_obj=o.filter(({properties}) => properties.g_slug === item_lyr);
  let obj_lyr=this_obj[0].properties;

  //_onsole.log(a240_lyrs);

  c = ''
    +'<tr class="tr-'+'a240_1_part2-'+item_lyr+'">'
      +'<td scope="row" '
        +'style="vertical-align: middle;">'
        +item_lyr+'</td>'
      +'<td scope="row" '
        +'style="vertical-align: middle;">'
        +obj_lyr.g_label+'</td>'
      +'<td scope="row" style="padding-right: 15px;">'
        +'<button type="button" '
          +'onclick="a240_removeLyr(\''+item_lyr+'\')"'
          +'class="btn a240-remove-lyr btn-sm btn-outline-dark" '
          +'item_lyr="'+item_lyr+'">'
          +'<i class="fa fa-minus" aria-hidden="true"></i>'
        +'</button>'
      +'</td>' 
    +'</tr>'
  +'';
  $('.box-'+'a240_1_part2'+' table tbody').append(c);

  //--DB
  let opt = {
    "g_callback": 'a240_updateDbLyr',
  }
  a240Generic_updateDbLyr(opt);

}

function a240_removeLyr(item_lyr){
  

  var index = a240_lyrs.indexOf(item_lyr);
  if (index > -1) {
    a240_lyrs.splice(index, 1);
  }

  if(a240_lyrs.length==0){
    $('.tr-'+'a240_1_part2'+'-nolyrs').css('display','');
  }

  $('.tr-'+'a240_1_part3'+'-'+item_lyr).css('display','');

  $('.tr-'+'a240_1_part2'+'-'+item_lyr).remove();

  //_onsole.log(a240_lyrs);

  //--DB
  let opt = {
    "g_callback": 'a240_updateDbLyr',
  }
  a240Generic_updateDbLyr(opt);

}
