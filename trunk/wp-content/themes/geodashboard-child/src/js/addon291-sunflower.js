//--
var a291_mapReady = 0;

var a291_points = 0;
var a291_timer = 100;
var a291_enabled = new Array();
var a291_item_timer = new Array();

var a291_Btns = ['btn_flower1','btn_flower2','btn_flower3'];

var a291_intervalId;
let a291_now = moment().unix();

dyn_functions['addon291-sunflower'+'_ready'] = function(){

  // _onsole.log('addon291-sunflower'+'_ready');

  let g_attribute = g_meta.geovar_user_local.features[0].properties.g_attributes;

  if(g_attribute != undefined
    && g_attribute.sunflower_points != undefined){
    a291_points = g_attribute.sunflower_points;
  }

  a291_Btns.forEach(item => {

    a291_enabled[item] = false;

    if(g_attribute != undefined){
      if(typeof g_attribute.sunflower_timer == 'undefined'){
        a291_item_timer[item] = moment().unix();
      }
      else{
        if(typeof g_attribute.sunflower_timer[item] == 'undefined'){
          a291_item_timer[item] = moment().unix();
        }
        else{
          a291_item_timer[item] = g_attribute.sunflower_timer[item];
        }
      }  
    }
    else{
      a291_item_timer[item] = moment().unix();
    }
   

  });  
  

}

function checkSunflower() {
  if (SunflowerReady === 1) {
    // Do something if the variable is equal to 1
    a291_inizialize();
  } else {
    // If the variable is not equal to 1, wait for 1 second and check again
    setTimeout(checkSunflower, 1000);
  }
}

async function a291_inizialize() {

  // _onsole.log('SunflowerReady',SunflowerReady)

  // list_menu.push('menu_a291');

  // if(main_menu_ready == true){
  //   // proxy_list_menu.push('menu_a291');
  //   if($(window).width() >= 768) {
  //     opt = {'part':'left1','menu':'-1'}
  //     dyn_functions['menu_a291'](opt);
  //   }
  // }

  // if(localStorage.getItem('task_project_token')===null){
  //   alertify.message('Project not selected.');
  //   return;
  // }

  prepare_a291();

  await Promise.all([
    // default_search_map_by_token(),
  ]);

  await new Promise(resolve => setTimeout(resolve, 1));

  sunflower_start();

}

function prepare_a291(){

  return;

}

function sunflower_start(){

  a291_Btns.forEach(item => {
    $('#sunflower-land').append(''+
      '<span class="box-'+item+'"></span>&nbsp;'+
    '');
    opt = btnOptDefault();
    opt.itemSlug = item;
    opt.itemLabel = {
      "default":""
    }//gLang.label_close, 
    opt.itemClass = 'btn-sm btn-outline-dark';
    create_button_2(opt);
    a291_disable_sunflower(item);
  });

  // itemBtn1 = 'btn_flower2';

  $('#sunflower-data').append(''+
    'Points: <span id="points">'+a291_points+'</span>'+
    // 'Time Left: <span id="timer">60</span> seconds'+
  '');

  a291_mapReady = 1;
  a291_startInterval();

}

function a291_startInterval() {
  a291_intervalId = setInterval(a291_updateNow, 1000);
}

function a291_stopInterval() {
  clearInterval(a291_intervalId);
}

function a291_updateNow() {

  a291_now = moment().unix();
  let a = moment.unix(a291_now);

  a291_Btns.forEach(item => {
    
    let b = moment.unix(a291_item_timer[item]);
    let diff = a.diff(b, 's');

    // _onsole.log(item, diff, a291_timer)
    // _onsole.log(item, a291_enabled[item])
    if(diff >= a291_timer){
      
      $('.box-'+item).attr('title','Ready!');
      if(a291_enabled[item] == false){
        a291_enable_sunflower(item)
      }
      a291_enabled[item] = true;

    }
    else{
      
      
      if(a291_enabled[item] == true){
        a291_disable_sunflower(item);
      }
      $('.box-'+item).attr('title',a291_timer-diff + ' sec');
      // $('#sunflower-countdown-'+item).html(a291_timer-diff);
      a291_enabled[item] = false;
      
    }
      // console.log(item, a.diff(b, 's'));

  });    
   
}

function a291_disable_sunflower(item){

  $('#'+item).prop('disabled', true);
  $('#'+item).html(''+
    '<img src=\"'+SOURCE_PATH+'icon/sunflower/crops-kale-halfway.png\" />'+
  '');
  // $('.box-'+item).append(''+
  //   '<div '+
  //     'id="sunflower-countdown-'+item+'" '+
  //     'class="sunflower-countdown" '+
  //     '></div>'+
  //   '');  
  $('.box-'+item).attr('tabindex','0');
  $('.box-'+item).attr('data-toggle','tooltip');
  $('.box-'+item).attr('data-placement','top');
  $('.box-'+item).attr('title','0');
}

function a291_enable_sunflower(item){
  $('#'+item).prop('disabled', false);
  // $('#sunflower-countdown-'+item).remove();
  $('#'+item).html(''+
    '<img src=\"'+SOURCE_PATH+'icon/sunflower/crops-sunflower-plant.png\" />'+
  '');
}

a291_Btns.forEach(item => {

  f_btn[item]=function(slug){
    console.log('f_btn: '+item)
    a291_click_flower(item);
  }

});


function a291_click_flower(item){

  if (a291_enabled[item] === true) {

    // $('#'+item).prop('disabled', true);

    a291_points += 1;
    document.getElementById('points').innerText = a291_points;

    a291_item_timer[item] = moment().unix();

    add_sunflower_point(item);

    a291_enabled[item] = false;
    a291_disable_sunflower(item);

  }

}


async function add_sunflower_point(item) {

  let datastring = {
    call_type:'silent',
    fn_group:'geodata',
    action:'modify_data',
    collection:'add_sunflower_point',
    qy_name:'A',
    lyr:'lyr999',
    geom:0,
    user_token:localStorage.user_token,
    item:item
  };

  let r = await generic_api_v2(
    datastring,
    'add_sunflower_point'
  )
  // _onsole.log(r);
  // g_meta.geovar_user_local = r;

}
