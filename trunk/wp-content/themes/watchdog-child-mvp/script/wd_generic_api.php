<?php
  //$o=json_apiInfo();
  //$google_api = GOOGLE_API_SEARCH_AND_MAP;
  //$info_tracker=get_info_tracker();
?>

<script>

  $(document).ready(function() {

    console.log('Ready-5!');

  }); //$(document).ready


  function generic_api(dataString,successFn){
    
    //_onsole.log(successFn);
    show_loading();

    var slugAPI = dataString.slugAPI;

    if(slugAPI=='watchdog-data'){
      var baseUrl='https://www.cityplanner.biz/api/';
    }
    else{
      console.log('Error slugAPI');
      return;
    }

    if(dataString.lyr!=undefined){
      var string = 'f='+successFn+'-'+dataString.lyr;
      var mylyr = dataString.lyr;
    }
    else{
      var string = 'f='+successFn;
      var mylyr = 'nd';
    }

    $.ajax({
      type: "POST",
      url: baseUrl+slugAPI+'/?'+string,  
      data:dataString,
      tryCount : 0,
      retryLimit : 3,
      dataType: 'json',
      async:    true,
      cache:    false,
      successFn: successFn,
      lyr:mylyr,
      error : function(xhr, textStatus, errorThrown ) {
        on_ajax_error(this);
        log_tag_manager('ajax ' + this.successFn,'error','');
        //reload window?
        hide_loading();
      },
      success: function(r){
        //_onsole.log(r);
        hide_loading();
        var qy_name=r.ds.qy_name;
        if(r.geoQuery[qy_name].iTotalRecords==0){
          alertify.notify(msg_nessun_risultato);
          log_tag_manager('ajax ' + this.successFn,'success with 0 result','');
          return
        }

        log_tag_manager('ajax ' + this.successFn,'success','');
        /*switch (this.successFn) {
          case "functionX": succ_functionX(); break;
          case "functionY": succ_functionY(); break;
          case "functionZ": succ_functionZ(); break;
          case "switch_on_lyr_b": succ_switch_on_lyr_b(r); break;
          //case "geo_lyr0_onClick": succ_geo_lyr0_onClick(r); break;          
        }*/
        dyn_functions['succ_'+this.successFn](r);
        return;
        //return response;
      }//success
    }); //ajax

  }
  
</script>