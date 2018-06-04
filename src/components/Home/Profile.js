import React, { Component } from 'react';

import './Profile.css';


class Home extends Component {
  constructor(props){
    super(props)

    this.state = {
      profileData:{
        style:{
          background:"#eee",
        },
        img:{
          src:'https://instagram.fslc1-1.fna.fbcdn.net/vp/1dc742f814174214f1bace3d6c9d8bb5/5BAE384F/t51.2885-19/s150x150/30078208_204136093510166_515503496947040256_n.jpg',
          style:{

          },
        },
        name:{
          text:'FF',
          style:{
            
          },
        },
        profileViews:{
          views:1000,
          style:{

          },
        },
        sections:[
          {
            title:"BIO",
            style:{

            },
            pieces:[
              {
                type:"TEXT",
                text:'I would probably be in a p tag or something',
                style:{

                },
              },
            ]
          },
          {
            title:"SONGS",
            style:{

            },
            pieces:[
              {
                type:"PROJECT",
                title:'Hey Love',
                img:"https://instagram.fslc1-1.fna.fbcdn.net/vp/08f5ab0e85d584912858854603dafdea/5B9FCE76/t51.2885-15/s640x640/sh0.08/e35/23594611_360643961029054_2777025432963252224_n.jpg",
                style:{

                },
                links:[
                  {
                    img:'',
                    href:'',
                  },
                  {
                    img:'',
                    href:'',
                  },
                  {
                    img:'',
                    href:'',
                  },
                ]
              },
            ]
          }
        ],
      },
      boxes: [
        {id:0, text:'box 1', color: "blue", visibility:"visible"},
        {id:1, text:'box 2', color: "pink", visibility:"visible"},
        {id:2, text:'box 3', color: "orange", visibility:"visible"},
        {id:3, text:'box 4', color: "green", visibility:"visible"},
        {id:4, text:'box 5', color: "yellow", visibility:"visible"},
      ],
      selectedBox: null,
      editing: false,
    }

    this.switchPositions = this.switchPositions.bind(this);
  }

  buildTextPiece = (piece, i, j) => {
    return(
      <div key={(i*10) + j}>
        <h3>{piece.text}</h3>
      </div>
    )
  }

  buildProjectPiece = (piece, i, j) => {
    return(
      <div key={(i*10) + j}>
        <img src={piece.img}/>
        <h3>{piece.title}</h3>
      </div>
    )
  }
  
  buildPieces = (section, i) => {
    return (
      <div>
        {
          section.pieces.map((piece, j) => {
            console.log(piece)
            switch (piece.type){
              case "TEXT":
                return this.buildTextPiece(piece, i, j);
                break;
              case "PROJECT":
                return this.buildProjectPiece(piece, i, j);
                break;
              default:
                break;
            }

          })
        }
      </div>
    )
  }

  buildSections = () => {
    return (
      <div>
        <img src={this.state.profileData.img.src}/>
        <h1>{this.state.profileData.name.text}</h1>
        <p>{this.state.profileData.profileViews.views}</p>
        {
          this.state.profileData.sections.map((section, i) => {
            return(
              <div key={i}>
                <h2>{section.title}</h2>
                {
                  this.buildPieces(section, i)
                }
              </div>
            )
          })
        }
      </div>
    )
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
    let {profileData} = this.state;
    return (
      <div style={profileData.style} className="App">
        <div style={{zIndex:"100"}} onMouseLeave={(e) => this.editingFalse(e)} onMouseUp={(e) => this.editingFalse(e)} className="profile_profile-wrapper">
          {/* {
            this.state.boxes.map((box, i) => {
              let boxRef = "boxRef" + i
              return (
                <div
                  draggable='true' 
                  key={i}
                  ref={(self) => {this[boxRef] = self}} 
                  onDragEnd={(e) => this.editingFalse(e)}
                  onDragOver={(e) => this.switchPositions(e, box)} 
                  onDragStart={(e) => {this.toggleEditing(e, i, box) }} 
                  style={{visibility:box.visibility, background:box.color, zIndex:"100", margin:"10px 0px", padding:"10px 0px"}}
                >
                  <div ></div>
                  {box.text}
                </div>
              )
            })
          } */}
          { 
            this.buildSections()
          }

        </div>
      </div>
    );
  }
}


export default Home;