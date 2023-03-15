$(document).ready(function() {


}); //$(document).ready


// var geo_vlyr007_style_icon = new Array();
// var geo_vlyr007_style_icon_move = new Array();
// var geo_vlyr007 = new Array();

dyn_functions['vlyr007_lyr_extend']=function(){

  //_onsole.log('vlyr007_lyr_extend');



  //_vlyr007a_colors.default={'slug':'default','color':'#ff2a00'};

  //point
  let lyr='vlyr007';
  geo_lyr_style[lyr] = function (feature,latlng) {

    //return L.marker(latlng);
    return L.marker(
      latlng, {
        draggable:'true'//,
        //icon: geo_vlyr007_style_icon
      });

    /* return L.marker(latlng,{
      icon: geo_lyr050_icon_style1
    }).on('click', geo_lyr050_onClick); */

  }

  // let obj_lyr=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === 'vlyr007');
  // let style = obj_lyr[0].properties.g_style.style2;
  // let style_move = obj_lyr[0].properties.g_style.style_move;

  // geo_vlyr007_style_icon = L.icon(style);

  // geo_vlyr007_style_icon_move = L.icon(style_move);

}
