<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <!-- created with Free Online Sitemap Generator www.xml-sitemaps.com -->
<?php

foreach ($page_meta1 as $key => $value){

  foreach ($value as $k => $v){
    //print_r($k);
    //print_r($v);
    $title = $v['title'];
    $image = $v['image'];
    $canonical = $v['canonical'];
    $modified = $v['modified'];

    /*echo "
      <url>
          <loc>" . $canonical . "</loc>
          <lastmod>" . $modified . "</lastmod>
          <image:image>
            <image:loc>" . $image . "</image:loc>
            <image:title><![CDATA[" . $title . "]]></image:title>
          </image:image>    
      </url>   
    ";   */ 

    if($v['parent']=='blog-cityplanner'){
      if(count($v['tags'])>0){
        echo "
        <url>
            <loc>" . $canonical . "</loc>
            <lastmod>" . $modified . "</lastmod>  
        </url>   
        ";
      }
    }
    else{
      echo "
      <url>
          <loc>" . $canonical . "</loc>
          <lastmod>" . $modified . "</lastmod>  
      </url>   
      ";
    }
  
  }

}
?>
</urlset>
