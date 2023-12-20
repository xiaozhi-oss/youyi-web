const request = require("./request") //引入封装好的js文件
module.exports = {
  // 登录
  login(username, password) {
    return request.post('/authorization/login', {
      username: username,
      password: password,
    })
  },
  register(username, password, confirmPassword) {
    const data = {
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    }
    return request.post('/authorization/register', data)
  },
  /*
    商品接口
  */
  // 获取商品列表
  getProductList(current, searchKey) {
    if (searchKey == undefined) {
      searchKey = ''
    }
    return request.get('/product/getProductList', {
      current: current,
      searchKey: searchKey,
    })
  },
  deleteProduct(id) {
    return request.post('/product/delete', {id: id})
  },
  AndOrUpdateProduct(data) {
    return request.post('/product/addAndUpdate', data)
  },

  /**
    美甲项目
  */
  getmanicureProjectList(current) {
    return request.get('/manicureProject/list', {
      current: current,
    })
  },
  deletemanicureProject(id) {
    return request.post('/manicureProject/delete', {id: id})
  },
  AndOrUpdatemanicureProject(data) {
    return request.post('/manicureProject/addAndUpdate', data)
  },

  /**
   * 美甲师
   */
  getManicuristtList() {
    return request.get('/manicurist/list')
  },
  deleteManicurist(id) {
    return request.post('/manicurist/delete', {id: id})
  },
  AndOrUpdateManicurist(data) {
    return request.post('/manicurist/addAndUpdate', data)
  },
  /**
   * 订单
   */
  createOrder(param) {
    return request.post('/order/createOrder', param)
  },

  getOrderList(current, status) {
    if (status == undefined) {
      status = ''
    }
    return request.get('/order/list', {
      current: current,
      status: status
    })
  },
  getOrderLogisticsInfo(orderId) {
    return request.get('/order/getLogisticsInfo', {
      orderId: orderId,
    })
  },
  getAllOrderList(current, status) {
    if (status == undefined) {
      status = ''
    }
    return request.get('/order/allList', {
      current: current,
      status: status
    })
  },
  updateOrderStatus(orderId, orderStatus) {
    return request.post('/order/updateOrderStatus', {
      orderId: orderId,
      orderStatus: orderStatus
    })
  },
  /**
   * 预约订单
   */
  getAppointmentList(current, status) {
    if (status == undefined) {
      status = ''
    }
    return request.get('/appointmentOrder/list', {
      current: current,
      status: status
    })
  },
  getAppointmentListById(current, status) {
    if (status == undefined) {
      status = ''
    }
    return request.get('/appointmentOrder/listById', {
      current: current,
      status: status
    })
  },
  addOrUpdateAppointmentOrder(appointment) {
    return request.post('/appointmentOrder/addOrUpdate', appointment)
  },
  updateAppointmentStatus(id, status) {
    return request.post('/appointmentOrder/updateStatus', {
      status: status,
      id: id
    })
  },
  deleteAppointmentOrder(id) {
    return request.post('/appointmentOrder/delete', {
      id: id
    })
  },
  /*
    地址接口
  */
  getAddressList() {
    return request.get('/address/list', {})
  },
  getDefaultAddress() {
    return request.get('/address/getDefaultAddress', {})
  },

  /**
   * 评论
   */
  addComment(comment) {
    return request.post('/comment/addOrUpdate', comment)
  },
  getAllCommentList(current) {
    return request.get('/comment/allList', {
      current: current
    })
  },
  getCommentListByProductId(current, productId) {
    return request.get('/comment/listById', {
      current: current,
      productId: productId
    })
  },
  delete(id) {
    return request.post('/comment/delete', {
      id: id
    })
  },
}