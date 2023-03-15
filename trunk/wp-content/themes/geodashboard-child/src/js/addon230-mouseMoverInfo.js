var a230_mapReady = 0;

dyn_functions['addon230-mouseMoverInfo'+'_ready'] = function (){

  if (dMap.analisi01.grLyrToc.length==0) {
    // _onsole.log('wait')
    setTimeout(function(){
      dyn_functions['addon230-mouseMoverInfo'+'_ready']()
    },100);
    return;
  } else {
    let g=dMap.analisi01.grLyrToc;

    $('.info-canvas').html(''
      +'<div class="info-canvas-lyr-title" style="border: 1px solid #ccc;"'
      +'id="info-canvas-lyr-lyrsit111"></div>'
    +'');

    g.forEach(item_lyr => {

      let o = g_meta.geovar_lyr.features;
      let this_obj=o.filter(({properties}) => properties.g_slug === item_lyr);
      let obj_lyr=this_obj[0].properties;

      if(obj_lyr.lyr_type=='group'){
        obj_lyr.g_options.forEach(child_lyr => {

          let child_this_obj=o.filter(({properties}) => properties.g_slug === child_lyr);
          let child_obj_lyr=child_this_obj[0].properties;

          if(child_obj_lyr.queryable==1){
            $('.info-canvas').append(''
              +'<div class="info-canvas-lyr" '
                +'style="padding-right:10px;padding-left:10px;" '
                +'id="info-canvas-lyr-'+child_obj_lyr.g_slug+'"></div>'
            +'');
          }
        });
      }
      else{
        if(obj_lyr.queryable==1){

          $('.info-canvas').append(''
            +'<div class="info-canvas-lyr" '
              +'style="padding-right:10px;padding-left:10px;" '
              +'id="info-canvas-lyr-'+obj_lyr.g_slug+'"></div>'
          +'');

        }
      }


    });
    
    a230_mapReady = 1;

    mymap.addEventListener('mousemove', (event) => {
      let lat = Math.round(event.latlng.lat * 100000) / 100000;
      let lng = Math.round(event.latlng.lng * 100000) / 100000;
      //this.position.updateHTML(lat, lng);
      sessionStorage.mousePosLat_last = lat;
      sessionStorage.mousePosLng_last = lng;
    });

  };
}



setInterval(
  function() {

    if(a230_mapReady==1){
      if(sessionStorage.mousePosLat_fix!=sessionStorage.mousePosLat_last
        && sessionStorage.mousePosLng_fix!=sessionStorage.mousePosLng_last){

        sessionStorage.mousePosLat_fix = sessionStorage.mousePosLat_last;
        sessionStorage.mousePosLng_fix = sessionStorage.mousePosLng_last;
        //_onsole.log('PosLat',sessionStorage.mousePosLat_fix);
        //_onsole.log('PosLng',sessionStorage.mousePosLng_fix);

        let g=dMap.analisi01.grLyrToc;

        g.forEach(lyr => {
          let o = g_meta.geovar_lyr.features
          let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
          let obj_lyr=this_obj[0].properties;

          if(obj_lyr.visible){

            if(obj_lyr.lyr_type=='group'){
              obj_lyr.g_options.forEach(child_lyr => {


                let child_this_obj=o.filter(({properties}) => properties.g_slug === child_lyr);
                let child_obj_lyr=child_this_obj[0].properties;

                if(child_obj_lyr.queryable==1){
                  //_onsole.log(child_obj_lyr.g_slug);
                  $('#info-canvas-lyr-'+child_lyr).html('');
                  a230_getInfo(child_obj_lyr.g_slug);
                }

              });
            }
            else{
              if(obj_lyr.queryable==1){

                $('#info-canvas-lyr-'+obj_lyr.g_slug).html('');
                a230_getInfo(obj_lyr.g_slug);
              }
            }

          }

        });

      }

      if(sessionStorage.mapPosLat_fix!=mymap.getCenter().lat
        && sessionStorage.mapPosLng_fix!=mymap.getCenter().lng){

        sessionStorage.mapPosLat_fix = mymap.getCenter().lat;
        sessionStorage.mapPosLng_fix = mymap.getCenter().lng;

        let c_lyr='lyrsit111';
        let o = g_meta.geovar_lyr.features
        let this_obj=o.filter(({properties}) => properties.g_slug === c_lyr);
        let obj_lyr=this_obj[0].properties;

        $('#info-canvas-lyr-lyrsit111').html('');
        
        a230_getInfo(obj_lyr.g_slug,'a230_addMainInfoBox');

      }

      // _onsole.log('------------------------------------');
    }
  },
  800
);

function a230_getInfo(item_lyr,fn_extend='a230_addInfoBox'){

  // $('.info-canvas').append(''
  //   +'<div class="info-canvas-lyr" '
  //   +'id="info-canvas-lyr-main"></div>'
  //   +'<div class="info-canvas-lyr" '
  //   +'id="info-canvas-lyr-'+item_lyr+'"></div>'
  // +'');

  //let item_lyr=r.ds.lyr;
  let o = g_meta.geovar_lyr.features;
  let this_obj=o.filter(({properties}) => properties.g_slug === item_lyr);
  let obj_lyr=this_obj[0].properties;

  dataString={
    fn_group:'geodata',
    action:'view_data',
    collection:'lyr_single_one_table_xy',
    qy_name:'A',
    lyr:item_lyr,
    world:true, // for all records
    //item_token:localStorage[slug+'_token'] //lyr035_token,
    geom:false,
    feat_type:obj_lyr.feat_type,
    lat:sessionStorage.mousePosLat_fix,
    lng:sessionStorage.mousePosLng_fix,
    fn_extend:fn_extend,
    call_type:'silent'
  }
  let b = mymap.getBounds();
  dataString.mye=b.getEast();
  dataString.myw=b.getWest();
  dataString.myn=b.getNorth();
  dataString.mys=b.getSouth();
  //generic_api(dataString,'addon223_view');
  switch_on_lyr_custom(dataString);

}

dyn_functions['a230_addInfoBox']=function(r){

  let item_lyr=r.ds.lyr;

  let o = g_meta.geovar_lyr.features;
  let this_obj=o.filter(({properties}) => properties.g_slug === item_lyr);
  let obj_lyr=this_obj[0].properties;

  //_onsole.log('r',r)
  //_onsole.log('r-length',r.features.length)
  

  if(r.features.length>0){
    console.log('pid',r.features[0].properties.pid)
    let objItem=r.features[0].properties;

    //_onsole.log('obj_lyr1',obj_lyr);
    //_onsole.log('obj_lyr1-obj_lyr.a230_last_r',obj_lyr.a230_last_r);
    
    if(obj_lyr.a230_last_r!=undefined && obj_lyr.a230_last_r.length>0){
      //_onsole.log('obj_lyr1-obj_lyr.a230_last_r PID',obj_lyr.a230_last_r[0].properties.pid);
      if(obj_lyr.a230_last_r[0].properties.pid!=objItem.pid){
        obj_lyr.a230_last_r=r;
      }
      else{
        //_onsole.log('obj_lyr.a230_last_r','return')
        return;
      }
    }
    else{
      
      //_onsole.log('obj_lyr.a230_last_r','no last r')
      obj_lyr.a230_last_r=r;
    }
    //_onsole.log('obj_lyr2',obj_lyr);

    let t = g_meta.geovar_tb;
    let this_t_obj=t.filter((x) => x.name === obj_lyr.g_tables[0]);

    //_onsole.log(obj_lyr.g_tables[0]);
    //_onsole.log(this_t_obj[0].features);

    let f_tb=this_t_obj[0].features;

    
    let c = ''
      +'<div class="row">'
        +'<div class="col-12 col-box-'+r.ds.lyr+'" '
        +'style="background-color: #fff;padding-left:10px;padding-right:10px;">'
        +'</div>'
      +'</div>'
      +'';
    $('#info-canvas-lyr-'+r.ds.lyr).html(c);

    if(r.ds.lyr=='lyrsit102'){

        //parse value to float
        let volume = parseFloat(r.features[0].properties.shape_area)*parseFloat(r.features[0].properties.h);
        let c = ''
          +'<div class="box-info" style="background-color: #fff;">'
            +'<span style="padding-left:10px;padding-right:10px;">'
              +'Volume: '+volume
            +'</span>'
          +'</div>';
        $('.col-box-'+r.ds.lyr).append(c);

        dataString={
          fn_group:'geodata',
          action:'view_data',
          collection:'lyr_single_one_table_xy',
          qy_name:'A',
          lyr:'lyrsit107',
          world:true, // for all records
          //item_token:localStorage[slug+'_token'] //lyr035_token,
          geom:false,
          feat_type:'polygon',
          lat:sessionStorage.mousePosLat_fix,
          lng:sessionStorage.mousePosLng_fix,
          fn_extend:'a230_addInfoBox_lyrsit102',
          call_type:'silent'
        }
        let b = mymap.getBounds();
        dataString.mye=b.getEast();
        dataString.myw=b.getWest();
        dataString.myn=b.getNorth();
        dataString.mys=b.getSouth();
        //generic_api(dataString,'addon223_view');
        switch_on_lyr_custom(dataString);

    }
    else{

      f_tb.forEach(element => {

        let p_col = element.properties;

        $('.box-info-'+p_col.g_slug).remove();
        
        if(p_col.g_preview===1){
          //_onsole.log(p_col.g_slug);
          
          // let c = ''
          //   +'<div class="box-info box-info-'+p_col.g_slug+'" style="background-color: #fff;">'
          //     +'<span style="padding-left:10px;padding-right:10px;">'
          //       +p_col.g_label+': '+r.features[0].properties[p_col.g_slug]
          //     +'</span>'
          //   +'</div>'
          //   +'<div id="group-'+p_col.g_slug+'" class="box-info box-info-'+p_col.g_slug+'_1" style="background-color: #red;">'
          //   +'</div>';
          // $('.col-box-'+r.ds.lyr).append(c);

          // opt = {
          //   "slug": ''+p_col.g_slug+'',
          //   "pCol": p_col,
          //   "objItem": [],
          // }
          // objField_omnivore_viewOnly(opt);


          //-- CREATE FORM GROUP AND LABEL
          opt = {
            "slug": p_col.g_slug,
            "label": p_col.g_label,//ONLY NOT DEFINED IN objCol
            "pCol": p_col,
          }
          $('.col-box-'+r.ds.lyr).append(
            append_field_label_2(opt)
          );
          
          //-- INPUT FIELD
          opt = {
            "slug": 'col-box-'+r.ds.lyr,
            "pCol": p_col,
            "objItem": objItem,
          }
          objField_omnivore_viewOnly(opt);

          //--

          if(p_col.g_callback=='none'){

          }//callback none
          else{
            //-- CREATE FORM GROUP AND LABEL
            opt = {
              "ct_slug": p_col.g_slug,//optIn.ct_slug,
              "pCol": p_col,
              "objItem": objItem,
            }
            dlg_field_template[p_col.g_callback](opt);
          }

        }
      });
    }

  }
  else{
    //no result clean box
    $('#info-canvas-lyr-'+r.ds.lyr).html('');
  }

}

dyn_functions['a230_addMainInfoBox']=function(r){

  //_onsole.log('aa230_addInfoBox',r);
  if(r.features.length>0){

    let item_lyr=r.ds.lyr;
    let o = g_meta.geovar_lyr.features;
    let this_obj=o.filter(({properties}) => properties.g_slug === item_lyr);
    let obj_lyr=this_obj[0].properties;

    //let t = g_meta.geovar_tb;
    //let this_t_obj=t.filter((x) => x.name === obj_lyr.g_tables[0]);
    //_onsole.log(obj_lyr.g_tables[0]);
    //_onsole.log(this_t_obj);

    //let f_tb=this_t_obj[0].features;

    //$('#info-canvas-lyr-'+r.ds.lyr).html('');
    //f_tb.forEach(element => {

      //let p_col = element.properties;
      //if(p_col.g_preview===1){
        //_onsole.log(p_col.g_slug);
        let c = ''
          +'<div class="row">'
            +'<div class="col-12">'
              +'<div class="box-info" style="background-color: #fff;padding:10px;">'
                +'<span style="font-size:150%">'+r.features[0].properties['comune']+'</span>'
              +'</div>'
            +'</div>'
          +'</div>'
          +'';
        $('#info-canvas-lyr-'+r.ds.lyr).html(c);

      //}
    //});

  }

}

dyn_functions['a230_addInfoBox_lyrsit102']=function(r){
  let c = ''
    +'<div class="box-info" style="background-color: #fff;">'
      +'<span style="padding-left:10px;padding-right:10px;">'
        +'Pop. Block: '+r.features[0].properties['p1']
      +'</span>'
    +'</div>';
  $('.col-box-lyrsit102').append(c);
}
