
sessionStorage.scalecontrol=0;
sessionStorage.scaleratio=0;

//--
//list_zoomend.push('get_scale_dimension');
dyn_zoomend['get_scale_dimension'] = function(map){

  //$('.map-control-scalebar-ratiomenu > .menu').css('display','block!important');
  //$('.map-control-scalebar-ratiomenu > .menu').css('top','-500px');
  //$('#mapid').css('width','15cm');
  //$('#mapid').css('height','15cm');

  //mymap.fitBounds([[45.46745455950747,9.243019510738081],[45.47182876931522,9.25581948299337]]);

  // Get the y,x dimensions of the map
  // var y = mymap.getSize().y, //px
  //     x = mymap.getSize().x; //px
  
  // _onsole.log('Map width in pixel: '+x);
  // calculate the distance the one side of the map to the other using the haversine formula
  //var maxMeters = mymap.containerPointToLatLng([0, y]).distanceTo( mymap.containerPointToLatLng([x,y]));
  // _onsole.log('Map width in meter: '+maxMeters);
  // calculate how many meters each pixel represents
  //var MeterPerPixel = maxMeters/x ;
  // _onsole.log('MeterPerPixel: '+MeterPerPixel);
  //var PixelPerMeter = x/maxMeters;
  // _onsole.log('PixelPerMeter: '+PixelPerMeter);


  //let scale = L.control.scale()
  // This is the scale denominator
  //console.log(MeterPerPixel*scale.options.maxWidth);

  //878 px = 270 mm
  //DPI = DotPerInch
  //1 inch = 25.4 mm
  //270 mm / 25.4 mm = 10.629 inch
  //878 px = 10.629 inch
  //878 px / 10.629 inch = 82.604 DPI

  //mapPixel:mapMeter=100:x
  //mapMeter*100/mapPixel
  //let Meter100Pixel = maxMeters*100/x;
  // _onsole.log('Meter per 100 pixel: '+Meter100Pixel+'m');
  // _onsole.log('Zoom: '+mymap.getZoom()+'');

  //Zoom: 16 >> Meter per 100 pixel: 167.37 m
  //Zoom: 17 >> Meter per 100 pixel: 83.68 m

  //Map width in pixel:167.37=x:100
  //1091:167.37=x:100
  //16*100/167=

  //var pixelsInMeterWidth = PixelPerMeter;
  var pxInMeterWidth = pixelsInMeterWidth();
  let scaleRatio = sessionStorage.scaleratio;
  //setScaleRatio (function)

  var bounds = map.getBounds(),
    centerLat = bounds.getCenter().lat,
    crsScale = pxInMeterWidth * getMapWidthForLanInMeters(centerLat) / scaleRatio;

  // _onsole.log('My-scaleRatio:'+scaleRatio);
  // _onsole.log('My-centerLat:'+centerLat);
  // _onsole.log('My-crsScale:'+crsScale);
  // _onsole.log('My-pixelsInMeterWidth:'+pxInMeterWidth);

  //this._map.setZoom(this._map.options.crs.zoom(crsScale));
  let crs_zoom=map.options.crs.zoom(crsScale);
  // _onsole.log('MyZoom: '+crs_zoom);
  map.setZoom(crs_zoom);

}

// Returns width of map in meters on specified latitude.
function getMapWidthForLanInMeters(currentLan) {
  return 6378137 * 2 * Math.PI * Math.cos(currentLan * Math.PI / 180);
}

// Returns pixels per meter; needed if ratio: true.
function pixelsInMeterWidth(){
  var div = document.createElement('div');
  div.style.cssText = 'position: absolute;  left: -100%;  top: -100%;  width: 100cm;';
  document.body.appendChild(div);
  var px = div.offsetWidth;
  document.body.removeChild(div);
  return px;
}

//--
