$(document).ready(function() {

  a233_ready();

}); //$(document).ready

function a233_ready(){
  if (f_wait.boxSidebarFooter==0) {
    // _onsole.log('wait')
    setTimeout(function(){a233_ready()},100);
    return;
  } else {
    create_button('btn_settings');
    $('#btn_settings').prop('disabled',false);
  };
}

f_btn['btn_settings']=function(slug){

  //window.open("https://github.com/", "_blank");

  sessionStorage.this_dialog_lyr='btn_settings_map';
  sessionStorage.this_dialog_slug='btn_settings_map_single';//'lyr035_single'
  //
  //sessionStorage.addon208_text='btn_analytics_01';
  //sessionStorage.mapclick_lng=e.latlng.lng;
  create_dialog2(sessionStorage.this_dialog_slug);

}

var listSettingsMapExtend=[];

dyn_functions['template_by_slug_btn_settings_map_single'] = function(){

  let dlg_slug = 'btn_settings_map_single';

  let c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //box button tab
  c = ''
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  c = '<ul class="nav nav-tabs"></ul>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  c = '<div>'
    +'<div class="col-btn-attrs" style="text-align:left;"></div>'
  +'</div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //box tab1
  c = '<div '
    +'class="dlg_panel dlg_panel_tab panel-tab1" '
    +'style="display:block;font-family:var(--wd-fonts-secondary);">';
  //c += '<p>TAB1</p>';
  c += '</div><!--tab1-->';
  
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  listSettingsMapExtend.forEach(adds => {
    dyn_functions[adds+'_SettingsMapExtend']();
  });

}

listSettingsMapExtend.push('a233_1');

dyn_functions['a233_1_SettingsMapExtend'] =  function(){

  let dlg_slug = 'btn_credit_single';

  $('.dlg_btn_credit_single_title').html('Documentation');

  $('.dlg_panel_tab').css('padding-top','15px');

  $('.nav-tabs').html('');

  let c = '<li tab="tab1" class="nav-item">'
      +'<a class="nav-link active" aria-current="page" href="#">'
        +'Map'
      +'</a>'
    +'</li>'
    +'<li tab="tab2" class="nav-item">'
      +'<a class="nav-link" href="#">'
        +'Layers'
      +'</a>'
    +'</li>';

  $('.nav-tabs').append(c);

  let parts_a = [
    {  
      'g_tab': 'tab1',
      'g_slug': 'part_1',
      'g_type': 'map_properties',
    }
  ];

  parts_a.forEach(obj_part => {
    dlg_addon233_add_part(obj_part);
  });

  $('.panel-tab1').append(''
    +'<ul></ul>'
  +'');

  //box tab2
  c = '<div '
    +'class="dlg_panel dlg_panel_tab panel-tab2" '
    +'style="display:none;font-family:var(--wd-fonts-secondary);'
    +'max-height: 500px;overflow-y: auto;">';
  c += '</div><!--tab2-->';

  $('.dlg_'+dlg_slug+''+'_body').append(c);

  $('.panel-tab2').append(''
    +'<div>'
    +'</div>'
  +'');


  //events functions
  $('.nav-item').on('click',function(){
    $('.nav-item > a').removeClass('active');
    $(this).children('a').addClass('active');
    var tab = $(this).attr('tab');
    $('.dlg_panel_tab').css('display','none');
    $('.panel-'+tab).css('display','block');
  });

}

//--

function dlg_addon233_add_part(obj_part){

  $('.row-'+obj_part.g_slug).remove();

  let  c = ''
    +'<div class="row row-'+obj_part.g_slug+'">'
      +'<div class="col-12">'
        +'<div class="'+obj_part.g_tab+' '+obj_part.g_slug+'">'
        +'</div>'
      +'</div>'
    +'</div>'
    +'';
  $('.panel-'+obj_part.g_tab).append(c);

  if(obj_part.g_type=='map_properties'){

    // let o = addon223_data;
    // let this_obj=o.filter((x) => x.MAPSLUG === MAPSLUG);
    // console.log(this_obj);

    // let obj_data=this_obj[0];//.properties;

    //_onsole.log(  obj_data  );

    $('.ajs-footer-btn2').append(''
      +'<span class="box-btn_a233_save"></span>'
    +'');

    create_button('btn_a233_save');

    let o = g_meta.geovar_map.features;
    let this_obj=o.filter(({properties}) => properties.g_slug === MAPSLUG);
    let obj_map=this_obj[0].properties;

    let obj_tb = g_meta.geovar_tb.filter(({name}) => name === 'TB_MAP')[0];

    let c ='';

    obj_tb.features.forEach(el => {

      let p = el.properties;

      if(p.g_meta===1){
        let value = obj_map[p.g_slug];
        let input_html = '<input type="text" class="form-control" '
          +'id="input-'+p.g_slug+'" '
          +'value="'+value+'" />';
        if(p.data_type==='json'){
          value = JSON.stringify(obj_map[p.g_slug]);
          input_html = '<textarea class="form-control" rows="3" '
            +'id="input-'+p.g_slug+'" '
            +'>'+value+'</textarea>';
        }
        c = ''
          +'<div '
            +'class="box" '
            +'>'
            +'<div class="form-group">'
              +'<label for="exampleInputEmail1">'+p.g_label+'</label>'
              +input_html
            +'</div>'
          +'</div>'
          +'';
        $('.'+obj_part.g_tab+'.'+obj_part.g_slug+'').append(c);

      }
    });

  } //end if map_properties
  
}

f_btn['btn_a233_save']=function(){

  dataString={
    fn_group:'geodata',
    action:'modify_data',
    collection:'update_addon_geovar',
    table:'TB_MAP',
    qy_name:'A',
    fn_extend:'a233_save_extend',
    lyr:'lyr999'
  }

  let obj_tb = g_meta.geovar_tb.filter(({name}) => name === 'TB_MAP')[0];

  obj_tb.features.forEach(el => {

    let p = el.properties;
    if(p.g_meta===1){
      dataString[p.g_slug]= $('#input-'+p.g_slug).val();
    }
    
  });

  switch_on_lyr_custom(dataString);

}

dyn_functions['a233_save_extend']=function(r){

  //_onsole.log('a233_save_extend')
  window.open(window.location.href,"_self");

}