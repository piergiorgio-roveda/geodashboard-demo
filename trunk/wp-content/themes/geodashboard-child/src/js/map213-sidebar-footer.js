$(document).ready(function() {

  // _onsole.log('Ready-map_box_sidebar_info_001!');
  $('.box-sidebar-footer').addClass('show');

  //$('.box-sidebar-footer-bottom').append(''
  //  + create_toc_box_style1('credit')
  //+'');

  //$('.box-credit-text').html(DOC_CREDIT);
  //$('.box-credit-text').html(LABEL_DOC_CREDIT);
  //$('.box-credit-icon').html('<i id="js-demo" class="fa fa-book" aria-hidden="true"></i>');

  //$('.box-credit').on('click',function(){
  //  fill_home_info();
  //});

}); //$(document).ready

function fill_home_info(){

  var popup = window.open(
    URL_DOC_CREDIT,
    "_blank"
  );
  popupBlockerChecker.check(popup);

}
