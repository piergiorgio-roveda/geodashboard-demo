var a227_mapReady = 0;

dyn_functions['addon227-graphics'+'_ready'] = function(){

  $('.box-usrprofile').css('display','block');

  $('.box-usrprofile').append('<div '
    +'class="box-btn_graphics box-info-2-btn d-grid gap-2" '
    +'style="margin-top:5px;"></div>');

  a227_mapReady = 1;
  
  addon227_ready();

}

function addon227_ready(){
  if (f_wait.geovar_button==0) {
    // _onsole.log('wait')
    setTimeout(function(){addon227_ready()},1000);
    return;
  } else {
    prepare_addon227();
  };
}

function prepare_addon227(){

  let item_btn = 'btn_graphics';
  let obj_btn=g_meta.geovar_button.features.filter(({properties}) => properties.g_slug === item_btn);
  //let g_group = '';
  if(obj_btn.length>0){
    //g_group = obj_btn[0].properties.g_group[0];
    obj_btn[0].status = 'disabled';
  }
  else{
    console.log('BTN without properties!');
    return;
  }

  create_button(item_btn);
  $('#btn_graphics').prop('disabled',true);
}

f_btn['btn_graphics']=function(slug){

  //sessionStorage.this_dialog_slug='addon227_single';
  //create_dialog2('addon227_single');

}
