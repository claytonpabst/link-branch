import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import AnyChart from 'anychart-react';

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
      assets:[],
      showLoadingModel: false,
      loadingModelHeader: null,
    }

    this.overLimit = false
  }

  componentDidMount = () => {
    this.getAssets()
  }

  getAssets = () => {
    this.setState({showLoadingModel:true, loadingModelHeader:"Fetching..."})
    axios.get('/api/getAssets').then(res => {
      if(res.data.message){alert(res.data.message)}
      this.setState({assets:res.data.assets, showLoadingModel:false, loadingModelHeader:null})
    }).catch(err => {
      alert("There was a problem retrieving assets.")
      console.log(err)
      this.setState({showLoadingModel:false, loadingModelHeader:null})
    })
  }
  
  imageUpload = (e) => {
    if(this.overLimit){
      alert("Max assets reached. Delete an asset to upload something new.")
      return
    }
    if(!e.target.files[0]){return}
    let self = this
    this.setState({showLoadingModel:true, loadingModelHeader:"Optimizing..."})
    imageCompressor.handleImageUpload(e, function(img){
      let src = window.URL.createObjectURL(img)
      self.setState({assetToUpload:img, assetToUploadSrc:src, showLoadingModel:false, loadingModelHeader:null})
    })
    e.target.value = ''
  }
  
  sendImageToServer = () => {
    if(!this.state.assetToUpload){return}
    this.setState({showLoadingModel:true, loadingModelHeader:"Uploading..."})
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

  deleteAsset = (public_id) => {
    this.setState({showLoadingModel:true, loadingModelHeader:"Deleting..."})
    axios.post('/api/deleteAsset', {public_id:public_id}).then(res => {
      this.getAssets()
    }).catch(err => {
      console.log(err)
    })
  }

  toggleDeleteView = (i) => {
    let assets = this.state.assets
    this.state.assets[i].deleteViewWidth = this.state.assets[i].deleteViewWidth === "100%" ? "0%" : "100%"
    this.setState({assets})
  }
  
  renderAssets = () => {
    return (
      this.state.assets.map((asset, i) =>{
        return (
          <div className="user-asset-manager_one-asset">
            <div style={{width:asset.deleteViewWidth ? asset.deleteViewWidth : "0%", zIndex:"3"}} className="user-asset-manager_delete-view-wrapper">
              <h1>Delete?</h1>
              <h2 style={{background:"green"}} onClick={() => this.deleteAsset(asset.public_id)}>YES</h2>
              <h2 style={{background:"red"}} onClick={() => this.toggleDeleteView(i)}>NO</h2>
            </div>
            <div 
              onClick={() => this.toggleDeleteView(i)}
              style={{zIndex:"2", position:"absolute", background:"#eeeeee55", width:"20px", height:"20px", borderRadius:"50%", textAlign:"center", top:"0px", left:"0px"}}
              className="profile_link-model-x"
            >
              x
            </div>
            <img style={{filter:asset.deleteViewWidth === "100%" ? "blur(5px)" : "blur(0px)", width:'100%', height:'100%'}} src={asset.src}/>
          </div>
        )
      })
    )
  }

  render(){
    this.overLimit = this.state.assets.length >= 15 ? true : false
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
          <br/>
          <Link to="edit" style={{textDecoration:"none"}}><button style={{background:"#e33737"}} className="user-asset-manager_new-asset-button-active">To Profile</button></Link>
        </div>
        < PageNameHeader>{() => (<h1>Storage</h1>)}</ PageNameHeader >
        <div style={{display:"block", margin:"30px auto", width:'300px', background:'pink'}}>
          <AnyChart 
            type="pie"
            data={`Available,${15-this.state.assets.length},green\nImages,${15-(15-this.state.assets.length)}`}
            title={`${this.state.assets.length} / 15 Assets Used`}
            width={300}
            height={300}
            
          />
        </div>
      </div>
    )
  }
}

export default UserAssetManager