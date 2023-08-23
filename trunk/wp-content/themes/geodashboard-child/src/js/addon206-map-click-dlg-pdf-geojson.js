list_mapclick.push('mapclick');

//g_meta.geovar_dialog is update from DB
//but to customize can push this array
var meta = {
  'properties':{
    'g_description': null,
    'g_label': 'Export view',
    'g_slug': 'mapclick_single',
    'g_template': 'template_by_slug',
  }
}
g_meta.geovar_dialog.features.push(meta);

var geo_lyr039 = new L.featureGroup();
//mymap.createPane('lyr039_pane');

//--
var box_jpg_width_mm = 287;
var box_jpg_height_mm = 203;

var box_jpg_width_px = box_jpg_width_mm*72/25.4*2;
var box_jpg_height_px = box_jpg_height_mm*72/25.4*2;

$('body').append(''
  +'<div id="mapid-pdf" '
    +'style="'
      +'display:none;'
      +'width:'+box_jpg_width_px+'px;'
      +'height:'+box_jpg_height_px+'px;'
      +'" '
    +'>'
  +'</div>'
+'');

var mymap_pdf = L.map('mapid-pdf',{
  minZoom: 1,
  maxZoom: 20,
  zoomControl: false,
  //zoomSnap: 0.25,
  //zoomDelta: 0.25,
  //wheelPxPerZoomLevel: 50
}).setView([0,0],20);

//--

show_start_lyr039_msg();

function show_start_lyr039_msg(){

  $('.box-editing2').css('display','block');
  $('.box-editing2').css('justify-content','center');

  $('.box-editing2').html(''
    +'<div '
      +'class="start-msg" '
      +'style="display:inline;'
        +'padding:15px;'
        +'background-color:yellow;">'
      +'<span>CLICK ON MAP</span>'
    +'</div>'
  +'');

}

dyn_mapclick['mapclick'] = function(opt){

  /*
  const info_title = 'Map click';

  let c = '<div class="mainboxItem" '
    +'style="margin-top:5px;"></div>';

  //box button tab
  c += ''
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  //box button tab -end

  //box tab1
  c += '<div '
    +'class="dlg_panel panel-tab1" '
    +'style="display:block;font-family:var(--wd-fonts-secondary);">';
  //c += '<p>TAB1</p>';
  c+='Latitudine: '+e.latlng.lat;
  c+='<br>Longitudine: '+e.latlng.lng;
  c += '</div><!--tab1-->'; 
  */
  //create_dialog(c,info_title,'dlg001');

  sessionStorage.this_dialog_lyr='mapclick';
  sessionStorage.this_dialog_slug='mapclick'+'_single';//'lyr035_single'
  //
  sessionStorage.mapclick_lat=opt.lat;
  sessionStorage.mapclick_lng=opt.lng;

  dataString={
    fn_group:'geodata',
    action:'view_data',
    collection:'lyr_single_one_table_xy',
    qy_name:'A',
    lyr:'lyr039',
    geom:true,
    lat:sessionStorage.mapclick_lat,
    lng:sessionStorage.mapclick_lng
  }
  generic_api(dataString,'lyr_single_one_table_xy');
  return;

  //create_dialog2(sessionStorage.this_dialog_slug);

}

function geo_lyr039_style(feature, layer) {

  layer.setStyle({
    fillColor:'#fff',
    color:'#ff0000',
    weight:4,
    opacity:1,
    fillOpacity:0,
    clickable:false
  });//.on('click', geo_lyr5_onClick);

}

dyn_functions['succ_lyr_single_one_table_xy'] = function(r){

  g_meta.geovar_lyr.features.forEach((f,i) => {
    if(f.properties.g_slug==='lyr045'){
      g_meta.geovar_lyr.features[i].properties.last_r=r
    }
  });

  //t@his_lyr[r.ds.lyr].last_r=r;

  remove_lyr('lyr039');

  var f = r.features[0];
  var p = f.properties;

  var options={
    onEachFeature: eval('geo_lyr039_style'),
    pane:'lyr039_pane'
  }
  var geoJson = L.geoJson(r,options);
  // aggiunta dei punti al featuregroup
  // per gestirli più facilmente
  geo_lyr039.addLayer(geoJson);
  // aggiunta del featuregroup alla mappa
  geo_lyr039.addTo(mymap);

  mymap.fitBounds(geo_lyr039.getBounds());

  $('.box-editing2').css('display','block');
  $('.box-editing2').css('justify-content','center');

  $('.box-editing2').html(''
    +'<div '
      +'class="lyr39-msg row justify-content-md-center" '
      +'>'
      +'<div class="col col-2" style="background-color: #FFFC00;">'
        +'<table style="height: 40px;">'
          +'<tbody>'
            +'<tr>'
              +'<td class="align-middle"><span>'+p.comm_name+'</span></td>'
            +'</tr>'
          +'</tbody>'
        +'</table>'
      +'</div>'
      +'<div class="col-auto" style="background-color: #FFFC00;padding: 5px 0px;">'
          +'<button '
            //+'id="info-lyr8-confirm" '
            +'class="btn-lyr039-clear btn btn_explorer btn-sm btn-dark btn-main-sidebar" '
            +'edit="">'
            //+'<i class="fa fa-floppy-o" aria-hidden="true"></i>'
            +'CLEAR'
          +'</button>'        
          +'&nbsp;<button '
            //+'id="info-lyr8-trash" '
            +'class="btn-lyr039-dlg-export btn btn_explorer btn-sm btn-dark btn-main-sidebar" '
            +'style="margin-right: 10px;" '
            +'>'
            //+'<i class="fa fa-trash" aria-hidden="true"></i>'
            +'EXPORT'
          +'</button>'
      +'</div>'
    +'<div>'
  +'');

  $('.btn-lyr039-clear').on('click',function(){

    //$('.box-editing2').css('display','none');
    //$('.box-editing2').html('');
    show_start_lyr039_msg();
    remove_lyr('lyr039');

  });

  $('.btn-lyr039-dlg-export').on('click',function(){

    //$('.box-editing2').css('display','none');
    //$('.box-editing2').html('');
    show_start_msg();
    remove_lyr('lyr039');

    create_dialog2(sessionStorage.this_dialog_slug);

  });

}

dyn_functions['template_by_slug_'+'mapclick_single'] = function(){

  var slug='mapclick_single';

  var c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $('.dlg_'+slug+'_body').append(c);

  //box button tab
  var c = ''
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  $('.dlg_'+slug+'_body').append(c);

  var c = '<div>'
    +'<div class="col-btn-attrs" style="text-align:left;"></div>'
  +'</div>';
  $('.dlg_'+slug+'_body').append(c);

  //box tab1
  c += '<div '
    +'class="dlg_panel panel-tab1" '
    +'style="display:block;font-family:var(--wd-fonts-secondary);">';
  //c += '<p>TAB1</p>';
  c+='Download PDF of vizualized area or vector boundaries of admin level (GeoJSON format)'
  c += '</div><!--tab1-->';
  
  $('.dlg_'+slug+'_body').append(c);

  $('.ajs-footer-btn2').append(''
    +'<button '
      +'type="button" '
      +'class="btn btn-sm btn-dark btn-print-pdf">PRINT PDF</button>'
    +'&nbsp;<button '
      +'type="button" '
      +'class="btn btn-sm btn-dark btn-download-json">DOWNLOAD GEOMETRY</button>'
  +'');

  $('.btn-print-pdf').on('click',function(){
    //---
    vlyr007_pdf('generic')

  });

  $('.btn-download-json').on('click',function(){
    //---
    vlyr007_output('json')

  });

}

function vlyr007_pdf(type){

  $('#mapid-pdf').css('display','');

  create_mymap_pdf();
  
}

function vlyr007_output(type){

  let lyr = 'lyr039';
  let obj_lyr=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === lyr)[0].properties;

  if(type=='json'){
    dataString={
      fn_group:'geodata',
      action:'view_data',
      collection:'crea_json_from_ds',
      qy_name:'A',
      lyr:lyr,
      r:obj_lyr.last_r
    }
    generic_api(dataString,'crea_json_from_ds');
    return;
  }
  else{
    console.log('no type defined')
  }
  
}

dyn_functions['succ_crea_json_from_ds'] = function(r){

  //$('#mapid-pdf').css('display','none');

  var json_filename =r.features[0].properties.filename;

  window.open(HOME_PROJECT+'/tmp/'+json_filename,"_blank");
  //popupBlockerChecker.check(popup); 

}