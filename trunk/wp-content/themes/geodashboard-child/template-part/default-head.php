<meta charset="utf-8">
<!--Responsive meta tag-->
<!--<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">-->
<!--<meta name="viewport" content="user-scalable=0, width=device-width, initial-scale=1.0, maximum-scale=1.0" />-->
<meta name="viewport" content="width=device-width">
<!--<meta name="viewport" content="width=device-width, initial-scale=1">-->
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="google" content="notranslate">

<meta name="author" content="<?php echo $g_ERP_OWNER_GEOINFO_AZIENDA;?>">
<meta name="generator" content="<?php echo APP_NICKNAME;?> v<?php echo APP_VERSION;?>">

<!-- Favicons -->
<link rel="icon" href="<?php echo $gVariables['FAVICON'];?>">
<link rel="apple-touch-icon" href="<?php echo $gVariables['FAVICON_APPLE'];?>" sizes="180x180">
<link rel="icon" href="<?php echo $gVariables['FAVICON32'];?>" sizes="32x32" type="image/png">
<link rel="icon" href="<?php echo $gVariables['FAVICON16'];?>" sizes="16x16" type="image/png">

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
