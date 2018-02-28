import $l from '../../lib/main.js';
import Coord from './coord.js';

class Apple {
  constructor(board) {
    this.board = board;
    this.replace();


  }

  replace() {

    this.location = new Coord(Math.floor(Math.random() * this.board.dim), Math.floor(Math.random() * this.board.dim));
    while (this.board.snake.occupied(this.location) === true) {
      this.replace();
    }
    return this.location;
  }

}

export default Apple;
