import React, { Component, Fragment } from 'react';

import imageCompressor from './imageCompressor.js';

import './EditProfile.css';
import './Profile.css';
import './../../App.css'

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
            fontSize:"30px",
            fontWeight:"bolder",
            lineHeight:"50px",
            fontFamily:'"Comic Sans MS", cursive, sans-serif',
            color:"maroon",
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
                text:'    They decided to call themselves Foreign Figures as a nod to the time that each member spent living in a foreign country, as well as the band’s interest in connecting with all types of people around the world.',
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
                type:"TEXT",
                text:'    Enjoy the latest singles from FF',
                style:{

                },
              },
              {
                type:"PROJECT",
                title:{
                  text:'Paradigm',
                  style:{

                  }
                },
                img:{
                  src:"http://www.foreignfigures.com/wp-content/uploads/2016/07/cropped-Paradigm-Cover-Art-270x270.jpg",
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
                type:"PROJECT",
                title:{
                  text:'Paradigm',
                  style:{

                  }
                },
                img:{
                  src:"http://www.foreignfigures.com/wp-content/uploads/2016/03/Come-Alive-EP-Cover-Art-300x300.jpg",
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
                title:{
                  text:'Paradigm',
                  style:{

                  }
                },
                img:{
                  src:"http://www.foreignfigures.com/wp-content/uploads/2017/06/Cold-War-Cover-Art-SNOW-300x300.jpg",
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
                title:{
                  text:'Paradigm',
                  style:{

                  }
                },
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
    }

    this.linkModel = React.createRef()
    this.textModel = React.createRef()
    this.imageModel = React.createRef()

    this.deleteSection = this.deleteSection.bind(this);
  }

  //--------------Start of Data Editing Functions --------------------//
  
  // pointer changes as this function calls inself to dig into the obj. 
  // original pointer is used to check if .style exists in the pointer to decide what to update--------------------
  editDataPoint = (pointer, profileDataOnReCall, originalPointer) => {
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
      this.forceUpdate()
      return;
    }
    return this.editDataPoint(pointer.slice(1, pointer.length), profileData[pointer[0]], originalPointer)
  }

  imageUpload = (e) => {
    let self = this
    imageCompressor.handleImageUpload(e, function(img){
      let currentImg = self.state.currentImg
      let editText = self.state.editText
      currentImg = window.URL.createObjectURL(img)
      editText = window.URL.createObjectURL(img)
      self.setState({currentImg, editText})

      //push img to server
      //save returned url of img to db
    })
  }

  editImageModel = (pointer, piece, currentImg, stylePointer) => {
    this.setState({
      stylePointer,
      editPointer:pointer,
      showEditImageModel: true,
      currentImg: currentImg,
      modelData:piece
    }, () => {
      setTimeout(() => {this.setState({modelWidth:"90%", modelOverlayBackground:"rgba(0,0,0,0.6)", modelOverlayBlur:"blur(5px)"}); this.imageModel.current.focus()}, 1)
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
  editTextModel = (pointer, piece, editText, stylePointer) => {
    this.setState({
      stylePointer,
      editPointer: pointer,
      showEditTextModel: true,
      editText,
      modelData: piece
    }, () => {
      setTimeout(() => {this.setState({modelWidth:"90%", modelOverlayBackground:"rgba(0,0,0,0.6)", modelOverlayBlur:"blur(5px)"}); this.textModel.current.focus()}, 1)
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
      setTimeout(() => {this.setState({modelWidth:"90%", modelOverlayBackground:"rgba(0,0,0,0.6)", modelOverlayBlur:"blur(5px)"}); this.linkModel.current.focus()}, 1)
    })
  }
  
  closeLinkModel = () => {
    this.setState({modelWidth:"0%", modelOverlayBackground:"rgba(0,0,0,0.0)", modelOverlayBlur:"blur(0px)"}, () => {
      setTimeout(() => {this.setState({showLinkModel:false}); this.unRecordDragEvent()}, 400)
    })
  }

  addSection = () => {
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
    let profileData = JSON.parse(JSON.stringify(this.state.profileData))
    profileData.sections[i].pieces[j].links.push({
      img:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAREAAAC5CAMAAAA4cvuLAAAAilBMVEX///+rq6sAAADk5OSnp6f19fU+Pj4JCQnx8fH4+Pjb29umpqa2trbV1dVERER+fn5xcXHJycknJyewsLCenp7BwcHPz8/p6em4uLjm5uY1NTWLi4tWVlbe3t6bm5vKysoaGhpKSkpra2sSEhJlZWWHh4d8fHwvLy+SkpJcXFw4ODghISFQUFAXFxcLKTVMAAAMW0lEQVR4nO2d52KqMBiGAUEZepQiuLVqXR33f3uHLAhhBYgM5f3RqqzwmG9koST16tWrV69evXr16tWrgBa27A6aLkR7pE0cVZVlVbYXTRelDTLMpeXjQLLGE63pAjWslStbMi1VXQ6MpkvVmHTPieLAFeVNrUebjFU1gQeqKM67WY+xW8ppOAgUd9d0KeuTH2qzcWAob2I9Kc4jWa8fezRzbPFUD6qiWMvd68aeARtqOSvKi1rP4qCWwYGhOJ7e9A2IlR9qC1oLKz9ze53Y44faijgwFMteNX0vIuTn6SJwICaq43U89ugHWUj1oKB0OfYYGXl6JSiy28XYI8p5JDPpXuzhzNOrQFGXZmesp1CeXgmK24XYY5jPcR4pUFpvPQO3RhyIidVi63m+80iBIrfSeqrn6VXUutjjh9q6rYWVqo7bYz0i8/Qqaon1gDy9aRShLPnQrPVk9ac3pCYzt6fm6VXkZ25NDCH7obZF1sLIb/fUbD2612IcSD4Us66uFMNsPNTySa1nAsbAbafzSNbTY49u19OqFSg/c5s8K/Zok87hQFIt9wkTMDrjPJIl3HpWtTfyhUsVOISsHzpqLazExJ5mG/nCVXkIOXfeS/dUZfpSq/P0Kio3fUn3nFerHbSKTl+KTDF9VRWIPYOWdIk9XZbME3pe1nmwAp0o+Yksnp/++uLraOt4nl5AXEMZxtJ1mi5oPeKNMpoyetydl4dSoBWsjRRF+ZnNXxlKsV56SMTX8fKqTCy52DgoIeLrFa2nRAOPIqIot5n1SlB851FiLl+EiK9/F/k1mJQe4mOJKMrn1777FaXCJIo4EWg98y4zqdY7lEgExJ5NRysKX7OlBBFFOX91L/aImB+QTsTX+qp2CYqY+YuZRHz9diX2+M4jd54RV0dRHpFuxB5V5lg9bX/9E0PE1/fVajETMLE199s3L39+siWMCLCeTTutR+VxHov9Gt6EUCJ+A7mF1sPjPCTvl9yCYCIKiD1tsh7esctZUP7CRH44oGxbkrkVGN8OqkhxIitz+pnP5PPUuPVwOY9At/JE/DpouF8cFWU4bdLNWmp+s8Vwgl308A7LEAEnk38TILDa3puB4juP3KFbwz4pikve7cJClyQCTrL/y2fycaq/c9Ya82QeH6B4e/LeFUHE1+HIUVGG0zpjD0+fx2r+gcs2Ix/NBRGJsE3XeVtTA9lv5HP0eVAW8k0+mwojIhk8TtaPPc8f2uCe92FS5SLtnK04IhG8mfrnx56nQVF5nEcCEcKQusHqRKQrJ5LnDW0U6zCliSzxZ/Q3V5KIcw/L8A03ODxZyu0kfGiDy3noEzswKZoIDjaUaylNZO+3dAlgk+DWZY7gI3Rog8t5eFfU9FDjRB7oIxggRqNKRGC4+odNFzaTxvDlisOtnAVZD5jUnp95bMKW2D1GZI12suBrAUSULUV9TL3O1a167OFxHov5MHLZVayEyOCgKzwpAogoE/RuGBKZcBFRKloPz8JMbRlradxjREy4K9xxL4QI9kybEkTKWw9wHvkdprOEKx5jRBy4M2z5OkKITNE7txQRpcywOpfz8J184uU+DJbIJdh55IkksitLRAGTUvith/9ZK8lERjpLBHpC+MnHTiQRvQIRRfl78HUvFVnVTRFZ75eBBVFEcAgCO8Pgux2IJKJVIgJKnWs94IlnBcYmCZHPC3T+JE+iiDzCT+DNXITWkTwix/0t6ePoPhlDGxzOw7Dvj+FxOmGIIM8p7eNENuifJ+Hgq9ZKxN9tkt/8SRnaUDkmiZnB2U+JRMZxIjLq8JIlHHxts04iqFzuIxfKLTa0YXE4jwF94hknkQMasLpKuJ23qpWIh0+kq/9yofxSQxt8D3zbR0/gpROhY80BNUyPhIhRKxGqcTpO2h7VGVkPZ+YhsTXvlE7kh8pHbHQLfooCP/gmJa/Q9gW6cxEZUefia/cMryrvDNMte+wonciQKoGNe0RXKPg+qhIxkFOYcBH5pc6FivqZ61LWuYVC/xJOtEolcqWIuAv0/4BavtOqRMBF5QvpIckhsqHOZUCHdvOP/s4kMswukjeDuZUkB/tvgmbuJE4Et1mWNBHccTZHwdcSQITSKpuIQ+8LazlsYAzuGVlKFhET5hLgFf6e/YRTCu3HixO5o3dShAhK267ouINYIpNsIia97zQgIoHurcJENOtfeHsX9PILbiFDJXacCIJ1iRJBuf23BGvtTiyReTYR5CIxBJkm4muZ3D2bTERbho4UnBK9GqGzkd7SOBFUqLMWJYLjpY7PJpTIMZMIdpI2KpDNEPGrfpJLSSLizc7UHoAmeoVzgEEaEf2GGUSJ2PgF+PNXmciCviV4znQiqE5Le9RHDE3/xlwh7lJiRMw7M69HCubBLLOJuIijRU5EiKzQixP4s61MZH/ehN39o2wiONSccKhGn8W60BmXEiWiz2PJLig5Di+TdCJjfY4r4JakiQERCZGCfy+ViQAbHN69laab2I+nE8Ff4Qf2cngYemixwyyGS2VbUSJsF+H3HiYd51widNV7MH5EosZSLCFEIOBgUzoRUjc27N1tl0yjhTo4SiQy5jG64DOuohdIIhLRL0PkEm6yhREJlU5Ew8XHcxPu1KZT9EIeB5GTHXxKEPASgVsoIk7ktuoj8oc2HMhN0m29WfRCuUSODt32K0zkFCVClVWrkwgeSZRxyhjZgxBZ8BFhSluYyDpKRItcrT4i9+CmUKa2oLZhIsYncilPIfK5DRz2meofAdnJmmx41EoEh5oHKblB+X9CBMSfmZfrWUsQmdkG1QWxiBIJ0uVprUTwER9BI4MafKSJKMrPSTgRfEkS3wZRIoGTl8OSb59PBLdqlMB+qOQiSoSWWCKk04AhslSoQ2DJYZV6MhF8F6AcOJ236idiJxMJrGkASx7Lj55DBGMYh3dJTXBsmIhBrgb20Qs8Dq0SETx9AJjsjxEpefNEgunw/CziRFZFieA2+IM6uD1EkEubeVJB0UTsokRwpYLfBu5MCxdfNE1kDhpXRXEwRJThfFGICH0KfPGw16wskcVCDJHJvdzCcHYN1nFsWAqrFCK4bwgVA4ffTTUioGtxKYZIWcVXpZ3j/YApRPA9u/Qbmd1ahAjqWnQrEzmIJZKgFCI41Ozp2wz3KUpkd8edRCWJmJjIY1xtnXzYRswnwo5i4sqJ81T0ZhVsLUgk/GZKEgGbzPO88k+HFSEi6dHlWWSqg3cF3y7O6INJtwWJhMoicogTOeC3l6ooiHRrreRpHO4+2Ae3/Bn28IChYhz4g27k0kSyPGvCmB6x06soIhJeQZ6laFj3psjgj5FPF7i6nqoS+RpkENnFicBND0fwzwgYdubiCIfdHc4emCWeKpgDU4rI0dGp+4wTAU6TISL93Ko7jyTpVsYcoW3sKxiEw0ZRBa3w4kTW+7BBxhDBpgG7DlkiT/wZxt0mYwH0KRrk9SDpZ2JdEJCKEgnmIkIxRHDX+gZfOkLkuXJP6Uw+N1SZ9WC+1e+XS0MJWuFC2zVb6h0hIou88Qzpcob1rPdkupQeNLP9Ox5dKVZkRFsMEeTUbXofRGQ9r/F3ajKt5zHWULHwfeHu9/Wd+ADSOy6GCDwL8U0oJfSJnC+mVLPAOvNUAZeikfgfpu3Yrsn4ohgiyn0SrIfD4V6nhv7qlO5kWM/H5kCWxgWxhYz9kqZzNSKL2FGRiaINabDJmvI+RQUMh3rxQC8ZqqpGRIpfunBv2FN0SFruRAT7t0/B2w90SMQDlCdyYo+q1OkhUoaT9fCNmUf1pqADtD8hROzoMR9N/CxcqgZ7vocdYTv/FkJEiizV3LTmlzeJvBkHFJzVfokhogcHjqbN+9QE6U7uovDolNuqRCQN9dmelu36uVpai5zlVjj8jgUR8aUvWmctrLys2PN5gbMUJ+KIdEPj2BoPSmtrRToq34eIJK32Wc+SeyxHb0dE4lqs+GZEEh9m8OZEJBB7slYW3dDE57ci4muS+ZQW0PDhJZK7VK0zMpaZ6/JmNh+RU6Wx2rZJn+cPgqUTubLTnV9D2daTSeS+b1WzVqA4FsonEnllLTiGkN+LiK8dz1OA34oI11OA34yIBB4zMeyJsDIvPZGY0idgvCsRYD3Jsed9iUhgCDmexL83kcTpS29OxJfGPIG+JyKBIeRRT4RV+MTMngiRPh72RFjBCRg9kagOs+/8nd5MrR+57NWrV69evXr16tWrV6+O6T9fZBGZ27xwdwAAAABJRU5ErkJggg==',
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

  //--------------Start HTML Return Function --------------------//
  
  buildTextPiece = (piece, i, j) => {
    return(
      <div onDragOver={() => this.pieceSwap(i, j)} draggable="true" onDragEnd={this.unRecordDragEvent} onDragStart={(e) => {e.stopPropagation(); this.recordDragEvent(e, i, j, null)}} className="profile_text-piece" key={j}>
        <div style={{position:"relative"}}>
          <h3 style={{padding:"7px 13px"}}><pre style={piece.style}>{piece.text}</pre></h3>
          {this.props.edit &&
            <img 
              src="http://www.vicksdesign.com/products/pencil-icon-6-B1.png"
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
              onClick={(e) =>{e.stopPropagation(); this.editTextModel("sections."+i.toString()+".pieces."+j.toString()+".title.text", piece, piece.title.text, "sections."+i.toString()+".pieces."+j.toString()+".title.style")}}
              style={{
                top:"2px",
                left:"10px",
              }}
              className="profile_link-model-x edit-profile_edit-icon"
            />
          }
          <h3 style={piece.title.style}>{piece.title.text}</h3>
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
      <div style={{filter:this.state.modelOverlayBlur}}>
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
            <h1 style={profileData.name.style}>{profileData.name.text}</h1>
            {this.props.edit &&
              <img 
                src="http://www.vicksdesign.com/products/pencil-icon-6-B1.png"
                onClick={(e) => {e.stopPropagation(); this.editTextModel("name.text", null, profileData.name.text, "name.style")}}
                style={{top:"2px",left:"10px",}}
                className="profile_link-model-x edit-profile_edit-icon"
              />
            }
          </div>
          <p>{this.numberToThousands(profileData.profileViews.views)} Profile Views</p>
          {this.props.edit &&
            <Fragment>
              <div style={{position:"absolute", bottom:"8px", right:"5px",display:"flex",}}>
                <div onDragOver={(e) => e.preventDefault()} onDrop={(e) => this.deleteSection(e)} style={{padding:"2px", border:"2px solid black", borderRadius:"5px", margin:"3px 10px"}}><img style={{height:"30px", width:"30px"}} src="http://icons.iconarchive.com/icons/icons8/ios7/256/Messaging-Trash-icon.png"/></div>
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
                        src="http://www.vicksdesign.com/products/pencil-icon-6-B1.png"
                        onClick={(e) => {e.stopPropagation(); this.editTextModel("sections."+i.toString()+".title.text", null, section.title.text, "sections."+i.toString()+".title.style")}}
                        style={{top:"2px",left:"-5px",}}
                        className="profile_link-model-x edit-profile_edit-icon"
                      />
                      <div style={{position:"absolute", right:"5px",display:"flex",}}>
                        <div onDragOver={(e) => e.preventDefault()} onDrop={(e) => this.deleteSection(e)} style={{padding:"2px", border:"2px solid black", borderRadius:"5px", margin:"3px 10px"}}><img style={{height:"30px", width:"30px"}} src="http://icons.iconarchive.com/icons/icons8/ios7/256/Messaging-Trash-icon.png"/></div>
                        <div onClick={() => this.addTextPiece(i)} style={{padding:"2px", border:"2px solid black", borderRadius:"5px", margin:"3px 10px"}}><img style={{height:"30px", width:"30px"}} src="https://www.shareicon.net/data/512x512/2015/08/29/92770_write_512x512.png"/></div>
                        <div onClick={() => this.addProjectPiece(i)} style={{padding:"2px", border:"2px solid black", borderRadius:"5px", margin:"3px 10px"}}><img style={{height:"30px", width:"30px"}} src="https://d30y9cdsu7xlg0.cloudfront.net/png/396915-200.png"/></div>
                        <div onClick={() => this.addProjectPiece(i)} style={{padding:"2px", border:"2px solid black", borderRadius:"5px", margin:"3px 10px"}}><img style={{height:"30px", width:"30px"}} src="https://cdn4.iconfinder.com/data/icons/cinema-outline-icon-set/30/camera-512.png"/></div>
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
    let profileData = JSON.parse(JSON.stringify(this.state.profileData)); // this line is needed because of how the editDataPoint function works with updating style; react treats style attr as a prop that has to go through this.setState, which I'm not using in that function.
    let style = profileData.style
    return (
      <div style={{background:"#f5f5f5"}} className="App">
        <div style={{background:"#f5f5f5"}} className="profile_profile-wrapper">
          { 
            this.buildSections(profileData)
          }

          {/* --------------------------The above line executes all the HTML functions and builds the profile. Below is the return of different editing models------------------------------ */}

          {this.state.showLinkModel &&
            <div onClick={this.closeLinkModel} style={{background:this.state.modelOverlayBackground}} className="profile_link-model-overlay">
              <div onClick={(e) => {e.stopPropagation()}} tabIndex="-1" ref={this.linkModel} style={{position:"relative", padding:"20px", width:this.state.modelWidth}} className="profile_link-model-wrapper">
                <div 
                  onClick={this.closeLinkModel}
                  style={{position:"absolute", background:'red', width:"20px", height:"20px", borderRadius:"50%", textAlign:"center", top:"0px", left:"0px"}}
                  className="profile_link-model-x"
                >
                  x
                </div>
                {this.state.modelData.img.src &&
                  <img src={this.state.modelData.img.src}/>
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
                          <img className="profile_link-piece-img" src={link.img}/>
                          <a className="profile_link-piece-go" href={link.href}>Go</a>
                        </div>
                      )
                    })
                  })()}
                </div>
              </div>
            </div>
          }
          {this.state.showEditImageModel &&
            <div onClick={this.closeEditImageModel} style={{background:this.state.modelOverlayBackground}} className="profile_link-model-overlay">
              <div onClick={(e) => {e.stopPropagation()}} tabIndex="-1" ref={this.imageModel} style={{position:"relative", padding:"20px", width:this.state.modelWidth}} className="profile_link-model-wrapper">
                <div 
                  onClick={() => this.closeEditImageModel()}
                  style={{position:"absolute", background:'red', width:"20px", height:"20px", borderRadius:"50%", textAlign:"center", top:"0px", left:"0px"}}
                  className="profile_link-model-x"
                >
                  x
                </div>
                <img src={this.state.currentImg} alt="Image to Update"/>
                <h6 style={{textAlign:"left", margin:"20px 0px 0px 0px", fontWeight:"lighter"}}>Enter New Image Address</h6>
                <input type="file" accept="image/*" onChange={(e) => this.imageUpload(e)}/>
                <button onClick={() => {this.editDataPoint(this.state.editPointer); this.closeEditImageModel()}}>Update Image</button>
              </div>
            </div>
          }
          { this.state.showEditTextModel &&
            <div  onClick={this.closeEditTextModel} style={{background:this.state.modelOverlayBackground}} className="profile_link-model-overlay">
              <div onClick={(e) => e.stopPropagation()} tabIndex="-1" ref={this.textModel} style={{position:"relative", padding:"20px", width:this.state.modelWidth}} className="profile_link-model-wrapper">
                <div 
                  onClick={() => this.closeEditTextModel()}
                  style={{position:"absolute", background:'red', width:"20px", height:"20px", borderRadius:"50%", textAlign:"center", top:"0px", left:"0px"}}
                  className="profile_link-model-x"
                >
                  x
                </div>

                <h6 style={{margin:"10px 0px 5px 0px", fontWeight:"Bold", textAlign:"center", fontSize:"20px", display:"inlineBlock"}}>New Text</h6>
                <textarea style={{width:"100%", height:"200px"}} value={this.state.editText} onChange={(e) => {this.state.editText = e.target.value; this.editDataPoint(this.state.editPointer)}}/>
                
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