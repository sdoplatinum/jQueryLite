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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/domnodecollection.js":
/*!**********************************!*\
  !*** ./lib/domnodecollection.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n  constructor(array) {\n    this.elements = array;\n    this.eventCallBacks = null;\n  }\n\n  html(argument) {\n    if (argument === undefined) {\n      return this.elements[0].innerHTML;\n    }\n\n    this.elements.forEach((el) =>{\n      el.innerHTML = argument;\n    });\n  }\n\n  empty() {\n    this.html(\"\");\n  }\n\n  append(argument) {\n    if (argument instanceof HTMLElement) {\n      this.elements.forEach( (el) => {\n        let inner = el.innerHTML;\n        let outer = argument.outerHTML;\n        let newInner = inner + outer;\n        el.innerHTML = newInner;\n      });\n    } else if (argument.constructor.name ===  'String') {\n      this.elements.forEach( (el) => {\n        let inner = el.innerHTML;\n        let newInner = inner + argument;\n        el.innerHTML = newInner;\n      });\n    } else if (argument.constructor.name === 'DOMNodeCollection') {\n      this.elements.forEach( (el) => {\n        let inner = el.innerHTML;\n        let outer = \"\";\n        argument.elements.forEach((el)=> {\n          outer += el.outerHTML;\n        });\n        let newInner = inner + outer;\n        el.innerHTML = newInner;\n      });\n    }\n  }\n\n  attr(argument) {\n    this.elements.forEach((el) => {\n      el.setAttribute(argument, true);\n    });\n  }\n\n  addClass(class_name) {\n    this.elements.forEach((el) => {\n      el.classList.add(class_name);\n    });\n  }\n\n  removeClass(class_name) {\n    this.elements.forEach((el) => {\n      el.classList.remove(class_name);\n    });\n  }\n\n  children() {\n    let kids = [];\n\n    this.elements.forEach((parent) => {\n      let offspring = [];\n      let collection = Array.prototype.slice.call( parent.children );\n\n      collection.forEach(child => {\n        offspring.push(child);\n      });\n      kids = kids.concat(offspring);\n    });\n    return new DOMNodeCollection(kids);\n  }\n\n  parent() {\n    let parents = [];\n\n    this.elements.forEach(child => {\n      if (!parents.includes(child.parentElement) ) {\n        parents.push(child.parentElement);\n      }\n    });\n\n    return new DOMNodeCollection(parents);\n  }\n\n  find(argument) {\n    let results = [];\n    this.elements.forEach( (el) => {\n      let collection = Array.prototype.slice.call( el.querySelectorAll(argument));\n      results = results.concat(collection);\n    });\n    return new DOMNodeCollection(results);\n  }\n\n  remove() {\n    this.elements.forEach( (el) => {\n      el.remove();\n    });\n    this.elements = [];\n  }\n\n  on(trigger, callback) {\n    for (let ele of this.elements) {\n      ele.addEventListener(trigger, callback);\n    }\n    this.eventCallBacks = callback;\n  }\n\n  off(trigger) {\n    for (let ele of this.elements) {\n      ele.removeEventListener(trigger, this.eventCallBacks);\n    }\n    this.eventCallBacks = null;\n  }\n}\n\n\n\nmodule.exports= DOMNodeCollection;\n\n\n//# sourceURL=webpack:///./lib/domnodecollection.js?");

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./domnodecollection.js */ \"./lib/domnodecollection.js\");\nconst callbacks = [];\n\nwindow.$l = (argument) => {\n\n\n  console.log('bears-beats-battlestargalactica');\n  if (argument.constructor.name === 'String') {\n    let list = document.querySelectorAll(argument);\n    let items = [];\n    list.forEach((el) => items.push(el));\n    return new DOMNodeCollection(items);\n  } else if (argument instanceof HTMLElement) {\n    return new DOMNodeCollection([argument]);\n  } else if (argument.constructor.name === 'Function') {\n    if(document.readyState === \"complete\") {\n      argument();\n    }\n    else {\n      if (callbacks.length === 0) {\n        callbacks.push(argument);\n        window.addEventListener(\"load\", () => {\n          callbacks.forEach(fn => {\n\n            fn();\n          });\n        }, false);\n      } else {\n        callbacks.push(argument);\n      }\n    }\n  }\n};\n\nwindow.$l.extend = (...args) => {\n  let newObj = args[0];\n\n  for (let obj of args) {\n    let keys = Object.keys(obj);\n\n    for (let key of keys) {\n      newObj[key] = obj[key];\n    }\n  }\n\n  return newObj;\n};\n\n\nwindow.$l.ajax = (options = {}) => {\n  let callback200 = () => {console.log(\"Status 200\");};\n  let callbackfail = () => {console.log(\"Error\");};\n  let defopt = { method: \"GET\", url: \"http://httpbin.org/get\", async: true, cb: callback200, cbf: callbackfail };\n  window.$l.extend(defopt, options);\n  var xhttp = new XMLHttpRequest();\n\n  xhttp.onreadystatechange = function() {\n    if (xhttp.readyState == XMLHttpRequest.DONE) {\n      if (xhttp.status == 200) {\n        defopt.cb();\n      } else {\n        defopt.cbf();\n      }\n    }\n  };\n\n  xhttp.open(defopt.method, defopt.url, defopt.async);\n  xhttp.send();\n};\n\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });