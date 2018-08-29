const uniqueIdGen = require('./uniqueIdGen.js');
const cryptoJs = require("crypto-js");
const cookie = require('cookie');

function dualSession(options){
  return function session(req, res, next){

    let activeSessions = getActiveSessions(req)
    let cookies
    if(req.headers.cookie){
      cookies = cookie.parse(req.headers.cookie)
    } else {
      cookies = {}
    }

    if(cookies[options.cookieName]){
      let sessionId = cryptoJs.AES.decrypt(cookies[options.cookieName], options.secret).toString(cryptoJs.enc.Utf8)
      if(activeSessions[sessionId]){
        console.log('1')
        activeSessions[sessionId]._lastReq = new Date().getTime()
        req.session = activeSessions[sessionId]
        console.log(req.app.get('activeSessions'))
        res.cookie(options.cookieName, sessionId, {
          httpOnly: true,
          maxAge: options.maxAge// 1 week
        })

        next()
        return
      } else {
        console.log('2')
        let db = req.app.get(options.dbName)
        let express_dual_sessionExists = db.express_dual_session ? true : false
        db.query("CREATE TABLE IF NOT EXISTS express_dual_session (session_id varchar(28) NOT NULL, session_data text, last_req bigint, PRIMARY KEY (session_id))")
        .then(table => {
          db = express_dual_sessionExists ? db : req.app.get(options.dbName)
          console.log(table)
          db.express_dual_session.findOne({session_id : sessionId})
          .then(session => {
            console.log('this is the db sess', session)
            activeSessions[sessionId] = JSON.parse(session.session_data)
            activeSessions[sessionId]._lastReq = new Date().getTime()
            req.session = activeSessions[sessionId]
            db.express_dual_session.save({session_id:sessionId, session_data: JSON.stringify(activeSessions[sessionId]), last_req: new Date().getTime()})
            .then(session => {
              res.cookie(options.cookieName, sessionId, {
                httpOnly: true,
                maxAge: options.maxAge// 1 week
              })
              next()
              return
            })
          })
          .catch(err => {
            console.log('4')
            createSessionForNewUser(req, res, options, activeSessions, function(){
              next()
              return
            })
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
    _id:sessionId,
    _lastReq: new Date().getTime()
  }
  req.session = activeSessions[sessionId]
  console.log(req.app.get('activeSessions'))
  
  
  let db = req.app.get(options.dbName)
  let express_dual_sessionExists = db.express_dual_session ? true : false
  db.query("CREATE TABLE IF NOT EXISTS express_dual_session (session_id varchar(28) NOT NULL, session_data text, last_req bigint, PRIMARY KEY (session_id))")
  .then(table => {
    db = express_dual_sessionExists ? db : req.app.get(options.dbName)
    db.express_dual_session.insert({session_id: sessionId, session_data: JSON.stringify(activeSessions[sessionId]), last_req: new Date().getTime()})
    .then(session => {
      console.log('hit', session)
    
      sessionId = cryptoJs.AES.encrypt(sessionId, options.secret).toString()
      res.cookie(options.cookieName, sessionId, {
        httpOnly: true,
        maxAge: options.maxAge // 1 week
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