import { mymap__isReady,mymap__get } from './mapState.js';

let _layer__name = 'buildings_telaviv';
let _layer__label = 'Buildings 3D';

let _mymap;

export async function mapbox__terrain__init(){

  if(mymap__isReady() == false){
    await timeout(500);
    return await mapbox__terrain__init();
    // return false;
  }

  _mymap = mymap__get();

  _mymap.addSource('mapbox-dem', {
    'type': 'raster-dem',
    'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
    // 'url': 'mapbox://mapbox.mapbox-terrain-v2',
    'tileSize': 512,
    'maxzoom': 14
  });

  _mymap.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 2.5 });

}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
