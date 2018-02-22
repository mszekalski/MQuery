
import DOMNodeCollection from './dom_node_collection.js';

const queue = [];

const $l = function(selector) {
  if (selector instanceof HTMLElement || selector === window) {
    return new DOMNodeCollection([selector]);
  } else if (typeof selector === 'string') {
    const nodeList = Array.from(document.querySelectorAll(selector));
    return new DOMNodeCollection(nodeList);
  } else if (typeof selector === 'function') {
    queue.push(selector);
  }

};

document.addEventListener('readystatechange', () => {
  if (document.readyState === "complete") {
    for (var i = 0; i < queue.length; i++) {
      queue[i]();
    }
    return new DOMNodeCollection(document);
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

export default $l;
