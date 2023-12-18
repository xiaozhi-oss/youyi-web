import Toast from '/@vant/weapp/toast/toast';
const api = require("@utils/api")
Page({

  data: {
    checked: true,
    username: '',
    password: '',
    confirmPassword: ''
  },
  onChange(event) {
    this.setData({
      checked: event.detail,
    });
  },
  registerBtnClick(e) {
    Toast.loading({
      message: '注册中...',
      forbidClick: true,
      loadingType: 'spinner',
    });
    api.register(this.data.username, this.data.password, this.data.confirmPassword)
      .then(res => {
        Toast.success('注册成功');
          setTimeout(function(){
            wx.navigateTo({
              url: '/pages/user/login/login',
            })
          },1000);
      }).catch(res => {
        console.log(res);
      })
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