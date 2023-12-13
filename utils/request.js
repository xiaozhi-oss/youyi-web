var app = getApp(); //引入全局app.js，我们可以在globalData中定义一些公用的数据，比如baseUrl、token
import Toast from '/@vant/weapp/toast/toast'; //引入vant插件，用于提示错误
const request = function (url, options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.globalData.baseUrl + url,
      method: options.method,
      data: options.method == "GET" ? options.data : JSON.stringify(options.data),
      // header这里根据业务情况自行选择需要还是不需要
      header: {
        'Authorization': app.globalData.token
      },
      success: (res) => {
        if (res.data.status === 500) {
          Toast.fail('res.data.message');
          reject(res.data.message)
        } else {
          resolve(res)
        }
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}


module.exports = {
  //封装get方法
  get(url, data) {
    return request(url, {
      method: "GET",
      data
    })
  },
  //封装post方法
  post(url, data) {
    return request(url, {
      method: "POST",
      data
    })
  }
}