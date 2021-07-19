<?php
  //$o=json_apiInfo();
  //$google_api = GOOGLE_API_SEARCH_AND_MAP;
  //$info_tracker=get_info_tracker();
?>

<script>

  $(document).ready(function() {

    console.log('Ready-7!');

  }); //$(document).ready

  //all lyr for feature group
  dMap.analisi01.grLyr=[
    //'lyr0',
    'lyr1',
    'lyr2',
    'lyr4',
  ];

  //all lyr (in order) for TOC
  dMap.analisi01.grLyrToc=[
    'lyr2',
    'lyr4',
  ];  

  //all WMS lyr
  dMap.analisi01.grWms=[
    /*'lyr1',*/
  ];

  //all exclusive lyr
  dMap.analisi01.grTheme=[
    /*'lyr1',*/
  ];

  //var geo_lyr0 = new L.MarkerClusterGroup(optCluster);
  //var geo_lyr0_label = new L.featureGroup();
  //var geo_lyr1 = new L.featureGroup();

  //mymap.createPane('lyr_cluster_pane');
  //mymap.getPane('lyr_cluster_pane').style.zIndex = 825;

  //mymap.createPane('lyr0_pane');
  //mymap.getPane('lyr0_pane').style.zIndex = 825;

  //mymap.createPane('lyr1_pane');
  //mymap.getPane('lyr1_pane').style.zIndex = 600;

  var g = dMap.analisi01.grLyr;
  $.each(g,function(i, lyr){
    dMap.analisi01[lyr]=new Array();
    dMap.analisi01[lyr]['status']='off';
    dMap.analisi01[lyr]['visible']=false;
    dMap.analisi01[lyr]['enable']=true;    
    dMap.analisi01[lyr]['editing']=false;
    dMap.analisi01[lyr]['click']=true;
  });

  /*
  var g = dMap.analisi01.grLyrToc;
  $.each(g,function(i, lyr){
    //_onsole.log(i)
    //_onsole.log(lyr)
    //_onsole.log(dMap.start_lyr_visible[i])
    if(dMap.start_lyr_visible[i]==true){
      //_onsole.log('set '+lyr+' true')
      dMap.analisi01[lyr]['visible']=true;
      //dMap.analisi01['lyr4']['visible']
    }
    else{
      //_console.log('set '+lyr+' false')
      dMap.analisi01[lyr]['visible']=false;
    }
    //_onsole.log(dMap.analisi01[lyr])
  });
  */
  //dMap.analisi01.lyr0.style='default';

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

  var createLabelIcon = function(etichetta,myclass,nLabel,anchorLabel){
    return L.divIcon({
      className: myclass,
      html: '<span class="'+ nLabel + '">'+etichetta+'</span>' ,
      iconSize: null,
      iconAnchor:[-19,43]
    })
  }

</script>