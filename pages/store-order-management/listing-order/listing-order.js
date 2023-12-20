import Toast from '@vant/weapp/toast/toast';
const api = require("@utils/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    status: 0,
    pageCurrent: 1,
    orderList: [],
    statusList: ["未发货", "已发货", "确认收货", "售后", "售后完成"]
  },
  onConfirmShipment(e) {
    const orderId = e.currentTarget.dataset.id
    const self = this
    api.updateOrderStatus(orderId, 1)
      .then(res => {
        Toast.success("发货成功")
        const orderList = self.data.orderList
        console.log(orderList);
        const index = orderList.findIndex(p => p.orderId === orderId);
        console.log(index);
        orderList.splice(index, 1)
        console.log(orderList);
        self.setData({
          orderList: orderList
        })
      }).catch(err => {
        // 失败回调
      })
  },
  toViewLogisticsPage(e) {
    const orderId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/comsumer/viewLogistics/viewLogistics?orderId=${orderId}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const systemInfo = wx.getSystemInfoSync();
    const status = options.status
    api.getAllOrderList(1, status)
      .then(res => {
        const orderList = res.data.data
        var footerShow = false
        if (orderList.length > 0 && orderList.length < 10) {
          footerShow = true
        }
        this.setData({
          orderList: orderList,
          footerShow: footerShow
        })
      }).catch(err => {
        // 失败回调
      })
    this.setData({
      windowHeight: systemInfo.windowHeight,
      orderStatus: status
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