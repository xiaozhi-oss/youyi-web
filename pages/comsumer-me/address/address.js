// pages/comsumer-me/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [
      {
        id: 1,
        recipient: '小八嘎',
        phoneNumber: '13433445566',
        address: '广东省 广州市 黄浦区 广州商学院 - 1',
        default: 1
      },
      {
        id: 2,
        recipient: '豹子',
        phoneNumber: '13433445566',
        address: '广东省 广州市 黄浦区 广州商学院',
        default: 0
      },
      {
        id: 3,
        recipient: '舔子',
        phoneNumber: '13433445566',
        address: '广东省 广州市 黄浦区 广州商学院',
        default: 0
      },
    ]
  },
  onUpdateAddress(e) {
    const id = e.currentTarget.dataset.id
    const index = this.data.addressList.findIndex(x => x.id === id)
    const addressObj = this.data.addressList[index]
    const param = `id=${id}&recipient=${addressObj.recipient}&phoneNumber=${addressObj.phoneNumber}&address=${addressObj.address}`
    wx.navigateTo({
      url: `/pages/comsumer-me/addUpdateAddress/addUpdateAddress?${param}`,
    })
  },
  onAddAddress(e) {
    wx.navigateTo({
      url: '/pages/comsumer-me/addUpdateAddress/addUpdateAddress',
    })
  },
  onSettingDetault(e) {
    const index = e.currentTarget.dataset.index
    const addressList = this.data.addressList
    addressList.unshift(addressList.splice(index , 1)[0]);
    this.setData({
      addressList: addressList
    })
  },
  onDeleteAddress(e) {
    const id = e.currentTarget.dataset.id
    const addressList = this.data.addressList
    const index = addressList.findIndex(a => a.id === id)
    addressList.splice(index, 1)
    this.setData({
      addressList: addressList
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