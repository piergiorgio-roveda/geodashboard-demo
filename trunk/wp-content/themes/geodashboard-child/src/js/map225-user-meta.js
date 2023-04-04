//var user_meta = [];
//load_user_meta();

//f_wait.watchlist=0;
//f_wait.geovar_user=0;
function m225_ready(){
  load_watchlist(mapuser_meta[0].watchlist);
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
