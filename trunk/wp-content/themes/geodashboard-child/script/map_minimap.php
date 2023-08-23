<script>
  $(document).ready(function() {
    var styles = ''
      +'#mapid{'
        +'width:100%;'
        +'height: 400px;'
      +'}'
    +'';
    var styleSheet = document.createElement("style");
    styleSheet.setAttribute('tag', 'style on ready');
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    mymap.invalidateSize();

  }); //$(document).ready

  var mymap = L.map('mapid').setView([45.50658275450463, 9.223012158561506], 12);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}@2x.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, © <a href="https://carto.com/attribution">CARTO</a></div>',
    maxZoom: 18
  }).addTo(mymap);
  var marker = L.marker([45.50658275450463, 9.223012158561506]).addTo(mymap);

</script>