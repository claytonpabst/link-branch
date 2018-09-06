var app = require('./index.js');
const config = require('./config.js');

var cloudinary = require('cloudinary');

cloudinary.config(config.cloudinary);

module.exports = {

  uploadAsset: function(req, res){
    if(!req.session || !req.session.id){
      res.status(500).send(); return
    }
    console.log(req.file)
    cloudinary.v2.uploader.upload_stream({
      //options
    }, function(error, image) {
      if(error){ res.status(500).send({message:error}); return }
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
    }).end(req.file.buffer);
  },

  getAssets: function(req, res){
    console.log('getAssets hit')
    const db = req.app.get('db')
    db.getImages([req.session.id]).then(assets => {
      res.status(200).send({
        assets:assets
      })  
    }).catch(err => {
      console.log(err)
      return res.status(500).send({message:err})
    })
  }
};