$(document).ready(function() {

  // _onsole.log('Ready-map_box_sidebar_info_001!');
  $('#box-mobile-footer').append(''
    +'<i class="fa fa-circle-o fa-2x px-3 btn-mobile-footer" name="btn1" aria-hidden="true"></i>'
    +'<i class="fa fa-circle-o fa-2x px-3 btn-mobile-footer" name="btn2" aria-hidden="true"></i>'
    +'<i class="fa fa-bars fa-2x px-3 btn-mobile-footer" name="btn3" aria-hidden="true"></i>'
    +'<i class="fa fa-circle-o fa-2x px-3 btn-mobile-footer" name="btn4" aria-hidden="true"></i>'
    +'<i class="fa fa-circle-o fa-2x px-3 btn-mobile-footer" name="btn5" aria-hidden="true"></i>'
  +'');

  var classname = document.getElementsByClassName("btn-mobile-footer");
  for (var i = 0; i < classname.length; i++) {
      classname[i].addEventListener('click', onClick_btn_mobile_footer, false);
  }

}); //$(document).ready

function onClick_btn_mobile_footer() {

  var attribute = this.getAttribute("name");
  // _onsole.log(attribute);
  const pages = new pages_mobile(attribute);
  
  pages.show();

};


// Initializing a class definition
class pages_mobile {
  constructor(name) {
    this.name = name;
  }
  // Adding a method to the constructor
  show() {
    if(this.name=='btn3'){

      var label_close_btn = gLang['label_close_btn'];

      $('#sidebarMenu').removeClass('d-none');
      $('#sidebarMenu').addClass('d-flex');
      $('#dashboardMain').addClass('d-none');
      $('#box-mobile-footer').removeClass('d-block');
      $('#box-mobile-footer').addClass('d-none');
      $('.box-sidebar-footer-bottom').append(''
        +'<div class="box-close_sidebar d-grid gap-2 py-3">'
        +'<button '
          +'type="button" name="btnx" '
          +'class="close_sidebar btn btn-sm btn-dark"'
          +'>'+label_close_btn+'</button>'
        +'</div>');
      $('.close_sidebar').on('click',function(){
        var attribute = this.getAttribute("name");
        const pages = new pages_mobile(attribute, 1);
        pages.hide();
      })

    }
    else{
      console.log('no page ready!')
    }
  }
  hide() {
    if(this.name=='btnx'){

      $('#sidebarMenu').addClass('d-none');
      $('#sidebarMenu').removeClass('d-flex');
      $('#dashboardMain').removeClass('d-none');
      $('#box-mobile-footer').addClass('d-block');
      $('#box-mobile-footer').removeClass('d-none');

      $('.box-close_sidebar').remove();

    }
    else{
      console.log('no page ready!')
    }
  }
}




