    <!-- 
     The `defer` attribute causes the callback to execute after the full HTML
     document has been parsed. For non-blocking uses, avoiding race conditions,
     and consistent behavior across browsers, consider loading using Promises
     with https://www.npmjs.com/package/@googlemaps/js-api-loader.
    
    <script
      src="https://maps.googleapis.com/maps/api/js?key=<?php echo GMAP_KEY;?>&v=weekly"
      defer
    ></script>-->
    <!-- GOOGLE API 
    <script src="https://maps.googleapis.com/maps/api/js?key=<?php echo GMAP_KEY;?>&libraries=places&callback=initialize"
    async defer ></script>-->

    <script src="https://maps.googleapis.com/maps/api/js?key=<?php echo GMAP_KEY;?>&signed_in=true&libraries=places"
        async defer></script>