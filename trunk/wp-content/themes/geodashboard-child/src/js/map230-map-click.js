function m230_ready(){

  if (typeof mymap !== 'undefined') {
    mymap.on('click', on_mapclick);
    dMap.mapclick_status = true;
  }

}

//---

setInterval(
  function() {
    // _onsole.log('prepare_mapclick')
    prepare_mapclick();
  },
  500
);

function on_mapclick(e){
  
  newLat = e.latlng.lat;
  newLng = e.latlng.lng;


  if(dMap.mapclick_status===true){
    list_mapclick.forEach(element => {
      // _onsole.log('call '+element)
      dyn_mapclick[element](e);
    });
  }
  
  /*
  dMap.place.lat = newLat;
  dMap.place.lng = newLng;

  dMap.place.zoom=mymap.getZoom();

  show_loading();
  dataString={
    action:'view_lyr7',
    lat:newLat,
    lng:newLng,
    lyr:'lyr7',
    qy_name:'L',
    collection:'xy'
  }
  generic_api(dataString,'geo_lyr7_onClick');
  */
}

function prepare_mapclick(){

  let disable_mapclick_count=0;

  var g = dMap.analisi01.grLyr;
  g.forEach(lyr => {

    let o = g_meta.geovar_lyr.features
    let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
    let obj_lyr=this_obj[0].properties;

    if(obj_lyr.disable_mapclick!=undefined 
      && obj_lyr.disable_mapclick===true){
      if(dMap.analisi01[element].visible===true){
        disable_mapclick_count++;
      }
    }

  });

  if(disable_mapclick_count>0){
    dMap.mapclick_status = false;
  }
  else{
    dMap.mapclick_status = true;
  }
}
