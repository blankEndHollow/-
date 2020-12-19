const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const syn= (fn,options)=>{
  return new Promise((resolve,reject)=>{
    options= options || {}
    options.success= (options.success && options.success.bind(null,resolve)) || function(result){resolve(result)} 
    options.fail= (options.fail && options.fail.bind(null,reject)) || function(err){reject(err)} 
    fn({...options})
  })
}

module.exports = {
  formatTime: formatTime
 ,syn
}
