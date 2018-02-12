const Snake = require('./snake.js');
const $l = require('../../lib/main.js');

class Board {
  constructor(dim) {

    this.dim = dim;
    this.grid = new Array(dim);
    this.snake = new Snake;
    for (let i = 0; i < this.grid.length; i++){
      this.grid[i] = new Array(dim);
      for (let j = 0; j < this.grid[i].length; j++) {
        this.grid[i][j] = null;
      }
    }
  }

  render() {
    const grid = this.grid;
  }




}

module.exports = Board;
