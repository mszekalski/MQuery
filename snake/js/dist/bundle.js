/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__ = __webpack_require__(6);



const queue = [];

const $l = function(selector) {
  if (selector instanceof HTMLElement || selector === window) {
    return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__["a" /* default */]([selector]);
  } else if (typeof selector === 'string') {
    const nodeList = Array.from(document.querySelectorAll(selector));
    return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__["a" /* default */](nodeList);
  } else if (typeof selector === 'function') {
    queue.push(selector);
  }

};

document.addEventListener('readystatechange', () => {
  if (document.readyState === "complete") {
    for (var i = 0; i < queue.length; i++) {
      queue[i]();
    }
    return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__["a" /* default */](document);
  }
});


$l.extend = function (...args) {
  return Object.assign(...args);
};

$l.ajax = function(options) {
  const xhr = new XMLHttpRequest();
  const defaults = {
    success: () => {},
    error: () => {},
    url: '',
    method: "GET",
    data: {},
    contentType: 'HTML'
  };

  const merged = $l.extend(defaults, options);
  xhr.open(merged.method, merged.url);
  const optionalData = merged.data ;
  xhr.send(JSON.stringify(optionalData));
  xhr.onload = function () {
    if (xhr.status === 200) {

      merged.success(JSON.parse(xhr.response));
    } else {
      merged.error(JSON.parse(xhr.response));
    }
};
return xhr;
};

/* harmony default export */ __webpack_exports__["default"] = ($l);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_main_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__snake_view_js__ = __webpack_require__(2);
// const SnakeView = require('./snake-view');



Object(__WEBPACK_IMPORTED_MODULE_0__lib_main_js__["default"])(function() {
  const root = Object(__WEBPACK_IMPORTED_MODULE_0__lib_main_js__["default"])('.snake-game');
  new __WEBPACK_IMPORTED_MODULE_1__snake_view_js__["a" /* default */](root);
});

window.$l = __WEBPACK_IMPORTED_MODULE_0__lib_main_js__["default"];


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_main_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__board_js__ = __webpack_require__(3);
// const Board = require('./board');



class View {
  constructor($el) {
    this.$el = $el;
    this.board = new __WEBPACK_IMPORTED_MODULE_1__board_js__["a" /* default */](20);
    this.setUpGrid();
    Object(__WEBPACK_IMPORTED_MODULE_0__lib_main_js__["default"])(window).on("keydown", this.handleKeyEvent.bind(this));
    setInterval(this.step.bind(this), 300);


  }


  handleKeyEvent(event) {

    if (event.key === 'ArrowUp' && this.board.snake.direction !== "S") {
      this.board.snake.turn("N");
    } else if (event.key === 'ArrowDown' && this.board.snake.direction !== "N") {
      this.board.snake.turn("S");
    } else if (event.key === 'ArrowRight' && this.board.snake.direction !== "W") {
      this.board.snake.turn("E");
    } else if (event.key === 'ArrowLeft' && this.board.snake.direction !== "E") {
      this.board.snake.turn("W");
    }
  }

  render() {
    this.updateClasses(this.board.snake.segments, 'snake');
    this.updateClasses([this.board.apple.location], 'apple');
  }

  updateClasses(coords, className) {

    Object(__WEBPACK_IMPORTED_MODULE_0__lib_main_js__["default"])('li').filter(`${className}`).removeClass(className);
    for (let i = 0; i < coords.length; i++){
      const flat = (coords[i].i * this.board.dim) + coords[i].j;
      Object(__WEBPACK_IMPORTED_MODULE_0__lib_main_js__["default"])('li').eq(flat).addClass(className);
    }


  }

  step() {
    if (this.board.snake.segments.length > 0) {
      this.board.snake.move();
      this.render();
    } else {
      alert("GAME OVER");
      this.board = new __WEBPACK_IMPORTED_MODULE_1__board_js__["a" /* default */](20);
    }
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

/* harmony default export */ __webpack_exports__["a"] = (View);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_main_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__snake_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__apple_js__ = __webpack_require__(9);

// const Snake = require('./snake.js');




class Board {
  constructor(dim) {
    this.dim = dim;
    this.grid = new Array(dim);
    this.snake = new __WEBPACK_IMPORTED_MODULE_1__snake_js__["a" /* default */](this);
    this.apple = new __WEBPACK_IMPORTED_MODULE_2__apple_js__["a" /* default */](this);
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

/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_main_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__coord_js__ = __webpack_require__(5);
// const Coord = require('./coord.js');



class Snake {
  constructor(board) {
    this.direction = 'N';
    this.board = board;
    const center = new __WEBPACK_IMPORTED_MODULE_1__coord_js__["a" /* default */](Math.floor(board.dim/2), Math.floor(board.dim/2));
    this.segments = [center];
    this.board = board;
    this.growth = 2;
    this.turning = false;

  }

  head() {
    return this.segments.slice(-1)[0];
  }

  occupied(apple) {
    for (let i = 0; i < this.segments.length; i++){
      if (this.segments[i] === apple) {
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

    for (let i = 0; i < this.segments.length - 1; i++){
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

    if (this.valid() === false){
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
  N: new __WEBPACK_IMPORTED_MODULE_1__coord_js__["a" /* default */](-1, 0),
  S: new __WEBPACK_IMPORTED_MODULE_1__coord_js__["a" /* default */](1, 0),
  E: new __WEBPACK_IMPORTED_MODULE_1__coord_js__["a" /* default */](0, 1),
  W: new __WEBPACK_IMPORTED_MODULE_1__coord_js__["a" /* default */](0, -1)
};

/* harmony default export */ __webpack_exports__["a"] = (Snake);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Coord {
  constructor(i, j) {
    this.i = i;
    this.j = j;
  }

  plus(coordinates) {
    return new Coord(this.i + coordinates.i, this.j + coordinates.j);
  }

  equals(coordinates){
    return (this.i === coordinates.i) && (this.j === coordinates.j);
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Coord);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const $l = __webpack_require__(0);

class DOMNodeCollection {
  constructor(HTMLElements) {
    this.HTMLElements = HTMLElements;
  }


  html (string) {
    if (typeof string !== 'string') {
      return this.HTMLElements[0].innerHTML;
    }
    for (let i = 0; i < this.HTMLElements.length; i++){
      this.HTMLElements[i].innerHTML = string;
    }
  }

  eq (n) {
    for (let i = 0; i < this.HTMLElements.length; i++){
      if (i === n) {
        return new DOMNodeCollection([this.HTMLElements[i]]);
      }
    }
  }

  empty () {
      this.html('');
  }

  filter(className) {
    const filtered = [];
    for (let i = 0; i < this.HTMLElements.length; i++){
      if (this.HTMLElements[i].className.split(' ').includes(className)) {
        filtered.push(this.HTMLElements[i]);
      }
    }

    return new DOMNodeCollection(filtered);
  }

  append (element) {
    for (let i = 0; i < this.HTMLElements.length; i++){
      if (element instanceof HTMLElement) {
        this.HTMLElements[i].innerHTML += element.outerHTML;
      } else if (typeof element === 'string'){
        this.HTMLElements[i].innerHTML += element;
      } else  {
        for (let j = 0; j < element.HTMLElements.length; j++){
          this.HTMLElements[i].innerHTML += element.HTMLElements[j].outerHTML;
        }
      }
    }
  }

  attr (attributeName, value) {
    if (value === undefined) {
      return this.HTMLElements[0].attributes;
    } else {
      [0].setAttribute(value);
    }
  }

  addClass (className) {
    for (var i = 0; i < this.HTMLElements.length; i++) {
      this.HTMLElements[i].classList.add(className);
    }
  }


  removeClass (className) {
    for (var i = 0; i < this.HTMLElements.length; i++) {
      this.HTMLElements[i].classList.remove(className);
    }
  }


  children () {
    let children = [];
    for (var i = 0; i < this.HTMLElements.length; i++) {
      children.push(this.HTMLElements[i].children);
    }
    return new DOMNodeCollection(children);
  }

  parent () {
    let parents = [];
    for (var i = 0; i < this.HTMLElements.length; i++) {
      parents.push(this.HTMLElements[i].parentNode);
    }
    return new DOMNodeCollection(parents);
  }

  find (selector) {
    let selection = [];
    for (var i = 0; i < this.HTMLElements.length; i++) {
      selection.push(this.HTMLElements[i].querySelectorAll(selector));
    }
    return new DOMNodeCollection(selection);
  }

  remove () {
    for (var i = 0; i < this.HTMLElements.length; i++) {
      this.HTMLElements[i].parentNode.removeChild(this.HTMLElements[i]);
    }
  }

  on (type, callback) {
    for (var i = 0; i < this.HTMLElements.length; i++) {

      this.HTMLElements[i].addEventListener(type, callback);
      this.HTMLElements[i].listener = callback;
    }
    return this;
  }

  off (type) {
    for (var i = 0; i < this.HTMLElements.length; i++) {
      this.HTMLElements[i].removeEventListener(type, this.HTMLElements[i].listener);
    }
    return this;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (DOMNodeCollection);


/***/ }),
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_main_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__coord_js__ = __webpack_require__(5);



class Apple {
  constructor(board) {
    this.board = board;
    this.replace();


  }

  replace() {

    this.location = new __WEBPACK_IMPORTED_MODULE_1__coord_js__["a" /* default */](Math.floor(Math.random() * this.board.dim), Math.floor(Math.random() * this.board.dim));
    if (this.board.snake.occupied(this.location) === true) {
      this.replace();
    }
    return this.location;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Apple);


/***/ })
/******/ ]);