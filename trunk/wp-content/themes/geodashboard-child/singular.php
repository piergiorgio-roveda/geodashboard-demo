<?php
/**
* The template for displaying single posts and pages.
*
* @link https://developer.wordpress.org/themes/basics/template-hierarchy/
*
* @package WordPress
* @subpackage Twenty_Twenty
* @since Twenty Twenty 1.0
*/
/*
if(get_post_field( 'post_name', get_post() )=='mappa-milano-2020'){
  get_template_part( 'template-parts/page-map-milan-2020');
  exit;
}
*/

if(get_post_type()=='api'){
  $post_slug = get_post_field( 'post_name', get_post() );
  get_template_part( 'template-parts/api-'.$post_slug);
}
else{
  get_header();
  ?>
	
  <main id="site-content" role="main">
	
  <?php

  if ( have_posts() ) {
    while ( have_posts() ) {
      the_post();
      get_template_part( 'template-parts/content', get_post_type() );
	  }
  }
	
  ?>
	
  </main><!-- #site-content -->
	
  <?php get_template_part( 'template-parts/footer-menus-widgets' ); ?>
	
  <?php get_footer(); ?>
  <?php
}


