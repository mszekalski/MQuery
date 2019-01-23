// const Coord = require('./coord.js');
import $l from "../../lib/main.js";
import Coord from "./coord.js";

class Snake {
  constructor(board) {
    this.direction = "N";
    this.board = board;
    const center = new Coord(
      Math.floor(board.dim / 2),
      Math.floor(board.dim / 2)
    );
    this.segments = [center];
    this.board = board;
    this.growth = 2;
    this.turning = false;
  }

  head() {
    return this.segments.slice(-1)[0];
  }

  occupied(apple) {
    for (let i = 0; i < this.segments.length; i++) {
      if (this.segments[i].i === apple.i && this.segments[i].j === apple.j) {
        return true;
      }
    }
    return false;
  }

  eat() {
    if (this.head().equals(this.board.apple.location)) {
      this.growth += 1;
      return true;
    } else {
      return false;
    }
  }

  valid() {
    const head = this.head();

    if (this.board.validPos(this.head()) === false) {
      return false;
    }

    for (let i = 0; i < this.segments.length - 1; i++) {
      if (this.segments[i].equals(head)) {
        return false;
      }
    }
    return true;
  }

  move() {
    if (this.eat()) {
      this.board.apple.replace();
    }
    this.segments.push(this.head().plus(Snake.MOVES[this.direction]));
    this.turning = false;
    if (this.growth > 0) {
      this.growth -= 1;
    } else {
      this.segments.shift();
    }

    if (this.valid() === false) {
      this.segments = [];
    }
  }

  turn(dir) {
    if (this.turning === true) {
      return;
    }
    this.turning = true;
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
