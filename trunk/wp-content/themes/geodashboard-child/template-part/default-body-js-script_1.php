<!--BODY-JS-SCRIPT -->
<script src='<?php echo get_site_url().'/script/template-g_variables-js/?g_map_slug='.$gMapSlug;?>'></script>
<script src='<?php echo get_site_url().'/script/template-g_variables-js_1/?g_map_slug='.$gMapSlug;?>'></script>

<script src='<?php echo get_stylesheet_directory_uri().'/src/js/main_var.js?ver='.APP_VERSION;?>'></script>

<script>
  g_meta.obj_maps = obj_maps;
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