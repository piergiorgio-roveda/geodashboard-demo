list_creditExtend.push('a229');

dyn_functions['a229_creditExtend'] =  function(){

  let dlg_slug = 'btn_credit_single';

  $('.nav-tabs').html('');
  $('.nav-tabs').css('display','none');

  let obj_attachment = g_meta.geovar_map.features[0].properties.g_attachment;

  $('.panel-tab1').append(''
    +'<ul></ul>'
  +'');

  obj_attachment.forEach(el => {
    $('.panel-tab1 > ul').append(''
      +'<li><a href="'+el.g_url+'" target="_blank">'+el.g_label+'</a></li>'
    +'');
  });

}