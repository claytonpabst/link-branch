import React from 'react';
import axios from 'axios';

import imageCompressor from './imageCompressor.js';

import PageNameHeader from './../PageNameHeader/PageNameHeader.js';
import LoadingModel from './../Models/Loading/Loading.js';

import './UserAssetManager.css';

class UserAssetManager extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      assetToUploadSrc: "https://d30y9cdsu7xlg0.cloudfront.net/png/396915-200.png",
      assetToUpload: null,
      assets:[1,2,3,4],
      showLoadingModel: false,
      loadingModelHeader: null,
    }
  }

  componentDidMount = () => {
    this.getAssets()
  }

  getAssets = () => {
    this.setState({showLoadingModel:true, loadingModelHeader:"Fetching..."})
    axios.get('/api/getAssets').then(res => {
      console.log(res)
      if(res.data.message){alert(res.data.message)}
      this.setState({assets:res.data.assets, showLoadingModel:false, loadingModelHeader:null})
    }).catch(err => {
      alert("There was a problem retrieving assets.")
      console.log(err)
      this.setState({showLoadingModel:false, loadingModelHeader:null})
    })
  }
  
  imageUpload = (e) => {
    if(!e.target.files[0]){return}
    let self = this
    this.setState({showLoadingModel:true, loadingModelHeader:"Optimizing..."})
    imageCompressor.handleImageUpload(e, function(img){
      let src = window.URL.createObjectURL(img)
      self.setState({assetToUpload:img, assetToUploadSrc:src, showLoadingModel:false, loadingModelHeader:null})
    })
  }
  
  sendImageToServer = () => {
    this.setState({showLoadingModel:true, loadingModelHeader:"Uploading..."})
    console.log('hit')
    let formData = new FormData()
    formData.append('asset', this.state.assetToUpload, this.state.assetToUpload.name)
    axios.post('/api/uploadAsset', formData).then(res => {
      // if(res.data.message){alert(res.data.message)}
      this.getAssets()
      this.setState({assetToUploadSrc:"https://d30y9cdsu7xlg0.cloudfront.net/png/396915-200.png", assetToUpload: null, showLoadingModel:false, loadingModelHeader:null})
    }).catch(err => {
      alert("Could not process asset upload at this time.")
      this.setState({assetToUploadSrc:"https://d30y9cdsu7xlg0.cloudfront.net/png/396915-200.png", assetToUpload: null, showLoadingModel:false, loadingModelHeader:null})
    })
  }
  
  renderAssets = () => {
    return (
      this.state.assets.map(asset => {
        return (
          <div className="user-asset-manager_one-asset">
            <img style={{width:'100%', height:'100%'}} src={asset.src}/>
          </div>
        )
      })
    )
  }

  render(){
    return (
      <div className="user-asset-manager_main-wrapper">
        { this.state.showLoadingModel &&
          <LoadingModel header={this.state.loadingModelHeader}/>
        }
        < PageNameHeader>{() => (<h1>Asset Manager</h1>)}</ PageNameHeader >
        <div className="user-asset-manager_assets-wrapper">
          {this.renderAssets()}
        </div>
        <div className="user-asset-manager_new-asset">
          <div style={{display:'block', margin:"0 auto"}} className="user-asset-manager_one-asset user-asset-manager_new-asset-image">
            <input type="file" accept="image/*" onChange={(e) => this.imageUpload(e)} style={{position:"absolute", width:"100%", height:"100%", opacity:"0.0"}}/>
            <img style={{width:'100%', height:'100%'}} src={this.state.assetToUploadSrc}/>
          </div>
          <button className={this.state.assetToUpload ? 'user-asset-manager_new-asset-button-active' : 'user-asset-manager_new-asset-button-inactive' } onClick={this.sendImageToServer}>Upload</button>
        </div>
        < PageNameHeader>{() => (<h1>Storage</h1>)}</ PageNameHeader >
        <h1>0%</h1>
      </div>
    )
  }
}

export default UserAssetManager