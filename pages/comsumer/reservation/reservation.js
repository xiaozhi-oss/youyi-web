// pages/comsumer/reservation/reservation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    isFooterShow: false,
    loading: false,
    topInfo: {
      rateValue: '4.5',
      distance: 2.1,
    },
    projects: [
      {
        id: 1,
        title: '纯色美甲|颜色任选',
        url: 'https://img.yzcdn.cn/vant/cat.jpeg',
        newPrice: 499.9,
        oldPrice: 129.9,
        supplement: '包含手部基础护理，护甲造型设计等'
      },
      {
        id: 2,
        title: '纯色美甲|颜色任选',
        url: 'https://img.yzcdn.cn/vant/cat.jpeg',
        newPrice: 499.9,
        oldPrice: 129.9,
        supplement: '包含手部基础护理，护甲造型设计等'
      },
      {
        id: 3,
        title: '纯色美甲|颜色任选',
        url: 'https://img.yzcdn.cn/vant/cat.jpeg',
        newPrice: 499.9,
        oldPrice: 129.9,
        supplement: '包含手部基础护理，护甲造型设计等'
      },
      {
        id: 4,
        title: '纯色美甲|颜色任选',
        url: 'https://img.yzcdn.cn/vant/cat.jpeg',
        newPrice: 499.9,
        oldPrice: 129.9,
        supplement: '包含手部基础护理，护甲造型设计等'
      },
    ]
  },
  onToReservationInfo(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo ({
      url: `/pages/comsumer/reservationInfo/reservationInfo?projectId=${id}`,
    })
  },
  // 下滑刷新触发事件
  onScrollToLower(e) {
    if (!this.data.loading && !this.data.isFooterShow) {
      this.setData({ loading: true });
      setTimeout(() => {
        this.setData({ 
          loading: false,
        });
      }, 1000);
      const projects = this.data.projects
      setTimeout(() => {
        for(let i=0; i < 10; i++) {
          projects.push({
            id: 4,
            title: '纯色美甲|颜色任选',
            url: 'https://img.yzcdn.cn/vant/cat.jpeg',
            newPrice: 499.9,
            oldPrice: 129.9,
            supplement: '包含手部基础护理，护甲造型设计等'
          })
        }
        this.setData({
          projects: projects
        })
      }, 1000);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const systemInfo = wx.getSystemInfoSync();
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