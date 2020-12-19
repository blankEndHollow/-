// pages/login/login_i.js
import {syn} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    opac:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //如果用户已经登录直接跳转
    if(wx.getStorageSync('userinfo')){
      syn(wx.showToast,{title:"您已登录",icon:"none"}).catch(err=>{})
      setTimeout(()=>{
        wx.navigateBack({
          delta: 1,
        })
      },1000)
      return
    } 
    this.setData({opac:true})
  },
  async login(n){
    const userinfo= n.detail.userInfo
    const result= await syn(wx.showModal,{
      cancelColor: "tomato",
      title:"登录提示"
     ,content:"确认登录"
    }).catch(item=>{})
    //确认登录后跳转
    if(result.confirm){
      await syn(wx.showToast,{title:"登录成功"})
      wx.setStorageSync('userinfo', userinfo)
      setTimeout(wx.navigateBack.bind(null,{
        delta: 1,
      }),1000)
      
    }
  }
})