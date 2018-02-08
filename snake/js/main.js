const View = require('./snake-view.js');
const $l = require('../../lib/main.js');

$l(function() {
  const root = $l('.snake-game');
  new View(root);
});

window.$l = $l;
