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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n  constructor(elements){\n    this.els = elements;\n  }\n\n  html(string) {\n    if (string === undefined) {\n      return this.els[0].innerHTML;\n    } else {\n      this.els.forEach( el => {\n        el.innerHTML = string;\n      });\n    }\n  }\n\n  empty() {\n    this.html(\"\");\n  }\n  \n  append(elements) {\n    if (elements instanceof HTMLElement) {\n      this.els.forEach( (el) => {\n        el.innerHTML += elements.outerHTML;\n      });\n    } else if (elements instanceof DOMNodeCollection) {\n      this.els.forEach( (el) => {\n        elements.els.forEach( (el2) => {\n          el.innerHTML += el2.outerHTML;\n        });\n      })\n    } else if (typeof elements === \"string\") {\n      this.els.forEach((el) => {\n        el.innerHTML += elements;\n      });\n    }\n  }\n\n  attr(string, value) {\n    // let atts = this.els[0].attributes\n    if (value === undefined) {\n      this.els[0].getAttribute(string);\n    } else {\n      this.els.forEach( (el) => {\n        el.setAttribute(string, value);\n      });\n    }\n  }\n\n  addClass(value){\n    this.els.forEach( el =>{\n      el.classList.add(value);\n    });\n  }\n\n  removeClass(value){\n    this.els.forEach(el => {\n      el.classList.remove(value);\n    });\n  }\n\n  children(){\n    let ret = [];\n    this.els.forEach(el => {\n      ret = ret.concat(Array.from(el.children));\n    })\n    return new DOMNodeCollection(ret);\n  }\n\n  parent() {\n    let ret = [];\n    this.els.forEach(el => {\n      if(!ret.includes(el.parentNode)){\n        ret.push(el.parentNode);\n      }\n    });\n    return new DOMNodeCollection(ret);\n  }\n\n  find(selector) {\n    let selected = [];\n    this.els.forEach( el => {\n      selected = selected.concat(Array.from(el.querySelectorAll(selector)));\n    });\n    return new DOMNodeCollection(selected);\n  }\n\n  remove() {\n    this.els.forEach( el => {\n      el.outerHTML = \"\";\n    });\n  }\n\n  on(event, callback) {\n    this.els.forEach( el => {\n      el.addEventListener(event, callback);\n      el.listener = callback;\n    });\n  }\n\n  off(event) {\n    this.els.forEach( el => {\n      el.removeEventListener(event, el.listener);\n    });\n  }\n\n\n\n}\n\n\nmodule.exports = DOMNodeCollection;\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection */ \"./src/dom_node_collection.js\");\n\nconst funcs = [];\nlet loaded = false;\n\nfunction $l(arg) {\n  let nodeList;\n  if(arg instanceof HTMLElement) {\n    nodeList = [arg];\n  }\n  else if (typeof elements === \"string\"){\n    nodeList = document.querySelectorAll(arg);\n  }\n  else if(arg instanceof Function){\n    if(loaded){\n      return arg();\n    }else{\n      funcs.push(arg);\n      return;\n    }\n  }\n  return new DOMNodeCollection(Array.from(nodeList));\n};\n\n$l.extend = function (...objs){\n  const ret = {};\n  objs.forEach( obj => {\n    Object.keys(obj).forEach( key => {\n      ret[key] = obj[key];\n    });\n  });\n  return ret;\n};\n\n\nwindow.onload = function(){\n  funcs.forEach(func =>{\n    func();\n  });\n  loaded = true;\n}\n\nwindow.$l = $l;\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });