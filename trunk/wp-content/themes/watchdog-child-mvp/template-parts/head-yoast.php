<?php
$title = $page_meta1['title'];
$description = $m['description'];
$image = $page_meta1['image'];
$canonical = $page_meta1['canonical'];
$locale1 = $m['locale1'];
$locale2 = $m['locale2'];
$modified = $page_meta1['modified'];
$published = $page_meta1['published'];

?>

<meta name="description" content="<?php echo $description;?>" />
<meta property="og:locale" content="<?php echo $locale1;?>" />
<meta property="og:locale:alternate" content="<?php echo $locale2;?>" />
<meta property="og:type" content="website" />
<meta property="og:title" content="<?php echo $title;?>" />
<meta property="og:description" content="<?php echo $description;?>" />
<meta property="og:url" content="<?php echo $canonical;?>" />
<meta property="og:site_name" content="Cityplanner" />
<meta property="article:publisher" content="https://www.facebook.com/piergiorgio.roveda.5011/" />
<meta property="article:modified_time" content="<?php echo $modified;?>" />
<meta property="og:image" content="<?php echo $image;?>" />
<meta property="og:image:width" content="840" />
<meta property="og:image:height" content="560" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@pj_go_2020" />
<meta name="twitter:label1" content="Tempo di lettura stimato">
<meta name="twitter:data1" content="2 minuti">
<meta name="twitter:description" content="<?php echo $description;?>" />
<meta name="twitter:title" content="<?php echo $title;?>" />
<!--https://developers.google.com/search/docs/data-types/article-->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://google.com/article"
    },
    "headline": "<?php echo $title;?>",
    "image": [
      "<?php echo $image;?>"
    ],
    "datePublished": "<?php echo $published;?>",
    "dateModified": "<?php echo $modified;?>",
    "author": {
      "@type": "Person",
      "name": "PJ Hooker"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Cityplanner",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.cityplanner.biz/source/img/business_2021/logo21-cp.png"
      }
    }
  }
</script>
<!--https://developers.google.com/search/docs/data-types/breadcrumb-->
<?php
if(!empty($page_meta1['parent'])){
  $parent_meta1=watchdog_pages_webapp($page_meta1['parent']);
  ?>
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Cityplanner.biz",
        "item": "https://www.cityplannner.biz/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "<?php echo $parent_meta1['title'];?>",
        "item": "<?php echo $parent_meta1['canonical'];?>"
      },{
        "@type": "ListItem",
        "position": 3,
        "name": "<?php echo $title;?>",
        "item": "<?php echo $canonical;?>"
      }]
    }
  </script>    
  <?php
}
else{
  ?>
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Cityplanner.biz",
        "item": "https://www.cityplannner.biz/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "<?php echo $title;?>",
        "item": "<?php echo $canonical;?>"
      }]
    }
  </script>    
  <?php
}
?>

<?php
if(!empty($m['post_type'])){
  if($m['post_type']=='course'){
    ?>
    <!--https://developers.google.com/search/docs/data-types/course-->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "<?php echo $title;?>",
      "description": "<?php echo $description;?>",
      "provider": {
        "@type": "Organization",
        "name": "Cityplanner Academy",
        "sameAs": "https://www.cityplanner.biz/"
      }
    }
    </script>    
    <?php
  }
}
?>

<?php
if(!empty($m['post_type'])){
  if($m['post_type']=='video'){
    ?>
    <!--https://developers.google.com/search/docs/data-types/video-->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": "<?php echo $title;?>",
      "description": "<?php echo $description;?>",
      "thumbnailUrl": [
        "<?php echo $image;?>"
       ],
      "uploadDate": "<?php echo $published;?>",
      "duration": "<?php echo $m['duration'];?>",
      "embedUrl": "<?php echo $m['embedurl'];?>"
    }
    </script>   
    <?php
  }
}
?>
<!--https://schema.org/ImageObject-->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "author": "PJ Hooker",
  "contentUrl": "<?php echo $page_meta1['image'];?>",
  "datePublished": "<?php echo $published;?>",
  "name": "<?php echo $title;?>",
  "license": "https://creativecommons.org/licenses/by/4.0/legalcode",
  "acquireLicensePage": "https://creativecommons.org/licenses/by/4.0/"
}
</script>

<script type="application/ld+json" class="yoast-schema-graph">
   {
     "@context": "https://schema.org",
     "@graph": [
       {
         "@type": [
           "Person",
           "Organization"
         ],
         "@id": "https://www.cityplanner.biz/#/schema/person/71e2fcca93e34e598a24e469ba73b353",
         "name": "pjhooker",
         "image": {
           "@type": "ImageObject",
           "@id": "https://www.cityplanner.biz/#personlogo",
           "inLanguage": "it-IT",
           "url": "https://secure.gravatar.com/avatar/d393b17b9799acc2ea5b8eedaf4bb9e8?s=96&r=g",
           "caption": "pjhooker"
         },
         "logo": {
           "@id": "https://www.cityplanner.biz/#personlogo"
         },
         "description": "Tutti mi chiamano \"uomo del gis\" ... i software così detti GIS (Geographic information system) hanno accompagnato il mio percorso di studi universitario, fin dalle prime elaborazioni, quando mi fecero calcolare la lunghezza di una pista ciclabile e l'area di un bosco ... per un po' di mesi, mi chiedevo perché non mi facevano usare il mio amato AutoCad, visto che lo usavo già da 3-4 anni ... ma poi ho capito la differenza ... e tutto cambiò!",
         "sameAs": [
           "https://www.cityplanner.biz",
           "https://www.facebook.com/piergiorgio.roveda.5011/",
           "https://twitter.com/pj_go_2020"
         ]
       },
       {
         "@type": "WebSite",
         "@id": "https://www.cityplanner.biz/#website",
         "url": "https://www.cityplanner.biz/",
         "name": "Cityplanner",
         "description": "Geospatial revolution",
         "publisher": {
           "@id": "https://www.cityplanner.biz/#/schema/person/71e2fcca93e34e598a24e469ba73b353"
         },
         "inLanguage": "<?php echo $locale1;?>"
       }
     ]
   }
</script>

