function a240Generic_updateDbLyr(optIn){

  //_onsole.log(a240_lyrs);

  let dataString={
    fn_group:'geodata',
    //action:G_ACTION,
    qy_name:'A'
  }

  let item_token = g_meta.geovar_map.features[0].properties.item_token;

  dataString.action='modify_data';
  dataString.collection='update_attributes_by_table';
  dataString.table_slug='TB_MAP';
  dataString.item_token=item_token;  
  dataString.field_and_value=[
    {
      "field": "g_lyr",
      "value": a240_lyrs
    }
  ]; 

  generic_api(dataString,optIn.g_callback);

}

dyn_functions['succ_a240_updateDbLyr'] = function(r){
  console.log('succ_a240_updateDbLyr','done');
}

function a240Generic_AddBtnRefresh(){

  $('.ajs-footer-btn2').append(''
    +'<span class="box-btn_a240_refresh_map"></span>'
  +'');

  opt = {
    itemSlug:'btn_a240_refresh_map',//'btn_closedlg3',
    itemLabel: {
      "default":"REFRESH",
      "it":"AGGIORNA",
      "en":"REFRESH"
    },//gLang.label_close,
    itemDescription: {"default":"..."},
    //itemLabel:'<i class="fa fa-ellipsis-h" aria-hidden="true"></i>',
    itemClass:'btn-sm btn-outline-dark', // btn-main-sidebar',
    //btnOnClick:'close',
    itemType:'button', //form-switch
    itemDisabled:false,
    itemStyle:'', //backgrund-color:red;
    g_group: ["public"],
    g_responsive: "both", //both, mobile, desktop
    //"g_callback": 'btn_save_point', // same as btnSlug
  };
  create_button_2(opt);

}

f_btn['btn_a240_refresh_map']=function(optIn){

  window.open(window.location.href,"_self");

}