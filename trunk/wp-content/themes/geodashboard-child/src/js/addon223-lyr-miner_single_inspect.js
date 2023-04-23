
var addon223_data=[
  {
    "MAPSLUG":"mapsit001",
    "municipality":"albissolamarina",
    "example":"CDU_2021122072010",
    "input_text":[
      'DATA_CERT',
      'PROTOCOLLO_CERT',
      'TITOLO',
      'RICHIEDENTE',
      'LUOGO_NASCITA',
      'DATA_NASCITA',
      'CODICE_FISCALE',
      'ANNOTAZIONI',
      'PROTOCOLLO_RICH',
      'CARTA_CERT'
    ],
    "input_data":[
      'RISULTATI_ANALISI',
      'RISULTATI_NORMATIVA',
    ]
  },
  {
    "MAPSLUG":"mapsit002",
    "municipality":"cervo",
    "example":"CDU_20215581985",
    "input_text":[
      'DATA_CERT',
      'NUMERO_CERT',
      'TITOLO',
      'RICHIEDENTE',
      'LUOGO_NASCITA',
      'DATA_NASCITA',
      'LUOGO_RESID',
      'VIA_RESID',
      'CODICE_FISCALE',
      'ANNOTAZIONI',
      'DATA_RICH',
      'PROTOCOLLO_RICH',
      'CARTA_CERT'
    ],
    "input_data":[
      'RISULTATI_ANALISI',
      'RISULTATI_NORMATIVA',
    ]
  },
  {
    "MAPSLUG":"mapsit003",
    "municipality":"fontainemore",
    "example":"CDU_201872711806",
    "input_text":[
      'DATA_CERT',
      'TITOLO',
      'RICHIEDENTE',
      'LUOGO_NASCITA',
      'DATA_NASCITA',
      'CODICE_FISCALE',
      'ANNOTAZIONI',
      'PROTOCOLLO_RICH',
      'CARTA_CERT',
      'SERIALE1',
      'SERIALE2'
    ],
    "input_data":[
      'RISULTATI_ANALISI'
    ]
  },
  {
    "MAPSLUG":"mapsit004",
    "municipality":"garlenda",
    "example":"CDU_20181031846436",
    "input_text":[
      'TITOLO',
      'RICHIEDENTE',
      'PROTOCOLLO_RICH',
      'DATA_RICH',
      'DATA_CERT'
    ],
    "input_data":[
      'RISULTATI_ANALISI'
    ]
  },
  {
    "MAPSLUG":"mapsit005",
    "municipality":"luni",
    "example":"CDU_2018830963963",
    "input_text":[
      'DATA_RICH',
      'PROTOCOLLO_RICH',
      'TITOLO',
      'RICHIEDENTE',
      'IN_QUALITA_DI',
      'DATA_CERT'
    ],
    "input_data":[
      'RISULTATI_ANALISI'
    ]
  },
  {
    "MAPSLUG":"mapsit006",
    "municipality":"rezzoaglio",
    "example":"CDU_20198781020916",
    "input_text":[
      'TITOLO',
      'RICHIEDENTE',
      'LUOGO_NASCITA',
      'DATA_NASCITA',
      'LUOGO_RESID',
      'VIA_RESID',
      'CODICE_FISCALE',
      'ANNOTAZIONI',
      'CARTA_CERT',
    ],
    "input_data":[
      'RISULTATI_ANALISI'
    ]
  },
  {
    "MAPSLUG":"mapsit007",
    "municipality":"vezziportio",
    "example":"CDU_2021115164353785",
    "input_text":[
      'TITOLO',
      'RICHIEDENTE',
      'LUOGO_NASCITA',
      'DATA_NASCITA',
      'LUOGO_RESID',
      'VIA_RESID',
      'CODICE_FISCALE',
      'ANNOTAZIONI',
      'DATA_RICH',
      'PROTOCOLLO_RICH',
      'CARTA_CERT',
      'DATA_CERT'
    ],
    "input_data":[
      'RISULTATI_ANALISI',
      'RISULTATI_NORMATIVA',
    ]
  }
]

dyn_functions['template_by_slug_addon223_inspect_single'] = function(){

  let dlg_slug = 'addon223_inspect_single';

  a223_sheet=[];

  let c = '';

  let dlg_body = '.dlg_'+dlg_slug+''+'_body';

  c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $(dlg_body).append(c);

  c = '<!--box button tab-->'
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  $(dlg_body).append(c);

  c = '<div>'
    +'<div class="col-btn-attrs" style="text-align:left;"></div>'
  +'</div>';
  $(dlg_body).append(c);

  //-- DLG PREPARE BODY

  c = '<!--tab1-->'
    +'<div '
      +'class="dlg_panel panel-tab1" '
      +'style="display:block;font-family:var(--wd-fonts-secondary);">'
      +'</div>'
    +'</div>'
    +'<!--tab1 END-->';

  $(dlg_body).append(c);

  let data2_lyrs = [];

  dMap.analisi01.grLyrToc.forEach(item_lyr => {

    let o = g_meta.geovar_lyr.features;
    let this_obj=o.filter(({properties}) => properties.g_slug === item_lyr);
    let obj_lyr=this_obj[0].properties;

    if(obj_lyr.lyr_type=='group'){
      obj_lyr.g_options.forEach(child_lyr => {
        let child_this_obj=o.filter(({properties}) => properties.g_slug === child_lyr);
        let child_obj_lyr=child_this_obj[0].properties;
        if(child_obj_lyr.queryable==1){
          data2_lyrs.push(child_obj_lyr.g_slug);
        }
      });
    }
    else{
      if(obj_lyr.queryable==1){
        data2_lyrs.push(obj_lyr.g_slug);
      }
    }

  });

  let tab1_parts = [
    { 
      'g_slug': 'part_1',
      'g_type': 'title',
      'title': 'Ispeziona Particelle'
    },
    { 
      'g_slug': 'part_2',
      'g_type': 'badge_box_fix',
      //'title': 'Ispeziona Particelle'
      'array':a223_block
    },
    { 
      'g_slug': 'part_3',
      'g_type': 'data1',
      //'title': 'Report'
    },
    { 
      'g_slug': 'part_4',
      'g_type': 'title',
      'title': 'Report'
    },
    { 
      'g_slug': 'part_5',
      'g_type': 'data2',
      //'title': 'Report'
      'lyrs':data2_lyrs
    },
    { 
      'g_slug': 'part_6',
      'g_type': 'simple_part',
      //'title': 'Report'
    }
  ];

  tab1_parts.forEach(tab1_part_element => {
    dlg_addon223_add_part(tab1_part_element);
  });

}

dlg_close_functions['addon223_inspect_single'] = function(){

}

//--
function append_badge_block_sheet_fix(p){

  c = '<span '
    //+'id="a223-badge-p2-'+p.myid+'" '
    +'class="badge rounded-pill bg-light text-dark" '
    +'style="margin-right:3px;" '
    +'>'+p.myid+'</span>';
  $(p.box).append(c);

}
//--

function dlg_addon223_add_part(tab1_part_element){
  let p = tab1_part_element;

  $('.row-'+p.g_slug).remove();

  let  c = ''
    +'<div class="row row-'+p.g_slug+'">'
      +'<div class="col-12">'
        +'<div class="'+p.g_slug+'">'
        +'</div>'
      +'</div>'
    +'</div>'
    +'';
  $('.panel-tab1').append(c);

  if(p.g_type=='title'){
    c = ''
      +'<div '
        +'style="text-align: center;border: 1px solid black;padding: 5px;margin-bottom: 3px;" '
        +'>'+p.title.toUpperCase()+'</div>';
    $('.panel-tab1 .'+p.g_slug+'').append(c);
  }
  else if(p.g_type=='simple_part'){
    c = ''
      +'<div '
        +'class="box" '
        +'></div>';
    $('.panel-tab1 .'+p.g_slug+'').append(c);
  }
  else if(p.g_type=='badge_box_fix'){
    c = ''
      +'<div '
        +'class="box" '
        +'style="text-align: center;" '
        +'></div>';
    $('.panel-tab1 .'+p.g_slug+'').append(c);
    p.array.forEach(myid => {
      params = {
        box:'.panel-tab1 .'+p.g_slug+' > .box',
        myid:myid
      }
      append_badge_block_sheet_fix(params);
    });
  }
  else if(p.g_type=='data1'){
    c = ''
      +'<div '
        +'class="box" '
        +'></div>'
      +'';
    $('.panel-tab1 .'+p.g_slug+'').append(c);
    a223_inspect_data1('.panel-tab1 .'+p.g_slug+' > .box');
  }
  else if(p.g_type=='data2'){
    
    p.lyrs.forEach(element => {

      let o = g_meta.geovar_lyr.features
      let this_obj=o.filter(({properties}) => properties.g_slug === element);
      let obj_lyr=this_obj[0].properties;

      let faw_class='fa-square-o';
      if(a223_lyrs.includes(element)){
        faw_class='fa-square';
      }
      c = ''
        +'<div '
          +'class="box a223-'+p.g_type+'" '
          +'style="cursor:pointer;" '
          +'id="'+p.g_type+'-'+element+'" '
          +'myid="'+element+'">'
            +'<icon><i class="fa '+faw_class+'" aria-hidden="true"></i></icon>'
            +'&nbsp;<span>' + obj_lyr.g_label +'</span>';
          +'</div>'
        +'';
      $('.panel-tab1 .'+p.g_slug+'').append(c);

    });

    $('.ajs-footer-btn2').append(''
      +'<span class="box-btn_addon223_compose"></span>'
      +'&nbsp;<span class="box-btn_addon223_cdu"></span>'
    +'');

    create_button('btn_addon223_compose');
    create_button('btn_addon223_cdu');

    $('#btn_addon223_compose').prop('disabled',true);
    //$('#btn_addon223_cdu').prop('disabled',true);

    $('.a223-'+p.g_type+'').on('click',function(){

      let myid=$(this).attr('myid');

      if(a223_lyrs.indexOf(myid)>-1){

        a223_lyrs.splice(a223_lyrs.indexOf(myid),1);
        $(this).find('icon > i').removeClass('fa-square');
        $(this).find('icon > i').addClass('fa-square-o');

      }
      else{

        a223_lyrs.push(myid);
        $(this).find('icon > i').removeClass('fa-square-o');
        $(this).find('icon > i').addClass('fa-square');

      }

      enable_btn_addon223_compose();

    });

  }
  else if(p.g_type=='iframe_cdu'){
    c = ''
      +'<div '
        +'class="box-btn_addon223_cdu_view_input" style="text-align: center;" '
        +'>'
      +'</div>'
      +'';
    $('.panel-tab1 .'+p.g_slug+'').html(c);

    create_button('btn_addon223_cdu_view_input');

    c = ''
      +'<div '
        +'class="box" '
        +'>'
        +'<iframe  '
          +'name="a223-iframe" '
          +'id="a223-iframe" '
          +'class="a223-iframe" style="width: 100%;height: 450px;" '
          +'title="description"></iframe>'
      +'</div>'
      +'';
    $('.panel-tab1 .'+p.g_slug+'').append(c);
    a223_inspect_cdu1('.panel-tab1 .'+p.g_slug+' > .box > .a223-iframe');

    $('.box-btn_addon223_cdu_print').remove();
    $('.box-btn_a223_CduOpenCopyPaste').remove();

    $('.ajs-footer-btn2').append(''
      +'&nbsp;<span class="box-btn_addon223_cdu_print"></span>'
    +'');

    create_button('btn_addon223_cdu_print');

    $('.ajs-footer-btn2').append(''
      +'&nbsp;<span class="box-btn_a223_CduOpenCopyPaste"></span>'
    +'');

    opt = {
      itemSlug:'btn_a223_CduOpenCopyPaste',//'btn_closedlg3',
      itemLabel: {
        "default":"Salva documento",
        "it":"Salva documento",
        "en":"Salva documento"
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

    $('.row-part_2').css('display','none');

  }
  else if(p.g_type=='input_fields'){

    let o = addon223_data;
    let this_obj=o.filter((x) => x.MAPSLUG === MAPSLUG);
    //_onsole.log(this_obj);

    let obj_data=this_obj[0];//.properties;

    //_onsole.log(  obj_data  );

    $('.ajs-footer-btn2').append(''
      +'<span class="box-btn_addon223_cdu_request"></span>'
    +'');

    create_button('btn_addon223_cdu_request');

    obj_data.input_text.forEach(element => {
      c = ''
        +'<div '
          +'class="box" '
          +'>'
          +'<div class="form-group">'
            +'<label for="exampleInputEmail1">'+element+'</label>'
            +'<input type="text" class="form-control" id="input-'+element+'" value="'+element+'" />'
          +'</div>'
        +'</div>'
        +'';
      $('.panel-tab1 .'+p.g_slug+'').append(c);
    });

  }
  
}

f_btn['btn_addon223_cdu_view_input']=function(){

  $('.box-btn_addon223_cdu_view_input').remove();
  $('.row-part_2').css('display','block');

}

f_btn['btn_addon223_cdu_print']=function(slug){

  //window.frames["a223-iframe"].focus();
  //window.frames["a223-iframe"].print();
  //window.open(sessionStorage.cdu_baseurl,"_blank");

  var mywindow = window.open('', 'PRINT', 'height=400,width=600');

  // mywindow.document.write('<html><head');
  // mywindow.document.write('</head><body >');
  // mywindow.document.write('<h1>' + document.title  + '</h1>');
  // mywindow.document.write(document.getElementById(elem).innerHTML);
  // mywindow.document.write('</body></html>');
  mywindow.document.write(sessionStorage.cdu_html);

  mywindow.document.close(); // necessary for IE >= 10
  mywindow.focus(); // necessary for IE >= 10*/

  mywindow.print();
  mywindow.close();

  return true;

}

f_btn['btn_a223_CduOpenCopyPaste']=function(slug){

  //window.frames["a223-iframe"].focus();
  //window.frames["a223-iframe"].print();
  window.open(DOMAIN_PROJECT+'/tmp/'+MAPSLUG+'-output-cdu.html',"_blank");

}

f_btn['btn_addon223_cdu_request']=function(slug){

  let tab1_parts = [
    { 
      'g_slug': 'part_1',
      'g_type': 'iframe_cdu',
    }
  ];

  tab1_parts.forEach(tab1_part_element => {
    dlg_addon223_add_part(tab1_part_element);
  });

}

function a223_inspect_data1(box){

  let o = g_meta.geovar_map.features;
  let this_obj=o.filter(({properties}) => properties.g_slug === MAPSLUG);
  let obj_map=this_obj[0].properties;
  let obj_addon=obj_map.g_addon.filter((x) => x.addon === 'addon223');

  if (obj_addon.length>0) {
    //_onsole.log(this_obj2[0].lyr,'defined');
    sessionStorage.a223_lyr=obj_addon[0].lyr;
  }
  else{
    console.log('No lyr defined for', 'addon223');
    return; //exit
  }

  var dataString={
    fn_group:'geodata',
    action:'view_data',
    collection:'lyr_selected_sum',
    qy_name:'A',
    lyr:obj_addon[0].lyr,//'lyrsit004',//'lyr035',
    world:true, // for all records
    geom:false,
    query:true,
    filter_field:'feat_id_ok',
    filter_value:a223_block,
    box:box
  }
  generic_api(dataString,'a223_inspect_data1');

}

dyn_functions['succ_a223_inspect_data1'] = function(r){

  let p = r.features[0].properties;

  let c = ''
    +'Superfcie totale: <span class="numberM" value="'+p.area_tot+'">'+
      p.area_tot+'</span> m<sup>2</sup>'
    +'';
  $(r.ds.box).html(c);
  //format_autoNumeric();
  new AutoNumeric('.numberM',numberM);
  //anElement.options.minimumValue('12343567.89');
  //anElement.options.decimalPlacesRawValue(0);

}

function enable_btn_addon223_compose(){

  if(a223_lyrs.length>0){
    $('#btn_addon223_compose').prop('disabled',false);
    $('#btn_addon223_cdu').prop('disabled',false);
  }
  else{
    $('#btn_addon223_compose').prop('disabled',true);
    $('#btn_addon223_cdu').prop('disabled',true);
  }

}

f_btn['btn_addon223_compose']=function(slug){


  let o = g_meta.geovar_map.features;
  let this_obj=o.filter(({properties}) => properties.g_slug === MAPSLUG);
  let obj_map=this_obj[0].properties;
  let obj_addon=obj_map.g_addon.filter((x) => x.addon === 'addon223');

  if (obj_addon.length>0) {
    //_onsole.log(this_obj2[0].lyr,'defined');
    sessionStorage.a223_lyr=obj_addon[0].lyr;
  }
  else{
    console.log('No lyr defined for', 'addon223');
    return; //exit
  }

  dataString={
    fn_group:'geodata',
    action:'view_data',
    collection:'lyr_intersect_particelle',
    qy_name:'A',
    lyr:'lyr999',//'lyr035',
    input_lyr:obj_addon[0].lyr,
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
  switch_on_lyr_custom(dataString);

}

dyn_functions['a223_compose_extend']=function(r){

  let part='part_6';

  //_onsole.log('a223_compose_extend');

  r.ds.lyrs.forEach(item_lyr => {

    let o = g_meta.geovar_lyr.features//TB!
    let this_obj=o.filter(({properties}) => properties.g_slug === item_lyr);
    // _onsole.log('this_obj '+ lyr);
    // _onsole.log(this_obj);
    let obj_lyr=this_obj[0].properties;

    c = ''
      +'<div style="text-align: center;padding: 15px;"><b>'+obj_lyr.g_label+'</b></div>'
      +'<div><table style="width:100%;" class="'+part+'-tb-'+item_lyr+'"><thead></thead><tbody></tbody></table></div>';
    $('.panel-tab1 .'+part+' > .box').append(c);

    c = '<tr>'
      +'<td style="width:60%;text-align:center;" ><u>Zona</u></td>'
      +'<td style="width:20%;text-align:center;" ><u>Superficie</u></td>'
      +'<td style="width:20%;text-align:center;" ><u>%</u></td>'
      +'</tr>';
    $('.'+part+'-tb-'+item_lyr+' > thead').append(c);

    let i=0;
    
    let area_tot = parseFloat($('.panel-tab1 .part_3 > .box > span').attr('value'));
    r['features_'+item_lyr].forEach(element => {

      let p = element.properties
      let percent = (p.sup_intersection/area_tot)*100;
      c = '<tr>'
        +'<td>'+p.id_z_zone+'</td>'
        +'<td style="text-align:right;"><span class="numberM-'+item_lyr+'-'+i+'">'+p.sup_intersection+'</span> m<sup>2</sup></td>'
        +'<td style="text-align:right;"><span class="numberM2-'+item_lyr+'-'+i+'">'+percent+'</span> %</sup></td>'
        +'</tr>';
      $('.'+part+'-tb-'+item_lyr+' > thead').append(c);
      new AutoNumeric('.numberM-'+item_lyr+'-'+i+'',numberM);
      new AutoNumeric('.numberM2-'+item_lyr+'-'+i+'',numberM2);
      i++;
    });

  });

  return;

}

f_btn['btn_addon223_cdu']=function(slug){

  alertify.infoDialog().close();
  alertify.infoDialog().destroy();

  sessionStorage.this_dialog_slug='addon223_cdu_single';
  create_dialog2('addon223_cdu_single');

}

dyn_functions['template_by_slug_addon223_cdu_single'] = function(){

  let dlg_slug = 'addon223_cdu_single';

  let c = '';
  $('.ajs-dialog').addClass('htmlViewer');

  let dlg_body = '.dlg_'+dlg_slug+''+'_body';

  c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $(dlg_body).append(c);

  c = '<!--box button tab-->'
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  $(dlg_body).append(c);

  c = '<div>'
    +'<div class="col-btn-attrs" style="text-align:left;"></div>'
  +'</div>';
  $(dlg_body).append(c);

  //-- DLG PREPARE BODY

  c = '<!--tab1-->'
    +'<div '
      +'class="dlg_panel panel-tab1" '
      +'style="display:block;font-family:var(--wd-fonts-secondary);">'
      +'</div>'
    +'</div>'
    +'<!--tab1 END-->';

  $(dlg_body).append(c);

  let tab1_parts = [
    { 
      'g_slug': 'part_2',
      'g_type': 'input_fields',
    }
  ];

  tab1_parts.forEach(tab1_part_element => {
    dlg_addon223_add_part(tab1_part_element);
  });
}

dlg_close_functions['addon223_cdu_single'] = function(){

}


function a223_inspect_cdu1(box){

  // var dataString={
  //   fn_group:'geodata',
  //   action:'view_data',
  //   collection:'lyr_selected_sum',
  //   qy_name:'A',
  //   lyr:'lyrsit004',//'lyr035',
  //   world:true, // for all records
  //   geom:false,
  //   query:true,
  //   filter_field:'feat_id',
  //   filter_value:a223_block,
  //   box:box
  // }
  // generic_api(dataString,'a223_inspect_cdu1');


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

  let o = addon223_data;
  let this_obj=o.filter((x) => x.MAPSLUG === MAPSLUG);
  //_onsole.log(this_obj);

  let obj_data=this_obj[0];//.properties;

  dataString={
    filter_field:'feat_id_ok',
    filter_value:a223_block,
    box:box,
    g_master:G_MASTER
  }

  obj_data.input_text.forEach(element => {
    dataString[element]= $('#input-'+element).val();
  });

  let o2 = g_meta.geovar_map.features;
  let this_obj2=o2.filter(({properties}) => properties.g_slug === MAPSLUG);
  let obj_map=this_obj2[0].properties;
  let obj_addon=obj_map.g_addon.filter((x) => x.addon === 'addon223');

  if (obj_addon.length>0) {
    //_onsole.log(this_obj2[0].lyr,'defined');
    dataString['input_lyr']=obj_addon[0].lyr;
  }
  else{
    console.log('No lyr defined for', 'addon223');
    return; //exit
  }

  let baseUrl = HOME_PROJECT+'/doc/'+obj_data.municipality+'/cdu_'+obj_data.municipality+'.php';

  var toAjax={
    type: "POST",
    url: baseUrl,  
    data:dataString,
    dataType: 'html',
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
    //_onsole.log(r);
    $('.htmlViewer').css('max-width','24cm');
    //$('.htmlViewer').css('height','640px');
    $(box).attr('src', 'data:text/html;charset=utf-8,' + encodeURI(r));
    sessionStorage.cdu_html=r;
  }//success

  $.ajax(toAjax); //ajax

}

dyn_functions['succ_a223_inspect_cdu1'] = function(r){

  // let p = r.features[0].properties;

  // let c = ''
  //   +'Superfcie totale: <span class="numberM" value="'+p.area_tot+'">'+p.area_tot+'</span> m<sup>2</sup>'
  //   +'';
  // $(r.ds.box).html(c);
  // //format_autoNumeric();
  // new AutoNumeric('.numberM',numberM);
  // //anElement.options.minimumValue('12343567.89');
  // //anElement.options.decimalPlacesRawValue(0);

}
