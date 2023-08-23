// --

var dyn_functions = [];
var dyn_mapclick = [];
var dyn_zoomend = [];
var dyn_zoomstart = [];
var dyn_lyr_discover = [];
var dyn_template_by_slug = [];
var dyn_on_ready = [];
var dyn_legends = [];

var list_mapclick = [];
var list_mapclick_default = [];
var list_menu = [];
var list_zoomend=[];
var list_zoomstart=[];
var list_legends=[];
var list_on_ready=[];
var list_f_mapbox=[];
var list_players = {"features" :[]}
var list_players_position = {"features" :[]}
var list_MapByToken = {"features" : []}
var list_creditExtend=[];
var list_loading=[];
var list_mvt_visibility=[];
var list_dlg_logo=[];

var cmp_a;
var cmp_b;
var cmp_c;
var cmp_d;
var cmp_e;
var cmp_f;
var diff_ab;
var diff_bc;
var diff_cd;
var diff_de;
var diff_ef;

var dlg_template = [];
var dlg_field_template = [];

var dMap = new Array();
var dataStringPost = new Array();
var dataString = new Array();
var responseString = new Array();
var params = new Array();
var maps = new Array();
var sld_body = new Array();
var pin_address = new Array();
var locationIcon1 = new Array();
var f_wait = new Array();
var geovar_table_exists = new Array();
var geovar_table_schema = new Array();
var installation_tables = new Array();
var lastWmsUrl = new Array();
var lastWmsOpt = new Array();

var g_meta = [];
var gLang = [];//geovar.language_webapp.en_GB;
var geo_lyr = [];
var geo_lyr_style=[];
var geo_lyr_onClick=[];
//var t@his_lyr = [];
var this_tb = [];
var this_watchlist = [];
var dlg_close_functions = [];
var f_btn = [];
var g_meta_list=[];
var g_meta_project_list=[];
var m244_lyrs=[];
var geohash_view = [];

var mapbox_load = false;
var main_menu_ready = false;

if(typeof HOME_PROJECT === "undefined"){
  console.error('HOME_PROJECT is undefined!')
}
var source_icon = HOME_PROJECT+'source/icon/';
var source_mvt = HOME_PROJECT+'/api/mvt.php?z={z}&x={x}&y={y}&';
var user_token = '0x0';
var user_email = '0@0';
var m211_mapRotation = 'disabled';
var m211_mapLibrary = 'leafletjs';
var m211_mapPitch = '2D';
var mapitem='session mapitem';
var mymap;

list_zoomstart.push('toc_zoomstart');
list_zoomend.push('toc_zoomend');

f_wait.watchlist=0;
// f_wait.geovar_user=0;
f_wait.geovar_user = 1;
f_wait.geovar_access = 0;
f_wait.table_schema=0;
f_wait.table_schema2=0;
f_wait.btn_profile=0;
f_wait.boxSidebarFooter=0;

f_wait.decode_data=0;
f_wait.decode_data_lyr_prodotto_a=0;
f_wait.decode_data_lyr_societa_a=0;

g_meta.geovar_user = {"features" : []}
g_meta.geovar_access = {'features':[]};
g_meta.geovar_addon = {'features':[]};
g_meta.geovar_generic_option = new Array();

let user_properties = {
  'properties':{
    "user_id": 0,
    "user_role": ["guest"],
    "user_token": "0x0",
    "watchlist": "",
    "user_email": "0@0"
  }
}
if(typeof mapuser_meta != "undefined"){
  // mapuser_meta[0].test = 'pippo';
  user_properties = {
    'properties':mapuser_meta[0]
  }
}
g_meta.geovar_user.features.push(user_properties);
user_properties = undefined; //reset user_properties

localStorage.geo_activate = 0;

let p = g_meta.geovar_user.features[0].properties;
if(localStorage.getItem('user_token') === null){
  localStorage.user_token = p.user_token;
}
else{
  if(localStorage.user_token != p.user_token){
    console.log('`user_token` is different in `localStorage`!');
  }
}
if(localStorage.getItem('user_email') === null){
  localStorage.user_email = p.user_email;
}
else{
  if(localStorage.user_email != p.user_email){
    console.log('`user_email` is different in `localStorage`!');
  }
}
if(p.user_id==0){
  sessionStorage.access_status = 0;
}
else{
  sessionStorage.access_status = 1;
}
p = undefined; //reset p

sessionStorage.scalecontrol=0;
sessionStorage.scaleratio=0;

// reset localStorage
localStorage.removeItem('ws_details_table_name');
localStorage.removeItem('ws_menu__details--current');
localStorage.removeItem('shop_token');

// onsole.log('list_basemap',list_basemap)

if(typeof list_basemap === "undefined"){
  console.log('list_basemap is undefined!')
  list_basemap = [
    "lyr040",
    "lyr038"
  ];
}
else{
  // onsole.log('list_basemap defined!')
}

// //--MAIN
// 'map202-base',

dMap.logout = 0;
dMap.editItemStatus = 'false';
dMap.current_tab = 0;
dMap.show_closed = 0;
dMap.tmp_closing_date = null; // use `na` for not available
dMap.tmp_opening_date = null; // use `na` for not available
dMap.accuracy=0;

dMap.map=new Array();

dMap.usr=new Array();
dMap.usr.lat=0;
dMap.usr.lng=0;

dMap.place=new Array();
dMap.place.google_route='nd';
dMap.place.google_street_number = 'nd';
dMap.place.google_address_ok = 'nd';

dMap.analisi01=new Array();
//dMap.start_lyr_visible=new Array();
dMap.analisi01.grLyr=[]; // all lyr for feature group
dMap.analisi01.grLyrToc=[]; // all lyr (in order) for TOC
dMap.analisi01.grWms=[]; // all WMS lyr
dMap.analisi01.grTheme=['lyr023','lyr025']; // all exclusive lyr
dMap.analisi01.legends=new Array();
dMap.analisi01.legends.toogle='is-open';

dMap.apiInfo=new Array();
dMap.apiInfo.user_token = localStorage.user_token;

// defined in `/script/template-g_variables-js/`
// but deprecated!
dMap.apiInfo.usr_set=USR_SET;
dMap.apiInfo.user_login=user_login;

dMap.checkfile=new Array();
dMap.checkfile.tab4=0;
dMap.checkfile.tab5=0;
dMap.checkfile.tab6=0;

var dflSldColor = {
  "red" : "#FF0000",
  "green" : "#00FF00",
  "lightgreen" : "#90EE90",
  "darkgreen" : "#006400",
  "blue" : "#0000FF",
  "blu" : "#0000FF",
  "lightblue" : "#ADD8E6",
  "darkblue" : "#00008B", 
  "yellow" : "#FFFF00",
  "lightyellow":"#fcfc83",
  "cyan" : "#00FFFF",
  "magenta" : "#FF00FF",
  "lightmagenta" : "#FF69B4",
  "black" : "#000000",
  "white" : "#FFFFFF", 
  "gray" : "#808080",
  "grey" : "#808080",
  "darkgray" : "#A9A9A9",
  "darkgrey" : "#A9A9A9",
  "brown" : "#A52A2A",
  "violett" : "#EE82EE",
  "violet" : "#EE82EE",
  "orange" : "#FFA500"
};
