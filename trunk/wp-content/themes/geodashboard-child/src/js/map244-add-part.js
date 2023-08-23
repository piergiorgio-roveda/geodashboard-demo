var m244_lyrs=[];

function m244_add_part(objPart){

  $('#row-'+objPart.g_row).remove();

  let ds = {
    'ct_slug':objPart.g_row,
    'ct_type':objPart.row_type//,//'item' or 'single_object' or 'full_object'
  }
  $('.'+objPart.g_container).append(part_ct_params(ds));

  if(objPart.g_type=='simpleTest'){

    c = 'simpleTest';
    $('.box-'+objPart.g_row).append(c);

  }
  else if(objPart.g_type=='lyrMapPreview'){

    c = ''
      +'<div '
        +'class="box" style="overflow:hidden;max-height:500px;" '
        +'></div>';
    $('.box-'+objPart.g_row).append(c);

    m244_map_init('.box-'+objPart.g_row);

  }
  
}

dlg_field_template['field_MapLyrs'] = function(optIn){

  let c = '';

  let pCol = optIn.pCol;
  let objItem = optIn.objItem;

  $('#input-'+pCol.g_slug).css('display','none');
  $('#group-'+pCol.g_slug+' > label').remove();

  m244_lyrs = objItem[pCol.g_slug];

  c = ''
    +'<div id="group-'+optIn.ct_slug+'" '
      +'class="form-group group-'+opt.slug+'">'
      +'<div class="row row-table">'
        +'<div class="col-8 col-table">'
          +pCol.g_label + '&nbsp;<span class="badge bg-danger '
            +pCol.g_slug+'-counter">'
            +m244_lyrs.length
          +'</span>'
        +'</div>'
        +'<div class="col-4 col-table" '
          +'style="text-align:right;">'
          +'<span class="box-btn_m244_field_MapLyrs"></span>'
        +'</div>'
      +'</div>'
    +'</div>'
  +'';
  $('#group-'+pCol.g_slug+'').append(c);

  create_button('btn_m244_field_MapLyrs',optIn);

}

dyn_functions['callback_paramsControl_field_MapLyrs'] = function(){

  return JSON.stringify(m244_lyrs);

}

// !dev change `slug` to `optIn`
f_btn[ 'btn_m244_field_MapLyrs']=function(item_btn,optIn){

  //_onsole.log('f_btn > btn_m244_field_MapLyrs',slug);
  //_onsole.log('optIn',optIn);

  // let objItem = optIn.objItem;
  // let pCol = optIn.pCol;

  // sessionStorage.this_dialog_lyr='m244_field_MapLyrs';
  // sessionStorage.this_dialog_slug='m244_field_MapLyrs_single';//'lyr035_single'
  // sessionStorage.this_mapslug=$('#input-g_slug').val();

  // //sessionStorage.mapclick_lng=e.latlng.lng;
  // create_dialog2(sessionStorage.this_dialog_slug);

  dyn_functions['ct_m244_field_MapLyrs_data'](optIn);

}

dyn_functions['ct_m244_field_MapLyrs_data'] = function(optIn){

  let objItem = optIn.objItem;
  let pCol = optIn.pCol;

  let ds=new Array();
  let opt=new Array();

  let dlg_slug = 'm244_field_MapLyrs_data';

  // let c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  // $('.dlg_'+dlg_slug+''+'_body').append(c);

  let c = ''
    +'<div class="ct-head2 ct-results-head2">'
      +'<div class="uppercase">Choose Map Layers</div>'
    +'</div>'
    +'<div class="ct-body2 ct-results-body2">'
    +'</div>'
    +'';

  $('.ct-results').html(c);

  //box button tab
  // c = ''
  //   +'<div class="ajs_body_head" '
  //     +'pid="999" '
  //     +'></div>'
  //   +'<div class="clearfix"></div>';
  // $('.dlg_'+dlg_slug+''+'_body').append(c);

  // c = '<div>'
  //   +'<div class="col-btn-attrs" style="text-align:left;"></div>'
  // +'</div>';
  // $('.dlg_'+dlg_slug+''+'_body').append(c);

  //box tab1
  c = '<div '
    +'class="dlg_panel dlg_panel_tab panel-tab11" '
    +'style="display:block;font-family:var(--wd-fonts-secondary);">';
  //c += '<p>TAB1</p>';
  c += '</div><!--tab1-->';
  $('.ct-results-body2').append(c);

  let parts = [
    {  
      "g_container": "panel-tab11",//container
      "g_row": "part_3",//#id row
      "row_type": "col-6",
      "g_type": "mapLyrs",
      "geovar_data": "obj_maps",
      "geovar_filter": sessionStorage.this_mapslug,
      "geovar_schema": "TB_MAP"
    }
  ];

  let objPart = parts[0];

  //-- CREATE NEW ROW MAPS LIST WITH BOX
  opt = {
    "slug": "part_3",
    "grid": "col-6",
  }
  $('.panel-tab11').append(part_ct_params(opt));

  //let o = g_meta[objPart.geovar_data].features;
  //let this_obj=o.filter(({properties}) => properties.g_slug === objPart.geovar_filter);
  //let objItem=this_obj[0].properties;

  $('.box-'+objPart.g_row+'-A').css('max-height', '500px');
  $('.box-'+objPart.g_row+'-A').css('overflow-x', 'auto');
  $('.box-'+objPart.g_row+'-B').css('max-height', '500px');
  $('.box-'+objPart.g_row+'-B').css('overflow-x', 'auto');

  //m244_lyrs = objItem.g_lyr;

  let m244_ds = {
    "g_container": ".box-"+objPart.g_row+"-A",
    "g_data":  m244_lyrs,
    "decode": "geovar_lyr"
  };

  m244_fill_box_list(m244_ds);

  let o2 = g_meta.geovar_lyr.features;
  o2.forEach(objLyr => {
    let itemLyr = objLyr.properties.g_slug;
    let itemLyrLabel = objLyr.properties.g_label;

    let faw_class='fa-square-o';
    if(m244_lyrs.includes(itemLyr)){
      faw_class='fa-square';
    }
    c = ''
      +'<icon><i class="fa '+faw_class+'" aria-hidden="true"></i></icon>'
      +'&nbsp;<span>'+itemLyr+'</span></br>';
    c = ''
      +'<div '
        +'class="m244-'+objPart.g_type+'" '
        +'style="cursor:pointer;" '
        +'id="'+objPart.g_type+'-'+itemLyr+'" '
        +'myLyr="'+itemLyr+'">'
          +'<icon><i class="fa '+faw_class+'" aria-hidden="true"></i></icon>'
          +'&nbsp;<span>' + itemLyrLabel +'</span>';
        +'</div>'
      +'';
    $('.box-'+objPart.g_row+'-B').append(c);
  });

  $('.m244-'+objPart.g_type+'').on('click',function(){

    let myLyr=$(this).attr('myLyr');

    if(m244_lyrs.indexOf(myLyr)>-1){

      m244_lyrs.splice(m244_lyrs.indexOf(myLyr),1);
      $(this).find('icon > i').removeClass('fa-square');
      $(this).find('icon > i').addClass('fa-square-o');

    }
    else{

      m244_lyrs.push(myLyr);
      $(this).find('icon > i').removeClass('fa-square-o');
      $(this).find('icon > i').addClass('fa-square');

    }

    $('.box-'+objPart.g_row+'-A').html('');

    let m244_ds = {
      "g_container": ".box-"+objPart.g_row+"-A",
      "g_data":  m244_lyrs,
      "decode": "geovar_lyr"
    };

    m244_fill_box_list(m244_ds);

    opt = {
      "m244_ds": m244_ds,
      "m244_lyrs": m244_lyrs,
      "objItem": optIn.objItem,
      "pCol": optIn.pCol
    }
    m244_fill_input(opt);

  });


}

function m244_fill_box_list(m244_ds){

  let objItem = new Array();

  m244_ds.g_data.forEach(itemLyr => {

    objItem = new Array();
    ds = {
      geovar:m244_ds.decode,//geovar_lyr
      slug:itemLyr,
      type:'single_object'//,//'item' or 'single_object' or 'full_object'
    }
    objItem = get_geovar_obj(ds);
    //_onsole.log(objItem)
    c = '<span>'+objItem.g_label+'</span></br>';
    $(m244_ds.g_container).append(c);
  });

}

function m244_fill_input(optIn){

  $('.'+optIn.pCol.g_slug+'-counter').html(optIn.m244_lyrs.length);
  $('#input-'+optIn.pCol.g_slug).val(JSON.stringify(optIn.m244_lyrs));


}

function m244_map_init(box){
  //A5 148 x 210 mm
  c = ''
    +'<div '
      +'id="m244_map" style="width: 100%;height:300px;" '
      +'></div>';
  $(box).append(c);

  maps.m244_map = L.map('m244_map',{
    minZoom: 1,
    maxZoom: 20,
    zoomControl: false,
    zoomSnap: 0.5,
    zoomDelta: 0.5,
    wheelPxPerZoomLevel: 100
  })

  maps.m244_map.setView([
    localStorage.map_lat,
    localStorage.map_lng
  ],
    localStorage.map_zoom
  );

  let lyr='lyr040';
  let o = g_meta.geovar_lyr.features
  let this_obj=o.filter(({properties}) => properties.g_slug === lyr);
  let obj_lyr=this_obj[0].properties;

  maps.m244_map.createPane(lyr+'_pane');
  maps.m244_map.getPane(lyr+'_pane').style.zIndex = lyr.zIndex;

  geo_lyr[lyr] = L.tileLayer(
    obj_lyr.tile_url,
    {
      attribution: obj_lyr.attribution,
      pane: lyr+'_pane'
    }
  ).addTo(maps.m244_map);


}

dlg_field_template['field_test_edifici'] = function(optIn){

  console.log('field_test_edifici',optIn)  

}

dlg_field_template['field_volume_edifici'] = function(optIn){

  //_onsole.log('field_volume_edifici',optIn);
  let volume = optIn.objItem.shape_area*optIn.objItem.h
  $('#group-'+optIn.ct_slug).append(
    '<span class="numberM-'+optIn.ct_slug+'">'+volume+'</span>'
  );
  new AutoNumeric('.numberM-'+optIn.ct_slug+'',numberM);
}

dlg_field_template['field_streetaddress'] = function(optIn){

  //_onsole.log('field_streetaddress',optIn);
  // objItem : {civico: 3, toponimo: 'MASACCIO', tipo: 'VIA', pid: 32399}
  let string = optIn.objItem.tipo+' '+optIn.objItem.toponimo+' '+optIn.objItem.civico
  $('#group-'+optIn.ct_slug).html(
    '<span class="numberM-'+optIn.ct_slug+'">'+string+'</span>'
  );
  //new AutoNumeric('.numberM-'+optIn.ct_slug+'',numberM);
}

dlg_field_template['field_view_truefalse'] = function(optIn){

  console.log('field_view_truefalse',optIn);
  let html ='<i class="fa fa-circle-o" aria-hidden="true"></i>';
  if(optIn.objItem[optIn.pCol.g_slug] == 'SI'){
    html ='<i class="fa fa-circle" aria-hidden="true"></i>';
  }
  let display_label = 'display:block;';
  $('#group-'+optIn.ct_slug).html(''
    +'<div style="display: table;width:100%;">'
      +'<div for="exampleInputEmail1" '
        +'style="'
          +'display: table-cell;'
          +'text-transform: capitalize;'
          +'font-size: 75%;'
          +'margin-left: 3px;'
          +'margin-bottom: 6px;'
          +'width:75%;'
          +display_label
          +'">'
        +optIn.pCol.g_label
      +'</div>'
      +'<div '
        +'style="'
          +'display: table-cell;'
          +'text-align: right;'
        +'">'
        +html
      +'</div>'
    +'</div>'
  );
  //new AutoNumeric('.numberM-'+optIn.ct_slug+'',numberM);
}

dlg_field_template['field_view_number_inline'] = function(optIn){

  let html =optIn.objItem[optIn.pCol.g_slug];

  let display_label = 'display:block;';
  $('#group-'+optIn.ct_slug).html(''
    +'<div style="display: table;width:100%;">'
      +'<div for="exampleInputEmail1" '
        +'style="'
          +'display: table-cell;'
          +'text-transform: capitalize;'
          +'font-size: 75%;'
          +'margin-left: 3px;'
          +'margin-bottom: 6px;'
          +'width:75%;'
          +display_label
          +'">'
        +optIn.pCol.g_label
      +'</div>'
      +'<div '
        +'style="'
          +'display: table-cell;'
          +'text-align: right;'
        +'">'
        +html
      +'</div>'
    +'</div>'
  );
  //new AutoNumeric('.numberM-'+optIn.ct_slug+'',numberM);
}

dlg_field_template['field_colorPicker'] = function(optIn){

  let colorSlug = optIn.objItem[optIn.pCol.g_slug];
  let html = colorSlug;

  //let display_label = 'display:block;';
  $('#group-'+optIn.ct_slug).html(''
    +'<div '
      +'style="'
        +'display: table;'
        +'width:100%;'
      +'">'
      +'<div '
        +'style="'
          +'display: table-cell;'
          +'text-transform: capitalize;'
          +'font-size: 75%;'
          //+'margin-left: 3px;'
          //+'margin-bottom: 6px;'
          //+'width:25%;'
          //+display_label
          +'vertical-align: middle;'
          +'">'
        +optIn.pCol.g_label
      +'</div>'
      +'<div '
        +'style="'
          +'display: table-cell;'
          //+'text-align: right;'
          //+'width:60%;'
          +'vertical-align: middle;'
          +'padding-left: 5px;'
          +'padding-right: 5px;'
        +'">'
        +'<input '
          +'class="form-control '
            +'input-'+optIn.ct_slug+' params-control control-'+optIn.ct_slug+'" '
          +'slug="'+optIn.ct_slug+'" field_slug="'+optIn.ct_slug+'" '
          +'id="input-'+optIn.ct_slug+'" type="text" value="'+html+'" />'
      +'</div>'
      +'<div '
        +'style="'
          +'display: table-cell;'
          //+'text-align: right;'
          //+'width:15%;'
          +'vertical-align: middle;'
        +'">'  
        //+'<div class="theme-container"></div>'
        +'<div class="pickr-container-'+optIn.ct_slug+'"></div>'
        //+'<p>(Tap it)</p>'
      +'</div>'            
    +'</div>'
  );
  //new AutoNumeric('.numberM-'+optIn.ct_slug+'',numberM);

  const pickrContainer = document.querySelector('.pickr-container-'+optIn.ct_slug+'');
  //const themeContainer = document.querySelector('.theme-container');
  const themes = [
      [
          'nano',
          {
              swatches: [
                  'rgba(244, 67, 54, 1)',
                  'rgba(233, 30, 99, 1)',
                  'rgba(156, 39, 176, 1)',
                  'rgba(103, 58, 183, 1)',
                  'rgba(63, 81, 181, 1)',
                  'rgba(33, 150, 243, 1)',
                  'rgba(3, 169, 244, 1)'
              ],
  
              defaultRepresentation: 'HEXA',
              components: {
                  preview: true,
                  opacity: false,
                  hue: true,
  
                  interaction: {
                      hex: false,
                      rgba: false,
                      hsva: false,
                      input: false,
                      clear: false,
                      save: false
                  }
              }
          }
      ]
  ];
  
  const buttons = [];
  let pickr = null;
  
  for (const [theme, config] of themes) {
      const button = document.createElement('button');
      button.innerHTML = theme;
      buttons.push(button);
  
      button.addEventListener('click', () => {
          const el = document.createElement('p');
          pickrContainer.appendChild(el);
  
          // Delete previous instance
          if (pickr) {
              pickr.destroyAndRemove();
          }
  
          // Apply active class
          for (const btn of buttons) {
              btn.classList[btn === button ? 'add' : 'remove']('active');
          }
  
          // Create fresh instance
          pickr = new Pickr(Object.assign({
              el, theme,
              default: dflSldColor[colorSlug] != null ? dflSldColor[colorSlug] : colorSlug != null ? colorSlug :'#000'//'#42445a'
          }, config));
  
          // Set events
/*           pickr.on('init', instance => {
              console.log('Event: "init"', instance);
          }).on('hide', instance => {
              console.log('Event: "hide"', instance);
          }).on('show', (color, instance) => {
              console.log('Event: "show"', color, instance);
          }).on('save', (color, instance) => {
              console.log('Event: "save"', color, instance);
          }).on('clear', instance => {
              console.log('Event: "clear"', instance);
          }).on('change', (color, source, instance) => {
            //console.log('Event: "change"', color, source, instance);
            pickr.getColor().toRGBA().toString(0);
          }).on('changestop', (source, instance) => {
              console.log('Event: "changestop"', source, instance);
          }).on('cancel', instance => {
              console.log('cancel', pickr.getColor().toRGBA().toString(0));
          }).on('swatchselect', (color, instance) => {
              console.log('Event: "swatchselect"', color, instance);
          }); */

          pickr.on('init', instance => {
            //_onsole.log('Event: "init"', instance);
          }).on('change', instance => {
            //_onsole.log(pickr.getColor().toHEXA().toString(0));
            $('#input-'+optIn.ct_slug).val(pickr.getColor().toHEXA().toString(0));
            pickr.applyColor(true);
          }).on('hide', instance => {
            //_onsole.log('Event: "hide"', instance);
            if(optIn.pCol.f_onChange!=null){
              opt = {
                "col_slug": optIn.ct_slug,//ct_slug,
                "col_value": pickr.getColor().toHEXA().toString(0)
              }
              dyn_functions[optIn.pCol.f_onChange](opt);
            }
          });
      });
  
      //themeContainer.appendChild(button);
  }
  
  buttons[0].click();

}

var dflSldColor = {
  "red" : "#FF0000",
  "green" : "#00FF00",
  "lightgreen" : "#90EE90",
  "darkgreen" : "#006400",
  "blue" : "#0000FF",
  "blu" : "#0000FF",
  "lightblue" : "#ADD8E6",
  "darkblue" : "#00008B", 
  "yellow" : "#FFFF00",
  "lightyellow":"#fcfc83",
  "cyan" : "#00FFFF",
  "magenta" : "#FF00FF",
  "lightmagenta" : "#FF69B4",
  "black" : "#000000",
  "white" : "#FFFFFF", 
  "gray" : "#808080",
  "grey" : "#808080",
  "darkgray" : "#A9A9A9",
  "darkgrey" : "#A9A9A9",
  "brown" : "#A52A2A",
  "violett" : "#EE82EE",
  "violet" : "#EE82EE",
  "orange" : "#FFA500"
};