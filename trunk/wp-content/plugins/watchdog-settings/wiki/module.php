<?php

add_action( 'init', 'wiki_add_rules' );
function wiki_add_rules(){

  add_rewrite_rule(
    '^wiki/([^/]*)/?',
    'index.php?pagename=wiki&mypage=$matches[1]',
    'top'
  );

  add_rewrite_tag('%mypage%','([^&]+)');
  //add_rewrite_tag('%mytoken%','([^&]+)');

  flush_rewrite_rules();

}