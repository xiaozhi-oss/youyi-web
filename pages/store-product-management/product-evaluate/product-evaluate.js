import Toast from '@vant/weapp/toast/toast';
const api = require("@utils/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    footerShow: false,
    loading: false,
    pageCurrent: 1,
    reviewList: [],
  },
  onScrollToLower(e) {
    if (!this.data.loading && !this.data.footerShow) {
      this.setData({loading: true});
      api.getAllCommentList(this.data.pageCurrent + 1)
      .then(res => {
        const reviews = res.data.data
        var footerShow = false
        if (reviews.length >= 0 && reviews.length < 10) {
          footerShow = true
        }
        const reviewList = this.data.reviewList
        reviewList.push(...reviews)
        this.setData({
          reviewList: reviewList,
          footerShow: footerShow,
          loading: false,
          pageCurrent: this.data.pageCurrent + 1
        })
      }).catch(err => {
        // 失败回调
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const systemInfo = wx.getSystemInfoSync();
    const self = this
    api.getAllCommentList(1)
    .then(res => {
      const reviews = res.data.data
      let footerShow = false
      if (reviews.length >= 0 && reviews.length < 10) {
        footerShow = true
      }
      self.setData({
        reviewList: reviews,
        footerShow: footerShow,
      })
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