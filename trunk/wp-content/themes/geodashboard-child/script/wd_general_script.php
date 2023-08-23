<?php
$source='https://www.cityplanner.biz/source/';
?>
<script>

  function lunch_function_jquery_creativetim_when_ready(dMap){
    dMap.browser = checkBrowser();

    convert_tag_a_to_button();
    log_info_tracker();
    style_attribution();
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
    <?php
    //if(WP_ENVIRONMENT=='development'||WP_ENVIRONMENT=='staging'){
      ?>
      dataLayer.push({
        mytrackid:'<?php echo GA_TRACKING_ID;?>',//GA - log_tag_manager - Tracking ID
        event: 'log_tag_manager',
        myEnvironment:geovar.environment,
        myFunction:myFunction,//GA - log_tag_manager - action
        myUser:'<?php echo G_SHORT . ':' . $output['apiInfo']['user'];?>',//GA - log_tag_manager - category
        myDefinition:myDefinition,//GA - log_tag_manager - label
        myValue:myValue //GA - log_tag_manager - value (optional)
      });
      <?php
    //}
    ?> 
  }

  function log_info_tracker(){
    //1
    log_tag_manager(
      'info_tracker - ip',//GA - log_tag_manager - action //log_ready_map
      '<?php echo $info_tracker['ip'];?>',//GA - log_tag_manager - label
      '' //GA - log_tag_manager - value (optional)
    );
    //2
    log_tag_manager(
      'info_tracker - referer',//GA - log_tag_manager - action //log_ready_map
      '<?php echo $info_tracker['referer'];?>',//GA - log_tag_manager - label
      '' //GA - log_tag_manager - value (optional)
    );
    //3
    log_tag_manager(
      'info_tracker - session_token',//GA - log_tag_manager - action //log_ready_map
      '<?php echo $info_tracker['session_token'];?>',//GA - log_tag_manager - label
      '' //GA - log_tag_manager - value (optional)
    );
  }

  function logout(){
    log_tag_manager('box-logout','','');
    $.ajax({
      type: "POST",
      url: geovar.home_url+'/api/logout/',
      dataType: 'json',
      cache:    false,        
      success: function(response){
        console.log('logout-success');
        //log(response)
        //alertify.success('Export creato con successo');  
        $('body').html('\
          <div class="row table-div">\
            <div class="table-div col-xs-12 text-center">\
              <div class="alert alert-info alert-with-icon" '
                +'data-notify="container" '
                +'style="max-width:300px;margin:25px;">'
                +'<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'
                +'&nbsp;<span data-notify="message">'+label_end_session+'</span>\
              </div>\
            </div>\
          </div>\
        ');                      
      }//success
    }); //ajax    
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
          var res = str.replace("*|HOME-URL|*", "<?php echo $home_url;?>");
          $(this).replaceWith('<span class="mod-link-'+i+' span-link" style="color:'+new_linkColor+';" toLink="'+res+'">'+$(this).html()+'</span>');
          //$(this).attr('toLink',res)
          $('.mod-link-'+i).on('click',function(){
            //var str = $(this).attr('toLink');
            //var res = str.replace("*|HOME-URL|*", "<?php //echo $home_url;?>");
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
    //$('.loading-wall').fadeTo( "slow", 1 );
  }

</script>