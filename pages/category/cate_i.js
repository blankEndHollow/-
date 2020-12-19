// pages/category/cate_i.js
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //菜单数据
    leftMenus:[]
    //商品数据
   ,rightContent:[]
   //选中的菜单
   ,currentIndex:0
   //返回顶部的位置
   ,scrollTo:-1
  },
  //保存接口数据
  Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取本地存储
    const Cates= wx.getStorageSync('cates')
    Cates || this.getCates()
    Cates && (this.Cates=Cates.data) &&  this.pick()
    Cates && Date.now()- Cates.time>1000*60 *5 && !!(this.Cates=[]) && this.getCates()
  }
 ,async getCates(){
   if(this.Cates.length){
    this.setData({
      rightContent:this.Cates[this.data.currentIndex].children
    }) 
    return
   }
   let result= await request({url:"categories"})
   .catch(()=>{})
   this.Cates= result.data.message
   wx.setStorageSync('cates',{time:Date.now(),data:this.Cates})
   this.pick()

    return 1
 }
 ,toggle(n){
   let {currentTarget:{dataset:{index}}}= n

   this.setData({currentIndex:index,scrollTo:0})
   this.getCates()
   
 }
 ,pick(){
  let leftMenus= this.Cates.map(item=>item.cat_name)
     ,rightContent= this.Cates[this.data.currentIndex].children
  this.setData({leftMenus,rightContent})
 }
})