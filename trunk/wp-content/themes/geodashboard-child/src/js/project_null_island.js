var null_island_mapReady = 0;

var null_island_subScripts = [
  // js_loader_list_map_lyr
  "addon268-template-cyberpunk",
  "addon261-view-profile-mask",
  "addon295-null_island-items",
];

dyn_functions['project_null_island'+'_ready'] = function(){

  // onsole.log('Ready-1-sit2!')
  null_island_inizialize();

}

async function null_island_inizialize() {

  prepare_null_island();

  // Before all!
  // _onsole.log('null_island_load_sub_scripts1')
  // await Promise.all([
  //   null_island_load_sub_scripts()
  // ]);

  // await new Promise(resolve => setTimeout(resolve, 1));
  // _onsole.log('null_island_load_sub_scripts2')
  null_island_mapReady = 1;

  // Functions after all ready and load
  prepare_load_sub_scripts(null_island_subScripts);

}
    
function prepare_null_island(){

  // Organize and create template

  $('body').append('');

  return;

}

