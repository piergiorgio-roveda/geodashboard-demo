g_meta.geovar_generic_option = new Array();

function tmp_meta_ready(){
  
  add_tmp_meta();

}

function add_tmp_meta(){

  //g_meta.geovar_dialog is update from DB
  //but to customize can push this array
  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'Map click test',
      'g_slug': 'isochrone_test'+'_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'Choose Map',
      'g_slug': 'addon220_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  var meta = {
    'properties':{
      'g_description': null,
      'g_label': '<!--MENU-->',
      'g_slug': 'menu_sidebar_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'Choose Lyr',
      'g_slug': 'addon221_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'Add post',
      'g_slug': 'wiki_add_post_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'Scelta foglio/particella',
      'g_slug': 'addon223_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'Ispeziona foglio/particella',
      'g_slug': 'addon223_inspect_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'Certificato Destinazione Urbanistica',
      'g_slug': 'addon223_cdu_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'Stampa personalizzata',
      'g_slug': 'a226_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'Ispeziona da mappa',
      'g_slug': 'addon225_inspect_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'Documentazione disponibile',
      'g_slug': 'btn_credit_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'no title',
      'g_slug': 'btn_housenumber_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'Map settings',
      'g_slug': 'btn_settings_map_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'Manage Map layers',
      'g_slug': 'm244_field_MapLyrs_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  var meta = {
    'properties':{
      'g_description': null,
      'g_label': 'Insert ...',
      'g_slug': 'vlyr007_2_single',
      'g_template': 'template_by_slug',
    }
  }
  g_meta.geovar_dialog.features.push(meta);

  //--

  var meta = {
    'properties':{
      "g_slug": "label_menu_sidebar",
      "g_label": "Menù"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_page_dashboard",
      "g_label": "Dashboard"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_page_geodata",
      "g_label": "Geodata"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_page_map",
      "g_label": "Maps"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_page_explorer",
      "g_label": "Explorer"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_page_monster",
      "g_label": "Monster"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "url_page_dashboard_0x1",
      "g_label": ""
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "url_page_explorer_0x1",
      "g_label": "explorer"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "url_page_map_0x1",
      "g_label": "map"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "url_page_monster_0x1",
      "g_label": ""
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_menu_list_map",
      "g_label": "Show map catalog"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_menu_list_lyr",
      "g_label": "Manage layers"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_btn_add",
      "g_label": "Add"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_wiki_radio_type",
      "g_label": "Choose post type"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_btn_miner",
      "g_label": "<i class=\"fa fa-th\" aria-hidden=\"true\"></i>"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_visualizza",
      "g_label": "VISUALIZZA"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_stampa",
      "g_label": "STAMPA"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_reset_icon",
      "g_label": "<i class=\"fa fa-eraser\" aria-hidden=\"true\"></i>"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_inspect",
      "g_label": "ISPEZIONA"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;
  
  var meta = {
    'properties':{
      "g_slug": "label_compose",
      "g_label": "COMPONI"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;
  
  var meta = {
    'properties':{
      "g_slug": "label_cdu",
      "g_label": "C.D.U."
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;
  
  var meta = {
    'properties':{
      "g_slug": "label_cdu_request",
      "g_label": "Crea C.D.U."
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;
  
  var meta = {
    'properties':{
      "g_slug": "label_cdu_print",
      "g_label": "Stampa"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;
  
  var meta = {
    'properties':{
      "g_slug": "label_cdu_view_input",
      "g_label": "Visualizza campi"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_btn_housenumber",
      "g_label": "<i class=\"fa fa-building-o\" aria-hidden=\"true\"></i>"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_btn_infolus",
      "g_label": "<i class=\"fa fa-info\" aria-hidden=\"true\"></i>"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_btn_print",
      "g_label": "<i class=\"fa fa-print\" aria-hidden=\"true\"></i>"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_btn_graphics",
      "g_label": "<i class=\"fa fa-map-pin\" aria-hidden=\"true\"></i>"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_btn_addon225_by_point",
      "g_label": "<i class=\"fa fa-map-pin\" aria-hidden=\"true\"></i>"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_btn_addon225_by_polyline",
      "g_label": "<i class=\"fa fa-sliders\" aria-hidden=\"true\"></i>"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_btn_addon225_by_polygon",
      "g_label": "<i class=\"fa fa-object-ungroup\" aria-hidden=\"true\"></i>"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_btn_close_icon",
      "g_label": "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_btn_credit_en",
      "g_label": "Documentation"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_btn_a233_save",
      "g_label": "SAVE"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;

  var meta = {
    'properties':{
      "g_slug": "label_btn_menu_mobile2",
      "g_label": "<i class=\"fa fa-bars\" aria-hidden=\"true\"></i>"
    }
  }
  gLang[meta.properties.g_slug]=meta.properties.g_label;
  //--

  var meta = {
    'properties':{
      "g_slug": "btn_menu_sidebar",
      "g_label": "label_menu_sidebar",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_open_page_dashboard",//"btn_0x1_page_dashboard",
      "g_label": "label_page_dashboard",//"label_0x1_page_dashboard",
      "g_group": ["page_dashboard_0x1"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": 'btn_sidebar_menu_go',
      "g_responsive": "both",
      "g_style": "btn-sm btn-light col-12"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_open_page_geodata",
      "g_label": "label_page_geodata",
      "g_group": ["page_geodata_0x1"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": 'btn_sidebar_menu_go',
      "g_responsive": "both",
      "g_style": "btn-sm btn-light col-12"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_open_page_map",
      "g_label": "label_page_map",
      "g_group": ["page_map_0x1"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": 'btn_sidebar_menu_go',
      "g_responsive": "both",
      "g_style": "btn-sm btn-light col-12"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_open_page_explorer",
      "g_label": "label_page_explorer",
      "g_group": ["page_explorer_0x1"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": 'btn_sidebar_menu_go',
      "g_responsive": "both",
      "g_style": "btn-sm btn-light col-12"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_open_page_monster",
      "g_label": "label_page_monster",
      "g_group": ["page_monster_0x1"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": 'btn_sidebar_menu_go',
      "g_responsive": "both",
      "g_style": "btn-sm btn-light col-12"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_menu_list_map",
      "g_label": "label_menu_list_map",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_menu_list_lyr",
      "g_label": "label_menu_list_lyr",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_wiki_add",
      "g_label": "label_btn_add",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_save_wiki",
      "g_label": "label_btn_save",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "wiki_radio_type",
      "g_label": "label_wiki_radio_type",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v0",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_options": [
        {"value":"type-txt","label":"Only text"},
        {"value":"type-img","label":"Image"},
        {"value":"type-internal","label":"Sub page"},
        {"value":"type-custom","label":"Custom JS"},
        {"value":"type-external","label":"External link"}
      ],
      //"g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_miner",
      "g_label": "label_btn_miner",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_addon223_view",
      "g_label": "label_visualizza",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_addon223_p2_badge_reset",
      "g_label": "label_reset_icon",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_addon223_block_reset",
      "g_label": "label_reset_icon",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_addon223_block_inspect",
      "g_label": "label_inspect",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_addon223_compose",
      "g_label": "label_compose",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_addon223_cdu",
      "g_label": "label_cdu",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_addon223_cdu_request",
      "g_label": "label_cdu_request",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_addon223_cdu_print",
      "g_label": "label_cdu_print",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_addon223_cdu_view_input",
      "g_label": "label_cdu_view_input",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_housenumber",
      "g_label": "label_btn_housenumber",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_infolus",
      "g_label": "label_btn_infolus",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_print",
      "g_label": "label_btn_print",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_graphics",
      "g_label": "label_btn_graphics",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_addon225_by_point",
      "g_label": "label_btn_addon225_by_point",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_addon225_by_polyline",
      "g_label": "label_btn_addon225_by_polyline",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_addon225_by_polygon",
      "g_label": "label_btn_addon225_by_polygon",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_addon225_by_close",
      "g_label": "label_btn_close_icon",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);


  var meta = {
    'properties':{
      "g_slug": "btn_addon225_block_inspect",
      "g_label": "label_inspect",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_addon225_compose",
      "g_label": "label_compose",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_a226_print",
      "g_label": "label_stampa",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_credit_en",
      "g_label": "label_btn_credit_en",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_a233_save",
      "g_label": "label_btn_a233_save",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_m244_field_MapLyrs",
      "g_label": null,
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": 'fa-arrows-alt',
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

  var meta = {
    'properties':{
      "g_slug": "btn_menu_mobile2",
      "g_label": "label_btn_menu_mobile2",
      "g_group": ["public"],
      "g_description": "...",
      "g_template": "v2",
      "g_faw": null,
      "g_callback": null,
      "g_responsive": "both",
      "g_style": "btn-sm btn-outline-dark btn-main-sidebar"
    }
  }
  g_meta.geovar_button.features.push(meta);

}

var meta = {
  'properties':{
    "g_slug": "type-txt",
    "g_cols": [
      get_form_field_options('title'),
      get_form_field_options('content')
    ]
  }
}
g_meta.geovar_generic_option.push(meta);

var meta = {
  'properties':{
    "g_slug": "type-img",
    "g_cols": [
      get_form_field_options('title'),
      get_form_field_options('image_url')
    ]
  }
}
g_meta.geovar_generic_option.push(meta);

var meta = {
  'properties':{
    "g_slug": "type-internal",
    "g_cols": [
      get_form_field_options('title'),
      get_form_field_options('simple_url')
    ]
  }
}
g_meta.geovar_generic_option.push(meta);

var meta = {
  'properties':{
    "g_slug": "type-custom",
    "g_cols": [
      get_form_field_options('title'),
      get_form_field_options('content'),
      get_form_field_options('custom_js')
    ]
  }
}
g_meta.geovar_generic_option.push(meta);

var meta = {
  'properties':{
    "g_slug": "type-external",
    "g_cols": [
      get_form_field_options('title'),
      get_form_field_options('simple_url')
    ]
  }
}
g_meta.geovar_generic_option.push(meta);

function get_form_field_options(g_slug){

  let options = [
    {
      "g_slug":"title",
      "g_label":"Title",
      "g_type":"text",
      "g_placeholder":"Visible everywhere ..."
    },
    {
      "g_slug":"content",
      "g_label":"Content",
      "g_type":"textarea",
      "g_placeholder":"..."
    },
    {
      "g_slug":"image_url",
      "g_label":"Image url",
      "g_type":"text",
      "g_placeholder":"https://image.jpg"
    },
    {
      "g_slug":"simple_url",
      "g_label":"Link URL",
      "g_type":"text",
      "g_placeholder":"https://"
    },
    {
      "g_slug":"custom_js",
      "g_label":"file-name without .js",
      "g_type":"fieldplus",
      "g_placeholder":"custom_js1"
    }
  ]

  let obj=options.filter((p) => p.g_slug ===g_slug)[0];

  return obj;

}