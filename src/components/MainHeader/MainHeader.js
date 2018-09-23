import React, {Component} from "react";
import {Link} from 'react-router-dom';

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
            <div>
              <div style={{float:'left'}}>
                <Link to="/" style={{textDecoration:"none"}}><h1 className="main-header_main-logo">LR</h1></Link>
              </div>
              <div style={{float:"left"}}>
                <button className="main-header_sign-in-button" onClick={global.state.authenticated ? global.toggleSignOutModel : global.toggleSignInModel}>{global.state.authenticated ? this.buildUsername(global.state.username) : "Sign In/Sign Up"}</button>
              </div>
              <div style={{float:"right"}} onClick={this.props.toggleMobileMenu}>
                <img src="https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-512.png" />
              </div>
            </div>
          )}
        </Consumer>
      </div>
    )
  }
}

export default MainHeader;