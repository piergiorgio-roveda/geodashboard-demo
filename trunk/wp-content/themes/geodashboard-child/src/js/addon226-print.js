var a226_mapReady = 0;
//--
const a226_slug='print';

//--
var a226_canvasURL='';
// var a226_sheet=[];
// var a226_block=[];
var a226_lyrs_lgnd=[];
var a226_optPdf=new Array();
//var wiki_array_custom_js=[];
//var wiki_sub_last_r=new Array();
//--

dyn_functions['addon226-print'+'_ready'] = function(){

  $('.box-usrprofile').css('display','block');

  $('.box-usrprofile').append('<div '
    +'class="box-btn_'+a226_slug+' box-info-2-btn d-grid gap-2" '
    +'style="margin-top:5px;"></div>');
  
  a226_mapReady = 1;
  prepare_a226();

}

function prepare_a226(){

  let itemBtn = 'btn_'+a226_slug;

  //--
  
  let gLang_slug="label_"+itemBtn;
  let gLang_label="<i class=\"fa fa-print\" aria-hidden=\"true\"></i>";

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
      "g_style": "btn-sm btn-outline-dark " + GroupStyleBtn
    }
  }
  g_meta.geovar_button.features.push(btnMeta);

  create_button(itemBtn);

}

f_btn['btn_'+a226_slug]=function(slug){

  a226_lyrs_lgnd = [];

  a226_optPdf = new Array();

  sessionStorage.this_dialog_slug='a226_single';

  create_dialog2('a226_single');

}

dyn_functions['template_by_slug_a226_single'] = function(){

  let dlg_slug = 'a226_single';

  let c = '';

  let dlg_body = '.dlg_'+dlg_slug+''+'_body';

  c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  c = '<!--box button tab-->'
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  $(dlg_body).append(c);

  c = '<div>'
    +'<div class="col-btn-attrs" style="text-align:left;"></div>'
  +'</div>';
  $(dlg_body).append(c);

  //-- DLG PREPARE BODY

  c = '<!--tab1-->'
    +'<div '
      +'class="dlg_panel panel-tab1" '
      +'style="display:block;font-family:var(--wd-fonts-secondary);">'
      +'</div>'
    +'</div>'
    +'<!--tab1 END-->';

  $(dlg_body).append(c);

  let tab1_parts = [
    { 
      'g_slug': 'part_1',
      'g_type': 'map',
      //'title': 'Ispeziona Particelle'
    },
    { 
      'g_slug': 'part_2',
      'g_type': 'scalecontrol',
      //'title': 'Ispeziona Particelle'
    },
    { 
      'g_slug': 'part_3',
      'g_type': 'scalecontrolselect',
      //'title': 'Ispeziona Particelle'
    }
  ];

  tab1_parts.forEach(tab1_part_element => {
    dlg_a226_add_part(tab1_part_element);
  });

  //-- DLG FOOTER
  $('.ajs-footer-btn2').append(''
    +'<span class="box-btn_a226_print"></span>'
  +'');

  create_button('btn_a226_print');

}

dlg_close_functions['a226_inspect_single'] = function(){

}

//--

function dlg_a226_add_part(tab1_part_element){

  let p = tab1_part_element;

  let  c = ''
    +'<div class="row">'
      +'<div class="col-12">'
        +'<div class="'+p.g_slug+'">'
        +'</div>'
      +'</div>'
    +'</div>'
    +'';
  $('.panel-tab1').append(c);

  if(p.g_type=='map'){
    c = ''
      +'<div '
        +'class="box" style="'
          +'overflow:hidden;'
          +'width: 100%;'
          +'max-height:500px;'
          +'position: relative;'
          +'" '
        +'></div>';
    $('.panel-tab1 .'+p.g_slug+'').append(c);

    a226_map_init('.panel-tab1 .'+p.g_slug+' > .box');

  }
  else if(p.g_type=='scalecontrol'){
    /* c = ''
      +'<div '
        +'class="box" '
        +'></div>';
    $('.panel-tab1 .'+p.g_slug+'').append(c);
    c = ''
      +'<div '
      +'class="box-btn_scalecontrol"></div>';
    $('.panel-tab1 .'+p.g_slug+' > .box').append(c);

    create_button('btn_scalecontrol');
    $('#btn_scalecontrol').prop('disabled', false); */

  }
  else if(p.g_type=='scalecontrolselect'){
    c = ''
      +'<div '
        +'class="box" '
        +'></div>';
    $('.panel-tab1 .'+p.g_slug+'').append(c);

  }

}

//var a226_map = new Array();

function a226_map_init(box){
  //A5 148 x 210 mm
  c = ''
    +'<div '
      +'id="a226_map" style="'
      +'width: 29.7cm;'
      +'height: 21cm;'
      +'position: relative;'
      +'left: -9cm;'
      +'top: -3cm;'
      +'" '
      +'></div>';
  $(box).append(c);

  maps.a226_map = L.map('a226_map',{
    minZoom: 1,
    maxZoom: 20,
    zoomControl: false,
    zoomSnap: 0.5,
    zoomDelta: 0.5,
    //wheelPxPerZoomLevel: 100,
    scrollWheelZoom: false,
    doubleClickZoom: false
  })

  maps.a226_map.setView([
    localStorage.map_lat,
    localStorage.map_lng
  ],
    localStorage.map_zoom
  );

  let lyr='lyr040';
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  maps.a226_map.createPane('print_'+lyr+'_pane');
  maps.a226_map.getPane('print_'+lyr+'_pane').style.zIndex = lyr.zIndex;
  // _onsole.log(lyr)
  // _onsole.log(lyr.indexOf("pointerEvents"))

  if(obj_lyr.pointerEvents!=undefined 
    && obj_lyr.pointerEvents===false){
    // Layers in this pane are non-interactive and 
    //do not obscure mouse/touch events
    maps.a226_map.getPane('print_'+lyr+'_pane').style.pointerEvents = 'none';
  }

  /* geo_lyr[lyr] = L.tileLayer(
    obj_lyr.tile_url,
    {
      attribution: obj_lyr.attribution,
      pane: lyr+'_pane'
    }
  ).addTo(maps.a226_map); */

  setTimeout(a226_sayHi, 1000);

}

function a226_sayHi() {

  maps.a226_map.invalidateSize();

  var control_scale = L.control.scale().addTo(maps.a226_map);
  $('.leaflet-control-scale').css('display','none');

  a226_scalecontrol();

  setTimeout(a226_sayHi2, 1000);

}

function a226_sayHi2() {

  dMap.analisi01.grLyrToc.forEach(item_lyr => {

    let o = g_meta.geovar_lyr.features;
    let this_obj=o.filter(({properties}) => properties.g_slug === item_lyr);
    let obj_lyr=this_obj[0].properties;

    if(obj_lyr.visible!=undefined && obj_lyr.visible==true){
      
      // _onsole.log('visible',obj_lyr);

      if(obj_lyr.lyr_type=='group'){

        obj_lyr.g_options.forEach(child_lyr => {

          let child_this_obj=o.filter(({properties}) => properties.g_slug === child_lyr);
          let child_obj_lyr=child_this_obj[0].properties;
          let visible = obj_lyr.visible;
          child_obj_lyr.visible=visible;

          a226_add_lyr(child_obj_lyr);
          
          if(child_obj_lyr.lyr_legend=='sld'){

            a226_lyrs_lgnd.push(child_obj_lyr);
          
          }

        });
      }
      else{

        a226_add_lyr(obj_lyr);

        if(obj_lyr.lyr_legend=='sld'){

          a226_lyrs_lgnd.push(obj_lyr);
        
        }

      }


    }


  });

  let lyr='lyr040';
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  geo_lyr[lyr] = L.tileLayer(
    obj_lyr.tile_url,
    {
      maxNativeZoom: 22,
      maxZoom: 22,
      attribution: obj_lyr.attribution,
      pane: 'print_'+lyr+'_pane'
    }
  ).addTo(maps.a226_map);

}

function a226_add_lyr(obj_lyr){

  let lyr = obj_lyr.g_slug;

  if(obj_lyr.lyr_type=='wms'){

    geo_lyr['print_'+lyr] = new L.featureGroup();

    maps.a226_map.createPane('print_'+lyr+'_pane');
    maps.a226_map.getPane('print_'+lyr+'_pane').style.zIndex = '900';

    var opt_layer=WORKSPACE+':'+obj_lyr.geoserver_name+GEOSERVER_SUFFIX;
    var opt_pane='print_'+lyr+'_pane';

    var opt={
      //layers:opt_layer,
      transparent:'true',
      format:'image/png',//PNG 24bit
      //format_options:'dpi:300',
      opacity:1,
      tiled: false,
      //info_format: 'text/html',
      pane:opt_pane,
      antialiasing:'on',
      maxZoom: 20,
      version: '1.3.0'
    };

    if(obj_lyr.geoserver_style=='tmp_sld'){
        //opt['sld'] = 'https:'+DOMAIN_PROJECT+'/style/'+obj_lyr.sld_url+'.sld';
        opt['sld'] = 'https:'+DOMAIN_PROJECT+'/tmp/'+obj_lyr.geoserver_style_name+'.sld';
        //opt['sld'] = HOME_PROJECT+'/script/sld/?g_master='+obj_lyr.geoserver_name+'';
        //opt['sld_body'] = encodeURIComponent(sld_body[lyr]);
    }
    else if(obj_lyr.geoserver_style=='default'){
      opt['layers'] = opt_layer;

    }
    else{
      opt['styles'] = obj_lyr.geoserver_style;
      opt['layers'] = opt_layer;
    }

    //_onsole.log(obj_lyr);
    if(typeof obj_lyr.g_options[0] !== "undefined"){

      //_onsole.log(obj_lyr.g_options[0].geoserver_filter);

      if(typeof obj_lyr.g_options[0].geoserver_filter !== "undefined"){
        let geoserver_filter = obj_lyr.g_options[0].geoserver_filter;

        let i = 0;
        let cql_string = '';
        geoserver_filter.forEach(filter => {
          //_onsole.log(filter.val);
          if(i==0){
            cql_string += filter.col+' IN (\''+filter.val[0]+'\')';
          }
          else{
            cql_string += ' AND ' + filter.col+' IN (\''+filter.val.join('\',\'')+'\')';
          }
          i++;
        });
        opt['CQL_FILTER'] = cql_string;
      }

    }

    //CQL_FILTER: g_master=G_MASTER

    //_onsole.log('load wms',opt);

    //_onsole.log('no wms services');

    geo_lyr['print_'+lyr].addLayer(L.tileLayer.wms(
      GEOSERVER_URL+WORKSPACE+'/wms?',//verify
      opt
    ));
   
    // FINAL ADD!
    geo_lyr['print_'+lyr].addTo(maps.a226_map);  



  }

}

//--

function a226_scalecontrol(){

  // if(sessionStorage.scalecontrol==1){
  //   sessionStorage.scalecontrol=0;
  //   a226_reset();
  //   $('.leaflet-control-scale').css('display','none');
  // }
  // else{

    sessionStorage.scalecontrol=1;

    maps.a226_map.options.zoomSnap=0.01;
    maps.a226_map.options.zoomDelta=0.01;

    $('.leaflet-control-scale').css('display','');

    $('.part_3 > .box').html(''
      +'<div class="box-scaleselect" style="margin-top:5px;">'
        +'<select class="form-control form-select" aria-label="Default select example" style="font-size:75%;">'
          +'<option selected>--Scale</option>'
          +'<option value="1000">1:1,000</option>'
          +'<option value="2000">1:2,000</option>'
          +'<option value="5000">1:5,000</option>'
          +'<option value="10000">1:10,000</option>'
        +'</select>'
      +'</div>');
    $('.box-scaleselect > .form-control').on('change', function() {

      sessionStorage.scaleratio = $(this).find('option:selected').val();

      a226_optPdf.scale = sessionStorage.scaleratio;

      dyn_zoomend['get_scale_dimension'](maps.a226_map);

    });
  // }

}

function a226_reset(){

  maps.a226_map.options.zoomSnap=0.5;
  maps.a226_map.options.zoomDelta=0.5;
  maps.a226_map.setZoom(maps.a226_map.getZoom());
  $('.box-scaleselect').remove();

}

f_btn['btn_a226_print']=function(slug){

  $('#a226_map').css('display','block');
  maps.a226_map.invalidateSize();
  $('.box-scaleselect').html('Attendere il render della mappa.');
  $('#btn_a226_print').prop('disabled',true);
  create_pdf=1;

  setInterval(
    function() {
      if(create_pdf==1){
        
        create_pdf=0;
        a226_prepara_immagine_per_pdf();
      }
    },
    3000
  );

}

function a226_prepara_immagine_per_pdf(){
  $('.leaflet-control-scale-line').remove();
  //var canvas = document.querySelector("#image1_map");
  //https://jsfiddle.net/x512pgjt/269/ another example
  html2canvas(
    //document.body,
    document.querySelector("#a226_map"),
    {
      logging : true,
      async : true,
      //taint : false,
      useCORS: true,
      //canvas : canvas,
      allowTaint : false,
      imageTimeout:100000,
    }).then(function(canvas) {

    a226_canvasURL = canvas.toDataURL("image/png");//.replace("image/png", "image/octet-stream");

    a226_chooseTemplate();

  });


} // a226_prepara_immagine_per_pdf

function a226_chooseTemplate(){

  $('.panel-tab1').html('');

  let itemBtn = 'btn_a226_template';

  //-- DLG FOOTER
  $('.ajs-footer-btn2').html(''
    +'<span class="box-btn_a226_template"></span>'
  +'');

  //-- DLG BODY

  // let dlg_slug = 'a226_single';

  let p = { 
    'g_slug': 'part_4',
    'g_type': 'template',
    //'title': 'Ispeziona Particelle'
  }

  let  c = ''
    +'<div class="row row_a226_image" >'
      +'<div class="col-12 a226_template_A">'
        +'<div class="'+p.g_slug+'_A">'
          +'<img class="a226_image" style="width:100%;" />'
        +'</div>'
      +'</div>'     
    +'</div>'
    +'';
  $('.panel-tab1').append(c);

  const img = new Image(); // Create new img element
  img.src = a226_canvasURL; // Set source path

  $('.a226_image').attr('src',a226_canvasURL);

  //-- BTN
  let gLang_slug="label_"+itemBtn;
  let gLang_label="CREA PDF";

  gLang[gLang_slug]=gLang_label;

  let GroupStyleBtn = 'btn-main-sidebar btn-on-dlg';
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
      "g_style": "btn-sm btn-outline-dark " + GroupStyleBtn
    }
  }
  g_meta.geovar_button.features.push(btnMeta);

  create_button(itemBtn);

  a226_optPdf.lgnd = 'none';

  if(a226_lyrs_lgnd.length>0){

    c = ''
    +'<div class="row">'
      +'<div class="col-12" style="text-align:center;padding:10px;">'
        +'<span class="box-btn_a226_template_lgnd_sx"></span>'
        +'&nbsp;'
        +'<span class="box-btn_a226_template_no_lgnd"></span>'
        +'&nbsp;'
        +'<span class="box-btn_a226_template_lgnd_dx"></span>'
      +'</div>'     
    +'</div>'
    +'';
    $('.panel-tab1').append(c);

    //-- BTN no lgnd
    itemBtn = 'btn_a226_template_no_lgnd';
    gLang_slug="label_"+itemBtn;
    gLang_label="<i class=\"bi bi-aspect-ratio\"></i>";

    gLang[gLang_slug]=gLang_label;

    GroupStyleBtn = 'btn-main-sidebar btn-on-dlg';
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

    //-- BTN lgnd dx
    itemBtn = 'btn_a226_template_lgnd_dx';
    gLang_slug="label_"+itemBtn;
    gLang_label="<i class=\"bi bi-layout-sidebar-inset-reverse\"></i>";

    gLang[gLang_slug]=gLang_label;

    GroupStyleBtn = 'btn-main-sidebar btn-on-dlg';
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

    //-- BTN lgnd sx
    itemBtn = 'btn_a226_template_lgnd_sx';
    gLang_slug="label_"+itemBtn;
    gLang_label="<i class=\"bi bi-layout-sidebar-inset\"></i>";

    gLang[gLang_slug]=gLang_label;

    GroupStyleBtn = 'btn-main-sidebar btn-on-dlg';
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

  }
  else{
    c = ''
    +'<div class="row">'
      +'<div class="col-12" style="text-align:center;padding:10px;">'
        +'Nessuna Legenda disponibile per i layer visualizzati'
      +'</div>'     
    +'</div>'
    +'';
    $('.panel-tab1').append(c);
  }

}

f_btn['btn_a226_template']=function(slug){

  a226_invia_image_data(a226_canvasURL);

}

f_btn['btn_a226_template_no_lgnd']=function(slug){
  let p = { 
    'g_slug': 'part_4',
    'g_type': 'template',
    //'title': 'Ispeziona Particelle'
  }
  let  c = ''
    +'<div class="row row_a226_image" >'
      +'<div class="col-12 a226_template_A">'
        +'<div class="'+p.g_slug+'_A">'
          +'<img class="a226_image" style="width:100%;" />'
        +'</div>'
      +'</div>'    
    +'</div>'
    +'';
  $('.row_a226_image').html(c);
  $('.a226_image').attr('src',a226_canvasURL);
  a226_optPdf.lgnd = 'none';
}

f_btn['btn_a226_template_lgnd_dx']=function(slug){
  let p = { 
    'g_slug': 'part_4',
    'g_type': 'template',
    //'title': 'Ispeziona Particelle'
  }
  let  c = ''
    +'<div class="row row_a226_image" >'
      +'<div class="col-8 a226_template_A">'
        +'<div class="'+p.g_slug+'_A">'
          +'<img class="a226_image" style="width:100%;" />'
        +'</div>'
      +'</div>'
      +'<div class="col-4 a226_template_B">'
        +'<div class="'+p.g_slug+'_B">'
          +'LEGENDA'
          +'<div class="a226_lgnd_list" style="width:100%;"></div>'
        +'</div>'
      +'</div>'      
    +'</div>'
    +'';
  $('.row_a226_image').html(c);
  $('.a226_image').attr('src',a226_canvasURL);
  
  a226_add_lgnd_list();
  a226_optPdf.lgnd = 'dx';
}

f_btn['btn_a226_template_lgnd_sx']=function(slug){
  let p = { 
    'g_slug': 'part_4',
    'g_type': 'template',
    //'title': 'Ispeziona Particelle'
  }
  let  c = ''
    +'<div class="row row_a226_image" >'
      +'<div class="col-4 a226_template_A">'
        +'<div class="'+p.g_slug+'_A">'
          +'LEGENDA'
          +'<div class="a226_lgnd_list" style="width:100%;"></div>'
        +'</div>'      
      +'</div>'
      +'<div class="col-8 a226_template_B">'
        +'<div class="'+p.g_slug+'_B">'
          +'<img class="a226_image" style="width:100%;" />'
        +'</div>'
      +'</div>'      
    +'</div>'
    +'';
  $('.row_a226_image').html(c);
  $('.a226_image').attr('src',a226_canvasURL);

  a226_add_lgnd_list();
  a226_optPdf.lgnd = 'sx';
}

function a226_add_lgnd_list(){

  a226_lyrs_lgnd.forEach(element => {

    $('.a226_lgnd_list').append(''
      +'<div class="form-check">'
        +'<input class="form-check-input a226-lgnd-lyr-input" g_slug="'+element.g_slug+'" '
          +'type="radio" name="flexRadioDefault" '
          +'id="radio_'+element.g_slug+'">'
        +'<label class="form-check-label" for="flexRadioDefault1">'
          +element.g_label
        +'</label>'
      +'</div>'
    );
    
  });

  $(".a226-lgnd-lyr-input").click(function(){
    var radioValue = $(".a226-lgnd-lyr-input:checked").attr('g_slug');
    if(radioValue){
      // _onsole.log("Your are a - " + radioValue);
      a226_optPdf.lgnd_lyr = radioValue;
    }
  });  


}

function a226_invia_image_data(imgdata){

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

  generic_api(dataString,'a226_invia_image_data');
  */

  dataString={
    fn_group:'geodata',
    action:'view_data',
    collection:'invio_immagine',
    qy_name:'A',
    lyr:'slug',//'lyr035',
    geom:false,
    item_token:'_token', //lyr035_token
    photo : imgdata
  }
  generic_api(dataString,'a226_invia_image_data');
  return;

}

dyn_functions['succ_a226_invia_image_data'] = function(r){    

  console.log(r);
  console.log(HOME_PROJECT+'/'+r.file);
  localStorage.pdf_img = r.file;
  $('#a226_map').css('display','none');
  //$('.part_1 > .box').append('<img src="'+localStorage.pdf_img+'" style="width:100%;" />');
  $('.box-scaleselect').html('La mappa è stata aperta in una nuova scheda, pronta per essere salvata.');
  $('#btn_a226_print').prop('disabled',true);
  a226_crea_pdf_con_immagine();

}

/* function startDownload() {
  let imageURL = "https://geoserver.studiositsa.ch:8443/geoserver/studiosit/wms?&service=WMS&request=GetMap&styles=&format=image%2Fpng&transparent=true&version=1.3.0&tiled=false&antialiasing=on&sld=https%3A%2F%2Fgeoweb.studiositsa.ch%2Fsit%2Falbissolamarina%2Fscript%2Fsld%2F%3Fg_master%3Dlyrsit046&width=256&height=256&crs=EPSG%3A3857&bbox=946596.1582836229,5515695.96105832,947819.1507361857,5516918.953510881";
  let imageDescription = "The Mozilla logo";

  downloadedImg = new Image();
  downloadedImg.crossOrigin = "Anonymous";
  downloadedImg.addEventListener("load", imageReceived, false);
  downloadedImg.alt = imageDescription;
  downloadedImg.src = imageURL;
}

function imageReceived() {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = downloadedImg.width;
  canvas.height = downloadedImg.height;
  canvas.innerText = downloadedImg.alt;

  context.drawImage(downloadedImg, 0, 0);
  //imageBox.appendChild(canvas);
  console.log(canvas);
  $('#mapid').html(canvas);

  try {
    localStorage.setItem("saved-image-example", canvas.toDataURL("image/png"));
  } catch (err) {
    console.error(`Error: ${err}`);
  }
} */

function a226_crea_pdf_con_immagine(){


  let lyr='lyr999';
  // let o = g_meta.geovar_lyr.features
  // let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  // let obj_lyr=this_obj[0].properties;
  // var r = obj_lyrlast_r;

  // var f = r.features[0];
  // var p = f.properties;
  // _onsole.log('optPdf',a226_optPdf);
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
    model : 'A002',
    pdf_lgnd : a226_optPdf.lgnd,
    pdf_lgnd_lyr : a226_optPdf.lgnd_lyr,
    pdf_scale : a226_optPdf.scale,
    pdf_WORKSPACE:WORKSPACE,
    pdf_DOMAIN_PROJECT:DOMAIN_PROJECT,
    pdf_GEOSERVER_URL:GEOSERVER_URL
    //properties : p//,
    //centro_token:CENTRO_TOKEN,
    //type :MANDATO_TYPE,// dMap.apiInfo.user_token,

  }
  generic_api(dataString,'a226_crea_pdf_con_immagine');
}

dyn_functions['succ_a226_crea_pdf_con_immagine'] = function(r){  
  // _onsole.log(r)
  // _onsole.log(geovar.home_url+'/'+r.features[0].properties.file);
  //$('#mapid-pdf').remove();
  //$('#mapid-pdf').css('display','none');

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