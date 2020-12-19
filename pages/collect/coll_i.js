// pages/collect/coll_i.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:"0"
       ,value:"店铺"
       ,isActive:true
      }
      ,
      {
        id:"1"
       ,value:"商品"
       ,isActive:false
      }
      ,
      {
        id:"2"
       ,value:"足迹"
       ,isActive:false
      }
      ,{
        id:"3"
       ,value:"收藏"
       ,isActive:false
      }
    ]
    ,collects:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //选中用户点中的
    const pages= getCurrentPages()
         ,current= pages[pages.length-1]
         ,{type}= current.options
    this.changeItem(type)
    const collects= wx.getStorageSync('collect')||[]
    this.setData({collects})
  },

  changeItem(n){
    const index= typeof n ==="object" ? n.detail.index : +n
         ,tabs= this.data.tabs.map((item,ind)=>{
           item.isActive= ind === index
           return item
         })
    this.setData({tabs})
  }
})