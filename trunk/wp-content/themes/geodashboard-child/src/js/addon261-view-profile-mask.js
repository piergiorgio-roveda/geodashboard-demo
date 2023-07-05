list_menu.push('menu_a261');

dyn_functions['addon261-view-profile-mask'+'_ready'] = function(){

  $('.box-usrprofile').css('display','block');

  let itemBtn = 'btn_view_profile_mask';

  $('.box-usrprofile').append('<div '
    +'class="box-'+itemBtn+' box-info-2-btn d-grid gap-2" '
    +'style="margin-top:5px;"></div>');

  let opt = btnOptDefault();
  opt.itemSlug = itemBtn;
  opt.itemLabel = {
    "default":"<i class=\"bi bi-person-fill\"></i"
  }//gLang.label_close,    
  create_button_2(opt);  

}

f_btn['btn_view_profile_mask']=function(slug){
  open_page_profile();
}

dyn_functions['menu_a261'] = function(optIn){
  
  let c = '';
  let opt = {};
  let itemBtn1 = '';

  switch(optIn.menu){
    case '2':

      itemBtn1 = 'btn_view_profile_mask';
      c = ''+
        '<span class="box-'+itemBtn1+'"></span>&nbsp;'+
      '';
      $('.cyberpunk_footer-cell.'+optIn.part).append(c);

      opt = btnOptDefault();
      opt.itemSlug = itemBtn1;
      opt.itemLabel = {
        "default":"<i class=\"bi bi-person-fill\"></i"
      }//gLang.label_close,   
      create_button_2(opt); 
      
      break;
    default:
      // onsole.log('show_menu: '+optIn.menu);
  }

}