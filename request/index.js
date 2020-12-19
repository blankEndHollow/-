const baseUrl= "https://api-hmugo-web.itheima.net/api/public/v1"
let ajaxItem=0


export const request=(options)=>{
  options= options || {}
  let header= options.header || {}
  if(/\/?my\/\w+/.test(options.url)) header['Authorization']= wx.getStorageSync('token')
  
  if(options.url && !options.url.includes('https'))options.url= baseUrl + (options.url.charAt(0)=== '/' ? '' :'/')+options.url 
  ajaxItem++
  wx.showLoading({
    title: '加载中',
    mask:true
  })
  return new Promise((resolve,reject)=>{
    wx.request({
     ...options
    ,header
     ,success(n){
       resolve(n)
     }
     ,fail(n){
       reject(n)
     }
     ,complete(){
      ajaxItem-- 
      ajaxItem===0 && wx.hideLoading()
     }
    })

  })
}