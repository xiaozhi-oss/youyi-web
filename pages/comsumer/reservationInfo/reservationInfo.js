import Notify from '@vant/weapp/notify/notify';
import Toast from '@vant/weapp/toast/toast';
Page({
  data: {
    projectId: '',
    date: '',
    isManicuristShow: false,
    isWorkShow: false,
    isDateShow: false,
    isFooterShow: false,
    loading: false,
    active: 0,
    // 选择的美甲师
    selectMainicurist: {},
    manicuristList: []
  },
  // 时间 popup 触发事件
  onDatePopupDisplay() {
    this.setData({ isDateShow: true });
  },
  onCloseDatePopup() {
    this.setData({ isDateShow: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },
  onDateSelect(event) {
    this.setData({
      isDateShow: false,
      date: this.formatDate(event.detail),
    });
  },

  // 美甲师 popup 触发事件
  onToManicuristPage(e) {
    this.openAndCloseManicuristPopup()
  },
  onCloseManicuristPopup(e) {
    this.openAndCloseManicuristPopup()
  },
  openAndCloseManicuristPopup() {
    this.setData({
      isManicuristShow: !this.data.isManicuristShow,
    })
  },
  onShowWorkPopup(e) {
    this.setData({
      isWorkShow: true
    })
  },
  onCloseWorkShowPopup(e) {
    this.setData({
      isWorkShow: false
    })
  },
  onReservationBtnClick(e) {
    const id = e.currentTarget.dataset.id
    const index = this.data.manicuristList.findIndex(m => m.id === id)
    const manicurist = this.data.manicuristList[index]
    let selectMainicurist = {
      id: manicurist.id,
      name: manicurist.name,
    }
    this.setData({
      selectMainicurist: selectMainicurist,
      isManicuristShow: false,
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
      const manicuristList = this.data.manicuristList
      setTimeout(() => {
        for(let i=0; i < 10; i++) {
          manicuristList.push({
            id: 1,
            name: '离大谱',
            employmentTime: '7',
            positiveReviews: 301,
            reservationCount: 12,
            portfolioCount: 34,
            avgUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Snuggles'
          })
        }
        this.setData({
          manicuristList: manicuristList
        })
      }, 1000);
    }
  },

  // 确认触发
  onDermine(e) {
    const name = this.data.name
    const phone = this.data.name
    const mainicuristId = this.data.selectMainicurist.id
    const date = this.data.date
    if (name !== '' && phone !== '' && mainicuristId !== '' && date !== '') {
      const reservationInfo = {
        name: name,
        phone: phone,
        mainicuristId: mainicuristId,
        date: date,
      }
      // 发送请求
      Toast.loading({
        message: '预约中...',
        forbidClick: true,
        loadingType: 'spinner',
      });
      setTimeout(() => {
        Toast.success('预约成功');
      }, 1000);
      setTimeout(() => {
        wx.navigateBack()
      }, 2000);
    } else {
      // 弹出错误提示
      Notify({ type: 'warning', message: '表单项不能有空的' });
    }
  },
  // 取消触发
  onCancel(e) {
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取传过来的美甲师 id
    const projectId = options.projectId
    this.setData({ projectId: projectId })
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