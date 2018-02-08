const Board = require('./board.js');
const $l = require('../../lib/main.js');

class View {
  constructor($el) {
    this.$el = $el;
    this.board = new Board(20);
    $l(window).on("keydown", console.log('this')).bind(this);
    setInterval(this.step, 500);
  }

  step() {

  }

  handleKeyEvent(event) {

  }


}

export default View;
