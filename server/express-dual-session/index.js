const uniqueIdGen = require('./uniqueIdGen.js');
const cryptoJs = require("crypto-js");
const cookie = require('cookie');

function dualSession(options){
  return function session(req, res, next){

    let activeSessions = getActiveSessions(req)

    let cookies = cookie.parse(req.headers.cookie)

    if(cookies[options.cookieName]){
      let sessionId = cryptoJs.AES.decrypt(cookies[options.cookieName], options.secret).toString(cryptoJs.enc.Utf8)
      if(activeSessions[sessionId]){
        console.log('1')
        req.session = activeSessions[sessionId]
        console.log(req.app.get('activeSessions'))
        next()
        return
      } else {
        console.log('2')
        const db = req.app.get('db')
        db.query("CREATE TABLE IF NOT EXISTS express_dual_session (session_id varchar(28) NOT NULL, session_data text, PRIMARY KEY (session_id))")
        .then(table => {
          console.log(table)
          db.express_dual_session.findOne({session_id : sessionId})
          .then(session => {
            console.log(session)
            next()
            return
          })
        })
      }
    } else {
      console.log('3')
      createSessionForNewUser(req, res, options, activeSessions, function(){
        next()
        return
      })
    }
    
  }
}

function createSessionForNewUser(req, res, options, activeSessions, cb){
  let sessionId = uniqueIdGen()
  activeSessions[sessionId] = {
    _id:sessionId
  }
  req.session = activeSessions[sessionId]
  console.log(req.app.get('activeSessions'))
  
  
  const db = req.app.get('db')
  db.query("CREATE TABLE IF NOT EXISTS express_dual_session (session_id varchar(28) NOT NULL, session_data text, PRIMARY KEY (session_id))")
  .then(table => {
    db.express_dual_session.insert({session_id: sessionId, session_data: JSON.stringify(activeSessions[sessionId])})
    .then(session => {
      console.log('hit', session)
    
      sessionId = cryptoJs.AES.encrypt(sessionId, options.secret).toString()
      res.cookie(options.cookieName, sessionId, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7 // 1 week
      })
    
      cb()
      
    })
  })
}

function getActiveSessions(req){
  let activeSessions = req.app.get('activeSessions')
  if(!activeSessions){
    req.app.set('activeSessions', {})
    activeSessions = req.app.get('activeSessions')
  }
  return activeSessions
}

module.exports = dualSession