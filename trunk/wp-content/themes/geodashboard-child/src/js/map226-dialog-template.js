var dlg_template = [];
var dlg_field_template = [];

function load_dlg_template(slug){

  // _onsole.log('load_dlg_template');

  var dataString = {}
  dataString.slug=slug;
  dataString.settings_url='/meta/geovar_dialog.json';
  dataString.settings_json=true;

  generic_api(dataString,'dlg_'+slug);

}

function load_box_template(slug){

  // _onsole.log('load_dlg_template');

  var dataString = {}
  dataString.slug=slug;
  dataString.settings_url='/meta/geovar_dialog.json';
  dataString.settings_json=true;

  generic_api(dataString,'box_'+slug);

}

// DEFAULT DLG TEMPLATE

dlg_template['single_tab'] = function(g_slug){

  // _onsole.log('dlg_template:explorer_simple > '+g_slug);
  var c = '<div class="mainboxItem" style="margin-top:5px;"></div>'
    +'<div class="col-md-12 box-tab box_tab1" style="display:block;">'
      +'<div class="boxItem">'
        +'<div class="row" ' 
          +'style="padding:3px;">'
          +'<div class="col-xs-12 dlg_'+g_slug+'_tab1_ct1">'
          +'</div>'
        +'</div>'
      +'</div>'
    +'</div>'
  +'';

  $('.dlg_'+g_slug+'_body').html(c);

}

dlg_template['template_by_slug'] = function(g_slug){

  // _onsole.log('dlg_template:explorer_simple > '+g_slug);
  /*
  var c = '<div class="mainboxItem" style="margin-top:5px;"></div>'
    +'<div class="col-md-12 box-tab box_tab1" style="display:block;">'
      +'<div class="boxItem">'
        +'<div class="row" ' 
          +'style="padding:3px;">'
          +'<div class="col-xs-12 dlg_'+g_slug+'_tab1_ct1">'
          +'</div>'
        +'</div>'
      +'</div>'
    +'</div>'
  +'';

  $('.dlg_'+g_slug+'_body').html(c);
  */

}

dlg_template['single_tab_photo'] = function(g_slug){

  // _onsole.log('dlg_template:explorer_simple > '+g_slug);
  var c = '<div class="mainboxItem" style="margin-top:5px;"></div>'
    +'<div class="col-md-12 box-tab box_tab1" style="display:block;">'
      +'<div class="boxItem">'
        +'<div class="row" ' 
          +'style="padding:3px;">'
          +'<div class="col-xs-12 dlg_'+g_slug+'_tab1_ct1">'
          +'</div>'
        +'</div>'
      +'</div>'
    +'</div>'
  +'';

  $('.dlg_'+g_slug+'_body').html(c);

}

dlg_template['single_tab_input'] = function(g_slug){

  // _onsole.log('dlg_template:explorer_simple > '+g_slug);
  var c = '<div class="mainboxItem" style="margin-top:5px;"></div>'
    +'<div class="col-md-12 box-tab box_tab1" style="display:block;">'
      +'<div class="boxItem">'
        +'<div class="row" ' 
          +'style="padding:3px;">'
          +'<div class="col-xs-12 dlg_'+g_slug+'_tab1_ct1">'
          +'</div>'
        +'</div>'
      +'</div>'
    +'</div>'
  +'';

  $('.dlg_'+g_slug+'_body').html(c);

}

dlg_template['tab_x1_edit'] = function(g_slug){

  // _onsole.log('dlg_template:explorer_simple > '+g_slug);
  var c = '<div class="mainboxItem" style="margin-top:5px;"></div>'
    +'<div class="col-md-12 box-tab box_tab1" style="display:block;">'
      +'<div class="boxItem">'
        +'<div class="row" ' 
          +'style="padding:3px;">'
          +'<div class="col-xs-12 dlg_'+g_slug+'_tab1_ct1">'
          +'</div>'
        +'</div>'
      +'</div>'
    +'</div>'
  +'';

  $('.dlg_'+g_slug+'_body').html(c);

}

dlg_template['tab_x6'] = function(g_slug){

  // _onsole.log('dlg_template:explorer_simple > '+g_slug);
  var c = '<div class="mainboxItem" style="margin-top:5px;"></div>'
  +'';

  //box button tab
  c += ''
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  //box button tab -end

  c += '<div class="row row3">'
    +'<div class="col-md-6 col-btn-attrs" style=" text-align: center;">'
      +'<button id="tab1" class="btn btn-tab btn-tab1 btn-sm btn-serie btn-serie-current" '
        +'style="padding:5px 5px;"></button>'
      +'<button id="tab2" class="btn btn-tab btn-tab2 btn-sm btn-serie btn-serie-other" '
        +'style="padding:5px 5px;"></button>'
      +'<button id="tab3" class="btn btn-tab btn-tab3 btn-sm btn-serie btn-serie-other" '
        +'style="padding:5px 5px;"></button>'
      +'<button id="tab4" class="btn btn-tab btn-tab4 btn-sm btn-serie btn-serie-other" '
        +'style="padding:5px 5px;"></button>'
      +'<button id="tab5" class="btn btn-tab btn-tab5 btn-sm btn-serie btn-serie-other" '
        +'style="padding:5px 5px;display:none;"></button>'
      +'<button id="tab6" class="btn btn-tab btn-tab6 btn-sm btn-serie btn-serie-other" '
        +'style="padding:5px 5px;display:none;"></button>'
    +'</div>'
    +'<div class="col-md-6 col-btn-tools" style=" text-align: center;">'
      +'<button id="tool1" class="btn btn-tool1 btn-sm btn-serie btn-serie-tool" '
        +'style="padding:5px 5px;"></button>'
      +'<button id="tool2" class="btn btn-tab btn-tool2 btn-sm btn-serie btn-serie-tool" '
        +'style="padding:5px 5px;"></button>'
      +'<button id="tool3" class="btn btn-tab btn-tool3 btn-sm btn-serie btn-serie-tool" '
        +'style="padding:5px 5px;"></button>'  
      +'<div class="clearfix"></div>'
    +'</div>'
  +'</div>';

  //box tab1
  c += '<div '
    +'class="dlg_panel panel-tab1" '
    +'style="display:block;font-family:var(--wd-fonts-secondary);">'
    +'';

  c += '</div><!--tab1-->'; 

  //box tab2
  c += '<div '
    +'class="dlg_panel panel-tab2" '
    +'style="display:none;font-family:var(--wd-fonts-secondary);">'
    +'';
  c += '</div><!--tab2-->'; 

  //box tab3
  c += '<div '
    +'class="dlg_panel panel-tab3" '
    +'style="display:none;font-family:var(--wd-fonts-secondary);">'
    +'';
  c += '</div><!--tab3-->';

  //box tab4
  c += '<div '
    +'class="dlg_panel panel-tab4" '
    +'style="display:none;font-family:var(--wd-fonts-secondary);">'
    +'';
  c += '</div><!--tab4-->'; 

  //box tab5
  c += '<div '
    +'class="dlg_panel panel-tab5" '
    +'style="display:none;font-family:var(--wd-fonts-secondary);">'
    +'';
  c += '</div><!--tab5-->'; 

  //box tab6
  c += '<div '
    +'class="dlg_panel panel-tab6" '
    +'style="display:none;font-family:var(--wd-fonts-secondary);">'
    +'';
  c += '</div><!--tab6-->'; 

  c += '<div class="req_msg" style="display:none;"><span style="color:red;">'
    +gLang.label_form_all_required+'</span></div>'

  $('.dlg_'+g_slug+'_body').html(c);

}

// ADDON DLG TEMPLATE

/*
dlg_template['explorer_simple'] = function(g_slug){

  // _onsole.log('dlg_template:explorer_simple > '+g_slug);
  $('.dlg_'+g_slug+'_body').html('Aaa');

}
*/