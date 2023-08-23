var mymap

function m211_ready(){

  mymap = L.map('mapid',{
    minZoom: 1,
    maxZoom: 20,
    zoomControl: false,
    zoomSnap: 0.5,
    zoomDelta: 0.5,
    wheelPxPerZoomLevel: 100,
    cursor: true
  })

  add_mymap();

}

function add_mymap(){

  if (localStorage.map_lat==undefined) {

    localStorage.map_lat=gLang['lat_start'];
    localStorage.map_lng=gLang['lng_start'];
    localStorage.map_zoom=gLang['zoom_start'];

  }

  if(localStorage.map_zoom>18){

    localStorage.map_zoom=18;

  }

  // Caricamento della mappa base
  mymap.setView([
    localStorage.map_lat,
    localStorage.map_lng
  ],
    localStorage.map_zoom
  );
  
  f_wait.mymap=1;

  //--
  sessionStorage.zoomend_status = 'true';

  mymap.on('zoomend', function() {
    if(sessionStorage.zoomend_status=='true'){
      list_zoomend.forEach(element => {
        dyn_zoomend[element]();
      });
    }
  });
  //---

  //--
  sessionStorage.zoomstart_status = 'true';

  mymap.on('zoomstart', function(e) {
    if(sessionStorage.zoomstart_status=='true'){
      list_zoomstart.forEach(element => {
        dyn_zoomstart[element]();
      });
    }
  });
  //---

}



