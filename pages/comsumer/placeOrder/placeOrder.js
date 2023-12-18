import Toast from '@vant/weapp/toast/toast';
const api = require("@utils/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    paymentIndex: '0',
    products: [],
    totalPrice: 0,
    address: {}
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
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner',
    });
    const products = this.data.products
    products.forEach(p => {
      p.size = p.sizes[0]
      delete p.id
    });
    const order = {
      addressId: this.data.address.id,
      products: products,
    }
    console.log(order);
    api.createOrder(order)
      .then(res => {
        Toast.success('下单成功');
        // // 清空购物车
        const app = getApp()
        app.globalData.cartInfo = {
          totalPrice: 0.0,
          number: 0,
          products: []
        };
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/comsumer/paymentSuccess/paymentSuccess',
          })
        }, 1000);
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const type = options.paymentType // 支付类型 0-购物车下单 1-单个下单
    let products = []
    let totalPrice = ''
    if (type === '0') {
      const cartInfo = getApp().globalData.cartInfo
      products = cartInfo.products
      totalPrice = cartInfo.totalPrice
    } else {
      const product = options.product
      products = [product]
      totalPrice = product.price
    }
    const systemInfo = wx.getSystemInfoSync();
    api.getDefaultAddress()
      .then(res => {
        this.setData({
          address: res.data.data
        })
      })
    this.setData({
      products: products,
      windowHeight: systemInfo.windowHeight,
      totalPrice: totalPrice,
    })
  },
  calculateTotalPrice(productList) {
    let totalPrice = 0;
    for (const p of productList) {
      totalPrice += p.price * p.number
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