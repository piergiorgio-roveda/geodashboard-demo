
dyn_functions['manlyrs-list-lyrs-master-prepare'] = function(){

  let ct_slug = 'a240_1_part2';

  //--DISPLAY BOX FORM
  $('.row-'+ct_slug).css('display','');

  //-- CREATE FORM GROUP AND LABEL
  let opt = {
    "label":"...",
    "slug": ct_slug,//optIn.ct_slug,
    //"label": "Map filter",//ONLY NOT DEFINED IN objCol
    //"pCol": pCol,
  }
  $('.box-'+ct_slug).append(
    append_field_label_2(opt)
  );

  //-- CREATE TABLE
  let c = ''
    +'<table class="table table-sm table-striped '
      //+'table-hover '
      //+'table-bordered '
      +'" style="margin:-5px;">'
      +'<thead></thead>'
      +'<tbody></tbody>'
    +'</table>'
  +'';
  $('#group-'+ct_slug).append(c);

  //-- CREATE BUTTON ADD NEW MAP
  //-- no buttons in this case

  //---

  dyn_functions['manLyrs-ListLyrsMaster-addList']();

}

dyn_functions['manLyrs-ListLyrsMaster-addList'] = function(){

  let ct_slug = 'a240_1_part2';

  $('.ct-'+ct_slug).css('overflow-x','clip');
  $('.ct-'+ct_slug).css('overflow-y','scroll');

  $('.box-'+ct_slug).css('margin-right','-15px');

  //-- GET DATA
  let dataString={
    fn_group:'geodata',
    qy_name:'A'
  }
  dataString.action="view_data";
  dataString.collection='viewTablesAndMaster';

  generic_api(dataString,'manLyrs-ListLyrsMaster-addList');

}

dyn_functions['succ_'+'manLyrs-ListLyrsMaster-addList'] = function(r){

  let ct_slug = 'a240_1_part2';

  let cols = [
    "button1",
    "button2",
    "g_slug"
  ]

  //-- CREATE TABLE HEAD
  let html = '';
  cols.forEach(col => {
    if(col=='button1'){
      col = '';
    }
    else if(col=='button2'){
      col = '';
    }
    html += '<th>'+col+'</th>';
  });
  let c = ''
    +'<tr>'
      +html
    +'</tr>'
  +'';
  $('#group-'+ct_slug +' table thead').append(c);

  //-- CREATE TABLE BODY
  r.features.forEach(feature => {
  
    let p = feature.properties;
    if(p.g_slug!='empty'){
      let html = '';
      cols.forEach(col => {
        if(col=='button1'){

          html += '<td scope="row">'
            +'<button type="button" '
              +'onclick="a240_manLyrs_ListLyrsMaster_view(\''+p.g_slug+'\')"'
              +'class="btn btn1-'+p.g_slug+' btn-sm btn-outline-dark" '
              +'item="'+p.g_slug+'" disabled>'
              +'<i class="fa fa-eye" aria-hidden="true"></i>'
            +'</button>'
          +'</td>';

        }
        else if(col=='button2'){

          html += '<td scope="row">'
            +'<button type="button" '
              +'onclick="a240_manLyrs_ListLyrsMaster_create(\''+p.g_slug+'\')"'
              +'class="btn btn2-'+p.g_slug+' btn-sm btn-outline-dark" '
              +'item="'+p.g_slug+'">'
              +'<i class="fa fa-play" aria-hidden="true"></i>'
            +'</button>'
          +'</td>';

        }
        else{
          html += '<td scope="row" '
            +'class="td-'+col+'-'+p.g_slug+'" '
            +'style="padding-right: 15px;">'+p[col]+'</td>';
        }
      });

      c = ''
        +'<tr>'
          +html
        +'</tr>'
      +'';
      $('#group-'+ct_slug +' table tbody').append(c);

    }

  });

  dyn_functions['manLyrs-ListLyrsMaster-searchLyr']();

}

dyn_functions['manLyrs-ListLyrsMaster-searchLyr'] = function(){

  //-- GET DATA
  let dataString={
    fn_group:'geodata',
    qy_name:'A'
  }
  dataString.action="view_data";
  dataString.collection='show_table_data';
  dataString.table_slug='TB_LYR';
  dataString.item_token='true';

  generic_api(dataString,'manLyrs-ListLyrsMaster-searchLyr');

}

dyn_functions['succ_'+'manLyrs-ListLyrsMaster-searchLyr'] = function(r){

  r.features.forEach(feature => {

    let p = feature.properties;
    //_onsole.log(p);
    if (p.g_tables != null) {
      if (p.g_tables.length > 0) {
        $('.btn1-'+p.g_tables[0]).prop('disabled',false);
      }
    }

  });

}

function a240_manLyrs_ListLyrsMaster_view(item){

  //-- postman:manlyrs-list-lyrs-master

  let dataString={
    fn_group:'geodata',
    //action:G_ACTION,
    qy_name:'A'
  }

  dataString.action='view_data';
  dataString.collection='viewLyrsByMaster';
  dataString.table_slug=item;

  generic_api(dataString,'a240_manLyrs_ListLyrsMaster_view');

}

function a240_manLyrs_ListLyrsMaster_create(item){

  //-- postman:manlyrs-add-lyr-master

  let dataString={
    fn_group:'geodata',
    //action:G_ACTION,
    qy_name:'A'
  }

  let now = new Date();
  let atomDate = now.toISOString();
  let myInput = 'lyr_'+atomDate+'';
  let myHash = adler32(myInput);
  //_onsole.log(myHash); // Outputs: 276939473

  dataString.action='modify_data';
  dataString.collection='insertNewItemByTable';
  dataString.table_slug='TB_LYR';
  dataString.item=item;
  dataString.field_and_value=[
    {
      "type": "insert_post",
      "field": "g_slug",
      "value": "lyr"+myHash
    },
    {
      "field": "g_label",
      "value": item
    },
    {
      "field": "g_tables",
      "value": [item]
    }
  ];

  generic_api(dataString,'a240_manLyrs_ListLyrsMaster_create');

}

dyn_functions['succ_'+'a240_manLyrs_ListLyrsMaster_create'] = function(r){

  a240_manLyrs_ListLyrsMaster_view(r.ds.item);

}

dyn_functions['succ_'+'a240_manLyrs_ListLyrsMaster_view'] = function(r){

  let ct_slug = 'a240_1_part3';

  $('.box-'+ct_slug).html('');

  //-- CREATE FORM GROUP AND LABEL
  let opt = {
    "label":"List of available Layers",
    "slug": ct_slug,//optIn.ct_slug,
    //"label": "Map filter",//ONLY NOT DEFINED IN objCol
    //"pCol": pCol,
  }
  $('.box-'+ct_slug).append(
    append_field_label_2(opt)
  );
  
  let c = ''
    +'<table class="table table-sm table-striped '
      //+'table-hover '
      //+'table-bordered '
      +'" style="margin:-5px;">'
      +'<thead>'
        +'<tr>'
          +'<th scope="col" style="width: 25%">Slug</th>'
          +'<th scope="col">Layers</th>'
          +'<th scope="col" style="width: 5%"></th>'
        +'</tr>'
      +'</thead>'
      +'<tbody>'
      +'</tbody>'
    +'</table>'
  +'';
  $('#group-'+ct_slug).append(c);
  $('.row-'+ct_slug).css('display','');

  r.features.forEach(element => {
  
    let p = element.properties;

    c = ''
      +'<tr class="tr-'+'a240_1_part3-'+p.g_slug+'">'
        +'<td scope="row" '
          +'style="vertical-align: middle;">'
          +p.g_slug+'</td>'
        +'<td scope="row" '
          +'style="vertical-align: middle;">'
          +p.g_label+'</td>'
        +'<td scope="row" style="padding-right: 15px;">'
        +'</td>'
      +'</tr>'
    +'';
    $('.box-'+ct_slug+' table tbody').append(c);



  });

}