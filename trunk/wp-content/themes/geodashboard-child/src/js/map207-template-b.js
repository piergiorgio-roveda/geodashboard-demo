function m207_ready(){
  // _onsole.log('WebGIS ready!');
  
  var source_w = $('.box-sidebar').width();
  var target_l = source_w+5;
  
  show_loading();

  alertify.set('notifier','position', 'top-right');
  
  log_tag_manager(
    'ready - view map v'+GEOLIB_VER,
    //GA - log_tag_manager - action // _onsole.log_ready_map
    'map-dashboard',//GA - log_tag_manager - label
    '0' //GA - log_tag_manager - value (optional)
  );

  $('.div-on-map').on(
    'click',
    function(ev){
      L.DomEvent.stopPropagation(ev);
    }
  ); 

  hide_loading();
}