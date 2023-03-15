toAjax['success']=function(r){

  let lyr = r.ds.lyr;
  let optInWms=r.ds.opt;
  //_onsole.log(opt);
  //sld_body[lyr] = r;
  //opt['sld'] = 'https:'+DOMAIN_PROJECT+'/style/'+obj_lyr.sld_url+'.sld';

  let baseSld = 'https:'+DOMAIN_PROJECT+'/tmp/';
  let geoserver_style_name = r.ds.geoserver_style_name;
  optInWms['sld'] = baseSld+geoserver_style_name+'_'+lyr+'.sld';

  //opt['sld'] = HOME_PROJECT+'/script/sld/?g_master='+obj_lyr.geoserver_name+'';
  //opt['sld_body'] = encodeURIComponent(sld_body[lyr]);          
  //$(box).attr('src', 'data:text/html;charset=utf-8,' + encodeURI(r));

  // geo_lyr['a240_'+lyr].addLayer(L.tileLayer.wms(
  //   GEOSERVER_URL+WORKSPACE+'/wms?',//verify
  //   opt
  // ));
  
  // FINAL ADD!
  //geo_lyr['a240_'+lyr].addTo(maps.a240_map);  

  // let opt={
  //   mymap:maps.a240_map,
  //   lyr:lyr,
  //   optWms:optInWms
  // }
  // a240_prepare_wmsAddLyrToMap(opt);  
  //optInWms['bounds'] = maps.a240_map.getBounds().toBBoxString();

  let wmsUrl = GEOSERVER_URL+WORKSPACE+'/wms?';
  a240_wmsUrl = wmsUrl;
  a240_optInWms = optInWms;
  a240_lyr = lyr;

  geo_lyr[lyr].addLayer(L.tileLayer.wms(
    wmsUrl,
    optInWms
  ));
  geo_lyr[lyr].addTo(maps.a240_map); 

  dyn_functions['get_lyr_bbox']({
    itemLyr:lyr,
    g_callback:'a240_zoom_to'
  });
}//success
    