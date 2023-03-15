$(document).ready(function() {
  lyrsit035_ready();
}); //$(document).ready

function lyrsit035_ready(){
  if (f_wait.geovar_lyr==0) {
    // _onsole.log('wait')
    setTimeout(function(){lyrsit035_ready()},100);
    return;
  } else {
    prepare_lyrsit035();
  };
}

function prepare_lyrsit035(){

  let lyr='lyrsit035';
  generic_lyr(lyr);

}

