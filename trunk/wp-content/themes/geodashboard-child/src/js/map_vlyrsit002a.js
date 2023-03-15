const vlyrsit002a_colors = new Array();

dyn_functions['vlyrsit002_lyr_extend']=function(){

  //_onsole.log('vlyrsit002_lyr_extend')

  let lyr='vlyrsit002';

  vlyrsit002a_colors.default={'slug':'default','color':'#ff2a00'};

  geo_lyr_style[lyr] = function(feature, layer){

    // let p = feature.properties;

    let p = vlyrsit002a_colors.default;
    let mycolor = p.color;//geovar.lyr.vlyrsit002.iso2_color;
    let fillOpacity=0;
    let opacity=1;

    layer.setStyle({
      fillColor:mycolor,
      color:mycolor,
      weight:2,
      opacity:opacity,
      fillOpacity:fillOpacity,
      //clickable:false
    });//.on('click', geo_vlyrsit002_onClick);

  };

}