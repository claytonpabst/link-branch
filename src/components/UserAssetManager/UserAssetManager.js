import React from 'react';
import axios from 'axios';

import imageCompressor from './imageCompressor.js';

import PageNameHeader from './../PageNameHeader/PageNameHeader.js';

import './UserAssetManager.css';

class UserAssetManager extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      assetToUpload: null,
      assets:[1,2,3,4]
    }
  }

  renderAssets = () => {
    return (
      this.state.assets.map(asset => {
        return (
          <div className="user-asset-manager_one-asset">
            <input type="file" accept="image/*" onChange={(e) => this.imageUpload(e)} style={{position:"absolute", width:"100%", height:"100%", opacity:"0.0"}}/>
            <img style={{width:'100%', height:'100%'}} src="https://d30y9cdsu7xlg0.cloudfront.net/png/396915-200.png"/>
          </div>
        )
      })
    )
  }

  imageUpload = (e) => {
    let self = this
    imageCompressor.handleImageUpload(e, function(img){
      self.setState({assetToUpload:img})
    })
  }

  sendImageToServer = () => {
    console.log('hit')
    let formData = new FormData()
    formData.append('asset', this.state.assetToUpload, this.state.assetToUpload.name)
    axios.post('/api/uploadAsset', formData).then(res => {
      console.log(res)
    })
  }

  render(){
    return (
      <div className="user-asset-manager_main-wrapper">
        < PageNameHeader>
          {() => (<h1>Asset Manager</h1>)}
        </ PageNameHeader >
        <div className="user-asset-manager_assets-wrapper">
          {this.renderAssets()}
        </div>
        <div className="user-asset-manager_new-asset">
          <div style={{display:'block', margin:"0 auto"}} className="user-asset-manager_one-asset">
            <input type="file" accept="image/*" onChange={(e) => this.imageUpload(e)} style={{position:"absolute", width:"100%", height:"100%", opacity:"0.0"}}/>
            <img style={{width:'100%', height:'100%'}} src="https://d30y9cdsu7xlg0.cloudfront.net/png/396915-200.png"/>
          </div>
          <button className={this.state.assetToUpload ? 'user-asset-manager_new-asset-button-active' : 'user-asset-manager_new-asset-button-inactive' } onClick={this.sendImageToServer}>Upload</button>
        </div>
        < PageNameHeader>
          {() => (<h1>Storage</h1>)}
        </ PageNameHeader >
        <h1>0%</h1>
      </div>
    )
  }
}

export default UserAssetManager