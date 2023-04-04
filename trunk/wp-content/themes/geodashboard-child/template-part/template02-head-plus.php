<title><?php echo $g_map_title;?></title>

<link rel="canonical" href="<?php echo $CANONICAL;?>">

<?php 
//echo ">> SEO?";
//print_r($itemMap['g_seo']);
if(empty($itemMap['g_seo'])){
  //echo "<!--No SEO-->";
}
else{
  //echo "<!--SEO-->";
?>

  <!--template_style-->
  <meta name="description" 
    content="<?php echo $itemMap['g_attributes']->description;?>" />
  <meta property="article:publisher" 
    content="<?php echo $g_PUBLISHER;?>" />
  <meta property="article:modified_time" 
    content="<?php echo $itemMap['post_modified'];?>" />

  <meta property="og:locale" content="en_GB" />
  <meta property="og:locale:alternate" content="it_IT" />

  <meta property="og:type" content="website" />
  <meta property="og:title" 
    content="<?php echo $g_map_title;?>" />
  <meta property="og:description" 
    content="<?php echo $itemMap['g_attributes']->description;?>" />
  <meta property="og:url" 
    content="<?php echo $CANONICAL;?>" />
  <meta property="og:site_name" 
    content="<?php echo ERP_CORP_NAME;?>" />
  <meta property="og:image" 
    content="<?php echo $g_DFL_IMAGE_MAIN;?>" />
  <meta property="og:image:width" content="840" />
  <meta property="og:image:height" content="560" />

  <!--TWITTER-->
  <meta name="twitter:card" 
    content="summary_large_image" />
  <meta name="twitter:site" 
    content="<?php echo $g_TWITTER_SITE;?>" />
  <meta name="twitter:creator" 
    content="<?php echo $g_TWITTER_CREATOR;?>">
  <meta name="twitter:title" 
    content="<?php echo $g_map_title;?>" />
  <meta name="twitter:description" 
    content="<?php echo $itemMap['g_attributes']->description;?>" />
  <meta name="twitter:image" 
    content="<?php echo $g_DFL_IMAGE_MAIN;?>">

  <!--https://developers.google.com/search/docs/data-types/breadcrumb-->
<?php

  if($CANONICAL==$g_HOME_PROJECT){
    include(ABSPATH.THEME_PATH.'/template-part/headers/rich_snippets_BreadcrumbList_home.php');
  }
  else{
    include(ABSPATH.THEME_PATH.'/template-part/headers/rich_snippets_BreadcrumbList.php');
  }
  include(ABSPATH.THEME_PATH.'/template-part/headers/rich_snippets_Article.php');
  include(ABSPATH.THEME_PATH.'/template-part/headers/rich_snippets_yoast-schema-graph.php');
}
?>
