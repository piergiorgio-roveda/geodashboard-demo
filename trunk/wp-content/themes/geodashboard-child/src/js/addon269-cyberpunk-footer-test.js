var a269_mapReady = 0;

list_menu.push('menu_a269');
dyn_functions['addon269-cyberpunk-footer-test'+'_ready'] = function(){
  

}

dyn_functions['menu_a269'] = function(optIn){
  
  let c = '';
  let opt = {};
  let itemBtn1 = '';
  let itemBtn2 = '';
  let itemBtn3 = '';

  switch(optIn.menu){
    case '-2':

      itemBtn1 = 'btn_show1';
      itemBtn2 = 'btn_show2';
      itemBtn3 = 'btn_show3';
      c = ''+
        '<span class="box-'+itemBtn1+'"></span>'+
        '&nbsp;<span class="box-'+itemBtn2+'"></span>'+
        '&nbsp;<span class="box-'+itemBtn3+'"></span>'+
      '';
      $('.cyberpunk_footer-cell.'+optIn.part).html(c);

      opt = btnOptDefault();
      opt.itemSlug = itemBtn1;
      opt.itemLabel = {
        "default":"<i class=\"bi bi-archive-fill\"></i"
      }//gLang.label_close,   
      create_button_2(opt);

      opt.itemSlug = itemBtn2;
      opt.itemLabel = {
        "default":"<i class=\"bi bi-arrow-repeat\"></i"
      }//gLang.label_close,   
      create_button_2(opt);

      opt.itemSlug = itemBtn3;
      opt.itemLabel = {
        "default":"<i class=\"bi bi-aspect-ratio\"></i"
      }//gLang.label_close,   
      create_button_2(opt);      
      
    
      break;
    case '-1':

      itemBtn1 = 'btn_show4';
      itemBtn2 = 'btn_show5';
      itemBtn3 = 'btn_show6';
      c = ''+
        '<span class="box-'+itemBtn1+'"></span>'+
        '&nbsp;<span class="box-'+itemBtn2+'"></span>'+
        '&nbsp;<span class="box-'+itemBtn3+'"></span>'+
      '';
      $('.cyberpunk_footer-cell.'+optIn.part).html(c);

      opt = btnOptDefault();
      opt.itemSlug = itemBtn1;
      opt.itemLabel = {
        "default":"<i class=\"bi bi-bus-front-fill\"></i"
      }//gLang.label_close, 
      opt.itemClass = 'btn-sm btn-primary';   
      create_button_2(opt);
      
      opt.itemSlug = itemBtn2;
      opt.itemLabel = {
        "default":"<i class=\"bi bi-building-fill\"></i"
      }//gLang.label_close,   
      opt.itemClass = 'btn-sm btn-info'; 
      create_button_2(opt);

      opt.itemSlug = itemBtn3;
      opt.itemLabel = {
        "default":"<i class=\"bi bi-bookmark\"></i"
      }//gLang.label_close,  
      opt.itemClass = 'btn-sm btn-light';  
      create_button_2(opt); 

      break;
    // case '0':

    //   opt = {'container':'.cyberpunk_footer-cell.'+optIn.part}
    //   default_logo(opt);

    //   break;
    case '1':

      itemBtn1 = 'btn_show7';
      itemBtn2 = 'btn_show8';
      itemBtn3 = 'btn_show9';
      c = ''+
        '<span class="box-'+itemBtn1+'"></span>'+
        '&nbsp;<span class="box-'+itemBtn2+'"></span>'+
        '&nbsp;<span class="box-'+itemBtn3+'"></span>'+
      '';
      $('.cyberpunk_footer-cell.'+optIn.part).html(c);

      opt = btnOptDefault();
      opt.itemSlug = itemBtn1;
      opt.itemLabel = {
        "default":"<i class=\"bi bi-camera\"></i"
      }//gLang.label_close,  
      opt.itemClass = 'btn-sm btn-warning';  
      create_button_2(opt);
      
      opt.itemSlug = itemBtn2;
      opt.itemLabel = {
        "default":"<i class=\"bi bi-cart-plus\"></i"
      }//gLang.label_close,   
      opt.itemClass = 'btn-sm btn-danger'; 
      create_button_2(opt);

      opt.itemSlug = itemBtn3;
      opt.itemLabel = {
        "default":"<i class=\"bi bi-chat-left-dots\"></i"
      }//gLang.label_close,   
      opt.itemClass = 'btn-sm btn-success';  
      create_button_2(opt); 

      break;
      case '2':

      itemBtn1 = 'btn_show10';
      itemBtn2 = 'btn_show11';
      itemBtn3 = 'btn_show12';
      c = ''+
        '<span class="box-'+itemBtn1+'"></span>&nbsp;'+
        '<span class="box-'+itemBtn2+'"></span>&nbsp;'+
        '<span class="box-'+itemBtn3+'"></span>&nbsp;'+
      '';
      $('.cyberpunk_footer-cell.'+optIn.part).html(c);

      opt = btnOptDefault();
      opt.itemSlug = itemBtn1;
      opt.itemLabel = {
        "default":"<i class=\"bi bi-bounding-box-circles\"></i"
      }//gLang.label_close, 
      opt.itemClass = 'btn-sm btn-outline-dark';  
      create_button_2(opt);
      
      opt.itemSlug = itemBtn2;
      opt.itemLabel = {
        "default":"<i class=\"bi bi-layers-half\"></i"
      }//gLang.label_close, 
      opt.itemClass = 'btn-sm btn-outline-dark';  
      create_button_2(opt);

      opt.itemSlug = itemBtn3;
      opt.itemLabel = {
        "default":"<i class=\"bi bi-person-circle\"></i"
      }//gLang.label_close, 
      opt.itemClass = 'btn-sm btn-outline-dark'; 
      create_button_2(opt); 

      break;
    default:
      // onsole.log('show_menu: '+optIn.menu);
  }

}
