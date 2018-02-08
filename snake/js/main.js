const View = require('./snake-view.js');
import $l from '../../lib/main.js';


$l(() => {
  const root = $l('.snake-game');
  new View(root);
});

window.$l = $l;
