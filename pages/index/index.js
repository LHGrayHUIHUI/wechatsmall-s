// index.js
// 获取应用实例
const app = getApp()
const WXAPI = require('../../miniprogram_npm/apifm-wxapi/index')
//WXAPI.init('lipeng')

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    items: [
      {editnumber: 'USA', time: '2021-12-24 12:25:15',number:'15',unit:'个',type:'已入库',price:'100'},
      {editnumber: 'CHN', time: '2021-12-24 12:30:15',number:'15',unit:'个',type:'已入库',price:'100', checked: 'true'},
      {editnumber: 'BRA', time: '2021-12-24 12:40:15',number:'15',unit:'个',type:'已入库',price:'100'},
      {editnumber: 'JPN', time: '2021-12-25 12:25:15',number:'15',unit:'个',type:'已入库',price:'100'},
      {editnumber: 'ENG', time: '2021-12-24 14:45:15',number:'15',unit:'个',type:'已入库',price:'100'},
      {editnumber: 'FRA', time: '2021-12-24 16:37:15',number:'15',unit:'个',type:'已入库',price:'100'}
    ], 


  
  },
  // 事件处理函数
  bindViewTap:function(item) {
    wx.navigateTo({
      url: '../entry_information/entry_information',
    })
    let query=item.currentTarget.dataset.obj;
    console.log(query)
  },
  goSearch(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  onLoad() {
  
  },
  onShow:function(){
    this.getGoodList()
  },
  
  /**
   * 获取商品的列表
   */
  getGoodList(){
    // var that = this;
    // var postData={};
    // // post 有数据传入则有数据  没有数据数据传入则没有商品的ID

    // WXAPI.goods(postData).then(function(res) {
    // if (res.code == 0) {
    //   //请求成功的,设置数据的
    //   that.setData({});
    // }else{
    //   //请求失败的

    // }
    // })
    var that = this;
    wx.request({
             url: 'http://192.168.3.61:8001/api/goods/',
             data: "",
             method: 'get',
             header: {'Content-Type': 'application/json'},
             success: function(res){
              var items=[];
              console.log(res)
              res.data.results.forEach(itme => {
              var newTtem={
                editnumber:itme.name,
                time:itme.update_time,
                number:itme.numb,
                unit:itme.spec,
                type:itme.state_text,
                price:itme.price
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
