<?php
/**
 * The default template for displaying content
 *
 * Used for both singular and index.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since Twenty Twenty 1.0
 */

	if(get_the_terms( get_the_ID(), 'category' )){
		$categories = get_the_terms( get_the_ID(), 'category' );
		foreach ($categories as $key => $value) {
			if($value->slug=='video'){
				//the post have "ideo" as category
				$yt_link=get_field('myurl');
				if(strlen($yt_link)>0){
					$video_id = explode("?v=", $yt_link);
					$video_id = $video_id[1];
					$thumbnail="https://img.youtube.com/vi/".$video_id."/maxresdefault.jpg";			
					?>
					<script type="application/ld+json">
					{
							"@context": "http://schema.org",
							"@type": "VideoObject",
							"name": "<?php the_title();?>",
							"description":"<?php echo wp_strip_all_tags(get_the_content());?>",
							"thumbnailUrl":"<?php echo $thumbnail;?>",
							"uploadDate":"<?php the_time( 'c' ); ?>"		
					}
					</script>
					<?php
				}
			}
		}
	}


?>

<article <?php post_class(); ?> id="post-<?php the_ID(); ?>" child="true">

	<?php

    get_template_part( 'template-parts/entry-header' );
    
    get_template_part( 'template-parts/part-sendmessage');

	if ( ! is_search() ) {
		get_template_part( 'template-parts/featured-image' );
	}

	?>

	<div class="post-inner <?php echo is_page_template( 'templates/template-full-width.php' ) ? '' : 'thin'; ?> ">

		<div class="entry-content">

			<?php
			if ( is_search() || ! is_singular() && 'summary' === get_theme_mod( 'blog_content', 'full' ) ) {
				the_excerpt();
			} else {
				the_content( __( 'Continue reading', 'twentytwenty' ) );
			}
			?>

		</div><!-- .entry-content -->

	</div><!-- .post-inner -->

	<div class="section-inner">
		<?php
		wp_link_pages(
			array(
				'before'      => '<nav class="post-nav-links bg-light-background" aria-label="' . esc_attr__( 'Page', 'twentytwenty' ) . '"><span class="label">' . __( 'Pages:', 'twentytwenty' ) . '</span>',
				'after'       => '</nav>',
				'link_before' => '<span class="page-number">',
				'link_after'  => '</span>',
			)
		);

		edit_post_link();

		// Single bottom post meta.
		twentytwenty_the_post_meta( get_the_ID(), 'single-bottom' );

		if ( is_single() ) {

			get_template_part( 'template-parts/entry-author-bio' );

		}
		?>

	</div><!-- .section-inner -->

	<?php

	if ( is_single() ) {

		get_template_part( 'template-parts/navigation' );

	}

	/**
	 *  Output comments wrapper if it's a post, or if comments are open,
	 * or if there's a comment number – and check for password.
	 * */
	if ( ( is_single() || is_page() ) && ( comments_open() || get_comments_number() ) && ! post_password_required() ) {
		?>

		<div class="comments-wrapper section-inner">

			<?php comments_template(); ?>

		</div><!-- .comments-wrapper -->

		<?php
	}
	?>

</article><!-- .post -->
