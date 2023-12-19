import Toast from '@vant/weapp/toast/toast';
const api = require("@utils/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    manicurists: []
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
    api.getManicuristtList()
      .then(res => {
        const manicurists = res.data.data
        this.setData({
          manicurists: manicurists,
        })
      }).catch(err => {
        // 失败回调
      })
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
    api.getManicuristtList()
      .then(res => {
        const manicurists = res.data.data
        this.setData({
          manicurists: manicurists,
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