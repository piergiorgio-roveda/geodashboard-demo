<?php
function admin_default_page() {
  return '/';
}

add_filter('login_redirect', 'admin_default_page');

function get_custom_template_part($slug){

	global $post;
  $postid = $post->ID;

  $page_template=get_pages_template($postid);

  $value=$page_template[$slug];   


  if (locate_template( array( '/'.$value . '.php' ) ) != '') {
    $slug_part = '/'.$value;
  }
  else {
    echo "Template file ".$value." not found.";
    exit;
  }

  return $slug_part;

}

