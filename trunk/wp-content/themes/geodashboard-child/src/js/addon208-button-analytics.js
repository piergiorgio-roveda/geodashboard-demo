$(document).ready(function() {

  // _onsole.log('Ready-8!');
  //update_drag_coords();
  //--NEW
  //$('.box-add-point').html('<button id="btn-add-point">+</button>');
  //var dataString = get_var;

  //$('#btn-add-point').on('click',function(){
  //  add_point();
  //});
  fill_box_btn_analytics();
  //generic_api(dataString,'show_table');
}); //$(document).ready

//g_meta.geovar_dialog is update from DB
//but to customize can push this array
var addon208_slug='click_test_analytics';
var meta = {
  'properties':{
    'g_description': null,
    'g_label': 'Test button analytics',
    'g_slug': addon208_slug+'_single',
    'g_template': 'template_by_slug',
  }
}
g_meta.geovar_dialog.features.push(meta);

function fill_box_btn_analytics(){

  //$('.box-addpoint').html('<div '
  //  +'class="box-btn_analytics_01 box-info-2-btn d-grid gap-2" '
  //  +'style="margin-top:5px;"></div>');
  //create_button('btn_analytics_01');

  $('.box-editing2').css('display','block');
  $('.box-editing2').css('justify-content','center');

  $('.box-editing2').html(''
    +'<div class="col-auto ct-editing2" style="padding: 5px 0px;">'
      +'<span '
        +'class="box-btn_analytics_01"></span>'
      +'<span '
        +'class="box-btn_analytics_02" '
        +'style="margin-left:5px;margin-right:5px;"></span>'
      +'<span '
        +'class="box-btn_analytics_03"></span>'
    +'</div>'
  +'');

  create_button('btn_analytics_01');
  create_button('btn_analytics_02');
  create_button('btn_analytics_03');

}

// !dev change `slug` to `optIn`
f_btn[ 'btn_analytics_01']=function(){
  sessionStorage.this_dialog_lyr=addon208_slug;
  sessionStorage.this_dialog_slug=addon208_slug+'_single';//'lyr035_single'
  //
  sessionStorage.addon208_text='btn_analytics_01';
  //sessionStorage.mapclick_lng=e.latlng.lng;
  create_dialog2(sessionStorage.this_dialog_slug);
}

// !dev change `slug` to `optIn`
f_btn[ 'btn_analytics_02']=function(){
  sessionStorage.this_dialog_lyr=addon208_slug;
  sessionStorage.this_dialog_slug=addon208_slug+'_single';//'lyr035_single'
  //
  sessionStorage.addon208_text='btn_analytics_02';
  //sessionStorage.mapclick_lng=e.latlng.lng;
  create_dialog2(sessionStorage.this_dialog_slug);
}

// !dev change `slug` to `optIn`
f_btn[ 'btn_analytics_03']=function(){
  sessionStorage.this_dialog_lyr=addon208_slug;
  sessionStorage.this_dialog_slug=addon208_slug+'_single';//'lyr035_single'
  //
  sessionStorage.addon208_text='btn_analytics_03';
  //sessionStorage.mapclick_lng=e.latlng.lng;

  create_dialog2(sessionStorage.this_dialog_slug);

}

dyn_functions['template_by_slug_'+addon208_slug+'_single'] = function(){

  log_tag_manager(
    'btn_analytics',
    //GA - log_tag_manager - action // _onsole.log_ready_map
    sessionStorage.addon208_text,//GA - log_tag_manager - label
    '0' //GA - log_tag_manager - value (optional)
  );

  var c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $('.dlg_'+addon208_slug+'_single'+'_body').append(c);

  //box button tab
  var c = ''
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  $('.dlg_'+addon208_slug+'_single'+'_body').append(c);

  var c = '<div>'
    +'<div class="col-btn-attrs" style="text-align:left;"></div>'
  +'</div>';
  $('.dlg_'+addon208_slug+'_single'+'_body').append(c);

  //box tab1
  c += '<div '
    +'class="dlg_panel panel-tab1" '
    +'style="display:block;font-family:var(--wd-fonts-secondary);">';
  //c += '<p>TAB1</p>';
  c+='View event in Google Analytics as: ' + sessionStorage.addon208_text
  c += '</div><!--tab1-->';
  
  $('.dlg_'+addon208_slug+'_single'+'_body').append(c);

}