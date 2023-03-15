/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
let panorama;

//window.initialize = initialize;

function fill_streetview(datastring){

  var myLatlng = new google.maps.LatLng(datastring.lat,datastring.lng); 
  var sv = new google.maps.StreetViewService();

  //window.initialize = initialize;
  $('#'+datastring.tag).html('');

  panorama = new google.maps.StreetViewPanorama(
    document.getElementById(datastring.tag)
  );

  // _onsole.log(myLatlng)

  panorama = new google.maps.StreetViewPanorama(
    document.getElementById(datastring.tag),
    {
      position: { 
        lat: datastring.lat,
        lng: datastring.lng
      },
      pov: {
        heading: datastring.pov_heading,
        pitch: datastring.pov_pitch
      },
      zoom: 1,
      linksControl: false,
      //panControl: false,
      enableCloseButton: false,
      fullscreenControl: false,
      addressControl:false,
    }
  );
  // Set the initial Street View camera to the center of the map
  sv.getPanorama({
    location: myLatlng,
    radius: 50,
    source: google.maps.StreetViewSource.OUTDOOR
  }, processSVData);

}

function processSVData(data, status) {
  if (status === google.maps.StreetViewStatus.OK) {

    //_onsole.log('treetViewStatus.OK')
    sessionStorage.StreetViewStatus = 'StreetViewStatus.OK';

    $('.street-view-status').html('');
    $('.street-view-status').css('display','none');

    panorama.setPano(data.location.pano);
    panorama.setPov({
      heading: 270,
      pitch: 0
    });
    panorama.setVisible(true);

  }
  else{

    //_onsole.error('Street View data not found for this location.');
    sessionStorage.StreetViewStatus = 'StreetViewStatus.NotFound';

    $('.street-view-status').html(''
      +'<div class="alert alert-warning d-flex align-items-center" role="alert">'
        +'<div>'        
          +'<span style="margin-right: 10px;">'
            +'<i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span>'
          +'Street View data not found for this location.'
        +'</div>'
      +'</div>'
    +'');

    $('.street-view-status').css('display','block');

  }
}
