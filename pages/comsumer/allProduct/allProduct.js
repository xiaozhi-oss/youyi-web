import Toast from '@vant/weapp/toast/toast';
const api = require("@utils/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    cartShow: false,
    footerShow: false,
    isReviewFooterShow: false,
    loading: false,
    reviewLoading: false,
    isShowProductDetail: false,
    productCurrent: 1,
    cartInfo: {},
    selelctSizeIndex: 0,
    sizeList: [ 'S码', 'M码', 'L码', 'XL码' ],
    // 接收后端接收到的商品列表
    products: [],
    productDetail: {},
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
  sizeBtnClick(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      selelctSizeIndex: index
    })
  },
  /**
   * 跳转商品详情页
   */
  toProductDetail(e) {
    const id = e.currentTarget.dataset.id
    const products = this.data.products
    const index = products.findIndex(p => p.id === id)
    const product = products[index]
    this.setData({
      isShowProductDetail: true,
      productDetail: product,
      selelctSizeIndex: 0,
    })
  },
  onCloseProductDetailPopup(e) {
    this.setData({
      isShowProductDetail: false,
    })
  },
    /**
   * 打开购物车界面
   */
  onOpenCart(e) {
    this.setData({
      cartShow: !this.data.cartShow,
    })
  },
  onCloseCart(e) {
    this.setData({
      cartShow: !this.data.cartShow,
    })
  },
  addProductToCart(event) {
    const product = event.currentTarget.dataset.item
    const app = getApp()
    let cartInfo = app.globalData.cartInfo;
    // 检查商品是否已经在购物车中
    let existingProductIndex = cartInfo.products.findIndex(p => p.id === product.id);
    product.sizes = [product.sizes[this.data.selelctSizeIndex]]
    // 放入到购物车中
    if (existingProductIndex !== -1) {
      // 如果商品已经在购物车中，则增加数量
      cartInfo.products[existingProductIndex].number += 1;
    } else {
      // 如果商品不在购物车中，则添加一个新的商品项
      cartInfo.products.push({ ...product, number: 1 });
    }
    // 计算新的总价和商品总数
    cartInfo.totalPrice += product.price;
    cartInfo.number += 1;
    // 更新全局变量
    app.globalData.cartInfo = cartInfo;
    this.setData({
      cartInfo: cartInfo,
    });
    Toast.success("添加成功")
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
      cartInfo.products[existingProductIndex].number = value;
    }
    // 重新计算购物车
    cartInfo.number = 0
    cartInfo.totalPrice = 0
    for (let i=0; i < cartInfo.products.length; i++) {
      const p = cartInfo.products[i]
      cartInfo.number += p.number
      cartInfo.totalPrice += p.price * p.number
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
      product.number += 1;
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
      product.number -= 1;
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
    cartInfo.number -= p.number
    cartInfo.totalPrice -= p.number * p.price
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
      const products = this.data.products
      api.getProductList(this.data.productCurrent)
      .then(res => {
        const productList = res.data.data
        let footerShow = true
        if (productList.length !== 0) {
          products.push(...productList)
          footerShow: false
        } 
        this.setData({
          products: products,
          loading: false,
          footerShow: footerShow
        })
      })
      .catch(err => {

      })
    }
  },
  onReviewScrollToLower(e) {
    if (!this.data.reviewLoading && !this.data.isReviewFooterShow) {
      this.setData({ reviewLoading: true });
      setTimeout(() => {
        this.setData({ 
          reviewLoading: false,
        });
      }, 2000);
      const reviewList = this.data.reviewList
      setTimeout(() => {
        for(let i=0; i < 10; i++) {
          reviewList.push(      {
            id: 2,
            userInfo: {
              id: 2,
              username: '小舔',
              url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Oscar',
            },
            size: 'S码',
            content: '实在是太好看啦，姐妹们买它',
            imgList: ["https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/1.png", "https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png", "https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/4.png", "https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/5.png"]
          })
        }
        this.setData({
          reviewList: reviewList
        })
      }, 2000);
    }
  },
  onCartPlaceOrder(e) {   // 购物车下单
    // 获取购物车的商品信息
    const products = this.data.cartInfo.products
    if (products.length === 0) {
      Toast.fail('购物车为空，请添加商品');
      return
    }
    // 这里不用传递参数，我们可以直接获取全局的购物车来进行支付
    wx.navigateTo({
      url: `/pages/comsumer/placeOrder/placeOrder?paymentType=0`,
    })
  },
  onBuyNow(e) {  // 立即购买
    wx.navigateTo({
      url: `/pages/comsumer/placeOrder/placeOrder?paymentType=1`,
    })
  },
  onToCart(e) {
    let product = this.data.productDetail
    const globalData = getApp().globalData
    const cartInfo = globalData.cartInfo
    const index = cartInfo.products.findIndex(d => d.id === product.id)
    product.sizes = [product.sizes[this.data.selelctSizeIndex]]
    if (index === -1) {
      // 计算新的总价和商品总数
      product.number = 1
      cartInfo.products.push(product)
    } else {
      cartInfo.products[index].number += 1;
    }
    cartInfo.totalPrice += product.price;
    cartInfo.number += 1;
    this.setData({
      cartInfo: cartInfo
    })
    Toast.success("添加成功")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let searchKey = options.searchKey
    const systemInfo = wx.getSystemInfoSync();
    const app = getApp()
    const globalData = app.globalData;
    let products = []
    api.getProductList(this.data.productCurrent, searchKey)
    .then(res => {
      products = res.data.data
      if (products.length === 0) {
        this.setData({ footerShow: true })
      }
      this.setData({ 
        products: products,
        productCurrent: this.data.productCurrent + 1
      })
    }).catch(err => {
      // 失败回调
    })
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
  onBackPress: function() {
    // 处理用户点击返回按钮或滑动返回手势
    wx.navigateBack();
    return true; // 阻止默认的返回行为
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