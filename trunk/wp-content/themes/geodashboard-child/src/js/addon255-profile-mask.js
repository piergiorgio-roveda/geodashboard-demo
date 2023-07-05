var a255_mapReady = 0;
var a255_sections = [];

list_f_mapbox.push('prepare_a255_mapRotation');
dyn_functions['addon255-profile-mask'+'_ready'] = function(){

  a255_inizialize();

  mymap.setZoom(0);

  reset_a255_curr_localStorage();

}

async function a255_inizialize() {

  prepare_a255();

  await Promise.all([
    default_search_map_by_token(),
  ]);

  await new Promise(resolve => setTimeout(resolve, 1));

  a255_mapReady = 1;

  prepare_a255_dlg();

}

dyn_functions['prepare_a255_mapRotation'] = function(){

  // rotTest();

}

// function rotTest(){
//   setTimeout(function(){
//     if(mymap != undefined){
//       mymap.rotateTo(180,{duration:2000});
//     }
//   },5000);
//  }

function prepare_a255(){

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
}

function prepare_a255_dlg(){

  let item_addon = 'a255_ControlPanel';
  let item_dlg = 'dlg_'+item_addon;

  var meta = {
    'properties':{
      'g_slug': item_dlg+'_single',
      'g_label': 'Control Panel',
      'g_template': 'template_by_slug',
      'g_description': null
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  sessionStorage.this_dialog_lyr=item_dlg;
  sessionStorage.this_dialog_slug=item_dlg+'_single';

  create_dialog2(sessionStorage.this_dialog_slug);

}

dyn_functions['template_by_slug_'+'dlg_'+'a255_ControlPanel'+'_single'] = function(){

  let dlg_slug = 'dlg_'+'a255_ControlPanel'+'_single';
  $('.dlg_'+dlg_slug+'_body').addClass('dlg_main_body');
  $('.dlg_'+dlg_slug+'_body').html('');

  let c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //box button tab
  c = ''+
    '<div class="ajs_body_head" pid="999" ></div>'+
    '<div class="clearfix"></div>'+
    '';
  $('.dlg_'+dlg_slug+''+'_body').append(c);

  //--

  $('.ajs_body_head').append('<div id="box-main-logo"></div>');

  let logo = 'https://robohash.org/'+localStorage.user_token+'.png';
  $('#box-main-logo').css('height','90px');
  $('#box-main-logo').css('background-image','url("'+logo+'")');
  $('#box-main-logo').css('background-repeat','no-repeat');
  $('#box-main-logo').css('background-size','90px');
  $('#box-main-logo').css('background-position','center'); 
  $('#box-main-logo').css('display','block'); 
  $('#box-main-logo').css('border-bottom','1px solid #6c6c6c');

  $('.ajs_body_head').append('<div id="box-bage_user"></div>');
  $('#box-bage_user').css('margin-top','5px');

  let label1 = localStorage.user_email.toUpperCase();
  let label2 = localStorage.user_token;

  c = ''+
    '<div class="display-table">'+
      '<div>'+
        '<div style="text-align:center;">'+
          '<span id="badge_user_email" '+
            'class="badge bg-info text-dark clickable">'+
            label1+
          '</span>'+
          '<span id="badge_user_token" '+
            'class="badge bg-light text-dark clickable">'+
            label2+
          '</span>'+
        '</div>'+
      '</div>'+
    '</div>'+
  '';
  $('#box-bage_user').html(c);

  $('#badge_user_token').css('display','none');

  $('#badge_user_email').on('click',function(){
    $('#badge_user_token').css('display','');
    $('#badge_user_email').css('display','none');
  });

  $('#badge_user_token').on('click',function(){
    $('#badge_user_token').css('display','none');
    $('#badge_user_email').css('display','');
  });

  $('.ajs_body_head').css('margin-bottom','5px');

  $('.box-btn_closedlg').remove();

  //--

  c =  ''
    +'<div>'
      +'<div class="col-btn-attrs" style="text-align:center;">'
      +'</div>'
    +'</div>';
  $('.dlg_'+dlg_slug+'_body').append(c);

  if(localStorage.user_token=='0x0'){

    localStorage.user_email='0@0';
    $('.dlg_'+dlg_slug+'_body').addClass('user_email');
    $('.user_email').css('text-align','center');

    opt = {
      "slug":'user_email',
      "grid": "col-12",
    }
    $('.dlg_'+dlg_slug+'_body').html(part_ct_params(opt));

    //-- CREATE FORM GROUP AND LABEL
    opt = {
      "label":"Please enter a new username or your email address to access this feature",
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
        g_placeholder:"username or @email.it"
      },
      "objItem": {},
    }
    objField_omnivore(opt);

    // $('.box-sidebar-info').css('display','table-cell');

    // $('.box-sidebar-info').css('vertical-align','middle');
    

    // $('#group-user_email').css('text-align','center');

    // $('.box-info-0').css('max-width','100%');
    // $('.box-info-0').css('margin','auto');

    // $('#input-user_email').css('text-align','center');

    let c =  ''+
      '<div class="ct-btn" '+
        'style="display:block;margin-top:15px;">'+
        '<span class="box-btn_a255_user_email_submit"></span>'+
      '</div>'+
      '';
    $('.dlg_'+dlg_slug+'_body').append(c);

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

    return;

  } //localStorage.user_token=='0x0'
  else{
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

    fill_search_map_by_token(); //map/project

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

  
  localStorage.setItem('user_token', '0x0');
  localStorage.setItem('user_email', '0@0');

  let url = window.location.href.split('?')[0];
  window.open(url,"_self");


}

async function a255_submit_user_email() {

  await new Promise(resolve => setTimeout(resolve, 1));

  // _onsole.log('start_2');
  
  localStorage.setItem('user_email', $('#input-user_email').val());

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

function fill_search_map_by_token() {

  let dlg_slug = 'dlg_'+'a255_ControlPanel'+'_single';

  let tabs = [
    {'g_slug':'tab1','g_label':'List of Projects','btnItem':'a255_btn_maps'},
    {'g_slug':'tab2','g_label':'Profile','btnItem':'a255_btn_profile'}
  ];

  $('.col-btn-attrs').html('');
  
  let iTab = 0;
  tabs.forEach(e => {
    iTab++;
    let tab=e.g_slug;
    let label=e.g_label;
    // _onsole.log('dlg_template:explorer_simple > '+g_slug);
    let c = ''
      +'<span class="box-'+e.btnItem+'" '+
      'style="margin-left:2.5px;margin-right:2.5px;"></span>'
    $('.col-btn-attrs').append(c);

    opt = {
      itemSlug:e.btnItem,//'btn_closedlg3',
      itemLabel: {
        "default":label,
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

    let display = '';
    if(iTab==1){
      $('#'+e.btnItem).addClass('active');
      display ='display:block;';
    }
    else{
      display ='display:none;';
    }
    $('.box_'+tab+'').remove();
    
    c =  ''
      +'<div class="clearfix"></div>'
        +'<div class="box-tab box_'+tab+'" style="'+display+'">'
          +'<div class="boxItem">'
            +'<div ' 
              +'style="padding:3px;">'
              +'<div class="content_'+tab+'">'
              +'</div>'
            +'</div>'
          +'</div>'
        +'</div>'
      +'';
    $('.dlg_'+dlg_slug+'_body').append(c);    

  });
  $('#a255_btn_profile').prop('disabled',true);
  //box tabs

  // $('.dlg_dlg_a258_TreasureInfo_single_title').html('Treasure #'+sessionStorage.this_dialog_seq);
  
  // $('.row-flex.content').html('<div class="dlg_info-0_body box-flex card" style="max-width:400px;"></div>');

  //-- Footer

  // $('.ajs-footer-btn1').remove();
  // $('.ajs-footer-btn3').remove();
  
  // $('.ajs-footer-btn2').css('text-align','center');

  // _onsole.log('start_2');

  //--
  

  //let r = await a254_seqAllNodes(myUrl);
  let r = list_MapByToken;
  
  // onsole.log(r);
  let tab = 'tab1';
  //--

  r.features.forEach(element => {
    let p = element.properties;
    p.g_addon.forEach(addon => {

      Object.keys(addon).forEach(function (key) {
        // do something with obj[key]
        // onsole.log(key);

        if(key=='master' && addon[key]==true){

          // onsole.log(p.g_label,key,addon[key])
          a255_sections.push({
            'g_slug':p.g_slug,
            'g_label':p.g_label,
          })
        } // a256_step10
      }); // Object.keys(addon)       
    }); // p.g_addon.forEach  
  });

  a255_sections.push(
    {
      'g_slug':'other',
      'g_label':'Other Projects',
    }
  );

  c = ''+
    '<div class="accordion accordion-flush" id="box_a255main-'+tab+'">'+
    '</div>'+
    '';
  $('.content_'+tab+'').append(c);

  a255_sections.forEach(element => {
    let pS = element;
    c = ''+
      '<div class="accordion-item box-tab box_a255main_'+pS.g_slug+'" '+
        '>'+
        '<h2 class="accordion-header">'+
          '<button '+
            'class="accordion-button collapsed title_a255main_'+pS.g_slug+'" '+
            'type="button" '+
            'data-bs-toggle="collapse" data-bs-target="#flush-'+pS.g_slug+'" '+
            'aria-expanded="false" aria-controls="flush-'+pS.g_slug+'" '+
            '>'+
            '<b>'+pS.g_label+'</b>'+ // Accordion Item #1
          '</button>'+
        '</h2>'+
        '<div id="flush-'+pS.g_slug+'" '+
          'class="accordion-collapse collapse" '+
          'data-bs-parent="#accordionFlushExample">'+
          '<div '+
            'class="accordion-body content_a255main_'+pS.g_slug+'" '+
            '><!--Placeholder ...--></div>'+
        '</div>'+
        // '<div class="boxItem">'+
        //   '<div ' +
        //     'style="padding:3px;">'+
        //     '<div class="content_a255main_'+pS.g_slug+'">'
        //     '</div>'+
        //   '</div>'+
        // '</div>'+
      '</div>'+
      '';
    $('#box_a255main-'+tab+'').append(c);
  });

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
    $('.content_a255main').append(c);
  }
  else{
    r.features.forEach(element => {

      let p = element.properties;
      let this_obj = a255_sections.filter((x) => x.g_slug == p.g_slug);
      if(this_obj.length>0){
        // onsole.log('Skip',this_obj[0].g_slug);
        return;
      }

      let ready = '';
      let icon_status = 'ready';
      let project_done = '';
      let icon = ''+
        '<span style="'+
          'font-size: 150%;'+
          '">'+
          '<i class="bi bi-arrow-up-right-square"></i></span>'+
        '';

      let dd1_item_task = '';

      p.g_addon.forEach(addon => {

        Object.keys(addon).forEach(function (key) {
          // do something with obj[key]
          // onsole.log(key);
          // onsole.log(addon[key]);
  
          if(key=='task' && addon[key]==true){
  
            // onsole.log(p.g_label,key,addon[key]);
            dd1_item_task = '<li>'+
              '<a href="#"'+
                'class="dropdown-item dd1-item" '+
                'action="view_task" '+
                '>'+
                'View Task'+
              '</a></li>'+
              '';
            // onsole.log(dd1_item_task);
          } // a256_step10
        }); // Object.keys(addon)       
      }); // p.g_addon.forEach

      if(p.g_sessions==1){
        icon_status = 'locked';
        icon = ''+
        '<span style="'+
          'font-size: 150%;'+
          '">'+
          '<i class="bi bi-lock-fill"></i></span>'+
        '';
      }

      c = ''+
        '<div class="display-table" style="'+
          'border-bottom: 1px solid grey;'+
          'min-height: 40px;'+
          'width: 100%;'+
          '">'+
          '<div style="'+
            'width: 100%;'+
            '" '+
            '>'+ //tr
            //cell
            '<div>'+
              p.g_label+
            '</div>'+
            //cell
            // '<div style="'+
            //   'width: 60px;'+
            //   'text-align: center;'+
            //   'vertical-align: middle;'+
            //   '">'+
            //   project_done+
            // '</div>'+ 
            //cell
            '<div '+
              'id="dropdown1-'+p.item_token+'" '+
              'class="box-project-dropdown btn-group" '+
              'style="'+
                'width: 110px;'+
              '" '+ // END style
              '>'+
              // '<div class="btn-group">'+
              // '<button class="btn btn-sm btn-light dropdown-toggle" '+
              // 'type="button" data-bs-toggle="dropdown" aria-expanded="false">'+
              // project_done+
              // '</button>'+
              // '<ul class="dropdown-menu">'+
              // '<li><a class="dropdown-item" href="#">Menu item</a></li>'+
              // '<li><a class="dropdown-item" href="#">Menu item</a></li>'+
              // '<li><a class="dropdown-item" href="#">Menu item</a></li>'+
              // '</ul>'+
              // '</div>'+
            '</div>'+
            //cell
            // '<div style="'+
            //   'width: 60px;'+
            //   'text-align: center;'+
            //   'vertical-align: middle;'+
            //   '">'+
            //   ready+
            // '</div>'+
            //cell
            // '<div class="btn_a255main_project" '+
            //   'style="'+
            //     'cursor: pointer;'+
            //     'width: 40px;'+
            //     'text-align: right;'+
            //   '" '+
            //   'icon_status="'+icon_status+'" '+
            //   'g_sessions="'+p.g_sessions+'" '+
            //   'mapSlug="'+p.g_slug+'" '+
            //   'map_token="'+p.map_token+'" '+
            //   'item_token="'+p.item_token+'" '+
            //   'test="test" '+
            //   'g_label="'+p.g_label+'" '+ //tr
            //   '">'+
            //   icon+
            // '</div>'+ 
          '</div>'+
        '</div>'+
        '';
      // onsole.log(p.g_group);

      let i = 0;
      a255_sections.forEach(element => {
        let pS = element;
        // onsole.log(p.g_group);
        // onsole.log(pS);
        if(p.g_group.includes(pS.g_slug)===true){
          i++;
          $('.content_a255main_'+pS.g_slug).append(c);
        }
      });
      if(i==0){
        $('.content_a255main_other').append(c);
      }

      c = ''+
        '<button '+
          'id="btn_dd1-'+p.item_token+'" '+
          'class="'+
            'btn_dd1 '+
            'btn btn-xs btn-light dropdown-toggle '+
          '" '+ // class
          'style="'+
            'width:100%'+
          '" '+ // style
          'type="button" data-bs-toggle="dropdown" aria-expanded="false" '+
          'g_sessions="'+p.g_sessions+'" '+
          'project_slug="'+p.g_slug+'" '+
          'project_token="'+p.item_token+'" '+
          'project_label="'+p.g_label+'" '+
          '>'+
          ready+
        '</button>'+
        '';
      $('#dropdown1-'+p.item_token).html(c);

      c = ''+
        '<ul '+
          'id="dd1-ul-'+p.item_token+'" '+
          'class="dropdown-menu">'+
        '</ul>'+ 
        '';  
      $('#dropdown1-'+p.item_token).append(c);

      if(p.g_sessions==1){

        $('#btn_dd1-'+p.item_token+'').html('ACTIONS');

        c = ''+
            '<li>'+
              '<a href="#"'+
                'class="dropdown-item dd1-item" '+
                'action="project_details" '+
                '>'+
                'View Project'+
              '</a></li>'+
            '<li>'+
              '<a href="#"'+
                'class="dropdown-item dd1-item" '+
                'action="view_sessions" '+
                '>'+
                'View Sessions'+
              '</a></li>'+
            dd1_item_task +
            '<li><hr class="dropdown-divider"></li>'+
          '';  
        $('#dd1-ul-'+p.item_token).append(c);

        p.g_addon.forEach(addon => {

          Object.keys(addon).forEach(function (key) {
            // do something with obj[key]
            // onsole.log(key);
  
            if(key=='a256_step0'){
              // onsole.log(p.g_label,key)
              $('#btn_dd1-'+p.item_token+'').html('LOCKED');
              $('#btn_dd1-'+p.item_token+'').prop('disabled', true);
            } // a256_step0
  
            if(key=='a256_step8'){
              // onsole.log(p.g_label,key)
              $('#btn_dd1-'+p.item_token+'').html('READY');
              $('#btn_dd1-'+p.item_token+'').prop('disabled', false);

              $('#dd1-ul-'+p.item_token).append(''+
                '<li>'+
                  '<a href="#"'+
                    'id="btn_dd1_mark_as_done-'+p.item_token+'" '+
                    'class="dropdown-item dd1-item" '+
                    'action="mark_as_done" '+
                    '>'+
                    'Mark as Completed (car)'+
                  '</a></li>'+
                '');

              $('#dd1-ul-'+p.item_token).append(''+
                '<li>'+
                  '<a href="#"'+
                    'id="btn_dd1_mark_as_done-'+p.item_token+'" '+
                    'class="dropdown-item dd1-item" '+
                    'action="mark_as_done_bike" '+
                    '>'+
                    'Mark as Completed'+
                  '</a></li>'+
                '');

            } // a256_step8
  
            if(key=='a256_step10'){
              // onsole.log(p.g_label,key)
              $('#btn_dd1-'+p.item_token+'').html('COMPLETED (car)');
              $('#btn_dd1-'+p.item_token+'').prop('disabled', false);
              $('#btn_dd1_mark_as_done-'+p.item_token+'').remove();

            } // a256_step10
  
            if(key=='a256_step11'){
              // onsole.log(p.g_label,key)
              $('#btn_dd1-'+p.item_token+'').html('COMPLETED');
              $('#btn_dd1-'+p.item_token+'').prop('disabled', false);
              $('#btn_dd1_mark_as_done-'+p.item_token+'').remove();

            } // a256_step10
          }); // Object.keys(addon)       
        }); // p.g_addon.forEach  

        c = ''+
            '<li>'+
              '<a href="#"'+
                'class="dropdown-item dd1-item" '+
                'action="project_trash" '+
                '>'+
                '<i class="bi bi-trash"></i>Trash'+
              '</a></li>'+
          '';  
        $('#dd1-ul-'+p.item_token).append(c); 

      }
      else{

        $('#btn_dd1-'+p.item_token+'').html('ACTIONS');

        c = ''+
            '<li>'+
              '<a href="#"'+
                'class="dropdown-item dd1-item" '+
                'action="project_details" '+
                '>'+
                'View Project'+
              '</a></li>'+
            '<li>'+
              '<a href="#"'+
                'class="dropdown-item dd1-item" '+
                'action="view_map" '+
                '>'+
                'View Map'+
              '</a></li>'+
            dd1_item_task +
            '<li><hr class="dropdown-divider"></li>'+
            '<li>'+
              '<a href="#"'+
                'class="dropdown-item dd1-item" '+
                'action="project_trash" '+
                '>'+
                '<i class="bi bi-trash"></i>Trash'+
              '</a></li>'+
          '';  
        $('#dd1-ul-'+p.item_token).append(c);
      
      }

      //--
      
    }); // r.features.forEach
  } // NOT r.features.length==0

  $('.btn_dd1').on('click',function(){

    // onsole.log('btn_dd1');
    if(localStorage.a255_curr_project_token == $(this).attr('project_token')){
      reset_a255_curr_localStorage();
    }
    else{
      localStorage.setItem('a255_curr_g_sessions',$(this).attr('g_sessions'));
      localStorage.setItem('a255_curr_project_slug',$(this).attr('project_slug'));
      localStorage.setItem('a255_curr_project_token',$(this).attr('project_token'));
      localStorage.setItem('a255_curr_project_label',$(this).attr('project_label'));
    }


  });

  $('.dd1-item').on('click',function(){

    switch ($(this).attr('action')) {
      case 'project_details':
        console.log('exe',$(this).attr('action'));
        alertify.message('No project details available.');
      break;
      case 'view_map':
        console.log('exe',$(this).attr('action'));
        window.open(HOME_PROJECT+
          '/'+PAGE_CLIENT_SLUG+
          '/'+localStorage.a255_curr_project_slug+
          '/',"_self");        
      break;
      case 'project_trash':
        console.log('exe',$(this).attr('action'));
      break;
      case 'view_sessions':
        console.log('exe',$(this).attr('action'));
        let opt = {
          project_token:localStorage.a255_curr_project_token,
          g_label:localStorage.a255_curr_project_label
        }
        a255_search_session_by_project(opt);        
      break;
      case 'mark_as_done':
        console.log('exe',$(this).attr('action'));
        a255_mark_as_completed(localStorage.a255_curr_project_token);
      break;
      case 'mark_as_done_bike':
        console.log('exe',$(this).attr('action'));
        a255_mark_as_completed_bike(localStorage.a255_curr_project_token);
      break;
      case 'view_task':
        console.log('exe',$(this).attr('action'));
        localStorage.task_project_token = localStorage.a255_curr_project_token;
        window.open(HOME_PROJECT+
          '/'+PAGE_CLIENT_SLUG+
          '/taskmanager'+
          '/',"_self"); 
      break;
      default:
        console.log(`Not 'action' options for ${$(this).attr('action')}.`);
  
    } // switch 

    reset_a255_curr_localStorage();

  });

  //--

  return

}

function reset_a255_curr_localStorage(){

  localStorage.removeItem('a255_curr_g_sessions');
  localStorage.removeItem('a255_curr_project_slug');
  localStorage.removeItem('a255_curr_project_token');
  localStorage.removeItem('a255_curr_project_label');

}

async function a255_mark_as_completed(project_token) {

  await new Promise(resolve => setTimeout(resolve, 1));

  // _onsole.log('start_2');

  let datastring = {
    fn_group:'geodata',
    action:'create_data',
    collection:'a255_mark_as_completed',
    qy_name:'A',
    geom:1,
    project_token:project_token
  } 
  //let r = await a254_seqAllNodes(myUrl);
  let r = await generic_api_v2(datastring,'a255_mark_as_completed');

  default_search_map_by_token();

}

async function a255_mark_as_completed_bike(project_token) {

  await new Promise(resolve => setTimeout(resolve, 1));

  // _onsole.log('start_2');

  let datastring = {
    fn_group:'geodata',
    action:'create_data',
    collection:'a255_mark_as_completed_bike',
    qy_name:'A',
    geom:1,
    project_token:project_token
  } 
  //let r = await a254_seqAllNodes(myUrl);
  let r = await generic_api_v2(datastring,'a255_mark_as_completed_bike');

  default_search_map_by_token();

}

async function a255_search_session_by_project(optIn) {

  await new Promise(resolve => setTimeout(resolve, 1));

  localStorage.a255_currSession_project_token = optIn.project_token;

  // _onsole.log('start_2');

  let datastring = {
    fn_group:'geodata',
    action:'view_data',
    collection:'a255_search_session_by_project',
    qy_name:'A',
    geom:1,
    user_token:localStorage.user_token,
    project_token:optIn.project_token
  } 
  //let r = await a254_seqAllNodes(myUrl);
  let r = await generic_api_v2(datastring,'a255_search_session_by_project');

  //--

  let slug = 'info-0';
  let tab = 'tab1';

  //--

  $('.content_'+tab+'').html('');

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
          optIn.g_label+
        '</div>'+          
      '</div>'+
    '</div>';
  $('.col-btn-attrs').html(b);

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
  $('.content_'+tab+'').append(c);

  $('.btn_a255project_new_session').on('click',function(){

    localStorage.removeItem('session_token');

    let mapSlug = $(this).attr('mapSlug');
    // let session_token = $(this).attr('session_token');

    window.open(HOME_PROJECT+'/'+PAGE_CLIENT_SLUG+'/'+mapSlug+'/',"_self");

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
            '<div class="btn_a255project_session_click" '+
              'mapSlug="'+mapSlug+'" '+
              'session_token="'+p.session_token+'" '+
              '">'+
              '<span class="dateM" >'+moment(p.last_date).format('llll')+'</span>'+
            '</div>'+
            '<div style="text-align:center;">'+
              '<span class="badge bg-success">'+p.mycount+'</span>'+
            '</div>'+          
            //cell
            '<div '+ // arrow-up-right-square link
              'style="'+
                'width: 40px;'+
                'text-align: center;'+
              '" '+
              'class="btn_a255project_session_click" '+
              'mapSlug="'+mapSlug+'" '+
              'session_token="'+p.session_token+'" '+
              '">'+
              '<span style="'+
                'font-size: 150%;'+
                '">'+
                '<i class="bi bi-arrow-up-right-square"></i></span>'+
            '</div>'+ // END arrow-up-right-square link
            //cell
            '<div '+ // arrow-up-right-square link
              'style="'+
                'width: 40px;'+
                'text-align: center;'+
              '" '+
              'class="btn_a255project_session_export" '+
              'mapSlug="'+mapSlug+'" '+
              'session_token="'+p.session_token+'" '+
              '">'+
              '<span style="'+
                'font-size: 150%;'+
                '">'+
                '<i class="bi bi-filetype-json"></i></span>'+
            '</div>'+ // END arrow-up-right-square link             
          '</div>'+
        '</div>'+
        '';
        $('.content_'+tab+'').append(c);
     
    });

    $('.btn_a255project_session_click').on('click',function(){

      let mapSlug = $(this).attr('mapSlug');
      let session_token = $(this).attr('session_token');
  
      window.open(HOME_PROJECT+'/'+PAGE_CLIENT_SLUG+'/'+mapSlug+'/?session_token='+session_token,"_self");
  
    });


    $('.btn_a255project_session_export').on('click',function(){

      let opt = {
        mapSlug : $(this).attr('mapSlug'),
        session_token : $(this).attr('session_token')
      }
  
      a255project_session_export(opt);
  
    });      

  }

  return

}

f_btn['btn_a255_return_to_project']=function(optIn){

  default_search_map_by_token();

}

async function a255project_session_export(optIn){

  await new Promise(resolve => setTimeout(resolve, 1));

  let datastring = {
    fn_group:'geodata',
    action:'view_data',
    collection:'export_project_session',
    qy_name:'A',
    geom:1,
    user_token:localStorage.user_token,
    project_token:localStorage.a255_currSession_project_token,
    session_token:optIn.session_token
  } 

  let r = await generic_api_v2(datastring,'a255project_session_export');

  console.log(r);

  a255_download(JSON.stringify(r), 'output.json', 'text/plain');

}

function a255_download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}