// pages/comsumer/classificationSearch/classificationSearch.js
const appInstance = getApp()
const globalData = appInstance.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    loading: false,
    footerShow: false,
    cartShow: false,
    cartInfo: {},
    productTypes: [{
        id: 0,
        name: "新品推荐"
      },
      {
        id: 1,
        name: "穿戴甲"
      },
      {
        id: 2,
        name: "美甲工具"
      },
      {
        id: 3,
        name: "初学者套装"
      },
      {
        id: 4,
        name: "美甲饰品"
      },
    ],
    // 接收后端接收到的商品列表
    products: [
      {
        id: 1,
        title: `手工穿戴甲 长款高级线条感、轻奢 - 1`,
        price: 26,
        url: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png',
        specifications: ['S码', 'M码', 'L码']
      },
      {
        id: 2,
        title: `手工穿戴甲 长款高级线条感、轻奢 - 2`,
        price: 34,
        url: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png',
        specifications: ['S码', 'M码', 'L码']
      },
      {
        id: 3,
        title: `手工穿戴甲 长款高级线条感、轻奢 - 3`,
        price: 67,
        url: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png',
        specifications: ['S码', 'M码', 'L码']
      },
      {
        id: 4,
        title: `手工穿戴甲 长款高级线条感、轻奢 - 3`,
        price: 67,
        url: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png',
        specifications: ['S码', 'M码', 'L码']
      },
      {
        id: 5,
        title: `手工穿戴甲 长款高级线条感、轻奢 - 3`,
        price: 67,
        url: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png',
        specifications: ['S码', 'M码', 'L码']
      }
    ],
  },
  onOpenCart(e) {
    this.setData({
      cartShow: !this.data.cartShow,
    })
  },
  onChangeNav(e) {
    const navId = e.detail
    if (navId !== 0) {
      this.setData({
        products: []
      })
    }
  },
  addProductToCart(event) {
    const product = event.currentTarget.dataset.item
    const app = getApp()
    let cartInfo = app.globalData.cartInfo;
    // 检查商品是否已经在购物车中
    let existingProductIndex = cartInfo.products.findIndex(p => p.id === product.id);
    // 放入到购物车中
    if (existingProductIndex !== -1) {
      // 如果商品已经在购物车中，则增加数量
      cartInfo.products[existingProductIndex].quantity += 1;
    } else {
      // 如果商品不在购物车中，则添加一个新的商品项
      cartInfo.products.push({ ...product, quantity: 1 });
    }
    // 计算新的总价和商品总数
    cartInfo.totalPrice += product.price;
    cartInfo.number += 1;
    // 更新全局变量
    app.globalData.cartInfo = cartInfo;
    this.setData({
      cartInfo: cartInfo,
    });
  },
  onQuantityChange(e) {
    const app = getApp()
    let cartInfo = app.globalData.cartInfo;
    const productId = e.currentTarget.dataset.id
    const value = e.detail.value <= 0 ? 1 : e.detail.value
    // 修改对应商品的数量
    let existingProductIndex = cartInfo.products.findIndex(p => p.id === productId);
    if (existingProductIndex !== -1) {;
      // 将数量修改为最新数量
      cartInfo.products[existingProductIndex].quantity = value;
    }
    // 重新计算购物车
    cartInfo.number = 0
    cartInfo.totalPrice = 0
    for (let i=0; i < cartInfo.products.length; i++) {
      const p = cartInfo.products[i]
      cartInfo.number += p.quantity
      cartInfo.totalPrice += p.price * p.quantity
    }
    // 更新全局变量
    app.globalData.cartInfo = cartInfo
    this.setData({
      cartInfo: cartInfo,
    })
  },
  onQuantityPush(e) {
    const productId = e.currentTarget.dataset.id
    const app = getApp()
    let cartInfo = app.globalData.cartInfo;
    // 检查商品是否已经在购物车中
    let existingProductIndex = cartInfo.products.findIndex(p => p.id === productId);
    const product = cartInfo.products[existingProductIndex]
    if (existingProductIndex !== -1) {
      // 如果商品已经在购物车中，则增加数量
      product.quantity += 1;
    }
    // 计算新的总价和商品总数
    cartInfo.totalPrice += product.price;
    cartInfo.number += 1;
    // 更新全局变量
    app.globalData.cartInfo = cartInfo;
    this.setData({
      cartInfo: cartInfo,
    });
  },
  onQuantityMinus(e) {
    const productId = e.currentTarget.dataset.id
    const app = getApp()
    let cartInfo = app.globalData.cartInfo;
    // 检查商品是否已经在购物车中
    let existingProductIndex = cartInfo.products.findIndex(p => p.id === productId);
    const product = cartInfo.products[existingProductIndex]
    if (existingProductIndex !== -1) {
      // 如果商品已经在购物车中，则减少数量
      product.quantity -= 1;
    }
    // 计算新的总价和商品总数
    cartInfo.totalPrice -= product.price;
    cartInfo.number -= 1;
    // 更新全局变量
    app.globalData.cartInfo = cartInfo;
    this.setData({
      cartInfo: cartInfo,
    });
  },
  onDeleteProductForCart(e) {
    const productId = e.currentTarget.dataset.id
    const app = getApp()
    let cartInfo = app.globalData.cartInfo;
    let productIndex = cartInfo.products.findIndex(p => p.id === productId)
    const p = cartInfo.products[productIndex]
    cartInfo.number -= p.quantity
    cartInfo.totalPrice -= p.quantity * p.price
    cartInfo.products.splice(productIndex, 1)
    // 更新全局变量
    app.globalData.cartInfo = cartInfo;
    this.setData({
      cartInfo: cartInfo,
    });
  },
  onScrollToLower(e) {
    if (!this.data.loading && !this.data.footerShow) {
      this.setData({ loading: true });
      setTimeout(() => {
        this.setData({ 
          loading: false,
        });
      }, 2000);
      const products = this.data.products
      setTimeout(() => {
        for(let i=0; i < 10; i++) {
          products.push({
            id: 5,
            title: '赶紧的下单,看了就给老子买',
            price: 26,
            url: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png',
            specifications: ['S码', 'M码', 'L码']
          })
        }
        this.setData({
          products: products
        })
      }, 2000);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const systemInfo = wx.getSystemInfoSync();
    this.setData({
      windowHeight: systemInfo.windowHeight,
      cartInfo: globalData.cartInfo,
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