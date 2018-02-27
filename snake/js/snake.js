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
    this.growth = 2;

  }

  head() {
    return this.segments.slice(-1)[0];
  }

  eat() {
    if (this.head().equals(this.board.apple.location)) {
      
      this.growth += 1;
      return true;
    } else {
      return false;
    }
  }

  move() {
    if (this.eat()) {

      this.board.apple.replace();

    }
    this.segments.push(this.head().plus(Snake.MOVES[this.direction]));
    if (this.growth > 0) {
      this.growth -= 1;
    } else {
      this.segments.shift();
    }

  }

  turn(dir) {

    this.direction = dir;
  }




}

Snake.MOVES = {
  N: new Coord(-1, 0),
  S: new Coord(1, 0),
  E: new Coord(0, 1),
  W: new Coord(0, -1)
};

export default Snake;
