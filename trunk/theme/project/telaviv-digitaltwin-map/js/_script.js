import { default__class1 } from '../../_default/js/default__classes.js';
import { mymap__ready__set } from './mapState.js';
import { mapbox__init } from './mapbox__init.js';
import { template__init } from './template__init.js';
import { message__start__init } from './message__start.js';
import { mapbox__buildings__init } from './mapbox__buildings.js';
import { mapbox__terrain__init } from './mapbox__terrain.js';
import { mapbox__h3__population__init } from './mapbox__h3__population.js';
import { mapbox__poi_label__control__init } from './mapbox__poi_label__control.js';

const _default__class1 = new default__class1();

mymap__ready__set(false);

console.warn("To enter dev mode, press Ctrl + Shift + I (Windows/Linux) or Command + Option + I (Mac).");
console.warn("Try also `showDevCommands()` in the console.");
console.warn('Type %c_help()%c in the console for a guide to application functions.', 'font-weight: bold;', '');

function _init(){

  mapbox__init();
  template__init();
  message__start__init();
  mapbox__buildings__init();
  mapbox__terrain__init();
  mapbox__h3__population__init();
  mapbox__poi_label__control__init();

}

_init();