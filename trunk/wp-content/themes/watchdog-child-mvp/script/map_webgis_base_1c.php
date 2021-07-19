<?php
/**
 * The template part for footer of main map on front-page
 *
 * @package WordPress
 * @subpackage _underscores
 */

  $o=json_apiInfo();
  //$google_api = GOOGLE_API_SEARCH_AND_MAP;
  //$info_tracker=get_info_tracker();
  //$o['dbInfo']=get_list_pg_tables();
?>

<script type="text/javascript">
  $(document).ready(function() {

    console.log('WebGIS ready!');
    var source_w = $('.box-sidebar').width();
    var target_l = source_w+5;
    
    show_loading();

    alertify.set('notifier','position', 'top-right');
    
    //log_tag_manager(
    //  'ready - view map v<?php //echo GEOLIB_VER;?>',
      //GA - log_tag_manager - action //_onsole.log_ready_map
    //  'map-dashboard',//GA - log_tag_manager - label
    //  '0' //GA - log_tag_manager - value (optional)
    //);

    $('.div-on-map').on(
      'click',
      function(ev){
        L.DomEvent.stopPropagation(ev);
      }
    ); 

    $(window).on('orientationchange', function(){
      //_onsole.log('orientationchange');
    });
    $(window).on('resize', resize_box_b45);

    //must test!
    dMap = lunch_function_jquery_creativetim_when_ready(dMap);

    //SIDEBAR FOOTER
    var sbFooterBoxH = 30;
    var sbFoooterBtm = $(window).height();
    var sbFooterBoxTop = sbFoooterBtm - (sbFooterBoxH * 3);
    $('.box-sidebar-footer').css('top',sbFooterBoxTop);
    $('.sbFooterBoxIcon').css('width',sbFooterBoxH+'px');
    $('.sbFooterBoxIcon').css('height',sbFooterBoxH+'px');
    $('.sbFooterBoxLabel').css('height',sbFooterBoxH+'px'); 
    $('.box-sidebar-footer').css('display','');

    $('.geoinfo_azienda').html(geoinfo_azienda);
    $('.logo_webmaster_pro').attr('src',source_icon+'20px_'+logo_webmaster_pro);

    //---
    $('.box-navigation').css('left',$('.box-sidebar').css('width'));
    
    $('.btn-gpsposition').attr('title',label_title_position);

    $( ".btn-zoomout" ).on( "click", function(){
      log_tag_manager('click ' + $(this).attr('name'),'','');
      mymap.zoomOut();
    });
    $( ".btn-zoomin" ).on( "click", function(){
      log_tag_manager('click ' + $(this).attr('name'),'','');
      mymap.zoomIn();
    });

    $( ".box-gpsposition" ).on( "click", function(){
      log_tag_manager('btn-gpsposition','',''); 
      //$('.btn-gpsposition').tooltip('hide');
      $('.btn-gpsposition').html('<i class="fa fa-spinner fa-spin"></i>');
      //$('.badge-position').css('font-size','6px');
      geoUpdate();
    });

    $('.btn-sandwich-menu').on( "click", function(){
      //_onsole.log('.btn-sandwich-menu');
      
      /*if ($('.box-sidebar').hasClass('d-none')) {
        $('.box-sidebar').removeClass('d-none');
        //hide_legends();
      }      
      else{
        $('.box-sidebar').addClass('d-none');
        //mod_btn_lyr('lyr0');
      }*/
      $('.sidebar-m').css('display','block');
    });

    $('.btn-chiudi-sidebar-m').on( "click", function(){

    $('.sidebar-m').css('display','none');

    });

    $('.box-usrprofile').css('display','none');

    if($(window).width() < 768) {
      $('.ct-main-logo').html('');   
      $('.box-searchbox-sm').css('display','block'); 
    }
    
    $('.doc_credit_text').html('Information');

    $('.box-credit').on('click',function(){
      fill_home_info();    
    });

    change_wd_visibility();

    hide_loading();
    
  }); //$(document).ready

  function register_user_position(){

    dataString = {
      action: 'register_user_position',
      qy_name:'A',
      collection:'nd',
      type :'silent',
      current_zoom : dMap.map.stop_zoom,
      lat:dMap.map.stop_lat,
      lng:dMap.map.stop_lng,
      grLyrToc:dMap.analisi01.grLyrToc
    };    
    var g=dMap.analisi01.grLyrToc;
    $.each(g,function(i, lyr){
      dataString[lyr+'_visible']=dMap['analisi01'][lyr]['visible'];
    });//each lyr
    //generic_api(dataString,'register_user_position');

  }

  dyn_functions['succ_register_user_position'] = function(r){    
    //_onsole.log('user position update');
  }

  function fill_home_info(){

    var info_title = 'WebGIS';

    var single_content = '<div class="mainboxItem" '
      +'style="margin-top:5px;"></div>';


    //box button tab
    single_content += ''
      +'<div class="ajs_body_head" '
        +'pid="111" '
        +'></div>'
      +'<div class="clearfix"></div>';
    //box button tab -end

    //box tab1
    single_content += '<div '
      +'class="dlg_panel panel-tab1" '
      +'style="display:block;">';
    //single_content += '<p>TAB1</p>';

    single_content += '</div><!--tab1-->'; 

    create_dialog(single_content,info_title,'dlg_info');

  }

  dyn_functions['dlg_info'] = function(){
    

  }



</script>