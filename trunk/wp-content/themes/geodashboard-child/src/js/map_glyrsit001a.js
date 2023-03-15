// $(document).ready(function() {
//   glyrsit001_ready();
// }); //$(document).ready

// function glyrsit001_ready(){
//   if (f_wait.geovar_lyr==0) {
//     // _onsole.log('wait')
//     setTimeout(function(){glyrsit001_ready()},100);
//     return;
//   } else {
//     prepare_glyrsit001();
//   };
// }

// //var glyrsit001_style_icon = new Array();

// function prepare_glyrsit001(){

//   let item_lyr = 'glyrsit001';
//   let obj_fileterd=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === item_lyr);
//   let obj_lyr = obj_fileterd[0];

//   obj_lyr.properties.g_options.forEach(lyr => {
//     generic_lyr(lyr);
//   });

// }

//--

// const glyrsit001a_colors = new Array();
//var vlyrsit003_style_icon = L.icon(obj_lyr.g_style.style2);

dyn_functions['vlyrsit003_lyr_extend']=function(){

  //point
  let item_lyr='vlyrsit003';
  geo_lyr_style[item_lyr] = function (feature,latlng) {
    //g19_lyr5_default.png
    //_onsole.log(feature);
    let obj_fileterd=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === item_lyr);
    let obj_lyr = obj_fileterd[0];
    let icon = L.icon(obj_lyr.properties.g_style.style1);

    if(feature.properties.type=='start_point'){
      return L.marker(
        latlng,
        {
          icon: icon,
          pane: 'vlyrsit003_pane'
        }
      ).on('click', close_polygon);
    }
    else if(feature.properties.type=='middle_point_a225'){
      return L.marker(
        latlng,
        {
          icon: icon,
          pane: 'vlyrsit003_pane'
        }
      ).on('click', close_polygon);
    }
    else if(feature.properties.type=='middle_point_polyline'){
      return L.marker(
        latlng,
        {
          icon: icon,
          pane: 'vlyrsit003_pane'
        }
      ).on('click', close_polyline);
    }
    else{
      return L.marker(
        latlng,
        {
          icon: icon,
          pane: 'vlyrsit003_pane',
          draggable:'true'
        }
      );
    }
    

    /* return L.marker(latlng,{
      icon: geo_lyr050_icon_style1
    }).on('click', geo_lyr050_onClick); */

  }

}
dyn_functions['vlyrsit004_lyr_extend']=function(){

  //point
  let lyr='vlyrsit004';
  geo_lyr_style[lyr] = function (feature,latlng) {

    return L.marker(latlng);

    /* return L.marker(latlng,{
      icon: geo_lyr050_icon_style1
    }).on('click', geo_lyr050_onClick); */

  }

}
dyn_functions['vlyrsit005_lyr_extend']=function(){

  let lyr='vlyrsit005';
  geo_lyr_style[lyr] = function(feature, layer){
    layer.setStyle({
      fillColor:'#000',
      color:'#000',
      weight:2,
      opacity:1,
      fillOpacity:0.5,
      //clickable:false
    });//.on('click', geo_glyrsit001_onClick);
  };

}
dyn_functions['vlyrsit006_lyr_extend']=function(){

  let lyr='vlyrsit006';
  
  geo_lyr_style[lyr] = function(feature, layer){
    //_onsole.log(feature);
    let mycolor = '#ff0000';
    if(feature.properties.type=='tmp_polygon'
      || feature.properties.type=='tmp_polyline'){
      mycolor = '#3bff00';
    }
    layer.setStyle({
      fillColor:mycolor,
      color:mycolor,
      weight:2,
      opacity:1,
      fillOpacity:0.5,
      //clickable:false
    });//.on('click', geo_glyrsit001_onClick);
  };

}
