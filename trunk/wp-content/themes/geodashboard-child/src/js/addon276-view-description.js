list_menu.push('menu_a276');

dyn_functions['addon276-view-description'+'_ready'] = function(){

  $('.box-usrprofile').css('display','block');

  let itemBtn = 'btn_view_description';

  $('.box-usrprofile').append('<div '
    +'class="box-'+itemBtn+' box-info-2-btn d-grid gap-2" '
    +'style="margin-top:5px;"></div>');

  let opt = btnOptDefault();
  opt.itemSlug = itemBtn;
  opt.itemLabel = {
    "default":"<i class=\"bi bi-info-lg\"></i"
  }//gLang.label_close,    
  create_button_2(opt);  

}

f_btn['btn_view_description']=function(slug){
  // onsole.log('btn_routing_made_project')
  let item_addon = 'view_description';
  let item_dlg = 'dlg_'+item_addon;

  var meta = {
    'properties':{
      'g_slug': item_dlg+'_single',
      'g_label': 'Map Description',
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

dyn_functions['menu_a276'] = function(optIn){
  
  let c = '';
  let opt = {};
  let itemBtn1 = '';

  switch(optIn.menu){
    case '2':

      itemBtn1 = 'btn_view_description';
      c = ''+
        '<span class="box-'+itemBtn1+'"></span>&nbsp;'+
      '';
      $('.cyberpunk_footer-cell.'+optIn.part).append(c);

      opt = btnOptDefault();
      opt.itemSlug = itemBtn1;
      opt.itemLabel = {
        "default":"<i class=\"bi bi-info-lg\"></i"
      }//gLang.label_close,   
      create_button_2(opt); 
      
      break;
    default:
      // onsole.log('show_menu: '+optIn.menu);
  }

}

dyn_functions['template_by_slug_'+'dlg_'+'view_description'+'_single'] = function(){

  let dlg_slug = 'dlg_'+'view_description'+'_single';

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
  
  a276_fill_tabs_view_description();

}


function a276_fill_tabs_view_description(){

  let dlg_slug = 'dlg_'+'view_description'+'_single';

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

  });

  let tab = 'tab1';
  c = ''+
    '<div class="accordion" id="box_a276main-'+tab+'">'+
    '</div>'+
    '';
  $('.content_'+tab+'').append(c);
  let pS = {
    'g_slug':'description',
    'g_label':'List of Layers',
  };
  c = ''+
    '<div class="box-tab box_a276main_'+pS.g_slug+'" '+
      '>'+
    '</div>'+
    '';
  $('#box_a276main-'+tab+'').append(c);

  let p = g_meta.geovar_map.features[0].properties
  let g_attributes = p.g_attributes;

  c = ''+
  '<div class="display-table" style="'+
    'min-height: 40px;'+
    'width: 100%;'+
    '">'+
    '<div style="'+
      'width: 100%;'+
      '" '+
      '>'+ //tr
      //cell
      '<div>'+
        g_attributes.description+
      '</div>'+
    '</div>'+
  '</div>'+
  '';

  $('.box_a276main_'+pS.g_slug).append(c);


}
