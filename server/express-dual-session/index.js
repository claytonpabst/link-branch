const uniqueIdGen = require('./uniqueIdGen.js');
const cryptoJs = require("crypto-js");
const cookie = require('cookie');

let cleanSessionsRunning = false
let cleanSessionsInterval

function cleanSessions(options){
  if(options.app.get('activeSessions')){
    // console.log(options.app.get('activeSessions'))
  }
  if(options.app.get(options.dbName).express_dual_session){
    // console.log(options.app.get(options.dbName).express_dual_session)

  }
}

function checkSqlTableExists(options, req, cb){
  let db = req.app.get(options.dbName)
  db.query("CREATE TABLE IF NOT EXISTS express_dual_session (session_id varchar(28) NOT NULL, session_data text, last_req bigint, PRIMARY KEY (session_id))")
  .then(table => {
    console.log(table)
    cb()
  })
}

function dualSession(options){

  // if(!cleanSessionsRunning){
  //   cleanSessionsInterval = setInterval(cleanSessions, 1000, options)
  //   cleanSessionsRunning = true
  // }
  
  return function session(req, res, next){

    checkSqlTableExists(options, req, function(){

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
            .catch(err => {
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
        }
      } else {
        console.log('3')
        createSessionForNewUser(req, res, options, activeSessions, function(){
          next()
          return
        })
      }
    })
  }
}

function createSessionForNewUser(req, res, options, activeSessions, cb){
  let sessionId = uniqueIdGen()
  activeSessions[sessionId] = {
    _id:sessionId,
    _lastReq: new Date().getTime(),
  }
  req.session = activeSessions[sessionId]
  console.log(req.app.get('activeSessions'))
  
  let db = req.app.get(options.dbName)
  console.log(db.express_dual_session)
  db.express_dual_session.insert({session_id: sessionId, session_data: JSON.stringify(activeSessions[sessionId]), last_req: new Date().getTime()})
  .then(session => {
    console.log('hit', session)
  
    sessionId = cryptoJs.AES.encrypt(sessionId, options.secret).toString()
    res.cookie(options.cookieName, sessionId, {
      httpOnly: true,
      maxAge: options.maxAge // 1 week
    })
  
    cb()
    return
  })
  .catch(err => {
    console.log(err)
    cb()
    return
  })
}

function getActiveSessions(req){
  let activeSessions = req.app.get('activeSessions')
  if(!activeSessions){
    req.app.set('activeSessions', {
      destroy: function (session, cb){
        destroySession(req, session._id, cb)
      } 
    })
    activeSessions = req.app.get('activeSessions')
  }
  if(!activeSessions.destroy){
    req.app.get('activeSessions').destroy = function(session, cb) {
      destroySession(req, session._id, cb)
    }
  }
  return activeSessions
}

function destroySession(req, sessionId, cb) {
  let db = req.app.get('db')
  let activeSessions = req.app.get('activeSessions')
  console.log('questionable', activeSessions)
  delete activeSessions[sessionId]
  db.express_dual_session.destroy({session_id: sessionId})
  .then(response => {
    cb('Success')
    return
  })
  .catch(err => {
    console.log(err)
    cb(err)
    return
  })
}

module.exports = dualSession