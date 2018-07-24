import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import router from './router';

import MobileMenu from "./components/MobileMenu/MobileMenu.js"
import MainHeader from "./components/MainHeader/MainHeader.js"

import Profile from './components/Home/Profile.js';
import EditProfile from './components/EditProfile/EditProfile.js';
import NumberChanger from './components/Home/NumberChanger.js';


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
        
          <Route exact path="/edit" render={()=><EditProfile edit={true}/>} />
          <Route exact path="/u/:id" render={()=><EditProfile edit={false}/>} />

        </Switch>
        <MobileMenu mobileMenuStyle={this.state.mobileMenuStyle} toggleMobileMenu={this.toggleMobileMenu} />
      </div>
    );
  }
}

export default App;