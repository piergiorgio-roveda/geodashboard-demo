<?php
/**
* The template for displaying the footer
*
* Contains the opening of the #site-footer div and all content after.
*
* @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
*
* @package WordPress
* @subpackage Twenty_Twenty
* @since 1.0.0
*/

?>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

<script>

  // A $( document ).ready() block.
  $( document ).ready(function() {
    console.log( "ready!" );

    var block_tmp = $('.bmc-btn-container').html()

    $('.new-ads-col1').append(block_tmp);
    $('.bmc-btn-container').remove();
    //$('.bmc-btn').addClass('yt-promo4')
    $('.entry-header > .entry-header-inner').append(''
    +'');
        
    $('body').append(''
    +'');

    if($('.foot-promo').hasClass('slide-up')) {
      $('.foot-promo').addClass('slide-down', 5000, 'easeOutBounce');
      $('.foot-promo').removeClass('slide-up'); 
    }
    else {
      $('.foot-promo').removeClass('slide-down');
      $('.foot-promo').addClass('slide-up', 5000, 'easeOutBounce'); 
    }	

    $('.yt-promo').on('click',function(){
      console.log('Track yt-promo click WITH tag manager!');
      log_tag_manager(
        $(this).attr('name'),//GA - log_tag_manager - action
        '',//GA - log_tag_manager - label
        '' //GA - log_tag_manager - value (optional)
      );
    });

    $('.yt-promo2').on('click',function(){
      console.log('Track yt-promo2 click WITH tag manager!');
      log_tag_manager(
        $(this).attr('tag_description'),//$(this).attr('name'),//GA - log_tag_manager - action
        '',//GA - log_tag_manager - label
        '' //GA - log_tag_manager - value (optional)
      );
      window.open("https://m.do.co/c/68428e7f2b34", "_blank");
    });

    $('.yt-promo3').on('click',function(){
      console.log($(this).attr('tag_description'));
      log_tag_manager(
        $(this).attr('tag_description'),//$(this).attr('name'),//GA - log_tag_manager - action
        '',//GA - log_tag_manager - label
        '' //GA - log_tag_manager - value (optional)
      );
    });

    $('.yt-promo4').on('click',function(){
      console.log('Track yt-promo4 click WITH tag manager!');
      log_tag_manager(
        $(this).attr('tag_description'),//$(this).attr('name'),//GA - log_tag_manager - action
        '',//GA - log_tag_manager - label
        '' //GA - log_tag_manager - value (optional)
      );
    });    

    $('.close_promo').on('click',function(){
      $('.foot-promo').remove()			
    });

    setInterval(
      function() {
        if($('#home2020-form-email').val().length>2){
          if($('#home2020-form-msg').val().length>2){
            $('.btn_message_send').attr("disabled", false);
            $('.btn_message_send').removeClass('btn_disabled');
          }
          else{
            $('.btn_message_send').attr("disabled", true);
          }
        }
        else{
          $('.btn_message_send').attr("disabled", true);
        }
      },      
      500
    );

    $('.btn_message_send').on('click',function(){
      console.log('> btn_message_send');
      var input_msg = $('#home2020-form-msg').val();
      var input_email = $('#home2020-form-email').val();
      log_tag_manager(
        'btn_message_send',//GA - log_tag_manager - action
        input_email,//GA - log_tag_manager - label
        '' //GA - log_tag_manager - value (optional)
      );      
      dataString = {
        action : 'send_msg_home2020',
        msg:input_msg,
        email:input_email
      };
      $.ajax({
        type: "POST",
        url: 'https://www.cityplanner.biz/api/generic-function/',
        data: dataString,
        cache: false,
        success: function(response){
          //console.log(response.email_send);
          $('#home2020-form-email').val('');
          $('#home2020-form-msg').val('');
          $('.wp-block-button-send').html('<span style="color:black;">Thank you, message sent!</span>')
        }//success
      });

    });

  });


  function log_tag_manager(myFunction='none',myDefinition='none',myValue=''){

    slugAPI = 'watchdog-data';
    baseUrl = 'https://www.cityplanner.biz/api/';


    var dataString = {
      action : 'watchdog-tagmanager',
      mytrackid:'UA-****-1',//GA - log_tag_manager - Tracking ID
      event: 'log_tag_manager',
      myEnvironment:'production',
      myFunction:myFunction,//GA - log_tag_manager - action
      myUser:'pjh',//GA - log_tag_manager - category
      myDefinition:myDefinition,//GA - log_tag_manager - label
      myValue:myValue //GA - log_tag_manager - value (optional)
    };
    
    $.ajax({
      type: "POST",
      url: baseUrl+slugAPI+'/',   
      data:dataString,
      tryCount : 0,
      retryLimit : 3,
      dataType: 'json',
      async:    true,
      cache:    false,
      error : function(xhr, textStatus, errorThrown ) {
        on_ajax_error(this);
      },
      success: function(response){

        console.log('watchdog-tagmanager:success!');

        dataLayer.push({
          mytrackid:'UA-****-1',//GA - log_tag_manager - Tracking ID
          event: 'log_tag_manager',
          myEnvironment:'production',
          myFunction:myFunction,//GA - log_tag_manager - action
          myUser:'pjh',//GA - log_tag_manager - category
          myDefinition:myDefinition,//GA - log_tag_manager - label
          myValue:myValue //GA - log_tag_manager - value (optional)
        });

        return
        //return response;
      }//success
    }); //ajax


  }

</script>
			<?php
			if ( ! is_page_template( array( 'templates/template-canvas.php' ) ) ) {
			?>
			<footer id="site-footer" role="contentinfo" class="header-footer-group">

				<div class="section-inner">

					<div class="footer-credits">

						<p class="footer-copyright">&copy;
							<?php
							echo date_i18n(
								/* translators: Copyright date format, see https://secure.php.net/date */
								_x( 'Y', 'copyright date format', 'twentytwenty' )
							);
							?>
							<a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php echo bloginfo( 'name' ); ?></a>
						</p><!-- .footer-copyright -->

						<p class="powered-by-wordpress">
							<a href="<?php echo esc_url( __( 'https://wordpress.org/', 'twentytwenty' ) ); ?>">
								<?php _e( 'Powered by WordPress', 'twentytwenty' ); ?>
							</a>
						</p><!-- .powered-by-wordpress -->

					</div><!-- .footer-credits -->

					<a class="to-the-top" href="#site-header">
						<span class="to-the-top-long">
							<?php
							/* translators: %s: HTML character for up arrow */
							printf( __( 'To the top %s', 'twentytwenty' ), '<span class="arrow" aria-hidden="true">&uarr;</span>' );
							?>
						</span><!-- .to-the-top-long -->
						<span class="to-the-top-short">
							<?php
							/* translators: %s: HTML character for up arrow */
							printf( __( 'Up %s', 'twentytwenty' ), '<span class="arrow" aria-hidden="true">&uarr;</span>' );
							?>
						</span><!-- .to-the-top-short -->
					</a><!-- .to-the-top -->

				</div><!-- .section-inner -->

			</footer><!-- #site-footer -->
			<?php } ?>


		<?php wp_footer(); ?>

	</body>
</html>
