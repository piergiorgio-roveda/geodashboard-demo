function generic_lyr(lyr){
  // _onsole.log('generic_lyr',lyr);
  // _onsole.log(g_meta.geovar_lyr.features);
  // let o = g_meta.geovar_lyr.features//TB!
  // let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  // //_onsole.log('this_obj',lyr);
  // // _onsole.log(this_obj);

  // let obj_lyr=this_obj[0].properties;

  g_ds = {
    geovar:"geovar_lyr",//obj_maps
    slug:lyr,//filter
    type:'single_object'//,//'item' or 'single_object' or 'full_object'
  }
  let obj_lyr = get_geovar_obj(g_ds);

  sessionStorage.outer_data_e=0;
  sessionStorage.outer_data_w=0;
  sessionStorage.outer_data_n=0;
  sessionStorage.outer_data_s=0;

  dMap.analisi01.grLyr.push(lyr);

  //--
  if(obj_lyr.feat_type=='point'){
    if(obj_lyr.cluster_type!=undefined && obj_lyr.cluster_type!='none'){
      let cluster_options = marker_cluster_custom(lyr);
      geo_lyr[lyr] = new L.MarkerClusterGroup(cluster_options);
    }
    else{
      geo_lyr[lyr] = new L.featureGroup();
    }
  }
  else{
    geo_lyr[lyr] = new L.featureGroup();
  }

  if(obj_lyr.intoc!=undefined 
    && obj_lyr.intoc===1){
    dMap.analisi01.grLyrToc.push(lyr);
  }

  sessionStorage['start_lyr_visible_'+lyr]='0';

  //search layer onStart
  g_ds = {
    geovar:"obj_maps",//obj_maps
    slug:MAPSLUG,//filter
    type:'single_object'//,//'item' or 'single_object' or 'full_object'
  }
  let objItem = get_geovar_obj(g_ds);

  //test = objItem.g_addon

  g_ds = {
    geovar:objItem.g_addon,//obj_maps
    filter_field:'addon',
    slug:'m242',//filter
    type:'single_object',//'item' or 'single_object' or 'full_object'
    noproperties:true
  }
  let objAddon = get_geovar_obj(g_ds);

  //_onsole.log(lyr,objAddon.onstart_lyr.includes(lyr)); //true

  if(objAddon.onstart_lyr!=undefined && objAddon.onstart_lyr.includes(lyr)){
    let tmp = obj_lyr;

    sessionStorage['start_lyr_visible_'+lyr]='1';
    //obj_lyr['visible']=true;
    tmp['visible']=true;
    // _onsole.log('onstart_lyr',obj_lyr);

    // _onsole.log('tmp',tmp);
    // _onsole.log('obj_lyr',obj_lyr);

  }

  prepare_map220_lyr(lyr);

  //t@his_lyr[lyr].enable=true;
  //t@his_lyr[lyr].status='on'
  //t@his_lyr[lyr].visible=true;
  add_btn_lyr();

  //--

  if(dyn_functions[lyr+'_lyr_extend']!=undefined){
    dyn_functions[lyr+'_lyr_extend']();
  } //if  dyn_functions extend
  else{

    if(obj_lyr.feat_type=='point'){
      geo_lyr_style[lyr] = function(feature,latlng) {
        //var lyr='lyr045';
        //_onsole.log(feature);
        return L.marker(
          latlng,
          {
            pane: lyr+'_pane'
          }
        ).on('click', geo_lyr_onClick[lyr]); // funzione 3 onClick sul punto
      }
      geo_lyr_onClick[lyr] = function(e) {
        console.log('geo_lyr_onClick new');
        //_onsole.log(e);
      }
    } //point
    else{

      geo_lyr_style[lyr] = function(feature, layer){
        layer.setStyle({
          fillColor:'#000',
          color:'#000',
          weight:2,
          opacity:1,
          fillOpacity:0.5,
          //clickable:false
        });//.on('click', geo_glyrsit001_onClick);
      }
    } //else  point

  } //else  dyn_functions[lyr+'_lyr_extend']!=undefined

  //legend
  if(obj_lyr.lyr_legend!=undefined){

    if(obj_lyr.lyr_legend=='sld'){

      list_legends.push(lyr);

      dyn_legends[lyr+'_legends']=function(){

        //_onsole.log(lyr+'_legends fill');

        a216_legends_load.push(lyr);

        let tab1_parts = [
          { 
            'g_slug': 'part_1',
            'g_type': 'title',
            'title': ''+obj_lyr.g_label,
            'item_lyr':lyr
          },
          { 
            'g_slug': 'part_2',
            'g_type': 'graphic',
            'item_lyr':lyr,
            'geoserver_name':obj_lyr.geoserver_name,
            'geoserver_style_name':obj_lyr.geoserver_style_name
          }
        ];

        tab1_parts.forEach(tab1_part_element => {
          box_addon216_add_part(tab1_part_element);
        });

      } //dyn_legends[lyr+'_legends']=function(){

    }
  }

  //if(typeof obj_lyr.sld_url !== "undefined"){
    if(obj_lyr.geoserver_style=='tmp_sld'){

      //_onsole.log(obj_lyr.geoserver_style_name);

      dataString={
       /*  DATA_CERT:'geodata1',
        PROTOCOLLO_CERT:'geodata2',
        TITOLO:'geodata3',
        RICHIEDENTE:'geodata4',
        LUOGO_NASCITA:'geodata5',
        DATA_NASCITA:'geodata6',
        CODICE_FISCALE:'geodata7',
        ANNOTAZIONI:'geodata8',
        PROTOCOLLO_RICH:'geodata9',
        CARTA_CERT:'geodata10',
        RISULTATI_ANALISI:'geodata11',
        RISULTATI_NORMATIVA:'geodata12', */
        // g_master:G_MASTER,
        // sld_body: true
      }

      let baseUrl = HOME_PROJECT+'/script/sld/?g_map_slug='+MAPSLUG+'&lyr='+obj_lyr.g_slug;

      var toAjax={
        type: "POST",
        url: baseUrl,  
        data:dataString,
        dataType: 'json',
        async:    true,
        cache:    false
      }

      toAjax['error']=function(xhr, textStatus, errorThrown ) {
        if(this.call_silent===false){
          on_ajax_error(this);
          log_tag_manager('ajax error','');
          //reload window?
          hide_loading();
        }
        console.log('Error ');
      }

      toAjax['success']=function(r){
        //_onsole.log(r);
        sld_body[lyr] = r;
        //$(box).attr('src', 'data:text/html;charset=utf-8,' + encodeURI(r));
      }//success

      $.ajax(toAjax); //ajax

    } //if(obj_lyr.geoserver_style=='tmp_sld'){

    //opt['sld'] = 'https:'+DOMAIN_PROJECT+'/style/'+obj_lyr.sld_url+'.sld';
    //opt['sld'] = HOME_PROJECT+'/script/sld/?g_master='+obj_lyr.geoserver_name+'';
  // }

}