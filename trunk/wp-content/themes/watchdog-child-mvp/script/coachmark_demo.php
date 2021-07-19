<?php

  $o = json_apiInfo();
  $home_project = $o['geoInfo']['home_project'];

?>
<!--<script type="module" src="<?php echo $home_project; ?>source/coachmarkJS-master/main.js"></script>-->
<script type="module">
  import Coachmark from '<?php echo $home_project; ?>source/coachmarkJS-master/index.js'

  /*window.onload = () => {
    const demoLink = document.getElementById('js-demo')
    if(demoLink) demoLink.addEventListener('click', () => {
        new Coachmark().init()
    })
  }*/
  $(document).ready(function() {
    console.log('Ready coach');
    $('.box-sidebar-extra').addClass('__text');
    $('.box-sidebar-extra').attr('data-coachmark','0');
    $('.box-sidebar-extra').attr('data-coachmark-text','Pannello dei layer attivabili');
  });

  $('#js-demo').on('click',function(){
    new Coachmark().init();
  });

</script>
