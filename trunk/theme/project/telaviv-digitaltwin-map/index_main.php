<main>
  <article>
    <div class="article__header">
      <h1 class="display-6"><?php echo $_map_title;?></h1>
    </div>
    <div class="article__nav">
      <ul class="nav nav-tabs" style="width:100%">
        <li class="nav-item">
          <a section="description" class="nav-link article--nav active" aria-current="page" href="#"><i class="bi bi-justify-left"></i></a>
        </li>
        <li class="nav-item">
          <a section="code" class="nav-link article--nav" href="#"><i class="bi bi-code-slash"></i></a>
        </li>
        <li class="nav-item">
          <a section="external" class="nav-link article--nav" href="#"><i class="bi bi-link-45deg"></i></a>
        </li>
      </ul>
    </div>
    <div class="article__body">
      <section class="article__section article__section__description">
        <h2>Exploring the Digital Twin of Tel Aviv with [GEO]DASHBOARD</h2>
        <p>
          In this visualization, we see an advanced WebGIS application showcasing the capabilities of the [GEO]DASHBOARD. The image represents a digital twin of Tel Aviv, integrating multiple layers of geospatial data for comprehensive urban analysis.
        </p>
        <h3>Key Features Illustrated:</h3>
        <p>
          <ul>
          <li>
          3D Buildings: The buildings are rendered in 3D, providing a realistic perspective of the urban landscape. This feature allows users to visualize and analyze the city's architecture and infrastructure more effectively. Source: <a href="https://overturemaps.org/" target="_blank">Overture Map</a>
          </li>
          <li>
          Population Density: The map includes a population density layer, represented by a gradient scale ranging from 6.6k to 11.3k people per 400 meters. This layer is crucial for urban planners and decision-makers to understand population distribution and plan accordingly. Source: <a href="https://www.kontur.io/portfolio/population-dataset/" target="_blank">Kontur Population density dataset</a></li>
          <li>
          Points of Interest (POI): Labeled points of interest are scattered throughout the map, including various amenities and landmarks such as parks, restaurants, and businesses. These labels help users quickly identify and locate key places within the city. Source: <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a></li>
          </ul>
        </p>
        <h3>Interactive Controls:</h3>
        <p>
          <ul>
          <li>
          Layer Toggle: Users can easily toggle between different layers, such as 3D buildings, population density, and points of interest, using the checkboxes on the left panel. This flexibility allows for customized views and specific analysis.</li>

          <li>
          Density Slider: The population density layer includes an interactive slider, enabling users to filter and visualize areas based on population thresholds. This dynamic tool helps in performing focused demographic studies.</li>
          </ul>
        
        </p>
        <h3>Application and Benefits:</h3>
        <p>
          The [GEO]DASHBOARD's powerful integration of geospatial data into a single interactive platform provides an invaluable tool for urban planners, architects, and decision-makers. By visualizing the city in a comprehensive 3D environment, stakeholders can make informed decisions on urban development, infrastructure projects, and resource allocation.
        </p><p>
          This digital twin technology not only enhances the planning process but also facilitates communication among different departments and the public. By providing a clear and detailed visual representation of urban areas, the [GEO]DASHBOARD helps bridge the gap between complex data and practical applications.
        </p>
        <h3>
        Flexibility and Performance:</h3>
        <p>
        The flexibility and performance of the GEO Dashboard are significantly enhanced by leveraging <a href="https://www.mapbox.com/" target="_blank">MapBox</a>, <a href="https://github.com/mapbox/vector-tile-spec" target="_blank">MapBox Vector Tiles (MVT)</a>, and <a href="https://postgis.net/" target="_blank">PostGIS</a>. MapBox offers a highly customizable and responsive mapping platform, allowing for smooth and interactive user experiences. MapBox Vector Tiles ensure efficient data delivery and rendering, providing high performance even with complex and large datasets. PostGIS, as a powerful spatial database extender for PostgreSQL, supports advanced geospatial queries and robust data management. This combination of technologies ensures that the GEO Dashboard delivers fast, reliable, and scalable solutions, meeting the diverse needs of modern urban planning and geospatial analysis.
        </p><p>
          Explore how the [GEO]DASHBOARD can transform your urban planning initiatives and provide deeper insights into your city's dynamics.
        </p>
      </section>
      <section class="article__section article__section__code">
        <p>
          GitHub is a code hosting platform for version control and collaboration. It lets you and others work together on projects from anywhere.<br>
          Here is the link of this map: <a href="https://github.com/piergiorgio-roveda/geodashboard-demo/tree/main/trunk/theme/project/telaviv-digitaltwin-map" target="_blank">telaviv-digitaltwin-map</a>
        </p>
      </section>
      <section class="article__section article__section__external">
        <p>
          External link, resources ...
        </p>
      </section>
    </div>
    <div class="article__footer">
      <div class="form-check form-switch">
        <input checked class="form-check-input message__start--check" type="checkbox" role="switch" id="flexSwitchCheckChecked">
        <label class="form-check-label" for="flexSwitchCheckChecked">Show this message onStart</label>
      </div>
      <button type="button" class="btn__main__close btn"><i class="bi bi-x-square-fill"></i></button>
    </div>
  </article>
</main>