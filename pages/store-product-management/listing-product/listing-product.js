// pages/store-product-management/listing-product/listing-product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    loading: false,
    footerShow: false,
    products: [
      {
        id: 1,
        url: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png',
        name: '手工穿戴甲 长款 高级线条感、轻奢',
        miaoshu: '低调而彰显奢华',
        price: 25,
        sizes: ['S码', 'M码', 'L码'],
        kucun: 100,
      },
      {
        id: 2,
        url: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png',
        name: '手工穿戴甲 长款 高级线条感、轻奢',
        miaoshu: '低调而彰显奢华',
        price: 25,
        sizes: ['S码', 'M码', 'L码'],
        kucun: 100,
      },
      {
        id: 3,
        url: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png',
        name: '手工穿戴甲 长款 高级线条感、轻奢',
        miaoshu: '低调而彰显奢华',
        price: 25,
        sizes: ['S码', 'M码', 'L码'],
        kucun: 100,
      },
            {
        id: 4,
        url: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png',
        name: '手工穿戴甲 长款 高级线条感、轻奢',
        miaoshu: '低调而彰显奢华',
        price: 25,
        sizes: ['S码', 'M码', 'L码'],
        kucun: 100,
      },
      {
        id: 5,
        url: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png',
        name: '手工穿戴甲 长款 高级线条感、轻奢',
        miaoshu: '低调而彰显奢华',
        price: 25,
        sizes: ['S码', 'M码', 'L码'],
        kucun: 100,
      },
      {
        id: 6,
        url: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png',
        name: '手工穿戴甲 长款 高级线条感、轻奢',
        miaoshu: '低调而彰显奢华',
        price: 25,
        sizes: ['S码', 'M码', 'L码'],
        kucun: 100,
      },
    ]
  },
  onScrollToLower(e) {
    if (!this.data.loading && !this.data.footerShow) {
      this.setData({ loading: true });
      const products = this.data.products
      const product = {
        id: 1,
        url: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png',
        name: '手工穿戴甲 长款 高级线条感、轻奢',
        miaoshu: '低调而彰显奢华',
        price: 25,
        sizes: ['S码', 'M码', 'L码'],
        kucun: 100,
      }
      setTimeout(() => {
        this.setData({
          products: [...products, product],
          loading: false,
        })
      }, 1000);
    }
  },
  onDeleteProduct(e) {
    const productId = e.currentTarget.dataset.id
    const products = this.data.products
    let productIndex = products.findIndex(p => p.id === productId)
    products.splice(productIndex, 1)
    // 更新全局变量
    this.setData({
      products: products,
    });
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