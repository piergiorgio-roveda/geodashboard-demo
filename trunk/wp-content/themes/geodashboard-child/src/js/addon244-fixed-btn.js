dyn_functions['addon244-fixed-btn'+'_ready'] = function(){

  $('.box-usrprofile').css('display','block');
  $('.box-usrprofile').css('position','fixed');
  $('.box-usrprofile').css('top','0px');
  $('.box-usrprofile').css('right','5px');

  $('.box-usrprofile').append('<div '
    +'class="box-btn_magicmenu1 box-info-2-btn d-grid gap-2" '
    +'style="margin-top:5px;"></div>');

  //_onsole.log('addon244-fixed-btn')
  a244_ready();

}; //$(document).ready

sessionStorage.basemap='default';

function a244_ready(){
  // if (f_wait.geovar_button==0) {
  //   // _onsole.log('wait')
  //   setTimeout(function(){a244_ready()},1000);
  //   return;
  // } else {
    prepare_a244();
  // };
}


function prepare_a244(){

  opt = {
    itemSlug:'btn_magicmenu1',//'btn_closedlg3',
    itemLabel: {
      "default":"<i class=\"fa fa-commenting\" aria-hidden=\"true\"></i>",
      "it":"<i class=\"fa fa-commenting\" aria-hidden=\"true\"></i>",
      "en":"<i class=\"fa fa-commenting\" aria-hidden=\"true\"></i>"
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

f_btn['btn_magicmenu1']=function(slug){

  let item_dlg = 'dlg_a244_personal';

  var meta = {
    'properties':{
      'g_slug': item_dlg+'_single',
      'g_label': 'Test menu',
      'g_template': 'template_by_slug',
      'g_description': null
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  sessionStorage.this_dialog_lyr=item_dlg;
  sessionStorage.this_dialog_slug=item_dlg+'_single';//'lyr035_single'
  //
  //sessionStorage.addon208_text='btn_analytics_01';
  //sessionStorage.mapclick_lng=e.latlng.lng;
  create_dialog2(sessionStorage.this_dialog_slug);

}

dyn_functions['template_by_slug_'+'dlg_a244_personal'+'_single'] = function(){

  //_onsole.log('template_by_slug_'+'dlg_a244_personal'+'_single')

  let dlg_slug = 'dlg_a244_personal'+'_single';

  let c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //box button tab
  c = ''
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  let photo_url='https://lh3.googleusercontent.com/pw/AMWts8Cjv5e7mkLweCkHTnjwRScgNTK1gvrD1_BXVAkSiAXkyftBKWO6bVZzOM37B6M1TkHsCfCjbc80SELR9Y6ndLGJu8_ToTThfP-DgM4Sl6FO7GmPUEBtsxx1FJjUrL_xJ_i8Kf7jNjYVm-Ish8_keYJfjw=s794-no?authuser=1';

  //box tab1
  c = '<div '
    +'class="dlg_panel dlg_panel_tab panel-tab1" '
    +'style="display:block;font-family:var(--wd-fonts-secondary);">'
    +'<aside class="blog-sidebar">'
    +'</aside>';
  //c += '<p>TAB1</p>';
  c += '</div><!--tab1-->';
  
  $('.dlg_'+dlg_slug+''+'_body').append(c);

}
