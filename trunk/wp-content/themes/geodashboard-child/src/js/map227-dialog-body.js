dyn_functions['succ_dlg_single'] = function(){
  var r = g_meta['geovar_dialog'];
  var lyr=sessionStorage.this_dialog_lyr;
  var slug=sessionStorage.this_dialog_slug;
  // _onsole.log('succ_dlg_lyr035_single');
  // _onsole.log(r);
  var this_dlg_p=[];
  r.features.forEach(element => {
    var dlg_p = element.properties;
    if(dlg_p.g_slug==slug){
      this_dlg_p=dlg_p;
    }
  });

  $('.dlg_'+this_dlg_p.g_slug+'_title').html(this_dlg_p.g_label);
  // _onsole.log(this_dlg_p.g_template);

  $('.dlg_'+this_dlg_p.g_slug+'_body').attr('g_template',this_dlg_p.g_template);

  dlg_template[this_dlg_p.g_template](this_dlg_p.g_slug);

  //--

  if(this_dlg_p.g_template=='template_by_slug'){

    dyn_functions['template_by_slug_'+slug]();
    return;

  }

  if(this_dlg_p.g_template=='single_tab'){

    let o = g_meta.geovar_lyr.features
    let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
    let obj_lyr=this_obj[0].properties;

    var r = obj_lyr.last_r;
    var f = r.features[0];

    if(f.properties){
      var p = f.properties;
      var foo = Object.keys(p);
    }
    // _onsole.log(p)
    // _onsole.log(foo)
    //return
    //--

    foo.forEach((foo_el) => {
      $('.dlg_'+slug+'_tab1_ct1').append(foo_el+': '+p[foo_el]+'<br>');
    });
  }
  else if(this_dlg_p.g_template=='single_tab_input'){

    let o = g_meta.geovar_lyr.features

    //_onsole.log(o);
    //_onsole.log('single_tab_input',lyr);
    let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
    let obj_lyr=this_obj[0].properties;

    var r = obj_lyr.last_r;
    var table_schema = r.features[0];
    // _onsole.log(table_schema)

    //--

    table_schema.forEach((col_obj) => {

      var col_prop = col_obj.properties;

      var field_prop = {}

      if(col_prop.g_preview==1){

        // _onsole.log(p[col_prop.g_slug]);
        // _onsole.log(p);

        if(col_prop.g_callback=='none'){

          field_prop.placeholder=col_prop.g_placeholder;
          field_prop.disabled='';

          field_prop.required=col_required(col_prop)[0];
          field_prop.required_label=col_required(col_prop)[1];

          field_prop.type=col_format(col_prop);

          var html = append_field_label(col_prop,field_prop);
          $('.dlg_'+slug+'_tab1_ct1').append(html);

          if( col_prop.g_options ) {

            // _onsole.log(col_prop.g_slug +' > ' + 'have options')

            var html = append_options_field(col_prop,field_prop);
            $('.group-'+col_prop.g_slug).append(html);

            if(field_prop.required=='0'){
              //$('#input-'+col_prop.g_slug).append($('<option>', { 
              //  value: '',
              //  text : '--Leave blank or select an option'
              //}));

              var o = new Option('--Leave blank or select an option', '');
              //o.selected=true;
              $('#input-'+col_prop.g_slug).append(o);

            }
            col_prop.g_options.forEach(element => {

              //$('#input-'+col_prop.g_slug).append($('<option>', { 
              //    value: element.slug,
              //    text : element.name
              //}));

              var o = new Option(element.name,element.slug);
              //if(element.slug==p[col_prop.g_slug]){
              //  o.selected=true;
              //}
              $('#input-'+col_prop.g_slug).append(o);
            });

          }
          else{
            var html = append_simple_field(col_prop,field_prop,p);
            $('.group-'+col_prop.g_slug).append(html);
          }

          var html = append_field_description(col_prop);
          $('.group-'+col_prop.g_slug).append(html);

        }
        else{
          $('.dlg_'+slug+'_tab1_ct1').append(''
            +'<div class="form-group group-'+col_prop.g_slug+'">'
            +'</div>'
          +'');
          dlg_field_template[col_prop.g_callback](slug,col_prop.g_slug);
        }
      }
    });

    $('.ajs-footer-btn2').append(''
      +'&nbsp;<div class="box-btn_savedlg"></div>'
      +''
    +'');
    create_button('btn_savedlg');

  }//single_tab_input
  else if(this_dlg_p.g_template=='single_tab_photo'){

    let o = g_meta.geovar_lyr.features
    let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
    let obj_lyr=this_obj[0].properties;

    var r = obj_lyr.last_r;
    var f = r.features[0];

    if(f.properties){
      var p = f.properties;
      var foo = Object.keys(p);
    }
    // _onsole.log(p)
    // _onsole.log(foo)
    //return
    //--

    // _onsole.log(f)
    let or_sess = g_meta.geovar_lyr.features
    let this_objr_sess=or_sess.filter(({properties}) => properties.g_slug === sessionStorage.this_dialog_lyr);
    let obj_lyr_sess=this_objr_sess[0].properties;

    var table_slug=obj_lyr_sess.g_tables[0];
    g_meta.geovar_map_tb.forEach(obj => {
      // _onsole.log(obj.name)
      if(obj.name==table_slug){
        this_tb[table_slug]=obj.features;
      }
    });

    var image_url='';

    if(p.image_url==null){
      image_url='./default_image.jpg';
    }
    else{
      image_url=p.image_url;
    }

    $('.dlg_'+slug+'_tab1_ct1').html(''
      +'<div class="row-x" style="margin:0px;">'
        +'<div class="col-x ct-image" style="padding:0px;float:left;width:30%;height:120px;">'
          //+'<img src="'+image_url+'" />'
        +'</div>'
        +'<div class="col-x" style="float:right;width:70%;padding-left: 5px;">'
          +'<table class="table table_'+slug+'_tab1_ct1">'
          +'</table>'
        +'</div>'
      +'</div>'
    +'');
    $('.ct-image').css('background','url(\''+image_url+'\')');
    $('.ct-image').css('background-size','150px auto');
    //$('.col-x > img').css('width','100%');
    //$('.col-x > img').css('height','auto');

    foo.forEach((foo_el) => {

      var label='';
      // _onsole.log(table_slug)
      this_tb[table_slug].forEach(obj_tb => {
        var p_tb=obj_tb.properties;
        if(p_tb.g_slug==foo_el){
          label=p_tb.g_label;
        }
      });

      var string='';
      if(foo_el!='image_url'){
        if(p[foo_el]==null){
          string='-';
        }
        else{
          string='<b>'+p[foo_el]+'</b>';
        }
        $('.table_'+slug+'_tab1_ct1').append('<tr>'
          +'<td>'+label+'</td>'
          +'<td style="text-align:right;">'+string+'</td>'
        +'</tr>');
      }
    });
  }//single_tab_photo
  else if(this_dlg_p.g_template=='tab_x1_edit'){

    let o = g_meta.geovar_lyr.features
    let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
    let obj_lyr=this_obj[0].properties;

    var r = obj_lyr.last_r;
    var table_schema = obj_lyr.table_schema.features[0];
    var p = obj_lyr.last_r.features[0].properties;

    //--

    table_schema.forEach((col_obj) => {

      var col_prop = col_obj.properties;

      var field_prop = {}

      if(col_prop.g_preview==1){

        // _onsole.log(p[col_prop.g_slug]);
        // _onsole.log(p);

        if(col_prop.g_callback=='none'){

          field_prop.placeholder=col_prop.g_placeholder;
          field_prop.disabled='';

          field_prop.required=col_required(col_prop)[0];
          field_prop.required_label=col_required(col_prop)[1];

          //format
          field_prop.type=col_format(col_prop);

          var html = append_field_label(col_prop,field_prop);
          $('.dlg_'+slug+'_tab1_ct1').append(html);

          if( col_prop.g_options ) {

            // _onsole.log(col_prop.g_slug +' > ' + 'have options')

            var html = append_options_field(col_prop,field_prop);
            $('.group-'+col_prop.g_slug).append(html);

            if(field_prop.required=='0'){
              //$('#input-'+col_prop.g_slug).append($('<option>', { 
              //  value: '',
              //  text : '--Leave blank or select an option'
              //}));

              var o = new Option('--Leave blank or select an option', '');
              //o.selected=true;
              $('#input-'+col_prop.g_slug).append(o);

            }
            col_prop.g_options.forEach(element => {

              //$('#input-'+col_prop.g_slug).append($('<option>', { 
              //    value: element.slug,
              //    text : element.name
              //}));

              var o = new Option(element.name,element.slug);
              if(element.slug==p[col_prop.g_slug]){
                o.selected=true;
              }
              $('#input-'+col_prop.g_slug).append(o);
            });

          }
          else{
            var html = append_simple_field(col_prop,field_prop,p);
            $('.group-'+col_prop.g_slug).append(html);
          }

          var html = append_field_description(col_prop);
          $('.group-'+col_prop.g_slug).append(html);

        }
        else{
          $('.dlg_'+slug+'_tab1_ct1').append(''
            +'<div class="form-group group-'+col_prop.g_slug+'">'
            +'</div>'
          +'');
          dlg_field_template[col_prop.g_callback](slug,col_prop.g_slug);
        }
      }
    });

    //$('.ajs-footer-btn2').append(''
    //  +'&nbsp;<div class="box-btn_savedlg"></div>'
    //  +''
    //+'');
    //create_button('savedlg');

    $('.ajs-footer-btn2').append(''
      +'<span class="box-btn_savedlg"></span>'
      +'<span class="box-btn_canceldlg_edit" style="margin-left:5px;"></span>'
    +'');

    create_button('btn_savedlg');
    create_button('btn_canceldlg_edit');

  }//tab_x1_edit

}

dlg_field_template['field_image'] = function(main_slug,slug){

  // _onsole.log('dlg_field_template:field_image > '+main_slug+' > '+slug)
    //dlg_field_template:field_image > vlyr007_single > 

  //$('.group-'+slug).html('<button class="submit_photo" main="'+main_slug+'">'+slug+'</button>');
  $('.group-'+slug).html(''
    +'<div class="mb-3 ct-field-file" style="text-align:center;">'
      //+'<label for="control-file" class="form-label">Default file input example</label>'
      +'<input '
        +'type="file" '
        +'id="control-file" '
        +'class="form-control ext-control-'+slug+'" '
        +'style="display:none;" '
        +'slug="'+slug+'" '
        +'placeholder="" '
        +'aria-describedby="emailHelp">'
      +'<button type="button" '
        +'style="width:100%;" '
        +'class="btn fake-control-file bt-sm btn-outline-dark">'
        +'<i class="fa fa-camera" aria-hidden="true"></i>'
      +'</button>'
    +'</div>'
  +'');

  $('.fake-control-file').on('click',function() {
    document.getElementById('control-file').click();
  });

  $('.ext-control-'+slug).on('change', function () {
    var file = this.files[0];

    //_lert('max upload size is' + file.size);
    var formData = new FormData();
    formData.append('fn_group','geodata');
    formData.append('action','modify_data');
    formData.append('collection','wp_upload');
    formData.append('qy_name','A');
    formData.append('lyr',main_slug);
    formData.append('main_slug',main_slug);
    formData.append('slug',slug);
    //formData.append('USER_LICENSE',USER_LICENSE);
    formData.append('rawFile',$(this)[0].files[0]);
    //var formData = new FormData($('#myForm_tab1'));
    var dataString = formData;
    dataString.postdata=true;
    generic_api(dataString,'upload_image');

  });

}

dyn_functions['succ_upload_image'] = function(r){

  // _onsole.log(r);
  var ds=r.ds;
  var f = r.features[0];
  var p = f.properties;
  $('.ct-field-file').html(''
    +'<div class="row-x" style="margin:0px;">'
      +'<div class="col-x" style="padding:0px;float:left;width:30%;">'
        +p.photo_thumbnail
      +'</div>'
      +'<div class="col-x" style="float:right;width:70%;">'
        +'<table class="table">'
          //+'<tr><td>FILENAME</td><td>'+p.photo_filename+'</td></tr>'
          +'<tr><td>WIDTH</td><td style="text-align:right;">'+p.photo_width+'</td></tr>'
          +'<tr><td>HEIGHT</td><td style="text-align:right;">'+p.photo_height+'</td></tr>'
          +'<tr><td>SIZE</td><td style="text-align:right;">'+p.photo_filesize+'</td></tr>'
        +'</table>'
        +'<div style="padding: 0rem 0.5rem;">'
          +'<input type="text" '
            +'disabled '
            +'id="input-'+ds.slug+'" '
            +'class="form-control control-'+ds.main_slug+'" '
            +'slug="'+ds.slug+'" '
            +'placeholder="" '
            +'value="'+p.photo_url+'"'
            +'aria-describedby="emailHelp">'
        +'</div>'
      +'</div>'
    +'</div>'
  +'');
  $('.col-x > img').css('width','100%');
  $('.col-x > img').css('height','auto');


  /*
  $('.dlg_'+ds.main_slug+'_tab1_ct1').append(''
    +'<div class="form-group group-'+ds.slug+'">'
      +'<label for="exampleInputEmail1">'+ds.slug+'</label>'
      +'<input type="text" '
          +'disabled '
          +'id="input-'+ds.slug+'" '
          +'class="form-control control-'+ds.main_slug+'" '
          +'slug="'+ds.slug+'" '
          +'placeholder="" '
          +'value="'+p.photo_url+'"'
          +'aria-describedby="emailHelp">'
      +'<small id="emailHelp" class="form-text text-muted">We\'ll never share your email with anyone else.</small>'
    +'</div>'
  +'');
  */

}