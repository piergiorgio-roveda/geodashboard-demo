$(document).ready(function() {

  addon209_ready();

}); //$(document).ready

function addon209_ready(){
  if (f_wait.btn_profile==0
    || f_wait.geovar_dialog==0) {
    // _onsole.log('wait')
    setTimeout(function(){addon209_ready()},100);
    return;
  } else {
    prepare_addon209();
  };
}

function prepare_addon209(){

  //define in list
  var addon209_slug='mapclick_test';
  list_mapclick.push(addon209_slug);

  //g_meta.geovar_dialog is update from DB
  //but to customize can push this array
  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'Map click test',
      'g_slug': addon209_slug+'_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

}



dyn_mapclick['mapclick_test'] = function(opt){

  let addon209_slug='mapclick_test';

  sessionStorage.this_dialog_lyr=addon209_slug;
  sessionStorage.this_dialog_slug=addon209_slug+'_single';//'lyr035_single'
  //
  sessionStorage.mapclick_lat=opt.lat;
  sessionStorage.mapclick_lng=opt.lng;

  log_tag_manager(
    'mapclick',
    //GA - log_tag_manager - action // _onsole.log_ready_map
    sessionStorage.mapclick_lat+'|'+sessionStorage.mapclick_lng,//GA - log_tag_manager - label
    '0' //GA - log_tag_manager - value (optional)
  );

  create_dialog2(sessionStorage.this_dialog_slug);

}

dyn_functions['template_by_slug_mapclick_test_single'] = function(){

  let addon209_slug='mapclick_test';

  var c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $('.dlg_'+addon209_slug+'_single'+'_body').append(c);

  //box button tab
  var c = ''
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  $('.dlg_'+addon209_slug+'_single'+'_body').append(c);

  var c = '<div>'
    +'<div class="col-btn-attrs" style="text-align:left;"></div>'
  +'</div>';
  $('.dlg_'+addon209_slug+'_single'+'_body').append(c);

  //box tab1
  c += '<div '
    +'class="dlg_panel panel-tab1" '
    +'style="display:block;font-family:var(--wd-fonts-secondary);">';
  //c += '<p>TAB1</p>';
  c+='View event in Google Analytics as "mapclick": ' + sessionStorage.mapclick_lat+'|'+sessionStorage.mapclick_lng
  c += '</div><!--tab1-->';
  
  $('.dlg_'+addon209_slug+'_single'+'_body').append(c);

}
