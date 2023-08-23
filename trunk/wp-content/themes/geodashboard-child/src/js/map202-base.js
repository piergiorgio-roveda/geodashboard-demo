var mapitem='session mapitem';
// _onsole.log('mapitem:'+mapitem);

localStorage.geo_activate = 0;

var dMap = new Array();
var dataStringPost={};
var dataString={};
var responseString={};
var params={};
dMap.map=new Array();
dMap.usr=new Array();
dMap.place=new Array();
dMap.analisi01=new Array();
//dMap.start_lyr_visible=new Array();

var maps = new Array();

var sld_body = new Array();

geo_lyr=[];
geo_lyr_style=[];
geo_lyr_onClick=[];

//all lyr for feature group
dMap.analisi01.grLyr=[];

//all lyr (in order) for TOC
dMap.analisi01.grLyrToc=[];  

//all WMS lyr
dMap.analisi01.grWms=[];

//all exclusive lyr
  dMap.analisi01.grTheme=[
    'lyr023',
    'lyr025',
  ];

dMap.logout=0;

dMap.apiInfo=new Array();

//_dMap.//_eoserver_prefix = //_EOSERVER_PREFIX;
//_dMap.//_eoserver_suffix = //_EOSERVER_SUFFIX;

var dyn_functions = [];
var dlg_close_functions = [];
var geo_lyr = [];
//var t@his_lyr = [];
var this_tb = [];
var this_watchlist = [];
var dyn_lyr_discover = [];

var f_btn = [];

var dyn_on_ready = [];
var list_on_ready=[];

//license manager
//USER_LICENSE=USER_LICENSE;
dMap.apiInfo.user_token='1234';

dMap.apiInfo.usr_set=1;//'<?php echo USR_SET;?>';

dMap.apiInfo.user_login='demo';//<?php echo $o['apiInfo']['user_login'];?>'

var source_icon = HOME_PROJECT+'source/icon/';

dMap.analisi01.legends=new Array();
dMap.analisi01.legends.toogle='is-open';

dMap.apiInfo.usr_set=USR_SET;

dMap.apiInfo.user_login=user_login;

//c002
dMap.editItemStatus='false';

//dMap.checkfile=0;
dMap.checkfile=new Array();
dMap.checkfile.tab4=0;
dMap.checkfile.tab5=0;
dMap.checkfile.tab6=0;

dMap.place.google_route='nd';
dMap.place.google_street_number = 'nd';
dMap.place.google_address_ok = 'nd';

dMap.current_tab=0;
//dMap.pid_for_update=null;
localStorage.shop_token=null;
dMap.show_closed=0;
dMap.tmp_closing_date=null;
dMap.tmp_opening_date=null;

dMap.usr.lat=0;
dMap.usr.lng=0;
dMap.accuracy=0;

var dyn_zoomend = [];
var list_zoomend=[];

var dyn_zoomstart = [];
var list_zoomstart=[];