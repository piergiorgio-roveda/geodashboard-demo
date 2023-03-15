var lyr_slug = 'lyr_test001';

var feature = {
  'properties':{
    'g_slug': lyr_slug,
    'g_label': 'Example layer',
    'intoc': true,
    'icon': 'emoji_circle_carto-1f1ef-1f1f5_mod-blue.png',
    'zindex': 0,
    'lyr_type':'static',
  }
}

g_meta.geovar_lyr.features.push(feature);

dMap.analisi01.grLyr.push('lyr_test001');

var geo_lyr_test001 = new L.featureGroup();

dMap.analisi01.grLyrToc.push('lyr_test001');
