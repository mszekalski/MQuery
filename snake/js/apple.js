import $l from '../../lib/main.js';
import Coord from './coord.js';

class Apple {
  constructor(board) {
    this.board = board;
    this.location = new Coord(Math.round(Math.random() * board.dim), Math.round(Math.random() * board.dim));


  }

}

export default Apple;
