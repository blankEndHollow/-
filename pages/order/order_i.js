// pages/order/order_i.js
import { request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'全部'
       ,isActive:true
      }
     ,{
      id:1,
      value:'待付款'
     ,isActive:false
    }
    ,{
      id:2,
      value:'代收货'
     ,isActive:false
    }
    ,{
      id:3,
      value:'退款/退货'
     ,isActive:false
    }
    ]
  ,orders:[]

  },
  onLoad(){
    if(!wx.getStorageSync('token'))wx.navigateTo({
      url: '/pages/auth/auto_i',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    //获取跳转后保存的页面
    const pages= getCurrentPages()
         ,currentPage= pages[pages.length-1]
         ,type= currentPage.options.type
    
    this.setTabs(type-1)
    this.getOrders(type)
  },
  handleItem(n){
    const {index}= n.detail
    this.setTabs(index)
    this.getOrders(index+1)
  }
  ,async getOrders(type){
    type= +type
    const ret= await request({url:"/my/orders/all",data:{type}})
    const {orders}=ret.data.message
    this.setData({
      orders
    })
  }
  ,setTabs(index){
    const tabs= this.data.tabs.map((item,ind)=>{
      item.isActive= ind=== index
      return item
    })
    this.setData({tabs})
  }
})