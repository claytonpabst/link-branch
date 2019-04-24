// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const massive = require('massive');
// const helmet = require('helmet');
const config = require('./config.js');
// const multer = require('multer');
// const path = require('path');

// const {dualSession, dualSessionConnect, dualSessionClean} = require('./express-dual-session/index.js')

// const app = module.exports = express();
// const multerParser = multer({ storage: multer.memoryStorage() })

// app.use(helmet())
// app.use(bodyParser.json());

// massive(config.connection).then( db => {      // Returns database. See Massive docs for connection options
//   dualSessionConnect(db).then( message => {   // Pass db to connect function
//     db.reload().then( refreshedDb => {        // Reload/refresh db after we add Dual Session
//       app.set('db', refreshedDb)              // Adds db object to app object
//       console.log(message)
//       dualSessionClean({                      // *Optional* Function to handle deleting old sessions
//         app: app,                             // Function needs access to app
//         dbName: 'db',                         // Needs to be same name from app.set() function
//         dbMaxAge: 1000 * 60 * 60 * 24 * 30,   // Sessions in db older than 30 days will be deleted
//         memMaxAge: 1000 * 60 * 60,            // Sessions in memory older than 1 hour will be deleted, max of ~2 hours with these settings, depending on when a user creates a session and the clean function does it's thing.
//         cleanInterval: 1000 * 60 * 60         // How often the clean function runs. Note: cleanInterval needs to be === or < memMaxAge for memory to clean as expected.
//       })
//     })
//   }).catch( err => {
//     console.log(err)                          //If Dual Session can't connect to db
//   })
// })

// app.use(dualSession({                 // Once Dual Session is connected to db, use it by invoking with options
//   dbName:'db',                        // Needs to be same name from app.set() function
//   secret:config.secret,               // Secret key for cookie encryption. Put this in a .gitignore
//   cookieName:"xs",                    // Choose a cookie name for the client
//   maxAge: 1000 * 60 * 60 * 24 * 30    // How long until browser deletes session cookie. 
// }))

// app.use(express.static(__dirname + './../build'))

// var userController = require("./userController.js");

// app.get('/api/isLoggedIn', userController.isLoggedIn);
// app.get('/api/signOut', userController.signOut);
// app.post('/api/signIn', userController.signIn);
// app.post('/api/signUp', userController.singUp);
// app.post('/api/checkIfUsernameIsAvailable', userController.checkIfUsernameIsAvailable);

// var assetController = require("./assetController.js");

// app.post('/api/uploadAsset', multerParser.single('asset'), assetController.uploadAsset);
// app.get('/api/getAssets', assetController.getAssets)
// app.post('/api/deleteAsset', assetController.deleteAsset)

// var profileController = require("./profileController.js");

// app.get('/api/getProfileDataForUser', profileController.getProfileDataForUser)
// app.get('/api/getProfileDataForGuest', profileController.getProfileDataForGuest)
// app.post('/api/updateProfileDataForUser', profileController.updateProfileDataForUser)

// app.get('/*', function(req, res){
//   let url = req.originalUrl
//   if(url.includes('%23')){
//     url = url.split('%23')[1]
//   }
//   let redirect = req.protocol + "://" + req.get("host") + "#" + url
//   let html ='<!DOCTYPE html><html><head><meta charset="utf-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge"><title>Page Title</title><meta name="viewport" content="width=device-width, initial-scale=1"></head><div>Redirecting...<script>window.location.href="'+redirect+'";</script></body></html>'
//   res.send(html)
// })

// app.listen(config.port, '0.0.0.0', function() {
//   console.log('Listening to port:  ' + config.port);
// });


const express = require('express'),
  bodyParser = require('body-parser'),
  socket = require('socket.io'),
  fs = require('fs'),
  https = require('https');


const app = express();

app.use(bodyParser.json());

// var options = {
//   key: fs.readFileSync('./file.pem'),
//   cert: fs.readFileSync('./file.crt')
// };
// const PORT = 8080;

var server = https.createServer(app);
var io = require('socket.io')(server);

// write socket stuff here
io.on('connection', function(socket){
  console.log('hit')
  socket.on("joinRoom", function(roomNumber){
    socket.join(roomNumber)
  })

  socket.on('disconnect', function(){
    console.log('user disconnected');
  })

  socket.on('call peer', function(data){
    console.log('hit')
    io.to(data.room).emit('call peer', data)
  })

  socket.on('answer peer', function(data){
    io.to(data.room).emit('answer peer', data)
  })
})

server.listen(config.port, '0.0.0.0', function() {
  console.log('server up and running at %s port', config.port);
});