// pages/pay/pay_i.js
import {syn} from "../../utils/util.js"
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:null
   ,cart:[]
   ,total:0
   ,price:0
   ,had:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options){},
  onShow() {
    //获取用户地址，保存在实例中
    let address= wx.getStorageSync('address') 
       ,[total,price]=[0,0]
    address && (address.all= address.provinceName+address.cityName+address.countyName+address.detailInfo)
    //获取购物车的商品
    let cart= wx.getStorageSync('cart') || null
    cart= cart && cart.filter(item=>item.checked)
    //计算总数和平均值
    if(cart!==null && cart!==""){
       [total,price]=  cart.reduce((pre,cur)=>{
        pre[0]+= cur.num
        pre[1]+= cur.num * cur.goods_price
        return pre
     },[0,0])
    }
    this.setData({address,cart,total,price})
  },

  changeAdd(){
    //调用获取地址的函数
    this.getAddr()
  }
  ,async getAddr(){
    //获取地址权限，如没有则打开权限列表
    try{
      let auth=await syn(wx.getSetting)|| false
      auth && await syn(wx.chooseAddress,{success:(resolve,address)=>{
        this.setAddress(address)
      }})
     auth || await syn(wx.openSetting,{success:(n)=>{
        syn(wx.chooseAddress,{success:(ret,res)=>{
          this.setAddress(res)
        }})
     }})
    }catch(err){
      // console.log(err)
    }

    
  }
  ,setAddress(address){
    this.setData({address})
       wx.setStorageSync('address', address)
  }
  ,async orderPlay(){
    try{
      //判断缓存中又没有token
    const token= wx.getStorageSync('token')
    if(!token)return wx.navigateTo({
      url: '../auth/auto_i',
    })
    //支付请求头
    const header= {Authorization:token}
         ,body= {
           order_price:this.data.price
          ,consignee_addr:this.data.address&& this.data.address.all
          ,goods:this.data.cart && this.data.cart.reduce((pre,cur)=>{
            pre.push({
              goods_id:cur.goods_id
             ,goods_number:cur.num
             ,goods_price:cur.goods_price
            })
            return pre
          },[])
          }
    // 发送创建订单请求
    const {data:{message:{order_number}}}= await request({url:"my/orders/create",method:"POST",data:body,header}).catch(()=>{})
    //发起预支付接口
    const {data:{message:{pay}}}= await request({url:"/my/orders/req_unifiedorder",method:"POST",header,data:{order_number}})
    //发起支付
    await syn(wx.requestPayment,{...pay})
    syn(wx.showToast,{title:"支付成功",mask:true,icon:"none"})
    //清除已支付的商品
    let cart= wx.getStorageSync('cart')
    cart= cart.filter(item=>!item.checked)
    this.setData({cart}) 
    wx.setStorageSync('cart', cart)
    
  }catch(e){
    syn(wx.showToast,{title:"暂未开通",mask:true,icon:"none"})
  }
  }
})