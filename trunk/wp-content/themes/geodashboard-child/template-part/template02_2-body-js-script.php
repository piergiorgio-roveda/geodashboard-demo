<!--BODY-JS-SCRIPT / ROUTING-->
<script src='<?php echo get_site_url().'/script/template-g_variables-js/?g_map_slug='.$gMapSlug;?>'></script>

<script>

  var list_basemap = <?php echo json_encode($itemMap['list_basemap'], JSON_PRETTY_PRINT);?>;
  var mapuser_meta = <?php echo json_encode($mapuser_meta, JSON_PRETTY_PRINT);?>;

</script>

<script src='<?php echo get_stylesheet_directory_uri().'/src/js/main_var.js?ver='.APP_VERSION;?>'></script>

<script>

  g_meta.obj_maps = <?php echo json_encode($obj_maps, JSON_PRETTY_PRINT);?>
  
</script>

<script src='<?php echo get_site_url().'/script/geovar_access/?g_map_slug='.$gMapSlug;?>'></script>

<?php
$url=get_stylesheet_directory_uri().'/src/js/main_async.js?ver='.APP_VERSION;
// $url=get_stylesheet_directory_uri().'/src/js/main_async-test.js?ver='.APP_VERSION;
// $url=get_stylesheet_directory_uri().'/src/js/main_async_routing.js?ver='.APP_VERSION;
?>
<script src='<?php echo $url;?>'></script>
<?php
$url=get_stylesheet_directory_uri().'/src/js/default.js?ver='.APP_VERSION;
?>
<script src='<?php echo $url;?>'></script>