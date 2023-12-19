import Toast from '@vant/weapp/toast/toast';
const api = require("@utils/api")
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
  onSubmit(e) {
    const product = {
      id: this.data.id,
      name: this.data.name,
      newPrice: this.data.newPrice,
      oldPrice: this.data.oldPrice,
      miaoshu: this.data.miaoshu,
      url: this.data.fileList[0].url,
    }
    api.AndOrUpdatemanicureProject(product)
    .then(res => {
      Toast.success("提交成功")
      setTimeout(() => {
        wx.navigateBack()
      }, 1000)
    }).catch(err => {
      // 失败回调
    })
  },
  uploadFile(event) {
    const { file } = event.detail;
    var self = this
    wx.uploadFile({
      url: getApp().globalData.baseUrl + "/upload",
      filePath: file.url,
      name: 'imgList',
      header: { 'content-type': 'multipart/form-data' },
      success(res) {
        const imgUrl = JSON.parse(res.data).data
        // 上传完成需要更新 fileList
        var fileList = self.data.fileList
        fileList.push({
          url: imgUrl[0],
          isImage: true,
          deletable: true,
        });
        self.setData({
          fileList: fileList
        });
      }
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