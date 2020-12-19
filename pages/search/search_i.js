// pages/search/search_i.js
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[]
   ,tiemr:-1
   ,isFoc:true
   ,inputVal:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  }

 ,handleInput(n){
    const {value}= n.detail
    if(!value.trim())return this.setData({goods:[],isFoc:true})
    //防抖
    clearTimeout(this.data.tiemr)
    this.setData({
       isFoc:false
      ,tiemr:setTimeout(()=>{
        this.query(value)
      },900)
    })
 }
 ,async query(value){
  let result= await request({
    url:'/goods/qsearch'
   ,data:{
     query:value
   }
  })
  ,goods= result.data.message
  this.setData({goods})
 }
 ,clearn(){
   this.setData({goods:[],inputVal:""})
 } 
})