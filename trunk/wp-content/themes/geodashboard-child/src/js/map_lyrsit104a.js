const alyrsit104_slug='ProdAreas';

dyn_functions['map_lyrsit104a'+'_ready'] = function(){


}

dyn_functions['lyrsit104_lyr_extend']=function(){

  $('.box-sidebar-footer-top').append(''
    +'<img src="'+SOURCE_PATH+'icon/'+'lgnd_prod_area.png'+'" '
    +'class="img-fluid lyrsit104-legend" '
    +'style="max-width: 100%;display:none;">'
  +'');

}

setInterval(

  function() {  
    if(a216_mapReady==1){
      prepare_lyrsit104_legend();
    }
    
    // _onsole.log('------------------------------------');
  },
  500
);


function prepare_lyrsit104_legend(){

    let o = g_meta.geovar_lyr.features;
    let this_obj=o.filter(({properties}) => properties.g_slug === 'lyrsit104');
    let obj_lyr=this_obj[0].properties;

    if(obj_lyr.enable===true
      && obj_lyr.visible===true){

      $('.lyrsit104-legend').css('display','block');

    }
    else{
      $('.lyrsit104-legend').css('display','none');
    }

}