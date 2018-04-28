import React, { Component } from 'react';

import './Home.css';


class Home extends Component {
  constructor(props){
    super(props)

    this.state = {
      boxes: [
        {id:0, text:'box 1', color: "blue"},
        {id:1, text:'box 2', color: "pink"},
        {id:2, text:'box 3', color: "orange"},
        {id:3, text:'box 4', color: "green"},
        {id:4, text:'box 5', color: "yellow"},
      ],
      selectedBox: null,
      editing: false
    }

    this.switchPositions = this.switchPositions.bind(this);
    this.num = 1
  }

  toggleEditing = (e, box) => {
    console.log(box)
    let editing = this.state.editing ? false : true
    let selectedBox = editing ? box : null
    this.setState({
      editing, selectedBox
    })
  }

  switchPositions(box){
    console.log(box.text)
    // e.stopPropagation()
    this.num++;
    this.forceUpdate()
    if(this.state.editing){
      let box1 = Object.assign(this.state.selectedBox) 
      let box2 = Object.assign(box) 
      for(let i=0; i<this.state.boxes.length; i++){
        if(this.state.boxes[i].id === box1.id){box1.index = i}
        if(this.state.boxes[i].id === box2.id){box2.index = i}
      }
      let boxes = this.state.boxes
      boxes[box1.index] = box2
      boxes[box2.index] = box1
      this.setState({
        boxes
      })
    } else {
      return
    }
  }

  render() {
    return (
      <div className="home">
        { this.state.editing ?
          "true" : "false"
        }
        {
          `${this.state.selectedBox}`
        }
        {
          this.num
        }
        {
          this.state.boxes.map((box, i) => {
            return (
              <div key={i} onMouseOver={(box) => this.switchPositions(box)} onMouseDown={(e, box) => this.toggleEditing(e, box)} onMouseUp={(e, box) => this.toggleEditing(e, box)} draggable="true" style={{background:box.color, margin:"10px 0px", padding:"10px 0px"}}>{box.text}</div>
            )
          })
        }

      </div>
    );
  }
}


export default Home;