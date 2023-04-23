var a253_mapReady = 0;
var a253_lyr = new L.featureGroup();
var a253_geohash_last = 'a';
var a253_geohash = 'a';

dyn_functions['addon253-mouse-geohash-info'+'_ready'] = function (){

  a253_mapReady = 1;

  mymap.addEventListener('mousemove', (event) => {
    let lat = Math.round(event.latlng.lat * 100000) / 100000;
    let lng = Math.round(event.latlng.lng * 100000) / 100000;
    //this.position.updateHTML(lat, lng);
    sessionStorage.mousePosLat_last = lat;
    sessionStorage.mousePosLng_last = lng;

    a253_geohash = Geohash.encode(
      sessionStorage.mousePosLat_last, 
      sessionStorage.mousePosLng_last, 
      8);

    if(a253_geohash_last!=a253_geohash){
      a253_geohash_last=a253_geohash;
      console.log(a253_geohash);
      a253_lyr_add();
    }   
  });

}

function a253_lyr_clear(){
  a253_lyr.clearLayers();
}

function a253_lyr_add(){
  a253_lyr_clear();

  let boundsG = Geohash.bounds(a253_geohash_last);
  var bounds = [];
  //var bounds2 = [[53.912257, 27.581640], [53.902257, 27.561640]];
  bounds.push([boundsG.ne.lat,boundsG.ne.lon]);
  bounds.push([boundsG.sw.lat,boundsG.sw.lon]);
  //_onsole.log(bounds)
  //_onsole.log(bounds2)
  var rect = L.rectangle(
    bounds, {color: 'blue', weight: 1}
    ).on('click', function (e) {
      // There event is event object
      // there e.type === 'click'
      // there e.lanlng === L.LatLng on map
      // there e.target.getLatLngs() - your rectangle coordinates
      // but e.target !== rect
      //_onsole.info(e);
      //add_geohash_to_geo_vlyr001b(e);
  });
  rect.feature=new Array();
  rect.feature.properties=new Array();
  rect.feature.properties.geohash = a253_geohash_last;

  a253_lyr.addLayer(rect);    

  // FINAL ADD!
  a253_lyr.addTo(mymap);  

}

// setInterval(
//   function() {

//     if(a253_mapReady==1){

//       if(sessionStorage.mousePosLat_fix!=sessionStorage.mousePosLat_last
//         && sessionStorage.mousePosLng_fix!=sessionStorage.mousePosLng_last){

//         sessionStorage.mousePosLat_fix = sessionStorage.mousePosLat_last;
//         sessionStorage.mousePosLng_fix = sessionStorage.mousePosLng_last;
//         //_onsole.log('PosLat',sessionStorage.mousePosLat_fix);
//         //_onsole.log('PosLng',sessionStorage.mousePosLng_fix);

//       }

//       if(sessionStorage.mapPosLat_fix!=mymap.getCenter().lat
//         && sessionStorage.mapPosLng_fix!=mymap.getCenter().lng){

//         sessionStorage.mapPosLat_fix = mymap.getCenter().lat;
//         sessionStorage.mapPosLng_fix = mymap.getCenter().lng;

//       }

//       // _onsole.log('------------------------------------');
//       let a253_geohash = Geohash.encode(sessionStorage.mousePosLat_last, sessionStorage.mousePosLng_last, 9);
//       console.log(a253_geohash);
//     }
//   },
//   800
// );
