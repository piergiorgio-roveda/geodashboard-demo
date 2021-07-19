<?
/* 
CONTENT TEMPLATE
BLOG
*/
?>
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
        List of articles
      </h3>  
      <div class="blog-post">
        <article>
          <?php
          if(!empty($m['contents'][0])){
            foreach ($m['contents'] as $value) {
              echo "<section>".$value."</section>";
            }
          }
          ?>

          <?php
          $string1='';
          $string2='';
          $string3='';
          $string4='';
          $string5='';
          $string99='';
          $sitemap_list=watchdog_pages_webapp();
          foreach ($sitemap_list as $value) {
            foreach ($value as $k=>$v) {
              if($v['parent']==$post->post_name){ //$slug='blog-cityplanner';
                if($v['tags'][0]=='qgis'){
                  $string1.= '<li><a rel="dofollow" href="'.$v['canonical'].'">'.$v['title'].'</a></li>';
                }
                elseif($v['tags'][0]=='story'){
                  $string2.= '<li><a rel="dofollow" href="'.$v['canonical'].'">'.$v['title'].'</a></li>';
                }        
                elseif($v['tags'][0]=='postgres' || $v['tags'][0]=='postgis'){
                  $string3.= '<li><a rel="dofollow" href="'.$v['canonical'].'">'.$v['title'].'</a></li>';
                }   
                elseif($v['tags'][0]=='webgis'){
                  $string4.= '<li><a rel="dofollow" href="'.$v['canonical'].'">'.$v['title'].'</a></li>';
                }     
                elseif($v['tags'][0]=='tutorial' || $v['tags'][0]=='video'){
                  $string5.= '<li><a rel="dofollow" href="'.$v['canonical'].'">'.$v['title'].'</a></li>';
                }                                                    
                else{
                  $string99.= '<li><a rel="nofollow" href="'.$v['canonical'].'">'.$v['title'].'</a></li>';
                }
              }
            }
          }
          ?>
          <section>
            <h2>QGIS</h2>
            <ul><?php echo $string1;?></ul>
            <h2>Stories</h2>
            <ul><?php echo $string2;?></ul>
            <h2>Postgres & PostGIS</h2>
            <ul><?php echo $string3;?></ul>
            <h2>WebGIS</h2>
            <ul><?php echo $string4;?></ul>
            <h2>Tutorial & video</h2>
            <ul><?php echo $string5;?></ul>
            <h2>Other</h2>
            <ul><?php echo $string99;?></ul>
          </section>
        </article>
      </div>
    </div>
    <!-- /.blog-main -->
    <aside class="d-none d-md-block col-md-4 blog-sidebar">
      <div class="p-3 mb-3 bg-light rounded">
        <?php 
        if(!empty($m['sidebar_template'])){
          include(locate_template( array( 'template-parts/sidebar_'.$m['sidebar_template'].'.php' )));
        }
        else{
          include(locate_template( array( 'template-parts/sidebar_default.php' )));
        }             
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