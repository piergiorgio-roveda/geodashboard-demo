<?php 
$description="Online learning and teaching";

$locale1="it_IT";
$locale2="en_GB";

$m=array(
  'post_type'=>'generic',
  'content_template'=>'default',
  'sidebar_template'=>'smartcontact',
  'locale1'=>$locale1,
  'locale2'=>$locale2,  
  //
  'description'=>$description,
  'contents'=>$contents,
  //
  'custom_head'=>array(/*'test'*/),  
  'custom_script'=>array(/*'test'*/),  
);
$m=dfl_custom_head($m);
$m=dfl_custom_script($m);
//$m['custom_head'][]='test';
//$m['custom_script'][]='test';   
?>
