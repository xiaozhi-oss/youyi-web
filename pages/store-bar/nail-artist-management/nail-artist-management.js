
// pages/store/nail-artist-management/nail-artist-management.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    manicurists: [
      {
        id: 1,
        url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Peanut',
        name: '小八嘎',
        employmentTime: 7,
        works: [
          "https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/1.png",
          "https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png",
          "https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/4.png"
        ],
        reservationCount: 23,
        good: 234,
      },
      {
        id: 2,
        url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Peanut',
        name: '小八嘎',
        employmentTime: 7,
        works: [
          "https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/1.png",
          "https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png",
          "https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/4.png"
        ],
        reservationCount: 23,
        good: 234,
      },
      {
        id: 3,
        url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Peanut',
        name: '小八嘎',
        employmentTime: 7,
        works: [
          "https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/1.png",
          "https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png",
          "https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/4.png"
        ],
        reservationCount: 23,
        good: 234,
      }
    ]
  },
  onDeleteManicurist(e) {
    const manicuristId = e.currentTarget.dataset.id
    const manicurists = this.data.manicurists
    let manicuristIndex = manicurists.findIndex(m => m.id === manicuristId)
    manicurists.splice(manicuristIndex, 1)
    // 更新全局变量
    this.setData({
      manicurists: manicurists,
    });
  },
  onAndUpdateManicurist(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/store-manicurist-management/add-update-manicurist/add-update-manicurist?id=${id}`,
    })
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