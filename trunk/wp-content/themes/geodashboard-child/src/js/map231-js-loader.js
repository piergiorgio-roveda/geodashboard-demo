var count_js = js_loader_list.length;
// _onsole.log(count_js);
var count_js_load = 0;

function m231_ready(){
  load_js(0);
}

function load_js(iJs){
  var js_src_url=THEME_PROJECT+'/src/js/';

  /*$.getScript( js_src_url+element+'.js', function( data, textStatus, jqxhr ) {
    //console.log( data ); // Data returned
    //console.log( textStatus ); // Success
    //console.log( jqxhr.status ); // 200
    console.log( "Load was performed. "+element );
  });*/
  //var iJs = 0;

  // _onsole.log(iJs)
  console.log('js_loader_list_final',js_loader_list);
  if(js_loader_list[iJs]){
    console.log(js_loader_list[iJs])
    var element = js_loader_list[iJs];
    $.ajax({
      async: false,
      element: element,
      url: js_src_url+element+'.js?ver='+VER,
      iJs:iJs,
      dataType: 'script',
      success: function(r){
        var iJsX = this.iJs + 1;
        console.log(this.element);
        ++count_js_load;

        if(dyn_functions[this.element+'_ready']!=null){
          dyn_functions[this.element+'_ready']();
        }
        
        load_js(iJsX);
      }//success
    });
  }

}
