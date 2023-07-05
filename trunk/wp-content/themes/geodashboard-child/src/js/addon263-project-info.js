dyn_functions['addon263-project-info'+'_ready'] = function(){

  $('.ajs-footer-btn1').html(''+
    '<span class="box-btn_view_info_mask"></span>'+
    '&nbsp;<span class="box-btn_hide_info_mask"></span>'+
  '');

  let itemBtn = 'btn_view_info_mask';

  let opt = btnOptDefault();
  opt.itemSlug = itemBtn;
  opt.itemLabel = {
    "default":"<i class=\"bi bi-question-octagon\"></i"
  }//gLang.label_close,    
  create_button_2(opt); 
  
  $('#btn_view_info_mask').attr('info','hide');

  // itemBtn = 'btn_hide_info_mask';

  // opt = btnOptDefault();
  // opt.itemSlug = itemBtn;
  // opt.itemLabel = {
  //   "default":"<i class=\"bi bi-arrow-return-left\"></i"
  // }//gLang.label_close,    
  // create_button_2(opt);
  // $('#btn_hide_info_mask').css('display','none');

  let g_attributes = g_meta.geovar_map.features[0].properties.g_attributes;
  if(g_attributes.post_content!=undefined){
    let p = g_attributes.post_content;
    $('.dlg_main_body').append(''+
      '<div class="clearfix"></div>'+
      '<div class="box-tab box_tab_info"'+
        'style="display:none;padding-top: 15px;">'+
      '<div class="boxItem">'+
      '<div style="padding:3px;">'+
      '<div class="content_tab_info"></div>'+
      '</div></div></div>'+
      '');
    $('.content_tab_info').append(p.content);
  }
  else{
    $('#btn_view_info_mask').css('display','none');
  }

}

f_btn['btn_view_info_mask']=function(slug){
  // box_tab1
  if($('#btn_view_info_mask').attr('info')=='hide'){
    // onsole.log('btn_view_info_mask');
    $('#btn_view_info_mask').attr('info','show');
    $('.box_tab1').css('display','none');
    $('.box_tab_info').css('display','block');
    // $('#btn_view_info_mask').css('display','none');
    // $('#btn_hide_info_mask').css('display','');
    $('#btn_view_info_mask').html('<i class="bi bi-arrow-return-left"></i>');
  }
  else{

    // onsole.log('btn_hide_info_mask');
    $('#btn_view_info_mask').attr('info','hide');
    $('.box_tab1').css('display','');
    $('.box_tab_info').css('display','none');
    // $('#btn_view_info_mask').css('display','none');
    // $('#btn_hide_info_mask').css('display','');
    $('#btn_view_info_mask').html('<i class="bi bi-question-octagon"></i>');

  }
}
