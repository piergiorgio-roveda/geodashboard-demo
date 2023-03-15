var a223_mapReady = 0;

dyn_functions['addon223-lyr-miner-2'+'_ready'] = function(){

  $('.box-usrprofile').css('display','block');

  $('.box-usrprofile').append('<div '
    +'class="box-btn_miner box-info-2-btn d-grid gap-2" '
    +'style="margin-top:5px;"></div>');

  a223_mapReady = 1;

  addon223_ready();

}

function addon223_ready(){

  prepare_addon223();

}

//--
var addon223_slug='miner_test';
var a223_sheet=[];
var a223_block=[];
var a223_lyrs=[];
//var wiki_array_custom_js=[];
//var wiki_sub_last_r=new Array();
//--

function prepare_addon223(){

  let item_btn = 'btn_miner';
  let obj_btn=g_meta.geovar_button.features.filter(({properties}) => properties.g_slug === item_btn);
  //let g_group = '';
  if(obj_btn.length>0){
    //g_group = obj_btn[0].properties.g_group[0];
    obj_btn[0].status = 'disabled';
  }
  else{

    console.log('btn_miner','BTN without properties!');
    console.log(g_meta.geovar_button);
    return;
  }

  create_button(item_btn);

}

f_btn['btn_miner']=function(slug){

  sessionStorage.this_dialog_slug='addon223_single';
  create_dialog2('addon223_single');

}

f_btn['btn_addon223_view']=function(slug){

  let o = g_meta.geovar_map.features;
  let this_obj=o.filter(({properties}) => properties.g_slug === MAPSLUG);
  let obj_map=this_obj[0].properties;
  let obj_addon=obj_map.g_addon.filter((x) => x.addon === 'addon223');

  if (obj_addon.length>0) {
    //_onsole.log(this_obj2[0].lyr,'defined');
    sessionStorage.a223_lyr=obj_addon[0].lyr;
  }
  else{
    console.log('No lyr defined for', 'addon223');
    return; //exit
  }

  geo_lyr['lyr_a223_1'] = new L.featureGroup();

  dataString={
    fn_group:'geodata',
    action:'view_data',
    collection:'lyr_selected_rows',
    qy_name:'A',
    lyr:obj_addon[0].lyr,//'lyrsit252',//'lyr035',
    world:true, // for all records
    //item_token:localStorage[slug+'_token'] //lyr035_token,
    geom:true,
    query:true,
    g_master:G_MASTER,
    filter_field:'feat_id_ok',
    filter_value:a223_block,
    fn_extend:'a223_view_lyr_a223_1',
    output_lyr:'lyr_a223_1'
  }
  //generic_api(dataString,'addon223_view');
  alertify.infoDialog().destroy();
  switch_on_lyr_custom(dataString);

}

dyn_functions['a223_view_lyr_a223_1']=function(r){
  //_onsole.log('a223_test',r);
  let map_lyr = r.ds.lyr;
  if(r.ds.output_lyr!=undefined){
    map_lyr = r.ds.output_lyr;
  }  
  mymap.fitBounds(geo_lyr[map_lyr].getBounds());
}

f_btn['btn_addon223_p2_badge_reset']=function(slug){

  a223_block=[];
  let box='.part_2_badge > .box';
  $(box).html('');
  enable_btn_addon223_view();

  $('.a223-element-p2').find('icon > i').removeClass('fa-square');
  $('.a223-element-p2').find('icon > i').addClass('fa-square-o');

}

f_btn['btn_addon223_block_reset']=function(slug){

  a223_block=[];
  $('.box-editing2').css('display','none');
  $('.box-editing2').html('');
  //mymap.removeLayer(geo_lyr['lyrsit252']);
  mymap.removeLayer(geo_lyr['lyr_a223_1']);
  geo_lyr['lyr_a223_1'].clearLayers();

}

f_btn['btn_addon223_block_inspect']=function(slug){

  sessionStorage.this_dialog_slug='addon223_inspect_single';
  create_dialog2('addon223_inspect_single');

}
