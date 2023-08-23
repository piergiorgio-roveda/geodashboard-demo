//--
var SunflowerReady = 0;

dyn_functions['addon292-prepare-sunflower'+'_ready'] = function(){

  a292_inizialize();

}

async function a292_inizialize() {

  list_menu.push('menu_a292');

  if(main_menu_ready == true){
    // proxy_list_menu.push('menu_a292');
    if($(window).width() >= 768) {
      opt = {'part':'left1','menu':'-1'}
      dyn_functions['menu_a292'](opt);
    }
  }

  // prepare_a292();

  await Promise.all([
    // default_search_map_by_token(),
  ]);

  await new Promise(resolve => setTimeout(resolve, 1));

}

dyn_functions['menu_a292'] = function(optIn){
  
  switch(optIn.menu){
    case '-1':

      $('.cyberpunk_footer-cell.'+optIn.part).append(''+
        '<div id="sunflower-land"></div>'+
      '');
      
      break;
    case '-2':
  
      // itemBtn1 = 'btn_flower2';

      $('.cyberpunk_footer-cell.'+optIn.part).append(''+
        '<div id="sunflower-data"></div>'+
      '');
  
        
      break;
    default:
      // onsole.log('show_menu: '+optIn.menu);
  }

  SunflowerReady = 1;
  
}
