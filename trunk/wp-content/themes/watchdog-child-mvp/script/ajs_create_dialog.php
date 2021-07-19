<?php
  //$o=json_apiInfo();
  //$google_api = GOOGLE_API_SEARCH_AND_MAP;
  //$info_tracker=get_info_tracker();
?>

<script>

  $(document).ready(function() {

    console.log('Ready-4!');

  }); //$(document).ready


  function create_dialog(single_content,title,dialog_slug){
    
    alertify.infoDialog || alertify.dialog('infoDialog',function(){
      return {
        main:function(content,dialog_slug){
          
          this.setContent(content);
          
          format_autoNumeric();

          //$('.ajs-footer').remove();
          if($(window).width() < 768) {
            //alertify.dialog('infoDialog').maximize();
          }
          else{
            $('.ajs-dialog').css('max-width','1000px');
            $('.ajs-modal').css('top','auto'); 
            $('.ajs-dimmer').css('background-color','#2525256b');
            $('.ajs-dialog').css('margin','10px auto');
          }

          $('.ajs-footer').html(''
            +'<!--SUBMIT-->'
            +'<div class="row row2" style="margin:0px;height: 50px;">'
              //+'<div class="col-3 ajs-footer-btn2" style=" text-align: center;">'
              //+'</div>'
              +'<div class="col-3" style=" text-align:left;">'
                +'<div class="ajs-footer-btn3" style="display:inline;padding-right: 5px;"></div>'
              +'</div>'
              +'<div class="col-9" style=" text-align:right;">'
                +'<div class="ajs-footer-btn2" style="display:inline;padding-right: 5px;"></div>'
                +'<div class="ajs-footer-btn1" style="display:inline;">'
                  +'<button name="close-infoDialog" '
                    +'id="info-close" type="submit" '
                    +'class="btn btn-sm btn-footer btn-footer-current">'
                    +label_close_btn+'</button>'
                +'</div>'
              +'</div>'
            +'</div>');

          dyn_functions[dialog_slug]();

          $('#info-close').on('click',function(){
            log_tag_manager('info-close','','');
            alertify.infoDialog().close();
            //mymap.removeLayer(pin_address);
            //pin_address.clearLayers();
          });  

        },
        setup:function(){
          if($(window).width() < 768) {
            var mymax = true;
          }          
          else{
            var mymax = false;
          }
          return { 
            //buttons:[{text: "cool!", key:27/*Esc*/}],
            focus: { element:0 },
            options:{
              //basic:true,
              maximizable:false,
              resizable:false,
              //padding:false,
              closable:false,
              closableByDimmer:false,
              startMaximized:mymax
            }
          };
        }               
      }
    });
    alertify.infoDialog(single_content,dialog_slug)
      .resizeTo('100%',700)
      .setHeader(title) //label_infoShopDialog_header
      .set('movable', false);

  }
</script>