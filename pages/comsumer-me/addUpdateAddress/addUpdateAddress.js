import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      id: '',
      recipient: '',
      phoneNumber: '',
      address: '',
  },
  onAddOrUpdateAddress(e) {
    const id = this.data.id
    const recipient = this.data.recipient
    const phoneNumber = this.data.phoneNumber
    const address = this.data.address
    // 参数校验
    if (recipient === '' || phoneNumber === '' || address === '' ) {
      Toast.fail('不能有空');
    } else {
      const addressObj = {
        id: id,
        recipient: recipient,
        phoneNumber: phoneNumber,
        address: address,
      }
      console.log(addressObj);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let title = ''
    if (Object.keys(options).length === 0) {
      title = '新增收货地址' 
    } else {
      title = '编辑收货地址'
      this.setData({
        id: options.id,
        recipient: options.recipient,
        phoneNumber: options.phoneNumber,
        address: options.address,
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