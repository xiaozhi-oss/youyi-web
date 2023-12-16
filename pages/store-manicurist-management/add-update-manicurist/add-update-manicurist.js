// pages/store-manicurist-management/add-manicurist/add-manicurist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    employmentTime: '',
    reservationCount: '',
    kucun: '',
    works: [],
    url: []
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
    const id = e.currentTarget.dataset.id
    if (id === 0) { // 头像
      this.setData({ url: [] })
    } else {  // 作品集
      
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const manicuristId = options.id
    let title = '新增美甲师'
    if (manicuristId !== 'undefined') {
      title = '修改美甲师'
      // 发送请求获取数据
      const manicurist = {
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
      }
      this.setData({
        name: manicurist.name,
        employmentTime: manicurist.employmentTime,
        works: manicurist.works,
        reservationCount: manicurist.reservationCount,
        url: [manicurist.url]
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