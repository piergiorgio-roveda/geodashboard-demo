
dyn_functions['addon278-test-button-ga4'+'_ready'] = function(){

  let itemBtn1 = 'btn_test1_ga4';
  let itemBtn2 = 'btn_test2_ga4';
  
  let c = '<div '+
    'class="box-info-2-btn d-grid gap-2" '+
    'style="margin-top:5px;">'+
      '<span class="box-'+itemBtn1+'"></span>&nbsp;'+
      '<span class="box-'+itemBtn2+'"></span>&nbsp;'+
    '</div>'
  '';
  $('#ct0').append(c);

  let opt = btnOptDefault();
  opt.itemSlug = itemBtn1;
  opt.itemLabel = {
    "default":"TEST1 GA4",
  }//gLang.label_close,    
  create_button_2(opt);

  opt = btnOptDefault();
  opt.itemSlug = itemBtn2;
  opt.itemLabel = {
    "default":"TEST2 GA4",
  }//gLang.label_close,    
  create_button_2(opt);  

}

f_btn['btn_test1_ga4']=function(slug){
  let h = hashCode('aaa'+Date.now());
  log_tag_manager(
    'btn_test1_ga4', // myFunction
    'T1-'+h, // myDefinition
    '0' // myValue
  );

  return;
}



f_btn['btn_test2_ga4']=function(slug){
  let h = hashCode('zzz'+Date.now());
  log_tag_manager(
    'btn_test2_ga4', // myFunction
    'T2-'+h, // myDefinition
    '5' // myValue
  );

  return;
}