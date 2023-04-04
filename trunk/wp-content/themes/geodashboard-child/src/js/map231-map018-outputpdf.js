
function create_mymap_pdf(){

  show_loading();

  if(localStorage.map_zoom>18){

    localStorage.map_zoom=18;

  }

  // Caricamento della mappa base
  /*var mymap_pdf = L.map('mapid-pdf',{
    minZoom: 1,
    maxZoom: 20,
    zoomControl: false,
    //zoomSnap: 0.25,
    //zoomDelta: 0.25,
    //wheelPxPerZoomLevel: 50
  }).setView([
    localStorage.map_lat,
    localStorage.map_lng
  ],
    localStorage.map_zoom
  );*/
  //$('#mapid-pdf').css('position','fixed');
  //$('#mapid-pdf').css('top','0px');
  //$('#mapid-pdf').css('z-index','1000');

  mymap_pdf.setView([
    localStorage.map_lat,
    localStorage.map_lng
  ],
    localStorage.map_zoom
  );

  mymap_pdf.invalidateSize();
  pdf_leaflet_map();

}

function pdf_leaflet_map(){
  // Caricamento della mappa base
  load_lyr039();
  
}

var geo_lyr039pdf = new L.featureGroup();

function load_lyr039(){

  /*dataString={
    //slugAPI:'watchdog-data',
    fn_group:'geodata',
    action:'api_lyr020',
    collection:'single',
    qy_name:'A',
    lyr:'lyr020',
    geom:true,
    centro_token : CENTRO_TOKEN,
  }
  generic_api(dataString,'get_lyr020_point');*/
  let lyr='lyr039';
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  var r = obj_lyr.last_r;

  var options={
    onEachFeature: eval('geo_lyr039_style'),
    //pane:'lyr039_pane'
  }
  var geoJson = L.geoJson(r,options);
  // aggiunta dei punti al featuregroup
  // per gestirli più facilmente
  geo_lyr039pdf.addLayer(geoJson);
  // aggiunta del featuregroup alla mappa
  geo_lyr039pdf.addTo(mymap_pdf);
  //mymap_pdf.fitBounds(geo_lyr039pdf.getBounds());
  console.log('start load')
  //geo_lyr039pdf.on('load', function() {
    console.log('ok load')
    mymap_pdf.fitBounds(geo_lyr039pdf.getBounds());
    load_tile0pdf();
    // _onsole.log('bbb');
  //});

}

function load_tile0pdf(){

  let lyr='lyr036';
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  var tile0 = L.tileLayer(
    obj_lyr.tile_url,
    {
      maxZoom: 22
    }
  ).addTo(mymap_pdf);

  tile0.on("load",function() { 
    // _onsole.log("all tile_btn_map01 visible tiles have been loaded"); 
    load_tile1pdf();
  });

}

function load_tile1pdf(){
  //_console.log('ok tile');
  let lyr='lyr038';
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  var tile1 = L.tileLayer(
    obj_lyr.tile_url,
    {
      maxZoom: 20
    }
  ).addTo(mymap_pdf);

  tile1.on("load",function() { 
    // _onsole.log("all tile_btn_map01 visible tiles have been loaded"); 
    //load_lyr020();
    create_pdf=1;
    setInterval(
      function() {
        if(create_pdf==1){
          create_pdf=0;
          prepara_immagine_per_pdf();
        }
      },
      5000
    );
  });

}

function prepara_immagine_per_pdf(){

  //var canvas = document.querySelector("#image1_map");
  //https://jsfiddle.net/x512pgjt/269/ another example
  html2canvas(
    //document.body,
    document.querySelector("#mapid-pdf"), 
    {
      logging : true,
      async : true,
      //taint : false,
      useCORS: true,
      //canvas : canvas,
      allowTaint : false,
      imageTimeout:50000,
    }).then(function(canvas) {

    var dataURL = canvas.toDataURL("image/png");//.replace("image/png", "image/octet-stream");

    invia_image_data(dataURL);
  });


} // prepara_immagine_per_pdf

function invia_image_data(imgdata){

  /*dataString={
    //slugAPI:'watchdog-data',
    fn_group:'geodata',
    action:'api_lyr020',
    collection:'invio_immagine',
    qy_name:'A',
    lyr:'lyr020',
    geom:false,
    photo : imgdata,
    mydata_u : localStorage.pdf_date//'dMap.transaction.mydata_u'

  }

  generic_api(dataString,'invia_image_data');
  */

  dataString={
    fn_group:'geodata',
    action:'view_data',
    collection:'invio_immagine',
    qy_name:'A',
    lyr:'slug',//'lyr035',
    geom:false,
    item_token:'_token', //lyr035_token
    photo : imgdata,
  }
  generic_api(dataString,'invia_image_data');
  return;

}

dyn_functions['succ_invia_image_data'] = function(r){    
  console.log(r);
  console.log(HOME_PROJECT+'/'+r.file);
  localStorage.pdf_img = r.file;
  crea_pdf_con_immagine();
}

function crea_pdf_con_immagine(){


  let lyr='lyr039';
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;
  var r = obj_lyrlast_r;

  var f = r.features[0];
  var p = f.properties;

  dataString={
    //slugAPI:'watchdog-data',
    fn_group:'geodata',
    action:'view_data',
    collection:'crea_pdf_con_immagine',
    qy_name:'A',
    lyr:'slug',//'lyr020',
    geom:false,
    mydata_u : '0000',// localStorage.pdf_date,//'dMap.transaction.mydata_u'
    img : localStorage.pdf_img,
    model : 'A001',
    properties : p//,
    //centro_token:CENTRO_TOKEN,
    //type :MANDATO_TYPE,// dMap.apiInfo.user_token,

  }
  generic_api(dataString,'crea_pdf_con_immagine');
}

dyn_functions['succ_crea_pdf_con_immagine'] = function(r){  
  // _onsole.log(r)
  // _onsole.log(geovar.home_url+'/'+r.features[0].properties.file);
  //$('#mapid-pdf').remove();
  $('#mapid-pdf').css('display','none');

  var pdf_filename =r.file;
  console.log(pdf_filename);

  var popup = window.open(HOME_PROJECT+'/tmp/'+pdf_filename,
      "_blank"
  );
  popupBlockerChecker.check(popup); 

  /*var popup = window.open(
    HOME_PROJECT+'/',
      "_self"
  );
  popupBlockerChecker.check(popup);*/

} // prepara_immagine_per_pdf