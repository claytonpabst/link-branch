import React from 'react'

import imageCompressor from './imageCompressor.js';

import PageNameHeader from './../PageNameHeader/PageNameHeader.js';

import './UserAssetManager.css'

class UserAssetManager extends React.Component {
  constructor(props){
    super(props)

    this.state = {
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

      console.log(img)
      // let currentImg = self.state.currentImg
      // let editText = self.state.editText
      // currentImg = window.URL.createObjectURL(img)
      // editText = window.URL.createObjectURL(img)
      // self.setState({currentImg, editText})

      //push img to server
      //save returned url of img to db
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
          <div className="user-asset-manager_one-asset">
            <input type="file" accept="image/*" onChange={(e) => this.imageUpload(e)} style={{position:"absolute", width:"100%", height:"100%", opacity:"0.0"}}/>
            <img style={{width:'100%', height:'100%'}} src="https://d30y9cdsu7xlg0.cloudfront.net/png/396915-200.png"/>
          </div>
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