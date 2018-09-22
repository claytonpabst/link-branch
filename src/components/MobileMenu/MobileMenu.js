import React, {Component} from "react";
import {Link} from 'react-router-dom';

class MobileMenu extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }

  render(){
    let {mobileMenuStyle} = this.props
    return(
      <div onClick={this.props.toggleMobileMenu} style={{position:"absolute", width:mobileMenuStyle.width, height:"100%", background:"rgba(0,0,0,0.8)", top:"68px", left:mobileMenuStyle.left, transition:"all .7s", overflow:"hidden"}}>
        <div style={{width:"100vw", maxWidth:"500px", height:"100%", background:"white", position:"absolute", right:"0"}}>
          {this.props.authenticated &&
            <React.Fragment>
              <Link style={{textDecoration:"none"}} to="/edit"><p style={{width:"100%", padding:"15px", margin:"10px", textAlign:"center"}}>Update Profile</p></Link>
              <Link style={{textDecoration:"none"}} to="/assets"><p style={{width:"100%", padding:"15px", margin:"10px", textAlign:"center"}}>Asset Upload</p></Link>
            </React.Fragment>
          }
          <Link style={{textDecoration:"none"}} to="/"><p style={{width:"100%", padding:"15px", margin:"10px", textAlign:"center"}}>About</p></Link>
          <Link style={{textDecoration:"none"}} to="/"><p style={{width:"100%", padding:"15px", margin:"10px", textAlign:"center"}}>Help/Feedback</p></Link>
          {this.props.authenticated &&
            <p className="app_cursor-pointer" onClick={this.props.toggleSignOutModel} style={{width:"100%", padding:"15px", margin:"10px", textAlign:"center"}}>Sing Out</p>
          }
          {!this.props.authenticated &&
            <p className="app_cursor-pointer" onClick={this.props.toggleSignInModel} style={{width:"100%", padding:"15px", margin:"10px", textAlign:"center"}}>Sing In</p>
          }
        </div>
      </div>
    )
  }
}

export default MobileMenu;