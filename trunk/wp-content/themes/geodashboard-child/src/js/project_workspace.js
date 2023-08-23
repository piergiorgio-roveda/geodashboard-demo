var workspace_mapReady = 0;

list_menu.push('menu_a297');

var workspace_blocks = [
  // js_loader_list_map_lyr
  {
    "master": "addon297-workspace",
    "subblocks": [
      "items", 
      "buttons",
      "async",
      "dyn_functions",
      "html"
    ]
  }
];

var ws_menu_items = {
  'root':[
    {'slug':'main', 'label':'<i class=\"bi bi-person-workspace\"></i>'+
      '&nbsp;WorkSpace', 'parent':'root'},
  ],
  'main':[
    {'slug':'tables', 'label':'<i class="bi bi-view-list"></i>'+
      '&nbsp;Tables', 'parent':'main'},
    {'slug':'maps', 'label':'<i class="bi bi-view-list"></i>'+
      '&nbsp;Maps', 'parent':'main'},
    {'slug':'users', 'label':'<i class="bi bi-view-list"></i>'+
      '&nbsp;Users', 'parent':'main'},
    {'slug':'layers', 'label':'<i class="bi bi-view-list"></i>'+
      '&nbsp;Layers', 'parent':'main'},
  ]
}

var sqlPlus = [];
var table_meta_plus = [
  {'g_slug':'number_of_records','g_note':'0-9999'},
  {'g_slug':'feat_type','g_note':'point,polyline,polygon,table,raster'},
  {'g_slug':'original_srs','g_note':'...'},
  {'g_slug':'field_geom','g_note':'true/false'},
  {'g_slug':'field_geom_3857','g_note':'true/false'},
  {'g_slug':'publish','g_note':'2013-05-09'},
  {'g_slug':'modified','g_note':'2013-05-09'}
];

dyn_functions['project_workspace'+'_ready'] = function(){

  // onsole.log('Ready-1-sit2!')
  workspace_inizialize();

}

async function workspace_inizialize() {

  prepare_workspace();

  // Before all!
  // _onsole.log('workspace_load_sub_scripts1')
  // await Promise.all([
  //   workspace_load_sub_scripts()
  // ]);

  // await new Promise(resolve => setTimeout(resolve, 1));
  // _onsole.log('workspace_load_sub_scripts2')
  workspace_mapReady = 1;

  // Functions after all ready and load
  prepare_load_sub_scripts_block(workspace_blocks);

}

function prepare_workspace(){

  // Organize and create template

  $('body').append('');

  return;

}

