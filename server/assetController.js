var app = require('./index.js');
const config = require('./config.js');

var cloudinary = require('cloudinary');

cloudinary.config(config.cloudinary);

module.exports = {

  uploadAsset: function(req, res){
    // console.log(req.body, req.file)
    if(!req.session || !req.session.id){
      res.status(500).send(); return
    }
    if(!req.body.asset){
      res.status(500).send({message:"There was an error recieving the media."}); 
      return 
    }
    cloudinary.v2.uploader.upload(req.body.asset, function(error, image) {
      if(error){ 
        console.log(error)
        res.status(500).send({message:error}); 
        return 
      }
      const db = req.app.get('db')
      db.createImage([req.session.id, image.secure_url, image.public_id]).then(response => {
        res.status(200).send({
          message:"New image uploaded.",
          success:true
        })
        return
      }).catch(err => {
        console.log(err)
        res.status(500).send()
        return
      })
    })
  },

  getAssets: function(req, res){
    const db = req.app.get('db')
    db.getImages([req.session.id]).then(assets => {
      res.status(200).send({
        assets:assets
      })  
    }).catch(err => {
      console.log(err)
      return res.status(500).send({message:err})
    })
  },

  deleteAsset: function(req, res){
    cloudinary.v2.uploader.destroy(req.body.public_id, function(error, result){
      if(error){
        console.log(error)
        res.status(500).send()
        return
      }
      const db = req.app.get('db')
      db.deleteImage([req.body.public_id]).then(response => {
        res.status(200).send({
          message:"Image Deleted.",
          success:true
        })
        return
      }).catch(err => {
        console.log(err)
        res.status(500).send()
        return
      })
    });
  }
};