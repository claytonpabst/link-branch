import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import { GlobalState } from './GlobalState.js'
import Consumer from './GlobalState.js'

import MainSplash from './components/MainSplash/MainSplash.js'
import MobileMenu from "./components/MobileMenu/MobileMenu.js"
import MainHeader from "./components/MainHeader/MainHeader.js"
import MainFooter from "./components/MainFooter/MainFooter.js"
import SignInModel from './components/Models/SignIn/SignIn.js'
import SignUpModel from './components/Models/SignUp/SignUp.js'
import SignOutModel from './components/Models/SignOut/SignOut.js'
import LoadingModel from './components/Models/Loading/Loading.js'
import PageNotFound from './components/PageNotFound/PageNotFound.js'
import HowItWorks from './components/HowItWorks/HowItWorks.js'
import Gps from './components/Gps/Gps.js'

import EditProfile from './components/EditProfile/EditProfile.js';
import UserAssetManager from './components/UserAssetManager/UserAssetManager.js';

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
    let backgroundBlur = '';
    let modelOpacity = '';
    return (
      <div className="App">
        <GlobalState history={this.props.history}>
          <Consumer>
            {(global) => (
              <React.Fragment>
                {(() => {
                  if(global.state.showLoadingModel || global.state.showSignInModel || global.state.showSignUpModel || global.state.showSignOutModel || this.state.showMobileMenu){
                    backgroundBlur = "blur(5px)"
                    modelOpacity = '1'
                  } else {
                    backgroundBlur = "blur(0px)"
                    modelOpacity = '0'
                  }
                })()}

                <MainHeader toggleMobileMenu={this.toggleMobileMenu} />

                <div style={{filter:backgroundBlur}}>
                  <Switch>
                  
                    <Route path="/u/:user/:project?" render={(props) => <EditProfile key="view-profile" user={props.match.params.user} project={props.match.params.project} edit={false}/>} />
                    <Route path='/info' render={() => <HowItWorks toggleSignUpModel={global.toggleSignUpModel} />}/>
                    <Route path='/gps' render={() => <Gps/>}/>
                    {global.state.authenticated && <Route render={()=><EditProfile key="edit-profile" edit={true}/>} path="/edit" />}
                    {global.state.authenticated && <Route render={()=><UserAssetManager/>} path="/assets" />}
                    <Route path="/" exact render={() => <MainSplash toggleSignUpModel={global.toggleSignUpModel} />}/>

                    <Route component={PageNotFound} />
      
                  </Switch>
                </div>

                <MainFooter />

                <MobileMenu toggleSignInModel={global.toggleSignInModel} toggleSignOutModel={global.toggleSignOutModel} authenticated={global.state.authenticated} mobileMenuStyle={this.state.mobileMenuStyle} toggleMobileMenu={this.toggleMobileMenu} />
                <div className="app_opacity" style={{opacity:modelOpacity}}>
                  {global.state.showSignInModel && <SignInModel/>}
                  {global.state.showSignUpModel && <SignUpModel/>}
                  {global.state.showSignOutModel && <SignOutModel/>}
                  {global.state.showLoadingModel && <LoadingModel header="Authenticating..."/>}
                </div>
              </React.Fragment>
            )}
          </Consumer>
        </GlobalState>
      </div>
    );
  }
}

export default withRouter(App);