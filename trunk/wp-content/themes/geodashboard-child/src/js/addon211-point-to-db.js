$(document).ready(function() {

  addon211_ready();

}); //$(document).ready

function addon211_ready(){
  if (f_wait.btn_profile==0
    || f_wait.geovar_dialog==0) {
    // _onsole.log('wait')
    setTimeout(function(){addon211_ready()},100);
    return;
  } else {
    prepare_addon211();
  };
}

function prepare_addon211(){

  //define in list
  var addon211_slug='point_to_db';

  list_geolocator.push(addon211_slug);
  list_add_poi.push(addon211_slug);

  //g_meta.geovar_dialog is update from DB
  //but to customize can push this array
  //var meta = {
  //  'properties':{
  //    'g_description': null,
  //    'g_label': 'Map click test',
  //    'g_slug': addon211_slug+'_single',
  //    'g_template': 'template_by_slug',
  //  }
  //}
  //g_meta.geovar_dialog.features.push(meta);

  //g_meta.geovar_dialog is update from DB
  //but to customize can push this array
  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'Choose editable layer',
      'g_slug': 'addon210_choose_editable'+'_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

}

dyn_geolocator['point_to_db'] = function(e){

  add_btn_save_point();

}

dyn_add_poi['point_to_db'] = function(e){

  add_btn_save_point();

}

function add_btn_save_point(){
  $('.ct-editing2').append(''
    +'<span '
      +'class="box-btn_save_point" '
      +'style="margin-left:5px;"></span>'
  +'');

  create_button('btn_save_point');

  return;

}

dyn_functions['template_by_slug_point_to_db_single'] = function(){

  let addon211_slug='point_to_db';

  var c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $('.dlg_'+addon211_slug+'_single'+'_body').append(c);

  //box button tab
  var c = ''
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  $('.dlg_'+addon211_slug+'_single'+'_body').append(c);

  var c = '<div>'
    +'<div class="col-btn-attrs" style="text-align:left;"></div>'
  +'</div>';
  $('.dlg_'+addon211_slug+'_single'+'_body').append(c);

  //box tab1
  c += '<div '
    +'class="dlg_panel panel-tab1" '
    +'style="display:block;font-family:var(--wd-fonts-secondary);">';
  //c += '<p>TAB1</p>';
  c+='View event in Google Analytics as "mapclick": ' + sessionStorage.mapclick_lat+'|'+sessionStorage.mapclick_lng
  c += '</div><!--tab1-->';
  
  $('.dlg_'+addon211_slug+'_single'+'_body').append(c);

}

f_btn['btn_save_point']=function(){

  sessionStorage.this_dialog_lyr='addon210_choose_editable';
  sessionStorage.this_dialog_slug='addon210_choose_editable'+'_single';//'lyr035_single'
  create_dialog2(sessionStorage.this_dialog_slug);

}

dyn_functions['template_by_slug_'+'addon210_choose_editable'+'_single'] = function(){

  var slug ='addon210_choose_editable';

  var c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $('.dlg_'+slug+'_single'+'_body').append(c);

  //box button tab
  var c = ''
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  $('.dlg_'+slug+'_single'+'_body').append(c);

  var c = '<div>'
    +'<div class="col-btn-attrs" style="text-align:left;"></div>'
  +'</div>';
  $('.dlg_'+slug+'_single'+'_body').append(c);

  //box tab1
  c += '<div '
    +'class="dlg_panel panel-tab1" '
    +'style="display:block;font-family:var(--wd-fonts-secondary);">';
  //c += '<p>TAB1</p>';
  c+='Select available layers'
  c+='<div class="container">'
      +'<div class="row container-tab1">'
      +'</div>'
    +'</div>'
  c += '</div><!--tab1-->';
  
  $('.dlg_'+slug+'_single'+'_body').append(c);

  load_map_editable_layers();

}

function load_map_editable_layers(){

  var r = g_meta.geovar_map.features[0].properties.g_editable;
  // _onsole.log(r)
  var i=0;
  r.forEach(lyr => {
    // _onsole.log(element)
    let obj_lyr=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === lyr)[0].properties;
    let label = obj_lyr.g_label;

    $('.container-tab1').append('<div class="col-sm-4" style="margin-top:5px;" element="'+lyr+'">'+label+'</div>');
    i++;
  });

  alertify.infoDialog().destroy();

  if(i==1){
    sessionStorage.destination_layer=r[0];
    save_point_lyr();
  }
  else{
    $('.container-tab1').on('click',function(){
      sessionStorage.destination_layer=$(this).attr('element');
      save_point_lyr();
    });
  }

}
