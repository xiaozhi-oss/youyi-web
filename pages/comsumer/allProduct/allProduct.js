import Toast from '@vant/weapp/toast/toast';
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
    cartInfo: {},
    sizeList: [
      {id: 1, name: 'S码'},
      {id: 1, name: 'M码'},
      {id: 1, name: 'L码'},
      {id: 1, name: 'XL码'},
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
      }
    ],
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
  /**
   * 跳转商品详情页
   */
  toProductDetail(e) {
    this.setData({
      isShowProductDetail: true
    })
  },
  onCloseProductDetailPopup(e) {
    this.setData({
      isShowProductDetail: false
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
      console.log('进入');
      Toast.fail('购物车为空，请添加商品');
      return
    }
    // 转成json格式传递
    const param = JSON.stringify(products)
    wx.navigateTo({
      url: `/pages/comsumer/placeOrder/placeOrder?param=${param}`,
    })
  },
  onByNow(e) {  // 立即购买

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const systemInfo = wx.getSystemInfoSync();
    const app = getApp()
    const globalData = app.globalData;
    this.setData({
      windowHeight: systemInfo.windowHeight,
      cartInfo: globalData.cartInfo,
    });
    console.log('sdfsdfsd');
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
    console.log('进入');
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