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
  onQuantityChange(e) {
    const productId = e.currentTarget.dataset.id
    const value = e.detail.value <= 0 ? 1 : e.detail.value
    const products = this.data.products
    // 修改对应商品的数量
    let existingProductIndex = products.findIndex(p => p.id === productId);
    if (existingProductIndex !== -1) {;
      // 将数量修改为最新数量
      products[existingProductIndex].number = value;
    }
    // 重新计算购物车
    var totalPrice = 0
    for (let i=0; i < products.length; i++) {
      totalPrice += products[i].price * products[i].number
    }
    this.setData({
      totalPrice: totalPrice,
      products: products
    })
  },
  onQuantityPush(e) {
    const productId = e.currentTarget.dataset.id
    const products = this.data.products
    // 修改对应商品的数量
    let existingProductIndex = products.findIndex(p => p.id === productId);
    if (existingProductIndex !== -1) {;
      // 将数量修改为最新数量
      products[existingProductIndex].number += 1;
      var totalPrice = this.data.totalPrice
      totalPrice += products[existingProductIndex].price
    }
    this.setData({
      totalPrice: totalPrice,
      products: products
    })
  },
  onQuantityMinus(e) {
    const productId = e.currentTarget.dataset.id
    const products = this.data.products
    // 修改对应商品的数量
    let existingProductIndex = products.findIndex(p => p.id === productId);
    if (existingProductIndex !== -1) {;
      // 将数量修改为最新数量
      products[existingProductIndex].number -= 1;
      var totalPrice = this.data.totalPrice
      totalPrice -= products[existingProductIndex].price
    }
    this.setData({
      totalPrice: totalPrice,
      products: products
    })
  },
  onSubmitOrder(e) {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner',
    });
    const products = this.data.products
    products.forEach(p => { delete p.id });
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
      products.forEach(p => {
        p.productId = p.id
      })
      totalPrice = cartInfo.totalPrice
    } else {
      const product = JSON.parse(options.product)
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