$(document).ready(function() {

  // $('.box-info-0').html(''
  //   +'<div style="text-align:center;width:100%;margin-top:15px;">'
  //   +'<button class="btn btn-primary btn-sm" id="btn-info-0">A</button>'
  //   +'&nbsp;<button class="btn btn-primary btn-sm" id="btn-info-1">B</button>'
  //   +'&nbsp;<button class="btn btn-primary btn-sm" id="btn-info-2">C</button>' 
  //   +'</div>'
  // );

  $('.box-usrprofile').append('<div '
    +'class="box-btn-info-0 box-info-2-btn d-grid gap-2" '
    +'style="margin-top:5px;">'
      +'<button class="btn btn-sm btn-outline-dark btn-main-sidebar elegant01" '
        +'id="btn-info-0"><i class="fa fa-th-large" aria-hidden="true"></i></button>'
    +'</div>');

  sessionStorage.baseMap = 'a';

  $('#btn-info-99').click(function(){
    L.tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {pane: 'lyr040_pane'}
    ).addTo(mymap);
  } );
  $('#btn-info-0').click(function(){
    if(sessionStorage.baseMap == 'a'){
      sessionStorage.baseMap = 'b';
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {pane: 'lyr040_pane'}
      ).addTo(mymap);
    }
    else{
      sessionStorage.baseMap = 'a';
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png',
        {pane: 'lyr040_pane'}
      ).addTo(mymap);
    }

  } );
  $('#btn-info-2').click(function(){
    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png',
      {pane: 'lyr040_pane'}
    ).addTo(mymap);
  } );
}); //$(document).ready

