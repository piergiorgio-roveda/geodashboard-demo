import { default__class1 } from '../../_default/js/default__classes.js';
import { mymap__ready__set } from './mapState.js';
import { mapbox__init } from './mapbox__init.js';
import { template__init } from './template__init.js';
import { message__start__init } from './message__start.js';
import { mapbox__cities__init } from './mapbox__cities.js';

const _default__class1 = new default__class1();

mymap__ready__set(false);

console.warn("To enter dev mode, press Ctrl + Shift + I (Windows/Linux) or Command + Option + I (Mac).");
console.warn("Try also `showDevCommands()` in the console.");
console.warn('Type %c_help()%c in the console for a guide to application functions.', 'font-weight: bold;', '');

function _init(){

  mapbox__init();
  template__init();
  mapbox__cities__init();
  message__start__init();

}

_init();