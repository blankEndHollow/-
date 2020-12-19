// components/Upimg/upimg.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    path:{
      value:""
     ,type:String
    }
    ,index:{
      value:-1
     ,type:Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    delete(){
      this.triggerEvent("delimg",this.data.index)
    }
  }
})
