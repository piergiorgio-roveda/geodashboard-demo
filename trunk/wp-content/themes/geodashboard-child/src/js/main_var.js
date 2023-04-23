const g_meta = [];

const f_wait = new Array();

//user_meta
f_wait.watchlist=0;
f_wait.geovar_user=0;

g_meta.geovar_user = new Array();
g_meta.geovar_user.features = [];

if(typeof mapuser_meta === "undefined"){
  g_meta.geovar_user.features.push({'properties':{
    "user_id": 0,
    "user_role": [
        "guest"
    ],
    "user_token": "0x0",
    "watchlist": ""
  }});
}
else{
  g_meta.geovar_user.features.push({'properties':mapuser_meta[0]});
}

// _onsole.log(mapuser_meta);

if(g_meta.geovar_user.features[0].properties.user_id==0){
  sessionStorage.access_status=0;
}
else{
  sessionStorage.access_status=1;
}

f_wait.geovar_user=1;

//--

f_wait['geovar_access']=0;
g_meta.geovar_access={'features':[]};

//--

g_meta.geovar_addon = new Array();
g_meta.geovar_addon.features = [];

var gLang = [];//geovar.language_webapp.en_GB;

var dyn_mapclick = [];
var list_mapclick = [];
var list_mapclick_default = [];

if(typeof list_basemapa === "undefined"){
  list_basemap = [
    "lyr040",
    "lyr038"
  ];
}