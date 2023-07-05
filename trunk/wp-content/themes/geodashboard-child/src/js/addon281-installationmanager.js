//--
var a281_mapReady = 0;
var a281_sections = [];
var a281_items = [];

list_menu.push('menu_a281');

dyn_functions['addon281-installationmanager'+'_ready'] = function(){
  
  a281_inizialize();

}

async function a281_inizialize() {

  // if(localStorage.getItem('task_project_token')===null){
  //   alertify.message('Project not selected.');
  //   return;
  // }

  prepare_a281();

  await Promise.all([
    getAllInstallationTables()
  ]);

  // await new Promise(resolve => setTimeout(resolve, 1));

  a281_mapReady = 1;

  a281_fill_tab1();

}

function prepare_a281(){

  $('.cyberpunk_mapid').css('overflow','auto');

  let msg = 'User without permission.';
  let a = ['administrator'];
  let b = g_meta.geovar_user.features[0].properties.user_role;
  let result = js_intersect(a, b);
  if(result.length>0){
    msg = 'User with permission.';
  }

  $('#mapid').html(''+
    '<div '+
      'class="'+
        'display-table content_tab1 '+
      '"'+ // class
      'style="'+
        'display: table;'+
        'width: 100%;'+
        'max-width: 800px;'+
        'min-width: 200px;'+
        'margin: auto;'+
      '"'+ // style
      '>'+
      '<div class="table-row a281">'+ // title
        '<div class="box-task-title" style="width:100%;">'+
          msg+
        '</div>'+
      '</div>'+
    '</div>'+
  '');

  let tab = 'tab1';

  $('.content_'+tab+'').append(''+
    '<div class="table-row">'+ // title
      '<div class="accordion accordion-flush" id="box-'+tab+'">'+
      '</div>'+
    '</div>'+
    '');
  
  a281_sections.push(
    {
      'g_slug':'tables',
      'g_label':'System Tables',
    },
    {
      'g_slug':'other1',
      'g_label':'Other1 Projects',
    }
  );

  a281_sections.forEach(element => {
    let pS = element;
    $('#box-'+tab+'').append(''+
      '<div class="accordion-item box-tab box-'+pS.g_slug+'" '+
        '>'+
        '<h2 class="accordion-header">'+
          '<button '+
            'class="accordion-button collapsed title-'+pS.g_slug+'" '+
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
            'class="accordion-body content-'+pS.g_slug+'" '+
            '><!--Placeholder ...--></div>'+
        '</div>'+
      '</div>'+
      '');
  });

  return;

}

function a281_fill_tab1(){

  let optDefault = ['exists','schema','divider','delete'];
  
  a281_items = [];

  let items = [{
    'g_slug':'headers',
    'g_label':'Table Name (slug)'
  }];

  let o = g_meta.geovar_master.features ;

  // --

  // let this_obj=o.filter(({properties}) => properties.master_type == "geovar_auto");
  installation_tables.features.forEach(element => {
    let p = element.properties;
    items.push(
      {
        'g_slug':p.table_slug,
        'g_label':p.table_name,
        'options':optDefault
      }
    );
  });

  // --

  // this_obj=o.filter(({properties}) => properties.master_type == "geovar");
  // installation_tables.forEach(element => {
  //   let p = element.properties;
  //   items.push(
  //     {
  //       'g_slug':p.g_slug,
  //       'g_label':p.g_label,
  //       'options':optDefault
  //     }
  //   );
  // });
  // --
  a281_items.push(
    {
      'section':'tables',
      'items':items
    }
  );

  // --

  a281_items.push(
    {
      'section':'other1',
      'items':[
        {
          'g_slug':'other2-test1',
          'g_label':'other2-test1'
        },
        {
          'g_slug':'other2-test2',
          'g_label':'other2-test2'
        }
      ]
    }
  );

  a281_items.forEach(element => {

    let section = element.section;

    element.items.forEach(item => {

      let g_slug = item.g_slug;
      let g_label = item.g_label;
      let master_type = item.master_type;

      $('.content-'+section).append(''+
        '<div class="display-table table1-'+g_slug+'" style="'+
          'border-bottom: 1px solid grey;'+
          'min-height: 40px;'+
          'width: 100%;'+
          '">'+
          '<div '+
            'style="'+
              'width: 100%;'+
              '" '+ // END style
            '>'+ // tr
            // cell
            '<div '+
              'id="title1-'+g_slug+'" '+
              'style="'+
                'width: 100%;'+
                '" '+ // END style
              '>'+ // /cell
              g_label+
            '</div>'+
          '</div>'+
        '</div>'+
        '');
      if(g_slug == 'headers'){

        $('#title1-'+g_slug).css('font-weight','bold');

        $('.table1-'+g_slug+' > div').append(''+
          // cell
          '<div '+
            'class="box-project-exist" '+
            'style="'+
              'min-width: 60px;'+
              'text-align: center;'+
              'font-weight: bold;'+
              '" '+ // END style
            '>'+ // /cell
            'EXIST'+
          '</div>'+
          '');

        $('.table1-'+g_slug+' > div').append(''+
          // cell
          '<div '+
            'class="box-project-exist" '+
            'style="'+
              'min-width: 60px;'+
              'text-align: center;'+
              'font-weight: bold;'+
              '" '+ // END style
            '>'+ // /cell
            'SCHEMA'+
          '</div>'+
          '');

        $('.table1-'+g_slug+' > div').append(''+
          // cell
          '<div '+
            'class="box-project-dropdown btn-group" '+
            'style="'+
              'min-width: 110px;'+
              'text-align: center;'+
              'font-weight: bold;'+
              '" '+ // END style
            '>'+
            'ACTIONS'+
          '</div>'+
          '');
      }
      else{
        $('.table1-'+g_slug+' > div').append(''+
          // cell
          '<div '+
            'id="exists1-'+g_slug+'" '+
            'table_slug="'+g_slug+'" '+
            'class="box-project-exist" '+
            'style="'+
              'min-width: 60px;'+
              'text-align: center;'+
              '" '+ // END style
            '>'+ // /cell
            '<i class="bi bi-circle"></i>'+
          '</div>'+
          '');

        $('.table1-'+g_slug+' > div').append(''+
          // cell
          '<div '+
            'id="schema1-'+g_slug+'" '+
            'table_slug="'+g_slug+'" '+
            'class="box-project-schema" '+
            'style="'+
              'min-width: 60px;'+
              'text-align: center;'+
              '" '+ // END style
            '>'+ // /cell
            '<i class="bi bi-circle"></i>'+
          '</div>'+
          '');

        $('.table1-'+g_slug+' > div').append(''+
          // cell
          '<div '+
            'id="dropdown1-'+g_slug+'" '+
            'class="box-project-dropdown btn-group" '+
            'style="'+
              'min-width: 110px;'+
              '" '+ // END style
            '>'+
          '</div>'+
          '');
      }

      $('#dropdown1-'+g_slug).html(''+
        '<button '+
          'id="btn_dd1-'+g_slug+'" '+
          'class="'+
            'btn_dd1 '+
            'btn btn-xs btn-light dropdown-toggle '+
          '" '+ // class
          'style="'+
            'width:100%'+
          '" '+ // style
          'type="button" data-bs-toggle="dropdown" aria-expanded="false" '+
          '>'+
          'Actions'+
        '</button>'+
        '');
      $('#dropdown1-'+g_slug).append(''+
        '<ul '+
          'id="dd1-ul-'+g_slug+'" '+
          'class="dropdown-menu">'+
        '</ul>'+ 
        '');
      if(item.options!=undefined){
        item.options.forEach(option => {

          let c = ''+
          '<li>'+
            '<a href="#"'+
              'class="dropdown-item dd1-item" '+
              'action="'+option+'" '+
              'g_slug="'+g_slug+'" '+
              'g_label="'+g_label+'" '+
              'master_type="'+master_type+'" '+
              '>'+
              option+
            '</a></li>'+
          '';

          if(option == 'divider'){
            c = '<li><hr class="dropdown-divider"></hr></li>';
          }

          $('#dd1-ul-'+g_slug).append(c);
        });

        opt = {
          "action" : "exists",
          "table_slug" : g_slug,
          "table_name" : g_label
        }
        a281_checks(opt);

        opt = {
          "action" : "schema",
          "table_slug" : g_slug
        }
        a281_checks(opt);
        
      }
      else{
        $('#btn_dd1-'+g_slug).attr('disabled','true');
      }

    });

  });

  $('.dd1-item').on('click',function(){

    switch ($(this).attr('action')) {
      case 'exists':
        console.log('exe',$(this).attr('action'));
        opt = {
          "action" : "exists",
          "table_slug" : $(this).attr('g_slug'),
          "table_name" : $(this).attr('g_label'),
          "master_type" : $(this).attr('master_type')
        }
        a281_checks(opt);
      break;
      case 'schema':
        console.log('exe',$(this).attr('action'));
        opt = {
          "action" : "schema",
          "table_slug" : $(this).attr('g_slug')
        }
        a281_checks(opt);
      break;
      default:
        console.log(`Not 'action' options for ${$(this).attr('action')}.`);
  
    } // switch 

  });

}

async function a281_checks(optIn){

  // alertify.message('No project details available.');
  // let opt = {
  //   project_token:localStorage.a255_curr_project_token,
  //   g_label:localStorage.a255_curr_project_label
  // }
  // a255_search_session_by_project(opt);
  // _onsole.log('before',geovar_auto_table_exists);

  $('#'+optIn.action+'1-'+optIn.table_slug+'').html('<i class="bi bi-circle"></i>');

  let fPromise = [];

  switch (optIn.action) {
    case 'exists':
      fPromise = [
        check_if_geovar_table_exists(optIn)
      ];
    break;
    case 'schema':
      fPromise = [
        check_if_geovar_table_schema(optIn.table_slug)
      ];
    break;
    default:
      return;
  } // switch

  await Promise.all(fPromise);

  await new Promise(resolve => setTimeout(resolve, 1)); 
  // _onsole.log('after',geovar_auto_table_exists);

  let data = {};
  switch (optIn.action) {
    case 'exists':
      data = geovar_table_exists;
    break;
    case 'schema':
      data = geovar_table_schema;
    break;
    default:
      return;
  } // switch

  let icon = 'bi bi-x-circle';
  if(data[optIn.table_slug].x_response == '200'){
    icon = 'bi bi-check-circle-fill';
  }
  else if(data[optIn.table_slug].x_response == '204'){
    icon = 'bi bi-check-circle';
  }
  $('#'+optIn.action+'1-'+optIn.table_slug+'').html('<i class="'+icon+'"></i>');
  $('#'+optIn.action+'1-'+optIn.table_slug+'').on('click',function(){
    let msg = '';
    data[optIn.table_slug].msg.forEach(element => {
      // _onsole.log(element);
      if(element.type != undefined){
        if(element.type == 'code'){
          msg += '<pre class="dlg-box-code"><code>'+element.msg+'</code></pre><hr>';
        }
        else if(element.type == 'success'){
          msg += '<div class="alert alert-success" role="alert">'+
            element.msg+'</div>';
        }
        else if(element.type == 'danger'){
          msg += '<div class="alert alert-danger" role="alert">'+
            element.msg+'</div>';
        }
        else{
          msg += ''+element.msg+'<hr>';
        }
      }
      else{
        msg += element+'<hr>';
      }
      
    });
    alertify.alert(
      'Table ' + optIn.table_slug, 
      msg, 
      // function(){ alertify.success('Ok'); }
    );
  });

}
