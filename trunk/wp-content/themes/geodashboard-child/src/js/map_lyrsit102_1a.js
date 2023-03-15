$(document).ready(function() {

  check_geojson2();

}); //$(document).ready

var geojson2 = new L.featureGroup();
var geojson2_sub = 0;
var geojson2_last = '';
var geojson2_last_r_p = new Array();
var geojson2_visible = 0;

mymap.createPane('geojson2_pane');
mymap.getPane('geojson2_pane').style.zIndex = 350;

dyn_functions['lyrsit102_1_lyr_extend']=function(){

  //_onsole.log('lyrsit102_1a_lyr_extend');
  //_onsole.log('lyrsit102_1a');
  let lyr='lyrsit102_1';

  geo_lyr_style[lyr] = function(feature, layer){
    //_onsole.log('lyrsit102_1a');
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
      console.log('mouseover','lyrsit102_1')
      //_onsole.log(this.feature.properties.sez2011_1);

      geojson1_sub=0;
      geojson1_last='';
      geojson1_last_r_p = new Array();

      if(geojson2_sub==0){

        geojson2_sub=1;

        clear_geojson2();

        geojson = L.geoJson(this.toGeoJSON(), {
          pane:'geojson2_pane',
          //interactive:false,
          onEachFeature: geojson2_style,
        });
        geojson2.addLayer(geojson);
        geojson2.addTo(mymap);

        //geojson2_visible = 1;
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
          lyr:'lyrsit102_1',
          geom:0,
          one2nnn:'x',
          join_field:'pid',
          join_value:this.feature.properties.pid
        };

        if(geojson2_last != this.feature.properties.pid){
          generic_api(dataString,'query_geojson2');
        }

      }
    });

    layer.on('mouseout', function () {

    });

  };

}

function check_geojson2(){
  if (geojson2_sub!=0) {
    // _onsole.log('wait')
    setTimeout(function(){check_geojson2()},3000);
    return;
  } else {
    clear_geojson2();
  };
}

function clear_geojson2(){

  mymap.removeLayer(geojson2);
  geojson2.clearLayers();
  //geojson2_last_r_p = new Array();

  // geojson2_visible = 0;
  clear_moving_div();

  // let div = document.getElementById('moving_div');
  // if(div){
  //   div.style.display = 'none';
  // }

}

dyn_functions['succ_query_geojson2'] = function(r){
  // _onsole.log(r);
  geojson2_last = r.ds.join_value;
  geojson2_last_r_p = r.features[0].properties;
  // _onsole.log(geojson2_last);
  geojson2_sub=0;

  prepare_moving_div();

}

geojson2_style = function(feature, layer){

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
    //_onsole.log('mouseout');
    // mymap.removeLayer(geojson2);
    // geojson2.clearLayers();
    geojson2_sub=0;
    clear_geojson2();

  });
  
};
