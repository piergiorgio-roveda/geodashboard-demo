$(document).ready(function() {

  /*
  $('.box-info-2').append('<div class="box-info-2-btn d-grid gap-2" style="margin-top:5px;">'
    +'<button type="button" class="btn btn-dark btn-sm btn-main-sidebar btn_explorer active" '
      +'slug="explorer" '
      +'>Explorer</button>'
    +'</div>');
  $('.box-info-2').append('<div class="box-info-2-btn d-grid gap-2" style="margin-top:5px;">'
    +'<button type="button" class="btn btn-dark btn-sm btn-main-sidebar btn_mapid" '
      +'slug="mapid" '
      +'>Map</button>'
    +'</div>');
  */
/* 
  if(sessionStorage.show_admin_btn=='0'){
    $('.box-sidebar-extra-pre').css('display','none');
  }

  $('.box-sidebar-extra-pre').append('<div '
    +'class="box-btn_explorer box-info-2-btn d-grid gap-2" '
    +'style="margin-top:5px;"></div>');
  create_button('btn_explorer');

  $('.box-sidebar-extra-pre').append('<div '
    +'class="box-btn_mapid box-info-2-btn d-grid gap-2" '
    +'style="margin-top:5px;"></div>');
  create_button('btn_mapid'); */

  btn_main_sidebar_change('btn_explorer');

}); //$(document).ready

if(sessionStorage.show_admin_btn === null){
  sessionStorage.show_admin_btn='0';
}

f_btn['btn_mapid']=function(slug){
  btn_main_sidebar_change(slug);
}

f_btn['btn_explorer']=function(slug){
  btn_main_sidebar_change(slug);
}

function btn_main_sidebar_change(slug){

  $('.btn-main-sidebar').removeClass('active');
  $('.'+slug).addClass('active');

  if(slug=='btn_explorer'){
    $('#mapid').css('display','none');
    $('#explorer').removeClass('big-div-header');
  }
  else if(slug=='btn_mapid'){
    $('#mapid').css('display','');
    $('#explorer').addClass('big-div-header');
    mymap.invalidateSize();
  }

}

