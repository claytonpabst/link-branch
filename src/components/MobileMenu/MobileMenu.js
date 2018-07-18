import React, {Component} from "react";

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
          <p style={{textAlign:"center"}}>About</p>
          <p style={{textAlign:"center"}}>About</p>
          <p style={{textAlign:"center"}}>About</p>
          <p style={{textAlign:"center"}}>About</p>
        </div>
      </div>
    )
  }
}

export default MobileMenu;