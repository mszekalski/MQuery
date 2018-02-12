const $l = require('./main.js');

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

  empty () {
      this.html('');
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

export default DOMNodeCollection;
