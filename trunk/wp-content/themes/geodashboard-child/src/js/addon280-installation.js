var a280_mapReady = 0;

var a280_subScripts = [
  // js_loader_list_map_lyr
  'addon281-installationmanager'
];

dyn_functions['addon280-installation'+'_ready'] = function(){

  // onsole.log('Ready-1-sit2!')
  a280_inizialize();

}

async function a280_inizialize() {

  prepare_a280();

  // Before all!
  // _onsole.log('a280_load_sub_scripts1')
  // await Promise.all([
  //   a280_load_sub_scripts()
  // ]);

  // await new Promise(resolve => setTimeout(resolve, 1));
  // _onsole.log('a280_load_sub_scripts2')
  a280_mapReady = 1;

  // Functions after all ready and load
  prepare_load_sub_scripts(a280_subScripts);
}
    
function prepare_a280(){

  // Organize and create template

  $('body').append('');

  return;

}
