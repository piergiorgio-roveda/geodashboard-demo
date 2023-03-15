$(document).ready(function() {

}); //$(document).ready

sessionStorage.outer_data_e=0;
sessionStorage.outer_data_w=0;
sessionStorage.outer_data_n=0;
sessionStorage.outer_data_s=0;


let lyr='vlyr011';
let o = g_meta.geovar_lyr.features
let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
let obj_lyr=this_obj[0].properties;

dMap.analisi01.grLyr.push(lyr);

var geo_vlyr011 = new L.featureGroup();

if(obj_lyr.intoc!=undefined 
  && obj_lyr.intoc===1){

  dMap.analisi01.grLyrToc.push(lyr);

}

//--

function geo_vlyr011_style(feature,latlng) {

  var lyr='vlyr011';

  return L.marker(latlng).addTo(mymap);//to calibrate

}

function geo_vlyr011_onClick(e) {

  console.log(e);

}

dyn_lyr_discover['vlyr011'] = function(){

  const b = mymap.getBounds();

  let lyr='vlyr011';
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  if(obj_lyr.visible===true){

    if(verify_lyr_map_zoom_and_coords(lyr)=='different'){
      // _onsole.log('change something on zoom or coordinate:'+lyr);
      console.log('different coords');

      const c = mymap.getCenter();
      obj_lyr.load_lat=c.lat.toFixed(3);
      obj_lyr.load_lng=c.lng.toFixed(3);
      obj_lyr.load_zoom=mymap.getZoom();

      var dataString = {
        fn_group:'geodata',
        action:'view_data',
        collection:'check_outer',
        qy_name:'A',
        lyr:lyr,
        geom:0,
        current_zoom:mymap.getZoom(),
        mye:b.getEast(),
        myw:b.getWest(),
        myn:b.getNorth(),
        mys:b.getSouth(),
        data_e:sessionStorage.outer_data_e,
        data_w:sessionStorage.outer_data_w,
        data_n:sessionStorage.outer_data_n,
        data_s:sessionStorage.outer_data_s
      };

      generic_api(dataString,'check_outer_vlyr011');

    }
    else{
      // _onsole.log('same coords');
    }

  }

}

dyn_functions['succ_check_outer_vlyr011'] = function(r){

  let lyr=r.ds.lyr;
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  const prop = r.features[0].properties
  if(prop.contains==false){
    //_onsole.log('contains==false');
    remove_lyr(lyr);
    obj_lyr.status='off';
    view_data_vlyr011();
  }
  else if(prop.contains==true){
    //_onsole.log('contains==true')
  }
  else{
    //_onsole.log('Something wrong')
  }

}

function view_data_vlyr011(){

  let lyr='vlyr011';
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;
  var d = obj_lyr;

  var geo_lyr=eval('geo_'+lyr);

  const b = mymap.getBounds();

  console.log('dyn_lyr_discover::' + lyr
    +'|status:'+obj_lyr.status
    +'|visible:'+obj_lyr.visible
  +'');

  //mymap.removeLayer(geo_lyr);
  //geo_lyr.clearLayers();

  //t@his_lyr[lyr].status='pending';
  //const c = mymap.getCenter();
  //t@his_lyr[lyr]['load_lat']=c.lat.toFixed(3);
  //t@his_lyr[lyr]['load_lng']=c.lng.toFixed(3);
  //t@his_lyr[lyr]['load_zoom']=mymap.getZoom(); 

  if(obj_lyr.visible===true){

    if(obj_lyr.status=='off'){

      obj_lyr.status='pending';

      var dataString = {
        fn_group:'geodata',
        action:'view_data',
        collection:'lyr_all_virtual',
        qy_name:'A',
        lyr:lyr,
        geom:1,
        current_zoom:mymap.getZoom(),
        mye:b.getEast(),
        myw:b.getWest(),
        myn:b.getNorth(),
        mys:b.getSouth()
      };

      generic_api(dataString,'switch_on_vlyr011');
    }//status
  }//visible
  else if(obj_lyr.visible===false){
    obj_lyr.status='off';
    remove_lyr(lyr);
  }

}

dyn_functions['succ_switch_on_vlyr011'] = function(r){

  // _onsole.log('succ_switch_on_vlyr011');
  // _onsole.log(r);

  let lyr=r.ds.lyr;
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  obj_lyr.last_r=r.features;
  var geo_lyr=eval('geo_'+lyr);
  obj_lyr.status='on';

  obj_lyr.last_r.features.forEach(element => {
    const prop = element.properties
    if(prop.col1=='outer'){
      sessionStorage.outer_data_e=prop.data_e;
      sessionStorage.outer_data_w=prop.data_w;
      sessionStorage.outer_data_n=prop.data_n;
      sessionStorage.outer_data_s=prop.data_s;
    }
  });


  var geojson = L.geoJson(r,{
    //onEachFeature: eval('geo_'+lyr+'_style'),
    pane:lyr+'_pane'
  });
  
  geo_lyr.addLayer(geojson);

  // FINAL ADD!
  geo_lyr.addTo(mymap);

}