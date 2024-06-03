<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></script>
<script type="text/javascript" src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-supported/v2.0.0/mapbox-gl-supported.js"></script>  
<script type="text/javascript" src="https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.js"></script>
<script>
  if (mapboxgl.supported() === false) {
    // This is where you will load Mapbox.js & initialize a Static Tile map
    alert('Sorry, MapBox is not available!');
  } else {
    // This is where you will load Mapbox GL JS & initialize a WebGL map
    // _onsole.log('MapBox is available!');
  }
</script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/numbro@2.3.6/dist/numbro.min.js"></script>
<script type="text/javascript" src="https://vis4.net/chromajs/libs/chroma.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.2/moment.min.js"></script>
<script type="text/javascript" src='https://cdn.jsdelivr.net/npm/@turf/turf@6/turf.min.js'></script>

<script async defer src="https://maps.googleapis.com/maps/api/js?key=<?php echo GMAP_KEY;?>&callback=_streetview__init"></script>
