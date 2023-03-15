var a220_mapReady = 0;

dyn_functions['addon220-choose-map'+'_ready'] = function(){

  addon220_ready();

}

// _onsole.log('Choose map');
// _onsole.log(obj_maps);

function addon220_ready(){
  
  exe_addon220();

}

function exe_addon220(){

  sessionStorage.this_dialog_slug='addon220_single';
  create_dialog2('addon220_single');

}

dyn_functions['template_by_slug_addon220_single'] = function(){

  var dlg_slug = 'addon220_single';
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

  c = '<ul></ul>';
  $('.dlg_'+dlg_slug+'_list').append(c);

  g_meta.obj_maps.features.forEach(element => {
    let p_map = element.properties;
    let g_slug_map = p_map.g_slug;
    let g_group = p_map.g_group[0];
    let obj_access=g_meta.geovar_access.features.filter(({properties}) => properties.g_slug === g_group);

    //_onsole.log(g_slug_map);
    //_onsole.log(g_group);
    //_onsole.log(obj_access);

    if(obj_access.length>0){

      let a = obj_access[0].properties.g_roles;
      let b = g_meta.geovar_user.features[0].properties.user_role;

      if(a[0]=='hidden'
        ||a[0]=='private'){

      }
      else if(a[0]=='public'){
        let c ='<li><a href="'+HOME_PROJECT+'/map/'+g_slug_map+'">'+g_slug_map+': '+p_map.my_notes+'</a></li>';
        $('.dlg_'+dlg_slug+'_list > ul').append(c);
      }
      else{

        let result = js_intersect(a, b)

        if(result.length>0){
          let c ='<li><a href="'+HOME_PROJECT+'/map/'+g_slug_map+'">'+g_slug_map+': '+p_map.my_notes+'</a></li>';
          $('.dlg_'+dlg_slug+'_list > ul').append(c);
        }
        else{

        }

      }

    }



  });

}