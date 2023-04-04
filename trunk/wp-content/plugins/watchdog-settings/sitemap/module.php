<?php

add_action( 'init', 'sitemap_add_rules' );
function sitemap_add_rules(){

  add_rewrite_rule(
    '^sitemap/([^/]*)/?',
    'index.php?pagename=sitemap&mypage=$matches[1]',
    'top'
  );

  add_rewrite_tag('%mypage%','([^&]+)');
  //add_rewrite_tag('%mytoken%','([^&]+)');

  flush_rewrite_rules();

}