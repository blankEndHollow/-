// pages/auth/auto_i.js
import {syn} from "../../utils/util.js"
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
      disable:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

 async getUserInfo(n){
   this.setData({disable:true})
   const {encryptedData,rawData,iv,signature}= n.detail
   let {code}= await syn(wx.login,{timeout:10000}).catch(err=>{})
   let logind= await request({
     url:"/users/wxlogin"
    ,data:{encryptedData,rawData,iv,signature,code}
    ,method:"post"
  }) 
  
  const token= "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo" 
  wx.setStorageSync('token', token) 
  wx.showToast({
    title: '已授权'
   ,icon:"success"
   ,mask:true
   ,success:()=>{

     setTimeout(()=>{
       console.log(200)
       wx.navigateBack({
         delta: 1,
       })
        this.setData({disable:false})
     },1000)
   }
  })
}
})