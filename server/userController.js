var app = require('./index.js');
const {dualSessionDestroy, dualSessionUpdate} = require('./express-dual-session/index.js');

const bcrypt = require('bcrypt');

function hash(password){
  bcrypt.hash(password, 12, function(err, hash) {
    return hash
  });
}

module.exports = {

  signIn: function(req, res){
    const db = req.app.get('db');
    db.signIn([req.body.email]).then( response => {
      bcrypt.compare(req.body.password, response[0].password, function(err, hash) {
        if(hash){
          const user = response[0]
          dualSessionUpdate(req, 'db', {
            id:user.id, 
            authenticated:true,
            username:user.username
          }, message => {
            console.log(req.session)
            return res.status(200).send({message:"Sign in success!", username:user.username, authenticated:true})
          })
        } else {
          return res.status(200).send({message:"Invalid username or password", username:'', authenticated:false})
        }
      })
    }).catch(err => {
      console.log(err)
      return res.status(200).send({message:"Invalid username or password", username:'', authenticated:false})
    })
  },

  isLoggedIn: function(req, res){
    if (req.session){
      console.log(req.session)
      if(req.session.authenticated){
        return res.status(200).send({authenticated: true, username:req.session.username})
      } else {
        return res.status(200).send({message:"Try Signing In.", authenticated:false});
      }
    } else {
      return res.status(200).send({message:"Try Signing In.", authenticated:false});
    }
  },

  signOut: function(req, res){
    if(req.session){
      dualSessionDestroy(req, 'db', function(message){
        console.log(req.session)
        return res.status(200).send({message:'User signed out.', authenticated:false, username:''})
      })
    } else {
      return res.status(200).send({authenticated:false, username:''})
    }
  },

  singUp: function(req, res) {
    const db = req.app.get('db')
    let profileData = JSON.stringify({
      generalInfoStyle:{
        background:"#fff",
      },
      style:{
        background:"#fff",
      },
      img:{
        src:'https://image.freepik.com/free-icon/profile-user-silhouette_318-40557.jpg',
        style:{},
      },
      name:{
        text:req.body.username,
        style:{
          fontSize:"30px",
          fontWeight:"bolder",
          lineHeight:"50px",
          fontFamily:'"Comic Sans MS", cursive, sans-serif',
          color:"black",
        },
      },
      profileViews:{
        views:1,
        style:{},
      },
      sections:[]
    })
    bcrypt.hash(req.body.password, 12, function(err, hash){
      db.signUp([req.body.email, req.body.username, hash, profileData, 0]).then( response => {
        const user = response[0]
        dualSessionUpdate(req, 'db', {
          id:user.id, 
          authenticated:true,
          username:user.username
        }, message => {
          console.log(req.session)
          res.status(200).send({message:"User created.", username:user.username, authenticated:true})
        })
      }).catch(err => {
        console.log(err);
        res.status(500).send(err);
      })
    })
  },

  checkIfUsernameIsAvailable: function(req, res){
    const db = req.app.get('db')
    db.checkIfUsernameIsAvailable([req.body.username]).then( response => {
      if(response.length){
        res.status(200).send({usernameAvailable:false})
      } else {
        res.status(200).send({usernameAvailable:true})
      }
    }).catch( err => {
      res.status(500).send({usernameAvailable:false})
    })
  }
};
