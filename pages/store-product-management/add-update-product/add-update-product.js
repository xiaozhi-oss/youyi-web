// pages/store-product-management/add-update-product/add-update-product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    price: '',
    mioashu: '',
    kucun: '',
    sizes: [ 'M码', 'S码', 'L码' ],
    fileList: [],
    addInputOpen: false,
    sizeInputValue: '',
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
        fileList: [
          {
            url: productObj.url,
            name: 'imgUrl',
            isImage: true,
            deletable: true,
          }
        ],
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