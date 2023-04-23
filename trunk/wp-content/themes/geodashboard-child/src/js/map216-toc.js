// Document ready
$(document).ready(function() {
  
  //call start functions
  if (typeof mymap !== 'undefined') {
    map216_ready();
  }

}); //$(document).ready

function map216_ready(){
  if (f_wait.geovar_label==0
    ||f_wait.mymap==0) {
    // _onsole.log('wait')
    setTimeout(function(){map216_ready()},100);
    return;
  } else {
    sessionStorage.prepare_discover_status = 'true';
    add_btn_lyr();
  };
}

//--
list_zoomstart.push('toc_zoomstart');
dyn_zoomstart['toc_zoomstart'] = function(){

  //_onsole.log('toc_zoomstart')
  sessionStorage.prepare_discover_status = 'false';
  //sessionStorage.zoomstart = mymap.getZoom();
  return;

}
//--
list_zoomend.push('toc_zoomend');
dyn_zoomend['toc_zoomend'] = function(){
  //_onsole.log('toc_zoomend')
  sessionStorage.zoomend = mymap.getZoom();

  //-
  var g = dMap.analisi01.grLyrToc;
  $.each(g,function(i, lyr){
    let o = g_meta.geovar_lyr.features
    let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
    let obj_lyr=this_obj[0].properties;

    if(obj_lyr.lyr_type=='group'){
      obj_lyr.g_options.forEach(child_lyr => {
        let child_this_obj=o.filter(({properties}) => properties.g_slug === child_lyr);
        let child_obj_lyr=child_this_obj[0].properties;
        manage_zoom_lyr(child_obj_lyr);
      });
    }
    else{
      manage_zoom_lyr(obj_lyr);
    }

  });
  //-

  sessionStorage.prepare_discover_status = 'true';
  return;
  
}
//--

setInterval(
  function() {  
    if (typeof mymap !== 'undefined') {
      if(dMap.logout==1){
      }
      else if(f_wait.geovar_label==0
        ||f_wait.mymap==0){
      }
      else{
        localStorage.map_lat=mymap.getCenter().lat.toFixed(3);
        localStorage.map_lng=mymap.getCenter().lng.toFixed(3);
        localStorage.map_zoom=mymap.getZoom();
        prepare_discover();
      }
    }
    // _onsole.log('------------------------------------');
  },
  500
);

setInterval(
  function() {
    if(localStorage.geo_activate==1){
      // _onsole.log('interval getLocation')
      getLocation();
    }
  },
  // intervallo di refresh in millisecondi
  3000
);

function add_btn_lyr(){
  
  // _onsole.log('add_btn_lyr ...');
  // ADD BUTTON
  let g=dMap.analisi01.grLyrToc;
  $('.box-sidebar-extra').html(''
    +'<div id="toc-list-0"></div>'
  );

  $.each(g,function(i, lyr){
    // _onsole.log('add_btn_lyr',lyr);
    let o = g_meta.geovar_lyr.features
    let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
    let obj_lyr=this_obj[0].properties;
    var content = ''
      +'<div '
        +'name="'+lyr+'-toc" '
        +'lyr="'+lyr+'" '
        +'class="form-check toc-lyr '+lyr+'-toc" '
        +'>'
        +'<div class="box-toc box-toc_checkbox"></div>'
        +'<div class="box-toc box-toc_icon">'
          +'<div '
            +'style="float: left;margin-right: 5px;">'
            +'<img src="'+SOURCE_PATH+'icon/'+obj_lyr.icon+'" '
              +'style="width:20px;" />'
          +'</div>'
        +'</div>'
        +'<div class="box-toc box-toc_label">'
          +'<div>'+obj_lyr.g_label+'</div>'
        +'</div>'
      +'</div>'//form-check
      +'<div class="clearfix"></div>'
      +'<div '
        +'lyr="'+lyr+'" '
        +'class="'+lyr+'-toc-extend" style="display:none;padding-left: 25px;margin-top:5px;">'
      +'</div>'
      +'<div class="clearfix"></div>'
    +'';
    $('#toc-list-0').append(content);

    $('.'+lyr+'-toc > .box-toc_checkbox').html(''
        +'<input class="form-check-input check_'+lyr+'" type="checkbox" '
          +'value="" id="flexCheckChecked">'
    +'');

    // _onsole.log('start_lyr_visible');
    // _onsole.log(lyr);
    // _onsole.log(sessionStorage.getItem('start_lyr_visible_'+lyr));

    if(sessionStorage.getItem('start_lyr_visible_'+lyr) === null){
      sessionStorage['start_lyr_visible_'+lyr]='1';
      $('.check_'+lyr).prop('checked',true);
    }
    else if(sessionStorage.getItem('start_lyr_visible_'+lyr)== '1'){
      $('.check_'+lyr).prop('checked',true);
      obj_lyr.visible = true;
    }
    else{
      $('.check_'+lyr).prop('checked',false);
      obj_lyr.visible = false;
    }

    //obj_lyr.visible = $('.check_'+lyr).is( ":checked" );

    //dyn_zoomstart['toc_zoomstart']();

    $('.'+lyr+'-toc').on('click',function(){
      exe_lyr_toc($(this).attr('lyr'));
    }); 

    if(dyn_functions[lyr+'_toc_extend']!=undefined){
      dyn_functions[lyr+'_toc_extend']();
    }

  });//each lyr

}//add_btn_lyr

function exe_lyr_toc(lyr){

  log_tag_manager('click ' + lyr,'','');
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;
  //--
  obj_lyr.visible = $('.check_' + lyr).is( ":checked" );

  if(obj_lyr.visible===true){
    //switch automatico lyr conflict
    var t = dMap.analisi01.grTheme;
    if(t.indexOf(lyr)>=0){
      $.each(t,function(i, eLyr){
        let o = g_meta.geovar_lyr.features
        let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
        let obj_lyr=this_obj[0].properties;
        obj_lyr.visible=false;
        $('.check_'+eLyr).prop('checked',false);
        obj_lyr.visible = $('.check_' + eLyr).is( ":checked" );
      });
    }
    sessionStorage['start_lyr_visible_'+lyr]='1';
    //--
    $('.'+lyr+'-toc-extend').css('display','');
  }
  else{

    sessionStorage['start_lyr_visible_'+lyr]='0';
    //--
    $('.'+lyr+'-toc-extend').css('display','none');
    
  }

}//exe_lyr_toc

//--

function update_all_lyr(){

  dMap.analisi01.grLyr.forEach(lyr => {
    let o = g_meta.geovar_lyr.features
    let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
    let obj_lyr=this_obj[0].properties;
    if(obj_lyr.status=='on'){
      if(dMap.analisi01.grWms.indexOf(lyr)>-1){
        remove_lyr(lyr);
        switch_on_wms_b(lyr);
      }
      else{
        switch_on_lyr_b(lyr);
      }
    }
  });
}

function remove_lyr(lyr){

  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;
  obj_lyr.status='off';

  mymap.removeLayer(geo_lyr[lyr]);

  if(obj_lyr.lyr_type=='static'
    || obj_lyr.lyr_type=='db_onetime'){
    
  }
  else{
    geo_lyr[lyr].clearLayers(); 
  }


}

function hide_all_lyr(lyr){
  var g = dMap.analisi01.grLyrToc;
  $.each(g,function(i, lyr){
    obj_lyr.visible=false;
  });
}

function discover_load_lyr(obj_lyr){

  let lyr = obj_lyr.g_slug;

  if(obj_lyr.lyr_type=='static'){
    switch_on_lyr_static(lyr);//load
  }
  else if(obj_lyr.lyr_type=='db_onetime'){
    switch_on_lyr_db_onetime(lyr);//load
  }
  else if(obj_lyr.lyr_type=='wms'){
    switch_on_wms_b(lyr);
  }
  else if(obj_lyr.lyr_type=='db'){
    switch_on_lyr_b(lyr);
  }
  else if(obj_lyr.lyr_type=='db_outer'){;
    switch_on_lyr_c(lyr);
  }
  else{
    console.log('discover_load_lyr: '+lyr+' no managed');
  }

}

function discover_reload_lyr(obj_lyr){

  let lyr = obj_lyr.g_slug;

  if(obj_lyr.lyr_type=='wms'
    || obj_lyr.lyr_type=='static'
    || obj_lyr.lyr_type=='db_onetime'){

    //do nothing

  }
  else{

    if(verify_lyr_map_zoom_and_coords(lyr)=='different'){
      //_onsole.log('change something on zoom or coordinate:'+lyr);
      
      if(obj_lyr.lyr_update=='on_move'){
        //--
        if(obj_lyr.lyr_type=='db_outer'){
          switch_on_lyr_c(lyr);
        } else{
          switch_on_lyr_b(lyr);
        }
        //--
      }

    }//different
    else if(verify_lyr_map_zoom_and_coords(lyr)=='same'){
      //_onsole.log('same zoom or coordinate:'+lyr);
      if(obj_lyr.lyr_type=='db_outer'){
        mymap.addLayer(geo_lyr[lyr]);
      }
      return;
    }//same
    else{
      return;
    }//else same/different

  }//else wms/static/db_onetime

}

function discover_switch_on_lyr_exist(obj_lyr){

  let lyr = obj_lyr.g_slug;

  obj_lyr.status='on';
  mymap.addLayer(geo_lyr[lyr]);

}

function discover_switch_off_lyr(obj_lyr){

  let lyr = obj_lyr.g_slug;

  if(obj_lyr.lyr_type=='db_outer'){
    mymap.removeLayer(geo_lyr[lyr]);
  } else{
    remove_lyr(lyr);
  }
}

function manage_zoom_lyr(obj_lyr){

  let lyr = obj_lyr.g_slug;
  // _onsole.log(lyr,obj_lyr.feature_zoom_max);
  // _onsole.log(sessionStorage.zoomend);
  if(obj_lyr.feature_zoom_max >= sessionStorage.zoomend ){
    $('.check_'+lyr).prop('disabled',true);
    obj_lyr.enable=false;
  }
  else{
    $('.check_'+lyr).prop('disabled',false);
    obj_lyr.enable=true;
  }
  // _onsole.log(obj_lyr.enable);
}

//--

function prepare_discover(){

  if(sessionStorage.prepare_discover_status == 'false'){
    return;
  }

  var g = dMap.analisi01.grLyr;
  $.each(g,function(i, lyr){

    let o = g_meta.geovar_lyr.features
    let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
    let obj_lyr=this_obj[0].properties;

    //var geo_lyr=eval('geo_'+lyr);

    //if(obj_lyr.autoupdate 
    //  && obj_lyr.autoupdate===false){
    //  return;
    //}
    // _onsole.log('prepare_discover',obj_lyr);
    //--
    if(obj_lyr.lyr_type===undefined){
      console.log(lyr+'doesn\'t "lyr_type" defined.');
      return;
    }
    //--
    if(obj_lyr.lyr_update=='manual'){
      if(dyn_lyr_discover[lyr]===undefined){
        //_onsole.log('No discover action for  ' + lyr);
        return;
      }
      else{
        dyn_lyr_discover[lyr]();
      }
      return;
    }
    //--

    if(obj_lyr.lyr_type=='group'){
      /* if(obj_lyr.g_slug=='glyrsit002'){
        //_onsole.log('=== === === ===',);
      } */
      obj_lyr.g_options.forEach(child_lyr => {
        //_onsole.log('child_lyr',child_lyr);
        //let o = g_meta.geovar_lyr.features
        let child_this_obj=o.filter(({properties}) => properties.g_slug === child_lyr);
        let child_obj_lyr=child_this_obj[0].properties;
        let visible = obj_lyr.visible;
        child_obj_lyr.visible=visible;
        /* if(obj_lyr.g_slug=='glyrsit002'){
          // _onsole.log('exe_prepare_discover',child_obj_lyr.g_slug);
          // _onsole.log(' >> lyr_type',child_obj_lyr.lyr_type);
          // _onsole.log(' >> status',child_obj_lyr.status);
          // _onsole.log(' >> enable',child_obj_lyr.enable);
          // _onsole.log(' >> visible',child_obj_lyr.visible);
          // _onsole.log(' >> load',child_obj_lyr.load);
        } */
        exe_prepare_discover(child_obj_lyr);
      });
    }
    else{
      exe_prepare_discover(obj_lyr);
    }

  });
  
}//prepare_discover

function exe_prepare_discover(obj_lyr){

  let lyr = obj_lyr.g_slug;

  if(obj_lyr.status=='pending'){
    //--
    return;

  }

  if(obj_lyr.enable===true
    && obj_lyr.visible===true){

    if(obj_lyr.status=='off'){

      if(obj_lyr.lyr_type=='static' //geojson as file
        || obj_lyr.lyr_type=='db_onetime'){ //data in db full load
        if(obj_lyr.load==false){
          discover_load_lyr(obj_lyr);
        }
        else{
          discover_switch_on_lyr_exist(obj_lyr)
        }
      }
      else{
        discover_load_lyr(obj_lyr)
      }

    }
    else if(obj_lyr.status=='on'){
      discover_reload_lyr(obj_lyr);
    }
    else{
      console.log('exe_prepare_discover: '+lyr+' no managed (1)');
    }

  }
  else if(obj_lyr.enable===false
    || obj_lyr.visible===false){
    /* if(lyr=='lyrsit006'){
      // _onsole.log('switch_off_lyr',lyr);
    } */
    discover_switch_off_lyr(obj_lyr);

  }
  else{
    //--
    console.log('exe_prepare_discover: '+lyr+' no managed (2)');
    return;
    //--
  }

  if (obj_lyr.label_zoom) {
    if(mymap.getZoom() >= obj_lyr.label_zoom){
      $('.'+lyr+'-marker-label').css('display','block');
    }
    else{
      $('.'+lyr+'-marker-label').css('display','none');
    }
  }

}

function switch_on_wms_b(lyr,withRandint='no'){

  //var geo_lyr=eval('geo_'+lyr);
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  var opt_pane=lyr+'_pane';

  //_onsole.log('switch_on_wms_b',lyr);
  if(lyr=='lyrsit117'){
    // var opt={
    //   pane:opt_pane
    // };
    // geo_lyr[lyr].addLayer(L.tileLayer.wms(
    //   'https://api.mapbox.com/styles/v1/adminstudiosit/clboya8pl000d14lobr1lhbyv/wmts?access_token=pk.eyJ1IjoiYWRtaW5zdHVkaW9zaXQiLCJhIjoiY2xieXRxdHZvMDh6cDNvbXptMWY0ZHF2ZCJ9.tfhfTuRe-3-STkYzpuhxJg',
    //   opt
    // ));

    geo_lyr[lyr].addLayer(L.tileLayer(
      'https://api.mapbox.com/styles/v1/adminstudiosit/clboya8pl000d14lobr1lhbyv/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWRtaW5zdHVkaW9zaXQiLCJhIjoiY2xieXRxdHZvMDh6cDNvbXptMWY0ZHF2ZCJ9.tfhfTuRe-3-STkYzpuhxJg', {
      tileSize: 512,
      zoomOffset: -1,
      pane: opt_pane,//'edifici3d',
      attribution: '© <a href="https://www.mapbox.com/contribute/">Mapbox</a>'
    }));

  }
  else{

    var opt_layer=WORKSPACE+':'+obj_lyr.geoserver_name+GEOSERVER_SUFFIX;

    let optWms={
      //layers:opt_layer,
      transparent:'true',
      format:'image/png',//PNG 24bit
      //format_options:'dpi:300',
      opacity:1,
      tiled: false,
      //info_format: 'text/html',
      pane:opt_pane,
      antialiasing:'on',
      maxZoom: 20,
      version: '1.3.0'
    };

    if(obj_lyr.geoserver_style=='tmp_sld'){
        //opt['sld'] = 'https:'+DOMAIN_PROJECT+'/style/'+obj_lyr.sld_url+'.sld';
        optWms['sld'] = 'https:'+DOMAIN_PROJECT+'/tmp/'+obj_lyr.geoserver_style_name+'_'+lyr+'.sld';
        //opt['sld'] = HOME_PROJECT+'/script/sld/?g_master='+obj_lyr.geoserver_name+'';
        //opt['sld_body'] = encodeURIComponent(sld_body[lyr]);
    }
    else if(obj_lyr.geoserver_style=='default'){
      optWms['layers'] = opt_layer;

    }
    else{
      optWms['styles'] = obj_lyr.geoserver_style;
      optWms['layers'] = opt_layer;
    }

    //_onsole.log(obj_lyr);
    if(typeof obj_lyr.g_options[0] !== "undefined"){

      //_onsole.log(obj_lyr.g_options[0].geoserver_filter);

      if(typeof obj_lyr.g_options[0].geoserver_filter !== "undefined"){
        let geoserver_filter = obj_lyr.g_options[0].geoserver_filter;

        let i = 0;
        let cql_string = '';
        geoserver_filter.forEach(filter => {
          //_onsole.log(filter.val);
          if(i==0){
            cql_string += filter.col+' IN (\''+filter.val[0]+'\')';
          }
          else{
            cql_string += ' AND ' + filter.col+' IN (\''+filter.val.join('\',\'')+'\')';
          }
          i++;
        });
        optWms['CQL_FILTER'] = cql_string;
      }

    }

    //CQL_FILTER: g_master=G_MASTER

    //_onsole.log('load wms',opt);

    //_onsole.log('no wms services');

    let opt={
      mymap:mymap,
      lyr:lyr,
      optWms:optWms,
      tileType:'Tiled'
    }

    if(
      lyr=='lyrsit115'||lyr=='lyrsit114'
      || lyr=='lyr707e06be'||lyr=='lyr70a206c3'
      || lyr=='lyr713106d0'||lyr=='lyr70fd06ca'
      ){

      opt['tileType']='nonTiled';
    
    }

    if(withRandint=='yes'){
      opt['withRandint']='yes';
    }

    wmsAddLyrToMap(opt);

  }


  
}//switch_on_wms_b

function switch_on_lyr_b(lyr){

  // _onsole.log('switch_on_lyr_b('+lyr+')');
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  //var geo_lyr=eval('geo_'+lyr);
  const b = mymap.getBounds();
  var E = b.getEast();//-0.05;
  var W = b.getWest();//+0.05;
  var N = b.getNorth();//-0.03;
  var S = b.getSouth();//+0.03;
  var current_zoom = mymap.getZoom();
  var ext_lat = Math.abs(S-N)/2;
  var ext_lng = Math.abs(E-W)/2;
  var from_load_lat=Math.abs(obj_lyr.load_lat-dMap.map.stop_lat);
  var from_load_lng=Math.abs(obj_lyr.load_lng-dMap.map.stop_lng);
  
  mymap.removeLayer(geo_lyr[lyr]);
  geo_lyr[lyr].clearLayers();

  obj_lyr.status='pending';
  const c = mymap.getCenter();
  obj_lyr.load_lat=c.lat.toFixed(3);
  obj_lyr.load_lng=c.lng.toFixed(3);
  obj_lyr.load_zoom=mymap.getZoom(); 

  if (typeof obj_lyr.toc_extend !== 'undefined') {
    // the variable is defined
    
    if(obj_lyr.toc_extend.length==obj_lyr.toc_extend_checked.length){
      // _onsole.log('all checked');
      var query_toc_checked = 'false';
    }
    else{
      // _onsole.log('some checked');
      var query_toc_checked = 'true';
    }

  }
  else{
    var query_toc_checked = 'false';
  }

  var dataString = {
    fn_group:'geodata',
    action:'view_data',
    collection:'lyr_all',
    qy_name:'A',
    lyr:lyr,
    geom:1,
    //lat:0,
    //lng:0,
    current_zoom: current_zoom,
    mye:E+ext_lng,
    myw:W-ext_lng,
    myn:N+ext_lat,
    mys:S-ext_lat,
    min_e:E,
    min_w:W,
    min_n:N,
    min_s:S,
    query:obj_lyr.query,
    query_toc:query_toc_checked
  };

  if(obj_lyr.query==true){
    dataString.filter_field=obj_lyr.filter_field;
    dataString.filter_value=obj_lyrfilter_value;
  }

  if(query_toc_checked=='true'){
    dataString.toc_filter_field=obj_lyr.toc_filter_field;
    dataString.toc_filter_value=obj_lyr.toc_extend_checked;
  }

  generic_api(dataString,'switch_on_lyr_b');

}//switch_on_lyr_b

dyn_functions['succ_switch_on_lyr_b'] = function(r){
  // _onsole.log('succ_switch_on_lyr_b');
  let lyr=r.ds.lyr;
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  obj_lyr.last_r=r.features;
  //var geo_lyr=eval('geo_'+lyr);
  obj_lyr.status='on';
  
  if(obj_lyr.lyr_type=='polygon'
    ||obj_lyr.lyr_type=='polyline'){
    var geojson = L.geoJson(r,{
      onEachFeature:geo_lyr_style[lyr],
      pane:lyr+'_pane'
    });
  }
  else{

    var geojson = L.geoJson(r,{
      pointToLayer: geo_lyr_style[lyr]//, //function_iconLabel
      //pane:lyr+'_pane' defined in icon
    });

  }
  
  geo_lyr[lyr].addLayer(geojson);
  // FINAL ADD!
  geo_lyr[lyr].addTo(mymap);

  //format_autoNumeric();

  if(r.ds.query=='true'){
    obj_lyr.envelope=r.features_envelope;
  }

}//succ_switch_on_lyr_b

function switch_on_lyr_db_onetime(lyr){

  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  obj_lyr.status='pending';

  var dataString = {
    fn_group:'geodata',
    action:'view_data',
    collection:'lyr_all_fix',
    qy_name:'A',
    lyr:lyr,
    geom:1,
  };

  generic_api(dataString,'switch_on_lyr_generic');

}//switch_on_lyr_db_onetime

function switch_on_lyr_static(lyr){

  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  obj_lyr.status='pending';

  $.ajax({
    type:     "GET",
    url:      obj_lyr.geojson_url,
    //data:     dataString,
    dataType: 'json',
    async:    true,
    cache:    false,
    lyr:lyr,
    tryCount : 0,
    retryLimit : 3,
    //temp_name : pointname,
    error : function(xhr, textStatus, errorThrown ) {
        this.tryCount++;
        if (this.tryCount <= this.retryLimit) {
            //try again
            $.ajax(this);
            return;
        }
        return;
    },
    success:  function(response){
      //var geo_lyr=eval('geo_'+lyr);

      let lyr=this.lyr;
      let o = g_meta.geovar_lyr.features
      let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
      let obj_lyr=this_obj[0].properties;

      if(obj_lyr.feat_type=='point'){
        var options={
          pointToLayer: geo_lyr_style[lyr],
          pane:lyr+'_pane'
        }
      }
      else{
        var options={
          onEachFeature: geo_lyr_style[lyr],
          pane:lyr+'_pane'
        }
      }

      var geoJson = L.geoJson(response,options);
      // aggiunta dei punti al featuregroup
      // per gestirli più facilmente
      geo_lyr[lyr].addLayer(geoJson);

      // aggiunta del featuregroup alla mappa
      geo_lyr[lyr].addTo(mymap);

      obj_lyr.status='on';
      obj_lyr.load=true;
    }
  });

}//switch_on_lyr_static

function switch_on_lyr_c(lyr){

  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  obj_lyr.status='pending';

  //var geo_lyr=eval('geo_'+lyr);
  const b = mymap.getBounds();
  const c = mymap.getCenter();

  obj_lyr.load_lat=c.lat.toFixed(3);
  obj_lyr.load_lng=c.lng.toFixed(3);
  obj_lyr.load_zoom=mymap.getZoom();
  obj_lyr.load_zoom=mymap.getZoom();


  if(obj_lyr.load_E < sessionStorage.outer_data_e
    && obj_lyr.load_W > sessionStorage.outer_data_w
    && obj_lyr.load_N < sessionStorage.outer_data_n
    && obj_lyr.load_S > sessionStorage.outer_data_s){
    // _onsole.log('view inside');
    obj_lyr.status='on';
    return;
  }

  obj_lyr.load_E = b.getEast();
  obj_lyr.load_W = b.getWest();
  obj_lyr.load_N = b.getNorth();
  obj_lyr.load_S = b.getSouth();

  sessionStorage.outer_data_e = b.getEast() + ((b.getEast()-b.getWest())*0.25);
  sessionStorage.outer_data_w = b.getWest() - ((b.getEast()-b.getWest())*0.25);
  sessionStorage.outer_data_n = b.getNorth() + ((b.getNorth()-b.getSouth())*0.25);
  sessionStorage.outer_data_s = b.getSouth() - ((b.getNorth()-b.getSouth())*0.25);

  //_onsole.log(lyr)

  mymap.removeLayer(geo_lyr[lyr]);
  geo_lyr[lyr].clearLayers();

  var dataString = {
    fn_group:'geodata',
    action:'view_data',
    collection:'lyr_all_outer',
    qy_name:'A',
    lyr:lyr,
    geom:1,
    current_zoom:mymap.getZoom(),
    mye:b.getEast(),
    myw:b.getWest(),
    myn:b.getNorth(),
    mys:b.getSouth(),
    data_e:sessionStorage.outer_data_e,
    data_w:sessionStorage.outer_data_w,
    data_n:sessionStorage.outer_data_n,
    data_s:sessionStorage.outer_data_s
  };

  generic_api(dataString,'switch_on_lyr_generic');

}//switch_on_lyr_c

function switch_on_lyr_custom(dataString){

  let lyr=dataString.lyr;
  let obj_lyr={};

  if(lyr!='lyr999' && dataString.geom!=false){

    let o = g_meta.geovar_lyr.features
    let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
    obj_lyr=this_obj[0].properties;

    obj_lyr.status='pending';

    if(dataString.world!=undefined && dataString.world==true){
      //_onsole.log('world==true');
    }
    else{
      //_onsole.log('world==???');
      //var geo_lyr=eval('geo_'+lyr);

      if(obj_lyr.feat_type!='table'){
        const b = mymap.getBounds();

        const c = mymap.getCenter();
        obj_lyr['load_lat']=c.lat.toFixed(3);
        obj_lyr['load_lng']=c.lng.toFixed(3);
        obj_lyr['load_zoom']=mymap.getZoom();

        if(b.getEast() < sessionStorage.outer_data_e
          && b.getWest() > sessionStorage.outer_data_w
          && b.getNorth() < sessionStorage.outer_data_n
          && b.getSouth() > sessionStorage.outer_data_s){
          // _onsole.log('view inside');
          obj_lyr.status='on';
          return;
        }
        sessionStorage.outer_data_e = b.getEast() + ((b.getEast()-b.getWest())*0.25);
        sessionStorage.outer_data_w = b.getWest() - ((b.getEast()-b.getWest())*0.25);
        sessionStorage.outer_data_n = b.getNorth() + ((b.getNorth()-b.getSouth())*0.25);
        sessionStorage.outer_data_s = b.getSouth() - ((b.getNorth()-b.getSouth())*0.25);

        //--

        dataString.mye=b.getEast();
        dataString.myw=b.getWest();
        dataString.myn=b.getNorth();
        dataString.mys=b.getSouth();
        dataString.data_e=sessionStorage.outer_data_e;
        dataString.data_w=sessionStorage.outer_data_w;
        dataString.data_n=sessionStorage.outer_data_n;
        dataString.data_s=sessionStorage.outer_data_s;
      }

    }

    let map_lyr = lyr;
    if(dataString.output_lyr!=undefined){
      map_lyr = dataString.output_lyr;
    }

    if(obj_lyr.feat_type!='table'){
      mymap.removeLayer(geo_lyr[map_lyr]);
      geo_lyr[map_lyr].clearLayers();
    }

  }
  else{
    obj_lyr.g_slug=lyr;
  }

  generic_api(dataString,'switch_on_lyr_generic');

}//switch_on_lyr_c

dyn_functions['succ_switch_on_lyr_generic'] = function(r){

  //_onsole.log(r);
  let lyr=r.ds.lyr;
  let obj_lyr={};

  if(lyr!='lyr999'){
    let o = g_meta.geovar_lyr.features
    let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
    obj_lyr=this_obj[0].properties;
    obj_lyr.last_r=r.features;
    //var geo_lyr=eval('geo_'+lyr);
    
    if(obj_lyr.lyr_type=='db_onetime'){
      obj_lyr.load=true;
    }
  }
  else{
    obj_lyr.g_slug=lyr;
  }

  load_geo_lyr(r,obj_lyr);
  return;

}//succ_switch_on_lyr_c

function load_geo_lyr(r,obj_lyr){
  //_onsole.log('load_geo_lyr');
  let lyr=r.ds.lyr;
  //_onsole.log(obj_lyr);
  if(lyr!='lyr999'){
    if(obj_lyr.feat_type!='table'){
      if(obj_lyr.feat_type=='polygon'
        ||obj_lyr.feat_type=='polyline'){

        var geojson = L.geoJson(r,{
          onEachFeature: geo_lyr_style[lyr],
          pane:lyr+'_pane'
        });

      }
      else{

        var geojson = L.geoJson(r,{
          pointToLayer: geo_lyr_style[lyr]//, //function_iconLabel
          //pane:lyr+'_pane' defined in icon
        });

      }

      let map_lyr = lyr;
      if(r.ds.output_lyr!=undefined){
        map_lyr = r.ds.output_lyr;
      }
      //_onsole.log(map_lyr)
      geo_lyr[map_lyr].addLayer(geojson);

      // FINAL ADD!
      geo_lyr[map_lyr].addTo(mymap);
    }
    obj_lyr.status='on';
  }
  //_onsole.log(r.ds.fn_extend);
  if(r.ds.fn_extend!=undefined 
    && dyn_functions[r.ds.fn_extend]!=undefined){
    //_onsole.log(r.ds.fn_extend+' done');
    dyn_functions[r.ds.fn_extend](r);
  }

}

var lastWmsUrl = new Array();
var lastWmsOpt = new Array();

function wmsAddLyrToMap(optIn){

  let wmsUrl = GEOSERVER_URL+WORKSPACE+'/wms?';

  //_onsole.log('wmsAddLyrToMap',optIn);

  let thisLyr = optIn.lyr;
  if(optIn.myaddon!=null){
    thisLyr = optIn.myaddon+'_'+optIn.lyr;
  }

  if(optIn.withRandint!=null){

    let redrawint = Math.floor( Math.random() * 200000 ) + 1;
    optIn.optWms['randint'] = redrawint;
    wmsUrl += '{randint}';

  }

  lastWmsUrl[optIn.lyr] = wmsUrl;
  lastWmsOpt[optIn.lyr] = optIn.optWms;

  let tL = L.tileLayer.wms(
     wmsUrl,
     optIn.optWms
  )

  if(optIn.tileType=='nonTiled'){
    tL = L.nonTiledLayer.wms(
      wmsUrl,
      optIn.optWms
    );
  }

  geo_lyr[thisLyr].addLayer(tL);
  // FINAL ADD!
  geo_lyr[thisLyr].addTo(optIn.mymap); 

  //--

  if(optIn.g_callback!=null){
    dyn_functions[optIn.g_callback](optIn.g_callback_opt);
  }

  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === optIn.lyr);
  let obj_lyr=this_obj[0].properties;

  obj_lyr.status='on';

}
