
dyn_functions['manlyrs-tb-and-master-prepare'] = function(){

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

  dyn_functions['manLyrs-TbAndMaster-addList']();

}

dyn_functions['manLyrs-TbAndMaster-addList'] = function(){

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

  generic_api(dataString,'manLyrs-TbAndMaster-addList');

}

dyn_functions['succ_'+'manLyrs-TbAndMaster-addList'] = function(r){

  let ct_slug = 'a240_1_part2';

  let cols = [
    "button",
    "g_label",
    "g_slug"
  ]

  //-- CREATE TABLE HEAD
  let html = '';
  cols.forEach(col => {
    if(col=='button'){
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

  r.features.forEach(feature => {
  
    let p = feature.properties;

    let html = '';
    cols.forEach(col => {
      if(col=='button'){
        if(p.g_slug=='empty'){
          html += '<td scope="row">'
            +'<button type="button" '
              +'onclick="a240_manLyrs_TbAndMaster_fix(\''+p.g_label+'\')"'
              +'class="btn btn-'+p.g_label+' btn-sm btn-outline-dark" '
              +'item="'+p.g_label+'">'
              +'<i class="fa fa-bolt" aria-hidden="true"></i>'
            +'</button>'
          +'</td>';
        }
        else{
          html += '<td scope="row"'
            +'></td>';
        }
      }
      else{
        html += '<td scope="row" '
          +'class="td-'+col+'-'+p.g_label+'" '
          +'style="padding-right: 15px;">'+p[col]+'</td>';
      }
    });

    let c = ''
      +'<tr>'
        +html
      +'</tr>'
    +'';
    $('#group-'+ct_slug +' table tbody').append(c);

  });

}

function a240_manLyrs_TbAndMaster_fix(item){

  //-- postman:manlyrs-add-master

  let dataString={
    fn_group:'geodata',
    //action:G_ACTION,
    qy_name:'A'
  }

  dataString.action='modify_data';
  dataString.collection='importTableIntoCatalog';
  dataString.table=item;
  dataString.table_slug=item.toUpperCase();
  // dataString.table_description = 'Teste de importação de tabela';
  dataString.master_type = 'geodata';

  generic_api(dataString,'a240_manLyrs_TbAndMaster_fix');

}

dyn_functions['succ_'+'a240_manLyrs_TbAndMaster_fix'] = function(r){

  $('.btn-'+r.ds.table).css('display','none');
  $('.td-g_slug-'+r.ds.table).html(r.ds.table_slug);

}