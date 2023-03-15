// const lyrsit004a_iso_values = [250,500,1000];
const lyrsit004a_colors = new Array();
// const lyrsit004a_params = new Array();

dyn_functions['lyrsit004_lyr_extend']=function(){

  //_onsole.log('lyrsit004_lyr_extend');

  let lyr='lyrsit004';

  lyrsit004a_colors.default={'slug':'default','color':'#ff2a00'};

  geo_lyr_style[lyr] = function(feature, layer){

    //_onsole.log('geo_lyr_style lyrsit004_lyr_extend');
    // let p = feature.properties;

    let p = lyrsit004a_colors.default;
    let mycolor = p.color;//geovar.lyr.lyrsit004.iso2_color;
    let fillOpacity=0;
    let opacity=1;

    layer.setStyle({
      fillColor:mycolor,
      color:mycolor,
      weight:2,
      opacity:opacity,
      fillOpacity:fillOpacity,
      //clickable:false
    });//.on('click', geo_lyrsit004_onClick);

  };

}
