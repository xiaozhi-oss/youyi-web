const request = require("./request") //引入封装好的js文件
module.exports = {
  // 登录
  login(){
   return request.get('/product/getProductList')
  },

  /*
    商品接口
  */ 
  // 获取商品列表
  getProductList(current){
    return request.get('/product/getProductList', { current: current })
  },
}