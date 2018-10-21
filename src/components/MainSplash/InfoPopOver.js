import React from 'react';

import './InfoPopOver.css';

class InfoPopOver extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      wrapperHeight: 0,
    }

    this.setWrapperHeight = this.setWrapperHeight.bind(this)
  }

  componentDidMount = () => {
  }
  
  setWrapperHeight(el) {
    console.log(el)
    let wrapperHeight = el ? el.getBoundingClientRect().height : 0
    this.setState({wrapperHeight})
  }

  render(){
    console.log(this.state)
    const target = this.props.target ? this.props.target.getBoundingClientRect() : null
    const header = document.getElementsByClassName("main-header_wrapper")[0] ? document.getElementsByClassName("main-header_wrapper")[0].getBoundingClientRect() : null
    let xLocation
    if(this.props.arrowSide === "left" && target){
      xLocation = {left:target.right + window.scrollX + 20}
    }else if(target){
      xLocation = {right:target.left + window.scrollX + 20}
    }

    if(target){
      return (
        <div ref={ this.setWrapperHeight } className="info-pop-over_wrapper" style={Object.assign({}, {top:target.top + window.scrollY - header.height - this.state.wrapperHeight + (target.height/2)}, xLocation)}>
          <br/>
          {/* <br/> */}
          <p>Click the pencil to</p>
          <p>change the band name.</p>
          <p></p>
          {this.props.arrowSide === "left" ?
            <div style={{left:"-15px", bottom:"-3px", position:"absolute", width:"20px", height:"20px", background:"#333", clipPath: "polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)"}}></div>
          :
            <div style={{left:"-15px", bottom:"-3px", position:"absolute", width:"20px", height:"20px", background:"#333", clipPath: "polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)"}}></div>
          }
        </div>
      )
    } else {
      return null
    }
  }
}

export default InfoPopOver