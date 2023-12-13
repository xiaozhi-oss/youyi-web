// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    // 从缓存中获取用户信息


    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
  },
  globalData: {
    baseUrl: 'http://10.23.165.177:8888/youyi',
    token: '',
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
