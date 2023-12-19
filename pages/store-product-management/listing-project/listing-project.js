import Toast from '@vant/weapp/toast/toast';
const api = require("@utils/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    projects: [],
    pageCurrent: 1,
    footerShow: false,
  },
  onScrollToLower(e) {
    if (!this.data.loading && !this.data.footerShow) {
      this.setData({loading: true});
      api.getmanicureProjectList(this.data.pageCurrent + 1)
      .then(res => {
        const projects = res.data.data
        var footerShow = false
        if (projects.length >= 0 && projects.length < 10) {
          footerShow = true
        }
        const productList = this.data.projects
        productList.push(...projects)
        this.setData({
          projects: productList,
          footerShow: footerShow,
          loading: false,
          pageCurrent: this.data.pageCurrent + 1
        })
      }).catch(err => {
        // 失败回调
      })
    }
  },
  onDeleteProject(e) {
    // e.currentTarget.dataset.*
    const id = e.currentTarget.dataset.id
    api.deletemanicureProject(id)
      .then(res => {
        const projectList = this.data.projects
        const index = projectList.findIndex(p => p.id === id)
        projectList.splice(index, 1)
        this.setData({
          projects: projectList
        })
        Toast.success("删除成功")
      }).catch(err => {
        // 失败回调
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
    api.getmanicureProjectList(1)
      .then(res => {
        const projects = res.data.data
        var footerShow = false
        if (projects.length >= 0 && projects.length < 10) {
          footerShow = true
        }
        this.setData({
          projects: projects,
          footerShow: footerShow
        })
      }).catch(err => {
        // 失败回调
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
    api.getmanicureProjectList(1)
    .then(res => {
      const projects = res.data.data
      var footerShow = false
      if (projects.length >= 0 && projects.length < 10) {
        footerShow = true
      }
      this.setData({
        projects: projects,
        footerShow: footerShow
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