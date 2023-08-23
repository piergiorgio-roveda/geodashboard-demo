<?php
/**
 * Template Name:WebSite 2021
 * Template Post Type: post, page
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since Twenty Twenty 1.0
 */

  $o = json_apiInfo();
  $home_project = $o['geoInfo']['home_project'];

  //get_header();
  $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);

  if($post->post_name=='sitemap_v2021'){
    $page_meta1=watchdog_pages_webapp();

    include('/var/www/html/wp-content/themes/watchdog-child/template-parts/body_sitemap_v2021.php' ); 
    exit;
  }

  //include contents and template parts
  if(!empty(get_query_var( 'mypage' ))){
    $mypage=get_query_var( 'mypage' );
    if (file_exists(locate_template( array( 'meta/'.$post->post_name.'/'.$mypage.'.php' )))) {
      include(locate_template( array( 'meta/'.$post->post_name.'/'.$mypage.'.php' )));
    }
    else{
      include(locate_template( array( 'meta/autopage.php' )));
    }
    $slug=$mypage;
  }
  else{
    include(locate_template( array( 'meta/'.$post->post_name.'/aaa_page.php' )));
    $slug=$post->post_name;
  }

  //include meta
  $page_meta1=watchdog_pages_webapp($slug); 

  $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);

  if($lang=='it'){
    $site_lang='it-IT';
  }
  else{
    $site_lang='en';
  }

  /*
  if(!empty($m['template_style'])){
    $template_style=$m['template_style'];
  }
  else{
    $template_style='default';
  }
  */

?>
<!doctype html>
<html lang="<?php echo $site_lang;?>">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Piergiorgio Roveda">
    <meta name="generator" content="Hugo 0.80.0">
    <title><?php echo $page_meta1['title'];?></title>

    <link rel="canonical" href="<?php echo $page_meta1['canonical'];?>">

    <!-- Favicons -->
    <link rel="apple-touch-icon" href="<?php echo $home_project;?>source/img/business_2021/apple-touch-icon.png?ver=<?php echo GEOLIB_VER;?>" sizes="180x180">
    <link rel="icon" href="<?php echo $home_project;?>source/img/business_2021/favicon-32x32.png?ver=<?php echo GEOLIB_VER;?>" sizes="32x32" type="image/png">
    <link rel="icon" href="<?php echo $home_project;?>source/img/business_2021/favicon-16x16.png?ver=<?php echo GEOLIB_VER;?>" sizes="16x16" type="image/png">
    <link rel="mask-icon" href="<?php echo $home_project;?>source/img/business_2021/safari-pinned-tab.svg?ver=<?php echo GEOLIB_VER;?>" color="#7952b3">
    <link rel="icon" href="<?php echo $home_project;?>source/img/business_2021/favicon.ico?ver=<?php echo GEOLIB_VER;?>">

    <link rel="manifest" href="<?php echo site_url();?>/manifest.json?ver=<?php echo GEOLIB_VER;?>">
    <meta name="theme-color" content="#7952b3">

    <!--template_style-->
    <?php
    //include(locate_template( array( 'template-parts/head-'.$template_style.'.php' ))); 
    ?>

    <?php
    include(locate_template( array( 'template-parts/head-yoast.php' ))); 
    ?>

    <?php 
    if($m['custom_head']){
      if(count($m['custom_head'])>0){
        foreach ($m['custom_head'] as $value) {
          # code...
          include(locate_template( array( 'head/'.$value.'.php' )));
        }
      }   
    }
         
    ?>
  </head>
  <body>

    <!--content_template-->
    <?php
    if(!empty($m['content_template'])){
      include(locate_template( array( 'template-parts/content_'.$m['content_template'].'.php' )));
    }
    else{
      include(locate_template( array( 'template-parts/content_default.php' )));
    }     
    ?>


  </body>
</html>
<?php
  //get_footer(); 
?>