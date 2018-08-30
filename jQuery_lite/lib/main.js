const DOMNodeCollection = require('./domnodecollection.js');
const callbacks = [];

window.$l = (argument) => {


  console.log('bears-beats-battlestargalactica');
  if (argument.constructor.name === 'String') {
    let list = document.querySelectorAll(argument);
    let items = [];
    list.forEach((el) => items.push(el));
    return new DOMNodeCollection(items);
  } else if (argument instanceof HTMLElement) {
    return new DOMNodeCollection([argument]);
  } else if (argument.constructor.name === 'Function') {
    if(document.readyState === "complete") {
      argument();
    }
    else {
      if (callbacks.length === 0) {
        callbacks.push(argument);
        window.addEventListener("load", () => {
          callbacks.forEach(fn => {

            fn();
          });
        }, false);
      } else {
        callbacks.push(argument);
      }
    }
  }
};

window.$l.extend = (...args) => {
  let newObj = args[0];

  for (let obj of args) {
    let keys = Object.keys(obj);

    for (let key of keys) {
      newObj[key] = obj[key];
    }
  }

  return newObj;
};


window.$l.ajax = (options = {}) => {
  let callback200 = () => {console.log("Status 200");};
  let callbackfail = () => {console.log("Error");};
  let defopt = { method: "GET", url: "http://httpbin.org/get", async: true, cb: callback200, cbf: callbackfail };
  window.$l.extend(defopt, options);
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == XMLHttpRequest.DONE) {
      if (xhttp.status == 200) {
        defopt.cb();
      } else {
        defopt.cbf();
      }
    }
  };

  xhttp.open(defopt.method, defopt.url, defopt.async);
  xhttp.send();
};
