<?php

$js_loader_list=[
  'map201-general-map',
  //'map202-base',
  //'map203-google-initialize',
  //'map204-search-cointaner',
  'map205-template',
  //'map206-general',
  'map207-template-b',
  'map208-toc-box',
  'map209-user-position',
  //'map211-add-map',
  'map215-mobile-footer',
  'map217-dialog',
  'map226-dialog-template',
  'map227-dialog-body',
  'map235-dialog-body-support',
  //'map218-api',
  'map225-user-meta',
  'map239-fill_labels',
  //'map238-geovar_lyr_table_schema',
  //'map223-geovar-loader',
  'tmp_meta',
  'tmp_access',
  //'map232-basemaps',
  'map224-button',
  'map213-sidebar-footer',
  'map214-sidebar-footer-b',
  'map219-js-style',
  //'map229-marker-cluster-custom',
  //'map242-lyr'
  //'map_lyr_test001a',
  'map244-add-part'
];

foreach ($js_loader_list as $key => $value) {
  $url=get_stylesheet_directory_uri().'/src/js/'.$value.'.js?ver='.APP_VERSION;
  ?>
  <script src='<?php echo $url;?>'></script>
  <?php
}

?>

<script src='<?php echo get_stylesheet_directory_uri();?>/src/js/map231-js-loader.js?ver=<?php echo APP_VERSION;?>'></script>
