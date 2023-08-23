$(document).ready(function() {
  if (typeof mymap !== 'undefined') {
    map220_ready();
  }
}); //$(document).ready

function map220_ready(){
  if (f_wait.geovar_lyr==0) {
    // _onsole.log('wait')
    setTimeout(function(){map220_ready()},100);
    return;
  } else {
    prepare_map220();
  };
}

function prepare_map220(){

  // _onsole.log('invalidatesize');
  mymap.invalidateSize();

  /* let g = dMap.analisi01.grLyr;

  g.forEach(lyr => {

    prepare_map220_lyr(lyr);

  }); */

}

function prepare_map220_lyr(lyr){

  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  obj_lyr.status='off';
  obj_lyr.load=false;
  obj_lyr.visible=false;
  obj_lyr.enable=true;    
  obj_lyr.editing=false;
  obj_lyr.click=true;
  obj_lyr.query=false;

  if(obj_lyr.zindex===undefined){
    console.log(lyr+'dosen\'t "zindex" defined.');
    return;
  }

  mymap.createPane(lyr+'_pane');
  mymap.getPane(lyr+'_pane').style.zIndex = obj_lyr.zindex
}

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
  // _onsole.log('elapsed:'+elapsed);
  // _onsole.log('processed:'+processed);
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
