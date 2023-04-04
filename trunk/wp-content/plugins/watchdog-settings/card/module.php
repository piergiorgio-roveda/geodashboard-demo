<?php

add_action( 'init', 'card_add_rules' );
function card_add_rules(){

  add_rewrite_rule(
    '^card/([^/]*)/?',
    'index.php?pagename=card&mypage=$matches[1]',
    'top'
  );

  add_rewrite_tag('%mypage%','([^&]+)');
  //add_rewrite_tag('%mytoken%','([^&]+)');

  flush_rewrite_rules();

}