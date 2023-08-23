var a241_mapReady = 0;

dyn_functions['map241-menu-list-map'+'_ready'] = function(){

  $('.box-sidebar-extra-pre').append('<div '
    +'class="box-btn_menu_list_map box-info-2-btn d-grid gap-2" '
    +'style="margin-top:5px;"></div>');
  create_button('btn_menu_list_map');

}

// !dev change `slug` to `optIn`
f_btn[ 'btn_menu_list_map']=function(slug){

  addon220_ready();

}

