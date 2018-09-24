import React from 'react';

import PageNameHeader from './../PageNameHeader/PageNameHeader.js';

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
        < PageNameHeader>
          {() => (
            <h1>Layout</h1>
          )}
        </ PageNameHeader >
        <div style={{backgroundImage:"url(https://images.unsplash.com/photo-1506157999258-a35364384ce9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b72bcc7ed5534b9407f952eb254e1e65&auto=format&fit=crop&w=500&q=60)"}} className="pic-right_wrapper">
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
        < PageNameHeader>
          {() => (
            <h1>Links</h1>
          )}
        </ PageNameHeader >
        <div style={{backgroundImage:"url(https://images.unsplash.com/photo-1506157491319-81aab3add711?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3002886ba2b7a4c7be12e9d353a23a79&auto=format&fit=crop&w=500&q=60)"}} className="pic-right_wrapper">
          <div className="pic-right_half">
            <section>
              <h1>Find Fan Platforms</h1>
              <h1>And Add Links</h1>
            </section>
          </div>
          <div className="pic-right_half">
            <img className="pic-right_computer" src="https://res.cloudinary.com/linkbranch/image/upload/v1537765495/Screen_Shot_2018-09-23_at_11.00.14_PM.png"/>
          </div>
        </div>
        < PageNameHeader>
          {() => (
            <h1>Share</h1>
          )}
        </ PageNameHeader >
        <div style={{backgroundImage:"url(https://images.unsplash.com/photo-1517332998425-de3a0f3fc185?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc3bbad6b4192056e8fc3627295cb688&auto=format&fit=crop&w=500&q=60)"}} className="pic-right_wrapper">
          <div className="pic-right_half">
            <img className="pic-right_computer" src="https://res.cloudinary.com/linkbranch/image/upload/v1537765480/Screen_Shot_2018-09-23_at_11.03.59_PM.png"/>
          </div>
          <div className="pic-right_half">
            <section>
              <h1>Share Your Project</h1>
              <h1>With ONE Link</h1>
            </section>
          </div>
        </div>
      </div>
    )
  }
}

export default HowItWorks