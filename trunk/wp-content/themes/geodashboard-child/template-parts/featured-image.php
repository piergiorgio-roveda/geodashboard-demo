<?php
/**
 * Displays the featured image
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since Twenty Twenty 1.0
 */

//if ( has_post_thumbnail() && ! post_password_required() ) {

  //$featured_media_inner_classes = '';

	// Make the featured media thinner on archive pages.
	//if ( ! is_singular() ) {
	//	$featured_media_inner_classes .= ' medium';
	//}
	?>
            <script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" 
    data-slug="pjhooker" data-color="#FFDD00" data-emoji="" data-font="Cookie" data-text="Buy me a coffee" 
    data-outline-color="#000000" data-font-color="#000000" data-coffee-color="#ffffff" ></script>  
    
    
    <div style="width:100%;text-align:center; display: flex;" class="new-ads">
      <div class="new-ads-col1 yt-promo4" tag_description="promo-buymeacoffee" style="width:25%;float: left;">
      
      </div>
      <div class="new-ads-col2 yt-promo3" tag_description="promo-redbubble-74629893-gistipster-own-your-map-v2" style="width:50%;">
        <!--Start rollercoin.com code-->
        <a href="https://www.redbubble.com/people/pjhooker/works/74629893-gistipster-own-your-map-v2?asc=u">
          <img src="https://i.imgur.com/5s7cLOb.png" alt="promo" style="display: inline;" />
        </a>
        <!--End rollercoin.com code-->
      </div>
      <div class="new-ads-col3" style="width:25%;float: right;">
        <div class='media-promo'
          style="
            width: 240px;
            /*height: 50%;*/
            /*float: left;*/
            /*position: absolute;*/
            /*left: 0px;*/
            /*top: 0px;*/
            /*background-color: green;*/
            display: inline-grid;
          ">
          <a href="#"><img class="yt-promo2" src="https://i.imgur.com/VEjs9jV.png" tag_description="promo-digitalocean" /></a>
        </div>
      </div>
  
    </div>
    
					
	<figure class="featured-media">

		<div class="featured-media-inner section-inner<?php echo $featured_media_inner_classes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- static output ?>">

			<?php
			//the_post_thumbnail();
      ?>
      <img width="1200" height="675" src="<?php echo get_field('thumbnail');?>" 
        class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="" loading="lazy" 
        srcset="" sizes="(max-width: 1200px) 100vw, 1200px">
      <?php
			$caption = get_the_post_thumbnail_caption();

			if ( $caption ) {
				?>

				<figcaption class="wp-caption-text">
          <?php 
            echo esc_html( $caption ); 
          ?>
        </figcaption>

				<?php
			}
			?>

		</div><!-- .featured-media-inner -->

	</figure><!-- .featured-media -->

	<?php
//}
