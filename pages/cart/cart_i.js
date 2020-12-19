// pages/cart/cart_i.js
import {syn} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart:[]
   ,allCheck:false
   ,total:0
   ,allPrice:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow(){
    const cart= wx.getStorageSync('cart') || []
         ,allCheck= JSON.stringify(cart)!=="[]"? cart.every(item=>item.checked) : false 
    const [total,allPrice]= this.compute(cart)
    this.setData({cart,allCheck,total,allPrice})
  },
  compute(rest){
    return rest.reduce((pre,cur)=>{
      if(cur.checked){
        pre[0]+=cur.num
        pre[1]+= cur.goods_price * cur.num
      }
      return pre
    },[0,0])
  }
  ,allChecked(e){
    const allCheck= JSON.stringify(e.detail.value)!=="[]"
         ,cart= this.data.cart.map(item=>{
           item.checked= allCheck
            return item
         })
    this.reset({cart})
   }
   ,goodsChecked(n){
     const {index}= n.currentTarget.dataset
          ,cart= this.data.cart
     cart[index].checked= !cart[index].checked
     const allCheck= cart.every(item=>item.checked)
     this.reset({allCheck,cart})
  }
  ,reset(n){
    const [total,allPrice]= this.compute(n.cart)
    wx.setStorageSync('cart', n.cart)
    this.setData({...n,total,allPrice})
  }
  ,operat(n){
    let {operat,index}= n.currentTarget.dataset
         ,{cart}= this.data
    //判断是加还是减
    if(operat==='-'){
      if(cart[index].num>1)
        cart[index].num--
      else 
        wx.showModal({
          confirmColor: 'red',
          title:"提示!",
          content:"将会删除"
        ,success:(n)=>{
          if(n.confirm){
            cart= cart.filter((item,ind)=>ind!==index)
            let allCheck= JSON.stringify(cart)!=="[]"
            this.reset({cart,allCheck})
          }
        }
        })
        
    } else{
      cart[index].num++ 
    }
    this.reset({cart})
  }
  ,handleplay(){
    const cart= wx.getStorageSync('cart') || []
         ,check= cart.reduce((pre,cur,ind)=>{
           if(cur.checked)pre.push(ind)
           return pre
         },[])
    
    if(check.length===0)return wx.showToast({title: '选择商品',icon:"none"})

    wx.navigateTo({
      url: '../pay/pay_i?goods='+check.join('-'),
    })
    
  }
})