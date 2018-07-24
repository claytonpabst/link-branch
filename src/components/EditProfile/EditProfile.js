import React, { Component, Fragment } from 'react';

import './EditProfile.css';
import './Profile.css';

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
                img:{
                  src:"https://instagram.fslc1-1.fna.fbcdn.net/vp/08f5ab0e85d584912858854603dafdea/5B9FCE76/t51.2885-15/s640x640/sh0.08/e35/23594611_360643961029054_2777025432963252224_n.jpg",
                  style:{

                  }
                },
                style:{

                },
                links:[
                  {
                    img:'https://developer.spotify.com/assets/branding-guidelines/logoMisuse5@2x.png',
                    href:'https://www.spotify.com',
                  },
                  {
                    img:'data:image/jpeg;base64,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',
                    href:'https://www.spotify.com',
                  },
                  {
                    img:'data:image/png;base64,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',
                    href:'https://www.spotify.com',
                  },
                ]
              },
              {
                type:"TEXT",
                text:'I would probably be in a p tag or something',
                style:{

                },
              },
              {
                type:"PROJECT",
                title:'Hey Love',
                img:{
                  src:"https://instagram.fslc1-1.fna.fbcdn.net/vp/08f5ab0e85d584912858854603dafdea/5B9FCE76/t51.2885-15/s640x640/sh0.08/e35/23594611_360643961029054_2777025432963252224_n.jpg",
                  style:{

                  }
                },
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
                img:{
                  src:"https://instagram.fslc1-1.fna.fbcdn.net/vp/08f5ab0e85d584912858854603dafdea/5B9FCE76/t51.2885-15/s640x640/sh0.08/e35/23594611_360643961029054_2777025432963252224_n.jpg",
                  style:{

                  }
                },
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
                img:{
                  src:"https://instagram.fslc1-1.fna.fbcdn.net/vp/08f5ab0e85d584912858854603dafdea/5B9FCE76/t51.2885-15/s640x640/sh0.08/e35/23594611_360643961029054_2777025432963252224_n.jpg",
                  style:{

                  }
                },
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
            ]
          }
        ],
      },
      modelData:{

      },
      editText:"",
      currentText:"",
      currentImg:'',
      editPointer:'',
      showLinkModel: false,
      showEditImageModel: false,
      showEditTextModel: false,
      selectedBox: null,
      editing: false,
      boxes: [
        {id:0, text:'box 1', color: "blue", visibility:"visible"},
        {id:1, text:'box 2', color: "pink", visibility:"visible"},
        {id:2, text:'box 3', color: "orange", visibility:"visible"},
        {id:3, text:'box 4', color: "green", visibility:"visible"},
        {id:4, text:'box 5', color: "yellow", visibility:"visible"},
      ],
    }

    this.switchPositions = this.switchPositions.bind(this);
  }

  //--------------Start Editing Functions --------------------//
  
  editDataPoint = (pointer, profileDataOnReCall) => {
    console.log('hit');
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
      profileData[pointer[0]] = this.state.editText;
      this.forceUpdate();
      return;
    }
    return this.editDataPoint(pointer.slice(1, pointer.length), profileData[pointer[0]])
  }

  editImageModel = (pointer, piece, currentImg) => {
    this.setState({
      editPointer:pointer,
      showEditImageModel: true,
      currentImg: currentImg,
      modelData:piece
    })
  }

  closeEditImageModel = () => {
    this.setState({
      showEditImageModel: false,
      editText: '',
      editPointer: '',
      currentImg: '',
    })
  }
  editTextModel = (pointer, piece, currentText) => {
    this.setState({
      editPointer:pointer,
      showEditTextModel: true,
      currentText: currentText,
      modelData:piece
    })
  }

  closeEditTextModel = () => {
    this.setState({
      showEditTextModel: false,
      editText: '',
      editPointer: '',
      currentText: '',
    })
  }
  
  showLinkModel = (piece, i, j) => {
    let linkModelData = Object.assign({},piece);
    linkModelData.i = i;
    linkModelData.j = j;
    this.setState({
      modelData:linkModelData,
      showLinkModel:true,
    })
  }
  
  closeLinkModel = () => {
    this.setState({showLinkModel:false});
  }

  addSection = () => {
    let profileData = JSON.parse(JSON.stringify(this.state.profileData))
    profileData.sections.push({
      title:{
        text:"New Section",
        style:{
          background:"#666",
        },
      },
      style:{
        background:"#fff",
      },
      pieces:[]
    })
    this.setState({
      profileData
    })
  }

  //--------------End Editing Functions --------------------//

  //--------------Start HTML Return Function --------------------//
  
  buildTextPiece = (piece, i, j) => {
    return(
      <div draggable="true" className="profile_text-piece" key={j}>
        <div style={{position:"relative"}}>
          <h3><pre>{piece.text}</pre></h3>
          {this.props.edit &&
            <img 
              src="http://www.vicksdesign.com/products/pencil-icon-6-B1.png"
              onClick={(e) =>{e.stopPropagation(); this.editTextModel("sections."+i.toString()+".pieces."+j.toString()+".text", piece, piece.text)}}
              style={{
                top:"2px",
                left:"-5px",
              }}
              className="profile_link-model-x edit-profile_edit-icon"
            />
          }
        </div>
      </div>
    )
  }

  buildProjectPiece = (piece, i, j) => {
    return(
      <div draggable="true" onClick={() => this.showLinkModel(piece, i, j)} style={{background:"#fff"}} className="profile_project-piece" key={j}>
        <div style={{position:"relative"}}>
          <img src={piece.img.src}/>
          {this.props.edit &&
            <img 
              src="http://www.vicksdesign.com/products/pencil-icon-6-B1.png"
              onClick={(e) =>{e.stopPropagation(); this.editImageModel("sections."+i.toString()+".pieces."+j.toString()+".img.src", piece, piece.img.src)}}
              style={{
                top:"2px",
                left:"10px",
              }}
              className="profile_link-model-x edit-profile_edit-icon"
            />
          }
        </div>
        <div style={{position:"relative"}}>
          {this.props.edit &&
            <img 
              src="http://www.vicksdesign.com/products/pencil-icon-6-B1.png"
              onClick={(e) =>{e.stopPropagation(); this.editTextModel("sections."+i.toString()+".pieces."+j.toString()+".title", piece, piece.title)}}
              style={{
                top:"2px",
                left:"10px",
              }}
              className="profile_link-model-x edit-profile_edit-icon"
            />
          }
          <h3>{piece.title}</h3>
        </div>
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
        <div style={{background:profileData.generalInfoStyle.background, position:"relative"}} className="profile_general-info-wrapper">
          <div style={{position:"relative"}}>
            <img style={{width:"35%"}} src={profileData.img.src}/>
            {this.props.edit &&
              <img 
                src="http://www.vicksdesign.com/products/pencil-icon-6-B1.png"
                onClick={(e) => {e.stopPropagation(); this.editImageModel("img.src", profileData.img, profileData.img.src)}}
                style={{top:"2px",left:"10px",}}
                className="profile_link-model-x edit-profile_edit-icon"
              />
            }
          </div>
          <div style={{position:"relative"}}>
            <h1>{profileData.name.text}</h1>
            {this.props.edit &&
              <img 
                src="http://www.vicksdesign.com/products/pencil-icon-6-B1.png"
                onClick={(e) => {e.stopPropagation(); this.editTextModel("name.text", null, profileData.name.text)}}
                style={{top:"2px",left:"10px",}}
                className="profile_link-model-x edit-profile_edit-icon"
              />
            }
          </div>
          <p>{this.numberToThousands(profileData.profileViews.views)} Profile Views</p>
          {this.props.edit &&
            <Fragment>
              <div style={{position:"absolute", bottom:"8px", right:"5px",display:"flex",}}>
                <div style={{padding:"2px", border:"2px solid black", borderRadius:"5px", margin:"3px 10px"}}><img style={{height:"30px", width:"30px"}} src="https://cdn3.iconfinder.com/data/icons/objects/512/Bin-512.png"/></div>
                <div onClick={this.addSection} style={{padding:"2px", border:"2px solid black", borderRadius:"5px", margin:"3px 10px"}}><img style={{height:"30px", width:"30px"}} src="https://cdn4.iconfinder.com/data/icons/ios7-essence/22/add_plus-512.png"/></div>
              </div>
            </Fragment>
          }
        </div>
        {
          profileData.sections.map((section, i) => {
            return(
              <div style={section.style} className="profile_section-wrapper profile_section-spacer" key={i}>
                <div style={{position:"relative"}}>
                  {this.props.edit &&
                    <Fragment>
                      <img 
                        src="http://www.vicksdesign.com/products/pencil-icon-6-B1.png"
                        onClick={(e) => {e.stopPropagation(); this.editTextModel("sections."+i.toString()+".title.text", null, section.title.text,)}}
                        style={{top:"2px",left:"-5px",}}
                        className="profile_link-model-x edit-profile_edit-icon"
                      />
                      <div style={{position:"absolute", right:"5px",display:"flex",}}>
                        <div style={{padding:"2px", border:"2px solid black", borderRadius:"5px", margin:"3px 10px"}}><img style={{height:"30px", width:"30px"}} src="https://cdn3.iconfinder.com/data/icons/objects/512/Bin-512.png"/></div>
                        <div style={{padding:"2px", border:"2px solid black", borderRadius:"5px", margin:"3px 10px"}}><img style={{height:"30px", width:"30px"}} src="https://cdn4.iconfinder.com/data/icons/ios7-essence/22/add_plus-512.png"/></div>
                      </div>
                    </Fragment>
                  }
                  <h2 style={section.title.style}>{section.title.text}</h2>
                </div>
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

  //These functions below are not in use and are just an example of repositioning section and pieces using the drag and drop api

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
      let box1 = Object.assign({},this.state.selectedBox) 
      let box2 = Object.assign({},box) 
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

          {/* --------------------------The above line executes all the HTML functions and builds the profile. Below is the return of different models------------------------------ */}

          { this.state.showLinkModel &&
            <div className="profile_link-model-overlay">
              <div style={{position:"relative", padding:"20px"}} className="profile_link-model-wrapper">
                <div 
                  onClick={() => this.closeLinkModel()}
                  style={{position:"absolute", background:'red', width:"20px", height:"20px", borderRadius:"50%", textAlign:"center", top:"0px", left:"0px"}}
                  className="profile_link-model-x"
                >
                  x
                </div>
                {this.state.modelData.img.src &&
                  <img src={this.state.modelData.img.src}/>
                }
                {this.state.modelData.title &&
                  <h3 style={{textAlign:"center"}}>{this.state.modelData.title}</h3>
                }


                <div className="profile_links-wrapper">
                  {this.state.modelData.links &&
                    this.state.modelData.links.map((link, k) => {
                      return (
                        <div className="profile_link-piece" key={k}>
                          <img className="profile_link-piece-img" src={link.img}/>
                          <a className="profile_link-piece-go" href={link.href}>Go</a>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          }
          { this.state.showEditImageModel &&
            <div className="profile_link-model-overlay">
              <div style={{position:"relative", padding:"20px"}} className="profile_link-model-wrapper">
                <div 
                  onClick={() => this.closeEditImageModel()}
                  style={{position:"absolute", background:'red', width:"20px", height:"20px", borderRadius:"50%", textAlign:"center", top:"0px", left:"0px"}}
                  className="profile_link-model-x"
                >
                  x
                </div>
                <img src={this.state.currentImg} alt="Image to Update"/>
                {/* {this.state.modelData.title &&
                  <h3 style={{textAlign:"center", fontWeight:"bolder", fontSize:"30px"}}>{this.state.modelData.title}</h3>
                } */}
                <h6 style={{textAlign:"left", margin:"20px 0px 0px 0px", fontWeight:"lighter"}}>Enter New Image Address</h6>
                <input value={this.state.edit} onChange={(e) => this.setState({editText:e.target.value})}/>
                <button onClick={() => {this.editDataPoint(this.state.editPointer); this.closeEditImageModel()}}>Update Image</button>
              </div>
            </div>
          }
          { this.state.showEditTextModel &&
            <div className="profile_link-model-overlay">
              <div style={{position:"relative", padding:"20px"}} className="profile_link-model-wrapper">
                <div 
                  onClick={() => this.closeEditTextModel()}
                  style={{position:"absolute", background:'red', width:"20px", height:"20px", borderRadius:"50%", textAlign:"center", top:"0px", left:"0px"}}
                  className="profile_link-model-x"
                >
                  x
                </div>
                <h2>Current Text: {this.state.currentText}</h2>
                <h6 style={{textAlign:"left", margin:"20px 0px 0px 0px", fontWeight:"lighter"}}>Enter New Text</h6>
                <textarea style={{width:"90%", height:"200px"}} value={this.state.currentText} onChange={(e) => this.setState({editText:e.target.value,currentText:e.target.value})}/>
                <button onClick={() => {this.editDataPoint(this.state.editPointer); this.closeEditTextModel()}}>Update Text</button>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}


export default EditProfile;