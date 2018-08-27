const uniqueIdGen = require('./uniqueIdGen.js')

function dualSession(options){
  return function session(req, res, next){
    console.log(uniqueIdGen())
    console.log(options)
    setTimeout(function(){
      next()
    },3000)
  }
}

module.exports = dualSession