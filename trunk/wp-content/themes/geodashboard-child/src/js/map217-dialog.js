function create_dialog(single_content,title,dialog_slug){
  
  alertify.infoDialog || alertify.dialog('infoDialog',function(){
    return {
      main:function(single_content,title,dialog_slug){
        
        this.setHeader(title); //label_infoShopDialog_header
        this.setContent(single_content);
        
        format_autoNumeric();

        $('.ajs-modal').css('z-index','5000');

        $('.ajs-header').css('font-family','var(--wd-fonts-primary)');
        $('.ajs-footer').css('height','59px');
        $('.ajs-dialog').css('display','');
        //$('.ajs-footer').remove();
        if($(window).width() < 768) {
          //alertify.dialog('infoDialog').maximize();
        }
        else{
          //$('.ajs-dialog').css('max-width','1000px');
          //$('.ajs-modal').css('top','auto'); 
          //$('.ajs-dimmer').css('background-color','#2525256b');
          //$('.ajs-dialog').css('margin','10px auto');
        }

        var label_close_btn = gLang['label_close_btn'];

        $('.ajs-footer').html(''
          +'<!--SUBMIT-->'
          +'<div class="row row2 align-items-center" style="margin:0px;height: 50px;">'
            //+'<div class="col-3 ajs-footer-btn2" style=" text-align: center;">'
            //+'</div>'
            +'<div class="col-2 d-grid gap-2 d-flex justify-content-start">'
              +'<div class="ajs-footer-btn3"></div>'
            +'</div>'
            +'<div class="col-8 d-grid gap-2 d-flex justify-content-end" '
              +'style="text-align: center;">'
              +'<div class="ajs-footer-btn2" '
                +'style="display:inline;padding-right: 5px;width: 100%;"></div>'
            +'</div>'
            +'<div class="col-2 d-grid gap-2 d-flex justify-content-start">'
              +'<div class="ajs-footer-btn1" '
                +'style="display:inline;">'
                +'<button name="close-infoDialog" '
                  +'id="info-close" type="button" '
                  +'class="btn btn-sm btn-dark">'
                  +label_close_btn.toUpperCase()+'</button>'
              +'</div>'
            +'</div>'
          +'</div>');

        if(dialog_slug===undefined){
          
        }
        else{
          dyn_functions[dialog_slug]();
        }
        

        $('#info-close').on('click',function(){
          //log_tag_manager('info-close','','');
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
  alertify.infoDialog(single_content,title,dialog_slug)
    .resizeTo('100%',700)
    //.setHeader(title) //label_infoShopDialog_header
    .set('movable', false);

}

function create_dialog2(slug,dlg_type='b',single_content='',title=''){

  alertify.infoDialog || alertify.dialog('infoDialog',function(){
    return {
      main:function(slug,dlg_type,single_content,title){
        //_onsole.log('main2',slug);
        if(dlg_type=='a'){
          this.setHeader(title); //label_infoShopDialog_header
          this.setContent(single_content);
          format_autoNumeric();
        }
        else{
          this.setHeader('<div class="dlg_'+slug+'_title"></div>'); //label_infoShopDialog_header
          this.setContent('<div '
            +'db_reference="geovar_dialog" '
            +'g_slug="'+slug+'" '
            +'class="dlg_'+slug+'_body"></div>');
        }
        
        $('.ajs-modal').css('z-index','5000');

        $('.ajs-header').css('font-family','var(--wd-fonts-primary)');
        $('.ajs-footer').css('height','59px');
        $('.ajs-dialog').css('display','');

        $('.ajs-dialog').addClass('card');

        //$('.ajs-footer').remove();
        if($(window).width() < 768) {
          //alertify.dialog('infoDialog').maximize();
        }
        else{
          //$('.ajs-dialog').css('max-width','1000px');
          //$('.ajs-modal').css('top','auto'); 
          //$('.ajs-dimmer').css('background-color','#2525256b');
          //$('.ajs-dialog').css('margin','10px auto');
        }

        $('.ajs-footer').html(''
          +'<!--SUBMIT-->'
          +'<div class="row row2 align-items-center" style="margin:0px;height: 50px;">'
            //+'<div class="col-3 ajs-footer-btn2" style=" text-align: center;">'
            //+'</div>'
            +'<div class="col-2 d-grid gap-2 d-flex justify-content-start">'
              +'<div class="ajs-footer-btn3"></div>'
            +'</div>'
            +'<div class="col-8 d-grid gap-2 d-flex justify-content-end" '
              +'style="text-align: center;">'
              +'<div class="ajs-footer-btn2" '
                +'style="display:inline;padding-right: 5px;width: 100%;"></div>'
            +'</div>'
            +'<div class="col-2 d-grid gap-2 d-flex justify-content-end">'
              +'<div class="ajs-footer-btn1" '
                +'style="display:inline;">'
                +'<div class="box-btn_closedlg"></div>'
              +'</div>'
            +'</div>'
          +'</div>');
        create_button('btn_closedlg');

        if(dlg_type=='a'){//old
          if(slug===undefined){
            
          }
          else{
            dyn_functions[slug]();
          }
        }
        else{
          //load_dlg_template(slug);
          dyn_functions['succ_dlg_single']();
        }

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
  alertify.infoDialog(slug,dlg_type,single_content,title)
    .resizeTo('100%',700)
    //.setHeader(title) //label_infoShopDialog_header
    .set({
      'movable':false,
      onclose:function(){
        
        if(dlg_close_functions[slug]===undefined){
          
        }
        else{
          dlg_close_functions[slug]();
        }
      }
    });
}

function create_dialog3(optIn){

  //slug,dlg_type='b',single_content='',title=''

  alertify.infoDialog3 || alertify.dialog('infoDialog3',function(){
    return {
      main:function(optIn){
        //slug,dlg_type,single_content,title
        //_onsole.log('main3',optIn);
        this.setHeader(''
          +'<div '
            +'class="dlg_'+optIn.dlgSlug+'_title"'
            +'>'
            +optIn.dlgTitle
          +'</div>'
        +''); //label_infoShopDialog_header

        this.setContent(''
          +'<div '
            +'class="dlg_'+optIn.dlgSlug+'_body" '
            +'db_reference="geovar_dialog" '
            +'g_slug="'+optIn.dlgSlug+'" '
            +'></div>'
        +'');

        $('.ajs-modal').css('z-index','5000');

        $('.ajs-header').css('font-family','var(--wd-fonts-primary)');
        $('.ajs-footer').css('height','59px');
        $('.ajs-dialog').css('display','');

        $('.ajs-dialog').addClass('card');

        $('.ajs-footer').html(''
          +'<!--SUBMIT-->'
          +'<div class="row row2 align-items-center" style="margin:0px;height: 50px;">'
            //+'<div class="col-3 ajs-footer-btn2" style=" text-align: center;">'
            //+'</div>'
            +'<div class="col-2 d-grid gap-2 d-flex justify-content-start">'
              +'<div class="ajs-footer-btn3"></div>'
            +'</div>'
            +'<div class="col-8 d-grid gap-2 d-flex justify-content-end" '
              +'style="text-align: center;">'
              +'<div class="ajs-footer-btn2" '
                +'style="display:inline;padding-right: 5px;width: 100%;"></div>'
            +'</div>'
            +'<div class="col-2 d-grid gap-2 d-flex justify-content-end">'
              +'<div class="ajs-footer-btn1" '
                +'style="display:inline;">'
                +'<div class="box-btn_closedlg3"></div>'
              +'</div>'
            +'</div>'
          +'</div>');

        let opt = {
          itemSlug:'btn_closedlg3',
          itemLabel: {
            "default":"CLOSE",
            "it":"CHIUDI",
            "en":"CLOSE"
          },//gLang.label_close,
          itemDescription: {"default":"..."},
          //itemLabel:'<i class="fa fa-ellipsis-h" aria-hidden="true"></i>',
          itemClass:'btn-sm btn-outline-dark', // btn-main-sidebar',
          //btnOnClick:'close',
          itemType:'button', //form-switch
          itemDisabled:false,
          itemStyle:'', //backgrund-color:red;
          g_group: ["public"],
          g_responsive: "both", //both, mobile, desktop
          //"g_callback": 'btn_save_point', // same as btnSlug
        };
        create_button_2(opt);
        //_onsole.log(optIn);
        dyn_functions[optIn.callback](optIn);

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
  //slug,dlg_type,single_content,title
  alertify.infoDialog3(optIn)
    .resizeTo('100%',700)
    //.setHeader(title) //label_infoShopDialog_header
    .set({
      'movable':false,
      onclose:function(){
        if(dlg_close_functions[optIn.dlgSlug]===undefined){
          
        }
        else{
          dlg_close_functions[optIn.dlgSlug]();
        }
      }
    });
}