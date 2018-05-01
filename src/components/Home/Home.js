import React, { Component } from 'react';

import './Home.css';


class Home extends Component {
  constructor(props){
    super(props)

    this.state = {
      boxes: [
        {id:0, text:'box 1', color: "blue", visibility:"visible"},
        {id:1, text:'box 2', color: "pink", visibility:"visible"},
        {id:2, text:'box 3', color: "orange", visibility:"visible"},
        {id:3, text:'box 4', color: "green", visibility:"visible"},
        {id:4, text:'box 5', color: "yellow", visibility:"visible"},
      ],
      selectedBox: null,
      editing: false,
      fakeBox: {
        text:"test",
        style:{
          position:"absolute",
          width:"1000px",
          height:"40px",
          background:"blue",
          top:"",
          left:"",
          padding:"10px 0px",
          zIndex:"999",
        }
      },
      x:null,
      y:null,
      i:null,
    }

    this.switchPositions = this.switchPositions.bind(this);
    this.num = 1
  }

  toggleEditing = (e, i, box) => {
    let editing = true
    let selectedBox = box
    let boxes = this.state.boxes
    // boxes[i].visibility = "hidden"
    this.setState({
      editing, selectedBox, boxes
    })
  }
  editingFalse = (e, i, box) => {
    let editing =false 
    let selectedBox = null
    let boxes = this.state.boxes
    for(let i=0; i<boxes.length; i++){
      boxes[i].visibility = "visible"
    }
    this.setState({
      editing, selectedBox, boxes
    })
  }

  createFakeBox(e, i, box){
    let boxRef = "boxRef" + i
    boxRef = this[boxRef].getBoundingClientRect()
    let fakeBox = this.state.fakeBox
    fakeBox.style.width = boxRef.width
    fakeBox.style.height = boxRef.height
    fakeBox.style.left = boxRef.left
    fakeBox.style.top = boxRef.top
    fakeBox.style.background = box.color
    fakeBox.text = box.text
    this.setState({
      fakeBox,
      x: e.clientX,
      y: e.clientY,
      i:i,
    })
  }

  moveFakeBox(e){
    let boxRef = "boxRef" + this.state.i
    boxRef = this[boxRef].getBoundingClientRect()
    let fakeBox = this.state.fakeBox
    fakeBox.style.left = boxRef.left + (e.clientX - this.state.x)
    fakeBox.style.top = boxRef.top + (e.clientY - this.state.y)
    this.setState({
      fakeBox
    })
  }

  switchPositions(e, box){
    // e.stopPropagation()
    this.num++;
    this.forceUpdate()
    if(this.state.editing && box !== this.state.selectedBox && this.state.selectedBox){
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
      <div style={{zIndex:"100"}} onMouseLeave={(e) => this.editingFalse(e)} onMouseUp={(e) => this.editingFalse(e)} className="home">
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
            let boxRef = "boxRef" + i
            return (
              <div
                draggable='true' 
                key={i}
                ref={(self) => {this[boxRef] = self}} 
                onDragEnd={(e) => this.editingFalse(e)}
                onDragOver={(e) => this.switchPositions(e, box)} 
                onDragStart={(e) => {this.toggleEditing(e, i, box); this.createFakeBox(e, i, box)} } 
                style={{visibility:box.visibility, background:box.color, zIndex:"100", margin:"10px 0px", padding:"10px 0px"}}
              >
                <div ></div>
                {box.text}
              </div>
            )
          })
        }
        {/* { this.state.editing &&
          <div onMouseMove={(e) => this.moveFakeBox(e)} style={this.state.fakeBox.style}>{this.state.fakeBox.text}</div>
        } */}

      </div>
    );
  }
}


export default Home;