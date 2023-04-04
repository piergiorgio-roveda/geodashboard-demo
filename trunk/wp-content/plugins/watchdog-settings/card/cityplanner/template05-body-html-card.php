<div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
  <header class="mb-auto">
    <div>
      <h3 class="float-md-start mb-0">
        <img alt="<?php echo $g_map_title;?>"
          src="<?php echo $g_DFL_LOGO_OWNER_BASE;?> " style="width:60px;height:auto;" />
      </h3>
      <?php
      include(ABSPATH.THEME_PATH.'/template-part/cityplanner/template05-body-html-main-nav.php');
      ?>          
    </div>
  </header>
      <main class="px-3">

        <div class="s-cp1-main-msg"
          style="margin-left:0px;margin-right:0px;width:100%;">
          <p><?php echo $itemMap["g_attributes"]->description;?></p>
        </div>   

        <!--<span>
          <img src="https://www.cityplanner.biz/source/img/
            background-home-220725.png" />
        </span>-->

        <h1><?php echo $g_map_title;?></h1>
        <article style="padding-bottom: 25px;">
            
          <?php
            foreach ($itemMap['post_content'] as $key => $content) {
              # code...
              ?>
              <section name="section-<?php echo $content->g_slug;?>">
                <?php 
                echo "<h2>".$content->title."</h2>";
                echo $content->content;

                if(!empty($content->child)){
                  foreach ($content->child as $k2 => $child) {
                    # code...
                    //print_r($child);
                    // $child = json_decode($json, true);

                    ?>
                    <div name="sub-section" 
                      style="text-align: left;margin-top:15px;">
                      <?php 

                      if(!empty($child->image)){
                        echo "<div 
                          style='float: left; margin-right:15px;'>
                          <img src='".$child->image."' style='max-width:250px;' />
                        </div>";
                      }                      
                      if(!empty($child->text)){
                        echo "<div>".$child->text."</div>";
                      }
                      
                      ?>
                    </div>
                    <div class="clearfix"></div>
                    <?php
                  }
                }
                ?>
              </section>
              <?php
            }
          ?>

        </article>     
      </main>

      <?php
      include(ABSPATH.THEME_PATH.'/template-part/cityplanner/template05-body-html-footer.php');
      ?>  

    </div>