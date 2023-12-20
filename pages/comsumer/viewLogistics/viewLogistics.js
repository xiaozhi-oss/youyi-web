import Toast from '@vant/weapp/toast/toast';
const api = require("@utils/api")

// pages/comsumer/viewLogistics/viewLogistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    waybillNumber: '',
    LogisticsInfoList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const orderId = options.orderId
    console.log(orderId);
    api.getOrderLogisticsInfo(orderId)
    .then(res => {
      const info = res.data.data
      console.log(info);
      const routeList = info.routeList
      var routes = []
      for (let i = 0; i < routeList.length; i++) {
        const route = routeList[i]
        const desc = '['+route.acceptAddress+'] ' + route.remark
        const routeInfo = {
          text: route.acceptTime,
          desc: desc
        }
        routes[i] = routeInfo
      }
      this.setData({
        address: info.addressInfo,
        waybillNumber: info.waybillNumber,
        LogisticsInfoList: routes,
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})