$(document).ready(function() {


  $('.box-sidebar-extra-pre').append('<div '
    +'class="box-btn_menu_sidebar box-info-2-btn d-grid gap-2" '
    +'style="margin-top:5px;"></div>');
  create_button('btn_menu_sidebar');


}); //$(document).ready

// !dev change `slug` to `optIn`
f_btn[ 'btn_menu_sidebar']=function(slug){

  sessionStorage.this_dialog_slug='menu_sidebar_single';
  create_dialog2('menu_sidebar_single');

}

dyn_functions['template_by_slug_menu_sidebar_single'] = function(){

  var dlg_slug = 'menu_sidebar_single';
  var c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //box button tab
  var c = ''
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  var c = '<div>'
    +'<div class="col-btn-attrs" style="text-align:left;"></div>'
  +'</div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //box tab1
  c += '<div '
    +'class="dlg_panel panel-tab1" '
    +'style="display:block;font-family:var(--wd-fonts-secondary);">';
  //c += '<p>TAB1</p>';
  c+='<div class="dlg_'+dlg_slug+'_list"></div>'
  c += '</div><!--tab1-->';
  
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  c = '<table class="table dlg_'+dlg_slug+'_table">'
  c += '<tbody></tbody></table>';
  $('.dlg_'+dlg_slug+'_list').append(c);



/*   g_meta.obj_maps.features.forEach(element => {*/
    //let p = element.properties;
/*     c ='<tr><td class="only_icon"><i class="fa fa-user-o" aria-hidden="true"></i></td><td>HOME</td></tr>';
    c +='<tr><td class="only_icon"><i class="fa fa-lock" aria-hidden="true"></i></td><td>EXPLORER</td></tr>';
    c +='<tr><td class="only_icon"><i class="fa fa-user-o" aria-hidden="true"></i></td><td>MAP</td></tr>';
    c +='<tr><td class="only_icon"><i class="fa fa-user-o" aria-hidden="true"></i></td><td>MAP LIST</td></tr>';
    $('.dlg_'+dlg_slug+'_table > tbody').append(c); */
  /*}); */

  let arr_item_btn=['btn_open_page_dashboard',
    'btn_open_page_map','btn_open_page_explorer','btn_open_page_monster'];

  arr_item_btn.forEach(item_btn => {
    c ='<tr style="border-style: hidden;">'
      //+'<td class="only_icon icon_'+element+'"><i class="fa fa-lock" aria-hidden="true"></i></td>'
      +'<td><div class="box-'+item_btn+'"></div></td>'
    +'</tr>';
    $('.dlg_'+dlg_slug+'_table > tbody').append(c);

    create_button(item_btn);

/*     dataString={
      fn_group:'geodata',
      action:'view_data',
      collection:'user_access',
      qy_name:'A',
      lyr:'lyr039',
      element:element,
      user_role:g_meta.geovar_user.features[0].properties.user_role
    }
    generic_api(dataString,'menu_access'); */

  });



}

dyn_functions['succ_menu_access'] = function(r){
  let f = r.features[0];
  let p = f.properties;
  if(p.status[0]=='lock'){

  }
  else{
    $('.icon_'+r.ds.element+' > i').removeClass('fa-lock');
    $('.icon_'+r.ds.element+' > i').addClass('fa-user-o');
  }

}

// !dev change `slug` to `optIn`
f_btn[ 'btn_sidebar_menu_go']=function(item_btn){
  //_onsole.log('go ' + item_btn);
  let obj_btn=g_meta.geovar_button.features.filter(({properties}) => properties.g_slug === item_btn);
  let g_group = obj_btn[0].properties.g_group[0];
  //_onsole.log(g_group)
  window.open(HOME_PROJECT+'/'+gLang['url_'+g_group]+'/',"_self");
}

