import React, { Component, createContext } from "react";

// Provider and Consumer are connected through their "parent" context
const { Provider, Consumer } = createContext();

// Then create a provider Component
class GlobalState extends Component {
  state = {
    username: 'Clayton',
    loggedIn: false,
    showSignInModel: false,
    showSignUpModel: true,
    showSignOutModel: false, 
    showLoadingModel: false,
  }

  signIn = (signInCredentials) => {
    // ajax call to login on server
    this.setState({loggedIn:true})
  }

  toggleSignInModel = () => {
    let showSignInModel = this.state.showSignInModel ? false : true
    this.setState({showSignInModel})
  }
  toggleSignUpModel = () => {
    let showSignUpModel = this.state.showSignUpModel ? false : true
    this.setState({showSignUpModel})
  }
  toggleSignOutModel = () => {
    let showSignOutModel = this.state.showSignOutModel ? false : true
    this.setState({showSignOutModel})
  }

  render() {
    return (
      <Provider 
        value={{
          state: this.state,
          signIn: this.signIn,
          toggleSignInModel: this.toggleSignInModel,
          toggleSignUpModel: this.toggleSignUpModel,
          toggleSignOutModel: this.toggleSignOutModel,
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

export { GlobalState }

export default Consumer