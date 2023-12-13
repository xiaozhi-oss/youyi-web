const api = require("@utils/api")
Page({

  data: {
    checked: true,
    phone: '',
    pwd: ''
  },
  onChange(event) {
    this.setData({
      checked: event.detail,
    });
  },
  onPhoneChange(e) {
    this.setData({
      phone: e.detail
    })
  },
  onLogin(e) {
    
    console.log(this.data.phone);
    if (this.data.phone === '1') {
      this.setData({
        phone: ''
      })
      this.globalData.isStoreShow = true
      wx.reLaunch({
        url: '/pages/store-bar/index/index'
      })
    } else {
      this.globalData.isStoreShow = false
      wx.reLaunch({
        url: '/pages/comsumer/home/home'
      })
    }
  },
  onWXLogin(e) {
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const app = getApp();
    this.globalData = app.globalData;
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