import React from 'react';

import PageNameHeader from './../PageNameHeader/PageNameHeader.js';
import LandingMessage from './LandingMessage.js';
import PictureWithMessage from './PictureWithMessage.js';

class MainSplash extends React.Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }

  render(){
    return (
      <div className="home_wrapper">
        < LandingMessage />
        < PageNameHeader>
          {() => (
            <h1>FIND MORE FREEDOM</h1>
          )}
        </ PageNameHeader >
        <PictureWithMessage>
          {() => (
            <div style={{backgroundImage:"url('https://wallup.net/wp-content/uploads/2016/01/311247-landscape-beach-people-couple.jpg')"}} className="picture-with-message_background-div">
              
              <div className="picture-with-message_content-wrapper">
                <div className="picture-with-message_text-left-wrapper">
                  <h2 style={{color:'white', fontSize:'4em', fontWeight:'Bolder'}}>Spend More Time</h2>
                  <h2 style={{color:'white', fontSize:'4em', fontWeight:'Bolder'}}>On TRAVELING.</h2>
                  <p style={{paddingLeft:'5px'}} className="picture-with-message_get-started">Get Started</p>
                </div>
              </div>
            </div>
          )}
        </PictureWithMessage>
        < PageNameHeader>
          {() => (
            <h1 style={{position:'absolute', right:'0'}}>FIND MORE CREATIVIY</h1>
          )}
        </ PageNameHeader >
        <PictureWithMessage>
          {() => (
            <div style={{backgroundImage:"url('https://iso.500px.com/wp-content/uploads/2016/03/pedroquintela.jpg')"}} className="picture-with-message_background-div">
              <div className="picture-with-message_content-wrapper">
                <div className="picture-with-message_text-right-wrapper">
                  <h2 style={{color:'white', fontSize:'4em', fontWeight:'Bolder',}}>Spend More Time</h2>
                  <h2 style={{color:'white', fontSize:'4em', fontWeight:'Bolder'}}>On CONTENT.</h2>
                  <div style={{position:'relative'}}>
                    <p style={{paddingRight:'5px', position:'absolute', right:'0'}} className="picture-with-message_get-started">Get Started</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </PictureWithMessage>
        < PageNameHeader>
          {() => (
            <h1>FIND MORE FOCUS</h1>
          )}
        </ PageNameHeader >
        <PictureWithMessage>
          {() => (
            <div style={{backgroundImage:"url('http://shabier.com/images/hd-gym-wallpapers/hd-gym-wallpapers-18.jpg')"}} className="picture-with-message_background-div">
              <div className="picture-with-message_content-wrapper">
                <div className="picture-with-message_text-left-wrapper">
                  <h2 style={{color:'white', fontSize:'4em', fontWeight:'Bolder',}}>Spend More Time</h2>
                  <h2 style={{color:'white', fontSize:'4em', fontWeight:'Bolder'}}>On YOU.</h2>
                    <p style={{paddingLeft:'5px'}} className="picture-with-message_get-started">Get Started</p>
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