// const Coord = require('./coord.js');
import $l from '../../lib/main.js';
import Coord from './coord.js';

class Snake {
  constructor(board) {
    this.direction = 'N';
    this.board = board;
    const center = new Coord(Math.floor(board.dim/2), Math.floor(board.dim/2));
    this.segments = [center];
    this.board = board;
  }

  move() {

  }

  turn(dir) {

    this.direction = dir;
  }


}

export default Snake;
