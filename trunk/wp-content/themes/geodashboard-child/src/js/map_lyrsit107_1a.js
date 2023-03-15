$(document).ready(function() {

  check_geojson1();

}); //$(document).ready

var geojson1 = new L.featureGroup();
var geojson1_sub = 0;
var geojson1_last = '';
var geojson1_last_r_p = new Array();
var geojson1_visible = 0;

mymap.createPane('geojson1_pane');
mymap.getPane('geojson1_pane').style.zIndex = 250;

dyn_functions['lyrsit107_1_lyr_extend']=function(){

  //_onsole.log('lyrsit107_1a_lyr_extend');
  //_onsole.log('lyrsit107_1a');
  let lyr='lyrsit107_1';

  geo_lyr_style[lyr] = function(feature, layer){
    //_onsole.log('lyrsit107_1a');
    // let p = feature.properties;

    let mycolor = '#000';
    let fillOpacity=0;
    let opacity=0;

    layer.setStyle({
      fillColor:mycolor,
      color:mycolor,
      weight:1,
      opacity:opacity,
      fillOpacity:fillOpacity,
      //clickable:false
    });//.on('click', geo_lyrsit102_1_onClick);

    layer.on('mouseover', function () {
      //_onsole.log(JSON.stringify(this.toGeoJSON()))
      //_onsole.log(this.feature.properties.sez2011_1);

      geojson2_sub=0;
      geojson2_last='';
      geojson2_last_r_p = new Array();

      if(geojson1_sub==0){

        geojson1_sub=1;

        clear_geojson1();

        geojson = L.geoJson(this.toGeoJSON(), {
          pane:'geojson1_pane',
          //interactive:false,
          onEachFeature: geojson1_style,
        });
        geojson1.addLayer(geojson);
        geojson1.addTo(mymap);

        //geojson1_visible = 1;
        moving_div();
        // let div = document.getElementById('moving_div');
        // if(div){
        //   div.style.display = 'block';
        // }

        check_geojson1();
        check_geojson2();

        var dataString = {
          fn_group:'geodata',
          action:'view_data',
          collection:'lyr_single_one_table',
          qy_name:'A',
          lyr:'lyrsit107_1',
          geom:0,
          one2nnn:'x',
          join_field:'sez2011_1',
          join_value:this.feature.properties.sez2011_1
        };

        if(geojson1_last != this.feature.properties.sez2011_1){
          generic_api(dataString,'query_geojson1');
        }

      }
    });

    layer.on('mouseout', function () {


    });

  };

}

function check_geojson1(){
  if (geojson1_sub!=0) {
    // _onsole.log('wait');
    setTimeout(function(){check_geojson1()},3000);
    return;
  } else {
    clear_geojson1();
  };
}

function clear_geojson1(){

  mymap.removeLayer(geojson1);
  geojson1.clearLayers();
  
  // geojson1_visible = 0;
  clear_moving_div();

  // let div = document.getElementById('moving_div');
  // if(div){
  //   div.style.display = 'none';
  // }

}

dyn_functions['succ_query_geojson1'] = function(r){
  // _onsole.log(r);
  geojson1_last = r.ds.join_value;
  geojson1_last_r_p = r.features[0].properties;
  // _onsole.log(geojson1_last);
  geojson1_sub=0;

  prepare_moving_div();

}

geojson1_style = function(feature, layer){

  let mycolor = '#ff0000';
  let fillOpacity=0;
  let opacity=1;

  layer.setStyle({
    fillColor:mycolor,
    color:mycolor,
    weight:2,
    opacity:opacity,
    fillOpacity:fillOpacity,
    //clickable:false
  });//.on('click', geo_lyrsit102_1_onClick);

  layer.on('mouseout', function () {
    
    geojson1_sub=0;
    clear_geojson1();

  });
};

// === === ===


function prepare_moving_div(){
  /* let div = document.createElement('div');
  div.id = 'moving_div';
  div.className = 'moving_div';
  div.innerHTML = 'moving_div';
  document.body.appendChild(div); */
  // _onsole.log(div);
  moving_div();
}

function moving_div(){

  //check mouse position
  // let mousePosition = ''; //mouse position  (x,y) in pixels
  // let mousePositionX = ''; //mouse position x in pixels (from left)
  // let mousePositionY = ''; //mouse position y in pixels (from top)
  
  // mousePosition = window.event; //get mouse position

  // console.log(mousePos);

  let div = document.getElementById('moving_div');

  // let myx = window.event;
  let posX = mousePos.x;
  let posY = mousePos.y;

  // // check if is_gecko  (firefox) or is_ie (internet explorer)
  // if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
  //   //_onsole.log('gecko')
  //   //var myx = window.event;
  //   posX = myx.originalEvent.clientX;
  //   posY = myx.originalEvent.clientY;
  // }
  // else{
  //   //_onsole.log('ie')
  //   posX = window.event.clientX;
  //   posY = window.event.clientY;
  // }
  let xp = posX + 30;
  let yp = posY - 25;
  // console.log(xp,yp);

  if(div){
    div.style.display = 'block';
    div.style.position = 'absolute';
    div.style.top = yp +'px';
    div.style.left = xp +'px';
    div.style.backgroundColor = '#fff';
    div.style.padding = '10px';
    div.style.zIndex = '1000';
    //div.style.border = '1px solid #000';
    //div.style.borderRadius = '5px';
    //div.style.boxShadow = '0 0 10px #000';
    div.style.width = '300px';
    div.style.border = '1px solid rgba(0,0,0,.125)';
    //div.style.height = '300px';
    div.style.overflow = 'auto';
  }

  div.style.display = 'block';

  var elem = document.querySelector('#moving_div');
  var bounding = elem.getBoundingClientRect();

  if (bounding.right > (window.innerWidth || document.documentElement.clientWidth)) {
    //_onsole.log('Right side is out of viewport');
    xp = posX - 330;
    div.style.left = xp +'px';
  }

  // Returns something like this:
  // {top: -123, left: 0, right: 0, bottom: 25}
  //console.log(bounding);

  $('#moving_div').html('');

  $('#moving_div').append('<div class="g1_title"></div>');
  $('#moving_div').append('<div class="g1_data"></div>');
  $('#moving_div').append('<div class="g2_title"></div>');
  $('#moving_div').append('<div class="g2_data"></div>');
  //_onsole.log('moving_div visible');

  //_onsole.log('geojson1_last_r_p',geojson1_last_r_p.length);
  //_onsole.log('geojson2_last_r_p',geojson2_last_r_p.length);

  if(geojson1_last_r_p.length != 0){

    let item_lyr = 'lyrsit107';
    let o = g_meta.geovar_lyr.features//TB!
    let this_obj=o.filter(({properties}) => properties.g_slug === item_lyr);
    let p_lyr=this_obj[0].properties;

    $('.g1_title').html(p_lyr.g_label);
    $('.g1_data').html('');
    for (var key in geojson1_last_r_p) {
      if (geojson1_last_r_p.hasOwnProperty(key)) {
        $('.g1_data').append('<div>'+key+': '+geojson1_last_r_p[key]+'</div>');
      }
    }
  }
  else{ $('.g1_title').html(''); $('.g1_data').html(''); }

  if(geojson2_last_r_p.length != 0){

    let item_lyr = 'lyrsit102';
    let o = g_meta.geovar_lyr.features//TB!
    let this_obj=o.filter(({properties}) => properties.g_slug === item_lyr);
    let p_lyr=this_obj[0].properties;

    $('.g2_title').html(p_lyr.g_label);
    $('.g2_data').html('');
    for (var key in geojson2_last_r_p) {
      if (geojson2_last_r_p.hasOwnProperty(key)) {
        $('.g2_data').append('<div>'+key+': '+geojson2_last_r_p[key]+'</div>');
      }
    }
  }
  else{ $('.g2_title').html(''); $('.g2_data').html(''); }

}

function clear_moving_div(){

  let div = document.getElementById('moving_div');
  //_onsole.log(geojson2.getLayers().length,geojson1.getLayers().length);
  if(geojson2.getLayers().length > 0 || geojson1.getLayers().length > 0){

  }
  else{
    div.style.display = 'none';
    //_onsole.log('moving_div hidden');
  }

}
