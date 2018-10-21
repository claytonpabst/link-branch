import React from 'react';

import PageNameHeader from './../PageNameHeader/PageNameHeader.js';
import UserTutorial from './../MainSplash/UserTutorial';

import './PicRight.css';

class HowItWorks extends React.Component {
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
            <h1>Images</h1>
          )}
        </ PageNameHeader >
        <div style={{backgroundImage:"url(https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bbaaf356e5f8bb5623631bf7f5f37b91&auto=format&fit=crop&w=500&q=60)"}} className="pic-right_wrapper">
          <div style={{maxWidth:"1320px", display:"block", margin:"0 auto"}}>
            <div className="pic-right_half">
              <section>
                <h1>Upload Images With A</h1>
                <h1>Simple Click</h1>
              </section>
            </div>
            <div className="pic-right_half">
              <img className="pic-right_computer" src="https://res.cloudinary.com/linkbranch/image/upload/v1537759685/Screen_Shot_2018-09-23_at_9.27.29_PM.png"/>
              {/* <img style={{position:"absolute", width:"470px", top:"107px", left:"722px", zIndex:"5", borderRadius:"5px"}} className="pic-right_computer" src="https://res.cloudinary.com/linkbranch/image/upload/v1537765329/Screen_Shot_2018-09-23_at_11.01.43_PM.png"/> */}
            </div>
          </div>
        </div>
        < PageNameHeader>
          {() => (
            <h1>Layout</h1>
          )}
        </ PageNameHeader >
        <div style={{backgroundImage:"url(https://images.unsplash.com/photo-1483101974978-cf266fdf1139?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=250711afae03c79108409b3e0fa17862&auto=format&fit=crop&w=500&q=60)"}} className="pic-right_wrapper">
          <div style={{maxWidth:"1320px", display:"block", margin:"0 auto"}}>
            <div className="pic-right_half">
              <img className="pic-right_computer" src="https://res.cloudinary.com/linkbranch/image/upload/v1537764781/Screen_Shot_2018-09-23_at_10.52.29_PM.png"/>
            </div>
            <div className="pic-right_half">
              <section>
                <h1>Add, Edit, Rearange, and More</h1>
                <h1>Make Your Look YOURS</h1>
              </section>
            </div>
          </div>
        </div>
        < PageNameHeader>
          {() => (
            <h1>Links</h1>
          )}
        </ PageNameHeader >
        <div style={{backgroundImage:"url(https://images.unsplash.com/photo-1473691955023-da1c49c95c78?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4566b286b94fa90fc5b721ab1fa082e7&auto=format&fit=crop&w=500&q=60)"}} className="pic-right_wrapper">
          <div style={{maxWidth:"1320px", display:"block", margin:"0 auto"}}>
            <div className="pic-right_half">
              <section>
                <h1>Choose Top Platforms</h1>
                <h1>And Add Links</h1>
              </section>
            </div>
            <div className="pic-right_half">
              <img className="pic-right_computer" src="https://res.cloudinary.com/linkbranch/image/upload/v1537765495/Screen_Shot_2018-09-23_at_11.00.14_PM.png"/>
            </div>
          </div>
        </div>
        < PageNameHeader>
          {() => (
            <h1>Share</h1>
          )}
        </ PageNameHeader >
        <div style={{backgroundImage:"url(https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ae8584287da6fac5895bbe4fb80f9f5f&auto=format&fit=crop&w=500&q=60)"}} className="pic-right_wrapper">
          <div style={{maxWidth:"1320px", display:"block", margin:"0 auto"}}>
            <div className="pic-right_half">
              <img className="pic-right_computer" src="https://res.cloudinary.com/linkbranch/image/upload/v1537765480/Screen_Shot_2018-09-23_at_11.03.59_PM.png"/>
            </div>
            <div className="pic-right_half">
              <section>
                <h1>Share Your Projects</h1>
                <h1>With ONE Link</h1>
              </section>
            </div>
            <button onClick={this.props.toggleSignUpModel} style={{margin:"10px auto 35px auto", display:"block", padding:"10px 20px", borderRadius:"5px", background:"#e33737", color:"white"}}>Get Started</button>
          </div>
        </div>
        < PageNameHeader>
          {() => (
            <h1>Try It Out</h1>
          )}
        </ PageNameHeader >
        <UserTutorial edit={true} toggleSignUpModel={this.props.toggleSignUpModel}/>
      </div>
    )
  }
}

export default HowItWorks