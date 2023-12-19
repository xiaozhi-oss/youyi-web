import Toast from '@vant/weapp/toast/toast';
const api = require("@utils/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    name: '',
    price: '',
    miaoshu: '',
    kucun: '',
    sizes: ['M码', 'S码', 'L码'],
    fileList: [],
    addInputOpen: false,
    sizeInputValue: '',
  },
  onSubmit(e) {
    let size = ''
    this.data.sizes.forEach(s => {
      size += s + "-"
    })
    const product = {
      id: this.data.id,
      name: this.data.name,
      price: this.data.price,
      miaoshu: this.data.miaoshu,
      kucun: this.data.kucun,
      url: this.data.fileList[0].url,
      size: size,
    }
    api.AndOrUpdateProduct(product)
    .then(res => {
      Toast.success("提交成功")
      setTimeout(() => {
        wx.navigateBack()
      }, 1000)
    }).catch(err => {
      // 失败回调
    })
  },
  onAddSize(e) {
    this.setData({
      addInputOpen: true
    })
  },
  onDeleteSize(e) {
    const index = e.currentTarget.dataset.index
    console.log(index);
    const sizes = this.data.sizes
    sizes.splice(index, 1)
    this.setData({
      sizes: sizes
    })
  },
  onConfirmBtnClick(e) {
    const sizeInputValue = this.data.sizeInputValue
    this.setData({
      addInputOpen: false,
      sizes: [...this.data.sizes, sizeInputValue],
      sizeInputValue: '',
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
    const product = options.product
    let title = '新增商品'
    if (product !== 'undefined') {
      title = '修改商品'
      const productObj = JSON.parse(product)
      this.setData({
        name: productObj.name,
        price: productObj.price,
        miaoshu: productObj.miaoshu,
        sizes: productObj.sizes,
        kucun: productObj.kucun,
        id: productObj.id,
        fileList: [{
          url: productObj.url,
          name: 'imgUrl',
          isImage: true,
          deletable: true,
        }],
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