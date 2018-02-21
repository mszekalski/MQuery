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
    this.render();

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
    this.updateClasses(this.board.snake.segments, 'snake');
  }

  updateClasses(coords, className) {
    $l('li').filter(`${className}`).removeClass();
    for (let i = 0; i < coords.length; i++){
      const flat = (coords[i].i * this.board.dim) + coords[i].j;
      $l('li').eq(flat).addClass(className);
    }
  }

  step() {

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




}

export default View;
