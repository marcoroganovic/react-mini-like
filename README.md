## View library 
 Library built for learning purposes in order to better understand component
based approach to developing single-page apps.

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
