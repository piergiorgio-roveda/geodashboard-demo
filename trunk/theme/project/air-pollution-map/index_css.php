<?php
$_css = array(
  array(
    "rel"=>"stylesheet",
    "name"=>"bootstrap-core-css", 
    "href"=>"https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css", 
    "integrity"=>"sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN",
    "crossorigin"=>"anonymous"
  ),
  array(
    "rel"=>"stylesheet",
    "name"=>"mapbox-v3-css", 
    "href"=>"https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css"
  ),
  array(
    "rel"=>"stylesheet",
    "name"=>"bootstrap-icons@1.11.3", 
    "href"=>"https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
  ),
  array(
    "rel"=>"stylesheet",
    "name"=>"font-gis@1.0.5", 
    "href"=>"https://viglino.github.io/font-gis/css/font-gis.css"
  ),
  array(
    "rel"=>"preconnect",
    "name"=>"fonts.googleapis.com", 
    "href"=>"https://fonts.googleapis.com"
  ),
  array(
    "rel"=>"preconnect",
    "name"=>"fonts.gstatic.com", 
    "href"=>"https://fonts.gstatic.com"
  ),
  array(
    "rel"=>"stylesheet",
    "name"=>"project-css", 
    "href"=>FLAT_URL__THEME."project/_default/css/_style.css"
  ),
  array(
    "rel"=>"stylesheet",
    "name"=>"project-css", 
    "href"=>FLAT_URL__THEME."project/_default/css/wrapper__grid.css"
  ),
  array(
    "rel"=>"stylesheet",
    "name"=>"project-css", 
    "href"=>FLAT_URL__THEME."project/_default/css/message__start.css"
  ),
  array(
    "rel"=>"stylesheet",
    "name"=>"project-css", 
    "href"=>FLAT_URL__THEME."project/_default/css/tocbox.css"
  ),
  array(
    "rel"=>"stylesheet",
    "name"=>"project-css", 
    "href"=>FLAT_URL__THEME."project/_default/css/buttons.css"
  ),
  array(
    "rel"=>"stylesheet",
    "name"=>"project-css", 
    "href"=>FLAT_URL__THEME."project/_default/css/forms.css"
  ),
  array(
    "rel"=>"stylesheet",
    "name"=>"project-css", 
    "href"=>$project_URL."css/_style.css"
  ),
);
foreach ($_css as $key => $value) {
  $integrity = "";
  if(isset($value["integrity"])){
    $integrity = 'integrity="'.$value["integrity"].'"';
  }
  $crossorigin = "";
  if(isset($value["crossorigin"])){
    $crossorigin = 'crossorigin="'.$value["crossorigin"].'"';
  }
  echo '<link href="'.$value["href"].'" rel="'.$value["rel"].'"  type="text/css" '.$integrity.' '.$crossorigin.'>
  ';
}
unset($_css, $key, $value,$integrity,$crossorigin);
?>