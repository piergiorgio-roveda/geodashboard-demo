dyn_functions['addon224-housenumbers'+'_ready'] = function(){

  $('.box-usrprofile').css('display','block');

  $('.box-usrprofile').append('<div '
    +'class="box-btn_housenumber box-info-2-btn d-grid gap-2" '
    +'style="margin-top:5px;"></div>');

  prepare_addon224();

}

//--
// var addon224_slug='housenumber_test';
// var a224_sheet=[];
// var a224_block=[];
// var a224_lyrs=[];
//var wiki_array_custom_js=[];
//var wiki_sub_last_r=new Array();
//--

function prepare_addon224(){

  //_onsole.log(g_meta.geovar_button)
  let item_btn = 'btn_housenumber';
  let obj_btn=g_meta.geovar_button.features.filter(({properties}) => properties.g_slug === item_btn);
  //let g_group = '';
  if(obj_btn.length>0){
    //g_group = obj_btn[0].properties.g_group[0];
    obj_btn[0].status = 'disabled';
  }
  else{
    console.log('BTN without properties!');
    return;
  }

  create_button(item_btn);
  //_onsole.log(g_meta.geovar_map)
  let o = g_meta.geovar_map.features;
  let this_obj=o.filter(({properties}) => properties.g_slug === MAPSLUG);
  let obj_map=this_obj[0].properties;
  let obj_addon=obj_map.g_addon.filter((x) => x.addon === 'addon224');
  //_onsole.log('prepare_addon224',obj_map)
  if (obj_addon.length>0) {
    //_onsole.log(this_obj2[0].lyr,'defined');
    sessionStorage.addon224_lyr=obj_addon[0].lyr;
  }
  else{
    $('#btn_housenumber').prop('disabled',true);
    return; //exit
  }

  
}

f_btn['btn_housenumber']=function(slug){

  sessionStorage.this_dialog_lyr='btn_housenumber';
  sessionStorage.this_dialog_slug='btn_housenumber_single';//'lyr035_single'
  //
  //sessionStorage.addon208_text='btn_analytics_01';
  //sessionStorage.mapclick_lng=e.latlng.lng;
  create_dialog2(sessionStorage.this_dialog_slug);

}

dyn_functions['template_by_slug_btn_housenumber_single'] = function(){

  let dlg_slug = 'btn_housenumber_single';

  let c = '';

  let dlg_body = '.dlg_'+dlg_slug+''+'_body';

  $('.ajs-header').remove();

  c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $(dlg_body).append(c);

  c = '<!--box button tab-->'
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  $(dlg_body).append(c);

  c = '<div>'
    +'<div class="col-btn-attrs" style="text-align:left;"></div>'
  +'</div>';
  $(dlg_body).append(c);

  //box tab1
  c += '<div '
    +'class="dlg_panel panel-tab1" '
    +'style="display:block;font-family:var(--wd-fonts-secondary);">';
  //c += '<p>TAB1</p>';
  c += '</div><!--tab1-->';
  
  $(dlg_body).append(c);

  //--

  let tab1_parts = [
    { 
      'g_slug': 'part_1',
      'g_type': 'input1'
    },
    { 
      'g_slug': 'part_2',
      'g_type': 'result1'
    }
  ];

  tab1_parts.forEach(tab1_part_element => {
    dlg_addon224_add_part(tab1_part_element);
  });

}

dlg_close_functions['btn_housenumber_single'] = function(){

}


function dlg_addon224_add_part(tab1_part_element){

  let p = tab1_part_element;

  let  c = ''
    +'<div class="row">'
      +'<div class="col-12">'
        +'<div class="'+p.g_slug+'">'
        +'</div>'
      +'</div>'
    +'</div>'
    +'';
  $('.panel-tab1').append(c);

  if(p.g_type=='input1'){

    // c = ''
    //   +'<div '
    //     +'class="box" '
    //     +'></div>';
    // $('.panel-tab1 .'+p.g_slug+'').append(c);

    // c = ''
    //   +'<input type="text" style="width: 100%;" class="input-address-search" placeholder="Search address..">';
    // $('.'+p.g_slug+' > .box').append(c);

    //-- CREATE NEW ROW MAP FIELDS WITH BOX
    opt = {
      "slug": p.g_slug,//optIn.ct_slug,
      "grid": "col-12",
    }
    $('.panel-tab1 .'+p.g_slug+'').append(part_ct_params(opt));

    //-- CREATE FORM GROUP AND LABEL
    opt = {
      "label":"Search address",
      "slug": p.g_slug,//optIn.ct_slug,
      //"label": "Map filter",//ONLY NOT DEFINED IN objCol
      //"pCol": pCol,
    }
    $('.box-'+p.g_slug).append(
      append_field_label_2(opt)
    );

    //-- INPUT FIELD
    opt = {
      "slug": p.g_slug,
      "pCol": {
        g_slug: p.g_slug,
        data_type:'text',
        g_placeholder:"Start typing at least 3 character ..."
      },
      "objItem": {},
    }
    objField_omnivore(opt);

    $('#input-part_1').addClass('input-address-search');

    $(".input-address-search").on("keyup change", function(e) {
      // do stuff!
      if($(".input-address-search").val().length >= 3){

        //_onsole.log($(".input-address-search").val());

        dataString={
          fn_group:'geodata',
          action:'view_data',
          collection:'search_housenumber',
          qy_name:'A',
          lyr:'lyr999',//'lyr035',
          world:true, // for all records
          geom:false,
          query:true,
          search_lyr:sessionStorage.addon224_lyr,
          search_text:$(".input-address-search").val(),
          fn_extend:'a224_read_results',
          g_master:G_MASTER
        }
        //generic_api(dataString,'addon223_view');
        //alertify.infoDialog().destroy();
        switch_on_lyr_custom(dataString);

      }
      else{
        $('.part_2 > .box').html('');
      }
      
    });

  }
  else if(p.g_type=='result1'){
    c = ''
      +'<div '
        +'class="box" '
        +'style="max-height: 300px;overflow-x: auto;" '
        +'></div>';
    $('.panel-tab1 .'+p.g_slug+'').append(c);

  }
  
}

dyn_functions['a224_read_results']=function(r){
  //_onsole.log(r)
  $('.part_2 > .box').html('');
  r.feature.forEach(element => {
    let p = element.properties;
    if(r.ds.result_type=='nocivico'){
      $('.part_2 > .box').append('<span class="el_address" x="'+p.lng+'" y="'+p.lat+'">'+p.tipo + ' ' + p.toponimo + ', ' + p.nomecomune + '</span><br>');
    }
    else{
      $('.part_2 > .box').append('<span class="el_address" x="'+p.lng+'" y="'+p.lat+'">'+p.tipo + ' ' + p.toponimo + ', ' + p.civico + ', ' + p.nomecomune + '</span><br>');
    }
  });

  $('.el_address').on('click',function(){
    alertify.infoDialog().destroy();
    let x = $(this).attr('x');
    let y = $(this).attr('y');
    let latlng = L.latLng(y,x);
    mymap.setView(latlng, 18);
  });

  return;

}