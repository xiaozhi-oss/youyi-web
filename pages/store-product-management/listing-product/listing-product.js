import Toast from '@vant/weapp/toast/toast';
const api = require("@utils/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    loading: false,
    footerShow: false,
    pageCurrent: 1,
    products: []
  },
  onScrollToLower(e) {
    if (!this.data.loading && !this.data.footerShow) {
      this.setData({loading: true});
      api.getProductList(this.data.pageCurrent + 1)
      .then(res => {
        const products = res.data.data
        var footerShow = false
        if (products.length >= 0 && products.length < 10) {
          footerShow = true
        }
        const productList = this.data.products
        productList.push(...products)
        this.setData({
          products: productList,
          footerShow: footerShow,
          loading: false,
          pageCurrent: this.data.pageCurrent + 1
        })
      }).catch(err => {
        // 失败回调
      })
    }
  },
  onDeleteProduct(e) {
    const productId = e.currentTarget.dataset.id
    console.log(productId);
    api.deleteProduct(productId)
      .then(res => {
        const products = this.data.products
        let productIndex = products.findIndex(p => p.id === productId)
        products.splice(productIndex, 1)
        // 更新全局变量
        this.setData({
          products: products,
        });
        Toast.success("删除成功")
      }).catch(err => {
        // 失败回调
      })
  },
  toAddUpdateProductPage(e) {
    const product = e.currentTarget.dataset.product
    const productJson = JSON.stringify(product)
    let url = `/pages/store-product-management/add-update-product/add-update-product?product=${productJson}`
    wx.navigateTo({
      url: url,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const systemInfo = wx.getSystemInfoSync();
    api.getProductList(1)
      .then(res => {
        const products = res.data.data
        var footerShow = false
        if (products.length > 0 && products.length < 10) {
          footerShow = true
        }
        this.setData({
          products: products,
          footerShow: footerShow
        })
      }).catch(err => {
        // 失败回调
      })
    this.setData({
      windowHeight: systemInfo.windowHeight
    });
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
    api.getProductList(1)
      .then(res => {
        const products = res.data.data
        var footerShow = false
        if (products.length > 0 && products.length < 10) {
          footerShow = true
        }
        this.setData({
          products: products,
          footerShow: footerShow
        })
      }).catch(err => {
        // 失败回调
      })
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