import $l from "../../lib/main.js";
import SnakeView from "./snake-view.js";

$l(function() {
  const root = $l(".snake-game");
  const game = new SnakeView(root);
  const button = $l(".start-div");

  const gameStartCallback = () => {
    game.start();
    root.off("click", gameStartCallback);
  };
  root.on("click", gameStartCallback);
  button.on("click", gameStartCallback);
});

window.$l = $l;
