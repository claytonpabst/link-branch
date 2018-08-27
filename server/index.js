const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const session = require('express-session');
const config = require('./config.js');
// const redis = require('redis');
// const redisStore = require('connect-redis')(session);
// const client = redis.createClient()
const dualSession = require('./express-dual-session/index.js')

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

massive(config.connection)
.then( db => {
  app.set('db', db);
})

app.use(dualSession({
  dbName:'db',
  secret:"someSecretKey",
  cookieName:"xs",
}))

app.use(function(req, res, next){
  console.log('second function')
  next()
})

app.use(express.static(__dirname + './../build'))

var userController = require("./userController.js");

app.get('/api/isLoggedIn', userController.isLoggedIn);
app.get('/api/logOut', userController.logOut);
app.post('/api/logIn', userController.logIn);
app.post('/api/createUser', userController.createUser);







// app.listen(config.port, console.log("you are now connected on " + config.port));

app.listen(config.port, '0.0.0.0', function() {
  console.log('Listening to port:  ' + config.port);
});