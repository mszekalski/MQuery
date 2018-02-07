
import DOMNodeCollection from './dom_node_collection.js';

window.$l = function(selector) {
  const queue = [];
  if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  } else if (typeof selector === 'string') {
    const nodeList = Array.from(document.querySelectorAll(selector));
    return new DOMNodeCollection(nodeList);
  } else if (typeof selector === 'function') {
    queue.push(selector);
      if (document.readyState === "complete") {
        for (var i = 0; i < queue.length; i++) {
          queue[i]();
        }
        return new DOMNodeCollection(document);
    }
  }

};

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
