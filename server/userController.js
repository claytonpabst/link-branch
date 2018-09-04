var app = require('./index.js');
const {dualSessionDestroy, dualSessionUpdate} = require('./express-dual-session/index.js');

const bcrypt = require('bcrypt');

function hash(password){
  bcrypt.hash(password, 12, function(err, hash) {
    return hash
  });
}

module.exports = {

  logIn: function(req, res){
    const db = req.app.get('db');
    db.logIn([req.body.email])
    .then( response => {
      bcrypt.compare(req.body.password, response[0].password, function(err, hash) {
        if(hash){
          req.session.loggedIn = true;
          response[0].loggedIn = true;
          response[0].message = 'Login Successful.'
          req.session.user = response[0];
        } else {
          req.session.loggedIn = false
          return res.status(200).send({
            loggedIn: false,
            username: '',
            message: 'Invalid email or password.'
          })
        }
        return res.status(200).json( response[0] )
      })
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
  },

  isLoggedIn: function(req, res){
    if (req.session){
      if(req.session.loggedIn){
        return res.status(200).send({loggedIn: true})
      } else {
        dualSessionUpdate(req, 'db', {loggedIn: true, userName: 'Clayton Pabst'}, function(message){
          console.log(message, req.session)
          return res.status(200).send({loggedIn: false})
        })
      }
    } else {
      return res.status(200).send("Try Signing In.");
    }
  },

  logOut: function(req, res){
    if(req.session){
      dualSessionDestroy(req, 'db', function(message){
        return res.status(200).send({loggedIn:false})
      })
    } else {
      return res.status(200).send({loggedIn:false})
    }
  },

  singUp: function(req, res) {
    const db = req.app.get('db')
    bcrypt.hash(req.body.password, 12, function(err, hash){
      db.createUser([req.body.email, req.body.username, hash]).then( response => {
        console.log(response)
        res.status(200).send({message:"User Created"})
      }).catch(err => {
        console.log(err);
        res.status(500).send(err);
      })
    })
  }
  
};
