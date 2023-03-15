$(document).ready(function() {
  lyr045_ready();
}); //$(document).ready

function lyr045_ready(){
  if (f_wait.geovar_lyr==0) {
    // _onsole.log('wait')
    setTimeout(function(){lyr045_ready()},100);
    return;
  } else {
    prepare_lyr045();
  };
}

function prepare_lyr045(){

  let lyr='lyr045';
  generic_lyr(lyr);

}


