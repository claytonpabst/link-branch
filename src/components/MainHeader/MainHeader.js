import React, {Component} from "react";

import './MainHeader.css'

import Consumer from './../../GlobalState.js'

class MainHeader extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }

  buildUsername = (username) => {
    username = username.length < 20 ? username : username.split('').slice(0, 18).join('') + '...';
    return String.fromCharCode(9663) + "  " + username 
  }

  render(){
    return(
      <div className="main-header_wrapper">
        <Consumer>
          {(global) => (
            <div style={{width:"100%", maxWidth:"500px", margin:"0 auto"}}>
              <div style={{float:'left'}}>
                <h1 class="main-header_main-logo">LB</h1>
              </div>
              <div style={{float:"left"}}>
                <button className="main-header_sign-in-button" onClick={global.state.loggedIn ? global.toggleSignOutModel : global.toggleSignInModel}>{global.state.loggedIn ? this.buildUsername(global.state.username) : "Sign In/Sign Up"}</button>
              </div>
              <div style={{float:"right"}} onClick={this.props.toggleMobileMenu}>
                <img src="http://cdn.onlinewebfonts.com/svg/img_113945.png" />
              </div>
            </div>
          )}
        </Consumer>
      </div>
    )
  }
}

export default MainHeader;