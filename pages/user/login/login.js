const api = require("@utils/api")
import Toast from '/@vant/weapp/toast/toast';
Page({

  data: {
    checked: true,
    username: '',
    password: ''
  },
  onChange(event) {
    this.setData({
      checked: event.detail,
    });
  },
  onLogin(e) {
    let index = "/pages/comsumer/home/home"
    const storeIndex = "/pages/store-bar/index/index"
    Toast.loading({
      message: '登录中...',
      forbidClick: true,
      loadingType: 'spinner',
    });
    api.login(this.data.username, this.data.password)
    .then(res => {
      const token = res.data.data
      // 设置缓存
      wx.setStorageSync('token', token)
      // 设置全局变量
      const app = getApp();
      const globalData = app.globalData;
      globalData.isStoreShow = false
      globalData.token = token
      Toast.success("登录成功")
      if (this.data.username === 'root') {
        index = storeIndex
        globalData.isStoreShow = true
      }
      console.log(res.data.data);
      setTimeout(() => {
        wx.switchTab({
          url: index,
        })
      }, 1000);
    })
    .catch(err => {
      console.log(err);
    })
  },
  onWXLogin(e) {
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
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