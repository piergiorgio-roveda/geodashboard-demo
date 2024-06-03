import { mymap__isReady,mymap__get } from './mapState.js';

let _layer__name = 'air_pollution';
let _tile__url = 'https://mts2.google.com/mapslt?lyrs=svv&x={x}&y={y}&z={z}&w=256&h=256&hl=en&style=40,18';

var cyp002__items__schema = [
  {
    master : 'owm_airpollution',
    sub : 'main',
    label : 'Air Quality Index',
    slug : 'aqi',
    sample : '2',
    decode : [
      {
        code : 1,
        label : 'Good',
        icon : '🍃'
      },
      {
        code : 2,
        label : 'Fair',
        icon : '😐'
      },
      {
        code : 3,
        label : 'Moderate',
        icon : '😷'
      },
      {
        code : 4,
        label : 'Poor',
        icon : '☹️'
      },
      {
        code : 5,
        label : 'Very Poor',
        icon : '⚠️'
      },
    ]
  },
  {
    master : 'owm_airpollution',
    sub : 'components', 
    label : 'CO',
    description : 'Carbon monoxide',
    unit : 'μg/m<sup>3</sup>',
    slug : 'co',
    sample : '183.58',
  },
  {
    master : 'owm_airpollution',
    sub : 'components', 
    label : 'NH<sub>3</sub>',
    description : 'Ammonia',
    unit : 'μg/m<sup>3</sup>',
    slug : 'nh3',
    sample : '1.43',
  },
  {
    master : 'owm_airpollution',
    sub : 'components', 
    label : 'NO',
    description : 'Nitrogen monoxide',
    unit : 'μg/m<sup>3</sup>',
    slug : 'no',
    sample : '0.03',
  },
  {
    master : 'owm_airpollution',
    sub : 'components', 
    label : 'NO<sub>2</sub>',
    description : 'Nitrogen dioxide',
    unit : 'μg/m<sup>3</sup>',
    slug : 'no2',
    sample : '0.17',
  },
  {
    master : 'owm_airpollution',
    sub : 'components', 
    label : 'O<sub>3</sub>',
    description : 'Ozone',
    unit : 'μg/m<sup>3</sup>',
    slug : 'o3',
    sample : '98.71',
  },
  {
    master : 'owm_airpollution',
    sub : 'components', 
    label : 'PM<sub>2.5</sub>',
    description : 'Fine particles matter',
    unit : 'μg/m<sup>3</sup>',
    slug : 'pm2_5',
    sample : '6.43',
  },
  {
    master : 'owm_airpollution',
    sub : 'components', 
    label : 'PM<sub>10</sub>',
    description : 'Coarse particulate matter',
    unit : 'μg/m<sup>3</sup>',
    slug : 'pm10',
    sample : '6.9',
  },
  {
    master : 'owm_airpollution',
    sub : 'components', 
    label : 'SO<sub>2</sub>',
    description : 'Sulfur dioxide',
    unit : 'μg/m<sup>3</sup>',
    slug : 'so2',
    sample : '0.66',
  },
];

export async function mapbox__cities__init(){

  if(mymap__isReady() == false){
    await timeout(500);
    return await mapbox__cities__init();
    // return false;
  }

  let _mymap = mymap__get();

  let url2 = FLAT_DOMAIN+'api/mvt.php?z={z}&x={x}&y={y}&';

  _mymap.addSource('air_pollution', {
    'type': 'vector',
    'tiles': [
      url2+
      'collection=mvt_custom'+
      '&custom=cyp003'+
      '&slug=pt_weather_station_230825'+
      '&main_field=*'+
      '&geom=geom_3857'+
      // '&geohash=h1'+
      // '&join=false'+
      // '&join=true'+
      // '&slug_bar=dbstat_tb_kontur_population'+
      // '&join_on=item_token'+
      // '&bar_cols=population'+
    ''],
  });


  let _img_base = `${FLAT_DOMAIN}source/icon/joypixels-5.0.1-free_png_labeled_128/`;

  let _images = [
    {code : 1,label : 'Good',       "url":`${_img_base}nature/leaf-fluttering-in-wind.png`,   "id":"id-aqi-1",icon : '🍃'},
    {code : 2,label : 'Fair',       "url":`${_img_base}people/face-with-raised-eyebrow.png`,  "id":"id-aqi-2",icon : '😐'},
    {code : 3,label : 'Moderate',   "url":`${_img_base}people/face-with-medical-mask.png`,    "id":"id-aqi-3",icon : '😷'},
    {code : 4,label : 'Poor',       "url":`${_img_base}people/worried-face.png`,              "id":"id-aqi-4",icon : '☹️'},
    {code : 5,label : 'Very Poor',  "url":`${_img_base}symbols/warning.png`,                  "id":"id-aqi-5",icon : '⚠️'},
    {code : 99,label : 'n/a',       "url":`${_img_base}symbols/small-blue-diamond.png`,       "id":"id-aqi-x",icon : 'x'}
  ];
  console.log(_images)


  Promise.all(
    _images.map(_arr => new Promise((resolve, reject) => {
      _mymap.loadImage(_arr.url, function (error, imageObject) {
        if (error) throw error;
        let _opt = {}
        // if(img.sdf != undefined){
        //   _opt.sdf = img.sdf;
        // }
        _mymap.addImage(_arr.id,imageObject,_opt)
        resolve();
      })
    }))
  )
  .then( x => {
    _mymap.addLayer(
      {
        'id': 'id-'+'air_pollution', // Layer ID
        'type': 'symbol',
        'source': 'air_pollution', // ID of the tile source created above
        'source-layer': 'default',
        "layout": {
          "icon-image": [
            'match',
            ['get', 'main_aqi'],
            1,
            'id-aqi-1',
            2,
            'id-aqi-2',
            3,
            'id-aqi-3',
            4,
            'id-aqi-4',
            5,
            'id-aqi-5',
            'id-aqi-x' // any other store type
          ],
          "icon-size": 0.2,
          "icon-allow-overlap": true,
          "icon-ignore-placement": true
        },
        "paint": {
          "icon-color": "#000"
        }
      },
      'continent-label'
    );
  });

  console.log(_mymap.getStyle().layers)

  _mymap.on('click', `id-air_pollution`, (e) => {

    const features = _mymap.queryRenderedFeatures(e.point, {
      layers: [`id-air_pollution`]
    });
    console.log(features);
  });

  mapbox__streetview_coverage__toc();

  // _mymap.on('sourcedata', ({isSourceLoaded, sourceId}) => {
    
  //   if(isSourceLoaded == true){
 
  //     if(sourceId == 'air_pollution'){

  //       let tmp_cities = _mymap.queryRenderedFeatures({ layers: ['id-'+'air_pollution'] });

  //       let marker__slug = 'marker__city';
  //       $('.'+marker__slug).remove();

  //       tmp_cities.forEach(element => {

  //         let p = element.properties;
  //         // _onsole.log(p);
  //         let el = document.createElement('div');
  //         el.className = marker__slug;
  //         el.setAttribute('id',p.item_token);
  //         new mapboxgl.Marker(el)
  //           .setLngLat([p.lng,p.lat]).addTo(_mymap);

  //         $('.'+marker__slug).css('width','200px');
  //         $('.'+marker__slug).css('height','35px');
  //         // $('.'+marker__slug).css('background-color','white');
  //         $('.'+marker__slug).css('border','0px solid');

  //         let g_attributes = JSON.parse(p.g_attributes);

  //         let objSchema = cyp002__items__schema.filter(
  //           (x) => x.slug === 'aqi'
  //         )[0];

  //         let objIcon = objSchema.decode.filter(
  //           (x) => x.code === g_attributes.main.aqi
  //         )[0];

  //         let current_zoom = _mymap.getZoom();
  //         let marker_display = 'none';
  //         let marker_bg_icon = '#0000';
  //         if(current_zoom < 10 ){
  //         }
  //         else{
  //           marker_display = 'block';
  //           marker_bg_icon = '#000';
  //         }

  //         $('#'+p.item_token)
  //           .html(`
  //             <div style="width:100%;text-align:center;">
  //               <div class="display-table" style="width:0px;margin:auto;">
  //                 <div tag="row" style="height:35px;">
  //                   <div tag="cell" class="marker_label" style="
  //                     text-align:center;
  //                     background-color: #ffffff;
  //                     font-size: 150%;
  //                     display: ${marker_display};
  //                     "
  //                     city_name = "${p.name}" 
  //                     aqi = "${g_attributes.main.aqi}"
  //                     >
  //                     ${p.name}
  //                   </div>
  //                   <div tag="cell" class="marker_icon" style="
  //                     text-align:center;
  //                     background-color: ${marker_bg_icon};
  //                     color:#fff;
  //                     font-size: 150%;
  //                     width:50px;
  //                     "
  //                     >
  //                     ${objIcon.icon}
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           `);

  //       });

  //     }

  //   }

  // });

  // _mymap.on('zoom', () => {
  //   cyp003_display();
  // });  

}

function cyp003_display(){
  let _mymap = mymap__get();
  let current_zoom = _mymap.getZoom();
  if(current_zoom < 10 ){
    $('.marker_label').css('display','none');
    $('.marker_icon').css('background-color','#0000');
  }
  else{
    $('.marker_label').css('display','block');
    $('.marker_icon').css('background-color','#000');
  }
  
}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function mapbox__streetview_coverage__toc(){

  let _lyr_token = _layer__name;

  let _container = $('.sidebar__extra');
  _container.append(`
    <div class="tocbox" \
      lyr_token="${_lyr_token}" >\
      <div class="tocbox__check" >
        <input type="checkbox" \
          class="form-check-input tocbox__check__input" 
          value="" \
          lyr_token="${_lyr_token}" checked >
      </div>\
      <div class="tocbox__label" >
        Air Pollution
      </div>
      <div class="tocbox__expand"  \
        lyr_token="${_lyr_token}" >
        <i style="display:none;" class="bi bi-chevron-expand"></i>
      </div>
    </div>
  `);

  $(`.tocbox__check__input[lyr_token="${_lyr_token}"]`).on('click', function() {

    let _checked = $(this).is(':checked');
    let _lyr_token = $(this).attr('lyr_token');

    _visibility({_checked,_lyr_token});

    return;

  });

}

function _visibility(optIn){
  let {
    _checked,
    _lyr_token
  } = optIn;

  let _mymap = mymap__get();

  if(_checked == true){
    _mymap.setLayoutProperty(`id-${_lyr_token}`, 'visibility', 'visible');
  }
  else{
    _mymap.setLayoutProperty(`id-${_lyr_token}`, 'visibility', 'none');
  }

}