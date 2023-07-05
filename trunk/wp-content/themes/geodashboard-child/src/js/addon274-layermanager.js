//--
var a274_mapReady = 0;
var a274_AllProjectTasks={
  features : []
}
sessionStorage.a274_menu = 0;

localStorage.a274_lyr = 'avage11';

list_menu.push('menu_a274');

var show_legend = 0;

var a274_titles = {
  'avage11':'Average age 2011',
  'avage21':'Average age 2021',
  'avage21_11':'Average age 2011-2021',
}

var a274_colors = {
  'avage11':[
    {'base':0,'hex':'#fff5f0','label':'Below 40'},
    {'base':40,'hex':'#fdd6c4','label':'40 - 42'},        
    {'base':42,'hex':'#fca486','label':'42 - 44'},        
    {'base':44,'hex':'#fb7050','label':'44 - 46'},        
    {'base':46,'hex':'#ea372a','label':'46 - 48'},        
    {'base':48,'hex':'#ba1419','label':'48 - 50'},        
    {'base':50,'hex':'#67000d','label':'Above 50'},        
    {'base':60.630000,'hex':'#000','label':'N.A.'}
  ],
  'avage21':[
    {'base':0,'hex':'#fff5f0','label':'Below 40'},
    {'base':40,'hex':'#fdd6c4','label':'40 - 42'},        
    {'base':42,'hex':'#fca486','label':'42 - 44'},        
    {'base':44,'hex':'#fb7050','label':'44 - 46'},        
    {'base':46,'hex':'#ea372a','label':'46 - 48'},        
    {'base':48,'hex':'#ba1419','label':'48 - 50'},        
    {'base':50,'hex':'#67000d','label':'Above 50'},        
    {'base':60.630000,'hex':'#000','label':'N.A.'}
  ],
  'avage21_11':[
    {'base':-25,'hex':'#00bebe','label':'Below -5'},
    {'base':-5,'hex':'#6ccfcf','label':'-5 - -2.5'},        
    {'base':-2.5,'hex':'#75e0e0','label':'-2.5 - -0.5'},        
    {'base':-0.5,'hex':'#ced2f4','label':'-0.5 - 0.5'},        
    {'base':0.5,'hex':'#e692cb','label':'0.5 - 2.5'},        
    {'base':2.5,'hex':'#db50ad','label':'2.5 - 5'},        
    {'base':5,'hex':'#d0008b','label':'Above 5'},        
    {'base':25,'hex':'#000','label':'N.A.'}
  ]
}

dyn_functions['addon274-layermanager'+'_ready'] = function(){
  
  a274_inizialize();

}

async function a274_inizialize() {

  // if(localStorage.getItem('task_project_token')===null){
  //   alertify.message('Project not selected.');
  //   return;
  // }

  prepare_a274();

  await Promise.all([
    // default_search_map_by_token(),
  ]);

  await new Promise(resolve => setTimeout(resolve, 1));

  a274_mapReady = 1;

  // a274_fill_mainTable();
}

function prepare_a274(){

  $('body').append(''+
    '<div id="dlg_show_map_title" '+
      'class="display-table card text-center" '+ // class
      'style="' +
        'top: 5px;'+
        'width: 225px;'+
        'position: fixed;'+
        'left: 50%;'+
        'transform: translate(-50%, 0);'+
      '" '+ // style
      '>'+
      '<div>'+
        '<div class="box-map_title" style="width: 100%;">'+
          '<h5 class="card-title card-map_title">'+
            a274_titles[localStorage.a274_lyr]+
          '</h5>'+
        '</div>'+
      '</div>'+
    '</div>'+
    '');

  // let c = ''+
  //   '<div '+
  //     'class="'+
  //       'display-table a274_mainTable '+
  //     '"'+ // class
  //     'style="'+
  //       'display: table;'+
  //       'width: 100%;'+
  //       'max-width: 800px;'+
  //       'min-width: 200px;'+
  //       'margin: auto;'+
  //     '"'+ // style
  //     '>'+
  //     '<div class="table-row a274">'+ // title
  //       '<div class="box-task-title" style="width:100%;">'+
  //         localStorage.task_project_token+
  //       '</div>'+
  //     '</div>'+
  //   '</div>'+
  // '';
  // $('#mapid').html(c);

  return;

}

function a274_fill_mainTable(){

  // let c = '<div><div>'+
  // '<table class="table table-sm table-task">'+
  // '<tbody>'+
  // '</tbody>'+
  // '</table>'+
  // '</div></div>';
  // $('.a274_mainTable').append(c);

  // a274_AllProjectTasks.features.forEach(element => {
  //   let p = element.properties;
  //   $('.table-task > tbody').append(''+
  //     '<tr class="table-row a274" id="row-'+p.item_token+'">'+
  //       '<td class="box-task-title">'+p.g_label+'</td>'+
  //       '<td class="box-task-desc">'+p.item_token+'</td>'+
  //     '</tr>'+
  //     '');
  // });

}

dyn_functions['menu_a274'] = function(optIn){
  
  let c = '';
  let opt = {};
  let itemBtn1 = '';
  let itemBtn2 = '';

  switch(optIn.menu){
    case '-1':

      itemBtn1 = 'btn_change_layer';
      itemBtn2 = 'btn_show_legend';

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
        "default":"<i class=\"bi bi-layers-half\"></i"
      }//gLang.label_close,   
      create_button_2(opt); 

      opt = btnOptDefault();
      opt.itemSlug = itemBtn2;
      opt.itemLabel = {
        "default":"<i class=\"bi bi-card-list\"></i"
      }//gLang.label_close,   
      create_button_2(opt); 
      
      break;
    default:
      // onsole.log('show_menu: '+optIn.menu);
  }

}

f_btn['btn_change_layer']=function(slug){

  // onsole.log('btn_routing_made_project')
  let item_addon = 'change_layer';
  let item_dlg = 'dlg_'+item_addon;

  var meta = {
    'properties':{
      'g_slug': item_dlg+'_single',
      'g_label': 'Change Layer',
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

dyn_functions['template_by_slug_'+'dlg_'+'change_layer'+'_single'] = function(){

  let dlg_slug = 'dlg_'+'change_layer'+'_single';

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
  
  a274_fill_tabs_change_layer();

}

function a274_fill_tabs_change_layer(){

  let dlg_slug = 'dlg_'+'change_layer'+'_single';

  let tabs = [
    {'g_slug':'tab1','g_label':'List of Layers','btnItem':'-'}
  ];

  $('.col-btn-attrs').html('');
  
  let iTab = 0;
  tabs.forEach(e => {
    iTab++;
    let tab=e.g_slug;
    let label=e.g_label;
    // _onsole.log('dlg_template:explorer_simple > '+g_slug);
    let c = ''
      +'<span class="box-'+e.btnItem+'" '+
      'style="margin-left:2.5px;margin-right:2.5px;"></span>'
    $('.col-btn-attrs').append(c);

    opt = {
      itemSlug:e.btnItem,//'btn_closedlg3',
      itemLabel: {
        "default":label,
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
    // create_button_2(opt); 

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

    c = ''+
      '<div class="accordion" id="box_a274main-'+tab+'">'+
      '</div>'+
      '';
    $('.content_'+tab+'').append(c);
    let pS = {
      'g_slug':'list-of-layers',
      'g_label':'List of Layers',
    };
    c = ''+
      '<div class="accordion-item box-tab box_a274main_'+pS.g_slug+'" '+
        '>'+
        '<h2 class="accordion-header">'+
          '<button '+
            'class="accordion-button collapsed title_a274main_'+pS.g_slug+'" '+
            'type="button" '+
            'data-bs-toggle="collapse" data-bs-target="#flush-'+pS.g_slug+'" '+
            'aria-expanded="false" aria-controls="flush-'+pS.g_slug+'" '+
            '>'+
            '<b>'+pS.g_label+'</b>'+ // Accordion Item #1
          '</button>'+
        '</h2>'+
        '<div id="flush-'+pS.g_slug+'" '+
          'class="accordion-collapse collapse show" '+
          'data-bs-parent="#accordionFlushExample">'+
          '<div '+
            'class="accordion-body content_a274main_'+pS.g_slug+'" '+
            '><!--Placeholder ...--></div>'+
        '</div>'+
      '</div>'+
      '';
    $('#box_a274main-'+tab+'').append(c);

    let f = [
      {
        'g_slug':'avage11',
        'g_label':'Average age 2011',
        'item_token':'item_token'
      },
      {
        'g_slug':'avage21',
        'g_label':'Average age 2021',
        'item_token':'item_token'
      },
      {
        'g_slug':'avage21_11',
        'g_label':'Average age 2011-2021',
        'item_token':'item_token'
      }
    ]
    let icon = ''+
    '<span style="'+
      'font-size: 150%;'+
      '">'+
      '<i class="bi bi-box-arrow-right"></i></span>'+
    '';
    f.forEach(element => {
      
      let p = element;
      let bgcolor = '#fff';
      if(p.g_slug == localStorage.getItem('a274_lyr')){
        bgcolor = '#ffdc00';
      }    

      c = ''+
      '<div class="display-table" style="'+
        'border-bottom: 1px solid grey;'+
        'min-height: 40px;'+
        'width: 100%;'+
        '">'+
        '<div style="'+
          'width: 100%;'+
          '" '+
          '>'+ //tr
          //cell
          '<div style="background-color:'+bgcolor+';">'+
            p.g_label+
          '</div>'+
          //cell
          // '<div '+
          //   'id="dropdown1-'+p.item_token+'" '+
          //   'class="box-project-dropdown btn-group" '+
          //   'style="'+
          //     'width: 110px;'+
          //   '" '+ // END style
          //   '>'+
          // '</div>'+
          //cell
          // '<div style="'+
          //   'width: 60px;'+
          //   'text-align: center;'+
          //   'vertical-align: middle;'+
          //   '">'+
          //   ready+
          // '</div>'+
          //cell
          '<div class="btn_a255main_layer" '+
            'style="'+
              'cursor: pointer;'+
              'width: 40px;'+
              'text-align: right;'+
            '" '+
            'g_slug="'+p.g_slug+'" '+ //tr
            '">'+
            icon+
          '</div>'+ 
        '</div>'+
      '</div>'+
      '';

      $('.content_a274main_'+pS.g_slug).append(c);

    });

    $('.btn_a255main_layer').on('click',function(){
      localStorage.a274_lyr = $(this).attr('g_slug');
      a275_change_style($(this).attr('g_slug'));
      $('#dlg_show_legend').remove();
      show_legend = 0;      
      $('.card-map_title').html(a274_titles[localStorage.a274_lyr]);
      alertify.infoDialog().destroy();
    });

  });

}

f_btn['btn_show_legend']=function(slug){

  if(show_legend==0){
    $('body').append(''+
      '<div id="dlg_show_legend" '+
        'class="display-table card" '+ // class
        'style="' +
          'bottom: 50px;'+
          'width: 225px;'+
          'position: fixed;'+
          'left: 50%;'+
          'transform: translate(-50%, 0);'+
        '" '+ // style
        '>'+
        '<div>'+
          '<div class="box-legend" style="width: 100%;">'+
            '<h5 class="card-title">'+
              'Legend'+
            '</h5>'+
            '<ul class="list-group list-group-flush">'+
            '</ul>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '');
    show_legend = 1;

    let color = a274_colors[localStorage.a274_lyr];

    color.forEach(element => {
      let p = element;
      $('.box-legend > .list-group').append(''+
        '<li class="list-group-item"><i class="bi bi-square-fill" style="color:' +  p.hex +';"></i>&nbsp;'+p.label + '</li>'+
      '');
    });

  }
  else{
    $('#dlg_show_legend').remove();
    show_legend = 0;
  }
}
