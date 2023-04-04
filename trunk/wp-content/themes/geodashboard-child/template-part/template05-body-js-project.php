<?php

$js_loader_list=[
  //--MAIN
  'map202-base',
  'map203-google-initialize',
  'map204-search-cointaner',
  'map206-general',
  'map218-api',
  'map223-geovar-loader',
  //--
  'map201-general-map',
  'map205-template',
  'map207-template-b',
  'map208-toc-box',
  'map209-user-position',
  'map211-add-map',
  'map215-mobile-footer',
  'map217-dialog',
  'map226-dialog-template',
  'map227-dialog-body',
  'map235-dialog-body-support',
  'map225-user-meta',
  'map239-fill_labels',
  'map238-geovar_lyr_table_schema',
  'tmp_meta',
  'tmp_access',
  'map232-basemaps',
  'map224-button',
  'map213-sidebar-footer',
  'map214-sidebar-footer-b',
  'map219-js-style',
  'map229-marker-cluster-custom',
  'map242-lyr',
  'map244-add-part'
];

foreach ($itemMap['js_loader_list_map_lyr'] as $key => $value) {
  $js_loader_list[]=$value;
}

//js_loader_list_after
$t =[
  'map220-gr-lyr-after',
  'map228-lyr-on-click-generic',
  'map216-toc',
  'addon201-template',
  'map221-extra',
  'map230-map-click',
  'map236-template-mobile',
  'map240-map-scale'
];

foreach ($t as $key => $value) {
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
