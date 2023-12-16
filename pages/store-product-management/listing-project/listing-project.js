
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    projects: [
      {
        id: 1,
        name: '纯色美甲|颜色任选',
        url: 'https://img.yzcdn.cn/vant/cat.jpeg',
        newPrice: 499.9,
        oldPrice: 129.9,
        miaoshu: '包含手部基础护理，护甲造型设计等'
      },
      {
        id: 2,
        name: '纯色美甲|颜色任选',
        url: 'https://img.yzcdn.cn/vant/cat.jpeg',
        newPrice: 499.9,
        oldPrice: 129.9,
        miaoshu: '包含手部基础护理，护甲造型设计等'
      },
      {
        id: 3,
        name: '纯色美甲|颜色任选',
        url: 'https://img.yzcdn.cn/vant/cat.jpeg',
        newPrice: 499.9,
        oldPrice: 129.9,
        miaoshu: '包含手部基础护理，护甲造型设计等'
      },
      {
        id: 4,
        name: '纯色美甲|颜色任选',
        url: 'https://img.yzcdn.cn/vant/cat.jpeg',
        newPrice: 499.9,
        oldPrice: 129.9,
        miaoshu: '包含手部基础护理，护甲造型设计等'
      },
    ]
  },
  onDeleteProject(e) {
    // e.currentTarget.dataset.*
    const id = e.currentTarget.dataset.id
    const projectList = this.data.projects
    const index = projectList.findIndex(p => p.id === id)
    projectList.splice(index, 1)
    this.setData({
      projects: projectList
    })
  },
  onAddUpdate(e) {
    const project = e.currentTarget.dataset.project
    const projectJson = JSON.stringify(project)
    let url = `/pages/store-product-management/add-update-project/add-update-project?project=${projectJson}`
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