import Toast from '@vant/weapp/toast/toast';
const api = require("@utils/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    name: '',
    employmentTime: '',
    kucun: '',
    works: [],
    url: [],
  },
  onSubmit(e) {
    let workStr = ''
    for (const item in this.data.works) {
      workStr += item.url
    }
    const manicurist = {
      id: this.data.id,
      name: this.data.name,
      employmentTime: this.data.employmentTime,
      kucun: this.data.kucun,
      works: workStr,
      url: this.data.url[0].url
    }
    api.AndOrUpdateManicurist(manicurist)
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
    const type = event.currentTarget.dataset.type
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
        var fileList = []
        if (type === '0') {
          fileList.push({
            url: imgUrl[0],
            isImage: true,
            deletable: true,
          });
          self.setData({
            url: fileList
          });
        } else {
          fileList = self.data.works
          for (const img of imgUrl) {
            const imgObj = {
              url: img,
              isImage: true,
              deletable: true,
            }
            fileList.push(imgObj)
          }
          self.setData({
            works: fileList
          });
        }
      }
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