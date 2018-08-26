const idGenCharSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!*-_'.split('')
let lastMs = new Date().getTime()
let lastIds = []

function generateUniqueId() {
  let newId = []
  let date = new Date().getTime()
  let dateArr = JSON.stringify(date).split('')
  dateArr = firstOfEachNumToElse(dateArr)
  for (let i=0; i<dateArr.length; i++){
    newId.push(idGenCharSet[Math.floor((Math.random() * idGenCharSet.length) + 0)])
    newId.push(dateArr[i])
  }
  if (date !== lastMs){
    lastMs = date
    lastIds = []
    return newId.join('')
  } else {
    if(idIsUnique(newId.join(''))){
      lastMs = date
      lastIds.push(newId.join(''))
      return newId.join('')
    } else {
      lastMs = date
      return generateUniqueId()
    }
  }
}

function firstOfEachNumToElse(numsArr){
  numsArr = numsArr.join('')
  numsArr = numsArr.replace('1', '_').replace('0', 'v').replace('2', 'u').replace('3', 'p').replace('4', 'q').replace('5', 'a').replace('6', 'n').replace('7', 'x').replace('8', 'z').replace('9', 'w')
  numsArr = numsArr.split('')
  return numsArr
}

function idIsUnique(id){
  for(let i=0; i<lastIds.length; i++){
    if(id === lastIds[i]){
      return false
    }
  }
  return true
}

export default generateUniqueId