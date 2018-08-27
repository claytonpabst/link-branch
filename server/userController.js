var app = require('./index.js');

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
    return
    if (req.session.loggedIn){
      return res.status(200).send(req.session.user);
    }else{
      return res.status(200).send({loggedIn: false})
    }
  },

  logOut: function(req, res){
    req.session.loggedIn = false;
    return res.status(200).send({message:'User Logged Out.'})
  },

  createUser: function(req, res) {
    const db = req.app.get('db')
    bcrypt.hash(req.body.password, 12, function(err, hash){
      let paidThrough = new Date().getTime()
      db.createUser([req.body.email, req.body.username, hash, paidThrough])
        .then( response => {
          req.session.loggedIn = true;
          response[0].loggedIn=true;
          response[0].success = true;
          response[0].message = 'Account created successfully.'
          req.session.user = response[0];
          // console.log(response[0]);
          return res.status(200).json( response[0] )
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
    })
  }
  
};
