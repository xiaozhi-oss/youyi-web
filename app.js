// app.js

App({
  onLaunch() {
    // this.globalData.token = wx.getStorageSync('token')
  },
  globalData: {
    baseUrl: 'http://localhost:8888/youyi',
    token: 'aecd782c-d7ed-4612-9991-feb2ffbfcc35',
    isStoreShow: false,
    selectMainicurist: {
      id: '',
      name: ''
    },
    cartInfo: {
      totalPrice: 0.0,   // 价格
      number: 0,          // 商品总数
      products: []        // 购物车中的商品列表
    }
  },
})
