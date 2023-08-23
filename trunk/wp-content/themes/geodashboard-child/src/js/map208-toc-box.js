function create_toc_box_style1(name){

  const box = '<div name="'+name+'" class="box-'+name+'" style="cursor:pointer;">'
    +'<div class="sbFooterBoxIcon d-flex align-items-center px-2 '
      +'justify-content-center" '
      +'style="float:left;width: 37px;">'
      +'<span class="align-middle box-'+name+'-icon"></span>'
    +'</div>'
    +'<div class="sbFooterBoxLabel d-flex align-items-center" '
      +'style="text-align:left;">'
      +'<span class="align-middle box-'+name+'-text"></span>'
    +'</div>'
  +'</div>';

  return box;
  
}