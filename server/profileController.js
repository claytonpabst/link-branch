var app = require('./index.js');

module.exports = {

  getProfileDataForUser: function(req, res) {
    const db = req.app.get('db')
    db.getProfileDataForUser([req.session.id]).then(response => {
      const user = response[0]
      res.status(200).send({profileData:user.profile_data, profileViews: user.profile_views})
    }).catch(err => {
      console.log(err)
    })
  },
  
  getProfileDataForGuest: function(req, res) {
    const db = req.app.get('db')
    db.getProfileDataForGuest([req.query.user]).then(response => {
      const user = response[0]
      res.status(200).send({profileData:user.profile_data, profileViews: user.profile_views})
    }).catch(err => {
      console.log(err)
    })
  }
};