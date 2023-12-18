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

  /**
   * 订单
   */
  createOrder(param) {
    return request.post('/order/createOrder', param)
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
}