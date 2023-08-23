
$(document).ready(function() {

  $('.wiki-content').css('height','500px');
  $('.wiki-sub').css('height','200px');
  $('.wiki-content').append('<div class="ct-1"><div class="loader_002"></div></div>');
  $('.wiki-content').append('<div class="ct-2" style="text-align: center;"></div>');
  
  $('.loader_002').css('margin-left','173px');
  $('.loader_002').css('margin-top','177px');

  wiki003_ready();

}); //$(document).ready

function wiki003_ready(){
  if (f_wait.wiki_sub==0) {
    //_onsole.log('wait');
    setTimeout(function(){wiki003_ready()},100);
    return;
  } else {
    //_onsole.log('Done!');
    prepare_wiki003();
  };
}

function prepare_wiki003(){
  let i = 0;
  $('.loader_002').css('display','none');
  wiki_sub_last_r.features.forEach(element => {
    let p = element.properties;
    //_onsole.log(p);
    $('.ct-1').append('<div class="box'+i+' box-content"></div>');
    if(i>0){
      $('.box'+i).css('display','none');
    }

    $('.box'+i).append('<div style="text-align: center;font-size: 200%;">'+p.post_content[0].title+'</div>');
    $('.box'+i).append('<div style="padding: 10px 50px 25px 50px;"><img src="'+p.post_content[0].simple_url+'" style="width:100%;" /></div>');

    i++;
  });
  $('.ct-2').append('<button class="btn btn-sm btn-outline-dark btn-ukiyan" for="box0">#6441</button>');
  $('.ct-2').append('<button class="btn btn-sm btn-outline-dark btn-ukiyan" for="box1" style="margin-left:15px;margin-right:15px;">#602</button>');
  $('.ct-2').append('<button class="btn btn-sm btn-outline-dark btn-ukiyan" for="box2">#370</button>');

  $('.btn-ukiyan').on('click',function(){
    $('.box-content').css('display','none');
    $('.'+$(this).attr('for')).css('display','');
  });
}