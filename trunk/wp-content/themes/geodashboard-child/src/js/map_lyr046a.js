$(document).ready(function() {
  lyr046_ready();
}); //$(document).ready

function lyr046_ready(){
  if (f_wait.geovar_lyr==0) {
    // _onsole.log('wait')
    setTimeout(function(){lyr046_ready()},100);
    return;
  } else {
    prepare_lyr046();
  };
}

function prepare_lyr046(){

  let lyr='lyr046';
  generic_lyr(lyr);

}

//--
var lyr046a_class_values = ['low','midlow','medium','midmhigh','high'];

var lyr046a_colors = new Array();
var lyr046a_params = new Array();
//--

dyn_functions['lyr046_lyr_extend']=function(){

  //_onsole.log('vlyr012_lyr_extend')

  let lyr='lyr046';

  lyr046a_colors.low={'slug':'low','color':'#d7191c'};
  lyr046a_colors.midlow={'slug':'midlow','color':'#fdae61'};
  lyr046a_colors.medium={'slug':'medium','color':'#ffffbf'};
  lyr046a_colors.midmhigh={'slug':'midmhigh','color':'#abd9e9'};
  lyr046a_colors.high={'slug':'high','color':'#2c7bb6'};

  geo_lyr_style[lyr] = function (feature, layer) {
    
    /*return L.marker(latlng,{
      icon: geo_lyr046_style_icon
    }).on('click', geo_lyr046_onClick); // funzione 3 onClick sul punto
    */

    var fillOpacity=0.7;
    var opacity=1;
    var p = feature.properties;
    if(p.job_class<0.3){
      var mycolor = '#d7191c';//geovar.lyr.vlyr012.iso1_color;
    }
    else if(p.job_class<0.52){
      var mycolor = '#fdae61';//geovar.lyr.vlyr012.iso1_color;
    }
    else if(p.job_class<0.72){
      var mycolor = '#ffffbf';//geovar.lyr.vlyr012.iso1_color;
    }
    else if(p.job_class<0.9){
      var mycolor = '#abd9e9';//geovar.lyr.vlyr012.iso1_color;
    }
    else{
      var mycolor = '#2c7bb6';//geovar.lyr.vlyr012.iso2_color;
    }

    layer.setStyle({
      fillColor:mycolor,
      color:mycolor,
      weight:1,
      opacity:opacity,
      fillOpacity:fillOpacity,
      //clickable:false
    });//.on('click', geo_vlyr012_onClick);

    var myclass = 'divicon_label_type1 divicon_label_type1_a';
    var n = p.cenblock10;
    icon = L.divIcon({
      className: myclass,
      html: '<span>'+n+'</span>' ,
      iconSize: null,
      iconAnchor:null
    });

    var marker = L.marker([p.lat, p.lng],{
      icon: icon
    });
    geo_lyr[lyr].addLayer(marker);

    //var marker = L.marker([p.lat, p.lng]);
    //geo_lyr.addLayer(marker);

  }

}




function geo_lyr046_onClick(e) {

}

function manual_lyr046(){

  show_legends('lyr046a');
  fill_lyr046a_legend();

}

function fill_lyr046a_legend(){

  lyr046a_class_values.forEach(element => {
    $('.legend-canvas').append(''
      +'<div style="float:left;background-color:'
        +lyr046a_colors[element].color
        +';width:30px;height:22px;margin-right: 5px;"></div>'
      +'<div '
        +'class="WD-text-primary" '
        +'style="padding-top: 3px;">'
        +element+' '
        +'<span class="label-'+element+'">...</span>'
      +'</div>'
      +'<div class="clearfix" style="margin: 2px;"></div>'        
    +''); 
  });

}