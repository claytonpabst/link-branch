import React from 'react';

class EditImageModel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render(){
    return (
      <div onClick={this.props.closeEditImageModel} style={{background:this.props.modelOverlayBackground}} className="profile_link-model-overlay">
        <div onClick={(e) => {e.stopPropagation()}} tabIndex="-1" ref={this.props.editImageModelRef} style={{position:"relative", padding:"20px", width:this.props.modelWidth}} className="profile_link-model-wrapper">
          <div 
            onClick={() => this.props.closeEditImageModel()}
            style={{position:"absolute", background:'red', width:"20px", height:"20px", borderRadius:"50%", textAlign:"center", top:"0px", left:"0px"}}
            className="profile_link-model-x"
          >
            x
          </div>
          <img src={this.props.currentImg} alt="Image to Update"/>
          <h6 style={{textAlign:"left", margin:"20px 0px 0px 0px", fontWeight:"lighter"}}>Enter New Image Address</h6>
          <input type="file" accept="image/*" onChange={(e) => this.props.imageUpload(e)}/>
          <button onClick={() => {this.props.editDataPoint(this.props.editPointer); this.props.closeEditImageModel()}}>Update Image</button>
        </div>
      </div>
    )
  }
}

export default EditImageModel;