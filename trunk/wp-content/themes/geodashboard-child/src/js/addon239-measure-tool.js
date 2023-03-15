var a239_mapReady = 0;

dyn_functions['addon239-measure-tool'+'_ready'] = function(){

  //$('.box-usrprofile').css('display','block');

  $('.box-usrprofile').append('<div '
    +'class="box-btn_measure box-info-2-btn d-grid gap-2" '
    +'style="margin-top:5px;"></div>');

  a239_mapReady = 1;

  a239_ready();

}

function a239_ready(){
  // if (f_wait.geovar_button==0) {
  //   // _onsole.log('wait')
  //   setTimeout(function(){a239_ready()},1000);
  //   return;
  // } else {
     prepare_a239();
  // };

}

function prepare_a239(){

}