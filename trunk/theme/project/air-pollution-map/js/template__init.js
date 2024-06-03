let sidebarOpen = false;

export async function template__init(){

    let _container = document.querySelector('.sidebar__header');
    let _logo = AP5_LOGO;
    _container.innerHTML = `
      <img src="${_logo}" \
        style="width: auto;max-height: 100%;">
    `;

    _container = $('.mainmap__loading');

    _container.html(`
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    `);

    _container = $('.wrapper');

    _container.append(`
      <div class="wrapper__sidebar__open">
        <button \
          id="sidebarToggle" \
          class="btn btn-sm btn-dark btn_sm__icon">\
          <i class="bi bi-layout-sidebar-inset"></i></button>
      </div>
    `);

    // Add this code
    document.getElementById('sidebarToggle').addEventListener('click', function() {
      sidebar__toggle();
    });


    _container = $('.wrapper');

    _container.append(`
      <div class="wrapper__topright_space">
      </div>
    `);

    _container = document.querySelector('.sidebar__body');

    _container.innerHTML = `
      <div class="sidebar__extra_pre"></div>
      <div class="sidebar__extra"></div>
      <div class="sidebar__info"></div>
    `;

    _container = document.querySelector('.sidebar__footer');

    _container.innerHTML = `
      <div  style="width:100%;" 
        class="btn-group btn-group-sm" role="group" aria-label="Basic example">
        <button type="button" class="btn__refresh btn btn-outline-secondary"><i class="bi bi-arrow-clockwise"></i></button>
        <button type="button" class="btn__home btn btn-outline-secondary"><i class="bi bi-house"></i></button>
        <button type="button" class="btn__main__toggle btn btn-outline-secondary">\
          <i class="bi bi-info-circle"></i></button>
      </div>
    `;

    $('.btn__refresh').on('click', function(){
      location.reload();
    });

    $('.btn__home').on('click', function(){
      window.location.href = `${FLAT_DOMAIN}`;
    });

    $(`#article__btn__close`).on('click', function(){
      $('main').toggle();
    });

    $(`.btn__main__toggle`).on('click', function(){
      $('main').toggle();
    });

}

function sidebar__toggle(){
  sidebarOpen = !sidebarOpen;
  if(sidebarOpen){
    $('.wrapper').css('grid-template-columns','1fr 0px');
    $('.wrapper__sidebar__open').css({
      'left':'auto',
      'right':'1rem'
    });
    $('.wrapper__sidebar__open').find('button').html(`<i class="bi bi-map"></i>`);
  }
  else{
    $('.wrapper').css('grid-template-columns','0px 1fr');
    $('.wrapper__sidebar__open').css({
      'left':'1rem',
      'right':'auto'
    });
    $('.wrapper__sidebar__open').find('button').html(`<i class="bi bi-layout-sidebar-inset"></i>`);
  }

}