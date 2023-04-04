$(document).ready(function() {

  //aggiungi_box_ricerca();

}); //$(document).ready

function fill_search_cointainer(){

  let o = g_meta.geovar_map.features;
  let this_obj=o.filter(({properties}) => properties.g_slug === MAPSLUG);
  let obj_map=this_obj[0].properties;
  let obj_addon=obj_map.g_addon.filter((x) => x.addon === 'map204');
  if (obj_addon.length>0) {
    if(obj_addon[0].enabled===false){
      
      console.log('obj_addon[0].enabled===false')
      return;
    }
  }


  let m204_slug='locationField';

  //-- CREATE NEW ROW MAP FIELDS WITH BOX
  opt = {
    "slug": m204_slug,//optIn.ct_slug,
    "grid": "col-12",
  }
  $('#search-cointainer-sidebar').append(part_ct_params(opt));

  //-- CREATE FORM GROUP AND LABEL
  opt = {
    "label":false,
    "slug": m204_slug,//optIn.ct_slug,
    //"label": "Map filter",//ONLY NOT DEFINED IN objCol
    //"pCol": pCol,
  }
  $('.box-'+m204_slug).append(
    append_field_label_2(opt)
  );

  //-- INPUT FIELD
  opt = {
    "slug": m204_slug,
    "params_control": false,
    "pCol": {
      g_slug: m204_slug,
      data_type:'text',
      g_placeholder:"Ricerca indirizzo..."
    },
    "objItem": [],
  }
  $('#group-'+ m204_slug).append(append_simple_field_2(opt));
  $('#input-'+m204_slug).attr('id','autocomplete');
  
  /* $( '#search-cointainer-sidebar' ).html(''
    +'<div id="icon-locationField" '
      +'class="col-2 text-center">'
      +'<p style="margin-top:10px;">'
        +'<i class="fa fa-search" aria-hidden="true" '
          +'style="font-size: 13px;"></i>'
      +'</p>'
    +'</div>'
    +'<div id="locationField" '
      +'class="col-10" style="padding-left: 3px;margin-top: 3px;">'
      +'<input style="padding-left:3px;'
        +'border: 0px solid #ced4da;border-bottom:1px solid #ced4da;" '
        +'id="autocomplete" '
        +'placeholder="'+gLang.label_search_cointainer+'" type="text" '
        +'class="form-control locationField-form-control">'
    +'</div>');
  */
  initAutoComplete(); 

}
