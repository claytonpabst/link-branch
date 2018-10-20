import React from 'react';

import PageNameHeader from './../PageNameHeader/PageNameHeader.js';
import LandingMessage from './LandingMessage.js';
import PictureWithMessage from './PictureWithMessage.js';
import UserTutorial from './UserTutorial.js';

class MainSplash extends React.Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }

  render(){
    return (
      <div className="home_wrapper">
        < PageNameHeader>
          {() => (
            <h1>WELCOME</h1>
          )}
        </ PageNameHeader >
        < LandingMessage />
        < PageNameHeader>
          {() => (
            <h1>TRY IT OUT</h1>
          )}
        </ PageNameHeader >
        <UserTutorial edit={true}/>
        < PageNameHeader>
          {() => (
            <h1>PLAY MORE</h1>
          )}
        </ PageNameHeader >
        <PictureWithMessage>
          {() => (
            <div style={{backgroundImage:"url('https://images.unsplash.com/photo-1518553550601-d817bf328722?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=79f197a0a8162599df49dc78fe20c1fc&auto=format&fit=crop&w=500&q=60')"}} className="picture-with-message_background-div">
              
              <div className="picture-with-message_content-wrapper">
                <div className="picture-with-message_text-left-wrapper">
                  <h2>Spend More Time</h2>
                  <h2>PLAYING.</h2>
                  <p onClick={this.props.toggleSignUpModel} style={{paddingLeft:'5px'}} className="picture-with-message_get-started">Get Started</p>
                </div>
              </div>
            </div>
          )}
        </PictureWithMessage>
        < PageNameHeader>
          {() => (
            <h1>WRITE MORE</h1>
          )}
        </ PageNameHeader >
        <PictureWithMessage>
          {() => (
            <div style={{backgroundImage:"url('https://images.unsplash.com/photo-1527345931282-806d3b11967f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9c0bc3098e450b1b2f33e1a0c2ac133b&auto=format&fit=crop&w=500&q=60')"}} className="picture-with-message_background-div">
              <div className="picture-with-message_content-wrapper">
                <div className="picture-with-message_text-right-wrapper">
                  <h2>Spend More Time</h2>
                  <h2>WRITING.</h2>
                  <div style={{position:'relative'}}>
                    <p onClick={this.props.toggleSignUpModel} style={{paddingRight:'5px', position:'absolute', right:'0'}} className="picture-with-message_get-started">Get Started</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </PictureWithMessage>
        < PageNameHeader>
          {() => (
            <h1>RECORD MORE</h1>
          )}
        </ PageNameHeader >
        <PictureWithMessage>
          {() => (
            <div style={{backgroundImage:"url('https://images.unsplash.com/photo-1531651750200-b2c2b3ddc876?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1e05b28a4619760b9accdfe6c9870b6d&auto=format&fit=crop&w=500&q=60')"}} className="picture-with-message_background-div">
              <div className="picture-with-message_content-wrapper">
                <div className="picture-with-message_text-left-wrapper">
                  <h2>Spend More Time</h2>
                  <h2>RECORDING.</h2>
                    <p onClick={this.props.toggleSignUpModel} style={{paddingLeft:'5px'}} className="picture-with-message_get-started">Get Started</p>
                </div>
              </div>
            </div>
          )}
        </PictureWithMessage>
      </div>
    )
  }
}

export default MainSplash