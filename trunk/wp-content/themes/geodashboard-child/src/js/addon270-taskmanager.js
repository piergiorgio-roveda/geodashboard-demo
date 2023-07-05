//--
var a270_mapReady = 0;
var a270_AllProjectTasks={
  features : []
}
sessionStorage.a270_menu = 0;

list_menu.push('menu_a270');

dyn_functions['addon270-taskmanager'+'_ready'] = function(){
  
  a270_inizialize();

}

async function a270_inizialize() {

  if(localStorage.getItem('task_project_token')===null){
    alertify.message('Project not selected.');
    return;
  }

  prepare_a270();

  await Promise.all([
    getAllProjectTasks(),
    default_search_map_by_token(),
  ]);

  await new Promise(resolve => setTimeout(resolve, 1));

  a270_mapReady = 1;

  a270_fill_mainTable();
}

async function getAllProjectTasks() {

  let datastring = {
    fn_group:'geodata',
    action:'view_data',
    collection:'getAllProjectTasks',
    qy_name:'A',
    lyr:'lyr999',
    project_token:localStorage.task_project_token
  } 
  //let r = await a257_seqAllNodes(myUrl);
  let r = await generic_api_v2(datastring,'getAllProjectTasks');
  a270_AllProjectTasks.features = r.features;

}

function prepare_a270(){

  let c = ''+
    '<div '+
      'class="'+
        'display-table a270_mainTable '+
      '"'+ // class
      'style="'+
        'display: table;'+
        'width: 100%;'+
        'max-width: 800px;'+
        'min-width: 200px;'+
        'margin: auto;'+
      '"'+ // style
      '>'+
      '<div class="table-row a270">'+ // title
        '<div class="box-task-title" style="width:100%;">'+
          localStorage.task_project_token+
        '</div>'+
      '</div>'+
    '</div>'+
  '';
  $('#mapid').html(c);

  return;

}

function a270_fill_mainTable(){

  let c = '<div><div>'+
  '<table class="table table-sm table-task">'+
  '<tbody>'+
  '</tbody>'+
  '</table>'+
  '</div></div>';
  $('.a270_mainTable').append(c);

  a270_AllProjectTasks.features.forEach(element => {
    let p = element.properties;
    $('.table-task > tbody').append(''+
      '<tr class="table-row a270" id="row-'+p.item_token+'">'+
        '<td class="box-task-title">'+p.g_label+'</td>'+
        '<td class="box-task-desc">'+p.item_token+'</td>'+
      '</tr>'+
      '');
  });

}

dyn_functions['menu_a270'] = function(optIn){
  
  let c = '';
  let opt = {};
  let itemBtn1 = '';
  let itemBtn2 = '';

  switch(optIn.menu){
    case '-1':

      itemBtn1 = 'btn_change_project';
      itemBtn2 = 'btn_add_task';

      c = ''+
        '<span class="box-'+itemBtn1+'"></span>&nbsp;'+
      '';
      $('.cyberpunk_footer-cell.'+optIn.part).append(c);
      
      c = ''+
        '<span class="box-'+itemBtn2+'"></span>&nbsp;'+
      '';
      $('.cyberpunk_footer-cell.'+optIn.part).append(c);

      opt = btnOptDefault();
      opt.itemSlug = itemBtn1;
      opt.itemLabel = {
        "default":"<i class=\"bi bi-kanban\"></i"
      }//gLang.label_close,   
      create_button_2(opt); 

      opt = btnOptDefault();
      opt.itemSlug = itemBtn2;
      opt.itemLabel = {
        "default":"<i class=\"bi bi-plus-square-fill\"></i"
      }//gLang.label_close,   
      create_button_2(opt); 
      
      break;
    default:
      // onsole.log('show_menu: '+optIn.menu);
  }

}

f_btn['btn_change_project']=function(slug){

  // onsole.log('btn_routing_made_project')
  let item_addon = 'change_project';
  let item_dlg = 'dlg_'+item_addon;

  var meta = {
    'properties':{
      'g_slug': item_dlg+'_single',
      'g_label': 'Change Project',
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

f_btn['btn_add_task']=function(slug){

  // onsole.log('btn_routing_made_project')
  let item_addon = 'add_task';
  let item_dlg = 'dlg_'+item_addon;

  var meta = {
    'properties':{
      'g_slug': item_dlg+'_single',
      'g_label': 'Add Task to Project',
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

dyn_functions['template_by_slug_'+'dlg_'+'change_project'+'_single'] = function(){

  let dlg_slug = 'dlg_'+'change_project'+'_single';

  $('.dlg_'+dlg_slug+'_body').html('');

  let c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //box button tab
  c = ''+
    '<div class="ajs_body_head" pid="999" ></div>'+
    '<div class="clearfix"></div>'+
    '';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //--

  c =  ''
    +'<div>'
      +'<div class="col-btn-attrs" style="text-align:center;">'
      +'</div>'
    +'</div>';
  $('.dlg_'+dlg_slug+'_body').append(c);
  
  a270_fill_tabs_change_project();

}

dyn_functions['template_by_slug_'+'dlg_'+'add_task'+'_single'] = function(){

  let dlg_slug = 'dlg_'+'add_task'+'_single';

  $('.dlg_'+dlg_slug+'_body').html('');

  let c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //box button tab
  c = ''+
    '<div class="ajs_body_head" pid="999" ></div>'+
    '<div class="clearfix"></div>'+
    '';
  $('.dlg_'+dlg_slug+''+'_body').append(c);
  
  a270_fill_tabs_add_task();

}

function a270_fill_tabs_change_project() {

  let dlg_slug = 'dlg_'+'change_project'+'_single';

  let tabs = [
    {'g_slug':'tab1','g_label':'List of Projects','btnItem':'nd'}
  ];

  $('.col-btn-attrs').html('');
  
  let iTab = 0;
  tabs.forEach(e => {
    iTab++;
    let tab=e.g_slug;
    let label=e.g_label;

    let display = '';
    if(iTab==1){
      $('#'+e.btnItem).addClass('active');
      display ='display:block;';
    }
    else{
      display ='display:none;';
    }
    $('.box_'+tab+'').remove();
    c =  ''
      +'<div class="clearfix"></div>'
        +'<div class="box-tab box_'+tab+'" style="'+display+'">'
          +'<div class="boxItem">'
            +'<div ' 
              +'style="padding:3px;">'
              +'<div class="content_'+tab+'">'
              +'</div>'
            +'</div>'
          +'</div>'
        +'</div>'
      +'';
    $('.dlg_'+dlg_slug+'_body').append(c);    

  });


  //--

  a270_fill_tab1_change_project();
  return

}

function a270_fill_tabs_add_task() {

  let dlg_slug = 'dlg_'+'add_task'+'_single';

  let tabs = [
    {'g_slug':'tab1','g_label':'Add New Task','btnItem':'nd'}
  ];

  $('.col-btn-attrs').html('');
  
  let iTab = 0;
  tabs.forEach(e => {
    iTab++;
    let tab=e.g_slug;
    let label=e.g_label;

    let display = '';
    if(iTab==1){
      $('#'+e.btnItem).addClass('active');
      display ='display:block;';
    }
    else{
      display ='display:none;';
    }
    $('.box_'+tab+'').remove();
    c =  ''
      +'<div class="clearfix"></div>'
        +'<div class="box-tab box_'+tab+'" style="'+display+'">'
          +'<div class="boxItem">'
            +'<div ' 
              +'style="padding:3px;">'
              +'<div class="content_'+tab+'">'
              +'</div>'
            +'</div>'
          +'</div>'
        +'</div>'
      +'';
    $('.dlg_'+dlg_slug+'_body').append(c);    

  });


  //--

  a270_fill_tab1_add_task();
  return  
}

function a270_fill_tab1_change_project() {

  let r = list_MapByToken;

  // onsole.log(r);
  let tab = 'tab1';

  //--

  r.features.forEach(element => {
    let p = element.properties;
    p.g_addon.forEach(addon => {

      Object.keys(addon).forEach(function (key) {
        // do something with obj[key]
        // onsole.log(key);

        if(key=='task' && addon[key]==true){

          c = ''+
          '<div class="display-table" style="'+
            'border-bottom: 1px solid grey;'+
            'min-height: 40px;'+
            'width: 100%;'+
            '">'+
            '<div style="'+
              'width: 100%;'+
              'cursor: pointer;'+
              '" '+
              '>'+ //tr
              //cell
              '<div '+
                'item_token="'+p.item_token+'" '+
                'class="item-project" '+
                '>'+p.g_label+'</div>'+
            '</div>'+
          '</div>'+
          '';
          $('.content_'+tab).append(c);
        }

      }); // Object.keys(addon)       
    }); // p.g_addon.forEach  
  });

  $('.item-project').on('click',function(){
    localStorage.task_project_token = $(this).attr('item_token');
    window.open(HOME_PROJECT+
      '/'+PAGE_CLIENT_SLUG+
      '/taskmanager'+
      '/',"_self");     
  });

}

function a270_fill_tab1_add_task() {

  // onsole.log(r);
  let tab = 'tab1';

  //--

  c = ''+
  '<div class="display-table" style="'+
    'border-bottom: 1px solid grey;'+
    'min-height: 40px;'+
    'width: 100%;'+
    '">'+
    '<div style="'+
      'width: 100%;'+
      'cursor: pointer;'+
      '" '+
      '>'+ //tr
      //cell
      '<div '+
        'item_token="" '+
        'class="item-project" '+
        '><input type="text" /></div>'+
    '</div>'+
  '</div>'+
  '';
  $('.content_'+tab).append(c);





}