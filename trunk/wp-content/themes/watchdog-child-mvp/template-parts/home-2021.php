<?php
  $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
  if($lang=='it'){
    //$m1='Home';
  }
  else{
    //$m1='Home';
  }
?>
<div class="container">
  <?php get_template_part( 'template-parts/aaa_header' ); ?>
  <?php get_template_part( 'template-parts/aaa_nav' ); ?> 
</div>
<main class="container">
  <div class="p-4 p-md-5 mb-4 text-white rounded bg-dark">
    <div class="col-md-6 px-0">
      <h1 class="display-4 fst-italic">Business</h1>
      <p class="lead my-3">Online learning and teaching</p>
    </div>
  </div>
  <div class="row">
    <div class="col-md-8 blog-main">
      <h3 class="pb-3 mb-4 font-italic border-bottom">
        From Milan with core
      </h3>  
      <div class="blog-post">
        <h2 class="blog-post-title">Current open course</h2>
        <p class="blog-post-meta">January 1, 2021</p>
        <ul>
          <li><a href="https://www.cityplanner.biz/business/course-qgis-beginners">How to use QGIS for beginners</a></li>
          <li><a href="https://www.cityplanner.biz/business/course-qgis-pro">How to use QGIS like a PRO</a></li>
          <li><a href="https://www.cityplanner.biz/business/course-postgres-qgis">How to use Postgres with QGIS</a></li>
          <li><a href="https://www.cityplanner.biz/business/course-postgis-qgis">How to use PostGIS with QGIS</a></li>
          <li><a href="https://www.cityplanner.biz/business/course-wordpress-template">How to modify Wordpress template</a></li>
          <li><a href="https://www.cityplanner.biz/business/course-wordpress-plugin">How to create  a Wordpress plugin</a></li>
          <li><a href="https://www.cityplanner.biz/business/course-excel-qgis">Working with Excel in QGIS</a></li>
          <li><a href="https://www.cityplanner.biz/business/course-access-qgis">Working with Access in QGIS</a></li>
          <li><a href="https://www.cityplanner.biz/business/course-excel-macro">How to create macro for Excel</a></li>
          <li><a href="https://www.cityplanner.biz/business/course-access-macro">How to create macro for Access</a></li>
        </ul>
        <p>
        <?php
        if($lang=='it'){
          ?>
          Ciao, sono Piergiorgio, laureato in Urban planner nel 2007. Negli ultimi 15 anni ho imparato ad usare AutoCAD, 
          ArcGIS, MapInfo e QGIS, il mio preferito.<br>Conosco molto bene anche Excel, Access, PostGres e linguaggi di 
          programmazione web, che ho trovato sempre utili e posso arricchire le risposte che mi farete dopo il corso.<br>
          Ho strutturato questo corso, sulla base delle molte richieste che mi sono state fatte, da studenti alle prime armi.<br>
          Cercando di capire il motivo per cui si sono spinti a conoscere i GIS, mi sono fatto un'idea abbastanza consolidata nel tempo.<br>
          La tesi comune è la seguente: ho dei dati geografici, mi è stato detto di usare un GIS e il risultato 
          dovrà essere una PDF che comprende una mappa. Un'altra tesi, che però cambia il profilo di come sei arrivato 
          a questo corso, è quella di OpenStreetMap! Qui è più semplice, perchè se hai anche un minimo di interesse 
          per OpenStreetMap, devi conoscere anche i GIS.<br>
          <?php
        }
        else{
          ?>
          Hi, I'm Piergiorgio, graduated in Urban planner in 2007. In the last 15 years I've learned to use AutoCAD, 
          ArcGIS, MapInfo and QGIS, my favorite. I also know very well Excel, Access, PostGres and web programming 
          web programming languages, which I have always found useful and can enrich the answers you will give me after the course.<br>
          I have structured this course, based on the many requests I have received, from novice students.<br>
          Trying to understand why they were driven to learn about GIS, I've come up with a fairly well-established idea over time.<br>
          The common thesis is as follows: I have geographic data, I was told to use a GIS and the result 
          should be a PDF that includes a map. Another thesis, but one that changes the profile of how you got 
          to this course, is OpenStreetMap! It's easier here, because if you have even a modicum of interest 
          in OpenStreetMap, you need to know about GIS as well.<hr>
          <i>Translated with www.DeepL.com/Translator (free version)</i>
          <?php
        }
        ?>        
        </p>
      </div>
    </div>
    <!-- /.blog-main -->
    <aside class="d-none d-md-block col-md-4 blog-sidebar">
      <div class="p-3 mb-3 bg-light rounded">
        <h4 class="font-italic">About</h4>
        <p class="mb-0">
        <?php
        if($lang=='it'){
          ?>
          Ho iniziato con Cityplanner a fare corsi online nel 2012.<br>
          Quasi 2.000 studenti seguono questi miei corsi.<br>
          Insegno: Geographic information system, WebGIS, Wordpress, Excel and Access.<br>
          <?php
        }
        else{
          ?>
          I started with Cityplanner with online learning and teaching from 2012.<br>
          Up to 2.000 students follow my course.<br>
          Learn Geographic information system, WebGIS, Wordpress, Excel and Access.<br>
          <?php
        }
        ?>
        </p>
        <div>
          <img src="https://i.imgur.com/eaRvpH4.png" style="width:100%;margin-top: 25px;"/>
        </div>
      </div>
    </aside>
    <!-- /.blog-sidebar -->
  </div>
  <!-- /.row -->
</main>
<?php get_template_part( 'template-parts/aaa_footer' ); ?>
<?php get_template_part( 'template-parts/footer_javascript' ); ?>
<?php get_template_part( 'template-parts/script_custom' ); ?>
<?php get_template_part( 'template-parts/script_general' ); ?>