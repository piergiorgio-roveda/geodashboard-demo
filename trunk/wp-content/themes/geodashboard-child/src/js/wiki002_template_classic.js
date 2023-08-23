$(document).ready(function() {

  $('#mapid').append(''
    +'<div class="bd-wiki-main-row">'
      +'<div class="row g-0 text-center">'
        +'<div class="col-sm-6 col-md-8">'
          +'<div class="wiki-box-main wiki-title"></div>'
          +'<div class="wiki-box-main wiki-nav"></div>'
          +'<div class="wiki-box-main wiki-content"></div>'
          +'<div class="wiki-box-main wiki-tool"></div>'
          +'<div class="wiki-box-main wiki-sub" style="overflow:auto;height:500px;"></div>'
        +'</div>'
        +'<div class="col-6 col-md-4">'
          +'<div class="wiki-box-main wiki-list">'
            +'<div class="wiki-box-main wiki-sub-internal" style="padding:0px;"><p class="wiki-card-title">Internal</p></div>'
            +'<div class="wiki-box-main wiki-sub-external" style="padding:0px;"><p class="wiki-card-title">External</p></div>'
          +'</div>'
        +'</div>'
      +'</div>'
    +'</div>'
  +'');

  $('.wiki-title').html(p_main.post_content[0].title);
  $('.wiki-nav').html(''
    +'<a href="'+HOME_PROJECT+'/wiki/" target="_self">'
      +'<i class="fa fa-home" aria-hidden="true"></i> WiKi'
    +'</a> > '
    +'<a href="'+HOME_PROJECT+'/wiki/'+p_main.post_child+'" target="_self">'
      +'UP'
    +'</a>'
    +'');
  $('.wiki-content').html(p_main.post_content[0].content);
  $('.wiki-tool').html('<div '
    +'class="box-btn_wiki_add box-info-2-btn d-grid gap-2" '
    +'style="margin-top:5px;"></div>');
  create_button('btn_wiki_add');

  list_wiki_sub();

}); //$(document).ready

//var myinput ='';
var wiki_g_group_insert=[];
var wiki_array_custom_js=[];
var wiki_sub_last_r=new Array();
f_wait.wiki_sub=0;

// !dev change `slug` to `optIn`
f_btn[ 'btn_wiki_add']=function(slug){

  //_onsole.log('btn_wiki_add');
  sessionStorage.this_dialog_slug='wiki_add_post_single';
  create_dialog2('wiki_add_post_single');

}

dyn_functions['template_by_slug_wiki_add_post_single'] = function(){

  var dlg_slug = 'wiki_add_post_single';
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
  c += ''
    +'<div '
      +'class="dlg_panel panel-tab1" '
      +'style="display:block;font-family:var(--wd-fonts-secondary);">'
      +'<div class="row">'
        +'<div class="col-4 dlg_'+dlg_slug+'_form wiki-form-insert-radio"></div>'
        +'<div class="col-8 dlg_'+dlg_slug+'_form wiki-form-insert"></div>'
      +'</div>'
      //+'<div class="row">'
      //  +'<div class="col-12 dlg_'+dlg_slug+'_form wiki-form-insert-role"></div>'
      //+'</div>'
      +'<div class="row">'
        +'<div class="col-12 dlg_'+dlg_slug+'_form wiki-form-insert-role-ui"></div>'
      +'</div>'
    +'</div><!--tab1-->';
  
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //--

  let item_btn='wiki_radio_type';
  let obj_btn=g_meta.geovar_button.features.filter(({properties}) => properties.g_slug === item_btn);
  let g_options = obj_btn[0].properties.g_options;

  c = '';

  g_options.forEach(element => {
    c += '<div class="form-check">'
      +'<input class="form-check-input" type="radio" '
        +'value="'+element.value+'" '
        +'name="flexRadioDefault" id="flexRadioDefault1">'
      +'<label class="form-check-label" for="flexRadioDefault1">'
        +element.label+'</label>'
      +'</div>';
  });
  $('.wiki-form-insert-radio').append(c);

  //--

  /* let slug1 = 'input-roles';
  c = '<div class="form-check">'
    +'<input type="text" '
      +'slug="'+slug1+'" '
      +'class="form-control wiki-insert-control" '
      +'id="control-'+slug1+'" '
      +'>'
    +'</div>';

  $('.wiki-form-insert-role').append(c); */

  //--
  let array = ['public','wikidude','monster']

  array.forEach(element => {
    c = '<span '
      +'class="badge bg-secondary wiki-badge-insert-role" '
      +'style="cursor:pointer;" '
      +'myrole="'+element+'">'+element.toUpperCase()+'</span>&nbsp;';
    $('.wiki-form-insert-role-ui').append(c);
  });

  //--

  $('.wiki-badge-insert-role').on('click',function(){

    let myrole=$(this).attr('myrole');

    if(wiki_g_group_insert.indexOf(myrole)>-1){
      wiki_g_group_insert.splice(wiki_g_group_insert.indexOf(myrole),1);
      $(this).addClass('bg-secondary');
      $(this).removeClass('bg-primary');
    }
    else{
      if(myrole=='public'){
        wiki_g_group_insert=[];
        $('.wiki-badge-insert-role').removeClass('bg-primary');
        $('.wiki-badge-insert-role').addClass('bg-secondary');
      }
      else{
        if(wiki_g_group_insert.indexOf('public')>-1){
          wiki_g_group_insert=[];
          $('[myrole=public]').removeClass('bg-primary');
          $('[myrole=public]').addClass('bg-secondary');
        }
      }
      wiki_g_group_insert.push($(this).attr('myrole'));
      $(this).removeClass('bg-secondary');
      $(this).addClass('bg-primary');
    }
    

    var input = $( "#control-input-roles" );
    input.val(JSON.stringify(wiki_g_group_insert) );

    //_onsole.log(JSON.stringify([new Number(3), new String('false'), new Boolean(false)]));
    // expected output: "[3,"false",false]"

  });

  //--

  $('.ajs-footer-btn2').append(''
    +'<span class="box-btn_save_wiki"></span>'
    //+'<span class="box-btn_editdlg" style="margin-left:5px;"></span>'
    //+'<span class="box-btn_movedlg" style="margin-left:5px;"></span>'
  +'');

  /* $( ".new_content" ).keyup(function() {
    //_onsole.log( "Handler for .keypress() called." );
    //_onsole.log( $( ".new_content" ).val() );
    myinput=$( ".new_content" ).val();
  }); */

  $('input[type=radio][name=flexRadioDefault]').change(function() {
    //_onsole.log(this.value);
    change_wiki_form_insert(this.value)
  });

  create_button('btn_save_wiki');

}

function change_wiki_form_insert(mytype){

  sessionStorage.wiki_insert_g_type=mytype;

  let obj = g_meta.geovar_generic_option.filter(({properties}) => properties.g_slug === mytype);
  let p = obj[0].properties;
  $('.wiki-form-insert').html('');
  //_onsole.log(p.g_cols)
  p.g_cols.forEach(element => {
    let l_c = '';
    if(element.g_type=='text'){
      l_c = ''
        +'<div class="mb-3">'
          +'<label for="control-'+element.g_slug+'" '
            +'class="form-label">'+element.g_label+'</label>'
          +'<input type="text" '
            +'slug="'+element.g_slug+'" '
            +'class="form-control wiki-insert-control" '
            +'id="control-'+element.g_slug+'" '
            +'placeholder="'+element.g_placeholder+'">'
        +'</div>';
      $('.wiki-form-insert').append(l_c);
    }
    else if(element.g_type=='textarea'){
      l_c = ''
        +'<div class="form-group" style="margin-bottom: 15px;>'
          +'<label for="control-'+element.g_slug+'" '
            +'class="form-label">'+element.g_label+'</label>'
          +'<textarea '
            +'slug="'+element.g_slug+'" '
            +'class="form-control wiki-insert-control" '
            +'id="control-'+element.g_slug+'" rows="3"></textarea>'
        +'</div>';
      $('.wiki-form-insert').append(l_c);
    }
    else if(element.g_type=='fieldplus'){
      l_c = ''
        +'<div class="mb-3"">'
          +'<label for="control-'+element.g_slug+'" '
            +'class="form-label">'+element.g_label+'</label>'
          +'<div class="wiki-ZZZZ-A box-highlight-off" '
            +'style="padding:5px;height: 50px;margin-bottom: 10px;">'
          +'</div>'
          +'<div class="wiki-ZZZZ-B" '
            +'style="display: flex;flex-direction: row;">'
            +'<div class="wsc-1-ZZZZ" style="width: 100%;padding-top: 3px;"></div>'
            +'<div class="wsc-2-ZZZZ" style="padding-left: 10px;padding-right: 10px;"></div>'
          +'</div>';
      $('.wiki-form-insert').append(l_c);
      //--
      $('.wsc-1-ZZZZ').append(''
        +'<input type="text" '
          +'slug="'+element.g_slug+'" '
          +'class="form-control wiki-tmp-control" '
          +'id="control-'+element.g_slug+'" '
          +'placeholder="'+element.g_placeholder+'">'
        +'');
      $('.wsc-2-ZZZZ').append(''
        +'<button '
          +'slug="btn-'+element.g_slug+'" '
          +'class="btn" '
          //+'id="control-'+element.g_slug+'" '
          //+'placeholder="'+element.g_placeholder+'">'
          +'for="'+element.g_slug+'" '
          +'>'
          +'<i class="fa fa-plus" aria-hidden="true"></i>'
        +'</button>'
        +'');

      wiki_array_custom_js=[];

      $('[slug=btn-'+element.g_slug+']').on('click',function(){
        let g_slug=$(this).attr('for');
        let myvalue=$('#control-'+g_slug).val();
        $('#control-'+g_slug).val(null);
        if(wiki_array_custom_js.indexOf(myvalue)>-1){
        }
        else{
          wiki_array_custom_js.push(myvalue);
          console.log(wiki_array_custom_js);
          $('.wiki-ZZZZ-A').append(''
            +'<span '
              +'class="badge bg-warning text-dark wiki-badge-custom-js" '
              +'unique="wbcj-'+myvalue+'" '
              +'style="cursor:pointer;margin-right: 5px;" '
              +'myvalue="'+myvalue+'">'+myvalue.toUpperCase()+'</span>'
            +'');
          //--
          $('[unique=wbcj-'+myvalue+']').on('click',function(){
            wiki_array_custom_js.splice(wiki_array_custom_js.indexOf(myvalue),1);
            $(this).remove()
            console.log(wiki_array_custom_js);
          });
        }
      });
    }
  });

}

function list_wiki_sub(){

  let l_dataString={};

  l_dataString['fn_group']='wiki';
  l_dataString['action']='view_data';
  l_dataString['collection']='wiki_sub';
  l_dataString['item_token']=p_main.item_token;

  generic_api(l_dataString,'wiki_sub');

}

// !dev change `slug` to `optIn`
f_btn[ 'btn_save_wiki']=function(slug){

  var lyr = sessionStorage.destination_layer;

  const params = document.querySelectorAll('.wiki-insert-control');
  var dataString = {}
  var content_obj = {}
  var iSubmit=1;
  Array.from(params).forEach((element, index) => {
    //_onsole.log(element.getAttribute('slug'));
    //_onsole.log(element.value);
    content_obj[element.getAttribute('slug')]=element.value;
    /* if(element.getAttribute('required')==1){
      if( element.value.length > 0 ) {
        element.classList.remove('is-invalid');
      }
      else{
        iSubmit=0;
        //_onsole.log('disabling');
        element.classList.add('is-invalid');
      }
    } */
  });

  if(sessionStorage.wiki_insert_g_type=='type-custom'){
    content_obj['custom_js']=wiki_array_custom_js;
  }

  content_obj['g_type']=sessionStorage.wiki_insert_g_type;
  //return;
  //sessionStorage.f_tool_callback='exe_delete';//'exe_edit_point_lyr045_1';

  //f/_btn['modify_lyr_single_for_dlg_2'](lyr,'edit');
  
  alertify.infoDialog().close();
  alertify.infoDialog().destroy();

  dyn_functions['exe_save_wiki'](content_obj);

}

  /* var dataString = {}

  const params = document.querySelectorAll('.params-control');
  Array.from(params).forEach((element, index) => {
    //_onsole.log(element.getAttribute('slug'));
    //_onsole.log(element.value);
    dataString[element.getAttribute('slug')]=element.value;
    if(element.getAttribute('slug')=='process_name'){
      sessionStorage.process_name=element.value;
    }
  });
  dataString['collection_sub']=sessionStorage.collection_sub; */

dyn_functions['exe_save_wiki'] = function(content_obj){

  // _onsole.log('sessionStorage.f_tool_callback');
  //var lyr = sessionStorage.destination_layer;

  let l_dataString={};

  //dataString['lat']=sessionStorage.place_lat;
  //dataString['lng']=sessionStorage.place_lng;
  //_onsole.log($( ".new_content" ).val());
  //_onsole.log(myinput);

  l_dataString['mycontent']=content_obj;
  l_dataString['fn_group']='wiki';
  l_dataString['action']='modify_data';
  l_dataString['collection']='save_wiki';
  l_dataString['post_child']=p_main.item_token;
  l_dataString['g_group']=wiki_g_group_insert;
  wiki_g_group_insert=[];
  //l_dataString['title']='Test Title';
  //l_dataString['mycontent']=myinput;//$('#exampleFormControlTextarea1').val();
  //dataString['GEOM']=1;
  //dataString['item_token']=localStorage[lyr+'_token'];
  //_onsole.log(l_dataString);

  generic_api(l_dataString,'save_wiki');

}

dyn_functions['succ_wiki_sub'] = function(r){

  //_onsole.log('succ_wiki_sub');
  //_onsole.log(r);
  
  if(r.status=='OK'){
    f_wait.wiki_sub=1;
    wiki_sub_last_r=r;
    r.features.forEach(element => {
      let p = element.properties;
      //_onsole.log(p);
      let l_dataString={};
      l_dataString['p']=p;
      l_dataString['item_token']=p.item_token;
      l_dataString['post_content']=p.post_content[0];
      create_box_wiki_sub(l_dataString);
    });
  }
  else{
    console.log('No sub-pages.');
  }

}

dyn_functions['succ_save_wiki'] = function(r){

  //_onsole.log(r)
  let p = r.features[0].properties;
  let l_dataString={};
  l_dataString['p']=p;
  l_dataString['item_token']=p.item_token;
  l_dataString['post_content']=p.post_content[0];
  create_box_wiki_sub(l_dataString);

}

function create_box_wiki_sub(dataString){

  let content = dataString.post_content;
  let box = $('.wiki-sub');
  let item_token = dataString.item_token;
  let title = content.title;
  let g_group = dataString.p.g_group;
  let g_type=content.g_type;
  if(g_type=='type-internal'){
    box = $('.wiki-sub-internal');
  }
  else if(g_type=='type-external'){
    box = $('.wiki-sub-external');
  }

  box.append(''
    +'<div class="wiki-sub-content" item_token="'+item_token+'" '
      +'style="display: flex;flex-direction: row;">'
      +'<div class="wsc-1-'+item_token+'" style="width: 100%;"></div>'
      +'<div style="text-align: center;">'
        +'<ul class="wiki-sub-content-badge ul-with-icon wscb-'+item_token+'">'
        +'</ul>'
      +'</div>'
    +'</div>'
    +'');

  let wscb_icon = '<i class="fa fa-user-secret" aria-hidden="true"></i>';
  if(g_group[0]=='public'){
    wscb_icon = '<i class="fa fa-globe" aria-hidden="true"></i>';
  }

  $('.wscb-'+item_token).append('<li>'+wscb_icon+'</li>');

  if(g_type=='type-internal'){
    $('.wsc-1-'+item_token).append(''
        +'<a href="'+content.simple_url+'" target="_self">'
          +title+'</a>'
      +'');
  }
  else if(g_type=='type-external'){
    $('.wsc-1-'+item_token).append(''
      +'<a href="'+content.simple_url+'" target="_blank">'
        +title+'</a>'
      +'');
  }
  else if(g_type=='type-img'){
    $('.wsc-1-'+item_token).append(''
      +'<img src="'+content.image_url+'" style="width: 100%;max-width:600px;" /></div>'
      +'');
    $('.wsc-1-'+item_token).css('text-align','center');
    $('.wscb-'+item_token).append('<li><i class="fa fa-heart" aria-hidden="true"></i></li>');
  }
  else{
    $('.wsc-1-'+item_token).append(''
      +'<p><a href="'+HOME_PROJECT+'/wiki/'+item_token+'" target="_self">'
        +title+'</a>: '
      +''+content.content+'</p>'
      +'');
    $('.wscb-'+item_token).append('<li><i class="fa fa-heart" aria-hidden="true"></i></li>');
  }

}