// const SnakeView = require('./snake-view');
import $l from '../../lib/main.js';
import SnakeView from './snake-view.js';

$l(function() {
  const root = $l('.snake-game');
  new SnakeView(root);
});

window.$l = $l;
