var a216_mapReady = 0;

dyn_functions['addon216-legend'+'_ready'] = function(){
  //_onsole.log('Ready-1-legend!');

  var source_w = $('.sidebar-content').width();
  var target_l = source_w+5;

  if($(window).width() < 768) {
    var styles2 = ''
      +'.legend-canvas-show{'
        +'left:5px;'
        +'display:block!important;'
      +'}'
      +'.legend-btn-show{'
        +'left:5px;'
        +'display:block!important;'
      +'}'
    +'';
  }
  else{
    var styles2 = ''
      +'.legend-canvas-show{'
        //+'left:'+target_l+'px;'
        +'margin-left:5px;'
        +'display:block!important;'
      +'}'
      +'.legend-btn-show{'
        +'left:'+target_l+'px;'
        +'display:block!important;'
      +'}'
    +'';
  }    
  var styleSheet = document.createElement("style");
  styleSheet.setAttribute('tag', 'style on ready');
  styleSheet.type = "text/css";
  styleSheet.innerText = styles2;
  document.head.appendChild(styleSheet);

  $('.box-legends-btn').on( "click", function(){
    //log_tag_manager('legends-btn ' + $(this).attr('name'),'','');
    //dMap.analisi01.legends.toogle='is-open';
    //toogle_legend($(this).attr('lyr'));
    legend_to_expand($(this).attr('lyr'));
  });

  $('.legend-canvas-toogle').on( "click", function(){
    //log_tag_manager('legend-canvas-toogle ' + $(this).attr('name'),'','');
    //dMap.analisi01.legends.toogle='is-close';
    //toogle_legend($(this).attr('lyr'));
    legend_to_minimize($(this).attr('lyr'));
  });

  a216_mapReady = 1;

  legend_html();

}

var a216_legends=[];
//var a216_legends_exist=[];
var a216_legends_load=[];

var dyn_legends = [];
var list_legends=[];

setInterval(

  function() {  
    if(a216_mapReady==1){
      prepare_legends();
    }
    
    // _onsole.log('------------------------------------');
  },
  500
);

function prepare_legends(){
  //_onsole.log('prepare_legends');
  //_onsole.log(a216_legends);

  list_legends.forEach(item_lyr => {

    let o = g_meta.geovar_lyr.features;
    let this_obj=o.filter(({properties}) => properties.g_slug === item_lyr);
    let obj_lyr=this_obj[0].properties;

    //_onsole.log('show_legends_forEach:'+item_lyr);
    if(dyn_legends[item_lyr+'_legends']!=undefined){

      if(a216_legends_load.indexOf(item_lyr)===-1){



        if(obj_lyr.enable===true
          && obj_lyr.visible===true){

          //_onsole.log('add legend:'+item_lyr);
          if(a216_legends.indexOf(item_lyr)===-1){
            a216_legends.push(item_lyr);
            dyn_legends[item_lyr+'_legends']();
          }

        }

      }
      else{
        if(obj_lyr.enable===false
          || obj_lyr.visible===false){
          a216_legends_load.splice(a216_legends_load.indexOf(item_lyr),1);
          a216_legends.splice(a216_legends.indexOf(item_lyr),1);
          $('.box-legend-'+item_lyr).remove();
        }
      }

    }
    else{
      console.log('missing dyn_legends',item_lyr);
    }

  });

  if(a216_legends.length>0){

    //_onsole.log('legend html')
    //legend_html();

    if($('.legend-canvas').hasClass('legend-canvas-show')){

    }
    else{
      $('.legend-canvas').removeClass('WD-canvas-hide');
      $('.legend-canvas').addClass('legend-canvas-show');
    }


  }
  else{
    $('.legend-canvas').addClass('WD-canvas-hide');
    $('.legend-canvas').removeClass('legend-canvas-show');
  }

}

function legend_html(){

  // _onsole.log('show legend:'+lyr);
  //dMap.analisi01.current_legend=lyr;
  $('.legend-canvas').removeClass('WD-canvas-hide');
  $('.legend-canvas').addClass('legend-canvas-show');
  // $('.legend-canvas').addClass('legend-canvas-'+item_lyr);
  // $('.legend-canvas').html(''
  //   +'<div class="legend-canvas-title" lyr="'+item_lyr+'">'
  // +'')
  // $('.legend-canvas-title').html(''
  //   +'<span class="WD-text-primary"><b>'+gLang.legend_title+'</b></span>'
  // +'');

  // $('.legends-btn').attr('lyr',item_lyr);
  // $('.legend-canvas-toogle').attr('lyr',item_lyr);

  //var c = geovar.lyr[lyr];
  $('.legend-canvas').html('<div class="legend-canvas-body"></div>');
  //$('.legend-canvas-body').html('');

  // if($(window).width() < 768) {
  //   legend_to_minimize(lyr);
  // }


}

// function prepare_legend(){

//   list_legends.forEach(item_lyr => {

//     let obj_fileterd=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === item_lyr);
//     let obj_lyr = obj_fileterd[0];
//     if(obj_lyr.properties.visible===true){

//     }

//   });


//   a216_legends.forEach(item_lyr => {


//     if(a216_legends_load.indexOf(item_lyr)===-1){
//       dyn_legends[item_lyr+'_legends']();
//     }
//   });

// }

/* function show_legends(lyr){
  //_onsole.log('show_legends:'+lyr);
  //_onsole.log(a216_legends);
  if(a216_legends_x.indexOf(lyr)>-1){
    if(lyr=='lyrsit006'){
      //_onsole.log('show_legends indexOf(lyr)>-1 :'+lyr);
      
    }
  }
  else{
    if(lyr=='lyrsit006'){
      //_onsole.log('show_legends add :'+lyr);
    }
    a216_legends_x.push(lyr);
  }
  //_onsole.log(a216_legends)
}

function hide_legends(lyr){
  if(lyr=='lyrsit006'){
    console.log('hide_legends :'+lyr);
  }
  a216_legends_x.splice(a216_legends_x.indexOf(lyr),1);

} */

function box_addon216_add_part(tab1_part_element){

  let p = tab1_part_element;

  let  c = ''
    +'<div class="row">'
      +'<div class="col-12">'
        +'<div class="box-legend box-legend-'+p.item_lyr+' '+p.g_slug+'-'+p.item_lyr+'">'
        +'</div>'
      +'</div>'
    +'</div>'
    +'';

  $('.legend-canvas-body').append(c);

  if(p.g_type=='title'){
    c = ''
      +'<div '
        +'style="text-align: center;border: 1px solid black;padding: 5px;margin-bottom: 3px;" '
        +'>'+p.title.toUpperCase()+'</div>';
    $('.'+p.g_slug+'-'+p.item_lyr+'').append(c);
  }
  else if(p.g_type=='graphic'){

    c = ''
      +'<div class="form-group addon223_b1_p2">'
        // +'<label for="exampleInputEmail1">Choose on of the displayed layers</label>'
        +'<div class="row">'
          +'<div class="col-3 '+p.g_slug+'-'+p.item_lyr+'_wms" style="padding-right:8px;">'
            +'<div class="box box-white"></div>'
          +'</div>'
          +'<div class="col-9 '+p.g_slug+'-'+p.item_lyr+'_text" style="padding-left:0px;">'
            +'<div class="box box-white"></div>'
          +'</div>'
        +'</div>'
      +'</div>'
      +'';
    $('.'+p.g_slug+'-'+p.item_lyr+'').append(c);

    let options = '?REQUEST=GetLegendGraphic'
      +'&VERSION=1.0.0'
      +'&FORMAT=image/png'
      +'&WIDTH=45'
      +'&HEIGHT=23'
      +'&LAYER='+WORKSPACE+':'+p.geoserver_name+''
      +'&SLD='+'https:'+DOMAIN_PROJECT+'/tmp/'+p.geoserver_style_name+'_'+p.item_lyr+'.sld'
      +'&LEGEND_OPTIONS=forceLabels:off;'

    let wms_legend=GEOSERVER_URL+WORKSPACE+'/wms'+options;
      

    c = ''
      +'<img src="'+wms_legend+'" />'
      +'';
    $('.'+p.g_slug+'-'+p.item_lyr+'_wms > .box').append(c);

    
    let obj_style=g_meta.geovar_lyr_style.features.filter(({properties}) => properties.g_master === p.geoserver_style_name);

    let obj_fileterd=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === p.item_lyr);
    let obj_lyr = obj_fileterd[0];
    let p_lyr=obj_lyr.properties;
    //_onsole.log('p_lyr',p_lyr);

    let obj_tb = g_meta.geovar_tb.filter(({name}) => name === p_lyr.g_tables[0])[0];
    //_onsole.log('obj_tb',obj_tb);
    

    obj_style.forEach(element => {
      let p_s = element.properties;
      let col = p_s.attr_filter_propertyname;//attr_filter_literal;
      let col_value = p_s.attr_filter_literal;
      //_onsole.log('col_value',col_value)
      var obj_tb_fileterd=obj_tb.features.filter(({properties}) => properties.g_slug === col)[0];
      
      //_onsole.log('obj_tb_fileterd',obj_tb_fileterd)
      //_onsole.log('p_s.attr_filter_propertyname',p_s.attr_filter_propertyname);
      //_onsole.log('p_s.attr_filter_literal',p_s.attr_filter_literal);
      //_onsole.log('obj_tb_fileterd',obj_tb_fileterd);

      let real_label=col_value;
      if(obj_tb_fileterd.properties.g_options!=null 
        && obj_tb_fileterd.properties.g_options.length>0){
        let real_label_fileterd = obj_tb_fileterd.properties.g_options.filter(({val}) => val ===  col_value.toString())[0];
        //_onsole.log('real_label_fileterd',real_label_fileterd)
        real_label = real_label_fileterd.text;
      }

      c = ''
        +'<div class="legend-wms-text" title="'+col_value+') '+real_label+'" '
          +'style="max-height:23.5px;overflow: hidden;">'+real_label+'</div>'
        +'';
      $('.'+p.g_slug+'-'+p.item_lyr+'_text > .box').append(c);
    });


  }

  //$('.'+p.g_slug+'-'+p.item_lyr).html();

}
