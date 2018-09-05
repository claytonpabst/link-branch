var app = require('./index.js');

module.exports = {

  uploadAsset: function(req, res){
    console.log(req.file, req.files, req.params, req.body)
    res.send('yo')
  }
};