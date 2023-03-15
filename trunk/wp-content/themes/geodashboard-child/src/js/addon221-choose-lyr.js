$(document).ready(function() {

  $('.box-sidebar-extra-pre').append('<div '
    +'class="box-btn_menu_list_lyr box-info-2-btn d-grid gap-2" '
    +'style="margin-top:5px;"></div>');

  addon221_ready();

}); //$(document).ready

// _onsole.log('Choose map');
// _onsole.log(g_meta.obj_maps);

var btn_lyr=new Array();

function addon221_ready(){
  
  if (f_wait.geovar_button==0
    || f_wait.geovar_label==0
    || f_wait.geovar_user==0
    || f_wait.geovar_label==0) {
    // _onsole.log('wait')
    setTimeout(function(){addon221_ready()},100);
    return;
  } else {
    exe_addon221();
  };
}

function exe_addon221(){

  create_button('btn_menu_list_lyr');

}

f_btn['btn_menu_list_lyr']=function(slug){

  sessionStorage.this_dialog_slug='addon221_single';
  create_dialog2('addon221_single');

}

dyn_functions['template_by_slug_addon221_single'] = function(){

  var dlg_slug = 'addon221_single';
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

  f_wait['tb_lyr']=0;
  load_geovar(['tb_lyr']);

  addon221_lyr_ready();

}

function addon221_lyr_ready(){
  
  if (f_wait.tb_lyr==0) {
    // _onsole.log('wait')
    setTimeout(function(){addon221_lyr_ready()},100);
    return;
  } else {
    exe_addon221_lyr();
  };

}

function exe_addon221_lyr(){

  let obj_lyrs = g_meta.tb_lyr;
  let dlg_slug = 'addon221_single';

  obj_lyrs.features.forEach(element => {
    let p_lyr = element.properties;
    let g_slug_lyr = p_lyr.g_slug;

    let g_group = p_lyr.g_group[0];
    let obj_access=g_meta.geovar_access.features.filter(({properties}) => properties.g_slug === g_group);

    //_onsole.log(g_slug_lyr);
    //_onsole.log(g_group);
    //_onsole.log(obj_access);

    if(obj_access.length>0){

      let a = obj_access[0].properties.g_roles;
      let b = g_meta.geovar_user.features[0].properties.user_role;

      if(a[0]=='hidden'
        ||a[0]=='private'){

      }
      else if(a[0]=='public'){

        var meta = {
          'properties':{
            "g_slug": "label_"+g_slug_lyr,
            "g_label": p_lyr.title
          }
        }
        gLang[meta.properties.g_slug]=meta.properties.g_label;

        var meta = {
          'properties':{
            "g_slug": "btn_"+g_slug_lyr,
            "g_label": "label_"+g_slug_lyr,
            "g_group": a,
            "g_description": "...",
            "g_template": "v2",
            "g_faw": null,
            "g_callback": 'btn_lyr_add',
            "g_responsive": "both",
            "g_style": "lyr-switch",
            "g_type": "form-switch"
          }
        }
        g_meta.geovar_button.features.push(meta);

        let item_btn = "btn_"+g_slug_lyr;

        c ='<tr style="border-style: hidden;">'
          //+'<td class="only_icon icon_'+element+'"><i class="fa fa-lock" aria-hidden="true"></i></td>'
          +'<td>'
            +'<div test="BBB" class="box-'+item_btn+'"></div>'
          +'</td>'
        +'</tr>';
        $('.dlg_'+dlg_slug+'_table > tbody').append(c);
        btn_lyr[item_btn]=g_slug_lyr;
        create_button(item_btn);

      }
      else{

        // let result = js_intersect(a, b)

        // if(result.length>0){
        //   let c ='<li><a test="AAA" href="'+HOME_PROJECT+'/map/'+g_slug_lyr+'">'+g_slug_lyr+': '+p_lyr.title+'</a></li>';
        //   $('.dlg_'+dlg_slug+'_list > ul').append(c);
        // }
        // else{

        // }

      }

    }

  });
}

f_btn['btn_lyr_add']=function(item_btn){

  let lyr=btn_lyr[item_btn];

  console.log('btn_lyr_add >> ' + lyr);
  console.log("Checkbox is checked >>" + $('#'+item_btn).is(':checked'));

  // if (document.getElementById(item_btn).is(':checked')){
  //   console.log(item_btn + 'is checked');
  // }
  // else{
  //   console.log(item_btn + 'is un-checked');
  // }

  

  // document.querySelector("lyr-switch").onchange = function() {
  //   if(this.checked){
  //     console.log("Checkbox is checked");
  //     console.log(this.attributes);
  //   }
  //   else{
  //     console.log("Checkbox is not checked");
  //     console.log(this.attributes);
  //   }
  // };

  // let o = g_meta.tb_lyr.features//TB!
  // let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  // //let obj_lyr=this_obj[0].properties;
  
  // g_meta.geovar_lyr.features.push(this_obj[0]);

  // generic_lyr(lyr);

}
