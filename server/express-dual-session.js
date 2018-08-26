const uniqueIdGen = require('./uniqueIdGen.js')

function dualSession(req, res, next){
  console.log(uniqueIdGen())
  
}

export default dualSession