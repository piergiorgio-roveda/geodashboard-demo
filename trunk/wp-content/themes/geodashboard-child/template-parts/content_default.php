<?php
/* 
CONTENT TEMPLATE
DEAFAULT
*/
?>

<!--CONTENT TEMPLATE DEAFAULT-->
<div class="container">
  <?php get_template_part( 'template-parts/aaa_header' ); ?>
  <?php get_template_part( 'template-parts/aaa_nav' ); ?> 
</div>
<main class="container">
  <div class="p-4 p-md-5 mb-4 s01-txt-on-primary s01-bg-dark">
    <div class="col-md-6 px-0">
      <h1 class="display-4 fst-italic">
        <?php echo $page_meta1['title'];?>
      </h1>
      <p class="lead my-3">
        <?php echo $m['description'];?>
      </p>
    </div>
  </div>
  <div class="row">
    <div class="col-md-8 blog-main">
      <h3 class="pb-3 mb-4 font-italic border-bottom">
        <?php 

        $parent_meta1_tmp=$parent_meta1;

        $parent_meta1_parent=watchdog_pages_webapp($page_meta1['parent']);
        $parent_meta1=$parent_meta1_tmp;
        ?>
        <a href="<?php echo $parent_meta1_parent['canonical'];?>"><?php echo $parent_meta1_parent['title'];?></a>
      </h3>  
      <div class="blog-post">
        <h2 class="blog-post-title"><?php echo $page_meta1['title'];?></h2>
        <p class="blog-post-meta">
          <?php 
          $orgDate = $page_meta1['published'];
          echo date('F j, Y', strtotime($orgDate));
          ?>
          <a href="https://www.cityplanner.biz/about/">PJ</a>
        </p>
        <article>
          <?php
          if(!empty($m['contents'][0])){
            foreach ($m['contents'] as $value) {
              echo "<section>".$value."</section>";
            }
          }
          else{
          ?>
          <iframe width="100%" height="455" src="https://www.youtube.com/embed/9adTCRF-fNM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <?php
          }
          ?>
        </article>
      </div>
    </div>
    <!-- /.blog-main -->
    <aside class="d-none d-md-block col-md-4 blog-sidebar">
      <div class="p-3 mb-3 bg-light rounded">
        <?php 
        include(locate_template( array( 'template-parts/sidebar_top.php' )));
        ?>
        <?php 
        if(!empty($m['sidebar_template'])){
          include(locate_template( array( 'template-parts/sidebar_'.$m['sidebar_template'].'.php' )));
        }
        else{
          include(locate_template( array( 'template-parts/sidebar_default.php' )));
        }             
        ?>
        <?php 
        include(locate_template( array( 'template-parts/sidebar_referral.php' )));
        ?>        
      </div>
    </aside>
    <!-- /.blog-sidebar -->
  </div>
  <!-- /.row -->
</main>
<?php get_template_part( 'template-parts/aaa_footer' ); ?>
<?php 
if(count($m['custom_script'])>0){

  foreach ($m['custom_script'] as $value) {
    # code...
    include(locate_template( array( 'script/'.$value.'.php' )));
  }
}            
?>