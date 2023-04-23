geovar.lyr=new Array();
geovar.lyr.slug=new Array();

geovar.lyr.deepmap =new Array();
geovar.lyr.slug.push('deepmap');
geovar.lyr.deepmap.label = 'deepmap';
geovar.lyr.lyr0 =new Array();
geovar.lyr.slug.push('lyr0');
geovar.lyr.lyr0.label = 'Example layer';
geovar.lyr.lyr0.icon = 'noun_person_1994728_Blue.png';
geovar.lyr.lyr0.title = 'No title';
geovar.lyr.lyr0.lyr_update = 'on_move';
geovar.lyr.lyr0.geoserver_name = 'w01_lyr0';
geovar.lyr.lyr0.geoserver_style = 'w01_lyr0_style';


geovar.lyr.slug.push('lyr1');
geovar.lyr.lyr1={
  label:'Voyager',
  tile_url:'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png',
  lyr_update: 'fix',
  lyr_type: 'tile',
  title: 'Voyager @Carto',
  //geoserver_name: 'w01_lyr1',
  //geoserver_style: 'w01_lyr1_style',
  inToc:true,
  icon: 'emoji_circle_carto-1f1ef-1f1f5_mod-blue.png',
  zIndex:  100,
  maxZoom:  22,
  pointerEvents:false,
  it_IT: {
    attribution:'&copy; <a href="httpa://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
  },
  en_GB: {
    attribution:'&copy; <a href="httpa://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
  },
}

geovar.lyr.lyr2 =new Array();
geovar.lyr.slug.push('lyr2');
geovar.lyr.lyr2.label = 'Hexes';
geovar.lyr.lyr2.title = 'Hexes 100k';
geovar.lyr.lyr2.lyr_update = 'fix';
geovar.lyr.lyr2.lyr_type = 'polygon';
geovar.lyr.lyr2.geoserver_name = 'w01_lyr2';
geovar.lyr.lyr2.geoserver_style = 'w01_lyr2_style';
geovar.lyr.lyr2.icon = 'emoji_circle_carto-1f1ef-1f1f5_mod-blue.png';

geovar.lyr.lyr3 =new Array();
geovar.lyr.slug.push('lyr3');
geovar.lyr.lyr3.label = 'Opentopomap';
geovar.lyr.lyr3.tile_url = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
geovar.lyr.lyr3.lyr_update = 'fix';
geovar.lyr.lyr3.lyr_type = 'tile';
geovar.lyr.lyr3.title = 'No title';
geovar.lyr.lyr3.geoserver_name = 'w01_lyr3';
geovar.lyr.lyr3.geoserver_style = 'w01_lyr3_style';
geovar.lyr.lyr3.icon = 'emoji_circle_carto-1f1ef-1f1f5_mod-blue.png';

geovar.lyr.lyr4 =new Array();
geovar.lyr.slug.push('lyr4');
geovar.lyr.lyr4.label = 'Geohash world';
geovar.lyr.lyr4.title = 'Geohash world';
geovar.lyr.lyr4.lyr_update = 'on_move';
geovar.lyr.lyr4.lyr_type = 'polygon';
geovar.lyr.lyr4.geoserver_name = 'w01_lyr4';
geovar.lyr.lyr4.geoserver_style = 'w01_lyr4_style';
geovar.lyr.lyr4.icon = 'emoji_circle_carto-1f1ef-1f1f5_mod-blue.png';

geovar.lyr.lyr5 =new Array();
geovar.lyr.slug.push('lyr5');
geovar.lyr.lyr5.label = 'OSM-France';
geovar.lyr.lyr5.tile_url = 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png';
geovar.lyr.lyr5.lyr_update = 'fix';
geovar.lyr.lyr5.lyr_type = 'tile';
geovar.lyr.lyr5.title = 'No title';
geovar.lyr.lyr5.geoserver_name = 'w01_lyr5';
geovar.lyr.lyr5.geoserver_style = 'w01_lyr5_style';
geovar.lyr.lyr5.icon = 'emoji_circle_carto-1f1ef-1f1f5_mod-blue.png';
geovar.lyr.lyr6 =new Array();

geovar.lyr.slug.push('lyr6');
geovar.lyr.lyr6.label = 'Elevation (MOLA)';
geovar.lyr.lyr6.tile_url = 'https://planetarymaps.usgs.gov/cgi-bin/mapserv?map=/maps/mars/mars_simp_cyl.map';
geovar.lyr.lyr6.tile_layers = 'MOLA_THEMIS_blend';
geovar.lyr.lyr6.lyr_update = 'fix';
geovar.lyr.lyr6.lyr_type = 'tile';
geovar.lyr.lyr6.title = 'No title';
geovar.lyr.lyr6.geoserver_name = 'w01_lyr6';
geovar.lyr.lyr6.geoserver_style = 'w01_lyr6_style';
geovar.lyr.lyr6.icon = 'emoji_circle_carto-1f1ef-1f1f5_mod-blue.png';

geovar.lyr.slug.push('lyr006');
geovar.lyr.lyr006={
  slug: 'mars_elevation_mola',
  label: 'Elevation (MOLA)',
  title: 'No title',
  inToc:true,
  zIndex:  200,
  tile_url: 'https://planetarymaps.usgs.gov/cgi-bin/mapserv?map=/maps/mars/mars_simp_cyl.map',
  tile_layers: 'MOLA_THEMIS_blend',
  lyr_update: 'fix',
  lyr_type: 'wms',
  geoserver_name: 'w01_lyr006',
  geoserver_style: 'w01_lyr006_style',
  icon: 'emoji_circle_carto-1f1ef-1f1f5_mod-blue.png'
}

geovar.lyr.lyr7 =new Array();
geovar.lyr.slug.push('lyr7');
geovar.lyr.lyr7.label = 'Quadrants (5M)';
geovar.lyr.lyr7.tile_url = 'https://planetarymaps.usgs.gov/cgi-bin/mapserv?map=/maps/mars/mars_simp_cyl.map';
geovar.lyr.lyr7.tile_layers = 'Mars5M_Quads';
geovar.lyr.lyr7.lyr_update = 'fix';
geovar.lyr.lyr7.lyr_type = 'tile';
geovar.lyr.lyr7.title = 'No title';
geovar.lyr.lyr7.geoserver_name = 'w01_lyr7';
geovar.lyr.lyr7.geoserver_style = 'w01_lyr7_style';
geovar.lyr.lyr7.icon = 'emoji_circle_carto-1f1ef-1f1f5_mod-blue.png';
geovar.lyr.lyr8 =new Array();
geovar.lyr.slug.push('lyr8');
geovar.lyr.lyr8.label = 'Nomenclature';
geovar.lyr.lyr8.title = 'mars_nomenclature';
geovar.lyr.lyr8.lyr_update = 'on_move';
geovar.lyr.lyr8.lyr_type = 'point';
geovar.lyr.lyr8.icon = 'emoji_circle_carto-1f1ef-1f1f5_mod-red-alpha50.png';
geovar.lyr.lyr8.geoserver_name = 'w01_lyr8';
geovar.lyr.lyr8.geoserver_style = 'w01_lyr8_style';

geovar.lyr.slug.push('lyr9');
geovar.lyr.lyr9={
  label:'opm-mars-basemap-v0-2',
  tile_url:'https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-2/all/{z}/{x}/{y}.png',
  tms:'false',
  inToc:true,
  lyr_update: 'fix',
  lyr_type: 'tile',
  title: 'OPM-Mars',
  author:'https://www.openplanetary.org/',
  //geoserver_name: 'w01_lyr9',
  //geoserver_style: 'w01_lyr9_style',
  icon: 'emoji_circle_carto-1f1ef-1f1f5_mod-blue.png',
  zIndex:  800,
  maxZoom:  22,
  pointerEvents:false,
  it_IT: {
    attribution:''
  },
  en_GB: {
    attribution:''
  },
}

geovar.lyr.lyr10 =new Array();
geovar.lyr.slug.push('lyr10');
geovar.lyr.lyr10.label = 'Exploration';
geovar.lyr.lyr10.title = 'mars_exploration';
geovar.lyr.lyr10.lyr_slug = 'spacecraft';
geovar.lyr.lyr10.lyr_update = 'on_move';
geovar.lyr.lyr10.lyr_type = 'point';
geovar.lyr.lyr10.icon = 'opengameart-org-AndHeGames-creatures_3.png';
geovar.lyr.lyr10.icon_type = 'sprite';
geovar.lyr.lyr10.icon_xpos = '-64';
geovar.lyr.lyr10.icon_ypos = '-64';
geovar.lyr.lyr10.icon_sliced = 'opengameart-org/opengameart-org-AndHeGames-creatures_3-02-02.png';
geovar.lyr.lyr10.geoserver_name = 'w01_lyr10';
geovar.lyr.lyr10.geoserver_style = 'w01_lyr10_style';
geovar.lyr.lyr11 =new Array();
geovar.lyr.slug.push('lyr11');
geovar.lyr.lyr11.label = 'Mission path';
geovar.lyr.lyr11.title = 'mars_mission_path';
geovar.lyr.lyr11.lyr_slug = 'spacecraft_path';
geovar.lyr.lyr11.lyr_update = 'on_move';
geovar.lyr.lyr11.lyr_type = 'polyline';
geovar.lyr.lyr11.icon = 'opengameart-org-AndHeGames-creatures_3.png';
geovar.lyr.lyr11.icon_type = 'sprite';
geovar.lyr.lyr11.icon_xpos = '-64';
geovar.lyr.lyr11.icon_ypos = '-64';
geovar.lyr.lyr11.icon_sliced = 'path_red.png';
geovar.lyr.lyr11.geoserver_name = 'w01_lyr11';
geovar.lyr.lyr11.geoserver_style = 'w01_lyr11_style';
geovar.lyr.lyr12 =new Array();
geovar.lyr.slug.push('lyr12');
geovar.lyr.lyr12.label = 'Highway project';
geovar.lyr.lyr12.title = 'Highway project';
geovar.lyr.lyr12.lyr_slug = 'highway_project';
geovar.lyr.lyr12.lyr_update = 'on_move';
geovar.lyr.lyr12.lyr_type = 'polyline';
geovar.lyr.lyr12.icon = 'opengameart-org-AndHeGames-creatures_3.png';
geovar.lyr.lyr12.icon_type = 'sprite';
geovar.lyr.lyr12.icon_xpos = '-64';
geovar.lyr.lyr12.icon_ypos = '-64';
geovar.lyr.lyr12.icon_sliced = 'path_blue.png';
geovar.lyr.lyr12.geoserver_name = 'w01_lyr12';
geovar.lyr.lyr12.geoserver_style = 'w01_lyr12_style';
geovar.lyr.lyr13 =new Array();
geovar.lyr.slug.push('lyr13');
geovar.lyr.lyr13.label = 'Poi';
geovar.lyr.lyr13.title = 'Poi';
geovar.lyr.lyr13.lyr_slug = 'poi';
geovar.lyr.lyr13.lyr_update = 'on_move';
geovar.lyr.lyr13.lyr_type = 'point';
geovar.lyr.lyr13.icon = 'opengameart-org-AndHeGames-creatures_3.png';
geovar.lyr.lyr13.icon_type = 'sprite';
geovar.lyr.lyr13.icon_xpos = '-96';
geovar.lyr.lyr13.icon_ypos = '-64';
geovar.lyr.lyr13.icon_sliced = 'opengameart-org/opengameart-org-AndHeGames-creatures_3-03-02.png';
geovar.lyr.lyr13.geoserver_name = 'w01_lyr13';
geovar.lyr.lyr13.geoserver_style = 'w01_lyr13_style';
geovar.lyr.lyr14 =new Array();
geovar.lyr.slug.push('lyr14');
geovar.lyr.lyr14.label = 'Poi Hash';
geovar.lyr.lyr14.title = 'Poi Hash';
geovar.lyr.lyr14.lyr_slug = 'poi_hash';
geovar.lyr.lyr14.lyr_update = 'on_move';
geovar.lyr.lyr14.lyr_type='db',//virtual,wms,tile,db,static
geovar.lyr.lyr14.feat_type='polygon',//point,line,polygon,circle,raster,table
geovar.lyr.lyr14.icon = 'opengameart-org-AndHeGames-creatures_3.png';
geovar.lyr.lyr14.icon_type = 'sprite';
geovar.lyr.lyr14.icon_xpos = '-64';
geovar.lyr.lyr14.icon_ypos = '-64';
geovar.lyr.lyr14.icon_sliced = 'noun_area_1653539_10.png';
geovar.lyr.lyr14.geoserver_name = 'w01_lyr14';
geovar.lyr.lyr14.geoserver_style = 'w01_lyr14_style';


geovar.lyr.slug.push('lyr15');
geovar.lyr.lyr15={
  label:'Carto light only labels',
  tile_url:'https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png',
  lyr_update: 'fix',
  lyr_type: 'tile',
  title: 'No title',
  //geoserver_name: 'w01_lyr1',
  //geoserver_style: 'w01_lyr1_style',
  icon: 'emoji_circle_carto-1f1ef-1f1f5_mod-blue.png',
  zIndex:  450,
  maxZoom:  22,
  pointerEvents:false,
  it_IT: {
    attribution:''
  },
  en_GB: {
    attribution:''
  },
}

geovar.lyr.slug.push('lyr016');
geovar.lyr.lyr016={
  label:'Corporations',
  tables:['pt_cities_corporations'],
  geojson_url:'https://raw.githubusercontent.com/piergiorgio-roveda/gistips-academy/main/gis/geodata/speculative_fiction/cyberpunk/pt_cities_corporations.geojson',
  lyr_update: 'fix',
  lyr_type: 'static',//virtual,wms,tile,db,static
  feat_type: 'point',//point,line,polygon,circle,raster,table
  title: 'Corporations cities',
  title_dlg: 'Corporation city',
  icon: 'emoji_circle_carto-1f1ef-1f1f5_mod-blue.png',
  zIndex:  500,
  maxZoom:  22,
  style:{
    style1 : {
      iconUrl: geovar.home_project+'/source/icon/emoji_circle_carto-1f1ef-1f1f5_mod-blue.png',//+	geovar.lyr.lyr0.icon,
      iconSize: [10, 10], // size of the icon
      iconAnchor: [5,5] // point of the icon which will correspond to marker's location
    },
    style2 : {
      iconUrl: geovar.home_project+'/source/icon/emoji_circle_carto-1f1ef-1f1f5_mod-blue.png',//+	geovar.lyr.lyr0.icon,
      iconSize: [30, 30], // size of the icon
      iconAnchor: [15,15] // point of the icon which will correspond to marker's location
    }
  }
}

geovar.lyr.slug.push('lyr017');
geovar.lyr.lyr017={
  label:'Corporations',
  tables:['pt_cities_corporations'],
  geojson_url:'https://raw.githubusercontent.com/piergiorgio-roveda/gistips-academy/main/gis/geodata/speculative_fiction/cyberpunk/pt_cities_corporations.geojson',
  lyr_update: 'fix',
  lyr_type: 'static',//virtual,wms,tile,db,static
  feat_type: 'point',//point,line,polygon,circle,raster,table
  title: 'Corporations cities',
  title_dlg: 'Corporation city',
  icon: 'emoji_circle_carto-1f1ef-1f1f5_mod-blue.png',
  zIndex:  500,
  maxZoom:  22,
  style:{
    style1 : {
      iconUrl: geovar.home_project+'/source/icon/emoji_circle_carto-1f1ef-1f1f5_mod-blue.png',//+	geovar.lyr.lyr0.icon,
      iconSize: [10, 10], // size of the icon
      iconAnchor: [5,5] // point of the icon which will correspond to marker's location
    },
    style2 : {
      iconUrl: geovar.home_project+'/source/icon/emoji_circle_carto-1f1ef-1f1f5_mod-blue.png',//+	geovar.lyr.lyr0.icon,
      iconSize: [30, 30], // size of the icon
      iconAnchor: [15,15] // point of the icon which will correspond to marker's location
    }
  }
}

geovar.lyr.slug.push('lyr018');
geovar.lyr.lyr018={
  label:'defimons_modified_wgs84',
  tile_url:'https://geonode.cityplanner.biz/geoserver/geonode/wms?',
  tms:'false',
  inToc:true,
  lyr_update: 'fix',
  lyr_type: 'wms',
  title: 'Defimons Map 01',
  //author:'https://www.openplanetary.org/',
  //geoserver_name: 'w01_lyr9',
  //geoserver_style: 'w01_lyr9_style',
  icon: 'emoji_circle_carto-1f1ef-1f1f5_mod-blue.png',
  zIndex:  800,
  maxZoom:  22,
  pointerEvents:false,
  it_IT: {
    attribution:''
  },
  en_GB: {
    attribution:''
  },
  options:{
    layers:'geonode:defimons_modified_wgs84',
    transparent:'true',
    format:'image/png',//PNG 24bit
    format_options:'dpi:300',
    opacity:1,
    tiled:'true',
    //info_format: 'text/html',
    //pane:opt_pane,
    //cql_filter: 'AND v4 > 0 AND v4 <= '+a01_breaks[0]+' '
    antialiasing:'on',
    //styles:'g14_d_mandati_style'
  }
}

geovar.lyr.slug.push('lyr019');
geovar.lyr.lyr019={
  label:'pg_cittametropolitane',
  inToc:true,
  zIndex:  500,
  //lyr_update: 'fix',
  lyr_type: 'db',//virtual,wms,tile,db,static
  feat_type: 'polygon',//point,line,polygon,circle,raster,table
  title: 'Città Metropolitane',
  title_dlg: 'Città Metropolitane',
  icon: 'emoji_circle_carto-1f1ef-1f1f5_mod-blue.png',
}

//G24-C001
geovar.lyr.slug.push('lyr020');
geovar.lyr.lyr020={
  label:'Centri assistenza',
  inToc:true,
  zIndex:  500,
  lyr_update: 'on_move',//fix,on_move
  lyr_type: 'db',//virtual,wms,tile,db,static
  feat_type: 'point',//point,line,polygon,circle,raster,table
  title: 'Centri assistenza',
  title_dlg: 'Centri assistenza',
  icon: 'noun_Home_67986_Pink.png',
  icon2: 'noun_Home_67986_Blue.png',
  icon3: 'noun_Home_67986_Violet.png',
  feature_zoom: 5.5,
  icon_dim: 20,
  icon_dimanchor1: 10,
  icon_dimanchor2: 13,
  label_single: 'Centro assistenza',
  label_zoom: 12,
  legendicon: 'noun_Home_67986_Pink.png',
  maincolor: '#e50000',
  maincolor_hide: '#e5cece',
  slug: 'centriassistenza'
}

//G24-C001
geovar.lyr.slug.push('lyr021');
geovar.lyr.lyr021={
  label:'Engineer',
  label_single:'Engineer',
  inToc:true,
  zIndex:  500,
  //lyr_update: 'fix',
  lyr_type: 'db',//virtual,wms,tile,db,static
  feat_type: 'point',//point,line,polygon,circle,raster,table
  title: 'Engineer',
  title_dlg: 'Engineer',
  icon: 'noun_person_1994728_Green.png',
  label_zoom: 10,
  legendicon: 'noun_person_1994728_Green.png',
  feature_zoom: 9,
  maincolor: '#008000',
  maincolor_hide: '#cee5ce',
  slug: 'engineer'
}

//G24-C001
geovar.lyr.slug.push('lyr022');
geovar.lyr.lyr022={
  label:'Clienti Servizi',
  inToc:true,
  zIndex:  500,
  lyr_update: 'on_move',//fix,on_move
  lyr_type: 'db',//virtual,wms,tile,db,static
  feat_type: 'point',//point,line,polygon,circle,raster,table
  title: 'Clienti Servizi',
  title_dlg: 'Clienti Servizi',
  icon: 'micro_ball_g15_lyr6_clientiservizi.png',
  feature_zoom: 12,
  feature_zoom_max: 14,
  label: 'Clienti Servizi',
  label_single: 'Cliente',
  label_zoom: 15,
  legendicon: 'micro_ball_g15_lyr6_clientiservizi.png',
  maincolor: '#00AAFF',
  maincolor_hide: '#a3becc',
  slug: 'clientiservizi'
}

//G24-C001
geovar.lyr.slug.push('lyr023');
geovar.lyr.lyr023={
  label:'Copertura mandati simulazione',
  inToc:true,
  zIndex:  200,
  geoserver_name: 'g24_lyr023',
  geoserver_style: 'g24_lyr023_style',
  //lyr_update: 'fix',
  lyr_type: 'wms',//virtual,wms,tile,db,static
  feat_type: 'polygon',//point,line,polygon,circle,raster,table
  title: 'Copertura mandati simulazione',
  title_dlg: 'Copertura mandati simulazione',
  icon: 'noun_area_1653539_3.png',
  style_group:['cl_00','cl_01','cl_02','cl_03'],
  style: {
    'cl_00':{
      'break':'1',
      'stroke_color':'#000cff',
      'fill_color':'#000cff',
      'label':'Aree con 3 o più Agency',
    },
    'cl_01':{
      'break':'2',
      'stroke_color':'#747afc',
      'fill_color':'#747afc',
      'label':'Aree con 2  Agency',
    },
    'cl_02':{
      'break':'3',
      'stroke_color':'#c2c5f9',
      'fill_color':'#c2c5f9',
      'label':'Area con 1 Agency',
    },
    'cl_03':{
      'break':'0',
      'stroke_color':'#fff',
      'fill_color':'#fff',
      'label':'Aree Libere',
    },
  }
}

//G24-C001
/*geovar.lyr.slug.push('lyr024');
geovar.lyr.lyr024={
  label:'Aree mandati',
  inToc:true,
  zIndex:  500,
  //lyr_update: 'fix',
  lyr_type: 'wms',//virtual,wms,tile,db,static
  feat_type: 'polygon',//point,line,polygon,circle,raster,table
  title: 'Aree mandati',
  title_dlg: 'Aree mandati',
  icon: 'noun_area_1653539_10.png',
}*/

//G24-C001
geovar.lyr.slug.push('lyr025');
geovar.lyr.lyr025={
  label:'Copertura mandati',
  inToc:true,
  zIndex:  200,
  geoserver_name: 'g24_lyr025',
  geoserver_style: 'g24_lyr025_style',
  //lyr_update: 'fix',
  lyr_type: 'wms',//virtual,wms,tile,db,static
  feat_type: 'polygon',//point,line,polygon,circle,raster,table
  title: 'Copertura mandati',
  title_dlg: 'Copertura mandati',
  icon: 'noun_area_1653539_3.png',
  style_group:['cl_00','cl_01','cl_02','cl_03'],
  style: {
    'cl_00':{
      'break':'1',
      'stroke_color':'#000cff',
      'fill_color':'#000cff',
      'label':'Aree con 3 o più Agency',
    },
    'cl_01':{
      'break':'2',
      'stroke_color':'#747afc',
      'fill_color':'#747afc',
      'label':'Aree con 2 Agency',
    },
    'cl_02':{
      'break':'3',
      'stroke_color':'#c2c5f9',
      'fill_color':'#c2c5f9',
      'label':'Area con 1 Agency',
    },
    'cl_03':{
      'break':'0',
      'stroke_color':'#fff',
      'fill_color':'#fff',
      'label':'Aree Libere',
    },
  }
}

//G24-C001
geovar.lyr.slug.push('lyr026');
geovar.lyr.lyr026={
  label:'Categorie Agency',
  inToc:true,
  zIndex:  500,
  //lyr_update: 'fix',
  lyr_type: 'db',//virtual,wms,tile,db,static
  feat_type: 'table',//point,line,polygon,circle,raster,table
  title: 'Categorie Agency',
  title_dlg: 'Categorie Agency',
  icon: 'noun_area_1653539_bordogiallo.png',
}

//G24-C001
geovar.lyr.slug.push('lyr027');
geovar.lyr.lyr027={
  label:'Area mandato simulazione singolo Agency',
  inToc:false,
  zIndex:  300,
  lyr_update: 'manual',//fix,on_move,manual
  lyr_type: 'db',//virtual,wms,tile,db,static
  feat_type: 'polygon',//point,line,polygon,circle,raster,table
  title: 'Area mandato simulazione singolo Agency',
  title_dlg: '',
  //icon: 'noun_area_1653539_bordogiallo.png',
}

//G24-C001
geovar.lyr.slug.push('lyr028');
geovar.lyr.lyr028={
  label:'Selection ISTAT-CAP',
  inToc:false,
  zIndex:  500,
  lyr_update: 'manual',//fix,on_move,manual
  lyr_type: 'db',//virtual,wms,tile,db,static
  feat_type: 'polygon',//point,line,polygon,circle,raster,table
  title: 'Selection ISTAT-CAP',
  title_dlg: '',
  //icon: 'noun_area_1653539_bordogiallo.png',
}

//G24-C001
geovar.lyr.slug.push('lyr029');
geovar.lyr.lyr029={
  label:'ISTAT-CAP',
  inToc:false,
  zIndex:  250,
  geoserver_name: 'g24_lyr029',
  geoserver_style: 'g24_lyr029_style',
  lyr_update: 'manual',//fix,on_move,manual
  lyr_type: 'wms',//virtual,wms,tile,db,static
  feat_type: 'polygon',//point,line,polygon,circle,raster,table
  title: 'ISTAT-CAP',
  title_dlg: '',
  //icon: 'noun_area_1653539_bordogiallo.png',
}

geovar.lyr.slug.push('lyr030');
geovar.lyr.lyr030={
  label:'Castles',
  inToc:true,
  tables:['planet_historic_castle'],
  //geojson_url:'https://raw.githubusercontent.com/piergiorgio-roveda/gistips-academy/main/gis/geodata/speculative_fiction/cyberpunk/pt_cities_corporations.geojson',
  lyr_update: 'on_move',//fix,on_move
  lyr_type: 'db',//virtual,wms,tile,db,static
  feat_type: 'point',//point,line,polygon,circle,raster,table
  title: 'Castles',
  title_dlg: 'Castle',
  icon: 'emoji_circle_carto-1f1ef-1f1f5_mod-blue.png',
  zIndex:  500,
  maxZoom:  22,
  feature_zoom: 12,
  feature_zoom_max: 1,
  label_zoom: 15,
  maincolor: '#00AAFF',
  maincolor_hide: '#a3becc',
  slug: 'pt_castle',
  style:{
    style1 : {
      iconUrl: geovar.home_project+'/source/icon/emoji_circle_carto-1f1ef-1f1f5_mod-blue.png',//+	geovar.lyr.lyr0.icon,
      iconSize: [10, 10], // size of the icon
      iconAnchor: [5,5] // point of the icon which will correspond to marker's location
    },
    style2 : {
      iconUrl: geovar.home_project+'/source/icon/emoji_circle_carto-1f1ef-1f1f5_mod-blue.png',//+	geovar.lyr.lyr0.icon,
      iconSize: [30, 30], // size of the icon
      iconAnchor: [15,15] // point of the icon which will correspond to marker's location
    }
  }
}

//G25-C002
geovar.lyr.slug.push('lyr031'); //G13 lyr1
geovar.lyr.lyr031={
  slug: 'shops',
  label:'Negozi',
  label_single: 'Negozio',
  title: 'Negozi',
  title_dlg: 'Negozio',
  inToc:true,
  zIndex:  500,
  lyr_update: 'on_move',//fix,on_move
  lyr_type: 'db',//virtual,wms,tile,db,static
  feat_type: 'point',//point,line,polygon,circle,raster,table
  icon: 'noun_area_1653539_4.svg',
  icon_client_close:'pin_a_grey_close.svg',
  icon_client_open:'pin_a_red_open.svg',
  icon_concorrenza_close:'pin_b_grey_close.svg',
  icon_concorrenza_open:'pin_b_blue_open.svg',
  feature_zoom: 16,
  feature_zoom_max: 13,
  icon_dim: 20,
  icon_dimanchor1: 10,
  icon_dimanchor2: 13,
  label_zoom: 12,
  legendicon: 'noun_area_1653539_4.svg',
  maincolor: '#e50000',
  maincolor_hide: '#e5cece',
  base_color: '#ff6d00',
  fillopacity: '0.5',
  labels:{
    toc: 'Visualizza negozi chiusi',
    tab1_icon: 'fa-file-text-o',
    tab1_text_a: 'A',
    tab2_icon: 'fa-file-text-o',
    tab2_text_a: 'B',
    tab3_icon: 'fa-file-text-o',
    tab3_text_a: 'C',
    tab4_icon: 'fa-camera',
    tab4_text_a: 'Scontrino',
    tab5_icon: 'fa-camera',
    tab5_text_a: 'Insegna',
    tab6_icon: 'fa-camera',
    tab6_text_a: 'Zona',
    tool1_icon: 'fa-arrows',
    tool1_text_a: 'Sposta',
    tool2_icon: 'fa-exchange',
    tool2_text_a: 'Cambia insegna',
    tool3_icon: 'fa-trash'
  }
}

geovar.lyr.slug.push('lyr032');
geovar.lyr.lyr032={
  label:'Stamen.Toner',
  tile_url:'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png',
  lyr_update: 'fix',
  lyr_type: 'tile',
  title: 'Stamen.Toner',
  //geoserver_name: 'w01_lyr1',
  //geoserver_style: 'w01_lyr1_style',
  inToc:true,
  icon: 'emoji_circle_carto-1f1ef-1f1f5_mod-blue.png',
  zIndex:  100,
  maxZoom:  20,
  pointerEvents:false,
  it_IT: {
    attribution:'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  },
  en_GB: {
    attribution:'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  },
}

//MAP012
geovar.lyr.slug.push('lyr033'); //G13 lyr1
geovar.lyr.lyr033={
  slug: 'Census block',
  label:'Census block',
  label_single: 'Census block',
  title: 'Census block',
  title_dlg: 'Census block',
  inToc:true,
  zIndex:  200,
  lyr_update: 'on_move',//fix,on_move
  lyr_type: 'db',//virtual,wms,tile,db,static
  feat_type: 'polygon',//point,line,polygon,circle,raster,table
  icon: 'noun_area_1653539_4.svg',
  icon_client_close:'pin_a_grey_close.svg',
  icon_client_open:'pin_a_red_open.svg',
  icon_concorrenza_close:'pin_b_grey_close.svg',
  icon_concorrenza_open:'pin_b_blue_open.svg',
  feature_zoom: 22,
  feature_zoom_max: 16,
  icon_dim: 20,
  icon_dimanchor1: 10,
  icon_dimanchor2: 13,
  label_zoom: 12,
  legendicon: 'noun_area_1653539_4.svg',
  maincolor: '#e50000',
  maincolor_hide: '#e5cece',
  base_color: '#ff6d00',
  fillopacity: '0.5',
  bordercolor:'#fff',
  style:{
    style1 : {
      a01: {
        label:'Urban Living',
        icon:{
          'material':{'name':'material-asterisk','type':'svg'}
        },
        cat : [
          {slug:'cl0',label:'High',scale:0},
          {slug:'cl1',label:'Medium high',scale:0.2},
          {slug:'cl2',label:'Medium',scale:0.5},
          {slug:'cl3',label:'Medium low',scale:0.7},
          {slug:'cl4',label:'Low',scale:1}
        ],
        color : ['green','yellow']
      },
      a02: {
        label:'Tree Cover',
        icon:{
          'material':{'name':'material-asterisk','type':'svg'}
        },
        cat : [
          {slug:'cl0',label:'High',scale:0},
          {slug:'cl1',label:'Medium high',scale:0.2},
          {slug:'cl2',label:'Medium',scale:0.5},
          {slug:'cl3',label:'Medium low',scale:0.7},
          {slug:'cl4',label:'Low',scale:1}
        ],
        color : ['yellow','red']
      },
      a03: {
        label:'Leisure & Climate',
        icon:{
          'material':{'name':'material-asterisk','type':'svg'}
        },
        cat : [
          {slug:'cl0',label:'High',scale:0},
          {slug:'cl1',label:'Medium high',scale:0.2},
          {slug:'cl2',label:'Medium',scale:0.5},
          {slug:'cl3',label:'Medium low',scale:0.7},
          {slug:'cl4',label:'Low',scale:1}
        ],
        color : ['green','red']
      },
      a04: {
        label:'Health & Environment',
        icon:{
          'material':{'name':'material-asterisk','type':'svg'}
        },
        cat : [
          {slug:'cl0',label:'High',scale:0},
          {slug:'cl1',label:'Medium high',scale:0.2},
          {slug:'cl2',label:'Medium',scale:0.5},
          {slug:'cl3',label:'Medium low',scale:0.7},
          {slug:'cl4',label:'Low',scale:1}
        ],
        color : ['blue','red']
      }
    }
  }
}

//D02
geovar.lyr.slug.push('lyr034'); //--
geovar.lyr.lyr034={
  slug: 'lyr_input_googleapis_directions',
  label:'lyr_input_googleapis_directions',
  lyr_type: 'db',//virtual,wms,tile,db,static
  feat_type: 'table',//point,line,polygon,circle,raster,table
}