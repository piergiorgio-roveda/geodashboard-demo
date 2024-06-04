<?php
  
  $o = array();
  $ds = array();
  $ds['collection'] = "ap5_maps__attributes__get";
  $ds['map_slug'] = $_map__slug;
  $o['_hide']['ds'] = $ds;
  $r = $cApp_ViewData->main_view_data($o);
  unset($o, $ds,$r["_hide"],$r["geoQuery"],$r["type"]);

  $_header = $r["features"][0]["properties"];
  $_map__pid = $_header["pid"];
  // $_map__slug = $_header["g_slug"];
  $_map__label = $_header["g_label"];
  $_map__created_at = $_header["created_at"];
  $_map__updated_at = $_header["updated_at"]; // "2024-06-02 12:49:43.979247" >> "2022-01-01T00:00:00Z";
  $_map__version = $_header["version"];
  unset($_header);

  $_map__attr = array();

  foreach ($r["features"] as $key => $value) {
    $_p = $value["properties"];
    $_map__attr[$_p["attr__slug"]] = $_p["attr__label"];
    echo "<!--data-".$_p["attr__slug"].":".$_p["attr__label"]."-->\n";
  }
  unset($r,$_p);

  $currentURL = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
  $project_URL = FLAT_URL__THEME."project/".$_map__slug."/";
  $img_folder_url = FLAT_URL__THEME_CHILD.'img/';
  $_map_title = $_map__label;
  $_map_description = $_map__attr["g_description"];
  // --
  $_map_thumb = $project_URL."assets/images/thumb.png?ver=".APP_VERSION."-".$_map__version;

?>
<!doctype html>
<html lang="en-US">
  <head>
    <!--geojson-layer-in-slot index.php-->
    <meta charset="utf-8">
    <title><?php echo $_map_title;?></title>
    <?php
      $_meta = array(
        array("name"=>"viewport", "content"=>"width=device-width"),
        array("name"=>"apple-mobile-web-app-capable", "content"=>"yes"),
        array("name"=>"apple-mobile-web-app-status-bar-style", "content"=>"black"),
        array("name"=>"google", "content"=>"notranslate"),
        array("name"=>"author", "content"=>ERP_OWNER_GEOINFO_AZIENDA),
        array("name"=>"generator", "content"=>APP_NICKNAME." v".APP_VERSION),
        array("name"=>"msapplication-TileColor", "content"=>MAIN_COLOR),
        array("name"=>"msapplication-config", "content"=>$img_folder_url."browserconfig.xml"),
        array("name"=>"theme-color", "content"=>MAIN_COLOR),
        array("name"=>"description", "content"=>$_map_description),
        array("name"=>"twitter:card", "content"=>"summary_large_image"),
        array("name"=>"twitter:site", "content"=>TWITTER_SITE),
        array("name"=>"twitter:creator", "content"=>TWITTER_CREATOR),
        array("name"=>"twitter:title", "content"=>$_map_title),
        array("name"=>"twitter:description", "content"=>$_map_description),
        array("name"=>"twitter:image", "content"=>$_map_thumb),
      );
      foreach ($_meta as $key => $value) {
        echo '<meta name="'.$value["name"].'" content="'.$value["content"].'">
        ';
      }
      unset($_meta, $key, $value);
    ?>

    <!--TWITTER-->


    <meta property="article:publisher" 
      content="<?php echo PUBLISHER;?>" />
    <meta property="article:modified_time" 
      content="<?php echo $_map__updated_at;?>" />

    <meta property="og:locale" content="en-US" />
    <meta property="og:locale:alternate" content="it_IT" />

    <meta property="og:type" content="website" />
    <meta property="og:title" 
      content="<?php echo $_map_title;?>" />
    <meta property="og:description" 
      content="<?php echo $_map_description;?>" />
    <meta property="og:url" 
      content="<?php echo $currentURL;?>" />
    <meta property="og:site_name" 
      content="<?php echo ERP_CLIENT;?>" />
    <meta property="og:image" 
      content="<?php echo $_map_thumb;?>" />
    <meta property="og:image:width" content="840" />
    <meta property="og:image:height" content="560" />

    <!--https://developers.google.com/search/docs/data-types/breadcrumb-->

    <link rel="apple-touch-icon" sizes="180x180" href="<?php echo $img_folder_url;?>apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="<?php echo $img_folder_url;?>favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="<?php echo $img_folder_url;?>favicon-16x16.png">
    <!--<link rel="manifest" href="<?php echo $img_folder_url;?>site.webmanifest">-->
    <link rel="mask-icon" href="<?php echo $img_folder_url;?>safari-pinned-tab.svg" color="#5bbad5">
    <link rel="shortcut icon" href="<?php echo $img_folder_url;?>favicon.ico">

    <?php
    $url = $project_URL.'manifest.json';
    ?>
    <link rel="manifest" href="<?php echo $url;?>?ver=<?php echo APP_VERSION."-".$_map__version;?>">

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo GA4_MEASUREMENT_ID;?>"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', '<?php echo GA4_MEASUREMENT_ID;?>', {'codename': 'Morpheus'});
    </script>

    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','<?php echo GA4_TAGMANAGER;?>');</script>
    <!-- End Google Tag Manager -->
    <!--BreadcrumbList-->
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        "@id": "<?php echo FLAT_DOMAIN;?>",
        "name": "Cityplanner.biz GIS/GeoBI",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "<?php echo ERP_CORP_NAME;?>",
            "item": "<?php echo FLAT_DOMAIN;?>"
          }
        ]
      }
    </script>
    <!--BreadcrumbList-->
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        "@id": "<?php echo $project_URL;?>",
        "name": "<?php echo $_map_title;?>",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "<?php echo ERP_CORP_NAME;?>",
            "item": "<?php echo FLAT_DOMAIN;?>"
          }, {
            "@type": "ListItem",
            "position": 2,
            "name": "<?php echo $_map_title;?>",
            "item": "<?php echo $project_URL;?>/"
          }
        ]
      }
    </script>
    <!--Article-->
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "Article",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://google.com/article"
        },
        "name": "<?php echo $_map_title;?>",
        "headline": "<?php echo $_map_description;?>",
        "author": {
          "@type": "Person",
          "url": "<?php echo PUBLISHER_URL;?>",
          "name": "<?php echo PUBLISHER;?>"
        },
        "publisher": {
          "@type": "Organization",
          "name": "<?php echo ERP_CORP_NAME;?>",
          "logo": {
            "@type": "ImageObject",
            "url": "https://cityplanner.biz/source/img/geodashboard_2024/android-chrome-192x192.png?ver=6.4.6"
          }
        },
        "datePublished": "<?php echo $_map__created_at;?>",
        "dateModified": "<?php echo $_map__updated_at;?>",
        "image": ["<?php echo $_map_thumb;?>"],
        "articleSection": "Blog",
        "articleBody": "<?php echo $_map_description;?>",
        "url": "<?php echo $project_URL;?>"
      }
    </script>
    <!--https://schema.org/ImageObject-->
    <!--ImageObject-->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "author": "<?php echo PUBLISHER;?>",
        "contentUrl": "<?php echo $_map_thumb;?>",
        "datePublished": "<?php echo $_map__created_at;?>",
        "name": "<?php echo $_map_title;?>",
        "license": "https://creativecommons.org/licenses/by/4.0/legalcode",
        "acquireLicensePage": "https://creativecommons.org/licenses/by/4.0/"
      }
    </script>
    <!--Organization-->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "image": "<?php echo FLAT_DOMAIN;?>source/img/business_2021/background-home-220725.png",
      "url": "<?php echo FLAT_DOMAIN;?>",
      "sameAs": ["https://www.linkedin.com/company/cityplanner/"],
      "logo": "<?php echo FLAT_DOMAIN;?>source/img/business_2021/android-chrome-512x512.png",
      "name": "<?php echo ERP_CORP_NAME;?>",
      "description": "Charting cities, populations, and throughfares in preparation for tomorrow’s solutions.",
      "email": "piergiorgio.roveda@cityplanner.biz"
    }
    </script>
    <!--Dataset-->
    <script type="application/ld+json">
    {
      "@context":"https://schema.org/",
      "@type":"Dataset",
      "name":"Air Pollution API",
      "description":"Air Pollution API provides current, forecast and historical air pollution data for any coordinates on the globe.",
      "url":"http://api.openweathermap.org/data/2.5/air_pollution",
      "sameAs":"https://openweathermap.org/api/air-pollution",
      "keywords":[
         "ATMOSPHERE > Air Quality Index > Сoncentration of CO",
         "ATMOSPHERE > Air Quality Index > Сoncentration of NO",
         "ATMOSPHERE > Air Quality Index > Сoncentration of NO2",
         "ATMOSPHERE > Air Quality Index > Сoncentration of O3",
         "ATMOSPHERE > Air Quality Index > Сoncentration of SO2",
         "ATMOSPHERE > Air Quality Index > Сoncentration of PM2.5",
         "ATMOSPHERE > Air Quality Index > Сoncentration of PM10",
         "ATMOSPHERE > Air Quality Index > Сoncentration of NH3"
      ],
      "license" : "https://openweather.co.uk/storage/app/media/Terms/Openweather_terms_and_conditions_of_sale.pdf",
      "isAccessibleForFree" : true,
      "distribution":[
         {
            "@type":"DataDownload",
            "encodingFormat":"JSON",
            "contentUrl":"http://api.openweathermap.org/data/2.5/air_pollution"
         }
      ],
      "temporalCoverage":"2020-11-27/2050-01-01",
      "spatialCoverage":{
         "@type":"Place",
         "geo":{
            "@type":"GeoShape",
            "box":"-180,-90 180,90"
         }
      }
    }
    </script>

    <?php include FLAT_FOLDER__THEME."project/".$_map__slug."/index_css.php"; ?>
  </head>
  <body>

    <?php include FLAT_FOLDER__THEME."project/".$_map__slug."/index_template.php"; ?>
    <?php include FLAT_FOLDER__THEME."project/".$_map__slug."/index_js_project.php"; ?>
    <?php include FLAT_FOLDER__THEME."project/".$_map__slug."/index_js_libraries.php"; ?>

    <script type="module" src="<?php echo $project_URL;?>js/_script.js?ver=<?php echo APP_VERSION."-".$_map__version;?>"></script>

  </body>
</html>