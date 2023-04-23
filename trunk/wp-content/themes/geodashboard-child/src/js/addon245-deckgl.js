const a245_slug='DeckGLOnClick';

dyn_functions['addon245-deckgl'+'_ready'] = function(){

  // _onsole.log('addon245-deckgl'+'_ready');

  $('.box-usrprofile').css('display','block');

  $('.box-usrprofile').append('<div '
    +'class="box-btn_DeckGLOnClick box-info-2-btn d-grid gap-2" '
    +'style="margin-top:5px;"></div>');

  list_mapclick.push(a245_slug);

  prepare_a245();

}

function prepare_a245(){

  g_meta.geovar_addon.features.push({
    "properties": {
      "g_slug" : a245_slug,
      "addon_status" : "enabled",
      "mapclick_status" : "disabled"
    }
  });

  //--

  let item_btn = 'btn_DeckGLOnClick';

  var meta = {
    'properties':{
      "g_slug": "label_"+item_btn,
      "g_label": "<i class=\"fa fa-cubes\" aria-hidden=\"true\"></i>"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": item_btn,
      "g_label": "label_"+item_btn,
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  //let obj_btn=g_meta.geovar_button.features.filter(({properties}) => properties.g_slug === item_btn);
  //let g_group = '';
  /* if(obj_btn.length>0){
    //g_group = obj_btn[0].properties.g_group[0];
    obj_btn[0].status = 'disabled';
  }
  else{
    console.log('BTN without properties!');
    return;
  } */

  create_button(item_btn);

}

f_btn['btn_DeckGLOnClick']=function(slug){

  let item_addon = 'DeckGLOnClick';
  let obj_fileterd=g_meta.geovar_addon.features.filter(({properties}) => properties.g_slug === item_addon);
  let obj_addon = obj_fileterd[0];

  if(obj_addon.properties.mapclick_status=='disabled'){
    enable_a245();
  }
  else{
    disable_a245();
  }
  //_onsole.log(obj_addon.properties);
  return;

}

//--

function enable_a245(){

  //on start
  let item_addon = 'DeckGLOnClick';
  let obj_fileterd=g_meta.geovar_addon.features.filter(({properties}) => properties.g_slug === item_addon);
  let obj_addon = obj_fileterd[0];
  obj_addon.properties.mapclick_status='enabled';

  //--
  
  $('#btn_DeckGLOnClick').css('background-color','yellow');
  $('#mapid').css('cursor','crosshair');

  //--

  $('.box-editing2').css('display','block');
  $('.box-editing2').css('justify-content','center');
  $('.box-editing2').html(''
    +'<div class="col-auto ct-editing2-info" style="text-align:center;">'
      +'<div class="box card" '
        +'style="width:200px;margin:auto;display:block;" '
      +'>'
      +'Click on map to get 3D view'
      +'</div>'
    +'</div>'
  +'');

  return

}

function disable_a245(){

  let item_addon = 'DeckGLOnClick';
  let obj_fileterd=g_meta.geovar_addon.features.filter(({properties}) => properties.g_slug === item_addon);
  let obj_addon = obj_fileterd[0];

  obj_addon.properties.mapclick_status='disabled';

  //--
  
  $('#btn_DeckGLOnClick').css('background-color','white');
  $('#mapid').css('cursor','default');

  //--
  
  $('.box-editing2').css('display','none');
  $('.box-editing2').html('');

  return

}

dyn_mapclick[a245_slug] = function(e){

  let item_addon = 'DeckGLOnClick';
  let g = g_meta.geovar_addon.features;
  let a = 'g_slug';
  let b = item_addon;
  let obj=g.filter(({properties}) => properties[a] === b);
  let objAddon = obj[0];
  //_onsole.log(objAddon)
  if(objAddon.properties.mapclick_status=='enabled'){

    sessionStorage.mapclick_lat=e.latlng.lat;
    sessionStorage.mapclick_lng=e.latlng.lng;

    //let latlng = [e.latlng.lng,e.latlng.lat];

    //--

    let item_dlg = 'dlg_a245_DeckGLOnClick';

    var meta = {
      'properties':{
        'g_slug': item_dlg+'_single',
        'g_label': 'Buildings 3D view',
        'g_template': 'template_by_slug',
        'g_description': null
      }
    }
    g_meta.geovar_dialog.features.push(meta);
  
    sessionStorage.this_dialog_lyr=item_dlg;
    sessionStorage.this_dialog_slug=item_dlg+'_single';//'lyr035_single'

    create_dialog2(sessionStorage.this_dialog_slug);

  }

  return

}

dyn_functions['template_by_slug_'+'dlg_a245_DeckGLOnClick'+'_single'] = function(){

  let dlg_slug = 'dlg_a245_DeckGLOnClick'+'_single';

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
    //+'<aside class="blog-sidebar">'
      +'<div class="loading-wall-box" style="height:100px;display:block;"></div>'
      +'<div id="deck-gl-view" style="height:400px;margin-bottom: 5px;"></div>'
      +'<figcaption class="figure-caption">Hold <kbd>&uArr; Shift</kbd> to orbit.</figcaption>'
      +'<div class="deck-gl-status" '
        +'style="'
          //+'display:none;'
          +'margin-top:15px;'
        +'"></div>'
    //+'</aside>';
  //c += '<p>TAB1</p>';
  c += '</div><!--tab1-->';
  
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //--

  let datastring = {}

  let lat = parseFloat(sessionStorage.mapclick_lat);
  let lng = parseFloat(sessionStorage.mapclick_lng);

  datastring.tag = 'street-view';
  datastring.lat = lat;
  datastring.lng = lng;
  // datastring.pov_heading = 165;
  // datastring.pov_pitch = 0;

  //--

  // a245_lyr.clearLayers();

  // var marker = L.marker([lat, lng], {
  //   icon: a245_lyr_Icon
  // });

  // a245_lyr.addLayer(marker);
  // a245_lyr.addTo(mymap);

  //--

  //$('.click-pano').on('click',fill_streetview(datastring));

  get_deckGL_geometries(datastring);  

}

function get_deckGL_geometries(datastring){
  
  let dataString={
    fn_group:'geodata',
    qy_name:'A'
  }
  dataString.action="view_data";
  dataString.collection='viewBuildings3d';
  dataString.lat=datastring.lat;
  dataString.lng=datastring.lng;

  generic_api(dataString,'fill_deckGL');

}

function a245_buildingColor(mycategory){

  let color = [30,144,255];

  if(mycategory=='office'){
    color = [255,0,0];
  }else if(mycategory=='school'){
    color = [0,255,0];
  }else if(mycategory=='industrial'
    ||mycategory=='industriale'){
    color = [0,0,255];
  }else if(mycategory=='public'){
    color = [255,255,0];
  }else if(mycategory=='other'){
    color = [255,0,255];
  }else if(mycategory=='mixed'){
    color = [0,255,255];
  }else if(mycategory=='commerciale'){
    color = [255,255,0];
  }else if(mycategory=='artigianale'){
    color = [0,255,0];
  }

  return color;

}

dyn_functions['succ_fill_deckGL'] = function(r){

  show_loading2('.loading-wall-box');
  //_onsole.log(r);

  if(r.status!='OK'){
    $('.deck-gl-status').html(''
      +'<div class="alert alert-warning d-flex align-items-center" role="alert">'
        +'<div>'        
          +'<span style="margin-right: 10px;">'
            +'<i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span>'
          +'Building 3D data not found for this location.'
        +'</div>'
      +'</div>'
    +'');
    return;
  }

  $('.deck-gl-status').html(''
    +'<div class="alert alert-info d-flex align-items-center" role="alert">'
      +'<div>'        
        +'No building selected.'
      +'</div>'
    +'</div>'
  +'');

  const {DeckGL, MapView, GeoJsonLayer, 
    TileLayer, BitmapLayer,SimpleMeshLayer,TextLayer} = deck;
  const {OBJLoader} = loaders;
  const geojsonLayer = new GeoJsonLayer({
    data: DOMAIN_PROJECT+'/tmp/building.geojson',
    opacity: 0.8,
    stroked: false,
    filled: true,
    extruded: true,
    wireframe: true,
    fp64: true,
  
    getElevation: f => f.properties.h,
    getFillColor: f => a245_buildingColor(f.properties.mycategory),
    getLineColor: f => [255, 255, 255],
  
    pickable: true,
    onClick: (info, event) => a245_onClickBuilding(info, event) //console.log('growth:', info.object.properties)
  });


  let data =    [
    {"name":"Glen Park (GLEN)","code":"GP","address":"2901 Diamond Street, San Francisco CA 94131","entries":"7732","exits":"7072",
    "coordinates":[r.ds.lng,r.ds.lat]}
  ]
  const man = new SimpleMeshLayer({
    id: 'SimpleMeshLayer',
    data,
    //data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json',
    //texture: 'texture.png',
    /* props from SimpleMeshLayer class */    
    getPosition: d => d.coordinates,
    getColor: d => [Math.sqrt(d.exits), 140, 0],
    getOrientation: d => [0, Math.random() * 180, 0],
    // getScale: [1, 1, 1],
    // getTransformMatrix: [],
    // getTranslation: [0, 0, 0],
    // material: true,
    //mesh: new CubeGeometry(),
    //mesh: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/humanoid_quad.obj',
    mesh: 'https://geoweb.studiositsa.ch/wp-content/themes/geodashboard-child/src/_tmp/humanoid_quad.obj',
    sizeScale: 0.5,
    // texture: null,
    // wireframe: false,
    
    /* props inherited from Layer class */
    
    // autoHighlight: false,
    // coordinateOrigin: [0, 0, 0],
    // coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
    // highlightColor: [0, 0, 128, 128],
    loaders: [OBJLoader],
    // modelMatrix: null,
    // opacity: 1,
    pickable: false,
    // visible: true,
    // wrapLongitude: false,
  });  

  const osm = new TileLayer({
    // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_servers
    data: 'https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png',
  
    minZoom: 0,
    maxZoom: 22,
    tileSize: 256,
  
    renderSubLayers: props => {
      const {
        bbox: {west, south, east, north}
      } = props.tile;
  
      return new BitmapLayer(props, {
        data: null,
        image: props.data,
        bounds: [west, south, east, north]
      });
    }
  });

  data = [
     {name: 'Pick center', address: '3D View', coordinates: [r.ds.lng,r.ds.lat]},
  ]
 

  const txtLayer = new TextLayer({
    id: 'TextLayer',
    data, //: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json',
    
    /* props from TextLayer class */
    
    // background: false,
    // backgroundPadding: [0, 0, 0, 0],
    // billboard: true,
    // characterSet: " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~",
    // fontFamily: 'Monaco, monospace',
    // fontSettings: {},
    // fontWeight: 'normal',
    getAlignmentBaseline: 'bottom',
    getAngle: 0,
    // getBackgroundColor: [255, 255, 255, 255],
    // getBorderColor: [0, 0, 0, 255],
    // getBorderWidth: 0,
    // getColor: [0, 0, 0, 255],
    // getPixelOffset: [0, 0],
    getPosition: d => d.coordinates,
    getSize: 16,
    getText: d => d.name,
    getTextAnchor: 'middle',
    // lineHeight: 1,
    // maxWidth: -1,
    // outlineColor: [0, 0, 0, 255],
    // outlineWidth: 0,
    // sizeMaxPixels: Number.MAX_SAFE_INTEGER,
    // sizeMinPixels: 0,
    sizeScale: 1,
    // sizeUnits: 'pixels',
    // wordBreak: 'break-word',
    
    /* props inherited from Layer class */
    
    // autoHighlight: false,
    coordinateOrigin: [0, 0, 5],
    // coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
    // highlightColor: [0, 0, 128, 128],
    // modelMatrix: null,
    // opacity: 1,
    pickable: true,
    // visible: true,
    // wrapLongitude: false,
    getPixelOffset: [0, 0],
  });

  const viewport = new DeckGL({
    container: "deck-gl-view",
    views: [new MapView()],
    //mapStyle: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
    mapStyle: 'https://geoweb.studiositsa.ch/wp-content/themes/geodashboard-child/src/_tmp/positron-gl-style.json',
    initialViewState: {
      latitude: r.ds.lat,
      longitude:  r.ds.lng,
      //longitude: -122.434092,
      //latitude: 37.732921,      
      zoom: 16,
      maxZoom: 20,
      pitch: 30,
      bearing: 0
    },
    controller: true,
    layers: [geojsonLayer,/*osm,*/ man, txtLayer],
    onViewStateChange: ({viewState}) => {
      //_onsole.log( viewState );
      //const viewport = new MapView(viewState);
      // const nw = viewState.unproject([0, 0]);
      // const se = viewState.unproject([viewState.width, viewState.height]);
      // console.log("north: ", nw[1], ", south: ", se[1]);
      // console.log("east: ", se[0], "west: ", nw[0] );      
    }
    // getTooltip: ({object}) => object && `${object.name}
    // ${object.address}`,    
  });

}

function a245_onClickBuilding(info, event){
  
  let p = info.object.properties;

  $('.deck-gl-status').html(''
    +'<div class="d-flex align-items-center">'
      +'<table class="table table-sm">'
        +'<thead class="table-dark">'
        +'</thead>'      
        +'<tbody>'
        +'</tbody>'
      +'</table>'
    +'</div>'
  +'');  

  $('.deck-gl-status').find('thead').html(''
    +'<tr>'
      +'<td colspan="2">Buildng information</td>'
    +'</tr>'
  +'');

  $('.deck-gl-status').find('tbody').html(''
    +'<tr>'
      +'<td>Volume</td>'
      +'<td style="text-align:right;"><span class="numberM-1">'+p.valuepersqm*p.h+'</span> m<sup>3</sup></td>'
    +'</tr>'
  +'');
  new AutoNumeric('.numberM-1',numberM);

}