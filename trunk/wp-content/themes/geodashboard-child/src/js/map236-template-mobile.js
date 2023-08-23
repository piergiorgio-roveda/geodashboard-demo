function m236_ready(){

  $('#box-tool-top').html(''
    +'<div class="d-grid gap-2 col-6 mx-auto">'
      //+'<button class="btn btn-dark btn-sm nav-link-map" type="button">BUTTON</button>'
    +'</div>'
  +'');

  $('#box-tool-bottom-btn').html(''
    +'<div class="container-fluid" style="text-align:center;">'
      +'<div class="btn-group" role="group" aria-label="Basic example">'
        //+'<button type="button" id="tool-db" class="btn btn-dark"><i class="fa fa-database" aria-hidden="true"></i></button>'
        //+'<button type="button" id="tool-legend" class="btn btn-dark"><i class="fa fa-th-list" aria-hidden="true"></i></button>'
        //+'<button type="button" id="tool-menu" class="btn btn-dark"><i class="fa fa-bars" aria-hidden="true"></i></button>'
        //+'<button type="button" id="tool-gps" class="btn btn-dark">'
        //  +'<img src="'+source_icon+'material-crosshairs-blank.svg" style="width:80%" />'
        //+'</button>'
        +'<span class="box-btn_addpoint"></span>'
        +'<span class="box-btn_menu_mobile2"></span>'
        +'<span class="box-btn_gps"></span>'
      +'</div>'
    +'</div>'
  +'');

  console.log('map236-template-mobile_ready');
  create_button('btn_menu_mobile2');

  //$('.nav-link-map').on('click',map_choose_link);

  //$('#tool-db').on('click',map_tool_db);
  //$('#tool-legend').on('click',map_tool_legend);
  //$('#tool-menu').on('click',map_tool_menu);
  //$('#tool-gps').on('click',map_tool_gps);

}

// !dev change `slug` to `optIn`
f_btn[ 'btn_menu_mobile2']=function(){

  if(isMobile == true){

    // $('#sidebarMenu').removeClass('d-none');
    // $('#sidebarMenu').css('height','100%');
    // $('#sidebarMenu').removeClass('d-md-flex');
    // $('#sidebarMenu').addClass('d-flex');
    $('.sidebar-wrapper').removeClass('d-none');
    $('.sidebar-wrapper').removeClass('col');
    $('.sidebar-wrapper').css('width','100%');
    $('.sidebar-wrapper').css('z-index','5000');
    $('.sidebar-wrapper').css('flex','0 0 100%');

  }

}