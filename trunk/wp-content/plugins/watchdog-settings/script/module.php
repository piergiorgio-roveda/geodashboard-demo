<?php

add_action( 'init', 'map_add_rules_script' );
function map_add_rules_script(){

  add_rewrite_rule(
    '^script/([^/]*)/?',
    'index.php?pagename=script&mypage=$matches[1]',
    'top'
  );

  add_rewrite_tag('%mypage%','([^&]+)');
  //add_rewrite_tag('%mytoken%','([^&]+)');

  flush_rewrite_rules();

}