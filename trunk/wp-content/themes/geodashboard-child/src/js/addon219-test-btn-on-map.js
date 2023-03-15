$(document).ready(function() {

  $('.box-legends-btn').css('display','block');
  $('.box-legends-btn').removeClass('WD-canvas-hide');
  $('.box-legends-btn').html('<button type="button" class="btn btn-outline-dark btn-on-map">'
    +'<i class="fa fa-th-list" aria-hidden="true"></i></button>');

  $('.box-gpsposition').css('display','block');
  $('.box-gpsposition').html('<button type="button" class="btn btn-outline-dark btn-on-map">'
    +'<i class="fa fa-location-arrow" aria-hidden="true"></i></button>');

  $('.box-usrprofile').css('display','block');
  $('.box-usrprofile').html('<button type="button" class="btn btn-outline-dark btn-on-map">'
    +'<i class="fa fa-th" aria-hidden="true"></i></button>');

  $('.box-navigation').css('display','flex');
  $('.box-navigation').html('<button type="button" class="btn btn-outline-dark btn-on-map" '
    +'style="margin-bottom:5px;">'
    +'<i class="fa fa-plus" aria-hidden="true"></i></button>');

  $('.box-navigation').append('<button type="button" class="btn btn-outline-dark btn-on-map" '
    +'style="margin-bottom:5px;">'
    +'<i class="fa fa-minus" aria-hidden="true"></i></button>');

  $('.box-navigation').append('<button type="button" class="btn btn-outline-dark btn-on-map" '
    +'style="margin-bottom:5px;">'
    +'<i class="fa fa-map-marker" aria-hidden="true"></i></button>');


}); //$(document).ready
