var lyr_slug = 'lyr_test002';

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


dMap.analisi01.grLyr.push('lyr_test002');

var geo_lyr_test002 = new L.featureGroup();

dMap.analisi01.grLyrToc.push('lyr_test002');


