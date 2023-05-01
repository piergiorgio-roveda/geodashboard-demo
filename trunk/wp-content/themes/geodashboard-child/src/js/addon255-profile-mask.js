dyn_functions['addon255-profile-mask'+'_ready'] = function(){

  let user_token = localStorage.user_token;
  let logo = 'https://robohash.org/'+user_token+'.png';
  $('#box-main-logo').css('height','90px');
  $('#box-main-logo').css('background-image','url("'+logo+'")');
  $('#box-main-logo').css('background-repeat','no-repeat');
  $('#box-main-logo').css('background-size','90px');
  $('#box-main-logo').css('background-position','center'); 
  $('#box-main-logo').css('display','block'); 
  $('#box-main-logo').css('border-bottom','1px solid #6c6c6c');

  prepare_a255();

}

function prepare_a255(){

  let user_token = '0x0';

  value = localStorage.getItem('user_token');
  if(value === null){
    localStorage.user_token=user_token;
  }
  else{
    user_token = localStorage.user_token;
  }

  $('.box-sidebar-footer-bottom').html('');
  $('.box-sidebar-footer-bottom').html(''
    +'<div class="row row2 align-items-center" '+
      'style="margin:0px;height: 50px;">'
      +'<div class="col-3 justify-content-start" '
        +'style="padding: 0px;text-align:left;">'
        +'<div class="ajs-footer-btn3"></div>'
      +'</div>'
      +'<div class="col-6 d-grid gap-2 d-flex justify-content-end" '
        +'style="text-align: center;">'
        +'<div class="ajs-footer-btn2" '
          +'style="display:inline;padding-right: 5px;width: 100%;"></div>'
      +'</div>'
      +'<div class="col-3 justify-content-start" '
        +'style="padding: 0px;text-align:right;">'
        +'<div class="ajs-footer-btn1" '
          +'style="display:inline;">'
          +'<span class="box-btn_a255_info"></span>'
        +'</div>'
      +'</div>'
    +'</div>');

  $('.sidebar-footer').css('display','block');

  opt = {
    itemSlug:'btn_a255_info',//'btn_closedlg3',
    itemLabel: {
      "default":"<i class=\"bi bi-question-lg\"></i>",
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

  $('#btn_a255_info').prop('disabled', true);

  if(user_token=='0x0'){

    $('.box-info-0').addClass('user_email');

    opt = {
      "slug":'user_email',
      "grid": "col-12",
    }
    $('.box-info-0').append(part_ct_params(opt));

    //-- CREATE FORM GROUP AND LABEL
    opt = {
      "label":"Please enter your email address to access this feature",
      "slug": 'user_email'
    }
    $('.box-'+'user_email').append(
      append_field_label_2(opt)
    );    
    //-- INPUT FIELD
    opt = {
      "slug": 'user_email',
      "pCol": {
        g_slug: 'user_email',
        data_type:'text',
        g_placeholder:"info@email.it"
      },
      "objItem": {},
    }
    objField_omnivore(opt);

    // $('.box-sidebar-info').css('display','table-cell');
    $('.box-sidebar-info').css('vertical-align','middle');
    $('#group-user_email').css('text-align','center');

    $('.box-info-0').css('max-width','100%');
    $('.box-info-0').css('margin','auto');

    $('#input-user_email').css('text-align','center');

    $('.box-info-1').html(''+
      '<div class="ct-btn" '+
        'style="display:inline;">'+
        '<span class="box-btn_a255_user_email_submit"></span>'+
      '</div>'+
      '');
    $('.box-info-1').css('padding-top','15px');
    $('.box-info-1').css('padding-bottom','15px');
    $('.box-info-1').css('text-align','center');

    opt = {
      itemSlug:'btn_a255_user_email_submit',//'btn_closedlg3',
      itemLabel: {
        "default":"SUBMIT",
      },//gLang.label_close,
      itemDescription: {"default":"..."},
      //itemLabel:'<i class="fa fa-ellipsis-h" aria-hidden="true"></i>',
      itemClass:'btn-sm btn-outline-dark', // btn-main-sidebar',
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
  else{

    $('.sidebar-box-center').css('vertical-align','top');

    $('.box-info-0').html('<div class="dlg_info-0_body"></div>');

    $('.ajs-footer-btn3').html(''+
      '<span class="box-btn_a255_logout"></span>'+
      '');

    opt = {
      itemSlug:'btn_a255_logout',//'btn_closedlg3',
      itemLabel: {
        "default":"<i class=\"bi bi-box-arrow-right\"></i>",
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
    
    a255_search_map_by_token();

  }

}

f_btn['btn_a255_info']=function(optIn){

  $('.box-sidebar-footer-top').html(''+
    'Control panel of user'+
    '<br><a class="info-dismiss-msg" href="#">Dismiss</a>'+
    '');
  $('.info-dismiss-msg').click(function(){
    $('.box-sidebar-footer-top').html('');
  });

}

f_btn['btn_a255_user_email_submit']=function(optIn){

  a255_submit_user_email();

}

f_btn['btn_a255_logout']=function(optIn){

  let url = window.location.href.split('?')[0];
  window.open(url+"?user_token=0x0","_self");

}

async function a255_submit_user_email() {

  await new Promise(resolve => setTimeout(resolve, 1));

  // _onsole.log('start_2');

  let datastring = {
    fn_group:'geodata',
    action:'view_data',
    collection:'a255_search_token_by_email',
    qy_name:'A',
    geom:1,
    email:$('#input-user_email').val()
  } 
  //let r = await a254_seqAllNodes(myUrl);
  let r = await generic_api_v2(datastring,'a255_token_via_email');
  
  //--
 
  localStorage.setItem('user_token', r.features[0].properties.item_token);
  let url = window.location.href.split('?')[0];
  window.open(url,"_self");

  return

}

async function a255_search_map_by_token() {

  await new Promise(resolve => setTimeout(resolve, 1));

  // _onsole.log('start_2');

  let datastring = {
    fn_group:'geodata',
    action:'view_data',
    collection:'a255_search_map_by_token',
    qy_name:'A',
    geom:1,
    user_token:localStorage.user_token
  } 
  //let r = await a254_seqAllNodes(myUrl);
  let r = await generic_api_v2(datastring,'a255_search_map_by_token');

  //--
  let slug = 'info-0';
  let tabs = [
    {'g_slug':'tab1','g_label':'List of Projects','g_status':'enabled'},
    {'g_slug':'tab2','g_label':'Profile','g_status':'disabled'},
  ];

  //--

  $('.dlg_'+slug+'_body').html('');

  let c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $('.dlg_'+slug+'_body').append(c);

  c = ''
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  $('.dlg_'+slug+'_body').append(c);

  c = '<div>'
    +'<div class="col-btn-attrs" style="text-align:center;">'
    +'</div>'
  +'</div>';
  $('.dlg_'+slug+'_body').append(c);

  let iTAb=0;  

  tabs.forEach(e => {

    iTAb++;
    let tab=e.g_slug;
    let label=e.g_label;

    let b = ''
      +'<span class="box-btn_a255main_'+tab+'" '+
        'style="margin-left:2.5px;margin-right:2.5px;"></span>'
    $('.col-btn-attrs').append(b);

    opt = {
      itemSlug:'btn_a255main_'+tab,//'btn_closedlg3',
      itemLabel: {
        "default":label,
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

    if(e.g_status=='disabled'){
      $('#btn_a255main_'+tab).prop('disabled', true);
    }

    let display ='display:none;';
    if(iTAb==1){

      $('#btn_a255main_'+tab).addClass('active');
      display ='display:block;';

      let c = ''+
        '<div class="clearfix"></div>'+
        '<div class="box-tab box_a255main_'+tab+'" '+
          'style="text-align:left;'+display+'">'+
          '<div class="boxItem">'+
            '<div ' +
              'style="padding:3px;">'+
              '<div class="content_a255main_'+tab+'_title">'+
                '<b>Profile Projects</b>'+
              '</div>'+ 
              '<div class="content_a255main_'+tab+'">'
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>'+
        '';
      $('.dlg_'+slug+'_body').append(c);

      c = ''+
        '<div class="clearfix"></div>'+
        '<div class="box-tab box_a255main_'+tab+'" '+
          'style="text-align:left;'+display+'">'+
          '<div class="boxItem">'+
            '<div ' +
              'style="padding:3px;">'+
              '<div class="content_a255main_'+tab+'_public_title">'+
                '<b>Public Projects</b>'+
              '</div>'+              
              '<div class="content_a255main_'+tab+'_public">'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>'+
        '';
      $('.dlg_'+slug+'_body').append(c);

    }

  });  

  //--

  let tab = 'tab1';

  // _onsole.log(r.features);
  if(r.features.length==0){
    c = ''+
      '<div class="display-table" style="'+
        'border-bottom: 1px solid grey;'+
        'min-height: 40px;'+
        'width: 100%;'+
        '">'+
        '<div class="btn_a255main_project" '+
          '">'+ //tr
          //cell
          '<div>'+
            'No projects found.'+
          '</div>'+        
        '</div>'+
      '</div>'+
      '';
    $('.content_a255main_'+tab).append(c);    
  }
  else{
    r.features.forEach(element => {

      let p = element.properties;
  
      let icon = ''+
        '<span style="'+
          'font-size: 150%;'+
          '">'+
          '<i class="bi bi-arrow-up-right-square"></i></span>'+
        '';
      if(p.g_sessions==1){
        icon = ''+
        '<span style="'+
          'font-size: 150%;'+
          '">'+
          '<i class="bi bi-chevron-compact-right"></i></span>'+
        '';
      }
      c = ''+
        '<div class="display-table" style="'+
          'border-bottom: 1px solid grey;'+
          'min-height: 40px;'+
          'width: 100%;'+
          '">'+
          '<div class="btn_a255main_project" '+
            'style="'+
              'cursor: pointer;'+
            '" '+
            'g_sessions="'+p.g_sessions+'" '+
            'mapSlug="'+p.g_slug+'" '+
            'map_token="'+p.map_token+'" '+
            'item_token="'+p.item_token+'" '+
            'g_label="'+p.g_label+'">'+ //tr
            //cell
            '<div>'+
              p.g_label+
            '</div>'+
            //cell
            '<div style="'+
              'width: 40px;'+
              'text-align: center;'+
              '">'+
              icon+
            '</div>'+          
          '</div>'+
        '</div>'+
        '';
      if(p.g_group.includes('public')==false){
        $('.content_a255main_'+tab).append(c);
      }
      else{
        $('.content_a255main_'+tab+'_public').append(c);
      }
      
    });
  }


  $('.btn_a255main_project').on('click',function(){

    if(parseInt($(this).attr('g_sessions'))==1){      
      // $('.box-info-0').html('');    
      a255_search_session_by_project(
        $(this).attr('item_token'),
        $(this).attr('map_token'),
        $(this).attr('g_label')
      );
    }
    else{
      let mapSlug = $(this).attr('mapSlug');
      window.open(HOME_PROJECT+'/map_2/'+mapSlug+'/',"_self");
    }


  });

  //--

  // tab = 'tab2';

  return

}

async function a255_search_session_by_project(
  project_token,
  map_token,
  g_label
  ) {

  await new Promise(resolve => setTimeout(resolve, 1));

  // _onsole.log('start_2');

  let datastring = {
    fn_group:'geodata',
    action:'view_data',
    collection:'a255_search_session_by_project',
    qy_name:'A',
    geom:1,
    user_token:localStorage.user_token,
    project_token:project_token,
    map_token:map_token
  } 
  //let r = await a254_seqAllNodes(myUrl);
  let r = await generic_api_v2(datastring,'a255_search_session_by_project');

  //--

  let slug = 'info-0';
  let tab = 'tab1';

  //--

  $('.dlg_'+slug+'_body').html('');

  let c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $('.dlg_'+slug+'_body').append(c);

  c = ''
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  $('.dlg_'+slug+'_body').append(c);

  c = ''
  +'<div>'
    +'<div class="col-btn-attrs" style="text-align:center;">'
    +'</div>'
  +'</div>';
  $('.dlg_'+slug+'_body').append(c);  

  //--
  let display ='display:block;';
  c = ''+
    '<div class="clearfix"></div>'+
      '<div class="box-tab box_a255project_session_'+tab+'" '+
        'style="text-align:left;'+display+'">'+
        '<div class="boxItem">'+
          '<div ' +
            'style="padding:3px;">'+
            '<div class="content_a255project_session_'+tab+'">'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '';

  $('.dlg_'+slug+'_body').append(c);  

  //--

  let b = ''+
    '<div class="display-table" style="'+
      'border-bottom: 1px solid grey;'+
      'min-height: 40px;'+
      'width: 100%;'+
      '">'+
      '<div class="btn_a255main_project" '+
        '>'+ //tr
        //cell
        '<div style="'+
          'width: 40px;'+
          'text-align: center;'+
          '">'+
          '<span class="box-btn_a255_return_to_project"></span>'+
        '</div>'+
        //cell
        '<div>'+
          g_label+
        '</div>'+          
      '</div>'+
    '</div>';
  $('.col-btn-attrs').append(b);

  opt = {
    itemSlug:'btn_a255_return_to_project',//'btn_closedlg3',
    itemLabel: {
      "default":"<i class=\"bi bi-arrow-return-left\"></i>",
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

  //--

  let mapSlug = r.features2[0].properties.g_slug;

  c = ''+
    '<div class="display-table" style="'+
      'border-bottom: 1px solid grey;'+
      'min-height: 40px;'+
      'width: 100%;'+
      '">'+
      '<div class="btn_a255project_new_session" '+
        'style="'+
          'cursor: pointer;'+
        '" '+
        'mapSlug="'+mapSlug+'" '+
        '">'+ //tr
        //cell
        '<div>'+
          '<i class="bi bi-plus-square"></i>&nbsp;'+
          '<span class="dateM" >Start New Session</span>'+
        '</div>'+         
        //cell
        '<div style="'+
          'width: 40px;'+
          'text-align: center;'+
          '">'+
          '<span style="'+
            'font-size: 150%;'+
            '">'+
            '<i class="bi bi-arrow-up-right-square"></i></span>'+
        '</div>'+          
      '</div>'+
    '</div>'+
    '';
  $('.content_a255project_session_'+tab).append(c);

  $('.btn_a255project_new_session').on('click',function(){

    let mapSlug = $(this).attr('mapSlug');
    // let session_token = $(this).attr('session_token');

    window.open(HOME_PROJECT+'/map_2/'+mapSlug+'/',"_self");

  });

  if(r.features.length>0) {

    r.features.forEach(element => {

      let p = element.properties;
      let mapSlug = r.features2[0].properties.g_slug;
  
      c = ''+
        '<div class="display-table" style="'+
          'border-bottom: 1px solid grey;'+
          'min-height: 40px;'+
          'width: 100%;'+
          '">'+
          '<div class="btn_a255project_session" '+
            'style="'+
              'cursor: pointer;'+
            '" '+
            'mapSlug="'+mapSlug+'" '+
            'session_token="'+p.session_token+'" '+
            '">'+ //tr
            //cell
            '<div>'+
              '<span class="dateM" >'+moment(p.last_date).format('llll')+'</span>'+
            '</div>'+
            '<div style="text-align:center;">'+
              '<span class="badge bg-success">'+p.mycount+'</span>'+
            '</div>'+          
            //cell
            '<div style="'+
              'width: 40px;'+
              'text-align: center;'+
              '">'+
              '<span style="'+
                'font-size: 150%;'+
                '">'+
                '<i class="bi bi-arrow-up-right-square"></i></span>'+
            '</div>'+          
          '</div>'+
        '</div>'+
        '';
      $('.content_a255project_session_'+tab).append(c);
     
    });

    $('.btn_a255project_session').on('click',function(){

      let mapSlug = $(this).attr('mapSlug');
      let session_token = $(this).attr('session_token');
  
      window.open(HOME_PROJECT+'/map_2/'+mapSlug+'/?session_token='+session_token,"_self");
  
    });    

  }




  return

}

f_btn['btn_a255_return_to_project']=function(optIn){

  a255_search_map_by_token();

}