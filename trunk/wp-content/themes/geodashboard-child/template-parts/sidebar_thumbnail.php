<h4>
<?php
if($lang=='it'){
  echo "In breve";
}
else{
  echo "In a nutshell";
}
?>          
</h4>
<img src="<?php echo $page_meta1['image'];?>" style="width:100%;" />
<p>
<?php
echo $m['description']."";
?>
</p>
<?php
if(!empty($m['code'])){
  ?>
  <p style="padding-top:5px;">REF CODE: <?php echo $m['code'];?></p>
  <?php
}
?>

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
