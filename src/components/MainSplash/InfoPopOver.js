import React from 'react';

import './InfoPopOver.css';

class InfoPopOver extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      wrapperHeight: 0,
      wrapperWidth: 0,
    }

    this.setWrapperHeight = this.setWrapperHeight.bind(this)
  }
  
  setWrapperHeight(el) {
    console.log(el)
    let wrapperHeight = el ? el.getBoundingClientRect().height : 0
    let wrapperWidth = el ? el.getBoundingClientRect().width : 0
    this.setState({wrapperHeight, wrapperWidth})
  }

  render(){
    console.log(this.state)
    const target = this.props.target ? this.props.target.getBoundingClientRect() : null
    const header = document.getElementsByClassName("main-header_wrapper")[0] ? document.getElementsByClassName("main-header_wrapper")[0].getBoundingClientRect() : null
    let xLocation
    if(this.props.arrowSide === "left" && target){
      xLocation = {left:target.right + window.scrollX + 20}
    }else if(target){
      xLocation = {left:target.left + window.scrollX - 20 - this.state.wrapperWidth}
    }

    if(target){
      return (
        <div id="info-pop-over_wrapper" ref={ this.setWrapperHeight } className="info-pop-over_wrapper" style={Object.assign({}, {width:"250px", top:target.top + window.scrollY - header.height - this.state.wrapperHeight + (target.height/2)}, xLocation)}>
          <br/>
          {/* <br/> */}
          <p>-</p>
          <p>{this.props.p1}</p>
          <p>{this.props.p2}</p>
          <p>{this.props.p3}</p>
          {this.props.arrowSide === "left" ?
            <div style={{left:"-15px", bottom:"-3px", position:"absolute", width:"20px", height:"20px", background:"#333", clipPath: "polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)"}}></div>
          :
            <div style={{right:"-15px", bottom:"-3px", position:"absolute", width:"20px", height:"20px", background:"#333", clipPath: "polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)"}}></div>
          }
        </div>
      )
    } else {
      return null
    }
  }
}

export default InfoPopOver