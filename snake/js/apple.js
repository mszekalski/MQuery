import $l from '../../lib/main.js';
import Coord from './coord.js';

class Apple {
  constructor(board) {
    this.board = board;
    this.replace();


  }

  replace() {
    this.location = new Coord(Math.round(Math.random() * this.board.dim), Math.round(Math.random() * this.board.dim));
  }

}

export default Apple;
