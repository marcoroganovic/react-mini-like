/**
 * Sets up cache objet and returns function which will be used
 * for generating unique ids
 * @return {string} id
 **/
function uniqueID() {
  const cache = {};
  return function() {
    let id = randomString();
    while(id in cache) { id = randomString() };
    cache[id] = true;
    return id;
  }
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
}


/*--- Exposed methods ---*/

/**
 * Wrapper for doc...querySelector
 * @param {string} tag
 * @return {node}
 **/
export const $ = tag => document.querySelector(tag);

/**
 * Wrapper for doc...createElement
 * @param {string} tag
 * @return {node}
 **/
export const $$ = tag => document.querySelector(tag);


/**
 * Wrapper for doc..creDocFrag
 * @return {DocumentFragment}
 **/
export const $frag = () => document.createDocumentFragment();



/**
 * Method that is exposed for getting unique id
 * @return {string}
 **/
export const uuid = uniqueID();


/**
 * Extract tag and event name for adding event listener
 * @param {string} type
 * @return {array}
 **/
export const getEventMeta = type => {
  const info = type.split("::");

  if(info.length !== 2) {
    return new Error(`Wrong definition of event listener ${type}`);
  }

  return info.map(removeGreaterAndLessSigns);
} 


/**
 * Method for appending produced DOM tree to target element
 * @param {function} component
 * @param {node} target
 * @return {void}
 **/
export const render = (component, target) => {
  if(component && target) {
    target.appendChild(component.internalRender());
    return;
  }

  throw new Error("Check if you've provided right arguments to render method");
}
