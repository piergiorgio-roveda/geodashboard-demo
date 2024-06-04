
export async function message__start__init(){

  if(localStorage.getItem('message__start')===null){
    localStorage.setItem('message__start', 'on');
  }
  else if(localStorage.getItem('message__start')=='on'){

  }
  else{
    $('main').toggle();
    $('.message__start--check').prop('checked', false);
  }

  $('.article__section').hide();
  $(`.article__section__description`).show();

  $('.message__start--check').on('click', function() {

    let _checked = $(this).is(':checked');

    if(_checked==true){
      localStorage.setItem('message__start', 'on');
    }
    else{
      localStorage.setItem('message__start', 'off');
    }

    // $('main').toggle();

  });

  $('.btn__main__close').on('click', function() {
    $('main').toggle();
  });

  $('.article--nav').on('click', function() {
    $('.article--nav').removeClass('active');
    $(this).addClass('active');

    $('.article__section').hide();
    $(`.article__section__${$(this).attr('section')}`).show();

  });

}


