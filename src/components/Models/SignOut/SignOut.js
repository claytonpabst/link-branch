import React from 'react';
import './SignOut.css';
import {Link} from 'react-router-dom'

import Consumer from './../../../GlobalState.js'

function formatUsername(name){
  name = name.length < 20 ? name : name.split('').slice(0, 18).join('') + '...';
  return name;
}

export default function LogoutPopover(props) {
  return (
    <Consumer>
      {(global) => (
        <div className='sign-in_wrapper' onClick={() => global.toggleSignOutModel()}>
          <div onClick={(e) => e.stopPropagation()} id="sign-in_content-wrapper">
            <div id="sign-in_x-out" onClick={() => global.toggleSignOutModel()}>x</div>
            <h2 style={{marginBottom:'25px'}} id="sign-in_header">Hello, {formatUsername(global.state.username)}</h2>
            <Link onClick={global.toggleSignOutModel} style={{textDecoration:"none"}} to="/edit"><label className="sign-out_nav-button" style={{margin:'15px', display:'block'}} >Update Profile</label></Link>
            <Link onClick={global.toggleSignOutModel} style={{textDecoration:"none"}} to="/assets"><label className="sign-out_nav-button" style={{margin:'15px', display:'block'}} >Asset Upload</label></Link>
            <label onClick={global.toggleSignOutModel} className="sign-out_nav-button" style={{margin:'15px', display:'block'}} >Update User Info</label>
            <label onClick={global.toggleSignOutModel} className="sign-out_nav-button" style={{margin:'15px', display:'block'}} >Help & Feedback</label>
              <button 
                type="submit" 
                className="btn sign-in_log-in-button"
                onClick={
                  (e) => {
                    e.stopPropagation();
                    global.signOut();
                    global.toggleSignOutModel()
                  }
                }
              >
                Sign Out
              </button>
          </div>
        </div>
      )}
    </Consumer>
  )
}