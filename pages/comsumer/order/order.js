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
    reviewShow: false,
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
        orderId: '2023122344323423',
        totalPrice: 2343,
        time: '2023-12-02',
        totalNumber: 23,
        addressId: 1,
        status: '0',
        userId: 2,
        productInfoList: [
          {
            productName: '手工穿戴甲 长款高级线条感、轻奢',
            productUrl: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png',
            productSize: 'S码',
            productPrice: 26,
            productNumber: 3,
          },
          {
            productName: '手工穿戴甲 长款高级线条感、轻奢',
            productUrl: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png',
            productSize: 'S码',
            productPrice: 26,
            productNumber: 3,
          },
          {
            productName: '手工穿戴甲 长款高级线条感、轻奢',
            productUrl: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png',
            productSize: 'S码',
            productPrice: 26,
            productNumber: 3,
          }
        ]
      },
      {
        orderId: '2023122344323423',
        totalPrice: 2343,
        time: '2023-12-02',
        totalNumber: 23,
        addressId: 1,
        status: '0',
        userId: 2,
        productInfoList: [
          {
            productName: '手工穿戴甲 长款高级线条感、轻奢',
            productUrl: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png',
            productSize: 'S码',
            productPrice: 26,
            productNumber: 3,
          }
        ]
      },
      {
        orderId: '2023122344323423',
        totalPrice: 2343,
        time: '2023-12-02',
        totalNumber: 23,
        addressId: 1,
        status: '0',
        userId: 2,
        productInfoList: [
          {
            productName: '手工穿戴甲 长款高级线条感、轻奢',
            productUrl: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png',
            productSize: 'S码',
            productPrice: 26,
            productNumber: 3,
          }
        ]
      },
    ],
    statusList: ["未发货" , "已发货", "确认收货", "售后", "售后完成"]
  },
  onChooseAfterSalesType(event) {
    this.setData({
      afterSalesType: event.detail,
    });
  },
  onClose() {
    this.setData({
      show: false,
      afterSalesType: '1',
      isShowRefundReason: false,
      describeContent: '',
    });
  },
  onReviewClose(e) {
    this.setData({
      reviewShow: false,
    });
  },
  onReviewPopopOpen(e) {
    this.setData({
      reviewShow: true,
      fileList: [],
      describeContent: '',
    })
  },
  toViewLogisticsPage(e) {
    wx.navigateTo({
      url: '/pages/comsumer/viewLogistics/viewLogistics',
    })
  },
  // 提交评价
  onSubmitReview(e) {

  },
  onTyleClick(event) {
    const { name } = event.currentTarget.dataset;
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
            orderId: '2023122344323423',
            totalPrice: 2343,
            time: '2023-12-02',
            totalNumber: 23,
            addressId: 1,
            status: '未发货',
            userId: 2,
            productInfoList: [
              {
                productName: '手工穿戴甲 长款高级线条感、轻奢',
                productUrl: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png',
                productSize: 'S码',
                productPrice: 26,
                productNumber: 3,
              },
              {
                productName: '手工穿戴甲 长款高级线条感、轻奢',
                productUrl: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png',
                productSize: 'S码',
                productPrice: 26,
                productNumber: 3,
              },
              {
                productName: '手工穿戴甲 长款高级线条感、轻奢',
                productUrl: 'https://aoao-jiao.oss-cn-guangzhou.aliyuncs.com/iamge/3.png',
                productSize: 'S码',
                productPrice: 26,
                productNumber: 3,
              }
            ]
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