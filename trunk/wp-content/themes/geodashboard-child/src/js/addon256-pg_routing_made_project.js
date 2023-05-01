var a256_mapReady = 0;

dyn_functions['addon256-pg_routing_made_project'+'_ready'] = function(){

  $('.box-usrprofile').css('display','block');

  $('.box-usrprofile').append('<div '
    +'class="box-btn_routing_made_project box-info-2-btn d-grid gap-2" '
    +'style="margin-top:5px;"></div>');

  prepare_a256();

}

function prepare_a256(){

  let itemBtn = 'btn_routing_made_project';

  let gLang_slug="label_"+itemBtn;
  let gLang_label="<i class=\"bi bi-arrow-right-square\"></i>";

  gLang[gLang_slug]=gLang_label;

  let GroupStyleBtn = 'btn-main-sidebar btn-on-map';
  let btnMeta = {
    'properties':{
      "g_slug": itemBtn,
      "g_label": "label_"+itemBtn,
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark " + GroupStyleBtn
    }
  }
  g_meta.geovar_button.features.push(btnMeta);

  create_button(itemBtn);

}

f_btn['btn_routing_made_project']=function(slug){

  let item_addon = 'routing_made_project';
  let item_dlg = 'dlg_'+item_addon;

  var meta = {
    'properties':{
      'g_slug': item_dlg+'_single',
      'g_label': 'Strart Routing Project',
      'g_template': 'template_by_slug',
      'g_description': null
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  sessionStorage.this_dialog_lyr=item_dlg;
  sessionStorage.this_dialog_slug=item_dlg+'_single';

  create_dialog2(sessionStorage.this_dialog_slug);

  return;

}

dyn_functions['template_by_slug_'+'dlg_'+'routing_made_project'+'_single'] = function(){

  let dlg_slug = 'dlg_'+'routing_made_project'+'_single';

  let c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //box button tab
  c = ''+
    '<div class="ajs_body_head" '+
      'pid="999" '+
      '></div>'+
    '<div class="clearfix"></div>'+
    '';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //box tab1
  c = ''+
    '<div '+
      'class="dlg_panel dlg_panel_tab panel-tab1" '+
      'style="display:block;font-family:var(--wd-fonts-secondary);">'+
    '</div><!--tab1-->'+
    '';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  c = ''+
    '<div class="display-table" style="width: 100%;">'+
      '<div>'+
        '<div class="tb-box-left tb-box-panel-tab1" style="width:100%;">'+
        '</div>'+
      '</div>'+
    '</div>'+
    '<div class="a256-update-status" '+
      'style="'+
        'display:none;'+
        'margin-top:15px;'+
      '"></div>'+
    '';
  $('.panel-tab1').append(c);

  let steps = [
    {'slug':'step1','name':'Step 1 Graph Geohash'},
    {'slug':'step2','name':'Step 2 Graph Optimize'},
    {'slug':'step3','name':'Step 3 Nodes'},
    {'slug':'step3a','name':'Step 3a Sub Zones Clustering'},
    {'slug':'step4','name':'Step 4 Nodes Optimization'},
    {'slug':'step5','name':'Step 5 TSP'},
    {'slug':'step6','name':'Step 6 Draw Routes'},
    // {'slug':'step7','name':'Step 7 GEOVAR'},
    {'slug':'step8','name':'Step 8 Generic To Project'},
  ];

  let itemBtn = '';
  steps.forEach(step => {

    itemBtn = 'btn_a256_'+step.slug;

    c = ''+
      '<div '+
        'class="display-table field-box" '+
        'style="border-bottom: 1px solid grey;">'+
        '<div '+
          'style="height: 50px;">'+
          '<div class="field-box-left '+step.slug+'" '+
            'style="width:100%;">'+
            step.name+
          '</div>'+
          '<div class="field-box-right '+step.slug+'" '+
            'style="text-align:center;min-width: 60px;">'+
            '<span class="box-'+itemBtn+'"></span>'+
          '</div>'+
        '</div>'+
      '</div>'+
      '';
    $('.tb-box-left.tb-box-panel-tab1').append(c);

    gLang_slug="label_"+itemBtn;
    gLang_label="<i class=\"bi bi-caret-right-fill\"></i>";
  
    gLang[gLang_slug]=gLang_label;

    GroupStyleBtn = '';
    btnMeta = {
      'properties':{
        "g_slug": itemBtn,
        "g_label": "label_"+itemBtn,
        "g_group": ["public"],
        "g_description": "...",
        "g_template": "v2",
        "g_faw": null,
        "g_callback": null,
        "g_responsive": "both",
        "g_style": "btn-sm btn-outline-dark " + GroupStyleBtn
      }
    }
    g_meta.geovar_button.features.push(btnMeta);  
  
    create_button(itemBtn);

  });

}

f_btn['btn_a256_step1']=function(slug){

  a256_step1();

  return;

}

f_btn['btn_a256_step2']=function(slug){

  a256_step2();

  return;

}

f_btn['btn_a256_step3']=function(slug){

  a256_step3();

  return;

}

f_btn['btn_a256_step3a']=function(slug){

  a256_step3a();

  return;

}

f_btn['btn_a256_step4']=function(slug){

  a256_step4();

  return;

}

f_btn['btn_a256_step5']=function(slug){

  a256_step5();

  return;

}

f_btn['btn_a256_step6']=function(slug){

  a256_step6();

  return;

}

f_btn['btn_a256_step7']=function(slug){

  a256_step7();

  return;

}

f_btn['btn_a256_step8']=function(slug){

  a256_step8();

  return;

}

async function a256_step1() {

  let datastring = {
    fn_group:'geodata',
    action:'create_data',
    collection:'a256_step1',
    qy_name:'A',
    lyr:'lyr999',
    geom:1,
    project_name:'assago3',
    project_token:'0d93cb557309430a06d9728ec21b2251',
    municipality:'assago',
    geohash:[
      'u0n6r',
      'u0nd2',
      'u0n6p',
      'u0nd0'
    ]
  } 
  //let r = await a254_seqAllNodes(myUrl);
  let r = await generic_api_v2(datastring,'a256_step1');
  // _onsole.log(r);

  console.log('a256_step1','done');

}

async function a256_step2() {

  let datastring = {
    fn_group:'geodata',
    action:'create_data',
    collection:'a256_step2',
    qy_name:'A',
    lyr:'lyr999',
    geom:1,
    project_name:'assago3',
    project_token:'0d93cb557309430a06d9728ec21b2251'
  } 
  //let r = await a254_seqAllNodes(myUrl);
  let r = await generic_api_v2(datastring,'a256_step2');
  // _onsole.log(r);

  console.log('a256_step2','done');

}

async function a256_step3() {

  let datastring = {
    fn_group:'geodata',
    action:'create_data',
    collection:'a256_step3',
    qy_name:'A',
    lyr:'lyr999',
    geom:1,
    project_name:'assago3',
    project_token:'0d93cb557309430a06d9728ec21b2251'
  } 
  //let r = await a254_seqAllNodes(myUrl);
  let r = await generic_api_v2(datastring,'a256_step3');
  // _onsole.log(r);

  console.log('a256_step3','done');

}

async function a256_step3a() {

  let datastring = {
    fn_group:'geodata',
    action:'create_data',
    collection:'a256_step3a',
    qy_name:'A',
    lyr:'lyr999',
    geom:1,
    project_name:'assago3',
    project_token:'0d93cb557309430a06d9728ec21b2251'
  } 
  //let r = await a254_seqAllNodes(myUrl);
  let r = await generic_api_v2(datastring,'a256_step3a');
  // _onsole.log(r);

  console.log('a256_step3a','done');

}

async function a256_step4() {

  let datastring = {
    fn_group:'geodata',
    action:'create_data',
    collection:'a256_step4',
    qy_name:'A',
    lyr:'lyr999',
    geom:1,
    project_name:'assago3',
    project_token:'0d93cb557309430a06d9728ec21b2251'
  } 
  //let r = await a254_seqAllNodes(myUrl);
  let r = await generic_api_v2(datastring,'a256_step4');
  // _onsole.log(r);

  console.log('a256_step4','done');

}

async function a256_step5() {

  let datastring = {
    fn_group:'geodata',
    action:'create_data',
    collection:'a256_step5',
    qy_name:'A',
    lyr:'lyr999',
    geom:1,
    project_name:'assago3',
    project_token:'0d93cb557309430a06d9728ec21b2251',
    start_lat:45.40365625940232,
    start_lng:9.142449831654575
  } 
  //let r = await a254_seqAllNodes(myUrl);
  let r = await generic_api_v2(datastring,'a256_step5');
  // _onsole.log(r);

  console.log('a256_step5','done');

}

async function a256_step6() {

  let datastring = {
    fn_group:'geodata',
    action:'create_data',
    collection:'a256_step6',
    qy_name:'A',
    lyr:'lyr999',
    geom:1,
    project_name:'assago3',
    project_token:'0d93cb557309430a06d9728ec21b2251'
  } 
  //let r = await a254_seqAllNodes(myUrl);
  let r = await generic_api_v2(datastring,'a256_step6');
  // _onsole.log(r);

  console.log('a256_step6','done');

}

async function a256_step7() {

  let datastring = {
    fn_group:'geodata',
    action:'create_data',
    collection:'a256_step7',
    qy_name:'A',
    lyr:'lyr999',
    geom:1,
    project_name:'assago3',
    project_token:'0d93cb557309430a06d9728ec21b2251'
  } 
  //let r = await a254_seqAllNodes(myUrl);
  let r = await generic_api_v2(datastring,'a256_step7');
  // _onsole.log(r);

  console.log('a256_step7','done');

}

async function a256_step8() {

  let datastring = {
    fn_group:'geodata',
    action:'create_data',
    collection:'a256_step8',
    qy_name:'A',
    lyr:'lyr999',
    geom:1,
    project_name:'assago3',
    project_token:'0d93cb557309430a06d9728ec21b2251',
    user_token:localStorage.user_token
  } 
  //let r = await a254_seqAllNodes(myUrl);
  let r = await generic_api_v2(datastring,'a256_step8');
  // _onsole.log(r);

  console.log('a256_step8','done');

  $('.a256-update-status').css('display','block');
  $('.a256-update-status').html(''
    +'<div class="alert alert-warning d-flex align-items-center" role="alert">'
      +'<div>'        
        +'<span style="margin-right: 10px;">'
          +'<i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span>'
        +'Remember to add dbroute_pl_'+'assago3'+'_edges to Geoserver layers.'
      +'</div>'
    +'</div>'
  +'');

}