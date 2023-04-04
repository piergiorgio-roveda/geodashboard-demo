function disable_map_movement(){
  //mymap.dragging.disable();
  mymap.touchZoom.disable();
  mymap.doubleClickZoom.disable();
  mymap.scrollWheelZoom.disable();
}

function enable_map_movement(){
  //log(dMap['analisi08']);
  //mymap.dragging.enable();
  mymap.touchZoom.enable();
  mymap.doubleClickZoom.enable();
  mymap.scrollWheelZoom.enable();
}

function onClick_zoomIn () {
  mymap.zoomIn();
}

function onClick_zoomOut () {
  mymap.zoomOut();
}

function onClick_home() {
  mymap.flyTo([dMap.map.lat, dMap.map.lng], dMap.map.zoom);
}

function onClick_home_direct() {
  mymap.setView([dMap.map.lat, dMap.map.lng], dMap.map.zoom);
}

function onClick_View (newLat,newLng) {
  //log('y10');
  mymap.setView([newLat, newLng], dMap.map.zoom_result);
}

function onClick_flyTo(newLat,newLng,zoom){
  mymap.flyTo([newLat,newLng], zoom);
}

function zoomTo(
  lat=dMap.place.lat,
  lng=dMap.place.lng,
  zoom=dMap.place.zoom
){
  mymap.once('moveend', function() {

    if(dMap.DataView=='open'){
      //log('y11');
      mymap.setView(
        [dMap.place_with_dataview.lat,dMap.place_with_dataview.lng],
        zoom
      );
    }
    else{
      //log('y12');
      mymap.setView([lat,lng], zoom);
    }
  });
}

function verify_lyr_map_zoom_and_coords(lyr){
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;
  const c = mymap.getCenter();
  if(obj_lyr.load_lat==c.lat.toFixed(3)
    && obj_lyr.load_lng==c.lng.toFixed(3)
    && obj_lyr.load_zoom==mymap.getZoom()){
    var string='same';
  }
  else{
    var string='different';
  }
  // _onsole.log('verify_lyr_map_zoom_and_coords:'+string);
  return string;
}

function get_sys_lang(){

  let sys_lang = 'en';

  if(g_meta.geovar_map){
    let o = g_meta.geovar_map.features;
    let this_obj=o.filter(({properties}) => properties.g_slug === MAPSLUG);
    let obj_map=this_obj[0].properties;

    let obj_addon=obj_map.g_addon.filter((x) => x.addon === 'addon_lang');

    if (obj_addon.length>0) {

      sys_lang = obj_addon[0].lang

    }
  }
  return sys_lang;

}

function get_opt_lang(optIn){

  let sys_lang = 'en';

  if(g_meta.geovar_map){

    let o = g_meta.geovar_map.features;
    let this_obj=o.filter(({properties}) => properties.g_slug === MAPSLUG);

    if(this_obj[0]!=null){

      let obj_map=this_obj[0].properties;
  
      let obj_addon=obj_map.g_addon.filter((x) => x.addon === 'addon_lang');
  
      if (obj_addon.length>0) {
  
        sys_lang = obj_addon[0].lang
    
      }

    }


  }

  let itemLabel = '';

  if(optIn.itemLabel[sys_lang]!=undefined){
    itemLabel = optIn.itemLabel[sys_lang];
  }
  else if(optIn.itemLabel['default']!=undefined){
    itemLabel = optIn.itemLabel['default'];
  }
  else{
    itemLabel = 'No label';
  }

  return itemLabel;

}

function get_geovar_obj(ds){
  
  //_onsole.log('get_geovar_obj',ds);
  let o = new Array();
  let this_obj = new Array();

  //_onsole.log('isArray',Array.isArray(ds.geovar))

  if ( typeof ds.geovar === 'object' ) {
    //_onsole.log(typeof ds.geovar)
    //_onsole.log('value is Array!');
    o = ds.geovar
  } 
  else {
    //_console.log('Not an array');
    if(ds.type=='table_schema'){

      let objCols = g_meta[ds.geovar].filter(
        ({name}) => name === ds.schema
      )[0];
      return objCols;

    }
    else{
      
      if(ds.geovar=="geovar_tb"){
        o = g_meta[ds.geovar]
      }
      else if(ds.geovar=="geovar_label_full"){
        o = g_meta[ds.geovar]
      }
      else{
        o = g_meta[ds.geovar].features
      }
    }
  }

  //--

  let obj=new Array();

  let filter_field = 'g_slug';
  if(ds.filter_field!=undefined){
    filter_field = ds.filter_field;
  }


  if(ds.type=='item'){

    this_obj=o.filter(({properties}) => properties[filter_field] === ds.slug);
    obj=this_obj[0].properties;
    return obj[ds.item];

  }
  else if(ds.type=='single_object'){

    if(ds.geovar=="geovar_tb"){

      if(ds.custom!=undefined 
        && ds.custom=='geovar_tb_master_edit_sub'){
        //_onsole.log(o)
        //this_obj=o.filter(({properties}) => properties[filter_field] === ds.slug);
        //obj=this_obj[0].properties;
        o.forEach(objTb => {
          //_onsole.log(objTb)
          //_onsole.log(filter_field)
          //_onsole.log(ds.slug)
          if(this_obj.length>0){
            obj=this_obj[0].properties;
          }
          else{
            //obj=new Array();
          }
        });
      }
      else{
        this_obj=o.filter(({name}) => name === ds.slug);
        obj=this_obj[0];
      }

    }
    else if(ds.geovar=="geovar_label_full"){

      if(ds.custom!=undefined 
        && ds.custom=='geovar_label_edit_sub'){
        //_onsole.log(o)
        //this_obj=o.filter(({properties}) => properties[filter_field] === ds.slug);
        //obj=this_obj[0].properties;
        o.forEach(objLabel => {
          //_onsole.log(objLabel)
          //_onsole.log(filter_field)
          //_onsole.log(ds.slug)
          this_obj=objLabel.features.filter(({properties}) => properties[filter_field] === ds.slug);
          if(this_obj.length>0){
            obj=this_obj[0].properties;
          }
          else{
            //obj=new Array();
          }
        });
      }
      else{

        this_obj=o.filter(({name}) => name === ds.slug);
        obj=this_obj[0];

      }

    }
    else{
      //_onsole.log(ds)

      //if(o.map((v) => typeof v.properties)[0]=='object'){
      if( ds.noproperties==undefined ||  ds.noproperties==false){
        this_obj=o.filter(({properties}) => properties[filter_field] === ds.slug);
      }
      else{
        // console.log(filter_field)
        // console.log(ds.slug)
        // console.log(o)
        this_obj=o.filter((x) => x[filter_field] === ds.slug);
        // console.log(this_obj)
      }

      
      if(this_obj.length>0){
        
        //_onsole.log('obj',obj)
        if( ds.noproperties==undefined ||  ds.noproperties==false){
          obj=this_obj[0].properties;
        }
        else{
          obj=this_obj[0];
        }
      }
      else{
        obj=new Array();
      }
    }
    
    
    return obj;

  }
  else if(ds.type=='multiple_object'){
    let objects=new Array();
    ds.objects.forEach(slug => {
      this_obj=o.filter(({properties}) => properties[filter_field] === slug);
      objects.push(this_obj[0]);
    });
    
    // obj=this_obj[0].properties;
    return objects;

  }
  else{ //'full_object'

    return o;

  }

  
}

function group_disable_hide(optIn){

  //_onsole.log(item_btn)
  //_onsole.log(g_group)
  //Array.prototype.filter()

  let g_group = optIn.g_group[0];

  let obj_access=g_meta.geovar_access.features.filter(({properties}) => properties.g_slug === g_group);
  //_onsole.log(obj_access)
  if(obj_access.length>0){

    let a = obj_access[0].properties.g_roles;
    let b = g_meta.geovar_user.features[0].properties.user_role;

    if(a[0]=='hidden'){
      $('.box-'+optIn.itemSlug).css('display','none');
    }
    else if(a[0]=='public'){

    }
    else if(a[0]=='private'){
      $('#'+optIn.itemSlug).prop('disabled',true);
    }
    else{

      let result = js_intersect(a, b)

      if(result.length>0){
        $('#'+ioptIn.itemSlug).prop('disabled',false);
      }
      else{
        $('#'+optIn.itemSlug).prop('disabled',true);
      }

    }

  }

}

dyn_functions['get_lyr_bbox'] = function(optIn) {

  g_ds = {
    geovar:"geovar_lyr",//obj_maps
    slug:optIn.itemLyr,//filter
    type:'single_object'//,//'item' or 'single_object' or 'full_object'
  }
  let objItem = get_geovar_obj(g_ds);
  //let f = {"properties":objItem};
  //_onsole.log('objItem2',objItem2);
  //full_obj.push(f);
  //_onsole.log('objItem',objItem.g_tables[0]);

  //-- GET DATA TABLE
  let dataString={
    fn_group:'geodata',
    qy_name:'A'
  }
  dataString.action="view_data";
  dataString.collection='lyr_all_bbox';
  dataString.table_slug=objItem.g_tables[0];

  generic_api(dataString,optIn.g_callback);

}