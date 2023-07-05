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

function log_tag_manager(myFunction='none',myDefinition='none',myValue=''){
  console.log('deprecated - log_tag_manager');
  return;
  dataLayer.push({
    mytrackid:GA_TRACKING_ID,//GA - log_tag_manager - Tracking ID
    event: 'log_tag_manager',
    myEnvironment:ENVIRONMENT,
    myFunction:myFunction,//GA - log_tag_manager - action
    myUser:MAPSLUG+':'+user_login,//GA - log_tag_manager - category
    myDefinition:myDefinition,//GA - log_tag_manager - label
    myValue:myValue //GA - log_tag_manager - value (optional)
  });

}

function temporaryLogTagManager(
  myFunction='none',
  myDefinition='none',
  myValue=''){

  // _onsole.log('tag_manager1 - temporary',myFunction);

  let newObj = {
    // mytrackid:GA_TRACKING_ID,//GA - log_tag_manager - Tracking ID
    event: 'log_tag_manager',
    myEnvironment:ENVIRONMENT,
    myFunction:myFunction,//GA - log_tag_manager - action
    myUser:localStorage.user_token, // MAPSLUG+':'+user_login,//GA - log_tag_manager - category
    myDefinition:myDefinition,//GA - log_tag_manager - label
    myValue:myFunction+'|'+myDefinition+'|'+myValue, //GA - log_tag_manager - value (optional)
    myMapSlug:MAPSLUG,
    myDomain:HOME_PROJECT
  }

  console.log('tag_manager - temporary',newObj);

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
  // Code for temporary function
  
  return Promise.resolve('temporaryLogTagManager - Done!');

}

// function newLogTagManager() {
//   // Code for new function
//   console.log('New function called');
// }

// // Call the temporary function and chain it with the new function
// temporaryFunction()
//   .then(result => {
//     console.log(result); // Output: Temporary function completed
//     newFunction(); // Call the new function
//   })
//   .catch(error => {
//     console.error('An error occurred:', error);
//   });


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
    // currencySymbolPlacement    : AutoNumeric.options.currencySymbolPlacement.suffix,
    // roundingMethod             : AutoNumeric.options.roundingMethod.halfUpSymmetric,
};

const numberM = {
    digitGroupSeparator         : '.',
    decimalCharacter            : ',',
    decimalCharacterAlternative : '.',
    decimalPlaces               : 0,     
    // roundingMethod              : AutoNumeric.options.roundingMethod.halfUpSymmetric,
};

const numberM1 = {
    digitGroupSeparator         : '.',
    decimalCharacter            : ',',
    decimalCharacterAlternative : '.',
    decimalPlaces               : 1,     
    // roundingMethod              : AutoNumeric.options.roundingMethod.halfUpSymmetric,
};

const numberM2 = {
    digitGroupSeparator         : '.',
    decimalCharacter            : ',',
    decimalCharacterAlternative : '.',
    decimalPlaces               : 2,     
    // roundingMethod              : AutoNumeric.options.roundingMethod.halfUpSymmetric,
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

function hide_loading2(ct){
  
  $(ct).css('display','none');
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