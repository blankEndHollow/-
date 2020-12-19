// pages/feedback/feed_i.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {id:0,value:"体验问题",isActive:true}
     ,{id:1,value:"商品 、商家投诉",isActive:false}
    ]
   ,FilePaths:[]
   ,textValue:""
   
  },
  timeID:-1
  /**
   * 生命周期函数--监听页面加载
   */
 ,onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  changeItem(n){
    let index= n.detail.index
       ,tabs= this.data.tabs.map((item,ind)=>{
         item.isActive= ind === index
         return item
       })
    this.setData({tabs})
  }
  ,chooseImg(){
    wx.chooseImage({
      //最大可选数
      count: 9,
      //图片尺寸：原图 压缩
      sizeType:['original',"compressed"]
      //图片来源：相册 相机
     ,sourceType:["album","camera"]
     ,success:(n)=>{
       let FilePaths= [...(n.tempFilePaths||[])]
       this.setData({FilePaths})
     }
    })
  }
  //移除图片
  ,remove(n){
    const index= n.detail
         ,FilePaths= this.data.FilePaths
    FilePaths.splice(index,1)
    this.setData({FilePaths})
  }
  //保存输入的内容
  ,pressInput(n){
    let textValue= n.detail.value
    clearTimeout(this.timeID)
    this.timeID= setTimeout(()=>{
      this.setData({textValue})
    },300)
  }
  ,FormSubmit(){
      if(new String(this.data.textValue.trim()).length<=5)return wx.showToast({
        title: '不得低于5个字！',
        icon:"none"
       ,mask:true
       ,duration:800
      })

      //上传的api
      // wx.uploadFile({
      //上传文件的路径
      //   filePath: 'filePath',
      //上传文件的命名
      //   name: 'name',
      //上传的哪里
      //   url: 'url',
      //附带的额外信息
      //   formData:{}
      // })
    
      wx.showToast({
        title: '未开通',
        icon:"none"
      })

  }
})