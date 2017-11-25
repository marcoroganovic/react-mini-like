## View library 
 Library built for learning purposes in order to better understand component
based approach to developing single-page apps.

Since I'm using React at my job I wanted to gain some deeper understanding
for how potentially view library could work based on React's API. This is just
  built based on assumptions and not actual React's implementation with DOM
  diffing, lifecycle hooks and other, to me still, magical stuff.

Instead of using JSX or separete templating engine every component has `html`
method with receives template as string and returns `DocumentFragment` or if it's
child component it would return interpolated HTML as a string to parent
component.

Embedding other components into render is done by static method on class
Component `create`, it receives child class as first, and props which are passed to instance of that
component as second parameter.

In order to get DOM with real values as `DocumentFragment` there is another static
method on `Component` class called `root` which accepts exactly same
arguments as before mentioned static method `create`.

To add event listeners you need to define `addEvents` method on class that
extends `Component`. This method will be called internally and it should return
object with keys as `<element>::[type]` and callback function as value.

#### Example:
```javascript
addEvents() {
  return {
    '<li>::click': (event) => {
      event.preventDefault();
      this.removeElement(Number(event.target.dataset.key));
    }
  }
}
```

To make component re-render with new state one would use `setState` method which
accepts callback in which previous state is passed as argument and return value of
that callback will be set as new state and component will update.

#### Example
```javascript
removeElement(id) {
  this.setState(prevState => ({
    ...prevState,
    items: prevState.items.filter(item => item.id !== id);
  }))
}
```

Iterating over a collection of arbitrary values is as easy as using JavaScript's
`map` higher order function. To display those generated components you'd use
static method named `nodes` which accepts an array of components as argument.

#### Example
```javascript
class TodoTask extends Component {
  render(state, props) {
    return this.html(`
      <li data-key=${props.id}>${props.value}</li>
    `);
  }
}

class Todo extends Component {
  state = {
    tasks: [
      { id: 1, task: "Learn JavaScript" }, 
      { id: 2, task: "Learn Data Structures and Algorithms" },
      { id: 3, task: "Learn Test-Driven Developemnt" }
    ]
  }

  render(state, props) {
    const list = state.items
      .map(itemProps => Component.create(Todo,itemProps)); 

    return this.html(`
      <ul>
        ${Component.nodes(list)}
      </ul>
    `);
  }
}

```
