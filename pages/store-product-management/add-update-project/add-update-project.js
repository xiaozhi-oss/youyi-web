// pages/store-product-management/add-update-project/add-update-project.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    name: '',
    newPrice: '',
    oldPrice: '',
    miaoshu: '',
    fileList: [],
  },
  uploadFile(event) {
    const {
      file
    } = event.detail;
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload',
      filePath: file.url,
      name: 'file',
      formData: {
        user: 'test'
      },
      success(res) {
        // 上传完成需要更新 fileList
        const {
          fileList = []
        } = this.data;
        fileList.push({
          ...file,
          url: res.data
        });
        this.setData({
          fileList
        });
      },
    });

  },
  deleteImg(e) {
    this.setData({
      fileList: []
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const project = options.project
    let title = '新增项目'
    if (project !== 'undefined') {
      title = '修改项目'
      const projectObj = JSON.parse(project)
      this.setData({
        id: projectObj.id,
        name: projectObj.name,
        newPrice: projectObj.newPrice,
        oldPrice: projectObj.oldPrice,
        miaoshu: projectObj.miaoshu,
        fileList: [{
          url: projectObj.url,
          name: 'imgUrl',
          isImage: true,
          deletable: true,
        }]
      })
    }
    wx.setNavigationBarTitle({
      title: title,
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