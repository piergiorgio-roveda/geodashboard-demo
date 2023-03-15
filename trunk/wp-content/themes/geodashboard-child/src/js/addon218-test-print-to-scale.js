$(document).ready(function() {

  // say this is your scale

  //dyn_zoomend['get_scale_dimension']();

  //box-info-1

  $('.box-info-1').html('<div '
    +'class="box-btn_scalecontrol"></div>');
  create_button('btn_scalecontrol');

  

  //var result = foo(); // always ends up being 'undefined'
}); //$(document).ready

var control_scale = L.control.scale().addTo(mymap);
$('.leaflet-control-scale').css('display','none');

//--
f_btn['btn_scalecontrol']=function(){

  if(sessionStorage.scalecontrol==1){
    sessionStorage.scalecontrol=0;
    addon218_reset();
    $('.leaflet-control-scale').css('display','none');
  }
  else{

    sessionStorage.scalecontrol=1;

    mymap.options.zoomSnap=0.01;
    mymap.options.zoomDelta=0.01;

    $('.leaflet-control-scale').css('display','');

    $('.box-info-2').html('<div class="box-scaleselect" style="margin-top:5px;">'
      +'<select class="form-control form-select" aria-label="Default select example">'
        +'<option selected>--Scale</option>'
        +'<option value="1000">1:1,000</option>'
        +'<option value="2000">1:2,000</option>'
        +'<option value="5000">1:5,000</option>'
      +'</select>'
    +'</div>');
    $('.box-scaleselect > .form-control').on('change', function() {

      sessionStorage.scaleratio = $(this).find('option:selected').val();
      dyn_zoomend['get_scale_dimension']();

    });
  }

}

function addon218_reset(){
  mymap.options.zoomSnap=0.5;
  mymap.options.zoomDelta=0.5;
  mymap.setZoom(mymap.getZoom());
  $('.box-scaleselect').remove();
}

