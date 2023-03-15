$(document).ready(function() {

}); //$(document).ready

list_creditExtend.push('a248');

dyn_functions['a248_creditExtend'] =  function(){

  let dlg_slug = 'btn_a248_credit_single';

  $('.nav-tabs').html('');
  $('.nav-tabs').css('display','none');

  $('.dlg_btn_credit_single_title').html(welcome_post_content.title);
  $('.panel-tab1').append(''
    +welcome_post_content.content
  +'');


}