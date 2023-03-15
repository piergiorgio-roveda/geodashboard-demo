$(document).ready(function() {

  addon210_ready();

}); //$(document).ready

function addon210_ready(){
  if (f_wait.btn_profile==0
    || f_wait.geovar_dialog==0) {
    // _onsole.log('wait')
    setTimeout(function(){addon210_ready()},100);
    return;
  } else {
    prepare_addon210();
  };
}

function prepare_addon210(){

  var addon210_slug='profile_view';

  //g_meta.geovar_dialog is update from DB
  //but to customize can push this array
  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'Profile',
      'g_slug': addon210_slug+'_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  //if(addon_login!=false){
    create_button('btn_profile');
  //}

}



f_btn['btn_profile']=function(slug){

  sessionStorage.this_dialog_lyr=addon210_slug;
  sessionStorage.this_dialog_slug=addon210_slug+'_single';//'lyr035_single'
  create_dialog2(sessionStorage.this_dialog_slug);

}

dyn_functions['template_by_slug_profile_view_single'] = function(){

  let addon210_slug='profile_view';

  let c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $('.dlg_'+addon210_slug+'_single'+'_body').append(c);

  //box button tab
  c = ''
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  $('.dlg_'+addon210_slug+'_single'+'_body').append(c);

  c = '<div>'
    +'<div class="col-btn-attrs" style="text-align:left;"></div>'
  +'</div>';
  $('.dlg_'+addon210_slug+'_single'+'_body').append(c);

  //box tab1
  c += '<div '
    +'class="dlg_panel panel-tab1" '
    +'style="display:block;font-family:var(--wd-fonts-secondary);">';
  //c += '<p>TAB1</p>';
  c+='Select available map'
  c+='<div class="container">'
      +'<div class="row container-tab1">'
      +'</div>'
    +'</div>'
  c += '</div><!--tab1-->';
  
  $('.dlg_'+addon210_slug+'_single'+'_body').append(c);

  load_user_maps();

}

function load_user_maps(){

  var this_user_group = ["0xall"];

  dataString={
    fn_group:'geodata',
    action:'view_data',
    collection:'view_user_maps',
    qy_name:'A',
    lyr:'lyr999',//'lyr035',
    geom:false,
    g_group:this_user_group
  }
  generic_api(dataString,'load_user_maps');
  return;

}

dyn_functions['succ_load_user_maps'] = function(r){

  r.features.forEach(element => {
    // _onsole.log(element)
    var p = element.properties;

	  //::dev get ths from db (map)
    var img_url ='https://www.cityplanner.biz/gta/webgis-v5/webgis/'+p.g_slug+'/cover.jpg.png';
    var map_url ='https://www.cityplanner.biz/gta/webgis-v5/webgis/'+p.g_slug+'/';
    $('.container-tab1').append('<div class="col-sm-4" style="margin-top:5px;"><a href="'+map_url+'">'+p.g_slug+'<br><img src="'+img_url+'" class="img-fluid" alt="Responsive image"></a></div>');

  });

}