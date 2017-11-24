## View library 
 Library built for learning purposes in order to better understand component
based approach to developing single-page apps.

Since I'm using React at my job I wanted to gain some deeper understanding
for how potentially view library could work based on React's API. This is just
  built based on assumptions and not actual React's implementation with DOM
  diffing, lifecycle hooks and other, to me still, magical stuff.

Instead of using JSX or separete templating engine every component has `html`
method with receives template as string and returns document fragment or if it's
child component it would return interpolated HTML also as a string to parent
component.

Embedding other components into render is done by static method `create` and it
receives child class as first, and props which are passed to instance of that
component as second parameter.

In order to get DOM with real values as DocumentFragment there is another static
method on `Component` class called `rootComponent` which accepts exactly same
arguments as before mentioned static method `create`.

To add event listeners you need to define `addEvents` method on class that
extends component. This method will be called internally and it should return
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
accepts callback to which would be provided previous state and return value of
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

### Sample demo
```javascript
import { Component, render } from "react-like";

class User extends Component {
  render(state, props) {
    return this.html(`
      <div class="user">
        <h2>${props.name}</h2>
        <h3>${props.username}</h3>
        <img src="${props.avatarURL}" alt="avatar" />
      </div>
    `)
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        { id: 1, name: "Addy Osmani", username: "addyosmani", avatarURL: "" },
        { id: 2, name: "Nicolas Zakas", username: "nzakas", avatarURL: "" },
        { id: 3, name: "Paul Lewis", username: "paullewis", avatarURL: "" },
        { id: 4, name: "Jason Miller", username: "developit_", avatarURL: "" },
      ]
    }
  }


  render(state, props) {
    const list = state.users.map(userProps => {
      return Component.create(User, userProps);
    });

    return this.html(`
      <div class="users">
        ${Component.nodes(list)}
      </div>
    `);
  }
}

render(
  Component.root(App, {}), 
  document.getElementById("root")
);
```

