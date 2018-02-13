// const Board = require('./board');
import $l from '../../lib/main.js';
import Board from './board.js';

class View {
  constructor($el) {
    this.$el = $el;
    this.board = new Board(20);
    this.setUpGrid();
    $l('window').on("keydown", this.handleKeyEvent.bind(this));
    setInterval(this.step, 500);
  }


  handleKeyEvent(event) {

    if (event.key === 'ArrowUp') {
      this.board.snake.turn("N");
    } else if (event.key === 'ArrowDown') {
      this.board.snake.turn("S");
    } else if (event.key === 'ArrowRight') {
      this.board.snake.turn("E");
    } else if (event.key === 'ArrowLeft') {
      this.board.snake.turn("W");
    }
  }

  render() {


  }

  setUpGrid() {

    let html = '';
    for (let i = 0; i < this.board.dim; i++) {
      html += "<ul>";
      for (let j = 0; j < this.board.dim; j++) {
        html += "<li></li>";
      }
      html += "</ul>";
    }

    this.$el.html(html);
    this.$li = this.$el.find('li');
  }

  step() {

  }


}

export default View;
