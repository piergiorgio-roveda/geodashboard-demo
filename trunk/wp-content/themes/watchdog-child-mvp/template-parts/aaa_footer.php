<?php

?>
<footer class="blog-footer s01-bg-primary">
  <?php 
  //get_template_part( 'template-parts/aaa_footer' ); 
  include(locate_template( array( 'template-parts/aaa_footer_social.php' )));
  ?>
  <div class="">
    <div class="s01-txt-on-primary">© 2021 Piergiorgio Roveda</div>
    <div>
      <a class="s01-txt-on-primary" href="https://www.cityplanner.biz/privacy-policy/">Privacy Policy</a>
    </div>
    <!--<div class="copyright-element py-2 py-md-0 mr-3 mx-lg-0 mr-lg-6 mb-md-0"><a href="#" class="text-white">Imprint</a></div>-->
  </div>
  <div class="mobile-menu d-md-none">
    <div class="nav-scroller">
      <nav class="nav d-flex justify-content-between">
        <a class="p-2 link-secondary" 
          style="margin-top: 5px;font-weight: 900;" 
          href="#"><span class="p-2 link-secondary">
          Solutions</span></a>
        <a class="p-2 link-secondary"  href="https://www.cityplanner.biz/business/">
          <i class="fa fa-2x fa-rocket" aria-hidden="true"></i></a>
        <a class="p-2 link-secondary" href="https://www.cityplanner.biz/about">
          <i class="fa fa-2x fa-info-circle" aria-hidden="true"></i></a>
        <a class="p-2 link-secondary" href="https://www.cityplanner.biz/blog-cityplanner/">
          <i class="fa fa-2x fa-newspaper-o" aria-hidden="true"></i></a>
        <a class="p-2 link-secondary" href="https://www.cityplanner.biz/contact">
          <i class="fa fa-2x fa-envelope" aria-hidden="true"></i></a>
      </nav>
    </div>
  </div>  
</footer>
