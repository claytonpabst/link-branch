import React, { Component, createContext } from "react";

// Provider and Consumer are connected through their "parent" context
const { Provider, Consumer } = createContext();

// Then create a provider Component
class GlobalState extends Component {
  state = {
    username: 'Clayton',
    loggedIn: false,
    showSignInModel: false,
    showSignOutModel: false, 
    showLoadingModel: true
  }

  render() {
    return (
      <Provider 
        value={{
          state: this.state,
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

export { GlobalState }

export default Consumer