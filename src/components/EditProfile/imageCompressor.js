import imageCompression from './imageComp/index.js';

const theGoods = {
  handleImageUpload: function(event, cb) {
 
    var imageFile = event.target.files[0];
    console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
   
    var maxSizeMB = .25;
    var maxWidthOrHeight = 257; // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight
    imageCompression(imageFile, maxSizeMB, maxWidthOrHeight) // maxSizeMB, maxWidthOrHeight are optional
      .then(function (compressedFile) {
        console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
   
        return cb(compressedFile);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }
}

export default theGoods