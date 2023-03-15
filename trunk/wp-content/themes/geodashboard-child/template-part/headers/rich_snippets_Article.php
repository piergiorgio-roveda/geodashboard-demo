<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://google.com/article"
    },
    "name": "<?php echo $g_map_title;?>",
    "headline": "<?php echo $itemMap["g_attributes"]->description;?>",
    "author": {
      "@type": "Person",
      "name": "<?php echo $g_PUBLISHER;?>"
    },
    "publisher": {
      "@type": "Organization",
      "name": "<?php echo ERP_CORP_NAME;?>",
      "logo": {
        "@type": "ImageObject",
        "url": "<?php echo $g_DFL_LOGO_OWNER_BASE;?>"
      }
    },
    "datePublished": "<?php echo $itemMap['post_date'];?>",
    "dateModified": "<?php echo $itemMap['post_modified'];?>",
    "image": ["<?php echo $g_DFL_IMAGE_MAIN;?>"],
    "articleSection": "Blog",
    "articleBody": "<?php echo $itemMap['g_attributes']->description;?>",
    "url": null
  }
</script>
<!--https://schema.org/ImageObject-->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "author": "<?php echo $g_PUBLISHER;?>",
    "contentUrl": "<?php echo $g_DFL_IMAGE_MAIN;?>",
    "datePublished": "<?php echo $itemMap['post_modified'];?>",
    "name": "<?php echo $g_map_title;?>",
    "license": "https://creativecommons.org/licenses/by/4.0/legalcode",
    "acquireLicensePage": "https://creativecommons.org/licenses/by/4.0/"
  }
</script>