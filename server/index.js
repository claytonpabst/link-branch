const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const session = require('express-session');
const config = require('./config.js');
// const redis = require('redis');
// const redisStore = require('connect-redis')(session);
// const client = redis.createClient()
const {dualSession, dualSessionConnect, dualSessionClean} = require('./express-dual-session/index.js')

const app = module.exports = express();

app.use(bodyParser.json());
// app.use(session({
//   secret: config.secret,
//     resave: false,
//     store: new redisStore({ host: 'localhost', port: 6379, client: client}),
//     saveUninitialized: false,
//     cookie:{
//       maxAge: (1000*60*60*24*14) //this is 14 days
//     }
// }))

massive(config.connection).then( db => {      // Returns database. See Massive docs for connection options
  dualSessionConnect(db).then( message => {   // Pass db to connect function
    db.reload().then( refreshedDb => {        // Reload/refresh db since we added Dual Session
      app.set('db', refreshedDb)              // Adds db object to app object
      console.log(message)
      dualSessionClean({                      // *Optional* Function to handle deleting old sessions
        app: app,                             // Function needs access to app
        dbName: 'db',                         // Needs to be same name from app.set() function
        dbMaxAge: 1000 * 60 * 60 * 24 * 180,  // Sessions in db older than 180 days will be deleted
        memMaxAge: 1000 * 60 * 60,            // Sessions in memory older than 1 hour will be deleted
        cleanInterval: 1000 * 60 * 60         // How often the clean function runs
      })
    })
  }).catch( err => {
    console.log(err)                          //If Dual Session can't connect to db
  })
})

app.use(dualSession({                 // Once Dual Session is connected to db, use it by invoking with options
  dbName:'db',                        // Needs to be same name from app.set() function
  secret:"someSecretKey",             // Secret key for cookie encryption
  cookieName:"xs",                    // Choose a cookie name for the client
  maxAge: 1000 * 60 * 60 * 24 * 180   // How long until browser deletes session cookie. 
}))

app.use(function(req, res, next){
  console.log('I am a test middleware')
  next()
})

app.use(express.static(__dirname + './../build'))

var userController = require("./userController.js");

app.get('/api/isLoggedIn', userController.isLoggedIn);
app.get('/api/logOut', userController.logOut);
app.post('/api/logIn', userController.logIn);
app.post('/api/createUser', userController.createUser);

app.listen(config.port, '0.0.0.0', function() {
  console.log('Listening to port:  ' + config.port);
});


