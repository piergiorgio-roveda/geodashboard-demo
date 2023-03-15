dyn_functions['addon242-cityplanner'+'_ready'] = function(){

  $('.box-homeInfo1').css('display','block');

  $('.box-homeInfo1').append('<div '
    +'class="box-btn_showInfo-personal box-info-2-btn gap-2" '
    +'style="'
      +'margin-top:5px;'
      +'text-align: right;'
      +'margin-bottom: -15px;'
      +'margin-right: 15px;'
      +'"></div>');

  a242_ready();

}; //$(document).ready

sessionStorage.basemap='default';

function a242_ready(){

  prepare_a242();

}


function prepare_a242(){

  opt = {
    itemSlug:'btn_showInfo-personal',//'btn_closedlg3',
    itemLabel: {
      "default":"<i class=\"fa fa-user\" aria-hidden=\"true\"></i>",
      "it":"<i class=\"fa fa-user\" aria-hidden=\"true\"></i>",
      "en":"<i class=\"fa fa-user\" aria-hidden=\"true\"></i>"
    },//gLang.label_close,
    itemDescription: {"default":"..."},
    //itemLabel:'<i class="fa fa-ellipsis-h" aria-hidden="true"></i>',
    itemClass:'btn-sm btn-dark', // btn-main-sidebar',
    //btnOnClick:'close',
    itemType:'button', //form-switch
    itemDisabled:false,
    itemStyle:'', //backgrund-color:red;
    g_group: ["public"],
    g_responsive: "both", //both, mobile, desktop
    //"g_callback": 'btn_save_point', // same as btnSlug
  };
  create_button_2(opt);

}

f_btn['btn_showInfo-personal']=function(slug){

  let item_dlg = 'dlg_a242_personal';

  var meta = {
    'properties':{
      'g_slug': item_dlg+'_single',
      'g_label': 'Piergiorgio Roveda',
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

dyn_functions['template_by_slug_'+'dlg_a242_personal'+'_single'] = function(){

  console.log('template_by_slug_'+'dlg_a242_personal'+'_single')

  let dlg_slug = 'dlg_a242_personal'+'_single';

  let c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //box button tab
  c = ''
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  let photo_url='https://lh3.googleusercontent.com/pw/AMWts8Cjv5e7mkLweCkHTnjwRScgNTK1gvrD1_BXVAkSiAXkyftBKWO6bVZzOM37B6M1TkHsCfCjbc80SELR9Y6ndLGJu8_ToTThfP-DgM4Sl6FO7GmPUEBtsxx1FJjUrL_xJ_i8Kf7jNjYVm-Ish8_keYJfjw=s794-no?authuser=1';

  //box tab1
  c = '<div '
    +'class="dlg_panel dlg_panel_tab panel-tab1" '
    +'style="display:block;font-family:var(--wd-fonts-secondary);">'
    +'<aside class="blog-sidebar">'
      +'<div class="p-3 mb-3 rounded">'
        +'<div style="margin-bottom: 10px;">'
          +'<div clas="col" style="float: left;">'
            +'<img style="width:120px;margin-right: 5px;margin-bottom: 10px;" '
              +'src="'+photo_url+'" />'
          +'</div>'
          +'<div clas="col">'
            +'<h3>Piergiorgio (PJ) Roveda</h3>'
          +'<div>'
            +'<a href="https://www.linkedin.com/in/piergiorgioroveda-gis/?locale=en_US" '
              +'class="btn btn-sm btn-outline-dark" target="_blank">'
              +'<i class="fa fa-linkedin" aria-hidden="true"></i>'
            +'</a> &nbsp; '
            +'<a href="https://www.youtube.com/c/CityPlannerGISTIPSTER" '
              +'class="btn btn-sm btn-outline-dark" target="_blank">'
              +'<i class="fa fa-youtube-play" aria-hidden="true"></i>'
            +'</a> &nbsp; '
            +'<a href="https://github.com/piergiorgio-roveda/gistips-academy-v3" '
              +'class="btn btn-sm btn-outline-dark" target="_blank">'
              +'<i class="fa fa-github-alt" aria-hidden="true"></i>'
            +'</a>'
          +'</div>'
        +'</div>'
      +'</div>'
      +'<div class="clearfix" style="border-bottom:1px solid black;margin-bottom:15px;"></div>'
      +'<div style="font-size: 75%;">'
        +'<table class="table">'
          +'<tr>'
            +'<td style="text-align:center;">'
              +'<i class="fa fa-map-marker" aria-hidden="true"></i>'
            +'</td>'
            +'<td>WeWork - Hazerem HaPelech St 7, <br>Tel Aviv-Yafo, 6816727, Israel </td>'
          +'</tr>'
          +'<tr>'
            +'<td style="text-align:center;">'
              +'<i class="fa fa-phone" aria-hidden="true"></i>'
            +'</td>'
            +'<td>'
              +'<a href="tel:+393487448152">+39 348 7448152</a>'
              +'<br>(only WhatsApp or Telegram)'
            +'</td>'
          +'</tr>'
          +'<tr>'
            +'<td style="text-align:center;">'
              +'<i class="fa fa-envelope-o" aria-hidden="true"></i>'
            +'</td>'
            +'<td>'
              +'<a href="mailto:piergiorgio.roveda@cityplanner.biz">piergiorgio.roveda[at]cityplanner.biz</a>'
            +'</td>'
          +'</tr>'
        +'</table>'
      +'</div>'
      +'<div style="text-align: center;">'
        +'<a href="https://www.digitalocean.com/'
          +'?refcode=68428e7f2b34'
          +'&utm_campaign=Referral_Invite'
          +'&utm_medium=Referral_Program'
          +'&utm_source=badge">'
          +'<img src="https://web-platforms.sfo2.digitaloceanspaces.com/WWW/Badge%202.svg" '
            +'alt="DigitalOcean Referral Badge" />'
        +'</a>'
      +'</div>'
    +'</div>'
  +'</aside>';
  //c += '<p>TAB1</p>';
  c += '</div><!--tab1-->';
  
  $('.dlg_'+dlg_slug+''+'_body').append(c);

}
