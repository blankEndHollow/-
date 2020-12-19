// pages/goods_list/list_i.js
import { request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {id:0,value:"综合",isActive:true}
     ,{id:1,value:"销量",isActive:false}
     ,{id:2,value:"价格",isActive:false}
    ]
   ,goods:[]
   ,total:0
   
  }
 
 ,QueryParams:{
    query:''
   ,cid:''
   ,pagenum:1
   ,pagesize:10
  },
  handleItemChange(n){

    let {index}= n.detail
       ,tabs= this.data.tabs.map((item,ind)=>{
        item.isActive=ind===index
        return item
       })
    this.setData({tabs})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages= getCurrentPages()
       ,options= pages[pages.length-1].options

    this.QueryParams.query= options.query || ""
    this.QueryParams.cid= options.cid || ""
    this.getGoods()
  }
 ,async getGoods(n){
    const ret= await request({
      url:'goods/search'
     ,data:this.QueryParams
    })
    let {goods,total}= ret.data.message
    if(n)goods.unshift(...this.data.goods)
    this.setData({goods,total})
 }
 ,onReachBottom(){
   let next= Math.ceil(this.data.total/10)
   if(this.QueryParams.pagenum>=next){
     wx.showToast({
       title: '已无数据'
      ,icon:'none'
      ,duration:500
     })
    return
   }
   this.QueryParams.pagenum++
   this.getGoods(true)
 }
 ,async onPullDownRefresh(){
   this.QueryParams.pagenum=1
   this.setData({
     goods:[]
   })
   await this.getGoods()
   wx.stopPullDownRefresh()
 }
})