$(document).ready(function() {
  vlyr012_ready();
}); //$(document).ready

function vlyr012_ready(){
  if (f_wait.geovar_lyr==0) {
    // _onsole.log('wait')
    setTimeout(function(){vlyr012_ready()},100);
    return;
  } else {
    prepare_vlyr012();
  };
}

function prepare_vlyr012(){

  let lyr='vlyr012';
  generic_lyr(lyr);

}

//--

var vlyr012a_iso_values = [250,500,1000];

var vlyr012a_colors = new Array();
var vlyr012a_params = new Array();

//--

dyn_functions['vlyr012_lyr_extend']=function(){

  //_onsole.log('vlyr012_lyr_extend')

  let lyr='vlyr012';

  vlyr012a_colors.m250={'slug':'m250','color':'#ff2a00'};
  vlyr012a_colors.m500={'slug':'m500','color':'#ffa100'};
  vlyr012a_colors.m1000={'slug':'m1000','color':'#005dff'};

  vlyr012a_params.mode='pedestrian';
  vlyr012a_params.range_type='distance';
  vlyr012a_params.mode='pedestrian';
  vlyr012a_params.routing_mode='fast';

  geo_lyr_style[lyr] = function(feature, layer){
    var p = feature.properties;

    if(p.myrange=='m250'){
      var p = vlyr012a_colors.m250;
      var mycolor = p.color;//geovar.lyr.vlyr012.iso1_color;
      var fillOpacity=0.5;
      var opacity=0;
    }
    else if(p.myrange=='m500'){
      var p = vlyr012a_colors.m500;
      var mycolor = p.color;//geovar.lyr.vlyr012.iso1_color;
      var fillOpacity=0;
      var opacity=1;
    }
    else{
      var p = vlyr012a_colors.m1000;
      var mycolor = p.color;//geovar.lyr.vlyr012.iso2_color;
      var fillOpacity=0;
      var opacity=1;
    }

    layer.setStyle({
      fillColor:mycolor,
      color:mycolor,
      weight:2,
      opacity:opacity,
      fillOpacity:fillOpacity,
      //clickable:false
    });//.on('click', geo_vlyr012_onClick);

  };

}



/*function geo_vlyr012_onClick(e) {

  console.log(e);

}*/

function vlyr012a_fill_box_info(){
  $('.box-info-0').html(''
    +'<u><b>Zones: Population</b></u>'
    +'<div style="float: left;background-color:'+vlyr012a_colors.m250.color+';width:22px;height:13px;margin: 5px 0px;"></div>'
    +'<div class="clearfix" style="padding-top: 2px;width: 90px;text-align: right;">563</div>'
    +'<div style="float: left;border:1px solid '+vlyr012a_colors.m500.color+';width:22px;height:13px;margin: 5px 0px;"></div>'
    +'<div class="clearfix" style="padding-top: 2px;width: 90px;text-align: right;">2,125</div>'
    +'<div style="float: left;border:1px solid '+vlyr012a_colors.m1000.color+';width:22px;height:13px;margin: 5px 0px;"></div>'
    +'<div class="clearfix" style="padding-top: 2px;width: 90px;text-align: right;">4,854</div>'
  +'');

  show_legends('vlyr012a');
  fill_vlyr012a_legend();

}

function fill_vlyr012a_legend(){

  vlyr012a_iso_values.forEach(element => {
    $('.legend-canvas').append(''
      +'<div style="float:left;background-color:'
        +vlyr012a_colors['m'+element].color
        +';width:30px;height:22px;margin-right: 5px;"></div>'
      +'<div '
        +'class="WD-text-primary" '
        +'style="padding-top: 3px;">'
        +element+' meters'
        +'<span class="label-'+element+'">...</span>'
      +'</div>'
      +'<div class="clearfix" style="margin: 2px;"></div>'        
    +''); 
  });

}