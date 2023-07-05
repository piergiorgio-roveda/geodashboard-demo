//--
var a268_mapReady = 0;
list_menu.push('menu_a268_default');
sessionStorage.a268_menu = 0;

dyn_functions['addon268-template-cyberpunk'+'_ready'] = function(){
  
  a268_inizialize();
}

async function a268_inizialize() {

  prepare_a268();

  // await Promise.all([
  //   a260_TestDB2()
  // ]);

  await new Promise(resolve => setTimeout(resolve, 1));

  a268_mapReady = 1;

}

function prepare_a268(){

  let c = ''+
    '<div class="display-table">'+
      '<div class="footer-row">'+
      '</div>'+
    '</div>'+
  '';
  $('#main-footer').html(c);

  if($(window).width() < 768) {
    c = ''+
      '<div class="cyberpunk_footer-cell left1"></div>'+
      '<div class="cyberpunk_footer-cell center" style="width: 225px;"></div>'+
      '<div class="cyberpunk_footer-cell right1"></div>'+
    '';
  }
  else{
    c = ''+
      '<div class="cyberpunk_footer-cell left2" style="width: 20%;"></div>'+
      '<div class="cyberpunk_footer-cell left1" style="width: 20%;"></div>'+
      '<div class="cyberpunk_footer-cell center" style="width: 225px;min-width: 225px;"></div>'+
      '<div class="cyberpunk_footer-cell right1" style="width: 20%;"></div>'+
      '<div class="cyberpunk_footer-cell right2" style="width: 20%;"></div>'+
    '';
  }
  $('.footer-row').html(c);

  let opt = {'part':'center','menu':sessionStorage.a268_menu}
  show_menu(opt);

  if(list_menu.length > 0){
    a268_createButtons();
  }

}

function a268_createButtons(){
  if($(window).width() < 768) {
    let opt = {'part':'left1'}
    a268_showLeft(opt);
    //
    opt = {'part':'right1'}
    a268_showRight(opt);
  }
  else{
    let opt = {'part':'left2','menu':'-2'}
    show_menu(opt);
    opt = {'part':'left1','menu':'-1'}
    show_menu(opt);
    opt = {'part':'right1','menu':'1'}
    show_menu(opt);
    opt = {'part':'right2','menu':'2'}
    show_menu(opt);
  }
}

function a268_showLeft(optIn){

  let itemBtn = 'btn_showLeft';

  $('.cyberpunk_footer-cell.'+optIn.part).css('width','45px');
  $('.cyberpunk_footer-cell.'+optIn.part).html(''+
    '<span class="box-'+itemBtn+'"></span>'+
  '');

  let opt = btnOptDefault();
  opt.itemSlug = itemBtn;
  opt.itemLabel = {
    "default":"<i class=\"bi bi-chevron-compact-left\"></i"
  }//gLang.label_close,   

  create_button_2(opt);

}

function a268_showRight(optIn){

  let itemBtn = 'btn_showRight';

  $('.cyberpunk_footer-cell.'+optIn.part).css('width','45px');
  $('.cyberpunk_footer-cell.'+optIn.part).html(''+
    '<span class="box-'+itemBtn+'"></span>'+
  '');

  let opt = btnOptDefault();
  opt.itemSlug = itemBtn;
  opt.itemLabel = {
    "default":"<i class=\"bi bi-chevron-compact-right\"></i"
  }//gLang.label_close,   
  
  create_button_2(opt);
  
}

f_btn['btn_showLeft']=function(slug){

  if(sessionStorage.a268_menu == -2
    || sessionStorage.a268_menu > 0){
    sessionStorage.a268_menu = 0;
  }
  else{
    let menu = sessionStorage.a268_menu;
    sessionStorage.a268_menu = menu - 1;
  }
  
  let opt = {'part':'center','menu':sessionStorage.a268_menu}
  show_menu(opt);

}

f_btn['btn_showRight']=function(slug){

  if(sessionStorage.a268_menu == 2
    || sessionStorage.a268_menu < 0){
    sessionStorage.a268_menu = 0;
  }
  else{
    let menu = sessionStorage.a268_menu;
    sessionStorage.a268_menu = ++menu;
  }

  let opt = {'part':'center','menu':sessionStorage.a268_menu}
  show_menu(opt);

}

function show_menu(optIn){

  let i = 0;
  list_menu.forEach(element => {
    ++i;
    dyn_functions[element](optIn);
  });
  if(i==0){
    let opt = {'container':'.cyberpunk_footer-cell.center'}
    default_logo(opt);
  }

}

dyn_functions['menu_a268_default'] = function(optIn){
  
  let c = '';
  let opt = {};
  let itemBtn1 = '';

  switch(optIn.menu){
    case '0':

      opt = {'container':'.cyberpunk_footer-cell.'+optIn.part}
      default_logo(opt);
      
      break;
    default:
      // onsole.log('show_menu: '+optIn.menu);
  }

}