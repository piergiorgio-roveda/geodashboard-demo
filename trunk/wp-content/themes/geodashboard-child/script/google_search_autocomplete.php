<?php
/**
 * The template part for footer of main map on front-page
 *
 * @package WordPress
 * @subpackage _underscores
 */

  //$o=json_apiInfo();
  //$google_api = GOOGLE_API_SEARCH_AND_MAP;
  //$info_tracker=get_info_tracker();

?>

<script>
  // Document ready
  $(document).ready(function() {
    console.log('Ready-2!');
  }); //$(document).ready

  setInterval(
    function() {
      //getLocation();
    },
    // intervallo di refresh in millisecondi
    3000
  );

  var pin_address = new L.featureGroup();

  var locationIcon1 = L.icon({
    iconUrl: geovar.home_project+'/source/icon/'+	locationIcon1_img,
    iconSize: [25, 25], // size of the icon
    iconAnchor: [12.5,12.5] // point of the icon which will correspond to marker's location
  });

  function initialize() {
    aggiungi_box_ricerca();
    //initMap();
    initAutoComplete();
  }

  function initAutoComplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
      {
        types: ['geocode'],
        componentRestrictions: {country: "it"}
      }
    );

    // When the user selects an address from the dropdown, 
    //populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', setAddressOnMap);

  }

  // [START region_fillform]
  function setAddressOnMap() {

    var place = autocomplete.getPlace();

    dMap.place.lat = place.geometry.location.lat();
    dMap.place.lng = place.geometry.location.lng();

    dMap.place.zoom=zoom_result;
    mymap.setView(
      [
        dMap.place.lat,
        dMap.place.lng
      ], 
      dMap.place.zoom
    );
    var marker = L.marker([dMap.place.lat, dMap.place.lng], {
      icon: locationIcon1
    });
    pin_address.addLayer(marker);
    pin_address.addTo(mymap);
    //window.setTimeout(function(){
    //  mymap.removeLayer(pin_address);
    //  pin_address.clearLayers(); 
    //}, 15000);
  }

  // Funzioni del geolocator
  function aggiungi_box_ricerca(){

    var placeSearch, autocomplete;
    var componentForm = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
      postal_code: 'short_name'
    };
    if($(window).width() < 768) {
      $( '#search-cointainer-sm' ).html(''
        +'<input style="padding-left:3px;border: 0px;" '
          +'id="autocomplete" '
          +'placeholder="'+label_search_cointainer+'" type="text" '
          +'class="form-control form-control-sm locationField-form-control">'
      );
    }
    else{
      $( '#search-cointainer' ).html(''
        +'<div id="icon-locationField" '
          +'class="col-2 text-center" style="height:40px;">'
          +'<p style="margin-top:10px;">'
            +'<i class="fa fa-search" aria-hidden="true" '
              +'style="font-size: 13px;"></i>'
          +'</p>'
        +'</div>'
        +'<div id="locationField" '
          +'class="col-10" style="padding-left: 3px;height:40px;">'
          +'<input style="padding-left:3px;'
            +'border: 0px solid #ced4da;border-bottom:1px solid #ced4da;" '
            +'id="autocomplete" '
            +'placeholder="'+label_search_cointainer+'" type="text" '
            +'class="form-control locationField-form-control">'
        +'</div>');
    }

  }

</script>