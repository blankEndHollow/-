//index.js
//获取应用实例
import {request} from "../../request/index.js"

Page({
  data: {
    // 轮播图数组
    swipers:[]
   ,categorys:[]
   ,floors:[]
  }
 ,onLoad(){
   //或取轮播图数据
    this.getSwiperImg()
  //获取分类数据
    this.getCategoryImg()
  //获取楼层
  this.getFloors()
 }
 ,async getSwiperImg(){
   let result= await request({url:'/home/swiperdata'})
    .catch(()=>this.failNoti('无法获取轮播图'))
   let swipers= result.data.message || []
   this.setData({swipers})
  }
 ,getCategoryImg(){
   request({url:"/home/catitems"})
   .then(result=>{
     let categorys= result.data.message || []
     this.setData({categorys})
   }).catch(()=>this.failNoti('无法获取导航信息'))
  }
 ,failNoti(msg){
  wx.showToast({
    icon:"none"
   ,title:msg
  })
 }
 ,async getFloors(){
  let result= await request({url:"/home/floordata"})
  .catch(()=>this.failNoti('无法获取楼层数据'))
  let floors= result.data.message || []
  for(let i=0,lang=floors.length;i<lang;i++)floors[i].key=i
  this.setData({floors})
 }
 ,toList(n){
   let query= n.currentTarget.dataset.query.match(/=(.*)/)[1]
   wx.navigateTo({
     url: '/pages/goods_list/list_i?query='+query,
   })
 }
})
