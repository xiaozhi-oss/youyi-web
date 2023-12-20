import Toast from '@vant/weapp/toast/toast';
const api = require("@utils/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    isFooterShow: false,
    loading: false,
    pageCurrent: 1,
    topInfo: {
      rateValue: '4.5',
      distance: 2.1,
    },
    projects: []
  },
  onToReservationInfo(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/comsumer/reservationInfo/reservationInfo?projectId=${id}`,
    })
  },
  // 下滑刷新触发事件
  onScrollToLower(e) {
    if (!this.data.loading && !this.data.isFooterShow) {
      this.setData({
        loading: true
      });
      const page = this.data.pageCurrent + 1
      api.getmanicureProjectList(page)
        .then(res => {
          const projects = res.data.data
          const projectList = this.data.projects
          let isFooterShow = false
          if (projects.length >= 0 && projects.length < 10) {
            isFooterShow = true
          }
          projectList.push(...projects)
          this.setData({
            isFooterShow: isFooterShow,
            projects: projectList,
            pageCurrent: page,
            loading: false
          })
        })
        .catch(err => {})
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const systemInfo = wx.getSystemInfoSync();
    api.getmanicureProjectList(1)
      .then(res => {
        const projects = res.data.data
        let isFooterShow = false
        if (projects.length > 0 && projects.length < 10) {
          isFooterShow = true
        }
        this.setData({
          isFooterShow: isFooterShow,
          projects: projects
        })
      })
      .catch(err => {})
    this.setData({
      windowHeight: systemInfo.windowHeight,
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
    this.getTabBar().init();
    const systemInfo = wx.getSystemInfoSync();
    api.getmanicureProjectList(1)
      .then(res => {
        const projects = res.data.data
        let isFooterShow = false
        if (projects.length > 0 && projects.length < 10) {
          isFooterShow = true
        }
        this.setData({
          isFooterShow: isFooterShow,
          projects: projects
        })
      })
      .catch(err => {})
    this.setData({
      windowHeight: systemInfo.windowHeight,
    });
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