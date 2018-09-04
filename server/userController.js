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
      if(req.session.authenticated){
        return res.status(200).send({authenticated: true})
      } else {
        return res.status(200).send({message:"Try Signing In.", authenticated:false});
      }
    } else {
      return res.status(200).send({message:"Try Signing In.", authenticated:false});
    }
  },

  logOut: function(req, res){
    if(req.session){
      dualSessionDestroy(req, 'db', function(message){
        return res.status(200).send({authenticated:false})
      })
    } else {
      return res.status(200).send({authenticated:false})
    }
  },

  singUp: function(req, res) {
    const db = req.app.get('db')
    let profileData = JSON.stringify({})
    bcrypt.hash(req.body.password, 12, function(err, hash){
      db.signUp([req.body.email, req.body.username, hash, profileData, 0]).then( response => {
        const user = response[0]
        dualSessionUpdate(req, 'db', {
          id:user.id, 
          authenticated:true,
          username:user.username
        }, message => {
          res.status(200).send({message:"User Created", username:user.username, authenticated:true})
        })
      }).catch(err => {
        console.log(err);
        res.status(500).send(err);
      })
    })
  }
  
};
