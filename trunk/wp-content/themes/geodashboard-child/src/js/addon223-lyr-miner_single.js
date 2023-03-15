dyn_functions['template_by_slug_addon223_single'] = function(){

  let dlg_slug = 'addon223_single';

  a223_sheet=[];

  let c = '';

  let dlg_body = '.dlg_'+dlg_slug+''+'_body';

  c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $(dlg_body).append(c);

  c = '<!--box button tab-->'
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  $(dlg_body).append(c);

  c = '<div>'
    +'<div class="col-btn-attrs" style="text-align:left;"></div>'
  +'</div>';
  $(dlg_body).append(c);

  //-- DLG PREPARE BODY

  c = '<!--tab1-->'
    +'<div '
      +'class="dlg_panel panel-tab1" '
      +'style="display:block;font-family:var(--wd-fonts-secondary);">'
      +'<div class="row">'
        +'<div class="col-12 dlg-'+dlg_slug+'-body_1">'
          +'<div class="part_1"></div>'
          +'<div class="part_2"></div>'
        +'</div>'
      +'</div>'
    +'</div>'
    +'<!--tab1 END-->';
  $(dlg_body).append(c);

  c = ''
    +'<div class="form-group addon223_b1_p1">'
      +'<div '
        +'style="text-align: center;border: 1px solid black;padding: 5px;margin-bottom: 3px;" '
        +'>'+'Scelta foglio'.toUpperCase()+'</div>'
      +'<div class="box-badge" style="text-align:center;font-size: 150%;max-height:200px;overflow:auto;"></div>'
    +'</div>'
  +'';
  $('.dlg-'+dlg_slug+'-body_1 > .part_1').append(c);
  c = ''
    +'<div class="form-group addon223_b1_p1">'
      +'<div '
        +'style="text-align: center;border: 1px solid black;padding: 5px;margin-bottom: 3px;margin-top: 15px;" '
        +'>'+'Scelta particella'.toUpperCase()+'</div>'
    +'</div>'
    +'';
  $('.dlg-'+dlg_slug+'-body_1 > .part_2').html(c);

  //--

  c = ''
    +'<div class="form-group addon223_b1_p2">'
      // +'<label for="exampleInputEmail1">Choose on of the displayed layers</label>'
      +'<div class="row">'
        +'<div class="col-6 part_2_list" style="max-height: 300px;overflow-x: auto;">'
          +'<div class="box"></div>'
        +'</div>'
        +'<div class="col-6 part_2_badge" style="max-height: 300px;overflow-x: auto;">'
          +'<div class="box" style="height: 260px;"></div>'
          +'<div class="box-btn_addon223_p2_badge_reset d-grid gap-2"></div>'
        +'</div>'
      +'</div>'
    +'</div>'
    +'';
  $('.dlg-'+dlg_slug+'-body_1 > .part_2').append(c);
  create_button('btn_addon223_p2_badge_reset');

  $('.part_2_list > .box').html('Selezionare un foglio '
    +'per visualizzare le relative particelle');


  //-- DLG PREPARE BODY END

  //-- DLG FILL BODY
  fill_dlg_addon223_b1_p1();

  //-- DLG FOOTER
  $('.ajs-footer-btn2').append(''
    +'<span class="box-btn_addon223_view"></span>'
  +'');

  create_button('btn_addon223_view');

  enable_btn_addon223_view();
}

dlg_close_functions['addon223_single'] = function(){

  if(a223_block.length>0){
    $('.box-editing2').css('display','block');
    $('.box-editing2').css('justify-content','center');
    $('.box-editing2').html(''
      +'<div class="col-auto ct-editing2" style="padding: 5px 0px;">'
        +'<span '
          +'class="box-btn_addon223_block_inspect"></span>'
        +'<span '
          +'class="box-btn_addon223_block_reset" '
          +'style="margin-left:5px;margin-right:5px;"></span>'
      +'</div>'
    +'');
    create_button('btn_addon223_block_reset');
    create_button('btn_addon223_block_inspect');
  }
  else{
    $('.box-editing2').css('display','none');
    $('.box-editing2').html('');
  }

}

function fill_dlg_addon223_b1_p1(){

  let dlg_slug = 'addon223_single';
  let part_slug = 'addon223_b1_p1';

  addon223_b1_p1_list();

}

function addon223_b1_p1_list(){

  var dataString={
    fn_group:'geodata',
    action:'view_data',
    collection:'lyr_all_table',
    qy_name:'A',
    lyr:'lyrsit250',//'lyr035',
    g_master:G_MASTER,
    check_null:'foglio',
    world:true // for all records
    //item_token:localStorage[slug+'_token'] //lyr035_token
  }
  generic_api(dataString,'addon223_b1_p1_list');

}

dyn_functions['succ_addon223_b1_p1_list'] = function(r){

  //let dlg_slug = 'addon223_single';
  //let part_slug = 'addon223_b1_p1';
  a223_block.forEach(myid => {
    params = {
      box:'.part_2_badge > .box',
      myid:myid
    }
    append_badge_block_sheet(params);
  });
  enable_btn_addon223_view();

  r.features.forEach(element => {

    let p = element.properties;
    let part_slug = 'addon223_b1_p1';

    //$('#input-'+part_slug).append(new Option(p.foglio,p.foglio,false,false));

    c = '<span '
      +'class="badge bg-secondary a223-badge-p1" '
      +'style="cursor:pointer;" '
      +'mysheet="'+p.foglio+'">'+p.foglio+'</span>&nbsp;';
    $('.form-group.'+part_slug+' > .box-badge').append(c);

  });

  $('.a223-badge-p1').on('click',function(){

    let mysheet=$(this).attr('mysheet');

    if(a223_sheet.indexOf(mysheet)>-1){
      a223_sheet=[];
      $(this).addClass('bg-secondary');
      $(this).removeClass('bg-primary');

      sessionStorage.last_sheet = '';

      $('.part_2_list > .box').html('Selezionare un foglio '
        +'per visualizzare le relative particelle');

    }
    else{
      a223_sheet=[];
      a223_sheet.push(mysheet);
      $('.a223-badge-p1').removeClass('bg-primary');
      $('.a223-badge-p1').addClass('bg-secondary');
      $(this).removeClass('bg-secondary');
      $(this).addClass('bg-primary');

      //--
      //let sheet = $(this).find(":selected").val();

      sessionStorage.last_sheet = mysheet;

      fill_dlg_addon223_b1_p2();
    }

  });


}

function fill_dlg_addon223_b1_p2(){

  let dlg_slug = 'addon223_single';
  let part_slug = 'addon223_b1_p2';

  $('.part_2_list > .box').html(''); // clear

  addon223_b1_p2_list();

}

function addon223_b1_p2_list(){

  //let filter_value = $('#input-addon223_b1_p1').find(":selected").val();

  var dataString={
    fn_group:'geodata',
    action:'view_data',
    collection:'lyr_all_table',
    qy_name:'A',
    lyr:'lyrsit251',//'lyr035',
    //world:true, // for all records
    //item_token:localStorage[slug+'_token'] //lyr035_token,
    g_master:G_MASTER,
    query:true,
    filter_field:'foglio',
    filter_value:sessionStorage.last_sheet
  }
  generic_api(dataString,'addon223_b1_p2_list');

}

dyn_functions['succ_addon223_b1_p2_list'] = function(r){

  let dlg_slug = 'addon223_single';
  let part_slug = 'addon223_b1_p2';

  r.features.forEach(element => {

    let p = element.properties;
    let part_slug = 'addon223_b1_p2';
    //let mysheet = sessionStorage.last_sheet;
    let myid = p.particella+'_'+sessionStorage.last_sheet;
    // $('#input-'+part_slug).append(new Option(p.particella,p.particella,false,false));

    let faw_class='fa-square-o';

    if(a223_block.includes(myid)){
      faw_class='fa-square';
    }

    c = '<span '
      +'id="a223-element-p2-'+myid+'" '
      +'class="a223-element-p2" '
      +'style="cursor:pointer;" '
      +'myid="'+myid+'">'
        +'<icon><i class="fa '+faw_class+'" aria-hidden="true"></i></icon>'
        +'&nbsp;<label>'+p.particella+'</label></span><br>';
    $('.part_2_list > .box').append(c);

  });

  $('.a223-element-p2').on('click', function() {

    //let block = $(this).find(":selected").val();
    //let mysheet = sessionStorage.last_sheet;
    let myid = $(this).attr('myid');
    sessionStorage.last_block = myid;

    if(a223_block.indexOf(myid)>-1){

    }
    else{

      $(this).find('icon > i').removeClass('fa-square-o');
      $(this).find('icon > i').addClass('fa-square');

      a223_block.push(myid);

      params = {
        box:'.part_2_badge > .box',
        myid:myid
      }
      append_badge_block_sheet(params);
      enable_btn_addon223_view();
    }

  });

}

function append_badge_block_sheet(p){

  c = '<span '
    +'id="a223-badge-p2-'+p.myid+'" '
    +'class="badge bg-success a223-badge-p2" '
    +'style="cursor:pointer;margin-right:3px;" '
    +'myid="'+p.myid+'">'+p.myid+'</span>';
  $(p.box).append(c);

  $('#a223-badge-p2-'+p.myid+'').on('click', function() {

    let myid = $(this).attr('myid');
    $(this).remove();
    a223_block.splice(a223_block.indexOf(myid),1);
    enable_btn_addon223_view();

    $('#a223-element-p2-'+myid+'').find('icon > i').removeClass('fa-square');
    $('#a223-element-p2-'+myid+'').find('icon > i').addClass('fa-square-o');

  });

}

function enable_btn_addon223_view(){

  if(a223_block.length>0){
    $('#btn_addon223_view').prop('disabled',false);
    $('#btn_addon223_p2_badge_reset').prop('disabled',false);
  }
  else{
    $('#btn_addon223_view').prop('disabled',true);
    $('#btn_addon223_p2_badge_reset').prop('disabled',true);
  }

}
