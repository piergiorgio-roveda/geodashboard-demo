var a249_mapReady = 0;

var a249_subScript = [
  'addon249-col-2'
];

dyn_functions['addon249-geoaesthetic1'+'_ready'] = function(){

  //-- ADD SUB SCRIPT
  let subScript = a249_subScript;

  subScript.forEach(element => {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    let url=THEME_PROJECT+'/src/js/'+element+'.js?ver='+VER;
    script.src = url;   
    document.head.appendChild(script);
  });  

  mymap.createPane('cliccabile');
  mymap.getPane('cliccabile').style.zIndex = 150;
  mymap.createPane('nonclic');
  mymap.createPane('nonclic').style.zIndex = 100;
  mymap.createPane('edifici3d');
  mymap.getPane('edifici3d').style.zIndex = 200;
  mymap.getPane('edifici3d').style.pointerEvents = 'none';
  mymap.createPane('simboli');
  mymap.getPane('simboli').style.zIndex = 200;

  var CartoDB_VoyagerNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',

    maxZoom: 18
  });//.addTo(mymap);

  var CartoDB_PositronNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 18
  });

  var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  var esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  });

  ///catasto
  proj4.defs("WGS84", "+proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees");

  proj4.defs("EPSG:6706", "+proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs");
  //ora layer catasto:
  L.TileLayer.Catasto = L.TileLayer.extend({
    getTileUrl: function (coords) {
      return "https://wms.cartografia.agenziaentrate.gov.it/inspire/wms/ows01.php?language=ita&service=WMS&version=1.3.0&request=GetMap&bbox=" + bbox(coords.x, coords.y, coords.z) + "&crs=EPSG:6706&width=256&height=256&layers=province,CP.CadastralZoning,acque,CP.CadastralParcel,fabbricati,codice_plla,simbolo_graffa&styles=default&format=image/png&DPI=96&map_resolution=96&format_options=dpi:96&transparent=true"
    },
    getAttribution: function () {
      return "<a href='https://www.agenziaentrate.gov.it/portale/it/web/guest/schede/fabbricatiterreni/consultazione-cartografia-catastale/servizio-consultazione-cartografia'>Agenzie delle Entrate</a>"
    }
  });

  L.tileLayer.Catasto = function () {
    return new L.TileLayer.Catasto();
  }

  catasto = L.tileLayer.Catasto();

  var base = L.tileLayer('');

  var baseMaps = {
    "CARTO DB VOYAGER": CartoDB_VoyagerNoLabels,
    "CARTO DB POSITRON": CartoDB_PositronNoLabels,
    "OpenStreetMap": osm,
    "Esri map": esri,
    "Catasto": catasto,
    "None": base,

    // 'Esri TopoMap': Esri_WorldTopoMap,
    //'Plain': Stadia_AlidadeSmooth,
  };

  var layerControl = L.control.layers(baseMaps).addTo(mymap);
  var measureControl = L.control.measure().addTo(mymap);

  geo_lyr['milanocivici'] = new L.featureGroup();
  geo_lyr['edificiomi'] = new L.featureGroup();
  geo_lyr['parcheggi'] = new L.featureGroup();
  geo_lyr['ristori'] = new L.featureGroup();
  geo_lyr['civici'] = new L.featureGroup();
  geo_lyr['caselli'] = new L.featureGroup();
  geo_lyr['aree'] = new L.featureGroup();
  geo_lyr['istat'] = new L.featureGroup();

  ///civici pallini
  var civicilabels = L.tileLayer('https://api.mapbox.com/styles/v1/admincityplanner/clbp1tuuc000e14oe5qjqopb7/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWRtaW5zdHVkaW9zaXQiLCJhIjoiY2xieXRxdHZvMDh6cDNvbXptMWY0ZHF2ZCJ9.tfhfTuRe-3-STkYzpuhxJg', {
    tileSize: 512,
    zoomOffset: -1,
    pane: 'edifici3d',
    attribution: '© <a href="https://www.mapbox.com/contribute/">Mapbox</a>'
  }).addTo(mymap)


  ///Edifici con colore diverso
  // var edificilabels = L.tileLayer('https://api.mapbox.com/styles/v1/admincityplanner/clboya8pl000d14lobr1lhbyv/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWRtaW5zdHVkaW9zaXQiLCJhIjoiY2xieXRxdHZvMDh6cDNvbXptMWY0ZHF2ZCJ9.tfhfTuRe-3-STkYzpuhxJg', {
  //   tileSize: 512,
  //   zoomOffset: -1,
  //   pane: 'edifici3d',
  //   attribution: '© <a href="https://www.mapbox.com/contribute/">Mapbox</a>'
  // }).addTo(mymap)

  a249_mapReady = 1;

}

setInterval(
  function () {

    if (a249_mapReady == 1) {

      if (geoa_verify_lyr_map_zoom_and_coords() == 'different') {
        sessionStorage.map_lat = mymap.getCenter().lat.toFixed(3);
        sessionStorage.map_lng = mymap.getCenter().lng.toFixed(3);
        sessionStorage.map_zoom = mymap.getZoom();
        f_wait.mymap = 0;
        geoa_prepare_discover('milanocivici');
        geoa_prepare_discover('edificiomi');
        geoa_prepare_discover('parcheggi');
        geoa_prepare_discover('ristori');
        geoa_prepare_discover('caselli');
        geoa_prepare_discover('civici');
        geoa_prepare_discover('aree');
        geoa_prepare_discover('istat');
        prepare_discover();
      }

    }
  },
  500
);

function geoa_verify_lyr_map_zoom_and_coords(){

  let map_lat=sessionStorage.map_lat;
  let map_lng=sessionStorage.map_lng;
  let map_zoom=sessionStorage.map_zoom;

  let c = mymap.getCenter();

  if(map_lat==c.lat.toFixed(3)
    && map_lng==c.lng.toFixed(3)
    && map_zoom==mymap.getZoom()){
    var string='same';
  }
  else{
    var string='different';
  }
  // _onsole.log('verify_lyr_map_zoom_and_coords:'+string);
  return string;
}

//funzione civici
function geoa_prepare_discover(itemLyr) {

  mymap.removeLayer(geo_lyr[itemLyr]);
  geo_lyr[itemLyr].clearLayers();

  let current_zoom = mymap.getZoom();

  if (current_zoom < 15) {
    f_wait.mymap = 1;
    return;
  }

  let b = mymap.getBounds();
  let E = b.getEast();//-0.05;
  let W = b.getWest();//+0.05;
  let N = b.getNorth();//-0.03;
  let S = b.getSouth();//+0.03;

  let ext_lat = Math.abs(S - N) / 2;
  let ext_lng = Math.abs(E - W) / 2;

  var dataString = {
    fn_group:'geodata',
    action:'view_data',
    collection:'lyr_all_dbgeoa',
    qy_name:'A',
    lyr:itemLyr,
    layer:itemLyr,
    current_zoom: current_zoom,
    mye: E + ext_lng,
    myw: W - ext_lng,
    myn: N + ext_lat,
    mys: S - ext_lat,
    min_e: E,
    min_w: W,
    min_n: N,
    min_s: S
  };

  generic_api(dataString, 'geoa_switch_on_lyr_'+itemLyr);

}

dyn_functions['succ_geoa_switch_on_lyr_'+'milanocivici'] = function (r) {

  let lyr = r.ds.lyr;

  f_wait.mymap = 1;

  let geojson = L.geoJson(r, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        color: '#98e79b',
        weight: 0,
        fillOpacity: 0,
        pane: 'cliccabile',
      });
    },
    onEachFeature: function (feature, layer) {
      var popupmilano = '';
      var m = layer.feature.properties;
      milanoCol.features.forEach(element => {
        if (m[element.col]) {
          if (element.format != undefined) {
            var mylabel = '<b><span class="titolopunti">' + element.label + '</b></span>';
          }
          else {
            var mylabel = element.label;
          }

          if (element.formatValue != undefined) {
            var myvalue = '<b><span class="titolopunti">' + m[element.col] + '</b></span>' + '</br>';
          }
          else {
            var myvalue = m[element.col] + '</br>';
          }

          popupmilano += mylabel + myvalue
        }
      });
      layer.bindTooltip(popupmilano, {
        className: 'tooltip-2'
      })
    }
  });

  geo_lyr[lyr].addLayer(geojson);

  // FINAL ADD!
  geo_lyr[lyr].addTo(mymap);


  sessionStorage.milanocivici_lat = mymap.getCenter().lat.toFixed(3);
  sessionStorage.milanocivici_lng = mymap.getCenter().lng.toFixed(3);
  sessionStorage.milanocivici_zoom = mymap.getZoom();

}

dyn_functions['succ_geoa_switch_on_lyr_'+'edificiomi'] = function (r) {

  let lyr = r.ds.lyr;

  f_wait.mymap = 1;

  let geojson = L.geoJson(r, {
    onEachFeature: function (feature, layer) {
      var popupedificato = '';
      var e = layer.feature.properties
      pgCol.features.forEach(element => {
        if (e[element.col]) {
          popupedificato += '<b> <span class="titolopunti">' + element.label + '</b></span>' + e[element.col] + '<br />'
        }
      });
      layer.bindTooltip(popupedificato, {
        className: 'tooltip-3',
      })
    },
      style: {
      color: "#00D7EF",
      weight: 0,
      fillOpacity: 0,
      pane: 'cliccabile',
    }
  });

  geo_lyr[lyr].addLayer(geojson);

  // FINAL ADD!
  geo_lyr[lyr].addTo(mymap);


  sessionStorage.edificiomi_lat = mymap.getCenter().lat.toFixed(3);
  sessionStorage.edificiomi_lng = mymap.getCenter().lng.toFixed(3);
  sessionStorage.edificiomi_zoom = mymap.getZoom();

} 

dyn_functions['succ_geoa_switch_on_lyr_'+'parcheggi'] = function (r) {

  let lyr = r.ds.lyr;

  f_wait.mymap = 1;

  let geojson = L.geoJson(r, {
    pointToLayer: function (feature, latlng) {
      var myIcon2 = L.icon({
        iconUrl: SOURCE_PATH+'icon/geoaesthetic/'+'park.png',
        iconSize: [20, 20]
      })
      return L.marker(latlng, {
        icon: myIcon2,
        pane: 'simboli',
      });
    },
    onEachFeature: function (feature, layer) {
      var parktesto = '';
      var p = layer.feature.properties;
      parcheggiCol.features.forEach(element => {
        if (p[element.col]) {
          parktesto += '<b> <span class="titolopunti">' + element.label + '</b> </span>' + p[element.col] + '<br />'
        }
      });
      layer.bindTooltip(parktesto, {
        className: 'tooltip-6',
      })
    }
  });

  geo_lyr[lyr].addLayer(geojson);

  // FINAL ADD!
  geo_lyr[lyr].addTo(mymap);


  sessionStorage.parcheggi_lat = mymap.getCenter().lat.toFixed(3);
  sessionStorage.parcheggi_lng = mymap.getCenter().lng.toFixed(3);
  sessionStorage.parcheggi_zoom = mymap.getZoom();

}

dyn_functions['succ_geoa_switch_on_lyr_'+'ristori'] = function (r) {

  let lyr = r.ds.lyr;

  f_wait.mymap = 1;

  let geojson = L.geoJson(r, {
    pointToLayer: function (feature, latlng) {
      var myIcon2 = L.icon({
        iconUrl: SOURCE_PATH+'icon/geoaesthetic/'+'ristoro.png',
        iconSize: [20, 20]
      })
      return L.marker(latlng, {
        icon: myIcon2,
        pane: 'simboli',
      });
    },
    onEachFeature: function (feature, layer) {
      var ristoritesto = '';
      var p = layer.feature.properties;
      ristoriCol.features.forEach(element => {
        if (p[element.col]) {
          ristoritesto += '<b> <span class="titolopunti">' + element.label + '</b> </span>' + p[element.col] + '<br />'
        }
      });
      layer.bindTooltip(ristoritesto, {
        className: 'tooltip-6',
      })
    }
  });

  geo_lyr[lyr].addLayer(geojson);

  // FINAL ADD!
  geo_lyr[lyr].addTo(mymap);


  sessionStorage.ristori_lat = mymap.getCenter().lat.toFixed(3);
  sessionStorage.ristori_lng = mymap.getCenter().lng.toFixed(3);
  sessionStorage.ristori_zoom = mymap.getZoom();

}

dyn_functions['succ_geoa_switch_on_lyr_'+'caselli'] = function (r) {

  let lyr = r.ds.lyr;

  f_wait.mymap = 1;

  let geojson = L.geoJson(r, {
    pointToLayer: function (feature, latlng) {
      var myIcon2 = L.icon({
        iconUrl: SOURCE_PATH+'icon/geoaesthetic/'+'casello.png',
        iconSize: [20, 20]
      })
      return L.marker(latlng, {
        icon: myIcon2,
        pane: 'simboli',
      });
    },
    onEachFeature: function (feature, layer) {
      var casellitesto = '';
      var p = layer.feature.properties;
      caselliCol.features.forEach(element => {
        if (p[element.col]) {
          casellitesto += '<b> <span class="titolopunti">' + element.label + '</b> </span>' + p[element.col] + '<br />'
        }
      });
      layer.bindTooltip(casellitesto, {
        className: 'tooltip-6',
      })
    }
  });

  geo_lyr[lyr].addLayer(geojson);

  // FINAL ADD!
  geo_lyr[lyr].addTo(mymap);

  sessionStorage.caselli_lat = mymap.getCenter().lat.toFixed(3);
  sessionStorage.caselli_lng = mymap.getCenter().lng.toFixed(3);
  sessionStorage.caselli_zoom = mymap.getZoom();

}

dyn_functions['succ_geoa_switch_on_lyr_'+'civici'] = function (r) {

  let lyr = r.ds.lyr;

  f_wait.mymap = 1;

  let geojson = L.geoJson(r, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        color: '#FF00FF',
        weight: 0,
        fillOpacity: 0,
        pane: 'cliccabile',
      });
    },
    onEachFeature: function (feature, layer) {
      var civicitesto = '';
      var m = layer.feature.properties;
      civiciCol.features.forEach(element => {
        if (m[element.col]) {
          if (element.formatValue != undefined) {
            var myvalue = '<b> <span class="titolopunti">' + m[element.col] + '</b> </span>' + '</br>';
          }
          else {
            var myvalue = m[element.col] + ' ';
          }

          civicitesto += myvalue
        }
      });
      layer.bindTooltip(civicitesto, {
        className: 'tooltip-2',
      })
    }
  });

  geo_lyr[lyr].addLayer(geojson);

  // FINAL ADD!
  geo_lyr[lyr].addTo(mymap);

  sessionStorage.civici_lat = mymap.getCenter().lat.toFixed(3);
  sessionStorage.civici_lng = mymap.getCenter().lng.toFixed(3);
  sessionStorage.civici_zoom = mymap.getZoom();

}

dyn_functions['succ_geoa_switch_on_lyr_'+'aree'] = function (r) {

  let lyr = r.ds.lyr;

  f_wait.mymap = 1;

  let geojson = L.geoJson(r, {
    onEachFeature: function (feature, layer) {
      var areetesto = '';
      var e = layer.feature.properties
      areeCol.features.forEach(element => {
        //console.log(element);
        if (e[element.col]) {

          if (element.format != undefined) {
            var mylabel = '<b>' + element.label + '</b>';
          }
          else {
            var mylabel = element.label;
          }

          if (element.formatValue != undefined) {
            var myvalue = '<b> <span class="titolopunti">' + e[element.col] + '</b></span>';
          }
          else {
            var myvalue = e[element.col];
          }

          areetesto += mylabel + myvalue + '<br />'
        }
      });
      layer.bindTooltip(areetesto, {
        className: 'tooltip-5',
      })
    },
    style: {
      color: "#FBCEB1",
      weight: 0,
      fillOpacity: 0
    }
  });

  geo_lyr[lyr].addLayer(geojson);

  // FINAL ADD!
  geo_lyr[lyr].addTo(mymap);

  sessionStorage.aree_lat = mymap.getCenter().lat.toFixed(3);
  sessionStorage.aree_lng = mymap.getCenter().lng.toFixed(3);
  sessionStorage.aree_zoom = mymap.getZoom();

}

dyn_functions['succ_geoa_switch_on_lyr_'+''] = function (r) {

  let lyr = r.ds.lyr;

  f_wait.mymap = 1;

  let geojson = L.geoJson(r, {
    onEachFeature: function (feature, layer) {
      var istatpopup = '';
      var i = layer.feature.properties
      istatCol.features.forEach(element => {
        if (i[element.col]) {
          if (element.format != undefined) {
            var mylabel = '<b>' + element.label + '</b>';
          }
          else {
            var mylabel = element.label;
          }

          if (element.formatValue != undefined) {
            var myvalue = '<b><span class="titolopunti">' + i[element.col] + '</b></span>' + '</br>';
          }
          else {
            var myvalue = i[element.col] + '</br>';
          }

          istatpopup += mylabel + myvalue
        }
      });
      layer.bindTooltip(istatpopup, {
        className: 'tooltip-4',
      })
    },
    style: {
      color: "#c0c0c0",
      weight: 1,
      fillOpacity: 0,
      pane: 'nonclic'
    }
  });

  geo_lyr[lyr].addLayer(geojson);

  // FINAL ADD!
  geo_lyr[lyr].addTo(mymap);

  sessionStorage.istat_lat = mymap.getCenter().lat.toFixed(3);
  sessionStorage.istat_lng = mymap.getCenter().lng.toFixed(3);
  sessionStorage.istat_zoom = mymap.getZoom();

} //succ_geoa_switch_on_lyr_b


//conversione catasto
function bbox(x, y, z) {
  bl_lng = tile2long(x, z);
  tr_lng = tile2long((x + 1), z);
  bl_lat = tile2lat(y + 1, z);
  tr_lat = tile2lat((y), z);
  bl = proj4("WGS84", "EPSG:6706", [bl_lng, bl_lat]);
  tr = proj4("WGS84", "EPSG:6706", [tr_lng, tr_lat]);
  return bl[1] + "," + bl[0] + "," + tr[1] + "," + tr[0];
}

function tile2long(x, z) {
  return (x / Math.pow(2, z) * 360 - 180);
}

function tile2lat(y, z) {
  var n = Math.PI - 2 * Math.PI * y / Math.pow(2, z);
  return (180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))));
}