<?php

//template02-body-js-extra
?>

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

<?php

$js_loader_list=[];

foreach ($itemMap['js_loader_list_map_lyr'] as $key => $value) {
  $js_loader_list[]=$value;
}

foreach ($itemMap['js_loader_list_map_config'] as $key => $value) {
  $js_loader_list[]=$value;
}

foreach ($js_loader_list as $key => $value) {
  $url=get_stylesheet_directory_uri().'/src/js/'.$value.'.js?ver='.APP_VERSION;
  ?>
  <script src='<?php echo $url;?>'></script>
  <?php
}

?>
