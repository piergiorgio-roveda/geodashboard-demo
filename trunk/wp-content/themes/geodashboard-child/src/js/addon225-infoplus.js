//--
var a225_mapReady = 0;
// var addon225_slug='infolus_test';
// var a225_sheet=[];
// var a225_block=[];
var a225_lyrs=[];
//var wiki_array_custom_js=[];
//var wiki_sub_last_r=new Array();
//--
const addon225_slug='infoplus';
//--

var a225_coords=[];
var a225_coords_p=[];
var a225_coords_p2=[];
var a225_coords_last=[];
var a225_coords_tmp=[];
var a225_coords_start=[];

//--
dyn_functions['addon225-infoplus'+'_ready'] = function(){

  $('.box-usrprofile').css('display','block');

  $('.box-usrprofile').append('<div '
    +'class="box-btn_infolus box-info-2-btn d-grid gap-2" '
    +'style="margin-top:5px;"></div>');

  a225_mapReady = 1;

  list_mapclick.push(addon225_slug);

  addon225_ready();

}

function addon225_ready(){
  if (f_wait.geovar_button==0) {
    // _onsole.log('wait')
    setTimeout(function(){addon225_ready()},1000);
    return;
  } else {
    prepare_addon225();
  };
}

function prepare_addon225(){

  g_meta.geovar_addon.features.push({
    "properties": {
      "g_slug" : addon225_slug,
      "addon_status" : "enabled",
      "mapclick_status" : "disabled",
      "point_miner" : "disabled",
      "polygon_miner" : "disabled",
    }
  });

  let item_btn = 'btn_infolus';
  let obj_btn=g_meta.geovar_button.features.filter(({properties}) => properties.g_slug === item_btn);
  //let g_group = '';
  if(obj_btn.length>0){
    //g_group = obj_btn[0].properties.g_group[0];
    obj_btn[0].status = 'disabled';
  }
  else{
    console.log('BTN without properties!');
    return;
  }

  create_button(item_btn);

}

f_btn['btn_infolus']=function(slug){

  let item_addon = 'infoplus';
  let obj_fileterd=g_meta.geovar_addon.features.filter(({properties}) => properties.g_slug === item_addon);
  let obj_addon = obj_fileterd[0];

  if(obj_addon.properties.mapclick_status=='disabled'){
    enable_addon225();
  }
  else{
    disable_addon225();
  }
  //_onsole.log(obj_addon.properties);
  return;

}

f_btn['btn_addon225_by_point']=function(slug){

  $('.box-btn_addon225_block_inspect').remove();

  $('#btn_addon225_by_point').css('background-color','yellow');
  $('#btn_addon225_by_polyline').css('background-color','white');
  $('#btn_addon225_by_polygon').css('background-color','white');

  let item_addon = 'infoplus';
  let obj_fileterd=g_meta.geovar_addon.features.filter(({properties}) => properties.g_slug === item_addon);
  let obj_addon = obj_fileterd[0];

  obj_addon.properties.point_miner='enabled';
  obj_addon.properties.polyline_miner='disabled';
  obj_addon.properties.polygon_miner='disabled';

  mymap.removeLayer(geo_lyr['vlyrsit005']);
  geo_lyr['vlyrsit005'].clearLayers();
  mymap.removeLayer(geo_lyr['vlyrsit006']);
  geo_lyr['vlyrsit006'].clearLayers();

  a225_coords=[];
  a225_coords_p=[];
  a225_coords_p2=[];
  a225_coords_last=[];
  a225_coords_tmp=[];
  a225_coords_start=[];

}

f_btn['btn_addon225_by_polyline']=function(slug){

  $('.box-btn_addon225_block_inspect').remove();

  $('#btn_addon225_by_point').css('background-color','white');
  $('#btn_addon225_by_polyline').css('background-color','yellow');
  $('#btn_addon225_by_polygon').css('background-color','white');

  let item_addon = 'infoplus';
  let obj_fileterd=g_meta.geovar_addon.features.filter(({properties}) => properties.g_slug === item_addon);
  let obj_addon = obj_fileterd[0];

  obj_addon.properties.point_miner='disabled';
  obj_addon.properties.polyline_miner='enabled';
  obj_addon.properties.polygon_miner='disabled';

  mymap.removeLayer(geo_lyr['vlyrsit003']);
  geo_lyr['vlyrsit003'].clearLayers();
  mymap.removeLayer(geo_lyr['vlyrsit004']);
  geo_lyr['vlyrsit004'].clearLayers();
  mymap.removeLayer(geo_lyr['vlyrsit006']);
  geo_lyr['vlyrsit006'].clearLayers();

  a225_coords=[];
  a225_coords_p=[];
  a225_coords_p2=[];
  a225_coords_last=[];
  a225_coords_tmp=[];
  a225_coords_start=[];

}

f_btn['btn_addon225_by_polygon']=function(slug){

  $('.box-btn_addon225_block_inspect').remove();

  $('#btn_addon225_by_point').css('background-color','white');
  $('#btn_addon225_by_polyline').css('background-color','white');
  $('#btn_addon225_by_polygon').css('background-color','yellow');

  let item_addon = 'infoplus';
  let obj_fileterd=g_meta.geovar_addon.features.filter(({properties}) => properties.g_slug === item_addon);
  let obj_addon = obj_fileterd[0];

  obj_addon.properties.point_miner='disabled';
  obj_addon.properties.polyline_miner='disabled';
  obj_addon.properties.polygon_miner='enabled';

  mymap.removeLayer(geo_lyr['vlyrsit003']);
  geo_lyr['vlyrsit003'].clearLayers();
  mymap.removeLayer(geo_lyr['vlyrsit004']);
  geo_lyr['vlyrsit004'].clearLayers();
  mymap.removeLayer(geo_lyr['vlyrsit006']);
  geo_lyr['vlyrsit006'].clearLayers();

  a225_coords=[];
  a225_coords_p=[];
  a225_coords_p2=[];
  a225_coords_last=[];
  a225_coords_tmp=[];
  a225_coords_start=[];

}

f_btn['btn_addon225_by_close']=function(slug){

  disable_addon225();

}

//--

function enable_addon225(){

  $('#btn_infolus').css('background-color','yellow');

  $('.box-editing2').css('display','block');
  $('.box-editing2').css('justify-content','center');
  $('.box-editing2').html(''
    +'<div class="col-auto ct-editing2-info" style="text-align:center;">'
      +'<div class="box card" '
        +'style="width:200px;margin:auto;display:block;" '
      +'></div>'
    +'</div>'
    +'<div class="col-auto ct-editing2" style="padding: 5px 0px;">'
      +'<span '
        +'class="box-btn_addon225_by_point"></span>'
      +'<span '
        +'class="box-btn_addon225_by_polyline" '
        +'style="margin-left:5px;"></span>'
      +'<span '
        +'class="box-btn_addon225_by_polygon" '
        +'style="margin-left:5px;margin-right:5px;"></span>'
      +'<span '
        +'class="box-btn_addon225_by_close"></span>'
    +'</div>'
  +'');

  create_button('btn_addon225_by_point');
  create_button('btn_addon225_by_polyline');
  create_button('btn_addon225_by_polygon');
  create_button('btn_addon225_by_close');

  //on start
  let item_addon = 'infoplus';
  let obj_fileterd=g_meta.geovar_addon.features.filter(({properties}) => properties.g_slug === item_addon);
  let obj_addon = obj_fileterd[0];

  obj_addon.properties.mapclick_status='enabled';

  obj_addon.properties.point_miner='enabled';
  $('#btn_addon225_by_point').css('background-color','yellow');

}

function disable_addon225(){

  $('#btn_infolus').css('background-color','white');

  $('.box-editing2').css('display','none');
  $('.box-editing2').html('');

  let item_addon = 'infoplus';
  let obj_fileterd=g_meta.geovar_addon.features.filter(({properties}) => properties.g_slug === item_addon);
  let obj_addon = obj_fileterd[0];

  obj_addon.properties.mapclick_status='disabled';

  obj_addon.properties.point_miner='disabled';
  obj_addon.properties.polygon_miner='disabled';

  mymap.removeLayer(geo_lyr['vlyrsit003']);
  geo_lyr['vlyrsit003'].clearLayers();
  mymap.removeLayer(geo_lyr['vlyrsit004']);
  geo_lyr['vlyrsit004'].clearLayers();
  mymap.removeLayer(geo_lyr['vlyrsit005']);
  geo_lyr['vlyrsit005'].clearLayers();
  mymap.removeLayer(geo_lyr['vlyrsit006']);
  geo_lyr['vlyrsit006'].clearLayers();

  $('.ct-editing2-info > .box').html('');

}

dyn_mapclick[addon225_slug] = function(e){
  let firstPoint = e.latlng;
  let item_addon = 'infoplus';
  let obj_fileterd=g_meta.geovar_addon.features.filter(({properties}) => properties.g_slug === item_addon);
  let obj_addon = obj_fileterd[0];

  if(obj_addon.properties.point_miner=='enabled'){
    //_onsole.log('addon225: point_miner');
  }
  else if(obj_addon.properties.polygon_miner=='enabled'){
    //_onsole.log('addon225: polygon_miner');
  }
  else if(obj_addon.properties.polyline_miner=='enabled'){
    //_onsole.log('addon225: polygon_miner');
  }
  else{ 
    //_onsole.log('addon225: no miner');
    return;
  }

  sessionStorage.mapclick_lat=e.latlng.lat;
  sessionStorage.mapclick_lng=e.latlng.lng;

  let latlng = [e.latlng.lng,e.latlng.lat];

  // var latlngs2 = [
  //     [45.51, -122.68],
  //     [37.77, -122.43],
  //     [34.04, -118.2]
  // ];

  //console.log(a225_coords)
  //console.log(latlngs2)
  // var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);

  a225_coords.push(latlng);

  a225_coords_p.push(latlng);

  a225_coords_last = latlng;

  if(a225_coords.length==1){

    a225_coords_start = latlng;

  }

  //console.log('mapclick_lat: '+sessionStorage.mapclick_lat);

  //mymap.removeLayer(lyr_polygon);
  //geo_lyr['lyr_polygon'].clearLayers();
  //mymap.removeLayer(geo_lyr['lyr_polyline']);
  //geo_lyr['lyr_polyline'].clearLayers();

  if(obj_addon.properties.point_miner=='enabled'){

    let item_lyr = 'vlyrsit003';

    geo_lyr[item_lyr].clearLayers();

    $('.box-btn_addon225_block_inspect').remove();

    let r = {};
    r.type = "FeatureCollection";
    r.features = [];
    r.features.push({
        "type": "Feature",
        "properties": {"type":"single_point"},
        "geometry":{
        "type": "Point",
        "coordinates": latlng
    }});
    //_onsole.log(r);
    let geojson = L.geoJSON(r,{
      pointToLayer: geo_lyr_style[item_lyr],
      pane:item_lyr+'_pane'
    });

    geo_lyr[item_lyr].addLayer(geojson);
    geo_lyr[item_lyr].addTo(mymap);

    let o = g_meta.geovar_lyr.features;
    let this_obj=o.filter(({properties}) => properties.g_slug === item_lyr);
    let obj_lyr=this_obj[0].properties;

    obj_lyr.last_r=r;

    $('.ct-editing2-info > .box').html('Longitude: '+latlng[0]+'<br>Latitude: '+latlng[1]);

    add_btn_addon225_block_inspect('point_miner');

  }
  else if(obj_addon.properties.polygon_miner=='enabled'
    ||obj_addon.properties.polyline_miner=='enabled'){

    $('.ct-editing2-info > .box').html('');
    
    let r = {};
    r.type = "FeatureCollection";
    r.features = [];

    //_onsole.log(a225_coords);
    if(a225_coords.length==1){

      r.features.push({
          "type": "Feature",
          "properties": {"type":"start_point"},
          "geometry":{
          "type": "Point",
          "coordinates": latlng
      }});
      //_onsole.log(r);
      let geojson = L.geoJSON(r,{
        pointToLayer: geo_lyr_style['vlyrsit003'],
        pane:'vlyrsit003_pane'
      });

      //_onsole.log(a225_coords_p2);
      //_onsole.log(firstPoint);
      //_onsole.log(secondPoint);
      //_onsole.log(L.GeometryUtil.length([firstPoint, secondPoint]));

      geo_lyr['vlyrsit003'].addLayer(geojson);
      geo_lyr['vlyrsit003'].addTo(mymap);

    }
    else if(a225_coords.length>1){

      let line = turf.lineString([a225_coords_start,latlng]);
      let length = turf.length(line, {units: 'meters'});
      //_onsole.log(length);

      r.features.push({
          "type": "Feature",
          "properties": {"type":"middle_point_a225"},
          "geometry":{
          "type": "Point",
          "coordinates": latlng
      }});

      let geojson = L.geoJSON(r,{
        pointToLayer: geo_lyr_style['vlyrsit003'],
        pane:'vlyrsit003_pane'
      });

      geo_lyr['vlyrsit003'].addLayer(geojson);

      //--

      if(a225_coords.length==2){

        mymap.on('mousemove', function(e){
          let secondPoint = e.latlng;
          //a225_coords_tmp=[];
          //a225_coords_tmp.push(a225_coords_last);
          a225_coords_p2=[];
          //_onsole.log(a225_coords_p);
          a225_coords_p.forEach(element => {
            a225_coords_p2.push(element);
          });
          
          a225_coords_p2.push([e.latlng.lng,e.latlng.lat]);

          if(obj_addon.properties.polygon_miner=='enabled'){
            a225_coords_p2.push(a225_coords_start);
          }
          //mymap.removeLayer(geo_lyr['lyr_polygon_tmp']);
          geo_lyr['vlyrsit006'].clearLayers();
          //a225_coords_p2.push(a225_coords_p)

          r = {};
          r.type = "FeatureCollection";
          r.features = [];

          if(obj_addon.properties.polygon_miner=='enabled'){
            r.features.push({
              "type": "Feature",
              "properties": {"type":"tmp_polygon"},
              "geometry":{
              "type": "Polygon",
              "coordinates": [a225_coords_p2]
            }});
          }
          else{
            r.features.push({
              "type": "Feature",
              "properties": {"type":"tmp_polygon"},
              "geometry":{
              "type": "LineString",
              "coordinates": a225_coords_p2
            }});
          }
          //_onsole.log(myGeoJSON);
          let geojson = L.geoJSON(r,{
            onEachFeature: geo_lyr_style['vlyrsit006'],
            pane:'vlyrsit006_pane'
          });
          geo_lyr['vlyrsit006'].addLayer(geojson);
          
          //_onsole.log(a225_coords_p)

        });

        geo_lyr['vlyrsit006'].addTo(mymap);

      }

    }

  }//polygon_miner=='enabled'

  /* let tmp = L.polyline(a225_coords,{
    pane:'lyr_polyline_pane'
  });
  geo_lyr['lyr_polyline'].addLayer(tmp);
  geo_lyr['lyr_polyline'].addTo(mymap); */

  

  /* if(a225_coords.length==2){
    mymap.on('mousemove', function(e){

      a225_coords_tmp=[];
      a225_coords_tmp.push(a225_coords_last);
      a225_coords_tmp.push([e.latlng.lat,e.latlng.lng]);

      geo_lyr['lyr_polyline_tmp'].clearLayers();

      let tmp2 = L.polyline(a225_coords_tmp,{
        pane:'lyr_polyline_pane'
      }).addTo(mymap);
      geo_lyr['lyr_polyline_tmp'].addLayer(tmp2);
      geo_lyr['lyr_polyline_tmp'].addTo(mymap);

      //_onsole.log(e)
    });
  } */

}

function close_polygon(e){

  let item_addon = 'infoplus';
  let obj_fileterd=g_meta.geovar_addon.features.filter(({properties}) => properties.g_slug === item_addon);
  let obj_addon = obj_fileterd[0];

  //_onsole.log('check_marker');
  mymap.off('mousemove');

  //_onsole.log(a225_coords_p);

  let a225_coords_final = [];

  console.log(a225_coords_p2);

  if(obj_addon.properties.polygon_miner=='enabled'){
    a225_coords_final = a225_coords_p2.splice(0,(a225_coords_p2.length-2));
    a225_coords_final.push(a225_coords_start);
  }
  else{
    a225_coords_final = a225_coords_p2.splice(0,(a225_coords_p2.length-1));
  }

  console.log(a225_coords_final);

  mymap.removeLayer(geo_lyr['vlyrsit003']);
  geo_lyr['vlyrsit003'].clearLayers();

  let item_lyr = 'vlyrsit006';

  mymap.removeLayer(geo_lyr[item_lyr]);
  geo_lyr[item_lyr].clearLayers();

  let r = {};
  r.type = "FeatureCollection";
  r.features = [];
  if(obj_addon.properties.polygon_miner=='enabled'){
    r.features.push({
      "type": "Feature",
      "properties": {"type":"final_polygon"},
      "geometry":{
      "type": "Polygon",
      "coordinates": [a225_coords_final]
    }});
  }
  else{
    r.features.push({
      "type": "Feature",
      "properties": {"type":"final_polygon"},
      "geometry":{
      "type": "LineString",
      "coordinates": a225_coords_final
    }});
  }
  //_onsole.log(a225_coords_final);

  let geojson = L.geoJSON(r,{
    onEachFeature: geo_lyr_style[item_lyr],
    pane:item_lyr+'_pane'
  });

  geo_lyr[item_lyr].addLayer(geojson);
  geo_lyr[item_lyr].addTo(mymap);

  let o = g_meta.geovar_lyr.features;
  let this_obj=o.filter(({properties}) => properties.g_slug === item_lyr);
  let obj_lyr=this_obj[0].properties;

  obj_lyr.last_r=r;

  if(obj_addon.properties.polygon_miner=='enabled'){
    //let polygon = turf.polygon([[[125, -15], [113, -22], [154, -27], [144, -15], [125, -15]]]);
    let polygon = turf.polygon([a225_coords_final]);
    let area = turf.area(polygon);

    $('.ct-editing2-info > .box').html('Superfcie: <span class="numberM-1" >'+area+'</span> m<sup>2</sup>');
    new AutoNumeric('.numberM-1',numberM);

    add_btn_addon225_block_inspect('polygon_miner');
  }
  else{
    let polyline = turf.lineString(a225_coords_final);
    let length = turf.length(polyline, {units: 'meters'});
    $('.ct-editing2-info > .box').html('Lunghezza: <span class="numberM-1" >'+length+'</span> m');
    new AutoNumeric('.numberM-1',numberM);
  }

  obj_addon.properties.mapclick_status='disabled';

  obj_addon.properties.point_miner='disabled';
  obj_addon.properties.polygon_miner='disabled';

  $('#btn_addon225_by_point').css('background-color','white');
  $('#btn_addon225_by_polyline').css('background-color','white');
  $('#btn_addon225_by_polygon').css('background-color','white');

}

function add_btn_addon225_block_inspect(myminer){

  let item_addon = 'infoplus';
  let obj_fileterd=g_meta.geovar_addon.features.filter(({properties}) => properties.g_slug === item_addon);
  let obj_addon = obj_fileterd[0];
  obj_addon.properties.block_inspect=myminer;

  $('.ct-editing2').append(''
    +'<span '
      +'class="box-btn_addon225_block_inspect" '
      +'style="margin-left:5px;margin-right:5px;"></span>'
  +'');
  create_button('btn_addon225_block_inspect');

}


f_btn['btn_addon225_block_inspect']=function(slug){

  sessionStorage.this_dialog_slug='addon225_inspect_single';
  create_dialog2('addon225_inspect_single');

}

dyn_functions['template_by_slug_addon225_inspect_single'] = function(){

  let dlg_slug = 'addon225_inspect_single';

  a225_sheet=[];

  let c = '';

  let dlg_body = '.dlg_'+dlg_slug+''+'_body';

  c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $(dlg_body).append(c);

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

  //--

  let tab1_parts = [
    { 
      'g_slug': 'part_1',
      'g_type': 'title',
      'title': 'Ispeziona livelli attivi'
    },
    { 
      'g_slug': 'part_5',
      'g_type': 'data2',
      //'title': 'Report'
      //'lyrs':['Zone']
    },
    { 
      'g_slug': 'part_6',
      'g_type': 'simple_part',
      //'title': 'Report'
    }
  ];

  tab1_parts.forEach(tab1_part_element => {
    dlg_addon225_add_part(tab1_part_element);
  });

}

dlg_close_functions['addon225_inspect_single'] = function(){

}


function dlg_addon225_add_part(tab1_part_element){
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

  if(p.g_type=='title'){
    c = ''
      +'<div '
        +'style="text-align: center;border: 1px solid black;padding: 5px;margin-bottom: 3px;" '
        +'>'+p.title.toUpperCase()+'</div>';
    $('.panel-tab1 .'+p.g_slug+'').append(c);
  }
  else if(p.g_type=='simple_part'){
    c = ''
      +'<div '
        +'class="box" '
        +'></div>';
    $('.panel-tab1 .'+p.g_slug+'').append(c);
  }
  else if(p.g_type=='data2'){
    //_onsole.log('data2');

    a225_lyrs=[];

    let c = ''
      +'<div '
        +'class="box a225-'+p.g_type+'" '
        +'style="text-align:center;" '
        +'id="'+p.g_type+'-nolayers" '
        +'>'
          +'<span>Nessun livello attivo</span>';
        +'</div>'
      +'';
    $('.panel-tab1 .'+p.g_slug+'').append(c);

    dMap.analisi01.grLyrToc.forEach(item_lyr => {

      let o = g_meta.geovar_lyr.features;
      let this_obj=o.filter(({properties}) => properties.g_slug === item_lyr);
      let obj_lyr=this_obj[0].properties;

      if(obj_lyr.visible!=undefined && obj_lyr.visible==true){
        //_onsole.log('visible',obj_lyr);

        if(obj_lyr.lyr_type=='group'){

          obj_lyr.g_options.forEach(child_lyr => {

            let child_this_obj=o.filter(({properties}) => properties.g_slug === child_lyr);
            let child_obj_lyr=child_this_obj[0].properties;
            let visible = obj_lyr.visible;
            child_obj_lyr.visible=visible;
            add_addon225_data2_list(child_obj_lyr,p);

          });
        }
        else{

          add_addon225_data2_list(obj_lyr,p);

        }


      }


    });

    $('.ajs-footer-btn2').append(''
      +'<span class="box-btn_addon225_compose"></span>'
    +'');

    create_button('btn_addon225_compose');

    $('#btn_addon225_compose').prop('disabled',true);

    //--

    $('.a225-'+p.g_type+'').on('click',function(){

      let myid=$(this).attr('myid');

      if(a225_lyrs.indexOf(myid)>-1){

        a225_lyrs.splice(a225_lyrs.indexOf(myid),1);
        $(this).find('icon > i').removeClass('fa-square');
        $(this).find('icon > i').addClass('fa-square-o');

      }
      else{

        a225_lyrs.push(myid);
        $(this).find('icon > i').removeClass('fa-square-o');
        $(this).find('icon > i').addClass('fa-square');

      }

      enable_btn_addon225_compose();

    });

  }
  
}

function add_addon225_data2_list(obj_lyr,p){

  if(obj_lyr.queryable==1){

    $('#'+p.g_type+'-nolayers').remove();

    let faw_class='fa-square-o';

    c = ''
      +'<div '
        +'class="box a225-'+p.g_type+'" '
        +'style="cursor:pointer;" '
        +'id="'+p.g_type+'-'+obj_lyr.g_slug+'" '
        +'myid="'+obj_lyr.g_slug+'">'
          +'<icon><i class="fa '+faw_class+'" aria-hidden="true"></i></icon>'
          +'&nbsp;<span>'+obj_lyr.g_label+'</span>';
        +'</div>'
      +'';
    $('.panel-tab1 .'+p.g_slug+'').append(c);

  }

}

function enable_btn_addon225_compose(){

  if(a225_lyrs.length>0){
    $('#btn_addon225_compose').prop('disabled',false);
  }
  else{
    $('#btn_addon225_compose').prop('disabled',true);
  }

}

f_btn['btn_addon225_compose']=function(slug){

  //_onsole.log('btn_addon225_compose')

  let item_addon = 'infoplus';
  let obj_fileterd=g_meta.geovar_addon.features.filter(({properties}) => properties.g_slug === item_addon);
  let obj_addon = obj_fileterd[0];
  let obj_lyr= new Array();
  let item_lyr = '';
  let obj_fileterd2=[];

  let collection='';
  if(obj_addon.properties.block_inspect=='point_miner'){
    collection='lyr_intersect_point';
    item_lyr = 'vlyrsit003';
    obj_fileterd2=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === item_lyr);
    obj_lyr = obj_fileterd2[0];
  }
  else if(obj_addon.properties.block_inspect=='polygon_miner'){
    collection='lyr_intersect_polygon';
    item_lyr = 'vlyrsit006';
    obj_fileterd2=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === item_lyr);
    obj_lyr = obj_fileterd2[0];
  }
  else{
    return;
  }

  dataString={
    fn_group:'geodata',
    action:'view_data',
    collection:collection,
    qy_name:'A',
    lyr:'lyrsit040',//'lyr035',
    world:true, // for all records
    geom:false,
    query:true,
    lyrs:a225_lyrs,
    fn_extend:'a225_compose_extend',
    input_geom:obj_lyr.properties.last_r
  }
  //generic_api(dataString,'addon225_view');
  //alertify.infoDialog().destroy();
  switch_on_lyr_custom(dataString);

}

dyn_functions['a225_compose_extend']=function(r){

  let part='part_6';
  let obj_fileterd=[];
  let obj_lyr = new Array();
  let p_lyr = new Array();
  let cols=[];
  let features = new Array();
  let p = new Array();
  let i=0;
  $('.panel-tab1 .'+part+' > .box').html('');
  r.ds.lyrs.forEach(item_lyr => {

    console.log(item_lyr);
    obj_fileterd=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === item_lyr);
    obj_lyr = obj_fileterd[0];
    p_lyr=obj_lyr.properties;

    c = ''
      +'<div><b>'+p_lyr.g_label+'</b></div>'
      +'<div><table style="width:100%;" class="'+part+'-tb-'+item_lyr+'"><thead></thead><tbody></tbody></table></div>';
    $('.panel-tab1 .'+part+' > .box').append(c);

    cols = Object.keys(r['features_'+p_lyr.g_tables[0]][0]['properties']);

    let obj_tb = g_meta.geovar_tb.filter(({name}) => name === p_lyr.g_tables[0])[0];

    c = '<tr>';
    cols.forEach(col => {
      let obj_tb_fileterd=obj_fileterd=obj_tb.features.filter(({properties}) => properties.g_slug === col)[0];
      c +='<th style="text-align:center;" ><u>'+obj_tb_fileterd.properties.g_label+'</u></th>'
    });
    c +='</tr>';
    $('.'+part+'-tb-'+item_lyr+' > thead').append(c);

    features = r['features_'+p_lyr.g_tables[0]];

    
    let numeric_cols = [];
    features.forEach(element => {
      p=element.properties;
      c = '<tr>';
      cols.forEach(col => {

        i++;

        let obj_tb_fileterd=obj_tb.features.filter(({properties}) => properties.g_slug === col)[0];
        let real_label=p[col];

        // if(obj_tb_fileterd.properties.g_decode.length>0){
        //   let real_label_fileterd = obj_tb_fileterd.properties.g_decode.filter(({g_slug}) => g_slug === p[col])[0];
        //   real_label = real_label_fileterd.g_label;
        // }

        if(obj_tb_fileterd.properties.g_options!=null 
          && obj_tb_fileterd.properties.g_options.length>0){
          //_onsole.log('g_options.length',obj_tb_fileterd.properties.g_options.length);
          let  col_value = p[col];
          let real_label_fileterd = obj_tb_fileterd.properties.g_options.filter(({val}) => val ===  col_value)[0];
          
          //_onsole.log('real_label_fileterd',real_label_fileterd);
          real_label = real_label_fileterd.text;
        }
        if(obj_tb_fileterd.properties.data_type=='character varying'){
          c +='<td style="" ><span>'+real_label+'</span></td>';
        } 
        else{
          c +='<td style="" ><span class="numberM-'+i+'">'+p[col]+'</span></td>';
          numeric_cols.push('numberM-'+i);
        }
        

      });
      c +='</tr>';
      $('.'+part+'-tb-'+item_lyr+' > tbody').append(c);

      numeric_cols.forEach(element => {
        new AutoNumeric('.'+element+'',numberM);
      });
      
    });

  });

  return;


}