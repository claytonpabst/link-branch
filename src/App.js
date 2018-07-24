import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import MobileMenu from "./components/MobileMenu/MobileMenu.js"
import MainHeader from "./components/MainHeader/MainHeader.js"

import EditProfile from './components/EditProfile/EditProfile.js';

import './reset.css';
import './App.css';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      showMobileMenu: false,
      mobileMenuStyle: {
        left: "100vw",
        width: "0vw"
      }
    }
  }

  toggleMobileMenu = () => {
    let showMobileMenu = !this.state.showMobileMenu
    let mobileMenuStyle = {}
    if(this.state.showMobileMenu){
      mobileMenuStyle = {left:"100vw",width:"0vw"}
    } else {
      mobileMenuStyle = {left:"0vw",width:"100vw"}
    }
    this.setState({showMobileMenu,mobileMenuStyle})
  }

  render() {
    return (
      <div className="App">
        <MainHeader toggleMobileMenu={this.toggleMobileMenu} />
        <Switch>
        
          <Route render={()=><EditProfile edit={true}/>} exact path="/edit" />
          <Route render={()=><EditProfile edit={false}/>} exact path="/u" />

        </Switch>
        <MobileMenu mobileMenuStyle={this.state.mobileMenuStyle} toggleMobileMenu={this.toggleMobileMenu} />
      </div>
    );
  }
}

export default App;