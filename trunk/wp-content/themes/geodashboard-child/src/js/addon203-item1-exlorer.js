dyn_functions['addon203-item1-exlorer'+'_ready'] = function(){
  addon203_ready();
}

if(sessionStorage.btn_explorer_open!== null){
  sessionStorage.btn_explorer_open=0;
}

function addon203_ready(){

  list_actions();

}

var listCollectionExtend=[];

function list_actions(){

  var r = g_meta.geovar_action;

  //var slug=r.ds.slug;
  var slug='btn_explorer';

  $('#explorer-header').html('<div id="boxExp-1"></div>');
  $('#explorer-body > div').html('<div id="box_'+slug+'_body"></div>');

  $('#explorer-footer').html(''
    +'<!--SUBMIT-->'
    +'<div class="row row2 align-items-center" style="margin:0px;height: 50px;">'
      //+'<div class="col-3 ajs-footer-btn2" style=" text-align: center;">'
      //+'</div>'
      +'<div class="col-2 d-grid gap-2 d-flex justify-content-start">'
        +'<div class="ajs-footer-btn3"></div>'
      +'</div>'
      +'<div class="col-8 d-grid gap-2 d-flex justify-content-end" '
        +'style="text-align: center;">'
        +'<div class="explorer-footer-btn2" '
          +'style="display:inline;padding-right: 5px;width: 100%;"></div>'
      +'</div>'
      +'<div class="col-2 d-grid gap-2 d-flex justify-content-end">'
        +'<div class="ajs-footer-btn1" '
          +'style="display:inline;color:black;">'
          +ERP_OWNER_GEOINFO_AZIENDA
        +'</div>'
      +'</div>'
    +'</div>');

  //---

  let c = '<div class="mainboxItem" '
    +'style="margin-top:5px;"></div>';

  //box button tab
  c += ''
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  //box button tab -end
  c += ''
    +'<ul class="nav nav-tabs">'
    +'</ul>';

  //box tab1
  c += '<div '
    +'class="dlg_panel dlg_panel_tab panel-tab1" '
    +'style="display:block;font-family:var(--wd-fonts-secondary);">';
  c += '</div><!--tab1-->'; 

  $('#box_'+slug+'_body').html(c);
  
  //--template END

  $('.panel-tab1').append('<div class="row" style="margin: 0px;">'
    //+'<div id="boxExp-3-toc" class="col-3"></div>'
    +'<div id="boxExp-2-list" class="col-12"></div>'
  +'</div>');

  //#boxExp-1 / box-explorer-1
  $('#boxExp-1').append('<div>'
    +'<div id="boxExp-1-head" class="btn-head">'
      +''+'action'.toUpperCase()+''
    +'</div>'
    +'<div id="boxExp-1-btn" class="box-btn-inline">'
    +'</div>'
  +'</div>');

  //var f = r.features;
  
  var f = g_meta.geovar_action.features;

  f.forEach(element => {

    var p = element.properties;

    //#boxExp-1-btn / box-explorer-1-btn'
    $('#boxExp-1-btn').append(''
      +'<!--btn-action-->'
      +'<button type="button" class="btn btn-dark btn-sm btn-action btn-action-'+p.g_slug+'" '
        +'slug="'+p.g_slug+'" '
        +'>'+p.g_label+'</button>'
    +'');

    // if(p.g_slug=='create_data'){
    //   $('.btn-action-'+p.g_slug).prop('disabled',true);
    // } 

  });

  //#boxExp-2-list / explorer-list-1
  $('#boxExp-2-list').html(''
    +'<div class="bd-content">'
      +'<div id="boxExp-2-list-body" class="bd-default" '
        +'style="'
          +'max-height: 700px;'
          //+'overflow-y: auto;'
          //+'overflow-x: hidden;'
        +'" '
        +'>'
        +'<p>Choose an action.</p>'
      +'</div>'
    +'</div>'
  +'');

  $('.btn-action').on('click',function(){

    $('.btn-action').removeClass('active');
    $(this).addClass('active');

    sessionStorage.action=$(this).attr('slug');
    g_meta.geovar_action.features.forEach(element => {
      var p = element.properties;
      if(p.g_slug==sessionStorage.action){
        g_meta.this_action=p;
      }

    });

    dyn_functions['succ_list_collection']();
  });

}

dyn_functions['succ_list_collection'] = function(){
  
  var p = g_meta.this_action;
  //boxExp-2-list-body
  $('#boxExp-2-list-body').html(''
    +'<div>'
      +'<p>'+p.g_description+'</p>'
    +'</div>'
  +'');

  // _onsole.log(r);

  //#boxExp-3-toc / box-info-3
  // $('#boxExp-3-toc').html(''
  //   +'<div id="toc-list-1" class="toc-list">'
  //     +'<ul class="list-group toc-list-item">'
  //     +'</ul>'
  //   +'</div>'
  // );
  $('.box-info-0').html(''
    +'<div id="toc-list-1" class="toc-list">'
      +'<ul class="list-group toc-list-item">'
      +'</ul>'
    +'</div>'
  );


  //var f = r.features;
  //var f=g_meta.geovar_collection.features;

  let o = g_meta.geovar_collection.features;
  let obj_collection=o.filter(({properties}) => properties.g_action === sessionStorage.action);
  //let obj_collection=this_obj[0].properties;

  //g_meta['collection']=f;
  obj_collection.forEach(element => {
    let p = element.properties;
    let c = ''
      +'<!--btn-collection-->'
      +'<li class="list-group-item btn-collection d-flex justify-content-between align-items-center" '
        +'style="cursor:pointer;" '
        +'slug="'+p.g_slug+'" '
        +'>'
        +''+p.g_label+''
        +'<span><i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i></span>'
      +'</li>'
    +'';
    $('.toc-list-item').append(c);


  });

  $('.btn-collection').on('click',function(){

    $('.btn-collection').removeClass('active');
    $(this).addClass('active');

    sessionStorage.collection=$(this).attr('slug');

    collection_boxes();

  });

}

function collection_boxes(){

  $('#boxExp-2-list-body').html('');


  let o = g_meta.geovar_collection.features;
  let this_obj=o.filter(({properties}) => properties.g_slug === sessionStorage.collection);
  let obj_collection=this_obj[0].properties;

  if(obj_collection.g_block_params==true){

    params_box();

  }

}

function collapse_ct(ct){
  if($('.'+ct+'-collapse').hasClass('ct-hide')){
    $('.'+ct+'-collapse').removeClass('ct-hide');
    $('.'+ct+'-collapse').css('display','');
    $('.'+ct+'-head > div > .btn-collapse-ct > .fa').removeClass('fa-plus-square');
    $('.'+ct+'-head > div > .btn-collapse-ct > .fa').addClass('fa-minus-square');
  }
  else{
    $('.'+ct+'-collapse').addClass('ct-hide');
    $('.'+ct+'-collapse').css('display','none');
    $('.'+ct+'-head > div > .btn-collapse-ct > .fa').removeClass('fa-minus-square');
    $('.'+ct+'-head > div > .btn-collapse-ct > .fa').addClass('fa-plus-square');
  }
}

function params_box(){

  $('#boxExp-2-list-body').append(''
    +'<div class="row">'
      +'<div class="col">'
        +'<div class="ct-collection-sub-btn box-btn-inline" style="margin-bottom:15px;">'
        +'</div>'
      +'</div>'
    +'</div>'
    +'<div class="row">'
      +'<div class="col">'
        +'<div class="ct-params-head ct-head">'
          +'<div>Params'
            +'<span for="ct-params" class="btn-collapse-ct" style="float:right;cursor:pointer;">'
              +'<i class="fa fa-minus-square" aria-hidden="true" style="margin-top:3px;"></i>'
            +'</span>'
          +'</div>'
        +'</div>'
        +'<div class="ct-params-collapse">'
          +'<div class="ct-params" '
            +'style="'
              +'max-height: 500px;'
              +'overflow-y: auto;'
              +'overflow-x: hidden;'
            +'" '
            +'>'
          +'</div>'
          +'<!--SUBMIT-->'
          +'<div class="ct-note">'
            +'* field required'
          +'</div>'
          +'<!--SUBMIT-->'
          +'<div class="row row2 align-items-center" style="margin:0px;height: 50px;">'
            +'<div class="col-12 d-grid gap-2 d-flex justify-content-end" '
              +'style="text-align: center;">'
              +'<div class="footer-btn2" '
                +'style="display:inline;width: 100%;">'
                +'<!--submit-params-->'
                +'<button type="submit" '
                  +'class="btn btn-dark btn-sm submit-params" '
                  +'slug="'+sessionStorage.collection+'">Submit</button>'
              +'</div>'
            +'</div>'
          +'</div>'
        +'</div>'
      +'</div>'
      +'<div class="col">'
        +'<div class="ct-results">'
        +'</div>'
      +'</div>'
    +'</div>'
  +'');

  $('.btn-collapse-ct').on('click',function(){

    collapse_ct($(this).attr('for'));
    
  });

  $('.submit-params').on('click',function(){
    submit_params();
  });

  let o = g_meta.geovar_collection.features;
  let this_obj=o.filter(({properties}) => properties.g_slug === sessionStorage.collection);
  let obj_collection=this_obj[0].properties;

  if(obj_collection.g_sub){

    obj_collection.g_sub.forEach(element => {
      var active_class='';
      if(element=='default'){
        active_class=' active';
      }
      $('.ct-collection-sub-btn').append(''
        +'<button type="button" class="btn btn-dark btn-sm btn-xs btn-collection-sub '+active_class+'" '
          +'slug="'+element+'" '
          +'>'+element.toUpperCase()+'</button>'
      +'');
    });

    $('.btn-collection-sub').on('click',function(){
      $('.ct-params').html('');
      $('.btn-collection-sub').removeClass('active');
      $(this).addClass('active');
      sessionStorage.collection_sub=$(this).attr('slug');

      get_collection_params();

    });

  }

  sessionStorage.collection_sub='default';

  get_collection_params();

}

function get_collection_params(){

  //let o = g_meta.geovar_collection_params;//.features;
  let o = g_meta.geovar_tb;//.features;
  let this_obj = o.filter(({name}) => name === sessionStorage.collection);

  // _onsole.log('get_collection_params',this_obj);

  if(this_obj.length==0){

    console.log('No params for this collection ' + sessionStorage.collection);

    if(listCollectionExtend.length!=0){

      console.log('Found listCollectionExtend',listCollectionExtend);
  
      listCollectionExtend.forEach(adds => {
        dyn_functions[adds+'_CollectionExtend']();
      });
  
    }

    return

  }

  let obj_collection_params=this_obj[0];//.properties;

  obj_collection_params.features.forEach(element => {

    var p = element.properties

    var next=0;

    if(p.g_sub){
      // _onsole.log('Param has sub');
      p.g_sub.forEach(el2 => {
        if(el2==sessionStorage.collection_sub){
          next=1;
        }
      });
    }
    else{
      if(sessionStorage.collection_sub=='default'){
        next=1;
      }
      else{
        next=0;
      }
    }

    if(next==1){

      if(p.form_type=='unique'){
        var placeholder='';
        var disabled='disabled';
        var value=p.g_placeholder
      }
      else{
        var placeholder=p.g_placeholder;
        var disabled='';
        var value=p.g_placeholder;
      }

      var required='0';
      var required_label='';
      if(p.g_required==1){
        required='1';
        required_label=' *';
      }

      if(p.data_type=='integer'
        || p.g_format=='double precision'){
        var type='number';
      }
      else{
        var type='text';
      }

      //--

      $('.ct-params').append(''
        +'<div id="group-'+p.g_slug+'" class="form-group">'
          +'<label for="exampleInputEmail1">'+p.g_label+required_label+'</label>'
        +'</div>'
      +'');

      //--

      if(p.g_module){
        p.g_module.forEach(el3 => {
          $('#group-'+p.g_slug).append(''
            +'<span module="'+el3+'" '
              +'class="field-module module-'+p.g_slug+'-'+el3+'">'
              +'<i class="fa fa-cubes" aria-hidden="true"></i>'
            +'</span>'
          +'');
        });
      }

      if( p.g_options ) {
        // _onsole.log(p.g_slug +' > ' + 'have options')
        $('#group-'+p.g_slug).append(''
          +'<select id="input-'+p.g_slug+'" class="form-select params-control" aria-label="Default select example" '
            +'field_slug="'+p.g_slug+'"  '
            +''+disabled+' '
            +'required="'+required+'" '
            +'>'
          +'</select>'
        +'');
        if(required=='0'){
          $('#input-'+p.g_slug).append($('<option>', { 
            value: '',
            text : '--Leave blank or select an option'
          }));
        }
        p.g_options.forEach(el4 => {
          $('#input-'+p.g_slug).append($('<option>', { 
              value: el4,
              text : el4 
          }));
        });
      }
      else{
        $('#group-'+p.g_slug).append(''
          +'<input type="'+type+'" '
            +'class="form-control params-control" '
            +'field_slug="'+p.g_slug+'" '
            +'placeholder="'+placeholder+'" '
            +'value="'+value+'" '
            +''+disabled+' '
            +'required="'+required+'" '
            +'>'
        +'');
      }

      if( p.g_description ) {
        $('#group-'+p.g_slug).append('<small id="emailHelp" class="form-text text-muted">'+p.g_description+'</small>');
      }

    }//next

  });

  $( ".params-control" ).keyup(function() {
    // _onsole.log($(this).val());
    const params = document.querySelectorAll('.params-control');

    var iSubmit=1;
    Array.from(params).forEach((element, index) => {
      // _onsole.log(element.getAttribute('slug'));
      // _onsole.log(element.value);
      if(element.getAttribute('required')==1){
        if( element.value.length > 0 ) {
          element.classList.remove('is-invalid');
        }
        else{
          iSubmit=0;
          // _onsole.log('disabling');
          element.classList.add('is-invalid');
        }
      }
    });

    if(iSubmit==0){
      $('.submit-params').attr('disabled',true);
    }
    else{
      $('.submit-params').attr('disabled',false);
    }

  });

  //--

  $( ".field-module" ).on('click',function() {
    
    dyn_functions[$(this).attr('module')]();

  });

}

function submit_params(){

  $('#ct2').html('');
  $('#data-table-1').html('');

  var dataString = {}

  const params = document.querySelectorAll('.params-control');
  Array.from(params).forEach((element, index) => {
    // _onsole.log(element.getAttribute('slug'));
    // _onsole.log(element.value);
    if(element.hasAttribute('callback')){
      let df_name='callback_paramsControl_'+element.getAttribute('callback');
      //_onsole.log(df_name);
      dataString[element.getAttribute('field_slug')]=dyn_functions[df_name]();
    }
    else{
      dataString[element.getAttribute('field_slug')]=element.value;
    }
    //_onsole.log('field_slug',element.getAttribute('field_slug'));
    //_onsole.log('value',dataString[element.getAttribute('field_slug')]);
    
    if(element.getAttribute('field_slug')=='process_name'){
      sessionStorage.process_name=element.value;
    }
  });
  dataString['collection_sub']=sessionStorage.collection_sub;

  generic_api(dataString,'show_response');

}

dyn_functions['succ_show_response'] = function(r){

  $('#row-data-table-1').remove();
  $('.boxExp-2-list-btn').remove();

  if(r.response!='200'){
    $('.ct-results').html(''
      +'<div class="ct-msg1">'
        +'response: '+r.response
        +'<br>error_message: '+r.error_message
        +'<br>status: '+r.status
      +'</div>'
    +'');
  }
  else{
    $('.ct-results').html(''
      +'<div class="ct-msg1">'
        +'STATUS: '+r.status
      +'</div>'
    +'');
  }

  let o = g_meta.geovar_collection.features;
  let this_obj=o.filter(({properties}) => properties.g_slug === sessionStorage.collection);
  let obj_collection=this_obj[0].properties;

  if(obj_collection.g_response_table==1){

    if(r.response=='200'){

      if( r.features ) {

        //collapse_ct('ct-params');
        create_box_result(r);

      }
      else{
        $('#boxExp-2-list-body').append(''
          +'<div id="row-data-table-1" class="row">'
            +'<div class="col">'
              +'<div id="data-table-1">'
                +'<button class="btn btn-dark btn-sm btn-view-result">'
                  +'VIEW RESULT DATA</button>'
              +'</div>'
            +'</div>'
          +'</div>'
        +'');
        $('.btn-view-result').on('click',function(){

          var table='';
          if(r.ds.collection=='googleapis_places'){
            table='TB_PLACES';
          }
          else if(r.ds.collection=='googleapis_directions'){
            table='TB_OD_DIRECTIONS';
          }
          else{
            console.log('no API defined for TABLE');
            return;
          }

          var dataString={
            table: table,
            collection: 'show_table_data',
            action: 'view_data',
            fn_group: 'geodata',
            filter_field: 'process_name',
            filter_value: sessionStorage.process_name
          }
          generic_api(dataString,'show_response_features');
        });
      }

    }

  }

  if(obj_collection.g_response_map==true){
    //...
  }


}

function show_features(r){

  collapse_ct('ct-params');
  var f = r.features;
  //var p = f.properties;
  var f0 = r.features[0];
  var foo = Object.keys(f0.properties);

  $('#data-table-1').html('<thead><tr></tr></thead>');
  $('#data-table-1').append('<tbody></tbody>');

  foo.forEach((foo_el) => {
    $('#data-table-1 > thead > tr').append('<th scope="col">'+foo_el+'</th>');
  });

  var c=0;
  f.forEach(element => {
    ++c;
    var p = element.properties;
    var foo = Object.keys(p);
    $('#data-table-1 > tbody').append('<tr id="tr-'+c+'"></tr>');
    foo.forEach((foo_el) => {
      $('#tr-'+c).append('<td>'+p[foo_el]+'</td>');
    });
  });
}

dyn_functions['succ_show_response_features'] = function(r){

  $('#row-data-table-1').remove();
  $('.boxExp-2-list-btn').remove();

  if(r.response=='200'){

    let o = g_meta.geovar_collection.features;
    let this_obj=o.filter(({properties}) => properties.g_slug === sessionStorage.collection);
    let obj_collection=this_obj[0].properties;

    if(obj_collection.g_response_table==1){
      if( r.features ) {
        //collapse_ct('ct-params');

        create_box_result(r);
      }
    }

  }

}

function create_box_result(r){

  $('#boxExp-2-list-body').append(''
    +'<div class="boxExp-2-list-btn box-btn-inline">'
      +'<!--btn-action-->'
      +'<button type="button" class="btn btn-dark btn-sm btn-xs btn-view-data-map active" '
        +'slug="f_data" '
        +'>DATA</button>'
      //+'<button type="button" class="btn btn-dark btn-sm btn-xs btn-view-data-map btn-map " '
      //  +'slug="f_map" disabled'
      //  +'>MAP</button>'
      +'<span class="view-data-map" style="display:none;">View this data on MAP</span>'
    +' </div>'
    +'<div id="row-data-table-1" class="row">'
      +'<div class="col">'
        +'<table id="data-table-1" class="table">'
        +'</table>'
        +'<div id="ct-mapid2" style="display:none;">'
        +'</div>'
      +'</div>'
    +'</div>'
  +'');

  let o = g_meta.geovar_collection.features;
  let this_obj=o.filter(({properties}) => properties.g_slug === sessionStorage.collection);
  let obj_collection=this_obj[0].properties;

  if(obj_collection.g_response_map==true){
    //$('.btn-map').attr('disabled',false);
    $('.view-data-map').css('display','');
    show_map(r);
  }

  $('.btn-view-data-map').on('click',function(){

    $('.btn-view-data-map').removeClass('active');
    $(this).addClass('active');

    if($(this).attr('slug')=='f_data'){

      $('#data-table-1').css('display','');
      $('#ct-mapid2').css('display','none');
      $('#mapid2').remove();

    }
    /*else if($(this).attr('slug')=='f_map'){

      $('#data-table-1').css('display','none');
      $('#ct-mapid2').css('display','');
      btn_main_sidebar_change('mapid');

      //$('#ct-mapid2').html(''
      //  +'<div id="mapid2">'
      //  +'</div>'
      //+'');

      //show_map(r);

    }*/

  });

  show_features(r);
}

function show_map(r){

  remove_lyr('vlyr008');

  var geojson = L.geoJson(r);

  geo_vlyr008.addLayer(geojson);

  // FINAL ADD!
  geo_vlyr008.addTo(mymap);

  mymap.fitBounds(geo_vlyr008.getBounds());

}

dyn_functions['pick_latlng'] = function(){

  const info_title = 'Map click';

  let c = '<div class="mainboxItem" '
    +'style="margin-top:5px;"></div>';

  //box button tab
  c += ''
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  //box button tab -end

  //box tab1
  c +='<div class="ct-google"></div>'
  c +='<div id="ct-mapid3">'
      +'<div id="mapid3">'
      +'</div>'
    +'</div>'
  c += '</div><!--tab1-->';

  create_dialog(c,info_title,'dlg_pick_latlng');

}


var dlg_onfocus_functions = [];

dyn_functions['dlg_pick_latlng'] = function(){

  $('.explorer-footer-btn2').append(''
    +'<button '
      +'id="submit_save" type="button" '
      +'class="btn btn-sm btn-dark only-tab1">APPLY</button>'
    +''
  +'');

  $('#submit_save').on('click',function(){
    $('.pac-container').css('display','none');
    alertify.infoDialog().close();
  });

}

dlg_close_functions['dlg_pick_latlng'] = function(){

  // _onsole.log(sessionStorage.lat);

  const params = document.querySelectorAll('.params-control');

  Array.from(params).forEach((element, index) => {

    if(element.getAttribute('slug')=='source_lat'){
      element.value=sessionStorage.lat;
    }
    else if(element.getAttribute('slug')=='source_lng'){
      element.value=sessionStorage.lng;
    }
  });

}

dlg_onfocus_functions['dlg_pick_latlng'] = function(){

  var mymap = L.map('mapid3',{
    minZoom: 6,
    maxZoom: 22,
    zoomControl: false,
    //zoomSnap: 0.25,
    //zoomDelta: 0.25,
    //wheelPxPerZoomLevel: 50
  }).setView([
    45,
    12
  ],
    7
  );

  // var list_basemap=[
  //   'lyr1',
  //   'lyr15',
  // ];

  list_basemap.forEach(lyr => {

    let obj_lyr=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === lyr)[0].properties;

    mymap.createPane(element+'_pane');
    mymap.getPane(element+'_pane').style.zIndex = lyr.zIndex;
    // _onsole.log(obj_lyr)
    // _onsole.log(obj_lyr.indexOf("pointerEvents"))

    if(obj_lyr.pointerEvents!=undefined 
      && obj_lyr.pointerEvents===false){
      // Layers in this pane are non-interactive and 
      //do not obscure mouse/touch events
      mymap.getPane(element+'_pane').style.pointerEvents = 'none';
    }

    geo_lyr[element] = L.tileLayer(
      obj_lyr.tile_url,
      {
        attribution: obj_lyr.attribution,
        pane: element+'_pane',
        maxZoom: obj_lyr.maxZoom
      }
    ).addTo(mymap);

  });
  
  /*setInterval(
    function() {
      console.log('inteval')
      mymap.invalidateSize();
    },
    // intervallo di refresh in millisecondi
    1000
  );*/

  mymap.invalidateSize();

  $('.ct-google').html(''
    +'<div id="locationField" style="margin-bottom:15px;">'
      +'<input '
      +' type="text" '
      +' class="form-control" '
      +' id="id_google" '
      +' placeholder="Via, piazza ..." '//label_search_cointainer2
      +' style="width:100%;" '
      +'>'
    +'</div>'
  +'');

  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */(document.getElementById('id_google')),
    {
      types: ['geocode'],
      componentRestrictions: {country: "it"}
    }
  );
  var geo_lyr2 = new L.featureGroup();
  // When the user selects an address from the dropdown, 
  //populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', function(){
    var place = autocomplete.getPlace();
    console.log('get place...')
    mymap.removeLayer(geo_lyr2);
    geo_lyr2.clearLayers();

    sessionStorage.lat = place.geometry.location.lat();
    sessionStorage.lng = place.geometry.location.lng();

    dMap.place.zoom=gLang.zoom_result;
    mymap.setView(
      [
        sessionStorage.lat,
        sessionStorage.lng
      ], 
      16
    );

    var geojson = L.marker([sessionStorage.lat, sessionStorage.lng]);
    geo_lyr2.addLayer(geojson);
    geo_lyr2.addTo(mymap);

    //mymap.fitBounds(geo_lyr2.getBounds());

  });

  $('#id_google').keyup(function(e) {

    //log('keyup');
    $('.pac-container').css('z-index','5000');
    $('.pac-container').css('display','block');
    
  });


}