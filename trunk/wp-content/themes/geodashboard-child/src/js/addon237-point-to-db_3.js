$(document).ready(function() {

  a237_ready();

}); //$(document).ready

function a237_ready(){
  // if (f_wait.btn_profile==0
  //   || f_wait.geovar_dialog==0) {
  //   // _onsole.log('wait')
  //   setTimeout(function(){a237_ready()},100);
  //   return;
  // } else {
    prepare_a237();
  // };
}

function prepare_a237(){

  //define in list
  var a237_slug='point_to_db';

  list_geolocator.push(a237_slug);
  list_add_poi.push(a237_slug);

  //g_meta.geovar_dialog is update from DB
  //but to customize can push this array
  //var meta = {
  //  'properties':{
  //    'g_description': null,
  //    'g_label': 'Map click test',
  //    'g_slug': a237_slug+'_single',
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

