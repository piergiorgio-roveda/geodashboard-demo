import { default__class1 } from '../../_default/js/default__classes.js';
import { mymap__ready__set } from './mapState.js';
import { mapbox__init } from './mapbox__init.js';
import { mapbox__historic_castle__init } from './mapbox__historic_castle.js';
import { template__init } from './template__init.js';
import { poi__add__init } from './poi__add.js';

const _default__class1 = new default__class1();

mymap__ready__set(false);

console.warn("To enter dev mode, press Ctrl + Shift + I (Windows/Linux) or Command + Option + I (Mac).");
console.warn("Try also `showDevCommands()` in the console.");
console.warn('Type %c_help()%c in the console for a guide to application functions.', 'font-weight: bold;', '');

function _init(){

  mapbox__init();
  mapbox__historic_castle__init();
  // _default__class1.help();
  template__init();
  poi__add__init();

}

_init();