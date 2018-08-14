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
    showLoadingModel: false,
  }

  signIn = (signInCredentials) => {
    this.setState({loggedIn:true})
  }

  toggleSignInModel = () => {
    let showSignInModel = this.state.showSignInModel ? false : true
    this.setState({showSignInModel})
  }

  render() {
    return (
      <Provider 
        value={{
          state: this.state,
          signIn: this.signIn,
          toggleSignInModel: this.toggleSignInModel,
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

export { GlobalState }

export default Consumer