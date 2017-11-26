import { 
  $,
  $$, 
  $frag,
  uuid,
  getEventMeta
} from "./utilities";

class Component {

  /**
   * Bootstrapping component properties
   * @param {object} props | optional
   * @return {object}
   **/
  constructor(props) {
    this.props = props;
    this.state = null;
    this.componentId = uuid();
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
  static root(Comp, props) {
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
    const placeholder = $$("div");
    placeholder.appendChild(comp.internalRender());
    return placeholder.innerHTML;
  }


  /**
   * Helper for adding event handler in cache for specific type of event
   * @param {string} type
   * @param {function} handler
   * @return {void}
   **/
  addEventToCache(type,handler) {
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
    if(eventTable && typeof eventTable === "object" && !Array.isArray(eventTable)) {
      Object.keys(eventTable).forEach(key => {
        const [ target, type ] = getEventMeta(key);

        const handler = (event) => {
          if(event.target.nodeName.toLowerCase() === target) {
            eventTable[key](event);
          }
        }

        this.rootElement.addEventListener(type, handler);
        this.addEventToCache(handler);
      })
    }
  }

  /**
   * Method for removing events based on specified type
   * @param {string} type
   * @return {void}
   **/
  removeEvents(type) {
    const handlers = this.events[type];
    if(handlers) {
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
      if(Array.isArray(this.events[type])) {
        this.events[type].forEach(handler => {
          this.rootElement.removeEventListener(type, handler);
        })
      }
    })
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
    if(!this.realDOMNode) {
      this.realDOMNode = $(`[data-comp-id='${this.componentId}']`);
    }
  }

  /**
   * Method for performing actual updated, which in this case means
   * removing child elements and generating new document fragment
   * based on new state data -- no actual virtual diffing
   * @return {void}
   **/
  performUpdate() {
    while(this.realDOMNode.firstChild) {
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
    if(!this.addedEvents) {
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
    if(!this.rootElement) {
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
    const frag = $frag();
    const placeholder = $$("div");
    placeholder.innerHTML = `<component>${template}</component>`;
    let firstChild = null;

    while(firstChild = placeholder.firstElementChild) {
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

export default Component;
