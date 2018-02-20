
// const Snake = require('./snake.js');
import $l from '../../lib/main.js';
import Snake from './snake.js';

class Board {
  constructor(dim) {
    this.dim = dim;
    this.grid = new Array(dim);
    this.snake = new Snake(this);
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

    
  }




}

export default Board;
