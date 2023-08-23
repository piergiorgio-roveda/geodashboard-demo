<script>
  $(document).ready(function() {

    console.log('list_simpson: ready!')

	  var tableAPI = "https://www.cityplanner.biz/webapp/springfieldmap/pt_simpson.geojson";

    $('.blog-sidebar').append('<h2>Place list</h2>\
      <div class="simpson-cointainer" \
        style="height: 500px; \
          overflow-y: scroll; \
          overflow-x: hidden; \
          padding: 10px;"></div>');

	  $.getJSON(tableAPI, function(data){

      var A=1;
      var B=2;
      var C=3;
      var D=4;

      var dataSet = new Array();
      var arr = new Array();

      var thisCOUNT = 0;

      arr=[];
      $.each(data.features, function (key, val) {

        thisCOUNT++;
        geometry = val.geometry;

        if(geometry.type==="Point"){
          lat=geometry.coordinates[1];
          lng=geometry.coordinates[0];
          properties = val.properties;

          $('.simpson-cointainer').append( ''
            +'<div class="row">'
              +'<div class="col-3">'
                +'<img src="'+properties.image+'" style="width:100%;"/>'
              +'</div>'
              +'<div class="col-9">'
                +'<p style="font-size:75%;">'
                +'<a href="https://www.cityplanner.biz/webapp/springfieldmap/index.php?place='+properties.name+'" target="_blank">'+properties.name+'</a> '
                + properties.descr.substr(0, 80) + ' [<a href="https://www.cityplanner.biz/webapp/springfieldmap/index.php?place='+properties.name+'" '
                +'target="_blank">...</a>]'
                +'</p>'
              +'</div>'
            +'<div><!--ROW-->'
          +'');
        }

      }); // EACH -end
      //console.log(arr);
    });

    // You will need to replace the 'api_key' and all 'L.TileLayer' ID's with your own. get your keys here: http://developer.digitalglobe.com/docs/maps-api

    var map;
    var southWest = L.latLng(45.440605, 9.117321),   //Questa variabile
        northEast = L.latLng(45.492313, 9.246679), //definisce i margini
        bounds = L.latLngBounds(southWest, northEast);     //geografici della mappa

    var map = L.map('map', {
      center: [45.464907, 9.186236],
      zoomControl: false,
      maxBounds: bounds,               //questa variabile blocca la mappa sui margini definiti prima
      maxZoom:16,
      minZoom:14
    });
    map.fitBounds(bounds);

    var basemap_0 = L.tileLayer('https://www.cityplanner.biz/webapp/springfieldmap/{z}/{x}/{y}.png', {
        tms: true,
        maxZoom: 18,
        zIndex:1000,
        attribution: ''
            + 'Imagery © <a href="http://www.smaxity.net/images/SpringfieldMap.jpg">smaxity.net/</a>'
            + '<br>Map data <a href="http://simpsons.playgis.com/">simpsons.playgis</a>'
            + '<br>More info at: <a href="https://www.cityplanner.biz/simpsons-city-map/">CityPlanner Simpsons City Map</a>'
    });
    basemap_0.addTo(map);


  }); //$(document).ready


</script>