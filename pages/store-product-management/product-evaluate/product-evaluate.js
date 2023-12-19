import Toast from '@vant/weapp/toast/toast';
const api = require("@utils/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reviewList: [
      {
        id: 1,
        userInfo: {
          id: 1,
          username: '小八嘎',
          url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Jasmine',
        },
        size: 'S码',
        content: '实在是太好看啦，姐妹们买它',
        imgList: ["https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/1.png", "https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png", "https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/4.png", "https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/5.png"]
      },
      {
        id: 2,
        userInfo: {
          id: 2,
          username: '小舔',
          url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Oscar',
        },
        size: 'S码',
        content: '实在是太好看啦，姐妹们买它',
        imgList: ["https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/1.png", "https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png", "https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/4.png", "https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/5.png"]
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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