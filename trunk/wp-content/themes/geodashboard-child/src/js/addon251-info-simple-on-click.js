//--
var a251_mapReady = 0;
//--
const a251_slug='InfoSimple';
//--

dyn_functions['addon251-info-simple-on-click'+'_ready'] = function(){

  $('.box-usrprofile').css('display','block');

  $('.box-usrprofile').append('<div '
    +'class="box-btn_'+a251_slug+' box-info-2-btn d-grid gap-2" '
    +'style="margin-top:5px;"></div>');

  a251_mapReady = 1;

  list_mapclick.push(a251_slug);

  prepare_a251();

}

function prepare_a251(){

  g_meta.geovar_addon.features.push({
    "properties": {
      "g_slug" : a251_slug,
      "addon_status" : "enabled",
      "mapclick_status" : "disabled"
    }
  });

  //--

  let item_btn = 'btn_'+a251_slug;

  var meta = {
    'properties':{
      "g_slug": "label_"+item_btn,
      "g_label": "<i class=\"bi bi-geo\"></i>"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": item_btn,
      "g_label": "label_"+item_btn,
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  create_button(item_btn);

}

f_btn['btn_InfoSimple']=function(slug){

  let item_addon = a251_slug;
  let obj_fileterd=g_meta.geovar_addon.features.filter(({properties}) => properties.g_slug === item_addon);
  let obj_addon = obj_fileterd[0];

  if(obj_addon.properties.mapclick_status=='disabled'){
    enable_a251();
  }
  else{
    disable_a251();
  }
  console.log(obj_addon.properties);
  return;

}


function enable_a251(){

  //on start
  let item_addon = a251_slug;
  let obj_fileterd=g_meta.geovar_addon.features.filter(({properties}) => properties.g_slug === item_addon);
  let obj_addon = obj_fileterd[0];
  obj_addon.properties.mapclick_status='enabled';

  //--
  
  $('#btn_'+a251_slug).css('background-color','yellow');
  $('#mapid').css('cursor','crosshair');

  //--

  $('.box-editing2').css('display','block');
  $('.box-editing2').css('justify-content','center');
  $('.box-editing2').html(''
    +'<div class="col-auto ct-editing2-info" style="text-align:center;">'
      +'<div class="box card" '
        +'style="width:200px;margin:auto;display:block;" '
      +'>'
      +'Click on map to get Data'
      +'</div>'
    +'</div>'
  +'');

  return

}

function disable_a251(){

  let item_addon = a251_slug;
  let obj_fileterd=g_meta.geovar_addon.features.filter(({properties}) => properties.g_slug === item_addon);
  let obj_addon = obj_fileterd[0];

  obj_addon.properties.mapclick_status='disabled';

  //--
  
  $('#btn_'+a251_slug).css('background-color','white');
  $('#mapid').css('cursor','default');

  //--
  
  $('.box-editing2').css('display','none');
  $('.box-editing2').html('');

  return

}

dyn_mapclick[a251_slug] = function(e){

  let item_addon = a251_slug;
  let g = g_meta.geovar_addon.features;
  let a = 'g_slug';
  let b = item_addon;
  let obj=g.filter(({properties}) => properties[a] === b);
  let objAddon = obj[0];
  //_onsole.log(objAddon)
  if(objAddon.properties.mapclick_status=='enabled'){

    sessionStorage.mapclick_lat=e.latlng.lat;
    sessionStorage.mapclick_lng=e.latlng.lng;

    //let latlng = [e.latlng.lng,e.latlng.lat];

    //--

    let item_dlg = 'dlg_'+a251_slug;

    var meta = {
      'properties':{
        'g_slug': item_dlg+'_single',
        'g_label': 'Information',
        'g_template': 'template_by_slug',
        'g_description': null
      }
    }
    g_meta.geovar_dialog.features.push(meta);
  
    sessionStorage.this_dialog_lyr=item_dlg;
    sessionStorage.this_dialog_slug=item_dlg+'_single';

    create_dialog2(sessionStorage.this_dialog_slug);

  }

  return

}

dyn_functions['template_by_slug_'+'dlg_'+a251_slug+'_single'] = function(){

  let dlg_slug = 'dlg_'+a251_slug+'_single';

  let c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //box button tab
  c = ''
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //box tab1
  c = '<div '
    +'class="dlg_panel dlg_panel_tab panel-tab1" '
    +'style="display:block;font-family:var(--wd-fonts-secondary);">'
    //+'<aside class="blog-sidebar">'
      +'<div class="loading-wall-box" '
        +'style="height:100px;display:block;"></div>'
      // +'<div id="deck-gl-view" style="height:400px;margin-bottom: 5px;"></div>'
      // +'<div id="result_'+dlg_slug+'" style="height:400px;margin-bottom: 5px;"></div>'
      // +'<figcaption class="figure-caption">Hold <kbd>&uArr; Shift</kbd> to orbit.</figcaption>'
      // +'<div class="deck-gl-status" '
      //   +'style="'
      //     //+'display:none;'
      //     +'margin-top:15px;'
      //   +'"></div>'
    //+'</aside>';
  //c += '<p>TAB1</p>';
  c += '</div><!--tab1-->';
  
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //--

  let datastring = {};
  //add some datastring if necessary from dialog

  get_a251_AllActiveLyrByXY(datastring);  

}

function get_a251_AllActiveLyrByXY(datastring){

  let lat = parseFloat(sessionStorage.mapclick_lat);
  let lng = parseFloat(sessionStorage.mapclick_lng);

  //datastring.tag = 'street-view';
  datastring.lat = lat;
  datastring.lng = lng;
  datastring.fn_group = 'geodata';
  datastring.qy_name = 'A';
  datastring.action="view_data";
  datastring.collection='a251_AllActiveLyrByXY';
  datastring.lyr='lyr999';

  let g=dMap.analisi01.grLyrToc;

  let a251_lyrs = [];

  $.each(g,function(i, lyr){
    let o = g_meta.geovar_lyr.features
    let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
    let obj_lyr=this_obj[0].properties;

    if(obj_lyr.lyr_type=='group'){
      obj_lyr.g_options.forEach(child_lyr => {
        let child_this_obj=o.filter(({properties}) => properties.g_slug === child_lyr);
        let child_obj_lyr=child_this_obj[0].properties;
        
        if(child_obj_lyr.visible == true){
          a251_lyrs.push(child_obj_lyr.g_slug);
        }
      });
    }
    else{
      if(obj_lyr.visible == true){
        a251_lyrs.push(obj_lyr.g_slug);
      }
    }    

  });
  
  datastring.a251_lyrs=a251_lyrs;

  generic_api(datastring,'fill_a251_AllActiveLyrByXY');

}

dyn_functions['succ_fill_a251_AllActiveLyrByXY'] = function(r){

  let dlg_slug = 'dlg_'+a251_slug+'_single';

  r.ds.a251_lyrs.forEach(itemLyr => {

    if(r['f_'+itemLyr]!=null){

      let p = r['f_'+itemLyr][0].properties;
      let o = g_meta.geovar_lyr.features
      let this_obj=o.filter(({properties}) => properties.g_slug === itemLyr);
      let obj_lyr=this_obj[0].properties;
    
      let t = g_meta.geovar_tb;
      let this_t_obj=t.filter((x) => x.name === obj_lyr.g_tables[0]);
      let fTb=this_t_obj[0].features;

      $('.panel-tab1').append(''    
        +'<div class="info-dlg-lyr" '
        +'id="info-dlg-lyr-'+itemLyr+'"></div>'
      +'');

      let c = ''
        +'<div class="row">'
          +'<div id="row-'+itemLyr+'-A" class="col-12" '
            +'style="'
              +'text-align: center;'
              +'font-size: 18px;'
              +'font-weight: 900;'
            +'">'
            +obj_lyr.g_label
          +'</div>'
        +'</div>'
        +'';
      $('#info-dlg-lyr-'+itemLyr).html(c);

      $('#row-'+itemLyr+'-A').css('display','table-cell');
      $('#row-'+itemLyr+'-A').css('vertical-align','middle');
      $('#row-'+itemLyr+'-A').css('border-bottom','2px solid');

      c = ''
        +'<div class="row">'
          +'<div class="col-12 col-box-'+itemLyr+'">'
          +'</div>'
        +'</div>'
        +'';
      $('#info-dlg-lyr-'+itemLyr).append(c);

      r.cols[itemLyr].forEach(col => {

        let o2 = fTb;
        let this_obj2=o2.filter(({properties}) => properties.g_slug === col);
        let pCol=this_obj2[0].properties;

        $('.box-info-'+itemLyr+'-'+pCol.g_slug).remove();

        //-- CREATE FORM GROUP AND LABEL
        opt = {
          "slug": pCol.g_slug,
          "label": pCol.g_label,//ONLY NOT DEFINED IN objCol
          "pCol": pCol,
        }
        $('.col-box-'+itemLyr).append(
          append_field_label_2(opt)
        );
        objItem=p;
        //-- INPUT FIELD
        opt = {
          "slug": 'col-box-'+itemLyr,
          "pCol": pCol,
          "objItem": objItem,
        }
        objField_omnivore_viewOnly(opt);               
      });

    }

  });


}