dyn_functions['glyrsit018_lyr_extend']=function(){

  //_onsole.log('glyrsit018_lyr_extend')

  let lyr='glyrsit018';

  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  sessionStorage['start_lyr_visible_'+lyr]='1';
  obj_lyr.visible=true;

}
