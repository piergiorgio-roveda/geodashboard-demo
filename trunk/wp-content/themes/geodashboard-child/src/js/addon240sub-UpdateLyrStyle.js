function a240_UpdateLyr_Style(r){

  let ct_slug = 'a240_1_part3_b';

  let optIn = {
    "ct_slug":ct_slug
  }
  let objItem = r.features[0].properties;

  let pCol = new Array();

  let o = g_meta.geovar_lyr_style.features;
  let p = r.features[0].properties
  
  let obj_style=o.filter(({properties}) => properties.g_master === p.geoserver_style_name);
  //_onsole.log(obj_style);
  let fieldOpt = [];
  obj_style.forEach(element => {

    let p_s = element.properties;
    let text = '';
    if(p_s.attr_filter=='none'){
      //unique style for all
      text='Unique style for all';
    }
    else if(p_s.attr_filter=='PropertyIsEqualTo'){
      text=p_s.attr_filter_propertyname+':'+p_s.attr_filter_literal;
    }
    else{
      //PropertyIsLike wildCard="*" singleChar="%" escape="!"
      text=p_s.attr_filter_propertyname+':'+p_s.attr_filter_literal;
    }
    fieldOpt.push(
      {"val":p_s.item_token,"text":text}
    );

  });

  if(fieldOpt[0].text=='Unique style for all'){
    a240_UpdateLyr_StyleForm(fieldOpt[0].val);
  }
  else{

    //--only dev
    pCol = {
      "g_slug": "a240_style",
      "g_label": "This function is not available for this release.",
      "g_description": "",
      "g_placeholder": ""
    }
    opt = {
      "slug": pCol.g_slug,
      "label": true,//ONLY NOT DEFINED IN objCol
      "pCol": pCol,
    }
    $('.box-'+optIn.ct_slug).append(
      append_field_label_2(opt)
    );     
    return;
    //--only dev

    //-- Prepare FORM GROUP AND LABEL
    let objCols = {
      features:[
        {
          "type": "Feature",
          "properties": {
            "g_slug": "a240_style",
            "g_label": "Manage style",
            "g_description": "",
            "g_placeholder": ""
          }
        }
      ]
    }

    objCols.features.forEach(objCol => {   
      
      let pCol = objCol.properties;

      //-- CREATE FORM GROUP AND LABEL
      opt = {
        "slug": pCol.g_slug,
        "label": true,//ONLY NOT DEFINED IN objCol
        "pCol": pCol,
      }
      $('.box-'+optIn.ct_slug).append(
        append_field_label_2(opt)
      );      
      //-- INPUT FIELD
      opt = {
        "slug": pCol.g_slug,
        "pCol": {
          g_slug: pCol.g_slug,
          data_type:'text',
          //g_placeholder:"Start typing test ...",
          blank_option: '--Select a style',
          g_options: fieldOpt
        },
        "objItem": {},
      }
      objField_omnivore(opt);    

      $( "#input-"+pCol.g_slug ).on('change', function() {

        //_onsole.log($(this).val());
        a240_UpdateLyr_StyleForm($(this).val());
    
      });
    }); 

  }   

  //-- CREATE BUTTON LINK disabled
  $('.ajs-footer-btn2').append(''
    +'<span class="box-btn_a240_UpdateLyr_AddNewStyle"></span>&nbsp;'
  +'');
  opt = {
    itemSlug:'btn_a240_UpdateLyr_AddNewStyle',//'btn_closedlg3',
    itemLabel: {
      "default":"ADD NEW STYLE",
      "it":"AGGIUNGI NUOVO STILE",
      "en":"ADD NEW STYLE"
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

f_btn['btn_a240_UpdateLyr_AddNewStyle']=function(optIn){

  let now = new Date();
  let atomDate = now.toISOString();
  let myInput = 'sld_'+atomDate+'';
  let myHash = adler32(myInput);

  let dataString={
    fn_group:'geodata',
    qy_name:'A'
  }
  dataString.action="modify_data";
  dataString.collection='insertNewItemByTable';
  dataString.table_slug='TB_LYR_STYLE';
  dataString.g_master="sld"+myHash;

  if(sessionStorage.a240_Lyr_feat_type=='point'){
    dataString.field_and_value=[
      {
        "type": "insert_post",
        "field": "g_master",
        "value": "sld"+myHash
      },
      {
        "field": "attr_symbolizer",
        "value": "point"
      },
      {
        "field": "fill",
        "value": "red"
      },
      {
        "field": "wellknownname",
        "value": "square"
      }
    ];
  }
  else{
    dataString.field_and_value=[
      {
        "type": "insert_post",
        "field": "g_master",
        "value": "sld"+myHash
      },
      {
        "field": "attr_symbolizer",
        "value": "polygon"
      },
      {
        "field": "wellknownname",
        "value": "empty"
      },
      {
        "field": "fill",
        "value": "blue"
      },
      {
        "field": "stroke",
        "value": "darkblue"
      },
      {
        "field": "strokewidth",
        "value": "normal"
      }
    ];
  }

  generic_api(dataString,'a240_UpdateLyr_AddNewStyle');

}

function a240_UpdateLyr_StyleForm(item_token){

  sessionStorage.a240_Style_item_token = item_token;
  //-- GET DATA TABLE
  let dataString={
    fn_group:'geodata',
    qy_name:'A'
  }
  dataString.action="view_data";
  dataString.collection='lyr_single';
  dataString.table_slug='TB_LYR_STYLE';
  dataString.by_field_name='item_token';
  dataString.by_field_value=sessionStorage.a240_Style_item_token;

  generic_api(dataString,'a240_StyleForm');

}

dyn_functions['succ_'+'a240_StyleForm'] = function(r){

  //$('.ajs-footer-btn2').html('');

  let pStyle = r.features[0].properties;

  let ct_slug = 'a240_1_part3_b_fields';

  $('.row-'+ct_slug).remove();
  c = ''
    +'<div class="row row-'+ct_slug+'">'
      +'<div class="col-12">'
        +'<div class="box-'+ct_slug+'">'
        +'</div>'
      +'</div>'
    +'</div>'
    +'';
  $('.box-'+'a240_1_part3_b').append(c);  

  $('.row-'+'a240_1_part3_c_fields').remove();
  c = ''
    +'<div class="row row-'+'a240_1_part3_c_fields'+'">'
      +'<div class="col-12">'
        +'<div class="box-'+'a240_1_part3_c_fields'+'">'
        +'</div>'
      +'</div>'
    +'</div>'
    +'';
  $('.box-'+'a240_1_part3_b').append(c);

  opt = {
    "ct_slug": 'a240_1_part3_c_fields',//ct_slug,
    "objItem": pStyle,
  }
  a240_StyleForm_FillProperties(opt);

}

dyn_functions['succ_'+'a240_UpdateLyr_AddNewStyle'] = function(r){

  dataString={
    fn_group:'geodata',
    qy_name:'A'
  }

  dataString.action='modify_data';
  dataString.collection='update_attributes_by_table';
  dataString.table_slug='TB_LYR';
  dataString.item_token=sessionStorage.a240_Lyr_item_token;
  dataString.field_and_value=[
    {
      "field": 'geoserver_style_name',
      "value": r.ds.g_master
    }
  ];
  console.log(dataString);

  generic_api(dataString,'a240_UpdateLyr_AddNewStyle_UpdLyr');

}

dyn_functions['succ_'+'a240_UpdateLyr_AddNewStyle_UpdLyr'] = function(r){

  dyn_functions['a240_UpdateLyr']();

}

var sld_colors = [
  {"val":"red","text":"red"},
  {"val":"green","text":"green"},
  {"val":"lightgreen","text":"lightgreen"},
  {"val":"darkgreen","text":"darkgreen"},
  {"val":"blue","text":"blue"},
  {"val":"lightblue","text":"lightblue"},
  {"val":"darkblue","text":"darkblue"},
  {"val":"yellow","text":"yellow"},
  {"val":"lightyellow","text":"lightyellow"},
  {"val":"cyan","text":"cyan"},
  {"val":"magenta","text":"magenta"},
  {"val":"lightmagenta","text":"lightmagenta"},
  {"val":"black","text":"black"},
  {"val":"white","text":"white"},
  {"val":"gray","text":"gray"},
  {"val":"darkgray","text":"darkgray"},
  {"val":"brown","text":"brown"},
  {"val":"violett","text":"violett"},
  {"val":"orange","text":"orange"}
];

var a240_StyleForm_pCol=[
/*   {
    "g_slug": "attr_filter",
    "g_label": "attr_filter",
    "g_options":[
      {
        "val":"none",
        "text":"none"
      },
      {
        "val":"PropertyIsEqualTo",
        "text":"PropertyIsEqualTo"
      },
      {
        "val":"PropertyIsLike wildCard=\"*\" singleChar=\"%\" escape=\"!\"",
        "text":"PropertyIsLike wildCard=\"*\" singleChar=\"%\" escape=\"!\""
      }
    ],
    "feat_type":["point","polyline","polygon"],
  }, */
  {
    "g_slug": "attr_symbolizer",
    "g_label": "attr_symbolizer",
    "g_options":[
      {"val":"text","text":"text"},
      {"val":"point","text":"point"}
    ],
    "feat_type":["point"],
    "subOf":[]
  },
/*   {
    "g_slug": "attr_symbolizer",
    "g_label": "attr_symbolizer (always polygon)",
    // "g_options":[
    //   {"val":"polygon","text":"polygon"}
    // ],
    "feat_type":["polyline","polygon"],
    "subOf":[]
  },   */
  {
    "g_slug": "attr_filter_propertyname",
    "g_label": "attr_filter_propertyname",
    //"g_options":[/*from db*/],
    "feat_type":["point","polyline","polygon"],
    "subOf":["attr_filter"]
  },
  {
    "g_slug": "attr_filter_literal",
    "g_label": "attr_filter_literal",
    //"g_options":[/*from db*/],
    "feat_type":["point","polyline","polygon"],
    "subOf":["attr_filter_propertyname"]
  },
  {
    "g_slug": "attr_filter_function",
    "g_label": "attr_filter_function",
    "g_options":["like","in","?null?"],
    "feat_type":["point","polyline","polygon"],
    "subOf":["attr_filter_propertyname"]
  },
  {
    "g_slug": "wellknownname",
    "g_label": "wellknownname",
    "g_options":["empty","square","circle",],
    "feat_type":["point"],
    "subOf":[]
  },
  {
    "g_slug": "wellknownname",
    "g_label": "wellknownname",
    "g_options":["-","empty","full","circle",
      "shape://backslash","shape://horline","shape://plus",
      "shape://slash","shape://times","shape://vertline"],
    "feat_type":["polygon"],
    "subOf":[]
  },
/*   {
    "g_slug": "wellknownname",
    "g_label": "wellknownname (always empty)",
    //"g_options":[],
    "feat_type":["polyline"],
    "subOf":[]
  }, */
  {
    "g_slug": "fill",
    "g_label": "fill",
    "g_options":sld_colors,
    "feat_type":["point","polygon"],
    "subOf":[]
  },
  {
    "g_slug": "fillstroke",
    "g_label": "fillstroke",
    "g_options":["bold","light","normal"],
    "feat_type":[/* "point" */,"polygon"],
    "subOf":[]
  },
  {
    "g_slug": "fillsize",
    "g_label": "fillsize",
    "g_options":["x-large","large","medium","fit"],
    "feat_type":["point","polygon"],
    "subOf":[]
  },
  {
    "g_slug": "stroke",
    "g_label": "stroke",
    "g_options":sld_colors,
    "feat_type":["polyline","polygon"],
    "subOf":[]
  },
  {
    "g_slug": "strokewidth",
    "g_label": "strokewidth",
    "g_options":["bold","light","normal"],
    "feat_type":["polyline","polygon"],
    "subOf":[]
  },
/*   {
    "g_slug": "strokedash",
    "g_label": "strokedash",
    "g_options":[true,false],
    "feat_type":["polyline","polygon"],
    "subOf":[]
  },
  {
    "g_slug": "strokedasharray",
    "g_label": "strokedasharray (5 2, 4 2, ...)",
    //"g_options":[], //5 2
    "feat_type":["polyline","polygon"],
    "subOf":["strokedash"]
  },
  {
    "g_slug": "filldash",
    "g_label": "filldash",
    "g_options":[true,false],
    "feat_type":["polygon"],
    "subOf":[]
  },
  {
    "g_slug": "filldasharray",
    "g_label": "filldasharray (5 2, 4 2, ...)",
    //"g_options":[], //5 2
    "feat_type":["polygon"],
    "subOf":["filldash"]
  }, */
  {
    "g_slug": "textsymbolizer",
    "g_label": "textsymbolizer",
    "g_options":[true,false],
    "feat_type":["point"],
    "subOf":["attr_symbolizer"]
  },
  {
    "g_slug": "textproperty",
    "g_label": "textproperty",
    //"g_options":[/*from db*/],
    "feat_type":["point"],
    "subOf":["textsymbolizer"]
  },
  {
    "g_slug": "textfill",
    "g_label": "textfill",
    "g_options":sld_colors,
    "feat_type":["point"],
    "subOf":["textsymbolizer"]
  },
  {
    "g_slug": "svg",
    "g_label": "svg",
    "g_options":[true,false],
    "feat_type":["point","polyline","polygon"],
    "subOf":["wellknownname"]//must be "-"!
  },
  {
    "g_slug": "fillsvg",
    "g_label": "fillsvg (url complete svg, png)",
    //"g_options":[/* text url */],
    "feat_type":["point","polyline","polygon"],
    "subOf":["svg"]
  },  
  {
    "g_slug": "view_scale",
    "g_label": "view_scale",
    "g_options":["region","bigcity","large","medium","small"],
    "feat_type":["point","polyline","polygon"],
    "subOf":[]
  }
]


function a240_StyleForm_FillProperties(optIn){

  let pStyle = optIn.objItem;

  //--OLD
    //_onsole.log(pStyle)
    // if(sessionStorage.a240_Lyr_feat_type=='point'){
    //   //wellknownname, fill, fillsize

    //   if(pStyle.attr_filter=='none'){
        
    //   }
    //   else if(pStyle.attr_filter=='PropertyIsEqualTo'){
    //     opt = {
    //       "ct_slug": opt.ct_slug,
    //       "pStyle": pStyle,
    //       "pCol":{
    //         "g_slug": "attr_filter_propertyname",
    //         "g_label": "attr_filter_propertyname",
    //       }
    //     }
    //     a240_StyleForm_field_generic(opt);

    //     opt = {
    //       "ct_slug": opt.ct_slug,
    //       "pStyle": pStyle,
    //       "pCol":{
    //         "g_slug": "attr_filter_literal",
    //         "g_label": "attr_filter_literal",
    //       }
    //     }
    //     a240_StyleForm_field_generic(opt);

    //   }
    //   else{
    //     opt = {
    //       "ct_slug": opt.ct_slug,
    //       "pStyle": pStyle,
    //       "pCol":{
    //         "g_slug": "attr_filter_propertyname",
    //         "g_label": "attr_filter_propertyname",
    //       }
    //     }
    //     a240_StyleForm_field_generic(opt);

    //     opt = {
    //       "ct_slug": opt.ct_slug,
    //       "pStyle": pStyle,
    //       "pCol":{
    //         "g_slug": "attr_filter_literal",
    //         "g_label": "attr_filter_literal",
    //       }
    //     }
    //     a240_StyleForm_field_generic(opt);

    //     opt = {
    //       "ct_slug": opt.ct_slug,
    //       "pStyle": pStyle,
    //       "pCol":{
    //         "g_slug": "attr_filter_function",
    //         "g_label": "attr_filter_function",
    //         "g_options":[
    //           {"val":"like","text":"like"},
    //           {"val":"in","text":"in"}
    //         ]
    //       }
    //     }
    //     a240_StyleForm_field_generic(opt);
        
    //   }    

    //   //if change must control other fields
      // opt = { //always only for points
      //   "ct_slug": opt.ct_slug,
      //   "pStyle": pStyle,
      //   "pCol":{
      //     "g_slug": "attr_symbolizer",
      //     "g_label": "attr_symbolizer",
      //     "g_options":[
      //       {"val":"text","text":"text"},
      //       {"val":"point","text":"point"}
      //     ]
      //   }
      // }
    //   a240_StyleForm_field_generic(opt);

    //   opt = {
    //     "ct_slug": opt.ct_slug,
    //     "pStyle": pStyle,
    //     "pCol":{
    //       "g_slug": "wellknownname",
    //       "g_label": "wellknownname",
    //       "g_options":[
    //         {"val":"square","text":"square"},
    //         {"val":"circle","text":"circle"},
    //         {"val":"star","text":"star"}
    //       ]
    //     }
    //   }
    //   a240_StyleForm_field_generic(opt);

    //   opt = { //fill
    //     "ct_slug": opt.ct_slug,
    //     "pStyle": pStyle,
    //     "pCol":{
    //       "g_slug": "fill",
    //       "g_label": "fill",
    //       "g_options":sld_colors
    //     }
    //   }
    //   a240_StyleForm_field_generic(opt); 

    //   opt = {
    //     "ct_slug": opt.ct_slug,
    //     "pStyle": pStyle,
    //     "pCol":{
    //       "g_slug": "fillsize",
    //       "g_label": "fillsize",
    //       "g_options":[
    //         {"val":"x-large","text":"x-large"},
    //         {"val":"large","text":"large"},
    //         {"val":"medium","text":"medium"},
    //         {"val":"fit","text":"fit"}
    //       ]
    //     }
    //   }
    //   a240_StyleForm_field_generic(opt);      

    // }
    // else{ //polygon, line
    //   //wellknownname, fill, stroke, strokewidth

    //   if(pStyle.attr_filter=='none'){
        
    //   }
    //   else if(pStyle.attr_filter=='PropertyIsEqualTo'){
    //     opt = {
    //       "ct_slug": opt.ct_slug,
    //       "pStyle": pStyle,
    //       "pCol":{
    //         "g_slug": "attr_filter_propertyname",
    //         "g_label": "attr_filter_propertyname",
    //       }
    //     }
    //     a240_StyleForm_field_generic(opt);

    //     opt = {
    //       "ct_slug": opt.ct_slug,
    //       "pStyle": pStyle,
    //       "pCol":{
    //         "g_slug": "attr_filter_literal",
    //         "g_label": "attr_filter_literal",
    //       }
    //     }
    //     a240_StyleForm_field_generic(opt);

    //   }
    //   else{
    //     opt = {
    //       "ct_slug": opt.ct_slug,
    //       "pStyle": pStyle,
    //       "pCol":{
    //         "g_slug": "attr_filter_propertyname",
    //         "g_label": "attr_filter_propertyname",
    //       }
    //     }
    //     a240_StyleForm_field_generic(opt);

    //     opt = {
    //       "ct_slug": opt.ct_slug,
    //       "pStyle": pStyle,
    //       "pCol":{
    //         "g_slug": "attr_filter_literal",
    //         "g_label": "attr_filter_literal",
    //       }
    //     }
    //     a240_StyleForm_field_generic(opt);

    //     opt = {
    //       "ct_slug": opt.ct_slug,
    //       "pStyle": pStyle,
    //       "pCol":{
    //         "g_slug": "attr_filter_function",
    //         "g_label": "attr_filter_function",
    //         "g_options":[
    //           {"val":"like","text":"like"},
    //           {"val":"in","text":"in"}
    //         ]
    //       }
    //     }
    //     a240_StyleForm_field_generic(opt);
        
    //   }    

    //   opt = { //wellknownname
    //     "ct_slug": opt.ct_slug,
    //     "pStyle": pStyle,
    //     "pCol":{
    //       "g_slug": "wellknownname",
    //       "g_label": "wellknownname",
    //       "g_options":[
    //         {"val":"empty","text":"empty"},
    //         {"val":"full","text":"full"},
    //         {"val":"shape://times","text":"shape://times"},
    //         {"val":"shape://backslash","text":"shape://backslash"}
    //       ]
    //     }
    //   }
    //   a240_StyleForm_field_generic(opt);

    //   opt = { //fill
    //     "ct_slug": opt.ct_slug,
    //     "pStyle": pStyle,
    //     "pCol":{
    //       "g_slug": "fill",
    //       "g_label": "fill",
    //       "g_options":sld_colors
    //     }
    //   }
    //   a240_StyleForm_field_generic(opt); 

    //   opt = { //fillsize
    //     "ct_slug": opt.ct_slug,
    //     "pStyle": pStyle,
    //     "pCol":{
    //       "g_slug": "fillsize",
    //       "g_label": "fillsize",
    //       "g_options":[
    //         {"val":"x-large","text":"x-large"},
    //         {"val":"large","text":"large"},
    //         {"val":"medium","text":"medium"},
    //         {"val":"fit","text":"fit"}
    //       ]
    //     }
    //   }
    //   a240_StyleForm_field_generic(opt);      

    //   opt = { //stroke
    //     "ct_slug": opt.ct_slug,
    //     "pStyle": pStyle,
    //     "pCol":{
    //       "g_slug": "stroke",
    //       "g_label": "stroke",
    //       "g_options":sld_colors
    //     }
    //   }
    //   a240_StyleForm_field_generic(opt); 

    //   opt = { //strokewidth
    //     "ct_slug": opt.ct_slug,
    //     "pStyle": pStyle,
    //     "pCol":{
    //       "g_slug": "strokewidth",
    //       "g_label": "strokewidth",
    //       "g_options":[
    //         {"val":"bold","text":"bold"},
    //         {"val":"light","text":"light"},
    //         {"val":"normal","text":"normal"}
    //       ]
    //     }
    //   }
    //   a240_StyleForm_field_generic(opt);     
    // }
  //--OLD

  a240_StyleForm_pCol.forEach(element => {

    //sessionStorage.a240_Lyr_feat_type=='point'
    if(element.feat_type.indexOf(sessionStorage.a240_Lyr_feat_type)>-1){
      opt = { //always only for points
        "ct_slug": optIn.ct_slug,
        "pStyle": pStyle,
        "pCol":{
          "g_slug": element.g_slug,//"attr_symbolizer",
          "g_label": element.g_label,//"attr_symbolizer",
          "g_options":element.g_options
        }
      }
      if(element.g_slug=='fill'
        ||element.g_slug=='stroke'){
        opt.pCol.g_callback = 'field_colorPicker';
        opt.pCol.f_onChange = 'a240_StyleForm_updateDbStyle';
      }
      a240_StyleForm_field_generic(opt);
      //_onsole.log(element)
      if(element.subOf.length>0){
        $('#group-'+element.g_slug).css('display','none');
      }
    }

  });


}

function a240_StyleForm_field_generic(optIn){

  //_onsole.log(optIn)
  //-- CREATE FORM GROUP AND LABEL
  let pCol = optIn.pCol;
  pCol.g_description = "...";
  pCol.g_placeholder = "...";

  //-- CREATE FORM GROUP AND LABEL
  opt = {
    "slug": pCol.g_slug,
    "label": true,//ONLY NOT DEFINED IN objCol
    "pCol": pCol,
  }
  $('.box-'+optIn.ct_slug).append(
    append_field_label_2(opt)
  );

  //-- INPUT FIELD
  opt = {
    "slug": pCol.g_slug,
    "pCol": pCol,
    "objItem": optIn.pStyle,
  }
  //_onsole.log(opt);
  objField_omnivore(opt);

  $( "#input-"+pCol.g_slug ).on('change', function() {

    opt = {
      "col_slug": $(this).attr('slug'),//ct_slug,
      "col_value": $(this).val()
    }
    dyn_functions['a240_StyleForm_updateDbStyle'](opt);

  });

}

dyn_functions['a240_StyleForm_updateDbStyle'] = function(optIn){

  dataString={
    fn_group:'geodata',
    qy_name:'A'
  }

  dataString.action='modify_data';
  dataString.collection='update_attributes_by_table';
  dataString.table_slug='TB_LYR_STYLE';
  dataString.item_token=sessionStorage.a240_Style_item_token;
  dataString.field_and_value=[
    {
      "field": optIn.col_slug,
      "value": optIn.col_value
    }
  ];

  generic_api(dataString,'a240_StyleForm_updateDbStyle');

}

dyn_functions['succ_'+'a240_StyleForm_updateDbStyle'] = function(r){

  dyn_functions['a240_UpdateLyr']();

}