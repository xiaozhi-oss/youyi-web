// pages/store-order-management/listing-order/listing-order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    status: 0,
    orderList: [
      {
        orderId: '2023122344323423',
        totalPrice: 2343,
        time: '2023-12-02',
        totalNumber: 23,
        addressId: 1,
        status: 0,
        userId: 2,
        productInfoList: [
          {
            productName: '手工穿戴甲 长款高级线条感、轻奢',
            productUrl: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png',
            productSize: 'S码',
            productPrice: 26,
            productNumber: 3,
          },
          {
            productName: '手工穿戴甲 长款高级线条感、轻奢',
            productUrl: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png',
            productSize: 'S码',
            productPrice: 26,
            productNumber: 3,
          },
          {
            productName: '手工穿戴甲 长款高级线条感、轻奢',
            productUrl: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png',
            productSize: 'S码',
            productPrice: 26,
            productNumber: 3,
          }
        ]
      },
      {
        orderId: '2023122344323424',
        totalPrice: 2343,
        time: '2023-12-02',
        totalNumber: 23,
        addressId: 1,
        status: 1,
        userId: 2,
        productInfoList: [
          {
            productName: '手工穿戴甲 长款高级线条感、轻奢',
            productUrl: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png',
            productSize: 'S码',
            productPrice: 26,
            productNumber: 3,
          }
        ]
      },
      {
        orderId: '2023122344323425',
        totalPrice: 2343,
        time: '2023-12-02',
        totalNumber: 23,
        addressId: 3,
        status: 3,
        userId: 2,
        productInfoList: [
          {
            productName: '手工穿戴甲 长款高级线条感、轻奢',
            productUrl: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png',
            productSize: 'S码',
            productPrice: 26,
            productNumber: 3,
          }
        ]
      },
    ],
    statusList: ["未发货" , "已发货", "确认收货", "售后", "售后完成"]
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