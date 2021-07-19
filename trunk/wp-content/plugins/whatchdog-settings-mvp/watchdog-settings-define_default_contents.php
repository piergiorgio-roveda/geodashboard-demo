<?php
function watchdog_default_key(){
  
    $arr=array('qgis','postgis','geoblog');
  
    return $arr;
  
  }

function watchdog_default_key_decriptions(){
  
  $arr=array(
    'qgis'=>array(
      '<a href="https://qgis.org/en/site/" target="_blank">QGIS</a> is 
      a free and open-source cross-platform desktop 
      geographic information system (GIS) application that 
      supports viewing, editing, and analysis of geospatial data.
      From <a href="https://en.wikipedia.org/wiki/QGIS" target="_blank">
      Wikipedia, the free encyclopedia</a>.',
    ),
    'postgis'=>array(
      '<a href="https://postgis.net/" target="_blank">POSTGIS</a> is 
      an open source software program that adds 
      support for geographic objects to the PostgreSQL 
      object-relational database. PostGIS follows the Simple 
      Features for SQL specification from the Open Geospatial Consortium (OGC).
      From <a href="https://en.wikipedia.org/wiki/PostGIS" target="_blank">
      Wikipedia, the free encyclopedia</a>.',
    ),
    'geoblog'=>array(
      'Gestione delle informazioni geografiche per ogni articolo, foto o nota che scrivi: ecco cosa fa un geoBlog Wordpress..',
    ),    
  );

  return $arr;

}

