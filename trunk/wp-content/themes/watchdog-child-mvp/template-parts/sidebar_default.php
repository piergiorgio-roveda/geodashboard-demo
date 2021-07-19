<h4 class="font-italic">
<?php
if($lang=='it'){
  echo "Chi sono";
}
else{
  echo "About";
}
?>          
</h4>
<iframe width="100%" height="200" 
  src="https://www.youtube.com/embed/0sdKVdaIvd0" 
  title="YouTube video player" frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; 
  encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen></iframe>
  <?php
$default_key_decriptions=watchdog_default_key_decriptions();
$default_key=watchdog_default_key();
$mystring = $slug;
$found=0;
foreach ($default_key as $value) {
  if($found==0){
    $findme   = $value;
    $pos = strpos($mystring, $findme);
    if ($pos === false) {
    }
    else {
      echo $default_key_decriptions[$findme][0]."";
      $found=1;
    }    

  }
}

?>  