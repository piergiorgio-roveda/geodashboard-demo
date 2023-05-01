//--
/*
- Inizialize: a254_inizialize()
  - prepare_a254() create layer and style
  - await
    - a254_start_1('a254_session_token') set 0,0
    - a254_seqAllNodes() 
        - generic_api_v2 > a254_seqAllNodes
        - api success
          - set a254_seqLastFeat
          - set a254_seqList
          - set SStor.a254_seqCurr
          - set a254_seqReady
          x a254_userLocationPin()
            x 0,0 a254_showPin()
            x a254_update_seqList_checked()
              ? a254_CatTailNodes=0
              ? lat=0 lng=0
              - return
    - a254_getCatTail 
      - generic_api_v2 > a254_getCatTail
      - api success
        - collect a254_CatTailNodes if not 0
  - await done
    - a254_getLocation()
      - a254_userLocationPrepare()
        - fixed 8
          - set lat,lng (also last)
          - collect CatTailNodes
          - a254_showPin()
          - a254_showCatTail()
          - a254_showHurryUp()
        - fixed 5
          - collect GpsCollection
          - if(a254_GpsCollection.length>25)
            - a254_userLocationRegister()
          - searchNextSeq()
  - update Seq
  - update Direction
  - searchNextSeq()
    - require sessionStorage.a254_seqCurr // set at Start
    - require a254_seqList // set at Start
    - require a254_seqCheckedList (it can be 0)
    - if seq is not checked
      - a254_userGetDirectionToSeq()
        - require sessionStorage.a254_mapLatCurr 
        - require sessionStorage.a254_mapLngCurr
        - sessionStorage.a254_seqCurr
        - (if SStor.a254_mapLatCurr not 0)
*/  
//--
var a254_mapReady = 0;
//--
const a254_slug='a254_RoutingStepByStepUser';
sessionStorage.a254_seqCurr=0;
sessionStorage.fakeGPS_seq=0;
//--

var a254_seqReady = 0;
var a254_seqList = [];
var a254_seqCheckedList = [];

var a254_baseGraphReady = 0;

var a254_seqLastFeat = new Array();
var a254_directionLastFeat = new Array();

var a254_zoomOptimal = 19;

sessionStorage.a254_mapLatLast8 = 0;
sessionStorage.a254_mapLngLast8 = 0;
sessionStorage.a254_mapLatLast5 = 0;
sessionStorage.a254_mapLngLast5 = 0;
sessionStorage.a254_mapLatCurr = 0;
sessionStorage.a254_mapLngCurr = 0;
sessionStorage.a254_directionLatCurr = 0;
sessionStorage.a254_directionLngCurr = 0;
sessionStorage.a254_directionFromNodeLat = 0;
sessionStorage.a254_directionFromNodeLng = 0;

sessionStorage.a254_data_e = 0;
sessionStorage.a254_data_w = 0;
sessionStorage.a254_data_n = 0;
sessionStorage.a254_data_s = 0;

var a254_fakeGPS = [];
var a254_lyrSeqNodes = '';
var a254_lyrGraph = '';
var a254_lyrGraphVector = '';
var a254_liveNavigation = 'tomtom';

var a254_CatTailNodes = [];
var a254_GpsCollection = [];

var a254_options = {
  enableHighAccuracy: true,
  timeout: 500,
  maximumAge: 0,
};

var a254_devMode = 0;
var a254_showProgress = 0;

var a254_map_token = '';
var a254_session_token = '';
var a254_project_token = '';
var a254_user_token = '';
// var polyline1 = new Array();

geo_lyr['seqDirectionA'] = L.marker();
// var ptClosest = L.marker();
geo_lyr['markerClosestPolyline1'] = L.marker();
geo_lyr['markerRadius'] = L.marker();

var nodess = {};
// let value = localStorage.getItem('user_token');
// if(value === null){

//   alert('You need to login to use this feature');

// }

setInterval(
  function() {

    if(a254_devMode==1){

      if(sessionStorage.fakeGPS_seq==0){
      }
      else{
        a254_getLocationDev();
      }
        
    }
    if(a254_mapReady==1){
      a254_lyr_display();
    }
    
  },
  100
);

function a254_lyr_display(){
  let current_zoom = mymap.getZoom();
  if(current_zoom < 17 ){
    $('.leaflet-a254_seqNodes_pane-pane').css('display','none');
    $('.leaflet-rPoints1-pane').css('display','none');
    $('.leaflet-rPoints2-pane').css('display','none');
    $('.leaflet-rPoints3-pane').css('display','none');
  }
  else{
    $('.leaflet-a254_seqNodes_pane-pane').css('display','block');
    $('.leaflet-rPoints1-pane').css('display','block');
    $('.leaflet-rPoints2-pane').css('display','block');
    $('.leaflet-rPoints3-pane').css('display','block');
  }
}

function a254_showDevCommands() {
  if(a254_devMode==0){
    console.warn('To enter in dev mode type','a254_devMode=1');
  }
  else{
    console.warn('To exit from dev mode type','a254_devMode=0');
    console.log('To get next location type','sessionStorage.fakeGPS_seq++;');
    console.log('To get prev location type','sessionStorage.fakeGPS_seq--;');
  }
  return;
}

dyn_functions['addon254-routing-step-by-step-user'+'_ready'] = function(){

  // if(g_meta.geovar_user.features[0].properties.user_id==0){
  //   window.open(HOME_PROJECT+'/wp-login.php?redirect_to='+window.location.href+'&reauth=1','_self');
  //   return;
  // }

  //search layer onStart
  g_ds = {
    geovar:"obj_maps",//obj_maps
    slug:MAPSLUG,//filter
    type:'single_object'//,//'item' or 'single_object' or 'full_object'
  }
  let objItem = get_geovar_obj(g_ds);

  a254_map_token = objItem.item_token;

  //test = objItem.g_addon
  g_ds = {
    geovar:objItem.g_addon,//obj_maps
    filter_field:'addon',
    slug:'a254',//filter
    type:'single_object',//'item' or 'single_object' or 'full_object'
    noproperties:true
  }
  let objAddon = get_geovar_obj(g_ds);
  // onsole.log('objAddon',objAddon);

  // a254_fakeGPS = objAddon.fakeGPS;
  a254_lyrSeqNodes = objAddon.lyrSeqNodes;
  a254_lyrGraph = objAddon.lyrGraph;
  a254_lyrGraphVector = objAddon.lyrGraphVector;

  if(objAddon.liveNavigation != undefined){
    a254_liveNavigation = objAddon.liveNavigation;
  }

  // onsole.log('a254_liveNavigation',a254_liveNavigation);
  // onsole.log('a254_fakeGPS',a254_fakeGPS);

  a254_inizialize();

}

async function a254_inizialize() {

  prepare_a254();

  await Promise.all([
    a254_start_session(),
    a254_projectToken(),
    a254_seqAllNodes()
  ]);

  await new Promise(resolve => setTimeout(resolve, 1));

  await Promise.all([
    a254_getCatTail(),
    a254_baseGraph(),
    a254_sessionGraph()
  ]);

  await new Promise(resolve => setTimeout(resolve, 1000));

  a254_mapReady = 1;

  console.clear();
  console.log("To enter dev mode, type a254_showDevCommands()");
  // onsole.log("Rotation:",m211_rotation);
  //a254_seqAllNodes();
  a254_getLocation();

  if(m211_rotation=='enabled'){

    // tile index: 200

    mymap.getPane('rPoints1Pane').style.zIndex = 501; // back
    mymap.getPane('rPoints2Pane').style.zIndex = 502;
    mymap.getPane('rPoints3Pane').style.zIndex = 503; // front

    mymap.getPane('rLines1Pane').style.zIndex = 401; // back
    mymap.getPane('rLines2Pane').style.zIndex = 402;
    mymap.getPane('rLines3Pane').style.zIndex = 403; // front

    mymap.getPane('rPolygons1Pane').style.zIndex = 201; // back
    mymap.getPane('rPolygons2Pane').style.zIndex = 202;
    mymap.getPane('rPolygons3Pane').style.zIndex = 203; // front

  }

}

async function a254_start_session() {

  await new Promise(resolve => setTimeout(resolve, 1));

  let value = localStorage.getItem('a254_session_token');

  // onsole.log('start_1');

  if(value === null){

    // onsole.log('session is null');
    let myData = {} //{ name: 'John Doe', age: 30 };
    let myUrl = HOME_PROJECT+'/script/sld/?sub=get_token';
    let json = await a254_postGetSessionToken(myUrl, myData);
    localStorage.setItem('a254_session_token', json["new token"]);
    // value = sessionStorage.getItem(key);
    // onsole.log(json);  
    sessionStorage.a254_mapLatLast8 = 0;
    sessionStorage.a254_mapLngLast8 = 0;
    
    sessionStorage.a254_mapLngCurr = 0;
    sessionStorage.a254_mapLatCurr = 0;

    a254_CatTailNodes = [];
    geo_lyr['a254_route_CatTail'].clearLayers();

  } 

  let tmp_session_token = localStorage.getItem('a254_session_token');

  if(window.location.href.includes('?session_token=')){
    if(window.location.href.includes(tmp_session_token)){

    }
    else{
      let session_token = window.location.href.split('?session_token=')[1];
      // window.open(url+'?session_token='+a254_session_token,"_self");
      localStorage.setItem('a254_session_token', session_token);
    }
  }
  else{
    window.open(window.location.href+'?session_token='+tmp_session_token,"_self");
  }

  a254_session_token = localStorage.getItem('a254_session_token');

  //--

  value = localStorage.getItem('user_token');
  if(value === null){
    a254_user_token = '835793ede8ce0f3db290e63acbb2da09';
  }
  else{
    a254_user_token = localStorage.user_token;
  }

  // a254_sessionGraph();

}

async function a254_sessionGraph() {

  let datastring = {
    fn_group:'geodata',
    action:'view_data',
    collection:'a254_sessionGraph',
    qy_name:'A',
    lyr:'lyr999',
    lyrSeqNodes:a254_lyrSeqNodes,
    lyrGraph:a254_lyrGraph,
    geom:1,
    session_token:a254_session_token,
    project_token:a254_project_token, // MAPSLUG
    user_token:a254_user_token
  }

  let r = await generic_api_v2(datastring,'a254_sessionGraph');

}

async function a254_projectToken() {

  let datastring = {
    fn_group:'geodata',
    action:'view_data',
    collection:'a254_projectToken',
    qy_name:'A',
    lyr:'lyr999',
    map_token:a254_map_token   
  } 
  //let r = await a254_seqAllNodes(myUrl);
  let r = await generic_api_v2(datastring,'a254_projectToken');
  // onsole.log(r);

  a254_project_token = r.features[0].properties.item_token;

}

async function a254_seqAllNodes() {

  await new Promise(resolve => setTimeout(resolve, 1));

  // onsole.log('start_2');

  let datastring = {
    fn_group:'geodata',
    action:'view_data',
    collection:'a254_seqAllNodes',
    qy_name:'A',
    lyr:a254_lyrSeqNodes,
    geom:1
  } 
  //let r = await a254_seqAllNodes(myUrl);
  let r = await generic_api_v2(datastring,'a254_seqAllNodes');
  
  //--

  a254_seqLastFeat=r.features;

  a254_seqLastFeat.forEach(element => {
    let p = element.properties;
    a254_seqList.push( p.seq );
  });

  sessionStorage.a254_seqCurr=a254_seqLastFeat[0].properties.seq;
  //goTo_a254_next(sessionStorage.a254_seqCurr);

  a254_seqReady = 1;

  let item_lyr = 'a254_seqNodes';
  nodess = r;
  geo_lyr[item_lyr].clearLayers();
  // onsole.log('rCatTail',rCatTail)
  let geojson = L.geoJSON(r,{
    pointToLayer: geo_lyr_style[item_lyr],
  });
  geo_lyr[item_lyr].addLayer(geojson);
  geo_lyr[item_lyr].addTo(mymap);  

  return

}

async function a254_getCatTail(){
  let datastring = {
    call_type:'silent',
    fn_group:'geodata',
    action:'view_data',
    collection:'a254_getCatTail',
    qy_name:'A',
    lyr:'lyr999',
    lyrSeqNodes:a254_lyrSeqNodes,
    lyrGraph:a254_lyrGraph,
    geom:1,
    session_token:a254_session_token,
    project_token:a254_project_token, // MAPSLUG
    user_token:a254_user_token 
  };
  let r = await generic_api_v2(datastring,'a254_getCatTail');
  
  //--

  a254_CatTailNodes = [];
  a254_seqCheckedList = [];

  if(r.features.length!=0){
    r.features.forEach(element => {
      let p = element.properties;
      a254_CatTailNodes.push([
        parseFloat(p.lng),
        parseFloat(p.lat)
      ]);
      
    });
  }

  if(r.features_seq){
    if(r.features_seq.length!=0){
      r.features_seq.forEach(element => {
        let p = element.properties;

        if( parseInt(p.seq) > 0 ){
          a254_seqCheckedList.push( parseInt(p.seq) );
        }
        
      });
    }  
  }
}

async function a254_baseGraph(){

  a254_baseGraphReady = 0;

  let map_b = mymap.getBounds();
  // let map_c = mymap.getCenter();

  sessionStorage.a254_data_e = map_b.getEast() + ((map_b.getEast()-map_b.getWest())*0.25);
  sessionStorage.a254_data_w = map_b.getWest() - ((map_b.getEast()-map_b.getWest())*0.25);
  sessionStorage.a254_data_n = map_b.getNorth() + ((map_b.getNorth()-map_b.getSouth())*0.25);
  sessionStorage.a254_data_s = map_b.getSouth() - ((map_b.getNorth()-map_b.getSouth())*0.25);

  let datastring = {
    call_type:'silent',
    fn_group:'geodata',
    action:'view_data',
    collection:'lyr_all_outer',
    qy_name:'A',
    lyr:a254_lyrGraphVector,
    geom:1,
    current_zoom:mymap.getZoom(),
    mye:map_b.getEast(),
    myw:map_b.getWest(),
    myn:map_b.getNorth(),
    mys:map_b.getSouth(),
    data_e:sessionStorage.a254_data_e,
    data_w:sessionStorage.a254_data_w,
    data_n:sessionStorage.a254_data_n,
    data_s:sessionStorage.a254_data_s,    
  };

  if(mymap.getZoom() > 17){
    //let r = await a254_seqAllNodes(myUrl);
    let r = await generic_api_v2(datastring,'a254_baseGraph');
    // onsole.log(r);

    // var llPolyline1 = [];
    // r.features.forEach(element => {
    //   let coords = element.geometry.coordinates;
    //   coords.forEach(element => {
    //     llPolyline1.push([element[1],element[0]]);
    //   });
    // });  
    lyr = 'baseGraph';//hurry up
    mymap.removeLayer(geo_lyr[lyr]);
    geo_lyr[lyr].clearLayers();   
    // let polyline1 = L.polyline(llPolyline1, {color: 'blue', className: 'polyline1'}).addTo(mymap);

    let pane = lyr+'_pane';
    if(m211_rotation=='enabled'){
      pane='rLines1Pane';
    }

    if(r.features.length!=0){
      geo_lyr[lyr] = L.geoJson(r,{
        onEachFeature: geo_lyr_style[lyr],
        pane:pane
      }).addTo(mymap);
      a254_baseGraphReady = 1;
    } 

  }
  else{

    console.log('zoom too low for _baseGraph');
   
  }

}

async function a254_missingGraph(){

  let datastring = {
    call_type:'silent',
    fn_group:'geodata',
    action:'view_data',
    collection:'a254_missingGraph',
    qy_name:'A',
    geom:1,
    lyrVGraph:a254_lyrGraphVector,
    session_token:a254_session_token,
    project_token:a254_project_token, // MAPSLUG
    user_token:a254_user_token 
  };
  let r = await generic_api_v2(datastring,'a254_missingGraph');
 
  lyr = 'missingGraph';//hurry up
  mymap.removeLayer(geo_lyr[lyr]);
  geo_lyr[lyr].clearLayers();   
  // let polyline1 = L.polyline(llPolyline1, {color: 'blue', className: 'polyline1'}).addTo(mymap);

  let pane = lyr+'_pane';
  if(m211_rotation=='enabled'){
    pane='rLines1Pane';
  }

  if(r.features.length!=0){
    geo_lyr[lyr] = L.geoJson(r,{
      onEachFeature: geo_lyr_style[lyr],
      pane:pane
    }).addTo(mymap);
  }

  fSum = r.features_sum[0].properties.progress;
  fSum = fSum*100;
  $('.ct-editing2').append(''
    +'<div class="col-auto ct-editing2-info" '+
      'style="text-align:center;margin-top:5px;">'
      +'<div class="box card a254_coordinates_tmp" '
        +'style="width:200px;margin:auto;display:block;" '
      +'>'+
      'Missing roads: <span class="numberM-a254_coordinates_tmp" value="'+fSum+'">'+
      fSum+
      '</span>%'+
      '</div>'
    +'</div>'
  +'');
  new AutoNumeric('.numberM-a254_coordinates_tmp',numberM2);

}

async function a254_postGetSessionToken(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const responseData = await response.json();
  return responseData;
}

async function a254_loadFakeGPS(){

  // onsole.log('a254_loadFakeGPS');
  let datastring = {
    call_type:'silent',
    fn_group:'geodata',
    action:'view_data',
    collection:'a254_loadFakeGPS',
    qy_name:'A',
    geom:1,
    lyrVGraph:a254_lyrGraphVector,
    session_token:a254_session_token,
    project_token:a254_project_token, // MAPSLUG
    user_token:a254_user_token 
  };
  let r = await generic_api_v2(datastring,'a254_loadFakeGPS');

  // onsole.log(r);
  let tmp = [];
  r.features.forEach(element => {
    let p = element.properties;
    tmp.push([p.lat,p.lng]);
  });
  a254_fakeGPS = tmp;
  // a254_fakeGPS = objAddon.fakeGPS;
  a254_devMode = 1;

}

function prepare_a254(){

  let tmpLyr = 'a254_route_Nav';//navigation
  geo_lyr[tmpLyr] = new L.featureGroup();

  mymap.createPane(tmpLyr+'_pane');
  mymap.getPane(tmpLyr+'_pane').style.zIndex = 400;

  geo_lyr_style[tmpLyr] = function(feature, layer){

    let myWeight = 10;
    let myOpacity = 0.3;
    if(feature.properties.serie=='A'){
      myWeight = 15;
      myOpacity = 0.7;
    }    
    layer.setStyle({
      fillColor:'#000',
      color: '#00FF00', // green color hex 
      weight:myWeight,
      opacity:myOpacity,
      fillOpacity:0,
      //clickable:false
    });//.on('click', geo_glyrsit001_onClick);

  };

  tmpLyr = 'a254_user_1';
  geo_lyr[tmpLyr] = new L.featureGroup();

  mymap.createPane(tmpLyr+'_pane');
  mymap.getPane(tmpLyr+'_pane').style.zIndex = 600;  


  let a254_user_1_icon = L.divIcon(
    {
      className: 'none',
      html: ''
        +'<div class="ct" style="'
          +'position: relative;'
          +'top: -19px;'
          +'left: -14px;">'
          +'<div class="a254_user_1_icon" style="'
            +'width: 40px;'
            +'height: 40px;">'
            +'<img src='
              +SOURCE_PATH+'icon/noun-car-1056296_mod.png'
              +' style="width:40px;">'
          +'</div>'
        +'</div>'
    }
  ); 

  geo_lyr_style[tmpLyr] = function(feature,latlng){

    let icon = new Array();
    // let style='style1';
  
    // obj_lyr.g_style.forEach(element => {
    //   if(element.g_slug==style){
        // icon = L.icon({
        //   iconUrl: SOURCE_PATH+'icon/noun-car-1056296_mod.png', // +element.iconUrl,
        //   iconSize: 40,
        //   iconAnchor: [20,20]
        // });
    //   }
    // });
    // onsole.log(icon);
    //L.marker(latlng).addTo(mymap);//to calibrate

    let pane = tmpLyr+'_pane';
    // if(m211_rotation=='enabled'){
    //   pane='rPoints3Pane';
    // }

    return L.marker(latlng,{
      icon: a254_user_1_icon, // icon
      pane: pane
    });//.on('click', geo_vlyr009_onClick); // funzione 3 onClick sul punto
  
  }; 

  g_meta.geovar_addon.features.push({
    "properties": {
      "g_slug" : a254_slug,
      "addon_status" : "enabled",
      "show_status" : "disabled"
    }
  });

  tmpLyr = 'a254_route_CatTail';//cat tail
  geo_lyr[tmpLyr] = new L.featureGroup();

  mymap.createPane(tmpLyr+'_pane');
  mymap.getPane(tmpLyr+'_pane').style.zIndex = 390;

  geo_lyr_style[tmpLyr] = function(feature, layer){
    layer.setStyle({
      fillColor:'#000',
      color: '#0000FF', // blue color hex
      weight:2,
      opacity:1,
      fillOpacity:0,
      //clickable:false
    });//.on('click', geo_glyrsit001_onClick);
  };

  tmpLyr = 'a254_route_HurryUp';//hurry up
  geo_lyr[tmpLyr] = new L.featureGroup();

  mymap.createPane(tmpLyr+'_pane');
  mymap.getPane(tmpLyr+'_pane').style.zIndex = 350;

  geo_lyr_style[tmpLyr] = function(feature, layer){
    layer.setStyle({
      fillColor:'#000',
      color: '#000', // blue color hex
      weight:0.5,
      opacity:1,
      fillOpacity:0,
      dashArray: '10, 10',
      dashOffset: '3'
      //clickable:false
    });//.on('click', geo_glyrsit001_onClick);
  };

  tmpLyr = 'baseGraph';
  geo_lyr[tmpLyr] = new L.featureGroup();

  mymap.createPane(tmpLyr+'_pane');
  mymap.getPane(tmpLyr+'_pane').style.zIndex = 100;

  geo_lyr_style[tmpLyr] = function(feature, layer){
    layer.setStyle({
      color: '#000', // blue color hex
      weight:0
      //clickable:false
    });//.on('click', geo_glyrsit001_onClick);
  };

  tmpLyr = 'missingGraph';
  geo_lyr[tmpLyr] = new L.featureGroup();

  mymap.createPane(tmpLyr+'_pane');
  mymap.getPane(tmpLyr+'_pane').style.zIndex = 160;

  geo_lyr_style[tmpLyr] = function(feature, layer){
    layer.setStyle({
      // red color hex color:   '#FF0000',
      color: '#FF0000',
      weight:2
      //clickable:false
    });//.on('click', geo_glyrsit001_onClick);
  };

  tmpLyr = 'seqDirectionA';//hurry up

  mymap.createPane(tmpLyr+'_pane');
  mymap.getPane(tmpLyr+'_pane').style.zIndex = 500; // obj_lyr.zindex

  tmpLyr = 'a254_seqNodes';//hurry up
  geo_lyr[tmpLyr] = new L.featureGroup();

  mymap.createPane(tmpLyr+'_pane');
  mymap.getPane(tmpLyr+'_pane').style.zIndex = 500;

  geo_lyr_style[tmpLyr] = function(feature,latlng){

    let p = feature.properties;
    let icon = new Array();
    let myclass = 'divicon_seqNodes';
    icon = L.divIcon({
      className: myclass,
      html: '<div class="divicon_box icon-seq div-icon-hide icon-seq-'+p.seq+'">'
      +'<span>'+p.seq+'</span>'
      +'</div>' ,
      iconSize: [48,48],
      iconAnchor:[24,24]
    });

    let pane = tmpLyr+'_pane';
    // if(m211_rotation=='enabled'){
    //   pane='rPoints2Pane';
    // }

    return L.marker(latlng,{
      icon: icon,
      pane: pane
    });//.on('click', geo_vlyr009_onClick); // funzione 3 onClick sul punto
  
  }; 
  //--
  f_btn['btn_'+a254_slug]();

}

//--

f_btn['btn_'+a254_slug]=function(slug){

  let itemAddon = a254_slug; // element.id.replace('btn_', '');
  let o = g_meta.geovar_addon.features;
  let obj_fileterd=o.filter(
    ({properties}) => properties.g_slug === itemAddon
  );
  let objAddon = obj_fileterd[0];

  if(objAddon.properties.show_status=='enabled'){

    objAddon.properties.show_status='disabled';

    $('#'+'btn_'+a254_slug).css('background-color','white');

    if(dyn_functions['disable_'+itemAddon]!=null){
      dyn_functions['disable_'+itemAddon]();
    }

  }
  else{
    
    objAddon.properties.show_status='enabled';

    $('#'+'btn_'+a254_slug).css('background-color','yellow');

    if(dyn_functions['enable_'+itemAddon]!=null){
      dyn_functions['enable_'+itemAddon]();
    }

  }

  return;

}

dyn_functions['enable_'+a254_slug]=function(){

  $('.box-editing2').css('display','block');
  $('.box-editing2').css('justify-content','center');
  $('.box-editing2').css('bottom','5px');
  $('.box-editing2').css('left','5px');
  $('.box-editing2').css('width','215px');

  $('.box-editing2').html(''
    +'<div class="col-auto ct-editing2-alert" style="padding: 5px 0px;display:none;">'
    +'</div>'
  +'');

  $('.box-editing2').append(''
    +'<div class="col-auto ct-editing2" style="padding: 5px 0px;">'
    +'</div>'
  +'');

  //--

  let itemBtn = 'btn_a254_resetSession';
  $('.ct-editing2').append('<span class="box-'+itemBtn+'"></span>');

  let gLang_slug="label_"+itemBtn;
  let gLang_label="<i class=\"bi bi-cpu\"></i>";

  gLang[gLang_slug]=gLang_label;

  //--

  let GroupStyleBtn = 'btn-main-sidebar btn-on-map';
  let btnMeta = {
    'properties':{
      "g_slug": itemBtn,
      "g_label": "label_"+itemBtn,
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-danger " + GroupStyleBtn
    }
  }
  g_meta.geovar_button.features.push(btnMeta);  

  create_button(itemBtn);

  //--

  itemBtn = 'btn_a254_showProgress';
  $('.ct-editing2').append('&nbsp;<span class="box-'+itemBtn+'"></span>');

  gLang_slug="label_"+itemBtn;
  gLang_label="<i class=\"bi bi-card-checklist\"></i>";
  gLang[gLang_slug]=gLang_label;

  //--

  GroupStyleBtn = 'btn-main-sidebar btn-on-map';
  btnMeta = {
    'properties':{
      "g_slug": itemBtn,
      "g_label": "label_"+itemBtn,
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-info " + GroupStyleBtn
    }
  }
  g_meta.geovar_button.features.push(btnMeta);  

  create_button(itemBtn);

  //--

  itemBtn = 'btn_a254_skipSeq';
  $('.ct-editing2').append('&nbsp;<span class="box-'+itemBtn+'"></span>');

  gLang_slug="label_"+itemBtn;
  gLang_label="<span class=\"a254_seqLabel\">-1</span> <i class=\"bi bi-x-square\"></i>";

  gLang[gLang_slug]=gLang_label;

  //--

  GroupStyleBtn = 'btn-main-sidebar btn-on-map';
  btnMeta = {
    'properties':{
      "g_slug": itemBtn,
      "g_label": "label_"+itemBtn,
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark " + GroupStyleBtn
    }
  }
  g_meta.geovar_button.features.push(btnMeta);  

  create_button(itemBtn);

  $('#'+itemBtn).attr('disabled',true);
  $('#'+itemBtn).css('width','90px');

  //--

  itemBtn = 'btn_a254_fakeGps';
  $('.ct-editing2').append('&nbsp;<span class="box-'+itemBtn+'" style="display:none;"></span>');

  gLang_slug="label_"+itemBtn;
  gLang_label="<i class=\"bi bi-hand-index-thumb-fill\"></i>";

  gLang[gLang_slug]=gLang_label;

  //--

  GroupStyleBtn = 'btn-main-sidebar btn-on-map';
  btnMeta = {
    'properties':{
      "g_slug": itemBtn,
      "g_label": "label_"+itemBtn,
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-warning " + GroupStyleBtn
    }
  }
  g_meta.geovar_button.features.push(btnMeta);  

  create_button(itemBtn);

  $('.ct-editing2').append(''
    +'<div class="col-auto ct-editing2-info" style="text-align:center;margin-top:5px;">'
      +'<div class="box card a254_coordinates_tmp" '
        +'style="width:200px;margin:auto;display:block;" '
      +'>'
      +'Coordinates'
      +'</div>'
    +'</div>'
  +'');


  if(g_meta.geovar_user.features[0].properties.user_id!=0){

    $('.box-editing2-desktop').css('width','250px');
    $('.box-btn_a254_fakeGps').css('display','inline');
    a254_loadFakeGPS();
    
  }

  return

}

f_btn['btn_a254_fakeGps']=function(slug){

  sessionStorage.fakeGPS_seq++;

  return;

}

f_btn['btn_a254_showProgress']=function(slug){

  if(a254_showProgress==0){

    geo_lyr['a254_route_Nav'].clearLayers();
    geo_lyr['a254_route_HurryUp'].clearLayers();
    mymap.removeLayer(geo_lyr['seqDirectionA']);
    geo_lyr['a254_seqNodes'].clearLayers();
  
    a254_missingGraph();
    a254_showProgress = 1;

    $('#btn_a254_showProgress').html(''+
      '<i class="bi bi-hand-thumbs-up-fill"></i>'+
      '');


  }
  else{

    window.open(window.location.href,"_self");

  }

  return;

}

f_btn['btn_a254_resetSession']=function(slug){

  let item_addon = 'a254_resetSession';
  let item_dlg = 'dlg_'+item_addon;

  var meta = {
    'properties':{
      'g_slug': item_dlg+'_single',
      'g_label': 'Strart new session',
      'g_template': 'template_by_slug',
      'g_description': null
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  sessionStorage.this_dialog_lyr=item_dlg;
  sessionStorage.this_dialog_slug=item_dlg+'_single';

  create_dialog2(sessionStorage.this_dialog_slug);

  return;

}

dyn_functions['template_by_slug_'+'dlg_'+'a254_resetSession'+'_single'] = function(){

  let dlg_slug = 'dlg_'+'a254_resetSession'+'_single';

  let c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //box button tab
  c = ''
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //box tab1
  c = '<div '
    +'class="dlg_panel dlg_panel_tab panel-tab1" '
    +'style="display:block;font-family:var(--wd-fonts-secondary);">'

      +'<div '
        +'style="height:100px;display:block;">RESET SESSION?</div>'
  //c += '<p>TAB1</p>';
  c += '</div><!--tab1-->';
  
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  $('.ajs-footer-btn2').append(''
    +'<button '
      +'type="button" '
      +'class="btn btn-sm btn-dark" id="btn_dlg_a254_resetSession">RESET</button>'
  +'');
  //--
  $('#btn_dlg_a254_resetSession').on('click',function(){

    //---
    alertify.infoDialog().destroy();
    localStorage.removeItem('a254_session_token');
    let url = window.location.href.split('?')[0];
    window.open(url,"_self");

    // a254_seqAllNodes();

  });

}

f_btn['btn_a254_skipSeq']=function(slug){

  a254_seqCheckedList.push( parseInt(sessionStorage.a254_seqCurr) );
  
  let datastring = {
    call_type:'silent',
    fn_group:'geodata',
    action:'view_data',
    collection:'a254_userLocationRegister',
    qy_name:'A',
    lyr:'lyr999',
    lat:sessionStorage.a254_mapLatCurr,
    lng:sessionStorage.a254_mapLngCurr,
    geom:0,
    session_token:a254_session_token,
    project_token:a254_project_token, // MAPSLUG,
    user_token:a254_user_token,
    lyrSeqNodes:a254_lyrSeqNodes,
    seq:sessionStorage.a254_seqCurr,
    note:'manual skip',
    lyrSeqNodes:a254_lyrSeqNodes,
    lyrGraph:a254_lyrGraph
  };
  generic_api(datastring,'btn_a254_skipSeq');

  searchNextSeq();

  return;

}

dyn_functions['succ_btn_a254_skipSeq']=function(){

  // done

}

dyn_functions['disable_'+a254_slug]=function(){

  $('.box-editing2').css('display','none');
  $('.box-editing2').html('');

  return

}

//--

// function a254_userLocation(){

//   if (navigator.geolocation) {
//     // onsole.log('navigator.geolocation')
//     navigator.geolocation.getCurrentPosition(a254_userLocationPrepare);
//   }
//   else {
//     // onsole.log('navigator.geolocation not supported')
//   }

// }


// function a254_showPosition(position) {
//   // onsole.log("Latitude: " + position.coords.latitude +"|Longitude: " + position.coords.longitude);
//   $('.a254_coordinates_tmp').html("Latitude: " + position.coords.latitude +"|Longitude: " + position.coords.longitude);
// }

function a254_error(err) {
  console.error(`ERROR(${err.code}): ${err.message}`);
}
// id = navigator.geolocation.watchPosition(a254_showPosition, a254_error, a254_options);

// var x = document.getElementById("demo");
function a254_getLocation() {
  // onsole.log('a254_getLocation')
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
      a254_userLocationPrepare, 
      a254_error, 
      a254_options
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function a254_getLocationDev() {

  let position = {
    coords:{
      latitude:0,
      longitude:0
    }
  };

  position.coords.latitude = a254_fakeGPS[sessionStorage.fakeGPS_seq][0];
  position.coords.longitude = a254_fakeGPS[sessionStorage.fakeGPS_seq][1];

  a254_userLocationPrepare(position);

}

function a254_userLocationPrepare(position){
  if(a254_showProgress == 1){
    return;
  }
  // onsole.log('a254_userLocationPrepare')
  $('.a254_coordinates_tmp').html(''
    + `<i class="bi bi-server gps-status"></i>&nbsp;`
    + position.coords.latitude.toFixed(5)
    + " " 
    + position.coords.longitude.toFixed(5)
  );
  $('.gps-status').css('color','green');
  // $(this).addClass("anim");
  setTimeout('$(".gps-status").css("color","red");', 4000);
  // onsole.log('a254_userLocationPrepare')
  // onsole.log(position);
  // coords : 
  //   accuracy    :     1
  //   altitude    :     null
  //   altitudeAccuracy    :     null
  //   heading    :     null
  //   latitude    :     32.0759
  //   longitude    :     34.8215
  //   speed    :     null  

  // let userLat = a254_fakeGPS[sessionStorage.fakeGPS_seq][0];
  // let userLng = a254_fakeGPS[sessionStorage.fakeGPS_seq][1];
  let userLat = position.coords.latitude;
  let userLng = position.coords.longitude;

  sessionStorage.a254_mapLatCurr = userLat;
  sessionStorage.a254_mapLngCurr = userLng;

  let a1 = Number.parseFloat(sessionStorage.a254_mapLatLast8).toFixed(8);
  let a2 = Number.parseFloat(sessionStorage.a254_mapLngLast8).toFixed(8);
  let b1 = Number.parseFloat(userLat).toFixed(8);
  let b2 = Number.parseFloat(userLng).toFixed(8);
  let ClosestCenter = null;
  let GpsCenter = null;
  if( a1==b1 || a2==b2){
    // onsole.log('same location');
  }
  else{

    // update lat,lng Last8
    sessionStorage.a254_mapLatLast8=userLat;
    sessionStorage.a254_mapLngLast8=userLng;

    if(a254_baseGraphReady == 1){
      GpsCenter = new L.LatLng(
        sessionStorage.a254_mapLatCurr,
        sessionStorage.a254_mapLngCurr
      );
      ClosestCenter = L.GeometryUtil.closestLayer(
        mymap, 
        geo_lyr['baseGraph'].getLayers(), 
        GpsCenter, // geo_lyr['ptClosest'],
        false
      );
  
      _distance = L.GeometryUtil.distance(mymap, GpsCenter, ClosestCenter.latlng);
      _length = L.GeometryUtil.length([GpsCenter, ClosestCenter.latlng]);
  
      // onsole.log(  'distance: '+_length+'  px'  );
      // onsole.log(  'distance: '+_distance+' m'  );
    }
    else{
      _distance = 999999;
    }

    if( _distance > 20 ){
      // onsole.log('_distance',sessionStorage.a254_mapLatCurr);
      // onsole.log('_distance',sessionStorage.a254_mapLngCurr);      
      mymap.setView(
        [
          sessionStorage.a254_mapLatCurr,
          sessionStorage.a254_mapLngCurr
        ], 
        a254_zoomOptimal
      );      
    }
    else{
      // onsole.log('else',ClosestCenter.latlng.lat);
      // onsole.log('else',ClosestCenter.latlng.lng);
      mymap.setView(
        [
          ClosestCenter.latlng.lat,
          ClosestCenter.latlng.lng
        ], 
        a254_zoomOptimal
      );
    }

    a254_CatTailNodes.push([
      parseFloat(sessionStorage.a254_mapLngCurr),
      parseFloat(sessionStorage.a254_mapLatCurr)
    ]);

    a254_showPin();
    a254_showCatTail();
    a254_showHurryUp();

  }

  let c1 = Number.parseFloat(sessionStorage.a254_mapLatLast5).toFixed(5);
  let c2 = Number.parseFloat(sessionStorage.a254_mapLngLast5).toFixed(5);
  let d1 = Number.parseFloat(userLat).toFixed(5);
  let d2 = Number.parseFloat(userLng).toFixed(5);
  if( c1==d1 || c2==d2 ){
    // onsole.log('same location');
  }
  else{

    // update lat,lng Last8
    sessionStorage.a254_mapLatLast5=userLat;
    sessionStorage.a254_mapLngLast5=userLng;

    a254_GpsCollection.push([
      parseFloat(userLat),
      parseFloat(userLng)
    ]);

    if(a254_GpsCollection.length>5){

      a254_userLocationRegister(a254_GpsCollection);
      a254_GpsCollection=[];

    }
    else{
      // onsole.log('searchNextSeq');
      searchNextSeq();
    }

    checkMapBounds();

  }

}

//--

function a254_showPin(){

  let lyr='a254_user_1';

  let pane = lyr+'_pane';
  // if(m211_rotation=='enabled'){
  //   pane='rPoints3Pane';
  // }
  let options={
    pointToLayer: geo_lyr_style[lyr],
    pane: pane
  }

  let response = {};
  response.type='FeatureCollection';
  response.features = new Array();

  mymap.removeLayer(geo_lyr['markerClosestPolyline1']);

  geo_lyr['ptClosest'] = new L.LatLng(
    sessionStorage.a254_mapLatCurr,
    sessionStorage.a254_mapLngCurr
  );
  let GpsCenter = null;
  let tClosest = null;
  if(a254_baseGraphReady == 1){
    closestPointToPolyline1 = L.GeometryUtil.closestLayer(
      mymap, 
      geo_lyr['baseGraph'].getLayers(), 
      geo_lyr['ptClosest'],
      false
    );
  
    //, false);
    // onsole.log(closestPointToPolyline1)
    // geo_lyr['markerClosestPolyline1'] = L.marker(
    //   closestPointToPolyline1.latlng
    // ).addTo(mymap);
  
    GpsCenter= new L.LatLng(
      sessionStorage.a254_mapLatCurr,
      sessionStorage.a254_mapLngCurr
    );
    tClosest = closestPointToPolyline1.latlng;

    _distance = L.GeometryUtil.distance(mymap, GpsCenter, tClosest);
    _length = L.GeometryUtil.length([GpsCenter, tClosest]);
  
    // onsole.log(  'distance: '+_length+'  px'  );
    // onsole.log(  'distance: '+_distance+' m'  );
  }
  else{
    _distance = 999999;
  }

  let u = g_meta.geovar_user.features[0];
  let feature = {};
  feature.type='Feature';
  feature.properties = {};
  feature.properties.user_id=u.properties.user_id;
  feature.properties.user_role=u.properties.user_role;
  feature.properties.latitude=sessionStorage.a254_mapLatCurr;
  feature.properties.longitude=sessionStorage.a254_mapLngCurr;
  feature.geometry = {};
  feature.geometry.type='Point';
  feature.geometry.coordinates = new Array();
  // feature.geometry.coordinates.push(sessionStorage.a254_mapLngCurr);
  // feature.geometry.coordinates.push(sessionStorage.a254_mapLatCurr);
  if( _distance > 20 ){
    feature.geometry.coordinates.push(sessionStorage.a254_mapLngCurr);
    feature.geometry.coordinates.push(sessionStorage.a254_mapLatCurr);  
  }
  else{    
    feature.geometry.coordinates.push(tClosest.lng);
    feature.geometry.coordinates.push(tClosest.lat);  
  }
  response.features.push(feature);

  // remove_lyr(lyr);
  mymap.removeLayer(geo_lyr[lyr]);
  geo_lyr[lyr].clearLayers(); 

  var geoJson = L.geoJson(response,options);
  // aggiunta dei punti al featuregroup
  // per gestirli più facilmente
  geo_lyr[lyr].addLayer(geoJson);
  // aggiunta del featuregroup alla mappa
  geo_lyr[lyr].addTo(mymap);

  if(a254_CatTailNodes.length>1){

    // onsole.log(a254_CatTailNodes.slice(-2));
    let last2 = a254_CatTailNodes.slice(-2);
    let point1 = turf.point(last2[0]);
    let point2 = turf.point(last2[1]);
    
    let bearing = turf.bearing(point1, point2);
    // onsole.log(bearing);
    // 
    // 
    if(m211_rotation=='enabled'){
      mymap.setBearing(bearing*-1);
    }
    else{
      $('.a254_user_1_icon').css('transform','rotate('+bearing+'deg)');
    }  
  }

  // --
  mymap.removeLayer(geo_lyr['markerRadius']);
  if( _distance > 20 ){  
  }
  else{      
    geo_lyr['markerRadius'] = L.circle(tClosest, {
      color: 'red',
      weight: 0,
      // blue hex code
      fillColor: '#0000ff', 
      fillOpacity: 0.2,
      radius:_length
    }).addTo(mymap);
  }    

  if(nodess.features.length>0){
    pointToSeq();
  }
}

function a254_showHurryUp(){

  if(sessionStorage.a254_directionFromNodeLat!=0){
    let rHurryUp = {};
    rHurryUp.type='FeatureCollection';
    rHurryUp.features = new Array();

    let feature = {};
    feature.type='Feature';
    feature.properties = {};
    feature.geometry = {};
    feature.geometry.type='LineString';
    feature.geometry.coordinates = new Array();

    let line = [];
    line.push(parseFloat(sessionStorage.a254_mapLngCurr));
    line.push(parseFloat(sessionStorage.a254_mapLatCurr));
    feature.geometry.coordinates.push(line);
    line = [];
    line.push(parseFloat(sessionStorage.a254_directionFromNodeLng));
    line.push(parseFloat(sessionStorage.a254_directionFromNodeLat));
    feature.geometry.coordinates.push(line);

    rHurryUp.features.push(feature);

    let item_lyr = 'a254_route_HurryUp';

    geo_lyr[item_lyr].clearLayers();

    // let geojson = L.geoJSON(rHurryUp,{
    //   onEachFeature: geo_lyr_style[item_lyr],
    //   pane:item_lyr+'_pane'
    // });
    // geo_lyr[item_lyr].addLayer(geojson);
    // geo_lyr[item_lyr].addTo(mymap);

    // firstLatLng = new L.LatLng(sessionStorage.a254_mapLatCurr,sessionStorage.a254_mapLngCurr);
    // secondLatLng = new L.LatLng(sessionStorage.a254_directionFromNodeLat,sessionStorage.a254_directionFromNodeLng);
    // refreshDistanceAndLength(mymap,_firstLatLng,_secondLatLng);

  }
}

function pointToSeq(){
  // var startPointLatLon = [
  //   parseFloat(sessionStorage.a254_mapLngCurr),
  //   parseFloat(sessionStorage.a254_mapLatCurr)
  // ];
  // var tfC = geo_lyr['a254_seqNodes']; // turf.featureCollection(features);
  // var tpC = geo_lyr['a254_user_1']; // turf.point(startPointLatLon);
  // var tfC = turf.featureCollection(nodess);
  let thisPoints = [];

  nodess.features.forEach(element => {
    let g =element.geometry.coordinates;
    thisPoints.push(turf.point([g[0], g[1]]))
  });
  // var targetPoint = turf.point(startPointLatLon);
  // var points = turf.featureCollection(thisPoints);
  
  // var geoJ = turf.nearestPoint(targetPoint, points);  

  // console.log(nodess)
  // console.log(startPointLatLon)
  // var tpC = turf.point(startPointLatLon);

  // var geoJ = turf.nearestPoint(tpC, tfC);
  // onsole.log(geoJ);

  let targetPoint2 = new L.LatLng(
    sessionStorage.a254_mapLatCurr,
    sessionStorage.a254_mapLngCurr
  );
  ClosestPoint = L.GeometryUtil.closestLayer(
    mymap, 
    geo_lyr['a254_seqNodes'].getLayers(), 
    targetPoint2, // geo_lyr['ptClosest'],
    false
  );  
  _distance = L.GeometryUtil.distance(mymap, targetPoint2, ClosestPoint.latlng);
  _length = L.GeometryUtil.length([targetPoint2, ClosestPoint.latlng]);

  // onsole.log('distance',_distance);
  // onsole.log('length [m]',_length);
  // onsole.log(ClosestPoint);

  if(_length<15){
    let seqIsChecked=-1;
    // onsole.log('ClosestPoint Seq',ClosestPoint.layer.feature.properties.seq);
    seqIsChecked = a254_seqCheckedList.indexOf(ClosestPoint.layer.feature.properties.seq);
    // onsole.log('seqIsChecked',seqIsChecked);
    if(parseInt(seqIsChecked)==-1){
      a254_seqCheckedList.push( parseInt(ClosestPoint.layer.feature.properties.seq) );
      searchNextSeq();
    }

  }
}

function a254_showCatTail(){

  if(a254_CatTailNodes.length>1){
    let rCatTail = {};
    rCatTail.type='FeatureCollection';
    rCatTail.features = new Array();
  
    let feature = {};
    feature.type='Feature';
    feature.properties = {};
    feature.geometry = {};
    feature.geometry.type='LineString';
    feature.geometry.coordinates = new Array();
  
    feature.geometry.coordinates=a254_CatTailNodes;
  
    rCatTail.features.push(feature);
  
    let item_lyr = 'a254_route_CatTail';
  
    geo_lyr[item_lyr].clearLayers();
    // onsole.log('rCatTail',rCatTail)

    let pane = item_lyr+'_pane';
    if(m211_rotation=='enabled'){
      pane='rLines2Pane';
    }
    let geojson = L.geoJSON(rCatTail,{
      onEachFeature: geo_lyr_style[item_lyr],
      pane: pane //item_lyr+'_pane'
    });
    geo_lyr[item_lyr].addLayer(geojson);
    geo_lyr[item_lyr].addTo(mymap);
  }

}

//--

function a254_userLocationRegister(tmpGpsCollection){

  let datastring = {
    call_type:'silent',
    fn_group:'geodata',
    action:'view_data',
    collection:'a254_userLocationRegister',
    qy_name:'A',
    lyr:'lyr999',
    lat:sessionStorage.a254_mapLatCurr,
    lng:sessionStorage.a254_mapLngCurr,
    gps_collection:tmpGpsCollection,
    geom:0,
    session_token:a254_session_token,
    project_token:a254_project_token, // MAPSLUG,
    user_token:a254_user_token,
    lyrSeqNodes:a254_lyrSeqNodes,
    lyrGraph:a254_lyrGraph
  };
  generic_api(datastring,'a254_userLocationRegister');

}

dyn_functions['succ_a254_userLocationRegister'] = function(r){
 
  // done
  r.ds.seqArray.forEach(element => {
    a254_seqCheckedList.push( parseInt(element) );
  });
  searchNextSeq();
}

// f_btn['btn_a254_next']=function(slug)
function searchNextSeq(){

  let seqCurr = parseInt(sessionStorage.a254_seqCurr);
  // onsole.log('searchNextSeq',seqCurr);
  $('.icon-seq-'+seqCurr).removeClass('div-icon-hide');

  //search if curr is checked
  let seqIsChecked=-1;
  if(a254_seqCheckedList.length!=0){
    seqIsChecked = a254_seqCheckedList.indexOf(seqCurr);
    a254_seqCheckedList.forEach(element => {
      // $('.icon-seq-'+element).css('background-color','green');
      // $('.icon-seq-'+element).css('display','none!important');
      $('.icon-seq-'+element).remove();
    });
  }

  if(seqIsChecked==-1){

    // onsole.log('Seq '+seqCurr+': not checked');
    $('.a254_seqLabel').html(seqCurr);
    $('#btn_a254_skipSeq').attr('disabled',false);
    
    a254_userGetDirectionToSeq();
    
  }else{

    // search index of current seq in list
    let seqIndexCurr = a254_seqList.indexOf(seqCurr);

    // set new current seq
    sessionStorage.a254_seqCurr=a254_seqList[seqIndexCurr+1];
    // onsole.log('searchNextSeq',sessionStorage.a254_seqCurr);
    
    // remove current seq from list
    //a254_seqList = a254_seqList.slice(seqIndexCurr);
    a254_seqList.splice(seqIndexCurr, 1);

    // recall function with new seq
    searchNextSeq();

  }

}

function a254_userGetDirectionToSeq(){
  // onsole.log('a254_userGetDirectionToSeq');
  if(sessionStorage.a254_mapLatCurr!=0){

    let a1 = Number.parseFloat(sessionStorage.a254_directionLatCurr).toFixed(5);
    let a2 = Number.parseFloat(sessionStorage.a254_directionLngCurr).toFixed(5);
    let b1 = Number.parseFloat(sessionStorage.a254_mapLatCurr).toFixed(5);
    let b2 = Number.parseFloat(sessionStorage.a254_mapLngCurr).toFixed(5);
    let GpsCenter = null;
    let ClosestCenter = null;
    if( a1==b1 || a2==b2){
      // onsole.log('same location');
    }
    else{

      if(a254_baseGraphReady == 1){
        GpsCenter = new L.LatLng(
          sessionStorage.a254_mapLatCurr,
          sessionStorage.a254_mapLngCurr
        );
        ClosestCenter = L.GeometryUtil.closestLayer(
          mymap, 
          geo_lyr['baseGraph'].getLayers(), 
          GpsCenter, // geo_lyr['ptClosest'],
          false
        );
    
        _distance = L.GeometryUtil.distance(mymap, GpsCenter, ClosestCenter.latlng);
        _length = L.GeometryUtil.length([GpsCenter, ClosestCenter.latlng]);
      }
      else{
        _distance = 999999;
      }

  
      // onsole.log(  'distance: '+_length+'  px'  );
      // onsole.log(  'distance: '+_distance+' m'  );
      let edgeCurr=-1;

      if( _distance > 20 ){
     
      }
      else{

        // onsole.log('ClosestCenter',ClosestCenter);
        // onsole.log('ClosestCenter ID',ClosestCenter.layer.feature.properties.id);
        if(a254_directionLastFeat.features){
          let o = a254_directionLastFeat.features;
          let this_obj=o.filter(({properties}) => properties.serie === 'A');
        
          // r.features.forEach(element => {
          let edges = [];
          this_obj.forEach(element => {
            edges.push(element.properties.edge);
          });  
          // onsole.log('edges',edges);
          let edgesExist=-1;
          edgesExist = edges.indexOf(ClosestCenter.layer.feature.properties.id);
          // onsole.log('edgesExist',edgesExist);
          if(edgesExist>-1){
            // onsole.log('edgesExist','return');
            // return;
          }
          
        }

        edgeCurr=ClosestCenter.layer.feature.properties.id;
        
      }      

      let datastring = {
        call_type:'silent',
        fn_group:'geodata',
        action:'view_data',
        collection:'a254_userGetDirectionToSeq',
        qy_name:'A',
        lyr:'lyr999',
        lyrSeqNodes:a254_lyrSeqNodes,
        lyrGraph:a254_lyrGraph,
        geom:1,
        lat:sessionStorage.a254_mapLatCurr,
        lng:sessionStorage.a254_mapLngCurr,
        seq:sessionStorage.a254_seqCurr,
        edge:edgeCurr,
        liveNavigation:a254_liveNavigation,
        seqCheckedList:a254_seqCheckedList
      };

      sessionStorage.a254_directionLatCurr = sessionStorage.a254_mapLatCurr;
      sessionStorage.a254_directionLngCurr = sessionStorage.a254_mapLngCurr;
      generic_api(datastring,'a254_userGetDirectionToSeq');

    }


  }

}

dyn_functions['succ_a254_userGetDirectionToSeq'] = function(r){

  a254_directionLastFeat=r;

  let item_lyr = 'a254_route_Nav';

  geo_lyr[item_lyr].clearLayers();

  if(r.features.length==0){
    return;
  }

  let pane = item_lyr+'_pane';
  if(m211_rotation=='enabled'){
    pane='rLines3Pane';
  }
  let geojson = L.geoJSON(r,{
    onEachFeature: geo_lyr_style[item_lyr],
    pane: pane // item_lyr+'_pane'
  });
  geo_lyr[item_lyr].addLayer(geojson);
  geo_lyr[item_lyr].addTo(mymap);

  let DirectionFirstNodeLat = r.features[0].geometry.coordinates[0][1];
  let DirectionFirstNodeLng = r.features[0].geometry.coordinates[0][0];
  sessionStorage.a254_directionFromNodeLat=DirectionFirstNodeLat;
  sessionStorage.a254_directionFromNodeLng=DirectionFirstNodeLng;
  
  mymap.removeLayer(geo_lyr['seqDirectionA']);

  let lline = [];
  let o = r.features;
  let this_obj=o.filter(({properties}) => properties.serie === 'A');

  // r.features.forEach(element => {
  this_obj.forEach(element => {
    element.geometry.coordinates.forEach(coords => {
      lline.push([coords[1],coords[0]]);
    });
  });      


  // var bufferedLayer = L.geoJSON(null);
  // bufferedLayer.addData(buffered);
  // bufferedLayer.addTo(mymap);
  // });
  // onsole.log('lline',lline)
  // var polyline = L.polyline(lline).setText('test', {offset: -5, orientation: 'flip'}).addTo(mymap);

  pane = 'seqDirectionA_pane';
  if(m211_rotation=='enabled'){
    pane='rLines2Pane';
  }  
  geo_lyr['seqDirectionA'] = L.polyline(
    lline,
    {
      weight:0,
      className: 'seqDirectionA',
      pane: pane // 'seqDirectionA_pane'
    }
    ).arrowheads({
      frequency: '25px',
      // frequency: 'allvertices',
      size: '10px',
      fill: true,
      // color: 'black',
      fillColor: 'green'
    }).addTo(mymap);

  // let line = turf.lineString(lline);
  // let length = turf.length(line, {units: 'meters'});
  // onsole.log('length',length);
  // var buffered = turf.buffer(line, 50, {units: 'meters'});
  // onsole.log('buffered',buffered);
  // onsole.log(line)
  // onsole.log(geo_lyr['baseGraph'].toGeoJSON())
  // var intersection = turf.lineIntersect(
  //   geo_lyr['baseGraph'].toGeoJSON(),
  //   geo_lyr['seqDirectionA'].toGeoJSON()
  // );
  // onsole.log('intersection',intersection);
  
  $('.ct-editing2-alert').css('display','none');
  $('.ct-editing2-alert').html('');

  geo_lyr['baseGraph'].toGeoJSON().features.forEach(element => {
    // onsole.log('element',element);
    // onsole.log('line',line);
    var intersection = turf.lineIntersect(element,geo_lyr['seqDirectionA'].toGeoJSON());
    if(intersection.features.length>0  ){
      //_onsole.log('intersection',element);
      if(element.properties.motor_vehicle=='missing'){
        $('.ct-editing2-alert').css('display','block');
        $('.ct-editing2-alert').html(''+
          '<div class="box card a254_missing_msg" '+
            'style="width:200px;margin:auto;display:block;'+
            'background-color: orange;" '+
          '>'+
          'Missing Motor Vehicle Ahead'+
          '</div>'+
        '');      
      }
    }
    
  });

  // let lline = {};
  // lline.type='FeatureCollection';
  // lline.features = new Array();

  // this_obj.forEach(element => {
  //   lline.features.push(element);
  // });  
  
  // geo_lyr['seqDirectionA'] = L.geoJSON(
  //   lline,
  //   { 
  //     pane:item_lyr+'_pane',
  //     arrowheads: {
  //       frequency: '25px',
  //       //frequency: 'allvertices',
  //       size: '10px',
  //       fill: true,
  //       // color: 'black',
  //       fillColor: 'green'
  //     }
  //   }
  // ).addTo(mymap);
  // 
  // var decorator = L.polylineDecorator(polyline, {
  //     patterns: [
  //         // defines a pattern of 10px-wide dashes, repeated every 20px on the line
  //         {offset: 0, repeat: 20, symbol: L.Symbol.dash({pixelSize: 10})}
  //     ]
  // }).addTo(map);

  // layer.setText('test', {offset: -5, orientation: 'flip'});
  // layer.setText('\u25BA', {repeat: true,
  //   offset: 6,
  //   attributes: {fill: 'red'}});

}

function a254_GoogleDirections(){

  let datastring = {
    call_type:'silent',
    fn_group:'geodata',
    action:'view_data',
    collection:'a254_GoogleDirections',
    qy_name:'A',
    lyr:'lyr999',
    geom:0,
    lyrSeqNodes:a254_lyrSeqNodes,
    lyrGraph:a254_lyrGraph,
    lat:sessionStorage.a254_mapLatCurr,
    lng:sessionStorage.a254_mapLngCurr,
    seq:sessionStorage.a254_seqCurr    
  };
  generic_api(datastring,'a254_GoogleDirections');
  return;

}
dyn_functions['succ_a254_GoogleDirections']=function(r){

  // done
  // onsole.log(r);
}

function refreshDistanceAndLength(_map,_firstLatLng,_secondLatLng) {

  _distance = L.GeometryUtil.distance(_map, _firstLatLng, _secondLatLng);
  _length = L.GeometryUtil.length([_firstLatLng, _secondLatLng]);

  // onsole.log('distance: ' + _distance + ' pixels');
  // onsole.log('length: ' + _length + ' meters');

}

function checkMapBounds(){

  let map_b = mymap.getBounds();

  // onsole.log(
  //   map_b.getEast(),
  //   map_b.getWest(),
  //   map_b.getNorth(),
  //   map_b.getSouth()
  // );
  // onsole.log(
  //   sessionStorage.a254_data_e,
  //   sessionStorage.a254_data_w,
  //   sessionStorage.a254_data_n,
  //   sessionStorage.a254_data_s
  // );

  if( map_b.getEast() > sessionStorage.a254_data_e
    || map_b.getWest() < sessionStorage.a254_data_w
    || map_b.getNorth() > sessionStorage.a254_data_n
    || map_b.getSouth() < sessionStorage.a254_data_s
  ){

    a254_baseGraph()

  }


}