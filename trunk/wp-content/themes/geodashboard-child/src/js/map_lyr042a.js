$(document).ready(function() {

  var styles = ''
    +'.cluster_type1{'  
      +'width: 50px;'
      +'height: 50px;'
      //+'background: url(https://cityplanner.biz/source/icon/px20_noun-spray-1518874-Spray-CreaticcaCreative%20Agency-NounProject-mod.png) 0 0;'
      +'background-color:black;'
      +'border:2px solid white;'
    +'}'
  +'';
  var styleSheet = document.createElement("style");
  styleSheet.setAttribute('tag', 'style MarkerCluster lyr042');
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

}); //$(document).ready

var lyr='lyr042';

dMap.analisi01.grLyr.push(lyr);

//var geo_lyr042 = new L.featureGroup();
//var geo_lyr042 = new L.MarkerClusterGroup(geo_lyr022_options);
//var geo_lyr042 = new L.MarkerClusterGroup(marker_cluster_custom('lyr042'));
var geo_lyr042 = new L.featureGroup();
//mymap.createPane(lyr+'_pane');
//mymap.getPane(lyr+'_pane').style.zIndex = lyr.zIndex;


let obj_lyr=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === lyr)[0].properties;
obj_lyr.toc_filter_field='my_categories';

if(obj_lyr.intoc!=undefined 
  && obj_lyr.intoc===1){

  dMap.analisi01.grLyrToc.push(lyr);

}

var geo_lyr042_style_icon = L.icon(obj_lyr.g_style.style1);

function geo_lyr042_style(feature,latlng) {

  let lyr='lyr042';
  let obj_lyr=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === lyr)[0].properties;


  var zoom = mymap.getZoom();
  var p = feature.properties;
  var icon = new Array();

  if(p.my_categories=='my_categories'){
    var style='style99';
  }
  else{

    if(p.my_categories[0]=='office'){
      var style='office';
    }
    else if(p.my_categories[0]=='industrial'){
      var style='industrial';
    }
    else if(p.my_categories[0]=='residential'){
      var style='residential';
    }
    else if(p.my_categories[0]=='utility'){
      var style='utility';
    }
    else if(p.my_categories[0]=='service'){
      var style='service';
    }
    else if(p.my_categories[0]=='commercial'){
      var style='commercial';
    }
    else{
      var style='style99';
    }
    
  }

  if(p.count==1){
    obj_lyr.g_style.forEach(element => {
      if(element.g_slug==style){
        icon = L.icon({
          iconUrl: SOURCE_PATH+'icon/'+element.iconUrl,
          iconSize: element.iconSize,
          iconAnchor: element.iconAnchor
        });
      }
    });
  }
  else{
    myclass = 'cluster_type1 cluster_type1_a';
    if(p.count>999){
      n = '<i class="fa fa-plus" aria-hidden="true"></i>1k';
    }
    else{
      n = p.count;
    }
    icon = L.divIcon({
      className: myclass,
      html: '<span>'+n+'</span>' ,
      iconSize: null,
      iconAnchor:null
    });
    //L.marker(latlng).addTo(mymap);//to calibrate
    // _onsole.log(icon);

  }


  // _onsole.log(icon);
  //return L.marker(latlng).addTo(mymap);//to calibrate

  return L.marker(
    latlng,
    {
      icon: icon,
      pane: 'lyr042_pane'
    }
  ).on('click', geo_lyr042_onClick); // funzione 3 onClick sul punto

}

function geo_lyr042_onClick(e) {

  // _onsole.log(e);
  localStorage.lyr042_token=e.target.feature.properties.item_token;//e.target.feature.properties.item_token;
  localStorage.lyr042_lat=e.latlng.lat;//e.target.feature.properties.item_token;
  localStorage.lyr042_lng=e.latlng.lng;//e.target.feature.properties.item_token;
  //get_lyr031_single_for_dlg();

  //must improve for more fields
  f_btn['get_lyr_single_for_dlg']('lyr042');

}

dyn_functions['lyr042_toc_extend']=function(){

  let lyr='lyr042';
  let obj_lyr=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === lyr)[0].properties;

  obj_lyr.toc_extend = [];
  obj_lyr.toc_extend_checked = [];
  // _onsole.log('lyr042_toc_extend');
  obj_lyr.g_style.forEach(element => {

    var c = ''
      +'<div>'
        +'<div class="form-check">'
          +'<input slug="'+element.g_slug+'" class="form-check-input check_'+lyr+'" type="checkbox" '
            +'value="" id="flexCheckChecked" ';
            //+'checked'

    if(sessionStorage.getItem(lyr+'_'+element.g_slug+'_checked') === null){
      sessionStorage[lyr+'_'+element.g_slug+'_checked']='1';
      obj_lyr.toc_extend_checked.push(element.g_slug);
      c += ''
            +'checked'
    }
    else if(sessionStorage[lyr+'_'+element.g_slug+'_checked']== '1'){
      //sessionStorage[lyr+'_'+element.g_slug+'_checked']=1;
      obj_lyr.toc_extend_checked.push(element.g_slug);
      c += ''
            +'checked'
    }
    else{
      //sessionStorage[lyr+'_'+element.g_slug+'_checked']=0;
      c += ''
            +''
    }

    c += ''
            +'>'
          +'<label class="form-check-label" for="flexCheckChecked" '
            +'style="display:inline;">'
            +'<div style="float: left;margin-right: 5px;">'
              +'<img src="'+SOURCE_PATH+'icon/'+element.iconUrl+'" '
                +'style="width:20px;" />'
            +'</div>'
            +'<div>'
              +element.g_label
            +'</div>'
          +'</label>'
        +'</div>'//form-check
      +'</div>'
      +'<div class="clearfix" style="margin-bottom:3px;"></div>'
    +'';

    $('.'+lyr+'-toc-extend').append(c);

    obj_lyr.toc_extend.push(element.g_slug);

    //if(sessionStorage[lyr+'_'+element.g_slug+'_checked']=== null){
    //  sessionStorage[lyr+'_'+element.g_slug+'_checked']=1;
    //}

  });

  $('.check_'+lyr).on('click',function(){

    let lyr='lyr042';
    let obj_lyr=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === lyr)[0].properties;


    const params = document.querySelectorAll('.check_'+lyr+':checked');

    obj_lyr.toc_extend.forEach(element => {
      sessionStorage[lyr+'_'+element+'_checked']='0';
    });
    obj_lyr.toc_extend_checked = [];

    var iSubmit=1;
    Array.from(params).forEach((element, index) => {
      var slug = element.getAttribute('slug');
      // _onsole.log(element.('checked'));
      sessionStorage[lyr+'_'+slug+'_checked']='1';
      obj_lyr.toc_extend_checked.push(slug);
      /*
      if(element.getAttribute('required')==1){
        if( element.value.length > 0 ) {
          element.classList.remove('is-invalid');
        }
        else{
          iSubmit=0;
          // _onsole.log('disabling');
          element.classList.add('is-invalid');
        }
      }
      */
    });

    switch_on_lyr_b(lyr);

  });


}

dyn_functions['template_by_slug_lyr042_single'] = function(){

  // _onsole.log('template_by_slug_search_classic');
  var lyr='lyr042';
  var slug=lyr+'_single'

  $('.ajs-content').css('padding-left','10px');
  $('.ajs-content').css('padding-right','10px');

  //--
  // watchlist
  $('.ajs-header').append('<div class="'+lyr+'_watchlist dlg_watchlist"'
    +' data-toggle="tooltip" data-placement="top" title="Add to Watchlist" >'
    +'</div>');
  $('.dlg_watchlist').tooltip('enable');
  fill_watchlist_badge(lyr);


  var tabs = [
    {'g_slug':'tab1','g_label':'Details'},
    {'g_slug':'tab2','g_label':'Census'},
    {'g_slug':'tab3','g_label':'Market'},
    {'g_slug':'tab4','g_label':'Units'},
    {'g_slug':'tab5','g_label':'Photo'},
    {'g_slug':'tab6','g_label':'Plant'}
  ];

  $('.dlg_'+slug+'_body').html('');

  var c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $('.dlg_'+slug+'_body').append(c);

  var c = ''
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  $('.dlg_'+slug+'_body').append(c);

  var c = '<div>'
    +'<div class="col-btn-attrs" style="text-align:center;">'
    +'</div>'
  +'</div>';
  $('.dlg_'+slug+'_body').append(c);

  var iTAb=0;

  tabs.forEach(e => {
    iTAb++;
    var tab=e.g_slug;
    var label=e.g_label;
    // _onsole.log('dlg_template:explorer_simple > '+g_slug);
    var b = ''
      +'<span class="box-btn_lyr042_'+tab+'" style="margin-left:2.5px;margin-right:2.5px;"></span>'
      //+'<button id="'+tab+'" class="btn btn-dark btn-sm btn-tab btn-'+tab+'" '
      //  +'slug="'+tab+'" '
      //  +'style="padding:5px 5px;margin-right: 5px;" '
      //  +'>'+label+'</button>';
    $('.col-btn-attrs').append(b);

    create_button('btn_lyr042_'+tab);

    var display = '';
    if(iTAb==1){
      $('.btn-'+tab).addClass('active');
      var display ='display:block;';
    }
    else{
      var display ='display:none;';
    }

    var c = '<div class="clearfix"></div>'
      +'<div class="box-tab box_'+tab+'" style="'+display+'">'
        +'<div class="boxItem">'
          +'<div ' 
            +'style="padding:3px;">'
            +'<div class="content_'+tab+'">'
            +'</div>'
          +'</div>'
        +'</div>'
      +'</div>'
    +'';

    $('.dlg_'+slug+'_body').append(c);
  });

  /*$('.btn-tab').on('click',function(){

    $('.btn-tab').removeClass('active');
    $(this).addClass('active');

    $('.box-tab').css('display','none');
    var tab = $(this).attr('slug');
    $('.content_'+tab).css('display','block');

    f_btn['btn_lyr042_'+tab]();

  });*/

  //--
  let obj_lyr=g_meta.geovar_lyr.features.filter(({properties}) => properties.g_slug === lyr)[0].properties;
  var r = obj_lyr.last_r;
  var f = r.features[0];

  if(f.properties){
    var p = f.properties;
    var foo = Object.keys(p);
  }

  var slug = 'lyr042_single';
  var tab = 'tab1';

  //_onsole.log(lyr+': '+obj_lyr.table_schema)

  var table_schema = obj_lyr.table_schema.features[0];
  //foo.forEach((foo_el) => {

  var cols_group = new Array();
  obj_lyr.g_cols_group.forEach(element => {
    if(element.table==obj_lyr.g_tables[0]){
      cols_group=element.cols_group;
    }
  });

  cols_group.forEach(element => {
    $('.content_'+tab).append('<div class="ct-group ct-group-'+element.g_slug+'"><b>'+element.g_label+'</b></div>');
  });


  table_schema.forEach((col_obj) => {

    var col_prop = col_obj.properties;

    var field_prop = {}

    if(col_prop.g_preview==1){

      //format
      field_prop.type=col_format(col_prop);

      console.log(col_prop)

      var html = append_style_container(col_prop,field_prop,p);
      $('.ct-group-'+col_prop.g_group).append(html);
      //$('.content_'+tab).append(col_prop.g_slug+': '+p[col_prop.g_slug]+'<br>');
      $('.ct-label-'+col_prop.g_slug).html(col_prop.g_label);
      $('.ct-value-'+col_prop.g_slug).html(p[col_prop.g_slug]);
    }
    
  });

  //---

  $('.content_'+tab).append('<b>Consistenza degli edifici</b><br>');

  var f_tmp_details = {
    'properties':{
      'superficie':'1.000 mq',
      'volume':'9.000 mc',
      'numero di vani':'16',
      'anno di costruzione':'2010',
      'categoria catastale':'C3',
    }
  }
  var p = f_tmp_details.properties;
  var foo = Object.keys(p);
  foo.forEach((foo_el) => {
    $('.content_'+tab).append(foo_el+': '+p[foo_el]+'<br>');
  });

  //---

  $('.content_'+tab).append('<b>Caratteristiche energetiche</b><br>');

  var f_tmp_details = {
    'properties':{
      'classe APE':'ND',
      'consumi annui':'ND',
      'potenza in prelievo':'ND',
    }
  }
  var p = f_tmp_details.properties;
  var foo = Object.keys(p);
  foo.forEach((foo_el) => {
    $('.content_'+tab).append(foo_el+': '+p[foo_el]+'<br>');
  });

  //---

  $('.content_'+tab).append('<b>interventi di manutenzione</b><br>');

  var f_tmp_details = {
    'properties':{
      'elemento edilizio':'ND',
      'anno di realizzazione dell\'intervento':'ND',
      'incentivo percepito per l\'intervento':'ND',
    }
  }
  var p = f_tmp_details.properties;
  var foo = Object.keys(p);
  foo.forEach((foo_el) => {
    $('.content_'+tab).append(foo_el+': '+p[foo_el]+'<br>');
  });

  //---

  $('.content_'+tab).append('<b>valutazioni del potenziale</b><br>');

  var f_tmp_details = {
    'properties':{
      'elenco degli interventi':'ND',
      'costi di realizzazione':'ND',
      'risparmi attesi':'ND',
    }
  }
  var p = f_tmp_details.properties;
  var foo = Object.keys(p);
  foo.forEach((foo_el) => {
    $('.content_'+tab).append(foo_el+': '+p[foo_el]+'<br>');
  });

  //---

  $('.ajs-footer-btn2').append(''
    +'<span class="box-btn_deletedlg"></span>'
    +'<span class="box-btn_editdlg" style="margin-left:5px;"></span>'
    +'<span class="box-btn_movedlg" style="margin-left:5px;"></span>'
  +'');

  sessionStorage.destination_layer='lyr042';

  create_button('btn_deletedlg');
  create_button('btn_editdlg');
  create_button('btn_movedlg');

}

function change_tab(tab){
  $('.btn-tab').removeClass('active');
  $('#btn_lyr042_'+tab).addClass('active');

  $('.box-tab').css('display','none');
  //var tab = $('#btn_lyr042_'+tab).attr('slug');
  $('.box_'+tab).css('display','block');

  //$('.content_'+tab).html('Aaa');
}

f_btn['btn_lyr042_tab1'] = function(){
  var slug = 'lyr042_single';
  var tab = 'tab1';

  change_tab(tab);

  //$('.content_'+tab).html('Aaa');
  $('.box-btn_deletedlg').css('display','');
  $('.box-btn_editdlg').css('display','');
  $('.box-btn_movedlg').css('display','');
  $('.box-btn_movedlg > button').html('MOVE');
  $('.ajs-dialog').css('max-width','500px');
  //--

}

f_btn['btn_lyr042_tab2'] = function(){

  // _onsole.log('tab2');

  var slug = 'lyr042_single';
  var tab = 'tab2';

  change_tab(tab);

  $('.box-btn_deletedlg').css('display','none');
  $('.box-btn_editdlg').css('display','none');
  $('.box-btn_movedlg').css('display','none');
  $('.ajs-dialog').css('max-width','500px');

  //---
  $('.content_'+tab).html('');

  $('.content_'+tab).append('<b>Informazioni generali</b><br>');

  var f_tmp_details = {
    'properties':{
      'codice comunale':'ND',
      'sezione di censimento':'ND',
      'popolazione residente':'ND',
      'aree montane':'ND',
      'zone climatiche':'ND',
      'zone di rischio sismico':'ND',
      'rischio idrogeologico':'ND',
      'consumi idrici':'ND',
    }
  }
  var p = f_tmp_details.properties;
  var foo = Object.keys(p);
  foo.forEach((foo_el) => {
    $('.content_'+tab).append(foo_el+': '+p[foo_el]+'<br>');
  });

  //---

}

f_btn['btn_lyr042_tab3'] = function(){

  // _onsole.log('tab2');

  var slug = 'lyr042_single';
  var tab = 'tab3';

  change_tab(tab);

  //$('.content_'+tab).html('Aaa');
  
  $('.box-btn_deletedlg').css('display','none');
  $('.box-btn_editdlg').css('display','none');
  $('.box-btn_movedlg').css('display','none');
  $('.ajs-dialog').css('max-width','1000px');

  //---
  $('.content_'+tab).html('');

  $('.content_'+tab).append('<b>Informazioni generali</b><br>');

  get_lyr043_data_for_lyr042_single_tab3();

  var f_tmp_details = {
    'properties':{
      'Semestre:':'2 - 2021',
      'Fascia/zona':'D15/Periferica/FORLANINI, MECENATE, ORTOMERCATO, SANTA GIULIA',
    }
  }
  var p = f_tmp_details.properties;
  var foo = Object.keys(p);
  foo.forEach((foo_el) => {
    $('.content_'+tab).append(foo_el+': '+p[foo_el]+'<br>');
  });

  $('.table_'+tab+'_ct1').append('<tr>'
    +'<td>Abitazioni civili</td>'
    +'<td>OTTIMO</td>'
    +'<td style="text-aling:right;">2,650</td>'
    +'<td style="text-aling:right;">3,900</td>'
    +'<td>L</td>'
    +'<td style="text-aling:right;">8.2</td>'
    +'<td style="text-aling:right;">12.0</td>'
    +'<td>L</td>'
  +'</tr>');


  //---

}

f_btn['btn_lyr042_tab4'] = function(){

  // _onsole.log('tab2');

  var slug = 'lyr042_single';
  var tab = 'tab4';

  change_tab(tab);

  //$('.content_'+tab).html('Aaa');
  $('.box-btn_deletedlg').css('display','none');
  $('.box-btn_editdlg').css('display','none');
  $('.box-btn_movedlg').css('display','');
  $('.box-btn_movedlg > button').html('ADD');
  $('.ajs-dialog').css('max-width','1000px');

  //---
  $('.content_'+tab).html('');

  $('.content_'+tab).append('<b>Informazioni generali</b><br>');

  var f_tmp_details = {
    'properties':{
      'Numero piani:':'8',
      'Semi-interrato':'Sì',
      'Mansarda':'Sì',
      'Garage':'Sì',
    }
  }

  $('.content_'+tab).append('<table class="table table_'+tab+'_ct1"></table>');
  $('.table_'+tab+'_ct1').append('<tr>'
    +'<th>Foglio</th>'
    +'<th>Particella</th>'
    +'<th>Sub</th>'
    +'<th>Zona</th>'
    +'<th>Microzona</th>'
    +'<th>Categoria</th>'
    +'<th>Classe</th>'
    +'<th>Cons.</th>'
    +'<th>Floor</th>'
    +'<th></th>'
  +'</tr>');


  $('.table_'+tab+'_ct1').append('<tr>'
    +'<td>NCT-16</td>'
    +'<td>313</td>'
    +'<td>5</td>'
    +'<td></td>'
    +'<td></td>'
    +'<td>A/3</td>'
    +'<td>2</td>'
    +'<td>6,5 vani</td>'
    +'<td>3</td>'
    +'<td>'
      +'<i class="fa fa-file-text-o" aria-hidden="true"></i>'
      +'<i class="fa fa-pencil-square" aria-hidden="true"></i>'
    +'</td>'
  +'</tr>');

  $('.table_'+tab+'_ct1').append('<tr>'
    +'<td>NCT-16</td>'
    +'<td>313</td>'
    +'<td>5</td>'
    +'<td></td>'
    +'<td></td>'
    +'<td>A/3</td>'
    +'<td>2</td>'
    +'<td>6,5 vani</td>'
    +'<td>3</td>'
    +'<td>'
      +'<i class="fa fa-file-text-o" aria-hidden="true"></i>'
      +'<i class="fa fa-pencil-square" aria-hidden="true"></i>'
    +'</td>'
  +'</tr>');


  $('.table_'+tab+'_ct1').append('<tr>'
    +'<td>NCT-16</td>'
    +'<td>313</td>'
    +'<td>5</td>'
    +'<td></td>'
    +'<td></td>'
    +'<td>A/3</td>'
    +'<td>2</td>'
    +'<td>6,5 vani</td>'
    +'<td>3</td>'
    +'<td>'
      +'<i class="fa fa-file-text-o" aria-hidden="true"></i>'
      +'<i class="fa fa-pencil-square" aria-hidden="true"></i>'
    +'</td>'
  +'</tr>');


  $('.table_'+tab+'_ct1').append('<tr>'
    +'<td>NCT-16</td>'
    +'<td>313</td>'
    +'<td>5</td>'
    +'<td></td>'
    +'<td></td>'
    +'<td>A/3</td>'
    +'<td>2</td>'
    +'<td>6,5 vani</td>'
    +'<td>3</td>'
    +'<td>'
      +'<i class="fa fa-file-text-o" aria-hidden="true"></i>'
      +'<i class="fa fa-pencil-square" aria-hidden="true"></i>'
    +'</td>'
  +'</tr>');


  $('.table_'+tab+'_ct1').append('<tr>'
    +'<td>NCT-16</td>'
    +'<td>313</td>'
    +'<td>5</td>'
    +'<td></td>'
    +'<td></td>'
    +'<td>A/3</td>'
    +'<td>2</td>'
    +'<td>6,5 vani</td>'
    +'<td>3</td>'
    +'<td>'
      +'<i class="fa fa-file-text-o" aria-hidden="true"></i>'
      +'<i class="fa fa-pencil-square" aria-hidden="true"></i>'
    +'</td>'
  +'</tr>');
  //---

}

f_btn['btn_lyr042_tab5'] = function(){

  // _onsole.log('tab2');

  var slug = 'lyr042_single';
  var tab = 'tab5';

  change_tab(tab);

  //$('.content_'+tab).html('Aaa');
  $('.box-btn_deletedlg').css('display','none');
  $('.box-btn_editdlg').css('display','none');
  $('.box-btn_movedlg').css('display','');
  $('.box-btn_movedlg > button').html('ADD');
  $('.ajs-dialog').css('max-width','500px');

  //---
  $('.content_'+tab).html(''
    +'<div class="ct1-box0B"></div>'
    +'<div class="ct1-box1" style="display:none;height:400px;"></div>'
    +'<div class="ct1-box2" style="margin-top: 10px;"><div class="ct1-box2-photo"></div></div>');

  $('.ct1-box0B').append(''
    +'<div id="street-view" style="height:400px;"></div>');

  var img_pegman = SOURCE_PATH+'icon/px512_noun-street-view-by-alimasykurm-NounProject-3937724.png';
  //$('.ct1-box2-photo').append('<img style="width: 40px;" src="'+SOURCE_PATH+'icon/px512_noun-street-view-by-alimasykurm-NounProject-3937724.png" alt="..." class="img-thumbnail">');

  //$('.ct1-box1').append('<img style="width: 100%;" src="https://www.progettocmr.com/wp-content/uploads/2017/04/EVERNATURE_Taipei_Residential_Bldg_Progetto_CMR_6-500x500.jpg" alt="..." class="img-thumbnail">');
  $('.ct1-box2-photo').append(''
    +'<div image-serial="pegman" class="btn-pegman dlg-album-thumb dlg-album-thumb-active">'
      +'<img style="width: 40px;" src="'+img_pegman+'" alt="..." class="img-thumbnail"></div>');

  var arr_img = [
    'https://www.progettocmr.com/wp-content/uploads/2017/07/palazzo-milano-9.jpg',
    'https://www.progettocmr.com/wp-content/uploads/2017/04/EVERNATURE_Taipei_Residential_Bldg_Progetto_CMR_6-500x500.jpg',
    'https://www.progettocmr.com/wp-content/uploads/2017/04/EVERNATURE_Taipei_Residential_Bldg_Progetto_CMR_5-1-500x500.jpg',
    'https://www.progettocmr.com/wp-content/uploads/2017/04/EVERNATURE_Taipei_Residential_Bldg_Progetto_CMR_7-500x500.jpg',
    'https://www.progettocmr.com/wp-content/uploads/2017/04/EVERNATURE_Taipei_Residential_Bldg_Progetto_CMR_7-500x500.jpg',
    'https://www.progettocmr.com/wp-content/uploads/2017/04/EVERNATURE_Taipei_Residential_Bldg_Progetto_CMR_7-500x500.jpg',
    'https://www.progettocmr.com/wp-content/uploads/2017/04/EVERNATURE_Taipei_Residential_Bldg_Progetto_CMR_7-500x500.jpg',
    'https://www.progettocmr.com/wp-content/uploads/2017/04/EVERNATURE_Taipei_Residential_Bldg_Progetto_CMR_7-500x500.jpg',
    'https://www.progettocmr.com/wp-content/uploads/2017/04/EVERNATURE_Taipei_Residential_Bldg_Progetto_CMR_7-500x500.jpg',
    'https://www.progettocmr.com/wp-content/uploads/2017/04/EVERNATURE_Taipei_Residential_Bldg_Progetto_CMR_7-500x500.jpg',
    'https://www.progettocmr.com/wp-content/uploads/2017/04/EVERNATURE_Taipei_Residential_Bldg_Progetto_CMR_7-500x500.jpg',
    'https://www.progettocmr.com/wp-content/uploads/2017/04/EVERNATURE_Taipei_Residential_Bldg_Progetto_CMR_7-500x500.jpg',
  ];

  var i=0;
  arr_img.forEach(element => {
    $('.ct1-box2-photo').append(''
      +'<div image-serial="'+i+'" class="dlg-album-thumb dlg-album-thumb-inactive">'
        +'<img style="width: 40px;height: 40px;object-fit: cover;" src="'+element+'" alt="..." class="img-thumbnail"></div>');
    i++;
  });
  
  $('.dlg-album-thumb').on('click',function(){
    $('.dlg-album-thumb-active').addClass('dlg-album-thumb-inactive');
    $('.dlg-album-thumb').removeClass('dlg-album-thumb-active');
    $(this).removeClass('dlg-album-thumb-inactive');
    $(this).addClass('dlg-album-thumb-active');

    if($(this).attr('image-serial')=='pegman'){
      $('.ct1-box0B').css('display','');
      $('.ct1-box1').css('display','none');
    }
    else{
      $('.ct1-box0B').css('display','none');
      $('.ct1-box1').css('display','');
      $('.ct1-box1').html(''
        +'<img style="width:400px;height:400px;object-fit: cover;" src="'+arr_img[parseInt($(this).attr('image-serial'))]
          +'" alt="..." class="img-thumbnail"></div>');
    }

  });

  //---

  var datastring = {}

  datastring.tag = 'street-view';
  datastring.lat = parseFloat(localStorage.lyr042_lat);
  datastring.lng = parseFloat(localStorage.lyr042_lng);
  datastring.pov_heading = 165;
  datastring.pov_pitch = 0;

  //$('.click-pano').on('click',fill_streetview(datastring));

  fill_streetview(datastring);


}



f_btn['btn_lyr042_tab6'] = function(){

  // _onsole.log('tab2');

  var slug = 'lyr042_single';
  var tab = 'tab6';

  change_tab(tab);

  //$('.content_'+tab).html('Aaa');
  $('.box-btn_deletedlg').css('display','none');
  $('.box-btn_editdlg').css('display','none');
  $('.box-btn_movedlg').css('display','');
  $('.box-btn_movedlg > button').html('ADD');
  $('.ajs-dialog').css('max-width','1000px');

  //---
  $('.content_'+tab).html('');

  $('.content_'+tab).append('<img src="http://angelcity.wroclaw.pl/wp-content/uploads/AngelCity-02-T74B-18.jpg" style="width: 100%;" alt="..." class="img-thumbnail">');
  //---

}







