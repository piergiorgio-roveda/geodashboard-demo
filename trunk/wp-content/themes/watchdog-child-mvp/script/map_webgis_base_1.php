<?php
/**
 * The template part for footer of main map on front-page
 *
 * @package WordPress
 * @subpackage _underscores
 */

  $o=json_apiInfo();
  //$google_api = GOOGLE_API_SEARCH_AND_MAP;
  //$info_tracker=get_info_tracker();
  //$o['dbInfo']=get_list_pg_tables();
?>

<script src='<?php echo WP_SITEURL;?>/tmp/geovar.js?ver=<?php echo GEOLIB_VER;?>'></script>
<script>

  var geo_activate = 0;

  var dMap = new Array();
  var dataStringPost={};
  dMap.map=new Array();
  dMap.usr=new Array();
  dMap.place=new Array();
  dMap.analisi01=new Array();
  //dMap.start_lyr_visible=new Array();

  dMap.logout=0;

  dMap.apiInfo=new Array();

  //dMap.geoserver_prefix = '<?php echo GEOSERVER_PREFIX;?>';
  //dMap.geoserver_suffix = '<?php echo GEOSERVER_SUFFIX;?>';

  var dyn_functions = [];

  //license manager
  dMap.apiInfo.user_license='premium';
  dMap.apiInfo.user_token='<?php echo random_str(24);?>';

  dMap.apiInfo.usr_set=1;//'<?php echo USR_SET;?>';

  dMap.apiInfo.user_login='demo';//<?php echo $o['apiInfo']['user_login'];?>'

  var source_icon = geovar.home_project+'source/icon/';

  //start manager
  <?php 
  if(!empty($_GET['lat'])){
    ?>
    dMap.map.lat = <?php echo $_GET['lat'];?>;
    dMap.map.lng = <?php echo $_GET['lng'];?>;
    dMap.map.zoom = <?php echo $_GET['zoom'];?>;
    <?php
  }
  else{
    ?>
    dMap.map.lat = 36.2442;//lat_start;
    dMap.map.lng = 10.9863;//lng_start;
    dMap.map.zoom = 3;//zoom_start;
    <?php
  }
  ?>

  dMap['map-attribution']=label_attribution1;

  // Caricamento della mappa base
  var mymap = L.map('mapid',{
    minZoom: 1,
    maxZoom: 22,    
    zoomControl: false,
    //zoomSnap: 0.25,
    //zoomDelta: 0.25,
    //wheelPxPerZoomLevel: 50
  }).setView([dMap.map.lat, dMap.map.lng], dMap.map.zoom);

  mymap.createPane('carto_labels');
  // This pane is above markers but below popups
  mymap.getPane('carto_labels').style.zIndex = 800;
  // Layers in this pane are non-interactive and 
  //do not obscure mouse/touch events
  mymap.getPane('carto_labels').style.pointerEvents = 'none';

  var tile_btn_map01 = L.tileLayer(
    geovar.lyr.lyr1.tile_url,
    {
      attribution: tile_map01_attr,
      maxZoom: 22
    }
  ).addTo(mymap);

  var positronLabels = L.tileLayer(
    tile_map01_url_label,
    {
      attribution: tile_map01_attr,
      pane: 'carto_labels',
      maxZoom: 22
    }
  ).addTo(mymap);

  var optCluster={
    maxClusterRadius: 50,
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    clusterPane :'lyr_cluster_pane',
    iconCreateFunction: function (cluster) {

      if(cluster.__parent._group._leaflet_id==geo_lyr0._leaflet_id){
        var subclass='cluster_lyr0';
      }
      else if(cluster.__parent._group._leaflet_id==geo_lyr2._leaflet_id){
        var subclass='cluster_lyr2';
      }
      else if(cluster.__parent._group._leaflet_id==geo_lyr3._leaflet_id){
        var subclass='cluster_lyr3';
      }

      var children = cluster.getAllChildMarkers();
      var n = 0;
      for (var i = 0; i <  children.length; i++) {
        n +=  1; //children[i].number;
      }
      if(n>=1000){
        const nk = n/1000;
        n='<span class="numberM" style="font-weight:900;">' + nk + '</span>k'
      }
      myclass = 'none';
      icon_dim = 0;//50;
      icon_dimanchor1 = 0;//25;//15;
      icon_dimanchor2 = 0;//30;//15;

      return new L.DivIcon({
        html: '<div class="cluster_type1 '+subclass+'">'
            +'<span>' + n + '</span>'
          +'</div>',
        className: myclass ,
        iconSize: [icon_dim, icon_dim], // size of the icon
        iconAnchor: [icon_dimanchor1,icon_dimanchor2] // point of the icon which will correspond to marker's location
      });
    },
    chunkedLoading: true, 
    chunkProgress: updateCluster
  }

  function updateCluster(processed, total, elapsed, layersArray) {
    //_onsole.log('elapsed:'+elapsed);
    //_onsole.log('processed:'+processed);
    format_autoNumeric();
  }

  var geo_lyr2 = new L.featureGroup();//hexes
  var geo_lyr4 = new L.featureGroup();//geohash
  //var geo_lyr0 = new L.MarkerClusterGroup(optCluster);
  
</script>

