import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

import LoadingModel from './../Models/Loading/Loading.js';

import './EditImageModel.css';

class EditImageModel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showLoadingModel: false,
      loadingModelHeader: null,
      commonAssets:[
        "https://res.cloudinary.com/linkbranch/image/upload/v1537387329/goxkhpmbgjcxf6xcjdzg.png",
        "https://res.cloudinary.com/linkbranch/image/upload/v1536961379/qcfveyxewmlboukllktu.jpg",
        "https://res.cloudinary.com/linkbranch/image/upload/v1536961368/thubqnp82h7effodgsdr.png",
        "https://res.cloudinary.com/linkbranch/image/upload/v1536961359/hjna87sojd32adjkd8ot.jpg",
        "https://res.cloudinary.com/linkbranch/image/upload/v1536961385/xsm9ediugdlsjoukfr3n.png",
        "https://res.cloudinary.com/linkbranch/image/upload/v1536961351/ji9u51zygl0d33gqvn5o.png",
        "https://res.cloudinary.com/linkbranch/image/upload/v1536961308/zedh3rsttcchgscta4tu.jpg",
        "https://res.cloudinary.com/linkbranch/image/upload/v1536961343/phvsqcqrwzwuxmapsmrj.png",
        "https://res.cloudinary.com/linkbranch/image/upload/v1536961319/p78ax4xlrl1lrq8hos0m.png",
        "https://res.cloudinary.com/linkbranch/image/upload/v1536961336/bsvxghfchq2pwo5y7dra.png",
        "https://res.cloudinary.com/linkbranch/image/upload/v1536961325/wyq1p8dsavdr76n98df8.jpg",
      ]
    }
  }

  componentDidMount = () => {
    this.getAssets()
  }

  componentDidUpdate = () => {
    setTimeout(this.setProjectPiecesHeight, 400)
  }

  setProjectPiecesHeight = () => {
    console.log('hit')
    const projects = document.getElementsByClassName('edit-image-model_asset')
    for(let i=0; i<projects.length; i++){
      if(projects[i]){
        let node = projects[i]
        let width = node.clientWidth
        node.height = width
      }
    }
  }

  getAssets = () => {
    if(!this.props.availableAssets){
      console.log(this.props.availableAssets)
      this.setState({showLoadingModel:true, loadingModelHeader:"Fetching..."})
      axios.get('/api/getAssets').then(res => {
        this.setState({showLoadingModel:false, loadingModelHeader:null})
        this.props.setAssetsToState(res.data.assets)
      }).catch(err => {
        alert("There was a problem retrieving assets.")
        console.log(err)
        this.setState({showLoadingModel:false, loadingModelHeader:null})
      })
    }
  }

  renderAssets = () => {
    if(!this.props.availableAssets){return}
    return (
      this.props.availableAssets.map(asset => {
        return (
          <div onClick={() => {this.props.newImageSelected(asset.src)}} style={{width:"33.3%"}}>
            <img className="edit-image-model_asset" style={{objectFit:"cover", width:"100%", padding:"5px", borderRadius:"5px"}} src={asset.src}/>
          </div>
        )
      })
    )
  }
  renderCommonAssets = () => {
    return (
      this.state.commonAssets.map(asset => {
        return (
          <div onClick={() => {this.props.newImageSelected(asset)}} style={{width:"33.3%"}}>
            <img className="edit-image-model_asset" style={{objectFit:"cover", width:"100%", padding:"5px", borderRadius:"5px"}} src={asset}/>
          </div>
        )
      })
    )
  }

  render(){
    console.log(this.props)
    return (
      <div onClick={this.props.closeEditImageModel} style={{background:this.props.modelOverlayBackground}} className="profile_link-model-overlay">
        {this.state.showLoadingModel &&
          <LoadingModel header={this.state.loadingModelHeader} />
        }
        <div onClick={(e) => {e.stopPropagation()}} tabIndex="-1" ref={this.props.editImageModelRef} style={{position:"relative", padding:"20px", width:this.props.modelWidth}} className="profile_link-model-wrapper">
          <div 
            onClick={() => this.props.closeEditImageModel()}
            style={{position:"absolute", background:'red', width:"20px", height:"20px", borderRadius:"50%", textAlign:"center", top:"0px", left:"0px"}}
            className="profile_link-model-x"
          >
            x
          </div>
          <img style={{objectFit:"cover", width:"150px", height:"150px"}} src={this.props.currentImg} alt="Image to Update"/>
          <h6 style={{textAlign:"center", margin:"20px 0px", fontSize:"25px", fontWeight:"bolder"}}>Choose New Image</h6>
          <Link style={{textDecoration:"none"}} to="/assets"><h6 className="edit-image-model_upload-button" style={{color:"white", textAlign:"center", margin:"10px auto", padding:"10px", display:"block", fontSize:"15px", fontWeight:"normal", background:"#e33737"}}>Upload Custom Image</h6></Link>
          {/* <input type="file" accept="image/*" onChange={(e) => this.props.imageUpload(e)}/>
          <button onClick={() => {this.props.editDataPoint(this.props.editPointer); this.props.closeEditImageModel()}}>Update Image</button> */}
          <div style={{display:"flex", flexWrap:"wrap"}}>
            {this.renderAssets()}
            {this.renderCommonAssets()}
          </div>
        </div>
          

      </div>
    )
  }
}

export default EditImageModel;