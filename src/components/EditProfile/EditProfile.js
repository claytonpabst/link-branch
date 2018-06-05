import React, { Component } from 'react';

import './EditProfile.css';


class EditProfile extends Component {
  constructor(props){
    super(props)

    this.state = {
      profileData:{
        generalInfoStyle:{
          background:"#fff",
        },
        style:{
          background:"#fff",
        },
        img:{
          src:'https://instagram.fslc1-1.fna.fbcdn.net/vp/1dc742f814174214f1bace3d6c9d8bb5/5BAE384F/t51.2885-19/s150x150/30078208_204136093510166_515503496947040256_n.jpg',
          style:{

          },
        },
        name:{
          text:'FOREIGN FIGURES',
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
            title:{
              text:"BIO",
              style:{
                background:"#666",
              },
            },
            style:{
              background:"#fff",
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
            title:{
              text:"SONGS",
              style:{
                background:"#666",
              },
            },
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
                    img:'https://developer.spotify.com/assets/branding-guidelines/logoMisuse5@2x.png',
                    href:'https://www.spotify.com',
                  },
                  {
                    img:'https://developer.spotify.com/assets/branding-guidelines/logoMisuse5@2x.png',
                    href:'https://www.spotify.com',
                  },
                  {
                    img:'https://developer.spotify.com/assets/branding-guidelines/logoMisuse5@2x.png',
                    href:'https://www.spotify.com',
                  },
                ]
              },
              {
                type:"PROJECT",
                title:'Hey Love',
                img:"https://instagram.fslc1-1.fna.fbcdn.net/vp/08f5ab0e85d584912858854603dafdea/5B9FCE76/t51.2885-15/s640x640/sh0.08/e35/23594611_360643961029054_2777025432963252224_n.jpg",
                style:{

                },
              },
              {
                type:"PROJECT",
                title:'Hey Love',
                img:"https://instagram.fslc1-1.fna.fbcdn.net/vp/08f5ab0e85d584912858854603dafdea/5B9FCE76/t51.2885-15/s640x640/sh0.08/e35/23594611_360643961029054_2777025432963252224_n.jpg",
                style:{

                },
              },
              {
                type:"PROJECT",
                title:'Hey Love',
                img:"https://instagram.fslc1-1.fna.fbcdn.net/vp/08f5ab0e85d584912858854603dafdea/5B9FCE76/t51.2885-15/s640x640/sh0.08/e35/23594611_360643961029054_2777025432963252224_n.jpg",
                style:{

                },
              },
            ]
          }
        ],
      },
      linkModelData:{

      },
      edit:"",
      boxes: [
        {id:0, text:'box 1', color: "blue", visibility:"visible"},
        {id:1, text:'box 2', color: "pink", visibility:"visible"},
        {id:2, text:'box 3', color: "orange", visibility:"visible"},
        {id:3, text:'box 4', color: "green", visibility:"visible"},
        {id:4, text:'box 5', color: "yellow", visibility:"visible"},
      ],
      showLinkModel: false,
      selectedBox: null,
      editing: false,
    }

    this.switchPositions = this.switchPositions.bind(this);
  }

  //--------------Start Editing Functions --------------------//
  
  editImage = (pointer, profileDataOnReCall) => {
    console.log(pointer)
    let profileData;
    if(profileDataOnReCall){
      profileData = profileDataOnReCall;
    } else {
      profileData = this.state.profileData;
    }
    if(typeof(pointer) === 'string'){
      pointer = pointer.split('.');
    }
    if(pointer.length === 1){
      console.log(profileData)
      profileData[pointer[0]] = this.state.edit;
      this.forceUpdate();
      return;
    }
    return this.editImage(pointer.slice(1, pointer.length), profileData[pointer[0]])
  }
  
  
  //--------------Start Editing Functions --------------------//

  showLinkModel = (piece, i, j) => {
    let linkModelData = Object.assign(piece);
    linkModelData.i = i;
    linkModelData.j = j;
    this.setState({
      linkModelData:linkModelData,
      showLinkModel:true,
    })
  }

  closeLinkModel = () => {
    this.setState({showLinkModel:false});
  }

  buildTextPiece = (piece, i, j) => {
    return(
      <div className="profile_text-piece" key={j}>
        <h3>{piece.text}</h3>
      </div>
    )
  }

  buildProjectPiece = (piece, i, j) => {
    return(
      <div onClick={() => this.showLinkModel(piece, i, j)} style={{background:"#fff"}} className="profile_project-piece" key={j}>
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

  buildSections = (profileData) => {
    return (
      <div>
        <div style={{background:profileData.generalInfoStyle.background}} className="profile_general-info-wrapper">
          <img onClick={() => this.editImage("img.src")} src={profileData.img.src}/>
          <h1>{profileData.name.text}</h1>
          <p>{this.numberToThousands(profileData.profileViews.views)} Profile Views</p>
        </div>
        {
          profileData.sections.map((section, i) => {
            return(
              <div style={section.style} className="profile_section-wrapper profile_section-spacer" key={i}>
                <h2 style={section.title.style}>{section.title.text}</h2>
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

  numberToThousands = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    console.log(this.state)
    let {profileData} = this.state;
    let style = profileData.style
    return (
      <div style={{background:"#f5f5f5"}} className="App">
        <div style={{background:"#f5f5f5"}} onMouseLeave={(e) => this.editingFalse(e)} onMouseUp={(e) => this.editingFalse(e)} className="profile_profile-wrapper">
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
            this.buildSections(profileData)
          }
          { this.state.showLinkModel &&
            <div className="profile_link-model-overlay">
              <div className="profile_link-model-wrapper">
                <div 
                  onClick={() => this.closeLinkModel()}
                  style={{background:'red', width:"20px", height:"20px", borderRadius:"50%", textAlign:"center"}}
                  className="profile_link-model-x"
                >
                  x
                </div>
                {this.state.linkModelData.img &&
                  <img src={this.state.linkModelData.img}/>
                }
                {this.state.linkModelData.title &&
                  <h3>{this.state.linkModelData.title}</h3>
                }


                <div className="profile_links-wrapper">
                  { this.state.linkModelData.links &&
                    this.state.linkModelData.links.map((link, k) => {
                      return (
                        <div className="profile_link-piece" key={k}>
                          <img src={link.img}/>
                          <a href={link.href}>Go</a>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          }
        </div>
        <input value={this.state.edit} onChange={(e) => this.setState({edit:e.target.value})}/>
      </div>
    );
  }
}


export default EditProfile;