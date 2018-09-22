import React, { Component, createContext } from "react";
import axios from 'axios'

// Provider and Consumer are connected through their "parent" context
const { Provider, Consumer } = createContext();

// Then create a provider Component
class GlobalState extends Component {
  constructor(props){
    super(props)

    this.state = {
      username: '',
      authenticated: false,
  
      showSignInModel: false,
      showSignUpModel: false,
      showSignOutModel: false, 
      showLoadingModel: false,
    }
  }

  componentWillMount(){
    this.isSignedIn()
    this.checkUrlForRedirect()
  }

  checkUrlForRedirect = () => {
    if(window.location.hash){
      this.props.history.push(window.location.hash.split('#')[1])
    }
  }

  isSignedIn = () => {
    this.setState({showLoadingModel:true})
    axios.get('/api/isLoggedIn').then(res => {
      this.handleAuthRes(res)
    }).catch(err => {
      console.log(err)
    })
  }
  signIn = (signInCredentials) => {
    this.setState({showLoadingModel:true})
    axios.post('/api/signIn', signInCredentials).then(res => {
      this.handleAuthRes(res)
      this.props.history.push("/edit")
    }).catch(err => {
      console.log(err)
    })
  }
  signOut = () => {
    this.setState({showLoadingModel:true})
    axios.get('/api/signOut').then(res => {
      this.handleAuthRes(res)
      this.props.history.push("/")
    }).catch(err => {
      console.log(err)
    })
  }
  signUp = (input) => {
    this.setState({showLoadingModel:true})
    axios.post('/api/signUp', input).then(res => {
      this.handleAuthRes(res)
    }).catch(err => {
      console.log(err)
    })
  }

  handleAuthRes = (res) => {
    // if(res.data.message){alert(res.data.message)}
    this.setState({
      showLoadingModel: false,
      username:res.data.username,
      authenticated:res.data.authenticated
    })
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
    console.log(this)
    return (
      <Provider 
        value={{
          state: this.state,
          signIn: this.signIn,
          signOut: this.signOut,
          signUp: this.signUp,
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