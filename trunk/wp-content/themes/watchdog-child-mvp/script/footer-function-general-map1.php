<script>

  function resize_box(){
    /*
    if($(window).width() < 991) {
      doOnOrientationChange();
      $(window).on("orientationchange", doOnOrientationChange);
    }
    */
    if($(window).width() < 768) {
      $('#mapid').css('width',$(window).width());
    }
    else{
      $('#mapid').css('width',$(window).width()-$('.box-sidebar').width());
    }
    $('#mapid').css('height',$(window).height());
    $('#mapid').css('display','');

    mymap.invalidateSize();

    //$(window).resize(function(){
    //  resize_box();
    //});

  }

  function resize_box_b45(){
    //_onsole.log('resize_b45');
    change_wd_visibility();
    resize_box();
  }

  function change_wd_visibility(){
    if($(window).width() < 768) {
      $('.WD-GUI-desktop').removeClass('WD-GUI-visible');
      $('.WD-GUI-desktop').addClass('WD-GUI-hide');
      $('.WD-GUI-mobile').removeClass('WD-GUI-hide');
      $('.WD-GUI-mobile').addClass('WD-GUI-visible');      
    }
    else{
      $('.WD-GUI-desktop').removeClass('WD-GUI-hide');
      $('.WD-GUI-desktop').addClass('WD-GUI-visible');
      $('.WD-GUI-mobile').removeClass('WD-GUI-visible');
      $('.WD-GUI-mobile').addClass('WD-GUI-hide');      
    }
    return;
  }

  function doOnOrientationChange(){

    switch(window.orientation) {
      case -90:
      case 90:
        //alert('landscape');
        if(isiPhone()){
          //alert('iPhone detected');
        //  $('#mapid').height($('#mapid').height());
        //  $('.modal-content').css('bottom','10px');
        }
        else{
          //alert('iPhone detected');
          //$('#mapid').height($('#mapid').height());

        }
        break;
      default:
        if(isiPhone()){
          //alert('iPhone detected');
          //$('.modal01-dialog').css('bottom','10px');
        }
        else{
          //alert('iPhone detected');
          //$('.modal-content').css('bottom','10px');
          //$('.modal01-dialog').css('bottom','10px');
        }
        break;
    }
  }

  function style_attribution(){
    if(dMap['map-attribution-tile']=='satellite'){
      //$('.gmnoprint').css('display','none');
      dMap['map-attribution']=geoinfo_azienda;
    }
    else{
      dMap['map-attribution']=geoinfo_azienda+' - Leaflet';//+label_attribution1;
    }
    if($(window).width() < 768) {
      $('.leaflet-control-attribution').remove();
      $('body').append('<div class="box-attribution-sm">'+dMap['map-attribution']+'</div>')
    }
    else{
      $('.leaflet-control-attribution').html(dMap['map-attribution']);
      $('.leaflet-control-attribution').css('font-size','8px');
    }
    //$('.leaflet-bottom').css('margin-bottom','10px');
  }

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

  function onClick_home () {
    mymap.flyTo([dMap.map.lat, dMap.map.lng], dMap.map.zoom);
  }

  function onClick_View (newLat,newLng) {
    //log('y10');
    mymap.setView([newLat, newLng], dMap.map.zoom_result);
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




  function geoUpdate(){

    if (geo_activate==1){
      geo_activate=0;
    }
    else{
      //$('.btn-gpsposition').addClass('btn-gpsposition-active');
      geo_activate=1;
      alertify.notify('Ricerca posizione utente');
      $('.btn-gpsposition').html(''
        +'<i class="material-icons">gps_not_fixed</i>');
    }

  }


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

    dMap.usr.lat = position.coords.latitude;
    dMap.usr.lng = position.coords.longitude;

    //dMap.location_search_type = 'route';

    if(geo_activate==1){
      //$('.btn-gpsposition').removeClass('btn-gpsposition-active');
      mymap.setView([dMap.usr.lat,dMap.usr.lng], dMap.zoom_gps);
      alertify.success('Posizione utente aggiornata');
      //$('.badge-position').html(label_btn_position);
      log_tag_manager(
        'Ricerca Geolocation',//GA - log_tag_manager - action
        '',//GA - log_tag_manager - label
        '' //GA - log_tag_manager - value (optional)
      );     
      $('.btn-gpsposition').html(''
        +'<i class="material-icons">gps_fixed</i>');
      $('.btn-gpsposition').css('color',color_primary);
      if(mymap.getCenter().lat.toFixed(3)==dMap.usr.lat.toFixed(3)
        && mymap.getCenter().lng.toFixed(3)==dMap.usr.lng.toFixed(3)){

      }
      else{
        mymap.once('moveend', function() {
          // CASE VIEW 1 : google search : 4) update bounding box
        });
      }
      geo_activate=0;
    }         

  }

  function zoom_to_geohash(geohash){
    mymap.setView(
      [
        Geohash.decode(geohash).lat,
        Geohash.decode(geohash).lon
      ],
      16
    );
  }
</script>