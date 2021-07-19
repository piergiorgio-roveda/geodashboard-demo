<?php
/**
 * The template part for footer of main map on front-page
 *
 * @package WordPress
 * @subpackage _underscores
 */

  //$o=json_apiInfo();
  //$google_api = GOOGLE_API_SEARCH_AND_MAP;
  //$info_tracker=get_info_tracker();

?>

<script>
  // Document ready
  $(document).ready(function() {

    console.log('Ready-3!');
    
    $('.label_logout').html(label_logout);
    $('body').append('<div id="moving_div" style="position:fixed;z-index:9000;color:#0032A0;font-weight:700;"></div>');

    $('.box-logout').on('click',function(){
      log_tag_manager('click ' + $(this).attr('name'),'','');
      logout();       
    });

    dMap.fulls=0;
    $('.box-fulls').on('click',function(){
      //log_tag_manager('click ' + $(this).attr('name'),'','');
      if(dMap.fulls==0){
        dMap.fulls=1;
        document.body.requestFullscreen();
        $('.box-fulls > span').html('<i class="fa fa-window-maximize" aria-hidden="true"></i>');
      }
      else{ 
        dMap.fulls=0;
        toggleFullScreen();//document.body.exitFullscreen();
        $('.box-fulls > span').html('<i class="fa fa-arrows-alt" aria-hidden="true"></i>');
      }

    });

    //call start functions
    add_btn_lyr();

  }); //$(document).ready

  //---

  setInterval(
    function() {
      prepare_discover();
      //_onsole.log('------------------------------------');
    },      
    500
  );

  function verify_lyr_map_zoom_and_coords(lyr){
    const c = mymap.getCenter();
    if(dMap['analisi01'][lyr]['load_lat']==c.lat.toFixed(3)
      && dMap['analisi01'][lyr]['load_lng']==c.lng.toFixed(3)
      && dMap['analisi01'][lyr]['load_zoom']==mymap.getZoom()){
      var string='same';
    }
    else{
      var string='different';
    }
    return string;
  }

  function toggleFullScreen() {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
      requestFullScreen.call(docEl);
    }
    else {
      cancelFullScreen.call(doc);
    }
  }

  function mod_btn_lyr(lyr){
    
    var d = dMap['analisi01'][lyr];

    if(d.visible===true){
      $('.'+lyr+'-eye > img').attr('src',source_icon+lyr_icon_visible);
      if(d.enable===true){

        if($('.'+lyr+'-eye').attr('status')=='visible'){
        }
        else{
          $('.'+lyr+'-eye > img').attr('src',source_icon+lyr_icon_visible);
          $('.'+lyr+'-eye').attr('status','visible');
          $('.'+lyr+'-eye > img').attr('src',source_icon+lyr_icon_visible);  
        }

      }
      else{
        if($('.'+lyr+'-eye').attr('status')=='disable'){
        }
        else{
          if (!($('.'+lyr+'-eye').attr('status')=='disable')) {
            alertify.notify('Zoom per visualizzare i Prospect');
          }
          $('.'+lyr+'-eye > img').attr('src',source_icon+lyr_icon_visible);
          $('.'+lyr+'-eye').attr('status','disable');
          $('.'+lyr+'-eye > img').attr('src',source_icon+lyr_icon_visible_disable);
        }

        //if(lyr=='lyr0' || lyr=='lyr1' || lyr=='lyr2' || lyr=='lyr3'){
          //hide_legends();
        //}       
      }
    }
    else{
      if($('.'+lyr+'-eye').attr('status')=='invisible'){
      }
      else{
        $('.'+lyr+'-eye').attr('status','invisible');
        $('.'+lyr+'-eye > img').attr('src',source_icon+lyr_icon_invisible);
      }
      //if(lyr=='lyr0' || lyr=='lyr1' || lyr=='lyr2' || lyr=='lyr3'){
        //hide_legends();
      //}
    }    
  }


  function add_btn_lyr(){
    // ADD BUTTON 

    var g=dMap.analisi01.grLyrToc;
  
    $.each(g,function(i, lyr){
      //var d = dMap['analisi01'][lyr];

      var content = ''
        +'<div '
          +'style="margin-top:15px;">'
        +'</div>'
      +'';
      $('.box-sidebar-extra-m').append(content);
      $('.box-sidebar-extra').append(content);

      var content = ''
        +'<div '
          +'name="'+lyr+'-toc" '
          +'lyr="'+lyr+'" '
          +'id="'+lyr+'-toc" '
          +'class="toc-lyr '+lyr+'-toc" '
          +'style="height: 30px;cursor:pointer;height:30px;">'
          +'<div id="'+lyr+'-toc-eye" '
            +'class="sbTocBoxIcon d-flex align-items-center '
            +'justify-content-center" style="float:left;">'
            +'<span class="align-middle toc-eye '+lyr+'-eye">'
            +'</span>'
            +'&nbsp;<span id="'+lyr+'-toc" '
              +'class="align-middle toc-icon '+lyr+'-icon">'
            +'</span>'
          +'</div>'
          +'<div id="'+lyr+'-toc-text" '
            +'class="sbTocBoxLabel d-flex align-items-center" '
            +'style="text-align:left;">'
            +'<span class="align-middle" style="font-weight:500;">'
              +geovar.lyr[lyr].label
            +'</span>'
          +'</div>'
        +'</div>'
      +'';      
      $('.box-sidebar-extra-m').append(content);
      $('.box-sidebar-extra').append(content);

      $('.'+lyr+'-eye').html(''
        +'<img src="'+source_icon+lyr_icon_visible+'" '
          +'style="width:18px;">'
      +'');
      $('.'+lyr+'-icon').html(''
        +'<img src="'+source_icon+'px20_'+geovar.lyr[lyr].icon+'" '
          +'style="width:20px;">'
      +'');

      $('.'+lyr+'-toc').on('click',function(){
        log_tag_manager('click ' + $(this).attr('name'),'','');
        dMap.analisi01.current=$(this).attr('lyr');
        lyr_toc_click();
      }); 

      //dMap['analisi01'][lyr]['visible']=false;
      //dMap['analisi01'][lyr]['enable']=true;
      mod_btn_lyr(lyr);
      

    });//each lyr
    var sbTocBoxH = 30;
    $('.sbTocBoxIcon').css('width',(sbTocBoxH*2)+'px');
    $('.sbTocBoxIcon').css('height',sbTocBoxH+'px');
    $('.sbTocBoxLabel').css('height',sbTocBoxH+'px');
  }

  function lyr_toc_click(){

    var lyr=dMap.analisi01.current;
    var d = dMap['analisi01'][lyr];
    var t = dMap.analisi01.grTheme;

    //_onsole.log('click on lyr:'+lyr);

    if(d.visible===true){
      //_onsole.log('lyr '+lyr+' is visibile true set to false');
      d.visible=false;
      //if(lyr=='lyr0'){
      //  dMap['analisi01']['lyr5']['visible']=false;
      //}    
      //else if(lyr=='lyr3'){
      //  dMap['analisi01']['lyr2']['visible']=false;
        //mod_btn_lyr('lyr2');
      //}  
      //register_user_position();
    }
    else{
      //_onsole.log('lyr '+lyr+' is visibile false set to true');
      
      //switch automatico lyr conflict
      if(t.indexOf(lyr)>=0){
        //_onsole.log('lyr in group Theme');
        $.each(t,function(i, eLyr){
          dMap['analisi01'][eLyr]['visible']=false;
          mod_btn_lyr(eLyr);
        });
      }
      d.visible=true;
      //register_user_position();
      //if(lyr=='lyr3'){
      //  dMap['analisi01']['lyr2']['visible']=true;
        //mod_btn_lyr('lyr2');
      //}
      //else if(lyr=='lyr0'){
      //  dMap['analisi01']['lyr5']['visible']=true;
      //}
    }

    /*
    //if lyr in lyr7 group take it visibility
    if(dMap.analisi01.grlyr7p.indexOf(lyr)>=0){
      dMap['analisi01']['lyr7p']['visible']=d.visible;
      dMap['analisi01']['lyr7c']['visible']=d.visible;
      //_onsole.log('lyr7 vis:'+dMap['analisi01']['lyr7']['visible'])
    }
    else{
      dMap['analisi01']['lyr7p']['visible']=false;
      dMap['analisi01']['lyr7c']['visible']=false;
    }
    */

    mod_btn_lyr(lyr);

    //if(lyr=='lyr7'||lyr=='lyr8'||lyr=='lyr9'){

    //}
    //else{
      //mod_box_legend();
    //}

  }

  function prepare_discover(){
    format_autoNumeric();
    var start_lat=mymap.getCenter().lat.toFixed(3);
    var start_lng=mymap.getCenter().lng.toFixed(3);
    var start_zoom=mymap.getZoom();
    if(dMap.map.stop_lat==start_lat
      && dMap.map.stop_lng==start_lng
      && dMap.map.stop_zoom==start_zoom){
      //_onsole.log('Same position');
    }
    else{
      //_onsole.log('diff lat:'+(Math.abs(dMap.map.stop_lat-start_lat)));
      //_onsole.log('diff lng:'+(Math.abs(dMap.map.stop_lng-start_lng)));
      dMap.map.stop_lat=start_lat;
      dMap.map.stop_lng=start_lng;
      dMap.map.stop_zoom=start_zoom;
      //_onsole.log('Update position');
    }
    prepare_discover2();

  }

  function prepare_discover2(){
    /*
    case: zoom is > then min_zoom of lyr
      case: lyr is 'off' and control is 'on'
      case: lyr is 'pending' and control is 'on'
      case: lyr is 'on' and coords change 
      case: lyr is 'on' and zoom change
      case: lyr is 'on' and control is 'off'
    */

    /*
    if(mymap.getZoom() >= 10){
      $('.geo_lyr0_label_box').css('display','block');
    }
    else{
      $('.geo_lyr0_label_box').css('display','none');
    }
    */
    
    var g = dMap.analisi01.grLyr;
    $.each(g,function(i, lyr){
     
      //case: zoom is > then min_zoom of lyr
      if (geovar.lyr[lyr].feature_zoom_max) {

        if(mymap.getZoom() >= geovar.lyr[lyr].feature_zoom_max){
          if(dMap['analisi01'][lyr]['enable']==false){
            dMap['analisi01'][lyr]['enable']=true;
          }
        }
        else{
          dMap['analisi01'][lyr]['enable']=false;         
        }        
      }
      else{
        // lyr 'feature_zoom_max' not set
        dMap['analisi01'][lyr]['enable']=true;
      }
      //---case: zoom is > then min_zoom of lyr

      if(dMap['analisi01'][lyr]['enable']===true){

        if(dMap.analisi01[lyr]['status']=='off'){
          if(dMap.analisi01[lyr]['visible']===true){
            
            if(dMap.analisi01.grWms.indexOf(lyr)>-1){
              switch_on_wms_b(lyr);
            }
            else{
              //if(geovar.lyr[lyr].lyr_update=='on_move'){
                switch_on_lyr_b(lyr);  
              //}
            }

          }
          else{
            return;
          }
        }
        else if(dMap.analisi01[lyr]['status']=='on'){
          if(dMap.analisi01[lyr]['visible']===false){
            remove_lyr(lyr);
          }
          else if(dMap.analisi01[lyr]['visible']===true){
            if(dMap.analisi01.grWms.indexOf(lyr)>-1){
              //do nothing
            }
            else{
              //case: lyr is 'on' and coords change 
              //case: lyr is 'on' and zoom change
              if(verify_lyr_map_zoom_and_coords(lyr)=='different'){
                //_onsole.log('change something on zoom or coordinate:'+lyr);
                if(lyr=='lyr0'){
                  //update_lyr0_icon();
                }
                else{
                  if(geovar.lyr[lyr].lyr_update=='on_move'){
                    switch_on_lyr_b(lyr);  
                  }
                }
              }
              else if(verify_lyr_map_zoom_and_coords(lyr)=='same'){
                //_onsole.log('change something on zoom or coordinate:'+lyr);
                return;
              }            
              else{
                return;
              }
            }          
        
          }          
          else{
            return;
          }
        }
        else if(dMap.analisi01[lyr]['status']=='pending'){
          return;
        }        
        else{

        }
      }
      else{
        remove_lyr(lyr);    
      }

      mod_btn_lyr(lyr);


    });
    
  }

  function remove_lyr(lyr){
    var geo_lyr=eval('geo_'+lyr);
    dMap.analisi01[lyr]['status']='off';
    mymap.removeLayer(geo_lyr);
    geo_lyr.clearLayers(); 

    if(lyr=='lyr0'){
      mymap.removeLayer(geo_lyr0_label);
      geo_lyr0_label.clearLayers(); 
    } 
  }


  function switch_on_wms_b(lyr){
    var geo_lyr=eval('geo_'+lyr);

    var opt_layer=dMap.geoserver_prefix+':'+geovar.lyr[lyr].geoserver_name+dMap.geoserver_suffix;
    var opt_pane=lyr+'_pane';

    var opt={
      layers:opt_layer,
      transparent:'true',
      format:'image/png',//PNG 24bit
      format_options:'dpi:300',
      opacity:1,
      tiled:'true',
      //info_format: 'text/html',
      pane:opt_pane,
      antialiasing:'on',
    };
    opt['styles'] = geovar.lyr[lyr].geoserver_style;

    if(dMap.apiInfo.user_license=='premium'){
      opt['cql_filter'] = 'user_token_pt_agenti=\''+dMap.apiInfo.user_token+'\''; 
    }

    if(lyr=='lyr1' || lyr=='lyr4'){
      var g = geovar.lyr[lyr].style;
      opt['env']=''
        +'stroke_weight:0.1;'
        +'stroke_opacity:1;'
        +'stroke_color:#fff;'//null
        +'fill_opacity:0.7;'
        +'fill_color:#fff;'//null
        +'stroke_color_00:#000;'
    } 
    opt['styles'] = geovar.lyr[lyr].geoserver_style;

    console.log('load wms');

    geo_lyr.addLayer(L.tileLayer.wms(
      'https://geoserver/geosystem/wms?',
      opt
    ));

    // FINAL ADD!
    geo_lyr.addTo(mymap); 

    dMap.analisi01[lyr]['status']='on';
    
  }

  function switch_on_lyr_b(lyr){

    //_onsole.log('switch_on_lyr_b('+lyr+')');
    var d = dMap.analisi01[lyr];
    var geo_lyr=eval('geo_'+lyr);
    const b = mymap.getBounds();
    var E = b.getEast();//-0.05;
    var W = b.getWest();//+0.05;
    var N = b.getNorth();//-0.03;
    var S = b.getSouth();//+0.03;
    var current_zoom = mymap.getZoom();
    var ext_lat = Math.abs(S-N)/2;
    var ext_lng = Math.abs(E-W)/2;
    var from_load_lat=Math.abs(d.load_lat-dMap.map.stop_lat);
    var from_load_lng=Math.abs(d.load_lng-dMap.map.stop_lng);
    
    mymap.removeLayer(geo_lyr);
    geo_lyr.clearLayers();      

    if(lyr=='lyr0'){
      mymap.removeLayer(geo_lyr0_label);
      geo_lyr0_label.clearLayers(); 
    } 

    dMap.analisi01[lyr]['status']='pending';
    const c = mymap.getCenter();
    dMap.analisi01[lyr]['load_lat']=c.lat.toFixed(3);
    dMap.analisi01[lyr]['load_lng']=c.lng.toFixed(3);
    dMap.analisi01[lyr]['load_zoom']=mymap.getZoom(); 

    var dataString = {
      slugAPI:'watchdog-data',
      action:'view_'+lyr+'_all',//'api_lyr7',
      qy_name:'A',
      collection:'nd',
      lyr:lyr,
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
    };
    generic_api(dataString,'switch_on_lyr_b');

  }

  dyn_functions['succ_switch_on_lyr_b'] = function(r){

    var lyr=r.ds.lyr;
    var geo_lyr=eval('geo_'+lyr);
    dMap.analisi01[lyr]['status']='on';

    if(geovar.lyr[lyr].lyr_type=='polygon'){
      var geojson = L.geoJson(r,{
        onEachFeature: eval('geo_'+lyr+'_style'),
        pane:lyr+'_pane'
      });
    }
    else{
      var geojson = L.geoJson(r,{
        pointToLayer: eval('geo_'+lyr+'_style'), //function_iconLabel
        pane:lyr+'_pane'
      });

      if(lyr=='lyr0'){
        var geojson_label = L.geoJson(r,{
          pointToLayer: eval('geo_'+lyr+'_label_style'), //function_iconLabel
          pane:lyr+'_pane'
        });
        geo_lyr0_label.addLayer(geojson_label);
        geo_lyr0_label.addTo(mymap);
      }
    }
    
    geo_lyr.addLayer(geojson);    

    // FINAL ADD!
    geo_lyr.addTo(mymap);

    format_autoNumeric();

  }    

  var geo_lyr2_style = function(feature, layer){
    /*
    var p = feature.properties;

    if(p.myrange=='m250'){
      var mycolor = '#ff00bc';
    }
    else{
      var mycolor = '#1c5a1b';
    }
    */
    layer.setStyle({
      fillColor: '#b112b3ff',//getColor(feature.properties.count),
      weight: 1,
      opacity: 0.7,
      color: 'white',
      fillOpacity: 0.3,
      //clickable:false
    }).on('click', geo_lyr2_onClick);
    
  };

  function geo_lyr2_onClick(e){

    console.log('geo_lyr2_onClick');
    //_onsole.log(e);
    /*
    if(dMap.analisi01.lyr1.editing==true){
      var dataString = {
        action : 'api_lyr6',
        qy_name:'A',
        collection:'xy',
        lyr : 'lyr6',
        lat : e.latlng.lat,
        lng : e.latlng.lng
      };
      generic_api(dataString,'get_lyr6_xy');
    }
    else if(dMap.analisi01.lyr0.editing==true){

      add_lyr0_temp(e);

    }
    */

  }  

  function getColor_lyr4(d) {
    return d > 10 ? '#800026' :
          d > 7  ? '#BD0026' :
          d > 5  ? '#E31A1C' :
          d > 3  ? '#FC4E2A' :
          d > 1   ? '#FD8D3C' :
          d > 0   ? '#FEB24C' :
                      '#FFEDA0';
  }

  var geo_lyr4_style = function(feature, layer){
    if(feature.properties.count>0){
      var fillOpacity=0.5;
    }
    else{
      var fillOpacity=0;
    }
    layer.setStyle({
      fillColor: getColor_lyr4(feature.properties.count),
      weight: 1,
      opacity: 0.1,
      color: '#5b5b5b',
      fillOpacity: fillOpacity,
      //clickable:false
    });//.on('click', geo_lyr2_onClick);

  };

  function geo_lyr4_onClick(e){
    console.log('geo_lyr4_onClick');
  }  

</script>