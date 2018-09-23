import React, { Component, Fragment } from 'react';
import AnyChart from 'anychart-react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import {CopyToClipboard} from 'react-copy-to-clipboard'

import EditImageModel from './EditImageModel.js';
import LoadingModel from './../Models/Loading/Loading.js';

import './EditProfile.css';
import './Profile.css';
import './../../App.css';

let saveAssetsToDbTimeout = null

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
          src:'',
          style:{},
        },
        name:{
          text:'',
          style:{
            fontSize:"30px",
            fontWeight:"bolder",
            lineHeight:"50px",
            fontFamily:'"Comic Sans MS", cursive, sans-serif',
            color:"maroon",
          },
        },
        profileViews:{
          views:1000,
          style:{},
        },
        sections:[],
      },
      modelData:{},
      editText:"",
      styleBeingEdited:'',
      currentText:"",
      currentImg:'',
      imageFile:null,

      currentSectionIndex:null,
      currentPieceIndex:null,
      currentLinkIndex:null,
      sectionDeletable:false,
      pieceDeletable:false,

      editPointer:'',
      stylePointer:'',

      modelOverlayBackground:"rgba(0,0,0,0.0)",
      modelOverlayBlur:"blur(0px)",
      modelWidth:"0%",
      showLinkModel: false,
      showEditImageModel: false,
      showEditTextModel: false,
      showFontStyleOptions: false,
      editTextModelHeader: "New Text",

      showLoadingModel: false,
      loadingModelHeader: null,

      availableAssets:null,
      userOnOwnAccount:false,
      profileUsername:'',
      assetsInDbShouldUpdate:false,
      firstLoad:true
    }

    this.overLimit = false

    this.linkModelRef = React.createRef()
    this.editTextModelRef = React.createRef()
    this.editImageModelRef = React.createRef()

    this.deleteSection = this.deleteSection.bind(this);
    this.onUnloadCleanup = this.onUnloadCleanup.bind(this);
  }

  //--------------Start of axios Functions --------------------//
  
  componentDidMount(){
    this._isMounted = true
    this.getProfileData()
  }
  
  componentDidUpdate = (prevProps, prevState) => {
    this.setProjectPiecesHeight()
    if(this.props.edit){
      this.checkIfAssetsNeedSavingToDb(prevState)
    }
  }
  
  componentWillUnmount(){
    this._isMounted = false
    window.removeEventListener("beforeunload", this.onUnloadCleanup)
  }

  checkIfAssetsNeedSavingToDb = (prevState) => {
    if(JSON.stringify(this.state.profileData) !== JSON.stringify(prevState.profileData)){
      console.log('should save')
      this.updateAssetsInDbTimeout()
    }
  }

  getProfileData = () => {
    this.setState({loadingModelHeader:"Loading...", showLoadingModel:true})
    if(this.props.edit){
      axios.get('/api/getProfileDataForUser').then(res => {
        this.setState({profileData:JSON.parse(res.data.profileData), userOnOwnAccount:true, showLoadingModel:false, profileUsername:res.data.profileUsername})
      }).catch(err => {
        console.log(err)
      })
    } else {
      axios.get(`/api/getProfileDataForGuest?user=${this.props.user}`).then(res => {
        this.setState({profileData:JSON.parse(res.data.profileData), showLoadingModel:false, profileUsername:res.data.profileUsername})
        this.forceUpdate()
        this.clickProjectFromParams()
      }).catch(err => {
        console.log(err)
      })
    }
  }

  setProjectPiecesHeight = () => {
    const projects = document.getElementsByClassName('edit-profile_project-image')
    for(let i=0; i<projects.length; i++){
      if(projects[i]){
        let node = projects[i]
        let width = node.clientWidth
        node.height = width
      }
    }
  }

  setAssetsToState = (assets) => {
    this.setState({availableAssets:assets})
  }

  newImageSelected = (imgSrc) => {
    this.state.editText = imgSrc
    this.editDataPoint(this.state.editPointer)
    this.closeEditImageModel()
  }

  updateAssetsInDbTimeout = () => {
    if(!this.props.edit){return}
    let self = this
    if(!this.state.assetsInDbShouldUpdate){
      window.addEventListener("beforeunload", this.onUnloadCleanup)
      this.setState({assetsInDbShouldUpdate:true})
    }
    if(saveAssetsToDbTimeout){
      clearTimeout(saveAssetsToDbTimeout)
    }
    if(this.state.userOnOwnAccount){
      saveAssetsToDbTimeout = setTimeout(function(){
        self.updateAssetsInDb()
      }, 10000)
    }
  }
  updateAssetsInDb = () => {
    if(this._isMounted){
      this.setState({showLoadingModel:true, loadingModelHeader:"Saving..."})
    }
    axios.post('/api/updateProfileDataForUser', {profileData:this.state.profileData}).then(res => {
      if(this._isMounted){
        window.removeEventListener("beforeunload", this.onUnloadCleanup)
        this.setState({showLoadingModel:false, assetsInDbShouldUpdate:false})
      }
    }).catch(err => {
      console.log(err)
    })
  }

  onUnloadCleanup(event){
    this._isMounted = false
    if(saveAssetsToDbTimeout){
      clearTimeout(saveAssetsToDbTimeout)
      saveAssetsToDbTimeout = null
    }
    if(this.state.assetsInDbShouldUpdate){
      this.updateAssetsInDb()
    }
    event.returnValue = ''
  }

  //--------------End of Axios Functions --------------------//
  //--------------Start of Data Editing Functions --------------------//
  
  // pointer changes as this function calls inself to dig into the obj. 
  // original pointer is used to check if .style exists in the pointer to decide what to update--------------------
  editDataPoint = (pointer, profileDataOnReCall, originalPointer) => {
    if(this.overLimit){
      alert("Profile is at max size.")
      return
    }
    let profileData
    let content
    if(profileDataOnReCall){
      profileData = profileDataOnReCall;
      originalPointer = originalPointer
    } else {
      profileData = this.state.profileData
      originalPointer = pointer
    }
    if(typeof(pointer) === 'string'){
      pointer = pointer.split('.')
      originalPointer = originalPointer.split('.')
    }
    if(pointer.length === 1){
      if(originalPointer.indexOf('style') > -1){
        content = this.state.styleBeingEdited
      } else {
        content = this.state.editText
      }
      profileData[pointer[0]] = content
      this.updateAssetsInDbTimeout()
      this.forceUpdate()
      return;
    }
    return this.editDataPoint(pointer.slice(1, pointer.length), profileData[pointer[0]], originalPointer)
  }

  editImageModel = (pointer, piece, currentImg, stylePointer) => {
    this.setState({
      stylePointer,
      editPointer:pointer,
      showEditImageModel: true,
      currentImg: currentImg,
      modelData:piece
    }, () => {
      setTimeout(() => {this.setState({modelWidth:"90%", modelOverlayBackground:"rgba(0,0,0,0.6)", modelOverlayBlur:"blur(5px)"}); this.editImageModelRef.current.focus()}, 1)
    })
  }

  closeEditImageModel = () => {
    this.setState({
      modelWidth:"0%", 
      modelOverlayBackground:"rgba(0,0,0,0.0)", 
      modelOverlayBlur:"blur(0px)"
    }, () => {
      setTimeout(() => {
        this.setState({
          showEditImageModel: false,
          editText: '',
          styleBeingEdited: '',
          editPointer: '',
          currentImg: '',
        })
      }, 400)
    })
  }
  editTextModel = (pointer, piece, editText, stylePointer, showFontStyleOptions, editTextModelHeader) => {
    editTextModelHeader = editTextModelHeader ? editTextModelHeader : "New Text"
    showFontStyleOptions = showFontStyleOptions === false ? showFontStyleOptions : true
    this.setState({
      editTextModelHeader,
      showFontStyleOptions,
      stylePointer,
      editPointer: pointer,
      showEditTextModel: true,
      editText,
      modelData: piece
    }, () => {
      setTimeout(() => {this.setState({modelWidth:"90%", modelOverlayBackground:"rgba(0,0,0,0.6)", modelOverlayBlur:"blur(5px)"}); this.editTextModelRef.current.focus()}, 1)
    })
  }

  closeEditTextModel = () => {
    this.setState({
      modelWidth:"0%", 
      modelOverlayBackground:"rgba(0,0,0,0.0)", 
      modelOverlayBlur:"blur(0px)"
    }, () => {
      setTimeout(() => {
        this.setState({
          showEditTextModel: false,
          editText: '',
          styleBeingEdited: '',
          editPointer: '',
          currentText: '',
        })
      }, 400)
    })
  }
  
  showLinkModel = (piece, i, j) => {
    let linkModelData = Object.assign({},piece);
    linkModelData.i = i;
    linkModelData.j = j;
    this.setState({
      modelData:linkModelData,
      showLinkModel:true,
      currentSectionIndex: i,
      currentPieceIndex: j,
    }, () => {
      setTimeout(() => {this.setState({modelWidth:"90%", modelOverlayBackground:"rgba(0,0,0,0.6)", modelOverlayBlur:"blur(5px)"}); this.linkModelRef.current.focus()}, 1)
    })
  }
  
  closeLinkModel = () => {
    this.setState({modelWidth:"0%", modelOverlayBackground:"rgba(0,0,0,0.0)", modelOverlayBlur:"blur(0px)"}, () => {
      setTimeout(() => {this.setState({showLinkModel:false}); this.unRecordDragEvent()}, 400)
    })
  }

  addSection = () => {
    if(this.overLimit){
      alert("Profile at max size.")
      return
    }
    let profileData = JSON.parse(JSON.stringify(this.state.profileData))
    profileData.sections.push({
      title:{
        text:"New Section",
        style:{
          background:"#666",
          fontSize:"30px",
          fontWeight:"normal",
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

  addTextPiece = (i) => {
    if(this.overLimit){
      alert("Profile at max size.")
      return
    }
    let profileData = JSON.parse(JSON.stringify(this.state.profileData))
    profileData.sections[i].pieces.push({
      type:"TEXT",
      text:'New Text',
      style:{
        fontSize:"15px",
        fontWeight:"normal",
        lineHeight:"20px",
      },
    })
    this.setState({profileData})
  }

  addProjectPiece = (i) => {
    if(this.overLimit){
      alert("Profile at max size.")
      return
    }
    let profileData = JSON.parse(JSON.stringify(this.state.profileData))
    profileData.sections[i].pieces.push({
      type:"PROJECT",
      title:{
        text:'New Project',
        style:{
          fontSize:"15px",
          fontWeight:"bold",
        }
      },
      img:{
        src:"https://d30y9cdsu7xlg0.cloudfront.net/png/396915-200.png",
        style:{

        }
      },
      style:{

      },
      links:[]
    })
    this.setState({profileData})
  }
  
  addLink = (i, j) => {
    if(this.overLimit){
      alert("Profile at max size.")
      return
    }
    let profileData = JSON.parse(JSON.stringify(this.state.profileData))
    profileData.sections[i].pieces[j].links.push({
      img:"https://res.cloudinary.com/linkbranch/image/upload/v1536958737/eikcqbhwj04rs7tuozhp.png",
      href:'',
    })
    this.setState({profileData})
  }

  recordDragEvent = (e, sectionIndex, pieceIndex, linkIndex) => {
    let pieceDeletable = false
    let sectionDeletable = false
    let linkDeletable = false
    if(linkIndex !== null){
      linkDeletable = true
    } else if (pieceIndex !== null){
      pieceDeletable = true
    } else {
      sectionDeletable = true
    }
    this.setState({
      linkDeletable,
      sectionDeletable,
      pieceDeletable,
      currentSectionIndex: sectionIndex,
      currentPieceIndex: pieceIndex,
      currentLinkIndex: linkIndex
    })
  }
  unRecordDragEvent = () => {
    this.setState({
      pieceDeletable:false,
      linkDeletable: false,
      sectionDeletable: false,
      currentSectionIndex: null,
      currentPieceIndex: null,
      currentLinkIndex: null,
    })
  }

  deleteSection(event){
    // This function is used for deleting sections AND child pieces, and links... maybe
    let profileData = JSON.parse(JSON.stringify(this.state.profileData))
    let modelData = {}
    if(this.state.sectionDeletable){
      profileData.sections.splice(this.state.currentSectionIndex, 1)
    } else if (this.state.pieceDeletable){
      profileData.sections[this.state.currentSectionIndex].pieces.splice(this.state.currentPieceIndex, 1)
    } else if (this.state.linkDeletable){
      profileData.sections[this.state.currentSectionIndex].pieces[this.state.currentPieceIndex].links.splice(this.state.currentLinkIndex, 1)
    }
    this.setState({
      profileData,      
    })
    if(!this.state.linkDeletable){
      this.unRecordDragEvent()
    }
    return
  }

  pieceSwap = (i, j) => {
    if(!this.props.edit){return}
    if(this.state.pieceDeletable === false){return}
    if(i !== this.state.currentSectionIndex){return}
    if(j === this.state.currentPieceIndex){return}
    let profileData = JSON.parse(JSON.stringify(this.state.profileData))
    let piece1 = JSON.parse(JSON.stringify(profileData.sections[this.state.currentSectionIndex].pieces[this.state.currentPieceIndex]))
    let piece2 = JSON.parse(JSON.stringify(profileData.sections[i].pieces[j]))
    profileData.sections[i].pieces[j] = piece1
    profileData.sections[this.state.currentSectionIndex].pieces[this.state.currentPieceIndex] = piece2
    this.state.profileData = profileData
    this.state.currentPieceIndex = null
    this.state.currentSectionIndex = null
    this.state.sectionDeletable = false
    this.state.pieceDeletable = false
    this.forceUpdate()
    this.unRecordDragEvent()
  }
  sectionSwap = (i) => {
    if(!this.props.edit){return}
    if(this.state.sectionDeletable === false){return}
    if(i === this.state.currentSectionIndex){return}
    let profileData = JSON.parse(JSON.stringify(this.state.profileData))
    let section1 = JSON.parse(JSON.stringify(profileData.sections[this.state.currentSectionIndex]))
    let section2 = JSON.parse(JSON.stringify(profileData.sections[i]))
    profileData.sections[i] = section1
    profileData.sections[this.state.currentSectionIndex] = section2
    this.state.profileData = profileData
    this.state.currentPieceIndex = null
    this.state.currentSectionIndex = null
    this.state.sectionDeletable = false
    this.state.pieceDeletable = false
    this.forceUpdate()
    this.unRecordDragEvent()
  }

  //--------------End Editing Functions --------------------//
  //--------------Start of this.params handling functions --------------------//

  clickProjectFromParams = () => {
    if(this.props.edit || this.state.showLinkModel){return}
    if(this.props.project && document.getElementsByClassName("project-piece-title-"+this.props.project).length){
      document.getElementsByClassName("project-piece-title-"+this.props.project)[0].click()
    }
  }

  formatTitleForParams = (title) => {
    title = title.replace(/[^a-zA-Z0-9]/g,'_').toLowerCase()
    return title
  }

  copyToClipboard = (e, url) => {
    // var textField = document.createElement('textarea')
    // textField.innerText = url
    // document.body.appendChild(textField)
    // textField.select()
    // document.execCommand('copy')
    // textField.remove()
    e.target.innerText = "COPIED" // other library is handling cody, this just updates the text in the button
  }

  //--------------End of this.params handling functions --------------------//
  //--------------Start HTML Return Functions --------------------//
  
  buildTextPiece = (piece, i, j) => {
    return(
      <div onDragOver={() => this.pieceSwap(i, j)} draggable="true" onDragEnd={this.unRecordDragEvent} onDragStart={(e) => {e.stopPropagation(); this.recordDragEvent(e, i, j, null)}} className="profile_text-piece" key={j}>
        <div style={{position:"relative"}}>
          <h3 style={{padding:"7px 13px"}}><pre style={piece.style}>{piece.text}</pre></h3>
          {this.props.edit &&
            <img 
              src="https://cdn1.iconfinder.com/data/icons/dashboard-line-style-1/32/dashboard__Writing-512.png"
              onClick={(e) =>{e.stopPropagation(); this.editTextModel("sections."+i.toString()+".pieces."+j.toString()+".text", piece, piece.text, "sections."+i.toString()+".pieces."+j.toString()+".style")}}
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
      <div onDragOver={() => this.pieceSwap(i, j)} draggable="true" onDragEnd={this.unRecordDragEvent} onDragStart={(e) => {e.stopPropagation(); this.recordDragEvent(e, i, j, null)}} onClick={() => this.showLinkModel(piece, i, j)} style={{background:"#fff"}} className="profile_project-piece" key={j}>
        <div style={{position:"relative"}}>
          <img className="edit-profile_project-image" src={piece.img.src} onError={(e)=>{e.target.src="https://d30y9cdsu7xlg0.cloudfront.net/png/396915-200.png"}}/>
          {this.props.edit &&
            <img 
              src="https://cdn1.iconfinder.com/data/icons/dashboard-line-style-1/32/dashboard__Writing-512.png"
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
              src="https://cdn1.iconfinder.com/data/icons/dashboard-line-style-1/32/dashboard__Writing-512.png"
              onClick={(e) =>{e.stopPropagation(); this.editTextModel("sections."+i.toString()+".pieces."+j.toString()+".title.text", piece, piece.title.text, "sections."+i.toString()+".pieces."+j.toString()+".title.style", false, "Project Title")}}
              style={{
                top:"2px",
                left:"10px",
              }}
              className="profile_link-model-x edit-profile_edit-icon"
            />
          }
          <h3 style={piece.title.style} className={"project-piece-title-" + this.formatTitleForParams(piece.title.text)}>{piece.title.text}</h3>
        </div>
      </div>
    )
  }
  
  buildPieces = (section, i) => {
    return (
      <div style={{padding:"5px"}}>
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
      <div style={{filter:this.state.modelOverlayBlur}}>
        {/* <Link to="/assets">to assets</Link> */}
        <div style={{background:profileData.generalInfoStyle.background, position:"relative"}} className="profile_general-info-wrapper">
          <div style={{position:"relative"}}>
            <img className="profile_profile-image" style={{width:"170px", height:"170px",}} src={profileData.img.src}/>
            {this.props.edit &&
              <img 
                src="https://cdn1.iconfinder.com/data/icons/dashboard-line-style-1/32/dashboard__Writing-512.png"
                onClick={(e) => {e.stopPropagation(); this.editImageModel("img.src", profileData.img, profileData.img.src)}}
                style={{top:"2px",left:"10px",}}
                className="profile_link-model-x edit-profile_edit-icon"
              />
            }
          </div>
          <div style={{position:"relative"}}>
            <h1 style={profileData.name.style}>{profileData.name.text}</h1>
            {this.props.edit &&
              <img 
                src="https://cdn1.iconfinder.com/data/icons/dashboard-line-style-1/32/dashboard__Writing-512.png"
                onClick={(e) => {e.stopPropagation(); this.editTextModel("name.text", null, profileData.name.text, "name.style")}}
                style={{top:"2px",left:"10px",}}
                className="profile_link-model-x edit-profile_edit-icon"
              />
            }
          </div>
          {/* <p>{this.numberToThousands(profileData.profileViews.views)} Profile Views</p> */}
          {this.props.edit &&
            <Fragment>
              <div style={{position:"absolute", bottom:"8px", right:"5px",display:"flex",}}>
                <div onDragOver={(e) => e.preventDefault()} onDrop={(e) => this.deleteSection(e)} style={{padding:"2px", border:"2px solid black", borderRadius:"5px", margin:"3px 10px"}}><img style={{height:"30px", width:"30px"}} src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-trash-b-512.png"/></div>
                <div onClick={this.addSection} style={{padding:"2px", border:"2px solid black", borderRadius:"5px", margin:"3px 10px"}}><img style={{height:"30px", width:"30px"}} src="https://cdn4.iconfinder.com/data/icons/ios7-essence/22/add_plus-512.png"/></div>
              </div>
            </Fragment>
          }
        </div>
        {
          profileData.sections.map((section, i) => {
            return(
              <div onDragOver={() => this.sectionSwap(i)} draggable="true" onDragEnd={this.unRecordDragEvent} onDragStart={(e) => {this.recordDragEvent(e, i, null, null)}} style={section.style} className="profile_section-wrapper profile_section-spacer" key={i}>
                <div style={{position:"relative"}}>
                  {this.props.edit &&
                    <Fragment>
                      <img 
                        src="https://cdn1.iconfinder.com/data/icons/dashboard-line-style-1/32/dashboard__Writing-512.png"
                        onClick={(e) => {e.stopPropagation(); this.editTextModel("sections."+i.toString()+".title.text", null, section.title.text, "sections."+i.toString()+".title.style")}}
                        style={{top:"2px",left:"-5px",}}
                        className="profile_link-model-x edit-profile_edit-icon"
                      />
                      <div style={{position:"absolute", right:"5px",display:"flex",}}>
                        <div onDragOver={(e) => e.preventDefault()} onDrop={(e) => this.deleteSection(e)} style={{padding:"2px", border:"2px solid black", borderRadius:"5px", margin:"3px 10px"}}><img style={{height:"30px", width:"30px"}} src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-trash-b-512.png"/></div>
                        <div onClick={() => this.addTextPiece(i)} style={{padding:"2px", border:"2px solid black", borderRadius:"5px", margin:"3px 10px"}}><img style={{height:"30px", width:"30px"}} src="https://www.shareicon.net/data/512x512/2015/08/29/92770_write_512x512.png"/></div>
                        <div onClick={() => this.addProjectPiece(i)} style={{padding:"2px", border:"2px solid black", borderRadius:"5px", margin:"3px 10px"}}><img style={{height:"30px", width:"30px"}} src="https://d30y9cdsu7xlg0.cloudfront.net/png/396915-200.png"/></div>
                        {/* <div onClick={() => this.addProjectPiece(i)} style={{padding:"2px", border:"2px solid black", borderRadius:"5px", margin:"3px 10px"}}><img style={{height:"30px", width:"30px"}} src="https://cdn4.iconfinder.com/data/icons/cinema-outline-icon-set/30/camera-512.png"/></div> */}
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

  numberToThousands = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    console.log(this.state)
    let profileDataString = JSON.stringify(this.state.profileData)
    let profileDataLength = profileDataString.length
    let profileData = JSON.parse(profileDataString); // this line is needed because of how the editDataPoint function works with updating style; react treats style attr as a prop that has to go through this.setState, which I'm not using in that function.
    let style = profileData.style
    this.overLimit = profileDataLength > 20000 ? true : false
    return (
      <div style={{background:"#f5f5f5"}} className="App">
        <div style={{background:"#f5f5f5"}} className="profile_profile-wrapper">
          { 
            this.buildSections(profileData)
          }

          {this.props.edit &&
            <div style={{display:"block", margin:"30px auto", width:'300px', background:'pink'}}>
              <AnyChart 
                type="pie"
                data={`Available,${20000-profileDataLength},green\nUsed,${20000-(20000-profileDataLength)}`}
                title={`${this.numberToThousands(profileDataLength)} / 20,000 Units Used`}
                width={300}
                height={300}
                
              />
            </div>
          }

          {/* --------------------------The above line executes all the HTML functions and builds the profile. Below is the return of different editing models------------------------------ */}

          {this.state.showLoadingModel &&
            <LoadingModel header={this.state.loadingModelHeader}/>
          }
          {this.state.showLinkModel &&
            <div onClick={this.closeLinkModel} style={{background:this.state.modelOverlayBackground}} className="profile_link-model-overlay">
              <div onClick={(e) => {e.stopPropagation()}} tabIndex="-1" ref={this.linkModelRef} style={{position:"relative", padding:"20px", width:this.state.modelWidth}} className="profile_link-model-wrapper">
                <div 
                  onClick={this.closeLinkModel}
                  style={{position:"absolute", width:"20px", height:"20px", borderRadius:"50%", textAlign:"center", top:"0px", left:"0px"}}
                  className="profile_link-model-x"
                >
                  x
                </div>
                <CopyToClipboard text={window.location.host+'/#u/'+this.state.profileUsername+"/"+this.formatTitleForParams(this.state.modelData.title.text)}><button 
                  // onClick={(e) => {e.preventDefault(); this.copyToClipboard(e, window.location.host+'/#u/'+this.state.profileUsername+"/"+this.formatTitleForParams(this.state.modelData.title.text))}}
                  onClick={(e) => {e.preventDefault(); this.copyToClipboard(e, window.location.host+'/u/'+this.state.profileUsername+"/"+this.formatTitleForParams(this.state.modelData.title.text))}}
                  style={{position:"absolute", lineHeight:"40px", background:'#e33737', width:"80px", borderRadius:"5px", textAlign:"center", top:"75px", left:"10px", color:"white", fontWeight:"bold"}}
                  className="profile_link-model-x"
                >
                  SHARE
                </button></CopyToClipboard>
                {this.state.modelData.img.src &&
                  <img style={{borderRadius:"0px", height:"150px", width:"150", objectFit:"cover", marginBottom:"18px"}} src={this.state.modelData.img.src}/>
                }
                {this.state.modelData.title &&
                  <h3 style={{textAlign:"center"}}>{this.state.modelData.title.text}</h3>
                }
                {this.props.edit &&
                  <Fragment>
                    <div style={{position:"absolute", top:"158px", right:"5px",display:"flex",}}>
                      <div onDragOver={(e) => e.preventDefault()} onDrop={(e) => this.deleteSection(e)} style={{padding:"2px", border:"2px solid black", borderRadius:"5px", margin:"3px 10px"}}><img style={{height:"30px", width:"30px"}} src="https://cdn3.iconfinder.com/data/icons/objects/512/Bin-512.png"/></div>
                      <div onClick={() => {this.addLink(this.state.currentSectionIndex, this.state.currentPieceIndex)}} style={{padding:"2px", border:"2px solid black", borderRadius:"5px", margin:"3px 10px"}}><img style={{height:"30px", width:"30px"}} src="https://cdn4.iconfinder.com/data/icons/ios7-essence/22/add_plus-512.png"/></div>
                    </div>
                  </Fragment>
                }
                <div className="profile_links-wrapper">
                  {(() => {
                    return this.state.profileData.sections[this.state.currentSectionIndex].pieces[this.state.currentPieceIndex].links.map((link, k) => {
                      return (
                        <div draggable="true" onDragStart={(e) => {e.stopPropagation(); this.recordDragEvent(e, this.state.currentSectionIndex, this.state.currentPieceIndex, k)}} className="profile_link-piece" key={k}>
                          <div style={{position:"relative"}}>
                            {this.props.edit &&
                              <img 
                                src="https://cdn1.iconfinder.com/data/icons/dashboard-line-style-1/32/dashboard__Writing-512.png"
                                onClick={(e) =>{
                                  e.stopPropagation(); 
                                  this.editImageModel(
                                    "sections."+this.state.currentSectionIndex.toString()+".pieces."+this.state.currentPieceIndex.toString()+".links."+k.toString()+".img", 
                                    this.state.profileData.sections[this.state.currentSectionIndex].pieces[this.state.currentPieceIndex], 
                                    this.state.profileData.sections[this.state.currentSectionIndex].pieces[this.state.currentPieceIndex].links[k].img, 
                                    null,
                                  );
                                  this.closeLinkModel()
                                }}
                                style={{
                                  top:"-2px",
                                  left:"-2px",
                                }}
                                className="profile_link-model-x edit-profile_edit-icon"
                              />
                            }
                            <img style={{borderRadius:"0px"}} className="profile_link-piece-img" src={link.img}/>
                          </div>
                          <div style={{position:"relative"}} className="profile_link-piece-go">
                            {this.props.edit &&
                              <img 
                                src="https://cdn1.iconfinder.com/data/icons/dashboard-line-style-1/32/dashboard__Writing-512.png"
                                onClick={(e) =>{
                                  e.stopPropagation(); 
                                  this.editTextModel(
                                    "sections."+this.state.currentSectionIndex.toString()+".pieces."+this.state.currentPieceIndex.toString()+".links."+k.toString()+".href", 
                                    this.state.profileData.sections[this.state.currentSectionIndex].pieces[this.state.currentPieceIndex], 
                                    this.state.profileData.sections[this.state.currentSectionIndex].pieces[this.state.currentPieceIndex].links[k].href, 
                                    null,
                                    false,
                                    "New Link Address"
                                  );
                                  this.closeLinkModel()
                                }}
                                style={{
                                  top:"-2px",
                                  left:"-2px",
                                }}
                                className="profile_link-model-x edit-profile_edit-icon"
                              />
                            }
                            <a target="_blank" className="profile_link-piece-go" href={link.href.indexOf('http') > -1 ? link.href : "//"+link.href}>Go</a>
                          </div>
                        </div>
                      )
                    })
                  })()}
                </div>
              </div>
            </div>
          }
          {this.state.showEditImageModel &&
            <EditImageModel 
              closeEditImageModel={this.closeEditImageModel} 
              modelOverlayBackground={this.state.modelOverlayBackground}
              editImageModelRef={this.editImageModelRef}
              modelWidth={this.state.modelWidth}
              currentImg={this.state.currentImg}
              editDataPoint={this.editDataPoint}
              editPointer={this.state.editPointer}
              availableAssets={this.state.availableAssets}
              setAssetsToState={this.setAssetsToState}
              newImageSelected={this.newImageSelected}
            />
          }
          { this.state.showEditTextModel &&
            <div  onClick={this.closeEditTextModel} style={{background:this.state.modelOverlayBackground}} className="profile_link-model-overlay">
              <div onClick={(e) => e.stopPropagation()} tabIndex="-1" ref={this.editTextModelRef} style={{position:"relative", padding:"20px", width:this.state.modelWidth}} className="profile_link-model-wrapper">
                <div 
                  onClick={() => this.closeEditTextModel()}
                  style={{position:"absolute", background:'red', width:"20px", height:"20px", borderRadius:"50%", textAlign:"center", top:"0px", left:"0px"}}
                  className="profile_link-model-x"
                >
                  x
                </div>

                <h6 style={{margin:"10px 0px 5px 0px", fontWeight:"Bold", textAlign:"center", fontSize:"20px", display:"inlineBlock"}}>{this.state.editTextModelHeader ? this.state.editTextModelHeader : "New Text"}</h6>
                <textarea style={{width:"100%", height:"200px"}} value={this.state.editText} onChange={(e) => {this.state.editText = e.target.value; this.editDataPoint(this.state.editPointer)}}/>
                
                {this.state.showFontStyleOptions &&
                  <React.Fragment>
                    <div style={{margin:"20px 0"}} class="app_seperating-line"></div>

                    <h6 style={{margin:"-10px 0px 5px 0px", fontWeight:"Bold", textAlign:"center", fontSize:"20px", display:"inlineBlock"}}>Font Styling</h6>
                    <div class="profile_text-model-option-wrapper">
                      <h6 style={{fontWeight:"lighter"}}>Font Size:</h6>
                      <select onChange={(e) => {this.state.styleBeingEdited = e.target.value; this.editDataPoint(this.state.stylePointer + ".fontSize")}}>
                        <option selected value="30px">Font Size</option>
                        <option value="10px">10</option>
                        <option value="15px">15</option>
                        <option value="20px">20</option>
                        <option value="25px">25</option>
                        <option value="30px">30</option>
                        <option value="35px">35</option>
                        <option value="40px">40</option>
                        <option value="50px">50</option>
                      </select>
                    </div>
                    <div class="profile_text-model-option-wrapper"> 
                      <h6 style={{fontWeight:"lighter"}}>Bold Value:</h6>
                      <select onChange={(e) => {this.state.styleBeingEdited = e.target.value; this.editDataPoint(this.state.stylePointer + ".fontWeight")}}>
                        <option selected value="30px">Bold Select</option>
                        <option value="lighter">Thinner</option>
                        <option value="light">Thin</option>
                        <option value="normal">Normal</option>
                        <option value="bold">Thick</option>
                        <option value="bolder">Thicker</option>
                      </select>
                    </div>
                    <div class="profile_text-model-option-wrapper">
                      <h6 style={{fontWeight:"lighter"}}>Line Spacing:</h6>
                      <select onChange={(e) => {this.state.styleBeingEdited = e.target.value; this.editDataPoint(this.state.stylePointer + ".lineHeight")}}>
                        <option selected value="30px">Line Spacing</option>
                        <option value="10px">10</option>
                        <option value="15px">15</option>
                        <option value="20px">20</option>
                        <option value="25px">25</option>
                        <option value="30px">30</option>
                        <option value="35px">35</option>
                        <option value="40px">40</option>
                        <option value="50px">50</option>
                        <option value="60px">60</option>
                        <option value="70px">70</option>
                        <option value="80px">80</option>
                      </select>
                    </div>
                    <div class="profile_text-model-option-wrapper">
                      <h6 style={{fontWeight:"lighter"}}>Font Style:</h6>
                      <select onChange={(e) => {this.state.styleBeingEdited = e.target.value; this.editDataPoint(this.state.stylePointer + ".fontFamily")}}>
                        <option selected value='"Courier New", Courier, monospace'>Font Style</option>
                        <option value='"Courier New", Courier, monospace'>Typewriter</option>
                        <option value='Impact, Charcoal, sans-serif'>Compact</option>
                        <option value='"Lucida Sans Unicode", "Lucida Grande", sans-serif'>Spacious</option>
                        <option value='"Comic Sans MS", cursive, sans-serif'>Hand Written</option>
                        <option value="Georgia, serif">Novel Print</option>
                        <option value='"Times New Roman", Times, serif'>Classic Roman</option>
                      </select>
                    </div>
                    <div class="profile_text-model-option-wrapper">
                      <h6 style={{fontWeight:"lighter"}}>Font Color:</h6>
                      <input onChange={(e) => {this.state.styleBeingEdited = e.target.value; this.editDataPoint(this.state.stylePointer + ".color")}} type="color"/>
                    </div>

                    <div style={{margin:"20px 0"}} class="app_seperating-line"></div>
                  </React.Fragment>
                }
                
                <button
                  onClick={() => this.closeEditTextModel()}
                  style={{background:'green', padding:"15px 25px",margin:"10px auto 0 auto", fontSize:"20px", color:"white", borderRadius:"5px",display:"block",}}
                  className=""
                >
                  Done
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default EditProfile;