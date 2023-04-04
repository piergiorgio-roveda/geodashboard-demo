$(document).ready(function() {

  var styles = ''
    +'.cluster_type1{'  
      +'width: 50px;'
      +'height: 50px;'
      //+'background: url(https://cityplanner.biz/source/icon/px20_noun-spray-1518874-Spray-CreaticcaCreative%20Agency-NounProject-mod.png) 0 0;'
      +'background-color:black;'
      +'border:2px solid white;'
    +'}'
  +'';
  var styleSheet = document.createElement("style");
  styleSheet.setAttribute('tag', 'style MarkerCluster lyr045');
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

}); //$(document).ready

function marker_cluster_custom(lyr){

  //_onsole.log(lyr);
  //_onsole.log(g_meta.geovar_lyr);
  let obj_lyr=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === lyr);
  let cluster_style = obj_lyr[0].properties.cluster_style;

  if(cluster_style=='type1'){

    var cluster_options = {
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      clusterPane :lyr+'_pane',
      iconCreateFunction: function (cluster) {
        var children = cluster.getAllChildMarkers();
        var n = 0;
        for (var i = 0; i <  children.length; i++) {
          n +=  1; //children[i].number;
        }

        myclass = 'cluster_type1 cluster_type1_a';//'mycluster_client_point_clientiservizi';

        if(n>999){
          n = '<i class="fa fa-plus" aria-hidden="true"></i>1k';
        }

        return new L.DivIcon({
          html: '<span>' + n + '</span><i class="fa fa-floppy" aria-hidden="true"></i>',
          //html: '<span>' + n + '</span>',
          className: myclass ,
          iconSize: null/*,
          iconAnchor:[40,40]*/
        });
      }
    }

  }
  else{

    //_onsole.log('cluster_options default')
    var cluster_options = {
      spiderfyOnMaxZoom: false,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: false,
      clusterPane :lyr+'_pane'
      //chunkedLoading: true,
      //singleMarkerMode: true,
      //spiderfyOnMaxZoom: false,
      //zoomAnimation : false
    }

  }

  return cluster_options;

}

