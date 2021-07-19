<?php

function get_default_posts_list(){
  return array(
    //'api:logout',
    //'api:archive-transaction',
    //'api:archive-geo_log_plus',
    //'api:transaction-success',
    //'page:dashboard',
    //'api:generate-geovar',
    //'api:geodata',
    //'api:create-users',
    //'whatchdog_x:get-token',
    //'whatchdog_x:post-function',
  );
}

function get_default_cptuis_list(){
  return array(
    //'api',
    //'special',
    //'board_x',
    //'watchdog_x',
  );
}

function get_simple_postType(){
  return array(
    //'api','watchdog_x'
  );
}

function install_watchdog_requirements(){

  $return=array();
  $error=0;

  //f
  $cptuis=get_default_cptuis_list(); 

  foreach ($cptuis as $key => $cptui) {
    $return['my_cptui'][$cptui]['install']=true;
  }

  //f
  $default_posts_list=get_default_posts_list();

  foreach ($default_posts_list as $key => $mypost) {
    $pieces = explode(":",$mypost);
    $postTitle=$pieces[1];
    $postType=$pieces[0];
    
    //f
    $exist = install_watchdog_post_exist($postTitle,$postType);

    if($exist==1){
      $return['default_posts_list'][$mypost]['exist']=true;
      if(in_array($postType, get_simple_postType())){
        if (locate_template( array( 'template-parts/'.$postType.'-'.$postTitle.'.php' ) ) != '') {
          $return['default_posts_list'][$mypost]['php-exist']=true;
        }
        else {
          $return['default_posts_list'][$mypost]['php-exist']=false;
          $error++;
        }
      }
      else{
        if (locate_template( array( 'template-parts/part-'.$postTitle.'-footer1.php' ) ) != '') {
          $return['default_posts_list'][$mypost]['php1']['file']='template-parts/part-'.$postTitle.'-footer1.php';
          $return['default_posts_list'][$mypost]['php1']['exist']=true;
        }
        else {
          $return['default_posts_list'][$mypost]['php1']['file']='template-parts/part-'.$postTitle.'-footer1.php';
          $return['default_posts_list'][$mypost]['php1']['exist']=false;
          $error++;
        }
        if (locate_template( array( 'template-parts/part-'.$postTitle.'-row1.php' ) ) != '') {
          $return['default_posts_list'][$mypost]['php2']['file']='template-parts/part-'.$postTitle.'-row1.php';
          $return['default_posts_list'][$mypost]['php2']['exist']=true;
        }
        else {
          $return['default_posts_list'][$mypost]['php2']['file']='template-parts/part-'.$postTitle.'-row1.php';
          $return['default_posts_list'][$mypost]['php2']['exist']=false;
          $error++;
        }        
      }
    
    }
    else{
      $return['default_posts_list'][$mypost]['exist']=false;
      $error++;
    } 
  }

  if($error==0){
    $return['status']='ok';
  }
  else{
    $return['status']='ko';
  }
  $return['error']=$error;

  return $return;

}


function _CreateDefaultCategory(){

  $cat_slug='cat-default';
  $term = term_exists('Default','category',null);
  if ( is_array( $term ) ) {
    //$wpdocs_cat_id = $id['term_id'];
    //echo "Exist";
    //exit;
  }
  else{
    //echo "Don't Exist";
    //exit;
    $return[$cat_name]['exist']=false;
    //Define the category
    $cat_args = array(
      'cat_name' => 'Default',
      'category_description' => 'Category create by Watchdog',
      'category_nicename' => $cat_slug,
      'category_parent' => ''
    );
    // Create the category
    wp_insert_category($cat_args); 
  }

  create_default_posts();

}
add_action('admin_init','_CreateDefaultCategory');

/**
  * **Get Post Type and Taxonomy Code**
  * *All Custom Post Type UI Post Types*
  * All of the selectable code snippets below are useful 
  * if you wish to migrate away from Custom Post Type UI 
  * and retain your existing registered post types 
  * or taxonomies.
  */
   
function cptui_register_my_cpts() {

	/**
	 * Post Type: GEO-APIs.
	 */

  //f
  $cptuis=get_default_cptuis_list(); 


  foreach ($cptuis as $key => $cpt) {
    # code...

    $name_default='GEO-'.strtoupper($cpt).'s';
    $singular_default=strtoupper($cpt);
    $labels_default = [
      "name" => __( $name_default, "underscores" ),
      "singular_name" => __( $singular_default, "underscores" ),
    ];
    $supports_default = [ "title", "author" ];

    if($cpt=='api'){
      $name='GEO-APIs';
      $singular='API';
      $icon='dashicons-carrot';
      $labels = [
        "name" => __( $name, "underscores" ),
        "singular_name" => __( $singular, "underscores" ),
      ];
      $supports=$supports_default;
    }
    elseif($cpt=='special'){
      $name=$name_default;
      $singular=$singular_default;
      $icon='dashicons-location-alt';
      $labels = $labels_default;
      $supports=$supports_default;
    }
    elseif($cpt=='credits'){
      $name=$name_default;
      $singular=$singular_default;
      $icon='dashicons-cart';
      $labels = $labels_default;
      $supports=$supports_default;
    }
    elseif($cpt=='board_x'){
      $name=$name_default;
      $singular=$singular_default;
      $icon='dashicons-analytics';
      $labels = $labels_default;
      $supports=[ "title", "editor", "thumbnail" ];
    }
    else{
      $name=$name_default;
      $singular=$singular_default;
      $icon='dashicons-carrot';
      $labels = $labels_default;
      $supports=$supports_default;
    }
    

    $args = [
      "label" => __( $name, "underscores" ),
      "labels" => $labels,
      "description" => "",
      "public" => true,
      "publicly_queryable" => true,
      "show_ui" => true,
      "show_in_rest" => false,
      "rest_base" => "",
      "rest_controller_class" => "WP_REST_Posts_Controller",
      "has_archive" => false,
      "show_in_menu" => true,
      "show_in_nav_menus" => true,
      "delete_with_user" => false,
      "exclude_from_search" => true,
      "capability_type" => "post",
      "map_meta_cap" => true,
      "hierarchical" => false,
      "rewrite" => [ "slug" => $cpt, "with_front" => true ],
      "query_var" => true,
      "menu_icon" => $icon,
      "supports" => $supports,
      "taxonomies" => [ "category", "post_tag" ],
    ];

    register_post_type( $cpt, $args );

  }

}

add_action( 'init', 'cptui_register_my_cpts' );

function create_default_posts(){

  global $user_ID;
  
  $cat_name='cat-default';
  $term = term_exists('Default','category',null);
  if ( is_array( $term ) ) {
    $cat_id = $term['term_id'];
    //echo "Category ID:".$cat_id;
    //exit;
  }
  else{
    echo "Category ".$a."don't exist";
    exit;
  }

  //f
  $posts_list=get_default_posts_list();

  foreach ($posts_list as $key => $mypost) {
    $pieces = explode(":",$mypost);
    $postTitle=$pieces[1];
    $postType=$pieces[0];
    $exist = install_watchdog_post_exist($postTitle,$postType);
    if ($exist==0) {
      
      $new_post = array(
        'post_title' => $postTitle,
        'post_content' => '',
        'post_status' => 'publish',
        'post_date' => date('Y-m-d H:i:s'),
        'post_author' => 1,
        'post_type' => $postType,
        'post_category' => array($cat_id)
      );
    
      $post_id = wp_insert_post($new_post);
      if(in_array($postType, get_simple_postType())){
        update_field('field_5813c0f1b9e59',$postType.'-'.$postTitle, $post_id );
      }
      else{
        update_field('field_additional-row','part-'.$postTitle.'-row1', $post_id );
        update_field('field_additional-footer','part-'.$postTitle.'-footer1', $post_id );
      }
    }

  }

  //return $return;
}

function install_watchdog_post_exist($postTitle,$postType){
  global $wpdb;
  $sql="
    SELECT 
      ID
    FROM {$wpdb->posts}
    WHERE post_title = %s
    AND post_type = %s";
  $query = $wpdb->prepare(
    $sql,
    array(
      $postTitle,
      $postType
    )
  );
  $wpdb->query( $query );

  if ( $wpdb->num_rows ) {
    $exist=1;
  }
  else{
    $exist=0;
  }
  return $exist;
}