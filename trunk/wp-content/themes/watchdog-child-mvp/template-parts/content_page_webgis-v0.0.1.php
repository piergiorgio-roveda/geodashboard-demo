<?php
/* 
CONTENT TEMPLATE
page_mappa-milano-2020
*/

$language_webapp=watchdog_language_webapp();
foreach ($language_webapp as $key => $value) {

  if($value['codice']=='logo_client_generic'){
    $label_main_logo=$value['etichetta'];
  }
}

$o = json_apiInfo();

?>
<div class="sidebar-m" style="position: fixed;
    top: 0px;
    left: 0px;
    z-index: 5000;
    background-color: #fffffff7;
    width: 100%;
    display:none;
    height: 100%;">
  <div class="box-sidebar-extra-m" style="margin-top: 75px;
    margin-bottom: 25px;">

  </div>
  <div class="box-sidebar-extra-m-footer" style="    
    text-align: center;
    position: fixed;
    bottom: 15px;
    width: 100%;">
    <button class="box-fulls 
      btn btn-sm btn-footer btn-footer-current">
      <span class="align-middle"><i class="fa fa-arrows-alt" aria-hidden="true"></i></span></button>
    &nbsp;<button class="box-logout 
      btn btn-sm btn-footer btn-footer-current">
      <span class="align-middle label_logout"></span></button>
    &nbsp;<button class="btn-chiudi-sidebar-m 
      btn btn-sm btn-footer btn-footer-current">CHIUDI</button>
  </div>  
</div>
<!--box-sidebar-extra-->
<div class="container-fluid">
  <div class="row">
    <div class="box-sidebar d-none d-sm-none d-md-block" 
      style="width:256px;float:left;">
      <div class="col-xs-12 col align-self-center text-center" 
        style="padding-top:15px;">
        <a href="<?php echo WP_SITEURL;?>">
          <img src="<?php echo $output['geoInfo']['home_project'].'source/img/'.$label_main_logo;?>" style="height:80px;" />
          </a>
      </div>
      <div id="search-cointainer" class="row" 
        style="margin:0px;padding-bottom:5px;">

      </div><!--search-cointainer-->
      <div class="box-sidebar-extra-pre">
        
      </div><!--box-sidebar-extra-->      
      <div class="box-sidebar-extra">

      </div><!--box-sidebar-extra-->
      <div class="box-sidebar-info">
        <div class="box-editing box-editing-lyr1 row div-on-map">
        </div>
      </div><!--box-sidebar-info-->
      <div class="box-sidebar-footer text-center" 
        style="display:none;position:absolute;">
        <div name="credit" class="box-credit" style="cursor:pointer;">
          <div class="sbFooterBoxIcon d-flex align-items-center 
            justify-content-center" style="float:left;">
            <span class="align-middle">
              <i id="js-demo" class="fa fa-book" aria-hidden="true"></i>
          </div>
          <div class="sbFooterBoxLabel d-flex align-items-center" 
            style="text-align:left;">
            <span class="align-middle doc_credit_text"></span>
          </div>
        </div>  
        <div name="logout" class="box-logout" style="cursor:pointer;">
          <div class="sbFooterBoxIcon d-flex align-items-center 
            justify-content-center" style="float:left;">
            <span class="align-middle">
              <i class="fa fa-power-off" aria-hidden="true"></i></span>
          </div>
          <div class="sbFooterBoxLabel d-flex align-items-center" 
            style="text-align:left;">
            <span class="align-middle label_logout"></span>
          </div>
        </div>
        <div class="box-azienda">
          <div class="sbFooterBoxIcon d-flex align-items-center 
            justify-content-center" style="float:left;padding-top: 3px;">
            <span class="align-middle">
              <img class="logo_webmaster_pro" src="" style="width:20px;" />
            </span>
          </div>
          <div class="sbFooterBoxLabel d-flex align-items-center" 
            style="text-align:left;">
            <span class="align-middle geoinfo_azienda"></span>
          </div>
        </div>
      </div><!--box-sidebar-footer-->
    </div>
    <main style="width:0px;padding-right:0px;padding-left:0px;">
      <div id="mapid" style="display:none;">
        <div class="loading text-center" style="display:none;">
          <div class="d-flex justify-content-center">
            <div class="spinner-grow text-secondary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>  
        </div>
        <div class="box-gpsposition div-on-map">
          <button name="btn_gpsposition" class="btn-gpsposition">
            <i class="material-icons">gps_off</i>
          </button>
        </div>
        <!--<div class="box-usrprofile div-on-map">
          <button name="btn_usrprofile" class="btn-usrprofile">
            <i class="material-icons">manage_accounts</i>
          </button>
        </div>-->
        <div class="box-editing2 box-editing-lyr0 row div-on-map">
        </div>
        <!--<div class="box-editing box-editing-lyr1 row div-on-map">
        </div>-->
        <div class="box-legends-btn WD-canvas-hide pointer div-on-map">
          <button name="btn_legends" class="btn-legends">
            <i class="fa fa-th-list WD-text-primary" aria-hidden="true"></i>
          </button>
        </div>
        <div class="legend-canvas WD-canvas WD-canvas-hide div-on-map">
          <div class="legend-canvas-header">
            <div class="legend-canvas-title"></div>  
            <div class="legend-canvas-toogle">
              <i class="fa fa-times WD-text-primary pointer" aria-hidden="true"></i>
            </div>
            <div class="clearfix"></div>
            <div class="legend-canvas-body"></div>     
          </div>
        </div>
        
        <div class="box-navigation WD-GUI-desktop div-on-map">
          <button name="btn_zoomin"
            class="btn btn-sm btn-primary-map btn-navigation btn-zoomin">
            <i class="fa fa-plus" aria-hidden="true" style="color:black;"></i>
          </button>
          <br>
          <button name="btn_zoomout"
            class="btn btn-sm btn-primary-map btn-navigation btn-zoomout">
            <i class="fa fa-minus" aria-hidden="true" style="color:black;"></i>
          </button>
          <br>
          <!--<button title="crea nuovo agente" name="btn_add_lyr0"
            class="btn btn-sm btn-primary-map btn-navigation btn-map-navigation btn-add-lyr0"
            style="display:none;">
            <img class="img-btn" src="<?php echo $o['home_project'];?>/source/icon/noun_location%20mark%20add%20to_2165244.svg">
          </button>    
          <br>
          <button title="modifica area agente simulazione" name="btn_edit_lyr1"
            class="btn btn-sm btn-primary-map btn-navigation btn-map-navigation btn-edit-lyr1"
            style="display:none;">
            <img class="img-btn" src="<?php echo $o['home_project'];?>/source/icon/noun_select_300397-select-byRflor-from-theNounProject.svg">
          </button>-->                  
        </div>

      </div><!--mapid-->

      <div class="box-searchbox box-searchbox-sm div-on-map"
        style="display:none;">
        <div class="sandwich-menu">
          <button class="btn-sandwich-menu"><i class="fa fa-bars" aria-hidden="true"></i></button>
        </div>
        <div class="box-input-address-search"><div id="search-cointainer-sm"></div></div>
      </div>

    </main>
  </div>
</div><!--container-fluid-->
<?php 
if(count($m['custom_script'])>0){
  foreach ($m['custom_script'] as $value) {
    # code...
    include(locate_template( array( 'script/'.$value.'.php' )));
  }
}            
?>
