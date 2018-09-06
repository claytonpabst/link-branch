var app = require('./index.js');
const config = require('./config.js');

var cloudinary = require('cloudinary');

cloudinary.config(config.cloudinary);

module.exports = {

  uploadAsset: function(req, res){
    console.log(req.file)
    cloudinary.v2.uploader.upload_stream({
      //options
    }, function(error, result) {
      console.log(error);
      console.log(result);
    }).end(req.file.buffer);
  }
};