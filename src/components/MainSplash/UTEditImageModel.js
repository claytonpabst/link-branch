import React from 'react';

import LoadingModel from './../Models/Loading/Loading.js';

class EditImageModel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showLoadingModel: false,
      loadingModelHeader: null,
      commonAssets:[
        "https://res.cloudinary.com/linkbranch/image/upload/v1537431223/natlveqheuwapyjmak53.jpg",
        "https://res.cloudinary.com/linkbranch/image/upload/v1537431229/zu4ktmmd58jbxevqa4vg.jpg",
        "https://res.cloudinary.com/linkbranch/image/upload/v1537431216/ycluhjyuwkpc6feubmva.jpg",
        "https://res.cloudinary.com/linkbranch/image/upload/v1537431236/fuxr2ke9lzvnkywls9p8.jpg",
        "https://res.cloudinary.com/linkbranch/image/upload/v1537431030/ne1w0nqttq3xd5k3hnwg.jpg",
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

  componentDidUpdate = () => {
    setTimeout(this.setProjectPiecesHeight, 400)
  }

  setProjectPiecesHeight = () => {
    const projects = document.getElementsByClassName('edit-image-model_asset')
    for(let i=0; i<projects.length; i++){
      if(projects[i]){
        let node = projects[i]
        let width = node.clientWidth
        node.height = width
      }
    }
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
          {/* <input type="file" accept="image/*" onChange={(e) => this.props.imageUpload(e)}/>
          <button onClick={() => {this.props.editDataPoint(this.props.editPointer); this.props.closeEditImageModel()}}>Update Image</button> */}
          <div style={{display:"flex", flexWrap:"wrap"}}>
            {this.renderCommonAssets()}
          </div>
        </div>
          

      </div>
    )
  }
}

export default EditImageModel;