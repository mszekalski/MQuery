import $l from "../../lib/main.js";
import Board from "./board.js";

class View {
  constructor($el) {
    this.$el = $el;
    this.board = new Board(20);
    this.setUpGrid();
  }

  start() {
    $l(".start-div").css("display", "none");
    $l(window).on("keydown", this.handleKeyEvent.bind(this));
    setInterval(this.step.bind(this), 300);
  }

  handleKeyEvent(event) {
    if (event.key === "ArrowUp" && this.board.snake.direction !== "S") {
      this.board.snake.turn("N");
    } else if (
      event.key === "ArrowDown" &&
      this.board.snake.direction !== "N"
    ) {
      this.board.snake.turn("S");
    } else if (
      event.key === "ArrowRight" &&
      this.board.snake.direction !== "W"
    ) {
      this.board.snake.turn("E");
    } else if (
      event.key === "ArrowLeft" &&
      this.board.snake.direction !== "E"
    ) {
      this.board.snake.turn("W");
    }
  }

  render() {
    this.updateClasses(this.board.snake.segments, "snake");
    this.updateClasses([this.board.apple.location], "apple");
  }

  updateClasses(coords, className) {
    $l("li")
      .filter(`${className}`)
      .removeClass(className);
    for (let i = 0; i < coords.length; i++) {
      const flat = coords[i].i * this.board.dim + coords[i].j;
      $l("li")
        .eq(flat)
        .addClass(className);
    }
  }

  step() {
    if (this.board.snake.segments.length > 0) {
      this.board.snake.move();
      this.render();
    } else {
      alert("GAME OVER");
      this.board = new Board(20);
    }
  }

  setUpGrid() {
    let html = "";
    for (let i = 0; i < this.board.dim; i++) {
      html += "<ul>";
      for (let j = 0; j < this.board.dim; j++) {
        html += "<li></li>";
      }
      html += "</ul>";
    }

    this.$el.html(html);
    this.$li = this.$el.find("li");
  }
}

export default View;
