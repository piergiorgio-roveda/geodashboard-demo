$(document).ready(function() {

  $('.box-gpsposition').append('<div '
    +'class="box-btn_gps box-info-2-btn d-grid gap-2" '
    +'style="margin-top:5px;"></div>');
  create_button('btn_gps');

  $('.box-btn_gps > button').removeClass('btn-outline-dark');
  $('.box-btn_gps > button').addClass('btn-danger');

}); //$(document).ready

var dyn_geolocator = [];
var list_geolocator=[];

localStorage.gps_tool=0;

// !dev change `slug` to `optIn`
f_btn[ 'btn_gps']=function(slug){

  alertify.warning('Gelocator START');

  $('.box-btn_gps > button').removeClass('btn-danger');
  $('.box-btn_gps > button').addClass('btn-warning');

  localStorage.gps_tool=1;

  // _onsole.log('gps');

  //log_tag_manager('btn-gpsposition','',''); 
  //$('.btn-gpsposition').tooltip('hide');
  //$('.btn-gpsposition').html('<i class="fa fa-spinner fa-spin"></i>');
  //$('.badge-position').css('font-size','6px');
  geoUpdate();

}

function geoUpdate(){

  if (localStorage.geo_activate==1){
    localStorage.geo_activate=0;
  }
  else{
    //$('.btn-gpsposition').addClass('btn-gpsposition-active');
    localStorage.geo_activate=1;
    //alertify.notify('Ricerca posizione utente');
    //$('.btn-gpsposition').html(''
    //  +'<i class="material-icons">gps_not_fixed</i>');
  }

}

setInterval(
  function() {
    if(localStorage.geo_activate==1){
      getLocation();
    }
  },
  // intervallo di refresh in millisecondi
  3000
);

setInterval(
  function() {
    if(localStorage.gps_tool==2){
      localStorage.gps_tool=0;
      $('.box-btn_gps > button').removeClass('btn-success');
      $('.box-btn_gps > button').addClass('btn-danger');
    }
  },
  // intervallo di refresh in millisecondi
  10000
);

function getLocation() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  else {
    add_position_point();
  }
}

function showPosition(position) {
  add_position_point(position);
}



function add_position_point(position){

  $('.box-btn_gps > button').removeClass('btn-warning');
  $('.box-btn_gps > button').addClass('btn-success');

  alertify.success('Geolocalized');

  localStorage.gps_tool=2;

  localStorage.geo_activate=0;

  // _onsole.log(position);
  //return

  localStorage.map_lat = position.coords.latitude;
  localStorage.map_lng = position.coords.longitude;

  //dMap.location_search_type = 'route';

  //if(localStorage.geo_activate==1){
    //$('.btn-gpsposition').removeClass('btn-gpsposition-active');
    
    if($(window).width() < 768) {
      mymap.setView([localStorage.map_lat,localStorage.map_lng], 18);
    }
    else{
      mymap.setView([localStorage.map_lat,localStorage.map_lng], 18);
    }

    var lyr = 'vlyr009';
    var geo_lyr=eval('geo_'+lyr);

    var options={
      pointToLayer: eval('geo_'+lyr+'_style'),
      pane:lyr+'_pane'
    }

    var response = {};
    response.type='FeatureCollection';
    response.features = new Array();

    var u = g_meta.geovar_user.features[0];
    var feature = {};
    feature.type='Feature';
    feature.properties = {};
    feature.properties.user_id=u.properties.user_id;
    feature.properties.user_role=u.properties.user_role;
    feature.properties.latitude=localStorage.map_lat;
    feature.properties.longitude=localStorage.map_lng;
    feature.geometry = {};
    feature.geometry.type='Point';
    feature.geometry.coordinates = new Array();
    feature.geometry.coordinates.push(localStorage.map_lng);
    feature.geometry.coordinates.push(localStorage.map_lat);
    response.features.push(feature);
    // _onsole.log(response);

/*
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.734374999999999,
          42.5530802889558
        ]
      }
    }
  ]
}
*/
    remove_lyr('vlyr009');
    var geoJson = L.geoJson(response,options);
    // aggiunta dei punti al featuregroup
    // per gestirli più facilmente
    geo_lyr.addLayer(geoJson);
    // aggiunta del featuregroup alla mappa
    geo_lyr.addTo(mymap);

    //alertify.success('Posizione utente aggiornata');
    //$('.badge-position').html(label_btn_position);
    //log_tag_manager(
    //  'Ricerca Geolocation',//GA - log_tag_manager - action
    //  '',//GA - log_tag_manager - label
    //  '' //GA - log_tag_manager - value (optional)
    //);     
    //$('.btn-gpsposition').html(''
    //  +'<i class="material-icons">gps_fixed</i>');
    //$('.btn-gpsposition').css('color','#1859A7');
    //if(mymap.getCenter().lat.toFixed(3)==dMap.usr.lat.toFixed(3)
    //  && mymap.getCenter().lng.toFixed(3)==dMap.usr.lng.toFixed(3)){

    //}
    //else{
    //  mymap.once('moveend', function() {
    //    // CASE VIEW 1 : google search : 4) update bounding box
    //  });
    //}
    //localStorage.geo_activate=0;
  //}

  $('.box-editing2').css('display','block');
  $('.box-editing2').css('justify-content','center');

  //MOBILE
  $('#box-info1').css('display','');

  /*
  $('.box-editing2').html(''
    +'<div '
      +'class="vlyr009-msg row justify-content-md-center" '
      +'>'
      +'<div class="col-auto ct-editing2" style="padding: 5px 0px;">'
        +'<span '
          +'class="box-btn_analytics_01">'
          +'<button '
            //+'id="info-lyr8-confirm" '
            +'class="btn-vlyr009-clear btn btn_explorer btn-sm btn-dark btn-main-sidebar" '
            +'edit="">'
            //+'<i class="fa fa-floppy-o" aria-hidden="true"></i>'
            +'CLEAR'
          +'</button></span>'
      +'</div>'
    +'<div>'
  +'');
  */

  $('.ct-editing2').append(''
    +'<span '
      +'class="box-btn_vlyr009_clear" '
      +'style="margin-left:5px;"><button '
          //+'id="info-lyr8-confirm" '
          +'class="btn_vlyr009_clear btn btn_explorer btn-sm btn-dark btn-main-sidebar" '
          +'edit="">'
          //+'<i class="fa fa-floppy-o" aria-hidden="true"></i>'
          +'CLEAR'
        +'</button></span>'
  +'');

  //create_button('btn_vlyr009_clear');

  $('.btn_vlyr009_clear').on('click',function(){

    $('.box-editing2').css('display','none');
    $('.box-editing2').html('');
    $('#box-info1').css('display','none');
    remove_lyr('vlyr009');

  });

  list_geolocator.forEach(element => {
    // _onsole.log('call '+element)
    dyn_geolocator[element](position);
  });

}