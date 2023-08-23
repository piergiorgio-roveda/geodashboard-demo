function objField_omnivore(optIn){

  //_onsole.log(  'objField_omnivore'  ,optIn ) ;

  let pCol = optIn.pCol;
  let objItem = optIn.objItem;
  //_onsole.log('objField_omnivore')

  if(pCol.g_callback!=null){


    //-- CREATE FORM GROUP AND LABEL
    opt = {
      "ct_slug": pCol.g_slug,//optIn.ct_slug,
      "pCol": pCol,
      "objItem": objItem,
    }
    dlg_field_template[pCol.g_callback](opt);
  }
  else{    //callback none
    if( pCol.g_options ) {
    
      //_onsole.log(optIn)
      //-- CREATE INPUT SELECT
      opt = {
        "slug": pCol.g_slug,
        "params_control": true,
        "pCol": pCol,
      }
      $('#group-'+pCol.g_slug).append(''
        +append_options_field_2(opt)
      +'');
      //-- APPEND BLANK OPTION
      if(pCol.blank_option!=undefined){
        $('#input-'+pCol.g_slug).append($('<option>', { 
          value: 'null',
          text : pCol.blank_option
        }));
      }
      else{
        append_leaveblank_option(pCol.g_slug);
      }
      
      let selected = false;
      pCol.g_options.forEach(el4 => {
  
        //_onsole.log('a',el4);
  
        if (typeof el4 === 'object'){
          el4Val = el4.val;
          el4Text = el4.text;
        }
        else{
          el4Val = el4;
          el4Text = el4;
        }
  
        if(el4Val == objItem[pCol.g_slug]){
          selected = true;
          selOpt = new Option(el4Text,el4Val, false, true);
          $('#input-'+pCol.g_slug).append(selOpt);
        }
        else{
          selOpt = new Option(el4Text,el4Val, false, false);
          $('#input-'+pCol.g_slug).append(selOpt);
        }
  
  
      });
  
    }
    else{
  
      if(pCol.data_type==='json'){
        //-- CREATE INPUT TEXT AREA
        opt = {
          "slug": pCol.g_slug,
          "params_control": true,
          "pCol": pCol,
          "objItem": objItem,
        }
        html = append_textarea_field(opt);
  
      }
      else{
        //-- CREATE INPUT TEXT
        opt = {
          "slug": pCol.g_slug,
          "params_control": true,
          "pCol": pCol,
          "objItem": objItem,
        }
        html = append_simple_field_2(opt);
      }
  
      $('#group-'+pCol.g_slug).append(html);
  
    }    
  }

}

function objField_omnivore_viewOnly(optIn){


  let pCol = optIn.pCol;
  let objItem = optIn.objItem;

  let valItem = opt.objItem[pCol.g_slug]

  if(pCol.data_type==='json'){
    //-- CREATE INPUT TEXT AREA
    // opt = {
    //   "slug": pCol.g_slug,
    //   "params_control": true,
    //   "pCol": pCol,
    //   "objItem": objItem,
    // }
    html = JSON.stringify(valItem);

  }
  else{
    //-- CREATE INPUT TEXT
    // opt = {
    //   "slug": pCol.g_slug,
    //   "params_control": true,
    //   "pCol": pCol,
    //   "objItem": objItem,
    // }

    if( pCol.g_options ) {

      pCol.g_options.forEach(el4 => {
        if (typeof el4 === 'object'){
          if(el4.val == valItem){
            valItem = el4.text;
          }
        }
      });

    }

    html = valItem;
  }
  //_onsole.log('html',html)
  $('#group-'+pCol.g_slug).append(html);



}

function append_field_label(col_prop,field_prop){

  let required_label='';
  if(field_prop.required_label!=undefined){
    required_label=field_prop.required_label;
  }

  var innerHtml = ''
    +'<div '
        +'id="group-'+col_prop.g_slug+'" '
        +'class="form-group group-'+col_prop.g_slug+'">'
      +'<label for="exampleInputEmail1">'
        +col_prop.g_label
        +required_label
      +'</label>'
    +'</div>'
  +'';

  return `
    ${innerHtml}
  `;
}

function append_field_label_2(opt){

  let required_label='';
  let label='';

  let display_label = 'display:block;';
  if(opt.label===false || opt.label==undefined){
    display_label = 'display:none;';
  }

  if(opt.pCol == undefined || opt.pCol.length==0){
    //_onsole.log('cols empty')
    label=opt.label;
  }
  else{
    //_onsole.log('cols not empty')
    //_onsole.log(opt.objCol)
    if(opt.pCol.g_required!=undefined
      && opt.pCol.g_required===1){
      required_label=' *';
    }
    if(opt.pCol.g_label!=undefined){
      label=opt.pCol.g_label;
    }
    else{
      label=opt.label;
    }
  }

  let innerHtml = ''
    +'<div '
        +'id="group-'+opt.slug+'" '
        +'class="form-group group-'+opt.slug+'">'
      +'<label for="exampleInputEmail1" '
        +'style="'
          +'text-transform: capitalize;'
          +'font-size: 75%;'
          +'margin-left: 3px;'
          +'margin-bottom: 6px;'
          +display_label
          +'">'
        +label
        +required_label
      +'</label>'
    +'</div>'
  +'';

  return `
    ${innerHtml}
  `;
}

function col_format(col_prop){
  if(col_prop.g_format=='integer'
    || col_prop.g_format=='double precision'){
    var type='number';
  }
  else{
    var type='text';
  }

  return type;
}

function col_required(col_prop){

  var required='0';
  var required_label='';

  if(col_prop.g_required==1){
    required='1';
    required_label=' *';
  }

  var req = [required,required_label];

  return req;
}

function append_field_description(col_prop){

  if(col_prop.g_description!=null && col_prop.g_description!='none'){
    var innerHtml = ''
      +'<small id="emailHelp" class="form-text text-muted">'
        +col_prop.g_description
      +'</small>'
    +'';
  }
  else{
    var innerHtml = '';
  }

  return `
    ${innerHtml}
  `;

}

function append_simple_field(col_prop,field_prop,p=new Array()){

  let ct_slug='';
  if(col_prop.ct_slug!=undefined){
    ct_slug=col_prop.ct_slug;
  }
  else{
    ct_slug=sessionStorage.this_dialog_slug;
  }

  let params_control = 'params-control';
  if(col_prop.params_control===false){
    params_control='';
  }

  var my_value ='';
  if(p[col_prop.g_slug]){
    my_value = p[col_prop.g_slug];
  }

  var innerHtml = ''
    +'<input type="'+field_prop.type+'" '
      +'value="'+my_value+'" '
      +'id="input-'+col_prop.g_slug+'" '
      +'class="form-control '
        +params_control+' '
        +'control-'+ct_slug+'" '
      +'slug="'+col_prop.g_slug+'" '
      +'placeholder="'+field_prop.placeholder+'" '
      +''+field_prop.disabled+' '
      +'required="'+field_prop.required+'" '
      +'aria-describedby="emailHelp">'
  +'';

  return `
    ${innerHtml}
  `;
}

function append_simple_field_2(opt){
  //_onsole.log(opt.slug)
  let slug='';
  if(opt.slug!=undefined){
    slug=opt.slug;
  }
  else{
    slug=sessionStorage.this_dialog_slug;
  }

  let params_control = 'params-control';
  if(opt.params_control===false){
    params_control='';
  }

  let valItem ='';
  if(opt.objItem[slug]){

    valItem = opt.objItem[slug];

  }

  let disabled='';
  let required='';
  let placeholder='';

  if(opt.pCol == undefined || opt.pCol.length==0){
    //_onsole.log('cols empty')
    //label=opt.label;
  }
  else{
    //_onsole.log('cols not empty')
    // if(opt.pCol.disabled!=undefined){
    //   disabled=field_prop.disabled;
    // }

    if(opt.pCol.form_type=='unique'){
      disabled='disabled';
    }
    else{
      placeholder=opt.pCol.g_placeholder;
    }

    if(opt.pCol.g_required!=undefined){
      required='required="'+opt.pCol.g_required+'"';
    }

  }

  let input_data_type = 'text';

  if(opt.pCol.data_type=='number'
    || opt.pCol.data_type=='integer'
    || opt.pCol.data_type=='double precision'){
    input_data_type = 'number';
  }

  let innerHtml = ''
    +'<input type="'+input_data_type+'" '
      +'value="'+valItem+'" '
      +'id="input-'+slug+'" '
      +'class="form-control '
        +params_control+' '
        +'control-'+slug+'" '
      +'slug="'+slug+'" '
      +'field_slug="'+slug+'" '
      +'placeholder="'+placeholder+'" '
      +''+disabled+' '
      +'required="'+required+'" '
      +'aria-describedby="emailHelp">'
  +'';

  //_onsole.log(slug)
  //_onsole.log(innerHtml)

  return `
    ${innerHtml}
  `;
}

function append_textarea_field(opt){

  let slug='';
  if(opt.slug!=undefined){
    slug=opt.slug;
  }
  else{
    slug=sessionStorage.this_dialog_slug;
  }

  let params_control = 'params-control';
  if(opt.params_control===false){
    params_control='';
  }

  let valItem ='';
  let disabled='';
  let required='';
  let placeholder='';

  if(opt.pCol == undefined || opt.pCol.length==0){
    //_onsole.log('cols empty')
    //label=opt.label;
  }
  else{
    //_onsole.log('cols not empty')
    // if(opt.pCol.disabled!=undefined){
    //   disabled=field_prop.disabled;
    // }

    if(opt.pCol.form_type=='unique'){
      disabled='disabled';
    }
    else{
      placeholder=opt.pCol.g_placeholder;
    }

    if(opt.pCol.g_required!=undefined){
      required='required="'+opt.pCol.g_required+'"';
    }

  }

  if(opt.objItem[slug]){

    valItem = opt.objItem[slug];

    if(opt.pCol != undefined && opt.pCol.length!=0){
      //let valItem = objItem[pCol.g_slug];
      if(opt.pCol.data_type=='json'){
        valItem = JSON.stringify(valItem);
        // let tmp = [placeholder];
        // placeholder = JSON.stringify(tmp);
      }
    }
  }

  var innerHtml = ''
    +'<textarea rows="5" '
      +'id="input-'+slug+'" '
      +'class="form-control '
        +params_control+' '
        +'control-'+slug+'" '
      +'slug="'+slug+'" '
      +'field_slug="'+slug+'" '
      +'placeholder="'+placeholder+'" '
      +''+disabled+' '
      +'required="'+required+'" '
      +'>'+valItem+'</textarea>'
  +'';

  return `
    ${innerHtml}
  `;
}

function append_options_field(col_prop,field_prop){

  let ct_slug='';
  if(col_prop.ct_slug!=undefined){
    ct_slug=col_prop.ct_slug;
  }
  else{
    ct_slug=sessionStorage.this_dialog_slug;
  }
  
  let params_control = 'params-control';
  if(col_prop.params_control===false){
    params_control='';
  }

  let disabled='';
  if(field_prop.disabled!=undefined){
    disabled=field_prop.disabled;
  }

  let required='';
  if(field_prop.required!=undefined){
    required='required="'+field_prop.required+'"';
  }

  var innerHtml = ''
    +'<select '
      +'id="input-'+col_prop.g_slug+'" '
      +'class="form-select '
        +'input-'+col_prop.g_slug+'" '
        +params_control+' '
        +'control-'+ct_slug+''
        +'" '
      +'aria-label="Default select example" '
      +'slug="'+col_prop.g_slug+'" '
      +field_prop.disabled+' '
      +required+' '
      +'>'
    +'</select>'

  return `
    ${innerHtml}
  `;
}

function append_options_field_2(opt){


  let slug='';
  if(opt.slug!=undefined){
    slug=opt.slug;
  }
  else{
    slug=sessionStorage.this_dialog_slug;
  }
  
  let params_control = 'params-control';
  if(opt.params_control===false){
    params_control='';
  }

  let disabled='';
  let required='';
  let placeholder='';

  if(opt.pCol == undefined || opt.pCol.length==0){
    //_onsole.log('cols empty')
    //label=opt.label;
  }
  else{
    //_onsole.log('cols not empty')
    // if(opt.pCol.disabled!=undefined){
    //   disabled=field_prop.disabled;
    // }

    if(opt.pCol.form_type=='unique'){
      disabled='disabled';
    }
    else{
      placeholder=opt.pCol.g_placeholder;
    }

    if(opt.pCol.g_required!=undefined){
      required='required="'+opt.pCol.g_required+'"';
    }

  }

  var innerHtml = ''
    +'<select '
      +'id="input-'+slug+'" '
      +'class="form-select '
        +'input-'+slug+' '
        +params_control+' '
        +'control-'+slug+''
        +'" '
      +'aria-label="Default select example" '
      +'slug="'+slug+'" '
      +'field_slug="'+slug+'" '
      +disabled+' '
      +required+' '
      +'>'
    +'</select>'

  return `
    ${innerHtml}
  `;
}

function append_style_container(col_prop,field_prop,p=new Array()){

  var slug=sessionStorage.this_dialog_slug;

  if(col_prop.g_dlg_style=='title'){
    var innerHtml = ''
      +'<div '
        +'slug="'+col_prop.g_slug+'" '
        +'class="ct-label-'+col_prop.g_slug+'">'
      +'</div>'
      +'<div '
        +'slug="'+col_prop.g_slug+'" '
        +'class="ct-value-'+col_prop.g_slug+'">'
      +'</div>'
    +'';
  }
  else{
    var innerHtml = ''
      +'<div>'
        +'<span slug="'+col_prop.g_slug+'" '
        +'class="ct-label-'+col_prop.g_slug+'"></span>'
        +': '
        +'<span slug="'+col_prop.g_slug+'" '
        +'class="ct-value-'+col_prop.g_slug+'"></span>'
      +'</div>';
  }


  var my_value ='';
  if(p[col_prop.g_slug]){
    my_value = p[col_prop.g_slug];
  }



  return `
    ${innerHtml}
  `;
}

function append_leaveblank_option(slug){

  $('#input-'+slug).append($('<option>', { 
    value: 'null',
    text : '--Leave blank or select an option'
  }));

}

function part_ct_params(opt){

  let innerHtml = '';

  if(opt.grid=='col-12'){

    innerHtml = ''
      +'<div class="row" id="row-'+opt.slug+'">'
        +'<div class="col-12">'
          +'<div class="box box-'+opt.slug+'">'
          +'</div>'
        +'</div>'
      +'</div>'
      +'';

  }
  else if(opt.grid=='col-6'){

    innerHtml = ''
      +'<div class="row" id="row-'+opt.slug+'">'
        +'<div class="col-6">'
          +'<div class="box box-'+opt.slug+'-A">'
          +'</div>'
        +'</div>'
        +'<div class="col-6">'
          +'<div class="box box-'+opt.slug+'-B">'
          +'</div>'
        +'</div>'
      +'</div>'
      +'';

  }
  else if(opt.grid=='col-3-9'){

    innerHtml = ''
      +'<div class="row" id="row-'+opt.slug+'">'
        +'<div class="col-3">'
          +'<div class="box box-'+opt.slug+'-A">'
          +'</div>'
        +'</div>'
        +'<div class="col-9">'
          +'<div class="box box-'+opt.slug+'-B">'
          +'</div>'
        +'</div>'
      +'</div>'
      +'';

  }
  else if(opt.grid=='col-2-10'){

    innerHtml = ''
      +'<div class="row" id="row-'+opt.slug+'">'
        +'<div class="col-2">'
          +'<div class="box box-'+opt.slug+'-A">'
          +'</div>'
        +'</div>'
        +'<div class="col-10">'
          +'<div class="box box-'+opt.slug+'-B">'
          +'</div>'
        +'</div>'
      +'</div>'
      +'';

  }



  return `
    ${innerHtml}
  `;
}