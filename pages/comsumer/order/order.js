const appInstance = getApp()
const globalData = appInstance.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    afterSalesType: '1',
    refundReason: 1,
    show: false,
    isFooterShow: false,
    loading: false,
    refundReasons: [
      "协商一致退款", "退运费", "大小/尺寸与商品描述不符", "少件/漏件", "包装/商品破损", "少件/漏件", "少件/漏件", "少件/漏件", "大小/尺寸与商品描述不符"
    ],
    describeContent: '',
    fileList: [{
        url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        name: '图片1',
        isImage: true,
        deletable: true,
      },
      // Uploader 根据文件后缀来判断是否为图片文件
      // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      {
        url: 'http://iph.href.lu/60x60?text=default',
        name: '图片2',
        isImage: true,
        deletable: true,
      },
    ],
    orderList: [
      {
        orderId: 202003261127151030,
        status: '已完成',
        title: '手工穿戴甲 长款 轻奢',
        price: 26.9,
        payment: 26.9,
        size: 's码',
        orderTime: '2023-10-28',
        url: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/1.png'
      },
      {
        orderId: 202003261127151030,
        status: '已完成',
        title: '手工穿戴甲 长款 轻奢',
        price: 26.9,
        payment: 26.9,
        size: 's码',
        orderTime: '2023-10-28',
        url: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/1.png'
      },
      {
        orderId: 202003261127151030,
        status: '已完成',
        title: '手工穿戴甲 长款 轻奢',
        price: 26.9,
        payment: 26.9,
        size: 's码',
        orderTime: '2023-10-28',
        url: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/1.png'
      },
      {
        orderId: 202003261127151030,
        status: '已完成',
        title: '手工穿戴甲 长款 轻奢',
        price: 26.9,
        payment: 26.9,
        size: 's码',
        orderTime: '2023-10-28',
        url: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/1.png'
      },
    ]
  },
  onChooseAfterSalesType(event) {
    this.setData({
      afterSalesType: event.detail,
    });
  },
  onClose() {
    // reset status
    this.setData({
      show: false,
      afterSalesType: '1',
      isShowRefundReason: false,
      refundReason: '',
    });
  },
  bindTextAreaBlur(e) {
    this.setData({
      describeContent: '',
    })
  },
  onTyleClick(event) {
    const {
      name
    } = event.currentTarget.dataset;
    this.setData({
      afterSalesType: name,
    });
  },
  onReasonClick(event) {
    const {
      name
    } = event.currentTarget.dataset;
    this.setData({
      refundReason: name,
    });
  },
  onAfterSalesOrRefunds(e) {
    this.setData({
      show: true
    });
  },
  onChooseRefundReason(e) {
    this.setData({
      isShowRefundReason: true
    })
  },
  afterRead(event) {
    const {
      file
    } = event.detail;
    console.log(file);
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
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
  imageDelectEvent(e) {
    const index = e.detail.index
    const {
      fileList
    } = this.data
    fileList.splice(index, 1)
    this.setData({
      fileList: fileList,
    })
  },
  // 下滑刷新触发事件
  onScrollToLower(e) {
    if (!this.data.loading && !this.data.isFooterShow) {
      this.setData({
        loading: true
      });
      setTimeout(() => {
        this.setData({
          loading: false,
        });
      }, 1000);
      const orderList = this.data.orderList
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          orderList.push({
            orderId: 202003261127151030,
            status: '已完成',
            title: '手工穿戴甲 长款 轻奢',
            price: 26.9,
            payment: 26.9,
            size: 's码',
            orderTime: '2023-10-28',
            url: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/1.png'
          })
        }
        this.setData({
          orderList: orderList
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
      cartInfo: globalData.cartInfo,
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().init();
  },
})