  <head>
    <meta charset="utf-8">
    <!--Responsive meta tag-->
    <!--<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">-->
    <!--<meta name="viewport" content="user-scalable=0, width=device-width, initial-scale=1.0, maximum-scale=1.0" />-->
    <!--<meta name="viewport" content="width=device-width">-->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="google" content="notranslate">

    <meta name="author" content="<?php echo $g_ERP_OWNER_GEOINFO_AZIENDA;?>">
    <meta name="generator" content="<?php echo APP_NICKNAME;?> v<?php echo APP_VERSION;?>">

    <!-- Favicons -->
    <link rel="icon" href="<?php echo $g_FAVICON;?>">
    <link rel="apple-touch-icon" href="<?php echo $g_FAVICON_APPLE;?>" sizes="180x180">
    <link rel="icon" href="<?php echo $g_FAVICON32;?>" sizes="32x32" type="image/png">
    <link rel="icon" href="<?php echo $g_FAVICON16;?>" sizes="16x16" type="image/png">

    <link rel="manifest" href="<?php echo get_site_url();?>/manifest.json?ver=<?php echo APP_VERSION;?>">
    <!--<link rel="mask-icon" href="/docs/5.2/assets/img/favicons/safari-pinned-tab.svg" color="#712cf9">-->
    
    <meta name="theme-color" content="#712cf9">

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo GA_TRACKING_ID;?>"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '<?php echo GA_TRACKING_ID;?>');
    </script>
    <!-- Google Tag Manager -->
    <script>
      (
      function(w,d,s,l,i){
        w[l]=w[l]||[];
        w[l].push(
          {
            'gtm.start':new Date().getTime(),
            event:'gtm.js'
          }
        );
        var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),
          dl=l!='dataLayer'?'&l='+l:'';
        j.async=true;
        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
        f.parentNode.insertBefore(j,f);
      }
      )(
        window,document,'script','dataLayer','GTM-TQSZFSQ'
      );
    </script>
    <!-- End Google Tag Manager -->

    <!-- Bootstrap core CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" 
      rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />

    <link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri();?>/style.css?ver=<?php echo $g_version;?>" />

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css" />
    <link rel="stylesheet" href="<?php echo $g_SOURCE_PATH;?>alertifyjs/alertifyjs_1.13.1/css/themes/default.css" />

    <script src="https://use.fontawesome.com/eaac8bb640.js"></script>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css">

    <!-- ## -->
    <link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri();?>/src/css/style_dashboard.css" />
    <!-- Custom styles for this template -->
    <link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri();?>/src/css/cover.css" rel="stylesheet">

    <!-- Custom -->
    <link href="<?php echo get_stylesheet_directory_uri();?>/src/css/cityplanner-style.css?ver<?php echo APP_VERSION;?>" rel="stylesheet">
    <link href="<?php echo get_stylesheet_directory_uri();?>/src/css/style-ARIELOZAM-CyberWeb-UI-FromFuture.css?ver=<?php echo APP_VERSION;?>" rel="stylesheet">

    <!--<link rel="stylesheet" href="https://cityplanner.biz/gta/webgis/src/css/style_map012.css?ver=0.1.10" />-->
    <!-- ## -->

    <?php
    include(ABSPATH.THEME_PATH.'/template-part/template05-head-plus.php');
    ?>  
  </head>