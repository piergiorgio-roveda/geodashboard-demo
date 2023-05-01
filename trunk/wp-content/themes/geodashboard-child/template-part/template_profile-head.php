  <head>

    <?php
    include(ABSPATH.THEME_PATH.'/template-part/default-head.php');
    ?>

    <!-- Bootstrap core CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" 
      rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />

    <!-- ## -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.2/leaflet.min.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css" />

    <link rel="stylesheet" href="https://ljagis.github.io/leaflet-measure/leaflet-measure.css">

    <link rel="stylesheet" href="<?php echo $gVariables['SOURCE_PATH'];?>markers.css" />
    <link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri();?>/src/css/style_map_markerscluster.css" />
    <!-- ## -->

    <link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri();?>/style.css?ver=<?php echo APP_VERSION;?>" />

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css" />
    <link rel="stylesheet" href="<?php echo $gVariables['SOURCE_PATH'];?>alertifyjs/alertifyjs_1.13.1/css/themes/default.css" />

    <script src="https://use.fontawesome.com/eaac8bb640.js"></script>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css">

    <!-- ## -->
    <link rel="stylesheet" href="//cdn.datatables.net/1.11.3/css/jquery.dataTables.min.css" />

    <link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri();?>/src/css/style_map_base.css?ver=<?php echo APP_VERSION;?>" />
    <link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri();?>/src/css/style_map_template_sidebarfixed.css?ver=<?php echo APP_VERSION;?>" />

    <!-- custom -->
    <link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri();?>/src/css/style_explorer.css?ver=<?php echo APP_VERSION;?>" />
    <link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri();?>/src/css/style_elegant01.css?ver=<?php echo APP_VERSION;?>" />
    <link rel="stylesheet" href="<?php echo $gVariables['SOURCE_PATH'];?>js/json-viewer-js-master/src/style_custom.css" />
    <!-- ## -->

    <?php
    include(ABSPATH.THEME_PATH.'/template-part/template_profile-head-plus.php');
    ?>  
  </head>