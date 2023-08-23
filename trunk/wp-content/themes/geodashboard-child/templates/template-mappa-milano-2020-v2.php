<?php
/**
 * Template Name:mappa-milano-2020-v2
 * Template Post Type: post, page
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since Twenty Twenty 1.0
 */

  $o=array();
  //determinate language
  $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
  if($lang=='it'){
    $site_lang='it-IT';
  }
  else{
    $site_lang='en';
  }

  //It's possibile to load default page mappa-milano-2020/
  //or custom page with mappa-milano-2020/custom-page/ as variable
  if(!empty(get_query_var( 'mypage' ))){

    //get var slug
    $mypage=get_query_var( 'mypage' );
    $o['myname']=$mypage;
    
    //search if slug have meta
    //define $m as meta from meta-page
    if (file_exists(locate_template( array( 'meta/'.$post->post_name.'/'.$mypage.'.php' )))) {
      include(locate_template( array( 'meta/'.$post->post_name.'/'.$mypage.'.php' )));
    }
    else{
      //include(locate_template( array( 'meta/autopage.php' )));
      include(locate_template( array( 'meta/'.$post->post_name.'/aaa_page.php' )));
    }
    //if define in sitemap get info,
    //else get default
    if(watchdog_pages_webapp($o['myname'])){
      $page_meta1=watchdog_pages_webapp($o['myname']);
    }
    else{
      $page_meta1=watchdog_pages_webapp($post->post_name);
    }
    
    //$slug=$mypage;
  }
  else{
    //define $m as meta from meta-page
    include(locate_template( array( 'meta/'.$post->post_name.'/aaa_page.php' )));
    //$slug=$post->post_name;
    $o['myname'] = 'milano';
    $page_meta1=watchdog_pages_webapp($post->post_name); 
  }

  //mappamilano
  

  //$o=default_meta($o);
  //$o['myname'] = 'all';
  $o['focus']['word']='';
  $o['focus']['title']=$page_meta1['title'];
  $o['focus']['short-description']=$m['description'];
  $o['focus']['permalink']=$page_meta1['canonical'];
  $o['focus']['image']=$page_meta1['image'];
  $o['focus']['content']=$m['contents'];

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
    <link rel="apple-touch-icon" href="<?php echo HOME_PROJECT.'source/';?>img/business_2021/apple-touch-icon.png" sizes="180x180">
    <link rel="icon" href="<?php echo HOME_PROJECT.'source/';?>img/business_2021/favicon-32x32.png" sizes="32x32" type="image/png">
    <link rel="icon" href="<?php echo HOME_PROJECT.'source/';?>img/business_2021/favicon-16x16.png" sizes="16x16" type="image/png">
    <link rel="manifest" href="<?php echo HOME_PROJECT.'source/';?>bootstrap/5.0/manifest.json">
    <link rel="mask-icon" href="<?php echo HOME_PROJECT.'source/';?>img/business_2021/safari-pinned-tab.svg" color="#7952b3">
    <link rel="icon" href="<?php echo HOME_PROJECT.'source/';?>img/business_2021/favicon.ico">
    <meta name="theme-color" content="#7952b3">

    <?php
    //Style base style (deprecated)
    if($m['template_style']){
      foreach ($m['template_style'] as $style) {
        # code...
        include(locate_template( array( 'template-parts/head-'.$style.'.php' ))); 
      }
    }
    else{
      include(locate_template( array( 'template-parts/head-default.php' ))); 
    }
    ?>

    <?php
    include(locate_template( array( 'template-parts/head-yoast.php' ))); 
    ?>

    <?php 
    //Full style and script head
    if(count($m['custom_head'])>0){
      foreach ($m['custom_head'] as $value) {
        # code...
        include(locate_template( array( 'head/'.$value.'.php' )));
      }
    }            
    ?>
  </head>
  <body>

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
