var a240_UpdateLyr_selected = new Array();

dyn_functions['a240_UpdateAddons'] =  function(){

  $('.dlg_dlg_a240_main_single_title').html('Add/Remove Map Addons');
  //-- GET DATA TABLE
  let dataString={
    fn_group:'geodata',
    qy_name:'A'
  }
  dataString.action="view_data";
  dataString.collection='show_table_data';
  dataString.table_slug='GEOVAR_MASTER';
  dataString.item_token='true';
  // dataString.filter_field='master_type';
  dataString.filters_type='AND';
  dataString.filters_string=[
    {
      "value": "master_type IN ('addon_map_lyr','addon_map_config')"
    }
  ]; 
  dataString.order_by=[
    {
      "field": "g_slug"
    }
  ]; 

  generic_api(dataString,'a240_UpdateAddons_Addons_list');

}

dyn_functions['succ_'+'a240_UpdateAddons_Addons_list'] = function(r){

  $('.panel-tab1').html('');

  let c = ''+
    '<div class="display-table">'+
      '<div>'+
        '<div class="tb-box-left panel-tab1" style="width:50%;">'+
        '</div>'+
        '<div class="tb-box-right panel-tab1" style="width:50%;">'+
        '</div>'+
      '</div>'+
    '</div>'+
    '<div class="a240-update-status" '+
      'style="'+
        'display:none;'+
        'margin-top:15px;'+
      '"></div>'+
    '';
  $('.panel-tab1').append(c);

  let i = 0;
  let data = 'data1';

  r.features.forEach(feature => {

    let p = feature.properties;
    c = ''+
      '<div '+
        'class="display-table field-box" '+
        'style="border-bottom: 1px solid grey;">'+
        '<div '+
          'style="height: 50px;">'+
          '<div class="field-box-left '+p.g_slug+'" '+
            'style="text-align:center;min-width: 30px;">'+
          '</div>'+
          '<div class="field-box-right '+p.g_slug+'" '+
            'style="width:100%;">'+
          '</div>'+
        '</div>'+
      '</div>'+
      '';
    if(isOdd(i)){
      $('.tb-box-right.panel-tab1').append(c);
    }
    else{
      $('.tb-box-left.panel-tab1').append(c);
    }
    
    c = ''+
      '<input '+
        'id="'+p.g_slug+'" master_type="'+p.master_type+'" '+
        'class="input-'+data+' form-check-input" type="checkbox" value="">'+
      '';
    $('.field-box-left.'+p.g_slug).append(c);

    c = ''+
      p.g_label+
      '';
    $('.field-box-right.'+p.g_slug).append(c);
    // 

    i++;
  });

  // check if addon is installed
  let p = g_meta.geovar_map.features[0].properties;

  p.js_loader_list_map_config.forEach(element => {
    $('#'+element.toUpperCase()).prop('checked', true);
  });

  p.js_loader_list_map_lyr.forEach(element => {
    $('#'+element.toUpperCase()).prop('checked', true);
  });

  $('.input-data1').on('change', function() {
    if(this.checked) {
      // _onsole.log(this.id,'checked');
      a240_UpdateAddons_ToDb(this.id,'add',$(this).attr('master_type'));
    }
    else{
      // _onsole.log(this.id,'unchecked');
      a240_UpdateAddons_ToDb(this.id,'remove',$(this).attr('master_type'));
    }
  });

}

async function a240_UpdateAddons_ToDb(addon_id,action,master_type) {

  let p = g_meta.geovar_map.features[0].properties;

  let datastring = {
    fn_group:'geodata',
    action:'modify_data',
    collection:'AddRemoveAddon',
    qy_name:'A',
    lyr:'lyr999',
    geom:1,
    map_token:p.item_token,
    addon_id:addon_id.toLowerCase(),
    db_action:action,
    master_type:master_type
  } 
  //let r = await a254_seqAllNodes(myUrl);
  let r = await generic_api_v2(datastring,'AddRemoveAddon');
  // _onsole.log(r);

  // if($('#'+addon_id).prop('checked')==true) {
  //   $('#'+addon_id).prop('checked', false);
  // }
  // else{
  //   $('#'+addon_id).prop('checked', true);
  // }

  $('.a240-update-status').css('display','block');
  $('.a240-update-status').html(''
    +'<div class="alert alert-warning d-flex align-items-center" role="alert">'
      +'<div>'        
        +'<span style="margin-right: 10px;">'
          +'<i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span>'
        +'Please, refresh map/page to view this update.'
      +'</div>'
    +'</div>'
  +'');

}
