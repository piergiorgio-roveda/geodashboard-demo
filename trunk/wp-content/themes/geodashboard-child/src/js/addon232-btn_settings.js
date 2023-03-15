$(document).ready(function() {

  a232_ready();

}); //$(document).ready

function a232_ready(){
  if (f_wait.boxSidebarFooter==0) {
    // _onsole.log('wait')
    setTimeout(function(){a232_ready()},100);
    return;
  } else {
    create_button('btn_settings');
    $('#btn_settings').prop('disabled',false);
  };
}

f_btn['btn_settings']=function(slug){

  if(sessionStorage.show_admin_btn=='0'){
    sessionStorage.show_admin_btn='1';
  }
  else{
    sessionStorage.show_admin_btn='0';
  }

  show_hide_explorer();

}

function show_hide_explorer(){

  if(sessionStorage.show_admin_btn=='0'){
    // _onsole.log('show_admin_btn no')
    $('.box-sidebar-extra-pre').css('display','none');
    $('.box-sidebar-extra-pre').removeClass('d-md-block');
  }
  else{
    // _onsole.log('show_admin_btn yes')
    $('.box-sidebar-extra-pre').css('display','');
    $('.box-sidebar-extra-pre').addClass('d-md-block');
  }

}