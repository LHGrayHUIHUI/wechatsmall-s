// pages/operating/operating.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
        id: 1,
        name: '添加货物'
      },
      {
        id: 2,
        name: '出库'
      },
      {
        id: 3,
        name: '入库'
      },
      {
        id: 4,
        name: '出库记录'
      },
      {
        id: 5,
        name: '入库记录'
      },
      
    ]
  },
  jumpsPage: function (e) {
    var than=this
    let item = e.currentTarget.dataset.obj;
    console.log(item)
    let type = item.id
    switch (type) {
      case 1: //添加货物
        wx.navigateTo({
          url: '../entry_information/entry_information',
        })
        break
      case 2: //出库
        // 允许从相机和相册扫码
        wx.scanCode({
          success(res) {
            console.log(res)
            than. outStock(res.result)
          }
        })
        break
      case 3: //入库
    
        wx.scanCode({
          success(res) {
            console.log(res)
            than. inStock(res.result)
          }
        })
        break
      case 4: //出库记录
      wx.navigateTo({
        url: '../outstock/outstock',
      })
        break
      case 5: //入库记录
      wx.navigateTo({
        url: '../instock/instock',
      })
        break
      case 6: //库存
        break

    }
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
   * 请求接口加载数据
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
   /**
   * 商品出库接口
   * @param {条形码} res 
   */
  outStock:function(res){
    var than=this
    than.shouHideLoading(true)
    wx.request({
      url:'http://192.168.3.61:8001/api/inandout/out_warehouse/',
      data:{bar_code:res},
      method: 'post',
      header: {'Content-Type': 'application/json'},
      success: function(resnew){
        than.shouHideLoading(false)
        than.showToast('出库成功')
      },

      fail: function(){
        than.shouHideLoading(false)
        than.showToast('出库失败')
      }
    });
  },
   /**
   * 入库方法
   * @param {入库条形码} res 
   */
  inStock:function(res){
    var than=this
    than.shouHideLoading(true)
    wx.request({
      url:'http://192.168.3.61:8001/api/inandout/in_warehouse/',
      data:{bar_code:res},
      method: 'post',
      header: {'Content-Type': 'application/json'},
      success: function(resnew){
        than.shouHideLoading(false)
        than.showToast('入库成功')
      },
      fail: function(){
        than.shouHideLoading(false)
        than.showToast('入库失败')
      }
    
    });
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