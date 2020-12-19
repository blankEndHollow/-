// pages/goods_detail/detail_i.js
import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //获取的详情列表
    details:{}
   ,isCol:false
  },
  goodsStore:null,
  /**
   * 生命周期函数--监听页面加载
   */
 async onShow(){
    const pages= getCurrentPages()
        ,current= pages[pages.length-1]
        ,{goods_id}= current.options
    await this.getGoodsDetail(goods_id)

   const  record= wx.getStorageSync('record')||[]
         ,isRec= record.some(item=>item.goods_id===this.goodsStore.goods_id)
  if(!isRec){
    record.push(this.goodsStore)
    wx.setStorageSync('record', record)
  }
  console.log(isRec)
  },
  async getGoodsDetail(goods_id){
    const ret= await request({
      url:'/goods/detail'
     ,data:{goods_id}
    })
    this.goodsStore= ret.data.message
    let {
      goods_name
     ,goods_price
     ,pics
     ,goods_introduce
    }=ret.data.message
    goods_introduce= goods_introduce.replace(/\.webp/g,'.jpg')
    
    let collect= wx.getStorageSync('collect')||[]
    ,isCol= collect.some(item=>item.goods_id===this.goodsStore.goods_id)

     this.setData({details:{
      goods_name
     ,goods_price
     ,pics
     ,goods_introduce
     ,goods_id  
    }
    ,isCol
  })
  }
  ,handlePreveImage(e){
    const urls= this.goodsStore.pics.map(itme=>itme.pics_mid)
    const {index}= e.currentTarget.dataset
    console.log(index)
    wx.previewImage({
      urls
     ,current:urls[index]
    })
  }
  ,handleCartAdd(){
    let cart= wx.getStorageSync('cart') || []
       ,index= cart.findIndex(item=>item.goods_id===this.goodsStore.goods_id)
    
    if(index===-1){
      this.goodsStore.num= 1
      this.goodsStore.checked= true
      cart.push(this.goodsStore)
    }
    else{
      cart[index].num++
    } 
     
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '加入成功'
     ,mask:true
    })

  }
  ,favorite(){
    //点击获取全部收藏的商品并并根据id是否存在决定添加或移除
    const collects= wx.getStorageSync('collect')|| []
         ,index=collects.findIndex(item=>item.goods_id===this.goodsStore.goods_id)
         ,[icon,title]= index===-1?['success','已收藏']:['none','取消收藏']
    if(index===-1)
      collects.push(this.goodsStore)
    else
      collects.splice(index,1)
    //保存数据
    wx.setStorageSync('collect', collects)
    this.setData({isCol:index===-1})
    //提示
    wx.showToast({
      title
     ,icon
     ,mask:true
     ,duration:800
    })
  }
})