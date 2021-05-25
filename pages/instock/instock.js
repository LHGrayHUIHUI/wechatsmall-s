// pages/instock/instock.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   this. getinstockList()
  },
  getinstockList:function(){
    var that=this
    var data={
      goods__name:'',
      goods__id_code:'',
      operation:2,
    }
    wx.request({
      url:'http://192.168.3.61:8001/api/inandout/',
      data:data,
      method: 'get',
             header: {'Content-Type': 'application/json'},
             success: function(res){
              var items=[];
              console.log(  res.data.results)
              res.data.results.forEach(itme => {
              var newTtem={
                editnumber:itme.goods.name,
                time:itme.update_time,
                number:itme.goods.numb,
                unit:itme.goods.spec,
                type:itme.goods.state_text,
                price:itme.goods.price
              };   
              items.push(newTtem)
              });
              that.setData({items});
            },
            fail: function(){
              console.log("123")
            }
          })

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

  }
})