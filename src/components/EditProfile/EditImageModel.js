import React from 'react';
import axios from 'axios';

import LoadingModel from './../Models/Loading/Loading.js';

class EditImageModel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showLoadingModel: false,
      loadingModelHeader: null
    }
  }

  componentDidMount = () => {
    this.getAssets()
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
            <img class="edit-image-model_asset" style={{width:"100%", height:"auto", padding:"5px", borderRadius:"5px"}} src={asset.src}/>
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
          <img src={this.props.currentImg} alt="Image to Update"/>
          <h6 style={{textAlign:"center", margin:"20px 0px", fontSize:"25px", fontWeight:"bolder"}}>Choose New Image</h6>
          <input type="file" accept="image/*" onChange={(e) => this.props.imageUpload(e)}/>
          <button onClick={() => {this.props.editDataPoint(this.props.editPointer); this.props.closeEditImageModel()}}>Update Image</button>
          <div style={{display:"flex", flexWrap:"wrap"}}>
            {this.renderAssets()}
          </div>
        </div>
          

      </div>
    )
  }
}

export default EditImageModel;