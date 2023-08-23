$(document).ready(function() {

  // _onsole.log('Ready-map_box_sidebar_info_001!');
  //$('.box-sidebar-footer').addClass('show');

  //$('.box-sidebar-footer-bottom').append(''
  //  + create_toc_box_style1('logout')
  //+'');

  //$('.box-logout-text').html(gLang.label_logout);
  //$('.box-logout-icon').html('<i class="fa fa-power-off" aria-hidden="true"></i>');

  //$('.box-sidebar-footer-bottom').append(''
  //  + create_toc_box_style1('owner')
  //+'');

  $('.box-owner-text').html(ERP_OWNER_GEOINFO_AZIENDA);
  $('.box-owner-icon').html('<img src="'+DFL_LOGO_OWNER+'" style="width:25px;"/>');

}); //$(document).ready

if(sessionStorage.access_status === null){
  sessionStorage.access_status='0';
}

function map214_ready(){

  fill_box_sidebar();
  fill_box_bottom_right();

}

f_wait.btn_profile=0;
f_wait.boxSidebarFooter=0;

var list_creditExtend=[];

function fill_box_sidebar(){
  
  // _onsole.log(count_js);
  //_console.log(count_js_load);

  let sys_lang = get_sys_lang();

  if(sys_lang=='it'){

    $('.box-sidebar-footer-bottom').html(''
      +'<div '
        +'class="box-btn_credit" '
        +'style="margin-top:5px;"></div>'
    +'');
    create_button('btn_credit');
  }
  else{

    $('.box-sidebar-footer-bottom').html(''
      +'<div '
        +'class="box-btn_credit_en" '
        +'style="margin-top:5px;"></div>'
    +'');
    create_button('btn_credit_en');
  }

  $('#btn_credit_en').css('width','100%');

  $('.box-sidebar-footer-bottom').append(''
    +'<div style="margin-top:5px;">'
      +'<div '
        +'class="box-btn_settings box-info-2-btn d-grid gap-2" '
        +'style="float:left;padding-right:5px;" '
        +'></div>'
      +'<div '
        +'class="box-btn_profile box-info-2-btn d-grid gap-2" '
        +'style="float:left;padding-right:5px;display:none;" '
        +'></div>'
      +'<div '
        +'class="box-btn_login_logout" '
        +'></div>'
      +'<div style="margin-top:5px;" '
        +'class="box-btn_close_sidebar d-grid gap-2"></div>'
    +'</div>'
  +'');
  
  create_button('btn_close_sidebar');

  f_wait.btn_profile=1;
  f_wait.boxSidebarFooter=1;
  
  // _onsole.log(sessionStorage.access_status);
  $('.box-btn_login').remove();
  $('.box-btn_logout').remove();
  if(sessionStorage.access_status=='0'){

    $('.box-btn_login_logout').append('<div '
      +'class="box-btn_login box-info-2-btn d-grid gap-2" '
      +'style="margin-top:5px;"></div>');

    if(g_meta.geovar_map){
      let o = g_meta.geovar_map.features;
      let this_obj=o.filter(({properties}) => properties.g_slug === MAPSLUG);
      let obj_map=this_obj[0].properties;
      let obj_addon=obj_map.g_addon.filter((x) => x.addon === 'addon_login');
      if (obj_addon.length>0) {
        if(obj_addon[0].status!=false){
          create_button('btn_login');
        }
      }
      else{
        create_button('btn_login');
      }

      $('.box-btn_settings').removeClass('d-grid');
      $('.box-btn_settings').css('display','none');
      $('.box-btn_profile').removeClass('d-grid');
      $('.box-btn_profile').css('display','none');
      if(sessionStorage.show_admin_btn=='1'){
        sessionStorage.show_admin_btn='0';
      }
      //show_hide_explorer(); 
           
    }


  }
  else{
    $('.box-btn_login_logout').append('<div '
      +'class="box-btn_logout box-info-2-btn d-grid gap-2" '
      +'style="margin-top:5px;"></div>');
    create_button('btn_logout');
    $('.box-btn_settings').addClass('d-grid');
    $('.box-btn_settings').css('display','');
    $('.box-btn_profile').addClass('d-grid');
    $('.box-btn_profile').css('display','');
  }

  //$('.btn_close_sidebar').on('click',btn_close_sidebar);

}


// !dev change `slug` to `optIn`
f_btn[ 'btn_close_sidebar']=function(slug){
  //$('#sidebarMenu').addClass('d-none');
  //$('#sidebarMenu').css('height','100%');
  $('.sidebar-wrapper').addClass('d-none');
  $('.sidebar-wrapper').addClass('col');
}

// !dev change `slug` to `optIn`
f_btn[ 'btn_logout_x']=function(slug){
  // _onsole.log('label_btn_logout_x');
  if(sessionStorage.access_status=='1'){
    var dataString = {
      fn_group:'geodata',
      action:'view_data',
      collection:'logout_x',
      qy_name:'A'
    };
    generic_api(dataString,'logout_x');
  }
  else{
    sessionStorage.access_status='1';
    window.open(HOME_PROJECT+'/wp-login.php?redirect_to='+window.location.href+'&reauth=1','_self');
  }
}

dyn_functions['succ_logout_x'] = function(r){

  //dMap.logout=1;
  //sessionStorage.access_status='0';
  //fill_box_sidebar();
  window.open(HOME_PROJECT,'_self');
}

// !dev change `slug` to `optIn`
f_btn[ 'btn_credit']=function(slug){

  //window.open("https://github.com/", "_blank");

  sessionStorage.this_dialog_lyr='btn_credit';
  sessionStorage.this_dialog_slug='btn_credit_single';//'lyr035_single'
  //
  //sessionStorage.addon208_text='btn_analytics_01';
  //sessionStorage.mapclick_lng=e.latlng.lng;
  create_dialog2(sessionStorage.this_dialog_slug);

}

// !dev change `slug` to `optIn`
f_btn[ 'btn_credit_en']=function(slug){

  //window.open("https://github.com/", "_blank");

  sessionStorage.this_dialog_lyr='btn_credit';
  sessionStorage.this_dialog_slug='btn_credit_single';//'lyr035_single'
  //
  //sessionStorage.addon208_text='btn_analytics_01';
  //sessionStorage.mapclick_lng=e.latlng.lng;
  create_dialog2(sessionStorage.this_dialog_slug);

}

function fill_box_bottom_right(){

  //$('.box-gpsposition').append('<div '
  //  +'class="box-btn_gps box-info-2-btn d-grid gap-2" '
  //  +'style="margin-top:5px;"></div>');
  //create_button('btn_gps');

}

// f/_btn['btn_gps']=function(slug){
//  // _onsole.log('gps');
//}

dyn_functions['template_by_slug_btn_credit_single'] = function(){

  let dlg_slug = 'btn_credit_single';

  let c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //box button tab
  c = ''
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  c = '<ul class="nav nav-tabs"></ul>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  c = '<div>'
    +'<div class="col-btn-attrs" style="text-align:left;"></div>'
  +'</div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //box tab1
  c = '<div '
    +'class="dlg_panel dlg_panel_tab panel-tab1" '
    +'style="display:block;font-family:var(--wd-fonts-secondary);">';
  //c += '<p>TAB1</p>';
  c += '</div><!--tab1-->';
  
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  list_creditExtend.forEach(adds => {
    dyn_functions[adds+'_creditExtend']();
  });


}

