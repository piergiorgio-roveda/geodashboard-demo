<?php

add_action( 'init', 'map_add_rules' );
function map_add_rules(){

  add_rewrite_rule(
    '^map/([^/]*)/?',
    'index.php?pagename=map&mypage=$matches[1]',
    'top'
  );

  add_rewrite_tag('%mypage%','([^&]+)');
  //add_rewrite_tag('%mytoken%','([^&]+)');

  flush_rewrite_rules();

}