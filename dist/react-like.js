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
/**
 * Sets up cache objet and returns function which will be used
 * for generating unique ids
 * @return {string} id
 **/
function uniqueID() {
  const cache = {};
  return function () {
    let id = randomString();
    while (id in cache) {
      id = randomString();
    };
    cache[id] = true;
    return id;
  };
}

/**
 * Method for generating random string
 * @return {string}
 **/
const randomString = () => Math.random().toString(36).substring(2);

/**
 * Removes < && >, from tag name, if present
 * @param {string} tag
 * @param {number} id
 * @return {string}
 **/
const removeGreaterAndLessSigns = (tag, id) => {
  return id === 0 ? tag.replace("<", "").replace(">", "") : tag;
};

/*--- Exposed methods ---*/

/**
 * Wrapper for doc...querySelector
 * @param {string} tag
 * @return {node}
 **/
const $ = tag => document.querySelector(tag);
/* harmony export (immutable) */ __webpack_exports__["a"] = $;


/**
 * Wrapper for doc...createElement
 * @param {string} tag
 * @return {node}
 **/
const $$ = tag => document.querySelector(tag);
/* harmony export (immutable) */ __webpack_exports__["b"] = $$;


/**
 * Wrapper for doc..creDocFrag
 * @return {DocumentFragment}
 **/
const $frag = () => document.createDocumentFragment();
/* harmony export (immutable) */ __webpack_exports__["c"] = $frag;


/**
 * Method that is exposed for getting unique id
 * @return {string}
 **/
const uuid = uniqueID();
/* harmony export (immutable) */ __webpack_exports__["f"] = uuid;


/**
 * Extract tag and event name for adding event listener
 * @param {string} type
 * @return {array}
 **/
const getEventMeta = type => {
  const info = key.split("::");

  if (key.length !== 2) {
    return new Error(`Wrong definition of event listener ${key}`);
  }

  return info.map(removeGreaterAndLessSigns);
};
/* harmony export (immutable) */ __webpack_exports__["d"] = getEventMeta;


/**
 * Method for appending produced DOM tree to target element
 * @param {function} component
 * @param {node} target
 * @return {void}
 **/
const render = (component, target) => {
  if (domTree && target) {
    target.appendChild(domTree.internalRender());
    return;
  }

  throw new Error("Check if you've provided right arguments to render method");
};
/* harmony export (immutable) */ __webpack_exports__["e"] = render;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return __WEBPACK_IMPORTED_MODULE_0__Component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return __WEBPACK_IMPORTED_MODULE_1__utilities__["e"]; });





/* harmony default export */ __webpack_exports__["default"] = ({
  Component: __WEBPACK_IMPORTED_MODULE_0__Component__["a" /* default */],
  render: __WEBPACK_IMPORTED_MODULE_1__utilities__["e" /* render */]
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities__ = __webpack_require__(0);


class Component {

  /**
   * Bootstrapping component properties
   * @param {object} props | optional
   * @return {object}
   **/
  constructor(props) {
    this.props = props;
    this.state = null;
    this.componentId = Object(__WEBPACK_IMPORTED_MODULE_0__utilities__["f" /* uuid */])();
    this.events = {};
    this.addedEvents = false;
  }

  /**
   * Static method that takes an array of elements as and retuns
   * string that will be appended to parent component
   * @param {array} arr
   * @return {string}
   **/
  static nodes(arr) {
    return Array.isArray(arr) && arr.length ? arr.join("") : null;
  }

  /**
   * Helper static method for instatiating Root component
   * without new keyword
   * @param {class} Comp
   * @param {object} props | optional
   * @return {object}
   **/
  static rootComponent(Comp, props) {
    return new Comp(props || {});
  }

  /**
   * Another static helper method for creating components
   * that will be present in other's component render method
   * also without use of new keyword it does not return real DOM
   * nodes created with document.createElement but document fragment
   * which is appended to placeholder element and innerHTML of that
   * placeholder is return value
   * @param {class} Comp
   * @param {object} props | optional
   * @param {array} children | optional
   * @return {string}
   *
   **/
  static create(Comp, props, children) {
    const component = new Comp(props);
    const placeholder = Object(__WEBPACK_IMPORTED_MODULE_0__utilities__["b" /* $$ */])("div");
    placeholder.appendChild(comp.internalRender());
    return placeholder.innerHTML;
  }

  /**
   * Helper for adding event handler in cache for specific type of event
   * @param {string} type
   * @param {function} handler
   * @return {void}
   **/
  addEventToCache(type, handler) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(handler);
  }

  /**
   * This method set-up event listeners on root component element
   * instead and uses event delegation to avoid removing and adding
   * same event listeners on every state change
   * @param {object} eventTable
   * @return {void}
   **/
  setupListeners(eventTable) {
    if (eventTable && typeof eventTable === "object" && !Array.isArray(eventTable)) {
      Object.keys(eventTable).forEach(key => {
        const [target, type] = Object(__WEBPACK_IMPORTED_MODULE_0__utilities__["d" /* getEventMeta */])(key);

        const handler = event => {
          if (event.target.nodeName.toLowerCase() === target) {
            eventTable[key](event);
          }
        };

        this.rootElement.addEventListener(type, handler);
        this.addEventToCache(handler);
      });
    }
  }

  /**
   * Method for removing events based on specified type
   * @param {string} type
   * @return {void}
   **/
  removeEvents(type) {
    const handlers = this.events[type];
    if (handlers) {
      handlers.forEach(handler => {
        this.rootElement.removeEventListener(type, handler);
      });
    }
  }

  /**
   * Method from removing all event listenrs attached on component
   * @return {void}
   **/
  removeAllEvents() {
    Object.keys(this.events).forEach(type => {
      if (Array.isArray(this.events[type])) {
        this.events[type].forEach(handler => {
          this.rootElement.removeEventListener(type, handler);
        });
      }
    });
  }

  /**
   * Set state method for updating component state and in this case
   * querying for root element of component against DOM and calls for
   * event listeners setup if any
   * @param {function} fn
   * @return {void}
   */
  setState(fn) {
    this.setRealDOMNode();
    this.state = fn(this.state);
    this.performUpdate();
    this.initiateListenersSetup(this.addEvents());
  }

  /**
   * Set realDOMNode property on class instance in order to make
   * component updates possible
   * @return {void}
   **/
  setRealDOMNode() {
    if (!this.realDOMNode) {
      this.realDOMNode = Object(__WEBPACK_IMPORTED_MODULE_0__utilities__["a" /* $ */])(`[data-comp-id='${this.componentId}']`);
    }
  }

  /**
   * Method for performing actual updated, which in this case means
   * removing child elements and generating new document fragment
   * based on new state data -- no actual virtual diffing
   * @return {void}
   **/
  performUpdate() {
    while (this.realDOMNode.firstChild) {
      this.realDOMNode.removeChild(this.realDOMNode.firstChild);
    }

    this.realDOMNode.appendChild(this.internalRender());
  }

  /**
   * Method for initiating event listener setup on DOM elements
   * if they are not already added
   * @param {object} eventTable
   * @return {void}
   **/
  initiateListenersSetup(eventTable) {
    if (!this.addedEvents) {
      this.setupListeners(this.addEvents());
      this.addedEvents = true;
    }
  }

  /**
   * Adds data-comp-id attribute on root element
   * @return {void}
   **/
  setComponentUniqueId() {
    this.rootElement.dataset.compId = this.componentId;
  }

  /**
   * Method to add root-element (components parent)
   * to class instance
   * @param {node} firstEl
   * @return {void}
   *
   **/
  setRootElement(firstEl) {
    if (!this.rootElement) {
      this.rootElement = firstEl;
      this.setComponentUniqueId();
    }
  }

  /**
   * Method for generating document fragment from HTML template
   * provided as a string
   * @param {string} template
   * @return {DocumentFragment}
   **/
  html(template) {
    const frag = Object(__WEBPACK_IMPORTED_MODULE_0__utilities__["c" /* $frag */])();
    const placeholder = Object(__WEBPACK_IMPORTED_MODULE_0__utilities__["b" /* $$ */])("div");
    placeholder.innerHTML = template;
    let firstChild = null;

    while (firstChild = placeholder.firstElementChild) {
      this.setRootElement(firstChild);
      this.initiateListenersSetup(this.addEvents());
      frag.appendChild(firstChild);
    }

    return frag;
  }

  /**
   * noop method that acts as placeholder method in order
   * to be able to add event listeners on component
   * @return {void}
   **/
  addEvents() {}

  /**
   * Helper method for not having to pass state and props
   * on every call to render
   * @return {void}
   **/
  internalRender() {
    return this.render(this.state, this.props);
  }

  /**
   * Crucial method in this Component class since it's responsibility
   * is to construct and return actual view with date provided from 
   * state and props. By default it returns null
   * @param {object} state
   * @param {object} props
   **/
  render(state, props) {
    return null;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Component);

/***/ })
/******/ ]);