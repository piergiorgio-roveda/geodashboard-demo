<?php
  //$o=json_apiInfo();
  //$google_api = GOOGLE_API_SEARCH_AND_MAP;
  //$info_tracker=get_info_tracker();
?>

<script>

  $(document).ready(function() {

    //change_wd_visibility();
    console.log('GeodataCity ready!');
    //view_geodatacity();
    //view_lyr2();
    create_basemap_switch();

  }); //$(document).ready

  function create_basemap_switch(){

    var lyr='lyr1'
    var content = ''
      +'<div '
        +'style="margin-top:15px;">'
      +'</div>'
      +'<div '
        +'name="'+lyr+'-toc" '
        +'lyr="'+lyr+'" '
        +'id="'+lyr+'-toc" '
        +'class="toc-lyr '+lyr+'-toc" '
        +'style="height: 30px;cursor:pointer;height:30px;">'
        +'<div id="'+lyr+'-toc-eye" '
          +'class="sbTocBoxIcon d-flex align-items-center '
          +'justify-content-center" style="float:left;">'
          +'<span class="align-middle toc-eye '+lyr+'-eye">'
          +'</span>'
          +'&nbsp;<span id="'+lyr+'-toc" '
            +'class="align-middle toc-icon '+lyr+'-icon">'
          +'</span>'
        +'</div>'
        +'<div id="'+lyr+'-toc-text" '
          +'class="sbTocBoxLabel d-flex align-items-center" '
          +'style="text-align:left;">'
          +'<span class="align-middle" style="font-weight:500;">'
            +geovar.lyr[lyr].label
          +'</span>'
        +'</div>'
      +'</div>'
    +''; 

    $('.box-sidebar-extra-pre').html(content);

    $('.'+lyr+'-eye').html(''
      +'<img src="'+source_icon+lyr_icon_visible+'" '
        +'style="width:18px;">'
    +'');
    $('.'+lyr+'-icon').html(''
      +'<img src="'+source_icon+'px20_'+geovar.lyr[lyr].icon+'" '
        +'style="width:20px;">'
    +'');

    var sbTocBoxH = 30;
    $('.sbTocBoxIcon').css('width',(sbTocBoxH*2)+'px');
    $('.sbTocBoxIcon').css('height',sbTocBoxH+'px');
    $('.sbTocBoxLabel').css('height',sbTocBoxH+'px');

    $('#lyr1-toc').on('click',choose_different_basemap);


  }

  function choose_different_basemap(){

    var info_title = 'Choose new base map';

    var single_content = '<div class="mainboxItem" '
      +'style="margin-top:5px;"></div>';

    //box button tab
    single_content += ''
      +'<div class="ajs_body_head" '
        +'></div>'
      +'<div class="clearfix"></div>';
    //box button tab -end

    //box tab1

    //box tab1
    single_content += ''
      +'<div '
        +'class="row dlg_panel panel-tab1">'
        +'<div class="col">'
          +'<h2>Get started for free</h2>'
          +'<button class="new_tile" lyr="lyr1">'+geovar.lyr.lyr1.label+'</button>'
          +'<button class="new_tile" lyr="lyr3">'+geovar.lyr.lyr3.label+'</button>'
          +'<button class="new_tile" lyr="lyr5">'+geovar.lyr.lyr5.label+'</button>'
        +'</div>'
      +'</div>';

    create_dialog(single_content,info_title,'dlg_tile_01');

  }

  dyn_functions['dlg_tile_01'] = function(){

    $('.new_tile').on('click',function(){

      lyr=$(this).attr('lyr');
      mymap.removeLayer(tile_btn_map01);
      //tile_btn_map01.clearLayers(); 
      
      tile_btn_map01 = L.tileLayer(
        geovar.lyr[lyr].tile_url,
        {
          attribution: tile_map01_attr,
          maxZoom: 20
        }
      ).addTo(mymap);

      alertify.infoDialog().close();

    })
    
  }

</script>