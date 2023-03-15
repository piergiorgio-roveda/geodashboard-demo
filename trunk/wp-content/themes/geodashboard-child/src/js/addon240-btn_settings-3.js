var a240_mapReady = 0;

dyn_functions['addon240-btn_settings-3'+'_ready'] = function(){

  a240_mapReady = 1;

  a240_ready();

}

var a240_lyrs=[];
var a240_lyr_selected=[];
var a240_geoserver_selected=[];

var a240_1_options = [
  {"val":"manmaps-view-all","text":"View all maps"},
  {"val":"manmaps-view-single","text":"View single map"},
  {"val":"manmaps-modify-map-lyrs","text":"Modify map layers"},
  {"val":"manmaps-add-map","text":"Add new map"},
  {"val":"manlyrs-tb-and-master","text":"List all tables with attribute g_master"},
  //{"val":"manlyrs-add-master","text":"If g_master empty add it"},
  //{"val":"manlyrs-update-master","text":"If table update associate to exist g_master"},
  //{"manlyrs-verify-colums":"Verify colums in geovar_tb"},
  {"val":"manlyrs-list-lyrs-master","text":"List all layers with g_master selected"},
  //{"val":"manlyrs-add-lyr-master","text":"If no layers add new layer with g_master"},
  //{"val":"manlyrs-list-geoserver-flyrs","text":"List all geoserver layers"},
  {"val":"manlyrs-link-geoserver-lyr","text":"Associate geoserver to layer"},
  //{"val":"manlyrs-list-geoserver-styles","text":"List all geoserver styles"},
  //{"val":"manlyrs-add-geoserver-style","text":"If no geoserver style add new"}
];

var a240_subScript = [
  'addon240sub-generic',
  'addon240sub-main',
  'addon240sub-advanced',
  'addon240sub-manmaps-add-map',
  'addon240sub-manlyrs-1',
  'addon240sub-manlyrs-2',
  'addon240sub-manlyrs-3',
  'addon240sub-RegisterLyr',
  'addon240sub-UpdateLyr',
  'addon240sub-UpdateLyrStyle'
];

//--

function a240_ready(){
  if (f_wait.boxSidebarFooter==0) {
    // _onsole.log('wait')
    setTimeout(function(){a240_ready()},100);
    return;
  } else {
    console.log('a240_ready',sessionStorage.access_status)
    if(sessionStorage.access_status=='0'){
      return;
    }
    //-- ADD SUB SCRIPT
    let subScript = a240_subScript;

    subScript.forEach(element => {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      let url=THEME_PROJECT+'/src/js/'+element+'.js?ver='+VER;
      script.src = url;   
      document.head.appendChild(script);
    });
  
    //--

    let item_btn = 'btn_a240_main';

    $('.box-sidebar-footer-top').append(''
      +'<div style="margin-top:5px;">'
        +'<div '
          +'class="box-'+item_btn+' box-info-2-btn d-grid gap-2" '
          //+'style="float:left;padding-right:5px;" '
          +'></div>'
      +'</div>'
    +'');

    let meta = {
      'properties':{
        "g_slug": "label_"+item_btn,
        "g_label": "Settings"
      }
    }
    gLang[meta.properties.g_slug]=meta.properties.g_label;
  
    meta = {
      'properties':{
        "g_slug": item_btn,
        "g_label": "label_"+item_btn,
        "g_group": ["public"],
        "g_description": "...",
        "g_template": "v2",
        "g_faw": null,
        "g_callback": null,
        "g_responsive": "both",
        "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
      }
    }
    g_meta.geovar_button.features.push(meta);

    create_button(item_btn);

    $('#btn_a240_main').prop('disabled',false);

  };
}

f_btn['btn_a240_main']=function(slug){

  //window.open("https://github.com/", "_blank");

  let item_dlg = 'dlg_a240_main';

  var meta = {
    'properties':{
      'g_slug': item_dlg+'_single',
      'g_label': 'Map settings',
      'g_template': 'template_by_slug',
      'g_description': null
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  sessionStorage.this_dialog_lyr=item_dlg;
  sessionStorage.this_dialog_slug=item_dlg+'_single';//'lyr035_single'
  //
  //sessionStorage.addon208_text='btn_analytics_01';
  //sessionStorage.mapclick_lng=e.latlng.lng;
  create_dialog2(sessionStorage.this_dialog_slug);

}

dyn_functions['template_by_slug_'+'dlg_a240_main'+'_single'] = function(){

  let dlg_slug = 'dlg_a240_main'+'_single';

  let c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //box button tab
  c = ''
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //box tab1
  c = '<div '
    +'class="dlg_panel dlg_panel_tab panel-tab1" '
    +'style="display:block;font-family:var(--wd-fonts-secondary);">';
  //c += '<p>TAB1</p>';
  c += '</div><!--tab1-->';
  
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  dyn_functions['a240_DlgExt_Main']();

}