import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    paymentIndex: '0',
    products: [],
    totalPrice: 0,
  },
  onCellClick(event) {
    const {
      name
    } = event.currentTarget.dataset;
    this.setData({
      paymentIndex: name,
    });
  },
  onSubmitOrder(e) {
    Toast.loading({
      message: '支付中...',
      forbidClick: true,
      loadingType: 'spinner',
    });
    setTimeout(() => {
      Toast.success('支付成功');
    }, 1000);
    setTimeout(() => {
      wx.redirectTo({
        url: '/pages/comsumer/paymentSuccess/paymentSuccess',
      })
    }, 2000);
    // 清空购物车
    const app = getApp()
    app.globalData.cartInfo = {
      totalPrice: 0.0,
      number: 0,
      products: []
    };
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const systemInfo = wx.getSystemInfoSync();
    // 自定义加载图标
    // Toast.loading({
    //   message: '加载中...',
    //   forbidClick: true,
    //   loadingType: 'spinner',
    // });
    const products = JSON.parse(options.param)
    const totalPrice = this.calculateTotalPrice(products)
    this.setData({
      products: products,
      windowHeight: systemInfo.windowHeight,
      totalPrice: totalPrice,
    })
  },
  calculateTotalPrice(productList) {
    let totalPrice = 0;
    for (const p of productList) {
      totalPrice += p.price * p.quantity
    }
    return totalPrice
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