<?php

$g_DOMAIN_PROJECT = '//'.$_SERVER['SERVER_NAME'];
$g_HOME_PROJECT = get_site_url();
$g_SOURCE_PATH = '//'.$_SERVER['SERVER_NAME'].'/source/';
$g_THEME_PROJECT = get_stylesheet_directory_uri();

if(!empty($itemMap['g_attributes']->map_title)){
  $g_map_title=$itemMap['g_attributes']->map_title;
}
else{
  $g_map_title=MAP_TITLE;
}

if(!empty($itemMap['g_attributes']->geoserver_workspace)){
  $g_WORKSPACE=$itemMap['g_attributes']->geoserver_workspace;
}
else{
  $g_WORKSPACE=GEOSERVER_WORKSPACE;
}

if(!empty($itemMap['g_attributes']->geoserver_url)){
  $g_GEOSERVER_URL=$itemMap['g_attributes']->geoserver_url;
}
else{
  $g_GEOSERVER_URL=GEOSERVER_URL;
}

$var=DFL_LOGO_OWNER_BASE;
if(!empty($itemMap['g_attributes']->df_logo_owner)){
  $var=$itemMap['g_attributes']->df_logo_owner;
}
$g_DFL_LOGO_OWNER_BASE = $var;
$g_DFL_LOGO_OWNER = imgurl_full_or_relative($var,$g_THEME_PROJECT);


$var=DFL_LOGO_LOGIN_BASE;
if(!empty($itemMap['g_attributes']->df_logo_login)){
  $var=$itemMap['g_attributes']->df_logo_login;
}
$g_DFL_LOGO_LOGIN_BASE = $var;
$g_DFL_LOGO_LOGIN = imgurl_full_or_relative($var,$g_THEME_PROJECT);

$var=DFL_LABEL_MAIN_LOGO_BASE;
if(!empty($itemMap['g_attributes']->label_main_logo)){
  $var=$itemMap['g_attributes']->label_main_logo;
}
$g_DFL_LABEL_MAIN_LOGO_BASE = $var;
$g_DFL_LABEL_MAIN_LOGO = imgurl_full_or_relative($var,$g_THEME_PROJECT);

$var=FAVICON_APPLE_BASE;
if(!empty($itemMap['g_attributes']->apple_touch_icon)){
  $var=$itemMap['g_attributes']->apple_touch_icon;
}
$g_FAVICON_APPLE_BASE = $var;
$g_FAVICON_APPLE = imgurl_full_or_relative($var,$g_THEME_PROJECT);

$var=FAVICON_BASE;
if(!empty($itemMap['g_attributes']->favicon)){
  $var=$itemMap['g_attributes']->favicon;
}
$g_FAVICON_BASE = $var;
$g_FAVICON = imgurl_full_or_relative($var,$g_THEME_PROJECT);

$var=FAVICON32_BASE;
if(!empty($itemMap['g_attributes']->favicon32)){
  $var=$itemMap['g_attributes']->favicon32;
}
$g_FAVICON32_BASE = $var;
$g_FAVICON32 = imgurl_full_or_relative($var,$g_THEME_PROJECT);

$var=FAVICON16_BASE;
if(!empty($itemMap['g_attributes']->favicon16)){
  $var=$itemMap['g_attributes']->favicon16;
}
$g_FAVICON16_BASE = $var;
$g_FAVICON16 = imgurl_full_or_relative($var,$g_THEME_PROJECT);

$var=ERP_OWNER;
if(!empty($itemMap['g_attributes']->erp_owner)){
  $var=$itemMap['g_attributes']->erp_owner;
}
$g_ERP_OWNER = $var;

$var=ERP_OWNER_GEOINFO_AZIENDA;
if(!empty($itemMap['g_attributes']->erp_owner_geoinfo_azienda)){
  $var=$itemMap['g_attributes']->erp_owner_geoinfo_azienda;
}
$g_ERP_OWNER_GEOINFO_AZIENDA = $var;

$var=CLIENT_DOC_CREDIT;
if(!empty($itemMap['g_attributes']->client_doc_credit)){
  $var=$itemMap['g_attributes']->client_doc_credit;
}
$g_CLIENT_DOC_CREDIT = $var;

$var=ERP_CLIENT_SLUG;
if(!empty($itemMap['g_attributes']->erp_client_slug)){
  $var=$itemMap['g_attributes']->erp_client_slug;
}
$g_ERP_CLIENT_SLUG = $var;


$var=ERP_CLIENT;
if(!empty($itemMap['g_attributes']->erp_client)){
  $var=$itemMap['g_attributes']->erp_client;
}
$g_ERP_CLIENT = $var;

$var=ERP_CORP_NAME;
if(!empty($itemMap['g_attributes']->erp_client)){
  $var=$itemMap['g_attributes']->erp_client;
}
$g_ERP_CORP_NAME = $var;

$var=ERP_CORP_ESTABLISHED;
if(!empty($itemMap['g_attributes']->erp_client)){
  $var=$itemMap['g_attributes']->erp_client;
}
$g_ERP_CORP_ESTABLISHED = $var;

$var=ERP_CORP_STATUS;
if(!empty($itemMap['g_attributes']->erp_client)){
  $var=$itemMap['g_attributes']->erp_client;
}
$g_RP_CORP_STATUS = $var;

$var=ERP_CORP_HQ;
if(!empty($itemMap['g_attributes']->erp_client)){
  $var=$itemMap['g_attributes']->erp_client;
}
$g_ERP_CORP_HQ = $var;

$var=ERP_CORP_FOUNDER;
if(!empty($itemMap['g_attributes']->erp_client)){
  $var=$itemMap['g_attributes']->erp_client;
}
$g_ERP_CORP_FOUNDER = $var;

$var=ERP_CORP_FOUNDER_SLUG;
if(!empty($itemMap['g_attributes']->erp_client)){
  $var=$itemMap['g_attributes']->erp_client;
}
$g_ERP_CORP_FOUNDER_SLUG = $var;

$var=ERP_CORP_LEADER;
if(!empty($itemMap['g_attributes']->erp_client)){
  $var=$itemMap['g_attributes']->erp_client;
}
$g_ERP_CORP_LEADER = $var;

//$g_DFL_MAP_ICON = get_stylesheet_directory_uri() ."/img/".$g_ERP_CLIENT_SLUG."-default-map-icon.svg?ver=".APP_VERSION;

$var=DFL_MAP_ICON;
if(!empty($itemMap['g_attributes']->map_icon)){
  $var=$itemMap['g_attributes']->map_icon;
}
$g_DFL_MAP_ICON = $g_THEME_PROJECT ."/img/".$var."?ver=".APP_VERSION;

$var=LANGUAGE;
if(!empty($itemMap['g_attributes']->language)){
  if($itemMap['g_attributes']->language!='DFL_LANG'){
    $var=$itemMap['g_attributes']->language;
  }
}
$g_LANGUAGE = $var;

$var=DFL_IMAGE_MAIN;
if(!empty($itemMap['g_attributes']->image_main)){
  if($itemMap['g_attributes']->image_main!='DFL_IMAGE_MAIN'){
    $var=$itemMap['g_attributes']->image_main;
  }  
}
$g_DFL_IMAGE_MAIN = imgurl_full_or_relative($var,$g_THEME_PROJECT);
//$g_DFL_IMAGE_MAIN = $g_THEME_PROJECT ."/img/".$var."?ver=".APP_VERSION;

$var=DFL_IMAGE_THUMB;
if(!empty($itemMap['g_attributes']->image_thumb)){
  if($itemMap['g_attributes']->image_thumb!='DFL_IMAGE_THUMB'){
    $var=$itemMap['g_attributes']->image_thumb;
  }  
}
$g_DFL_IMAGE_THUMB = imgurl_full_or_relative($var,$g_THEME_PROJECT);

$var=DFL_IMAGE_BANNER;
if(!empty($itemMap['g_attributes']->image_banner)){
  if($itemMap['g_attributes']->image_banner!='DFL_IMAGE_BANNER'){
    $var=$itemMap['g_attributes']->image_banner;
  }  
}
$g_DFL_IMAGE_BANNER = imgurl_full_or_relative($var,$g_THEME_PROJECT);;

$var=PUBLISHER;
if(!empty($itemMap['g_attributes']->publisher)){
  if($itemMap['g_attributes']->publisher!='DFL_PUBLISHER'){
    $var=$itemMap['g_attributes']->publisher;
  }
}
$g_PUBLISHER = $var;

$var=TWITTER_SITE;
if(!empty($itemMap['g_attributes']->twitter_site)){
  if($itemMap['g_attributes']->twitter_site!='TWITTER_SITE'){
    $var=$itemMap['g_attributes']->twitter_site;
  }
}
$g_TWITTER_SITE = $var;

$var=TWITTER_CREATOR;
if(!empty($itemMap['g_attributes']->twitter_creator)){
  if($itemMap['g_attributes']->twitter_creator!='TWITTER_CREATOR'){
    $var=$itemMap['g_attributes']->twitter_creator;
  }
}
$g_TWITTER_CREATOR = $var;

function imgurl_full_or_relative($var,$g_THEME_PROJECT){
  if(substr($var, 0, 4)=='http'
    || substr($var, 0, 2)=='//'){
    return $var."?ver=".APP_VERSION;
  }
  else{
    return $g_THEME_PROJECT ."/img/".$var."?ver=".APP_VERSION;
  }
}