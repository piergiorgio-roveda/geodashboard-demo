<!doctype html>
<html lang="en-US">
  <head>
    <!--geojson-layer-in-slot index.php-->
    <meta charset="utf-8">

    <?php
      $currentURL = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
      $project_URL = FLAT_URL__THEME."project/".$_map__slug."/";
      $img_folder_url = FLAT_URL__THEME_CHILD.'img/';
      $_map_title = "World Historic Castles";
      $_map_description = "The tag historic=castle is used in OpenStreetMap for various kinds of structures, 
      most of which were originally built as fortified residences of a lord or noble.";
      $_map_thumb = $project_URL."assets/images/20240527-18_07_23-ViewEditAddPOI.png?ver=6.5.33.1";
      $_map_modified_at = "2022-01-01T00:00:00Z";
    ?>

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
        array("name"=>"twitter:site", "content"=>"https://x.com/Null_Island_Geo"),
        array("name"=>"twitter:creator", "content"=>"@Null_Island_Geo"),
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
      content="@Null_Island_Geo" />
    <meta property="article:modified_time" 
      content="<?php echo $_map_modified_at;?>" />

    <meta property="og:locale" content="en_GB" />
    <meta property="og:locale:alternate" content="it_IT" />

    <meta property="og:type" content="website" />
    <meta property="og:title" 
      content="<?php echo $_map_title;?>" />
    <meta property="og:description" 
      content="<?php echo $_map_description;?>" />
    <meta property="og:url" 
      content="<?php echo $currentURL;?>" />
    <meta property="og:site_name" 
      content="<?php echo ERP_CORP_NAME;?>" />
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
    <link rel="manifest" href="<?php echo $url;?>?ver=<?php echo APP_VERSION;?>">

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo GA4_MEASUREMENT_ID;?>"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', '<?php echo GA4_MEASUREMENT_ID;?>', {'test_test': 'pippo'});
    </script>

    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','<?php echo GA4_TAGMANAGER;?>');</script>
    <!-- End Google Tag Manager -->

    <?php
      $currentURL = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
      $img_folder_url = FLAT_URL__THEME_CHILD.'img/';
      $_css = array(
        array(
          "rel"=>"stylesheet",
          "name"=>"bootstrap-core-css", 
          "href"=>"https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css", 
          "integrity"=>"sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN",
          "crossorigin"=>"anonymous"
        ),
        array(
          "rel"=>"stylesheet",
          "name"=>"mapbox-v3-css", 
          "href"=>"https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css"
        ),
        array(
          "rel"=>"stylesheet",
          "name"=>"bootstrap-icons@1.11.3", 
          "href"=>"https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        ),
        array(
          "rel"=>"preconnect",
          "name"=>"fonts.googleapis.com", 
          "href"=>"https://fonts.googleapis.com"
        ),
        array(
          "rel"=>"preconnect",
          "name"=>"fonts.gstatic.com", 
          "href"=>"https://fonts.gstatic.com"
        ),
        array(
          "rel"=>"stylesheet",
          "name"=>"project-css", 
          "href"=>$project_URL."css/_style.css"
        ),
      );
      foreach ($_css as $key => $value) {
        $integrity = "";
        if(isset($value["integrity"])){
          $integrity = 'integrity="'.$value["integrity"].'"';
        }
        $crossorigin = "";
        if(isset($value["crossorigin"])){
          $crossorigin = 'crossorigin="'.$value["crossorigin"].'"';
        }
        echo '<link href="'.$value["href"].'" rel="'.$value["rel"].'"  type="text/css" '.$integrity.' '.$crossorigin.'>
        ';
      }
      unset($_css, $key, $value,$integrity,$crossorigin);
    ?>
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
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
    <script type="application/ld+json">
        {
          "@context": "http://schema.org",
          "@type": "BreadcrumbList",
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
          "name": "@Null_Island_Geo"
        },
        "publisher": {
          "@type": "Organization",
          "name": "<?php echo ERP_CORP_NAME;?>",
          "logo": {
            "@type": "ImageObject",
            "url": "https://cityplanner.biz/source/img/geodashboard_2024/android-chrome-192x192.png?ver=6.4.6"
          }
        },
        "datePublished": "<?php echo $_map_modified_at;?>",
        "dateModified": "<?php echo $_map_modified_at;?>",
        "image": ["<?php echo $_map_thumb;?>"],
        "articleSection": "Blog",
        "articleBody": "<?php echo $_map_description;?>",
        "url": null
      }
    </script>
    <!--https://schema.org/ImageObject-->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "author": "@Null_Island_Geo",
        "contentUrl": "<?php echo $_map_thumb;?>",
        "datePublished": "<?php echo $_map_modified_at;?>",
        "name": "<?php echo $_map_title;?>",
        "license": "https://creativecommons.org/licenses/by/4.0/legalcode",
        "acquireLicensePage": "https://creativecommons.org/licenses/by/4.0/"
      }
    </script>
    <script type="application/ld+json" class="yoast-schema-graph">
      {
        "@context": "https://schema.org",
        "@graph": [{
          "@type": ["Person", "Organization"],
          "@id": "<?php echo FLAT_DOMAIN;?>/#/schema/person/71e2fcca93e34e598a24e469ba73b353",
          "name": "<?php echo ERP_CLIENT;?>",
          "image": {
            "@type": "ImageObject",
            "@id": "<?php echo FLAT_DOMAIN;?>/#personlogo",
            "inLanguage": "it-IT",
            "url": "https://cityplanner.biz/source/img/geodashboard_2024/android-chrome-192x192.png?ver=6.4.6",
            "caption": "<?php echo ERP_CLIENT;?>"
          },
          "logo": {
            "@id": "<?php echo FLAT_DOMAIN;?>/#personlogo"
          },
          "description": "<?php echo DFL_TAGLINE_OWNER;?>",
          "sameAs": ["<?php echo FLAT_DOMAIN;?>", "https://x.com/Null_Island_Geo"]
        }, {
          "@type": "WebSite",
          "@id": "<?php echo FLAT_DOMAIN;?>/#website",
          "url": "<?php echo FLAT_DOMAIN;?>",
          "name": "<?php echo ERP_CORP_NAME;?>",
          "description": "Geospatial revolution",
          "publisher": {
            "@id": "<?php echo FLAT_DOMAIN;?>/#/schema/person/71e2fcca93e34e598a24e469ba73b353"
          },
          "inLanguage": "en_GB"
        }]
      }
    </script>
  </head>
  <body>

    <!--template02_2grid-->
    <div class="wrapper">
      <div class="sidebar">
        <div class="sidebar__header"></div>
        <div class="sidebar__body"></div>
        <div class="sidebar__footer"></div>
      </div>
      <div class="mainmap">
        <div id="mapid">
          <div class="mainmap__loading"></div>
          <?php include FLAT_FOLDER__THEME."project/".$_map__slug."/index_main.php"; ?>
        </div>
      </div>
    </div>

    <script>
      const FLAT_DOMAIN='<?php echo FLAT_DOMAIN;?>';
      const FLAT_URL__PLUGIN='<?php echo FLAT_URL__PLUGIN;?>';
      const FLAT_URL__PLUGIN_CHILD='<?php echo FLAT_URL__PLUGIN_CHILD;?>';
      const FLAT_URL__THEME='<?php echo FLAT_URL__THEME;?>';
      const FLAT_URL__THEME_CHILD='<?php echo FLAT_URL__THEME_CHILD;?>';
      const MAP__SLUG='<?php echo $_map__slug;?>';
      const MAPBOXGL_KEY='<?php echo MAPBOXGL_KEY;?>';
    </script>


    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></script>
    <script type="text/javascript" src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-supported/v2.0.0/mapbox-gl-supported.js"></script>  
    <script type="text/javascript" src="https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.js"></script>
    <script>
      if (mapboxgl.supported() === false) {
        // This is where you will load Mapbox.js & initialize a Static Tile map
        alert('Sorry, MapBox is not available!');
      } else {
        // This is where you will load Mapbox GL JS & initialize a WebGL map
        // _onsole.log('MapBox is available!');
      }
    </script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/numbro@2.3.6/dist/numbro.min.js"></script>
    <script type="text/javascript" src="https://vis4.net/chromajs/libs/chroma.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.2/moment.min.js"></script>
    <script type="text/javascript" src='https://cdn.jsdelivr.net/npm/@turf/turf@6/turf.min.js'></script>

    <script type="module" src="<?php echo $project_URL;?>js/_script.js"></script>

  </body>
</html>