<h4 class="font-italic">
<?php
if($lang=='it'){
  echo "Contatto";
}
else{
  echo "Contact";
}
?>          
</h4>
<div style="font-size: 75%;">
<?php
  $m_tmp=$m;
  include(locate_template( array( 'meta/contact/aaa_page.php' )));
  $m_sidebar=$m;
  $m=$m_tmp;
  echo $m_sidebar['contents'][0];
?>
</div>