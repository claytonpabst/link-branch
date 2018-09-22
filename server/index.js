const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const helmet = require('helmet');
const config = require('./config.js');
const multer = require('multer');
const path = require('path');

const {dualSession, dualSessionConnect, dualSessionClean} = require('./express-dual-session/index.js')

const app = module.exports = express();
const multerParser = multer({ storage: multer.memoryStorage() })

app.use(helmet())
app.use(bodyParser.json());

massive(config.connection).then( db => {      // Returns database. See Massive docs for connection options
  dualSessionConnect(db).then( message => {   // Pass db to connect function
    db.reload().then( refreshedDb => {        // Reload/refresh db after we add Dual Session
      app.set('db', refreshedDb)              // Adds db object to app object
      console.log(message)
      dualSessionClean({                      // *Optional* Function to handle deleting old sessions
        app: app,                             // Function needs access to app
        dbName: 'db',                         // Needs to be same name from app.set() function
        dbMaxAge: 1000 * 60 * 60 * 24 * 30,   // Sessions in db older than 30 days will be deleted
        memMaxAge: 1000 * 60 * 60,            // Sessions in memory older than 1 hour will be deleted, max of ~2 hours with these settings, depending on when a user creates a session and the clean function does it's thing.
        cleanInterval: 1000 * 60 * 60         // How often the clean function runs. Note: cleanInterval needs to be === or < memMaxAge for memory to clean as expected.
      })
    })
  }).catch( err => {
    console.log(err)                          //If Dual Session can't connect to db
  })
})

app.use(dualSession({                 // Once Dual Session is connected to db, use it by invoking with options
  dbName:'db',                        // Needs to be same name from app.set() function
  secret:config.secret,               // Secret key for cookie encryption. Put this in a .gitignore
  cookieName:"xs",                    // Choose a cookie name for the client
  maxAge: 1000 * 60 * 60 * 24 * 30    // How long until browser deletes session cookie. 
}))

app.use(express.static(__dirname + './../build'))

var userController = require("./userController.js");

app.get('/api/isLoggedIn', userController.isLoggedIn);
app.get('/api/signOut', userController.signOut);
app.post('/api/signIn', userController.signIn);
app.post('/api/signUp', userController.singUp);
app.post('/api/checkIfUsernameIsAvailable', userController.checkIfUsernameIsAvailable);

var assetController = require("./assetController.js");

app.post('/api/uploadAsset', multerParser.single('asset'), assetController.uploadAsset);
app.get('/api/getAssets', assetController.getAssets)
app.post('/api/deleteAsset', assetController.deleteAsset)

var profileController = require("./profileController.js");

app.get('/api/getProfileDataForUser', profileController.getProfileDataForUser)
app.get('/api/getProfileDataForGuest', profileController.getProfileDataForGuest)
app.post('/api/updateProfileDataForUser', profileController.updateProfileDataForUser)

app.listen(config.port, '0.0.0.0', function() {
  console.log('Listening to port:  ' + config.port);
});


