    <div class="row g-0 container-fluid"><!-- GUTTER 0-->
      <div class="col sidebar-wrapper template-sidebar d-none d-md-flex">
        <div class="sidebar-header"><!-- HEADER-->
          <div id="box-main-logo"
            style="padding-top:10px;text-align:center;overflow: hidden;">
            <span id="main-logo"></span>
          </div>
          <div id="box-sidebar-avatar"></div>
          <div class="box-sidebar-search">
            <div class="search-cointainer-sidebar" id="search-cointainer-sidebar"></div>
            <div class="search-classic" id="search-classic"></div>
          </div>
        </div><!-- HEADER-END-->
        <div class="sidebar-content"><!-- CONTENT-->
          <div>
            <div class="box-sidebar-extra-pre d-none d-md-block"></div>
            <div class="box-sidebar-extra"></div>
            <div class="box-sidebar-info container"></div>
          </div>
        </div><!-- CONTENT-END-->
        <div class="sidebar-footer"><!-- FOOTER-->
          <div class="box-sidebar-footer-top"></div>
          <div class="box-sidebar-footer-bottom"></div>
        </div><!-- FOOTER END-->
      </div>
      <div class="col template-map"><!--MAIN-->
          <?php
            if(!empty($itemMap['g_attributes']->post_content)){
              echo '
              <div class="card box-map-welcome" style="display:none;">
                <h5 class="card-header" style="color: black!important;">'.$gVariables['map_title'].'</h5>
                <div class="card-body">
                  <h1 class="card-title">'.$itemMap['g_attributes']->post_content->title.'</h1>
                  <article>
                    <section class="card-text">   
                      '.$itemMap['g_attributes']->post_content->content.'
                    </section>
                    <div class="box-map-welcome-action" 
                      style="text-align:center;width:100%;">
                    </div>
                  </article>
                </div>
              </div>';
            }
          ?>
          <!--MAPID-->
          <div id="mapid">
            <!--LOADING-->
            <div class="loading text-center" style="display:none;">
              <div class="d-flex justify-content-center">
                <div class="spinner-grow text-secondary" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>  
            </div>
            <div class="mapid-loading"></div>
            <!--LOADING-END-->
            <!--CUSTOM-->
            <!--CUSTOM-END-->
            <!--OTHER-BOX-->
            <div class="box-addpoint div-on-map d-none d-md-block">
            </div>
            <div class="box-gpsposition div-on-map d-none d-md-block">
            </div>
            <div class="box-usrprofile div-on-map" style="display:none;"></div>
            <div class="box-editing2 box-editing2-desktop div-on-map d-none d-md-block" style="display:none;">
              <div class="col-auto ct-editing2" style="padding: 5px 0px;"></div>
            </div>
            <div class="box-editing box-editing-lyr1 row div-on-map" style="display:none;"></div>
            <div class="box-legends-btn WD-canvas-hide pointer div-on-map" style="display:none;"></div>
            <div class="legend-canvas WD-canvas WD-canvas-hide div-on-map" style="display:none;border: 1px solid #ccc;"></div>
            <div class="info-canvas div-on-map"></div>
            <!--MOBILE-->
            <div id="box-tool-top" class="d-block d-md-none div-on-map"></div>
            <div id="box-tool-bottom" class="d-block d-md-none div-on-map">
              <div id="box-tool-bottom-btn"></div>
              <div id="box-info1" style="display:none;">
                <div class="box-editing2 box-editing2-mobile" style="display:none;">
                  <div class="col-auto ct-editing2" style="padding: 5px 0px;"></div>
                </div>
              </div>
            </div>
            <!--MOBILE-->
            <div class="box-navigation div-on-map"></div>
            <div class="box-home2" style="position:fixed;top:5px;left:37px;z-index:500;"></div>
            <!--OTHER-BOX-END-->
          </div>
          <!--MAPID-END-->
          <!--POPUP-FULL-->
          <div id="popup-full" class="big-div" style="display:none;">
            <div id="popup-full-header" class="big-div-header bd-content" style="padding-left: 1.5rem!important;">
              <div class="bd-example box-popup-full-1" style="padding-top:0.5rem"></div>
            </div>
            <div id="popup-full-body" class="big-div-body"><div class="scrollableContent"><div class="paddingContent">
              <div id="popup-full-list-1">
              </div>
            </div></div></div>
            <div id="popup-full-footer" class="big-div-footer">
            </div>
          </div>
          <!--POPUP-FULL-END-->
      </div><!--MAIN END-->
    </div><!--container-fluid END-->
    <!--HTML-END-->
    <div id="moving_div" style="position:fixed;z-index:9000;color:#0032A0;font-weight:700;"></div>
 