<?php

add_action( 'init', 'postman_add_rules' );
function postman_add_rules(){

  add_rewrite_rule(
    '^postman/([^/]*)/([^/]*)/?',
    'index.php?pagename=postman&myaction=$matches[1]&myname=$matches[2]',
    'top'
  );

  add_rewrite_tag('%myaction%','([^&]+)');
  add_rewrite_tag('%myname%','([^&]+)');

  flush_rewrite_rules();

}