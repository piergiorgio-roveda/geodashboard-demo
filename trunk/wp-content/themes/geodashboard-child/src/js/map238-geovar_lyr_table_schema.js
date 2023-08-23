dyn_functions['geovar_lyr_extend'] = function(){

  g_meta.geovar_lyr.features.forEach(feature => {

    var p=feature.properties

    let lyr=p.g_slug;
    let o = g_meta.geovar_lyr.features
    let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
    let obj_lyr=this_obj[0].properties;

    if(table_slug=obj_lyr.g_tables!=undefined){
      var table_slug=obj_lyr.g_tables[0];

      obj_lyr.table_schema=new Array();
      obj_lyr.table_schema.features=[];
      load_table_schema(table_slug,p.g_slug);

    }

  });

}

f_wait.table_schema=0;

function load_table_schema(table_slug,lyr){

  if (f_wait.geovar_map==0
    || f_wait.geovar_map_tb==0) {
    // _onsole.log('wait geovar_map')
    setTimeout(function(){load_table_schema(table_slug,lyr)},100);
    return;
  } else {
    // _onsole.log('stop wait geovar_map')
    dyn_functions['fill_table_schema'](table_slug,lyr);
  };

}

dyn_functions['fill_table_schema'] = function(table_slug,lyr){

  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  g_meta.geovar_map_tb.forEach(obj => {
    // _onsole.log(obj)
    if(obj.name==table_slug){
      obj_lyr.table_schema.features.push(obj.features);
    }
  });

  f_wait.table_schema=1;

}