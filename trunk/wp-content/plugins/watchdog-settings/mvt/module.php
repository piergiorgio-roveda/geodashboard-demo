<?php

add_action( 'init', 'map_add_rules_mvt' );
function map_add_rules_mvt(){

  //RewriteRule ^tiles/([0-9]+)/([0-9]+)/([0-9]+)\.mvt$ /tiles.php?z=$1&x=$2&y=$3
  add_rewrite_rule(
    // '^mvt/([^/]*)/?',
    '^mvt/([^/]*)/([^/]*)/([^/]*)/?',
    // 'index.php?pagename=mvt&mvt_z=$matches[1]',
    // 'index.php?my_custom_tiles_handler=1&z=$matches[1]&x=$matches[2]&y=$matches[3]',
    'index.php?pagename=mvt&mvt_z=$matches[1]&mvt_x=$matches[2]&mvt_y=$matches[3]',
    'top'
  );

  // add_rewrite_tag( '%my_custom_tiles_handler%', '1' );

  // add_rewrite_tag('%mypage%','([^&]+)');
  add_rewrite_tag('%mvt_z%','([^&]+)');
  add_rewrite_tag('%mvt_x%','([^&]+)');
  add_rewrite_tag('%mvt_y%','([^&]+)');

  flush_rewrite_rules();

}