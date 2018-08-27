const uniqueIdGen = require('./uniqueIdGen.js');
const cryptoJs = require("crypto-js");
const cookie = require('cookie');

function dualSession(options){
  return function session(req, res, next){
    
    let activeSessions = req.app.get('activeSessions')
    if(!activeSessions){
      req.app.set('activeSessions', {})
    }

    let cookies = cookie.parse(req.headers.cookie)

    if(cookies[options.cookieName]){
      let sessionId = cryptoJs.AES.decrypt(cookies[options.cookieName], options.secret).toString(cryptoJs.enc.Utf8)
      if(activeSessions[sessionId]){
        req.session = qctiveSessions[sassionId]
      }
    }

    let sessionId = uniqueIdGen()
    console.log(sessionId)

    sessionId = cryptoJs.AES.encrypt(sessionId, options.secret).toString()
    console.log(sessionId)
    console.log(sessionId)

    // console.log(req.app.get(options.dbName))




    setTimeout(function(){

      next()
    },3000)
  }
}

module.exports = dualSession