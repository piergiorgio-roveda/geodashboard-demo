<?php
  $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
  if($lang=='it'){
    $m1='Home';
    $m2='Blog';
    $m3='Contatti';
    $m4='La mia storia';
    $m5='Chi sono';
  }
  else{
    $m1='Home';
    $m2='Blog';
    $m3='Contact';
    $m4='Story line';
    $m5='About';
  }
?>
<div class="nav-scroller py-1 mb-2 d-none d-md-block">
  <nav class="nav d-flex justify-content-between">
    <a class="p-2 link-secondary" href="#"><span class="p-2 link-secondary">Solutions</span></a>
    <a class="p-2 link-secondary" href="https://www.cityplanner.biz/business/">Services</a>
    <a class="p-2 link-secondary" href="https://www.cityplanner.biz/about"><?php echo $m5;?></a>
    <a class="p-2 link-secondary" href="https://www.cityplanner.biz/blog-cityplanner/"><?php echo $m2;?></a>
    <a class="p-2 link-secondary" href="https://www.cityplanner.biz/contact"><?php echo $m3;?></a>
    <div>
      <button type="button" class="btn btn-primary btn-login">Login</button>
      <button type="button" class="btn btn-danger btn-try-for-free" href="#">Try for free</button>
    </div>
    <!--<a class="p-2 link-secondary" href="https://www.instagram.com/pjhooker_gis/" target="_blank"><?php //echo $m4;?></a>-->
    
  </nav>
</div> 