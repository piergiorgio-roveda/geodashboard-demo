function create_button(item_btn,optIn=new Array()){

  // if (f_wait.geovar_button==0
  //   || f_wait.geovar_label==0
  //   || f_wait.geovar_user==0
  //   || f_wait.geovar_label==0
  //   || f_wait.geovar_access==0) {
  //   // _onsole.log('wait')
  //   setTimeout(function(){create_button(item_btn,optIn)},1000);
  //   return;
  // } else {

    dyn_functions['exe_create_button'](item_btn,optIn);

  // };

}

dyn_functions['exe_create_button'] = function(item_btn,optIn=new Array()){
  //_onsole.log('exe_create_button',g_meta.geovar_button)
  //Array.prototype.filter()
  let obj_btn=g_meta.geovar_button.features.filter(({properties}) => properties.g_slug === item_btn);
  let g_group = '';
  if(obj_btn.length>0){
    g_group = obj_btn[0].properties.g_group[0];
  }
  else{
    console.log('BTN without properties!');
    return;
  }
  
  

  let p_btn = obj_btn[0].properties;
  let btn_label='';
  //_onsole.log('p_btn',p_btn);
  if(p_btn.g_label!=null){
    btn_label=gLang[p_btn.g_label];
  }
  else if(p_btn.g_faw!=null){  
    btn_label='<i class="fa '+p_btn.g_faw+'" aria-hidden="true"></i>';
  }
  else{
    btn_label='<i class="fa fa-ellipsis-h" aria-hidden="true"></i>';
  }

  var c='';

  if(p_btn.g_style===null){
    var g_style='btn-outline-dark';
  }
  else{
    var g_style=p_btn.g_style;
  }

  if(p_btn.g_responsive=='mobile'){ 
    if(isMobile == true){
    }
    else{
      return;
    }
  }
  else if(p_btn.g_responsive=='desktop'){
    if(isMobile == true){
      return;
    }
  }

  if(p_btn.g_callback===null){
    // _onsole.log('g_callback undefined')
    var g_callback=item_btn;
  }
  else{
    // _onsole.log('g_callback defined')
    var g_callback=p_btn.g_callback;
  }

  if(p_btn.g_template=='v2'){

    //_onsole.log('v2',p_btn);

    if(p_btn.g_type=='form-switch'){
      c=''
        +'<div class="form-check form-switch">'
          +'<input '
            +'id="'+item_btn+'" '
            +'type="checkbox" '
            +'class="form-check-input '+g_style+'" '
            +'role="switch">'
          +'<label class="form-check-label" for="'+item_btn+'">'
            +btn_label.toUpperCase()+'</label>'
        +'</div>';
    }
    else{
      c=''
        +'<button '
          +'id="'+item_btn+'" '
          +'type="button" '
          +'class="btn '+g_style+' '+G_CSS_THEME+'">'
          +btn_label+'</button>';
    }


  }//IF V2
  else{

    if(p_btn.g_template=='a'){
        c=''
        +'<div class="row">'
          +'<div class="col-2 text-center" style="padding-right:0px;margin-top: 3px;">'
            +'<i class="fa '+p_btn.g_faw+'" aria-hidden="true"></i>'
          +'</div>'
          +'<div class="col-10">'
            +'<span '
              +'id="'+item_btn+'" '
              +'g_callback="'+g_callback+'" '
              +'g_group="'+g_group+'" '
              +'class="'+item_btn+'" '
              +'slug="'+item_btn+'">'
              +btn_label+'</span>'
          +'</div>'
        +'</div>';
    }
    else if(p_btn.g_template=='b'){

      c=''
        +'<button '
          +'id="'+item_btn+'" '
          +'type="button" '
          +'class="btn btn-sm '+g_style+'">'
          +btn_label.toUpperCase()+'</button>';
    }
    else if(p_btn.g_template=='c'){
      c=''
        +'<button '
          +'id="'+item_btn+'" '
          +'type="button" '
          +'class="btn btn-sm '+g_style+' btn-main-sidebar">'
          +btn_label.toUpperCase()+'</button>';
    }
    else if(p_btn.g_template=='d'){
      c=''
        +'<button '
          +'id="'+item_btn+'" '
          +'type="button" '
          +'style="width:100%;" '
          +'class="btn btn-xs '+g_style+' btn-main-sidebar">'
          +btn_label.toUpperCase()+'</button>';
    }
    else if(p_btn.g_template=='e'){
      c=''
        +'<button '
          +'id="'+item_btn+'" '
          +'type="button" '
          +'style="width:30px;" '
          +'class="btn btn-xs '+g_style+' btn-main-sidebar">'
          +'<i class="fa '+p_btn.g_faw+'" aria-hidden="true"></i></button>';
    }
    else if(p_btn.g_template=='f'){
      c=''
        +'<button '
          +'id="'+item_btn+'" '
          +'type="button" '
          +'style="width:30px;" '
          +'class="btn btn-xs '+g_style+' btn-main-sidebar">'
          +'<i class="fa '+p_btn.g_faw+'" aria-hidden="true"></i></button>';
    }
    else if(p_btn.g_template=='g'){
      c=''
        +'<button '
          +'id="'+item_btn+'" '
          +'type="button" '
          +'style="width:30px;" '
          +'class="btn btn-xs '+g_style+' btn-main-sidebar">'
          +'<i class="fa '+p_btn.g_faw+'" aria-hidden="true"></i></button>';
    }
    else if(p_btn.g_template=='h'){
      c=''
        +'<button '
          +'id="'+item_btn+'" '
          +'type="button" '
          +'class="btn btn-sm '+g_style+' btn-main-sidebar">'
          +btn_label.toUpperCase()+'</button>';
    }
    else if(p_btn.g_template=='i'){

      c=''
        +'<button '
          +'id="'+item_btn+'" '
          +'class="btn btn-tab btn-sm '+g_style+'">'
          +'<span class="d-none d-md-block">'+btn_label.toUpperCase()+'</span>'
          +'<span class="d-block d-md-none">'+'<i class="fa '+p_btn.g_faw+'" aria-hidden="true"></i>'+'</span>'
        +'</button>';
    }
    else{

    }

  }//ELSE V2

  $('.box-'+item_btn).html(c);

  $('#'+item_btn).attr('g_group',g_group);
  $('#'+item_btn).attr('g_callback',g_callback);

  //_onsole.log(item_btn)
  //_onsole.log(g_group)
  //Array.prototype.filter()
  let obj_access=g_meta.geovar_access.features.filter(({properties}) => properties.g_slug === g_group);
  //_onsole.log(obj_access)
  if(obj_access.length>0){

    let a = obj_access[0].properties.g_roles;
    let b = g_meta.geovar_user.features[0].properties.user_role;

    if(a[0]=='hidden'){
      $('.box-'+item_btn).css('display','none');
    }
    else if(a[0]=='public'){

    }
    else if(a[0]=='private'){
      $('#'+item_btn).prop('disabled',true);
    }
    else{

      let result = js_intersect(a, b)

      if(result.length>0){
        $('#'+item_btn).prop('disabled',false);
      }
      else{
        $('#'+item_btn).prop('disabled',true);
      }

    }

  }

  //_onsole.log('exe_create_button');
  //_onsole.log('optIn',optIn);

  // _onsole.log( slug);
  // $('#'+item_btn).on('click',function(optIn){
  //   console.log('click');
  //   console.log('e',e);
  //   console.log('optIn',optIn);
  //   exe_btn($(this).attr('g_callback'),$(this).attr("id"),optIn);
  // });



  let opt = new Array();
  // if(optIn.length>0){
    opt=optIn;
  // }
  opt.g_callback=g_callback;
  opt.item_btn=item_btn;

  //_onsole.log('opt',opt)

  $('#'+item_btn).on('click',opt,exe_btn);

  // say your selector and click handler looks something like this...
  // $("some selector").click({param1: "Hello", param2: "World"}, cool_function);
  // $('.leadtoscore').bind('click', { param: 'shot' }, add_event);
}

// function exe_btn(g_callback,item_btn,optIn=new Array()){
function exe_btn(e){
  let optIn = e.data;
  //_onsole.log('exe_btn',optIn)
  // _onsole.log('param: '+g_callback);
  //return;
  // _onsole.log( $(this).attr('slug'));
  // _onsole.log( $(this).attr('g_callback'));
  //var g_callback = $(this).attr('g_callback');
  //let btn_slug = $(this).attr('slug');
  // _onsole.log('btn_slug: '+btn_slug);
  if(f_btn[optIn.g_callback]===undefined){
    console.log('callback undefined');
  }
  else{
    // _onsole.log('search f_btn callback');
    f_btn[optIn.g_callback](optIn.item_btn,optIn);
  }
}

function exe_btn_2(e){
  let optIn = e.data;
  //_onsole.log('exe_btn',optIn)
  // _onsole.log('param: '+g_callback);
  //return;
  // _onsole.log( $(this).attr('slug'));
  // _onsole.log( $(this).attr('g_callback'));
  //var g_callback = $(this).attr('g_callback');
  //let btn_slug = $(this).attr('slug');
  // _onsole.log('btn_slug: '+btn_slug);
  if(f_btn[optIn.g_callback]===undefined){
    console.log('callback undefined');
  }
  else{
    // _onsole.log('search f_btn callback');
    f_btn[optIn.g_callback](optIn);
  }
}

// DEFAULT BUTTON

// !dev change `slug` to `optIn`
f_btn[ 'btn_closedlg']=function(slug){
  // _onsole.log('f_btn '+slug)
  //alertify.infoDialog().close();
  alertify.infoDialog().destroy();
}

// !dev change `slug` to `optIn`
f_btn[ 'btn_closedlg3']=function(slug){
  // _onsole.log('f_btn '+slug)
  //alertify.infoDialog().close();
  alertify.infoDialog3().destroy();
}

// !dev change `slug` to `optIn`
f_btn[ 'btn_savedlg']=function(slug){
  // _onsole.log('save f_btn '+slug)

  var dataString = {}

  const input_value = document.querySelectorAll('.control-'+sessionStorage.this_dialog_slug);
  Array.from(input_value).forEach((element, index) => {
    dataString[element.getAttribute('slug')]=element.value;
  });

  alertify.infoDialog().close();
  alertify.infoDialog().destroy();
  
  dyn_functions[sessionStorage.f_tool_callback](dataString);

}

// ADDON BUTTON

/*
// !dev change `slug` to `optIn`
f_btn[ 'btn_explorer']=function(slug){
  // _onsole.log('f_btn:btn_explorer');
  create_dialog2(slug);
}
*/

// !dev change `slug` to `optIn`
f_btn[ 'btn_canceldlg_edit']=function(slug){

  var lyr = sessionStorage.destination_layer;
  //example return from edit to dl single
  alertify.infoDialog().destroy();
  // !dev change `slug` to `optIn`
  f_btn[ 'get_lyr_single_for_dlg'](lyr);

}

function create_button_2(optIn){

  if(optIn.g_responsive=='mobile'){ 
    if(isMobile == true){
    }
    else{
      return;
    }
  }
  else if(optIn.g_responsive=='desktop'){
    if(isMobile == true){
      return;
    }
  }
  else{
    //both
  }

  //--

  $('#'+optIn.itemSlug+'').remove();

  //--

  let c='';

  let itemLabel = get_opt_lang(optIn);

  if(optIn.itemType=='form-switch'){
    c=''
      +'<div class="form-check form-switch">'
        +'<input '
          +'id="'+optIn.itemSlug+'" '
          +'type="checkbox" '
          +'class="form-check-input '+optIn.itemClass+' '+G_CSS_THEME+'" '
          +'style="'+optIn.itemStyle+'" '
          +'role="switch">'
        +'<label class="form-check-label" for="'+optIn.itemSlug+'">'
          +itemLabel+'</label>'
      +'</div>';
  }
  else{
    c=''
      +'<button '
        +'id="'+optIn.itemSlug+'" '
        +'type="button" '
        +'class="btn '+optIn.itemClass+' '+G_CSS_THEME+'" '
        +'style="'+optIn.itemStyle+'" '
        +'>'
        +itemLabel+'</button>';
  }

  $('.box-'+optIn.itemSlug).html(c);

  //--

  if(optIn.g_callback===undefined){
    // _onsole.log('g_callback undefined')
    var g_callback=optIn.itemSlug;
  }
  else{
    // _onsole.log('g_callback defined')
    var g_callback=optIn.g_callback;
  }

  // works on item #id and box .class
  group_disable_hide(optIn);

  // $('#'+item_btn).attr('g_group',g_group);
  // $('#'+item_btn).attr('g_callback',g_callback);

  let opt = new Array();
  // if(optIn.length>0){
    opt=optIn;
  // }
  opt.g_callback=g_callback;
  opt.itemSlug=optIn.itemSlug;

  //_onsole.log('opt',opt)

  $('#'+optIn.itemSlug).on('click',opt,exe_btn_2);

  // say your selector and click handler looks something like this...
  // $("some selector").click({param1: "Hello", param2: "World"}, cool_function);
  // $('.leadtoscore').bind('click', { param: 'shot' }, add_event);
}