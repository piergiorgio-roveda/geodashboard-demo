<?php
$social=watchdog_social_statistic();
$sociali_url=watchdog_social_url();
?>

<p>
YouTube: <?php echo end($social['youtube']['sub­scribers']); ?> 
Sub­scribers 
<a href="<?php echo $sociali_url['youtube']; ?> " target="_blank">
  <i class="fa fa-external-link" aria-hidden="true"></i>
</a>
</p>