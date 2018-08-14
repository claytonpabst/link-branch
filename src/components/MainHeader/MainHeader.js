import React, {Component} from "react";

import Consumer from './../../GlobalState.js'

class MainHeader extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }

  render(){
    return(
      <div style={{height:"68px", width:"100%", background:"white"}}>
        <Consumer>
          {(global) => (
            <div style={{width:"95%", maxWidth:"500px", margin:"0 auto"}}>
              <div style={{float:'left', padding:"8px"}}>
                <h1 style={{color:"#e33737", fontWeight:"bolder", fontSize:"30px", padding:"10px", border:"1px solid #e33737"}}>LB</h1>
              </div>
              <div style={{float:"left", padding:"14px",}}>
                <button style={{background:"#e33737", padding:"10px", border:"none", borderRadius:"10px", fontSize:"16px", color:"white", fontWeight:"bold"}}>{global.state.username}</button>
              </div>
              <div style={{float:"right", padding:"19px 19px 19px 0px"}} onClick={this.props.toggleMobileMenu}>
                <img style={{height:"30px"}} src="http://cdn.onlinewebfonts.com/svg/img_113945.png" />
              </div>
            </div>
          )}
        </Consumer>
      </div>
    )
  }
}

export default MainHeader;