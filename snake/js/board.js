
// const Snake = require('./snake.js');
import $l from '../../lib/main.js';
import Snake from './snake.js';
import Apple from './apple.js';

class Board {
  constructor(dim) {
    this.dim = dim;
    this.grid = new Array(dim);
    this.snake = new Snake(this);
    this.apple = new Apple(this);
    for (let i = 0; i < this.grid.length; i++){
      this.grid[i] = new Array(dim);
      for (let j = 0; j < this.grid[i].length; j++) {
        this.grid[i][j] = null;
      }
    }
  }

  render() {
    const grid = this.grid;
    for (let i = 0; i < this.snake.segments.length; i++) {
      let segment = this.snake.segments[i];
      grid[segment.i][segment.j] = 'S';
    }
    grid[this.apple.location.i][this.apple.location.j] = "A";


  }

  validPos(coord) {
    if (coord.i < 0 || coord.i >= this.dim || coord.j < 0 || coord.j >= this.dim) {
      return false;
    }
    return true;
  }




}

export default Board;
