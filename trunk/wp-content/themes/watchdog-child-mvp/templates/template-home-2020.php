<?php
/**
 * Template Name:Home 2020
 * Template Post Type: post, page
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since Twenty Twenty 1.0
 */

get_header();
?>

<main id="site-content" role="main" class="home-2020">

	<?php

	if ( have_posts() ) {

		while ( have_posts() ) {
            the_post();
			get_template_part( 'template-parts/content-home-2020');
		}
	}

	?>

</main><!-- #site-content -->

<?php get_template_part( 'template-parts/footer-menus-widgets' ); ?>

<?php get_footer(); ?>