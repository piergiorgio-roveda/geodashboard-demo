<?php
  //$o=json_apiInfo();
  //$google_api = GOOGLE_API_SEARCH_AND_MAP;
  //$info_tracker=get_info_tracker();
?>


<script>

// A $( document ).ready() block.
$( document ).ready(function() {
  console.log( "ready!" );
  var randomChr = [
    'Fenris Reade',
    'Ian Dowe',
    'Fenris Ducote',
    'Lincoln Kingston',
    'Carter Tower from <br> 45.41795591, 9.12448064',
    'Matias Kniffin from <br> 45.52611669, 9.144455',
    'Owen Lien from <br> 45.51435492, 9.20684773',
    'Wagner Solari from <br> 45.41135057, 9.21374445',
    'Lachlan Nesheim from <br> 45.39769081, 9.12458722',
    'Viktor Watanabe from <br> 45.44852487, 9.26435647',
    'Brom Jackstadt from <br> 45.42998841, 9.26368959',
    'Cory Calder from <br> 45.42356018, 9.08525629',
    'Taylor Catlow from <br> 45.53085229, 9.15324388',
    'Taliesin Calder from <br> 45.49876153, 9.17417546',
    'Glen Weyer from <br> 45.43674141, 9.21177925',
    'Warrick Alegre from <br> 45.5371444, 9.08929194',
    'Xander Steward from <br> 45.51568777, 9.08417445',
    'Vance Mattix from <br> 45.3985469, 9.10331876',
    'Anton Wildner from <br> 45.50793126, 9.15586868'
  ];
  if($(window).width() >= 768) {
    alertify.notify('Hi ' 
      + randomChr[Math.floor(Math.random() * 18)] 
      + '<br><?php echo $ip;?>', 
      'success', 
      5, 
      function(){  
      //console.log('dismissed'); 
    });
  }
});

</script>