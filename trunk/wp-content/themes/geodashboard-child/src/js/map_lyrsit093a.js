$(document).ready(function() {
  lyrsit093_ready();
}); //$(document).ready

function lyrsit093_ready(){
  if (f_wait.geovar_lyr==0) {
    // _onsole.log('wait')
    setTimeout(function(){lyrsit093_ready()},100);
    return;
  } else {
    prepare_lyrsit093();
  };
}

function prepare_lyrsit093(){

  let lyr='lyrsit093';
  generic_lyr(lyr);

}

