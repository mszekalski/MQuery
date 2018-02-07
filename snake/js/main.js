const SnakeView = require('./snake-view.js');
const $l = require('../../lib/main.js');

$l(function() {
  const root = $l('.snake-game');
  new SnakeView(root);
});

window.$l = $l;
