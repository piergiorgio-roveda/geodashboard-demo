$(document).ready(function() {


}); //$(document).ready

//-- minimum for each lyr

var lyr='lyr043';

//dMap.analisi01.grLyr.push(lyr);


//--

function get_lyr043_data_for_lyr045_single_tab3(){

  let lyr='lyr045';
  let obj_lyr=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === lyr)[0].properties;

  var f_lyr045=obj_lyr.last_r.features[0];

  var  dataString={
    fn_group:'geodata',
    action:'view_data',
    collection:'lyr_single_one_table',
    qy_name:'A',
    lyr:'lyr043',
    geom:false,
    one2nnn:true,
    join_field:'codice_agenzia',
    join_value:f_lyr045.properties.codice_agenzia //localStorage[slug+'_token'] //lyr035_token
  }
  generic_api(dataString,'lyr043_data_for_lyr045_single_tab3');
  return;

}

dyn_functions['succ_lyr043_data_for_lyr045_single_tab3'] = function(r){

  let obj_lyr043=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === 'lyr043')[0].properties;
  let obj_lyr045=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === 'lyr045')[0].properties;

  var lyr='lyr043';

  var slug = 'lyr045_single';
  var tab = 'tab3';

  var f = r.features;
  var f_lyr045=obj_lyr045.last_r.features[0];

  $('.dlg_'+slug+'_'+tab+'_ct1').append('<table class="table table_'+tab+'_ct1"></table>');
  /*$('.table_'+tab+'_ct1').append('<tr>'
    +'<th>Tipologia</th>'
    +'<th>Stato conservativo</th>'
    +'<th>Valore Mercato (€/mq)</th>'
    +'<th>MAX</th>'
    +'<th>Superficie (L/N)</th>'
    +'<th>Valori Locazione (€/mq x mese)</th>'
    +'<th>Superficie (L/N)</th>'
    +'<th>L</th>'
  +'</tr>');*/

  var table_slug=obj_lyr043.g_tables[0];
  g_meta.geovar_map_tb.forEach(obj => {
    // _onsole.log(obj.name)
    if(obj.name==table_slug){
      this_tb[table_slug]=obj.features;
    }
  });

  //header
  var header_f = f[0];

  var p = header_f.properties;
  var foo = Object.keys(p);

    var c = '';

  foo.forEach((foo_el) => {

    var label='';
    // _onsole.log(table_slug)
    this_tb[table_slug].forEach(obj_tb => {
      var p_tb=obj_tb.properties;
      if(p_tb.g_slug==foo_el){
        label=p_tb.g_label;
        if(p_tb.g_preview==true){
          c+='<th>'+label+'</th>';
        }
      }
    });

  });
  $('.table_'+tab+'_ct1').append('<tr>'
    + c
  +'</tr>');

  // ---

  // _onsole.log(this_tb[table_slug]);

  f.forEach(element => {

    var p = element.properties;
    var foo = Object.keys(p);

    var c = '';
    if(p['descr_tipologia']==f_lyr045.properties.my_category_main){

      foo.forEach((foo_el) => {

        if(foo_el=='cod_naz_co'||foo_el=='zona_omi'||foo_el=='cod_tip'||foo_el=='codice_agenzia'){
          
        }
        else{
          //$('.dlg_'+slug+'_'+tab+'_ct1').append(foo_el+': '+p[foo_el]+'<br>');
          c+='<td>'+p[foo_el]+'</td>';
        }

      });

      //$('.dlg_'+slug+'_'+tab+'_ct1').append(foo_el+': '+p[foo_el]+'<br>');
      $('.table_'+tab+'_ct1').append('<tr>'
        + c
      +'</tr>');

    }


  });


}