/******/ (function(modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {}; // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {}
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    ); // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true; // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules; // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        /******/ configurable: false,
        /******/ enumerable: true,
        /******/ get: getter
        /******/
      });
      /******/
    }
    /******/
  }; // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function(module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module["default"];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, "a", getter);
    /******/ return getter;
    /******/
  }; // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = ""; // Load entry module and return exports
  /******/
  /******/ /******/ return __webpack_require__((__webpack_require__.s = 0));
  /******/
})(
  /************************************************************************/
  /******/ [
    /* 0 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__ = __webpack_require__(
        1
      );

      window.$l = function(selector) {
        const queue = [];
        if (selector instanceof HTMLElement) {
          return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__[
            "a" /* default */
          ]([selector]);
        } else if (typeof selector === "string") {
          const nodeList = Array.from(document.querySelectorAll(selector));
          return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__[
            "a" /* default */
          ](nodeList);
        } else if (typeof selector === "function") {
          queue.push(selector);
          if (document.readyState === "complete") {
            for (var i = 0; i < queue.length; i++) {
              queue[i]();
            }
            return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__[
              "a" /* default */
            ](document);
          }
        }
      };

      $l.extend = function(...args) {
        return Object.assign(...args);
      };

      $l.ajax = function(options) {
        const xhr = new XMLHttpRequest();
        const defaults = {
          success: () => {},
          error: () => {},
          url: "",
          method: "GET",
          data: {},
          contentType: "HTML"
        };
        const merged = $l.extend(defaults, options);
        xhr.open(merged.method, merged.url);
        const optionalData = merged.data;
        xhr.send(JSON.stringify(optionalData));
        xhr.onload = function() {
          if (xhr.status === 200) {
            merged.success(JSON.parse(xhr.response));
          } else {
            merged.error(JSON.parse(xhr.response));
          }
        };
        return xhr;
      };

      /***/
    },
    /* 1 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      class DOMNodeCollection {
        constructor(HTMLElements) {
          this.HTMLElements = HTMLElements;
        }

        html(string) {
          if (typeof string !== "string") {
            return this.HTMLElements[0].innerHTML;
          }
          for (let i = 0; i < this.HTMLElements.length; i++) {
            this.HTMLElements[i].innerHTML = string;
          }
        }

        empty() {
          this.html("");
        }

        append(element) {
          for (let i = 0; i < this.HTMLElements.length; i++) {
            if (element instanceof HTMLElement) {
              this.HTMLElements[i].innerHTML += element.outerHTML;
            } else if (typeof element === "string") {
              this.HTMLElements[i].innerHTML += element;
            } else {
              for (let j = 0; j < element.HTMLElements.length; j++) {
                this.HTMLElements[i].innerHTML +=
                  element.HTMLElements[j].outerHTML;
              }
            }
          }
        }

        attr(attributeName, value) {
          if (value === undefined) {
            return this.HTMLElements[0].attributes;
          } else {
            [0].setAttribute(value);
          }
        }

        addClass(className) {
          for (var i = 0; i < this.HTMLElements.length; i++) {
            this.HTMLElements[i].classList.add(className);
          }
        }

        removeClass(className) {
          for (var i = 0; i < this.HTMLElements.length; i++) {
            this.HTMLElements[i].classList.remove(className);
          }
        }

        children() {
          let children = [];
          for (var i = 0; i < this.HTMLElements.length; i++) {
            children.push(this.HTMLElements[i].children);
          }
          return new DOMNodeCollection(children);
        }

        parent() {
          let parents = [];
          for (var i = 0; i < this.HTMLElements.length; i++) {
            parents.push(this.HTMLElements[i].parentNode);
          }
          return new DOMNodeCollection(parents);
        }

        find(selector) {
          let selection = [];
          for (var i = 0; i < this.HTMLElements.length; i++) {
            selection.push(this.HTMLElements[i].querySelectorAll(selector));
          }
          return new DOMNodeCollection(selection);
        }

        remove() {
          for (var i = 0; i < this.HTMLElements.length; i++) {
            this.HTMLElements[i].parentNode.removeChild(this.HTMLElements[i]);
          }
        }

        on(type, callback) {
          for (var i = 0; i < this.HTMLElements.length; i++) {
            this.HTMLElements[i].addEventListener(type, callback);
            this.HTMLElements[i].listener = callback;
          }
          return this;
        }

        off(type) {
          for (var i = 0; i < this.HTMLElements.length; i++) {
            this.HTMLElements[i].removeEventListener(
              type,
              this.HTMLElements[i].listener
            );
          }
          return this;
        }
      }

      /* harmony default export */ __webpack_exports__["a"] = DOMNodeCollection;

      /***/
    }
    /******/
  ]
);
