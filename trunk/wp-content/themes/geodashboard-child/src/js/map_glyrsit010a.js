$(document).ready(function() {
  glyrsit010_ready();
}); //$(document).ready

function glyrsit010_ready(){
  if (f_wait.geovar_lyr==0) {
    // _onsole.log('wait')
    setTimeout(function(){glyrsit010_ready()},100);
    return;
  } else {
    prepare_glyrsit010();
  };
}

//var glyrsit010_style_icon = new Array();

function prepare_glyrsit010(){

  let item_lyr = 'glyrsit010';
  let obj_fileterd=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === item_lyr);
  let obj_lyr = obj_fileterd[0];

  //add group
  generic_lyr(item_lyr);

  obj_lyr.properties.g_options.forEach(lyr => {
    generic_lyr(lyr);
  });

}

//--

/* dyn_functions['glyrsit010_lyr_extend']=function(){

  console.log('glyrsit010_lyr_extend');
  return;

} */
