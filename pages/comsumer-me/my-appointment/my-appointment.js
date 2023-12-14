// pages/comsumer-me/my-appointment/my-appointment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    active: 0,
    isFooterShow: false,
    loading: false,
    apponitmentList: [
      {
        id: 1,
        status: '已完成',
        mainicuristName: '伊音儿',
        projectName: '半贴甲片 | 不限砖饰',
        date: '2023-09-01'
      },
      {
        id: 2,
        status: '已完成',
        mainicuristName: '伊音儿',
        projectName: '半贴甲片 | 不限砖饰',
        date: '2023-09-01'
      },
      {
        id: 3,
        status: '已完成',
        mainicuristName: '伊音儿',
        projectName: '半贴甲片 | 不限砖饰',
        date: '2023-09-01'
      },
      {
        id: 2,
        status: '已完成',
        mainicuristName: '伊音儿',
        projectName: '半贴甲片 | 不限砖饰',
        date: '2023-09-01'
      },
      {
        id: 2,
        status: '已完成',
        mainicuristName: '伊音儿',
        projectName: '半贴甲片 | 不限砖饰',
        date: '2023-09-01'
      },
      {
        id: 2,
        status: '已完成',
        mainicuristName: '伊音儿',
        projectName: '半贴甲片 | 不限砖饰',
        date: '2023-09-01'
      },
      {
        id: 2,
        status: '已完成',
        mainicuristName: '伊音儿',
        projectName: '半贴甲片 | 不限砖饰',
        date: '2023-09-01'
      },
      {
        id: 2,
        status: '已完成',
        mainicuristName: '伊音儿',
        projectName: '半贴甲片 | 不限砖饰',
        date: '2023-09-01'
      },
    ]
  },
  onTagChange(event) {
    this.setData({
      apponitmentList: []
    })
  },
  onScrollToLower(e) {
    if (!this.data.loading && !this.data.isFooterShow) {
      this.setData({ loading: true });
      setTimeout(() => {
        this.setData({ 
          loading: false,
        });
      }, 1000);
      const apponitmentList = this.data.apponitmentList
      setTimeout(() => {
        for(let i=0; i < 10; i++) {
          apponitmentList.push(
            {
              id: 1,
              status: '已完成',
              mainicuristName: '伊音儿',
              projectName: '半贴甲片 | 不限砖饰',
              date: '2023-09-01'
            }
          )
        }
        this.setData({
          apponitmentList: apponitmentList
        })
      }, 1000);
    }
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