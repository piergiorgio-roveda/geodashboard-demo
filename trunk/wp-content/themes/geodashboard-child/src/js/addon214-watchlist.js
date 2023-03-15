var this_watchlist = new Array();

f_wait.watchlist=1;

f_wait.watchlist_ok=0;

dyn_functions['load_watchlist'] = function(watchlist){

  //this_watchlist=watchlist;

  watchlist.forEach(element => {
    this_watchlist[element.slug]=element.items;
  });

  f_wait.watchlist_ok=1;

}

function fill_watchlist_badge(lyr){

  let obj_lyr=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === lyr)[0].properties;
  var watchlist_table = obj_lyr.g_tables[0];

  $('.'+lyr+'_watchlist').html(''
    +'<i class="fa fa-bookmark-o icon_watchlist" aria-hidden="true"></i>'
    +'');

  $('.icon_watchlist').css('color','#5c5c5c');

  this_watchlist[watchlist_table].forEach(element => {
    if(element==localStorage[lyr+'_token']){
      //$('.icon_watchlist').css('color','#fffc00ff');
      $('.icon_watchlist').removeClass('fa-bookmark-o');
      $('.icon_watchlist').addClass('fa-bookmark');
    }
  });

  $('.'+lyr+'_watchlist').on('click',function(){

    var i=0;
    this_watchlist[watchlist_table].forEach(element => {
      if(element==localStorage[lyr+'_token']){
        i++;
      }
    });

    if(i==0){
      this_watchlist[watchlist_table].push(localStorage[lyr+'_token']);
      //$('.icon_watchlist').css('color','#fffc00ff');
      $('.icon_watchlist').removeClass('fa-bookmark-o');
      $('.icon_watchlist').addClass('fa-bookmark');
      $('.'+lyr+'_watchlist').attr('title','Remove from Watchlist');
      $('.'+lyr+'_watchlist').attr('label','Remove from Watchlist');
      $('.'+lyr+'_watchlist').attr('data-bs-original-title','Remove from Watchlist');
    }
    else{
      removeItemOnce(this_watchlist[watchlist_table], localStorage[lyr+'_token']);
      //$('.icon_watchlist').css('color','#5c5c5c');
      $('.icon_watchlist').removeClass('fa-bookmark');
      $('.icon_watchlist').addClass('fa-bookmark-o');
      $('.'+lyr+'_watchlist').attr('title','Add to Watchlist');
      $('.'+lyr+'_watchlist').attr('label','Add to Watchlist');
      $('.'+lyr+'_watchlist').attr('data-bs-original-title','Add to Watchlist');
    }
    $('.'+lyr+'_watchlist').tooltip('hide');

    var dataString = {}
    dataString['fn_group']='geodata';
    dataString['action']='modify_data';
    dataString['collection']='update_watchlist';
    dataString['lyr']='lyr999';
    dataString['user_token']=g_meta.geovar_user.features[0].properties.user_token;
    dataString['watchlist_table']=watchlist_table;
    dataString['watchlist']=this_watchlist[watchlist_table];
    dataString['call_type']='silent';
    generic_api(dataString,'update_watchlist');

  });


}

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

dyn_functions['succ_update_watchlist'] = function(r){

  // _onsole.log(r);
  //nothing ... silent
}