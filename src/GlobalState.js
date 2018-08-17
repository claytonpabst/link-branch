import React, { Component, createContext } from "react";

// Provider and Consumer are connected through their "parent" context
const { Provider, Consumer } = createContext();

// Then create a provider Component
class GlobalState extends Component {
  state = {
    username: '',
    loggedIn: false,
    showSignInModel: false,
    showSignUpModel: false,
    showSignOutModel: false, 
    showLoadingModel: false,
  }

  signIn = (signInCredentials) => {
    this.setState({loggedIn:true, username:'Clayton Todd Pabst'})
  }
  signOut = () => {
    this.setState({loggedIn:false,username:''})
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
          signOut: this.signOut,
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