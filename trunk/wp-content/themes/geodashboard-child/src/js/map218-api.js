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