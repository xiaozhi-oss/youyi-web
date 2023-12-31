const appInstance = getApp()
const globalData = appInstance.globalData;
import Toast from '@vant/weapp/toast/toast';
const api = require("@utils/api")
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
    pageCurrent: 1,
    reviewProductId: '',
    reviewOrderId: '',
    refundReasons: [
      "协商一致退款", "退运费", "大小/尺寸与商品描述不符", "少件/漏件", "包装/商品破损", "少件/漏件", "少件/漏件", "少件/漏件", "大小/尺寸与商品描述不符"
    ],
    describeContent: '',
    fileList: [],
    orderList: [],
    statusList: ["未发货" , "已发货", "确认收货", "售后", "售后完成"]
  },
  updateOrderStatus(orderId, orderStatus) {
    const self = this
    api.updateOrderStatus(orderId, orderStatus)
    .then(res => {
      Toast.success("确认收货成功")
      const orders = self.data.orderList
      const index = orders.findIndex(o => o.orderId === orderId)
      orders[index].orderStatus = orderStatus
      self.setData({
        orderList: orders
      })
    })
  },
  onConfirmReceipt(e) {
    const orderId = e.currentTarget.dataset.id
    this.updateOrderStatus(orderId, 2)
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
    const oid = e.currentTarget.dataset.oid
    const productId = e.currentTarget.dataset.productid
    this.setData({
      reviewProductId: productId,
      reviewShow: true,
      fileList: [],
      describeContent: '',
      reviewOrderId: oid,
    })
  },
  toViewLogisticsPage(e) {
    const orderId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/comsumer/viewLogistics/viewLogistics?orderId=${orderId}`,
    })
  },
  // 提交评价
  onSubmitReview(e) {
    const reviewProductId = this.data.reviewProductId
    const describeContent = this.data.describeContent
    const fileList = this.data.fileList
    if (describeContent === '') {
      Toast.fail("内容不能为空")
      return 
    }
    var urlList = ''
    fileList.forEach(f => {
      urlList += f.url + '-'
    })
    const comment = {
      productId: reviewProductId,
      imgIds: urlList,
      content: describeContent
    }
    const self = this
    api.addComment(comment)
    .then(res => {
      Toast.success("评论成功~~~")
      const oid = self.data.reviewOrderId
      const orderList = self.data.orderList
      const orderIndex = orderList.findIndex(o => o.id === oid)
      const productIndex = orderList[orderIndex].productInfoList.findIndex(p => p.id === reviewProductId)
      orderList[orderIndex].productInfoList[productIndex].reviewStatus = 1
      self.setData({
        reviewShow: false,
        orderList: orderList,
      })
    })
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
    const self = this
    api.getOrderList(1)
    .then(res => {
      const orderList = res.data.data
      let isFooterShow = false
      if (orderList.length > 0 && orderList.length < 10) {
        isFooterShow = true
      }
      self.setData({
        isFooterShow: isFooterShow,
        orderList: orderList
      })
    })
    .catch(err => {})
    this.setData({
      windowHeight: systemInfo.windowHeight
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().init();
    const systemInfo = wx.getSystemInfoSync();
    const self = this
    api.getOrderList(1)
    .then(res => {
      const orderList = res.data.data
      let isFooterShow = false
      if (orderList.length > 0 && orderList.length < 10) {
        isFooterShow = true
      }
      self.setData({
        isFooterShow: isFooterShow,
        orderList: orderList
      })
    })
    .catch(err => {})
    this.setData({
      windowHeight: systemInfo.windowHeight
    });
  },
})