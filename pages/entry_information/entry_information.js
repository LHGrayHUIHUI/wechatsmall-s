// pages/entry_information/entry_information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{name: '',
    number: '',
    unit: '',
    price: '',},
    id_code:"",//商品的id
    loadingType:false,
  },
  inputedit(e) {
    let dataset = e.currentTarget.dataset.obj;
    let value = e.detail.value;
    this.data['item'][dataset]=value
    console.log(this.data)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var str = options.str
    this.setData({
      id_code: str
    })
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  },
  btnsNew:function(){
    this.addNewGoods();
  },
  /**
   * 添加新的商品  
   */
  addNewGoods:function(){
    var than=this;
    than.data.loadingType=true
    var data={
      name:than.data.item.name,
      id_code:than.data.id_code,
      price:than.data.item.price,
      numb:than.data.item.number,
      spec:than.data.item.unit
  
    }
    shouHideLoading(true)
    wx.request({
             url: 'http://192.168.3.61:8001/api/goods/',
             data:  data,
             method: 'post',
             header: {'Content-Type': 'application/json'},
             success: function(res){
              than.data.loadingType=false
              than.showToast("创建成功") 
              than.shouHideLoading(false)
            },
            fail: function(){
              than.data.loadingType=false
              than.showToast("创建失败") 
              than.shouHideLoading(false)
            }
          })
  },
  shouHideLoading:function(isshow){
    if(isshow){
       wx.showLoading({
        title: "加载中",
      })
    }else{
      wx.hideLoading({})
    }
  },
  showToast:function(msg){
     wx.showToast({
      title: msg,
      duration:2000,//显示时长
      mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
      icon:'success', //图标，支持"success"、"loading" 
      success:function(){ },//接口调用成功
      fail: function () { },  //接口调用失败的回调函数  
      complete: function () { } //接口调用结束的回调函数   
    })
  },
})