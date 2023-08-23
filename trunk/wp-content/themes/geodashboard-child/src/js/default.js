// --

$(document).ready(function() {

  if (typeof mymap !== 'undefined') {
    map220_ready();
  }
  // _onsole.log('Ready-map_box_sidebar_info_001!');

  if (typeof mymap !== 'undefined') {
    map216_ready();
  }

  for (let i = 0; i < 10; i++) {
    $('.box-sidebar-info').append('<div><div class="box-info-'+i+'" style="overflow-wrap: break-word;overflow: hidden;"></div></div>');
  }

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

  // _onsole.log('Ready-map_box_sidebar_info_001!');
  //$('.box-sidebar-footer').addClass('show');

  //$('.box-sidebar-footer-bottom').append(''
  //  + create_toc_box_style1('logout')
  //+'');

  //$('.box-logout-text').html(gLang.label_logout);
  //$('.box-logout-icon').html('<i class="fa fa-power-off" aria-hidden="true"></i>');

  //$('.box-sidebar-footer-bottom').append(''
  //  + create_toc_box_style1('owner')
  //+'');

  $('.box-owner-text').html(ERP_OWNER_GEOINFO_AZIENDA);
  $('.box-owner-icon').html('<img src="'+DFL_LOGO_OWNER+'" style="width:25px;"/>');

  var styles = ''
    +'.cluster_type1{'  
      +'width: 50px;'
      +'height: 50px;'
      //+'background: url(https://cityplanner.biz/source/icon/px20_noun-spray-1518874-Spray-CreaticcaCreative%20Agency-NounProject-mod.png) 0 0;'
      +'background-color:black;'
      +'border:2px solid white;'
    +'}'
  +'';
  var styleSheet = document.createElement("style");
  styleSheet.setAttribute('tag', 'style MarkerCluster lyr045');
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

  // _onsole.log('Dashboard custom 002!');
  /*$('#main-logo').html('<img src="'
    +HOME_PROJECT
    +'source/img/business_2021/banner-gta.svg" '
    +'style="width:255px;"/>');*/
    $('#box-main-logo').css('height','50px');
    $('#box-main-logo').css('background-image','url("'+DFL_LABEL_MAIN_LOGO+'")');
    $('#box-main-logo').css('background-repeat','no-repeat');
    $('#box-main-logo').css('background-size','225px');
    $('#box-main-logo').css('background-position','center');

  // _onsole.log('Ready-8!');
  //update_drag_coords();
  //--NEW
  $('#mapid').css('display','block');
  $('#mapid').append('<table class="table mapid-table"></table>')
  //var dataString = get_var;

  //generic_api(dataString,'show_table');

}); //$(document).ready


setInterval(
  function() {  
    
    if (typeof mymap !== 'undefined') {

      if(m211_mapLibrary=='mapbox'
      || m211_mapLibrary=='maplibre'){
        if(mapbox_load === false){
          return;
        }
      }
      // _onsole.log('mapbox_load',mapbox_load);
      // _onsole.log('interval 1',mymap.getCenter().lat.toFixed(3));
      // _onsole.log('interval 1',mymap.getCenter().lng.toFixed(3));
      // return;
      if(dMap.logout==1){
      }
      else if(f_wait.geovar_label==0
        ||f_wait.mymap==0){
      }
      else{

        let item = 'map_lat';

        if(mymap.getCenter().lat.toFixed(3) > 89.5
          || mymap.getCenter().lat.toFixed(3) < -89.5){
          
          localStorage[item]=gLang['lat_start'];
        }
        else{
          // onsole.log('lat ok: ' + mymap.getCenter().lat.toFixed(3))
          localStorage[item]=mymap.getCenter().lat.toFixed(3);
        }
        
        item = 'map_lng';
        if(mymap.getCenter().lng.toFixed(3) > 179.5
          || mymap.getCenter().lng.toFixed(3) < -179.5){
          // onsole.log('lng use' + gLang['lng_start'])
          localStorage[item]=gLang['lng_start'];
        }
        else{
          // onsole.log('lng ok: ' + mymap.getCenter().lng.toFixed(3))
          localStorage[item]=mymap.getCenter().lng.toFixed(3);
        }

        item = 'map_zoom';
        if(mymap.getZoom()>24
          || mymap.getZoom()<1){
          localStorage[item]=gLang['zoom_start'];
        }
        else{
          localStorage[item]=mymap.getZoom();
        }

        prepare_discover();

      }
    }
    // _onsole.log('------------------------------------');
  },
  500
);

setInterval(
  function() {
    if(localStorage.geo_activate==1){
      // _onsole.log('interval getLocation')
      getLocation();
    }
  },
  // intervallo di refresh in millisecondi
  3000
);

setInterval(
  function() {
    // _onsole.log('prepare_mapclick')
    prepare_mapclick();
  },
  500
);



function initialize() {
  //aggiungi_box_ricerca();
  //initMap();
  //initAutoComplete();
}

function initAutoComplete() {
  
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  if (typeof google === 'object' && typeof google.maps === 'object') {
    
    if(document.getElementById('autocomplete') === null){
      console.log('no autocomplete');
    }
    else{
      autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
        {
          types: ['geocode'],
          componentRestrictions: {country: "it"}
        }
      );
    
      // When the user selects an address from the dropdown, 
      //populate the address
      // fields in the form.
      autocomplete.addListener('place_changed', setAddressOnMap);
    }

  }


}

// [START region_fillform]
function setAddressOnMap() {
  //_onsole.log('setAddressOnMap')
  var place = autocomplete.getPlace();
    
  dMap.place.lat = place.geometry.location.lat();
  dMap.place.lng = place.geometry.location.lng();

  dMap.place.zoom=gLang.zoom_result;

  switch (m211_mapLibrary) {
    case 'leafletjs':

      pin_address = new L.featureGroup();
      locationIcon1 = L.icon({
        iconUrl: HOME_PROJECT+'/source/icon/'+	gLang.locationIcon1_img,
        iconSize: [25, 25], // size of the icon
        iconAnchor: [12.5,12.5] // point of the icon which will correspond to marker's location
      });
    
      mymap.setView(
        [
          dMap.place.lat,
          dMap.place.lng
        ], 
        dMap.place.zoom
      );
      var marker = L.marker([dMap.place.lat, dMap.place.lng], {
        //icon: locationIcon1
      });
      pin_address.addLayer(marker);
      pin_address.addTo(mymap);
      window.setTimeout(function(){
        mymap.removeLayer(pin_address);
        pin_address.clearLayers(); 
      }, 15000);

    break;
    case 'mapbox':
      mymap.setCenter(
        [
          dMap.place.lng,
          dMap.place.lat
        ]
      );
      mymap.setZoom(17);
    break;
    case 'maplibre':
      mymap.setCenter(
        [
          dMap.place.lng,
          dMap.place.lat
        ]
      );
      mymap.setZoom(17);
    break;
    default:

        console.log(`Not setAddressOnMap() options for ${m211_mapLibrary}.`);

  } // switch
}

// Funzioni del geolocator
function aggiungi_box_ricerca(){

  var placeSearch, autocomplete;
  var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
  };
  if($(window).width() < 768) {
    $( '#search-cointainer-sm' ).html(''
      +'<input style="padding-left:3px;border: 0px;" '
        +'id="autocomplete" '
        +'placeholder="'+gLang.label_search_cointainer+'" type="text" '
        +'class="form-control form-control-sm locationField-form-control">'
    );
  }
  else{
    fill_search_cointainer();
  }
 
}

// 'map204-search-cointaner',

function fill_search_cointainer(){

  let o = g_meta.geovar_map.features;
  let this_obj=o.filter(({properties}) => properties.g_slug === MAPSLUG);
  let obj_map=this_obj[0].properties;
  let obj_addon=obj_map.g_addon.filter((x) => x.addon === 'map204');
  if (obj_addon.length>0) {
    if(obj_addon[0].enabled===false){
      
      // _onsole.log('obj_addon[0].enabled===false')
      return;
    }
  }


  let m204_slug='locationField';

  //-- CREATE NEW ROW MAP FIELDS WITH BOX
  opt = {
    "slug": m204_slug,//optIn.ct_slug,
    "grid": "col-12",
  }
  $('#search-cointainer-sidebar').append(part_ct_params(opt));

  //-- CREATE FORM GROUP AND LABEL
  opt = {
    "label":false,
    "slug": m204_slug,//optIn.ct_slug,
    //"label": "Map filter",//ONLY NOT DEFINED IN objCol
    //"pCol": pCol,
  }
  $('.box-'+m204_slug).append(
    append_field_label_2(opt)
  );

  //-- INPUT FIELD
  opt = {
    "slug": m204_slug,
    "params_control": false,
    "pCol": {
      g_slug: m204_slug,
      data_type:'text',
      g_placeholder:"Ricerca indirizzo..."
    },
    "objItem": [],
  }
  $('#group-'+ m204_slug).append(append_simple_field_2(opt));
  $('#input-'+m204_slug).attr('id','autocomplete');
  
  /* $( '#search-cointainer-sidebar' ).html(''
    +'<div id="icon-locationField" '
      +'class="col-2 text-center">'
      +'<p style="margin-top:10px;">'
        +'<i class="fa fa-search" aria-hidden="true" '
          +'style="font-size: 13px;"></i>'
      +'</p>'
    +'</div>'
    +'<div id="locationField" '
      +'class="col-10" style="padding-left: 3px;margin-top: 3px;">'
      +'<input style="padding-left:3px;'
        +'border: 0px solid #ced4da;border-bottom:1px solid #ced4da;" '
        +'id="autocomplete" '
        +'placeholder="'+gLang.label_search_cointainer+'" type="text" '
        +'class="form-control locationField-form-control">'
    +'</div>');
  */
  initAutoComplete(); 

}

// 'map206-general',
var popupBlockerChecker = { 
  check: function(popup_window){ 
    var _scope = this; 
    if (popup_window) { 
      if(/chrome/.test(navigator.userAgent.toLowerCase())){
        setTimeout(function () { 
          _scope._is_popup_blocked(_scope, popup_window); 
        },200); 
      }else{ 
        popup_window.onload = function () { 
          _scope._is_popup_blocked(_scope, popup_window); 
        }; 
      } 
    }else{ 
      _scope._displayError(); 
    } 
  }, 
  _is_popup_blocked: function(scope, popup_window){ 
    if ((popup_window.innerHeight > 0)==false){ 
      scope._displayError(); 
    } 
  },
  _displayError: function(){
    alert("Popup Blocker is enabled! Please add this site to your exception list."); 
  } 
};

var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}
if(window.matchMedia("(max-width: 767px)").matches){
  // The viewport is less than 768 pixels wide
  //alert("This is a mobile device.");
  isMobile = true;
} else{
  // The viewport is at least 768 pixels wide
  //alert("This is a tablet or desktop.");
  isMobile = false;
}

function lunch_function_jquery_creativetim_when_ready(dMap){
  dMap.browser = checkBrowser();

  convert_tag_a_to_button();
  log_info_tracker();
  //style_attribution();
  resize_box();
  return dMap;

}

function zeroFill( number, width ){
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}

function checkBrowser() {
  // https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser/9851769
  if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {
    alert('Il browser che stai usando non è completamente compatibile con la WebApp. Si consiglia di usare Chrome oppure Safari.');
    var usrBrowser = 'Opera';
    var tmpReturn = '';
  }
  else if(navigator.userAgent.indexOf("Chrome") != -1 ){
    //alert('Il browser che stai usando non è completamente compatibile con la WebApp. Si consiglia di usare Chrome oppure Safari.');
    var usrBrowser = 'Chrome';
    var tmpReturn = 'chrome';
    //return 'chrome';
  }
  else if(navigator.userAgent.indexOf("Safari") != -1){
    //alert('Safari');
    var usrBrowser = 'Safari';
    var tmpReturn = 'safari';
    //return 'safari';
  }
  else if(navigator.userAgent.indexOf("Firefox") != -1 ) {
    //alert('Il browser che stai usando non è completamente compatibile con la WebApp. Si consiglia di usare Chrome oppure Safari.');
    var usrBrowser = 'Firefox';
    var tmpReturn = 'firefox';
    //return 'firefox';
  }
  else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) { //IF IE > 10
    var usrBrowser = 'MSIE';
    var tmpReturn = '';
    alert('Il browser che stai usando non è completamente compatibile con la WebApp. Si consiglia di usare Chrome oppure Safari.');
  }
  else{
    var usrBrowser = 'Unknow';
    var tmpReturn = '';
    alert('Il browser che stai usando non è completamente compatibile con la WebApp. Si consiglia di usare Chrome oppure Safari.');
  }

  log_tag_manager(
    'info_tracker - checkBrowser',//GA - log_tag_manager - action //log_ready_map
    usrBrowser,//GA - log_tag_manager - label
    '' //GA - log_tag_manager - value (optional)
  );

  return tmpReturn;

}

//Click event to scroll to top
function scroll_to_top() {
  $('html, body, #mapid, .main-panel').animate({
    scrollTop: 0
  }, 100);
  return false;

} // click() scroll top END

function hashCode(s) {
  return s.split("").reduce(function(a, b) {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
}

function log_tag_manager(
  myFunction='none',
  myDefinition='none',
  myValue=''){

  // _onsole.log('tag_manager1',myFunction);
  let value = localStorage.getItem('session_token');
  let mySession_token = '';
  if(value === null){

  }
  else{
    mySession_token = '|'+value;
  }

  let newObj = {
    // mytrackid:GA_TRACKING_ID,//GA - log_tag_manager - Tracking ID
    event: 'log_tag_manager',
    myEnvironment:ENVIRONMENT,
    myFunction:myFunction,//GA - log_tag_manager - action
    myUser:localStorage.user_token+mySession_token, // MAPSLUG+':'+user_login,//GA - log_tag_manager - category
    myDefinition:myDefinition,//GA - log_tag_manager - label
    myValue:myFunction+'|'+myDefinition+'|'+myValue, //GA - log_tag_manager - value (optional)
    myMapSlug:MAPSLUG,
    myDomain:HOME_PROJECT
  }
  // onsole.log('tag_manager2',newObj);
  let o = dataLayer;
  // let objFiltered=o.filter(
  //   (x) => x.event === 'log_tag_manager'
  // );
  // let objItem=objFiltered[0];
  // _onsole.log('objItem',objItem);

  // var a = [{name:'tc_001'}, {name:'tc_002'}, {name:'tc_003'}];
  o.splice(o.findIndex(x => x.event === 'log_tag_manager'),1);
  // _onsole.log(o);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(newObj);
  // if(objItem==undefined){
    // _onsole.log('dataLayer > NEW');
    // dataLayer.push(newObj);
  // }
  // else{
  //   console.log('dataLayer > EXIST (Update)');
  //   objItem = newObj;
  // }

  // _onsole.log('dataLayer',dataLayer);

  // dataLayer.push(objItem);

}

function log_info_tracker(){
  //1
  log_tag_manager(
    'info_tracker - ip',//GA - log_tag_manager - action //log_ready_map
    info_tracker_ip,//GA - log_tag_manager - label
    '' //GA - log_tag_manager - value (optional)
  );
  //2
  log_tag_manager(
    'info_tracker - referer',//GA - log_tag_manager - action //log_ready_map
    info_tracker_referer,//GA - log_tag_manager - label
    '' //GA - log_tag_manager - value (optional)
  );
  //3
  log_tag_manager(
    'info_tracker - session_token',//GA - log_tag_manager - action //log_ready_map
    info_tracker_session_token,//GA - log_tag_manager - label
    '' //GA - log_tag_manager - value (optional)
  );
}

/*
  funzionalità per convertire i link in pulsanti utilizzabili anche su mobile iOS
*/
function convert_tag_a_to_button() {

  var a = document.getElementsByTagName('a');

  for (i=0;i<a.length;i++){
    //if (a[i].getAttribute('target')=='_blank')
        //a[i].setAttribute('target','_self');
    //$(a[i]).css('color','red');

    $("a").each(function () {
      //$(this).css('color' , 'red');
      //$(this).attr('href' , '#');
      if($(this).hasClass('leaflet-control-easyPrint-button-export')==true){

      }
      else if($(this).hasClass('CurrentSize')==true){

      }
      else if($(this).hasClass('leaflet-control-easyPrint-button')==true){

      }
      else{
        var linkColor = rgb2hex($(this).css('color'));
        if(linkColor=='#ffffff'){
          var new_linkColor = linkColor;
        }
        else{
          var new_linkColor = '#0032A0';
        }

        var str = $(this).attr('href');
        var res = str.replace("*|HOME-URL|*", HOME_PROJECT+"/");
        $(this).replaceWith('<span class="mod-link-'+i+' span-link" style="color:'+new_linkColor+';" toLink="'+res+'">'+$(this).html()+'</span>');
        //$(this).attr('toLink',res)
        $('.mod-link-'+i).on('click',function(){
          //var str = $(this).attr('toLink');
          //$(this).attr('toLink',res)
          window.open($(this).attr('toLink'),"_self")
        })
      }

    });
  }

}

function rgb2hex(rgb) {
  rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
  function hex(x) {
      return ("0" + parseInt(x).toString(16)).slice(-2);
  }
  return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function on_ajax_error(mythis){
  log_tag_manager('on_ajax_error','','');
  //if (textStatus == 'timeout')
  //if (xhr.status == 500)
  mythis.tryCount++;
  if (mythis.tryCount <= mythis.retryLimit) {
    //try again
    $.ajax(mythis);
    return;
  }
  else{
    console.log("error call: " + mythis.url);
    //enable_map_movement();
  }
  return;
}

const autoNumericOptionsEuro = {
    digitGroupSeparator        : '.',
    decimalCharacter           : ',',
    decimalCharacterAlternative: '.',
    currencySymbol             : '\u202f€',
    currencySymbolPlacement    : AutoNumeric.options.currencySymbolPlacement.suffix,
    roundingMethod             : AutoNumeric.options.roundingMethod.halfUpSymmetric,
};

const numberM = {
    digitGroupSeparator         : '.',
    decimalCharacter            : ',',
    decimalCharacterAlternative : '.',
    decimalPlaces               : 0,     
    roundingMethod              : AutoNumeric.options.roundingMethod.halfUpSymmetric,
};

const numberM1 = {
    digitGroupSeparator         : '.',
    decimalCharacter            : ',',
    decimalCharacterAlternative : '.',
    decimalPlaces               : 1,     
    roundingMethod              : AutoNumeric.options.roundingMethod.halfUpSymmetric,
};

const numberM2 = {
    digitGroupSeparator         : '.',
    decimalCharacter            : ',',
    decimalCharacterAlternative : '.',
    decimalPlaces               : 2,     
    roundingMethod              : AutoNumeric.options.roundingMethod.halfUpSymmetric,
};

const dateM = {
  digitGroupSeparator         : '.',
  decimalCharacter            : ',',
  decimalCharacterAlternative : '.',
  decimalPlaces               : 2,     
  roundingMethod              : AutoNumeric.options.roundingMethod.halfUpSymmetric,
};

function format_autoNumeric(){
// Fromattazione dei numeri della parte2
$('.numberM').autoNumeric(
  'init', {
    digitGroupSeparator: '.',
    decimalCharacter: ',',
    maximumValue: '99999999999999999999999999',
    minimumValue: '-99999999999999999999999999'
  }
);
$('.numberM1').autoNumeric(
  'init', {
    digitGroupSeparator: '.',
    decimalCharacter: ',',
    maximumValue: '99999999999999999999999999.9',
    minimumValue: '-99999999999999999999999999.9'
  }
);
$('.numberM2').autoNumeric(
  'init', {
    digitGroupSeparator: '.',
    decimalCharacter: ',',
    maximumValue: '99999999999999999999999999.99',
    minimumValue: '-99999999999999999999999999.99'
  }
);
}

//https://stackoverflow.com/questions/2644299/jquery-removeclass-wildcard
//$.fn.removeClassRegex
function removeClassRegex(regex) {
  return $(this).removeClass(function(index, classes) {
    return classes.split(/\s+/).filter(function(c) {
      return regex.test(c);
    }).join(' ');
  });
};

function isiPhone(){
  return (
    (navigator.platform.indexOf("iPhone") != -1) ||
    (navigator.platform.indexOf("iPod") != -1)
  );
}

function isOdd(num) { 
  return num % 2;
}

function isInt(n){
  return Number(n) === n && n % 1 === 0;
}

function isFloat(n){
  return Number(n) === n && n % 1 !== 0;
}

function encodeHTML(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function encodeID(s) {
  if (s==='') return '_';
  return s.replace(/[^a-z0-9.-]/g, function(match) {
    //return '_'+match[0].charCodeAt(0).toString(16)+'_';
    return '-';
  });
}

function show_loading(){
  $('.loading').css('display','block');
  $('body').append(''
    +'<div class="loading-wall" style="'
      +'width: 100%;'
      +'height: 100%;'
      +'background-color: #fffdfd6b;'
      +'position: fixed;'
      +'top: 0px;'
      +'z-index: 400;'
      +'display:none;'
      +'">'
    +'</div>'
  +'');

  show_loading2('.loading-wall-box');

  // $('.loading-wall-box').append(''
  //   +'<div class="loading-wall-2" style="'
  //     +'width: 100%;'
  //     +'height: 50px;'
  //     +'background-color: #fffdfd6b;'
  //     //+'position: fixed;'
  //     +'top: 0px;'
  //     //+'z-index: 400;'
  //     //+'display:none;'
  //     +'">'
  //   +'</div>'
  // +'');  
  // $('.loading-wall-2').append(''
  //   +'<div class="loadingString1" style="text-align:center;">'
  //     +'<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>'
  //       +'<span class="sr-only">Loading...</span>'
  //     +'</div>'
  // +'');

  $('.loading-wall').fadeTo( "slow", 1 );
  if(dMap.loadingString!=''){
    $('.loading').append(''
      +'<div class="loadingString">'+dMap.loadingString+'</div>'
    +'');
    dMap.loadingString='';
  }
  else{
    $('.loadingString').remove();
  }
}

function hide_loading(){
  $('.loading').css('display','none');
  $('.loading-wall').remove();
  // $('.loading-wall-box').css('display','none');
  // $('.loading-wall-2').remove();
  //$('.loading-wall').fadeTo( "slow", 1 );
  hide_loading2('.loading-wall-box');
}

function show_loading2(ct){
  $(ct).css('height','100%');
  $(ct).html(''
    +'<div class="loading2-wall-box">'
      //+'<img class="loading2-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIoAAABOBAMAAAAN0JP1AAAAFVBMVEUAAAA9KTb/3MkYFCXkO0TQMDitJSxIAn9iAAAAAXRSTlMAQObYZgAAAb5JREFUWMPNltFtxDAMQ2+FrqAVtEJXuBWy/wiNpMo066ZFAbo5fYRiLD8g7qHmI8qnIk8O3TySAB3F36ZyeHbuPtppxDUUQGxUTMPDcZtd91qKvY+ynIA7rfUCWmyxrRS2t1AsapoIw5SzmILTlVJ66nwOa0SpN0zBr05IeT6fNn7oK6XKcKK1BV+kp9Rb2JC0VPzS9lBsngjiZNOk3kCJgq3va6XTFVNwuscxKGZMIRlbAiKmHMeREyFtQ8pikWf2UaKuKSzYEhg1peoPFMzfQIl/YfspfMOGDS0Z20+t53LD6ihr8vBSn62f6vlYk4eQsiayUrY0SolMQ3nJ8i44NKXc84iQQn+2do6mlHseUVGqtaieG7mUUin3PKKiZPsZLRA80JSuyRGBSUUJCK/8ToFVUzqYlhBlSaUY3kJB6OSV7144De+jQJF3KJJRcgzdQpmGLyndgwLofZT6vHQ3UXC6XbiMN1I4qVIq5UQ9bmEVBaGz1L+GIgyM3iwFXySlHLHwIyXHOa21FVKmXX09sLd2uymJqbnpggLk8W+U9YZFdAX0MsWWCilr7HTyfp1iW3WUNXaSp2UoWQnlA4yMcFTtE6rVAAAAAElFTkSuQmCC" alt="Small Image">'
      //+'<div class="lds-facebook"><div></div><div></div><div></div></div>'
      +'<div style="'
        +'width: 35px;'
        +'height: 35px;'
        +'">'
        +'<!-- Loader 3 -->'
        +'<!--https://codepen.io/nikhil8krishnan/pen/rVoXJa-->'
        +'<svg version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" '
        +'xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" '
        +'viewBox="0 0 100 100" enable-background="new 0 0 0 0" '
        +'xml:space="preserve">'
        +'<circle fill="none" stroke="#000" stroke-width="4" '
        +'cx="50" cy="50" r="44" style="opacity:0.5;"/>'
        +'<circle fill="#000" stroke="#000" stroke-width="3" '
        +'cx="8" cy="54" r="6" >'
        +'<animateTransform '
        +'attributeName="transform" '
        +' dur="2s" '
        +'type="rotate" '
        +'from="0 50 48" '
        +'to="360 50 52" '
        +'repeatCount="indefinite" />'
        +'</circle>'
        +'</svg>'
        +'</div>'
    +'</div>'
  +'');

  // var ldld = new ldLoader({ root: "#my-loader" }); 
  // /* 4. active this loader */
  // ldld.on();  

}

function prepare_loading2_plus(ct){
  
  $(ct).css('display','');
  $(ct).css('z-index','5000');
  $(ct).css('position','fixed');
  $(ct).addClass('current-loading2-plus');

  $(ct).addClass('display-table');

  $(ct).html(''+
    '<div class="loading2_plus" style="width: 100%;">'+
      '<div '+
        'class="box-loading2_plus"'+
        'style="vertical-align:middle;text-align:center;"'+
        '>'+
        '<span class="label" style="margin-right: 3px;"></span>'+
        '<span class="icons"></span>'+
        '</div>'+
    '</div>'+
  '');

  // var ldld = new ldLoader({ root: "#my-loader" }); 
  // /* 4. active this loader */
  // ldld.on();  

}

function add_loading2_plus(item){
  
  $('.current-loading2-plus').css('display','');
  $('.hideon-loading2-plus').css('display','none');

  list_loading.push(item);

  $('.box-loading2_plus .icons').append(''+
    '<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw" '+
      'style="font-size:100%;" '+
      'id="loader-'+item+'"></i>'+
    // '<span class="sr-only">Loading...</span>'+
  '');

  $('.box-loading2_plus .label').html('LOADING');

}

function remove_loading2_plus(item){

  $('#loader-'+item).remove();

  // const myArray = [1, 2, 3, 4, 5];
  let index = list_loading.indexOf(item);
  list_loading.splice(index, 1);

  if(list_loading.length == 0){
    // $(ct).css('display','none');
    $('.current-loading2-plus').css('display','none');
    $('.hideon-loading2-plus').css('display','');
    $('.box-loading2_plus .label').html('');
  }

}

function hide_loading2(ct){
  
  // $(ct).css('display','none');
  $('.loading2-wall-box').remove();

}

function stringToBoolean(string){
    switch(string.toLowerCase().trim()){
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        default: return Boolean(string);
    }
}

function toggleFullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  }
  else {
    cancelFullScreen.call(doc);
  }
}

function create_date_from_string(string){

  var date = string.split("-");
  var y = parseInt(date[0], 10),
      m = parseInt(date[1], 10),
      d = parseInt(date[2], 10);
  var newdate = new Date(y, m , d);

  return newdate;

}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

function download(link) {
  var element = document.createElement('a');
  element.setAttribute('href', link);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function download2(url, filename) {
  fetch(url).then(function(t) {
      return t.blob().then((b)=>{
          var a = document.createElement("a");
          a.href = URL.createObjectURL(b);
          a.setAttribute("download", filename);
          a.click();
      }
      );
  });
}

function format_dlg_field(datastring){

  if(datastring.p[datastring.foo_el] === undefined 
    || datastring.p[datastring.foo_el] === null 
    || datastring.p[datastring.foo_el] == ''){
    string_val = '<span>-</span>';
  }
  else{

    var open_link_label = gLang['open_link_label'];
    if(datastring.cols_obj[datastring.foo_el].formato=='link'){
      string_val ='<a href="'+datastring.p[datastring.foo_el]+'" target="_blank">'
        +open_link_label+'</a>';
    }
    else if(datastring.cols_obj[datastring.foo_el].formato=='m'){
      string_val ='<span class="numberM">'+datastring.p[datastring.foo_el]+'</span>';
    }
    else{
      string_val = '<span>'+datastring.p[datastring.foo_el]+'</span>';
    }
  }

  return string_val;

}

function js_intersect(a, b) {
  var setA = new Set(a);
  var setB = new Set(b);
  var intersection = new Set([...setA].filter(x => setB.has(x)));
  return Array.from(intersection);
}

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

function adler32(input) {
  var MOD_ADLER = 65521;
  var a = 1, b = 0;
  for (var i = 0; i < input.length; i++) {
    a = (a + input.charCodeAt(i)) % MOD_ADLER;
    b = (b + a) % MOD_ADLER;
  }
  return (b << 16) | a;
}

function toHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
}

// 'map218-api',
function generic_api(datastring,successFn){
  
  // _onsole.log(successFn);
  var call_silent = false;
  var postdata = false;
  if(datastring['call_type'] === undefined){
  }
  else{
    if(datastring['call_type'] == 'silent'){
      call_silent = true;
    }
  }
  datastring['call_silent']=call_silent;
  if(call_silent === false){
    show_loading();
  }

  if(datastring['postdata'] === undefined){
    postdata=false;
  }
  else{
    postdata=datastring['postdata'];
  }

  if(datastring.lyr!=undefined){
    var string = 'f='+successFn+'-'+datastring.lyr;
    var mylyr = datastring.lyr;
  }
  else{
    var string = 'f='+successFn;
    var mylyr = 'nd';
  }

  datastring['USER_LICENSE']=USER_LICENSE;
  datastring['MAPSLUG']=MAPSLUG;
  if(datastring['settings_json'] === true){

    //var slugAPI = datastring.slugAPI;
    var baseUrl=HOME_PROJECT+datastring['settings_url'];
    datastring['call_type'] = 'silent';
    call_silent = true;

    var toAjax={
      type: "GET",
      url: baseUrl,  
      tryCount : 0,
      retryLimit : 3,
      dataType: 'json',
      async:    true,
      cache:    false,
      successFn: successFn,
      call_silent:call_silent,
      ds:datastring
    }
  }
  else{

    //var slugAPI = datastring.slugAPI;
    var baseUrl=HOME_PROJECT+'/geodata/?'+string;

    if(postdata === false){
      var toAjax={
        type: "POST",
        url: baseUrl,  
        data:datastring,
        tryCount : 0,
        retryLimit : 3,
        dataType: 'json',
        async:    true,
        cache:    false,
        successFn: successFn,
        lyr:mylyr
      }
    }
    else{
      var toAjax={
        type: "POST",
        url: baseUrl,  
        data:datastring,
        tryCount : 0,
        retryLimit : 3,
        cache:    false,
        contentType: false,
        processData: false,
        successFn: successFn,
        lyr:mylyr
      }
    }
  }

  toAjax['error']=function(xhr, textStatus, errorThrown ) {
    if(this.call_silent===false){
      on_ajax_error(this);
      log_tag_manager('ajax ' + this.successFn,'error','');
      //reload window?
      hide_loading();
    }
    console.log('Error ' + this.successFn);
  }

  toAjax['success']=function(r){
    if(this.call_silent===false){
      // _onsole.log(r);
      if(r.response!='200'){
        alertify.notify(r.responseDescription);
        log_tag_manager('ajax ' + this.successFn,'success with 0 result','');
        r.status='ko';
        dyn_functions['succ_'+this.successFn](r);
        return
      }
      var qy_name=r.ds.qy_name;
      if(r.geoQuery[qy_name].iTotalRecords==0){
        alertify.notify(msg_nessun_risultato);
        log_tag_manager('ajax ' + this.successFn,'success with 0 result','');
        return
      }

      log_tag_manager('ajax ' + this.successFn,'success','');
    }
    if(this.type=="GET"){
      r.ds=this.ds;
    }
    hide_loading();
    // _onsole.log(this.successFn)
    dyn_functions['succ_'+this.successFn](r);
    return;
    //return response;
  }//success

  $.ajax(toAjax); //ajax

}

async function generic_api_v2(datastring,myFunction) {

  let call_silent = false;
  let postdata = false;
  let baseUrl = '';
  let methodType =  "POST";
  
  if(datastring['call_type'] === undefined){
  }
  else{
    if(datastring['call_type'] == 'silent'){
      call_silent = true;
    }
  }
  datastring['call_silent']=call_silent;
  if(call_silent === false){
    //show_loading();
  }

  if(datastring['postdata'] === undefined){
    postdata=false;
  }
  else{
    postdata=datastring['postdata'];
  }

  if(datastring.lyr!=undefined){
    var string = 'f='+myFunction+'-'+datastring.lyr;
    var mylyr = datastring.lyr;
  }
  else{
    var string = 'f='+myFunction;
    var mylyr = 'nd';
  }

  datastring['USER_LICENSE']=USER_LICENSE;
  datastring['MAPSLUG']=MAPSLUG;
  if(datastring['settings_json'] === true){

    //var slugAPI = datastring.slugAPI;
    baseUrl=HOME_PROJECT+datastring['settings_url'];
    datastring['call_type'] = 'silent';
    call_silent = true;

    var toAjax={
      type: "GET",
      url: baseUrl,  
      tryCount : 0,
      retryLimit : 3,
      dataType: 'json',
      async:    true,
      cache:    false,
      successFn: myFunction,
      call_silent:call_silent,
      ds:datastring
    }
  }
  else{

    //var slugAPI = datastring.slugAPI;
    baseUrl=HOME_PROJECT+'/geodata/?'+string;

    methodType =  "POST";
    //let url =  baseUrl;  
    // let data = datastring;
    // let tryCount  =  0;
    // let retryLimit  =  3;
    // let dataType  =  'json'; // ????
    // let async =     false;
    // let cache =     false;
    // let contentType =  false;
    // let processData =  false;
    // let successFn =  myFunction;
    // let lyr = mylyr;

    if(postdata === false){
      async = true;
    }

  }

  const response = await fetch(baseUrl, {
    method: methodType,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datastring)
  });
  const responseData = await response.json();
  return responseData;
}

async function generic_api_v2_direct_deprecated(datastring,myFunction) {
  let baseUrl = '';

  baseUrl=HOME_PROJECT+'/api-handler.php?endpoint=generic';

  methodType =  "POST";

  const response = await fetch(baseUrl, {
    method: methodType,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datastring)
  });
  const responseData = await response.json();

  return responseData;

}


async function generic_api_v2_direct(datastring,myFunction) {

  let baseUrl = '';

  baseUrl=HOME_PROJECT+'/api/generic.php?'+myFunction+'&';

  methodType =  "POST";

  const response = await fetch(baseUrl, {
    method: methodType,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datastring)
  });
  const responseData = await response.json();

  return responseData;

}

// 'map223-geovar-loader',
// let g_meta_list=[
//   // 'geovar_action',
//   // 'geovar_button',
//   // 'geovar_collection',
//   // 'geovar_dialog',
//   // 'geovar_label',
//   // 'geovar_tb',
//   //'geovar_lyr_style',
//   // 'geovar_master'
// ];
// let g_meta_project_list=[
//   //'geovar_lyr',
//   //'geovar_map',
//   //'geovar_map_tb'
// ];

// g_meta_list.forEach(element => {
//   f_wait[element]=0;
// });
// g_meta_project_list.forEach(element => {
//   f_wait[element]=0;
// });

function m223_ready(){
  load_geovar(g_meta_list);
  load_geovar_project(g_meta_project_list);
}

function load_geovar(g_meta_list){

  // onsole.log('load_geovar',g_meta_list);

  g_meta_list.forEach(element => {
    var dataString = {}
    dataString.slug=element;
    dataString.settings_url='/script/'+element+'/?g_map_slug='+MAPSLUG+'&json='+element+'&ver='+VER+'';
    dataString.settings_json=true;

    generic_api(dataString,'load_geovar');
  });

}

dyn_functions['succ_load_geovar'] = function(r){

  var slug=r.ds.slug;
  // _onsole.log('Load '+slug+': success');
  var f = r;
  
  if(slug=='geovar_label'){

    //var bar_geovar_label = new Promise((resolve, reject) => {
      f.forEach(element => {
        if(element.name=='en_GB'){
          //gLang=element.features;
          element.features.forEach(e => {
            gLang[e.properties.g_slug]=e.properties.g_label;
          });
        }
      });
    //});

    //bar_geovar_label.then(() => {
      // onsole.log('All done!');
      //f_wait['geovar_label']=1;
    //});
    g_meta[slug+'_full']=f;
    //f_wait[slug+'_full']=1;
  }
  else{
    g_meta[slug]=f;
    f_wait[slug]=1;
  }

  f_wait[slug]=1;

  // _onsole.log(g_meta);

}

function load_geovar_project(g_meta_project_list){
  // onsole.log('load_geovar_project',g_meta_project_list);
  g_meta_project_list.forEach(element => {
    var dataString = {}
    dataString.slug=element;
    //dataString.settings_url='/meta/'+MAPSLUG+'_'+element+'.json?ver='+VER;
    dataString.settings_url='/script/'+element+'/?g_map_slug='+MAPSLUG+'&json='+element+'&ver='+VER+'';
    dataString.settings_json=true;

    generic_api(dataString,'load_geovar_project');
  });

}

dyn_functions['succ_load_geovar_project'] = function(r){

  var slug=r.ds.slug;
  // _onsole.log('Load '+slug+': success');
  var f = r;
  
  g_meta[slug]=f;

  if(dyn_functions[slug+'_extend']!=undefined){
    dyn_functions[slug+'_extend']();
  }

  f_wait[slug]=1;

  // _onsole.log(g_meta);

}


// //--
// 'map201-general-map',
function disable_map_movement(){
  //mymap.dragging.disable();
  mymap.touchZoom.disable();
  mymap.doubleClickZoom.disable();
  mymap.scrollWheelZoom.disable();
}

function enable_map_movement(){
  //log(dMap['analisi08']);
  //mymap.dragging.enable();
  mymap.touchZoom.enable();
  mymap.doubleClickZoom.enable();
  mymap.scrollWheelZoom.enable();
}

function onClick_zoomIn () {
  mymap.zoomIn();
}

function onClick_zoomOut () {
  mymap.zoomOut();
}

function onClick_home() {
  mymap.flyTo([dMap.map.lat, dMap.map.lng], dMap.map.zoom);
}

function onClick_home_direct() {
  mymap.setView([dMap.map.lat, dMap.map.lng], dMap.map.zoom);
}

function onClick_View (newLat,newLng) {
  //log('y10');
  mymap.setView([newLat, newLng], dMap.map.zoom_result);
}

function onClick_flyTo(newLat,newLng,zoom){
  mymap.flyTo([newLat,newLng], zoom);
}

function zoomTo(
  lat=dMap.place.lat,
  lng=dMap.place.lng,
  zoom=dMap.place.zoom
){
  mymap.once('moveend', function() {

    if(dMap.DataView=='open'){
      //log('y11');
      mymap.setView(
        [dMap.place_with_dataview.lat,dMap.place_with_dataview.lng],
        zoom
      );
    }
    else{
      //log('y12');
      mymap.setView([lat,lng], zoom);
    }
  });
}

function verify_lyr_map_zoom_and_coords(lyr){
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;
  const c = mymap.getCenter();
  if(obj_lyr.load_lat==c.lat.toFixed(3)
    && obj_lyr.load_lng==c.lng.toFixed(3)
    && obj_lyr.load_zoom==mymap.getZoom()){
    var string='same';
  }
  else{
    var string='different';
  }
  // _onsole.log('verify_lyr_map_zoom_and_coords:'+string);
  return string;
}

function get_sys_lang(){

  let sys_lang = 'en';

  if(g_meta.geovar_map){
    let o = g_meta.geovar_map.features;
    let this_obj=o.filter(({properties}) => properties.g_slug === MAPSLUG);
    let obj_map=this_obj[0].properties;

    let obj_addon=obj_map.g_addon.filter((x) => x.addon === 'addon_lang');

    if (obj_addon.length>0) {

      sys_lang = obj_addon[0].lang

    }
  }
  return sys_lang;

}

function get_opt_lang(optIn){

  let sys_lang = 'en';

  if(g_meta.geovar_map){

    let o = g_meta.geovar_map.features;
    let this_obj=o.filter(({properties}) => properties.g_slug === MAPSLUG);

    if(this_obj[0]!=null){

      let obj_map=this_obj[0].properties;
  
      let obj_addon=obj_map.g_addon.filter((x) => x.addon === 'addon_lang');
  
      if (obj_addon.length>0) {
  
        sys_lang = obj_addon[0].lang
    
      }

    }


  }

  let itemLabel = '';

  if(optIn.itemLabel[sys_lang]!=undefined){
    itemLabel = optIn.itemLabel[sys_lang];
  }
  else if(optIn.itemLabel['default']!=undefined){
    itemLabel = optIn.itemLabel['default'];
  }
  else{
    itemLabel = 'No label';
  }

  return itemLabel;

}

function get_geovar_obj(ds){
  
  //_onsole.log('get_geovar_obj',ds);
  let o = new Array();
  let this_obj = new Array();

  //_onsole.log('isArray',Array.isArray(ds.geovar))

  if ( typeof ds.geovar === 'object' ) {
    //_onsole.log(typeof ds.geovar)
    //_onsole.log('value is Array!');
    o = ds.geovar
  } 
  else {
    //_onsole.log('Not an array');
    if(ds.type=='table_schema'){

      let objCols = g_meta[ds.geovar].filter(
        ({name}) => name === ds.schema
      )[0];
      return objCols;

    }
    else{
      
      if(ds.geovar=="geovar_tb"){
        o = g_meta[ds.geovar]
      }
      else if(ds.geovar=="geovar_label_full"){
        o = g_meta[ds.geovar]
      }
      else{
        o = g_meta[ds.geovar].features
      }
    }
  }

  //--

  let obj=new Array();

  let filter_field = 'g_slug';
  if(ds.filter_field!=undefined){
    filter_field = ds.filter_field;
  }

  if(ds.type=='item'){

    this_obj=o.filter(({properties}) => properties[filter_field] === ds.slug);
    obj=this_obj[0].properties;
    return obj[ds.item];

  }
  else if(ds.type=='single_object'){

    if(ds.geovar=="geovar_tb"){

      if(ds.custom!=undefined 
        && ds.custom=='geovar_tb_master_edit_sub'){
        //_onsole.log(o)
        //this_obj=o.filter(({properties}) => properties[filter_field] === ds.slug);
        //obj=this_obj[0].properties;
        o.forEach(objTb => {
          //_onsole.log(objTb)
          //_onsole.log(filter_field)
          //_onsole.log(ds.slug)
          if(this_obj.length>0){
            obj=this_obj[0].properties;
          }
          else{
            //obj=new Array();
          }
        });
      }
      else{
        this_obj=o.filter(({name}) => name === ds.slug);
        obj=this_obj[0];
      }

    }
    else if(ds.geovar=="geovar_label_full"){

      if(ds.custom!=undefined 
        && ds.custom=='geovar_label_edit_sub'){
        //_onsole.log(o)
        //this_obj=o.filter(({properties}) => properties[filter_field] === ds.slug);
        //obj=this_obj[0].properties;
        o.forEach(objLabel => {
          //_onsole.log(objLabel)
          //_onsole.log(filter_field)
          //_onsole.log(ds.slug)
          this_obj=objLabel.features.filter(({properties}) => properties[filter_field] === ds.slug);
          if(this_obj.length>0){
            obj=this_obj[0].properties;
          }
          else{
            //obj=new Array();
          }
        });
      }
      else{

        this_obj=o.filter(({name}) => name === ds.slug);
        obj=this_obj[0];

      }

    }
    else{
      //_onsole.log(ds)

      //if(o.map((v) => typeof v.properties)[0]=='object'){
      if( ds.noproperties==undefined ||  ds.noproperties==false){
        this_obj=o.filter(({properties}) => properties[filter_field] === ds.slug);
      }
      else{
        // onsole.log(filter_field)
        // onsole.log(ds.slug)
        // onsole.log(o)
        this_obj=o.filter((x) => x[filter_field] === ds.slug);
        // onsole.log(this_obj)
      }

      
      if(this_obj.length>0){
        
        //_onsole.log('obj',obj)
        if( ds.noproperties==undefined ||  ds.noproperties==false){
          obj=this_obj[0].properties;
        }
        else{
          obj=this_obj[0];
        }
      }
      else{
        obj=new Array();
      }
    }
    
    
    return obj;

  }
  else if(ds.type=='multiple_object'){
    let objects=new Array();
    ds.objects.forEach(slug => {
      this_obj=o.filter(({properties}) => properties[filter_field] === slug);
      objects.push(this_obj[0]);
    });
    
    // obj=this_obj[0].properties;
    return objects;

  }
  else{ //'full_object'

    return o;

  }

  
}

function group_disable_hide(optIn){

  //_onsole.log(item_btn)
  //_onsole.log(g_group)
  //Array.prototype.filter()

  let g_group = optIn.g_group[0];

  let obj_access=g_meta.geovar_access.features.filter(({properties}) => properties.g_slug === g_group);
  //_onsole.log(obj_access)
  if(obj_access.length>0){

    let a = obj_access[0].properties.g_roles;
    let b = g_meta.geovar_user.features[0].properties.user_role;

    if(a[0]=='hidden'){
      $('.box-'+optIn.itemSlug).css('display','none');
    }
    else if(a[0]=='public'){

    }
    else if(a[0]=='private'){
      $('#'+optIn.itemSlug).prop('disabled',true);
    }
    else{

      let result = js_intersect(a, b)

      if(result.length>0){
        $('#'+ioptIn.itemSlug).prop('disabled',false);
      }
      else{
        $('#'+optIn.itemSlug).prop('disabled',true);
      }

    }

  }

}

dyn_functions['get_lyr_bbox'] = function(optIn) {

  g_ds = {
    geovar:"geovar_lyr",//obj_maps
    slug:optIn.itemLyr,//filter
    type:'single_object'//,//'item' or 'single_object' or 'full_object'
  }
  let objItem = get_geovar_obj(g_ds);
  //let f = {"properties":objItem};
  //_onsole.log('objItem2',objItem2);
  //full_obj.push(f);
  //_onsole.log('objItem',objItem.g_tables[0]);

  //-- GET DATA TABLE
  let dataString={
    fn_group:'geodata',
    qy_name:'A'
  }
  dataString.action="view_data";
  dataString.collection='lyr_all_bbox';
  dataString.table_slug=objItem.g_tables[0];

  generic_api(dataString,optIn.g_callback);

}

// 'map205-template',



// 'map207-template-b',
function m207_ready(){

  // _onsole.log('m207_ready()');
  
  var source_w = $('.box-sidebar').width();
  var target_l = source_w+5;
  
  // show_loading();

  alertify.set('notifier','position', 'top-right');
  
  log_tag_manager(
    'ready - view map v'+GEOLIB_VER,
    //GA - log_tag_manager - action // _onsole.log_ready_map
    g_meta.geovar_map.features[0].properties.g_label,
    //'map-dashboard',//GA - log_tag_manager - label
    '0' //GA - log_tag_manager - value (optional)
  );

  $('.div-on-map').on(
    'click',
    function(ev){
      if(m211_mapLibrary=='leafletjs'){
        L.DomEvent.stopPropagation(ev);
      }
    }
  ); 

  // hide_loading();

}

// 'map208-toc-box',
function create_toc_box_style1(name){

  const box = '<div name="'+name+'" class="box-'+name+'" style="cursor:pointer;">'
    +'<div class="sbFooterBoxIcon d-flex align-items-center px-2 '
      +'justify-content-center" '
      +'style="float:left;width: 37px;">'
      +'<span class="align-middle box-'+name+'-icon"></span>'
    +'</div>'
    +'<div class="sbFooterBoxLabel d-flex align-items-center" '
      +'style="text-align:left;">'
      +'<span class="align-middle box-'+name+'-text"></span>'
    +'</div>'
  +'</div>';

  return box;
  
}

// 'map209-user-position',
function register_user_position(){

  console.log('register_user_position');
  localStorage.map_lat=dMap.map.stop_lat;
  localStorage.map_lng=dMap.map.stop_lng;
  localStorage.map_zoom=dMap.map.stop_zoom;

  var g=dMap.analisi01.grLyrToc;
  $.each(g,function(i, lyr){
    let o = g_meta.geovar_lyr.features
    let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
    let obj_lyr=this_obj[0].properties;
    localStorage['start_lyr_visible_'+lyr]=obj_lyr.visible;
  });//each lyr

}

dyn_functions['succ_register_user_position'] = function(r){    
  // _onsole.log('user position update');
}


// 'map211-add-map',
function m211_ready(){

  mymap = L.map('mapid',{
    minZoom: 1,
    maxZoom: 20,
    zoomControl: false,
    zoomSnap: 0.5,
    zoomDelta: 0.5,
    wheelPxPerZoomLevel: 100,
    cursor: true
  })

  add_mymap();

}

function m211_ready_2(opt){

  hide_loading2('.mapid-loading');
  prepare_loading2_plus('.mapid-loading');

  if(opt.mapLibrary=='leafletjs'){

    remove_loading2_plus('.mapid-loading');
    hide_loading2('.mapid-loading');

    if(opt.mapRotation=='disabled'){

      mymap = L.map('mapid',{
        minZoom: 1,
        maxZoom: 20,
        zoomControl: false,
        zoomSnap: 0.5,
        zoomDelta: 0.5,
        wheelPxPerZoomLevel: 100,
        cursor: true
      });
    
      add_mymap();

    }
    else if(opt.mapRotation=='enabled'){

      mymap = L.map('mapid',{
        // center: [51.505, -0.09],
        // zoom: 13,
        // layers: [esri],
        // worldCopyJump: true,
        // preferCanvas: false,
        zoomControl: false,
        rotate: true,
        rotateControl: {
          closeOnZeroBearing: false,
          // position: 'bottomleft',
        },
        bearing: 0,
        // attributionControl: false,
        // zoomControl: false,
        // compassBearing: false,
        // trackContainerMutation: false,
        // shiftKeyRotate: false,
        // touchGestures: true,
        touchRotate: true,
        // touchZoom: true    
      })

      add_mymap();      

    }
    else{
      console.log('m211_ready_2','mapRotation not supported');
      return
    }

  }
  else if(opt.mapLibrary=='mapbox'
    || opt.mapLibrary=='maplibre'){

    add_loading2_plus('load_map');

    let options = {
      container: 'mapid', // container ID
      // Choose from Mapbox's core styles, 
      // or make your own style with Mapbox Studio
      // style: 'mapbox://styles/mapbox/streets-v12', // style URL
      // center: [        
      //   -50,
      //   -50
      // ], // starting position [lng, lat]
      // zoom: 9 // starting zoom
      // pitchWithRotate: false
    }

    if(opt.mapLibrary=='mapbox'){
      mapboxgl.accessToken = MAPBOXGL_KEY;
      mymap = new mapboxgl.Map(options);
      add_mymap(); // only set coordinates on localStorage if are not set
    }
    else if(opt.mapLibrary=='maplibre'){
      mymap = new maplibregl.Map(options);
      add_mymap(); // only set coordinates on localStorage if are not set
    }
    else{
      // not happen
    }

    // add_mymap();

    if(m211_mapPitch=='3D'){
      mymap.dragRotate._mousePitch.enable();
    }
    else{
      mymap.dragRotate._mousePitch.disable();
    }


    mymap.on('load', () => {

      // _onsole.log('mapbox load',localStorage.map_lat);
      mymap.setCenter([
        parseFloat(localStorage.map_lng),
        parseFloat(localStorage.map_lat)
      ]);
      mymap.setZoom(localStorage.map_zoom);

      // _onsole.log('mapbox load',list_f_mapbox);
      list_f_mapbox.forEach(element => {
        if(dyn_functions[element]!=null){
          dyn_functions[element]();
        }
      });
      

      //--
      sessionStorage.zoomend_status = 'true';
      
      //--
      sessionStorage.zoomstart_status = 'true';      

      mapbox_load = true;

    });  

  }
  else{
    // _onsole.log('m211_ready_2','mapLibrary not supported');
    remove_loading2_plus('.mapid-loading');
    hide_loading2('.mapid-loading');
    return
  }


}

function m211_testroutingrotate_ready(){

  mymap = L.map('mapid',{
    center: [51.505, -0.09],
    zoom: 13,
    // layers: [esri],
    // worldCopyJump: true,
    // preferCanvas: false,
    rotate: true,
    rotateControl: {
      closeOnZeroBearing: false,
      // position: 'bottomleft',
    },
    bearing: 30,
    // attributionControl: false,
    // zoomControl: false,
    // compassBearing: false,
    // trackContainerMutation: false,
    // shiftKeyRotate: false,
    // touchGestures: true,
    touchRotate: true,
    // touchZoom: true
  }); // .setView([51.505, -0.09], 13);

}

function m211_mapbox1_ready(){

  mapboxgl.accessToken = MAPBOXGL_KEY;
  mymap = new mapboxgl.Map({
    container: 'mapid', // container ID
    // Choose from Mapbox's core styles, 
    // or make your own style with Mapbox Studio
    // style: 'mapbox://styles/mapbox/streets-v12', // style URL
    // center: [-74.5, 40], // starting position [lng, lat]
    // zoom: 9 // starting zoom
  });
  add_mymap();

}

function add_mymap(){

  if(localStorage.map_lat==undefined
    || localStorage.map_lng==undefined
    || localStorage.map_zoom==undefined
    || localStorage.map_lat=='NaN'
    || localStorage.map_lng=='NaN'
    || localStorage.map_zoom=='NaN') {

    localStorage.map_lat=gLang['lat_start'];
    localStorage.map_lng=gLang['lng_start'];
    localStorage.map_zoom=gLang['zoom_start'];

  }

  let item = 'map_lat';
  if(parseFloat(localStorage[item]) > 89.5
    || parseFloat(localStorage[item]) < -89.5){
    localStorage[item]=gLang['lat_start'];
  }

  item = 'map_lng';
  if(parseFloat(localStorage[item]) > 179.5
    || parseFloat(localStorage[item]) < -179.5){
    localStorage[item]=gLang['lng_start'];
  }

  item = 'map_zoom';
  if(localStorage[item]>18){
    localStorage[item]=18;
  }
  else if(localStorage[item]<1){
    localStorage[item]=1;
  }

  if(m211_mapLibrary=='leafletjs'){
    // Caricamento della mappa base
    mymap.setView([
      localStorage.map_lat,
      localStorage.map_lng
    ],
      localStorage.map_zoom
    );
    
    f_wait.mymap=1;

    //--
    sessionStorage.zoomend_status = 'true';

    mymap.on('zoomend', function() {
      if(sessionStorage.zoomend_status=='true'){
        list_zoomend.forEach(element => {
          dyn_zoomend[element]();
        });
      }
    });
    //---

    //--
    sessionStorage.zoomstart_status = 'true';

    mymap.on('zoomstart', function(e) {
      if(sessionStorage.zoomstart_status=='true'){
        list_zoomstart.forEach(element => {
          dyn_zoomstart[element]();
        });
      }
    });
    //---
  }
  else if(m211_mapLibrary=='mapbox'
    || m211_mapLibrary=='maplibre'){

    // _onsole.log('mymap',parseFloat(localStorage.map_lng));
    // _onsole.log('mymap',parseFloat(localStorage.map_lat));
    // mymap.setCenter([
    //   parseFloat(localStorage.map_lng),
    //   parseFloat(localStorage.map_lat)
    // ]);
    // _onsole.log('mymap',mymap.getCenter());
    // _onsole.log('mymap',parseFloat(localStorage.map_lng));
    // _onsole.log('mymap',parseFloat(localStorage.map_lat));    
    // mymap.setZoom(3); //localStorage.map_zoom);
    
    //--
    // sessionStorage.zoomend_status = 'true';
    
    //--
    // sessionStorage.zoomstart_status = 'true';

  }

}

// 'map215-mobile-footer',
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

// 'map217-dialog',

function create_dialog(single_content,title,dialog_slug){
  
  alertify.infoDialog || alertify.dialog('infoDialog',function(){
    return {
      main:function(single_content,title,dialog_slug){
        
        this.setHeader(title); //label_infoShopDialog_header
        this.setContent(single_content);
        
        format_autoNumeric();

        $('.ajs-modal').css('z-index','5000');

        $('.ajs-header').css('font-family','var(--wd-fonts-primary)');
        $('.ajs-footer').css('height','59px');
        $('.ajs-dialog').css('display','');
        //$('.ajs-footer').remove();
        if($(window).width() < 768) {
          //alertify.dialog('infoDialog').maximize();
        }
        else{
          //$('.ajs-dialog').css('max-width','1000px');
          //$('.ajs-modal').css('top','auto'); 
          //$('.ajs-dimmer').css('background-color','#2525256b');
          //$('.ajs-dialog').css('margin','10px auto');
        }

        var label_close_btn = gLang['label_close_btn'];

        $('.ajs-footer').html(''
          +'<!--SUBMIT-->'
          +'<div class="row row2 align-items-center" style="margin:0px;height: 50px;">'
            //+'<div class="col-3 ajs-footer-btn2" style=" text-align: center;">'
            //+'</div>'
            +'<div class="col-2 d-grid gap-2 d-flex justify-content-start">'
              +'<div class="ajs-footer-btn3"></div>'
            +'</div>'
            +'<div class="col-8 d-grid gap-2 d-flex justify-content-end" '
              +'style="text-align: center;">'
              +'<div class="ajs-footer-btn2" '
                +'style="display:inline;padding-right: 5px;width: 100%;"></div>'
            +'</div>'
            +'<div class="col-2 d-grid gap-2 d-flex justify-content-start">'
              +'<div class="ajs-footer-btn1" '
                +'style="display:inline;">'
                +'<button name="close-infoDialog" '
                  +'id="info-close" type="button" '
                  +'class="btn btn-sm btn-dark">'
                  +label_close_btn.toUpperCase()+'</button>'
              +'</div>'
            +'</div>'
          +'</div>');

        if(dialog_slug===undefined){
          
        }
        else{
          dyn_functions[dialog_slug]();
        }
        

        $('#info-close').on('click',function(){
          //log_tag_manager('info-close','','');
          alertify.infoDialog().close();
          //mymap.removeLayer(pin_address);
          //pin_address.clearLayers();
        });  

      },
      setup:function(){
        if($(window).width() < 768) {
          var mymax = true;
        }          
        else{
          var mymax = false;
        }
        return { 
          //buttons:[{text: "cool!", key:27/*Esc*/}],
          focus: { element:0 },
          options:{
            //basic:true,
            maximizable:false,
            resizable:false,
            //padding:false,
            closable:false,
            closableByDimmer:false,
            startMaximized:mymax
          }
        };
      }               
    }
  });
  alertify.infoDialog(single_content,title,dialog_slug)
    .resizeTo('100%',700)
    //.setHeader(title) //label_infoShopDialog_header
    .set('movable', false);

}

function create_dialog2(slug,dlg_type='b',single_content='',title=''){

  alertify.infoDialog || alertify.dialog('infoDialog',function(){
    return {
      main:function(slug,dlg_type,single_content,title){
        //_onsole.log('main2',slug);
        if(dlg_type=='a'){
          this.setHeader(title); //label_infoShopDialog_header
          this.setContent(single_content);
          format_autoNumeric();
        }
        else{
          this.setHeader('<div class="dlg_'+slug+'_title"></div>'); //label_infoShopDialog_header
          this.setContent('<div '
            +'db_reference="geovar_dialog" '
            +'g_slug="'+slug+'" '
            +'class="dlg_'+slug+'_body"></div>');
        }
        
        $('.ajs-modal').css('z-index','5000');

        $('.ajs-header').css('font-family','var(--wd-fonts-primary)');
        $('.ajs-footer').css('height','59px');
        $('.ajs-dialog').css('display','');

        $('.ajs-dialog').addClass('card');

        //$('.ajs-footer').remove();
        if($(window).width() < 768) {
          //alertify.dialog('infoDialog').maximize();
        }
        else{
          //$('.ajs-dialog').css('max-width','1000px');
          //$('.ajs-modal').css('top','auto'); 
          //$('.ajs-dimmer').css('background-color','#2525256b');
          //$('.ajs-dialog').css('margin','10px auto');
        }

        // $('.ajs-footer').html(''
        //   +'<!--SUBMIT-->'
        //   +'<div class="row row2 align-items-center" style="margin:0px;height: 50px;">'
        //     //+'<div class="col-3 ajs-footer-btn2" style=" text-align: center;">'
        //     //+'</div>'
        //     +'<div class="col-2 d-grid gap-2 d-flex justify-content-start">'
        //       +'<div class="ajs-footer-btn3"></div>'
        //     +'</div>'
        //     +'<div class="col-8 d-grid gap-2 d-flex justify-content-end" '
        //       +'style="text-align: center;">'
        //       +'<div class="ajs-footer-btn2" '
        //         +'style="display:inline;padding-right: 5px;width: 100%;"></div>'
        //     +'</div>'
        //     +'<div class="col-2 d-grid gap-2 d-flex justify-content-end">'
        //       +'<div class="ajs-footer-btn1" '
        //         +'style="display:inline;">'
        //         +'<div class="box-btn_closedlg"></div>'
        //       +'</div>'
        //     +'</div>'
        //   +'</div>');
        $('.ajs-footer').css('padding','0px');
        let c = ''+
          '<div class="display-table" style="width: 100%;">'+
            '<div style="height: 50px;">'+
              '<div class="tb-box-left ajs-footer-btn3" '+
                'style="width:25%;">'+
              '</div>'+
              '<div class="tb-box-center ajs-footer-btn2" '+
                'style="width:50%;">'+
              '</div>'+
              '<div class="tb-box-right ajs-footer-btn1" '+
                'style="width:25%;text-align:right;">'+
                '<div class="box-btn_closedlg"></div>'+
              '</div>'+
            '</div>'+
          '</div>'+        
        '';
        $('.ajs-footer').html(c);
        create_button('btn_closedlg');

        if(dlg_type=='a'){//old
          if(slug===undefined){
            
          }
          else{
            dyn_functions[slug]();
          }
        }
        else{
          //load_dlg_template(slug);
          dyn_functions['succ_dlg_single']();
        }

      },
      setup:function(){
        if($(window).width() < 768) {
          var mymax = true;
        }
        else{
          var mymax = false;
        }
        return { 
          //buttons:[{text: "cool!", key:27/*Esc*/}],
          focus: { element:0 },
          options:{
            //basic:true,
            maximizable:false,
            resizable:false,
            //padding:false,
            closable:false,
            closableByDimmer:false,
            startMaximized:mymax
          }
        };
      }
    }
  });
  alertify.infoDialog(slug,dlg_type,single_content,title)
    .resizeTo('100%',700)
    //.setHeader(title) //label_infoShopDialog_header
    .set({
      'movable':false,
      onclose:function(){
        
        if(dlg_close_functions[slug]===undefined){
          
        }
        else{
          dlg_close_functions[slug]();
        }
      }
    });
}

function create_dialog3(optIn){

  //slug,dlg_type='b',single_content='',title=''

  alertify.infoDialog3 || alertify.dialog('infoDialog3',function(){
    return {
      main:function(optIn){
        //slug,dlg_type,single_content,title
        //_onsole.log('main3',optIn);
        this.setHeader(''
          +'<div '
            +'class="dlg_'+optIn.dlgSlug+'_title"'
            +'>'
            +optIn.dlgTitle
          +'</div>'
        +''); //label_infoShopDialog_header

        this.setContent(''
          +'<div '
            +'class="dlg_'+optIn.dlgSlug+'_body" '
            +'db_reference="geovar_dialog" '
            +'g_slug="'+optIn.dlgSlug+'" '
            +'></div>'
        +'');

        $('.ajs-modal').css('z-index','5000');

        $('.ajs-header').css('font-family','var(--wd-fonts-primary)');
        $('.ajs-footer').css('height','59px');
        $('.ajs-dialog').css('display','');

        $('.ajs-dialog').addClass('card');

        $('.ajs-footer').html(''
          +'<!--SUBMIT-->'
          +'<div class="row row2 align-items-center" style="margin:0px;height: 50px;">'
            //+'<div class="col-3 ajs-footer-btn2" style=" text-align: center;">'
            //+'</div>'
            +'<div class="col-2 d-grid gap-2 d-flex justify-content-start">'
              +'<div class="ajs-footer-btn3"></div>'
            +'</div>'
            +'<div class="col-8 d-grid gap-2 d-flex justify-content-end" '
              +'style="text-align: center;">'
              +'<div class="ajs-footer-btn2" '
                +'style="display:inline;padding-right: 5px;width: 100%;"></div>'
            +'</div>'
            +'<div class="col-2 d-grid gap-2 d-flex justify-content-end">'
              +'<div class="ajs-footer-btn1" '
                +'style="display:inline;">'
                +'<div class="box-btn_closedlg3"></div>'
              +'</div>'
            +'</div>'
          +'</div>');

        let opt = {
          itemSlug:'btn_closedlg3',
          itemLabel: {
            "default":"CLOSE",
            "it":"CHIUDI",
            "en":"CLOSE"
          },//gLang.label_close,
          itemDescription: {"default":"..."},
          //itemLabel:'<i class="fa fa-ellipsis-h" aria-hidden="true"></i>',
          itemClass:'btn-sm btn-outline-dark', // btn-main-sidebar',
          //btnOnClick:'close',
          itemType:'button', //form-switch
          itemDisabled:false,
          itemStyle:'', //backgrund-color:red;
          g_group: ["public"],
          g_responsive: "both", //both, mobile, desktop
          //"g_callback": 'btn_save_point', // same as btnSlug
        };
        create_button_2(opt);
        //_onsole.log(optIn);
        dyn_functions[optIn.callback](optIn);

      },
      setup:function(){
        if($(window).width() < 768) {
          var mymax = true;
        }
        else{
          var mymax = false;
        }
        return { 
          //buttons:[{text: "cool!", key:27/*Esc*/}],
          focus: { element:0 },
          options:{
            //basic:true,
            maximizable:false,
            resizable:false,
            //padding:false,
            closable:false,
            closableByDimmer:false,
            startMaximized:mymax
          }
        };
      }
    }
  });
  //slug,dlg_type,single_content,title
  alertify.infoDialog3(optIn)
    .resizeTo('100%',700)
    //.setHeader(title) //label_infoShopDialog_header
    .set({
      'movable':false,
      onclose:function(){
        if(dlg_close_functions[optIn.dlgSlug]===undefined){
          
        }
        else{
          dlg_close_functions[optIn.dlgSlug]();
        }
      }
    });
}

// 'map226-dialog-template',

function load_dlg_template(slug){

  // _onsole.log('load_dlg_template');

  dataString = {}
  dataString.slug=slug;
  dataString.settings_url='/meta/geovar_dialog.json';
  dataString.settings_json=true;

  generic_api(dataString,'dlg_'+slug);

}

function load_box_template(slug){

  // _onsole.log('load_dlg_template');

  dataString = {}
  dataString.slug=slug;
  dataString.settings_url='/meta/geovar_dialog.json';
  dataString.settings_json=true;

  generic_api(dataString,'box_'+slug);

}

// DEFAULT DLG TEMPLATE

dlg_template['single_tab'] = function(g_slug){

  // _onsole.log('dlg_template:explorer_simple > '+g_slug);
  var c = '<div class="mainboxItem" style="margin-top:5px;"></div>'
    +'<div class="col-md-12 box-tab box_tab1" style="display:block;">'
      +'<div class="boxItem">'
        +'<div class="row" ' 
          +'style="padding:3px;">'
          +'<div class="col-xs-12 dlg_'+g_slug+'_tab1_ct1">'
          +'</div>'
        +'</div>'
      +'</div>'
    +'</div>'
  +'';

  $('.dlg_'+g_slug+'_body').html(c);

}

dlg_template['template_by_slug'] = function(g_slug){

  // _onsole.log('dlg_template:explorer_simple > '+g_slug);
  /*
  var c = '<div class="mainboxItem" style="margin-top:5px;"></div>'
    +'<div class="col-md-12 box-tab box_tab1" style="display:block;">'
      +'<div class="boxItem">'
        +'<div class="row" ' 
          +'style="padding:3px;">'
          +'<div class="col-xs-12 dlg_'+g_slug+'_tab1_ct1">'
          +'</div>'
        +'</div>'
      +'</div>'
    +'</div>'
  +'';

  $('.dlg_'+g_slug+'_body').html(c);
  */

}

dlg_template['single_tab_photo'] = function(g_slug){

  // _onsole.log('dlg_template:explorer_simple > '+g_slug);
  var c = '<div class="mainboxItem" style="margin-top:5px;"></div>'
    +'<div class="col-md-12 box-tab box_tab1" style="display:block;">'
      +'<div class="boxItem">'
        +'<div class="row" ' 
          +'style="padding:3px;">'
          +'<div class="col-xs-12 dlg_'+g_slug+'_tab1_ct1">'
          +'</div>'
        +'</div>'
      +'</div>'
    +'</div>'
  +'';

  $('.dlg_'+g_slug+'_body').html(c);

}

dlg_template['single_tab_input'] = function(g_slug){

  // _onsole.log('dlg_template:explorer_simple > '+g_slug);
  var c = '<div class="mainboxItem" style="margin-top:5px;"></div>'
    +'<div class="col-md-12 box-tab box_tab1" style="display:block;">'
      +'<div class="boxItem">'
        +'<div class="row" ' 
          +'style="padding:3px;">'
          +'<div class="col-xs-12 dlg_'+g_slug+'_tab1_ct1">'
          +'</div>'
        +'</div>'
      +'</div>'
    +'</div>'
  +'';

  $('.dlg_'+g_slug+'_body').html(c);

}

dlg_template['tab_x1_edit'] = function(g_slug){

  // _onsole.log('dlg_template:explorer_simple > '+g_slug);
  var c = '<div class="mainboxItem" style="margin-top:5px;"></div>'
    +'<div class="col-md-12 box-tab box_tab1" style="display:block;">'
      +'<div class="boxItem">'
        +'<div class="row" ' 
          +'style="padding:3px;">'
          +'<div class="col-xs-12 dlg_'+g_slug+'_tab1_ct1">'
          +'</div>'
        +'</div>'
      +'</div>'
    +'</div>'
  +'';

  $('.dlg_'+g_slug+'_body').html(c);

}

dlg_template['tab_x6'] = function(g_slug){

  // _onsole.log('dlg_template:explorer_simple > '+g_slug);
  var c = '<div class="mainboxItem" style="margin-top:5px;"></div>'
  +'';

  //box button tab
  c += ''
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  //box button tab -end

  c += '<div class="row row3">'
    +'<div class="col-md-6 col-btn-attrs" style=" text-align: center;">'
      +'<button id="tab1" class="btn btn-tab btn-tab1 btn-sm btn-serie btn-serie-current" '
        +'style="padding:5px 5px;"></button>'
      +'<button id="tab2" class="btn btn-tab btn-tab2 btn-sm btn-serie btn-serie-other" '
        +'style="padding:5px 5px;"></button>'
      +'<button id="tab3" class="btn btn-tab btn-tab3 btn-sm btn-serie btn-serie-other" '
        +'style="padding:5px 5px;"></button>'
      +'<button id="tab4" class="btn btn-tab btn-tab4 btn-sm btn-serie btn-serie-other" '
        +'style="padding:5px 5px;"></button>'
      +'<button id="tab5" class="btn btn-tab btn-tab5 btn-sm btn-serie btn-serie-other" '
        +'style="padding:5px 5px;display:none;"></button>'
      +'<button id="tab6" class="btn btn-tab btn-tab6 btn-sm btn-serie btn-serie-other" '
        +'style="padding:5px 5px;display:none;"></button>'
    +'</div>'
    +'<div class="col-md-6 col-btn-tools" style=" text-align: center;">'
      +'<button id="tool1" class="btn btn-tool1 btn-sm btn-serie btn-serie-tool" '
        +'style="padding:5px 5px;"></button>'
      +'<button id="tool2" class="btn btn-tab btn-tool2 btn-sm btn-serie btn-serie-tool" '
        +'style="padding:5px 5px;"></button>'
      +'<button id="tool3" class="btn btn-tab btn-tool3 btn-sm btn-serie btn-serie-tool" '
        +'style="padding:5px 5px;"></button>'  
      +'<div class="clearfix"></div>'
    +'</div>'
  +'</div>';

  //box tab1
  c += '<div '
    +'class="dlg_panel panel-tab1" '
    +'style="display:block;font-family:var(--wd-fonts-secondary);">'
    +'';

  c += '</div><!--tab1-->'; 

  //box tab2
  c += '<div '
    +'class="dlg_panel panel-tab2" '
    +'style="display:none;font-family:var(--wd-fonts-secondary);">'
    +'';
  c += '</div><!--tab2-->'; 

  //box tab3
  c += '<div '
    +'class="dlg_panel panel-tab3" '
    +'style="display:none;font-family:var(--wd-fonts-secondary);">'
    +'';
  c += '</div><!--tab3-->';

  //box tab4
  c += '<div '
    +'class="dlg_panel panel-tab4" '
    +'style="display:none;font-family:var(--wd-fonts-secondary);">'
    +'';
  c += '</div><!--tab4-->'; 

  //box tab5
  c += '<div '
    +'class="dlg_panel panel-tab5" '
    +'style="display:none;font-family:var(--wd-fonts-secondary);">'
    +'';
  c += '</div><!--tab5-->'; 

  //box tab6
  c += '<div '
    +'class="dlg_panel panel-tab6" '
    +'style="display:none;font-family:var(--wd-fonts-secondary);">'
    +'';
  c += '</div><!--tab6-->'; 

  c += '<div class="req_msg" style="display:none;"><span style="color:red;">'
    +gLang.label_form_all_required+'</span></div>'

  $('.dlg_'+g_slug+'_body').html(c);

}

// ADDON DLG TEMPLATE

// dlg_template['explorer_simple'] = function(g_slug){

//   // _onsole.log('dlg_template:explorer_simple > '+g_slug);
//   $('.dlg_'+g_slug+'_body').html('Aaa');

// }

// 'map227-dialog-body',

dyn_functions['succ_dlg_single'] = function(){
  var r = g_meta['geovar_dialog'];
  var lyr=sessionStorage.this_dialog_lyr;
  var slug=sessionStorage.this_dialog_slug;
  // _onsole.log('succ_dlg_lyr035_single');
  // _onsole.log(r);
  var this_dlg_p=[];
  r.features.forEach(element => {
    var dlg_p = element.properties;
    if(dlg_p.g_slug==slug){
      this_dlg_p=dlg_p;
    }
  });

  $('.dlg_'+this_dlg_p.g_slug+'_title').html(this_dlg_p.g_label);
  // _onsole.log(this_dlg_p.g_template);

  $('.dlg_'+this_dlg_p.g_slug+'_body').attr('g_template',this_dlg_p.g_template);

  dlg_template[this_dlg_p.g_template](this_dlg_p.g_slug);

  //--

  if(this_dlg_p.g_template=='template_by_slug'){

    dyn_functions['template_by_slug_'+slug]();
    return;

  }

  if(this_dlg_p.g_template=='single_tab'){

    let o = g_meta.geovar_lyr.features
    let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
    let obj_lyr=this_obj[0].properties;

    var r = obj_lyr.last_r;
    var f = r.features[0];

    if(f.properties){
      var p = f.properties;
      var foo = Object.keys(p);
    }
    // _onsole.log(p)
    // _onsole.log(foo)
    //return
    //--

    foo.forEach((foo_el) => {
      $('.dlg_'+slug+'_tab1_ct1').append(foo_el+': '+p[foo_el]+'<br>');
    });
  }
  else if(this_dlg_p.g_template=='single_tab_input'){

    let o = g_meta.geovar_lyr.features

    //_onsole.log(o);
    //_onsole.log('single_tab_input',lyr);
    let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
    let obj_lyr=this_obj[0].properties;

    var r = obj_lyr.last_r;
    var table_schema = r.features[0];
    // _onsole.log(table_schema)

    //--

    table_schema.forEach((col_obj) => {

      var col_prop = col_obj.properties;

      var field_prop = {}

      if(col_prop.g_preview==1){

        // _onsole.log(p[col_prop.g_slug]);
        // _onsole.log(p);

        if(col_prop.g_callback=='none'){

          field_prop.placeholder=col_prop.g_placeholder;
          field_prop.disabled='';

          field_prop.required=col_required(col_prop)[0];
          field_prop.required_label=col_required(col_prop)[1];

          field_prop.type=col_format(col_prop);

          var html = append_field_label(col_prop,field_prop);
          $('.dlg_'+slug+'_tab1_ct1').append(html);

          if( col_prop.g_options ) {

            // _onsole.log(col_prop.g_slug +' > ' + 'have options')

            var html = append_options_field(col_prop,field_prop);
            $('.group-'+col_prop.g_slug).append(html);

            if(field_prop.required=='0'){
              //$('#input-'+col_prop.g_slug).append($('<option>', { 
              //  value: '',
              //  text : '--Leave blank or select an option'
              //}));

              var o = new Option('--Leave blank or select an option', '');
              //o.selected=true;
              $('#input-'+col_prop.g_slug).append(o);

            }
            col_prop.g_options.forEach(element => {

              //$('#input-'+col_prop.g_slug).append($('<option>', { 
              //    value: element.slug,
              //    text : element.name
              //}));

              var o = new Option(element.name,element.slug);
              //if(element.slug==p[col_prop.g_slug]){
              //  o.selected=true;
              //}
              $('#input-'+col_prop.g_slug).append(o);
            });

          }
          else{
            var html = append_simple_field(col_prop,field_prop,p);
            $('.group-'+col_prop.g_slug).append(html);
          }

          var html = append_field_description(col_prop);
          $('.group-'+col_prop.g_slug).append(html);

        }
        else{
          $('.dlg_'+slug+'_tab1_ct1').append(''
            +'<div class="form-group group-'+col_prop.g_slug+'">'
            +'</div>'
          +'');
          dlg_field_template[col_prop.g_callback](slug,col_prop.g_slug);
        }
      }
    });

    $('.ajs-footer-btn2').append(''
      +'&nbsp;<div class="box-btn_savedlg"></div>'
      +''
    +'');
    create_button('btn_savedlg');

  }//single_tab_input
  else if(this_dlg_p.g_template=='single_tab_photo'){

    let o = g_meta.geovar_lyr.features
    let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
    let obj_lyr=this_obj[0].properties;

    var r = obj_lyr.last_r;
    var f = r.features[0];

    if(f.properties){
      var p = f.properties;
      var foo = Object.keys(p);
    }
    // _onsole.log(p)
    // _onsole.log(foo)
    //return
    //--

    // _onsole.log(f)
    let or_sess = g_meta.geovar_lyr.features
    let this_objr_sess=or_sess.filter(({properties}) => properties.g_slug === sessionStorage.this_dialog_lyr);
    let obj_lyr_sess=this_objr_sess[0].properties;

    var table_slug=obj_lyr_sess.g_tables[0];
    g_meta.geovar_map_tb.forEach(obj => {
      // _onsole.log(obj.name)
      if(obj.name==table_slug){
        this_tb[table_slug]=obj.features;
      }
    });

    var image_url='';

    if(p.image_url==null){
      image_url='./default_image.jpg';
    }
    else{
      image_url=p.image_url;
    }

    $('.dlg_'+slug+'_tab1_ct1').html(''
      +'<div class="row-x" style="margin:0px;">'
        +'<div class="col-x ct-image" style="padding:0px;float:left;width:30%;height:120px;">'
          //+'<img src="'+image_url+'" />'
        +'</div>'
        +'<div class="col-x" style="float:right;width:70%;padding-left: 5px;">'
          +'<table class="table table_'+slug+'_tab1_ct1">'
          +'</table>'
        +'</div>'
      +'</div>'
    +'');
    $('.ct-image').css('background','url(\''+image_url+'\')');
    $('.ct-image').css('background-size','150px auto');
    //$('.col-x > img').css('width','100%');
    //$('.col-x > img').css('height','auto');

    foo.forEach((foo_el) => {

      var label='';
      // _onsole.log(table_slug)
      this_tb[table_slug].forEach(obj_tb => {
        var p_tb=obj_tb.properties;
        if(p_tb.g_slug==foo_el){
          label=p_tb.g_label;
        }
      });

      var string='';
      if(foo_el!='image_url'){
        if(p[foo_el]==null){
          string='-';
        }
        else{
          string='<b>'+p[foo_el]+'</b>';
        }
        $('.table_'+slug+'_tab1_ct1').append('<tr>'
          +'<td>'+label+'</td>'
          +'<td style="text-align:right;">'+string+'</td>'
        +'</tr>');
      }
    });
  }//single_tab_photo
  else if(this_dlg_p.g_template=='tab_x1_edit'){

    let o = g_meta.geovar_lyr.features
    let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
    let obj_lyr=this_obj[0].properties;

    var r = obj_lyr.last_r;
    var table_schema = obj_lyr.table_schema.features[0];
    var p = obj_lyr.last_r.features[0].properties;

    //--

    table_schema.forEach((col_obj) => {

      var col_prop = col_obj.properties;

      var field_prop = {}

      if(col_prop.g_preview==1){

        // _onsole.log(p[col_prop.g_slug]);
        // _onsole.log(p);

        if(col_prop.g_callback=='none'){

          field_prop.placeholder=col_prop.g_placeholder;
          field_prop.disabled='';

          field_prop.required=col_required(col_prop)[0];
          field_prop.required_label=col_required(col_prop)[1];

          //format
          field_prop.type=col_format(col_prop);

          var html = append_field_label(col_prop,field_prop);
          $('.dlg_'+slug+'_tab1_ct1').append(html);

          if( col_prop.g_options ) {

            // _onsole.log(col_prop.g_slug +' > ' + 'have options')

            var html = append_options_field(col_prop,field_prop);
            $('.group-'+col_prop.g_slug).append(html);

            if(field_prop.required=='0'){
              //$('#input-'+col_prop.g_slug).append($('<option>', { 
              //  value: '',
              //  text : '--Leave blank or select an option'
              //}));

              var o = new Option('--Leave blank or select an option', '');
              //o.selected=true;
              $('#input-'+col_prop.g_slug).append(o);

            }
            col_prop.g_options.forEach(element => {

              //$('#input-'+col_prop.g_slug).append($('<option>', { 
              //    value: element.slug,
              //    text : element.name
              //}));

              var o = new Option(element.name,element.slug);
              if(element.slug==p[col_prop.g_slug]){
                o.selected=true;
              }
              $('#input-'+col_prop.g_slug).append(o);
            });

          }
          else{
            var html = append_simple_field(col_prop,field_prop,p);
            $('.group-'+col_prop.g_slug).append(html);
          }

          var html = append_field_description(col_prop);
          $('.group-'+col_prop.g_slug).append(html);

        }
        else{
          $('.dlg_'+slug+'_tab1_ct1').append(''
            +'<div class="form-group group-'+col_prop.g_slug+'">'
            +'</div>'
          +'');
          dlg_field_template[col_prop.g_callback](slug,col_prop.g_slug);
        }
      }
    });

    //$('.ajs-footer-btn2').append(''
    //  +'&nbsp;<div class="box-btn_savedlg"></div>'
    //  +''
    //+'');
    //create_button('savedlg');

    $('.ajs-footer-btn2').append(''
      +'<span class="box-btn_savedlg"></span>'
      +'<span class="box-btn_canceldlg_edit" style="margin-left:5px;"></span>'
    +'');

    create_button('btn_savedlg');
    create_button('btn_canceldlg_edit');

  }//tab_x1_edit

}

dlg_field_template['field_image'] = function(main_slug,slug){

  // _onsole.log('dlg_field_template:field_image > '+main_slug+' > '+slug)
    //dlg_field_template:field_image > vlyr007_single > 

  //$('.group-'+slug).html('<button class="submit_photo" main="'+main_slug+'">'+slug+'</button>');
  $('.group-'+slug).html(''
    +'<div class="mb-3 ct-field-file" style="text-align:center;">'
      //+'<label for="control-file" class="form-label">Default file input example</label>'
      +'<input '
        +'type="file" '
        +'id="control-file" '
        +'class="form-control ext-control-'+slug+'" '
        +'style="display:none;" '
        +'slug="'+slug+'" '
        +'placeholder="" '
        +'aria-describedby="emailHelp">'
      +'<button type="button" '
        +'style="width:100%;" '
        +'class="btn fake-control-file bt-sm btn-outline-dark">'
        +'<i class="fa fa-camera" aria-hidden="true"></i>'
      +'</button>'
    +'</div>'
  +'');

  $('.fake-control-file').on('click',function() {
    document.getElementById('control-file').click();
  });

  $('.ext-control-'+slug).on('change', function () {
    var file = this.files[0];

    //_lert('max upload size is' + file.size);
    var formData = new FormData();
    formData.append('fn_group','geodata');
    formData.append('action','modify_data');
    formData.append('collection','wp_upload');
    formData.append('qy_name','A');
    formData.append('lyr',main_slug);
    formData.append('main_slug',main_slug);
    formData.append('slug',slug);
    //formData.append('USER_LICENSE',USER_LICENSE);
    formData.append('rawFile',$(this)[0].files[0]);
    //var formData = new FormData($('#myForm_tab1'));
    var dataString = formData;
    dataString.postdata=true;
    generic_api(dataString,'upload_image');

  });

}

dyn_functions['succ_upload_image'] = function(r){

  // _onsole.log(r);
  var ds=r.ds;
  var f = r.features[0];
  var p = f.properties;
  $('.ct-field-file').html(''
    +'<div class="row-x" style="margin:0px;">'
      +'<div class="col-x" style="padding:0px;float:left;width:30%;">'
        +p.photo_thumbnail
      +'</div>'
      +'<div class="col-x" style="float:right;width:70%;">'
        +'<table class="table">'
          //+'<tr><td>FILENAME</td><td>'+p.photo_filename+'</td></tr>'
          +'<tr><td>WIDTH</td><td style="text-align:right;">'+p.photo_width+'</td></tr>'
          +'<tr><td>HEIGHT</td><td style="text-align:right;">'+p.photo_height+'</td></tr>'
          +'<tr><td>SIZE</td><td style="text-align:right;">'+p.photo_filesize+'</td></tr>'
        +'</table>'
        +'<div style="padding: 0rem 0.5rem;">'
          +'<input type="text" '
            +'disabled '
            +'id="input-'+ds.slug+'" '
            +'class="form-control control-'+ds.main_slug+'" '
            +'slug="'+ds.slug+'" '
            +'placeholder="" '
            +'value="'+p.photo_url+'"'
            +'aria-describedby="emailHelp">'
        +'</div>'
      +'</div>'
    +'</div>'
  +'');
  $('.col-x > img').css('width','100%');
  $('.col-x > img').css('height','auto');


  /*
  $('.dlg_'+ds.main_slug+'_tab1_ct1').append(''
    +'<div class="form-group group-'+ds.slug+'">'
      +'<label for="exampleInputEmail1">'+ds.slug+'</label>'
      +'<input type="text" '
          +'disabled '
          +'id="input-'+ds.slug+'" '
          +'class="form-control control-'+ds.main_slug+'" '
          +'slug="'+ds.slug+'" '
          +'placeholder="" '
          +'value="'+p.photo_url+'"'
          +'aria-describedby="emailHelp">'
      +'<small id="emailHelp" class="form-text text-muted">We\'ll never share your email with anyone else.</small>'
    +'</div>'
  +'');
  */

}


dlg_field_template['field_offerta'] = function(lyr,col_prop,field_prop){

  //_onsole.log(main_slug)
  //_console.log(slug)
  //let slug = col_prop.g_slug

  //field_prop.disabled='';

  let html = append_options_field(col_prop,field_prop);
  $('.form_'+lyr +' > .group-'+col_prop.g_slug).append(html);

  //if(field_prop.required=='0'){
    //$('#input-'+col_prop.g_slug).append($('<option>', { 
    //  value: '',
    //  text : '--Leave blank or select an option'
    //}));

    let o = new Option('-- Seleziona una Offerta', '');
    //o.selected=true;
    $('.form_'+lyr +' > .group-'+col_prop.g_slug +' > .control-'+col_prop.g_slug)
      .append(o);
  //}
  /*col_prop.g_options.forEach(element => {

    //$('#input-'+col_prop.g_slug).append($('<option>', { 
    //    value: element.slug,
    //    text : element.name
    //}));

    var o = new Option(element.name,element.slug);
    //if(element.slug==p[col_prop.g_slug]){
    //  o.selected=true;
    //}
    $('#input-'+col_prop.g_slug).append(o);
  });*/

  add_list_offerta(lyr);

}

dlg_field_template['field_prodotto'] = function(lyr,col_prop,field_prop){

  //_onsole.log(main_slug)
  //_console.log(slug)
  //let slug = col_prop.g_slug

  //field_prop.disabled='';

  let html = append_options_field(col_prop,field_prop);
  $('.form_'+lyr +' > .group-'+col_prop.g_slug).append(html);

  //if(field_prop.required=='0'){
    //$('#input-'+col_prop.g_slug).append($('<option>', { 
    //  value: '',
    //  text : '--Leave blank or select an option'
    //}));

    let o = new Option('-- Seleziona un Prodotto', '');
    //o.selected=true;
    //$('#input-'+col_prop.g_slug).append(o);
    $('.form_'+lyr +' > .group-'+col_prop.g_slug +' > .control-'+col_prop.g_slug)
      .append(o);

  //}
  /*col_prop.g_options.forEach(element => {

    //$('#input-'+col_prop.g_slug).append($('<option>', { 
    //    value: element.slug,
    //    text : element.name
    //}));

    var o = new Option(element.name,element.slug);
    //if(element.slug==p[col_prop.g_slug]){
    //  o.selected=true;
    //}
    $('#input-'+col_prop.g_slug).append(o);
  });*/

  //$('.group-'+col_prop.g_slug).append('<div class="offerta-box" style="padding: 7px;"></div>');
  //$('.group-'+col_prop.g_slug).append('<div class="licenza-box" style="padding: 7px;"></div>');

  add_list_prodotto(lyr);
}

dlg_field_template['field_speciale'] = function(lyr,col_prop,field_prop){

  let p = new Array();

  if(ai.model=='modify'){
    p = this_lyr[lyr].last_r.features[0].properties;
    if(p.datafattura!=''){

      $('.form_'+lyr +' > .group-'+col_prop.g_slug).remove();
    }

  }

  $('.form_'+lyr +' > .group-'+col_prop.g_slug).append(''
    +'<div class="clearfix"></div>'
    +'<div class="control-main-'+col_prop.g_slug +'" style="width:50%;float:left;"></div>'
    +'<div class="control-sub-'+col_prop.g_slug +'" style="width:50%;float: right;padding-left:10px;"></div>'
    +'<div class="clearfix"></div>'
  +'');

  html = append_options_field(col_prop,field_prop);
  $('.form_'+lyr +' > .group-'+col_prop.g_slug + ' > .control-main-'+col_prop.g_slug).append(html)
  $('.form_'+lyr +' > .group-'+col_prop.g_slug + ' > .control-main-'+col_prop.g_slug +' > .control-'+col_prop.g_slug).attr('lyr',lyr);

  //if(field_prop.required=='0'){
  //  var o = new Option('--Leave blank or select an option', '');
  //  $('.form_'+lyr +' > .group-'+col_prop.g_slug + ' > .control-main-'+col_prop.g_slug +' > .control-'+col_prop.g_slug)
  //    .append(o);
  //}
  col_prop.g_options.forEach(element => {
    if(parseInt(element.slug)==0){
      var o = new Option(element.name,element.slug, true, true);
    }
    else{
      var o = new Option(element.name,element.slug);
    }
    
    $('.form_'+lyr +' > .group-'+col_prop.g_slug + ' > .control-main-'+col_prop.g_slug +' > .control-'+col_prop.g_slug)
      .append(o);
  });

  //--

  col_prop.g_slug='numerofattura-speciale';
  field_prop.type='character varying';
  html = append_simple_field(col_prop,field_prop/*,p*/);
  $('.form_'+lyr +' > .group-speciale' + ' > .control-sub-speciale').append(html)
  $('.form_'+lyr +' > .group-speciale' + ' > .control-sub-speciale > .control-'+col_prop.g_slug).attr('lyr',lyr);
  $('.control-'+col_prop.g_slug).filter('[lyr=lyr_cicloattivo_a]').prop('disabled',true);

  $('.control-speciale').filter('[lyr=lyr_cicloattivo_a]').on('change', function() {

    if(parseInt($(this).val())==0){//No
      $('.control-'+col_prop.g_slug).filter('[lyr=lyr_cicloattivo_a]').prop('disabled',true);
      $('.control-'+col_prop.g_slug).filter('[lyr=lyr_cicloattivo_a]').attr('required','0');
    }
    else{
      $('.control-'+col_prop.g_slug).filter('[lyr=lyr_cicloattivo_a]').prop('disabled',false);
      $('.control-'+col_prop.g_slug).filter('[lyr=lyr_cicloattivo_a]').attr('required','1');
    }

  });

}

dlg_field_template['field_datafattura'] = function(lyr,col_prop,field_prop){

  let p = new Array();

  if(ai.model=='modify'){
    p = this_lyr[lyr].last_r.features[0].properties;
    if(p.datafattura!='' && p.datafattura!=null){

      $('.form_'+lyr +' > .group-'+col_prop.g_slug).html(''
        +'Data emissione fattura: '+p.datafattura+' (Non modificabile)'
      +'');
      return;
    }

  }

  //--simple field
  html = append_simple_field(col_prop,field_prop,p);
  $('.form_'+lyr +' > .group-'+col_prop.g_slug).append(html);

  if(col_prop.g_type=='timestamp without time zone'){
    $('.form_'+lyr +' > .group-'+col_prop.g_slug +' > .control-'+col_prop.g_slug)
      .datepicker({dateFormat:'dd/mm/yy'});
  }
  //--

}

// 'map235-dialog-body-support',

function objField_omnivore(optIn){

  //_onsole.log(  'objField_omnivore'  ,optIn ) ;

  let pCol = optIn.pCol;
  let objItem = optIn.objItem;

  //_onsole.log('objField_omnivore')

  if(pCol.input_type===false){
    let html = objItem[pCol.g_slug]
    $('#group-'+pCol.g_slug).append(html);
  } // input_type === false
  else{
    if(pCol.g_callback!=null
      && pCol.g_callback!='none'){
  
  
      //-- CREATE FORM GROUP AND LABEL
      opt = {
        "ct_slug": pCol.g_slug,//optIn.ct_slug,
        "pCol": pCol,
        "objItem": objItem,
      }
      dlg_field_template[pCol.g_callback](opt);
    }
    else{    //callback none
      if( pCol.g_options ) {
      
        //_onsole.log(optIn)
        //-- CREATE INPUT SELECT
        opt = {
          "slug": pCol.g_slug,
          "params_control": true,
          "pCol": pCol,
        }
        $('#group-'+pCol.g_slug).append(''
          +append_options_field_2(opt)
        +'');
        //-- APPEND BLANK OPTION
        if(pCol.blank_option!=undefined){
          $('#input-'+pCol.g_slug).append($('<option>', { 
            value: 'null',
            text : pCol.blank_option
          }));
        }
        else{
          append_leaveblank_option(pCol.g_slug);
        }
        
        let selected = false;
        pCol.g_options.forEach(el4 => {
    
          //_onsole.log('a',el4);
    
          if (typeof el4 === 'object'){
            el4Val = el4.val;
            el4Text = el4.text;
          }
          else{
            el4Val = el4;
            el4Text = el4;
          }
    
          if(el4Val == objItem[pCol.g_slug]){
            selected = true;
            selOpt = new Option(el4Text,el4Val, false, true);
            $('#input-'+pCol.g_slug).append(selOpt);
          }
          else{
            selOpt = new Option(el4Text,el4Val, false, false);
            $('#input-'+pCol.g_slug).append(selOpt);
          }
    
    
        });
    
      }
      else{
    
        if(pCol.data_type==='json'){
          //-- CREATE INPUT TEXT AREA
          opt = {
            "slug": pCol.g_slug,
            "params_control": true,
            "pCol": pCol,
            "objItem": objItem,
          }
          html = append_textarea_field(opt);
    
        }
        else{
          //-- CREATE INPUT TEXT
          opt = {
            "slug": pCol.g_slug,
            "params_control": true,
            "pCol": pCol,
            "objItem": objItem,
          }
          html = append_simple_field_2(opt);
        }
    
        $('#group-'+pCol.g_slug).append(html);
    
      }    
    }
  } // input_type != false


}

function objField_omnivore_viewOnly(optIn){


  let pCol = optIn.pCol;
  let objItem = optIn.objItem;

  let valItem = objItem[pCol.g_slug]

  if(pCol.data_type==='json'){
    //-- CREATE INPUT TEXT AREA
    // opt = {
    //   "slug": pCol.g_slug,
    //   "params_control": true,
    //   "pCol": pCol,
    //   "objItem": objItem,
    // }
    html = JSON.stringify(valItem);

  }
  else{
    //-- CREATE INPUT TEXT
    // opt = {
    //   "slug": pCol.g_slug,
    //   "params_control": true,
    //   "pCol": pCol,
    //   "objItem": objItem,
    // }

    if( pCol.g_options ) {

      pCol.g_options.forEach(el4 => {
        if (typeof el4 === 'object'){
          if(el4.val == valItem){
            valItem = el4.text;
          }
        }
      });

    }

    html = valItem;
  }
  //_onsole.log('html',html)
  $('#group-'+pCol.g_slug).append(html);



}

function append_field_label(col_prop,field_prop){

  let required_label='';
  if(field_prop.required_label!=undefined){
    required_label=field_prop.required_label;
  }

  var innerHtml = ''
    +'<div '
        +'id="group-'+col_prop.g_slug+'" '
        +'class="form-group group-'+col_prop.g_slug+'">'
      +'<label for="exampleInputEmail1">'
        +col_prop.g_label
        +required_label
      +'</label>'
    +'</div>'
  +'';

  return `
    ${innerHtml}
  `;
}

function append_field_label_2(opt){

  let required_label='';
  let label='';

  let display_label = 'display:block;';
  if(opt.label===false || opt.label==undefined){
    display_label = 'display:none;';
  }

  if(opt.pCol == undefined || opt.pCol.length==0){
    //_onsole.log('cols empty')
    label=opt.label;
  }
  else{
    //_onsole.log('cols not empty')
    //_onsole.log(opt.objCol)
    if(opt.pCol.g_required!=undefined
      && opt.pCol.g_required===1){
      required_label=' *';
    }
    if(opt.pCol.g_label!=undefined){
      label=opt.pCol.g_label;
    }
    else{
      label=opt.label;
    }
  }

  let innerHtml = ''
    +'<div '
        +'id="group-'+opt.slug+'" '
        +'class="form-group group-'+opt.slug+'">'
      +'<label for="exampleInputEmail1" '
        +'style="'
          +'text-transform: capitalize;'
          +'font-size: 75%;'
          +'margin-left: 3px;'
          +'margin-bottom: 6px;'
          +display_label
          +'">'
        +label
        +required_label
      +'</label>'
    +'</div>'
  +'';

  return `
    ${innerHtml}
  `;
}

function col_format(col_prop){
  if(col_prop.g_format=='integer'
    || col_prop.g_format=='double precision'){
    var type='number';
  }
  else{
    var type='text';
  }

  return type;
}

function col_required(col_prop){

  var required='0';
  var required_label='';

  if(col_prop.g_required==1){
    required='1';
    required_label=' *';
  }

  var req = [required,required_label];

  return req;
}

function append_field_description(col_prop){

  if(col_prop.g_description!=null && col_prop.g_description!='none'){
    var innerHtml = ''
      +'<small id="emailHelp" class="form-text text-muted">'
        +col_prop.g_description
      +'</small>'
    +'';
  }
  else{
    var innerHtml = '';
  }

  return `
    ${innerHtml}
  `;

}

function append_simple_field(col_prop,field_prop,p=new Array()){

  let ct_slug='';
  if(col_prop.ct_slug!=undefined){
    ct_slug=col_prop.ct_slug;
  }
  else{
    ct_slug=sessionStorage.this_dialog_slug;
  }

  let params_control = 'params-control';
  if(col_prop.params_control===false){
    params_control='';
  }

  var my_value ='';
  if(p[col_prop.g_slug]){
    my_value = p[col_prop.g_slug];
  }

  var innerHtml = ''
    +'<input type="'+field_prop.type+'" '
      +'value="'+my_value+'" '
      +'id="input-'+col_prop.g_slug+'" '
      +'class="form-control '
        +params_control+' '
        +'control-'+ct_slug+'" '
      +'slug="'+col_prop.g_slug+'" '
      +'placeholder="'+field_prop.placeholder+'" '
      +''+field_prop.disabled+' '
      +'required="'+field_prop.required+'" '
      +'aria-describedby="emailHelp">'
  +'';

  return `
    ${innerHtml}
  `;
}

function append_simple_field_2(opt){
  //_onsole.log(opt.slug)
  let slug='';
  if(opt.slug!=undefined){
    slug=opt.slug;
  }
  else{
    slug=sessionStorage.this_dialog_slug;
  }

  let params_control = 'params-control';
  if(opt.params_control===false){
    params_control='';
  }

  let valItem ='';
  if(opt.objItem[slug]){

    valItem = opt.objItem[slug];

  }

  let disabled='';
  let required='';
  let placeholder='';

  if(opt.pCol == undefined || opt.pCol.length==0){
    //_onsole.log('cols empty')
    //label=opt.label;
  }
  else{
    //_onsole.log('cols not empty')
    // if(opt.pCol.disabled!=undefined){
    //   disabled=field_prop.disabled;
    // }

    if(opt.pCol.form_type=='unique'){
      disabled='disabled';
    }
    else{
      placeholder=opt.pCol.g_placeholder;
    }

    if(opt.pCol.g_required!=undefined){
      required='required="'+opt.pCol.g_required+'"';
    }

  }

  let input_data_type = 'text';

  if(opt.pCol.data_type=='number'
    || opt.pCol.data_type=='integer'
    || opt.pCol.data_type=='double precision'){
    input_data_type = 'number';
  }

  let innerHtml = ''
    +'<input type="'+input_data_type+'" '
      +'value="'+valItem+'" '
      +'id="input-'+slug+'" '
      +'class="form-control '
        +params_control+' '
        +'control-'+slug+'" '
      +'slug="'+slug+'" '
      +'field_slug="'+slug+'" '
      +'placeholder="'+placeholder+'" '
      +''+disabled+' '
      +'required="'+required+'" '
      +'aria-describedby="emailHelp">'
  +'';

  //_onsole.log(slug)
  //_onsole.log(innerHtml)

  return `
    ${innerHtml}
  `;
}

function append_textarea_field(opt){

  let slug='';
  if(opt.slug!=undefined){
    slug=opt.slug;
  }
  else{
    slug=sessionStorage.this_dialog_slug;
  }

  let params_control = 'params-control';
  if(opt.params_control===false){
    params_control='';
  }

  let valItem ='';
  let disabled='';
  let required='';
  let placeholder='';

  if(opt.pCol == undefined || opt.pCol.length==0){
    //_onsole.log('cols empty')
    //label=opt.label;
  }
  else{
    //_onsole.log('cols not empty')
    // if(opt.pCol.disabled!=undefined){
    //   disabled=field_prop.disabled;
    // }

    if(opt.pCol.form_type=='unique'){
      disabled='disabled';
    }
    else{
      placeholder=opt.pCol.g_placeholder;
    }

    if(opt.pCol.g_required!=undefined){
      required='required="'+opt.pCol.g_required+'"';
    }

  }

  if(opt.objItem[slug]){

    valItem = opt.objItem[slug];

    if(opt.pCol != undefined && opt.pCol.length!=0){
      //let valItem = objItem[pCol.g_slug];
      if(opt.pCol.data_type=='json'){
        valItem = JSON.stringify(valItem);
        // let tmp = [placeholder];
        // placeholder = JSON.stringify(tmp);
      }
    }
  }

  var innerHtml = ''
    +'<textarea rows="5" '
      +'id="input-'+slug+'" '
      +'class="form-control '
        +params_control+' '
        +'control-'+slug+'" '
      +'slug="'+slug+'" '
      +'field_slug="'+slug+'" '
      +'placeholder="'+placeholder+'" '
      +''+disabled+' '
      +'required="'+required+'" '
      +'>'+valItem+'</textarea>'
  +'';

  return `
    ${innerHtml}
  `;
}

function append_options_field(col_prop,field_prop){

  let ct_slug='';
  if(col_prop.ct_slug!=undefined){
    ct_slug=col_prop.ct_slug;
  }
  else{
    ct_slug=sessionStorage.this_dialog_slug;
  }
  
  let params_control = 'params-control';
  if(col_prop.params_control===false){
    params_control='';
  }

  let disabled='';
  if(field_prop.disabled!=undefined){
    disabled=field_prop.disabled;
  }

  let required='';
  if(field_prop.required!=undefined){
    required='required="'+field_prop.required+'"';
  }

  var innerHtml = ''
    +'<select '
      +'id="input-'+col_prop.g_slug+'" '
      +'class="form-select '
        +'input-'+col_prop.g_slug+'" '
        +params_control+' '
        +'control-'+ct_slug+''
        +'" '
      +'aria-label="Default select example" '
      +'slug="'+col_prop.g_slug+'" '
      +field_prop.disabled+' '
      +required+' '
      +'>'
    +'</select>'

  return `
    ${innerHtml}
  `;
}

function append_options_field_2(opt){


  let slug='';
  if(opt.slug!=undefined){
    slug=opt.slug;
  }
  else{
    slug=sessionStorage.this_dialog_slug;
  }
  
  let params_control = 'params-control';
  if(opt.params_control===false){
    params_control='';
  }

  let disabled='';
  let required='';
  let placeholder='';

  if(opt.pCol == undefined || opt.pCol.length==0){
    //_onsole.log('cols empty')
    //label=opt.label;
  }
  else{
    //_onsole.log('cols not empty')
    // if(opt.pCol.disabled!=undefined){
    //   disabled=field_prop.disabled;
    // }

    if(opt.pCol.form_type=='unique'){
      disabled='disabled';
    }
    else{
      placeholder=opt.pCol.g_placeholder;
    }

    if(opt.pCol.g_required!=undefined){
      required='required="'+opt.pCol.g_required+'"';
    }

  }

  var innerHtml = ''
    +'<select '
      +'id="input-'+slug+'" '
      +'class="form-select '
        +'input-'+slug+' '
        +params_control+' '
        +'control-'+slug+''
        +'" '
      +'aria-label="Default select example" '
      +'slug="'+slug+'" '
      +'field_slug="'+slug+'" '
      +disabled+' '
      +required+' '
      +'>'
    +'</select>'

  return `
    ${innerHtml}
  `;
}

function append_style_container(col_prop,field_prop,p=new Array()){

  var slug=sessionStorage.this_dialog_slug;

  if(col_prop.g_dlg_style=='title'){
    var innerHtml = ''
      +'<div '
        +'slug="'+col_prop.g_slug+'" '
        +'class="ct-label-'+col_prop.g_slug+'">'
      +'</div>'
      +'<div '
        +'slug="'+col_prop.g_slug+'" '
        +'class="ct-value-'+col_prop.g_slug+'">'
      +'</div>'
    +'';
  }
  else{
    var innerHtml = ''
      +'<div>'
        +'<span slug="'+col_prop.g_slug+'" '
        +'class="ct-label-'+col_prop.g_slug+'"></span>'
        +': '
        +'<span slug="'+col_prop.g_slug+'" '
        +'class="ct-value-'+col_prop.g_slug+'"></span>'
      +'</div>';
  }


  var my_value ='';
  if(p[col_prop.g_slug]){
    my_value = p[col_prop.g_slug];
  }



  return `
    ${innerHtml}
  `;
}

function append_leaveblank_option(slug){

  $('#input-'+slug).append($('<option>', { 
    value: 'null',
    text : '--Leave blank or select an option'
  }));

}

function part_ct_params(opt){

  let innerHtml = '';

  if(opt.grid=='col-12'){

    innerHtml = ''
      +'<div class="row" id="row-'+opt.slug+'">'
        +'<div class="col-12">'
          +'<div class="box box-'+opt.slug+'">'
          +'</div>'
        +'</div>'
      +'</div>'
      +'';

  }
  else if(opt.grid=='col-6'){

    innerHtml = ''
      +'<div class="row" id="row-'+opt.slug+'">'
        +'<div class="col-6">'
          +'<div class="box box-'+opt.slug+'-A">'
          +'</div>'
        +'</div>'
        +'<div class="col-6">'
          +'<div class="box box-'+opt.slug+'-B">'
          +'</div>'
        +'</div>'
      +'</div>'
      +'';

  }
  else if(opt.grid=='col-3-9'){

    innerHtml = ''
      +'<div class="row" id="row-'+opt.slug+'">'
        +'<div class="col-3">'
          +'<div class="box box-'+opt.slug+'-A">'
          +'</div>'
        +'</div>'
        +'<div class="col-9">'
          +'<div class="box box-'+opt.slug+'-B">'
          +'</div>'
        +'</div>'
      +'</div>'
      +'';

  }
  else if(opt.grid=='col-2-10'){

    innerHtml = ''
      +'<div class="row" id="row-'+opt.slug+'">'
        +'<div class="col-2">'
          +'<div class="box box-'+opt.slug+'-A">'
          +'</div>'
        +'</div>'
        +'<div class="col-10">'
          +'<div class="box box-'+opt.slug+'-B">'
          +'</div>'
        +'</div>'
      +'</div>'
      +'';

  }



  return `
    ${innerHtml}
  `;
}

// 'map225-user-meta',
//var user_meta = [];
//load_user_meta();

//f_wait.watchlist=0;
//f_wait.geovar_user=0;
function m225_ready(){
  if(typeof g_meta.geovar_user.features[0].watchlist != 'undefined'){
    load_watchlist(g_meta.geovar_user.features[0].watchlist);
  }
}


/* function load_user_meta(){

  var dataString = {
    fn_group:'geodata',
    action:'view_data',
    collection:'user_meta',
    qy_name:'A'
  };
  generic_api(dataString,'user_meta');

}

dyn_functions['succ_user_meta'] = function(r){

  // _onsole.log(r);

  g_meta.geovar_user=r;

  r.features.forEach(feature => {
    var p = feature.properties;
    if(p.user_id==0){
      sessionStorage.access_status=0;
    }
    else{
      sessionStorage.access_status=1;
      load_watchlist(p.watchlist);
    }
    //fill_box_sidebar();
  });

  f_wait.geovar_user=1;

} */

function load_watchlist(watchlist){

  if (f_wait.watchlist==0) {
    // _onsole.log('wait')
    setTimeout(function(){load_watchlist(watchlist)},100);
    return;
  } else {
    dyn_functions['load_watchlist'](watchlist);
  };

}

// 'map239-fill_labels',
function m239_ready(){

  fill_labels();

}

function fill_labels(){

  //dMap.map_attribution=ERP_OWNER_GEOINFO_AZIENDA+' Leaflet - © OpenStreetMap';

}

// 'map238-geovar_lyr_table_schema',//!!!must be an await

dyn_functions['geovar_lyr_extend'] = function(){

  g_meta.geovar_lyr.features.forEach(feature => {

    var p=feature.properties

    let lyr=p.g_slug;
    let o = g_meta.geovar_lyr.features
    let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
    let obj_lyr=this_obj[0].properties;

    if(table_slug=obj_lyr.g_tables!=undefined){
      var table_slug=obj_lyr.g_tables[0];

      obj_lyr.table_schema=new Array();
      obj_lyr.table_schema.features=[];
      load_table_schema(table_slug,p.g_slug);
      load_table_schema2(table_slug,p.g_slug);
    }

  });

}

function load_table_schema(table_slug,lyr){

  if (f_wait.geovar_map==0
    || f_wait.geovar_map_tb==0) {
    // _onsole.log('wait geovar_map')
    setTimeout(function(){load_table_schema(table_slug,lyr)},100);
    return;
  } else {
    // _onsole.log('stop wait geovar_map')
    dyn_functions['fill_table_schema'](table_slug,lyr);
  };

}

dyn_functions['fill_table_schema'] = function(table_slug,lyr){

  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  g_meta.geovar_map_tb.forEach(obj => {
    // _onsole.log(obj)
    if(obj.name==table_slug){
      obj_lyr.table_schema.features.push(obj.features);
    }
  });

  f_wait.table_schema=1;

}

function load_table_schema2(table_slug,lyr){

  if (f_wait.geovar_map==0) {
    //_onsole.log('wait geovar_map')
    setTimeout(function(){load_table_schema2(table_slug,lyr)},100);
    return;
  } else {
    //_onsole.log('stop wait geovar_map')
    dyn_functions['fill_table_schema2'](table_slug,lyr);
  };

}

dyn_functions['fill_table_schema2'] = function(table_slug,lyr){
  //this_lyr[lyr].g_cols_schema
  if(this_lyr[lyr].g_cols_schema!=undefined){

    let obj = g_meta.geovar_map_tb.filter( element => element.name == table_slug)[0];
    let el2_obj = this_lyr[lyr].g_cols_schema.filter( element => element.table == table_slug);

    el2_obj.forEach(el2 => {

      this_lyr[lyr].table_schema2[el2.slug]=new Array();
      this_lyr[lyr].table_schema2[el2.slug].features=[];

      //obj.features.forEach(el3 => {
        if(el2.cols[0]=='all'){
          obj.features.forEach(el3 => {
            this_lyr[lyr].table_schema2[el2.slug].features.push(el3.properties);
          });
        }
        // else if(el2.cols.includes(el3.properties.g_slug)){

        //   el2.cols.forEach(el3 => {
        //     this_lyr[lyr].table_schema2[el2.slug].features.push(el3.properties);
        //   });

        //   this_lyr[lyr].table_schema2[el2.slug].features.push(el3.properties);
        // }
        else{

          el2.cols.forEach(el4 => {
            obj.features.forEach(el3 => {
              if(el3.properties.g_slug==el4){
                this_lyr[lyr].table_schema2[el2.slug].features.push(el3.properties);
              }
              
            });
            // let el2_obj = obj.filter( element => element.table == table_slug);
            // this_lyr[lyr].table_schema2[el2.slug].features.push(el3.properties);
          });

          // this_lyr[lyr].table_schema2[el2.slug].features.push(el3.properties);
        }
      //});

    });

  }
  f_wait.table_schema2=1;

}

// 'tmp_meta',
function tmp_meta_ready(){
  
  add_tmp_meta();

}

function add_tmp_meta(){

  //g_meta.geovar_dialog is update from DB
  //but to customize can push this array
  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'Map click test',
      'g_slug': 'isochrone_test'+'_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'Choose Map',
      'g_slug': 'addon220_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  var meta = {
    'properties':{
      'g_description': null,
      'g_label': '<!--MENU-->',
      'g_slug': 'menu_sidebar_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'Choose Lyr',
      'g_slug': 'addon221_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'Add post',
      'g_slug': 'wiki_add_post_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'Scelta foglio/particella',
      'g_slug': 'addon223_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'Ispeziona foglio/particella',
      'g_slug': 'addon223_inspect_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'Certificato Destinazione Urbanistica',
      'g_slug': 'addon223_cdu_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'Stampa personalizzata',
      'g_slug': 'a226_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'Ispeziona da mappa',
      'g_slug': 'addon225_inspect_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'Documentazione disponibile',
      'g_slug': 'btn_credit_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'no title',
      'g_slug': 'btn_housenumber_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'Map settings',
      'g_slug': 'btn_settings_map_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'Manage Map layers',
      'g_slug': 'm244_field_MapLyrs_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'Insert ...',
      'g_slug': 'vlyr007_2_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  //--

  var meta = {
    'properties':{
      "g_slug": "label_menu_sidebar",
      "g_label": "Menù"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_page_dashboard",
      "g_label": "Dashboard"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_page_geodata",
      "g_label": "Geodata"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_page_map",
      "g_label": "Maps"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_page_explorer",
      "g_label": "Explorer"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_page_monster",
      "g_label": "Monster"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "url_page_dashboard_0x1",
      "g_label": ""
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "url_page_explorer_0x1",
      "g_label": "explorer"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "url_page_map_0x1",
      "g_label": "map"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "url_page_monster_0x1",
      "g_label": ""
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_menu_list_map",
      "g_label": "Show map catalog"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_menu_list_lyr",
      "g_label": "Manage layers"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_btn_add",
      "g_label": "Add"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_wiki_radio_type",
      "g_label": "Choose post type"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_btn_miner",
      "g_label": "<i class=\"fa fa-th\" aria-hidden=\"true\"></i>"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_visualizza",
      "g_label": "VISUALIZZA"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_stampa",
      "g_label": "STAMPA"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_reset_icon",
      "g_label": "<i class=\"fa fa-eraser\" aria-hidden=\"true\"></i>"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_inspect",
      "g_label": "ISPEZIONA"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;
  
  var meta = {
    'properties':{
      "g_slug": "label_compose",
      "g_label": "COMPONI"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;
  
  var meta = {
    'properties':{
      "g_slug": "label_cdu",
      "g_label": "C.D.U."
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;
  
  var meta = {
    'properties':{
      "g_slug": "label_cdu_request",
      "g_label": "Crea C.D.U."
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;
  
  var meta = {
    'properties':{
      "g_slug": "label_cdu_print",
      "g_label": "Stampa"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;
  
  var meta = {
    'properties':{
      "g_slug": "label_cdu_view_input",
      "g_label": "Visualizza campi"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_btn_housenumber",
      "g_label": "<i class=\"fa fa-building-o\" aria-hidden=\"true\"></i>"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_btn_graphics",
      "g_label": "<i class=\"fa fa-map-pin\" aria-hidden=\"true\"></i>"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_btn_addon225_by_point",
      "g_label": "<i class=\"fa fa-map-pin\" aria-hidden=\"true\"></i>"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_btn_addon225_by_polyline",
      "g_label": "<i class=\"fa fa-sliders\" aria-hidden=\"true\"></i>"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_btn_addon225_by_polygon",
      "g_label": "<i class=\"fa fa-object-ungroup\" aria-hidden=\"true\"></i>"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_btn_close_icon",
      "g_label": "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_btn_credit_en",
      "g_label": "Documentation"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_btn_a233_save",
      "g_label": "SAVE"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_btn_menu_mobile2",
      "g_label": "<i class=\"fa fa-bars\" aria-hidden=\"true\"></i>"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;
  //--

  var meta = {
    'properties':{
      "g_slug": "btn_menu_sidebar",
      "g_label": "label_menu_sidebar",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_open_page_dashboard",//"btn_0x1_page_dashboard",
      "g_label": "label_page_dashboard",//"label_0x1_page_dashboard",
      "g_group": ["page_dashboard_0x1"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": 'btn_sidebar_menu_go',
      "g_responsive": "both",
      "g_style": "btn-sm btn-light col-12"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_open_page_geodata",
      "g_label": "label_page_geodata",
      "g_group": ["page_geodata_0x1"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": 'btn_sidebar_menu_go',
      "g_responsive": "both",
      "g_style": "btn-sm btn-light col-12"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_open_page_map",
      "g_label": "label_page_map",
      "g_group": ["page_map_0x1"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": 'btn_sidebar_menu_go',
      "g_responsive": "both",
      "g_style": "btn-sm btn-light col-12"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_open_page_explorer",
      "g_label": "label_page_explorer",
      "g_group": ["page_explorer_0x1"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": 'btn_sidebar_menu_go',
      "g_responsive": "both",
      "g_style": "btn-sm btn-light col-12"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_open_page_monster",
      "g_label": "label_page_monster",
      "g_group": ["page_monster_0x1"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": 'btn_sidebar_menu_go',
      "g_responsive": "both",
      "g_style": "btn-sm btn-light col-12"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_menu_list_map",
      "g_label": "label_menu_list_map",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_menu_list_lyr",
      "g_label": "label_menu_list_lyr",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_wiki_add",
      "g_label": "label_btn_add",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_save_wiki",
      "g_label": "label_btn_save",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "wiki_radio_type",
      "g_label": "label_wiki_radio_type",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v0",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_options": [
        {"value":"type-txt","label":"Only text"},
        {"value":"type-img","label":"Image"},
        {"value":"type-internal","label":"Sub page"},
        {"value":"type-custom","label":"Custom JS"},
        {"value":"type-external","label":"External link"}
      ],
      //"g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_miner",
      "g_label": "label_btn_miner",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_addon223_view",
      "g_label": "label_visualizza",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_addon223_p2_badge_reset",
      "g_label": "label_reset_icon",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_addon223_block_reset",
      "g_label": "label_reset_icon",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_addon223_block_inspect",
      "g_label": "label_inspect",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_addon223_compose",
      "g_label": "label_compose",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_addon223_cdu",
      "g_label": "label_cdu",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_addon223_cdu_request",
      "g_label": "label_cdu_request",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_addon223_cdu_print",
      "g_label": "label_cdu_print",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_addon223_cdu_view_input",
      "g_label": "label_cdu_view_input",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_housenumber",
      "g_label": "label_btn_housenumber",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_graphics",
      "g_label": "label_btn_graphics",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_addon225_by_point",
      "g_label": "label_btn_addon225_by_point",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_addon225_by_polyline",
      "g_label": "label_btn_addon225_by_polyline",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_addon225_by_polygon",
      "g_label": "label_btn_addon225_by_polygon",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_addon225_by_close",
      "g_label": "label_btn_close_icon",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);


  var meta = {
    'properties':{
      "g_slug": "btn_addon225_block_inspect",
      "g_label": "label_inspect",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_addon225_compose",
      "g_label": "label_compose",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_a226_print",
      "g_label": "label_stampa",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_credit_en",
      "g_label": "label_btn_credit_en",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_a233_save",
      "g_label": "label_btn_a233_save",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_m244_field_MapLyrs",
      "g_label": null,
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": 'fa-arrows-alt',
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_menu_mobile2",
      "g_label": "label_btn_menu_mobile2",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

}

var meta = {
  'properties':{
    "g_slug": "type-txt",
    "g_cols": [
      get_form_field_options('title'),
      get_form_field_options('content')
    ]
  }
}
g_meta.geovar_generic_option.push(meta);

var meta = {
  'properties':{
    "g_slug": "type-img",
    "g_cols": [
      get_form_field_options('title'),
      get_form_field_options('image_url')
    ]
  }
}
g_meta.geovar_generic_option.push(meta);

var meta = {
  'properties':{
    "g_slug": "type-internal",
    "g_cols": [
      get_form_field_options('title'),
      get_form_field_options('simple_url')
    ]
  }
}
g_meta.geovar_generic_option.push(meta);

var meta = {
  'properties':{
    "g_slug": "type-custom",
    "g_cols": [
      get_form_field_options('title'),
      get_form_field_options('content'),
      get_form_field_options('custom_js')
    ]
  }
}
g_meta.geovar_generic_option.push(meta);

var meta = {
  'properties':{
    "g_slug": "type-external",
    "g_cols": [
      get_form_field_options('title'),
      get_form_field_options('simple_url')
    ]
  }
}
g_meta.geovar_generic_option.push(meta);

function get_form_field_options(g_slug){

  let options = [
    {
      "g_slug":"title",
      "g_label":"Title",
      "g_type":"text",
      "g_placeholder":"Visible everywhere ..."
    },
    {
      "g_slug":"content",
      "g_label":"Content",
      "g_type":"textarea",
      "g_placeholder":"..."
    },
    {
      "g_slug":"image_url",
      "g_label":"Image url",
      "g_type":"text",
      "g_placeholder":"https://image.jpg"
    },
    {
      "g_slug":"simple_url",
      "g_label":"Link URL",
      "g_type":"text",
      "g_placeholder":"https://"
    },
    {
      "g_slug":"custom_js",
      "g_label":"file-name without .js",
      "g_type":"fieldplus",
      "g_placeholder":"custom_js1"
    }
  ]

  let obj=options.filter((p) => p.g_slug ===g_slug)[0];

  return obj;

}

// 'tmp_access',
function tmp_access_ready(){
  //_onsole.log('tmp_access_ready')
  
  add_tmp_access();

}

function add_tmp_access(){
  //_onsole.log('add_tmp_access')

  /* var meta = {
    'g_slug': 'menu_sidebar',
    'g_roles': ['public'],
  }
  g_meta.geovar_access.features.push({'properties':meta}); */

}

// 'map232-basemaps',

function map232_ready(){

  exe_map232();

}

function map232_ready_2(opt){

  remove_loading2_plus('load_map');

  // console.log('map232_ready_2',opt);
  if(opt.mapLibrary=='leafletjs'){
    if(opt==undefined){
      exe_map232();
    }
    else if(opt.mapRotation=='disabled'){
      exe_map232();
    }
    else if(opt.mapRotation=='enabled'){
      exe_map232_BaseRotate();
    }
  }
  else if(opt.mapLibrary=='mapbox'
    || opt.mapLibrary=='maplibre'){
    add_loading2_plus('load_basemap');
    exe_map232_mapbox();
  }

}

function exe_map232(){

  list_basemap.forEach(lyr => {
    //_onsole.log('exe_map232',g_meta.geovar_lyr);

    sessionStorage['alternative_base_map_'+lyr]=0;

    let o = g_meta.geovar_lyr.features
    let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
    let obj_lyr=this_obj[0].properties;

    mymap.createPane(lyr+'_pane');
    mymap.getPane(lyr+'_pane').style.zIndex = obj_lyr.zindex;
    // _onsole.log(lyr)
    // _onsole.log(lyr.indexOf("pointerEvents"))

    if(obj_lyr.pointerEvents!=undefined 
      && obj_lyr.pointerEvents===false){
      // Layers in this pane are non-interactive and 
      //do not obscure mouse/touch events
      mymap.getPane(lyr+'_pane').style.pointerEvents = 'none';
    }

    geo_lyr[lyr] = L.tileLayer(
      obj_lyr.tile_url,
      {
        attribution: obj_lyr.attribution,
        pane: obj_lyr.g_slug+'_pane',
        maxZoom: obj_lyr.tile_url.maxzoom
      }
    ).addTo(mymap);

  });

  geo_lyr['satellite'] = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {pane: 'lyr040_pane'}
  );

}

function map232_testroutingrotate_ready(){

  exe_map232_BaseRotate();

}

function exe_map232_BaseRotate(){

  // let tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
  let tileUrl = 'https://{s}.basemaps.cartocdn.com/{style}/{z}/{x}/{y}{scale}.png'
  L.tileLayer(
    tileUrl, 
    {
      style:'light_all',
      scale:(L.Browser.retina ? '@2x' : ''),
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }
  ).addTo(mymap);

}

dyn_functions['prepare_TopLayer'] = function(){

  let item_lyr = 'TopLayer';

  // reate a GeoJSON source with an empty lineString.
  let geojson = {
    'type': 'FeatureCollection',
    'features': [
      {
        'type': 'Feature',
        'geometry': {
          'type': 'LineString',
          'coordinates': [[0, 0]]
        }
      }
    ]
  };
  mymap.addSource(item_lyr, {
    'type': 'geojson',
    'data': geojson
  });
  mymap.addLayer(
    {
      'id': 'id-'+item_lyr,
      'type': 'line',
      'source': item_lyr,
      'layout': {
        'line-cap': 'round',
        'line-join': 'round'
      },
      'paint': {
        'line-color': '#000',
        'line-opacity': 0 //default
      }
    }
  );
}

dyn_functions['prepare_MiddleLayer'] = function(){

  let item_lyr = 'MiddleLayer';

  // reate a GeoJSON source with an empty lineString.
  let geojson = {
    'type': 'FeatureCollection',
    'features': [
      {
        'type': 'Feature',
        'geometry': {
          'type': 'LineString',
          'coordinates': [[0, 0]]
        }
      }
    ]
  };
  mymap.addSource(item_lyr, {
    'type': 'geojson',
    'data': geojson
  });
  mymap.addLayer(
    {
      'id': 'id-'+item_lyr,
      'type': 'line',
      'source': item_lyr,
      'layout': {
        'line-cap': 'round',
        'line-join': 'round'
      },
      'paint': {
        'line-color': '#000',
        'line-opacity': 0 //default
      }
    },
    'id-TopLayer'
  );
}

dyn_functions['prepare_BottomLayer'] = function(){

  let item_lyr = 'BottomLayer';

  // reate a GeoJSON source with an empty lineString.
  let geojson = {
    'type': 'FeatureCollection',
    'features': [
      {
        'type': 'Feature',
        'geometry': {
          'type': 'LineString',
          'coordinates': [[0, 0]]
        }
      }
    ]
  };
  mymap.addSource(item_lyr, {
    'type': 'geojson',
    'data': geojson
  });
  mymap.addLayer(
    {
      'id': 'id-'+item_lyr,
      'type': 'line',
      'source': item_lyr,
      'layout': {
        'line-cap': 'round',
        'line-join': 'round'
      },
      'paint': {
        'line-color': '#000',
        'line-opacity': 0 //default
      }
    },
    'id-MiddleLayer'
  );
}

function exe_map232_mapbox(){

  dyn_functions['prepare_TopLayer']();
  // between TopLayer and MiddleLayer only Points/Icons
  dyn_functions['prepare_MiddleLayer']();
  // between MiddleLayer and BottomLayer only Lines/Polygons
  dyn_functions['prepare_BottomLayer']();
  // below BottomLayer only Basemaps

  if(list_basemap[0] == 'streets-v12'){
    // onsole.log('exe_map232_mapbox')
    let layerId = 'streets-v12';
    // let layerId = 'dark-v11';
    mymap.setStyle('mapbox://styles/mapbox/' + layerId);
  }
  else if(list_basemap.length>0){
    
    list_basemap.forEach(element => {
      if(element == 'lyr040'){

        list_f_mapbox.push('prepare_lyr040');
        dyn_functions['prepare_lyr040'] = function(){

          // onsole.log('mapbox_municipality');
          let cartoLyr = 'rastertiles/voyager_nolabels/';
          mymap.addSource('raster-basemap', {
            'type': 'raster',
            'tiles': [
              'https://a.basemaps.cartocdn.com/'+cartoLyr+'{z}/{x}/{y}@2x.png'
            ],
            'tileSize': 256,
            'attribution':'',
            'minzoom': 0,
            'maxzoom': 22
          }); 
          mymap.addLayer(
            {
              'id': 'id-raster-basemap',
              'type': 'raster',
              'source': 'raster-basemap',
            },
            'id-BottomLayer'
          );  
        
        }        
      }
      else if(element == 'lyr038'){
        
        list_f_mapbox.push('prepare_lyr038');
        dyn_functions['prepare_lyr038'] = function(){

          // onsole.log('mapbox_municipality');
          let cartoLyr = 'light_only_labels/';
          mymap.addSource('raster-basemap-label', {
            'type': 'raster',
            'tiles': [
              'https://a.basemaps.cartocdn.com/'+cartoLyr+'{z}/{x}/{y}@2x.png'
            ],
            'tileSize': 256,
            'attribution':'',
            'minzoom': 0,
            'maxzoom': 22
          }); 
          mymap.addLayer(
            {
              'id': 'id-basemap-label',
              'type': 'raster',
              'source': 'raster-basemap-label',
            },
            'id-MiddleLayer'
          );  
        
        }   

      }
    });
    // let o = g_meta.geovar_lyr.features;
    // let this_obj_lyr038=o.filter(({properties}) => properties.g_slug === 'lyr038');
    // let obj_lyr_lyr038=this_obj_lyr038[0].properties;
    // let this_obj_lyr040=o.filter(({properties}) => properties.g_slug === 'lyr038');
    // let obj_lyr_lyr040=this_obj_lyr040[0].properties;

    // let customTile = {
    //   'version': 8,
    //   'sources': {
    //     'raster-tiles-lyr038': {
    //       'type': 'raster',
    //       'tiles': [
    //         'https://a.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}@2x.png'
    //       ],
    //       'tileSize': 256,
    //       'attribution':
    //       ''
    //     }
    //   },
    //   'layers': [
    //     {
    //       'id': 'id-tiles-lyr038',
    //       'type': 'raster',
    //       'source': 'raster-tiles-lyr038',
    //       'minzoom': 8,
    //       'maxzoom': 22
    //     }
    //   ]
    // }
    // mymap.setStyle(customTile);  

  }
  else{
    let customTile = {
      'version': 8,
      'sources': {
        'raster-tiles': {
          'type': 'raster',
          'tiles': [
            'https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png'
          ],
          'tileSize': 256,
          'attribution':
          ''
        }
      },
      'layers': [
        {
          'id': 'simple-tiles',
          'type': 'raster',
          'source': 'raster-tiles',
          'minzoom': 0,
          'maxzoom': 22
        }
      ]
    }
    mymap.setStyle(customTile);
  }

  mymap.on('sourcedata', ({isSourceLoaded, sourceId}) => {
    
    // onsole.log('a286_activeGeohash',a286_activeGeohash);
    let lyr = 'raster-basemap';
    if(sourceId == lyr
      && isSourceLoaded == true){
      remove_loading2_plus('load_map');
    }

  });

}

/*
mymap.on("zoomstart", function (e) { 
  // _onsole.log("ZOOMSTART", e); 
  // _onsole.log(mymap.getZoom());
  g_meta.geovar_lyr.features.forEach(feature => {
    var p=feature.properties
    // _onsole.log(p.g_slug);
    // _onsole.log(p.maxzoom);
    if(p.lyr_type=='tile'){
      if(mymap.getZoom()>p.maxzoom && sessionStorage['alternative_base_map_'+p.g_slug]==0){
        // _onsole.log('remove default tile')

        mymap.removeLayer(geo_lyr[p.g_slug]);

        geo_lyr[p.g_slug] = L.tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png',
          {
            pane: p.g_slug+'_pane',
            maxZoom: 20
          }
        ).addTo(mymap);
        sessionStorage['alternative_base_map_'+p.g_slug]=1;

      }
      else if(mymap.getZoom()<=(p.maxzoom+1) && sessionStorage['alternative_base_map_'+p.g_slug]==1){
        // _onsole.log('add default tile')

        mymap.removeLayer(geo_lyr[p.g_slug]);

        geo_lyr[p.g_slug] = L.tileLayer(
          p.tile_url,
          {
            pane: p.g_slug+'_pane'
          }
        ).addTo(mymap);
        sessionStorage['alternative_base_map_'+p.g_slug]=0;

      }
    }


  });

});
*/


// 'map224-button',

function create_button(item_btn,optIn=new Array()){

  // if (f_wait.geovar_button==0
  //   || f_wait.geovar_label==0
  //   || f_wait.geovar_user==0
  //   || f_wait.geovar_label==0
  //   || f_wait.geovar_access==0) {
  //   // _onsole.log('wait')
  //   setTimeout(function(){create_button(item_btn,optIn)},1000);
  //   return;
  // } else {

    dyn_functions['exe_create_button'](item_btn,optIn);

  // };

}

dyn_functions['exe_create_button'] = function(item_btn,optIn=new Array()){
  //_onsole.log('exe_create_button',g_meta.geovar_button)
  //Array.prototype.filter()
  let obj_btn=g_meta.geovar_button.features.filter(({properties}) => properties.g_slug === item_btn);
  let g_group = '';
  if(obj_btn.length>0){
    g_group = obj_btn[0].properties.g_group[0];
  }
  else{
    console.log('BTN without properties!');
    return;
  }
  
  let p_btn = obj_btn[0].properties;
  let btn_label='';
  //_onsole.log('p_btn',p_btn);
  if(p_btn.g_label!=null){
    btn_label=gLang[p_btn.g_label];
  }
  else if(p_btn.g_faw!=null){  
    btn_label='<i class="fa '+p_btn.g_faw+'" aria-hidden="true"></i>';
  }
  else{
    btn_label='<i class="fa fa-ellipsis-h" aria-hidden="true"></i>';
  }

  var c='';

  if(p_btn.g_style===null){
    var g_style='btn-outline-dark';
  }
  else{
    var g_style=p_btn.g_style;
  }

  if(p_btn.g_responsive=='mobile'){ 
    if(isMobile == true){
    }
    else{
      return;
    }
  }
  else if(p_btn.g_responsive=='desktop'){
    if(isMobile == true){
      return;
    }
  }

  if(p_btn.g_callback===null){
    // _onsole.log('g_callback undefined')
    var g_callback=item_btn;
  }
  else{
    // _onsole.log('g_callback defined')
    var g_callback=p_btn.g_callback;
  }

  if(p_btn.g_template=='v2'){

    //_onsole.log('v2',p_btn);

    if(p_btn.g_type=='form-switch'){
      c=''
        +'<div class="form-check form-switch">'
          +'<input '
            +'id="'+item_btn+'" '
            +'type="checkbox" '
            +'class="form-check-input '+g_style+'" '
            +'role="switch">'
          +'<label class="form-check-label" for="'+item_btn+'">'
            +btn_label.toUpperCase()+'</label>'
        +'</div>';
    }
    else{
      c=''
        +'<button '
          +'id="'+item_btn+'" '
          +'type="button" '
          +'class="btn '+g_style+' '+G_CSS_THEME+'">'
          +btn_label+'</button>';
    }


  }//IF V2
  else{

    if(p_btn.g_template=='a'){
        c=''
        +'<div class="row">'
          +'<div class="col-2 text-center" style="padding-right:0px;margin-top: 3px;">'
            +'<i class="fa '+p_btn.g_faw+'" aria-hidden="true"></i>'
          +'</div>'
          +'<div class="col-10">'
            +'<span '
              +'id="'+item_btn+'" '
              +'g_callback="'+g_callback+'" '
              +'g_group="'+g_group+'" '
              +'class="'+item_btn+'" '
              +'slug="'+item_btn+'">'
              +btn_label+'</span>'
          +'</div>'
        +'</div>';
    }
    else if(p_btn.g_template=='b'){

      c=''
        +'<button '
          +'id="'+item_btn+'" '
          +'type="button" '
          +'class="btn btn-sm '+g_style+'">'
          +btn_label.toUpperCase()+'</button>';
    }
    else if(p_btn.g_template=='c'){
      c=''
        +'<button '
          +'id="'+item_btn+'" '
          +'type="button" '
          +'class="btn btn-sm '+g_style+' btn-main-sidebar">'
          +btn_label.toUpperCase()+'</button>';
    }
    else if(p_btn.g_template=='d'){
      c=''
        +'<button '
          +'id="'+item_btn+'" '
          +'type="button" '
          +'style="width:100%;" '
          +'class="btn btn-xs '+g_style+' btn-main-sidebar">'
          +btn_label.toUpperCase()+'</button>';
    }
    else if(p_btn.g_template=='e'){
      c=''
        +'<button '
          +'id="'+item_btn+'" '
          +'type="button" '
          +'style="width:30px;" '
          +'class="btn btn-xs '+g_style+' btn-main-sidebar">'
          +'<i class="fa '+p_btn.g_faw+'" aria-hidden="true"></i></button>';
    }
    else if(p_btn.g_template=='f'){
      c=''
        +'<button '
          +'id="'+item_btn+'" '
          +'type="button" '
          +'style="width:30px;" '
          +'class="btn btn-xs '+g_style+' btn-main-sidebar">'
          +'<i class="fa '+p_btn.g_faw+'" aria-hidden="true"></i></button>';
    }
    else if(p_btn.g_template=='g'){
      c=''
        +'<button '
          +'id="'+item_btn+'" '
          +'type="button" '
          +'style="width:30px;" '
          +'class="btn btn-xs '+g_style+' btn-main-sidebar">'
          +'<i class="fa '+p_btn.g_faw+'" aria-hidden="true"></i></button>';
    }
    else if(p_btn.g_template=='h'){
      c=''
        +'<button '
          +'id="'+item_btn+'" '
          +'type="button" '
          +'class="btn btn-sm '+g_style+' btn-main-sidebar">'
          +btn_label.toUpperCase()+'</button>';
    }
    else if(p_btn.g_template=='i'){

      c=''
        +'<button '
          +'id="'+item_btn+'" '
          +'class="btn btn-tab btn-sm '+g_style+'">'
          +'<span class="d-none d-md-block">'+btn_label.toUpperCase()+'</span>'
          +'<span class="d-block d-md-none">'+'<i class="fa '+p_btn.g_faw+'" aria-hidden="true"></i>'+'</span>'
        +'</button>';
    }
    else{

    }

  }//ELSE V2

  $('.box-'+item_btn).html(c);

  $('#'+item_btn).attr('g_group',g_group);
  $('#'+item_btn).attr('g_callback',g_callback);

  //_onsole.log(item_btn)
  //_onsole.log(g_group)
  //Array.prototype.filter()
  let obj_access=g_meta.geovar_access.features.filter(({properties}) => properties.g_slug === g_group);
  //_onsole.log(obj_access)
  if(obj_access.length>0){

    let a = obj_access[0].properties.g_roles;
    let b = g_meta.geovar_user.features[0].properties.user_role;

    if(a[0]=='hidden'){
      $('.box-'+item_btn).css('display','none');
    }
    else if(a[0]=='public'){

    }
    else if(a[0]=='private'){
      $('#'+item_btn).prop('disabled',true);
    }
    else{

      let result = js_intersect(a, b)

      if(result.length>0){
        $('#'+item_btn).prop('disabled',false);
      }
      else{
        $('#'+item_btn).prop('disabled',true);
      }

    }

  }

  //_onsole.log('exe_create_button');
  //_onsole.log('optIn',optIn);

  // _onsole.log( slug);
  // $('#'+item_btn).on('click',function(optIn){
  //   onsole.log('click');
  //   onsole.log('e',e);
  //   onsole.log('optIn',optIn);
  //   exe_btn($(this).attr('g_callback'),$(this).attr("id"),optIn);
  // });



  let opt = new Array();
  // if(optIn.length>0){
    opt=optIn;
  // }
  opt.g_callback=g_callback;
  opt.item_btn=item_btn;

  //_onsole.log('opt',opt)

  $('#'+item_btn).on('click',opt,exe_btn);

  // say your selector and click handler looks something like this...
  // $("some selector").click({param1: "Hello", param2: "World"}, cool_function);
  // $('.leadtoscore').bind('click', { param: 'shot' }, add_event);
}

// function exe_btn(g_callback,item_btn,optIn=new Array()){
function exe_btn(e){
  let optIn = e.data;
  // onsole.log('exe_btn',optIn)
  // _onsole.log('param: '+g_callback);
  //return;
  // _onsole.log( $(this).attr('slug'));
  // _onsole.log( $(this).attr('g_callback'));
  //var g_callback = $(this).attr('g_callback');
  //let btn_slug = $(this).attr('slug');
  // _onsole.log('btn_slug: '+btn_slug);
  if(f_btn[optIn.g_callback]===undefined){
    console.log('callback undefined');
  }
  else{
    // _onsole.log('search f_btn callback');
    f_btn[optIn.g_callback](optIn.item_btn,optIn);
  }
}

function exe_btn_2(e){
  let optIn = e.data;
  //_onsole.log('exe_btn',optIn)
  // _onsole.log('param: '+g_callback);
  //return;
  // _onsole.log( $(this).attr('slug'));
  // _onsole.log( $(this).attr('g_callback'));
  //var g_callback = $(this).attr('g_callback');
  //let btn_slug = $(this).attr('slug');
  // _onsole.log('btn_slug: '+btn_slug);
  if(f_btn[optIn.g_callback]===undefined){
    console.log('callback undefined');
  }
  else{
    // _onsole.log('search f_btn callback');
    f_btn[optIn.g_callback](optIn);
  }
}

// DEFAULT BUTTON

// !dev change `slug` to `optIn`
f_btn[ 'btn_closedlg']=function(slug){
  // _onsole.log('f_btn '+slug)
  //alertify.infoDialog().close();
  alertify.infoDialog().destroy();
}

// !dev change `slug` to `optIn`
f_btn[ 'btn_closedlg3']=function(slug){
  // _onsole.log('f_btn '+slug)
  //alertify.infoDialog().close();
  alertify.infoDialog3().destroy();
}

// !dev change `slug` to `optIn`
f_btn[ 'btn_savedlg']=function(slug){
  // _onsole.log('save f_btn '+slug)

  var dataString = {}

  const input_value = document.querySelectorAll('.control-'+sessionStorage.this_dialog_slug);
  Array.from(input_value).forEach((element, index) => {
    dataString[element.getAttribute('slug')]=element.value;
  });

  alertify.infoDialog().close();
  alertify.infoDialog().destroy();
  
  dyn_functions[sessionStorage.f_tool_callback](dataString);

}

// ADDON BUTTON

/*
// !dev change `slug` to `optIn`
f_btn[ 'btn_explorer']=function(slug){
  // _onsole.log('f_btn:btn_explorer');
  create_dialog2(slug);
}
*/

// !dev change `slug` to `optIn`
f_btn[ 'btn_canceldlg_edit']=function(slug){

  var lyr = sessionStorage.destination_layer;
  //example return from edit to dl single
  alertify.infoDialog().destroy();
  // !dev change `slug` to `optIn`
  f_btn[ 'get_lyr_single_for_dlg'](lyr);

}

function create_button_2(optIn){

  if(optIn.g_responsive=='mobile'){ 
    if(isMobile == true){
    }
    else{
      return;
    }
  }
  else if(optIn.g_responsive=='desktop'){
    if(isMobile == true){
      return;
    }
  }
  else{
    //both
  }

  //--

  $('#'+optIn.itemSlug+'').remove();

  //--

  let c='';

  let itemLabel = get_opt_lang(optIn);

  if(optIn.itemType=='form-switch'){
    c=''
      +'<div class="form-check form-switch">'
        +'<input '
          +'id="'+optIn.itemSlug+'" '
          +'type="checkbox" '
          +'class="form-check-input '+optIn.itemClass+' '+G_CSS_THEME+'" '
          +'style="'+optIn.itemStyle+'" '
          +'role="switch">'
        +'<label class="form-check-label" for="'+optIn.itemSlug+'">'
          +itemLabel+'</label>'
      +'</div>';
  }
  else{
    c=''
      +'<button '
        +'id="'+optIn.itemSlug+'" '
        +'type="button" '
        +'class="btn '+optIn.itemClass+' '+G_CSS_THEME+'" '
        +'style="'+optIn.itemStyle+'" '
        +'>'
        +itemLabel+'</button>';
  }

  $('.box-'+optIn.itemSlug).html(c);

  //--

  if(optIn.g_callback===undefined){
    // _onsole.log('g_callback undefined')
    var g_callback=optIn.itemSlug;
  }
  else{
    // _onsole.log('g_callback defined')
    var g_callback=optIn.g_callback;
  }

  // works on item #id and box .class
  group_disable_hide(optIn);

  // $('#'+item_btn).attr('g_group',g_group);
  // $('#'+item_btn).attr('g_callback',g_callback);

  let opt = new Array();
  // if(optIn.length>0){
    opt=optIn;
  // }
  opt.g_callback=g_callback;
  opt.itemSlug=optIn.itemSlug;

  //_onsole.log('opt',opt)

  $('#'+optIn.itemSlug).on('click',opt,exe_btn_2);

  // say your selector and click handler looks something like this...
  // $("some selector").click({param1: "Hello", param2: "World"}, cool_function);
  // $('.leadtoscore').bind('click', { param: 'shot' }, add_event);
}

// 'map213-sidebar-footer',

function fill_home_info(){

  var popup = window.open(
    URL_DOC_CREDIT,
    "_blank"
  );
  popupBlockerChecker.check(popup);

}

// 'map214-sidebar-footer-b',

function map214_ready(){

  fill_box_sidebar();
  fill_box_bottom_right();

}

function fill_box_sidebar(){
  
  // onsole.log(count_js);
  // onsole.log(count_js_load);

  let sys_lang = get_sys_lang();

  if(sys_lang=='it'){

    $('.box-sidebar-footer-bottom').html(''
      +'<div '
        +'class="box-btn_credit" '
        +'style="margin-top:5px;"></div>'
    +'');
    create_button('btn_credit');
  }
  else{

    $('.box-sidebar-footer-bottom').html(''
      +'<div '
        +'class="box-btn_credit_en" '
        +'style="margin-top:5px;"></div>'
    +'');
    create_button('btn_credit_en');
  }

  $('#btn_credit_en').css('width','100%');

  $('.box-sidebar-footer-bottom').append(''
    +'<div style="margin-top:5px;">'
      +'<div '
        +'class="box-btn_settings box-info-2-btn d-grid gap-2" '
        +'style="float:left;padding-right:5px;" '
        +'></div>'
      +'<div '
        +'class="box-btn_profile box-info-2-btn d-grid gap-2" '
        +'style="float:left;padding-right:5px;display:none;" '
        +'></div>'
      +'<div '
        +'class="box-btn_login_logout" '
        +'></div>'
      +'<div style="margin-top:5px;" '
        +'class="box-btn_close_sidebar d-grid gap-2"></div>'
    +'</div>'
  +'');
  
  create_button('btn_close_sidebar');

  f_wait.btn_profile=1;
  f_wait.boxSidebarFooter=1;
  
  // _onsole.log(sessionStorage.access_status);
  $('.box-btn_login').remove();
  $('.box-btn_logout').remove();
  if(sessionStorage.access_status=='0'){

    $('.box-btn_login_logout').append('<div '
      +'class="box-btn_login box-info-2-btn d-grid gap-2" '
      +'style="margin-top:5px;"></div>');

    if(g_meta.geovar_map){
      let o = g_meta.geovar_map.features;
      let this_obj=o.filter(({properties}) => properties.g_slug === MAPSLUG);
      let obj_map=this_obj[0].properties;
      let obj_addon=obj_map.g_addon.filter((x) => x.addon === 'addon_login');
      if (obj_addon.length>0) {
        if(obj_addon[0].status!=false){
          create_button('btn_login');
        }
      }
      else{
        create_button('btn_login');
      }

      $('.box-btn_settings').removeClass('d-grid');
      $('.box-btn_settings').css('display','none');
      $('.box-btn_profile').removeClass('d-grid');
      $('.box-btn_profile').css('display','none');
      if(sessionStorage.show_admin_btn=='1'){
        sessionStorage.show_admin_btn='0';
      }
      //show_hide_explorer(); 
           
    }


  }
  else{
    $('.box-btn_login_logout').append('<div '
      +'class="box-btn_logout box-info-2-btn d-grid gap-2" '
      +'style="margin-top:5px;"></div>');
    create_button('btn_logout');
    $('.box-btn_settings').addClass('d-grid');
    $('.box-btn_settings').css('display','');
    $('.box-btn_profile').addClass('d-grid');
    $('.box-btn_profile').css('display','');
  }

  //$('.btn_close_sidebar').on('click',btn_close_sidebar);

}


// !dev change `slug` to `optIn`
f_btn[ 'btn_close_sidebar']=function(slug){
  //$('#sidebarMenu').addClass('d-none');
  //$('#sidebarMenu').css('height','100%');
  $('.sidebar-wrapper').addClass('d-none');
  $('.sidebar-wrapper').addClass('col');
}

// !dev change `slug` to `optIn`
f_btn[ 'btn_logout_x']=function(slug){
  // _onsole.log('label_btn_logout_x');
  if(sessionStorage.access_status=='1'){
    var dataString = {
      fn_group:'geodata',
      action:'view_data',
      collection:'logout_x',
      qy_name:'A'
    };
    generic_api(dataString,'logout_x');
  }
  else{
    sessionStorage.access_status='1';
    window.open(HOME_PROJECT+'/wp-login.php?redirect_to='+window.location.href+'&reauth=1','_self');
  }
}

dyn_functions['succ_logout_x'] = function(r){

  //dMap.logout=1;
  //sessionStorage.access_status='0';
  //fill_box_sidebar();
  window.open(HOME_PROJECT,'_self');
}

// !dev change `slug` to `optIn`
f_btn[ 'btn_credit']=function(slug){

  //window.open("https://github.com/", "_blank");

  sessionStorage.this_dialog_lyr='btn_credit';
  sessionStorage.this_dialog_slug='btn_credit_single';//'lyr035_single'
  //
  //sessionStorage.addon208_text='btn_analytics_01';
  //sessionStorage.mapclick_lng=e.latlng.lng;
  create_dialog2(sessionStorage.this_dialog_slug);

}

// !dev change `slug` to `optIn`
f_btn[ 'btn_credit_en']=function(slug){

  //window.open("https://github.com/", "_blank");

  sessionStorage.this_dialog_lyr='btn_credit';
  sessionStorage.this_dialog_slug='btn_credit_single';//'lyr035_single'
  //
  //sessionStorage.addon208_text='btn_analytics_01';
  //sessionStorage.mapclick_lng=e.latlng.lng;
  create_dialog2(sessionStorage.this_dialog_slug);

}

function fill_box_bottom_right(){

  //$('.box-gpsposition').append('<div '
  //  +'class="box-btn_gps box-info-2-btn d-grid gap-2" '
  //  +'style="margin-top:5px;"></div>');
  //create_button('btn_gps');

}

// f/_btn['btn_gps']=function(slug){
//  // _onsole.log('gps');
//}

dyn_functions['template_by_slug_btn_credit_single'] = function(){

  let dlg_slug = 'btn_credit_single';

  let c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //box button tab
  c = ''
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  c = '<ul class="nav nav-tabs"></ul>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  c = '<div>'
    +'<div class="col-btn-attrs" style="text-align:left;"></div>'
  +'</div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //box tab1
  c = '<div '
    +'class="dlg_panel dlg_panel_tab panel-tab1" '
    +'style="display:block;font-family:var(--wd-fonts-secondary);">';
  //c += '<p>TAB1</p>';
  c += '</div><!--tab1-->';
  
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  list_creditExtend.forEach(adds => {
    dyn_functions[adds+'_creditExtend']();
  });


}

// 'map229-marker-cluster-custom',

function marker_cluster_custom(lyr){

  //_onsole.log(lyr);
  //_onsole.log(g_meta.geovar_lyr);
  let obj_lyr=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === lyr);
  let cluster_style = obj_lyr[0].properties.cluster_style;

  if(cluster_style=='type1'){

    var cluster_options = {
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      clusterPane :lyr+'_pane',
      iconCreateFunction: function (cluster) {
        var children = cluster.getAllChildMarkers();
        var n = 0;
        for (var i = 0; i <  children.length; i++) {
          n +=  1; //children[i].number;
        }

        myclass = 'cluster_type1 cluster_type1_a';//'mycluster_client_point_clientiservizi';

        if(n>999){
          n = '<i class="fa fa-plus" aria-hidden="true"></i>1k';
        }

        return new L.DivIcon({
          html: '<span>' + n + '</span><i class="fa fa-floppy" aria-hidden="true"></i>',
          //html: '<span>' + n + '</span>',
          className: myclass ,
          iconSize: null/*,
          iconAnchor:[40,40]*/
        });
      }
    }

  }
  else{

    //_onsole.log('cluster_options default')
    var cluster_options = {
      spiderfyOnMaxZoom: false,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: false,
      clusterPane :lyr+'_pane'
      //chunkedLoading: true,
      //singleMarkerMode: true,
      //spiderfyOnMaxZoom: false,
      //zoomAnimation : false
    }

  }

  return cluster_options;

}

// 'map242-lyr',

function generic_lyr(lyr){
  // _onsole.log('generic_lyr',lyr);
  // _onsole.log(g_meta.geovar_lyr.features);
  // let o = g_meta.geovar_lyr.features//TB!
  // let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  // //_onsole.log('this_obj',lyr);
  // // _onsole.log(this_obj);

  // let obj_lyr=this_obj[0].properties;

  g_ds = {
    geovar:"geovar_lyr",//obj_maps
    slug:lyr,//filter
    type:'single_object'//,//'item' or 'single_object' or 'full_object'
  }
  let obj_lyr = get_geovar_obj(g_ds);

  sessionStorage.outer_data_e=0;
  sessionStorage.outer_data_w=0;
  sessionStorage.outer_data_n=0;
  sessionStorage.outer_data_s=0;

  dMap.analisi01.grLyr.push(lyr);

  //--
  if(obj_lyr.feat_type=='point'){
    if(obj_lyr.cluster_type!=undefined && obj_lyr.cluster_type!='none'){
      let cluster_options = marker_cluster_custom(lyr);
      geo_lyr[lyr] = new L.MarkerClusterGroup(cluster_options);
    }
    else{
      geo_lyr[lyr] = new L.featureGroup();
    }
  }
  else{
    geo_lyr[lyr] = new L.featureGroup();
  }

  if(obj_lyr.intoc!=undefined 
    && obj_lyr.intoc===1){
    dMap.analisi01.grLyrToc.push(lyr);
  }

  sessionStorage['start_lyr_visible_'+lyr]='0';

  //search layer onStart
  g_ds = {
    geovar:"obj_maps",//obj_maps
    slug:MAPSLUG,//filter
    type:'single_object'//,//'item' or 'single_object' or 'full_object'
  }
  let objItem = get_geovar_obj(g_ds);

  //test = objItem.g_addon

  g_ds = {
    geovar:objItem.g_addon,//obj_maps
    filter_field:'addon',
    slug:'m242',//filter
    type:'single_object',//'item' or 'single_object' or 'full_object'
    noproperties:true
  }
  let objAddon = get_geovar_obj(g_ds);

  //_onsole.log(lyr,objAddon.onstart_lyr.includes(lyr)); //true

  if(objAddon.onstart_lyr!=undefined && objAddon.onstart_lyr.includes(lyr)){
    let tmp = obj_lyr;

    sessionStorage['start_lyr_visible_'+lyr]='1';
    //obj_lyr['visible']=true;
    tmp['visible']=true;
    // _onsole.log('onstart_lyr',obj_lyr);

    // _onsole.log('tmp',tmp);
    // _onsole.log('obj_lyr',obj_lyr);

  }

  if(objAddon.onstart_location!=undefined){
    let p = objAddon.onstart_location;
    mymap.setView(
      [
        p.lat,
        p.lng
      ], 
      p.zoom
    );

  }  

  prepare_map220_lyr(lyr);

  //t@his_lyr[lyr].enable=true;
  //t@his_lyr[lyr].status='on'
  //t@his_lyr[lyr].visible=true;
  add_btn_lyr();

  //--

  if(dyn_functions[lyr+'_lyr_extend']!=undefined){
    dyn_functions[lyr+'_lyr_extend']();
  } //if  dyn_functions extend
  else{

    if(obj_lyr.feat_type=='point'){
      geo_lyr_style[lyr] = function(feature,latlng) {
        //var lyr='lyr045';
        //_onsole.log(feature);
        return L.marker(
          latlng,
          {
            pane: lyr+'_pane'
          }
        ).on('click', geo_lyr_onClick[lyr]); // funzione 3 onClick sul punto
      }
      geo_lyr_onClick[lyr] = function(e) {
        console.log('geo_lyr_onClick new');
        //_onsole.log(e);
      }
    } //point
    else{

      geo_lyr_style[lyr] = function(feature, layer){
        layer.setStyle({
          fillColor:'#000',
          color:'#000',
          weight:2,
          opacity:1,
          fillOpacity:0.5,
          //clickable:false
        });//.on('click', geo_glyrsit001_onClick);
      }
    } //else  point

  } //else  dyn_functions[lyr+'_lyr_extend']!=undefined

  //legend
  if(obj_lyr.lyr_legend!=undefined){

    if(obj_lyr.lyr_legend=='sld'){

      list_legends.push(lyr);

      dyn_legends[lyr+'_legends']=function(){

        //_onsole.log(lyr+'_legends fill');

        a216_legends_load.push(lyr);

        let tab1_parts = [
          { 
            'g_slug': 'part_1',
            'g_type': 'title',
            'title': ''+obj_lyr.g_label,
            'item_lyr':lyr
          },
          { 
            'g_slug': 'part_2',
            'g_type': 'graphic',
            'item_lyr':lyr,
            'geoserver_name':obj_lyr.geoserver_name,
            'geoserver_style_name':obj_lyr.geoserver_style_name
          }
        ];

        tab1_parts.forEach(tab1_part_element => {
          box_addon216_add_part(tab1_part_element);
        });

      } //dyn_legends[lyr+'_legends']=function(){

    }
  }

  //if(typeof obj_lyr.sld_url !== "undefined"){
    if(obj_lyr.geoserver_style=='tmp_sld'){

      //_onsole.log(obj_lyr.geoserver_style_name);

      dataString={
       /*  DATA_CERT:'geodata1',
        PROTOCOLLO_CERT:'geodata2',
        TITOLO:'geodata3',
        RICHIEDENTE:'geodata4',
        LUOGO_NASCITA:'geodata5',
        DATA_NASCITA:'geodata6',
        CODICE_FISCALE:'geodata7',
        ANNOTAZIONI:'geodata8',
        PROTOCOLLO_RICH:'geodata9',
        CARTA_CERT:'geodata10',
        RISULTATI_ANALISI:'geodata11',
        RISULTATI_NORMATIVA:'geodata12', */
        // g_master:G_MASTER,
        // sld_body: true
      }

      let baseUrl = HOME_PROJECT+'/script/sld/?g_map_slug='+MAPSLUG+'&lyr='+obj_lyr.g_slug;

      var toAjax={
        type: "POST",
        url: baseUrl,  
        data:dataString,
        dataType: 'json',
        async:    true,
        cache:    false
      }

      toAjax['error']=function(xhr, textStatus, errorThrown ) {
        if(this.call_silent===false){
          on_ajax_error(this);
          log_tag_manager('ajax error','');
          //reload window?
          hide_loading();
        }
        console.log('Error ');
      }

      toAjax['success']=function(r){
        //_onsole.log(r);
        sld_body[lyr] = r;
        //$(box).attr('src', 'data:text/html;charset=utf-8,' + encodeURI(r));
      }//success

      $.ajax(toAjax); //ajax

    } //if(obj_lyr.geoserver_style=='tmp_sld'){

    //opt['sld'] = 'https:'+DOMAIN_PROJECT+'/style/'+obj_lyr.sld_url+'.sld';
    //opt['sld'] = HOME_PROJECT+'/script/sld/?g_master='+obj_lyr.geoserver_name+'';
  // }

}

// 'map244-add-part',

function m244_add_part(objPart){

  $('#row-'+objPart.g_row).remove();

  let ds = {
    'ct_slug':objPart.g_row,
    'ct_type':objPart.row_type//,//'item' or 'single_object' or 'full_object'
  }
  $('.'+objPart.g_container).append(part_ct_params(ds));

  if(objPart.g_type=='simpleTest'){

    c = 'simpleTest';
    $('.box-'+objPart.g_row).append(c);

  }
  else if(objPart.g_type=='lyrMapPreview'){

    c = ''
      +'<div '
        +'class="box" style="overflow:hidden;max-height:500px;" '
        +'></div>';
    $('.box-'+objPart.g_row).append(c);

    m244_map_init('.box-'+objPart.g_row);

  }
  
}

dlg_field_template['field_MapLyrs'] = function(optIn){

  let c = '';

  let pCol = optIn.pCol;
  let objItem = optIn.objItem;

  $('#input-'+pCol.g_slug).css('display','none');
  $('#group-'+pCol.g_slug+' > label').remove();

  m244_lyrs = objItem[pCol.g_slug];

  c = ''
    +'<div id="group-'+optIn.ct_slug+'" '
      +'class="form-group group-'+opt.slug+'">'
      +'<div class="row row-table">'
        +'<div class="col-8 col-table">'
          +pCol.g_label + '&nbsp;<span class="badge bg-danger '
            +pCol.g_slug+'-counter">'
            +m244_lyrs.length
          +'</span>'
        +'</div>'
        +'<div class="col-4 col-table" '
          +'style="text-align:right;">'
          +'<span class="box-btn_m244_field_MapLyrs"></span>'
        +'</div>'
      +'</div>'
    +'</div>'
  +'';
  $('#group-'+pCol.g_slug+'').append(c);

  create_button('btn_m244_field_MapLyrs',optIn);

}

dyn_functions['callback_paramsControl_field_MapLyrs'] = function(){

  return JSON.stringify(m244_lyrs);

}

// !dev change `slug` to `optIn`
f_btn[ 'btn_m244_field_MapLyrs']=function(item_btn,optIn){

  //_onsole.log('f_btn > btn_m244_field_MapLyrs',slug);
  //_onsole.log('optIn',optIn);

  // let objItem = optIn.objItem;
  // let pCol = optIn.pCol;

  // sessionStorage.this_dialog_lyr='m244_field_MapLyrs';
  // sessionStorage.this_dialog_slug='m244_field_MapLyrs_single';//'lyr035_single'
  // sessionStorage.this_mapslug=$('#input-g_slug').val();

  // //sessionStorage.mapclick_lng=e.latlng.lng;
  // create_dialog2(sessionStorage.this_dialog_slug);

  dyn_functions['ct_m244_field_MapLyrs_data'](optIn);

}

dyn_functions['ct_m244_field_MapLyrs_data'] = function(optIn){

  let objItem = optIn.objItem;
  let pCol = optIn.pCol;

  let ds=new Array();
  let opt=new Array();

  let dlg_slug = 'm244_field_MapLyrs_data';

  // let c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  // $('.dlg_'+dlg_slug+''+'_body').append(c);

  let c = ''
    +'<div class="ct-head2 ct-results-head2">'
      +'<div class="uppercase">Choose Map Layers</div>'
    +'</div>'
    +'<div class="ct-body2 ct-results-body2">'
    +'</div>'
    +'';

  $('.ct-results').html(c);

  //box button tab
  // c = ''
  //   +'<div class="ajs_body_head" '
  //     +'pid="999" '
  //     +'></div>'
  //   +'<div class="clearfix"></div>';
  // $('.dlg_'+dlg_slug+''+'_body').append(c);

  // c = '<div>'
  //   +'<div class="col-btn-attrs" style="text-align:left;"></div>'
  // +'</div>';
  // $('.dlg_'+dlg_slug+''+'_body').append(c);

  //box tab1
  c = '<div '
    +'class="dlg_panel dlg_panel_tab panel-tab11" '
    +'style="display:block;font-family:var(--wd-fonts-secondary);">';
  //c += '<p>TAB1</p>';
  c += '</div><!--tab1-->';
  $('.ct-results-body2').append(c);

  let parts = [
    {  
      "g_container": "panel-tab11",//container
      "g_row": "part_3",//#id row
      "row_type": "col-6",
      "g_type": "mapLyrs",
      "geovar_data": "obj_maps",
      "geovar_filter": sessionStorage.this_mapslug,
      "geovar_schema": "TB_MAP"
    }
  ];

  let objPart = parts[0];

  //-- CREATE NEW ROW MAPS LIST WITH BOX
  opt = {
    "slug": "part_3",
    "grid": "col-6",
  }
  $('.panel-tab11').append(part_ct_params(opt));

  //let o = g_meta[objPart.geovar_data].features;
  //let this_obj=o.filter(({properties}) => properties.g_slug === objPart.geovar_filter);
  //let objItem=this_obj[0].properties;

  $('.box-'+objPart.g_row+'-A').css('max-height', '500px');
  $('.box-'+objPart.g_row+'-A').css('overflow-x', 'auto');
  $('.box-'+objPart.g_row+'-B').css('max-height', '500px');
  $('.box-'+objPart.g_row+'-B').css('overflow-x', 'auto');

  //m244_lyrs = objItem.g_lyr;

  let m244_ds = {
    "g_container": ".box-"+objPart.g_row+"-A",
    "g_data":  m244_lyrs,
    "decode": "geovar_lyr"
  };

  m244_fill_box_list(m244_ds);

  let o2 = g_meta.geovar_lyr.features;
  o2.forEach(objLyr => {
    let itemLyr = objLyr.properties.g_slug;
    let itemLyrLabel = objLyr.properties.g_label;

    let faw_class='fa-square-o';
    if(m244_lyrs.includes(itemLyr)){
      faw_class='fa-square';
    }
    c = ''
      +'<icon><i class="fa '+faw_class+'" aria-hidden="true"></i></icon>'
      +'&nbsp;<span>'+itemLyr+'</span></br>';
    c = ''
      +'<div '
        +'class="m244-'+objPart.g_type+'" '
        +'style="cursor:pointer;" '
        +'id="'+objPart.g_type+'-'+itemLyr+'" '
        +'myLyr="'+itemLyr+'">'
          +'<icon><i class="fa '+faw_class+'" aria-hidden="true"></i></icon>'
          +'&nbsp;<span>' + itemLyrLabel +'</span>';
        +'</div>'
      +'';
    $('.box-'+objPart.g_row+'-B').append(c);
  });

  $('.m244-'+objPart.g_type+'').on('click',function(){

    let myLyr=$(this).attr('myLyr');

    if(m244_lyrs.indexOf(myLyr)>-1){

      m244_lyrs.splice(m244_lyrs.indexOf(myLyr),1);
      $(this).find('icon > i').removeClass('fa-square');
      $(this).find('icon > i').addClass('fa-square-o');

    }
    else{

      m244_lyrs.push(myLyr);
      $(this).find('icon > i').removeClass('fa-square-o');
      $(this).find('icon > i').addClass('fa-square');

    }

    $('.box-'+objPart.g_row+'-A').html('');

    let m244_ds = {
      "g_container": ".box-"+objPart.g_row+"-A",
      "g_data":  m244_lyrs,
      "decode": "geovar_lyr"
    };

    m244_fill_box_list(m244_ds);

    opt = {
      "m244_ds": m244_ds,
      "m244_lyrs": m244_lyrs,
      "objItem": optIn.objItem,
      "pCol": optIn.pCol
    }
    m244_fill_input(opt);

  });


}

function m244_fill_box_list(m244_ds){

  let objItem = new Array();

  m244_ds.g_data.forEach(itemLyr => {

    objItem = new Array();
    ds = {
      geovar:m244_ds.decode,//geovar_lyr
      slug:itemLyr,
      type:'single_object'//,//'item' or 'single_object' or 'full_object'
    }
    objItem = get_geovar_obj(ds);
    //_onsole.log(objItem)
    c = '<span>'+objItem.g_label+'</span></br>';
    $(m244_ds.g_container).append(c);
  });

}

function m244_fill_input(optIn){

  $('.'+optIn.pCol.g_slug+'-counter').html(optIn.m244_lyrs.length);
  $('#input-'+optIn.pCol.g_slug).val(JSON.stringify(optIn.m244_lyrs));


}

function m244_map_init(box){
  //A5 148 x 210 mm
  c = ''
    +'<div '
      +'id="m244_map" style="width: 100%;height:300px;" '
      +'></div>';
  $(box).append(c);

  maps.m244_map = L.map('m244_map',{
    minZoom: 1,
    maxZoom: 20,
    zoomControl: false,
    zoomSnap: 0.5,
    zoomDelta: 0.5,
    wheelPxPerZoomLevel: 100
  })

  maps.m244_map.setView([
    localStorage.map_lat,
    localStorage.map_lng
  ],
    localStorage.map_zoom
  );

  let lyr='lyr040';
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  maps.m244_map.createPane(lyr+'_pane');
  maps.m244_map.getPane(lyr+'_pane').style.zIndex = lyr.zIndex;

  geo_lyr[lyr] = L.tileLayer(
    obj_lyr.tile_url,
    {
      attribution: obj_lyr.attribution,
      pane: lyr+'_pane'
    }
  ).addTo(maps.m244_map);


}

dlg_field_template['field_test_edifici'] = function(optIn){

  console.log('field_test_edifici',optIn)  

}

dlg_field_template['field_volume_edifici'] = function(optIn){

  //_onsole.log('field_volume_edifici',optIn);
  let volume = optIn.objItem.shape_area*optIn.objItem.h
  $('#group-'+optIn.ct_slug).append(
    '<span class="numberM-'+optIn.ct_slug+'">'+volume+'</span>'
  );
  new AutoNumeric('.numberM-'+optIn.ct_slug+'',numberM);
}

dlg_field_template['field_streetaddress'] = function(optIn){

  //_onsole.log('field_streetaddress',optIn);
  // objItem : {civico: 3, toponimo: 'MASACCIO', tipo: 'VIA', pid: 32399}
  let string = optIn.objItem.tipo+' '+optIn.objItem.toponimo+' '+optIn.objItem.civico
  $('#group-'+optIn.ct_slug).html(
    '<span class="numberM-'+optIn.ct_slug+'">'+string+'</span>'
  );
  //new AutoNumeric('.numberM-'+optIn.ct_slug+'',numberM);
}

dlg_field_template['field_view_truefalse'] = function(optIn){

  console.log('field_view_truefalse',optIn);
  let html ='<i class="fa fa-circle-o" aria-hidden="true"></i>';
  if(optIn.objItem[optIn.pCol.g_slug] == 'SI'){
    html ='<i class="fa fa-circle" aria-hidden="true"></i>';
  }
  let display_label = 'display:block;';
  $('#group-'+optIn.ct_slug).html(''
    +'<div style="display: table;width:100%;">'
      +'<div for="exampleInputEmail1" '
        +'style="'
          +'display: table-cell;'
          +'text-transform: capitalize;'
          +'font-size: 75%;'
          +'margin-left: 3px;'
          +'margin-bottom: 6px;'
          +'width:75%;'
          +display_label
          +'">'
        +optIn.pCol.g_label
      +'</div>'
      +'<div '
        +'style="'
          +'display: table-cell;'
          +'text-align: right;'
        +'">'
        +html
      +'</div>'
    +'</div>'
  );
  //new AutoNumeric('.numberM-'+optIn.ct_slug+'',numberM);
}

dlg_field_template['field_view_number_inline'] = function(optIn){

  let html =optIn.objItem[optIn.pCol.g_slug];

  let display_label = 'display:block;';
  $('#group-'+optIn.ct_slug).html(''
    +'<div style="display: table;width:100%;">'
      +'<div for="exampleInputEmail1" '
        +'style="'
          +'display: table-cell;'
          +'text-transform: capitalize;'
          +'font-size: 75%;'
          +'margin-left: 3px;'
          +'margin-bottom: 6px;'
          +'width:75%;'
          +display_label
          +'">'
        +optIn.pCol.g_label
      +'</div>'
      +'<div '
        +'style="'
          +'display: table-cell;'
          +'text-align: right;'
        +'">'
        +html
      +'</div>'
    +'</div>'
  );
  //new AutoNumeric('.numberM-'+optIn.ct_slug+'',numberM);
}

dlg_field_template['field_colorPicker'] = function(optIn){

  let colorSlug = optIn.objItem[optIn.pCol.g_slug];
  let html = colorSlug;

  //let display_label = 'display:block;';
  $('#group-'+optIn.ct_slug).html(''
    +'<div '
      +'style="'
        +'display: table;'
        +'width:100%;'
      +'">'
      +'<div '
        +'style="'
          +'display: table-cell;'
          +'text-transform: capitalize;'
          +'font-size: 75%;'
          //+'margin-left: 3px;'
          //+'margin-bottom: 6px;'
          //+'width:25%;'
          //+display_label
          +'vertical-align: middle;'
          +'">'
        +optIn.pCol.g_label
      +'</div>'
      +'<div '
        +'style="'
          +'display: table-cell;'
          //+'text-align: right;'
          //+'width:60%;'
          +'vertical-align: middle;'
          +'padding-left: 5px;'
          +'padding-right: 5px;'
        +'">'
        +'<input '
          +'class="form-control '
            +'input-'+optIn.ct_slug+' params-control control-'+optIn.ct_slug+'" '
          +'slug="'+optIn.ct_slug+'" field_slug="'+optIn.ct_slug+'" '
          +'id="input-'+optIn.ct_slug+'" type="text" value="'+html+'" />'
      +'</div>'
      +'<div '
        +'style="'
          +'display: table-cell;'
          //+'text-align: right;'
          //+'width:15%;'
          +'vertical-align: middle;'
        +'">'  
        //+'<div class="theme-container"></div>'
        +'<div class="pickr-container-'+optIn.ct_slug+'"></div>'
        //+'<p>(Tap it)</p>'
      +'</div>'            
    +'</div>'
  );
  //new AutoNumeric('.numberM-'+optIn.ct_slug+'',numberM);

  const pickrContainer = document.querySelector('.pickr-container-'+optIn.ct_slug+'');
  //const themeContainer = document.querySelector('.theme-container');
  const themes = [
      [
          'nano',
          {
              swatches: [
                  'rgba(244, 67, 54, 1)',
                  'rgba(233, 30, 99, 1)',
                  'rgba(156, 39, 176, 1)',
                  'rgba(103, 58, 183, 1)',
                  'rgba(63, 81, 181, 1)',
                  'rgba(33, 150, 243, 1)',
                  'rgba(3, 169, 244, 1)'
              ],
  
              defaultRepresentation: 'HEXA',
              components: {
                  preview: true,
                  opacity: false,
                  hue: true,
  
                  interaction: {
                      hex: false,
                      rgba: false,
                      hsva: false,
                      input: false,
                      clear: false,
                      save: false
                  }
              }
          }
      ]
  ];
  
  const buttons = [];
  let pickr = null;
  
  for (const [theme, config] of themes) {
      const button = document.createElement('button');
      button.innerHTML = theme;
      buttons.push(button);
  
      button.addEventListener('click', () => {
          const el = document.createElement('p');
          pickrContainer.appendChild(el);
  
          // Delete previous instance
          if (pickr) {
              pickr.destroyAndRemove();
          }
  
          // Apply active class
          for (const btn of buttons) {
              btn.classList[btn === button ? 'add' : 'remove']('active');
          }
  
          // Create fresh instance
          pickr = new Pickr(Object.assign({
              el, theme,
              default: dflSldColor[colorSlug] != null ? dflSldColor[colorSlug] : colorSlug != null ? colorSlug :'#000'//'#42445a'
          }, config));
  
          // Set events
/*           pickr.on('init', instance => {
              // onsole.log('Event: "init"', instance);
          }).on('hide', instance => {
              // onsole.log('Event: "hide"', instance);
          }).on('show', (color, instance) => {
              // onsole.log('Event: "show"', color, instance);
          }).on('save', (color, instance) => {
              // onsole.log('Event: "save"', color, instance);
          }).on('clear', instance => {
              // onsole.log('Event: "clear"', instance);
          }).on('change', (color, source, instance) => {
            // onsole.log('Event: "change"', color, source, instance);
            pickr.getColor().toRGBA().toString(0);
          }).on('changestop', (source, instance) => {
              // onsole.log('Event: "changestop"', source, instance);
          }).on('cancel', instance => {
              // onsole.log('cancel', pickr.getColor().toRGBA().toString(0));
          }).on('swatchselect', (color, instance) => {
              // onsole.log('Event: "swatchselect"', color, instance);
          }); */

          pickr.on('init', instance => {
            //_onsole.log('Event: "init"', instance);
          }).on('change', instance => {
            //_onsole.log(pickr.getColor().toHEXA().toString(0));
            $('#input-'+optIn.ct_slug).val(pickr.getColor().toHEXA().toString(0));
            pickr.applyColor(true);
          }).on('hide', instance => {
            //_onsole.log('Event: "hide"', instance);
            if(optIn.pCol.f_onChange!=null){
              opt = {
                "col_slug": optIn.ct_slug,//ct_slug,
                "col_value": pickr.getColor().toHEXA().toString(0)
              }
              dyn_functions[optIn.pCol.f_onChange](opt);
            }
          });
      });
  
      //themeContainer.appendChild(button);
  }
  
  buttons[0].click();

}

// // AFTER
// 'map220-gr-lyr-after',

function map220_ready(){
  if (f_wait.geovar_lyr==0) {
    // _onsole.log('wait')
    setTimeout(function(){map220_ready()},100);
    return;
  } else {
    prepare_map220();
  };
}

function prepare_map220(){

  // _onsole.log('invalidatesize');
  mymap.invalidateSize();

  /* let g = dMap.analisi01.grLyr;

  g.forEach(lyr => {

    prepare_map220_lyr(lyr);

  }); */

}

function prepare_map220_lyr(lyr){

  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  obj_lyr.status='off';
  obj_lyr.load=false;
  obj_lyr.visible=false;
  obj_lyr.enable=true;    
  obj_lyr.editing=false;
  obj_lyr.click=true;
  obj_lyr.query=false;

  if(obj_lyr.zindex===undefined){
    console.log(lyr+'dosen\'t "zindex" defined.');
    return;
  }

  mymap.createPane(lyr+'_pane');
  mymap.getPane(lyr+'_pane').style.zIndex = obj_lyr.zindex
}

function updateCluster(processed, total, elapsed, layersArray) {
  // _onsole.log('elapsed:'+elapsed);
  // _onsole.log('processed:'+processed);
  format_autoNumeric();
}  

var createLabelIcon = function(etichetta,myclass,nLabel,anchorLabel){
  return L.divIcon({
    className: myclass,
    html: '<span class="'+ nLabel + '">'+etichetta+'</span>' ,
    iconSize: null,
    iconAnchor:[-19,43]
  })
}

// 'map228-lyr-on-click-generic',
// !dev change `slug` to `optIn`
f_btn[ 'get_lyr_single_for_dlg']=function(slug){
  
  // _onsole.log('get_lyr_single_for_dlg');
  // _onsole.log('f_btn:btn_explorer');
  //create_dialog2(slug);
  dataString={
    fn_group:'geodata',
    action:'view_data',
    collection:'lyr_single_one_table',
    qy_name:'A',
    lyr:slug,//'lyr035',
    geom:false,
    item_token:localStorage[slug+'_token'] //lyr035_token
  }
  generic_api(dataString,'get_lyr_single_for_dlg');
  return;
}

dyn_functions['succ_get_lyr_single_for_dlg'] = function(r){
  // _onsole.log(r);
  let lyr=r.ds.lyr;
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;
  obj_lyr.last_r=r;
  sessionStorage.this_dialog_lyr=r.ds.lyr;
  sessionStorage.this_dialog_slug=r.ds.lyr+'_single';//'lyr035_single'

  create_dialog2(sessionStorage.this_dialog_slug);
}

// !dev change `slug` to `optIn`
f_btn[ 'modify_lyr_single_for_dlg']=function(slug,slug2){

  //_onsole.log('modify_lyr_single_for_dlg',slug);
  //_onsole.log('modify_lyr_single_for_dlg',slug2);
  let lyr=slug;
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  let lyr2=slug;
  let o2 = g_meta.geovar_lyr.features
  let this_obj2=o2.filter(({properties}) => properties.g_slug === lyr2);
  let obj_lyr2=this_obj2[0].properties;

  var table_slug=obj_lyr.g_tables[0];
  // _onsole.log('table_slug:'+table_slug);
  g_meta.geovar_map_tb.forEach(obj => {
    // _onsole.log(obj.name)
    if(obj.name==table_slug){
      this_tb[table_slug]=obj.features;
    }
  });
  // _onsole.log(this_tb[table_slug]);

  //table_schema
  obj_lyr2.last_r=new Array();
  obj_lyr2.last_r.features=[];
  obj_lyr2.last_r.features.push(this_tb[table_slug]);

  sessionStorage.this_dialog_lyr=slug2;
  sessionStorage.this_dialog_slug=slug2+'_single';//'lyr035_single'
  //_onsole.log('modify_lyr_single_for_dlg',sessionStorage.this_dialog_slug);
  create_dialog2(sessionStorage.this_dialog_slug);

}

// !dev change `slug` to `optIn`
f_btn[ 'modify_lyr_single_for_dlg_2']=function(slug,type){
  
  // >> view map238-geovar_lyr_table_schema
  //_onsole.log('modify_lyr_single_for_dlg_2',slug)
  sessionStorage.this_dialog_lyr=slug;
  sessionStorage.this_dialog_slug=slug+'_'+type;//'lyr035_single'

  create_dialog2(sessionStorage.this_dialog_slug);

}

// 'map216-toc',

function map216_ready(){
  if (f_wait.geovar_label==0
    ||f_wait.mymap==0) {
    // _onsole.log('wait')
    setTimeout(function(){map216_ready()},100);
    return;
  } else {
    sessionStorage.prepare_discover_status = 'true';
    add_btn_lyr();
  };
}

//--
dyn_zoomstart['toc_zoomstart'] = function(){

  //_onsole.log('toc_zoomstart')
  sessionStorage.prepare_discover_status = 'false';
  //sessionStorage.zoomstart = mymap.getZoom();
  return;

}
//--
dyn_zoomend['toc_zoomend'] = function(){
  //_onsole.log('toc_zoomend')
  sessionStorage.zoomend = mymap.getZoom();

  //-
  var g = dMap.analisi01.grLyrToc;
  $.each(g,function(i, lyr){
    let o = g_meta.geovar_lyr.features
    let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
    let obj_lyr=this_obj[0].properties;

    if(obj_lyr.lyr_type=='group'){
      obj_lyr.g_options.forEach(child_lyr => {
        let child_this_obj=o.filter(({properties}) => properties.g_slug === child_lyr);
        let child_obj_lyr=child_this_obj[0].properties;
        manage_zoom_lyr(child_obj_lyr);
      });
    }
    else{
      manage_zoom_lyr(obj_lyr);
    }

  });
  //-

  sessionStorage.prepare_discover_status = 'true';
  return;
  
}
//--

function add_btn_lyr(){
  
  // _onsole.log('add_btn_lyr ...');
  // ADD BUTTON
  let g=dMap.analisi01.grLyrToc;
  $('.box-sidebar-extra').html(''
    +'<div id="toc-list-0"></div>'
  );

  $.each(g,function(i, lyr){
    // _onsole.log('add_btn_lyr',lyr);
    let o = g_meta.geovar_lyr.features
    let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
    let obj_lyr=this_obj[0].properties;
    var content = ''
      +'<div '
        +'name="'+lyr+'-toc" '
        +'lyr="'+lyr+'" '
        +'class="form-check toc-lyr '+lyr+'-toc" '
        +'>'
        +'<div class="box-toc box-toc_checkbox"></div>'
        +'<div class="box-toc box-toc_icon">'
          +'<div '
            +'style="float: left;margin-right: 5px;">'
            +'<img src="'+SOURCE_PATH+'icon/'+obj_lyr.icon+'" '
              +'style="width:20px;" />'
          +'</div>'
        +'</div>'
        +'<div class="box-toc box-toc_label">'
          +'<div>'+obj_lyr.g_label+'</div>'
        +'</div>'
      +'</div>'//form-check
      +'<div class="clearfix"></div>'
      +'<div '
        +'lyr="'+lyr+'" '
        +'class="'+lyr+'-toc-extend" style="display:none;padding-left: 25px;margin-top:5px;">'
      +'</div>'
      +'<div class="clearfix"></div>'
    +'';
    $('#toc-list-0').append(content);

    $('.'+lyr+'-toc > .box-toc_checkbox').html(''
        +'<input class="form-check-input check_'+lyr+'" type="checkbox" '
          +'value="" id="flexCheckChecked">'
    +'');

    // _onsole.log('start_lyr_visible');
    // _onsole.log(lyr);
    // _onsole.log(sessionStorage.getItem('start_lyr_visible_'+lyr));

    if(sessionStorage.getItem('start_lyr_visible_'+lyr) === null){
      sessionStorage['start_lyr_visible_'+lyr]='1';
      $('.check_'+lyr).prop('checked',true);
    }
    else if(sessionStorage.getItem('start_lyr_visible_'+lyr)== '1'){
      $('.check_'+lyr).prop('checked',true);
      obj_lyr.visible = true;
    }
    else{
      $('.check_'+lyr).prop('checked',false);
      obj_lyr.visible = false;
    }

    //obj_lyr.visible = $('.check_'+lyr).is( ":checked" );

    //dyn_zoomstart['toc_zoomstart']();

    $('.'+lyr+'-toc').on('click',function(){
      exe_lyr_toc($(this).attr('lyr'));
    }); 

    if(dyn_functions[lyr+'_toc_extend']!=undefined){
      dyn_functions[lyr+'_toc_extend']();
    }

  });//each lyr

}//add_btn_lyr

function exe_lyr_toc(lyr){

  log_tag_manager('click ' + lyr,'','');
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;
  //--
  obj_lyr.visible = $('.check_' + lyr).is( ":checked" );

  if(obj_lyr.visible===true){
    //switch automatico lyr conflict
    var t = dMap.analisi01.grTheme;
    if(t.indexOf(lyr)>=0){
      $.each(t,function(i, eLyr){
        let o = g_meta.geovar_lyr.features
        let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
        let obj_lyr=this_obj[0].properties;
        obj_lyr.visible=false;
        $('.check_'+eLyr).prop('checked',false);
        obj_lyr.visible = $('.check_' + eLyr).is( ":checked" );
      });
    }
    sessionStorage['start_lyr_visible_'+lyr]='1';
    //--
    $('.'+lyr+'-toc-extend').css('display','');
  }
  else{

    sessionStorage['start_lyr_visible_'+lyr]='0';
    //--
    $('.'+lyr+'-toc-extend').css('display','none');
    
  }

}//exe_lyr_toc

//--

function update_all_lyr(){

  dMap.analisi01.grLyr.forEach(lyr => {
    let o = g_meta.geovar_lyr.features
    let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
    let obj_lyr=this_obj[0].properties;
    if(obj_lyr.status=='on'){
      if(dMap.analisi01.grWms.indexOf(lyr)>-1){
        remove_lyr(lyr);
        switch_on_wms_b(lyr);
      }
      else{
        switch_on_lyr_b(lyr);
      }
    }
  });
}

function remove_lyr(lyr){

  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;
  obj_lyr.status='off';

  mymap.removeLayer(geo_lyr[lyr]);

  if(obj_lyr.lyr_type=='static'
    || obj_lyr.lyr_type=='db_onetime'){
    
  }
  else{
    geo_lyr[lyr].clearLayers(); 
  }


}

function hide_all_lyr(lyr){
  var g = dMap.analisi01.grLyrToc;
  $.each(g,function(i, lyr){
    obj_lyr.visible=false;
  });
}

function discover_load_lyr(obj_lyr){

  let lyr = obj_lyr.g_slug;

  if(obj_lyr.lyr_type=='static'){
    switch_on_lyr_static(lyr);//load
  }
  else if(obj_lyr.lyr_type=='db_onetime'){
    switch_on_lyr_db_onetime(lyr);//load
  }
  else if(obj_lyr.lyr_type=='wms'){
    switch_on_wms_b(lyr);
  }
  else if(obj_lyr.lyr_type=='db'){
    switch_on_lyr_b(lyr);
  }
  else if(obj_lyr.lyr_type=='db_outer'){;
    switch_on_lyr_c(lyr);
  }
  else{
    console.log('discover_load_lyr: '+lyr+' no managed');
  }

}

function discover_reload_lyr(obj_lyr){

  let lyr = obj_lyr.g_slug;

  if(obj_lyr.lyr_type=='wms'
    || obj_lyr.lyr_type=='static'
    || obj_lyr.lyr_type=='db_onetime'){

    //do nothing

  }
  else{

    if(verify_lyr_map_zoom_and_coords(lyr)=='different'){
      //_onsole.log('change something on zoom or coordinate:'+lyr);
      
      if(obj_lyr.lyr_update=='on_move'){
        //--
        if(obj_lyr.lyr_type=='db_outer'){
          switch_on_lyr_c(lyr);
        } else{
          switch_on_lyr_b(lyr);
        }
        //--
      }

    }//different
    else if(verify_lyr_map_zoom_and_coords(lyr)=='same'){
      //_onsole.log('same zoom or coordinate:'+lyr);
      if(obj_lyr.lyr_type=='db_outer'){
        mymap.addLayer(geo_lyr[lyr]);
      }
      return;
    }//same
    else{
      return;
    }//else same/different

  }//else wms/static/db_onetime

}

function discover_switch_on_lyr_exist(obj_lyr){

  let lyr = obj_lyr.g_slug;

  obj_lyr.status='on';
  mymap.addLayer(geo_lyr[lyr]);

}

function discover_switch_off_lyr(obj_lyr){

  let lyr = obj_lyr.g_slug;

  if(obj_lyr.lyr_type=='db_outer'){
    mymap.removeLayer(geo_lyr[lyr]);
  } else{
    remove_lyr(lyr);
  }
}

function manage_zoom_lyr(obj_lyr){

  let lyr = obj_lyr.g_slug;
  // _onsole.log(lyr,obj_lyr.feature_zoom_max);
  // _onsole.log(sessionStorage.zoomend);
  if(obj_lyr.feature_zoom_max >= sessionStorage.zoomend ){
    $('.check_'+lyr).prop('disabled',true);
    obj_lyr.enable=false;
  }
  else{
    $('.check_'+lyr).prop('disabled',false);
    obj_lyr.enable=true;
  }
  // _onsole.log(obj_lyr.enable);
}

function prepare_discover(){

  if(sessionStorage.prepare_discover_status == 'false'){
    return;
  }

  var g = dMap.analisi01.grLyr;
  $.each(g,function(i, lyr){

    let o = g_meta.geovar_lyr.features
    let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
    let obj_lyr=this_obj[0].properties;

    //var geo_lyr=eval('geo_'+lyr);

    //if(obj_lyr.autoupdate 
    //  && obj_lyr.autoupdate===false){
    //  return;
    //}
    // _onsole.log('prepare_discover',obj_lyr);
    //--
    if(obj_lyr.lyr_type===undefined){
      console.log(lyr+'doesn\'t "lyr_type" defined.');
      return;
    }
    //--
    if(obj_lyr.lyr_update=='manual'){
      if(dyn_lyr_discover[lyr]===undefined){
        //_onsole.log('No discover action for  ' + lyr);
        return;
      }
      else{
        dyn_lyr_discover[lyr]();
      }
      return;
    }
    //--

    if(obj_lyr.lyr_type=='group'){
      /* if(obj_lyr.g_slug=='glyrsit002'){
        //_onsole.log('=== === === ===',);
      } */
      obj_lyr.g_options.forEach(child_lyr => {
        //_onsole.log('child_lyr',child_lyr);
        //let o = g_meta.geovar_lyr.features
        let child_this_obj=o.filter(({properties}) => properties.g_slug === child_lyr);
        let child_obj_lyr=child_this_obj[0].properties;
        let visible = obj_lyr.visible;
        child_obj_lyr.visible=visible;
        /* if(obj_lyr.g_slug=='glyrsit002'){
          // _onsole.log('exe_prepare_discover',child_obj_lyr.g_slug);
          // _onsole.log(' >> lyr_type',child_obj_lyr.lyr_type);
          // _onsole.log(' >> status',child_obj_lyr.status);
          // _onsole.log(' >> enable',child_obj_lyr.enable);
          // _onsole.log(' >> visible',child_obj_lyr.visible);
          // _onsole.log(' >> load',child_obj_lyr.load);
        } */
        exe_prepare_discover(child_obj_lyr);
      });
    }
    else{
      exe_prepare_discover(obj_lyr);
    }

  });
  
}//prepare_discover

function exe_prepare_discover(obj_lyr){

  let lyr = obj_lyr.g_slug;

  if(obj_lyr.status=='pending'){
    //--
    return;

  }

  if(obj_lyr.enable===true
    && obj_lyr.visible===true){

    if(obj_lyr.status=='off'){

      if(obj_lyr.lyr_type=='static' //geojson as file
        || obj_lyr.lyr_type=='db_onetime'){ //data in db full load
        if(obj_lyr.load==false){
          discover_load_lyr(obj_lyr);
        }
        else{
          discover_switch_on_lyr_exist(obj_lyr)
        }
      }
      else{
        discover_load_lyr(obj_lyr)
      }

    }
    else if(obj_lyr.status=='on'){
      discover_reload_lyr(obj_lyr);
    }
    else{
      console.log('exe_prepare_discover: '+lyr+' no managed (1)');
    }

  }
  else if(obj_lyr.enable===false
    || obj_lyr.visible===false){
    /* if(lyr=='lyrsit006'){
      // _onsole.log('switch_off_lyr',lyr);
    } */
    discover_switch_off_lyr(obj_lyr);

  }
  else{
    //--
    console.log('exe_prepare_discover: '+lyr+' no managed (2)');
    return;
    //--
  }

  if (obj_lyr.label_zoom) {
    if(mymap.getZoom() >= obj_lyr.label_zoom){
      $('.'+lyr+'-marker-label').css('display','block');
    }
    else{
      $('.'+lyr+'-marker-label').css('display','none');
    }
  }

}

function switch_on_wms_b(lyr,withRandint='no'){

  //var geo_lyr=eval('geo_'+lyr);
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  var opt_pane=lyr+'_pane';

  //_onsole.log('switch_on_wms_b',lyr);
  if(lyr=='lyrsit117'){
    // var opt={
    //   pane:opt_pane
    // };
    // geo_lyr[lyr].addLayer(L.tileLayer.wms(
    //   'https://api.mapbox.com/styles/v1/adminstudiosit/clboya8pl000d14lobr1lhbyv/wmts?access_token=pk.eyJ1IjoiYWRtaW5zdHVkaW9zaXQiLCJhIjoiY2xieXRxdHZvMDh6cDNvbXptMWY0ZHF2ZCJ9.tfhfTuRe-3-STkYzpuhxJg',
    //   opt
    // ));

    geo_lyr[lyr].addLayer(L.tileLayer(
      'https://api.mapbox.com/styles/v1/adminstudiosit/clboya8pl000d14lobr1lhbyv/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWRtaW5zdHVkaW9zaXQiLCJhIjoiY2xieXRxdHZvMDh6cDNvbXptMWY0ZHF2ZCJ9.tfhfTuRe-3-STkYzpuhxJg', {
      tileSize: 512,
      zoomOffset: -1,
      pane: opt_pane,//'edifici3d',
      attribution: '© <a href="https://www.mapbox.com/contribute/">Mapbox</a>'
    }));

  }
  else{

    var opt_layer=WORKSPACE+':'+obj_lyr.geoserver_name+GEOSERVER_SUFFIX;

    let optWms={
      //layers:opt_layer,
      transparent:'true',
      format:'image/png',//PNG 24bit
      //format_options:'dpi:300',
      opacity:1,
      tiled: false,
      //info_format: 'text/html',
      pane:opt_pane,
      antialiasing:'on',
      maxZoom: 20,
      version: '1.3.0'
    };

    if(obj_lyr.geoserver_style=='tmp_sld'){
        //opt['sld'] = 'https:'+DOMAIN_PROJECT+'/style/'+obj_lyr.sld_url+'.sld';
        optWms['sld'] = 'https:'+DOMAIN_PROJECT+'/tmp/'+obj_lyr.geoserver_style_name+'_'+lyr+'.sld';
        //opt['sld'] = HOME_PROJECT+'/script/sld/?g_master='+obj_lyr.geoserver_name+'';
        //opt['sld_body'] = encodeURIComponent(sld_body[lyr]);
    }
    else if(obj_lyr.geoserver_style=='default'){
      optWms['layers'] = opt_layer;

    }
    else{
      optWms['styles'] = obj_lyr.geoserver_style;
      optWms['layers'] = opt_layer;
    }

    //_onsole.log(obj_lyr);
    if(typeof obj_lyr.g_options[0] !== "undefined"){

      //_onsole.log(obj_lyr.g_options[0].geoserver_filter);

      if(typeof obj_lyr.g_options[0].geoserver_filter !== "undefined"){
        let geoserver_filter = obj_lyr.g_options[0].geoserver_filter;

        let i = 0;
        let cql_string = '';
        geoserver_filter.forEach(filter => {
          //_onsole.log(filter.val);
          if(i==0){
            cql_string += filter.col+' IN (\''+filter.val[0]+'\')';
          }
          else{
            cql_string += ' AND ' + filter.col+' IN (\''+filter.val.join('\',\'')+'\')';
          }
          i++;
        });
        optWms['CQL_FILTER'] = cql_string;
      }

    }

    //CQL_FILTER: g_master=G_MASTER

    //_onsole.log('load wms',opt);

    //_onsole.log('no wms services');

    let opt={
      mymap:mymap,
      lyr:lyr,
      optWms:optWms,
      tileType:'Tiled'
    }

    if(
      lyr=='lyrsit115'||lyr=='lyrsit114'
      || lyr=='lyr707e06be'||lyr=='lyr70a206c3'
      || lyr=='lyr713106d0'||lyr=='lyr70fd06ca'
      ){

      opt['tileType']='nonTiled';
    
    }

    if(withRandint=='yes'){
      opt['withRandint']='yes';
    }

    wmsAddLyrToMap(opt);

  }


  
}//switch_on_wms_b

function switch_on_lyr_b(lyr){

  // _onsole.log('switch_on_lyr_b('+lyr+')');
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  //var geo_lyr=eval('geo_'+lyr);
  const b = mymap.getBounds();
  var E = b.getEast();//-0.05;
  var W = b.getWest();//+0.05;
  var N = b.getNorth();//-0.03;
  var S = b.getSouth();//+0.03;
  var current_zoom = mymap.getZoom();
  var ext_lat = Math.abs(S-N)/2;
  var ext_lng = Math.abs(E-W)/2;
  var from_load_lat=Math.abs(obj_lyr.load_lat-dMap.map.stop_lat);
  var from_load_lng=Math.abs(obj_lyr.load_lng-dMap.map.stop_lng);
  
  mymap.removeLayer(geo_lyr[lyr]);
  geo_lyr[lyr].clearLayers();

  obj_lyr.status='pending';
  const c = mymap.getCenter();
  obj_lyr.load_lat=c.lat.toFixed(3);
  obj_lyr.load_lng=c.lng.toFixed(3);
  obj_lyr.load_zoom=mymap.getZoom(); 

  if (typeof obj_lyr.toc_extend !== 'undefined') {
    // the variable is defined
    
    if(obj_lyr.toc_extend.length==obj_lyr.toc_extend_checked.length){
      // _onsole.log('all checked');
      var query_toc_checked = 'false';
    }
    else{
      // _onsole.log('some checked');
      var query_toc_checked = 'true';
    }

  }
  else{
    var query_toc_checked = 'false';
  }

  var dataString = {
    fn_group:'geodata',
    action:'view_data',
    collection:'lyr_all',
    qy_name:'A',
    lyr:lyr,
    geom:1,
    //lat:0,
    //lng:0,
    current_zoom: current_zoom,
    mye:E+ext_lng,
    myw:W-ext_lng,
    myn:N+ext_lat,
    mys:S-ext_lat,
    min_e:E,
    min_w:W,
    min_n:N,
    min_s:S,
    query:obj_lyr.query,
    query_toc:query_toc_checked
  };

  if(obj_lyr.query==true){
    dataString.filter_field=obj_lyr.filter_field;
    dataString.filter_value=obj_lyrfilter_value;
  }

  if(query_toc_checked=='true'){
    dataString.toc_filter_field=obj_lyr.toc_filter_field;
    dataString.toc_filter_value=obj_lyr.toc_extend_checked;
  }

  generic_api(dataString,'switch_on_lyr_b');

}//switch_on_lyr_b

dyn_functions['succ_switch_on_lyr_b'] = function(r){
  // _onsole.log('succ_switch_on_lyr_b');
  let lyr=r.ds.lyr;
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  obj_lyr.last_r=r.features;
  //var geo_lyr=eval('geo_'+lyr);
  obj_lyr.status='on';
  
  if(obj_lyr.lyr_type=='polygon'
    ||obj_lyr.lyr_type=='polyline'){
    var geojson = L.geoJson(r,{
      onEachFeature:geo_lyr_style[lyr],
      pane:lyr+'_pane'
    });
  }
  else{

    var geojson = L.geoJson(r,{
      pointToLayer: geo_lyr_style[lyr]//, //function_iconLabel
      //pane:lyr+'_pane' defined in icon
    });

  }
  
  geo_lyr[lyr].addLayer(geojson);
  // FINAL ADD!
  geo_lyr[lyr].addTo(mymap);

  //format_autoNumeric();

  if(r.ds.query=='true'){
    obj_lyr.envelope=r.features_envelope;
  }

}//succ_switch_on_lyr_b

function switch_on_lyr_db_onetime(lyr){

  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  obj_lyr.status='pending';

  var dataString = {
    fn_group:'geodata',
    action:'view_data',
    collection:'lyr_all_fix',
    qy_name:'A',
    lyr:lyr,
    geom:1,
  };

  generic_api(dataString,'switch_on_lyr_generic');

}//switch_on_lyr_db_onetime

function switch_on_lyr_static(lyr){

  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  obj_lyr.status='pending';

  $.ajax({
    type:     "GET",
    url:      obj_lyr.geojson_url,
    //data:     dataString,
    dataType: 'json',
    async:    true,
    cache:    false,
    lyr:lyr,
    tryCount : 0,
    retryLimit : 3,
    //temp_name : pointname,
    error : function(xhr, textStatus, errorThrown ) {
        this.tryCount++;
        if (this.tryCount <= this.retryLimit) {
            //try again
            $.ajax(this);
            return;
        }
        return;
    },
    success:  function(response){
      //var geo_lyr=eval('geo_'+lyr);

      let lyr=this.lyr;
      let o = g_meta.geovar_lyr.features
      let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
      let obj_lyr=this_obj[0].properties;

      if(obj_lyr.feat_type=='point'){
        var options={
          pointToLayer: geo_lyr_style[lyr],
          pane:lyr+'_pane'
        }
      }
      else{
        var options={
          onEachFeature: geo_lyr_style[lyr],
          pane:lyr+'_pane'
        }
      }

      var geoJson = L.geoJson(response,options);
      // aggiunta dei punti al featuregroup
      // per gestirli più facilmente
      geo_lyr[lyr].addLayer(geoJson);

      // aggiunta del featuregroup alla mappa
      geo_lyr[lyr].addTo(mymap);

      obj_lyr.status='on';
      obj_lyr.load=true;
    }
  });

}//switch_on_lyr_static

function switch_on_lyr_c(lyr){

  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  obj_lyr.status='pending';

  //var geo_lyr=eval('geo_'+lyr);
  const b = mymap.getBounds();
  const c = mymap.getCenter();

  obj_lyr.load_lat=c.lat.toFixed(3);
  obj_lyr.load_lng=c.lng.toFixed(3);
  obj_lyr.load_zoom=mymap.getZoom();
  obj_lyr.load_zoom=mymap.getZoom();


  if(obj_lyr.load_E < sessionStorage.outer_data_e
    && obj_lyr.load_W > sessionStorage.outer_data_w
    && obj_lyr.load_N < sessionStorage.outer_data_n
    && obj_lyr.load_S > sessionStorage.outer_data_s){
    // _onsole.log('view inside');
    obj_lyr.status='on';
    return;
  }

  obj_lyr.load_E = b.getEast();
  obj_lyr.load_W = b.getWest();
  obj_lyr.load_N = b.getNorth();
  obj_lyr.load_S = b.getSouth();

  sessionStorage.outer_data_e = b.getEast() + ((b.getEast()-b.getWest())*0.25);
  sessionStorage.outer_data_w = b.getWest() - ((b.getEast()-b.getWest())*0.25);
  sessionStorage.outer_data_n = b.getNorth() + ((b.getNorth()-b.getSouth())*0.25);
  sessionStorage.outer_data_s = b.getSouth() - ((b.getNorth()-b.getSouth())*0.25);

  //_onsole.log(lyr)

  mymap.removeLayer(geo_lyr[lyr]);
  geo_lyr[lyr].clearLayers();

  var dataString = {
    fn_group:'geodata',
    action:'view_data',
    collection:'lyr_all_outer',
    qy_name:'A',
    lyr:lyr,
    geom:1,
    current_zoom:mymap.getZoom(),
    mye:b.getEast(),
    myw:b.getWest(),
    myn:b.getNorth(),
    mys:b.getSouth(),
    data_e:sessionStorage.outer_data_e,
    data_w:sessionStorage.outer_data_w,
    data_n:sessionStorage.outer_data_n,
    data_s:sessionStorage.outer_data_s
  };

  generic_api(dataString,'switch_on_lyr_generic');

}//switch_on_lyr_c

function switch_on_lyr_custom(dataString){

  let lyr=dataString.lyr;
  let obj_lyr={};

  if(lyr!='lyr999' && dataString.geom!=false){

    let o = g_meta.geovar_lyr.features
    let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
    obj_lyr=this_obj[0].properties;

    obj_lyr.status='pending';

    if(dataString.world!=undefined && dataString.world==true){
      //_onsole.log('world==true');
    }
    else{
      //_onsole.log('world==???');
      //var geo_lyr=eval('geo_'+lyr);

      if(obj_lyr.feat_type!='table'){
        const b = mymap.getBounds();

        const c = mymap.getCenter();
        obj_lyr['load_lat']=c.lat.toFixed(3);
        obj_lyr['load_lng']=c.lng.toFixed(3);
        obj_lyr['load_zoom']=mymap.getZoom();

        if(b.getEast() < sessionStorage.outer_data_e
          && b.getWest() > sessionStorage.outer_data_w
          && b.getNorth() < sessionStorage.outer_data_n
          && b.getSouth() > sessionStorage.outer_data_s){
          // _onsole.log('view inside');
          obj_lyr.status='on';
          return;
        }
        sessionStorage.outer_data_e = b.getEast() + ((b.getEast()-b.getWest())*0.25);
        sessionStorage.outer_data_w = b.getWest() - ((b.getEast()-b.getWest())*0.25);
        sessionStorage.outer_data_n = b.getNorth() + ((b.getNorth()-b.getSouth())*0.25);
        sessionStorage.outer_data_s = b.getSouth() - ((b.getNorth()-b.getSouth())*0.25);

        //--

        dataString.mye=b.getEast();
        dataString.myw=b.getWest();
        dataString.myn=b.getNorth();
        dataString.mys=b.getSouth();
        dataString.data_e=sessionStorage.outer_data_e;
        dataString.data_w=sessionStorage.outer_data_w;
        dataString.data_n=sessionStorage.outer_data_n;
        dataString.data_s=sessionStorage.outer_data_s;
      }

    }

    let map_lyr = lyr;
    if(dataString.output_lyr!=undefined){
      map_lyr = dataString.output_lyr;
    }

    if(obj_lyr.feat_type!='table'){
      mymap.removeLayer(geo_lyr[map_lyr]);
      geo_lyr[map_lyr].clearLayers();
    }

  }
  else{
    obj_lyr.g_slug=lyr;
  }

  generic_api(dataString,'switch_on_lyr_generic');

}//switch_on_lyr_c

dyn_functions['succ_switch_on_lyr_generic'] = function(r){

  //_onsole.log(r);
  let lyr=r.ds.lyr;
  let obj_lyr={};

  if(lyr!='lyr999'){
    let o = g_meta.geovar_lyr.features
    let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
    obj_lyr=this_obj[0].properties;
    obj_lyr.last_r=r.features;
    //var geo_lyr=eval('geo_'+lyr);
    
    if(obj_lyr.lyr_type=='db_onetime'){
      obj_lyr.load=true;
    }
  }
  else{
    obj_lyr.g_slug=lyr;
  }

  load_geo_lyr(r,obj_lyr);
  return;

}//succ_switch_on_lyr_c

function load_geo_lyr(r,obj_lyr){
  //_onsole.log('load_geo_lyr');
  let lyr=r.ds.lyr;
  //_onsole.log(obj_lyr);
  if(lyr!='lyr999'){
    if(obj_lyr.feat_type!='table'){
      if(obj_lyr.feat_type=='polygon'
        ||obj_lyr.feat_type=='polyline'){

        var geojson = L.geoJson(r,{
          onEachFeature: geo_lyr_style[lyr],
          pane:lyr+'_pane'
        });

      }
      else{

        var geojson = L.geoJson(r,{
          pointToLayer: geo_lyr_style[lyr]//, //function_iconLabel
          //pane:lyr+'_pane' defined in icon
        });

      }

      let map_lyr = lyr;
      if(r.ds.output_lyr!=undefined){
        map_lyr = r.ds.output_lyr;
      }
      //_onsole.log(map_lyr)
      geo_lyr[map_lyr].addLayer(geojson);

      // FINAL ADD!
      geo_lyr[map_lyr].addTo(mymap);
    }
    obj_lyr.status='on';
  }
  //_onsole.log(r.ds.fn_extend);
  if(r.ds.fn_extend!=undefined 
    && dyn_functions[r.ds.fn_extend]!=undefined){
    //_onsole.log(r.ds.fn_extend+' done');
    dyn_functions[r.ds.fn_extend](r);
  }

}

function wmsAddLyrToMap(optIn){

  let wmsUrl = GEOSERVER_URL+WORKSPACE+'/wms?';

  //_onsole.log('wmsAddLyrToMap',optIn);

  let thisLyr = optIn.lyr;
  if(optIn.myaddon!=null){
    thisLyr = optIn.myaddon+'_'+optIn.lyr;
  }

  if(optIn.withRandint!=null){

    let redrawint = Math.floor( Math.random() * 200000 ) + 1;
    optIn.optWms['randint'] = redrawint;
    wmsUrl += '{randint}';

  }

  lastWmsUrl[optIn.lyr] = wmsUrl;
  lastWmsOpt[optIn.lyr] = optIn.optWms;

  let tL = L.tileLayer.wms(
     wmsUrl,
     optIn.optWms
  )

  if(optIn.tileType=='nonTiled'){
    tL = L.nonTiledLayer.wms(
      wmsUrl,
      optIn.optWms
    );
  }

  geo_lyr[thisLyr].addLayer(tL);
  // FINAL ADD!
  geo_lyr[thisLyr].addTo(optIn.mymap); 

  //--

  if(optIn.g_callback!=null){
    dyn_functions[optIn.g_callback](optIn.g_callback_opt);
  }

  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === optIn.lyr);
  let obj_lyr=this_obj[0].properties;

  obj_lyr.status='on';

}

// 'addon201-template',

// 'map221-extra',

dyn_functions['succ_show_table'] = function(r){

  var f = r.features;
  var p = f.properties;
  var f0 = r.features[0];
  var foo = Object.keys(f0.properties);

  $('.mapid-table').append('<thead><tr></tr></thead>');
  $('.mapid-table').append('<tbody></tbody>');

  foo.forEach((foo_el) => {
    $('.mapid-table > thead > tr').append('<th scope="col">'+foo_el+'</th>');
  });

  var c=0;
  f.forEach(element => {
    ++c;
    var p = element.properties;
    var foo = Object.keys(p);
    $('.mapid-table > tbody').append('<tr id="tr-'+c+'"></tr>');
    foo.forEach((foo_el) => {
       $('#tr-'+c).append('<td>'+p[foo_el]+'</td>');
    });
  });

}

// 'map230-map-click',

function m230_ready(){
  // onsole.log('m230_ready');
  if (typeof mymap !== 'undefined') {
    switch (m211_mapLibrary) {
      case 'leafletjs':    

        dMap.mapclick_status = true;

        mymap.on('click', (e) => {
          let opt = {
            lat: e.latlng.lat,
            lng: e.latlng.lng
          }
          on_mapclick(opt);
        });

      break;
      case 'mapbox':

        dMap.mapclick_status = true;

        mymap.on('click', (e) => {
          let opt = {
            lat: e.lngLat.lat,
            lng: e.lngLat.lng
          }
          on_mapclick(opt);
        });

      break;
      case 'maplibre':

        dMap.mapclick_status = true;

        mymap.on('click', (e) => {
          let opt = {
            lat: e.lngLat.lat,
            lng: e.lngLat.lng
          }
          on_mapclick(opt);
        });

      break;
      default:

        console.log(`Not m230_ready() options for ${m211_mapLibrary}.`);

    } // switch
  }

}

//---

function on_mapclick(opt){
  
  sessionStorage.mapclick_lat=opt.lat;
  sessionStorage.mapclick_lng=opt.lng;

  if(dMap.mapclick_status===true){

    list_mapclick.forEach(element => {

      let itemAddon = element;
      let o = g_meta.geovar_addon.features;
      let obj_fileterd=o.filter(
        ({properties}) => properties.g_slug === itemAddon
      );
      let obj_addon = obj_fileterd[0];
    
      if(obj_addon.properties.mapclick_status=='enabled'){
        
        if(dyn_mapclick[element]!=null){
          dyn_mapclick[element](opt);
        }
        else{
          console.log('dyn_mapclick['+element+'] is not defined')
        }
      }
      
    });

  }
  
}

function prepare_mapclick(){

  let disable_mapclick_count=0;

  var g = dMap.analisi01.grLyr;
  g.forEach(lyr => {

    let o = g_meta.geovar_lyr.features
    let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
    let obj_lyr=this_obj[0].properties;

    if(obj_lyr.disable_mapclick!=undefined 
      && obj_lyr.disable_mapclick===true){
      if(dMap.analisi01[element].visible===true){
        disable_mapclick_count++;
      }
    }

  });

  if(disable_mapclick_count>0){
    dMap.mapclick_status = false;
  }
  else{
    dMap.mapclick_status = true;
  }
}

// name a function to disable all click except this element
// function that disables all clicks on a web page except 
// for a specified element:
function disableMapClicksExcept(element) {
  // _onsole.log('disableMapClicksExcept',element.id);
  let itemAddon = element.id.replace('btn_', '');
  let o = g_meta.geovar_addon.features;
  let obj_fileterd=o.filter(
    ({properties}) => properties.g_slug === itemAddon
  );
  let obj_addon = obj_fileterd[0];

  if(obj_addon.properties.mapclick_status=='enabled'){

    obj_addon.properties.mapclick_status='disabled';

    $('#'+element.id).css('background-color','white');
    $('#mapid').css('cursor','default');

    if(dyn_functions['disable_'+itemAddon]!=null){
      dyn_functions['disable_'+itemAddon]();
    }

  }
  else{
    // Get all clickable elements on the page
    const clickableElements = document.querySelectorAll('.btn-map-click');
    
    // Loop through each clickable element
    clickableElements.forEach(clickableElement => {
      // // Disable the element's click event listener
      // clickableElement.removeEventListener('click', disableClickEvent);

      let itemAddon = clickableElement.id.replace('btn_', '');

      // _onsole.log(itemAddon)
      let objFileterd=g_meta.geovar_addon.features.filter(
        ({properties}) => properties.g_slug === itemAddon
      );
      let objAddon = objFileterd[0];
      
      // If the element is not the specified element, disable its click event listener
      if (clickableElement !== element) {
        //clickableElement.addEventListener('click', disableClickEvent);

        objAddon.properties.mapclick_status='disabled';

        $('#'+clickableElement.id).css('background-color','white');

        if(dyn_functions['disable_'+itemAddon]!=null){
          dyn_functions['disable_'+itemAddon]();
        }

      }

    });

    let itemAddon = element.id.replace('btn_', '');

    // _onsole.log(itemAddon)
    let objFileterd=g_meta.geovar_addon.features.filter(
      ({properties}) => properties.g_slug === itemAddon
    );
    let objAddon = objFileterd[0];

    objAddon.properties.mapclick_status='enabled';

    $('#'+element.id).css('background-color','yellow');
    $('#mapid').css('cursor','crosshair');

    if(dyn_functions['enable_'+itemAddon]!=null){
      dyn_functions['enable_'+itemAddon]();
    }    

  }


  
  // Define a function to disable the click event
  // function disableClickEvent(event) {
  //   event.preventDefault();
  //   event.stopPropagation();
  // }
}

// 'map236-template-mobile',
function m236_ready(){
  // onsole.log('m236_ready');
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

  // onsole.log('map236-template-mobile_ready');
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

// 'map240-map-scale'

//--
//list_zoomend.push('get_scale_dimension');
dyn_zoomend['get_scale_dimension'] = function(map){

  //$('.map-control-scalebar-ratiomenu > .menu').css('display','block!important');
  //$('.map-control-scalebar-ratiomenu > .menu').css('top','-500px');
  //$('#mapid').css('width','15cm');
  //$('#mapid').css('height','15cm');

  //mymap.fitBounds([[45.46745455950747,9.243019510738081],[45.47182876931522,9.25581948299337]]);

  // Get the y,x dimensions of the map
  // var y = mymap.getSize().y, //px
  //     x = mymap.getSize().x; //px
  
  // _onsole.log('Map width in pixel: '+x);
  // calculate the distance the one side of the map to the other using the haversine formula
  //var maxMeters = mymap.containerPointToLatLng([0, y]).distanceTo( mymap.containerPointToLatLng([x,y]));
  // _onsole.log('Map width in meter: '+maxMeters);
  // calculate how many meters each pixel represents
  //var MeterPerPixel = maxMeters/x ;
  // _onsole.log('MeterPerPixel: '+MeterPerPixel);
  //var PixelPerMeter = x/maxMeters;
  // _onsole.log('PixelPerMeter: '+PixelPerMeter);


  //let scale = L.control.scale()
  // This is the scale denominator
  // onsole.log(MeterPerPixel*scale.options.maxWidth);

  //878 px = 270 mm
  //DPI = DotPerInch
  //1 inch = 25.4 mm
  //270 mm / 25.4 mm = 10.629 inch
  //878 px = 10.629 inch
  //878 px / 10.629 inch = 82.604 DPI

  //mapPixel:mapMeter=100:x
  //mapMeter*100/mapPixel
  //let Meter100Pixel = maxMeters*100/x;
  // _onsole.log('Meter per 100 pixel: '+Meter100Pixel+'m');
  // _onsole.log('Zoom: '+mymap.getZoom()+'');

  //Zoom: 16 >> Meter per 100 pixel: 167.37 m
  //Zoom: 17 >> Meter per 100 pixel: 83.68 m

  //Map width in pixel:167.37=x:100
  //1091:167.37=x:100
  //16*100/167=

  //var pixelsInMeterWidth = PixelPerMeter;
  var pxInMeterWidth = pixelsInMeterWidth();
  let scaleRatio = sessionStorage.scaleratio;
  //setScaleRatio (function)

  var bounds = map.getBounds(),
    centerLat = bounds.getCenter().lat,
    crsScale = pxInMeterWidth * getMapWidthForLanInMeters(centerLat) / scaleRatio;

  // _onsole.log('My-scaleRatio:'+scaleRatio);
  // _onsole.log('My-centerLat:'+centerLat);
  // _onsole.log('My-crsScale:'+crsScale);
  // _onsole.log('My-pixelsInMeterWidth:'+pxInMeterWidth);

  //this._map.setZoom(this._map.options.crs.zoom(crsScale));
  let crs_zoom=map.options.crs.zoom(crsScale);
  // _onsole.log('MyZoom: '+crs_zoom);
  map.setZoom(crs_zoom);

}

// Returns width of map in meters on specified latitude.
function getMapWidthForLanInMeters(currentLan) {
  return 6378137 * 2 * Math.PI * Math.cos(currentLan * Math.PI / 180);
}

// Returns pixels per meter; needed if ratio: true.
function pixelsInMeterWidth(){
  var div = document.createElement('div');
  div.style.cssText = 'position: absolute;  left: -100%;  top: -100%;  width: 100cm;';
  document.body.appendChild(div);
  var px = div.offsetWidth;
  document.body.removeChild(div);
  return px;
}

//--

function btnOptDefault() {
  let r = {
    itemSlug:'btn_default_change_this',//'btn_closedlg3',
    itemLabel: {
      "default":"<i class=\"bi bi-bandaid\"></i>",
    },//gLang.label_close,
    itemDescription: {"default":"..."},
    //itemLabel:'<i class="fa fa-ellipsis-h" aria-hidden="true"></i>',
    itemClass:'btn-sm btn-dark', // btn-main-sidebar',
    //btnOnClick:'close',
    itemType:'button', //form-switch
    itemDisabled:false,
    itemStyle:'', //backgrund-color:red;
    g_group: ["public"],
    g_responsive: "both", //both, mobile, desktop
    //"g_callback": 'btn_save_point', // same as btnSlug
  }
  return r;
}

function dsOptDefault(action = 'view_data') {

  let r = {
    fn_group:'geodata',
    action:action,
    qy_name:'A',
    lyr:'lyr999',
    geom:0
  }
  return r;
}

function default_logo(optIn){
  // _onsole.log('default_logo',optIn)
  c = ''+
    '<div id="box-main-logo">&nbsp;'+
    '</div>'+
  '';
  $(optIn.container).html(c);

  $('#box-main-logo').css('background-image','url("'+DFL_LABEL_MAIN_LOGO+'")');
  $('#box-main-logo').css('background-repeat','no-repeat');
  $('#box-main-logo').css('background-size','225px');
  $('#box-main-logo').css('background-position','center');
  $('#box-main-logo').css('height','100%');
  $('#box-main-logo').css('cursor','pointer');
  
  $('#box-main-logo').on('click',function(){
    let item_dlg = 'dlg_Sidebar';

    var meta = {
      'properties':{
        'g_slug': item_dlg+'_single',
        'g_label': 'Sidebar',
        'g_template': 'template_by_slug',
        'g_description': null
      }
    }
    g_meta.geovar_dialog.features.push(meta);
  
    sessionStorage.this_dialog_lyr=item_dlg;
    sessionStorage.this_dialog_slug=item_dlg+'_single';//'lyr035_single'

    create_dialog2(sessionStorage.this_dialog_slug);
  });

}

dyn_functions['template_by_slug_'+'dlg_Sidebar'+'_single'] = function(){

  let dlg_slug = 'dlg_Sidebar'+'_single';

  let c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //box button tab
  $('.dlg_'+dlg_slug+''+'_body').append(''
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>'
    +'<div class="ajs_body_content"></div>');
 
  list_dlg_logo.forEach(element => {
    dyn_functions['dlg_'+element+'_body']();
  });

}

async function getAllUsersData() {

  let datastring = {
    fn_group:'geodata',
    action:'view_data',
    collection:'getAllUsersData',
    qy_name:'A',
    lyr:'lyr999'  
  } 

  let r = await generic_api_v2(datastring,'getAllUsersData');

  list_players.features = r.features;

}

async function default_search_map_by_token() {

  let datastring = {
    fn_group:'geodata',
    action:'view_data',
    collection:'default_search_map_by_token',
    qy_name:'A',
    geom:1,
    user_token:localStorage.user_token
  } 

  let r = await generic_api_v2(datastring,'default_search_map_by_token');

  list_MapByToken.features = r.features;
  
}

async function update_obj_maps() {

  let datastring = {
    fn_group:'geodata',
    action:'view_data',
    collection:'update_obj_maps',
    qy_name:'A',
    geom:1
  } 

  let r = await generic_api_v2(datastring,'update_obj_maps');

  g_meta.obj_maps = r;
  
}

function load_decode_data(){

  let g_meta_decode_data_list = [
    'lyr_prodotto_a',
    'lyr_societa_a'
  ];

  g_meta_decode_data_list.forEach(element => {

    var dataString = {
      fn_group:'geodata',
      action:'view_data',
      collection:'decode_data',
      qy_name:'A',
      lyr:element
    };
    generic_api(dataString,'load_decode_data');

  });

  f_wait['decode_data']=1;

}

dyn_functions['succ_load_decode_data'] = function(r){
  //_onsole.log(r)
  let slug=r.ds.lyr;
  //_onsole.log('Load '+slug+': success');
  let f = r.features;
  
  g_decode[slug]=new Array();

  f.forEach(element => {
    let p = element.properties;
    g_decode[slug][p.codgeo]=p.myname;
  });

  f_wait['decode_data_'+slug]=1;
  //_onsole.log(g_meta);

}

function prepare_load_sub_scripts(subScripts){

  //-- ADD SUB SCRIPT
  // let subScripts = a279_subScript;
  // _onsole.log('a279_load_sub_scripts',subScript)
  $('body').append('<!-- HIDDEN ELEMENTS - LOAD BY SCRIPT -->');
  subScripts.forEach(element => {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    let url=THEME_PROJECT+'/src/js/'+element+'.js?ver='+VER;
    // script.src = url;
    // document.head.appendChild(script);
    // loadScript(url)
    // // .catch(loadScript.bind(null, localSource))
    // .then(successCallback(element), failureCallback);
    load_sub_scripts(url,element, callback_load_sub_scripts);    
  });
  return;
}

function prepare_load_sub_scripts_block(optIn){
  // _onsole.log('prepare_load_sub_scripts_block',optIn);
  //-- ADD SUB SCRIPT
  // let subScripts = a279_subScript;
  // _onsole.log('a279_load_sub_scripts',subScript)
  $('body').append('<!-- HIDDEN ELEMENTS - LOAD BY SCRIPT -->');
  optIn.forEach(element => {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    let master = element.master;
    element.subblocks.forEach(subblock => {
      let url=THEME_PROJECT+'/src/js/'+master+'/'+subblock+'.js?ver='+VER;
      // script.src = url;
      // document.head.appendChild(script);
      // loadScript(url)
      // // .catch(loadScript.bind(null, localSource))
      // .then(successCallback(element), failureCallback);
      load_sub_scripts(url,master+'__'+subblock, callback_load_sub_scripts);
    });

  });
  return;
}

function load_sub_scripts(url, element, callback){

  // _onsole.log('load_sub_scripts',url, element, callback);
  var script = document.createElement('script');
  script.src = url;

  script.onload = function() {
    if (typeof callback === 'function') {
      callback(element);
    }
  };

  document.body.appendChild(script);

  $('body').append('<!-- '+element+' -->');

}

function callback_load_sub_scripts(element) {
  // Your code for the function to be executed when the script is ready
  // onsole.log('Script loaded and function executed! ' + element);
  if(dyn_functions[element+'_ready']!=null){
    dyn_functions[element+'_ready']();
  }
  else{
    // _onsole.log(element+'_ready','not found')
  }  
}

async function check_if_geovar_table_exists(optIn) {

  await new Promise(resolve => setTimeout(resolve, 1));

  // _onsole.log('start_2');

  let datastring = {
    fn_group:'geodata',
    action:'view_data',
    collection:'check_if_geovar_table_exists',
    qy_name:'A',
    geom:1,
    table_slug:optIn.table_slug,
    table_name:optIn.table_name,
    master_type:optIn.master_type
  } 
  //let r = await a254_seqAllNodes(myUrl);
  let r = await generic_api_v2(datastring,'check_if_geovar_table_exists');

  geovar_table_exists[optIn.table_slug] = r;

}

async function check_if_geovar_table_schema(table_slug) {

  await new Promise(resolve => setTimeout(resolve, 1));

  // _onsole.log('start_2');

  let datastring = {
    fn_group:'geodata',
    action:'view_data',
    collection:'check_if_geovar_table_schema',
    qy_name:'A',
    geom:1,
    table_slug:table_slug
  } 
  let r = await generic_api_v2(datastring,'check_if_geovar_table_schema');

  geovar_table_schema[table_slug] = r;

}

async function getAllInstallationTables(){

  await new Promise(resolve => setTimeout(resolve, 1));

  // _onsole.log('start_2');

  let datastring = {
    fn_group:'geodata',
    action:'view_data',
    collection:'getAllInstallationTables',
    qy_name:'A',
    geom:1
  } 
  let r = await generic_api_v2(datastring,'getAllInstallationTables');

  installation_tables = r;

}

function mvt_visibility(lyr){

  let o = g_meta.geovar_lyr.features;
  let obj_fileterd=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr = obj_fileterd[0];
  // onsole.log('prepare ...',obj_lyr);
  let p = obj_lyr.properties;
  // onsole.log('mvt_visibility',p);

  if (mymap.getZoom() >= p.feature_zoom
    && mymap.getZoom() < p.feature_zoom_max) {

    mymap.setLayoutProperty('id-'+lyr, 'visibility', 'visible');
    // dyn_functions['geohash_style'](lyr);
    // onsole.log('mvt_visibility',lyr);
    
    list_mvt_visibility.forEach(element => {
      dyn_functions[element](lyr);
    });

  }
  else {

    mymap.setLayoutProperty('id-'+lyr, 'visibility', 'none');

  }
}

function update_mapbox_list(optIn){

  optIn.lyrs.forEach(lyr => {
    list_f_mapbox.push('prepare_'+lyr);
    if(mapbox_load == true){
      console.log('prepare_'+lyr)
      dyn_functions['prepare_'+lyr]();
    }    
  });

}

// Usage:
// let popup = new prepare_magic_alert();
// popup.showMessage('This is an error message.', 'error');
// To hide the popup message after 3 seconds:
// setTimeout(() => popup.hideMessage(), 3000);

class prepare_magic_alert {
  constructor() {
    // this.popupElement = document.createElement('div');
    // this.popupElement.style.position = 'fixed';
    // document.body.appendChild(this.popupElement);
    this.msg = new Array();
  }

  prepare(optIn) {
    // optIn
    // opt = {
    //   "master":"workspace",
    //   "slug":optIn.slug,
    //   "msg":r.msg
    // }    
    // this.popupElement.textContent = message;
    // this.popupElement.style.display = 'block';
    let opt;
    this.msg = optIn.msg;
    // Set the color based on the type
    switch(optIn.master) {
      case 'workspace':
        // this.popupElement.style.backgroundColor = 'red';
        // this.popupElement.style.color = 'white';
        // if(this.msg.length > 0){

        if(optIn.slug == 'get_field_geom_3857'){
          if(optIn.x_response == '000'){
            this.msg.push(
              {
                "type":"plain",
                "msg":"Run the following query:",
              },
              {
                "type":"code",
                "msg":"ALTER TABLE IF EXISTS "+
                  localStorage.ws_details_table_name+" <br>"+
                  "ADD COLUMN geom_3857 geometry;",
              },
              {
                "type":"code",
                "msg":"UPDATE "+
                  localStorage.ws_details_table_name+" <br>"+
                  "SET geom_3857 = ST_TRANSFORM(geom,3857);",
              },
              {
                "type":"code",
                "msg":"CREATE INDEX IF NOT EXISTS "+
                "sidx_"+localStorage.ws_details_table_name+"_geom_3857 <br>"+
                  "ON "+localStorage.ws_details_table_name+" USING gist <br>"+
                  "(geom_3857) <br>"+
                  "TABLESPACE pg_default;",
              }
            );
          }
          opt = {
            "title" : "Query results",
            "msg" : this.msg
          }          
        }
        else if(optIn.slug == 'update_table_meta'){
          opt = {
            "title" : "Update Meta",
            "msg" : [
              {
                "type":"plain",
                "msg":"Run the following query:",
              },
              {
                "type":"code",
                "msg":"UPDATE geovar_master <br>"+
                  "SET g_metadata = '{ <br>"+
                  optIn.string+
                  "}'::json <br>"+
                  "WHERE g_slug = '"+optIn.table_slug+"';",
              }
            ]
          }
        }
        else if(optIn.slug == 'btn_table_schema'){
          opt = {
            "title" : "Check Table Schema",
            "msg" : [
              {
                "type":"plain",
                "msg":"Run the following query"+
                  "to verify current schema:",
              },
              {
                "type":"code",
                "msg":"SELECT * <br>"+
                  "FROM geovar_tb <br>"+
                  "WHERE g_master = '"+optIn.table_slug+"';",
              },
              {
                "type":"plain",
                "msg":"Run the following query"+
                  "to update current schema:",
              },
              {
                "type":"code",
                "msg":"DO $$ <br>"+
                " DECLARE <br>"+
                "   g_master text; <br>"+
                "   g_slug text; <br>"+
                "   data_type text; <br>"+
                "   g_label text; <br>"+
                "   g_preview boolean; <br>"+
                "   g_meta boolean; <br>"+
                " BEGIN <br>"+
                "   FOR g_master,g_slug,data_type,g_label, g_preview, g_meta IN <br>"+
                "   SELECT <br>"+
                "     bar.g_slug AS g_master,<br>"+
                "     foo.column_name AS g_slug,<br>"+
                "     foo.data_type AS data_type,<br>"+
                "     foo.column_name AS g_label,<br>"+
                "     CASE <br>"+
                "       WHEN foo.column_name IN <br>"+
                "         ('item_token','pid','geom','geom_3857','post_date','post_modified','post_status') <br>"+
                "         THEN false <br>"+
                "       ELSE true <br>"+
                "     END AS g_preview,<br>"+
                "     CASE <br>"+
                "       WHEN foo.column_name IN <br>"+
                "         ('post_date','geom','geom_3857','post_modified','post_status') <br>"+
                "         THEN false <br>"+
                "       ELSE true <br>"+
                "     END AS g_meta <br>"+
                "   FROM <br>"+
                "     information_schema.columns foo,<br>"+
                "     geovar_master bar<br>"+
                "   WHERE <br>"+
                "     foo.table_name = bar.g_label<br>"+
                "     AND foo.table_schema='public'<br>"+
                "     AND (<br>"+
                "       table_name LIKE '"+optIn.table_name+"'"+
                "     )<br>"+
                " LOOP<br>"+
                "   EXECUTE '<br>"+
                "   INSERT INTO geovar_tb(<br>"+
                "     g_master,<br>"+
                "     g_slug,<br>"+
                "     data_type,<br>"+
                "     g_label,<br>"+
                "     g_preview,<br>"+
                "     g_meta<br>"+
                "   )<br>"+
                "   VALUES (<br>"+
                "     '''|| g_master ||''',<br>"+
                "     '''|| g_slug ||''',<br>"+
                "     '''|| data_type ||''',<br>"+
                "     '''|| g_label ||''',<br>"+
                "     '|| g_preview ||',<br>"+
                "     '|| g_meta ||'<br>"+
                "   ); <br>"+
                "   ';<br>"+
                "   --RAISE NOTICE '|>>|%|%|%|%',g_master,g_slug,data_type,g_label;<br>"+
                " END LOOP;<br>"+
                " END $$;",
              }
            ]
          }          
        }
        else if(optIn.slug == 'btn_user_roles'){
          opt = {
            "title" : "Update User Role",
            "msg" : [
              {
                "type":"plain",
                "msg":"Run the following query:",
              },
              {
                "type":"code",
                "msg":"UPDATE geovar_user <br>"+
                  "SET user_role = '[ <br>"+
                  optIn.string+
                  "]'::json <br>"+
                  "WHERE g_label = '"+optIn.user_label+"';<br>"+
                  "--verify if g_label is unique!<br>",
              }
            ]
          }
        }
        else if(optIn.slug == 'update_map_roles'){
          opt = {
            "title" : "Update Map Role",
            "msg" : [
              {
                "type":"plain",
                "msg":"Run the following query:",
              },
              {
                "type":"code",
                "msg":"UPDATE tb_map <br>"+
                  "SET g_group = '[ <br>"+
                  optIn.string+
                  "]'::json <br>"+
                  "WHERE g_slug = '"+optIn.map_slug+"';",
              }
            ]
          }
        }
        else if(optIn.slug == 'update_map_meta'){
          opt = {
            "title" : "Update Map Meta",
            "msg" : [
              {
                "type":"plain",
                "msg":"Run the following query:",
              },
              {
                "type":"warning",
                "msg":"g_attributes:map_title is required!<br>"+
                  "`map_title` appear in Page Title ans SEO Title<br>"+
                  "`g_label` is only to facilitate reading in DB<br>",
              },
              {
                "type":"code",
                "msg":"UPDATE tb_map <br>"+
                  "SET g_attributes = '{ <br>"+
                  optIn.string+
                  "}'::json, <br>"+
                  "g_label = '"+optIn.map_label+"', <br>"+
                  "WHERE g_slug = '"+optIn.map_slug+"';",
              }
            ]
          }
        }
        else if(optIn.slug == 'update_map_layer'){
          opt = {
            "title" : "Update Map Layers",
            "msg" : [
              {
                "type":"plain",
                "msg":"Run the following query:",
              },
              {
                "type":"code",
                "msg":"UPDATE tb_map <br>" //+
                  // "SET g_group = '[ <br>"+
                  // optIn.string+
                  // "]'::json <br>"+
                  // "WHERE g_slug = '"+optIn.map_slug+"';",
              }
            ]
          }
        }
        else if(optIn.slug == 'update_map_modules'){
          opt = {
            "title" : "Update Map Modules",
            "msg" : [
              {
                "type":"plain",
                "msg":"Run the following query:",
              },
              {
                "type":"code",
                "msg":"UPDATE tb_map <br>" //+
                  // "SET g_group = '[ <br>"+
                  // optIn.string+
                  // "]'::json <br>"+
                  // "WHERE g_slug = '"+optIn.map_slug+"';",
              }
            ]
          }
        }
        else{
          opt = {
            "title" : "Query results",
            "msg" : this.msg
          }
        }

        // }
        // else{
        //   return;
        // }
        break;
      default:
        // this.popupElement.style.backgroundColor = 'lightblue';
        // this.popupElement.style.color = 'black';
        return;
        break;
    } // switch(optIn.master)

    // this.msg.push({'message':""});
    magic_alert(opt);

  }

  // hideMessage() {
  //     this.popupElement.style.display = 'none';
  // }
}

function magic_alert(optIn){

  // _onsole.log('magic_alert',optIn)

  let msg = '';
  optIn.msg.forEach(element => {
    // _onsole.log(element);
    if(element.type != undefined){
      if(element.type == 'code'){
        msg += '<pre class="dlg-box-code"><code>'+
          element.msg+
          '</code></pre><hr>';
      }
      else if(element.type == 'success'
        || element.type == 'primary'
        || element.type == 'secondary'
        || element.type == 'danger'
        || element.type == 'warning'
        || element.type == 'info'
        || element.type == 'light'
        || element.type == 'dark'){

        msg += '<div class="alert alert-'+
          element.type+
          '" role="alert">'+
          element.msg+
          '</div>';

      }
      else{
        msg += ''+element.msg+'<hr>';
      }
    }
    else{
      msg += element+'<hr>';
    }
    
  });
  alertify.alert(
    optIn.title, 
    msg, 
    // function(){ alertify.success('Ok'); }
  );

}

var isObject = (testVar) => typeof testVar === 'object' && !Array.isArray(testVar);

function stringIsArray(str) {
  try {
    return new Function(`return Array.isArray(${str})`)();
  } catch {
    return false;
  }
}

function checkNumberTypes(value) {

  let result = 'string';

  if (!isNaN(value)) {

    value = parseFloat(value);

    if (Number.isInteger(value)) {
      // _onsole.log(key + ' is an integer');
      result = 'integer';
    } else {
      // _onsole.log(key + ' is a float');
      result = 'float';
    }

  }

  return result;

}

function isBtnEnabled(optIn){

  let btnEnabled = false;
  switch (optIn.itemSlug) {
    case 'btn_table__layers':

      let o = g_meta.geovar_master.features;
      let obj = o.filter(
        ({properties}) => properties.g_slug == optIn.table_slug
      );
      let pObj = obj[0].properties;
      if(pObj.g_metadata.feat_type !== undefined){
        if(pObj.g_metadata.feat_type != 'table'){
          btnEnabled = true;
        }
      }
      break;
    default:
      // continue
      btnEnabled = true;
      if(opt.itemDisabled == true){
        btnEnabled = false;
      }

  } // switch  

  if(btnEnabled == false){
    $('#'+optIn.itemSlug).prop('disabled',true);
  }
  
}

function color_pickr__withCallback(optIn){

  let colorSlug = optIn.property__value;
  let slug = optIn.slug;
  let pickrContainer = document.getElementById('pickr--'+slug);
  const themes = [
      [
          'nano',
          {
              swatches: [
                  'rgba(244, 67, 54, 1)',
                  'rgba(233, 30, 99, 1)',
                  'rgba(156, 39, 176, 1)',
                  'rgba(103, 58, 183, 1)',
                  'rgba(63, 81, 181, 1)',
                  'rgba(33, 150, 243, 1)',
                  'rgba(3, 169, 244, 1)'
              ],
  
              defaultRepresentation: 'HEXA',
              components: {
                  preview: true,
                  opacity: false,
                  hue: true,
  
                  interaction: {
                      hex: false,
                      rgba: false,
                      hsva: false,
                      input: false,
                      clear: false,
                      save: true
                  }
              }
          }
      ]
  ];
  
  const buttons = [];
  let pickr = null;
  
  for (const [theme, config] of themes) {
      const button = document.createElement('button');
      button.innerHTML = theme;
      buttons.push(button);
  
      button.addEventListener('click', () => {
          const el = document.createElement('p');
          pickrContainer.appendChild(el);
  
          // Delete previous instance
          if (pickr) {
              pickr.destroyAndRemove();
          }
  
          // Apply active class
          for (const btn of buttons) {
              btn.classList[btn === button ? 'add' : 'remove']('active');
          }
  
          // Create fresh instance
          pickr = new Pickr(Object.assign({
              el, 
              theme,
              default: colorSlug != null ? colorSlug : colorSlug != null ? colorSlug :'#000'//'#42445a'
          }, config));
  
          // Set events
          // pickr.on('init', instance => {
          //     // onsole.log('Event: "init"', instance);
          // }).on('hide', instance => {
          //     // onsole.log('Event: "hide"', instance);
          // }).on('show', (color, instance) => {
          //   $('.pcr-save').css('width','100%');
          // }).on('save', (color, instance) => {
          //   pickr.hide();
          // }).on('clear', instance => {
          //     // onsole.log('Event: "clear"', instance);
          // }).on('change', (color, source, instance) => {
          //   // onsole.log('Event: "change"', color, source, instance);
          //   pickr.getColor().toRGBA().toString(0);
          // }).on('changestop', (source, instance) => {
          //     // onsole.log('Event: "changestop"', source, instance);
          // }).on('cancel', instance => {
          //     // onsole.log('cancel', pickr.getColor().toRGBA().toString(0));
          // }).on('swatchselect', (color, instance) => {
          //     // onsole.log('Event: "swatchselect"', color, instance);
          // });

          pickr.on('init', instance => {
            //_onsole.log('Event: "init"', instance);
          }).on('show', (color, instance) => {
            $('.pcr-save').css('width','100%');
            $('.pcr-save').css('color','#fff!important');
            $('.pcr-save').css('background-color','#212529!important');
            $('.pcr-save').css('border-color','#212529!important');
            $('.pcr-save').val('OK');
            $('.pcr-save').addClass('btn');
            $('.pcr-save').addClass('btn-sm');
            $('.pcr-save').addClass('btn-dark');
            // $('.pcr-save').removeClass('pcr-save');
          }).on('change', instance => {
            // console.log(pickr.getColor().toHEXA().toString(0));
            let hex = pickr.getColor().toHEXA().toString(0);
            $('#control--'+slug).val(hex);
            pickr.applyColor(true);

            opt = optIn;
            opt.property__value = hex;
            dyn_functions[optIn.callback](opt);

          })
          // .on('hide', instance => {
          //   //_onsole.log('Event: "hide"', instance);
          //   // if(optIn.pCol.f_onChange!=null){
          //   //   opt = {
          //   //     "col_slug": optIn.ct_slug,//ct_slug,
          //   //     "col_value": pickr.getColor().toHEXA().toString(0)
          //   //   }
          //   //   dyn_functions[optIn.pCol.f_onChange](opt);
          //   // }
          //   // _onsole.log(pickr.getColor().toHEXA().toString(0));
          //   $('#control--'+slug).val(pickr.getColor().toHEXA().toString(0));
          // })
          .on('save', (color, instance) => {
            pickr.hide();
          });
      });
  
      //themeContainer.appendChild(button);
  }
  
  buttons[0].click();

}