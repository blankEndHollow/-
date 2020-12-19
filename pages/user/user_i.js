// pages/user/user_i.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },
  onShow(){
    const userInfo= wx.getStorageSync('userinfo')
         ,colls= (wx.getStorageSync('collect')||[]).length
        ,record= (wx.getStorageSync('record')||[]).length
    this.setData({
      colls
     ,record
     ,userInfo
    })
  },
  tologin(){
    wx.navigateTo({
      url: '/pages/login/login_i',
    })
  }
})