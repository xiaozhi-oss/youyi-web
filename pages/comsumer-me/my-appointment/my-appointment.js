import Toast from '@vant/weapp/toast/toast';
const api = require("@utils/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    active: 0,
    isFooterShow: false,
    loading: false,
    isInfoShow: false,
    apponitmentInfo: {},
    apponitmentList: [],
    statusList: [
      "未确认","进行中", "已完成", "已失效" 
    ]
  },
  onSubmit(e) {
    const id = this.data.apponitmentInfo.id
    const self = this
    api.updateAppointmentStatus(id, 1)
    .then(res => {
      const apponitments = self.data.apponitmentList
      const index = apponitments.findIndex(a => a.id === id)
      apponitments.splice(index, 1)
      self.setData({
        apponitmentList: apponitments,
        isInfoShow: false,
      })
      Toast.success("确认成功")
    }).catch(err => {
      // 失败回调
    })
  },
  onViewInfo(e) {
    const id = e.currentTarget.dataset.id
    const index = this.data.apponitmentList.findIndex(a => a.id === id)
    this.setData({ isInfoShow: true, apponitmentInfo: this.data.apponitmentList[index] })
  },
  onCloseInfoPopup(e) {
    this.setData({ isInfoShow: false })
  },
  onTagChange(event) {
    const status = event.detail.name
    api.getAppointmentListById(1, status)
    .then(res => {
      const apponitments = res.data.data
      let footerShow = false
      if (apponitments.length >= 0 && apponitments.length < 10) {
        footerShow = true
      }
      this.setData({ 
        apponitmentList: apponitments,
        footerShow: footerShow,
      })
      console.log(apponitmentList);
    }).catch(err => {
      // 失败回调
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
    api.getAppointmentListById(1, 0)
    .then(res => {
      const apponitments = res.data.data
      let footerShow = false
      if (apponitments.length >= 0 && apponitments.length < 10) {
        footerShow = true
      }
      this.setData({ 
        apponitmentList: apponitments,
        footerShow: footerShow,
      })
      console.log(apponitmentList);
    }).catch(err => {
      // 失败回调
    })
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