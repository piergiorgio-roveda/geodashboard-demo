$(document).ready(function() {

  $('#search-classic').append('<div '
    +'class="box-btn_search_classic box-info-2-btn d-grid gap-2" '
    +'style="margin-top:5px;"></div>');
  create_button('btn_search_classic');

}); //$(document).ready

// !dev change `slug` to `optIn`
f_btn[ 'btn_search_classic']=function(slug){
  // _onsole.log('btn_search_classic');
  //t@his_lyr[r.ds.lyr].last_r=r;
  sessionStorage.this_dialog_lyr=null;
  sessionStorage.this_dialog_slug='search_classic';//'lyr035_single'

  create_dialog2('search_classic');
}

dyn_functions['template_by_slug_search_classic'] = function(){

  // _onsole.log('template_by_slug_search_classic');

  var tabs = [
    {'g_slug':'tab1','g_label':'Current view'},
    {'g_slug':'tab2','g_label':'By category'},
    {'g_slug':'tab3','g_label':'By nation'}
  ];
  var slug='search_classic';
  $('.dlg_'+slug+'_body').html('');

  var c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $('.dlg_'+slug+'_body').append(c);

  var c = ''
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  $('.dlg_'+slug+'_body').append(c);

  var c = '<div>'
    +'<div class="col-btn-attrs" style="text-align:left;">'
    +'</div>'
  +'</div>';
  $('.dlg_'+slug+'_body').append(c);

  var iTAb=0;

  tabs.forEach(e => {
    iTAb++;
    var tab=e.g_slug;
    var label=e.g_label;
    // _onsole.log('dlg_template:explorer_simple > '+g_slug);
    var b = ''
      +'<button id="'+tab+'" class="btn btn-dark btn-sm btn-tab btn-'+tab+'" '
        +'slug="'+tab+'" '
        +'style="padding:5px 5px;margin-right: 5px;" '
        +'>'+label+'</button>';
    $('.col-btn-attrs').append(b);

    var display = '';
    if(iTAb==1){
      $('.btn-'+tab).addClass('active');
      var display ='display:block;';
    }
    else{
      var display ='display:none;';
    }

    var c = '<div class="clearfix"></div>'
      +'<div class="box-tab box_'+tab+'" style="'+display+'">'
        +'<div class="boxItem">'
          +'<div ' 
            +'style="padding:3px;">'
            +'<div class="dlg_'+slug+'_'+tab+'_ct1">'
            +'</div>'
          +'</div>'
        +'</div>'
      +'</div>'
    +'';

    $('.dlg_'+slug+'_body').append(c);
  });

  $('.btn-tab').on('click',function(){

    $('.btn-tab').removeClass('active');
    $(this).addClass('active');

    $('.box-tab').css('display','none');
    var tab = $(this).attr('slug');
    $('.box_'+tab).css('display','block');

    dyn_functions['fill_dlg_search_classic_'+tab]();

  });

  dyn_functions['fill_dlg_search_classic_tab1']();

}

dyn_functions['fill_dlg_search_classic_tab1'] = function(){

  var slug = 'search_classic';
  var tab = 'tab1';
  //$('.dlg_'+slug+'_'+tab+'_ct1').html('Aaa');

  //--

  $('.dlg_'+slug+'_'+tab+'_ct1').html(''
    +'<div class="form-group group-'+slug+'_'+tab+'">'
      +'<label for="exampleInputEmail1">Choose on of the displayed layers</label>'
    +'</div>'
  +'');
  $('.group-'+slug+'_'+tab).append(''
    +'<select id="input-'+slug+'_'+tab+'" class="form-select input'+tab+'" aria-label="Default select example" '
      +'slug="'+slug+'"  '
      +'>'
    +'</select>'
  +'');

  $('#input-'+slug+'_'+tab).append($('<option>', { 
    value: '',
    text : '--Choose one of active layer'
  }));

  g_meta.geovar_lyr.features.forEach(feature => {
    var p=feature.properties
    if(p.g_slug==element){
      if(sessionStorage.last_search_classic_lyr==element){
        $('#input-'+slug+'_'+tab).append(new Option( p.g_label,p.g_slug, false, true));
      }
      else{
        $('#input-'+slug+'_'+tab).append(new Option(p.g_label,p.g_slug,  false, false));
      }
    }
  });

  //--

  if(sessionStorage.last_search_classic_lyr){
    var lyr = sessionStorage.last_search_classic_lyr;
    fill_search_classic_tab1_list_elemen(slug,lyr,tab);
  }

  $('.input'+tab).on('change', function() {
    var lyr = $(this).find(":selected").val();

    sessionStorage.last_search_classic_lyr = lyr;

    fill_search_classic_tab1_list_elemen(slug,lyr,tab);

  });

}

function fill_search_classic_tab1_list_elemen(slug,lyr,tab){

  if(g_meta[lyr]){

    $('.dlg_'+slug+'_'+tab+'_ct1').append(''
      +'<div class="list-element-'+tab+'" style="margin-top:15px;max-height: 300px;overflow: auto;">'
        +'<table class="table table-'+slug+'_'+tab+'"></table>'
      +'</div>'
    +'');

    var fo2 = Object.keys(g_meta[lyr][0].properties);

    g_meta[lyr].forEach(feature => {
      var p = feature.properties;
      var g = feature.geometry;
      if(p.item_token!='generic'){
        
        $('.table-'+slug+'_'+tab).append('<tr id="tr-'+p.item_token+'"></tr>');

        if(g){
          $('#tr-'+p.item_token).append('<td>'
            +'<button '
              +'type="button" '
              +'style="width:30px;border: 0px;" '
              +'class="btn btn-xs btn-outline-dark btn-locate-feature" '
              +'lat="'+g.coordinates[1]+'" '
              +'lng="'+g.coordinates[0]+'" '
              +'>'
              +'<i class="fa fa-map-marker" aria-hidden="true"></i></button>'
          +'</td>');
        }

        fo2.forEach(col => {

          if(col!='item_token' && col!='image_url'){
            $('#tr-'+p.item_token).append('<td>'+p[col]+'</td>');
          }
          
        });
      }

      
    });

    $('.btn-locate-feature').on('click',function(){
      // _onsole.log($(this).attr('lat'));
      // !dev change `slug` to `optIn`
      f_btn[ 'btn_closedlg']();
      onClick_flyTo($(this).attr('lat'),$(this).attr('lng'),17);
    });

  }
  else{
    $('.list-element-'+tab).remove();
  }

}

dyn_functions['fill_dlg_search_classic_tab2'] = function(){

  var slug = 'search_classic';
  var tab = 'tab2';
  //$('.dlg_'+slug+'_'+tab+'_ct1').html('Bbb');

  //--

  $('.dlg_'+slug+'_'+tab+'_ct1').html(''
    +'<div class="form-group group-'+slug+'_'+tab+'">'
      +'<label for="exampleInputEmail1">Choose on of the displayed layers</label>'
    +'</div>'
  +'');
  $('.group-'+slug+'_'+tab).append(''
    +'<select id="input-'+slug+'_'+tab+'" class="form-select input'+tab+'" aria-label="Default select example" '
      +'slug="'+slug+'"  '
      +'>'
    +'</select>'
  +'');

  $('#input-'+slug+'_'+tab).append($('<option>', { 
    value: '',
    text : '--Choose one of active layer'
  }));

  g_meta.geovar_lyr.features.forEach(feature => {
    var p=feature.properties
    if(p.g_slug==element){
      /*
      $('#input-'+slug).append($('<option>', { 
        value: p.g_slug,
        text : p.g_label
      }));
      */
      if(sessionStorage.last_search_classic_lyr==element){
        $('#input-'+slug+'_'+tab).append(new Option( p.g_label,p.g_slug, false, true));
      }
      else{
        $('#input-'+slug+'_'+tab).append(new Option(p.g_label,p.g_slug,  false, false));
      }
    }
  });

  //--

  if(sessionStorage.last_search_classic_lyr){
    var lyr = sessionStorage.last_search_classic_lyr;
    fill_search_classic_tab2_list_category(slug,lyr,tab);
  }

  $('.input'+tab).on('change', function() {
    var lyr = $(this).find(":selected").val();

    sessionStorage.last_search_classic_lyr = lyr;

    $('.group-'+slug+'_'+tab+'_2').remove();

    fill_search_classic_tab2_list_category(slug,lyr,tab);

  });

}

function fill_search_classic_tab2_list_category(slug,lyr,tab){
  // _onsole.log('fill_search_classic_tab2_list_category');
  var group_by_arr='';
  g_meta.geovar_lyr.features.forEach(lyr_obj => {
    if(lyr_obj.properties.g_slug==lyr){
      group_by_arr=lyr_obj.properties.g_cols_minimal[0].group_by;
    }
  });
  // _onsole.log(group_by_arr);
  $('.dlg_'+slug+'_'+tab+'_ct1').append(''
    +'<div class="form-group group-'+slug+'_'+tab+'_2">'
      +'<label for="exampleInputEmail1">Choose on of category</label>'
    +'</div>'
  +'');
  $('.group-'+slug+'_'+tab+'_2').append(''
    +'<select id="input-'+slug+'_'+tab+'_2" '
      +'class="form-select input'+tab+'_2" aria-label="Default select example" '
      +'slug="'+slug+'"  '
      +'>'
    +'</select>'
  +'');

  $('#input-'+slug+'_'+tab+'_2').append($('<option>', { 
    value: '',
    text : '--Choose one of categories'
  }));

  if(group_by_arr){
    group_by_arr.forEach(group_col => {

      $('#input-'+slug+'_'+tab+'_2').append(new Option(group_col,group_col, false, false));

    });
  }
  else{
    $('#input-'+slug+'_'+tab+'_2').html($('<option>', { 
      value: '',
      text : '--Choose one of categories'
    }));
  }

  $('.input'+tab+'_2').on('change', function() {
    var col = $(this).find(":selected").val();

    sessionStorage.last_search_classic_col = col;
    $('.list-element-'+tab).remove();

    if(col){
      fill_search_classic_tab2_list_elements_prepare(slug,col,tab);
    }
    

  });

}

function fill_search_classic_tab2_list_elements_prepare(slug,col,tab){

  sessionStorage.last_search_classic_slug = slug;
  sessionStorage.last_search_classic_tab = tab;

  var dataString={
    fn_group:'geodata',
    action:'view_data',
    collection:'lyr_group_by_one_table',
    qy_name:'A',
    lyr:sessionStorage.last_search_classic_lyr,//'lyr035',
    col:sessionStorage.last_search_classic_col,
    geom:false,
    //item_token:localStorage[slug+'_token'] //lyr035_token
  }
  generic_api(dataString,'fill_search_classic_tab2_list_elements');

}

dyn_functions['succ_fill_search_classic_tab2_list_elements'] = function(r){

  // _onsole.log(r);
  var slug = sessionStorage.last_search_classic_slug;
  var tab = sessionStorage.last_search_classic_tab;
  if(r.features[0]){

    $('.dlg_'+slug+'_'+tab+'_ct1').append(''
      +'<div class="list-element-'+tab+'" style="margin-top:15px;max-height: 300px;overflow: auto;">'
        +'<table class="table table-'+slug+'_'+tab+'"></table>'
      +'</div>'
    +'');
    $('.table-'+slug+'_'+tab).append('<tr id="tr-th"></tr>');

    $('#tr-th').append('<th>#</th>');

    var fo2 = Object.keys(r.features[0].properties);
    // _onsole.log(fo2)

    fo2.forEach(col => {

      $('#tr-th').append('<th>'+col+'</th>');
      
    });

    var iF=0;

    r.features.forEach(feature => {

      var p = feature.properties;

      //var fo2 = Object.keys(p);
      // _onsole.log(fo2)
      $('.table-'+slug+'_'+tab).append('<tr id="tr-'+iF+'"></tr>');

      $('#tr-'+iF).append('<td>'+iF+'</td>');

      var query_value = '';

      fo2.forEach(col => {

        // _onsole.log(col+'>'+p[col]);
        if(col!='count'){
          var string = p[col];
          query_value = string;
          myString=string.toString().substring(0,25);
        }
        else{
          var myString = p[col];
        }
        $('#tr-'+iF).append('<td>'+myString+'</td>');
        
      });

      $('#tr-'+iF).append('<td>'
        +'<button '
          +'type="button" '
          +'style="width:30px;border: 0px;" '
          +'class="btn btn-xs btn-outline-dark btn-query-feature" '
          +'query_value="'+query_value+'" '
          +'>'
          +'<i class="fa fa-arrow-right" aria-hidden="true"></i></button>'
      +'</td>');

      iF++;

    });

    $('.btn-query-feature').on('click',function(){
      // _onsole.log($(this).attr('lat'));
      // !dev change `slug` to `optIn`
      f_btn[ 'btn_closedlg']();
      exe_search_classic_query_feature($(this).attr('query_value'));
    });

  }
  else{
    $('.list-element-'+tab).remove();
  }
}

function exe_search_classic_query_feature(query_value){

  //filter_field:sessionStorage.last_search_classic_col,
  //filter_value:query_value

  var lyr = sessionStorage.last_search_classic_lyr;
  let obj_lyr=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === lyr)[0].properties;
  obj_lyr.query=true;
  obj_lyr.filter_field=sessionStorage.last_search_classic_col;
  obj_lyr.filter_value=query_value;

  switch_on_lyr_b(lyr);

  add_search_classic_box_filter_toc(lyr);

}

function add_search_classic_box_filter_toc(lyr){

  let obj_lyr=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === lyr)[0].properties;

  $('.search_classic_box_filter').remove();

  $('.'+lyr+'-toc-extend').append(''
    +'<div class="search_classic_box_filter" style="border:1px solid black;margin-top: 5px;">'
      +'<div style="text-align: center;font-weight: 900;">'
        +obj_lyr.filter_value
      +'</div>'
      +'<div class="clearfix" style="margin-bottom:3px;"></div>'
      +'<div style="margin-right: 5px;margin-left: 1px;width: 100%;text-align: center;">'
        +'<button lyr="'+lyr+'" class="btn btn-xs btn-search_classic_filter_envelope" style="width:50px;">'
          +'<i class="fa fa-arrows-alt" aria-hidden="true"></i></button>'
        +'<button lyr="'+lyr+'" class="btn btn-xs btn-search_classic_filter_remove" style="width:50px;">'
          +'<i class="fa fa-times-circle" aria-hidden="true"></i></button>'
      +'</div>'
    +'</div>'
    +'<div class="clearfix search_classic_box_filter" style="margin-bottom:3px;"></div>'
  +'');

  $('.btn-search_classic_filter_remove').on('click',function(){
    var lyr=$(this).attr('lyr');
    let obj_lyr=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === lyr)[0].properties;
    $('.search_classic_box_filter').remove();
    obj_lyr.query=false;
    switch_on_lyr_b(lyr);
  });

  $('.btn-search_classic_filter_envelope').on('click',function(){
    var lyr=$(this).attr('lyr');
    let obj_lyr=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === lyr)[0].properties;
    var tmp_geom = {
      "type":"FeatureCollection",
      "features":obj_lyr.envelope
    }
    // _onsole.log(tmp_geom);
    var map_obj = L.geoJSON(tmp_geom);

    mymap.fitBounds(map_obj.getBounds());

  });

}


dyn_functions['fill_dlg_search_classic_tab3'] = function(){

  var slug = 'search_classic';
  var tab = 'tab3';
  //$('.dlg_'+slug+'_'+tab+'_ct1').html('Bbb');

  //--

  $('.dlg_'+slug+'_'+tab+'_ct1').html(''
    +'<div class="form-group group-'+slug+'_'+tab+'">'
      +'<label for="exampleInputEmail1">Choose on of the displayed layers</label>'
    +'</div>'
  +'');
  $('.group-'+slug+'_'+tab).append(''
    +'<select id="input-'+slug+'_'+tab+'" class="form-select input'+tab+'" aria-label="Default select example" '
      +'slug="'+slug+'"  '
      +'>'
    +'</select>'
  +'');

  $('#input-'+slug+'_'+tab).append($('<option>', { 
    value: '',
    text : '--Choose one of active layer'
  }));

  g_meta.geovar_lyr.features.forEach(feature => {
    var p=feature.properties
    if(p.g_slug==element){
      if(sessionStorage.last_search_classic_lyr==element){
        $('#input-'+slug+'_'+tab).append(new Option( p.g_label,p.g_slug, false, true));
      }
      else{
        $('#input-'+slug+'_'+tab).append(new Option(p.g_label,p.g_slug,  false, false));
      }
    }
  });

  //--

  if(sessionStorage.last_search_classic_lyr){
    var lyr = sessionStorage.last_search_classic_lyr;
    fill_search_classic_tab3_list_nations_prepare(slug,lyr,tab);
  }

  $('.input'+tab).on('change', function() {
    var lyr = $(this).find(":selected").val();

    sessionStorage.last_search_classic_lyr = lyr;

    $('.group-'+slug+'_'+tab+'_2').remove();

    fill_search_classic_tab3_list_nations_prepare(slug,lyr,tab);

  });

}

function fill_search_classic_tab3_list_nations_prepare(slug,lyr,tab){

  sessionStorage.last_search_classic_slug = slug;
  sessionStorage.last_search_classic_tab = tab;

  var dataString={
    fn_group:'geodata',
    action:'view_data',
    collection:'lyr_group_by_one_table',
    qy_name:'A',
    lyr:sessionStorage.last_search_classic_lyr,//'lyr035',
    col:'admin_0',
    geom:false,
    //item_token:localStorage[slug+'_token'] //lyr035_token
  }

  generic_api(dataString,'fill_search_classic_tab3_list_nations');

}

dyn_functions['succ_fill_search_classic_tab3_list_nations'] = function(r){

  var slug = sessionStorage.last_search_classic_slug;
  var tab = sessionStorage.last_search_classic_tab;
  var lyr = sessionStorage.last_search_classic_lyr;

  // _onsole.log(group_by_arr);
  $('.dlg_'+slug+'_'+tab+'_ct1').append(''
    +'<div class="form-group group-'+slug+'_'+tab+'_2">'
      +'<label for="exampleInputEmail1">Choose one nation</label>'
    +'</div>'
  +'');
  $('.group-'+slug+'_'+tab+'_2').append(''
    +'<select id="input-'+slug+'_'+tab+'_2" '
      +'class="form-select input'+tab+'_2" aria-label="Default select example" '
      +'slug="'+slug+'"  '
      +'>'
    +'</select>'
  +'');

  $('#input-'+slug+'_'+tab+'_2').append($('<option>', { 
    value: '',
    text : '--Choose one nation'
  }));


  r.features.forEach(feature => {
    var p = feature.properties;
    $('#input-'+slug+'_'+tab+'_2').append(new Option(p.admin_0,p.admin_0, false, false));

  });


  $('.input'+tab+'_2').on('change', function() {
    var sel_admin = $(this).find(":selected").val();

    sessionStorage.last_search_classic_sel_admin = sel_admin;
    $('.list-element-'+tab).remove();

    if(sel_admin){
      fill_search_classic_tab3_list_elements_prepare(slug,sel_admin,tab);
    }
    

  });

}

function fill_search_classic_tab3_list_elements_prepare(slug,sel_admin,tab){

  //sessionStorage.last_search_classic_slug = slug;
  //sessionStorage.last_search_classic_tab = tab;

  var dataString={
    fn_group:'geodata',
    action:'view_data',
    collection:'lyr_all',
    qy_name:'A',
    lyr:sessionStorage.last_search_classic_lyr,
    geom:1,
    current_zoom: mymap.getZoom(),
    world:true,
    query:true,
    filter_field:'admin_0',
    filter_value:sel_admin
  }
  generic_api(dataString,'fill_search_classic_tab3_list_elements');

}

dyn_functions['succ_fill_search_classic_tab3_list_elements'] = function(r){

  var slug = sessionStorage.last_search_classic_slug;
  var tab = sessionStorage.last_search_classic_tab;
  var lyr = sessionStorage.last_search_classic_lyr;

  if(r.features){

    $('.dlg_'+slug+'_'+tab+'_ct1').append(''
      +'<div class="list-element-'+tab+'" style="margin-top:15px;max-height: 300px;overflow: auto;">'
        +'<table class="table table-'+slug+'_'+tab+'"></table>'
      +'</div>'
    +'');

    r.features.forEach(feature => {
      var p = feature.properties;
      var g = feature.geometry;
      var fo2 = Object.keys(p);
      $('.table-'+slug+'_'+tab).append('<tr id="tr-'+p.item_token+'"></tr>');

      if(g){
        $('#tr-'+p.item_token).append('<td>'
          +'<button '
            +'type="button" '
            +'style="width:30px;border: 0px;" '
            +'class="btn btn-xs btn-outline-dark btn-locate-feature" '
            +'lat="'+g.coordinates[1]+'" '
            +'lng="'+g.coordinates[0]+'" '
            +'>'
            +'<i class="fa fa-map-marker" aria-hidden="true"></i></button>'
        +'</td>');
      }

      fo2.forEach(col => {

        if(col!='item_token' && col!='image_url'){
          $('#tr-'+p.item_token).append('<td>'+p[col]+'</td>');
        }
        
      });
      
    });

    $('.btn-locate-feature').on('click',function(){
      // _onsole.log($(this).attr('lat'));
      // !dev change `slug` to `optIn`
      f_btn[ 'btn_closedlg']();
      onClick_flyTo($(this).attr('lat'),$(this).attr('lng'),17);
    });

  }
  else{
    $('.list-element-'+tab).remove();
  }

}