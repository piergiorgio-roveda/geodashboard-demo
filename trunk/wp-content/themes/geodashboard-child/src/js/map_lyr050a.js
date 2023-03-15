dMap.analisi01.grLyr.push('lyr050');

var geo_lyr050 = new L.featureGroup();
//var geo_lyr050 = new L.MarkerClusterGroup(geo_lyr022_options);
//var geo_lyr050 = new L.MarkerClusterGroup();


//if(lyr.inToc!=undefined 
//  && lyr.inToc===true){

  dMap.analisi01.grLyrToc.push('lyr050');

//}


// var group = L.featureGroup([geo_lyr050])

// //var group = L.featureGroup.loadEvents([ geo_lyr050 ]);
// // test
// group.on({
//   loading : function () { 
//     console.log( 'The layer group just fired the "loading" event!' ); 
//     //document.body.className="loading"; 
//   }
//   , load  : function () { 
//     console.log( 'The layer group just fired the "load" event!' ); 
//     //document.body.className=""; 
//   }
// });

var lyr050_dlg_slug='lyr050_dlg_single';
var meta = {
  'properties':{
    'g_description': null,
    'g_label': 'Parking Details',
    'g_slug': lyr050_dlg_slug,
    'g_template': 'template_by_slug',
  }
}
g_meta.geovar_dialog.features.push(meta);

var styles = {
    "style1": {
      "iconUrl": "/source/icon/emoji_circle_carto-1f1ef-1f1f5_mod-blue.png",
      "iconSize": [
        40,
        40
      ],
      "iconAnchor": [
        20,
        20
      ]
    },
    "style2": {
      "iconUrl": "/source/icon/emoji_circle_carto-1f1ef-1f1f5_mod-blue.png",
      "iconSize": [
        30,
        30
      ],
      "iconAnchor": [
        15,
        15
      ]
    },
    "calibration": {
      "iconUrl": "/source/icon/px40_noun_target-4963235_40x40.png",
      "iconSize": [
        40,
        40
      ],
      "iconAnchor": [
        20,
        20
      ]
    }
  }

var geo_lyr050_style = function (feature,latlng) {
  // _onsole.log(feature)
  // return L.marker(latlng,{
  //   icon: geo_lyr050_style_icon
  // }).on('click', geo_lyr050_onClick); // funzione 3 onClick sul punto
  let p = feature.properties;
  let c = p.category;

  if(c=='simple'){
    return L.marker(latlng);
  }
  else if(c=='style1'){
    //calibration1
    //L.marker(latlng).addTo(mymap);
    //calibration2
    // L.marker(latlng,{
    //   icon: geo_lyr050_icon_calibration
    // }).addTo(mymap);
    //done
    return L.marker(latlng,{
       icon: geo_lyr050_icon_style1
    }).on('click', geo_lyr050_onClick);
  }
  else if(c=='style2' || c=='style3'){
    //calibration2
    // L.marker(latlng,{
    //   icon: geo_lyr050_icon_calibration
    // }).addTo(mymap);
    //done
    return L.marker(latlng,{
       icon: geo_lyr050_icon_divicon_simple(feature,latlng)
    }).on('click', geo_lyr050_onClick);
  }
  else if(c=='style4'){
    return L.marker(latlng);
  }
  else{
    return L.marker(latlng);
  }
  
}

var geo_lyr050_icon_style1 = L.icon(styles.style1);
var geo_lyr050_icon_calibration = L.icon(styles.calibration);

var geo_lyr050_icon_divicon_simple = function(feature,latlng){

  let n = '<i class="fa fa-car" style="font-size: 32px;" aria-hidden="true"></i>';//'999';
  //myclass = 'divicon_draft';
  myclass = 'divicon_type2';
  return L.divIcon({
    className: myclass,
    pid: feature.properties.pid,
    category: feature.properties.category,
    html: '<div class="divicon_box" pid="'+feature.properties.pid+'">'
      +'<span>'+n+'</span>'
      +'</div>' ,
    iconSize: [48,48],
    iconAnchor:[24,24]
  });

}

function geo_lyr050_onClick(e) {
  console.log(e);
  sessionStorage.lyr050_item_token=e.target.feature.properties.pid;
  sessionStorage.this_dialog_slug=lyr050_dlg_slug;
  $('.divicon_type2_ct').remove();
  //create_dialog2(sessionStorage.this_dialog_slug);

  if(sessionStorage.lyr050_item_token=='4'){
    create_dialog2(sessionStorage.this_dialog_slug);
  }
  else{
    $('.box-info-1').html('<div class="dlg_'+lyr050_dlg_slug+''+'_body"></div>');
    dyn_functions['template_by_slug_'+lyr050_dlg_slug]();
  }


}

geo_lyr050.on('mouseover', function (e) {
  
  let icon_obj = e.layer.getIcon();

  sessionStorage.lyr050_item_token=icon_obj.options.pid;

  if(icon_obj.options.category=='style3'
    ||icon_obj.options.category=='style2'){
    // _onsole.log(e);
    // _onsole.log(icon_obj);
    //$('[pid='+icon_obj.options.pid+']').css('border','2px solid');
    //let position = $('[pid='+icon_obj.options.pid+']').position();
    if(icon_obj.options.category=='style3'){
      divicon_type='divicon_type2_ct-hover';
      $('[pid='+icon_obj.options.pid+']').parent().append('<div class="'+divicon_type+' divicon_type2_ct card"></div>');
      var street = 'Via Duomo, 15';
      var time = '45 mins';
      var money = '25/day';
    }
    else{
      divicon_type='divicon_type2_ct-bottom';
      $('#mapid').append('<div class="'+divicon_type+' divicon_type2_ct card"></div>');
      var street = 'Via Cairoli, 141';
      var time = '15 mins';
      var money = '5/h';
    }
    
    $('.divicon_type2_ct').append(''
      +'<div class="box1"></div>'
      +'<div class="box2"></div>'
    +'');
    $('.divicon_type2_ct > .box1').append(''
      +'<div class="box1a" style="display: table;height: 62px;">'
        +'<i class="fa fa-car" style="font-size: 32px;vertical-align: bottom;display: table-cell;" aria-hidden="true"></i>'
      +'</div>'
    +'');

    if(icon_obj.options.category=='style3'){
    $('.divicon_type2_ct > .box1').append(''
      +'<div class="box1b" style="text-align:center;margin-top: 5px;">'
        +'<i class="fa fa-bicycle" style="font-size: 15px;" aria-hidden="true"></i>'
        +'&nbsp;<i class="fa fa-bolt" style="font-size: 15px;" aria-hidden="true"></i>'
      +'</div>'
    +'');
    }

    $('.divicon_type2_ct > .box2').append(''
      +'<div class="part-a"></div>'
      +'<div class="part-b"></div>'
    +'');
    $('.divicon_type2_ct > .box2 > .part-a').append(''
      +'Category: Parking<br>Street: '+street+''
    +'');
    $('.divicon_type2_ct > .box2 > .part-b').append(''
      +'<small class="d-inline-flex mb-1 px-2 py-1 fw-semibold text-success '
      +'bg-success bg-opacity-10 border border-success border-opacity-10 rounded-2">'
      +'<i class="fa fa-clock-o" aria-hidden="true" style="'
      +'margin-top: 3px;'
      +'margin-right: 3px;'
      +'"></i> '+time+'</small><small class="d-inline-flex mb-1 px-2 py-1 fw-semibold text-warning '
      +'bg-warning bg-opacity-10 border border-warning border-opacity-10 rounded-2" '
      +'style="'
      +'margin-left: 3px;'
      +'"><i class="fa fa-usd" aria-hidden="true" style="'
      +'margin-top: 3px;'
      +'margin-right: 3px;'
      +'"></i> '+money+'</small>'
    +'');

    if(icon_obj.options.category=='style3'){
      $('.divicon_type2_ct > .box2 > .part-b').append(''
        +'<button class="btn btn-sm btn-outline-dark btn-details" '
        +'style="margin-left: 3px;position: absolute;right: 0px;top: 2px;"'
        +'>Details</button>'
      +'');

      $('.btn-details').on('click',function(){

        sessionStorage.this_dialog_slug=lyr050_dlg_slug;
        $('.divicon_type2_ct').remove();
        create_dialog2(sessionStorage.this_dialog_slug);

      });

    }
  }

});

geo_lyr050.on('mouseout', function (e) {
  
  let icon_obj = e.layer.getIcon();
  if(icon_obj.options.category=='style3'
    ||icon_obj.options.category=='style2'){
    // _onsole.log(e);
    // _onsole.log(icon_obj);
    //$('[pid='+icon_obj.options.pid+']').css('border','0px');
    $('.divicon_type2_ct').remove();
  }

});

dyn_functions['template_by_slug_'+lyr050_dlg_slug] = function(){

  var c = '<div class="mainboxItem" style="margin-top:5px;"></div>';
  $('.dlg_'+lyr050_dlg_slug+''+'_body').append(c);

  if(sessionStorage.lyr050_item_token=='4'){
    var street = 'Via Duomo, 15';
    var myname = 'Algin Management - ARO Garage';
    var time = '45 mins';
    var money = '25/day';
    var myimage = 'https://www.fundaciondfa.es/sites/default/files/2021-07/Parking-discapacidad-dfa.jpg';
  }
  else{
    var street = 'Via Cairoli, 141';
    var myname = 'iPark';
    var time = '15 mins';
    var money = '5/h';
    var myimage = 'https://d2uqqhmijd5j2z.cloudfront.net/files/631169/gallery/859_8th_Ave.01.png?1631213545';
  }

  //box button tab
  var c = ''
    +'<div class="ajs_body_head" '
      +'pid="999" '
      +'></div>'
    +'<div class="clearfix"></div>';
  $('.dlg_'+lyr050_dlg_slug+''+'_body').append(c);

  var c = '<div>'
    +'<div class="col-btn-attrs" style="text-align:left;"></div>'
  +'</div>';
  $('.dlg_'+lyr050_dlg_slug+''+'_body').append(c);

  //box tab1
  c += '<div '
    +'class="dlg_panel panel-tab1" '
    +'style="display:block;font-family:var(--wd-fonts-secondary);">';
  //c += '<p>TAB1</p>';
  c+=street+''
    +'<br>Company: '+myname
    +'<div class="dlg_box2" style="margin-top: 15px;"><div class="part-a"></div></div>'
    +'<hr>'
    +'<p style="margin-bottom:15px;"><b>About This Facility</b>'
    +'<br>Secure and affordable indoor garage in the Theatre District. '
    +'Just a few minutes to the Neil Simon Theatre, Roseland Ballroom, '
    +'and Gershwin Theatre.</p>'
    +'<p style="margin-bottom:15px;">Max Vehicle Height: 8\'0"</p>'
    +'<p style="margin-bottom:15px;">The location is open 24/7 however from 10 pm-11 pm the gate will be down for security purposes. '
    +'If retrieving a vehicle during this time please approach the gate and '
    +'staff will be notified by the alarm.</p>'
    +'<p style="margin-bottom:15px;">Hours of Operation: <b>Mon - Sun 24 hours</b></p>'
    +'<div style="width:100%;height:200px;'
    +'background:url(\''+myimage+'\') no-repeat center;'
    +'background-size: 100%;'
    +'"></div>'
    +'<div class="amenity-list" style="display: flex;flex-direction: row;margin-top: 15px;"></div>'
  c += '</div><!--tab1-->';
  
  $('.dlg_'+lyr050_dlg_slug+''+'_body').append(c);

  $('.dlg_box2 > .part-a').append(''
    +'<small class="d-inline-flex mb-1 px-2 py-1 fw-semibold text-success '
    +'bg-success bg-opacity-10 border border-success border-opacity-10 rounded-2">'
    +'<i class="fa fa-clock-o" aria-hidden="true" style="'
    +'margin-top: 3px;'
    +'margin-right: 3px;'
    +'"></i> '+time+'</small><small class="d-inline-flex mb-1 px-2 py-1 fw-semibold text-warning '
    +'bg-warning bg-opacity-10 border border-warning border-opacity-10 rounded-2" '
    +'style="'
    +'margin-left: 3px;'
    +'"><i class="fa fa-usd" aria-hidden="true" style="'
    +'margin-top: 3px;'
    +'margin-right: 3px;'
    +'"></i> '+money+'</small>'
  +'');

  //https://www.bestparking.com/new-york-parking/300-e-56th-st/
  let amenity_baseurl='https://www.bestparking.com/images/search/amenities/';
  let amenity_img1 = amenity_baseurl+'am_valet.svg';
  let amenity_img2 = amenity_baseurl+'am_unobstructed.svg';
  let amenity_img3 = amenity_baseurl+'am_attendant.svg';
  let amenity_img4 = amenity_baseurl+'am_covered.svg';
  let amenity_img5 = amenity_baseurl+'am_handicapped.svg';
  let amenity_img6 = amenity_baseurl+'am_obstruct.svg';
  let amenity_img7 = amenity_baseurl+'am_electric.svg';
  let amenity_img8 = amenity_baseurl+'am_toilet2.svg';

  if(sessionStorage.lyr050_item_token=='4'){
    $('.amenity-list').append('<div class="amenity-ct" style="width: 80px;">'
      +'<div class="flex-cell"><img src="'+amenity_img1+'"></div><div class="flex-cell">valet</div>'
    +'</div>');
    $('.amenity-list').append('<div class="amenity-ct" style="width: 80px;">'
      +'<div class="flex-cell"><img src="'+amenity_img2+'"></div><div class="flex-cell">unobstructed</div>'
    +'</div>');
    $('.amenity-list').append('<div class="amenity-ct" style="width: 80px;">'
      +'<div class="flex-cell"><img src="'+amenity_img3+'"></div><div class="flex-cell">attended</div>'
    +'</div>');
    $('.amenity-list').append('<div class="amenity-ct" style="width: 80px;">'
      +'<div class="flex-cell"><img src="'+amenity_img4+'"></div><div class="flex-cell">covered</div>'
    +'</div>');
    $('.amenity-list').append('<div class="amenity-ct" style="width: 80px;">'
      +'<div class="flex-cell"><img src="'+amenity_img7+'"></div><div class="flex-cell">charging</div>'
    +'</div>');
  }
  else{
    $('.amenity-list').append('<div class="amenity-ct" style="width: 80px;">'
      +'<div class="flex-cell"><img src="'+amenity_img1+'"></div><div class="flex-cell">valet</div>'
    +'</div>');
    $('.amenity-list').append('<div class="amenity-ct" style="width: 80px;">'
      +'<div class="flex-cell"><img src="'+amenity_img6+'"></div><div class="flex-cell">obstructed</div>'
    +'</div>');
    $('.amenity-list').append('<div class="amenity-ct" style="width: 80px;">'
      +'<div class="flex-cell"><img src="'+amenity_img3+'"></div><div class="flex-cell">attended</div>'
    +'</div>');
    $('.amenity-list').append('<div class="amenity-ct" style="width: 80px;">'
      +'<div class="flex-cell"><img src="'+amenity_img5+'"></div><div class="flex-cell">handicap</div>'
    +'</div>');
    $('.amenity-list').append('<div class="amenity-ct" style="width: 80px;">'
      +'<div class="flex-cell"><img src="'+amenity_img8+'"></div><div class="flex-cell">restroom</div>'
    +'</div>');
  }

}