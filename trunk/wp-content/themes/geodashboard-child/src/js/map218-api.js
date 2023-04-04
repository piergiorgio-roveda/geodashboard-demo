function generic_api(dataString,successFn){
  
  // _onsole.log(successFn);
  var call_silent = false;
  var postdata = false;
  if(dataString['call_type'] === undefined){
  }
  else{
    if(dataString['call_type'] == 'silent'){
      call_silent = true;
    }
  }
  dataString['call_silent']=call_silent;
  if(call_silent === false){
    show_loading();
  }

  if(dataString['postdata'] === undefined){
    postdata=false;
  }
  else{
    postdata=dataString['postdata'];
  }

  if(dataString.lyr!=undefined){
    var string = 'f='+successFn+'-'+dataString.lyr;
    var mylyr = dataString.lyr;
  }
  else{
    var string = 'f='+successFn;
    var mylyr = 'nd';
  }

  dataString['USER_LICENSE']=USER_LICENSE;
  dataString['MAPSLUG']=MAPSLUG;
  if(dataString['settings_json'] === true){

    //var slugAPI = dataString.slugAPI;
    var baseUrl=HOME_PROJECT+dataString['settings_url'];
    dataString['call_type'] = 'silent';
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
      ds:dataString
    }
  }
  else{

    //var slugAPI = dataString.slugAPI;
    var baseUrl=HOME_PROJECT+'/geodata/?'+string;

    if(postdata === false){
      var toAjax={
        type: "POST",
        url: baseUrl,  
        data:dataString,
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
        data:dataString,
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
    console.log(this.successFn)
    dyn_functions['succ_'+this.successFn](r);
    return;
    //return response;
  }//success

  $.ajax(toAjax); //ajax

}